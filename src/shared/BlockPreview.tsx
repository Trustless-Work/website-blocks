"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlockPreviewProps {
  children: React.ReactNode;
  title: string;
}

type ViewportSize = "desktop" | "tablet" | "mobile";

export function BlockPreview({ children, title }: BlockPreviewProps) {
  const [viewportSize, setViewportSize] = useState<ViewportSize>("desktop");

  const getPreviewClasses = () => {
    switch (viewportSize) {
      case "mobile":
        return "w-[375px] h-[667px]";
      case "tablet":
        return "w-[768px] h-[1024px]";
      case "desktop":
      default:
        return "w-full h-[600px]";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center space-x-1">
          <Button
            variant={viewportSize === "desktop" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewportSize("desktop")}
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button
            variant={viewportSize === "tablet" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewportSize("tablet")}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button
            variant={viewportSize === "mobile" ? "default" : "outline"}
            size="sm"
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
          <div className="h-full w-full overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
