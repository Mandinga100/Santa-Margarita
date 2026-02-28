'use client';

import Link from 'next/link';

const milestones = [
    {
        year: '1996',
        title: 'La Fundación',
        description: 'Se establecen los cimientos de Funeraria Santa Margarita, con el compromiso de brindar un servicio digno y humano a la comunidad.'
    },
    {
        year: '2010',
        title: 'Innovación en Servicios',
        description: 'Apertura de nuestras modernas salas de velación y expansión de servicios de previsión familiar.'
    },
    {
        year: '2020',
        title: 'Acompañamiento Digital',
        description: 'Lanzamiento de memoriales digitales y servicios de streaming para ceremonias, uniendo familias a la distancia.'
    },
    {
        year: '2024',
        title: 'Trayectoria y Futuro',
        description: 'Consolidación como líderes en servicios funerarios integrales, manteniendo la esencia del respeto y la compasión.'
    }
];

const valores = [
    {
        icon: 'shrine',
        title: 'Dignidad',
        description: 'Tratamos cada vida con el honor supremo que merece, cuidando cada detalle con solemnidad.'
    },
    {
        icon: 'favorite',
        title: 'Respeto',
        description: 'Entendemos la profundidad del duelo y actuamos con la máxima discreción y empatía.'
    },
    {
        icon: 'auto_awesome',
        title: 'Excelencia',
        description: 'Buscamos la perfección en cada ceremonia, desde la estética hasta la logística operativa.'
    }
];

const lideres = [
    {
        name: 'Carlos Margarita',
        role: 'Director General',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxVaL6DXmX6Nwuv-epeksZJnqzLW00S1sHwEapCl6suPTlq-4igIHYaV6_aSda8mXe104Nc6eLzKO6qH0tkxSkfwF8WtQ_0qNqO66raHzwPm6OhryxM3BzgsBgFidTgwT4XCx6lRH6wWQN22vi5KZscwhUJSEMHpPrkMNRr5LLCT5GFRFdhNs5kTG-xVSJhu2PkuozcP6x-xUSeSUOpUYcV_PtEB3WaJNLqZYspyMnShU2F8n4CdJhNG7To_XczrUkZkwyPHPGNwU'
    },
    {
        name: 'Elena Valdivia',
        role: 'Directora de Operaciones',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD36QqAR9AB8so_mjBIZyEMOQ_F_g3P_NAEv27FY7gi1lDGLzEEDRUuqR1rQkWreAQf0KbVC3qNw81ktkQ9gcgGOjwKowT-zbJTsdW-VmCauTUivOWAa9NkE3lmXHNFB3wsznSCQFsCfM67FyzoeVg8SLpIwKN4i1UfQTUZle4OUzKZnhNMgz84znrZQtR7CeAtQLwVKs6tuzWPoWVK6Q3kI3kpU4RW3D4lZ0eIGJyNJ-0MJXoYw31aGZ6uQJyhGVsc7RJO3pkz-Kg'
    },
    {
        name: 'Andrés Soto',
        role: 'Director de Patrimonio',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVZ8OgLfPDGQrmWILr4qaivMhVvx0AI-EmfYUGdTc7CZc3bZQShcx94PXvDau3RwOIxfND48AtPBQEZEpG9Uh8kSTrjcxyxBgL7Xz3PhoQDqMLmd52EG2V0SKQN67YuyD8qTo-AgMqNHn9PqRlFpH4WIYvd5itWAL_7a1itsdAhlnT0sSCqU7FNHdIE88R06qtHMKl8n-xvWs5_Y8aiDCPT9ct3XpQoKUa9MeJAzOEkAJRSTdSnOsL4bB8SfVUtaQLrhrZWMxthl4'
    }
];

