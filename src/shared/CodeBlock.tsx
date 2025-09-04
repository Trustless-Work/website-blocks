"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  coldarkCold,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { useClipboard } from "@/providers/ClipboardProvider";

interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
}

export function CodeBlock({ code, filename, language }: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { copy, isCopied } = useClipboard();
  const copyKey = useMemo(
    () => (filename ? `${filename}:${code}` : code),
    [filename, code]
  );
  const copyToClipboard = async () => copy(code, copyKey);

  return (
    <div className="relative">
      {filename && (
        <div className="flex items-center justify-between p-4 pb-0 rounded-t-lg bg-muted">
          <span className="text-sm font-medium">{filename}</span>
        </div>
      )}
      <div className="relative overflow-hidden bg-muted">
        <Button
          size="sm"
          variant="ghost"
          className="absolute right-2 top-2 h-8 w-8 p-0 bg-transparent cursor-pointer z-10"
          onClick={copyToClipboard}
        >
          {isCopied(copyKey) ? (
            <Check className="h-3 w-3 text-green-800" />
          ) : (
            <Copy className="h-3 w-3 text-muted-foreground" />
          )}
        </Button>
        <SyntaxHighlighter
          showLineNumbers
          language={language ?? "bash"}
          style={
            mounted
              ? resolvedTheme === "dark"
                ? oneDark
                : coldarkCold
              : undefined
          }
          customStyle={{
            background: "transparent",
            margin: 0,
            padding: "1rem",
          }}
          codeTagProps={{ className: "text-sm" }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
