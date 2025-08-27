import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { approveMilestoneSchema, type ApproveMilestoneValues } from "./schema";
import { toast } from "sonner";

export function useApproveMilestone() {
  const form = useForm<ApproveMilestoneValues>({
    resolver: zodResolver(approveMilestoneSchema),
    defaultValues: {
      milestoneIndex: "0",
    },
    mode: "onChange",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = form.handleSubmit(async (payload) => {
    try {
      setIsSubmitting(true);

      toast.success("Milestone approved flag updated successfully");
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  });

  return { form, handleSubmit, isSubmitting };
}
