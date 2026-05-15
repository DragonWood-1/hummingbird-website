import type { Metadata } from "next";
import IdentifierClient from "@/components/IdentifierClient";

export const metadata: Metadata = {
  title: "Hummingbird Identifier – Identify Species by Color, Size & Range",
  description:
    "Identify hummingbird species by color, throat color, size, and region with our interactive tool. Compare similar species side-by-side and learn key field marks.",
  keywords: [
    "hummingbird identifier",
    "hummingbird identification",
    "identify hummingbirds by color",
    "hummingbird field guide",
    "ruby-throated hummingbird",
    "rufous hummingbird",
    "similar hummingbird species",
  ],
  alternates: { canonical: "https://hummingbirdguide.com/identifier" },
};

export default function IdentifierPage() {
  return <IdentifierClient />;
}
