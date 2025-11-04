import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInitializeEscrowSchema } from "./schema";
import { z } from "zod";
import { toast } from "sonner";
import { useWalletContext } from "@/components/tw-blocks/wallet-kit/WalletProvider";
import {
  ErrorResponse,
  handleError,
} from "@/components/tw-blocks/handle-errors/handle";
import { trustlineOptions } from "@/components/tw-blocks/wallet-kit/trustlines";

export function useInitializeEscrow() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { getMultiReleaseFormSchema } = useInitializeEscrowSchema();
  const formSchema = getMultiReleaseFormSchema();

  const { walletAddress } = useWalletContext();

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
      milestones: [{ receiver: "", description: "", amount: "" }],
    },
    mode: "onChange",
  });

  const milestones = form.watch("milestones");
  const isAnyMilestoneEmpty = milestones.some(
    (milestone) =>
      milestone.description === "" ||
      milestone.receiver === "" ||
      milestone.amount === ""
  );

  const handleAddMilestone = () => {
    const currentMilestones = form.getValues("milestones");
    const updatedMilestones = [
      ...currentMilestones,
      { receiver: "", description: "", amount: "" },
    ];
    form.setValue("milestones", updatedMilestones);
  };

  const handleRemoveMilestone = (index: number) => {
    const currentMilestones = form.getValues("milestones");
    const updatedMilestones = currentMilestones.filter((_, i) => i !== index);
    form.setValue("milestones", updatedMilestones);
  };

  const fillTemplateForm = () => {
    const usdc = trustlineOptions.find((t) => t.label === "USDC");

    const templateData: z.infer<typeof formSchema> = {
      engagementId: "ENG-001",
      title: "Design Landing Page",
      description: "Landing for the new product of the company.",
      platformFee: 5,
      trustline: {
        address: usdc?.value || "",
      },
      roles: {
        approver: walletAddress || "",
        serviceProvider: walletAddress || "",
        platformAddress: walletAddress || "",
        releaseSigner: walletAddress || "",
        disputeResolver: walletAddress || "",
      },
      milestones: [
        {
          receiver: walletAddress || "",
          description: "Design the wireframe",
          amount: 2,
        },
        {
          receiver: walletAddress || "",
          description: "Develop the wireframe",
          amount: 2,
        },
        {
          receiver: walletAddress || "",
          description: "Deploy the wireframe",
          amount: 2,
        },
      ],
    };

    // Set form values
    Object.entries(templateData).forEach(([key, value]) => {
      form.setValue(key as keyof z.infer<typeof formSchema>, value);
    });

    // Explicitly set the trustline field
    form.setValue("trustline.address", usdc?.value || "");
  };

  const handleSubmit = form.handleSubmit(async (payload) => {
    try {
      setIsSubmitting(true);

      toast.success("Escrow initialized successfully");
    } catch (error) {
      toast.error(handleError(error as ErrorResponse).message);
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  });

  return {
    form,
    isSubmitting,
    milestones,
    isAnyMilestoneEmpty,
    fillTemplateForm,
    handleSubmit,
    handleAddMilestone,
    handleRemoveMilestone,
  };
}
