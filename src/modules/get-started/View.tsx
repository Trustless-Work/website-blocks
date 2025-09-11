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
import { ClickableTitle } from "@/components/ui/ClickableTitle";

export const GetStarted = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <ClickableTitle 
          id="trustless-work-react-library" 
          as="h1" 
          className="scroll-m-20 text-4xl font-bold tracking-tight"
        >
          Trustless Work React Library
        </ClickableTitle>
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
          <ClickableTitle 
            id="what-you-get" 
            as="h2" 
            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
          >
            What you get
          </ClickableTitle>
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
          <ClickableTitle 
            id="list-all-available-blocks" 
            as="h2" 
            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
          >
            List all available blocks
          </ClickableTitle>
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
          <ClickableTitle 
            id="context-api" 
            as="h2" 
            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
          >
            Context API
          </ClickableTitle>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              The context API is a global storage of escrows. It is used to
              store the escrows that are fetched from the API. It is also used
              to store the selected escrow.
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
                    If you don't want to use our approach for retrieving the
                    escrow data, you are completely free to change it. You can
                    use Redux, Zustand, or any other solution instead. However,
                    it is important that you ensure the desired escrow is passed
                    to the endpoint.
                  </p>
                </CardDescription>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <ClickableTitle 
                id="understanding-context-escrows-endpoints" 
                as="h3" 
                className="scroll-m-20 text-xl font-semibold tracking-tight"
              >
                Understanding how the context works in escrows endpoints.
              </ClickableTitle>
              <p className="leading-7 text-muted-foreground">
                When implementing the endpoints, we need to pass the data of a
                specific escrow to each endpoint. But how do we do that? Our
                library provides a context called{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-sm">
                  EscrowContext
                </code>
                , which includes some very important utilities. Among them are
                <code className="bg-muted px-1 py-0.5 rounded text-sm">
                  selectedEscrow
                </code>
                and{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-sm">
                  setSelectedEscrow
                </code>
                , which allow us to do the following:
              </p>
            </div>

            <div className="space-y-4">
              <ClickableTitle 
                id="use-of-selectedescrow" 
                as="h3" 
                className="scroll-m-20 text-xl font-semibold tracking-tight"
              >
                Use of selectedEscrow
              </ClickableTitle>
              <p className="leading-7 text-muted-foreground">
                Currently,{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-sm">
                  selectedEscrow
                </code>{" "}
                holds a specific escrow that we are pointing to. With this, all
                the endpoint hooks interact with that state in order to extract
                data from it, such as contractId, roles, etc. For example, in
                the change status select, the{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-sm">
                  milestoneIndex
                </code>{" "}
                values are loaded based on the currently selected escrow.
                Therefore, if
                <code className="bg-muted px-1 py-0.5 rounded text-sm">
                  setSelectedEscrow
                </code>{" "}
                is undefined, they won't load.
              </p>

              <CodeBlock
                code={`const { selectedEscrow } = useEscrowContext();

const handleSubmit = form.handleSubmit(async (payload) => {             
  /**
   * Create the final payload for the change milestone status mutation
   *
   * @param payload - The payload from the form
   * @returns The final payload for the change milestone status mutation
  */
  const finalPayload: ChangeMilestoneStatusPayload = {
    contractId: selectedEscrow?.contractId || '', // contractId from the selectedEscrow
    milestoneIndex: payload.milestoneIndex,
    newStatus: payload.status,
    newEvidence: payload.evidence || undefined,
    serviceProvider: walletAddress || '',
  };

  /**
   * Call the change milestone status mutation
   *
   * @param payload - The final payload for the change milestone statusmutation
   * @param type - The type of the escrow
   * @param address - The address of the escrow
  */
  await changeMilestoneStatus.mutateAsync({
    payload: finalPayload,
    type: selectedEscrow?.type || 'multi-release',
    address: walletAddress || '',
  });
}`}
                language="tsx"
                filename="/useChangeMilestoneStatus.ts"
              />
            </div>

            <div className="space-y-4">
              <ClickableTitle 
                id="use-of-setselectedescrow" 
                as="h3" 
                className="scroll-m-20 text-xl font-semibold tracking-tight"
              >
                Use of setSelectedEscrow
              </ClickableTitle>
              <p className="leading-7 text-muted-foreground">
                The function{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-sm">
                  setSelectedEscrow
                </code>{" "}
                save the selected escrow in the context, so that all the
                endpoint hooks interact with that state in order to extract data
                from it, such as contractId, roles, etc. For example, in escrows
                cards by signer we save the selected escrow in the context, so
                that we can use it in details dialog.
              </p>

              <CodeBlock
                code={`const { setSelectedEscrow } = useEscrowContext();

const onCardClick = (escrow: Escrow) => {
  setSelectedEscrow(escrow);
  dialogStates.second.setIsOpen(true);
};`}
                language="tsx"
                filename="/EscrowsCards.tsx"
              />
            </div>

            <div className="space-y-4">
              <ClickableTitle 
                id="use-of-updateescrow" 
                as="h3" 
                className="scroll-m-20 text-xl font-semibold tracking-tight"
              >
                Use of updateEscrow
              </ClickableTitle>
              <p className="leading-7 text-muted-foreground">
                Our{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-sm">
                  updateEscrow
                </code>{" "}
                function update the existing selectedEscrow in the context. It
                is useful to update a flag or others fields. For example, we use
                it to update the escrow status after a change milestone status
                mutation.
              </p>

              <CodeBlock
                code={`const { selectedEscrow, updateEscrow } = useEscrowContext();

const handleSubmit = form.handleSubmit(async (payload) => { 
  /**
    * Call the change milestone status mutation
    *
    * @param payload - The final payload for the change milestone status mutation
    * @param type - The type of the escrow
    * @param address - The address of the escrow
  */
  await changeMilestoneStatus.mutateAsync({
    payload: finalPayload,
    type: selectedEscrow?.type || "multi-release", // type from the selectedEscrow
    address: walletAddress || "",
  });

  toast.success("Milestone status updated successfully");

  // Update the selected escrow in the context with the new status and evidence
  updateEscrow({
    ...selectedEscrow,
    milestones: selectedEscrow?.milestones.map((milestone, index) => {
      if (index === Number(payload.milestoneIndex)) {
        return {
          ...milestone,
          status: payload.status,
          evidence: payload.evidence || undefined,
        };
      }
      return milestone;
    }),
  });
}`}
                language="tsx"
                filename="/useChangeMilestoneStatus.ts"
              />
            </div>
          </div>
        </section>

        <section>
          <ClickableTitle 
            id="installation-based-on-folder-path" 
            as="h2" 
            className="flex items-center gap-2 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight"
          >
            <InfoIcon className="h-6 w-6" /> Installation based on folder path
          </ClickableTitle>
          <div className="space-y-4 pt-4">
            <p className="leading-7">
              If you need all the child blocks, you can install them by pointing
              to their parent directory, so you won't have to install them one
              by one.
            </p>

            <CodeBlock code="npx trustless-work escrows // or other parent's blocks directory" />

            <div className="space-y-4">
              <ClickableTitle 
                id="understanding-block-structure" 
                as="h3" 
                className="scroll-m-20 text-xl font-semibold tracking-tight"
              >
                Understanding the Block Structure
              </ClickableTitle>
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
