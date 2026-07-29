import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import NavMenu from "./components/NavMenu";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--space-grotesk",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--inter",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--jetbrains-mono",
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavMenu />
        {children}
      </body>
    </html>
  );
}
