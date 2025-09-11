"use client";

import React from "react";
import { useAnchorNavigation } from "@/hooks/useAnchorNavigation";
import { cn } from "@/lib/utils";

interface ClickableTitleProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const ClickableTitle: React.FC<ClickableTitleProps> = ({
  id,
  children,
  className,
  as: Component = "h2",
}) => {
  const { navigateToAnchor } = useAnchorNavigation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToAnchor(id);
  };

  return (
    <Component
      id={id}
      className={cn(
        "cursor-pointer hover:text-primary transition-colors group",
        className
      )}
      onClick={handleClick}
    >
      <span className="flex items-center gap-2">
        {children}
        <span className="opacity-0 group-hover:opacity-50 transition-opacity text-sm">
          #
        </span>
      </span>
    </Component>
  );
};
