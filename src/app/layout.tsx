import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ClipboardProvider } from "@/providers/ClipboardProvider";
import { ReactQueryClientProvider } from "@/components/tw-blocks/providers/ReactQueryClientProvider";
import { TrustlessWorkProvider } from "@/components/tw-blocks/providers/TrustlessWork";
import { Toaster } from "@/components/ui/sonner";

const Exo2 = localFont({
  src: "./fonts/Exo2.ttf",
  variable: "---exo-2",
  weight: "100 900",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trustless Work | Blocks",
  description: "Trustless Work",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#006BE4",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Trustless Work",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#006BE4" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Trustless Work" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={cn(Exo2.variable, "antialiased", spaceGrotesk.className)}
      >
        <ThemeProvider>
          <ClipboardProvider>
            <main className="min-h-screen container mx-auto px-4">
              {children}
            </main>
          </ClipboardProvider>
        </ThemeProvider>

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
