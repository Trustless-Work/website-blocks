export type EscrowType =
  | "single-release"
  | "multi-release"
  | "single-release,multi-release"
  | null;

export type EscrowReleaseType = "single-release" | "multi-release";
export type EscrowVariant = "form" | "button" | "dialog";

export type CodeByTypeAndVariant = Partial<
  Record<EscrowReleaseType, Partial<Record<EscrowVariant, string>>>
>;

export type Block = {
  id: string;
  title: string;
  description: string;
  category: "Escrows" | "Wallet" | "Table" | "Cards" | string;
  image: string;
  tags: string[];
  code: string;
  newBlocks?: boolean;
  steps: string[];
  escrowType?: EscrowType;
  // Normalized, JSON-driven fields for types and variants
  types?: EscrowReleaseType[];
  variants?: EscrowVariant[];
  codeByTypeAndVariant?: CodeByTypeAndVariant;
};
