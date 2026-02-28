import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Memoriales Eternos | Funeraria Santa Margarita',
    description: 'Muro de la memoria. En cada historia reside un legado que trasciende el tiempo, habitando eternamente en nuestro recuerdo.',
    alternates: {
        canonical: 'https://funeraria-sm.web.app/memoriales'
    }
};

export default function MemorialesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Memoriales Eternos - Funeraria Santa Margarita",
        "description": "Directorio y muro de memoria para honrar a los seres queridos.",
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
