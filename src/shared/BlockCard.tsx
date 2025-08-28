import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Block } from "@/types/block";
import Image from "next/image";

type BlockCardProps = {
  block: Block;
};

export const BlockCard = ({ block }: BlockCardProps) => {
  // Normalize image(s) to an array for consistent rendering without relying on theme at SSR
  const toDirectDriveUrl = (url: string) => {
    // Supports: https://drive.google.com/file/d/<id>/view?... -> https://drive.google.com/uc?export=view&id=<id>
    const viewMatch = url.match(
      /https?:\/\/drive\.google\.com\/file\/d\/([^/]+)\//
    );
    if (viewMatch && viewMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${viewMatch[1]}`;
    }
    return url;
  };

  const rawImages = Array.isArray(block.image)
    ? block.image
    : typeof block.image === "string" && block.image.length > 0
      ? [block.image]
      : [];

  const images = rawImages.map((u) => toDirectDriveUrl(u));

  return (
    <Card className="group cursor-pointer transition-all hover:shadow-md flex flex-col h-full pt-0">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden rounded-t-lg bg-gradient-to-br from-primary-50 to-indigo-100 dark:from-primary-950 dark:to-indigo-900 flex items-center justify-center">
          {images.length > 0 ? (
            images.length >= 2 ? (
              <>
                {/* Light image */}
                <Image
                  src={images[0]}
                  alt={block.title}
                  className="h-full w-full transition-transform group-hover:scale-105 block dark:hidden"
                  width={1000}
                  height={1000}
                />
                {/* Dark image */}
                <Image
                  src={images[1]}
                  alt={block.title}
                  className="h-full w-full transition-transform group-hover:scale-105 hidden dark:block"
                  width={1000}
                  height={1000}
                />
              </>
            ) : (
              <Image
                src={images[0]}
                alt={block.title}
                className="h-full w-full transition-transform group-hover:scale-105"
                width={1000}
                height={1000}
              />
            )
          ) : (
            <div className="text-center p-6">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {block.category}
              </div>
              <div className="text-xs text-muted-foreground">
                {block.tags.slice(0, 2).join(", ")}
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-6 flex flex-col flex-grow">
        <div className="space-y-2 flex-grow">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{block.title}</CardTitle>
            <div className="flex items-center gap-1 shrink-0">
              {block.newBlocks && <Badge variant="default">NEW</Badge>}
              <Badge variant="outline" className="text-xs">
                {block.category}
              </Badge>
            </div>
          </div>
          <CardDescription>{block.description}</CardDescription>
          <div className="flex flex-wrap gap-1">
            {block.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {block.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{block.tags.length - 3}
              </Badge>
            )}
          </div>
          {/* Show variants if available */}
          {(() => {
            const variants = Array.isArray(block.variants)
              ? (block.variants as string[])
              : [];

            if (variants.length > 0) {
              return (
                <div className="flex items-center flex-wrap gap-1 mt-2">
                  <span className="text-xs text-muted-foreground mr-1 font-bold">
                    Variants:
                  </span>
                  {variants.map((variant) => (
                    <Badge
                      key={variant}
                      variant="outline"
                      className="text-xs border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300"
                    >
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </Badge>
                  ))}
                </div>
              );
            }
            return null;
          })()}
        </div>
        {/* Footer - siempre en la parte inferior */}
        <div className="mt-4 flex items-center justify-between pt-2 border-t border-border/50">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/blocks/${block.id}`}>
              View Details <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </Button>
          {(() => {
            const typesLabel = Array.isArray(block.types)
              ? (block.types as string[]).join(" | ")
              : block.escrowType
                ? block.escrowType.replace(",", " | ")
                : null;
            return typesLabel ? (
              <Badge variant="outline" className="text-xs">
                {typesLabel}
              </Badge>
            ) : null;
          })()}
        </div>
      </CardContent>
    </Card>
  );
};
