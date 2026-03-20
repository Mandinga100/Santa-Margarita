import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cotización Inmediata | Funeraria Santa Margarita',
    description: 'Solicite un presupuesto detallado para servicios funerarios, cremación o previsión familiar. Asistencia inmediata y transparente.',
    alternates: {
        canonical: 'https://funeraria-sm.web.app/cotizacion'
    }
};

export default function CotizacionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Cotización de Servicios - Funeraria Santa Margarita",
        "description": "Formulario de cotización y contacto para servicios funerarios.",
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
