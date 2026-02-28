import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nuestro Legado | Funeraria Santa Margarita',
    description: 'Conoce nuestra historia, valores y al equipo de profesionales dedicados a brindar un servicio con dignidad, respeto y excelencia desde 1996.',
    alternates: {
        canonical: 'https://funeraria-sm.web.app/nosotros'
    }
};

export default function NosotrosLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "name": "Acerca de Funeraria Santa Margarita",
        "description": "Historia y valores de la funeraria.",
        "publisher": { "@type": "FuneralHome", "name": "Funeraria Santa Margarita", "foundingDate": "1996" }
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
