import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateEscrowSchema } from "./schema";
import { z } from "zod";
import { toast } from "sonner";
import {
  ErrorResponse,
  handleError,
} from "@/components/tw-blocks/handle-errors/handle";

export function useUpdateEscrow() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { getMultiReleaseFormSchema } = useUpdateEscrowSchema();
  const formSchema = getMultiReleaseFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      engagementId: "",
      title: "",
      description: "",
      platformFee: undefined,
      trustline: {
        address: "",
      },
      roles: {
        approver: "",
        serviceProvider: "",
        platformAddress: "",
        releaseSigner: "",
        disputeResolver: "",
      },
      milestones: [{ receiver: "", description: "", amount: "" }].map((m) => ({
        receiver: m.receiver,
        description: m.description,
        amount: m.amount,
      })) || [{ receiver: "", description: "", amount: "" }],
    },
    mode: "onChange",
  });

  const milestones = form.watch("milestones");
  const isAnyMilestoneEmpty = milestones.some((m, index) => {
    return m.description === "" || m.receiver === "" || m.amount === "";
  });

  const handleAddMilestone = () => {
    const current = form.getValues("milestones");
    const updated = [...current, { receiver: "", description: "", amount: "" }];
    form.setValue("milestones", updated);
  };

  const handleRemoveMilestone = (index: number) => {
    const current = form.getValues("milestones");
    const updated = current.filter((_, i) => i !== index);
    form.setValue("milestones", updated);
  };

  const handleMilestoneAmountChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let rawValue = e.target.value;
    rawValue = rawValue.replace(/[^0-9.]/g, "");

    if (rawValue.split(".").length > 2) {
      rawValue = rawValue.slice(0, -1);
    }

    // Limit to 2 decimal places
    if (rawValue.includes(".")) {
      const parts = rawValue.split(".");
      if (parts[1] && parts[1].length > 2) {
        rawValue = parts[0] + "." + parts[1].slice(0, 2);
      }
    }

    // Always keep as string to allow partial input like "0." or "0.5"
    const updatedMilestones = [...milestones];
    updatedMilestones[index] = {
      ...updatedMilestones[index],
      amount: rawValue,
    };
    form.setValue("milestones", updatedMilestones);
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
    } catch (error) {
      toast.error(handleError(error as ErrorResponse).message);
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
    handleMilestoneAmountChange,
    handlePlatformFeeChange,
  };
}
