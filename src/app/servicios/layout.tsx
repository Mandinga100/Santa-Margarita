import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Servicios Funerarios | Funeraria Santa Margarita',
    description: 'Ceremonias de gala, crematorios, traslados internacionales y asesoría legal. Dignidad que trasciende.',
    alternates: {
        canonical: 'https://funeraria-sm.web.app/servicios'
    }
};

export default function ServiciosLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Servicios Funerarios Integrales",
        "description": "Lista de servicios ofrecidos por Funeraria Santa Margarita.",
        "itemListElement": [
            {
                "@type": "Service",
                "position": 1,
                "name": "Ceremonias de Gala",
                "serviceType": "Funeral Ceremony",
                "provider": { "@type": "FuneralHome", "name": "Funeraria Santa Margarita" }
            },
            {
                "@type": "Service",
                "position": 2,
                "name": "Crematorio y Cinerarios",
                "serviceType": "Cremation Service",
                "provider": { "@type": "FuneralHome", "name": "Funeraria Santa Margarita" }
            },
            {
                "@type": "Service",
                "position": 3,
                "name": "Traslados Internacionales",
                "serviceType": "Repatriation Service",
                "provider": { "@type": "FuneralHome", "name": "Funeraria Santa Margarita" }
            }
        ]
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
