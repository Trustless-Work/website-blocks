import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GlobalProviders } from "@/providers/GlobalProviders";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/shared/Footer";
import { SiteHeader } from "@/shared/SiteHeader";
import { StructuredData } from "@/components/StructuredData";

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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://blocks.trustlesswork.com"
  ),
  title: {
    default: "Trustless Work Blocks | React Components for Blockchain Escrows",
    template: "%s | Trustless Work Blocks",
  },
  description:
    "Trustless Work Blocks brings clean, modern escrow components for blockchain — copy and paste into your React apps, fully compatible, open source, and free forever.",
  keywords: [
    "React components",
    "blockchain escrow",
    "Stellar escrow",
    "React hooks",
    "open source",
    "web3 components",
    "escrow system",
    "dispute resolution",
    "Trustless Work",
  ],
  authors: [{ name: "Trustless Work" }],
  creator: "Trustless Work",
  publisher: "Trustless Work",
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Trustless Work Blocks",
    title: "Trustless Work Blocks | React Components for Blockchain Escrows",
    description:
      "Trustless Work Blocks brings clean, modern escrow components for blockchain — copy and paste into your React apps, fully compatible, open source, and free forever.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Trustless Work Blocks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trustless Work Blocks | React Components for Blockchain Escrows",
    description:
      "Trustless Work Blocks brings clean, modern escrow components for blockchain — copy and paste into your React apps, fully compatible, open source, and free forever.",
    images: ["/og-image.png"],
    creator: "@trustlesswork",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#006BE4",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Trustless Work",
  },
  alternates: {
    canonical: "/",
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
        <StructuredData type="Organization" />
        <StructuredData type="WebSite" />
        <StructuredData type="SoftwareApplication" />
        <GlobalProviders>
          <SiteHeader />
          <main className="min-h-screen container mx-auto px-4">
            {children}
          </main>
          <Footer />
        </GlobalProviders>

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
