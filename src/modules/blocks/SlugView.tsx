import { SiteHeader } from "@/shared/SiteHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/shared/CodeBlock";
import { BlockPreview } from "@/shared/BlockPreview";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blocks2 } from "./blocks";

interface BlockPageProps {
  params: {
    slug: string;
  };
}

export const BlockPage = ({ params }: BlockPageProps) => {
  const block = blocks2[params.slug as keyof typeof blocks2];

  if (!block) {
    notFound();
  }

  // Mock component for preview
  const PreviewComponent = () => (
    <div className="p-8 bg-background min-h-full">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">{block.title}</h3>
        <p className="text-muted-foreground mb-6">{block.description}</p>
        <div className="bg-muted rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Component preview would render here
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="container py-8">
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
            <Button asChild>
              <Link href="#" className="flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in v0
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {block.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Main content */}
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="steps">Steps</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-4 mt-6">
            <BlockPreview title="Component Preview">
              <PreviewComponent />
            </BlockPreview>
          </TabsContent>

          <TabsContent value="code" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Component Code</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Copy and paste the following code into your project.
                </p>
              </div>
              <CodeBlock
                code={block.code}
                language="tsx"
                filename="components/dashboard.tsx"
              />
            </div>
          </TabsContent>

          <TabsContent value="steps" className="space-y-4 mt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Installation Steps
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Follow these steps to add this component to your project.
                </p>
              </div>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
