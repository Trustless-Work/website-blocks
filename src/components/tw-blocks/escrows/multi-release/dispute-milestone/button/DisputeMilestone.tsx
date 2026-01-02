import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  ErrorResponse,
  handleError,
} from "@/components/tw-blocks/handle-errors/handle";

export const DisputeMilestoneButton = () => {
  async function handleClick() {
    try {
      toast.success("Milestone disputed successfully");
    } catch (error) {
      toast.error(handleError(error as ErrorResponse).message);
    }
  }

  return (
    <Button
      type="button"
      onClick={handleClick}
      className="cursor-pointer w-full"
    >
      Dispute Milestone
    </Button>
  );
};
