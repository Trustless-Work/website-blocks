"use client";

import React from "react";
import {
  Folder,
  FolderOpen,
  File,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TreeNode {
  name: string;
  type: "folder" | "file";
  path: string;
  children?: TreeNode[];
  isExpanded?: boolean;
  description?: string;
}

interface TreeNodeProps {
  node: TreeNode;
  level: number;
  onToggle?: (path: string) => void;
  expandedNodes?: Set<string>;
}

const TreeNodeComponent: React.FC<TreeNodeProps> = ({
  node,
  level,
  onToggle,
  expandedNodes,
}) => {
  const isExpanded = expandedNodes?.has(node.path) ?? node.isExpanded ?? false;
  const hasChildren = node.children && node.children.length > 0;
  const indent = level * 20;

  const handleToggle = () => {
    if (hasChildren && onToggle) {
      onToggle(node.path);
    }
  };

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center py-1 px-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors",
          level === 0 && "font-medium"
        )}
        style={{ paddingLeft: `${8 + indent}px` }}
        onClick={handleToggle}
      >
        {hasChildren && (
          <div className="mr-1">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        )}
        {!hasChildren && <div className="w-5" />}

        <div className="mr-2">
          {node.type === "folder" ? (
            isExpanded ? (
              <FolderOpen className="h-4 w-4 text-blue-500" />
            ) : (
              <Folder className="h-4 w-4 text-blue-500" />
            )
          ) : (
            <File className="h-4 w-4 text-muted-foreground" />
          )}
        </div>

        <span className="text-sm">
          {node.name}
          {node.description && (
            <span className="text-muted-foreground ml-2 text-xs">
              {node.description}
            </span>
          )}
        </span>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child, index) => (
            <TreeNodeComponent
              key={`${child.path}-${index}`}
              node={child}
              level={level + 1}
              onToggle={onToggle}
              expandedNodes={expandedNodes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface TreeVisualizationProps {
  data: TreeNode[];
  className?: string;
  title?: string;
}

export const TreeVisualization: React.FC<TreeVisualizationProps> = ({
  data,
  className,
  title,
}) => {
  const [expandedNodes, setExpandedNodes] = React.useState<Set<string>>(
    new Set(["escrows", "escrows/escrows-by-role", "escrows/escrows-by-signer"])
  );

  const handleToggle = (path: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  return (
    <div className={cn("border rounded-lg p-4 bg-muted/20", className)}>
      {title && (
        <h4 className="font-medium text-sm mb-3 text-muted-foreground">
          {title}
        </h4>
      )}
      <div className="font-mono text-sm">
        {data.map((node, index) => (
          <TreeNodeComponent
            key={`${node.path}-${index}`}
            node={node}
            level={0}
            onToggle={handleToggle}
            expandedNodes={expandedNodes}
          />
        ))}
      </div>
    </div>
  );
};
