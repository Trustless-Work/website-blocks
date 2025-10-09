import * as React from "react";
import { formatCurrency } from "@/components/tw-blocks/helpers/format.helper";

export const BalanceProgressDonut = () => {
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
      {(() => {
        const size = 160; // px
        const stroke = 12; // px
        const radius = (size - stroke) / 2;
        const circumference = 2 * Math.PI * radius;
        const pct = progressValue;
        const dashOffset = circumference * (1 - pct / 100);

        return (
          <div className="flex justify-center">
            <div className="relative" style={{ width: size, height: size }}>
              <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Track */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  strokeWidth={stroke}
                  stroke="currentColor"
                  className="text-muted-foreground/20"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Progress */}
                <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
                  <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={stroke}
                    stroke="currentColor"
                    className="text-primary"
                    fill="none"
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                  />
                </g>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{Math.round(pct)}%</span>
                <span className="text-muted-foreground text-sm">Progress</span>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
