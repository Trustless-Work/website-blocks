"use client";

import { CodeBlock } from "@/shared/CodeBlock";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, lazy, Suspense } from "react";
import Link from "next/link";
import { ClickableTitle } from "@/components/ui/ClickableTitle";

// Lazy load the iframe component for better performance
const ExcalidrawDiagram = lazy(() =>
  Promise.resolve({
    default: () => (
      <iframe
        src="https://link.excalidraw.com/readonly/ttyO4GxpTQ7ntlDuvoTv"
        width="100%"
        height="1000px"
        title="Dependencies Diagram"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="no-referrer"
        style={{ border: "none" }}
      />
    ),
  })
);

// Loading skeleton component
const DiagramSkeleton = () => (
  <div className="w-full h-[1000px] bg-muted/30 rounded-md animate-pulse flex items-center justify-center">
    <div className="text-center space-y-2">
      <div className="h-8 w-48 bg-muted rounded mx-auto"></div>
      <div className="h-4 w-32 bg-muted rounded mx-auto"></div>
    </div>
  </div>
);

export const DependenciesView = () => {
  const [showDiagram, setShowDiagram] = useState(false);
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <ClickableTitle
          id="dependent-blocks"
          as="h1"
          className="scroll-m-20 text-4xl font-bold tracking-tight"
        >
          Dependent Blocks
        </ClickableTitle>
        <p className="text-xl text-muted-foreground">
          Some blocks require other blocks to work properly. Make sure to add
          their dependencies before using them.
        </p>

        <Card className="my-4 gap-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
              <Info className="h-4 w-4" />
              Automatic Dependency Resolution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-blue-700 dark:text-blue-300">
              <p>
                Starting with the current version, the CLI automatically resolves
                peer dependencies for each block. When you run{" "}
                <code className="bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded text-sm">
                  trustless-work add {"<block>"}
                </code>
                , the required peer blocks (providers, wallet-kit, tanstack,
                handle-errors, helpers) and shadcn/ui components are installed
                automatically. The manual steps listed below are for reference or
                for users who used the{" "}
                <code className="bg-blue-100 dark:bg-blue-900 px-1 py-0.5 rounded text-sm">
                  --no-install
                </code>{" "}
                flag.
              </p>
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="my-4 gap-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              Important
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p>
                If you don't follow the instructions below, you may run into
                issues with the blocks not working properly.
              </p>
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-16">
        <section id="create-project">
          <ClickableTitle
            id="diagram-of-dependencies"
            as="h2"
            className="scroll-m-20 text-3xl font-semibold tracking-tight mb-2"
          >
            Diagram of Dependencies
          </ClickableTitle>
          <p className="text-lg text-muted-foreground mb-4">
            Some blocks require other blocks to work properly. Make sure to add
            their dependencies before using them.
          </p>

          <div className="w-full flex-col flex justify-center items-center gap-2 mb-4">
            <Button
              variant={showDiagram ? "outline" : "default"}
              size="sm"
              onClick={() => setShowDiagram(!showDiagram)}
              className="flex items-center gap-2 cursor-pointer"
            >
              {showDiagram ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Hide Diagram
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Show Diagram
                </>
              )}
            </Button>
            {!showDiagram && (
              <span className="text-sm text-muted-foreground">
                Click to load the interactive dependencies diagram
              </span>
            )}
          </div>

          {showDiagram && (
            <div className="space-y-4 pt-4 border border-border rounded-md p-4">
              <Suspense fallback={<DiagramSkeleton />}>
                <ExcalidrawDiagram />
              </Suspense>
            </div>
          )}
        </section>

        <section id="groups">
          <ClickableTitle
            id="dependencies-by-block-group"
            as="h2"
            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
          >
            Dependencies by Block Group
          </ClickableTitle>

          <div className="space-y-8 pt-4">
            <Card className="my-2 gap-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
              <CardContent className="pt-4">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  These dependencies are installed automatically when you add the
                  block. You only need to run the manual commands if you used{" "}
                  <code className="bg-amber-100 dark:bg-amber-900 px-1 py-0.5 rounded text-sm">
                    --no-install
                  </code>
                  .
                </p>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <ClickableTitle
                id="escrows-by-signer-and-role"
                as="h3"
                className="scroll-m-20 text-2xl font-semibold tracking-tight"
              >
                Escrows by Signer (
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/escrows-escrows-by-signer-table"
                >
                  Table
                </Link>
                ,{" "}
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/escrows-escrows-by-signer-cards"
                >
                  Cards
                </Link>
                ) & Escrows by Role (
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/escrows-escrows-by-role-table"
                >
                  Table
                </Link>
                ,{" "}
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/escrows-escrows-by-role-cards"
                >
                  Cards
                </Link>
                )
              </ClickableTitle>
              <p className="leading-7 text-muted-foreground">
                These listing/detail blocks depend on several shared modules and
                providers:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    wallet-kit
                  </code>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    providers
                  </code>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    handle-errors
                  </code>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    helpers
                  </code>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    tanstack
                  </code>
                </li>
                <li>
                  <code className="bg-muted mr-2 px-1 py-0.5 rounded text-sm">
                    single-release
                  </code>
                  or
                  <code className="bg-muted mx-2 px-1 py-0.5 rounded text-sm">
                    multi-release
                  </code>
                  or
                  <code className="bg-muted mx-2 px-1 py-0.5 rounded text-sm">
                    single-multi-release
                  </code>
                  // Depending on your needs
                </li>
              </ul>

              <Card className="my-4 gap-2">
                <CardHeader>
                  <CardTitle>Providers to include</CardTitle>
                  <CardDescription>
                    Ensure you include{" "}
                    <strong>
                      all the providers. These blocks need all of them
                    </strong>
                  </CardDescription>
                </CardHeader>
              </Card>

              <div className="pt-2">
                <CodeBlock
                  code={`npx trustless-work add escrows/escrows-by-role/cards
# All peer dependencies (wallet-kit, tanstack, providers, handle-errors, helpers) are installed automatically

# If you also need escrow actions:
npx trustless-work add escrows/single-release   # For single-release escrows
npx trustless-work add escrows/multi-release     # For multi-release escrows
npx trustless-work add escrows/single-multi-release # For fund, approve or change status`}
                />
              </div>
            </div>

            <div className="space-y-3">
              <ClickableTitle
                id="single-release-multi-release-components"
                as="h3"
                className="scroll-m-20 text-2xl font-semibold tracking-tight"
              >
                Single Release & Multi Release components
              </ClickableTitle>
              <p className="leading-7 text-muted-foreground">
                All single-release and multi-release actions (
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/escrows-initialize-escrow"
                >
                  Initialize Escrow
                </Link>
                ,{" "}
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/escrows-fund-escrow"
                >
                  Fund Escrow
                </Link>
                ,{" "}
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/escrows-change-milestone-status"
                >
                  Change Milestone Status
                </Link>
                ,{" "}
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/escrows-approve-milestone"
                >
                  Approve Milestone
                </Link>
                ,{" "}
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/escrows-release-escrow"
                >
                  Release
                </Link>
                ,{" "}
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/escrows-dispute-escrow"
                >
                  Dispute
                </Link>
                ,{" "}
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/escrows-resolve-dispute"
                >
                  Resolve
                </Link>
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/escrows-withdraw-remaining-funds"
                >
                  Withdraw Remaining Funds
                </Link>
                ,{" "}
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/escrows-update-escrow"
                >
                  Update Escrow
                </Link>
                ,{" "}
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/escrows-load-escrow"
                >
                  Load Escrow
                </Link>
                ) require:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    wallet-kit
                  </code>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    providers
                  </code>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    handle-errors
                  </code>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    tanstack
                  </code>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    helpers
                  </code>
                </li>
              </ul>

              <div className="pt-2">
                <CodeBlock
                  code={`npx trustless-work add escrows/single-release
# All peer dependencies (wallet-kit, tanstack, providers, handle-errors, helpers) are installed automatically

npx trustless-work add escrows/multi-release
# Same automatic resolution for multi-release`}
                />
              </div>
            </div>

            <div className="space-y-3">
              <ClickableTitle
                id="indicators-balance-progress"
                as="h3"
                className="scroll-m-20 text-2xl font-semibold tracking-tight"
              >
                Indicators Balance Progress
              </ClickableTitle>
              <p className="leading-7 text-muted-foreground">
                All indicators balance progress (
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/indicators-balance-progress"
                >
                  Balance Progress
                </Link>
                ) require:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    providers
                  </code>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    tanstack
                  </code>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    helpers
                  </code>
                </li>
              </ul>

              <div className="pt-2">
                <CodeBlock
                  code={`npx trustless-work add indicators/balance-progress
# All peer dependencies (providers, tanstack, helpers) are installed automatically`}
                />
              </div>
            </div>

            <div className="space-y-3">
              <ClickableTitle
                id="indicators-balance-progress"
                as="h3"
                className="scroll-m-20 text-2xl font-semibold tracking-tight"
              >
                Dashboard
              </ClickableTitle>
              <p className="leading-7 text-muted-foreground">
                All dashboard (
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/dashboard-dashboard-01"
                >
                  Basic Dashboard
                </Link>
                ) require:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    providers
                  </code>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    tanstack
                  </code>
                </li>
                <li>
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    wallet-kit
                  </code>
                </li>
              </ul>

              <div className="pt-2">
                <CodeBlock
                  code={`npx trustless-work add dashboard/dashboard-01
# All peer dependencies (providers, tanstack, wallet-kit) are installed automatically`}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="providers">
          <ClickableTitle
            id="provider-wrapping"
            as="h2"
            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
          >
            Provider Wrapping (order matters)
          </ClickableTitle>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              Wrap your app with the following providers, in this order. Include
              <code className="bg-muted px-1 py-0.5 rounded text-sm">
                EscrowDialogsProvider
              </code>
              and{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-sm">
                EscrowAmountProvider
              </code>
              when a page uses dialogs or amount context.
            </p>

            <CodeBlock
              code={`import { ReactQueryClientProvider } from "@/components/tw-blocks/providers/ReactQueryClientProvider";
import { TrustlessWorkProvider } from "@/components/tw-blocks/providers/TrustlessWork";
import { WalletProvider } from "@/components/tw-blocks/providers/WalletProvider";
import { EscrowProvider } from "@/components/tw-blocks/providers/EscrowProvider";
import { EscrowDialogsProvider } from "@/components/tw-blocks/providers/EscrowDialogsProvider";
import { EscrowAmountProvider } from "@/components/tw-blocks/providers/EscrowAmountProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>
          <TrustlessWorkProvider>
            <WalletProvider>
              <EscrowProvider>
                <EscrowDialogsProvider>
                  <EscrowAmountProvider>
                    {children}
                  </EscrowAmountProvider>
                </EscrowDialogsProvider>
              </EscrowProvider>
            </WalletProvider>
          </TrustlessWorkProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}`}
              language="tsx"
              filename="app/layout.tsx"
            />
          </div>
        </section>

        <div className="flex flex-col sm:flex-row w-full justify-between gap-4">
          <Link href="/get-started/start-from-scratch">
            <Card className="gap-2 w-full cursor-pointer py-4">
              <CardContent className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <p>Start from Scratch</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/get-started/common-issues">
            <Card className="gap-2 w-full cursor-pointer py-4">
              <CardContent className="flex items-center gap-2">
                <p>Common Issues</p>
                <ArrowRight className="h-4 w-4" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};
