"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useLoadEscrow } from "../useLoadEscrow";

export function LoadEscrowForm() {
  const { form, isSubmitting, onSubmit } = useLoadEscrow();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-6 w-full"
      >
        <FormField
          control={form.control}
          name="contractIds.0.value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contract / Escrow ID</FormLabel>
              <FormControl>
                <Input placeholder="CAZ6UQX7..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Load Escrow"}
        </Button>
      </form>
    </Form>
  );
}
