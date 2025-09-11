import { CodeBlock } from "@/shared/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClickableTitle } from "@/components/ui/ClickableTitle";

export const InstallationView = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <ClickableTitle
          id="installation-guide"
          as="h1"
          className="scroll-m-20 text-4xl font-bold tracking-tight"
        >
          Installation Guide
        </ClickableTitle>
        <p className="text-xl text-muted-foreground">
          Complete setup guide for Trustless Work React blocks with detailed
          configuration and best practices.
        </p>
      </div>

      <div className="space-y-8">
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

            <ClickableTitle
              id="run-cli-setup"
              as="h3"
              className="scroll-m-20 text-2xl font-semibold tracking-tight"
            >
              Run the CLI Setup
            </ClickableTitle>

            <p className="leading-7">
              Configure Trustless Work Blocks to your project:
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
            <ClickableTitle
              id="environment-configuration"
              as="h2"
              className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
            >
              Environment Configuration
            </ClickableTitle>
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
          <ClickableTitle
            id="configuration-files"
            as="h2"
            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
          >
            Configuration Files{" "}
            <span className="font-extrabold">(Optional)</span>
          </ClickableTitle>
          <div className="space-y-4 pt-4">
            <ClickableTitle
              id="twblocks-json"
              as="h3"
              className="scroll-m-20 text-2xl font-semibold tracking-tight"
            >
              .twblocks.json
            </ClickableTitle>

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

            <ClickableTitle
              id="custom-ui-base-path"
              as="h3"
              className="scroll-m-20 text-2xl font-semibold tracking-tight"
            >
              Custom UI Base Path
            </ClickableTitle>

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
          <ClickableTitle
            id="wrap-app-with-providers"
            as="h2"
            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
          >
            Wrap your App with Providers
          </ClickableTitle>
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
          <ClickableTitle
            id="add-your-first-component"
            as="h2"
            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
          >
            Add Your First Component
          </ClickableTitle>
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
