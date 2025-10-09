import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/components/tw-blocks/helpers/format.helper";

export const BalanceProgressBar = () => {
  const currentBalanceRaw = 300;
  const safeTarget = 1000;
  const progressValue =
    safeTarget > 0
      ? Math.min(100, Math.max(0, (currentBalanceRaw / safeTarget) * 100))
      : 0;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
        <p>
          <span className="font-bold mr-1">Balance:</span>
          {formatCurrency(currentBalanceRaw, "USDC")}
        </p>
        <p>
          <span className="font-bold mr-1">Target:</span>{" "}
          {formatCurrency(safeTarget, "USDC")}
        </p>
      </div>
      <Progress value={progressValue} className="w-full" />
    </div>
  );
};
