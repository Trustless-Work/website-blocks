import { CodeBlock } from "@/shared/CodeBlock";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const InstallationView = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Installation Guide
        </h1>
        <p className="text-xl text-muted-foreground">
          Complete setup guide for Trustless Work React blocks with detailed
          configuration and best practices.
        </p>
      </div>

      <div className="space-y-8">
        <section id="installation">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Install Trustless Work Blocks
          </h2>
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

            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
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
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
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

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Configuration Files{" "}
            <span className="font-extrabold">(Optional)</span>
          </h2>
          <div className="space-y-4 pt-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              .twblocks.json
            </h3>

            <p className="leading-7">
              The CLI creates a configuration file to manage UI component paths:
            </p>

            <CodeBlock
              code={`{
  "uiBase": "@/components/ui"
}`}
              language="json"
              filename=".twblocks.json"
            />

            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Custom UI Base Path
            </h3>

            <p className="leading-7">
              If your UI components are in a different location, specify the
              path when adding blocks:
            </p>

            <CodeBlock
              code={`npx trustless-work add escrows/escrows-by-role/cards --ui-base "@/lib/ui"`}
            />
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Wrap your App with Providers
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              If you want to use some blocks, you should wrap your app with
              their providers. See more in:{" "}
              <Link
                target="_blank"
                href="/get-started/dependencies"
                className="text-primary-500 font-bold"
              >
                Dependencies
              </Link>
            </p>
            <p className="leading-7">
              <span className="font-bold text-destructive mr-2">
                Absolutely must be used:
              </span>{" "}
              ReactQueryClientProvider | TrustlessWorkProvider | WalletProvider.
            </p>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Add Your First Component
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">Add wallet connectivity to your app:</p>

            <CodeBlock code="npx trustless-work add wallet-kit" />

            <p className="leading-7">Example usage in a page:</p>

            <CodeBlock
              code={`import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Escrows</h1>
        <WalletButton />
      </div>
    </div>
  );
}`}
              language="tsx"
              filename="app/home/page.tsx"
            />

            <p className="leading-7">
              Now, you are able to interact with the wallet.
            </p>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Common Issues
          </h2>
          <div className="space-y-4 pt-4">
            <div className="space-y-4">
              <Card className="my-4 gap-2">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle>API Key</CardTitle>
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
                  <CardDescription>
                    Ensure your{" "}
                    <code className="bg-muted px-1 py-0.5 rounded text-sm">
                      NEXT_PUBLIC_API_KEY
                    </code>{" "}
                    is set in your environment variables.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="my-4 gap-2">
                <CardHeader>
                  <CardTitle>Provider Order</CardTitle>
                  <CardDescription>
                    Make sure providers are nested in the correct order:
                    ReactQueryClientProvider → TrustlessWorkProvider →
                    WalletProvider → EscrowProvider.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="my-4 gap-2">
                <CardHeader>
                  <CardTitle>Component Imports</CardTitle>
                  <CardDescription>
                    If you have import issues, check your{" "}
                    <code className="bg-muted px-1 py-0.5 rounded text-sm">
                      .twblocks.json
                    </code>{" "}
                    configuration and ensure the{" "}
                    <code className="bg-muted px-1 py-0.5 rounded text-sm">
                      uiBase
                    </code>{" "}
                    path is correct.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="my-4 gap-2">
                <CardHeader>
                  <CardTitle>Missing Dependencies</CardTitle>
                  <CardDescription>
                    If you are using some blocks, you'll need to check the
                    dependencies section of the block you are using. For
                    example, if you are trying to use the escrows-by-role/table
                    block, you'll need to add the escrow-context, wallet-kit,
                    escrows, handle-errors and helpers block to your project.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="my-4 gap-2">
                <CardHeader>
                  <CardTitle>Server Side Error</CardTitle>
                  <CardDescription>
                    When you are using some blocks, you might get a server side
                    error, so you should write "use client" on the top of your
                    component. (Most usually happens with form blocks)
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="my-4 gap-2">
                <CardHeader>
                  <CardTitle>@trustless-work/blocks not installed</CardTitle>
                  <CardDescription>
                    Before you add a block, you should install the
                    @trustless-work/blocks package with{" "}
                    <code className="bg-muted px-1 py-0.5 rounded text-sm">
                      npm install @trustless-work/blocks
                    </code>
                    .
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="my-4 gap-2">
                <CardHeader>
                  <CardTitle>@trustless-work/blocks not initialized</CardTitle>
                  <CardDescription>
                    Before you add a block, you should initialize the
                    @trustless-work/blocks package with{" "}
                    <code className="bg-muted px-1 py-0.5 rounded text-sm">
                      npx trustless-work init
                    </code>
                    .
                  </CardDescription>
                </CardHeader>
              </Card>

              <p className="flex gap-2 justify-end my-10">
                Still have issues?{" "}
                <Link
                  href="https://t.me/+kmr8tGegxLU0NTA5"
                  target="_blank"
                  className="flex items-center gap-2 text-primary-500 font-bold"
                >
                  Contact support <ExternalLink className="h-4 w-4" />
                </Link>
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row w-full justify-between gap-4">
          <Link href="/get-started">
            <Card className="gap-2 w-full cursor-pointer py-4">
              <CardContent className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <p>Introduction</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/get-started/start-from-scratch">
            <Card className="gap-2 w-full cursor-pointer py-4">
              <CardContent className="flex items-center gap-2">
                <p>Start from Scratch</p>
                <ArrowRight className="h-4 w-4" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};
