import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { disputeMilestoneSchema, type DisputeMilestoneValues } from "./schema";
import { toast } from "sonner";
import {
  ErrorResponse,
  handleError,
} from "@/components/tw-blocks/handle-errors/handle";

export function useDisputeMilestone({
  onSuccess,
}: { onSuccess?: () => void } = {}) {
  const form = useForm<DisputeMilestoneValues>({
    resolver: zodResolver(disputeMilestoneSchema),
    defaultValues: {
      milestoneIndex: "0",
    },
    mode: "onChange",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = form.handleSubmit(async (payload) => {
    try {
      setIsSubmitting(true);

      toast.success("Milestone disputed successfully");

      onSuccess?.();
    } catch (error) {
      toast.error(handleError(error as ErrorResponse).message);
    } finally {
      setIsSubmitting(false);
    }
  });

  return {
    form,
    handleSubmit,
    isSubmitting,
  };
}
