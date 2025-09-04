import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resolveDisputeSchema, type ResolveDisputeValues } from "./schema";
import { toast } from "sonner";
import { MultiReleaseMilestone } from "@trustless-work/escrow";
import { useEscrowContext } from "@/components/tw-blocks/providers/EscrowProvider";
export function useResolveDispute() {
  const { selectedEscrow } = useEscrowContext();

  const form = useForm<ResolveDisputeValues>({
    resolver: zodResolver(resolveDisputeSchema),
    defaultValues: {
      approverFunds: 0,
      receiverFunds: 0,
      milestoneIndex: "0",
    },
    mode: "onChange",
  });

  const totalAmount = React.useMemo(() => {
    if (selectedEscrow?.type !== "multi-release") return 0;
    const milestones = selectedEscrow.milestones as MultiReleaseMilestone[];
    return milestones.reduce(
      (acc, milestone) => acc + Number(milestone.amount),
      0
    );
  }, [selectedEscrow]);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = form.handleSubmit(async (payload) => {
    try {
      setIsSubmitting(true);

      toast.success("Dispute resolved successfully");
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  });

  return { form, handleSubmit, isSubmitting, totalAmount };
}
