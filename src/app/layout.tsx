import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// OPTIMASI: Font dengan display swap dan preload
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const metadata: Metadata = {
  title: "Andika Huga - Full Stack Developer Portfolio",
  description: "Full Stack Developer with expertise in Web Development and UI/UX Design. Creating modern, performant web applications.",
  keywords: ["Full Stack Developer", "Web Developer", "UI/UX", "React", "Next.js", "Portfolio"],
  authors: [{ name: "Andika Huga Widyatama" }],
  openGraph: {
    title: "Andika Huga - Full Stack Developer",
    description: "Full Stack Developer Portfolio",
    type: "website",
  },
};

// OPTIMASI: Viewport untuk mobile experience yang lebih smooth
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        {/* Preconnect untuk load gambar lebih cepat */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://randomuser.me" />
        <link rel="dns-prefetch" href="https://randomuser.me" />
      </head>
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
