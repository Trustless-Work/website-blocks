import * as React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEscrowContext } from "@/components/tw-blocks/providers/EscrowProvider";
import { Loader2 } from "lucide-react";

export const DisputeMilestoneButton = () => {
  const { selectedEscrow } = useEscrowContext();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleClick() {
    try {
      setIsSubmitting(true);

      toast.success("Milestone disputed successfully");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Button
      type="button"
      disabled={isSubmitting || !selectedEscrow?.balance}
      onClick={handleClick}
      className="cursor-pointer w-full"
    >
      {isSubmitting ? (
        <div className="flex items-center">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="ml-2">Disputing...</span>
        </div>
      ) : (
        "Dispute Milestone"
      )}
    </Button>
  );
};
