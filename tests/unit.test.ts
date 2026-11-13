import { test } from "node:test";
import assert from "node:assert/strict";
import { book, absoluteUrl } from "../lib/site";
import { contentPages, publicRoutes } from "../lib/content";
import { bookSchema, pageMetadata } from "../lib/seo";
import {
  checkoutInput,
  calculateTotal,
  validPayment,
  canRetryCreation,
} from "../lib/checkout-validation";
import sitemap from "../app/sitemap";
import robots from "../app/robots";
const input = {
  requestId: "b22cc818-dc03-4e4e-bc55-e0aee5a4a165",
  name: "Test Lezer",
  email: "lezer@example.com",
  street: "Teststraat 12",
  postalCode: "1234 AB",
  city: "Amsterdam",
  country: "NL",
  quantity: 2,
  format: "paperback",
  termsAccepted: true,
};
test("server determines totals from central price; rejects unsupported quantities and formats", () => {
  assert.equal(
    calculateTotal(2),
    book.paperbackPrice * 2 + book.shipping.price,
  );
  for (const quantity of [0, -1, 11, 1.5, NaN])
    assert.throws(() => calculateTotal(quantity));
  assert.equal(checkoutInput.safeParse(input).success, true);
  for (const patch of [
    { amount: 1 },
    { quantity: 0 },
    { quantity: "2" },
    { format: "ebook" },
    { country: "BE" },
    { termsAccepted: false },
    { street: "Zonder nummer" },
    { name: "Naam\r\nBcc: x" },
    { requestId: "bad" },
  ])
    assert.equal(
      checkoutInput.safeParse({ ...input, ...patch }).success,
      false,
    );
});
test("payment identity, amount, currency and mode must all match; redirects are not evidence", () => {
  const order = {
    id: "order-one",
    amount_total: 4500,
    payment_id: "tr_valid",
    payment_mode: "test",
  };
  const payment = {
    id: "tr_valid",
    status: "paid",
    amount: { currency: "EUR", value: "45.00" },
    metadata: { orderId: "order-one" },
    mode: "test",
  };
  assert.equal(validPayment(payment, order), true);
  for (const patch of [
    { id: "tr_other" },
    { metadata: { orderId: "other" } },
    { metadata: null },
    { amount: { currency: "USD", value: "45.00" } },
    { amount: { currency: "EUR", value: "0.01" } },
    { mode: "live" },
  ])
    assert.equal(validPayment({ ...payment, ...patch }, order), false);
});
test("Mollie retries stop before the one-hour idempotency window expires", () => {
  const now = Date.now();
  assert.equal(canRetryCreation(new Date(now - 49 * 60000), now), true);
  assert.equal(canRetryCreation(new Date(now - 50 * 60000), now), false);
  assert.equal(canRetryCreation(new Date(now - 24 * 3600000), now), false);
});
test("all content has unique metadata, self-canonicals and resolvable related routes", () => {
  assert.equal(
    new Set(contentPages.map((p) => p.title)).size,
    contentPages.length,
  );
  assert.equal(
    new Set(contentPages.map((p) => p.description)).size,
    contentPages.length,
  );
  for (const page of contentPages) {
    const metadata = pageMetadata(
      page.title,
      page.description,
      `/${page.slug}`,
    );
    assert.equal(metadata.alternates?.canonical, absoluteUrl(`/${page.slug}`));
    assert.ok(metadata.openGraph && metadata.twitter);
    for (const related of page.related)
      assert.ok(publicRoutes.includes(`/${related}`));
  }
});
test("content links resolve, headings are unique and FAQ answers are present", () => {
  const anchors = new Set(["/#fragment"]);
  for (const page of contentPages)
    for (const section of page.sections)
      if (section.id) anchors.add(`/${page.slug}#${section.id}`);
  assert.equal(
    new Set(contentPages.map((p) => p.heading)).size,
    contentPages.length,
  );
  for (const page of contentPages) {
    assert.ok(page.updated >= page.published);
    const texts = [
      page.intro,
      ...page.sections.flatMap((s) => [
        ...s.paragraphs,
        ...(s.items || []).map((i) => i.text),
        ...(s.after || []),
      ]),
      ...(page.faq || []).map((f) => f.a),
    ];
    for (const text of texts) {
      assert.equal(/\{(?!price|shipping|period)/.test(text), false, text);
      for (const [, , href] of text.matchAll(/\[([^\]]+)\]\(([^)\s]+)\)/g)) {
        if (href.startsWith("https://")) continue;
        const [path] = href.split("#");
        assert.ok(publicRoutes.includes(path), href);
        if (href.includes("#")) assert.ok(anchors.has(href), href);
      }
    }
    for (const item of page.faq || []) assert.ok(item.q && item.a);
  }
});
test("sitemap lists all and only indexable routes; robots references the canonical host", () => {
  assert.deepEqual(
    sitemap().map((p) => p.url),
    publicRoutes.map(absoluteUrl),
  );
  assert.equal(robots().sitemap, absoluteUrl("/sitemap.xml"));
  assert.ok(
    sitemap().every(
      (p) => !p.url.includes("/bestelling/") && !p.url.includes("/api/"),
    ),
  );
});
test("structured data uses real preorder offer and omits unverified social proof and book facts", () => {
  const schema = bookSchema();
  assert.equal(schema.offers.availability, "https://schema.org/PreOrder");
  assert.equal(schema.offers.price, (book.paperbackPrice / 100).toFixed(2));
  assert.equal(schema.author.name, book.author);
  for (const key of ["review", "aggregateRating", "isbn", "numberOfPages"])
    assert.equal(key in schema, false);
});
