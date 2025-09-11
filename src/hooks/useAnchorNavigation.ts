"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useAnchorNavigation = () => {
  const router = useRouter();

  const navigateToAnchor = useCallback(
    (anchorId: string) => {
      const newUrl = `${window.location.pathname}${window.location.search}#${anchorId}`;
      router.replace(newUrl);

      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
    [router]
  );

  return { navigateToAnchor };
};
