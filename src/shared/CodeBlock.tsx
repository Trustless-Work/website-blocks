"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({
  code,
  language = "bash",
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      {filename && (
        <div className="flex items-center justify-between rounded-t-lg border border-b-0 bg-muted px-4 py-2">
          <span className="text-sm font-medium">{filename}</span>
        </div>
      )}
      <div className="relative">
        <pre
          className={`overflow-x-auto rounded-lg ${
            filename ? "rounded-t-none" : ""
          } bg-muted p-4`}
        >
          <code className="text-sm">{code}</code>
        </pre>
        <Button
          size="sm"
          variant="outline"
          className="absolute right-2 top-2 h-8 w-8 p-0 bg-transparent"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
    </div>
  );
}
