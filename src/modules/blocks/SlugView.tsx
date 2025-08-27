import { SiteHeader } from "@/shared/SiteHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import blocksData from "@/data/blocks.json";
import type { Block } from "@/types/block";
import { BlockTypeVariantViewer } from "@/shared/BlockTypeVariantViewer";
import { CodeBlock } from "@/shared/CodeBlock";

interface BlockPageProps {
  params: {
    slug: string;
  };
}

export const BlockPage = ({ params }: BlockPageProps) => {
  const block = blocksData.find((b) => b.id === params.slug);

  if (!block) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="container py-8 max-w-7xl mx-auto">
        {/* Back button */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/blocks">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to blocks
            </Link>
          </Button>
        </div>

        {/* Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">
                {block.title}
              </h1>
              <p className="text-muted-foreground">{block.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {block.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
            {block.newBlocks && (
              <Badge variant="default">
                <span className="text-xs">NEW</span>
              </Badge>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="w-full">
          <BlockTypeVariantViewer block={block as unknown as Block} />

          {/* Steps section going vertically down */}
          {block.steps && block.steps.length > 0 && (
            <div className="space-y-4 mt-10">
              <h3 className="text-2xl font-semibold">Installation</h3>
              <p className="text-sm text-muted-foreground">
                Follow these steps to add this component to your project.
              </p>
              <div className="space-y-4">
                {block.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usage section below steps like shadcn */}
          {block.code && (
            <div className="space-y-4 mt-10">
              <h3 className="text-2xl font-semibold">Usage</h3>
              <CodeBlock
                code={block.code}
                language="tsx"
                filename="components/component.tsx"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
