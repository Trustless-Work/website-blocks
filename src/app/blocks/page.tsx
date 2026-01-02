import type { Metadata } from "next";
import { Suspense } from "react";
import { Blocks } from "@/modules/blocks/View";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Browse Blocks",
  description:
    "Explore our collection of React components for blockchain escrows. Browse by category: Escrows, Wallet, Table, and Cards. Copy and paste ready-to-use components into your React apps.",
  openGraph: {
    title: "Browse Blocks | Trustless Work Blocks",
    description:
      "Explore our collection of React components for blockchain escrows. Browse by category: Escrows, Wallet, Table, and Cards.",
    url: "/blocks",
  },
  twitter: {
    title: "Browse Blocks | Trustless Work Blocks",
    description:
      "Explore our collection of React components for blockchain escrows. Browse by category: Escrows, Wallet, Table, and Cards.",
  },
  alternates: {
    canonical: "/blocks",
  },
};

export default function BlocksPage() {
  return (
    <Suspense fallback={null}>
      <Blocks />
    </Suspense>
  );
}
