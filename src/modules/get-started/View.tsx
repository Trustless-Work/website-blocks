import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/shared/CodeBlock";
import { ArrowRight, Info, InfoIcon } from "lucide-react";

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

            <p className="leading-7">
              This will install all the escrows blocks, including the
              escrow-context, single-release, etc.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
