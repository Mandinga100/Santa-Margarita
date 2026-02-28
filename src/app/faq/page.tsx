'use client';

import { useState } from 'react';
import Link from 'next/link';

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

function Acordeon({ pregunta, respuesta }: { pregunta: string; respuesta: string }) {
    const [abierto, setAbierto] = useState(false);

    return (
        <div className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors rounded-[2rem] overflow-hidden mb-4">
            <button
                onClick={() => setAbierto(!abierto)}
                className="w-full text-left flex items-center justify-between gap-6 py-8 px-8 group outline-none focus:ring-2 focus:ring-white/20"
                aria-expanded={abierto}
            >
                <span className="font-serif text-xl md:text-2xl text-white italic group-hover:text-white/80 transition-all">
                    {pregunta}
                </span>
                <span
                    className="material-symbols-outlined text-3xl text-white/40 transition-transform duration-500"
                    style={{ transform: abierto ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                    expand_more
                </span>
            </button>
            <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{ maxHeight: abierto ? '400px' : '0px', opacity: abierto ? 1 : 0 }}
            >
                <div className="pb-10 pt-2 px-8">
                    <p className="text-white/60 text-lg leading-relaxed font-light max-w-2xl">
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

    const categoriaSeleccionada = categorias.find((c) => c.id === categoriaActiva)!;

    return (
        <main className="min-h-screen bg-black text-white font-display pt-40 pb-24 selection:bg-white/10 antialiased">

            {/* Header Section */}
            <section className="max-w-5xl mx-auto px-6 text-center mb-32">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 block mb-6">Guía y Asistencia</span>
                <h1 className="font-serif text-6xl md:text-8xl mb-10 italic leading-tight">
                    Preguntas Frecuentes
                </h1>
                <p className="text-white/60 text-xl font-light leading-relaxed max-w-2xl mx-auto">
                    Respuestas claras y directas para acompañarle en la toma de decisiones con total transparencia.
                </p>
            </section>

            {/* Search Bar - Premium Pill */}
            <section className="max-w-3xl mx-auto px-6 mb-32">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-8 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-white/20 group-focus-within:text-white transition-colors">search</span>
                    </div>
                    <input
                        className="w-full bg-white/5 border border-white/10 rounded-full py-8 pl-20 pr-10 text-xl shadow-3xl shadow-black/40 focus:ring-2 focus:ring-white/20 transition-all outline-none text-white placeholder:text-white/20"
                        placeholder="Busque por palabra clave..."
                        type="text"
                        aria-label="Buscar en preguntas frecuentes"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </section>

            {/* Categories & Content */}
            <section className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                    {/* Sidebar Nav */}
                    <div className="lg:col-span-3 space-y-6">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-10 pl-4">Categorías</h4>
                        <div className="flex lg:flex-col gap-4 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                            {categorias.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setCategoriaActiva(cat.id)}
                                    className={`whitespace-nowrap lg:whitespace-normal text-left px-8 py-5 rounded-3xl text-xs font-black uppercase tracking-widest transition-all min-h-[56px] ${categoriaActiva === cat.id
                                        ? 'bg-white text-black shadow-2xl shadow-white/5'
                                        : 'text-white/40 hover:bg-white/5 border border-white/5'
                                        }`}
                                >
                                    {cat.titulo}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* FAQ List */}
                    <div className="lg:col-span-9">
                        <h2 className="font-serif text-4xl mb-16 italic text-white underline decoration-white/10 underline-offset-[16px]">
                            {categoriaSeleccionada.titulo}
                        </h2>
                        <div className="space-y-2">
                            {categoriaSeleccionada.preguntas
                                .filter(q => q.q.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((item) => (
                                    <Acordeon key={item.q} pregunta={item.q} respuesta={item.a} />
                                ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Emergency CTA */}
            <section className="mt-40 max-w-5xl mx-auto px-6 pb-24 border-t border-white/5 pt-32 text-center">
                <span className="material-symbols-outlined text-6xl mb-8 text-white/10">contact_support</span>
                <h3 className="font-serif text-4xl mb-6 italic">¿Necesita más información?</h3>
                <p className="text-white/40 mb-16 font-light text-xl max-w-xl mx-auto leading-relaxed">Estamos a su disposición las 24 horas para brindarle soporte inmediato y compasivo.</p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                    <a href="tel:+56964333760" className="bg-white text-black px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-200 transition-all shadow-2xl">
                        Llamada Urgente
                    </a>
                    <a href="https://wa.me/56964333760" className="border border-white/10 text-white px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
                        WhatsApp 24/7
                    </a>
                </div>
            </section>

        </main>
    );
}
