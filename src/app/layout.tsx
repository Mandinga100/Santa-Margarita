import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Funeraria Elite | Honrando la vida con dignidad y respeto",
  description: "Servicios funerarios de excelencia, memoriales virtuales y acompañamiento integral 24/7. La plataforma funeraria líder en calidad y compromiso.",
  keywords: "funeraria, servicios funerarios, obituarios, memoriales, cremacion, sepultacion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
