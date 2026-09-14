// Browser test of our local checkout; payment API is intercepted, so no order is created.
import { chromium, expect } from "@playwright/test";
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || "msedge",
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
// The development server compiles each route on its first visit.
page.setDefaultNavigationTimeout(60000);
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
let calls = 0;
const bodies = [];
let release;
const gate = new Promise((resolve) => {
  release = resolve;
});
await page.route("**/api/checkout", async (route) => {
  calls++;
  bodies.push(route.request().postDataJSON());
  if (calls === 1)
    return route.fulfill({
      status: 502,
      contentType: "application/json",
      body: JSON.stringify({ error: "Tijdelijke testfout. Probeer opnieuw." }),
    });
  await gate;
  return route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ url: "http://localhost:3001/blog" }),
  });
});
try {
  await page.goto("http://localhost:3001/bestellen");
  await page.getByLabel("Naam ontvanger").fill("Fictieve Testlezer");
  await page.getByLabel("Jouw e-mailadres").fill("test@example.com");
  await page.getByLabel("Straat en huisnummer").fill("Teststraat 12");
  await page.getByLabel("Postcode").fill("1234 AB");
  await page.getByLabel("Plaats", { exact: true }).fill("Amsterdam");
  await page.getByLabel("Aantal paperbacks").selectOption("3");
  await page.getByRole("checkbox").check();
  const button = page.getByRole("button", { name: /Pre-order nu.*67,50/ });
  await expect(button).toBeEnabled();
  await button.click();
  await expect(page.locator("#checkout-error")).toContainText(
    "Tijdelijke testfout",
  );
  const retry = page.waitForRequest("**/api/checkout").catch(() => null);
  await page.locator(".checkout-form").evaluate((form) => {
    form.requestSubmit();
    form.requestSubmit();
  });
  await retry;
  await expect(
    page.getByRole("button", { name: "Betaalpagina openen…" }),
  ).toBeDisabled();
  expect(calls).toBe(2); // One failed attempt + exactly one request for the duplicate retry.
  expect(bodies[0].requestId).toBe(bodies[1].requestId);
  expect(bodies[1].quantity).toBe(3);
  expect(bodies[1]).not.toHaveProperty("amount");
  release();
  await page.waitForURL("**/blog");
  expect(errors).toEqual([]);
  await page.goto("http://localhost:3000");
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "artifacts/hero-mobile.png" });
  console.log(
    "Checkout UI passed: quantity/total, accessible error, retry key retained, duplicate submit blocked, redirect.",
  );
} finally {
  release();
  await browser.close();
}
