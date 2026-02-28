'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const servicios = [
    {
        title: 'Servicios Funerarios',
        description: 'Ceremonias de gala personalizadas que honran la esencia de cada ser querido con una atención meticulosa a la estética, el protocolo y la solemnidad absoluta.',
        image: '/assets/images/servicios/funerales-gala.webp',
        features: ['Capillas VIP exclusivas', 'Carruajes de honor', 'Atención solemne 24h']
    },
    {
        title: 'Crematorio y Cinerarios',
        description: 'Procesos llevados con el máximo respeto en instalaciones de vanguardia, rodeadas de jardines diseñados para la reflexión profunda y la paz eterna.',
        image: '/assets/images/servicios/crematorio.webp',
        features: ['Urnas de diseño fino', 'Espacios memoriales naturales', 'Protocolos certificados']
    },
    {
        title: 'Traslados Internacionales',
        description: 'Gestión logística integral para el retorno de restos a cualquier destino mundial, cumpliendo rigurosamente normativas de seguridad y sanidad internacional.',
        image: '/assets/images/servicios/traslados.webp',
        features: ['Repatriación asistida', 'Trámites consulares', 'Custodia profesional']
    },
    {
        title: 'Asesoría Administrativa',
        description: 'Aliviamos su carga gestionando certificados, licencias y procesos legales, permitiéndole vivir su duelo con la serenidad y apoyo que su familia merece.',
        image: '/assets/images/servicios/asesoria.webp',
        features: ['Gestión de herencias', 'Apoyo en seguros', 'Trámites gubernamentales']
    }
];

export default function ServiciosPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(".servicios-header",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.5, ease: "expo.out" }
            );

            // Cards Animation
            gsap.fromTo(".service-card",
                { opacity: 0, scale: 0.95, y: 50 },
                {
                    opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "expo.out",
                    scrollTrigger: {
                        trigger: ".services-grid",
                        start: "top 85%",
                    }
                }
            );

            // Featured Section Animation
            gsap.fromTo(".featured-service",
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, duration: 1.5, ease: "expo.out",
                    scrollTrigger: {
                        trigger: ".featured-service",
                        start: "top 80%",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] font-display pt-32 pb-48 selection:bg-black/10 antialiased overflow-x-hidden">

            {/* Hero Section - Immersive Editorial */}
            <section className="max-w-6xl mx-auto px-6 py-32 text-center servicios-header">
                <span className="text-sm font-black uppercase tracking-[0.4em] text-black/50 block mb-10">Protocolos de Excelencia</span>
                <h1 className="text-6xl md:text-9xl font-serif text-[#1A1A1A] mb-12 italic leading-[0.85] tracking-tighter">
                    Dignidad <br /> <span className="text-black/40">que Trasciende</span>
                </h1>
                <p className="text-2xl text-black/60 max-w-2xl mx-auto leading-relaxed font-light italic border-x border-black/10 px-10">
                    "En los instantes de mayor fragilidad, transformamos el adiós en un tributo solemne a la grandeza de una vida extraordinaria."
                </p>
                <div className="w-24 h-px bg-black/10 mx-auto mt-24"></div>
            </section>

            {/* Services Grid - Visual Elegance */}
            <section className="max-w-7xl mx-auto px-6 mb-64 services-grid">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                    {servicios.map((s, idx) => (
                        <article
                            key={idx}
                            className="service-card group flex flex-col bg-black/[0.02] rounded-[4rem] overflow-hidden transition-all duration-1000 border border-black/5 hover:border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
                        >
                            <div className="aspect-[16/10] relative overflow-hidden bg-white/40 grayscale group-hover:grayscale-0 transition-all duration-1000">
                                <Image
                                    src={s.image}
                                    alt={`Visualización de ${s.title}`}
                                    fill
                                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80"></div>
                            </div>
                            <div className="p-20">
                                <h3 className="text-4xl font-serif mb-8 italic tracking-tighter">{s.title}</h3>
                                <p className="text-black/60 mb-12 leading-relaxed font-light text-xl italic group-hover:text-black/80 transition-colors duration-700">
                                    {s.description}
                                </p>
                                <ul className="space-y-6">
                                    {s.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-6 text-[13px] md:text-sm font-black uppercase tracking-widest text-[#1a1a1a]/60 group-hover:text-[#1a1a1a] transition-all duration-700 group-hover:translate-x-2">
                                            <span className="material-symbols-outlined text-amber-600/60 text-lg">check_circle</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}

                    {/* Featured: Floristería de Autor (Full Width Masterpiece) */}
                    <article className="featured-service md:col-span-2 group flex flex-col lg:flex-row bg-black/[0.02] rounded-[5rem] overflow-hidden transition-all duration-1000 border border-black/5 hover:border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
                        <div className="lg:w-1/2 aspect-video lg:aspect-auto relative overflow-hidden bg-white/40 grayscale group-hover:grayscale-0 transition-all duration-[2s]">
                            <Image
                                src="/assets/images/servicios/floristeria.webp"
                                alt="Floristería de Autor Funeraria Santa Margarita"
                                fill
                                className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent lg:block hidden"></div>
                        </div>
                        <div className="lg:w-1/2 p-24 lg:p-32 flex flex-col justify-center relative">
                            <span className="text-sm font-black uppercase tracking-widest text-black/50 mb-10">Curaduría Visual</span>
                            <h3 className="text-5xl lg:text-7xl font-serif mb-12 italic leading-none tracking-tighter">Floristería <br /> <span className="text-black/40">de Autor</span></h3>
                            <p className="text-2xl text-black/60 mb-16 font-light leading-relaxed italic border-l border-black/10 pl-10">
                                Diseños florales curados que transmiten esperanza y consuelo. Utilizamos especies exclusivas para crear tributos visuales de inigualable elegancia y distinción.
                            </p>
                            <div className="grid grid-cols-2 gap-10">
                                {['Arreglos Fúnebres', 'Coronas de Honor', 'Decoración de Salas', 'Homenajes Vivos'].map((item) => (
                                    <div key={item} className="flex items-center gap-5 text-[13px] md:text-sm font-black uppercase tracking-widest text-black/60 group-hover:text-amber-600 transition-colors">
                                        <span className="material-symbols-outlined text-xl">local_florist</span> {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Professional Contact - High Contrast Response inverts to Dark for White theme */}
            <section className="max-w-6xl mx-auto px-6">
                <div className="bg-[#1A1A1A] text-white p-24 md:p-48 rounded-[5rem] text-center relative overflow-hidden group shadow-2xl">
                    <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
                        <span className="material-symbols-outlined text-[300px] absolute -right-20 -bottom-20 rotate-12 transition-transform duration-[3s] group-hover:rotate-0 text-white">support_agent</span>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-6xl md:text-8xl font-serif mb-12 italic leading-[0.9] tracking-tighter">Asistencia las <br /><span className="text-white/40">24 Horas</span></h2>
                        <p className="text-2xl text-white/60 mb-20 font-light max-w-2xl mx-auto leading-relaxed italic">
                            Nuestro protocolo de respuesta inmediata está activo para brindarle el apoyo compasivo que su familia requiere hoy.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-10">
                            <a
                                className="bg-white text-black px-20 py-8 rounded-full font-black uppercase text-base tracking-widest hover:bg-zinc-200 transition-all shadow-xl"
                                href="tel:+56964333760"
                            >
                                Llamada Inmediata
                            </a>
                            <a
                                className="border border-white/20 text-white px-20 py-8 rounded-full font-black uppercase text-base tracking-widest hover:bg-white/10 transition-all"
                                href="https://wa.me/56964333760"
                            >
                                WhatsApp Protocolo
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
