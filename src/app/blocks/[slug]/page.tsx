"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { BlockPage } from "@/modules/blocks/SlugView";
import blocksData from "@/data/blocks.json";
import type { Block } from "@/types/block";
import Image from "next/image";
import { useTheme } from "next-themes";

interface BlockPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlocksPage({ params }: BlockPageProps) {
  const { slug } = use(params);
  const block = (blocksData as unknown as Block[]).find((b) => b.id === slug);

  if (!block) notFound();

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const decorativeOpacityClass = !mounted
    ? "opacity-10"
    : theme === "dark"
      ? "opacity-10"
      : "opacity-30";

  return (
    <>
      <Image
        src="/design/triangle-one-color.svg"
        alt="Home"
        width={1000}
        height={1000}
        className={`w-1/2 h-auto fixed -right-30 -top-12 z-[-1] ${decorativeOpacityClass}`}
        quality={100}
      />
      <BlockPage block={block as unknown as Block} />
    </>
  );
}
