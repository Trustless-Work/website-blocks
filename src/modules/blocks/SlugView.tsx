"use client";

import { SiteHeader } from "@/shared/SiteHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, BookOpen, Eye } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Block, EscrowReleaseType, EscrowVariant } from "@/types/block";
import { BlockTypeVariantViewer } from "@/shared/BlockTypeVariantViewer";
import { CodeBlock } from "@/shared/CodeBlock";

interface BlockPageProps {
  block: Block;
}

export const BlockPage = ({ block }: BlockPageProps) => {
  const availableTypes: EscrowReleaseType[] = useMemo(() => {
    if (Array.isArray(block.types) && block.types.length > 0)
      return block.types as EscrowReleaseType[];
    if (typeof block.escrowType === "string") {
      const parts = block.escrowType
        .split(",")
        .map((p) => p.trim()) as EscrowReleaseType[];
      return parts.filter(Boolean) as EscrowReleaseType[];
    }
    return [] as EscrowReleaseType[];
  }, [block]);

  const showTypeTabs = useMemo(() => {
    const hasBoth =
      availableTypes.includes("single-release") &&
      availableTypes.includes("multi-release");
    const isEscrowUI =
      (block as unknown as Block).category !== "Cards" &&
      (block as unknown as Block).category !== "Table";
    return hasBoth && isEscrowUI;
  }, [availableTypes, block]);

  const variants = useMemo((): EscrowVariant[] => {
    const b = block as unknown as Block;
    if (Array.isArray(b.variants) && b.variants.length > 0) {
      return (b.variants as string[]).filter((v): v is EscrowVariant =>
        ["form", "button", "dialog"].includes(v)
      );
    }
    const inferred: EscrowVariant[] = [];
    const tagSet = new Set((b.tags || []).map((t) => t.toLowerCase()));
    if (tagSet.has("form")) inferred.push("form");
    if (tagSet.has("button")) inferred.push("button");
    if (tagSet.has("dialog")) inferred.push("dialog");
    return inferred.length > 0 ? inferred : (["form"] as EscrowVariant[]);
  }, [block]);

  const hasExplicitVariants = useMemo(() => {
    const b = block as unknown as Block;
    return Array.isArray(b.variants) && b.variants.length > 0;
  }, [block]);

  const [activeType, setActiveType] = useState<EscrowReleaseType>(
    () =>
      (availableTypes.includes("single-release")
        ? "single-release"
        : availableTypes[0]) || "single-release"
  );
  const [activeVariant, setActiveVariant] = useState<EscrowVariant>(
    () => variants[0] || "form"
  );

  const action = useMemo(() => block.id.replace("escrows-", ""), [block.id]);

  const isUnifiedBoth = useMemo(
    () =>
      ["fund-escrow", "approve-milestone", "change-milestone-status"].includes(
        action
      ),
    [action]
  );

  const installationCommand = useMemo(() => {
    const b = block as unknown as Block;
    if (hasExplicitVariants) {
      const byVariant = (b as any).installByVariant as
        | Partial<Record<EscrowVariant, string>>
        | undefined;
      if (byVariant?.[activeVariant]) return byVariant[activeVariant] as string;

      const byType = b.installByTypeAndVariant;
      const cmd = byType?.[activeType]?.[activeVariant];
      if (cmd) return cmd;

      if (isUnifiedBoth) {
        return `npx trustless-work add escrows/single-multi-release/${action}/${activeVariant}`;
      }
      // fallback for escrow actions when variants exist
      return `npx trustless-work add escrows/${activeType}/${action}/${activeVariant}`;
    }
    // If no explicit variants, prefer a single install command provided by JSON
    if (typeof b.install === "string" && b.install.trim().length > 0) {
      return b.install;
    }
    // Otherwise, no install command available
    return "";
  }, [block, activeType, activeVariant, action, hasExplicitVariants]);

  return (
    <div className="min-h-screen">
      <div className="container py-8 max-w-7xl mx-auto">
        {/* Back button */}
        <div className="flex flex-col justify-between md:flex-row gap-2 mb-6">
          <Button variant="ghost" asChild>
            <Link href="/blocks">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to blocks
            </Link>
          </Button>

          <div className="flex flex-col gap-2 md:flex-row">
            {block.docTypeUrl && (
              <Button variant="outline" asChild>
                <Link href={block.docTypeUrl} target="_blank">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View documentation
                </Link>
              </Button>
            )}

            {block.exampleUrl && (
              <Button variant="outline" asChild>
                <Link href={block.exampleUrl} target="_blank">
                  <Eye className="mr-2 h-4 w-4" />
                  View example
                </Link>
              </Button>
            )}
          </div>
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
          <div className="flex items-center justify-between gap-4 flex-wrap">
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
        </div>

        {/* Main content */}
        <div className="w-full">
          {installationCommand && (
            <div className="max-w-3xl mb-10 sm:my-20">
              <div className="space-y-4 mt-10">
                <h3 className="text-2xl font-semibold">Installation</h3>
                <p className="text-sm text-muted-foreground">
                  Before installing the block, make sure you have the required
                  providers and blocks. You can read more in the{" "}
                  <Link
                    href="/get-started/dependencies"
                    className="text-primary-500 font-bold"
                    target="_blank"
                  >
                    dependencies section
                  </Link>{" "}
                  based on the block you are using.
                </p>
                <CodeBlock code={installationCommand} language="bash" />
              </div>
            </div>
          )}

          {isUnifiedBoth ? (
            <div className="flex flex-col gap-3 p-2 rounded-lg">
              <Tabs
                value={activeType}
                onValueChange={(v) => setActiveType(v as EscrowReleaseType)}
                suppressHydrationWarning
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-1 h-10">
                  <TabsTrigger
                    value={activeType}
                    className="text-sm font-medium"
                  >
                    Single & Multi Release
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          ) : (
            showTypeTabs && (
              <div className="flex flex-col gap-3 p-2 rounded-lg">
                <Tabs
                  value={activeType}
                  onValueChange={(v) => setActiveType(v as EscrowReleaseType)}
                  suppressHydrationWarning
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 h-10">
                    <TabsTrigger
                      value="single-release"
                      className="text-sm font-medium"
                    >
                      Single Release
                    </TabsTrigger>
                    <TabsTrigger
                      value="multi-release"
                      className="text-sm font-medium"
                    >
                      Multi Release
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )
          )}

          <BlockTypeVariantViewer
            block={block as unknown as Block}
            activeType={activeType}
            activeVariant={activeVariant}
            hasExplicitVariants={hasExplicitVariants}
            variants={variants}
            setActiveVariant={setActiveVariant}
          />
        </div>
      </div>
    </div>
  );
};
