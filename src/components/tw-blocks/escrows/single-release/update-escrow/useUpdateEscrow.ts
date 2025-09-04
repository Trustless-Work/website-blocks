import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateEscrowSchema } from "./schema";
import { z } from "zod";
import { SingleReleaseMilestone } from "@trustless-work/escrow/types";
import { toast } from "sonner";
import { useEscrowContext } from "@/components/tw-blocks/providers/EscrowProvider";

export function useUpdateEscrow() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { getSingleReleaseFormSchema } = useUpdateEscrowSchema();
  const formSchema = getSingleReleaseFormSchema();

  const { selectedEscrow } = useEscrowContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      engagementId: selectedEscrow?.engagementId || "",
      title: selectedEscrow?.title || "",
      description: selectedEscrow?.description || "",
      platformFee: selectedEscrow?.platformFee as unknown as
        | number
        | string
        | undefined,
      amount: selectedEscrow?.amount as unknown as number | string | undefined,
      receiverMemo: selectedEscrow?.receiverMemo
        ? String(selectedEscrow.receiverMemo)
        : "",
      trustline: {
        address: selectedEscrow?.trustline?.address || "",
        decimals: 10000000,
      },
      roles: {
        approver: selectedEscrow?.roles?.approver || "",
        serviceProvider: selectedEscrow?.roles?.serviceProvider || "",
        platformAddress: selectedEscrow?.roles?.platformAddress || "",
        receiver: selectedEscrow?.roles?.receiver || "",
        releaseSigner: selectedEscrow?.roles?.releaseSigner || "",
        disputeResolver: selectedEscrow?.roles?.disputeResolver || "",
      },
      milestones: (selectedEscrow?.milestones || []).map(
        (m: SingleReleaseMilestone) => ({
          description: m?.description || "",
        })
      ),
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    if (!selectedEscrow) return;
    form.reset({
      engagementId: selectedEscrow?.engagementId || "",
      title: selectedEscrow?.title || "",
      description: selectedEscrow?.description || "",
      platformFee:
        (selectedEscrow?.platformFee as unknown as
          | number
          | string
          | undefined) || "",
      amount:
        (selectedEscrow?.amount as unknown as number | string | undefined) ||
        "",
      receiverMemo: selectedEscrow?.receiverMemo
        ? String(selectedEscrow.receiverMemo)
        : "",
      trustline: {
        address: selectedEscrow?.trustline?.address || "",
        decimals: 10000000,
      },
      roles: {
        approver: selectedEscrow?.roles?.approver || "",
        serviceProvider: selectedEscrow?.roles?.serviceProvider || "",
        platformAddress: selectedEscrow?.roles?.platformAddress || "",
        receiver: selectedEscrow?.roles?.receiver || "",
        releaseSigner: selectedEscrow?.roles?.releaseSigner || "",
        disputeResolver: selectedEscrow?.roles?.disputeResolver || "",
      },
      milestones: (selectedEscrow?.milestones || []).map(
        (m: SingleReleaseMilestone) => ({
          description: m?.description || "",
        })
      ),
    });
  }, [selectedEscrow, form]);

  const milestones = form.watch("milestones");
  const isAnyMilestoneEmpty = milestones.some((m) => m.description === "");

  const handleAddMilestone = () => {
    const current = form.getValues("milestones");
    const updated = [...current, { description: "" }];
    form.setValue("milestones", updated);
  };

  const handleRemoveMilestone = (index: number) => {
    const current = form.getValues("milestones");
    const updated = current.filter((_, i) => i !== index);
    form.setValue("milestones", updated);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;
    rawValue = rawValue.replace(/[^0-9.]/g, "");
    if (rawValue.split(".").length > 2) rawValue = rawValue.slice(0, -1);
    if (rawValue.includes(".")) {
      const parts = rawValue.split(".");
      if (parts[1] && parts[1].length > 2) {
        rawValue = parts[0] + "." + parts[1].slice(0, 2);
      }
    }
    form.setValue("amount", rawValue);
  };

  const handlePlatformFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;
    rawValue = rawValue.replace(/[^0-9.]/g, "");
    if (rawValue.split(".").length > 2) rawValue = rawValue.slice(0, -1);
    if (rawValue.includes(".")) {
      const parts = rawValue.split(".");
      if (parts[1] && parts[1].length > 2) {
        rawValue = parts[0] + "." + parts[1].slice(0, 2);
      }
    }
    form.setValue("platformFee", rawValue);
  };

  const handleSubmit = form.handleSubmit(async (payload) => {
    try {
      setIsSubmitting(true);

      toast.success("Escrow updated successfully");
    } finally {
      setIsSubmitting(false);
    }
  });

  return {
    form,
    isSubmitting,
    milestones,
    isAnyMilestoneEmpty,
    handleSubmit,
    handleAddMilestone,
    handleRemoveMilestone,
    handleAmountChange,
    handlePlatformFeeChange,
  };
}
