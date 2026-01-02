import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlockPageClient } from "./BlockPageClient";
import blocksData from "@/data/blocks.json";
import type { Block } from "@/types/block";

interface BlockPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlockPageProps): Promise<Metadata> {
  const { slug } = await params;
  const block = (blocksData as unknown as Block[]).find((b) => b.id === slug);

  if (!block) {
    return {
      title: "Block Not Found",
    };
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://blocks.trustlesswork.com";
  const blockUrl = `${baseUrl}/blocks/${slug}`;

  return {
    title: block.title,
    description: block.description,
    keywords: block.tags,
    openGraph: {
      title: `${block.title} | Trustless Work Blocks`,
      description: block.description,
      url: blockUrl,
      type: "article",
      tags: block.tags,
    },
    twitter: {
      title: `${block.title} | Trustless Work Blocks`,
      description: block.description,
      card: "summary_large_image",
    },
    alternates: {
      canonical: blockUrl,
    },
  };
}

export default async function BlocksPage({ params }: BlockPageProps) {
  const { slug } = await params;
  const block = (blocksData as unknown as Block[]).find((b) => b.id === slug);

  if (!block) notFound();

  return <BlockPageClient block={block as unknown as Block} />;
}
