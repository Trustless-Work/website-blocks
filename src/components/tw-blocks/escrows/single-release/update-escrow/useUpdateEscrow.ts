import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateEscrowSchema } from "./schema";
import { z } from "zod";
import { toast } from "sonner";
import { useEscrowContext } from "../../escrow-context/EscrowProvider";

export function useUpdateEscrow() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { getSingleReleaseFormSchema } = useUpdateEscrowSchema();
  const formSchema = getSingleReleaseFormSchema();

  const { selectedEscrow } = useEscrowContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      engagementId: "ENG-001-2024",
      title: "Website Development Project",
      description:
        "Complete redesign and development of corporate website with modern UI/UX",
      platformFee: "2.5",
      amount: "1500",
      receiverMemo:
        "Payment for milestone completion - Website development phase 1",
      trustline: {
        address: "CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA",
        decimals: 10000000,
      },
      roles: {
        approver: "GCEXAMPLE1APPROVERADDRESSFORDEMOPURPOSESONLY1234567890",
        serviceProvider:
          "GCEXAMPLE2SERVICEPROVIDERADDRESSFORDEMOPURPOSESONLY12345",
        platformAddress:
          "GCEXAMPLE3PLATFORMADDRESSFORDEMOPURPOSESONLY1234567890",
        receiver: "GCEXAMPLE4RECEIVERADDRESSFORDEMOPURPOSESONLY1234567890",
        releaseSigner:
          "GCEXAMPLE5RELEASESIGNERADDRESSFORDEMOPURPOSESONLY123456",
        disputeResolver:
          "GCEXAMPLE6DISPUTERESOLVERADDRESSFORDEMOPURPOSESONLY1234",
      },
      milestones: [
        { description: "Initial design mockups and wireframes" },
        { description: "Frontend development and responsive design" },
        { description: "Backend integration and testing" },
        { description: "Final deployment and documentation" },
      ],
    },
    mode: "onChange",
  });

  React.useEffect(() => {
    // Using hardcoded data instead of selectedEscrow values
    form.reset({
      engagementId: "ENG-001-2024",
      title: "Website Development Project",
      description:
        "Complete redesign and development of corporate website with modern UI/UX",
      platformFee: "2.5",
      amount: "1500",
      receiverMemo:
        "Payment for milestone completion - Website development phase 1",
      trustline: {
        address: "CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA",
        decimals: 10000000,
      },
      roles: {
        approver: "GCEXAMPLE1APPROVERADDRESSFORDEMOPURPOSESONLY1234567890",
        serviceProvider:
          "GCEXAMPLE2SERVICEPROVIDERADDRESSFORDEMOPURPOSESONLY12345",
        platformAddress:
          "GCEXAMPLE3PLATFORMADDRESSFORDEMOPURPOSESONLY1234567890",
        receiver: "GCEXAMPLE4RECEIVERADDRESSFORDEMOPURPOSESONLY1234567890",
        releaseSigner:
          "GCEXAMPLE5RELEASESIGNERADDRESSFORDEMOPURPOSESONLY123456",
        disputeResolver:
          "GCEXAMPLE6DISPUTERESOLVERADDRESSFORDEMOPURPOSESONLY1234",
      },
      milestones: [
        { description: "Initial design mockups and wireframes" },
        { description: "Frontend development and responsive design" },
        { description: "Backend integration and testing" },
        { description: "Final deployment and documentation" },
      ],
    });
  }, [form]);

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

      if (!selectedEscrow) return;

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
