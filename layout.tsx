import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XYZ — Everyday Marketplace",
  description: "A purple-themed marketplace for everyday shopping in Bangladesh.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
