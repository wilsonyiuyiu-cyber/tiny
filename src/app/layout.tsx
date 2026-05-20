import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tiny Humans | The Future of Digital Identity",
  description: "Interact, manage, and explore the world of Tiny Humans. Powered by Solana and OpenHuman.",
  keywords: ["Tiny Humans", "Solana", "NFT", "Crypto", "Digital Identity", "OpenHuman"],
  authors: [{ name: "Tiny Project Labs" }],
  openGraph: {
    title: "Tiny Humans | The Future of Digital Identity",
    description: "Interact, manage, and explore the world of Tiny Humans. Powered by Solana and OpenHuman.",
    url: "https://tinyhumans.xyz",
    siteName: "Tiny Humans",
    images: [
      {
        url: "/tiny-app.png",
        width: 1200,
        height: 630,
        alt: "Tiny Humans Preview",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiny Humans | The Future of Digital Identity",
    description: "Interact, manage, and explore the world of Tiny Humans. Powered by Solana and OpenHuman.",
    images: ["/tiny-app.png"],
    creator: "@TinyHumanAi",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
