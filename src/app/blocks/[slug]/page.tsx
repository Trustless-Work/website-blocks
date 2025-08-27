import { BlockPage } from "@/modules/blocks/SlugView";
import { notFound } from "next/navigation";
import blocksData from "@/data/blocks.json";
import type { Block } from "@/types/block";

interface BlockPageProps {
  params: {
    slug: string;
  };
}

export default function BlocksPage({ params }: BlockPageProps) {
  const block = (blocksData as unknown as Block[]).find(
    (b) => b.id === params.slug
  );
  if (!block) notFound();
  return <BlockPage block={block as unknown as Block} />;
}
