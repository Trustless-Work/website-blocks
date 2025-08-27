import { CodeBlock } from "@/shared/CodeBlock";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

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
        <section id="create-project">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Create a Next.js Project
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              Start by creating a new Next.js project with TypeScript and
              Tailwind CSS:
            </p>

            <CodeBlock code="npx create-next-app@latest" />

            <p className="leading-7">Navigate to your project directory:</p>

            <CodeBlock code="cd my-trustless-app" />
          </div>
        </section>

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

            <Alert>
              <AlertDescription>
                <strong>What the init command does:</strong>
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
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Environment Configuration
          </h2>
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

        <section id="add-components">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Add Required Providers
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              If you skipped the automatic provider setup during init, add them
              manually:
            </p>

            <CodeBlock code="npx trustless-work add providers" />

            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Manual Provider Setup
            </h3>

            <p className="leading-7">
              If you prefer manual setup, wrap your app with the required
              providers in this specific order:
            </p>

            <CodeBlock
              code={`import { ReactQueryClientProvider } from "@/components/tw-blocks/providers/ReactQueryClientProvider";
import { TrustlessWorkProvider } from "@/components/tw-blocks/providers/TrustlessWork";
import { WalletProvider } from "@/components/tw-blocks/wallet-kit/WalletProvider";
import { EscrowProvider } from "@/components/tw-blocks/escrows/escrow-context/EscrowProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

            <Alert>
              <AlertDescription>
                <strong>Provider Order Matters:</strong> The providers must be
                nested in this exact order for proper functionality.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Configuration Files
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
            Add Your First Components
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">Add wallet connectivity to your app:</p>

            <CodeBlock code="npx trustless-work add wallet-kit" />

            <p className="leading-7">Add escrow management components:</p>

            <CodeBlock
              code={`# Cards view for escrows by role
npx trustless-work add escrows/escrows-by-role/cards

# Table view for escrows by role  
npx trustless-work add escrows/escrows-by-role/table

# Escrow context providers
npx trustless-work add escrows/escrow-context`}
            />

            <p className="leading-7">Example usage in a page:</p>

            <CodeBlock
              code={`import { EscrowsByRoleCards } from "@/components/tw-blocks/escrows/escrows-by-role/cards/EscrowsCards";
import { EscrowDialogsProvider } from "@/components/tw-blocks/escrows/escrow-context/EscrowDialogsProvider";
import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";

export default function EscrowsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Escrows</h1>
        <WalletButton />
      </div>
      
      <EscrowDialogsProvider>
        <EscrowsByRoleCards />
      </EscrowDialogsProvider>
    </div>
  );
}`}
              language="tsx"
              filename="app/escrows/page.tsx"
            />
          </div>
        </section>

        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Troubleshooting
          </h2>
          <div className="space-y-4 pt-4">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Common Issues
            </h3>

            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  <strong>Provider Order:</strong> Make sure providers are
                  nested in the correct order: ReactQueryClientProvider →
                  TrustlessWorkProvider → WalletProvider → EscrowProvider.
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertDescription>
                  <strong>API Key:</strong> Ensure your{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    NEXT_PUBLIC_API_KEY
                  </code>{" "}
                  is set in your environment variables.
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertDescription>
                  <strong>Component Imports:</strong> If you have import issues,
                  check your{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    .twblocks.json
                  </code>{" "}
                  configuration and ensure the{" "}
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    uiBase
                  </code>{" "}
                  path is correct.
                </AlertDescription>
              </Alert>
            </div>

            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              List Available Blocks
            </h3>

            <p className="leading-7">
              To see all available components and their paths:
            </p>

            <CodeBlock code="npx trustless-work list" />
          </div>
        </section>
      </div>
    </div>
  );
};