export default function NosotrosPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-[#121212] pt-32 pb-24 font-display antialiased">

            {/* Hero Section with Parallax feeling */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-24">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center scale-110"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAeEbGYZADvSf2-MVS-tRbUlFAV11ipsHTPNZ8s_WDfFfQHRaX6rro5r-0QrLnE4d9CAHP9ZwpAZek1LMATleyZpH-dlmgxxK0X0_h5SNCvMkanlmr1zg-xf1weZnp3E8xlELzi2gLzkEoQ2BGBEVvybICqgr-g_OzzleWQ-hhN7nEe3efMdmtOCqMAFSPo97a8wh4meM9z_vdn_iMmuGyGM5AsGDsgFXQNE6vKAA0wFPj-rkdKO9AJ3-OYkUXUjthYsjkGfZJVYqI')" }}
                ></div>
                <div className="relative z-20 text-center px-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60 block mb-6">Nuestra Esencia</span>
                    <h1 className="font-serif text-white text-6xl md:text-8xl font-light italic">Nosotros</h1>
                    <div className="w-20 h-px bg-white/40 mx-auto mt-12"></div>
                </div>
            </section>

            {/* Legacy Section */}
            <section className="max-w-4xl mx-auto px-6 mb-32 text-center">
                <h2 className="font-serif text-4xl md:text-5xl italic mb-12 text-black dark:text-white underline decoration-black/5 underline-offset-8">Un Legado de Dignidad</h2>
                <div className="space-y-10 text-[#7E7D7D] leading-relaxed text-xl font-light">
                    <p>
                        Desde hace casi tres décadas, Funeraria Santa Margarita ha sido un pilar de consuelo y distinción para las familias en sus momentos más delicados. Lo que comenzó como un pequeño compromiso familiar se ha transformado en un referente de excelencia, donde cada detalle es una oda a la vida que honramos.
                    </p>
                    <p>
                        Nuestra filosofía trasciende lo convencional. No solo gestionamos despedidas; curamos homenajes que reflejan la grandeza de cada existencia. Con una dedicación inquebrantable a la privacidad y el respeto, hemos servido a generaciones, manteniendo intactos los valores de honestidad y compasión.
                    </p>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="py-32 bg-[#fcfcfc] dark:bg-slate-900/10 mb-32 border-y border-black/5">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="relative">
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-black/10 hidden md:block"></div>

                        {milestones.map((m, idx) => (
                            <div
                                key={m.year}
                                className={`relative flex flex-col md:flex-row items-center justify-between mb-24 last:mb-0 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                            >
                                <div className={`w-full md:w-[45%] ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'} mb-6 md:mb-0`}>
                                    <span className="font-serif text-5xl text-black/20 dark:text-white/20 font-black italic">{m.year}</span>
                                    <h3 className="text-xl font-bold text-black dark:text-white mt-2 uppercase tracking-widest">{m.title}</h3>
                                    <p className="text-[#7E7D7D] mt-4 font-light leading-relaxed">{m.description}</p>
                                </div>
                                <div className="size-4 bg-black dark:bg-white rounded-full relative z-10 border-8 border-[#fcfcfc] dark:border-[#1a1a1a] shadow-xl hidden md:block"></div>
                                <div className="hidden md:block w-[45%]"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="max-w-6xl mx-auto px-6 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                    {valores.map((v) => (
                        <div key={v.title} className="text-center group">
                            <div className="mb-10 flex justify-center">
                                <span className="material-symbols-outlined text-6xl text-black/10 group-hover:text-black transition-all duration-1000 transform group-hover:scale-110">
                                    {v.icon}
                                </span>
                            </div>
                            <h4 className="font-serif text-3xl mb-4 italic text-black dark:text-white">{v.title}</h4>
                            <p className="text-[#7E7D7D] font-light leading-relaxed">
                                {v.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Leadership Section */}
            <section className="max-w-6xl mx-auto px-6 mb-24">
                <div className="text-center mb-20">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20 block mb-4">Nuestro Liderazgo</span>
                    <h2 className="font-serif text-5xl italic text-black dark:text-white">Vocación y Compromiso</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {lideres.map((l) => (
                        <div key={l.name} className="flex flex-col items-center group">
                            <div className="aspect-[4/5] w-full mb-8 overflow-hidden rounded-[2rem] shadow-2xl shadow-black/5 border border-black/5 grayscale hover:grayscale-0 transition-all duration-1000">
                                <img
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    src={l.image}
                                    alt={l.name}
                                />
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-black dark:text-white italic">{l.name}</h3>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 mt-3 font-black">{l.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Final */}
            <section className="max-w-4xl mx-auto px-6 text-center mt-32">
                <div className="w-16 h-px bg-black/10 mx-auto mb-12"></div>
                <h2 className="font-serif text-3xl mb-12 italic text-black dark:text-white leading-relaxed">
                    "Honrar la vida es el primer paso para encontrar la paz en la despedida."
                </h2>
                <Link
                    href="/cotizacion"
                    className="inline-block bg-black text-white dark:bg-white dark:text-black px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:opacity-80 transition-all"
                >
                    Conversemos hoy
                </Link>
            </section>
        </main>
    );
}
