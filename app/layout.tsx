import type { Metadata } from "next";
import { Orbitron, Instrument_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const display = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});
const body = Instrument_Sans({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://qorvesqia.nestack.ai"),
  alternates: { canonical: "/" },
  title:
    "Qorvesqia AI — Live Event Production Operating System from Brief to Settlement.",
  description:
    "Qorvesqia AI delivers an end-to-end operational operating system for event production companies, concert touring, festivals, and technical AV teams — uniting technical riders, rigging engineering, IATSE crew dispatch, equipment logistics, live cue calling, and financial settlement.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
