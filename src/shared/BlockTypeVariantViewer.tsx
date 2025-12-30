"use client";

import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Eye } from "lucide-react";
import { BlockPreview } from "@/shared/BlockPreview";
import { CodeBlock } from "@/shared/CodeBlock";
import type { Block, EscrowReleaseType, EscrowVariant } from "@/types/block";
import CommingSoon from "./ComingSoon";
import { InitializeEscrowForm } from "@/components/tw-blocks/escrows/single-release/initialize-escrow/form/InitializeEscrow";
import { InitializeEscrowForm as InitializeEscrowFormMultiRelease } from "@/components/tw-blocks/escrows/multi-release/initialize-escrow/form/InitializeEscrow";
import { InitializeEscrowDialog } from "@/components/tw-blocks/escrows/single-release/initialize-escrow/dialog/InitializeEscrow";
import { InitializeEscrowDialog as InitializeEscrowDialogMultiRelease } from "@/components/tw-blocks/escrows/multi-release/initialize-escrow/dialog/InitializeEscrow";
import componentCodes from "@/data/component-codes.json";
import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";
import { EscrowsByRoleTable } from "@/components/tw-blocks/escrows/escrows-by-role/table/EscrowsTable";
import { EscrowsByRoleCards } from "@/components/tw-blocks/escrows/escrows-by-role/cards/EscrowsCards";
import { EscrowsBySignerTable } from "@/components/tw-blocks/escrows/escrows-by-signer/table/EscrowsTable";
import { EscrowsBySignerCards } from "@/components/tw-blocks/escrows/escrows-by-signer/cards/EscrowsCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import blocksData from "@/data/blocks.json";
import { ResolveDisputeForm } from "@/components/tw-blocks/escrows/single-release/resolve-dispute/form/ResolveDispute";
import { ResolveDisputeForm as ResolveDisputeFormMultiRelease } from "@/components/tw-blocks/escrows/multi-release/resolve-dispute/form/ResolveDispute";
import { ResolveDisputeDialog } from "@/components/tw-blocks/escrows/single-release/resolve-dispute/dialog/ResolveDispute";
import { ResolveDisputeDialog as ResolveDisputeDialogMultiRelease } from "@/components/tw-blocks/escrows/multi-release/resolve-dispute/dialog/ResolveDispute";
import { ResolveDisputeButton } from "@/components/tw-blocks/escrows/single-release/resolve-dispute/button/ResolveDispute";
import { ResolveDisputeButton as ResolveDisputeButtonMultiRelease } from "@/components/tw-blocks/escrows/multi-release/resolve-dispute/button/ResolveDispute";
import { UpdateEscrowForm } from "@/components/tw-blocks/escrows/single-release/update-escrow/form/UpdateEscrow";
import { UpdateEscrowForm as UpdateEscrowFormMultiRelease } from "@/components/tw-blocks/escrows/multi-release/update-escrow/form/UpdateEscrow";
import { UpdateEscrowDialog } from "@/components/tw-blocks/escrows/single-release/update-escrow/dialog/UpdateEscrow";
import { UpdateEscrowDialog as UpdateEscrowDialogMultiRelease } from "@/components/tw-blocks/escrows/multi-release/update-escrow/dialog/UpdateEscrow";
import { ReleaseEscrowButton } from "@/components/tw-blocks/escrows/single-release/release-escrow/button/ReleaseEscrow";
import { ReleaseMilestoneButton } from "@/components/tw-blocks/escrows/multi-release/release-milestone/button/ReleaseMilestone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RelatedBlockCard } from "./RelatedBlocks";
import { ApproveMilestoneForm } from "@/components/tw-blocks/escrows/single-multi-release/approve-milestone/form/ApproveMilestone";
import { ApproveMilestoneDialog } from "@/components/tw-blocks/escrows/single-multi-release/approve-milestone/dialog/ApproveMilestone";
import { ApproveMilestoneButton } from "@/components/tw-blocks/escrows/single-multi-release/approve-milestone/button/ApproveMilestone";
import { ChangeMilestoneStatusForm } from "@/components/tw-blocks/escrows/single-multi-release/change-milestone-status/form/ChangeMilestoneStatus";
import { ChangeMilestoneStatusDialog } from "@/components/tw-blocks/escrows/single-multi-release/change-milestone-status/dialog/ChangeMilestoneStatus";
import { ChangeMilestoneStatusButton } from "@/components/tw-blocks/escrows/single-multi-release/change-milestone-status/button/ChangeMilestoneStatus";
import { FundEscrowForm } from "@/components/tw-blocks/escrows/single-multi-release/fund-escrow/form/FundEscrow";
import { FundEscrowDialog } from "@/components/tw-blocks/escrows/single-multi-release/fund-escrow/dialog/FundEscrow";
import { FundEscrowButton } from "@/components/tw-blocks/escrows/single-multi-release/fund-escrow/button/FundEscrow";
import { DisputeEscrowButton } from "@/components/tw-blocks/escrows/single-release/dispute-escrow/button/DisputeEscrow";
import { DisputeMilestoneButton } from "@/components/tw-blocks/escrows/multi-release/dispute-milestone/button/DisputeEscrow";
import { WithdrawRemainingFundsForm } from "@/components/tw-blocks/escrows/multi-release/withdraw-remaining-funds/form/WithdrawRemainingFunds";
import { WithdrawRemainingFundsDialog } from "@/components/tw-blocks/escrows/multi-release/withdraw-remaining-funds/dialog/WithdrawRemainingFunds";
import { WithdrawRemainingFundsButton } from "@/components/tw-blocks/escrows/multi-release/withdraw-remaining-funds/button/WithdrawRemainingFunds";
import { BalanceProgressBar } from "@/components/tw-blocks/escrows/indicators/balance-progress/bar/BalanceProgress";
import { BalanceProgressDonut } from "@/components/tw-blocks/escrows/indicators/balance-progress/donut/BalanceProgress";
import { Dashboard01 } from "@/components/tw-blocks/dashboard/dashboard-01/Dashboard";
import { LoadEscrowForm } from "@/components/tw-blocks/escrows/load-escrow/form/LoadEscrowForm";
import { LoadEscrowDialog } from "@/components/tw-blocks/escrows/load-escrow/dialog/LoadEscrowDialog";
import { LoadEscrowButton } from "@/components/tw-blocks/escrows/load-escrow/button/LoadEscrowButton";

