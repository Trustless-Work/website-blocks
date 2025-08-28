"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { SiteHeader } from "@/shared/SiteHeader";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import blocksData from "@/data/blocks.json";
import type { Block } from "@/types/block";
import { BlockCard } from "@/shared/BlockCard";
import Image from "next/image";
import { useTheme } from "next-themes";

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

export const Blocks = () => {
  const categories = getUniqueCategories();
  const blocks = blocksData as unknown as Block[];

  // URL-synced search state (?q=)
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState<string>(searchParams.get("q") ?? "");

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const decorativeOpacityClass = !mounted
    ? "opacity-10"
    : theme === "dark"
      ? "opacity-10"
      : "opacity-70";

  // Keep local state in sync if the URL changes externally
  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  // Debounce URL updates for better UX
  useEffect(() => {
    const timeout = setTimeout(() => {
      const value = query.trim();
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }
      const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
      router.replace(newUrl);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, pathname, router, searchParams]);

  // Filter by title, description or tags
  const filteredBlocks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return blocks;
    return blocks.filter((block) => {
      const inTitle = block.title.toLowerCase().includes(q);
      const inDescription = (block.description || "").toLowerCase().includes(q);
      const inTags = (block.tags || []).some((t) =>
        t.toLowerCase().includes(q)
      );
      return inTitle || inDescription || inTags;
    });
  }, [blocks, query]);

  return (
    <>
      <Image
        src="/design/wall.svg"
        alt="Home"
        width={1000}
        height={1000}
        className={`w-1/5 h-auto fixed -left-10 z-[-100] ${decorativeOpacityClass}`}
        quality={100}
      />

      <Image
        src="/design/wall.svg"
        alt="Home"
        width={1000}
        height={1000}
        className={`w-1/5 h-auto fixed -right-50 top-90 z-[-100] ${decorativeOpacityClass}`}
        quality={100}
      />

      <div className="min-h-screen">
        <div className="container py-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Blocks
              </h1>
              <p className="text-muted-foreground">
                Beautifully designed components that you can copy and paste into
                your apps.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative w-full">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, description or tags..."
                  className="pl-8 w-full sm:w-[400px]"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search blocks"
                />
              </div>
            </div>
          </div>

          {/* Tabs for categories */}
          <Tabs defaultValue="all" className="w-full mt-8">
            <div className="overflow-x-auto">
              <TabsList className="flex w-full min-w-[600px] gap-1 pb-3 sm:pb-0">
                <TabsTrigger value="all" className="flex-1">
                  All
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {filteredBlocks.length}
                  </Badge>
                </TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category.toLowerCase().replace(/\s+/g, "-")}
                    className="flex-1 whitespace-nowrap"
                  >
                    <span className="truncate">{category}</span>
                    <Badge
                      variant="secondary"
                      className="ml-2 text-xs shrink-0"
                    >
                      {
                        filteredBlocks.filter((b) => b.category === category)
                          .length
                      }
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Create a reusable component for rendering blocks */}
            {(() => {
              const renderBlocks = (filteredBlocks: Block[]) => (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredBlocks.map((block) => (
                    <BlockCard key={block.id} block={block} />
                  ))}
                </div>
              );

              return (
                <>
                  {/* All blocks tab */}
                  <TabsContent value="all" className="space-y-4 mt-6">
                    {renderBlocks(filteredBlocks)}
                  </TabsContent>

                  {/* Dynamic category tabs */}
                  {categories.map((category) => (
                    <TabsContent
                      key={category}
                      value={category.toLowerCase().replace(/\s+/g, "-")}
                      className="space-y-4 mt-6"
                    >
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold">{category}</h2>
                        <p className="text-muted-foreground">
                          {
                            filteredBlocks.filter(
                              (block) => block.category === category
                            ).length
                          }{" "}
                          components available
                        </p>
                      </div>
                      {renderBlocks(
                        filteredBlocks.filter(
                          (block) => block.category === category
                        )
                      )}
                    </TabsContent>
                  ))}
                </>
              );
            })()}
          </Tabs>
        </div>
      </div>
    </>
  );
};
