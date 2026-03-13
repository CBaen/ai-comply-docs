import type { Metadata } from "next";
import { Merriweather, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aicomplydocs.com"),
  title: {
    default: "AI Comply Docs — AI Compliance Documentation Generator",
    template: "%s | AI Comply Docs",
  },
  description:
    "Generate AI compliance documents for state and federal regulations. Self-service, instant download, fraction of legal fees. Illinois, Colorado, Texas, California, and more.",
  keywords: [
    "AI compliance", "AI regulation", "compliance documents", "AI hiring law",
    "algorithmic discrimination", "AI governance", "HB3773", "SB 24-205", "TRAIGA", "CCPA ADMT",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aicomplydocs.com",
    siteName: "AI Comply Docs",
    title: "AI Comply Docs — AI Compliance Documentation Generator",
    description: "Generate AI compliance documents for state and federal regulations. Instant download, fraction of legal fees.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Comply Docs",
    description: "AI compliance documents for every state. Self-service, instant download.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${merriweather.variable} ${sourceSans.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased font-sans transition-colors">
        {children}
      </body>
    </html>
  );
}
