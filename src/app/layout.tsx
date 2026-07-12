import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pinoy PPC Academy | Start a VA Career with Proof",
  description: "Career-first Amazon PPC training for Filipinos starting or shifting into virtual assistant work.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#10182b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
