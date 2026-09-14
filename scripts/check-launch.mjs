const required = [
  "DATABASE_URL",
  "MOLLIE_API_KEY",
  "ORDER_TOKEN_SECRET",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "NEXT_PUBLIC_PREORDER_SHIPPING_PERIOD",
  "BUSINESS_NAME",
  "BUSINESS_ADDRESS",
  "BUSINESS_KVK",
  "CRON_SECRET",
];
const missing = required.filter((key) => !process.env[key]);
if (process.env.CHECKOUT_TEST_MODE === "true")
  missing.push("CHECKOUT_TEST_MODE=false for production sales");
if (process.env.CHECKOUT_ENABLED !== "true")
  missing.push("CHECKOUT_ENABLED=true");
if (process.env.TERMS_APPROVED !== "true")
  missing.push("TERMS_APPROVED=true (after reviewing terms)");
if ((process.env.ORDER_TOKEN_SECRET?.length || 0) < 32)
  missing.push("ORDER_TOKEN_SECRET of at least 32 characters");
if (!process.env.MOLLIE_API_KEY?.startsWith("live_"))
  missing.push("live Mollie key for production");
console.log(
  missing.length
    ? `Not ready:\n${missing.map((key) => `- ${key}`).join("\n")}`
    : "Configuration present. Complete the live test and deployment checklist in SEO_SETUP.md.",
);
process.exitCode = missing.length ? 1 : 0;
