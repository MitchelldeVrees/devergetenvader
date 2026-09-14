import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { publicRoutes } from "../../lib/content";
import { absoluteUrl } from "../../lib/site";
test("every public page has metadata, one h1, schema and functioning navigation", async ({
  page,
  request,
}) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  const links = new Set<string>();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  for (const route of publicRoutes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      absoluteUrl(route),
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "index, follow",
    );
    const title = await page.title();
    const description = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    expect(descriptions.has(description!)).toBe(false);
    descriptions.add(description!);
    for (const link of await page
      .locator('a[href^="/"]')
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")!)))
      links.add(link);
    for (const json of await page
      .locator('script[type="application/ld+json"]')
      .allTextContents())
      expect(JSON.parse(json)["@context"]).toBe("https://schema.org");
  }
  for (const link of links) {
    const url = new URL(link, "http://localhost:3000");
    expect((await request.get(url.pathname)).status(), link).toBe(200);
    if (url.hash) {
      await page.goto(url.pathname);
      expect(await page.locator(url.hash).count(), link).toBe(1);
    }
  }
  expect(errors).toEqual([]);
});
for (const width of [320, 375, 390, 430, 768, 1440]) {
  test(`no horizontal overflow at ${width}px, full homepage and checkout`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/bestellen",
      "/boek-aanstaande-vader",
      "/vader-tijdens-de-bevalling",
    ]) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const overflowing = await page.locator("body *").evaluateAll((nodes) =>
        nodes
          .filter((node) => {
            const r = node.getBoundingClientRect();
            const style = getComputedStyle(node);
            return (
              r.width > 1 &&
              (r.right > innerWidth + 2 || r.left < -2) &&
              style.position !== "absolute" &&
              style.position !== "fixed" &&
              style.visibility !== "hidden"
            );
          })
          .map((n) => `${n.tagName}.${n.className}`),
      );
      expect(overflowing, `${route} at ${width}`).toEqual([]);
      if (route === "/")
        await page.screenshot({
          path: `artifacts/home-${width}.png`,
          fullPage: true,
        });
    }
  });
}
test("keyboard sample, newsletter dialog focus, escape and accessible pages", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/bestellen",
    "/blog",
    "/over-sem",
    "/vader-tijdens-de-bevalling",
  ]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
      route,
    ).toEqual([]);
  }
  await page.goto("/");
  await page.getByRole("button", { name: "Lees verder" }).click();
  await expect(page.locator("#fragment-vervolg")).toBeVisible();
  const opener = page.getByRole("button", {
    name: "Houd mij op de hoogte",
    exact: true,
  });
  await opener.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement?.closest("dialog")),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
});
test("unconfigured checkout cannot take payment and forged success URL never confirms purchase", async ({
  page,
  request,
}) => {
  await page.goto("/bestellen");
  await expect(
    page.getByRole("button", { name: /Pre-order nu · betaal/ }),
  ).toBeDisabled();
  expect(
    (
      await request.post("/api/checkout", {
        headers: { Origin: "https://evil.example" },
        data: {},
      })
    ).status(),
  ).toBe(403);
  expect(
    (
      await request.post("/api/checkout", {
        headers: { Origin: "http://localhost:3000" },
        data: {},
      })
    ).status(),
  ).toBe(503);
  await page.goto("/bestelling/fake?status=paid&token=bad");
  await expect(page.locator("h1")).not.toContainText("bevestigd");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow",
  );
  expect(
    (
      await request.post("/api/payments/webhook", { data: "id=forged" })
    ).status(),
  ).toBe(400);
});
test("sitemap, robots, social image, redirects and true 404", async ({
  request,
}) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  for (const path of publicRoutes) expect(xml).toContain(absoluteUrl(path));
  expect(await (await request.get("/robots.txt")).text()).toContain(
    absoluteUrl("/sitemap.xml"),
  );
  expect((await request.get("/opengraph-image")).status()).toBe(200);
  expect((await request.get("/not-a-real-page")).status()).toBe(404);
  const response = await request.get("/blog", {
    headers: { Host: "devergetenvader.com" },
    maxRedirects: 0,
  });
  expect(response.status()).toBe(301);
  expect(response.headers().location).toBe(absoluteUrl("/blog"));
});
