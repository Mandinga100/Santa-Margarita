import type { Metadata } from "next";
import { Inter, Playfair_Display } from 'next/font/google';
import "./globals.css";

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import NavbarMobile from '@/components/NavbarMobile/NavbarMobile';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Funeraria Santa Margarita | Honrando la vida con dignidad y respeto",
  description: "Servicios funerarios de excelencia, memoriales virtuales y acompañamiento integral 24/7. La plataforma funeraria líder en calidad y compromiso.",
  keywords: "funeraria, servicios funerarios, obituarios, memoriales, cremacion, sepultacion",
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
      </head>
      <body className="font-sans bg-white dark:bg-[#191919] text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden min-h-screen flex flex-col pt-0 pb-16 lg:pb-0">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <NavbarMobile />
      </body>
    </html>
  );
}
