"use client";

import { CodeBlock } from "@/shared/CodeBlock";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ImportIcon,
  Info,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ClickableTitle } from "@/components/ui/ClickableTitle";

export const StartFromScratchView = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <ClickableTitle
          id="escrows-single-release-lifecycle"
          as="h1"
          className="scroll-m-20 text-4xl font-bold tracking-tight"
        >
          Escrow's Single Release Lifecycle
        </ClickableTitle>
        <p className="text-xl text-muted-foreground">
          Step by Step Guide to implement Escrow's Single Release Lifecycle
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
                It does not work for a real use case, only for testing purposes.
                But if you want to implement it, you can use the code below as a
                reference and customize it to your needs.
              </p>
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <section id="create-project">
        <ClickableTitle
          id="create-nextjs-project"
          as="h2"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
        >
          Create a Next.js Project
        </ClickableTitle>
        <div className="space-y-4 pt-4">
          <p className="leading-7">
            Start by creating a new Next.js project with TypeScript and Tailwind
            CSS. In order to make easier the setup, please use the path alias
            with "@/":
          </p>

          <CodeBlock code="npx create-next-app@latest" />

          <p className="leading-7">Navigate to your project directory:</p>

          <CodeBlock code="cd my-trustless-app" />
        </div>
      </section>

      <section id="installation">
        <ClickableTitle
          id="install-trustless-work-blocks"
          as="h2"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
        >
          Install Trustless Work Blocks
        </ClickableTitle>
        <div className="space-y-4 pt-4">
          <p className="leading-7">Install the main library package:</p>

          <Tabs defaultValue="npm" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="npm">npm</TabsTrigger>
            </TabsList>
            <TabsContent value="npm">
              <CodeBlock code="npm install @trustless-work/blocks" />
            </TabsContent>
          </Tabs>

          <h3
            id="run-cli-setup"
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
          >
            Run the CLI Setup
          </h3>

          <p className="leading-7">
            Initialize your project with the Trustless Work CLI:
          </p>

          <CodeBlock code="npx trustless-work init" />

          <Card className="my-4 gap-2">
            <CardHeader>
              <CardTitle>What the init command does:</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Installs shadcn/ui components (with interactive prompts)
                </li>
                <li>
                  Installs required dependencies: @tanstack/react-query,
                  @trustless-work/escrow, axios, zod, react-hook-form,
                  @creit.tech/stellar-wallets-kit, react-day-picker, etc.
                </li>
                <li>
                  Creates{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    .twblocks.json
                  </code>{" "}
                  configuration file
                </li>
                <li>
                  Optionally wires providers into your Next.js{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    app/layout.tsx
                  </code>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between gap-2">
          <h2
            id="environment-configuration"
            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
          >
            Environment Configuration
          </h2>
          <Link
            href="https://docs.trustlesswork.com/trustless-work/developer-resources/authentication/request-api-key"
            target="_blank"
          >
            <Button
              variant="outline"
              size="icon"
              className="w-full px-3 cursor-pointer"
            >
              <ExternalLink className="h-6 w-6" /> Documentation
            </Button>
          </Link>
        </div>
        <div className="space-y-4 pt-4">
          <p className="leading-7">
            Create a{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              .env
            </code>{" "}
            file in your project root:
          </p>

          <CodeBlock
            code={`# Required: Your Trustless Work API key 
NEXT_PUBLIC_API_KEY=your_api_key_here`}
            filename=".env"
          />
        </div>
      </section>

      <section id="add-wallet-connectivity">
        <h2
          id="add-wallet-connectivity"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
        >
          Add Wallet Connectivity
        </h2>
        <div className="space-y-4 pt-4">
          <p className="leading-7">Add wallet connectivity to your app:</p>

          <CodeBlock code="npx trustless-work add wallet-kit" />

          <h3
            id="wrap-app-wallet-provider"
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
          >
            Wrap your app with the WalletProvider:
          </h3>

          <p className="leading-7">
            Wrap your app with the WalletProvider in your layout.tsx:
          </p>

          <CodeBlock
            code={`return (
    <WalletProvider>{children}</WalletProvider> 
);
`}
            language="tsx"
            filename="app/layout.tsx"
          />

          <h3
            id="example-usage-wallet-page"
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
          >
            Example usage in a page:
          </h3>

          <p className="leading-7">Add wallet connectivity to your app:</p>

          <CodeBlock
            code={`"use client";

import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="flex justify-between items-center w-full">
        <h2 className="text-2xl font-bold">Trustless Work</h2>

        {/* Wallet Button */}
        <WalletButton />
      </header>
    </div>
  );
}
`}
            language="tsx"
            filename="app/page.tsx"
          />
        </div>
      </section>

      <section>
        <h2
          id="add-helpers"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
        >
          Add Helpers
        </h2>
        <div className="space-y-4 pt-4">
          <p className="leading-7">Add helpers to your app:</p>

          <CodeBlock code="npx trustless-work add helpers" />
        </div>
      </section>

      <section>
        <h2
          id="add-tanstack-query"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
        >
          Add Tanstack Query
        </h2>
        <div className="space-y-4 pt-4">
          <p className="leading-7">Add Tanstack Query to your app:</p>

          <CodeBlock code="npx trustless-work add tanstack" />
        </div>
      </section>

      <section>
        <h2
          id="add-handle-errors"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
        >
          Add Handle Errors
        </h2>
        <div className="space-y-4 pt-4">
          <p className="leading-7">Add Handle Errors to your app:</p>

          <CodeBlock code="npx trustless-work add handle-errors" />
        </div>
      </section>

      <section>
        <h2
          id="add-providers"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
        >
          Add Providers (If you skipped the init command)
        </h2>
        <div className="space-y-4 pt-4">
          <p className="leading-7">Add Providers to your app:</p>

          <CodeBlock code="npx trustless-work add providers" />
        </div>
      </section>

      <section>
        <h2
          id="add-single-release-escrows"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
        >
          Add Single Release Escrows Components
        </h2>
        <div className="space-y-4 pt-4">
          <p className="leading-7">Add Single Release Escrows to your app:</p>

          <CodeBlock code="npx trustless-work add escrows/single-release" />
        </div>
      </section>

      <section>
        <h2
          id="add-single-multi-release-escrows"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
        >
          Add Single-Multi Release Escrows Components
        </h2>
        <div className="space-y-4 pt-4">
          <p className="leading-7">
            Add Single-Multi Release Escrows to your app:
          </p>

          <CodeBlock code="npx trustless-work add escrows/single-multi-release" />
        </div>
      </section>

      <section>
        <h2
          id="add-escrows-by-role-cards"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
        >
          Add Escrows by Role Cards
        </h2>
        <div className="space-y-4 pt-4">
          <p className="leading-7">Add Escrows by Role Cards to your app:</p>

          <CodeBlock code="npx trustless-work add escrows/escrows-by-role/cards" />

          <h3
            id="import-actions"
            className="flex items-center gap-2 scroll-m-20 text-2xl font-semibold tracking-tight"
          >
            <ImportIcon className="h-4 w-4" /> Import Actions
          </h3>

          <p className="leading-7">
            In the code, there are some actions commented out. You can uncomment
            them and import them from the single-release block.{" "}
            <span className="font-bold">
              See the notes in the escrows by role or by signer components.
            </span>
          </p>

          <h3
            id="commented-out-code"
            className="flex items-center gap-2 scroll-m-20 text-2xl font-semibold tracking-tight"
          >
            Commented Out Code
          </h3>

          <CodeBlock
            code={`return (
    <div className="flex items-start justify-start flex-col gap-2 w-full">
      {/* You can add the buttons here, using the buttons from the blocks. These actions are conditional based on the escrow flags and the user roles. */}
      {hasConditionalButtons && (
        <div className="flex flex-col gap-2 w-full">
          {/* UpdateEscrowDialog component should be rendered based on the escrow type. It means that if the selectedEscrow.type is "single-release", then the UpdateEscrowDialog (from the single-release block) component should be rendered. If the selectedEscrow.type is "multi-release", then the UpdateEscrowDialog (from the multi-release block) component should be rendered. */}
          {/* {shouldShowEditButton && <UpdateEscrowDialog />} */}

          {/* Works only with single-release escrows */}
          {/* Only appears if the escrow has balance */}
          {/* {shouldShowDisputeButton && <DisputeEscrowButton />} */}

          {/* Works only with single-release escrows */}
          {/* Only appears if the escrow is disputed */}
          {/* {shouldShowResolveButton && <ResolveDisputeDialog />} */}

          {/* Works only with single-release escrows */}
          {/* Only appears if all the milestones are approved */}
          {/* {shouldShowReleaseFundsButton && <ReleaseEscrowButton />} */}

          {/* Multi-release: Withdraw Remaining Funds */}
          {/* {shouldShowWithdrawRemaining && <WithdrawRemainingFundsDialog />} */}
        </div>
      )}

      <FundEscrowDialog />
    </div>
  );`}
            language="json"
            filename="escrows/escrows-by-role/details/Actions.tsx"
          />

          <h3
            id="actions-imported"
            className="flex items-center gap-2 scroll-m-20 text-2xl font-semibold tracking-tight"
          >
            Actions Imported
          </h3>

          <CodeBlock
            code={`// If you need both types, you should import both versions to update escrow
import { UpdateEscrowDialog } from "../../single-release/update-escrow/dialog/UpdateEscrow";
/* import { UpdateEscrowDialog as UpdateEscrowDialogMultiRelease } from "../../multi-release/update-escrow/dialog/UpdateEscrow"; */
import { FundEscrowDialog } from "../../single-multi-release/fund-escrow/dialog/FundEscrow";
import { DisputeEscrowButton } from "../../single-release/dispute-escrow/button/DisputeEscrow";
import { ResolveDisputeDialog } from "../../single-release/resolve-dispute/dialog/ResolveDispute";
import { ReleaseEscrowButton } from "../../single-release/release-escrow/button/ReleaseEscrow";
import { WithdrawRemainingFundsDialog } from "../../multi-release/withdraw-remaining-funds/dialog/WithdrawRemainingFunds";

return (
    <div className="flex items-start justify-start flex-col gap-2 w-full">
      {/* You can add the buttons here, using the buttons from the blocks. These actions are conditional based on the escrow flags and the user roles. */}
      {hasConditionalButtons && (
        <div className="flex flex-col gap-2 w-full">
          {/* UpdateEscrowDialog component should be rendered based on the escrow type. It means that if the selectedEscrow.type is "single-release", then the UpdateEscrowDialog (from the single-release block) component should be rendered. If the selectedEscrow.type is "multi-release", then the UpdateEscrowDialog (from the multi-release block) component should be rendered. */}
          {shouldShowEditButton && <UpdateEscrowDialog />}

          {/* Works only with single-release escrows */}
          {shouldShowDisputeButton && <DisputeEscrowButton />}

          {/* Works only with single-release escrows */}
          {shouldShowResolveButton && <ResolveDisputeDialog />}

          {/* Works only with single-release escrows */}
          {shouldShowReleaseFundsButton && <ReleaseEscrowButton />}

          {/* Multi-release: Withdraw Remaining Funds */}
          {shouldShowWithdrawRemaining && <WithdrawRemainingFundsDialog />}
        </div>
      )}

      <FundEscrowDialog />
    </div>
  );`}
            language="json"
            filename="escrows/escrows-by-role/details/Actions.tsx"
          />
        </div>
      </section>

      <section id="add-components">
        <h2
          id="manual-provider-setup"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
        >
          Manual Provider Setup
        </h2>
        <div className="space-y-4 pt-4">
          <p className="leading-7">
            Wrap your app with the required providers in this specific order:
          </p>

          <CodeBlock
            code={`import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryClientProvider } from "@/components/tw-blocks/providers/ReactQueryClientProvider";
import { TrustlessWorkProvider } from "@/components/tw-blocks/providers/TrustlessWork";
import { WalletProvider } from "@/components/tw-blocks/wallet-kit/WalletProvider";
import { EscrowProvider } from "@/components/tw-blocks/providers/EscrowProvider";
import { EscrowDialogsProvider } from "@/components/tw-blocks/providers/EscrowDialogsProvider";
import { EscrowAmountProvider } from "@/components/tw-blocks/providers/EscrowAmountProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // optional: use geistSans.variable and geistMono.variable
        className="antialiased"
      >
        <ReactQueryClientProvider>
          <TrustlessWorkProvider>
            <WalletProvider>
              <EscrowProvider>
                <EscrowDialogsProvider>
                  <EscrowAmountProvider>
                    {children}

                    <Toaster />
                  </EscrowAmountProvider>
                </EscrowDialogsProvider>
              </EscrowProvider>
            </WalletProvider>
          </TrustlessWorkProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
`}
            language="tsx"
            filename="app/layout.tsx"
          />

          <Card className="my-4 gap-2">
            <CardHeader>
              <CardTitle>Provider Order Matters</CardTitle>
              <CardDescription>
                The providers must be nested in this exact order for proper
                functionality.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <section>
        <h2
          id="example-usage-complete-page"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
        >
          Example usage in a page:
        </h2>
        <div className="space-y-4 pt-4">
          <p className="leading-7">
            Now, you are able to interact with the entire escrow lifecycle.
          </p>

          <CodeBlock
            code={`"use client";

import { EscrowsByRoleCards } from "@/components/tw-blocks/escrows/escrows-by-role/cards/EscrowsCards";
import { InitializeEscrowDialog } from "@/components/tw-blocks/escrows/single-release/initialize-escrow/dialog/InitializeEscrow";
import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="flex justify-between items-center w-full">
        <h2 className="text-2xl font-bold">Trustless Work</h2>
        <WalletButton />
      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="container">
          <div className="flex w-full mb-4 justify-end">
            <div className="flex w-1/6">
              <InitializeEscrowDialog />
            </div>
          </div>

          <EscrowsByRoleCards />
        </div>
      </main>
    </div>
  );
}

`}
            language="tsx"
            filename="app/page.tsx"
          />
        </div>
      </section>

      <Card className="my-4 gap-2">
        <CardHeader>
          <CardTitle>All the blocks were added, now use them!</CardTitle>
          <CardDescription>
            You already have all the required blocks to start using the
            single-release escrow lifecycle.
          </CardDescription>
        </CardHeader>
      </Card>

      <section>
        <h2
          id="final-ui"
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
        >
          Final UI
        </h2>
        <div className="space-y-4 pt-4">
          <p className="leading-7">
            By using these components, you'll be able to completed the entire
            escrow lifecycle.
          </p>

          <Card className="my-4 gap-2">
            <CardHeader>
              <CardTitle>Important Usage Advice</CardTitle>
              <CardDescription>
                - This cards components works <strong>by role</strong>. In the
                filters section, you can select the role you want to see the
                escrows for. Based on that, the actions buttons will be
                rendered. <br /> - Before you start using the UI, you must add
                the <strong>USDC</strong> asset to your wallet. If not, you wont
                be able to interact with Trustless Work.
              </CardDescription>
            </CardHeader>
          </Card>

          <h3
            id="wallet-connection-dialog"
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
          >
            Wallet Connection Dialog
          </h3>

          <p className="leading-7">Show the wallet connection dialog:</p>

          <div className="flex items-center justify-center w-full">
            <Image
              className="border-2 rounded-lg"
              src="/start-from-scratch/wallet-kit.png"
              alt="Escrow Lifecycle"
              width={500}
              height={500}
            />
          </div>

          <h3
            id="cards-by-role"
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
          >
            Cards by Role
          </h3>

          <p className="leading-7">Show the cards by role:</p>

          <div className="flex items-center justify-center w-full">
            <Image
              className="border-2 rounded-lg"
              src="/start-from-scratch/cards-by-role.png"
              alt="Escrow Lifecycle"
              width={1000}
              height={500}
            />
          </div>

          <h3
            id="initialize-escrow-dialog"
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
          >
            Initialize Escrow Dialog
          </h3>

          <p className="leading-7">Show the initialize escrow dialog:</p>

          <div className="flex items-center justify-center w-full">
            <Image
              className="border-2 rounded-lg"
              src="/start-from-scratch/initialize-escrow.png"
              alt="Escrow Lifecycle"
              width={1000}
              height={500}
            />
          </div>

          <h3
            id="escrow-details-dialog"
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
          >
            Escrow Details Dialog
          </h3>

          <p className="leading-7">Show the escrow details dialog:</p>

          <div className="flex items-center justify-center w-full">
            <Image
              className="border-2 rounded-lg"
              src="/start-from-scratch/details.png"
              alt="Escrow Lifecycle"
              width={1000}
              height={450}
            />
          </div>

          <p className="text-end italic mt-10">
            The easiest way to implement escrows in blockchain."
          </p>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row w-full justify-between gap-2 sm:gap-4">
        <Link href="/get-started/installation">
          <Card className="gap-2 w-full cursor-pointer py-4">
            <CardContent className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <p>Installation Guide</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/get-started/dependencies">
          <Card className="gap-2 w-full cursor-pointer py-4">
            <CardContent className="flex items-center gap-2">
              <p>Dependencies</p>
              <ArrowRight className="h-4 w-4" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};
