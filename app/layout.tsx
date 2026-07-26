import type { Metadata } from "next";
import { Chakra_Petch, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import NavMenu from "./components/NavMenu";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  variable: "--chakra",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--plex-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PhishGuard",
  description: "Spot phishing emails before they catch you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavMenu />
        {children}
      </body>
    </html>
  );
}
