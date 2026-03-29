'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Fuente verdad: planes oficiales Funeraria Santa Margarita
const planes = [
    {
        id: 'raul-premium',
        nombre: 'Raúl Premium',
        categoria: 'Elite VIP',
        precio: '$3.590.000',
        descripcion: 'Excelencia y acompañamiento absoluto.',
        destacado: true,
        icon: 'workspace_premium',
        incluye: ['Cofre Maderas Nobles VIP', 'Sala VIP Preferencial 24h', 'Coro en Ceremonia', 'Aviso Prensa Nacional', 'Mercedes Gala'],
    },
    {
        id: 'queule',
        nombre: 'Queule / Algarrobo',
        categoria: 'Superior',
        precio: '$2.990.000',
        descripcion: 'Atención personalizada y solemne.',
        destacado: false,
        icon: 'verified',
        incluye: ['Cofre Roble Nacional', 'Sala Velación 24h', 'Libro de Condolencias', 'Arreglos Florales Especiales', 'Carroza de Lujo'],
    },
    {
        id: 'quillay',
        nombre: 'Quillay',
        categoria: 'Estándar',
        precio: '$2.390.000',
        descripcion: 'Dignidad y respeto esencial.',
        destacado: false,
        icon: 'star',
        incluye: ['Cofre Madera Barnizada', 'Sala Velación 12h', 'Trámites Legales Completos', 'Carroza Estándar', 'Asesoría Familiar'],
    },
    {
        id: 'azucena',
        nombre: 'Azucena',
        categoria: 'Esencial',
        precio: '$1.360.000',
        descripcion: 'Calidad al alcance de todos.',
        destacado: false,
        icon: 'eco',
        incluye: ['Cofre Estándar Lineal', 'Traslado Local Inmediato', 'Capilla Pública / Domicilio', 'Apoyo en Trámites Civiles'],
    },
];

