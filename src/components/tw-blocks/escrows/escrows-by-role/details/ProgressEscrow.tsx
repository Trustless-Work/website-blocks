import { GetEscrowsFromIndexerResponse } from "@trustless-work/escrow/types";
import { cn } from "@/lib/utils";
import {
  MultiReleaseMilestone,
  SingleReleaseMilestone,
} from "@trustless-work/escrow";

type Escrow = {
  [K in keyof Omit<
    GetEscrowsFromIndexerResponse,
    "type" | "updatedAt" | "createdAt" | "user"
  >]: K extends "trustline"
    ? Omit<NonNullable<GetEscrowsFromIndexerResponse["trustline"]>, "name">
    : GetEscrowsFromIndexerResponse[K];
};

interface ProgressEscrowProps {
  escrow: Escrow;
  className?: string;
}

const ProgressCircle = ({
  percentage,
  color,
  size = 44,
  strokeWidth = 3,
}: {
  percentage: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(226, 232, 240, 0.3)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

const ProgressEscrow = ({ escrow, className }: ProgressEscrowProps) => {
  const completedMilestones = escrow.milestones.filter(
    (milestone) => milestone.status === "completed"
  ).length;
  const approvedMilestones = escrow.milestones.filter(
    (milestone: SingleReleaseMilestone | MultiReleaseMilestone) =>
      ("flags" in milestone && milestone.flags?.approved === true) ||
      (!("flags" in milestone) &&
        (milestone as SingleReleaseMilestone).approved === true)
  ).length;
  const disputedMilestones = escrow.milestones.filter(
    (milestone: SingleReleaseMilestone | MultiReleaseMilestone) =>
      "flags" in milestone && milestone.flags?.disputed === true
  ).length;
  const resolvedMilestones = escrow.milestones.filter(
    (milestone: SingleReleaseMilestone | MultiReleaseMilestone) =>
      "flags" in milestone && milestone.flags?.resolved === true
  ).length;
  const releasedMilestones = escrow.milestones.filter(
    (milestone: SingleReleaseMilestone | MultiReleaseMilestone) =>
      "flags" in milestone && milestone.flags?.released === true
  ).length;
  const totalMilestones = escrow.milestones.length;

  const progressPercentageCompleted =
    totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;
  const progressPercentageApproved =
    totalMilestones > 0 ? (approvedMilestones / totalMilestones) * 100 : 0;
  const progressPercentageDisputed =
    totalMilestones > 0 ? (disputedMilestones / totalMilestones) * 100 : 0;
  const progressPercentageResolved =
    totalMilestones > 0 ? (resolvedMilestones / totalMilestones) * 100 : 0;
  const progressPercentageReleased =
    totalMilestones > 0 ? (releasedMilestones / totalMilestones) * 100 : 0;

  const shouldHideProgress = escrow.flags?.released || escrow.flags?.resolved;
  const isMultiRelease =
    escrow.milestones[0] && "flags" in escrow.milestones[0];

  if (shouldHideProgress || totalMilestones === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4 px-10 w-full", className)}>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <div className="flex items-center gap-3">
          <ProgressCircle
            percentage={progressPercentageCompleted}
            color="#006be4"
          />
          <div className="text-xs">
            <div className="font-medium">Completed</div>
            <div className="text-muted-foreground">
              {completedMilestones}/{totalMilestones}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ProgressCircle
            percentage={progressPercentageApproved}
            color="#15803d"
          />
          <div className="text-xs">
            <div className="font-medium">Approved</div>
            <div className="text-muted-foreground">
              {approvedMilestones}/{totalMilestones}
            </div>
          </div>
        </div>

        {isMultiRelease && (
          <>
            <div className="flex items-center gap-3">
              <ProgressCircle
                percentage={progressPercentageDisputed}
                color="#dc2626"
              />
              <div className="text-xs">
                <div className="font-medium">Disputed</div>
                <div className="text-muted-foreground">
                  {disputedMilestones}/{totalMilestones}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ProgressCircle
                percentage={progressPercentageResolved}
                color="#15803d"
              />
              <div className="text-xs">
                <div className="font-medium">Resolved</div>
                <div className="text-muted-foreground">
                  {resolvedMilestones}/{totalMilestones}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ProgressCircle
                percentage={progressPercentageReleased}
                color="#15803d"
              />
              <div className="text-xs">
                <div className="font-medium">Released</div>
                <div className="text-muted-foreground">
                  {releasedMilestones}/{totalMilestones}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProgressEscrow;
