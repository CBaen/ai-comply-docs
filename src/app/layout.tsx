import type { Metadata } from "next";
import { Merriweather, Source_Sans_3 } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://aicompliancedocuments.com"),
  verification: {
    google: "YttkkRZdguWjTkMceRmuH1LahOwIQlawMPjLjmwD9Lg",
  },
  title: {
    default: "AI Compliance Documents — AI Compliance Documentation Generator",
    template: "%s | AI Compliance Documents",
  },
  description:
    "AI compliance documents for state and federal AI regulations. Illinois, Colorado, Texas, California, NYC, EU AI Act. Instant download, fraction of legal fees.",
  keywords: [
    "AI compliance", "AI regulation", "compliance documents", "AI hiring law",
    "algorithmic discrimination", "AI governance", "HB3773", "SB 24-205", "TRAIGA", "CCPA ADMT",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aicompliancedocuments.com",
    siteName: "AI Compliance Documents",
    title: "AI Compliance Documents — AI Compliance Documentation Generator",
    description: "Generate AI compliance documents for state and federal regulations. Instant download, fraction of legal fees.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Compliance Documents",
    description: "AI compliance documents for every state. Self-service, instant download.",
    images: ["https://aicompliancedocuments.com/opengraph-image"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
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
      <body className="bg-slate-50 text-gray-900 antialiased font-sans transition-colors" suppressHydrationWarning>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7KYPZS9H9P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-7KYPZS9H9P');
        `}</Script>
        <Script id="dark-mode-init" strategy="beforeInteractive">{`
          (function() {
            var stored = localStorage.getItem('theme');
            if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          })();
        `}</Script>
        {children}
      </body>
    </html>
  );
}