export default function PlanesPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(".planes-header",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.5, ease: "expo.out" }
            );

            // Table Row Animation
            gsap.fromTo(".table-row",
                { opacity: 0, x: -20 },
                {
                    opacity: 1, x: 0, duration: 1.2, stagger: 0.1, ease: "expo.out",
                    scrollTrigger: {
                        trigger: ".comparison-table",
                        start: "top 80%",
                    }
                }
            );

            // Cards Animation
            gsap.fromTo(".plan-card",
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "expo.out",
                    scrollTrigger: {
                        trigger: ".planes-grid",
                        start: "top 85%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen bg-[#1A1A1A] text-white font-display pt-32 pb-48 selection:bg-white/10 antialiased overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Hero Section - Editorial Aesthetic */}
                <section className="text-center mb-48 planes-header">
                    <span className="text-base font-black uppercase tracking-[0.4em] text-white/50 block mb-12">Protocolos de Dignidad Suprema</span>
                    <h1 className="font-serif text-6xl md:text-9xl mb-12 italic leading-[0.85] tracking-tighter ceo-title-1">Nuestros <span translate="no" className="text-white/40 notranslate">Planes</span></h1>
                    <p className="text-white/40 max-w-3xl mx-auto text-2xl font-light leading-relaxed italic border-x border-white/5 px-12 ceo-text-main">
                        "Cada vida es una obra maestra que merece ser honrada con la mayor solemnidad y excelencia posible."
                    </p>
                </section>

                {/* Comparison Table Section - Premium Grid */}
                <section className="mb-64 comparison-table overflow-hidden">
                    <div className="overflow-x-auto rounded-[3.5rem] bg-white/[0.01] border border-white/5 shadow-3xl">
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-white/[0.03] text-white">
                                    <th className="p-12 text-sm md:text-base font-black uppercase tracking-widest text-white/50 border-b border-white/5">Atributos</th>
                                    <th className="p-12 text-sm md:text-base font-black uppercase tracking-widest text-center border-b border-white/5">Azucena</th>
                                    <th className="p-12 text-sm md:text-base font-black uppercase tracking-widest text-center border-b border-white/5">Quillay</th>
                                    <th className="p-12 text-sm md:text-base font-black uppercase tracking-widest text-center border-b border-white/5">Queule</th>
                                    <th className="p-12 text-sm md:text-base font-black uppercase tracking-widest text-center border-b border-amber-500/20 text-amber-500 bg-amber-500/[0.02]">Raúl Premium VIP</th>
                                </tr>
                            </thead>
                            <tbody className="text-white/40">
                                <tr className="table-row border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                                    <td className="p-12 text-sm font-black uppercase tracking-widest text-white/40">Cofre / Urna</td>
                                    <td className="p-12 text-xl text-center font-light">Línea Estándar</td>
                                    <td className="p-12 text-xl text-center font-light">Madera Barnizada</td>
                                    <td className="p-12 text-xl text-center font-light">Roble Nacional</td>
                                    <td className="p-12 text-xl text-center font-serif italic text-white bg-amber-500/[0.02]">Maderas de Importación</td>
                                </tr>
                                <tr className="table-row border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                                    <td className="p-12 text-sm font-black uppercase tracking-widest text-white/40">Sala de Velación</td>
                                    <td className="p-12 text-xl text-center font-light italic">Capilla Local</td>
                                    <td className="p-12 text-xl text-center font-light">Estándar 12h</td>
                                    <td className="p-12 text-xl text-center font-light">Privada 24h</td>
                                    <td className="p-12 text-xl text-center font-serif italic text-white bg-amber-500/[0.02] underline decoration-amber-500/30 underline-offset-[12px]">Suite Presidencial</td>
                                </tr>
                                <tr className="table-row border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                                    <td className="p-12 text-sm font-black uppercase tracking-widest text-white/40">Fila de Gala</td>
                                    <td className="p-12 text-xl text-center text-white/5">—</td>
                                    <td className="p-12 text-xl text-center font-light">Instalación</td>
                                    <td className="p-12 text-xl text-center font-light">Mercedes</td>
                                    <td className="p-12 text-xl text-center font-serif italic text-white bg-amber-500/[0.02]">Cortejo VIP Mercedes-Benz</td>
                                </tr>
                                <tr className="table-row group hover:bg-white/[0.02] transition-colors">
                                    <td className="p-12 text-sm font-black uppercase tracking-widest text-white/40">Tributo Eternal</td>
                                    <td className="p-12 text-center text-white/20 italic">Básico</td>
                                    <td className="p-12 text-center text-white/40 italic">Intermedio</td>
                                    <td className="p-12 text-center text-white/60 italic">Avanzado</td>
                                    <td className="p-12 text-center font-serif italic text-amber-500 bg-amber-500/[0.02]">Memorial de Vida 4K</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Plan Highlights Grid - UI Refined */}
                <div className="planes-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-64">
                    {planes.map(plan => (
                        <article
                            key={plan.id}
                            className={`plan-card p-16 rounded-[4rem] flex flex-col transition-all duration-1000 shadow-3xl group ${plan.destacado
                                ? 'bg-white text-black scale-105 z-10 shadow-white/5 border-none'
                                : 'bg-white/[0.01] border border-white/5 hover:border-white/20 shadow-black/50 hover:bg-white/[0.03]'
                                }`}
                        >
                            <span className={`material-symbols-outlined text-6xl mb-12 transition-all duration-1000 ${plan.destacado ? 'text-black fill-1' : 'text-white/10 group-hover:text-amber-500/50 group-hover:scale-110'}`}>
                                {plan.icon}
                            </span>

                            {plan.destacado && (
                                <span className="inline-block bg-black text-white text-sm font-black uppercase tracking-widest px-6 py-3 rounded-full mb-10 self-start">
                                    RECOMENDADO
                                </span>
                            )}

                            <h3 className="font-serif text-4xl mb-8 italic">{plan.nombre}</h3>

                            <div className="mb-16 flex flex-col gap-2">
                                <span className={`text-5xl font-serif italic tracking-tighter ${plan.destacado ? 'text-black' : 'text-white'}`}>
                                    {plan.precio}
                                </span>
                                <span className={`text-sm font-black uppercase tracking-[0.4em] ${plan.destacado ? 'text-black/50' : 'text-white/40'}`}>Valor Liquidación</span>
                            </div>

                            <ul className="space-y-10 mb-20 flex-1">
                                {plan.incluye.map(inc => (
                                    <li key={inc} className={`flex items-start gap-4 text-sm tracking-wide font-light leading-relaxed transition-colors duration-700 ${plan.destacado ? 'text-black/60 group-hover:text-black' : 'text-white/30 group-hover:text-white/70'}`}>
                                        <span className={`material-symbols-outlined text-lg mt-0.5 ${plan.destacado ? 'text-black' : 'text-amber-500/30'}`}>check_circle</span>
                                        {inc}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/cotizacion"
                                className={`w-full text-center py-8 rounded-full font-black uppercase text-base tracking-widest transition-all duration-700 shadow-2xl ${plan.destacado
                                    ? 'bg-black text-white hover:bg-zinc-800 shadow-black/20'
                                    : 'bg-white text-black hover:bg-zinc-200 shadow-white/5'
                                    }`}
                            >
                                Iniciar Proceso
                            </Link>
                        </article>
                    ))}
                </div>

                {/* Final Professional CTA */}
                <section className="p-24 md:p-48 rounded-[5rem] bg-white text-black text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-[3s]">
                        <span className="material-symbols-outlined text-[200px]">history_edu</span>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <span className="material-symbols-outlined text-6xl mb-12 text-black/20">verified_user</span>
                        <h3 className="font-serif text-6xl md:text-8xl mb-12 italic leading-[0.9] tracking-tighter ceo-title-2">Asistencia las <span className="text-black/30">24 Horas</span></h3>
                        <p className="text-black/50 text-2xl mb-24 max-w-2xl mx-auto font-light leading-relaxed italic border-l border-black/10 pl-10 text-left ceo-text-desc">
                            "Nuestros directores de protocolo están listos para guiarle con la máxima distinción y empatía en cada paso del camino."
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                            <a href="tel:+56964333760" className="w-full sm:w-auto bg-black text-white px-20 py-8 rounded-full font-black uppercase text-base tracking-widest hover:bg-zinc-800 transition-all shadow-3xl">
                                LLAMADA INMEDIATA
                            </a>
                            <a href="https://wa.me/56964333760" className="w-full sm:w-auto border border-black/10 text-black px-20 py-8 rounded-full font-black uppercase text-base tracking-widest hover:bg-black/5 transition-all">
                                WHATSAPP PROTOCOLO
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
