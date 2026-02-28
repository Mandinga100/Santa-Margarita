import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Planes Funerarios | Funeraria Santa Margarita',
    description: 'Conoce nuestros planes funerarios diseñados para brindar la mayor solemnidad y excelencia. Desde nuestra línea esencial hasta el Raúl Premium VIP.',
    alternates: {
        canonical: 'https://funeraria-sm.web.app/planes'
    }
};

export default function PlanesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
            {
                "@type": "Product",
                "position": 1,
                "name": "Plan Azucena",
                "brand": { "@type": "Brand", "name": "Funeraria Santa Margarita" },
                "offers": { "@type": "Offer", "price": "1360000", "priceCurrency": "CLP" }
            },
            {
                "@type": "Product",
                "position": 2,
                "name": "Plan Quillay",
                "brand": { "@type": "Brand", "name": "Funeraria Santa Margarita" },
                "offers": { "@type": "Offer", "price": "2390000", "priceCurrency": "CLP" }
            },
            {
                "@type": "Product",
                "position": 3,
                "name": "Plan Queule",
                "brand": { "@type": "Brand", "name": "Funeraria Santa Margarita" },
                "offers": { "@type": "Offer", "price": "2990000", "priceCurrency": "CLP" }
            },
            {
                "@type": "Product",
                "position": 4,
                "name": "Raúl Premium VIP",
                "brand": { "@type": "Brand", "name": "Funeraria Santa Margarita" },
                "offers": { "@type": "Offer", "price": "3590000", "priceCurrency": "CLP" }
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
