'use client';

import Link from 'next/link';

const milestones = [
    {
        year: '1996',
        title: 'La Fundación',
        description: 'Se establecen los cimientos de Funeraria Santa Margarita con el compromiso de brindar un servicio digno a la comunidad.'
    },
    {
        year: '2010',
        title: 'Innovación',
        description: 'Apertura de nuestras modernas salas de velación y expansión de servicios de previsión familiar integral.'
    },
    {
        year: '2020',
        title: 'Era Digital',
        description: 'Lanzamiento de memoriales digitales y ceremonias en streaming, uniendo familias a pesar de la distancia.'
    },
    {
        year: '2024',
        title: 'Legado Presente',
        description: 'Consolidación como líderes regionales, manteniendo la esencia del respeto y la compasión en cada detalle.'
    }
];

const valores = [
    {
        icon: 'shrine',
        title: 'Dignidad',
        description: 'Tratamos cada vida con el honor supremo que merece, cuidando cada detalle con solemnidad absoluta.'
    },
    {
        icon: 'favorite',
        title: 'Respeto',
        description: 'Entendemos la profundidad del duelo y actuamos con la máxima discreción, empatía y profesionalismo.'
    },
    {
        icon: 'auto_awesome',
        title: 'Excelencia',
        description: 'Buscamos la perfección en cada ceremonia, desde la estética visual hasta la precisión logística.'
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
        <main className="min-h-screen bg-black text-white font-display pt-32 pb-24 selection:bg-white/10 antialiased">

            {/* Hero Section - Estilo Editorial Stitch */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-32 border-b border-white/5">
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center scale-110"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAeEbGYZADvSf2-MVS-tRbUlFAV11ipsHTPNZ8s_WDfFfQHRaX6rro5r-0QrLnE4d9CAHP9ZwpAZek1LMATleyZpH-dlmgxxK0X0_h5SNCvMkanlmr1zg-xf1weZnp3E8xlELzi2gLzkEoQ2BGBEVvybICqgr-g_OzzleWQ-hhN7nEe3efMdmtOCqMAFSPo97a8wh4meM9z_vdn_iMmuGyGM5AsGDsgFXQNE6vKAA0wFPj-rkdKO9AJ3-OYkUXUjthYsjkGfZJVYqI')" }}
                ></div>
                <div className="relative z-20 text-center px-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block mb-6">Nuestra Esencia</span>
                    <h1 className="font-serif text-white text-6xl md:text-8xl italic">Historia y Legado</h1>
                    <div className="w-20 h-px bg-white/20 mx-auto mt-12"></div>
                </div>
            </section>

            {/* Manifest Focus - Legibilidad Extrema */}
            <section className="max-w-4xl mx-auto px-6 mb-48 text-center">
                <h2 className="font-serif text-4xl md:text-5xl italic mb-16 text-white underline decoration-white/10 underline-offset-[16px]">Un Compromiso Inquebrantable</h2>
                <div className="space-y-12 text-white/70 leading-relaxed text-xl font-light">
                    <p>
                        Desde hace casi tres décadas, Funeraria Santa Margarita ha sido un pilar de consuelo y distinción. Lo que nació como un compromiso familiar hoy es un referente de excelencia técnica y humana.
                    </p>
                    <p>
                        Nuestra filosofía trasciende lo convencional: curamos homenajes que reflejan la grandeza de cada existencia con una dedicación absoluta a la privacidad y la solemnidad.
                    </p>
                </div>
            </section>

            {/* Timeline - Estética Dark Premium */}
            <section className="py-40 bg-white/[0.02] mb-48 border-y border-white/5 overflow-hidden">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="relative">
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-white/10 hidden md:block"></div>

                        {milestones.map((m, idx) => (
                            <div
                                key={m.year}
                                className={`relative flex flex-col md:flex-row items-center justify-between mb-32 last:mb-0 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                            >
                                <div className={`w-full md:w-[45%] ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'} mb-8 md:mb-0`}>
                                    <span className="font-serif text-6xl text-white/10 font-black italic block mb-4">{m.year}</span>
                                    <h3 className="text-xl font-black text-white uppercase tracking-[0.3em]">{m.title}</h3>
                                    <p className="text-white/50 mt-6 font-light leading-relaxed text-lg">{m.description}</p>
                                </div>
                                <div className="size-3 bg-white rounded-full relative z-10 border-[10px] border-black shadow-2xl hidden md:block group-hover:scale-150 transition-transform"></div>
                                <div className="hidden md:block w-[45%]"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Grid - UI Minimalista */}
            <section className="max-w-6xl mx-auto px-6 mb-48">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                    {valores.map((v) => (
                        <article key={v.title} className="text-center group">
                            <div className="mb-12 flex justify-center">
                                <span className="material-symbols-outlined text-6xl text-white/10 group-hover:text-white transition-all duration-1000 transform group-hover:scale-110">
                                    {v.icon}
                                </span>
                            </div>
                            <h4 className="font-serif text-3xl mb-6 italic text-white">{v.title}</h4>
                            <p className="text-white/50 text-lg font-light leading-relaxed">
                                {v.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Leadership Section - GrayScale & Contrast */}
            <section className="max-w-7xl mx-auto px-6 mb-48">
                <div className="text-center mb-24">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 block mb-6">Nuestro Liderazgo</span>
                    <h2 className="font-serif text-5xl md:text-6xl italic text-white">Vocación por la Excelencia</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {lideres.map((l) => (
                        <div key={l.name} className="flex flex-col items-center group">
                            <div className="aspect-[4/5] w-full mb-10 overflow-hidden rounded-[2.5rem] shadow-3xl shadow-black/60 border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-1000">
                                <img
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    src={l.image}
                                    alt={`Retrato de ${l.name}`}
                                    loading="lazy"
                                />
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-white italic">{l.name}</h3>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 mt-4 font-black">{l.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final Call to Honor */}
            <section className="max-w-4xl mx-auto px-6 text-center mt-32">
                <div className="w-16 h-px bg-white/10 mx-auto mb-16"></div>
                <blockquote className="font-serif text-3xl md:text-4xl mb-16 italic text-white/80 leading-relaxed font-light">
                    "Honrar la vida es el primer paso para encontrar la paz en la despedida."
                </blockquote>
                <Link
                    href="/cotizacion"
                    className="inline-block bg-white text-black px-16 py-6 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-slate-200 transition-all shadow-2xl shadow-white/5"
                >
                    Conversemos hoy
                </Link>
            </section>
        </main>
    );
}
