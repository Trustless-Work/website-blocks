"use client";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { ClipboardProvider } from "@/providers/ClipboardProvider";
import { ReactQueryClientProvider } from "@/components/tw-blocks/providers/ReactQueryClientProvider";
import { TrustlessWorkProvider } from "@/components/tw-blocks/providers/TrustlessWork";
import { WalletProvider } from "@/components/tw-blocks/wallet-kit/WalletProvider";
import { EscrowProvider } from "@/components/tw-blocks/providers/EscrowProvider";
import { EscrowAmountProvider } from "@/components/tw-blocks/providers/EscrowAmountProvider";
import { EscrowDialogsProvider } from "@/components/tw-blocks/providers/EscrowDialogsProvider";

interface GlobalProvidersProps {
  children: React.ReactNode;
}

export function GlobalProviders({ children }: GlobalProvidersProps) {
  return (
    <ThemeProvider>
      <ClipboardProvider>
        <ReactQueryClientProvider>
          <TrustlessWorkProvider>
            <WalletProvider>
              <EscrowProvider>
                <EscrowAmountProvider>
                  <EscrowDialogsProvider>{children}</EscrowDialogsProvider>
                </EscrowAmountProvider>
              </EscrowProvider>
            </WalletProvider>
          </TrustlessWorkProvider>
        </ReactQueryClientProvider>
      </ClipboardProvider>
    </ThemeProvider>
  );
}
