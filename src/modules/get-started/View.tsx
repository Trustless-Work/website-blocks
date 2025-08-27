import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/shared/CodeBlock";
import { ArrowRight, Info } from "lucide-react";

export const GetStarted = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Trustless Work React Library
        </h1>
        <p className="text-xl text-muted-foreground">
          A production-ready set of React blocks for integrating Trustless
          Work's escrow and dispute resolution flows.
        </p>
      </div>

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
              Would you like to customize the blocks?
              <br />
              <strong className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" /> You can do that by editing
                the blocks as you see fit.
              </strong>
            </p>
          </CardDescription>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            What you get
          </h2>
          <div className="space-y-4 pt-4">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                UI blocks (cards/tables/dialogs/forms) to list and manage
                escrows
              </li>
              <li>
                Providers for API config, wallet context, dialogs and amounts
              </li>
              <li>TanStack Query hooks for fetching and mutating escrows</li>
              <li>Wallet-kit helpers and error handling utilities</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Installation
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              Install the library package using your preferred package manager:
            </p>

            <Tabs defaultValue="npm" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="npm">npm</TabsTrigger>
              </TabsList>
            </Tabs>

            <p className="leading-7 pt-4">
              Then run the CLI to scaffold UI and providers:
            </p>

            <CodeBlock code="npx trustless-work init" />

            <Card>
              <CardHeader>
                <CardTitle>The init command will:</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="w-full">
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Install shadcn/ui components (with prompts)</li>
                    <li>Install required dependencies</li>
                    <li>Create .twblocks.json configuration</li>
                    <li>
                      Optionally wire providers into Next.js app/layout.tsx
                    </li>
                  </ul>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Environment Setup
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              Create an environment variable for your API key:
            </p>

            <CodeBlock
              code="NEXT_PUBLIC_API_KEY=your_api_key_here"
              filename=".env"
            />

            <Card>
              <CardHeader>
                <CardTitle>Environment</CardTitle>
                <CardDescription>
                  The library uses{" "}
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    TrustlessWorkProvider
                  </code>{" "}
                  with{" "}
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    development
                  </code>{" "}
                  base URL by default.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Quick Start
          </h2>
          <div className="space-y-4 pt-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              1. Add providers (if you skipped wiring during init)
            </h3>

            <CodeBlock code="npx trustless-work add providers" />

            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              2. Wrap your Next.js layout
            </h3>

            <CodeBlock
              code={`// app/layout.tsx
import { ReactQueryClientProvider } from "@/components/tw-blocks/providers/ReactQueryClientProvider";
import { TrustlessWorkProvider } from "@/components/tw-blocks/providers/TrustlessWork";
import { WalletProvider } from "@/components/tw-blocks/wallet-kit/WalletProvider";
import { EscrowProvider } from "@/components/tw-blocks/escrows/escrow-context/EscrowProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>
          <TrustlessWorkProvider>
            <WalletProvider>
              <EscrowProvider>
                {children}
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

            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              3. Add a wallet button
            </h3>

            <CodeBlock code="npx trustless-work add wallet-kit" />

            <CodeBlock
              code={`// Example usage
import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";

export function Header() {
  return (
    <div className="flex justify-end p-4">
      <WalletButton />
    </div>
  );
}`}
              language="tsx"
            />

            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              4. List escrows quickly
            </h3>

            <CodeBlock
              code={`# By role (cards view)
npx trustless-work add escrows/escrows-by-role/cards

# Or table view
npx trustless-work add escrows/escrows-by-role/table`}
            />

            <CodeBlock
              code={`import { EscrowsByRoleCards } from "@/components/tw-blocks/escrows/escrows-by-role/cards/EscrowsCards";
import { EscrowDialogsProvider } from "@/components/tw-blocks/escrows/escrow-context/EscrowDialogsProvider";

export default function Page() {
  return (
    <EscrowDialogsProvider>
      <EscrowsByRoleCards />
    </EscrowDialogsProvider>
  );
}`}
              language="tsx"
              filename="app/escrows/page.tsx"
            />
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Next Steps
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">Ready to explore more? Check out:</p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Installation Guide:</strong> Detailed setup instructions
                and configuration options
              </li>
              <li>
                <strong>Available Blocks:</strong> Browse all available UI
                components and hooks
              </li>
              <li>
                <strong>State Management:</strong> Learn about TanStack Query
                integration and mutations
              </li>
              <li>
                <strong>Best Practices:</strong> Guidelines for providers, error
                handling, and wallet integration
              </li>
            </ul>

            <div className="pt-4">
              <p className="leading-7">List all available blocks:</p>
              <CodeBlock code="npx trustless-work list" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
