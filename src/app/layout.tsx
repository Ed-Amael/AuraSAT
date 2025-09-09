import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuraSAT - Connecting India's Remotest Areas",
  description: "AuraSAT: Connecting India's Remotest Areas with Internet and Weather Insights through LEO satellite technology.",
  keywords: ["AuraSAT", "satellite", "internet", "weather", "India", "remote areas", "LEO", "college project"],
  authors: [{ name: "AuraSAT Team" }],
  openGraph: {
    title: "AuraSAT - Connecting India's Remotest Areas",
    description: "Bringing internet and weather insights to remote India through LEO satellite technology",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuraSAT - Connecting India's Remotest Areas",
    description: "Bringing internet and weather insights to remote India through LEO satellite technology",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
