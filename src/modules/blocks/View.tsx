import { Search } from "lucide-react";
import { SiteHeader } from "@/shared/SiteHeader";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import blocksData from "@/data/blocks.json";
import type { Block } from "@/types/block";
import { BlockCard } from "@/shared/BlockCard";

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

export const Blocks = () => {
  const categories = getUniqueCategories();
  const categoryStats = getCategoryStats();
  const blocks = blocksData as unknown as Block[];

  return (
    <div className="min-h-screen">
      <SiteHeader />

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
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blocks..."
                className="pl-8 w-full sm:w-[300px]"
              />
            </div>
          </div>
        </div>

        {/* Tabs for categories */}
        <Tabs defaultValue="all" className="w-full mt-8">
          <div className="overflow-x-auto">
            <TabsList className="flex w-full min-w-[600px] gap-1">
              <TabsTrigger value="all" className="flex-1">
                All
                <Badge variant="secondary" className="ml-2 text-xs">
                  {blocksData.length}
                </Badge>
              </TabsTrigger>
              {categories.map((category) => (
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
                  {renderBlocks(blocks)}
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
                          blocksData.filter(
                            (block) => block.category === category
                          ).length
                        }{" "}
                        components available
                      </p>
                    </div>
                    {renderBlocks(
                      blocks.filter((block) => block.category === category)
                    )}
                  </TabsContent>
                ))}
              </>
            );
          })()}
        </Tabs>
      </div>
    </div>
  );
};
