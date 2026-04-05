'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const milestones = [
    {
        year: '1996',
        title: 'El Origen del Compromiso',
        description: 'Bajo la visión de ofrecer un refugio de dignidad ante la pérdida, Funeraria Santa Margarita abre sus puertas en Santiago, estableciendo un estándar de humanidad sin precedentes.'
    },
    {
        year: '2010',
        title: 'Evolución del Protocolo',
        description: 'La inauguración de nuestros salones de velación de alta gama redefine el concepto de despedida en Chile, integrando la máxima sobriedad con el confort absoluto para las familias.'
    },
    {
        year: '2020',
        title: 'Soberanía Digital',
        description: 'Ante el desafío global, lideramos la creación de Santuarios Digitales, permitiendo que la honra y el recuerdo trasciendan las fronteras físicas mediante tecnología de alta deliberación ética.'
    },
    {
        year: '2024',
        title: 'Legado de Excelencia',
        description: 'Consolidamos nuestra posición como referentes mundiales en la gestión del duelo, fusionando tres décadas de tradición con una visión de futuro basada en el respeto supremo.'
    }
];

const valores = [
    {
        icon: 'account_balance',
        title: 'Dignidad Rectora',
        description: 'Consideramos cada existencia como un capítulo sagrado. Nuestra labor es custodiar ese relato con una solemnidad que honre la grandeza de cada vida.'
    },
    {
        icon: 'verified_user',
        title: 'Integridad Ética',
        description: 'Operamos bajo el más estricto rigor profesional, garantizando discreción absoluta y un cumplimiento normativo que protege la honra familiar por sobre todo.'
    },
    {
        icon: 'auto_awesome',
        title: 'Excelencia Estética',
        description: 'Creemos que la belleza es una forma de consuelo. Cada detalle visual y operativo es curado para reflejar el respeto que nos define como institución.'
    }
];

