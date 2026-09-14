import "server-only";
import { book } from "./site";
export function checkoutTestMode() {
  return (
    process.env.CHECKOUT_TEST_MODE === "true" &&
    process.env.MOLLIE_API_KEY?.startsWith("test_") === true
  );
}
export function localCheckoutTestMode() {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.CHECKOUT_LOCAL_TEST === "true" &&
    process.env.MOLLIE_API_KEY?.startsWith("test_") === true &&
    /^http:\/\/localhost:\d+$/.test(process.env.CHECKOUT_BASE_URL || "")
  );
}
export function checkoutReady() {
  if (process.env.CHECKOUT_TEST_MODE === "true" && !checkoutTestMode())
    return false;
  return Boolean(
    process.env.CHECKOUT_ENABLED === "true" &&
    process.env.DATABASE_URL &&
    /^(test|live)_/.test(process.env.MOLLIE_API_KEY || "") &&
    (process.env.ORDER_TOKEN_SECRET?.length || 0) >= 32 &&
    (checkoutTestMode() ||
      (process.env.NEXT_PUBLIC_PREORDER_SHIPPING_PERIOD &&
        process.env.RESEND_API_KEY &&
        process.env.RESEND_FROM_EMAIL &&
        process.env.BUSINESS_NAME &&
        process.env.BUSINESS_ADDRESS &&
        process.env.BUSINESS_KVK &&
        process.env.TERMS_APPROVED === "true")) &&
    book.availability !== "unavailable",
  );
}
export function checkoutOrigin() {
  const url = new URL(process.env.CHECKOUT_BASE_URL || book.canonicalDomain);
  if (
    url.protocol !== "https:" &&
    !(process.env.NODE_ENV !== "production" && url.hostname === "localhost")
  )
    throw new Error("HTTPS checkout origin required");
  return url.origin;
}
