import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { releaseMilestoneSchema, type ReleaseMilestoneValues } from "./schema";
import { toast } from "sonner";
import {
  ErrorResponse,
  handleError,
} from "@/components/tw-blocks/handle-errors/handle";

export function useReleaseMilestone({
  onSuccess,
}: { onSuccess?: () => void } = {}) {
  const form = useForm<ReleaseMilestoneValues>({
    resolver: zodResolver(releaseMilestoneSchema),
    defaultValues: {
      milestoneIndex: "0",
    },
    mode: "onChange",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = form.handleSubmit(async (payload) => {
    try {
      setIsSubmitting(true);
      toast.success("Milestone released successfully");

      onSuccess?.();
    } catch (error) {
      toast.error(handleError(error as ErrorResponse).message);
    } finally {
      setIsSubmitting(false);
      form.reset();
    }
  });

  return {
    form,
    handleSubmit,
    isSubmitting,
  };
}
