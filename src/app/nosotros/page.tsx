'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const milestones = [
    {
        year: '1996',
        title: 'La Fundación',
        description: 'Se establecen los cimientos de Funeraria Santa Margarita con el compromiso inquebrantable de brindar un servicio digno y humano a la comunidad.'
    },
    {
        year: '2010',
        title: 'Innovación y Expansión',
        description: 'Apertura de nuestras modernas salas de velación VIP y expansión de servicios de previsión familiar con cobertura nacional integral.'
    },
    {
        year: '2020',
        title: 'Santuario Digital',
        description: 'Lanzamiento pionero de memoriales digitales de alta fidelidad, uniendo familias a través de ceremonias en streaming de nivel mundial.'
    },
    {
        year: '2024',
        title: 'Excelencia Consolidada',
        description: 'Consolidación como referentes de excelencia en el sector, manteniendo la esencia del respeto y la compasión en cada detalle operativo.'
    }
];

const valores = [
    {
        icon: 'shrine',
        title: 'Dignidad',
        description: 'Tratamos cada existencia con el honor supremo que merece, custodiando cada detalle con una solemnidad absoluta y constante.'
    },
    {
        icon: 'favorite',
        title: 'Respeto',
        description: 'Entendemos la profundidad del duelo humano y actuamos con la máxima discreción, empatía y profesionalismo ético.'
    },
    {
        icon: 'auto_awesome',
        title: 'Excelencia',
        description: 'Buscamos la perfección estética y operativa en cada ceremonia, desde la curaduría visual hasta la precisión logística impecable.'
    }
];

const lideres = [
    {
        name: 'Carlos Margarita',
        role: 'Director General & Fundador',
        image: '/assets/images/equipo/director-general.webp'
    },
    {
        name: 'Elena Valdivia',
        role: 'Directora de Protocolo & Operaciones',
        image: '/assets/images/equipo/directora-operaciones.webp'
    },
    {
        name: 'Andrés Soto',
        role: 'Director de Legado & Patrimonio',
        image: '/assets/images/equipo/director-patrimonio.webp'
    }
];

