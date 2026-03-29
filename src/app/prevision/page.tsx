'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const beneficios = [
    {
        icono: 'lock',
        titulo: 'Precios Congelados',
        descripcion: 'Proteja su patrimonio de la inflación futura. El costo pactado hoy se mantiene vigente por siempre, sin reajustes inesperados.',
    },
    {
        icono: 'family_restroom',
        titulo: 'Tranquilidad Familiar',
        descripcion: 'Evite que sus seres queridos enfrenten decisiones logísticas y financieras complejas en el momento más vulnerable.',
    },
    {
        icono: 'spa',
        titulo: 'Voluntad Respetada',
        descripcion: 'Diseñe hoy su homenaje póstumo según sus valores y preferencias, asegurando un legado auténtico y digno.',
    },
];

const pasos = [
    {
        numero: '01',
        titulo: 'Asesoría Privada',
        descripcion: 'Un especialista senior le brinda orientación experta en una sesión confidencial para definir protocolos específicos.',
    },
    {
        numero: '02',
        titulo: 'Selección Personalizada',
        descripcion: 'Personalice cada detalle: desde el cofre hasta el estilo de la ceremonia, asegurando que cada aspecto refleje su historia.',
    },
    {
        numero: '03',
        titulo: 'Convenio de Paz',
        descripcion: 'Active su cobertura con opciones de financiación flexible y obtenga la certificación de protección vitalicia.',
    },
];

