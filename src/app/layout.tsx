import type { Metadata } from "next";
import { Inter, Playfair_Display } from 'next/font/google';
import "./globals.css";

import NavbarPremium from '@/components/NavbarPremium/NavbarPremium';
import FooterPremium from '@/components/FooterPremium/FooterPremium';
import NavbarMobile from '@/components/NavbarMobile/NavbarMobile';
import WhatsAppFlotante from '@/components/WhatsAppFlotante/WhatsAppFlotante';
import SmoothScroll from '@/components/SmoothScroll/SmoothScroll';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Funeraria Santa Margarita | Servicios Funerarios Premium 24/7",
  description: "Dignidad y paz en cada despedida. Planes funerarios integrales desde $1.360.000, memoriales exclusivos y atención compasiva las 24 horas en Chile.",
  keywords: "funeraria santiago, planes funerarios chile, servicio funerario premium, memoriales digitales, funeraria 24 horas",
  authors: [{ name: "Funeraria Santa Margarita" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  robots: "index, follow",
  openGraph: {
    title: "Funeraria Santa Margarita | Servicios Funerarios Premium 24/7",
    description: "Acompañamiento digno y compasivo. Planes integrales y memoriales exclusivos.",
    url: 'https://funerariasantamargarita.cl',
    siteName: 'Funeraria Santa Margarita',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: '/assets/images/ui/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Funeraria Santa Margarita - Acompañamiento Digno',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Funeraria Santa Margarita',
    description: 'Servicios Funerarios Premium 24/7 en Chile.',
    images: ['/assets/images/ui/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-black text-white antialiased overflow-x-hidden min-h-screen flex flex-col selection:bg-white/10 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FuneralHome",
              "name": "Funeraria Santa Margarita",
              "url": "https://funerariasantamargarita.cl",
              "logo": "https://funerariasantamargarita.cl/assets/images/ui/logo-premium.png",
              "image": "https://funerariasantamargarita.cl/assets/images/ui/hero-bg.webp",
              "description": "Servicios funerarios premium y asistencia integral 24/7 en Chile.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Dirección Oficina Central",
                "addressLocality": "Macul",
                "addressRegion": "Santiago",
                "addressCountry": "CL"
              },
              "telephone": "+56964333760",
              "priceRange": "$$$",
              "openingHours": "Mo-Su 00:00-23:59",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-33.4833",
                "longitude": "-70.6000"
              },
              "sameAs": [
                "https://facebook.com/funerariasantamargarita",
                "https://instagram.com/funerariasantamargarita"
              ]
            })
          }}
        />
        <SmoothScroll>
          <NavbarPremium />
          <main className="flex-grow w-full">
            {children}
          </main>
          <FooterPremium />
          <WhatsAppFlotante />
          <NavbarMobile />
        </SmoothScroll>
      </body>
    </html>
  );
}
