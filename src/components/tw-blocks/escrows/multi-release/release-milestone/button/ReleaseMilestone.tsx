import * as React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const ReleaseMilestoneButton = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleClick() {
    try {
      setIsSubmitting(true);

      toast.success("Milestone released successfully");
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
