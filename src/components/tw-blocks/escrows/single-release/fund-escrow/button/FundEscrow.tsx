import * as React from "react";
import { Button } from "@/components/ui/button";
import { useEscrowsMutations } from "@/components/tw-blocks/tanstak/useEscrowsMutations";
import { useWalletContext } from "@/components/tw-blocks/wallet-kit/WalletProvider";
import { FundEscrowPayload } from "@trustless-work/escrow/types";
import { toast } from "sonner";
import {
  ErrorResponse,
  handleError,
} from "@/components/tw-blocks/handle-errors/handle";
import { useEscrowContext } from "../../../escrow-context/EscrowProvider";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type FundEscrowButtonProps = {
  amount: number;
  className?: string;
};

export default function FundEscrowButton({
  amount,
  className,
}: FundEscrowButtonProps) {
  const { fundEscrow } = useEscrowsMutations();
  const { selectedEscrow, updateEscrow } = useEscrowContext();
  const { walletAddress } = useWalletContext();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function handleClick() {
    try {
      if (!amount || Number.isNaN(amount)) {
        toast.error("Amount is required");
        return;
      }

      if (amount <= 0) {
        toast.error("Amount must be greater than 0");
        return;
      }

      setIsSubmitting(true);

      const payload: FundEscrowPayload = {
        amount: Number(amount),
        contractId: selectedEscrow?.contractId || "",
        signer: walletAddress || "",
      };

      await fundEscrow.mutateAsync({
        payload,
        type: "single-release",
        address: walletAddress || "",
      });

      updateEscrow({
        ...selectedEscrow,
        amount: (selectedEscrow?.amount || 0) + payload.amount,
      });
      toast.success("Escrow funded successfully");
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
      className={cn(className, "cursor-pointer w-full")}
    >
      {isSubmitting ? (
        <div className="flex items-center">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="ml-2">Funding...</span>
        </div>
      ) : (
        "Fund"
      )}
    </Button>
  );
}
