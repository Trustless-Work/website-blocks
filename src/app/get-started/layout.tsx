"use client";

import type React from "react";
import { DocsSidebar } from "@/shared/DocsSidebar";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const decorativeOpacityClass = !mounted
    ? "opacity-10"
    : theme === "dark"
      ? "opacity-10"
      : "opacity-30";
  return (
    <>
      <Image
        src="/design/wall.svg"
        alt="Home"
        width={1000}
        height={1000}
        className={`w-1/2 sm:w-1/5 h-auto fixed -left-10 z-[-100] ${decorativeOpacityClass}`}
        quality={100}
      />

      <Image
        src="/design/wall.svg"
        alt="Home"
        width={1000}
        height={1000}
        className={`w-1/2 sm:w-1/5 h-auto fixed -right-50 top-90 z-[-100] ${decorativeOpacityClass}`}
        quality={100}
      />
      <div className="min-h-screen">
        <div className="container flex-1 items-start lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <aside className="top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 lg:sticky lg:block">
            <DocsSidebar />
          </aside>
          <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
            <div className="mx-auto w-full min-w-0">
              <div className="mb-4 lg:hidden">
                <DocsSidebar />
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
