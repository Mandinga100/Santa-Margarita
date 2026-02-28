'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const categorias = [
    {
        id: 'tramites',
        icono: 'gavel',
        titulo: 'Trámites Legales',
        preguntas: [
            {
                q: '¿Qué documentos necesito al fallecimiento?',
                a: 'Se requiere el RUT del fallecido, libreta de matrimonio o nacimiento, y la identificación del familiar responsable. Le guiamos en la obtención de documentos faltantes.',
            },
            {
                q: '¿Quién solicita el certificado de defunción?',
                a: 'Cualquier persona ante el Registro Civil. Sin embargo, para seguros y herencias se requiere acreditación familiar. Nosotros gestionamos este trámite sin costo.',
            },
            {
                q: '¿Cuál es el plazo para inscribir la defunción?',
                a: 'Debe realizarse dentro de los 3 días hábiles posteriores al fallecimiento. Nuestra funeraria realiza este proceso de forma inmediata como parte del servicio.',
            },
        ],
    },
    {
        id: 'servicios',
        icono: 'local_florist',
        titulo: 'Nuestros Servicios',
        preguntas: [
            {
                q: '¿Qué planes tienen disponibles?',
                a: 'Ofrecemos 4 planes principales desde $1.360.000 hasta el Plan Raúl Premium de $3.590.000. Todos los valores incluyen IVA y asistencia integral.',
            },
            {
                q: '¿Los precios incluyen IVA?',
                a: 'Sí. Todos nuestros valores están expresados en Pesos Chilenos (CLP) con el IVA incluido. No existen cargos ocultos durante la prestación del servicio.',
            },
            {
                q: '¿Cuentan con capilla de velación propia?',
                a: 'Sí. Disponemos de capillas privadas diseñadas para un ambiente íntimo y digno. Los planes superiores incluyen salas VIP con servicio de recepción.',
            },
        ],
    },
    {
        id: 'duelo',
        icono: 'favorite',
        titulo: 'Apoyo en el Duelo',
        preguntas: [
            {
                q: '¿Qué duración tiene el proceso de duelo?',
                a: 'El duelo es personal y no tiene un tiempo fijo. Es un proceso de adaptación natural. Recomendamos no aislarse y buscar apoyo en el entorno cercano.',
            },
            {
                q: '¿Cómo acompañar a alguien en pérdida?',
                a: 'La presencia y la escucha activa son fundamentales. Evite frases hechas; a menudo, el silencio respetuoso y el apoyo práctico son más reconfortantes.',
            },
            {
                q: '¿Cuándo buscar ayuda profesional?',
                a: 'Si el dolor interfiere con la vida diaria significativamente pasado un tiempo, o existe aislamiento total, es aconsejable consultar a especialistas en duelo.',
            },
        ],
    },
];

