import type { Metadata } from "next";
import { Home } from "@/modules/home/Home";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Trustless Work Blocks brings clean, modern escrow components for blockchain — copy and paste into your React apps, fully compatible, open source, and free forever.",
  openGraph: {
    title: "Trustless Work Blocks | React Components for Blockchain Escrows",
    description:
      "Trustless Work Blocks brings clean, modern escrow components for blockchain — copy and paste into your React apps, fully compatible, open source, and free forever.",
    url: "/",
  },
  twitter: {
    title: "Trustless Work Blocks | React Components for Blockchain Escrows",
    description:
      "Trustless Work Blocks brings clean, modern escrow components for blockchain — copy and paste into your React apps, fully compatible, open source, and free forever.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <Home />;
}