type Props = {
  block: Block;
  activeType: EscrowReleaseType;
  activeVariant: EscrowVariant;
  hasExplicitVariants: boolean;
  variants: EscrowVariant[];
  setActiveVariant: (variant: EscrowVariant) => void;
  syncWithUrl?: boolean;
};

export function BlockTypeVariantViewer({
  block,
  activeType,
  activeVariant,
  hasExplicitVariants,
  variants,
  setActiveVariant,
  syncWithUrl = false,
}: Props) {
  // Get related blocks based on category and tags
  const getRelatedBlocks = useMemo(() => {
    const allBlocks = blocksData as Block[];

    // Score blocks based on similarity
    const scoredBlocks = allBlocks
      .filter((b) => b.id !== block.id) // Exclude current block
      .map((b) => {
        let score = 0;

        // Category match gets high priority
        if (b.category === block.category) {
          score += 10;
        }

        // Tag matches get points
        const currentTags = block.tags || [];
        const candidateTags = b.tags || [];

        const matchingTags = currentTags.filter((tag) =>
          candidateTags.some(
            (candidateTag) => candidateTag.toLowerCase() === tag.toLowerCase()
          )
        );

        score += matchingTags.length * 3;
        if (block.escrowType && b.escrowType) {
          if (block.escrowType === b.escrowType) {
            score += 5;
          } else if (
            (block.escrowType.includes("single-release") &&
              b.escrowType.includes("single-release")) ||
            (block.escrowType.includes("multi-release") &&
              b.escrowType.includes("multi-release"))
          ) {
            score += 2;
          }
        }

        return { block: b, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(({ block }) => block);

    return scoredBlocks;
  }, [block.category, block.id, block.tags, block.escrowType]);

  const renderResult = useMemo(() => {
    const action = block.id.replace(/^(escrows|indicators)-/, "");

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
          form: () => <InitializeEscrowFormMultiRelease />,
          dialog: () => <InitializeEscrowDialogMultiRelease />,
        },
      },
      "approve-milestone": {
        "single-release": {
          form: () => <ApproveMilestoneForm />,
          dialog: () => <ApproveMilestoneDialog />,
          button: () => <ApproveMilestoneButton />,
        },
        "multi-release": {
          form: () => <ApproveMilestoneForm />,
          dialog: () => <ApproveMilestoneDialog />,
          button: () => <ApproveMilestoneButton />,
        },
      },
      "change-milestone-status": {
        "single-release": {
          form: () => <ChangeMilestoneStatusForm />,
          dialog: () => <ChangeMilestoneStatusDialog />,
          button: () => <ChangeMilestoneStatusButton />,
        },
        "multi-release": {
          form: () => <ChangeMilestoneStatusForm />,
          dialog: () => <ChangeMilestoneStatusDialog />,
          button: () => <ChangeMilestoneStatusButton />,
        },
      },
      "fund-escrow": {
        "single-release": {
          form: () => <FundEscrowForm />,
          dialog: () => <FundEscrowDialog />,
          button: () => <FundEscrowButton />,
        },
        "multi-release": {
          form: () => <FundEscrowForm />,
          dialog: () => <FundEscrowDialog />,
          button: () => <FundEscrowButton />,
        },
      },
      "resolve-dispute": {
        "single-release": {
          form: () => <ResolveDisputeForm />,
          dialog: () => <ResolveDisputeDialog />,
          button: () => <ResolveDisputeButton />,
        },
        "multi-release": {
          form: () => <ResolveDisputeFormMultiRelease />,
          dialog: () => <ResolveDisputeDialogMultiRelease />,
          button: () => <ResolveDisputeButtonMultiRelease />,
        },
      },
      "withdraw-remaining-funds": {
        "multi-release": {
          form: () => <WithdrawRemainingFundsForm />,
          dialog: () => <WithdrawRemainingFundsDialog />,
          button: () => <WithdrawRemainingFundsButton />,
        },
      },
      "update-escrow": {
        "single-release": {
          form: () => <UpdateEscrowForm />,
          dialog: () => <UpdateEscrowDialog />,
        },
        "multi-release": {
          form: () => <UpdateEscrowFormMultiRelease />,
          dialog: () => <UpdateEscrowDialogMultiRelease />,
        },
      },
      "release-escrow": {
        "single-release": {
          button: () => <ReleaseEscrowButton />,
        },
        "multi-release": {
          button: () => <ReleaseMilestoneButton />,
        },
      },
      "dispute-escrow": {
        "single-release": {
          button: () => <DisputeEscrowButton />,
        },
        "multi-release": {
          button: () => <DisputeMilestoneButton />,
        },
      },
      "balance-progress": {
        "single-release": {
          bar: () => <BalanceProgressBar />,
          donut: () => <BalanceProgressDonut />,
        },
        "multi-release": {
          bar: () => <BalanceProgressBar />,
          donut: () => <BalanceProgressDonut />,
        },
      },
      "load-escrow": {
        "single-release": {
          form: () => <LoadEscrowForm />,
          dialog: () => <LoadEscrowDialog />,
          button: () => <LoadEscrowButton />,
        },
        "multi-release": {
          form: () => <LoadEscrowForm />,
          dialog: () => <LoadEscrowDialog />,
          button: () => <LoadEscrowButton />,
        },
      },
    };

    let component: React.ReactNode = null;
    let code = "";

    const jsonCodes = componentCodes as Record<
      string,
      string | Record<string, Record<string, string>>
    >;

    if (!hasExplicitVariants) {
      // Simple blocks without variants (e.g., wallet-kit)
      const SimplePreview: Record<string, React.ComponentType | undefined> = {
        "wallet-kit": () => <WalletButton />,
        "escrows-by-role-table": () => (
          <EscrowsByRoleTable syncWithUrl={syncWithUrl} />
        ),
        "escrows-by-role-cards": () => (
          <EscrowsByRoleCards syncWithUrl={syncWithUrl} />
        ),
        "escrows-by-signer-table": () => (
          <EscrowsBySignerTable syncWithUrl={syncWithUrl} />
        ),
        "escrows-by-signer-cards": () => (
          <EscrowsBySignerCards syncWithUrl={syncWithUrl} />
        ),
        "dashboard-dashboard-01": () => <Dashboard01 />,
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
      if (
        typeof jsonCodesByAction === "object" &&
        jsonCodesByAction?.[activeType]?.[activeVariant]
      ) {
        code = jsonCodesByAction[activeType][activeVariant];
      }
    }

    return {
      component,
      code,
    };
  }, [activeType, activeVariant, block]);

  return (
    <Tabs defaultValue="preview" className="w-full" suppressHydrationWarning>
      <TabsContent value="preview" className="mt-4">
        <BlockPreview
          title=""
          rightSlot={
            <div className="flex items-center gap-2">
              {hasExplicitVariants && variants.length > 1 && (
                <div className="flex items-center gap-2">
                  <Select
                    value={activeVariant}
                    onValueChange={(v) => setActiveVariant(v as EscrowVariant)}
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
          showViewportControls
        >
          <div className="flex flex-col gap-6">
            <div className="flex">
              <div
                key={`${activeType}-${activeVariant}`}
                className="flex items-center justify-center w-full p-4 sm:p-10"
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
              {hasExplicitVariants && variants.length > 1 && (
                <div className="flex items-center gap-2">
                  <Select
                    value={activeVariant}
                    onValueChange={(v) => setActiveVariant(v as EscrowVariant)}
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
          showViewportControls={false}
        >
          <CodeBlock code={renderResult.code} language="tsx" />
        </BlockPreview>
      </TabsContent>

      {/* Notes Section */}
      {block.notes && block.notes.length > 0 && block.notes[0] !== "" && (
        <Card className="mt-4 sm:mt-20 w-full">
          <CardHeader>
            <CardTitle>Important Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-start">
              <ul className="text-muted-foreground text-sm mb-2 list-disc list-inside">
                {block.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Required Providers and Blocks Section */}
      <div className="flex flex-col md:flex-row gap-4 mt-4 w-full">
        {block.requiredProviders && (
          <Card className={`w-full ${block.requiredBlocks ? "md:w-1/2" : ""}`}>
            <CardHeader>
              <CardTitle>Required Providers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {block.requiredProviders?.map((provider) => (
                  <div key={provider}>{provider}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {block.requiredBlocks && (
          <Card
            className={`w-full ${block.requiredProviders ? "md:w-1/2" : ""}`}
          >
            <CardHeader>
              <CardTitle>Required Blocks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {block.requiredBlocks?.map((requiredBlock, index) => {
                  if (typeof requiredBlock === "string") {
                    return (
                      <div key={requiredBlock} className="text-sm">
                        {requiredBlock}
                      </div>
                    );
                  }

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <Link
                        href={requiredBlock.url ?? ""}
                        target="_blank"
                        rel="noopener noreferrer  "
                        className="text-sm hover:underline text-primary-500"
                      >
                        {requiredBlock.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Related Blocks Section */}
      <div className="mt-4 sm:mt-20">
        <h1 className="text-lg font-medium mb-4">Related Blocks</h1>
        {getRelatedBlocks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {getRelatedBlocks.map((relatedBlock) => (
              <RelatedBlockCard key={relatedBlock.id} block={relatedBlock} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-muted-foreground text-sm mb-2">
              There are no related blocks for this block.
            </div>
            <div className="text-xs text-muted-foreground">
              Try exploring other blocks with similar categories or tags
            </div>
          </div>
        )}
      </div>
    </Tabs>
  );
}
