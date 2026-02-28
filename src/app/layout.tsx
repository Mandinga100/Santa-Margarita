import type { Metadata } from "next";
import { Inter, Playfair_Display } from 'next/font/google';
import "./globals.css";

import NavbarPremium from '@/components/NavbarPremium/NavbarPremium';
import FooterPremium from '@/components/FooterPremium/FooterPremium';
import NavbarMobile from '@/components/NavbarMobile/NavbarMobile';
import WhatsAppFlotante from '@/components/WhatsAppFlotante/WhatsAppFlotante';

import SmoothScroll from '@/components/SmoothScroll/SmoothScroll';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Funeraria Santa Margarita Chile | Planes Funerarios Premium 24/7",
  description: "Servicios funerarios compasivos en Santiago. Planes desde $1.360.000. Memoriales exclusivos, traslados nacionales. Llámanos 24/7.",
  keywords: "funeraria santiago, planes funerarios chile, servicios memoriales",
  openGraph: {
    locale: 'es_CL',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className="font-sans bg-[#F9F9F9] dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden min-h-screen flex flex-col pt-0 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FuneralHome",
              "name": "Funeraria Santa Margarita",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Macul, Santiago",
                "addressCountry": "CL"
              },
              "telephone": "+56-2-XXXXXXX",
              "priceRange": "$$$",
              "openingHours": "Mo-Su 00:00-23:59"
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
