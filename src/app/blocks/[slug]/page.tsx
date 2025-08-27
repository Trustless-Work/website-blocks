"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { BlockPage } from "@/modules/blocks/SlugView";
import blocksData from "@/data/blocks.json";
import type { Block } from "@/types/block";

interface BlockPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlocksPage({ params }: BlockPageProps) {
  const { slug } = use(params);
  const block = (blocksData as unknown as Block[]).find((b) => b.id === slug);
  if (!block) notFound();
  return <BlockPage block={block as unknown as Block} />;
}