export default function NosotrosPage() {
    const heroRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Hero Parallax
            gsap.to(".hero-bg-parallax", {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Timeline Items staggered animation
            gsap.fromTo(".timeline-item",
                { opacity: 0, scale: 0.95, y: 30 },
                {
                    opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.3, ease: "expo.out",
                    scrollTrigger: {
                        trigger: ".timeline-section",
                        start: "top 75%",
                    }
                }
            );

            // Values staggered animation
            gsap.fromTo(".value-card",
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power4.out",
                    scrollTrigger: {
                        trigger: ".values-grid",
                        start: "top 85%",
                    }
                }
            );

            // Leaders portraits reveal
            gsap.fromTo(".leader-card",
                { opacity: 0, scale: 0.9 },
                {
                    opacity: 1, scale: 1, duration: 1.5, stagger: 0.2, ease: "expo.out",
                    scrollTrigger: {
                        trigger: ".leaders-grid",
                        start: "top 85%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] font-display pt-32 pb-48 selection:bg-black/10 antialiased overflow-x-hidden">

            {/* Hero Section - Editorial Depth */}
            <section ref={heroRef} className="relative h-[75vh] flex items-center justify-center overflow-hidden mb-48 border-b border-black/5 shadow-md">
                <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white z-10"></div>
                <div className="absolute inset-0 hero-bg-parallax scale-110">
                    <Image
                        src="/assets/images/otros/memorial-sky.webp"
                        alt="Historia y Legado - Funeraria Santa Margarita"
                        fill
                        priority
                        className="object-cover opacity-30 grayscale"
                        sizes="100vw"
                    />
                </div>
                <div className="relative z-20 text-center px-6 max-w-6xl">
                    <span className="text-sm font-black uppercase tracking-[0.4em] text-black/40 block mb-12">Desde 1996</span>
                    <h1 className="font-serif text-[#1A1A1A] text-6xl md:text-9xl mb-12 italic leading-[0.8] tracking-tighter">
                        Nuestro <br /> <span className="text-black/50">Legado Eterno</span>
                    </h1>
                    <div className="w-32 h-px bg-black/10 mx-auto mt-16 scale-x-150"></div>
                </div>
            </section>

            {/* Manifest Focus - High Legibility Contrast */}
            <section className="max-w-4xl mx-auto px-6 mb-64 text-center">
                <header className="mb-20">
                    <h2 className="font-serif text-5xl md:text-7xl italic text-[#1A1A1A] leading-none tracking-tighter mb-10">Vocación de <br /> Servicio Trascendente</h2>
                    <div className="w-12 h-px bg-amber-600/40 mx-auto"></div>
                </header>
                <div className="space-y-16 text-black/60 leading-[1.8] text-2xl font-light italic px-12 border-x border-black/10">
                    <p>
                        "En Funeraria Santa Margarita, no solo gestionamos despedidas; custodiamos historias de vida con una veneración absoluta."
                    </p>
                    <p className="text-black/80">
                        Nuestra trayectoria de casi tres décadas se ha forjado en la intersección entre la tradición más respetuosa y la innovación tecnológica de vanguardia.
                    </p>
                </div>
            </section>

            {/* Timeline - Premium Light Flow */}
            <section className="py-64 bg-black/[0.01] mb-64 border-y border-black/5 timeline-section relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-[1000px] bg-black/[0.02] blur-[150px] -translate-y-1/2 pointer-events-none rounded-full"></div>
                <div className="max-w-6xl mx-auto px-6 relative">
                    <div className="relative">
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-black/10 hidden md:block"></div>

                        {milestones.map((m, idx) => (
                            <div
                                key={m.year}
                                className={`timeline-item relative flex flex-col md:flex-row items-center justify-between mb-48 last:mb-0 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                            >
                                <div className={`w-full md:w-[45%] ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'} mb-12 md:mb-0 group`}>
                                    <span className="font-serif text-8xl text-black/[0.04] font-black italic block mb-6 group-hover:text-black/10 transition-colors duration-1000">{m.year}</span>
                                    <h3 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-[0.4em] leading-none mb-8">{m.title}</h3>
                                    <p className="text-black/60 font-light leading-relaxed text-xl italic max-w-lg mx-auto md:ml-auto md:mr-0 group-hover:text-black/80 transition-colors duration-700">{m.description}</p>
                                </div>
                                <div className="size-4 bg-black rounded-full relative z-10 border-[12px] border-white shadow-[0_0_30px_rgba(0,0,0,0.1)] hidden md:block scale-75 group-hover:scale-125 transition-all duration-1000"></div>
                                <div className="hidden md:block w-[45%]"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Grid - Minimalist Excellence */}
            <section className="max-w-7xl mx-auto px-6 mb-64 values-grid">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                    {valores.map((v) => (
                        <article key={v.title} className="value-card text-center group">
                            <div className="mb-16 flex justify-center relative">
                                <span className="material-symbols-outlined text-7xl text-black/10 group-hover:text-amber-600 transition-all duration-1000 transform group-hover:scale-125 group-hover:rotate-6">
                                    {v.icon}
                                </span>
                                <div className="absolute inset-0 bg-black/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            </div>
                            <h4 className="font-serif text-4xl mb-8 italic text-[#1A1A1A] tracking-tighter">{v.title}</h4>
                            <p className="text-black/60 text-xl font-light leading-relaxed italic border-t border-black/10 pt-10 group-hover:text-black/80 transition-colors">
                                {v.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Leadership Section - High-End Portrait Gallery */}
            <section className="max-w-7xl mx-auto px-6 mb-64 leaders-grid">
                <header className="text-center mb-32">
                    <span className="text-sm font-black uppercase tracking-widest text-black/40 block mb-10">Alta Dirección</span>
                    <h2 className="font-serif text-6xl md:text-8xl italic text-[#1A1A1A] tracking-tighter leading-none">Arquitectos de la <span className="text-black/50 underline decoration-black/10 underline-offset-[20px]">Memoria</span></h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                    {lideres.map((l) => (
                        <div key={l.name} className="leader-card flex flex-col items-center group">
                            <div className="aspect-[4/5] w-full mb-12 overflow-hidden rounded-[4rem] shadow-2xl border border-black/5 relative bg-zinc-100">
                                <Image
                                    src={l.image}
                                    alt={`Retrato de ${l.name}`}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] ease-in-out group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-80"></div>
                            </div>
                            <h3 className="font-serif text-4xl text-[#1A1A1A] italic tracking-tighter mb-4 group-hover:translate-y-[-5px] transition-transform duration-700">{l.name}</h3>
                            <p className="text-xs md:text-sm uppercase tracking-widest text-black/50 font-black group-hover:tracking-[0.4em] transition-all duration-1000 text-center px-4">{l.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final Professional Commitment */}
            <section className="max-w-5xl mx-auto px-6 text-center mt-32 relative">
                <div className="w-32 h-px bg-black/10 mx-auto mb-20"></div>
                <blockquote className="font-serif text-4xl md:text-6xl mb-24 italic text-[#1A1A1A]/80 leading-[1.3] font-light tracking-tighter max-w-3xl mx-auto">
                    &quot;Honrar la vida es el primer paso para encontrar la paz en la despedida.&quot;
                </blockquote>
                <div className="flex justify-center">
                    <Link
                        href="/cotizacion"
                        className="group relative inline-block bg-[#1A1A1A] text-white px-24 py-10 rounded-full font-black uppercase text-base tracking-widest hover:bg-black transition-all shadow-xl overflow-hidden"
                    >
                        <span className="relative z-10 italic">Inicie un Dialogo</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </Link>
                </div>
            </section>
        </main>
    );
}
