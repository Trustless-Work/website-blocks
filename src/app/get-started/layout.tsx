import type React from "react";
import { SiteHeader } from "@/shared/SiteHeader";
import { DocsSidebar } from "@/shared/DocsSidebar";

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DocsSidebar />
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">{children}</div>
          <div className="hidden text-sm xl:block">
            <div className="sticky top-16 -mt-10 pt-4">
              <div className="space-y-2">
                <p className="font-medium">On This Page</p>
                <ul className="m-0 list-none">
                  <li className="mt-0 pt-2">
                    <a
                      className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
                      href="#installation"
                    >
                      Installation
                    </a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a
                      className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
                      href="#create-project"
                    >
                      Create project
                    </a>
                  </li>
                  <li className="mt-0 pt-2">
                    <a
                      className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
                      href="#add-components"
                    >
                      Add Components
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
