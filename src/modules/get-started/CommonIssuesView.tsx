import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

export const CommonIssuesView = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Common Issues
        </h1>
        <p className="text-xl text-muted-foreground">
          Common issues and solutions for Trustless Work React blocks.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Answers to Common Questions
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              Answers to common questions about Trustless Work React blocks.
            </p>
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

        <div className="flex flex-col sm:flex-row w-full justify-start gap-4">
          <Link href="/get-started/dependencies">
            <Card className="gap-2 w-full cursor-pointer py-4">
              <CardContent className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <p>Dependencies</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};
