import Link from "next/link";
import blocksData from "@/data/blocks.json";
import type { Block } from "@/types/block";
import { ClickableTitle } from "@/components/ui/ClickableTitle";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export const ComponentsView = () => {
  const blocks = (blocksData as unknown as Block[]).slice().sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <ClickableTitle
          id="components"
          as="h1"
          className="scroll-m-20 text-4xl font-bold tracking-tight"
        >
          Components
        </ClickableTitle>
        <p className="text-xl text-muted-foreground">
          List of all available blocks. Click to open the detail in a new tab.
        </p>
      </div>

      <section>
        <div className="space-y-4 pt-4">
          {/* Responsive multi-column list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {blocks.map((block) => (
              <div key={block.id} className="my-2">
                <Link
                  href={`/blocks/${block.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:underline text-sm sm:text-base"
                >
                  {block.title}
                  {block.newBlocks ? (
                    <Tooltip>
                      <TooltipTrigger>
                        <span
                          className="inline-block h-2 w-2 rounded-full bg-primary ml-2"
                          aria-label="Nuevo"
                          title="Nuevo"
                        />
                      </TooltipTrigger>
                      <TooltipContent>New Block</TooltipContent>
                    </Tooltip>
                  ) : null}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
