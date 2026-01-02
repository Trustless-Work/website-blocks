"use client";

import { useEffect, useState } from "react";
import { BlockPage } from "@/modules/blocks/SlugView";
import type { Block } from "@/types/block";
import Image from "next/image";
import { useTheme } from "next-themes";
import { StructuredData } from "@/components/StructuredData";

interface BlockPageClientProps {
  block: Block;
}

export function BlockPageClient({ block }: BlockPageClientProps) {
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
      <StructuredData type="Article" block={block} />
      <Image
        src="/design/triangle-one-color.svg"
        alt="Decorative triangle background"
        width={1000}
        height={1000}
        className={`w-1/2 h-auto fixed -right-30 -top-12 z-[-1] ${decorativeOpacityClass}`}
        quality={100}
      />
      <BlockPage block={block} />
    </>
  );
}
