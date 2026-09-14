"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";
export function PreorderLink({
  children = "Pre-order nu",
  className = "button",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <Link
      prefetch={false}
      href="/bestellen"
      className={className}
      onClick={() => track("click_preorder")}
    >
      {children}
    </Link>
  );
}