function Acordeon({ pregunta, respuesta, index }: { pregunta: string; respuesta: string; index: number }) {
    const [abierto, setAbierto] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="faq-item border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors rounded-[2.5rem] overflow-hidden mb-6 group">
            <button
                onClick={() => setAbierto(!abierto)}
                className="w-full text-left flex items-center justify-between gap-8 py-10 px-10 outline-none focus:ring-1 focus:ring-white/10"
                aria-expanded={abierto}
            >
                <span className="font-serif text-2xl md:text-3xl text-white/90 italic group-hover:text-white transition-all leading-snug">
                    {pregunta}
                </span>
                <span
                    className={`material-symbols-outlined text-4xl text-white/20 transition-all duration-700 ${abierto ? 'rotate-180 text-white/60' : ''}`}
                >
                    expand_more
                </span>
            </button>
            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{ maxHeight: abierto ? '500px' : '0px', opacity: abierto ? 1 : 0 }}
            >
                <div className="pb-12 pt-0 px-10">
                    <p className="text-white/40 text-xl leading-relaxed font-light max-w-3xl border-l border-white/10 pl-8">
                        {respuesta}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function FaqPage() {
    const [categoriaActiva, setCategoriaActiva] = useState('tramites');
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    // Filter Logic: Global Search
    const filteredResults = useMemo(() => {
        if (!searchQuery) {
            return categorias.find(c => c.id === categoriaActiva)?.preguntas || [];
        }

        let allQuestions: any[] = [];
        categorias.forEach(cat => {
            const matches = cat.preguntas.filter(p =>
                p.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.a.toLowerCase().includes(searchQuery.toLowerCase())
            );
            allQuestions = [...allQuestions, ...matches];
        });
        return allQuestions;
    }, [searchQuery, categoriaActiva]);

    useEffect(() => {
        // Staggered entry animation on load / category change
        const ctx = gsap.context(() => {
            gsap.fromTo(".faq-item",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out" }
            );

            gsap.fromTo(".category-btn",
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "expo.out" }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [categoriaActiva, searchQuery]);

    return (
        <main ref={containerRef} className="min-h-screen bg-black text-white font-display pt-48 pb-32 selection:bg-white/10 antialiased overflow-hidden">

            {/* Header Section */}
            <section className="max-w-6xl mx-auto px-6 text-center mb-40">
                <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20 block mb-10">Protocolos de Información</span>
                <h1 className="font-serif text-7xl md:text-9xl mb-12 italic leading-[0.85] tracking-tighter">
                    Preguntas <br /> <span className="text-white/40">Frecuentes</span>
                </h1>
                <p className="text-white/30 text-2xl font-light leading-relaxed max-w-2xl mx-auto italic">
                    "Transparencia absoluta para momentos de vulnerabilidad."
                </p>
            </section>

            {/* Sticky Search Bar - Editorial Design */}
            <section className="max-w-4xl mx-auto px-6 mb-48 sticky top-32 z-50">
                <div className="relative group backdrop-blur-3xl bg-black/60 rounded-[3rem] border border-white/5 shadow-3xl">
                    <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-white/20 group-focus-within:text-white transition-all">search</span>
                    </div>
                    <input
                        className="w-full bg-transparent py-10 pl-24 pr-12 text-2xl font-light transition-all outline-none text-white placeholder:text-white/10 placeholder:italic"
                        placeholder="Busque por concepto (ej: 'precios', 'trámites')..."
                        type="text"
                        aria-label="Buscar en protocolos"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-10 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all"
                        >
                            Limpiar
                        </button>
                    )}
                </div>
            </section>

            {/* Categories & Content */}
            <section className="max-w-[1400px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">

                    {/* Sidebar Nav - Fixed Style */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-64">
                            <h4 className="text-[10px] uppercase tracking-[0.6em] font-black text-white/20 mb-12 pl-4">Protocolos</h4>
                            <div className="flex lg:flex-col gap-4 overflow-x-auto pb-8 lg:pb-0 scrollbar-hide">
                                {categorias.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => {
                                            setCategoriaActiva(cat.id);
                                            setSearchQuery('');
                                        }}
                                        className={`category-btn whitespace-nowrap lg:whitespace-normal text-left px-10 py-7 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-700 min-h-[64px] border border-white/5 ${categoriaActiva === cat.id && !searchQuery
                                            ? 'bg-white text-black shadow-3xl scale-105'
                                            : 'text-white/30 hover:bg-white/[0.05] hover:text-white'
                                            }`}
                                    >
                                        {cat.titulo}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FAQ List */}
                    <div className="lg:col-span-9">
                        <header className="mb-24 flex items-end justify-between border-b border-white/5 pb-12">
                            <h2 className="font-serif text-5xl md:text-7xl italic text-white leading-none">
                                {searchQuery ? 'Resultados de Búsqueda' : categorias.find(c => c.id === categoriaActiva)?.titulo}
                            </h2>
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                                {filteredResults.length} {filteredResults.length === 1 ? 'Pregunta' : 'Preguntas'}
                            </span>
                        </header>

                        <div className="space-y-4">
                            {filteredResults.length > 0 ? (
                                filteredResults.map((item, idx) => (
                                    <Acordeon key={item.q} pregunta={item.q} respuesta={item.a} index={idx} />
                                ))
                            ) : (
                                <div className="py-32 text-center border border-dashed border-white/10 rounded-[3rem]">
                                    <span className="material-symbols-outlined text-6xl text-white/5 mb-8">sentiment_dissatisfied</span>
                                    <p className="text-white/20 text-xl font-light italic">No se encontraron protocolos para su búsqueda.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </section>

            {/* Emergency CTA - Minimalist Black/White Contrast */}
            <section className="mt-64 bg-white text-black py-48 rounded-t-[5rem] relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <span className="material-symbols-outlined text-7xl mb-12 text-black/10">emergency_share</span>
                    <h3 className="font-serif text-6xl md:text-8xl mb-10 italic leading-none">Contacto Directo</h3>
                    <p className="text-black/40 mb-20 font-light text-2xl max-w-2xl mx-auto italic leading-relaxed">
                        "En situaciones críticas, la velocidad es una forma de respeto. Llámenos de inmediato."
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                        <a href="tel:+56964333760" className="bg-black text-white px-16 py-8 rounded-full text-[10px] font-black uppercase tracking-[0.5em] hover:bg-zinc-800 transition-all shadow-3xl w-full md:w-auto">
                            Llamada Urgente
                        </a>
                        <a href="https://wa.me/56964333760" target="_blank" rel="noopener noreferrer" className="border border-black/10 text-black px-16 py-8 rounded-full text-[10px] font-black uppercase tracking-[0.5em] hover:bg-black/5 transition-all w-full md:w-auto">
                            WhatsApp 24/7
                        </a>
                    </div>
                </div>
            </section>

        </main>
    );
}
