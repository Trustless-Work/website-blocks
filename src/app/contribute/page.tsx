import type { Metadata } from "next";
import { Contribute } from "@/modules/contribute/View";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Contribute to Trustless Work Blocks. Add your own React components for blockchain escrows. Open source project welcoming contributions from the community.",
  openGraph: {
    title: "Contribute | Trustless Work Blocks",
    description:
      "Contribute to Trustless Work Blocks. Add your own React components for blockchain escrows. Open source project welcoming contributions.",
    url: "/contribute",
  },
  twitter: {
    title: "Contribute | Trustless Work Blocks",
    description:
      "Contribute to Trustless Work Blocks. Add your own React components for blockchain escrows. Open source project welcoming contributions.",
  },
  alternates: {
    canonical: "/contribute",
  },
};

export default function ContributePage() {
  return <Contribute />;
}
