"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarNavItems = [
  {
    title: "Get Started",
    items: [
      {
        title: "Introduction",
        href: "/get-started",
      },
      {
        title: "Installation",
        href: "/get-started/installation",
      },
      {
        title: "components.json",
        href: "/get-started/components-json",
      },
      {
        title: "Theming",
        href: "/get-started/theming",
      },
      {
        title: "Dark Mode",
        href: "/get-started/dark-mode",
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Accordion",
        href: "/components/accordion",
      },
      {
        title: "Alert",
        href: "/components/alert",
      },
      {
        title: "Button",
        href: "/components/button",
      },
      {
        title: "Card",
        href: "/components/card",
      },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-full">
      {sidebarNavItems.map((item, index) => (
        <div key={index} className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item?.items?.length && (
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {item.items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                    pathname === item.href
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
