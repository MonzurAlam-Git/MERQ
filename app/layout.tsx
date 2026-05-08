// app/layout.tsx

import type { Metadata } from "next";

import Navbar from "@/components/layout/navbar";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "MERQ",
    template: "%s — MERQ", // product pages get: "Oversized Structured Coat — MERQ"
  },
  description: "Nothing excess. Nothing missing.",
  openGraph: {
    siteName: "MERQ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" className="dark">
        <body className="bg-onyx text-ivory">
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </ViewTransitions>
  );
}
