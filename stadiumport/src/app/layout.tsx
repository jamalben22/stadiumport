import type { Metadata } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import { Inter, Space_Grotesk, Oswald, JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import { Header } from "@/components/feature/Header";
import { Footer } from "@/components/feature/Footer";
import { WebVitalsReporter } from "@/components/analytics/WebVitalsReporter";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateOrganizationSchema, generateWebsiteSchema, generateSiteNavigationElementSchema } from "@/lib/schema";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";
import { CookieConsent } from "@/components/privacy/CookieConsent";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

// Font configurations
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

import { constructMetadata } from "@/lib/seo";
import { Providers } from "./providers";

const GA_MEASUREMENT_ID = 'G-7GLKVF44RM';

export const metadata = constructMetadata({
  title: "World Cup 2026 Guide | stadiumport",
  description: "The definitive guide to World Cup 2026. Expert insights, stadium guides, and travel planning.",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${oswald.variable} ${jetbrains.variable}`}>
      <head>
        <meta name="csp-nonce" content={nonce} />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.5.0/remixicon.min.css" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://flagcdn.com" />
        <meta name="google-adsense-account" content="ca-pub-5399794848914855" />
      </head>
      <body className="antialiased bg-background text-foreground transition-colors duration-300" suppressHydrationWarning>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5399794848914855"
          crossOrigin="anonymous"
          strategy="afterInteractive"
          nonce={nonce}
        />
        {/* Google tag (gtag.js) */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-7GLKVF44RM" 
          strategy="afterInteractive" 
          nonce={nonce}
        />
        <Script id="google-analytics" strategy="afterInteractive" nonce={nonce}>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-7GLKVF44RM');
          `}
        </Script>

        <Providers>
          <MicrosoftClarity />
          <CookieConsent />
          <AnalyticsTracker pageId="root" />
          <JsonLd schema={generateOrganizationSchema()} nonce={nonce} />
          <JsonLd schema={generateWebsiteSchema()} nonce={nonce} />
          <JsonLd schema={generateSiteNavigationElementSchema()} nonce={nonce} />
          <WebVitalsReporter />
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-blue-600 text-slate-900 dark:text-white rounded-md">
            Skip to content
          </a>
          <Header />
          <div id="main-content">
            {children}
          </div>
          <Footer />
        </Providers>
        <SpeedInsights />
        <Analytics mode="production" />
      </body>
    </html>
  );
}

