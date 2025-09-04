import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changeMilestoneStatusSchema,
  type ChangeMilestoneStatusValues,
} from "./schema";
import { toast } from "sonner";

export function useChangeMilestoneStatus() {
  const form = useForm<ChangeMilestoneStatusValues>({
    resolver: zodResolver(changeMilestoneStatusSchema),
    defaultValues: {
      milestoneIndex: "0",
      status: "",
      evidence: "",
    },
    mode: "onChange",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = form.handleSubmit(async (payload) => {
    try {
      setIsSubmitting(true);

      toast.success("Milestone status updated successfully");
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  });

  return { form, handleSubmit, isSubmitting };
}
