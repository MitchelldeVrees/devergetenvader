import "server-only";
import { createHmac } from "node:crypto";
import { db } from "./db";
export function sameOrigin(request: Request) {
  return request.headers.get("origin") === new URL(request.url).origin;
}
export async function rateLimit(
  request: Request,
  scope: string,
  limit: number,
) {
  // On Vercel this header is overwritten by the trusted ingress. Do not trust arbitrary forwarding headers.
  const ip = process.env.VERCEL
    ? request.headers.get("x-vercel-forwarded-for") || "unknown"
    : "local";
  const key = createHmac("sha256", process.env.ORDER_TOKEN_SECRET!)
    .update(`${scope}:${ip}`)
    .digest("hex");
  const [row] =
    await db()`INSERT INTO bookshop.rate_limits (key, hits, expires_at) VALUES (${key}, 1, now() + interval '10 minutes')
    ON CONFLICT (key) DO UPDATE SET hits = CASE WHEN rate_limits.expires_at < now() THEN 1 ELSE rate_limits.hits + 1 END,
    expires_at = CASE WHEN rate_limits.expires_at < now() THEN now() + interval '10 minutes' ELSE rate_limits.expires_at END RETURNING hits`;
  return row.hits <= limit;
}
