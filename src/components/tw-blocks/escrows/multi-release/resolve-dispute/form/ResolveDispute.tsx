import * as React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResolveDispute } from "../useResolveDispute";
import { useEscrowContext } from "@/components/tw-blocks/providers/EscrowProvider";
import { Loader2, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "../../../../helpers/format.helper";

export const ResolveDisputeForm = ({
  showSelectMilestone = false,
  milestoneIndex,
}: {
  showSelectMilestone?: boolean;
  milestoneIndex?: number | string;
}) => {
  const {
    form,
    handleSubmit,
    isSubmitting,
    totalAmount,
    distributions,
    handleAddDistribution,
    handleRemoveDistribution,
    handleDistributionAddressChange,
    handleDistributionAmountChange,
    isAnyDistributionEmpty,
    allowedAmount,
    distributedSum,
    isExactMatch,
    difference,
  } = useResolveDispute();
  const { selectedEscrow } = useEscrowContext();

  React.useEffect(() => {
    if (
      !showSelectMilestone &&
      milestoneIndex !== undefined &&
      milestoneIndex !== null
    ) {
      form.setValue("milestoneIndex", String(milestoneIndex));
    }
  }, [showSelectMilestone, milestoneIndex, form]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6 w-full">
        {showSelectMilestone && (
          <FormField
            control={form.control}
            name="milestoneIndex"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  Milestone
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(e) => {
                      field.onChange(e);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select milestone" />
                    </SelectTrigger>
                    <SelectContent>
                      {(selectedEscrow?.milestones || []).map((m, idx) => (
                        <SelectItem key={`ms-${idx}`} value={String(idx)}>
                          {m?.description || `Milestone ${idx + 1}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormLabel className="flex items-center my-4">
          Distributions<span className="text-destructive ml-1">*</span>
        </FormLabel>

        {distributions.map((d, idx) => (
          <div
            key={`dist-${idx}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_minmax(140px,220px)_auto] gap-3 sm:gap-4 items-end mb-2"
          >
            <FormField
              control={form.control}
              name={`distributions.${idx}.address` as const}
              render={() => (
                <FormItem className="sm:col-span-2 lg:col-span-1">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Receiver address"
                      value={d.address}
                      onChange={(e) =>
                        handleDistributionAddressChange(idx, e.target.value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`distributions.${idx}.amount` as const}
              render={() => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      inputMode="decimal"
                      placeholder="0.00"
                      value={(d.amount as string) ?? ""}
                      onChange={(e) => handleDistributionAmountChange(idx, e)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="button"
              onClick={() => handleRemoveDistribution(idx)}
              className="justify-self-end self-end p-2 bg-transparent text-destructive rounded-md border-none shadow-none hover:bg-transparent hover:shadow-none hover:text-destructive focus:ring-0 active:ring-0"
              disabled={distributions.length <= 2}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        ))}

        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            onClick={handleAddDistribution}
            disabled={isAnyDistributionEmpty}
            className="cursor-pointer"
          >
            Add Item
          </Button>

          <div className="flex items-center gap-4">
            <div className="text-xs text-muted-foreground">
              <p>
                <span className="font-bold">Total Amount: </span>
                {distributedSum.toFixed(2)} / {allowedAmount.toFixed(2)}
              </p>
              {!isExactMatch && (
                <p className="text-destructive">
                  <span className="font-bold">Difference: </span>
                  {difference.toFixed(2)}
                </p>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              <span className="font-bold">Total Balance: </span>
              {formatCurrency(
                selectedEscrow?.balance || 0,
                selectedEscrow?.trustline.name || ""
              )}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <Button
            type="submit"
            disabled={isSubmitting || isAnyDistributionEmpty || !isExactMatch}
            className="cursor-pointer"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="ml-2">Resolving...</span>
              </div>
            ) : (
              "Resolve"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
