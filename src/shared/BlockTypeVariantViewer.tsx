"use client";

import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Eye } from "lucide-react";
import { BlockPreview } from "@/shared/BlockPreview";
import { CodeBlock } from "@/shared/CodeBlock";
import { Button } from "@/components/ui/button";
import type { Block, EscrowReleaseType, EscrowVariant } from "@/types/block";
import CommingSoon from "./ComingSoon";
import InitializeEscrowForm from "@/components/tw-blocks/escrows/single-release/initialize-escrow/form/InitializeEscrow";
import InitializeEscrowDialog from "@/components/tw-blocks/escrows/single-release/initialize-escrow/dialog/InitializeEscrow";
import componentCodes from "@/data/component-codes.json";
import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";

type Props = {
  block: Block;
  activeType: EscrowReleaseType;
  activeVariant: EscrowVariant;
};

export function BlockTypeVariantViewer({
  block,
  activeType,
  activeVariant,
}: Props) {
  // No internal state; controlled by parent

  const renderResult = useMemo(() => {
    const action = block.id.replace("escrows-", "");

    const hasExplicitVariants =
      Array.isArray((block as Block).variants) &&
      ((block as Block).variants as EscrowVariant[]).length > 0;

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

    let component: React.ReactNode = null;
    let code = "";

    const jsonCodes = componentCodes as any;

    if (!hasExplicitVariants) {
      // Simple blocks without variants (e.g., wallet-kit)
      const SimplePreview: Record<string, React.ComponentType | undefined> = {
        "wallet-kit": () => <WalletButton />,
      };

      const SimpleComponent = SimplePreview[action];
      component = SimpleComponent ? (
        <SimpleComponent />
      ) : (
        <div className="flex items-center justify-center h-full">
          <CommingSoon />
        </div>
      );

      if (typeof jsonCodes[action] === "string") {
        code = jsonCodes[action] as string;
      }
    } else {
      // Variant-based blocks (Escrows)
      const typeMap = perTypeVariantMap[action]?.[activeType];
      const Component = typeMap?.[activeVariant];
      component = Component ? <Component type={activeType} /> : null;

      const jsonCodesByAction = jsonCodes[action];
      if (jsonCodesByAction?.[activeType]?.[activeVariant]) {
        code = jsonCodesByAction[activeType][activeVariant];
      }
    }

    // Build a friendly filename for display in the Code tab
    const pascalize = (str: string) =>
      str
        .split("-")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join("");

    const defaultFilename = hasExplicitVariants
      ? `components/tw-blocks/escrows/${activeType}/${action}/${activeVariant}/${pascalize(
          action
        )}.tsx`
      : `components/tw-blocks/${action}/index.tsx`;

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
          showViewportControls
        >
          <div className="flex flex-col gap-6">
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
          showViewportControls={false}
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
