"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, Menu } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-10"
      suppressHydrationWarning
    >
      <div className="flex justify-between h-14 w-full items-center">
        <div className="mr-4 flex md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetHeader>
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              </SheetHeader>

              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                  <Link
                    className={cn(
                      "transition-colors hover:text-foreground/80 text-foreground/60",
                      pathname.startsWith("/get-started") &&
                        "text-primary font-bold"
                    )}
                    href="/get-started"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Get Started
                  </Link>
                  <Link
                    className={cn(
                      "transition-colors hover:text-foreground/80 text-foreground/60",
                      pathname.startsWith("/blocks") && "text-primary font-bold"
                    )}
                    href="/blocks"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Blocks
                  </Link>
                  <Link
                    className={cn(
                      "transition-colors hover:text-foreground/80 text-foreground/60",
                      pathname.startsWith("/contribute") &&
                        "text-primary font-bold"
                    )}
                    href="/contribute"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Contribute
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Image
              src="/favicon.ico"
              alt="Trustless Work"
              width={32}
              height={32}
            />
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              className={cn(
                "transition-colors hover:text-foreground/80 text-foreground/60",
                pathname.startsWith("/get-started") && "text-primary font-bold"
              )}
              href="/get-started"
              onClick={() => {
                setOpen(false);
              }}
            >
              Get Started
            </Link>
            <Link
              className={cn(
                "transition-colors hover:text-foreground/80 text-foreground/60",
                pathname.startsWith("/blocks") && "text-primary font-bold"
              )}
              href="/blocks"
              onClick={() => {
                setOpen(false);
              }}
            >
              Blocks
            </Link>
            <Link
              className={cn(
                "transition-colors hover:text-foreground/80 text-foreground/60",
                pathname.startsWith("/contribute") && "text-primary font-bold"
              )}
              href="/contribute"
              onClick={() => {
                setOpen(false);
              }}
            >
              Contribute
            </Link>
          </nav>
        </div>

        {/* Mobile logo for when menu is closed */}
        <div className="flex md:hidden">
          <Link className="flex items-center space-x-2" href="/">
            <Image
              src="/favicon.ico"
              alt="Trustless Work"
              width={32}
              height={32}
            />
          </Link>
        </div>

        <div className="w-full flex-1 md:w-auto md:flex-none hidden">
          <Button
            variant="outline"
            className="relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
          >
            <Search className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline-flex">
              Search documentation...
            </span>
            <span className="sm:hidden">Search...</span>
          </Button>
        </div>
        <nav className="flex items-center">
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
