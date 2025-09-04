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
import { Info, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState, lazy, Suspense } from "react";
import Link from "next/link";

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
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Dependent Blocks
        </h1>
        <p className="text-xl text-muted-foreground">
          Some blocks require other blocks to work properly. Make sure to add
          their dependencies before using them.
        </p>

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
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-2">
            Diagram of Dependencies
          </h2>
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
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Dependencies by Block Group
          </h2>

          <div className="space-y-8 pt-4">
            <div className="space-y-3">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
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
              </h3>
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
                  code={`# Quick install examples
npx trustless-work add wallet-kit
npx trustless-work add escrows/single-release # If you need single-release escrows
npx trustless-work add escrows/multi-release # If you need multi-release escrows
npx trustless-work add escrows/single-multi-release # If you need fund, approve or change status
npx trustless-work add tanstack

# If you skipped the init command, add these providers
npx trustless-work add providers # All of them are required to these blocks

# Optional utility modules
npx trustless-work add handle-errors
npx trustless-work add helpers`}
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Single Release & Multi Release components
              </h3>
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
                ,{" "}
                <Link
                  className="text-primary-500 font-bold cursor-pointer mx-1"
                  target="_blank"
                  href="/blocks/escrows-update-escrow"
                >
                  Update Escrow
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
              </ul>

              <div className="pt-2">
                <CodeBlock
                  code={`# Add essentials for single-release flows
npx trustless-work add wallet-kit
npx trustless-work add tanstack

# If you skipped the init command, add these providers
npx trustless-work add providers # Only need Wallet, TrustlessWork, Escrow and ReactQueryClient

# Optional utility modules
npx trustless-work add handle-errors
npx trustless-work add helpers`}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="providers">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Provider Wrapping (order matters)
          </h2>
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
import { WalletProvider } from "@/components/tw-blocks/wallet-kit/WalletProvider";
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

        <div className="flex flex-col sm:flex-row w-full justify-start gap-4">
          <Link href="/get-started/start-from-scratch">
            <Card className="gap-2 w-full cursor-pointer py-4">
              <CardContent className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <p>Start from Scratch</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};
