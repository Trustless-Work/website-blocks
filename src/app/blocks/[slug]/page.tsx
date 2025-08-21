import { BlockPage } from "@/modules/blocks/SlugView";

interface BlockPageProps {
  params: {
    slug: string;
  };
}

export default function BlocksPage({ params }: BlockPageProps) {
  return <BlockPage params={params} />;
}
