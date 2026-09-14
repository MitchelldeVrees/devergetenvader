import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { PGlite } from "@electric-sql/pglite";
import { createServer } from "pglite-server";
import { checkoutInput, calculateTotal } from "../lib/checkout-validation";

test(
  "durable order/payment lifecycle with provider fakes and PostgreSQL schema",
  { timeout: 120000 },
  async (t) => {
    Object.assign(process.env, { NODE_ENV: "test" });
    const pg = new PGlite();
    await pg.waitReady;
    await pg.exec(
      await readFile(new URL("../db/001_orders.sql", import.meta.url), "utf8"),
    );
    const server = createServer(pg);
    await new Promise<void>((resolve) =>
      server.listen(0, "127.0.0.1", resolve),
    );
    const address = server.address();
    assert.ok(address && typeof address === "object");
    process.env.DATABASE_URL = `postgres://postgres@127.0.0.1:${address.port}/postgres?sslmode=disable`;
    process.env.MOLLIE_API_KEY = "test_FAKE_ONLY_FOR_LOCAL_TESTS";
    process.env.ORDER_TOKEN_SECRET =
      "local-test-secret-not-a-production-credential-123456";
    process.env.RESEND_API_KEY = "re_fake_local_tests";
    process.env.RESEND_FROM_EMAIL = "Test <test@example.com>";
    const { createCheckout, orderByToken, syncPayment, sendConfirmation } =
      await import("../lib/orders");
    const { db } = await import("../lib/db");
    const payments = new Map<
      string,
      {
        id: string;
        mode: string;
        status: string;
        amount: { currency: string; value: string };
        metadata: { orderId: string };
        _links: { checkout: { href: string } };
      }
    >();
    const keys = new Map<string, string>();
    let createCalls = 0;
    let timeoutNext = false;
    let emailCalls = 0;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (url, options) => {
      const target = String(url);
      if (
        target === "https://api.mollie.com/v2/payments" &&
        options?.method === "POST"
      ) {
        createCalls++;
        const headers = options.headers as Record<string, string>;
        const key = headers["Idempotency-Key"];
        const body = JSON.parse(options.body as string);
        let id = keys.get(key);
        if (!id) {
          id = `tr_${payments.size + 1}`;
          keys.set(key, id);
          payments.set(id, {
            id,
            status: "open",
            mode: "test",
            amount: body.amount,
            metadata: body.metadata,
            _links: {
              checkout: { href: `https://www.mollie.com/checkout/${id}` },
            },
          });
        }
        if (timeoutNext) {
          timeoutNext = false;
          throw new Error("Simulated network timeout AFTER provider creation");
        }
        return Response.json(payments.get(id));
      }
      if (target.startsWith("https://api.mollie.com/v2/payments/tr_"))
        return Response.json(payments.get(target.split("/").at(-1)!));
      if (target === "https://api.resend.com/emails") {
        emailCalls++;
        return Response.json({ id: `email-${emailCalls}` });
      }
      throw new Error(`Unexpected external request in test: ${target}`);
    };
    const input = () =>
      checkoutInput.parse({
        requestId: randomUUID(),
        name: "Test Lezer",
        email: "reader@example.com",
        street: "Teststraat 12",
        postalCode: "1234 AB",
        city: "Amsterdam",
        country: "NL",
        quantity: 2,
        format: "paperback",
        termsAccepted: true,
      });
    try {
      await t.test(
        "explicit checkout test mode never accepts a live key",
        async () => {
          const { checkoutReady } = await import("../lib/checkout-config");
          process.env.CHECKOUT_ENABLED = "true";
          process.env.CHECKOUT_TEST_MODE = "true";
          assert.equal(checkoutReady(), true);
          const originalKey = process.env.MOLLIE_API_KEY;
          process.env.MOLLIE_API_KEY = "live_fake_never_used_for_network";
          assert.equal(checkoutReady(), false);
          process.env.MOLLIE_API_KEY = originalKey;
          delete process.env.CHECKOUT_TEST_MODE;
        },
      );
      await t.test(
        "simultaneous duplicate submissions store one order and create one payment",
        async () => {
          const data = input();
          const responses = await Promise.all([
            createCheckout(data),
            createCheckout(data),
            createCheckout(data),
          ]);
          assert.equal(new Set(responses.map((r) => r.url)).size, 1);
          assert.equal(createCalls, 1);
          const rows =
            await db()`SELECT * FROM bookshop.orders WHERE request_id = ${data.requestId}`;
          assert.equal(rows.length, 1);
          assert.equal(rows[0].amount_total, calculateTotal(2));
          await assert.rejects(
            createCheckout({ ...data, quantity: 1 }),
            /REQUEST_CONFLICT/,
          );
        },
      );
      await t.test(
        "timed-out payment creation is retried with the same durable idempotency key",
        async () => {
          const data = input();
          timeoutNext = true;
          await assert.rejects(createCheckout(data), /timeout/);
          const before = payments.size;
          const result = await createCheckout(data);
          assert.match(result.url, /^https:\/\/www.mollie.com/);
          assert.equal(payments.size, before);
        },
      );
      await t.test(
        "webhook recovers payment ID after process failure; verifies paid state; sends once",
        async () => {
          const data = input();
          timeoutNext = true;
          await assert.rejects(createCheckout(data));
          const payment = payments.get(keys.get(data.requestId)!)!;
          payment.status = "paid";
          const orderId = (await syncPayment(payment.id))!;
          await Promise.all([
            sendConfirmation(orderId),
            sendConfirmation(orderId),
          ]);
          assert.equal(emailCalls, 1);
          const [row] =
            await db()`SELECT * FROM bookshop.orders WHERE id = ${orderId}`;
          assert.equal(row.payment_status, "paid");
          assert.equal(row.amount_paid, calculateTotal(2));
          assert.equal(row.preorder_status, "reserved");
          assert.ok(row.email_sent_at);
          payment.status = "open";
          await syncPayment(payment.id);
          const [stillPaid] =
            await db()`SELECT * FROM bookshop.orders WHERE id = ${orderId}`;
          assert.equal(stillPaid.payment_status, "paid");
          const redirect = new URL(row.payment_request.redirectUrl);
          assert.ok(
            await orderByToken(orderId, redirect.searchParams.get("token")!),
          );
          assert.equal(await orderByToken(orderId, "0".repeat(64)), null);
        },
      );
      await t.test(
        "wrong amount, mode or metadata never records a purchase",
        async () => {
          const data = input();
          await createCheckout(data);
          const payment = payments.get(keys.get(data.requestId)!)!;
          payment.status = "paid";
          payment.amount.value = "0.01";
          await assert.rejects(syncPayment(payment.id), /mismatch/);
          const [row] =
            await db()`SELECT * FROM bookshop.orders WHERE request_id = ${data.requestId}`;
          assert.equal(row.amount_paid, 0);
          assert.notEqual(row.payment_status, "paid");
          await sendConfirmation(row.id);
          assert.equal(emailCalls, 1);
        },
      );
      await t.test(
        "switching to live never reuses or emails an existing test order",
        async () => {
          const data = input();
          await createCheckout(data);
          const payment = payments.get(keys.get(data.requestId)!)!;
          payment.status = "paid";
          const orderId = (await syncPayment(payment.id))!;
          const before = emailCalls;
          const originalKey = process.env.MOLLIE_API_KEY;
          process.env.MOLLIE_API_KEY = "live_fake_never_used_for_network";
          try {
            await assert.rejects(createCheckout(data), /REQUEST_CONFLICT/);
            await sendConfirmation(orderId);
            assert.equal(emailCalls, before);
            const [row] =
              await db()`SELECT email_first_attempt_at, email_sent_at FROM bookshop.orders WHERE id = ${orderId}`;
            assert.equal(row.email_first_attempt_at, null);
            assert.equal(row.email_sent_at, null);
          } finally {
            process.env.MOLLIE_API_KEY = originalKey;
          }
        },
      );
      await t.test(
        "an expired creation window requires reconciliation, not a new payment",
        async () => {
          const data = input();
          timeoutNext = true;
          await assert.rejects(createCheckout(data));
          await db()`UPDATE bookshop.orders SET created_at = now() - interval '2 hours' WHERE request_id = ${data.requestId}`;
          const before = createCalls;
          await assert.rejects(createCheckout(data), /RECONCILIATION_REQUIRED/);
          assert.equal(createCalls, before);
        },
      );
    } finally {
      globalThis.fetch = originalFetch;
      await db().end();
      await new Promise<void>((resolve) => server.close(() => resolve()));
      await pg.close();
    }
  },
);
