"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Code2, Eye } from "lucide-react";
import { BlockPreview } from "@/shared/BlockPreview";
import { CodeBlock } from "@/shared/CodeBlock";
import type { Block, EscrowReleaseType, EscrowVariant } from "@/types/block";
import CommingSoon from "./ComingSoon";
import InitializeEscrowForm from "@/components/tw-blocks/escrows/single-release/initialize-escrow/form/InitializeEscrow";
import InitializeEscrowDialog from "@/components/tw-blocks/escrows/single-release/initialize-escrow/dialog/InitializeEscrow";
import componentCodes from "@/data/component-codes.json";

type Props = { block: Block };

export function BlockTypeVariantViewer({ block }: Props) {
  const availableTypes: EscrowReleaseType[] = useMemo(() => {
    if (Array.isArray(block.types) && block.types.length > 0)
      return block.types as EscrowReleaseType[];
    if (typeof block.escrowType === "string") {
      const parts = block.escrowType
        .split(",")
        .map((p) => p.trim()) as EscrowReleaseType[];
      return parts.filter(Boolean) as EscrowReleaseType[];
    }
    return [];
  }, [block]);

  const showTypeTabs = useMemo(() => {
    const hasBoth =
      availableTypes.includes("single-release") &&
      availableTypes.includes("multi-release");
    const isEscrowUI = block.category !== "Cards" && block.category !== "Table";
    return hasBoth && isEscrowUI;
  }, [availableTypes, block.category]);

  const variants = useMemo((): EscrowVariant[] => {
    if (Array.isArray(block.variants) && block.variants.length > 0) {
      return (block.variants as string[]).filter((v): v is EscrowVariant =>
        ["form", "button", "dialog"].includes(v)
      );
    }

    const inferred: EscrowVariant[] = [];
    const tagSet = new Set((block.tags || []).map((t) => t.toLowerCase()));

    if (tagSet.has("form")) inferred.push("form");
    if (tagSet.has("button")) inferred.push("button");
    if (tagSet.has("dialog")) inferred.push("dialog");

    const result =
      inferred.length > 0 ? inferred : (["form"] as EscrowVariant[]);

    return result;
  }, [block]);

  const [activeType, setActiveType] = useState<EscrowReleaseType>(() =>
    availableTypes.includes("single-release")
      ? "single-release"
      : availableTypes[0] || "single-release"
  );
  const [activeVariant, setActiveVariant] = useState<EscrowVariant>(
    () => variants[0] || "form"
  );

  useEffect(() => {
    if (variants.length > 0 && !variants.includes(activeVariant)) {
      setActiveVariant(variants[0]);
    }
  }, [variants, activeVariant]);

  useEffect(() => {
    if (variants.length > 0 && !variants.includes(activeVariant)) {
      setActiveVariant(variants[0]);
    }
  }, [variants, activeVariant]);

  const renderResult = useMemo(() => {
    const action = block.id.replace("escrows-", "");

    // Per-type and per-variant demo components (clean, no inline code)
    const perTypeVariantMap: Partial<
      Record<
        string,
        Partial<
          Record<
            EscrowReleaseType,
            Partial<
              Record<
                EscrowVariant,
                React.ComponentType<{ type: EscrowReleaseType }>
              >
            >
          >
        >
      >
    > = {
      "initialize-escrow": {
        "single-release": {
          form: () => <InitializeEscrowForm />,
          dialog: () => <InitializeEscrowDialog />,
        },
        "multi-release": {
          form: () => (
            <div className="flex items-center justify-center h-full">
              <CommingSoon />
            </div>
          ),
          dialog: () => (
            <div className="flex items-center justify-center h-full">
              <CommingSoon />
            </div>
          ),
          button: () => (
            <div className="flex items-center justify-center h-full">
              <CommingSoon />
            </div>
          ),
        },
      },
      "approve-milestone": {
        "single-release": {
          form: () => (
            <h1 className="text-xl font-semibold">Approve • Single • Form</h1>
          ),
          dialog: () => (
            <h1 className="text-xl font-semibold">Approve • Single • Dialog</h1>
          ),
          button: () => (
            <h1 className="text-xl font-semibold">Approve • Single • Button</h1>
          ),
        },
        "multi-release": {
          form: () => (
            <h1 className="text-xl font-semibold">Approve • Multi • Form</h1>
          ),
          dialog: () => (
            <h1 className="text-xl font-semibold">Approve • Multi • Dialog</h1>
          ),
          button: () => (
            <h1 className="text-xl font-semibold">Approve • Multi • Button</h1>
          ),
        },
      },
      "fund-escrow": {
        "single-release": {
          form: () => (
            <h1 className="text-xl font-semibold">Fund • Single • Form</h1>
          ),
          dialog: () => (
            <h1 className="text-xl font-semibold">Fund • Single • Dialog</h1>
          ),
          button: () => (
            <h1 className="text-xl font-semibold">Fund • Single • Button</h1>
          ),
        },
        "multi-release": {
          form: () => (
            <h1 className="text-xl font-semibold">Fund • Multi • Form</h1>
          ),
          dialog: () => (
            <h1 className="text-xl font-semibold">Fund • Multi • Dialog</h1>
          ),
          button: () => (
            <h1 className="text-xl font-semibold">Fund • Multi • Button</h1>
          ),
        },
      },
    };

    const typeMap = perTypeVariantMap[action]?.[activeType];
    const Component = typeMap?.[activeVariant];

    // Get component
    const component = Component ? <Component type={activeType} /> : null;

    // Get code from JSON file first, then fallback to block data
    let code = "";
    const jsonCodes = componentCodes as any;
    const jsonCodesByAction = jsonCodes[action];
    if (jsonCodesByAction?.[activeType]?.[activeVariant]) {
      code = jsonCodesByAction[activeType][activeVariant];
    } else {
      // Fallback to block data if not found in JSON
      const byType = block.codeByTypeAndVariant?.[activeType];
      if (byType && byType[activeVariant]) {
        code = byType[activeVariant] as string;
      } else if (byType) {
        const anyCode = Object.values(byType).find(Boolean) as
          | string
          | undefined;
        code = anyCode || block.code || "";
      } else {
        code = block.code || "";
      }
    }

    // Build a friendly filename for display in the Code tab
    const pascalize = (str: string) =>
      str
        .split("-")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join("");

    const defaultFilename = `components/tw-blocks/escrows/${activeType}/${action}/${activeVariant}/${pascalize(
      action
    )}.tsx`;

    let filename = defaultFilename;
    if (action === "initialize-escrow") {
      if (activeVariant === "form") {
        filename = `components/tw-blocks/escrows/${activeType}/initialize-escrow/form/InitializeEscrow.tsx`;
      } else if (activeVariant === "dialog") {
        filename = `components/tw-blocks/escrows/${activeType}/initialize-escrow/dialog/InitializeEscrow.tsx`;
      }
    }

    return {
      component,
      code,
      filename,
    };
  }, [activeType, activeVariant, block]);

  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsContent value="preview" className="mt-4">
        <BlockPreview
          title=""
          rightSlot={
            <div className="flex items-center gap-2">
              {variants.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-end">
                    <Select
                      value={activeVariant}
                      onValueChange={(v) =>
                        setActiveVariant(v as EscrowVariant)
                      }
                    >
                      <SelectTrigger className="w-[180px] cursor-pointer">
                        <SelectValue placeholder="Select variant" />
                      </SelectTrigger>
                      <SelectContent>
                        {variants.map((v) => (
                          <SelectItem
                            key={v}
                            value={v}
                            className="cursor-pointer"
                          >
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <TabsList className="h-8">
                <TabsTrigger value="preview" className="h-7 px-2">
                  <Eye className="h-3.5 w-3.5" />
                </TabsTrigger>
                <TabsTrigger value="code" className="h-7 px-2">
                  <Code2 className="h-3.5 w-3.5" />
                </TabsTrigger>
              </TabsList>
            </div>
          }
        >
          <div className="flex flex-col gap-6">
            {showTypeTabs && (
              <div className="flex flex-col gap-3 p-2 rounded-lg">
                <Tabs
                  value={activeType}
                  onValueChange={(v) => setActiveType(v as EscrowReleaseType)}
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
            )}

            <div className="flex">
              <div
                key={`${activeType}-${activeVariant}`}
                className="flex items-center justify-center w-full p-10"
              >
                {renderResult.component}
              </div>
            </div>
          </div>
        </BlockPreview>
      </TabsContent>

      <TabsContent value="code" className="mt-4">
        <BlockPreview
          title=""
          rightSlot={
            <div className="flex items-center gap-2">
              {variants.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-end">
                    <Select
                      value={activeVariant}
                      onValueChange={(v) =>
                        setActiveVariant(v as EscrowVariant)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select variant" />
                      </SelectTrigger>
                      <SelectContent>
                        {variants.map((v) => (
                          <SelectItem key={v} value={v}>
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              <TabsList className="h-8">
                <TabsTrigger value="preview" className="h-7 px-2">
                  <Eye className="h-3.5 w-3.5" />
                </TabsTrigger>
                <TabsTrigger value="code" className="h-7 px-2">
                  <Code2 className="h-3.5 w-3.5" />
                </TabsTrigger>
              </TabsList>
            </div>
          }
        >
          <CodeBlock
            code={renderResult.code}
            language="tsx"
            filename={renderResult.filename}
          />
        </BlockPreview>
      </TabsContent>
    </Tabs>
  );
}