const lideres = [
    {
        name: 'Carlos Margarita',
        role: 'Director General & Visionario Fundador',
        image: '/assets/images/equipo/director-general.webp'
    },
    {
        name: 'Elena Valdivia',
        role: 'Directora de Protocolo y Honor',
        image: '/assets/images/equipo/directora-operaciones.webp'
    },
    {
        name: 'Andrés Soto',
        role: 'Curador de Legado & Patrimonio Familiar',
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
        <main ref={containerRef} className="min-h-screen bg-[#191919] text-zinc-300 font-inter pt-32 pb-48 selection:bg-[#C5A059] selection:text-black antialiased overflow-x-hidden">

            {/* Hero Section - Editorial Depth */}
            <section ref={heroRef} className="relative h-[75vh] flex items-center justify-center overflow-hidden mb-48 border-b border-zinc-800 bg-black/50">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#191919] z-10"></div>
                <div className="absolute inset-0 hero-bg-parallax scale-110">
                    <Image
                        src="/assets/images/otros/memorial-sky.webp"
                        alt="Historia y Legado - Funeraria Santa Margarita"
                        fill
                        priority
                        className="object-cover opacity-20 grayscale"
                        sizes="100vw"
                    />
                </div>
                <div className="relative z-20 text-center px-6 max-w-6xl">
                    <span className="text-[10px] md:text-xs font-light uppercase tracking-[0.4em] text-[#C5A059] block mb-8">Nuestra Trayectoria desde 1996</span>
                    <h1 className="font-serif text-white text-5xl md:text-8xl mb-12 italic leading-[1.1] tracking-tight">
                        La Vanguardia del <br /> <span className="text-[#C5A059]/80">Respeto Eterno</span>
                    </h1>
                    <div className="w-20 h-px bg-[#C5A059] mx-auto mt-12 opacity-50"></div>
                </div>
            </section>

            {/* Manifest Focus - High Legibility Contrast */}
            <section className="max-w-4xl mx-auto px-6 mb-64 text-center">
                <header className="mb-20">
                    <h2 className="font-serif text-4xl md:text-6xl italic text-white leading-tight tracking-tight mb-10">Vocación de <br /> Servicio Trascendente</h2>
                    <div className="w-12 h-px bg-[#C5A059]/40 mx-auto"></div>
                </header>
                <div className="space-y-16 text-zinc-400 leading-[1.8] text-xl md:text-2xl font-light italic px-4 md:px-12">
                    <p>
                        "En Funeraria Santa Margarita, comprendemos que honrar una vida es un acto de soberanía. No solo gestionamos despedidas; custodiamos el honor de su historia."
                    </p>
                    <p className="text-zinc-500 text-lg md:text-xl not-italic font-sans">
                        Nuestra trayectoria de tres décadas se ha forjado en la intersección entre la tradición más solemne y una infraestructura digital de estándar mundial.
                    </p>
                </div>
            </section>

            {/* Timeline - Premium Dark Flow */}
            <section className="py-64 bg-black/30 mb-64 border-y border-zinc-800 timeline-section relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 relative">
                    <div className="relative">
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-zinc-800 hidden md:block"></div>

                        {milestones.map((m, idx) => (
                            <div
                                key={m.year}
                                className={`timeline-item relative flex flex-col md:flex-row items-center justify-between mb-48 last:mb-0 ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                            >
                                <div className={`w-full md:w-[45%] ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'} mb-12 md:mb-0 group`}>
                                    <span className="font-serif text-7xl md:text-8xl text-white/5 font-black italic block mb-6 group-hover:text-[#C5A059]/10 transition-colors duration-1000">{m.year}</span>
                                    <h3 className="text-xl md:text-2xl font-light text-white uppercase tracking-[0.3em] leading-none mb-6">{m.title}</h3>
                                    <p className="text-zinc-500 font-light leading-relaxed text-lg italic max-w-lg mx-auto md:ml-auto md:mr-0 group-hover:text-zinc-300 transition-colors duration-700">{m.description}</p>
                                </div>
                                <div className="size-3 bg-[#C5A059] rounded-full relative z-10 border-[8px] border-[#191919] shadow-[0_0_20px_rgba(197,160,89,0.3)] hidden md:block scale-100 group-hover:scale-150 transition-all duration-1000"></div>
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
                            <div className="mb-12 flex justify-center relative">
                                <span className="material-symbols-outlined text-6xl text-[#C5A059]/20 group-hover:text-[#C5A059] transition-all duration-1000 transform group-hover:scale-110">
                                    {v.icon}
                                </span>
                            </div>
                            <h4 className="font-serif text-3xl mb-8 italic text-white tracking-tight">{v.title}</h4>
                            <p className="text-zinc-500 text-lg font-light leading-relaxed italic border-t border-zinc-800 pt-10 group-hover:text-zinc-300 transition-colors">
                                {v.description}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Leadership Section - High-End Portrait Gallery */}
            <section className="max-w-7xl mx-auto px-6 mb-64 leaders-grid">
                <header className="text-center mb-32">
                    <span className="text-[10px] md:text-xs font-light uppercase tracking-widest text-[#C5A059] block mb-10">Dirección y Protocolo</span>
                    <h2 className="font-serif text-5xl md:text-7xl italic text-white tracking-tight leading-none">Arquitectos de la <span className="text-[#C5A059]/50">Memoria</span></h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                    {lideres.map((l) => (
                        <div key={l.name} className="leader-card flex flex-col items-center group">
                            <div className="aspect-[4/5] w-full mb-12 overflow-hidden rounded-[3rem] shadow-2xl border border-zinc-800 relative bg-zinc-900">
                                <Image
                                    src={l.image}
                                    alt={`Retrato de ${l.name}`}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2s] ease-in-out group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                            <h3 className="font-serif text-3xl text-white italic tracking-tight mb-4 group-hover:translate-y-[-5px] transition-transform duration-700">{l.name}</h3>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] font-light text-center px-4">{l.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Final Professional Commitment */}
            <section className="max-w-5xl mx-auto px-6 text-center mt-32 relative">
                <div className="w-20 h-px bg-[#C5A059]/20 mx-auto mb-20"></div>
                <blockquote className="font-serif text-3xl md:text-5xl mb-24 italic text-zinc-400 leading-tight tracking-tight max-w-3xl mx-auto">
                    &quot;Honrar la vida es el primer paso para encontrar la paz en la despedida.&quot;
                </blockquote>
                <div className="flex justify-center">
                    <Link
                        href="/cotizacion"
                        className="group relative inline-block border border-[#C5A059] text-[#C5A059] px-16 py-5 rounded-full font-light uppercase text-xs tracking-[0.4em] hover:bg-[#C5A059] hover:text-black transition-all duration-700 overflow-hidden"
                    >
                        <span className="relative z-10">Contáctenos</span>
                    </Link>
                </div>
            </section>

        </main>
    );
}
