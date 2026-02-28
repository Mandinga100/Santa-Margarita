import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Previsión Familiar | Funeraria Santa Margarita',
    description: 'Protocolo de previsión familiar. Asegure la paz y tranquilidad de sus seres queridos con planes de cobertura vitalicia.',
    alternates: {
        canonical: 'https://funeraria-sm.web.app/prevision'
    }
};

export default function PrevisionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Seguro de Previsión Funeraria",
        "description": "Planes de previsión familiar con cobertura en caso de fallecimiento, protegiendo a la familia de decisiones logísticas y financieras.",
        "provider": { "@type": "FuneralHome", "name": "Funeraria Santa Margarita" }
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
