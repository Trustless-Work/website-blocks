"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { writeTextToClipboard } from "@/lib/clipboard";

type CopiedMap = Record<string, true>;

interface ClipboardContextValue {
  copy: (text: string, key?: string, durationMs?: number) => Promise<void>;
  isCopied: (key: string) => boolean;
}

const ClipboardContext = createContext<ClipboardContextValue | undefined>(
  undefined
);

export function ClipboardProvider({ children }: { children: React.ReactNode }) {
  const [copiedMap, setCopiedMap] = useState<CopiedMap>({});
  const timeoutsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach((id) =>
        window.clearTimeout(id)
      );
    };
  }, []);

  const isCopied = (key: string) => Boolean(key && copiedMap[key]);

  const copy = async (text: string, key?: string, durationMs = 2000) => {
    await writeTextToClipboard(text);
    const copyKey = key ?? text;

    setCopiedMap((prev) => ({ ...prev, [copyKey]: true }));

    if (timeoutsRef.current[copyKey]) {
      window.clearTimeout(timeoutsRef.current[copyKey]);
    }

    const timeoutId = window.setTimeout(() => {
      setCopiedMap((prev) => {
        const next = { ...prev } as CopiedMap;
        delete next[copyKey];
        return next;
      });
      delete timeoutsRef.current[copyKey];
    }, durationMs);

    timeoutsRef.current[copyKey] = timeoutId;
  };

  const value = useMemo<ClipboardContextValue>(
    () => ({ copy, isCopied }),
    [copiedMap]
  );

  return (
    <ClipboardContext.Provider value={value}>
      {children}
    </ClipboardContext.Provider>
  );
}

export function useClipboard(): ClipboardContextValue {
  const ctx = useContext(ClipboardContext);
  if (!ctx) {
    throw new Error("useClipboard must be used within a ClipboardProvider");
  }
  return ctx;
}
