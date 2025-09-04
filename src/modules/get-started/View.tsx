import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/shared/CodeBlock";
import { TreeVisualization } from "@/shared/TreeVisualization";
import { ArrowRight, Info, InfoIcon } from "lucide-react";
import Link from "next/link";

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
            List all available blocks
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              With the CLI you can list all available blocks:
            </p>

            <CodeBlock code="npx trustless-work list" />

            <Card className="my-4 gap-2">
              <CardHeader>
                <CardTitle>The init command will:</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="w-full">
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Show all available blocks.</li>
                  </ul>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="flex items-center gap-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            <InfoIcon className="h-6 w-6" /> Installation based on folder path
          </h2>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              If you need all the child blocks, you can install them by pointing
              to their parent directory, so you won't have to install them one
              by one.
            </p>

            <CodeBlock code="npx trustless-work escrows // or other parent's blocks directory" />

            <div className="space-y-4">
              <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Understanding the Block Structure
              </h3>
              <p className="leading-7 text-muted-foreground">
                When you specify a parent folder like{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-sm">
                  escrows
                </code>
                , the CLI will install all blocks within that directory tree.
                Here's how the blocks are organized:
              </p>

              <TreeVisualization
                title="Trustless Work Blocks Structure"
                data={[
                  {
                    name: "escrows",
                    type: "folder",
                    path: "escrows",
                    description: "← Install all escrow-related blocks",
                    children: [
                      {
                        name: "escrows-by-role",
                        type: "folder",
                        path: "escrows/escrows-by-role",
                        description: "View escrows by user role",
                        children: [
                          {
                            name: "cards",
                            type: "folder",
                            path: "escrows/escrows-by-role/cards",
                            description: "Card layout components",
                          },
                          {
                            name: "table",
                            type: "folder",
                            path: "escrows/escrows-by-role/table",
                            description: "Table layout components",
                          },
                          {
                            name: "details",
                            type: "folder",
                            path: "escrows/escrows-by-role/details",
                            description: "Detail dialog components",
                          },
                        ],
                      },
                      {
                        name: "escrows-by-signer",
                        type: "folder",
                        path: "escrows/escrows-by-signer",
                        description: "View escrows by signer",
                        children: [
                          {
                            name: "cards",
                            type: "folder",
                            path: "escrows/escrows-by-signer/cards",
                            description: "Card layout components",
                          },
                          {
                            name: "table",
                            type: "folder",
                            path: "escrows/escrows-by-signer/table",
                            description: "Table layout components",
                          },
                          {
                            name: "details",
                            type: "folder",
                            path: "escrows/escrows-by-role/details",
                            description: "Detail dialog components",
                          },
                        ],
                      },
                      {
                        name: "single-release",
                        type: "folder",
                        path: "escrows/single-release",
                        description: "Single payment escrows",
                        children: [
                          {
                            name: "initialize-escrow",
                            type: "folder",
                            path: "escrows/single-release/initialize-escrow",
                            description: "Create new escrows",
                          },
                          {
                            name: "release-escrow",
                            type: "folder",
                            path: "escrows/single-release/release-escrow",
                            description: "Release payment",
                          },
                          {
                            name: "dispute-escrow",
                            type: "folder",
                            path: "escrows/single-release/dispute-escrow",
                            description: "Raise disputes",
                          },
                          {
                            name: "resolve-dispute",
                            type: "folder",
                            path: "escrows/single-release/resolve-dispute",
                            description: "Resolve disputes",
                          },
                          {
                            name: "update-escrow",
                            type: "folder",
                            path: "escrows/single-release/update-escrow",
                            description: "Update escrow settings",
                          },
                        ],
                      },
                      {
                        name: "multi-release",
                        type: "folder",
                        path: "escrows/multi-release",
                        description: "Milestone-based escrows",
                        children: [
                          {
                            name: "initialize-escrow",
                            type: "folder",
                            path: "escrows/multi-release/initialize-escrow",
                            description: "Create escrows",
                          },
                          {
                            name: "release-milestone",
                            type: "folder",
                            path: "escrows/multi-release/release-milestone",
                            description: "Release milestone payments",
                          },
                          {
                            name: "dispute-milestone",
                            type: "folder",
                            path: "escrows/multi-release/dispute-milestone",
                            description: "Dispute milestones",
                          },
                          {
                            name: "resolve-dispute",
                            type: "folder",
                            path: "escrows/multi-release/resolve-dispute",
                            description: "Resolve milestone disputes",
                          },
                          {
                            name: "update-escrow",
                            type: "folder",
                            path: "escrows/multi-release/update-escrow",
                            description: "Update escrows",
                          },
                        ],
                      },
                      {
                        name: "single-multi-release",
                        type: "folder",
                        path: "escrows/single-multi-release",
                        description: "Shared components",
                        children: [
                          {
                            name: "approve-milestone",
                            type: "folder",
                            path: "escrows/single-multi-release/approve-milestone",
                            description: "Approve milestones",
                          },
                          {
                            name: "change-milestone-status",
                            type: "folder",
                            path: "escrows/single-multi-release/change-milestone-status",
                            description: "Update milestone status",
                          },
                          {
                            name: "fund-escrow",
                            type: "folder",
                            path: "escrows/single-multi-release/fund-escrow",
                            description: "Add funds to escrows",
                          },
                        ],
                      },
                    ],
                  },
                ]}
              />

              <div className="grid gap-4 md:grid-cols-1">
                <Card className="p-4">
                  <h3 className="font-medium mb-2">Install Parent Directory</h3>
                  <CodeBlock
                    code="npx trustless-work add escrows"
                    language="bash"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Installs ALL escrow blocks
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">
                    Install Specific Subfolder
                  </h4>
                  <CodeBlock
                    code="npx trustless-work add escrows/single-release"
                    language="bash"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Installs only single-release escrow blocks
                  </p>
                </Card>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                  💡 Pro Tip: Hierarchical Installation
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  The deeper you go in the folder structure, the more specific
                  the blocks become. Start with parent directories for
                  comprehensive functionality, then drill down to specific
                  components as needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row w-full justify-end gap-4">
          <Link href="/get-started/installation">
            <Card className="gap-2 w-full cursor-pointer py-4">
              <CardContent className="flex items-center gap-2">
                <p>Installation Guide</p>
                <ArrowRight className="h-4 w-4" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};
