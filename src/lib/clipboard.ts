"use client";

/**
 * Writes the provided text to the user's clipboard.
 * Includes a DOM-based fallback for insecure contexts or older browsers.
 */
export async function writeTextToClipboard(text: string): Promise<void> {
  if (typeof window !== "undefined") {
    try {
      if (window.isSecureContext && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }
    } catch {
      // Fallback below
    }

    // Fallback: create a hidden textarea and use execCommand('copy')
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } finally {
      document.body.removeChild(textArea);
    }
  }
}
