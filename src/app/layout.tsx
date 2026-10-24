import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { SITE, SITE_URL } from "@/lib/site";
import { Analytics } from "@/components/analytics";
import { ConsentBanner } from "@/components/consent-banner";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#071421",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE.title, template: "%s | Escalab" },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE_URL }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  alternates: {
    canonical: "/",
    languages: { "es-AR": "/", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    locale: SITE.locale,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full">
        <a
          href="#contenido"
          className="fixed left-3 top-3 z-[70] -translate-y-20 rounded-lg bg-ink px-4 py-2 font-bold text-navy transition-transform focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        {/* filtro de refracción para el efecto liquid glass (backdrop-filter: url(#liquid-glass)) */}
        <svg aria-hidden width="0" height="0" className="absolute">
          <filter id="liquid-glass" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.022" numOctaves="2" seed="4" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2.5" result="soft" />
            <feDisplacementMap in="SourceGraphic" in2="soft" scale="26" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        {children}
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
