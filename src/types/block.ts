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

export type CodeByVariant = Partial<Record<EscrowVariant, string>>;

export type RequiredBlock = {
  name: string;
  url?: string;
};

export type Block = {
  id: string;
  title: string;
  description: string;
  category: "Escrows" | "Wallet" | "Table" | "Cards" | string;
  image: string | string[];
  tags: string[];
  code: string;
  docTypeUrl?: string;
  exampleUrl?: string;
  newBlocks?: boolean;
  escrowType?: EscrowType;
  types?: EscrowReleaseType[];
  variants?: EscrowVariant[];
  codeByTypeAndVariant?: CodeByTypeAndVariant;
  installByTypeAndVariant?: CodeByTypeAndVariant;
  installByVariant?: CodeByVariant;
  install?: string;
  requiredProviders?: string[];
  notes?: string[];
  requiredBlocks?: (string | RequiredBlock)[];
};
