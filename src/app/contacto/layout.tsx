import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contacto y Asesoría 24/7 | Funeraria Santa Margarita',
    description: 'Comuníquese con nosotros las 24 horas. Nuestro equipo de atención permanente está disponible para brindarle contención y asesoría inmediata.',
    alternates: {
        canonical: 'https://funeraria-sm.web.app/contacto'
    }
};

export default function ContactoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contacto - Funeraria Santa Margarita",
        "description": "Información de contacto y asistencia 24/7 de Funeraria Santa Margarita.",
        "publisher": { "@type": "FuneralHome", "name": "Funeraria Santa Margarita" }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}
