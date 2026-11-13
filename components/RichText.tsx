import Link from "next/link";
import type { ReactNode } from "react";
import { book, site } from "@/lib/site";

const tokens: Record<string, string> = {
  "{price}": site.price,
  "{shipping}": book.shipping.policy,
  "{period}": book.expectedShippingPeriod,
};
const tokenPattern = /\{price\}|\{shipping\}|\{period\}/g;
const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export const fillTokens = (text: string) =>
  text.replace(tokenPattern, (token) => tokens[token]);

/** Plain-text version for structured data: tokens filled, link markup removed. */
export const plainText = (text: string) =>
  fillTokens(text).replace(linkPattern, "$1");

/** Renders editorial text with `[label](href)` links and site tokens. */
export function RichText({ text }: { text: string }) {
  const source = fillTokens(text);
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of source.matchAll(linkPattern)) {
    const [whole, label, href] = match;
    const index = match.index ?? 0;
    if (index > last) nodes.push(source.slice(last, index));
    nodes.push(
      href.startsWith("/") ? (
        <Link prefetch={false} href={href} key={index}>
          {label}
        </Link>
      ) : (
        <a href={href} rel="noopener" key={index}>
          {label}
        </a>
      ),
    );
    last = index + whole.length;
  }
  if (last < source.length) nodes.push(source.slice(last));
  return <>{nodes}</>;
}
