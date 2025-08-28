import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Block } from "@/types/block";

export const RelatedBlockCard = ({ block: relatedBlock }: { block: Block }) => (
  <Link href={`/blocks/${relatedBlock.id}`}>
    <Card className="group cursor-pointer transition-all hover:shadow-md">
      <CardContent className="px-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-sm line-clamp-2">
              {relatedBlock.title}
            </h4>
            <Badge variant="outline" className="text-xs shrink-0">
              {relatedBlock.category}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {relatedBlock.description.slice(0, 40)}...
          </p>
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-wrap gap-1">
              {relatedBlock.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {relatedBlock.tags.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{relatedBlock.tags.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);