export default function PrevisionPage() {
    const heroRef = useRef<HTMLElement>(null);
    const benefitsRef = useRef<HTMLElement>(null);
    const stepsRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Parallax
        if (heroRef.current) {
            gsap.to(".hero-bg-image", {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }

        // Animated Headers
        const headers = document.querySelectorAll(".fade-up-header");
        if (headers.length > 0) {
            gsap.fromTo(".fade-up-header",
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.5, ease: "expo.out", scrollTrigger: { trigger: ".fade-up-header", start: "top 90%" } }
            );
        }

        // Benefits Animation
        if (benefitsRef.current) {
            gsap.fromTo(".benefit-card",
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "expo.out",
                    scrollTrigger: {
                        trigger: benefitsRef.current,
                        start: "top 80%",
                    }
                }
            );
        }

        // Steps Animation
        if (stepsRef.current) {
            gsap.fromTo(".step-item",
                { opacity: 0, x: -30 },
                {
                    opacity: 1, x: 0, duration: 1.2, stagger: 0.3, ease: "expo.out",
                    scrollTrigger: {
                        trigger: stepsRef.current,
                        start: "top 80%",
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <main className="min-h-screen bg-[#1A1A1A] text-white font-display pt-32 pb-32 selection:bg-white/10 antialiased overflow-hidden">

            <style jsx>{`
                .glass-badge {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    padding: 0.7rem 1.8rem;
                    border-radius: 100px;
                    display: inline-block;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                }
                .badge-text {
                    font-weight: 900;
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.7rem;
                    letter-spacing: 0.5em;
                    text-transform: uppercase;
                }
            `}</style>

            {/* Hero Section - Ultra-Polish Parallax */}
            <section ref={heroRef} className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden mb-48 border-b border-white/5">
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/40 to-black"></div>
                <div className="absolute inset-0 hero-bg-image scale-110">
                    <Image
                        src="/assets/images/otros/clouds.webp"
                        alt="Previsión Funeraria - La Paz de Decidir"
                        fill
                        priority
                        className="object-cover opacity-60"
                    />
                </div>
                <div className="relative z-20 text-center px-6 max-w-6xl">
                    <div className="glass-badge mb-12">
                        <span className="badge-text block">Protocolo de Previsión Familiar</span>
                    </div>
                    <h1 className="font-serif text-white text-6xl md:text-9xl mb-12 italic leading-[0.85] tracking-tighter fade-up-header ceo-title-1">
                        La Paz de <br /> <span className="text-white/40">Saber Decidir</span>
                    </h1>
                    <p className="text-white/40 text-xl md:text-2xl font-light tracking-wide italic max-w-2xl mx-auto ceo-text-main">
                        "Un legado se construye con amor, pero se protege con previsión."
                    </p>
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 opacity-20">
                    <div className="w-px h-16 bg-gradient-to-b from-white to-transparent"></div>
                </div>
            </section>

            {/* Benefits Grid - Glassmorphism UI */}
            <section ref={benefitsRef} className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-64">
                {beneficios.map((b) => (
                    <article key={b.titulo} className="benefit-card relative group p-16 rounded-[3.5rem] bg-white/[0.01] border border-white/5 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-1000">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-all">
                            <span className="material-symbols-outlined text-9xl">{b.icono}</span>
                        </div>
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-12 group-hover:bg-white group-hover:text-black transition-all duration-700">
                            <span className="material-symbols-outlined text-3xl">
                                {b.icono}
                            </span>
                        </div>
                        <h3 className="font-serif text-4xl mb-8 italic text-white group-hover:translate-x-2 transition-transform duration-700">{b.titulo}</h3>
                        <p className="text-white/40 text-xl leading-relaxed font-light mb-auto">
                            {b.descripcion}
                        </p>
                        <div className="mt-12 h-px w-0 bg-white/20 group-hover:w-full transition-all duration-1000"></div>
                    </article>
                ))}
            </section>

            {/* Steps Process - Editorial Design */}
            <section ref={stepsRef} className="max-w-7xl mx-auto px-6 mb-64">
                <div className="bg-white/[0.02] border border-white/5 rounded-[5rem] p-16 md:p-40 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>

                    <header className="mb-32 text-center lg:text-left flex flex-col lg:flex-row items-end justify-between gap-12">
                        <div className="max-w-2xl">
                            <span className="text-sm md:text-base font-black uppercase tracking-widest text-white/40 block mb-6">Metodología</span>
                            <h2 className="font-serif text-5xl md:text-7xl italic leading-none text-white fade-up-header ceo-title-2">Protocolo de <br /> Activación Vitalicia</h2>
                        </div>
                        <p className="text-white/30 text-xl font-light italic max-w-sm lg:text-right ceo-text-desc">
                            Un proceso diseñado para eliminar cualquier fricción en momentos complejos.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24 relative">
                        {pasos.map((paso) => (
                            <div key={paso.numero} className="step-item group">
                                <span className="text-8xl font-serif text-white/[0.02] block mb-10 group-hover:text-white/10 transition-all duration-700">
                                    {paso.numero}
                                </span>
                                <div className="space-y-6">
                                    <h3 className="text-3xl font-serif italic text-white/90">{paso.titulo}</h3>
                                    <p className="text-white/40 text-lg font-light leading-relaxed">
                                        {paso.descripcion}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA - Pure Contrast */}
            <section className="max-w-5xl mx-auto px-6 text-center">
                <div className="bg-white p-24 md:p-40 rounded-[5rem] relative overflow-hidden group shadow-3xl">
                    <div className="relative z-10">
                        <span className="material-symbols-outlined text-6xl text-black/10 mb-12 block">verified_user</span>
                        <h2 className="font-serif text-6xl md:text-8xl mb-12 italic text-black leading-none ceo-title-2">Inicie su Blindaje.</h2>
                        <p className="text-black/40 text-2xl mb-20 max-w-2xl mx-auto font-light leading-relaxed italic ceo-text-desc">
                            "Decidir hoy no es pensar en el final, es asegurar que el amor sea lo único que importe mañana."
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                            <a
                                href="tel:+56964333760"
                                className="w-full sm:w-auto bg-[#1A1A1A] border border-white/20 text-white px-16 py-8 rounded-full font-black uppercase text-sm tracking-widest hover:bg-black transition-all shadow-3xl"
                            >
                                Llamar a Especialista
                            </a>
                            <Link
                                href="/cotizacion"
                                className="w-full sm:w-auto border border-black/20 text-black px-16 py-8 rounded-full font-black uppercase text-sm tracking-widest hover:bg-black/5 transition-all"
                            >
                                Cotizar Protección
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
