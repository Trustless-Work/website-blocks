import type { Block } from "@/types/block";

interface StructuredDataProps {
  type: "Organization" | "WebSite" | "SoftwareApplication" | "Article";
  data?: Record<string, unknown>;
  block?: Block;
}

export function StructuredData({ type, data, block }: StructuredDataProps) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://blocks.trustlesswork.com";

  const getStructuredData = () => {
    switch (type) {
      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Trustless Work",
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          description:
            "Trustless Work Blocks brings clean, modern escrow components for blockchain",
          sameAs: [
            "https://twitter.com/trustlesswork",
            "https://github.com/trustless-work",
          ],
        };

      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Trustless Work Blocks",
          url: baseUrl,
          description:
            "Trustless Work Blocks brings clean, modern escrow components for blockchain — copy and paste into your React apps, fully compatible, open source, and free forever.",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/blocks?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        };

      case "SoftwareApplication":
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Trustless Work Blocks",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web",
          description:
            "Trustless Work Blocks brings clean, modern escrow components for blockchain — copy and paste into your React apps, fully compatible, open source, and free forever.",
          url: baseUrl,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          softwareVersion: "1.0",
        };

      case "Article":
        if (!block) return null;
        return {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: block.title,
          description: block.description,
          url: `${baseUrl}/blocks/${block.id}`,
          author: {
            "@type": "Organization",
            name: "Trustless Work",
          },
          publisher: {
            "@type": "Organization",
            name: "Trustless Work",
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/logo.png`,
            },
          },
          keywords: block.tags.join(", "),
          articleSection: block.category,
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString(),
        };

      default:
        return data || {};
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
