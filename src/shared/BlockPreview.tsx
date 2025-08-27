"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlockPreviewProps {
  children: React.ReactNode;
  title: string;
  rightSlot?: React.ReactNode;
}

type ViewportSize = "desktop" | "tablet" | "mobile";

export function BlockPreview({
  children,
  title = "Preview",
  rightSlot,
}: BlockPreviewProps) {
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");

  const getPreviewClasses = () => {
    switch (viewportSize) {
      case "mobile":
        return "w-[375px] h-full";
      case "tablet":
        return "w-[768px] h-full";
      case "desktop":
      default:
        return "w-full h-full";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          {rightSlot}
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant={viewportSize === "desktop" ? "default" : "outline"}
            size="sm"
            className="cursor-pointer"
            onClick={() => setViewportSize("desktop")}
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={viewportSize === "tablet" ? "default" : "outline"}
            size="sm"
            className="cursor-pointer"
            onClick={() => setViewportSize("tablet")}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={viewportSize === "mobile" ? "default" : "outline"}
            size="sm"
            className="cursor-pointer"
            onClick={() => setViewportSize("mobile")}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <div
          className={cn(
            "border rounded-lg overflow-hidden bg-background transition-all duration-300",
            getPreviewClasses()
          )}
        >
          <div className="h-full w-full">{children}</div>
        </div>
      </div>
    </div>
  );
}
