import type { Metadata } from "next";
import { GetStarted } from "@/modules/get-started/View";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Get started with Trustless Work Blocks. Learn how to install, configure, and use React components for blockchain escrows. Complete guide with dependencies, installation steps, and examples.",
  openGraph: {
    title: "Get Started | Trustless Work Blocks",
    description:
      "Get started with Trustless Work Blocks. Learn how to install, configure, and use React components for blockchain escrows.",
    url: "/get-started",
  },
  twitter: {
    title: "Get Started | Trustless Work Blocks",
    description:
      "Get started with Trustless Work Blocks. Learn how to install, configure, and use React components for blockchain escrows.",
  },
  alternates: {
    canonical: "/get-started",
  },
};

export default function GetStartedPage() {
  return <GetStarted />;
}
