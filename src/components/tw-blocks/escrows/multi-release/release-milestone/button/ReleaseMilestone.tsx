import * as React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  ErrorResponse,
  handleError,
} from "@/components/tw-blocks/handle-errors/handle";
import { Loader2 } from "lucide-react";

export const ReleaseMilestoneButton = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleClick() {
    try {
      setIsSubmitting(true);

      toast.success("Milestone released successfully");
    } catch (error) {
      toast.error(handleError(error as ErrorResponse).message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Button
      type="button"
      disabled={isSubmitting}
      onClick={handleClick}
      className="cursor-pointer w-full"
    >
      {isSubmitting ? (
        <div className="flex items-center">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="ml-2">Releasing...</span>
        </div>
      ) : (
        "Release Milestone"
      )}
    </Button>
  );
};
