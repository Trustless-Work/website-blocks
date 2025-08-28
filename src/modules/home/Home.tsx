"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import blocksData from "@/data/blocks.json";
import type { Block } from "@/types/block";
import { BlockCard } from "@/shared/BlockCard";
import Image from "next/image";
import { useTheme } from "next-themes";
import * as React from "react";

// Extract unique categories from blocks data
const getUniqueCategories = () => {
  const blocks = blocksData as unknown as Block[];
  const categories = [...new Set(blocks.map((block) => block.category))];
  const categoryOrder = ["Escrows", "Wallet", "Table", "Cards"];
  return categories.sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.localeCompare(b);
  });
};

// Get category stats
const getCategoryStats = () => {
  const stats: Record<string, number> = {};
  const blocks = blocksData as unknown as Block[];
  blocks.forEach((block) => {
    stats[block.category] = (stats[block.category] || 0) + 1;
  });
  return stats;
};

export const Home = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const decorativeOpacityClass = !mounted
    ? "opacity-10"
    : theme === "dark"
      ? "opacity-10"
      : "opacity-30";

  const categories = getUniqueCategories();
  const categoryStats = getCategoryStats();

  // Show specific categories for home page: Escrows, Single Release, and Wallet
  const homeCategories = ["Escrows", "Wallet", "Table", "Cards"].filter(
    (category) => categories.includes(category)
  );

  // Get the latest new block for the badge
  const blocks = blocksData as unknown as Block[];
  const latestNewBlock = blocks.find((block) => block.newBlocks === true);
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

      <Image
        src="/design/wall-color.svg"
        alt="Home"
        width={1000}
        height={1000}
        className={`w-1/3 h-auto fixed -left-10 z-[-100] ${decorativeOpacityClass}`}
        quality={100}
      />

      {/* Hero Section */}
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center">
          <Badge variant="outline" className="mb-4">
            {latestNewBlock
              ? `New ${latestNewBlock.title} →`
              : "New Components →"}
          </Badge>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Building Blocks for the Web
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Trustless Work Blocks brings clean, modern escrow components for
            blockchain — copy and paste into your React apps, fully compatible,
            open source, and free forever.
          </p>
          <div className="flex flex-col gap-4 mt-6 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/blocks">
                Browse Blocks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contribute">Add a block</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blocks Preview Section */}
      <section className="space-y-6 my-12 md:my-24">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
            Browse Blocks
          </h2>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Explore our collection of components organized by category
          </p>
        </div>

        <Tabs
          defaultValue={
            homeCategories[0]?.toLowerCase().replace(/\s+/g, "-") || "all"
          }
          className="w-full"
        >
          <div className="overflow-x-auto">
            <TabsList className="flex w-full min-w-[400px] gap-1 mb-2 sm:mb-0">
              {homeCategories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category.toLowerCase().replace(/\s+/g, "-")}
                  className="flex-1 whitespace-nowrap"
                >
                  <span className="truncate">{category}</span>
                  <Badge variant="secondary" className="ml-2 text-xs shrink-0">
                    {categoryStats[category]}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Dynamic category tabs */}
          {homeCategories.map((category) => {
            const categoryBlocks = blocks
              .filter((block) => block.category === category)
              .sort((a, b) => {
                // Prioritize new blocks
                if (a.newBlocks && !b.newBlocks) return -1;
                if (!a.newBlocks && b.newBlocks) return 1;
                return 0;
              })
              .slice(0, 3); // Show max 3 blocks per category on home page

            return (
              <TabsContent
                key={category}
                value={category.toLowerCase().replace(/\s+/g, "-")}
                className="space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryBlocks.map((block) => (
                    <BlockCard key={block.id} block={block} />
                  ))}
                </div>

                <div className="flex justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/blocks">
                      Browse all blocks <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </section>
    </>
  );
};
