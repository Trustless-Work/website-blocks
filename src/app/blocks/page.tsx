import { Suspense } from "react";
import { Blocks } from "@/modules/blocks/View";

export const dynamic = "force-dynamic";

export default function BlocksPage() {
  return (
    <Suspense fallback={null}>
      <Blocks />
    </Suspense>
  );
}
