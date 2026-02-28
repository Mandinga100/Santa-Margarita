'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { db } from '@/lib/firebase';
import {
    collection,
    query,
    orderBy,
    limit,
    where,
    getDocs,
    QueryConstraint,
} from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Datos de demostración (Stitch Style)
const DEMO_MEMORIALES = [
    {
        id: 'demo1',
        nombre: 'Eduardo Valenzuela Ortiz',
        nacimiento: '1945',
        fallecimiento: '2026',
        tipo: 'reciente',
        mensaje: 'Padre amoroso, siempre en nuestros corazones.',
        imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'demo2',
        nombre: 'Marta Cecilia Lagos',
        nacimiento: '1952',
        fallecimiento: '2026',
        tipo: 'cinerario',
        mensaje: 'Luz que nunca se apaga.',
        imagen: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'demo3',
        nombre: 'Roberto Méndez Silva',
        nacimiento: '1938',
        fallecimiento: '2026',
        tipo: 'hoy',
        mensaje: '',
        imagen: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop'
    },
];

type Tipo = 'todos' | 'hoy' | 'reciente' | 'cinerario';

interface Memorial {
    id: string;
    nombre: string;
    nacimiento: string;
    fallecimiento: string;
    tipo: string;
    mensaje?: string;
    imagen?: string;
}

export default function MemorialesPage() {
    const [search, setSearch] = useState('');
    const [filtroTipo, setFiltroTipo] = useState<Tipo>('todos');
    const [memoriales, setMemoriales] = useState<Memorial[]>([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    const fetchMemoriales = useCallback(async () => {
        setLoading(true);
        try {
            const constraints: QueryConstraint[] = [
                orderBy('fallecimiento', 'desc'),
                limit(24),
            ];
            if (filtroTipo !== 'todos') {
                constraints.unshift(where('tipo', '==', filtroTipo));
            }
            const q = query(collection(db, 'memoriales'), ...constraints);
            const snap = await getDocs(q);

            if (snap.empty) {
                setMemoriales(DEMO_MEMORIALES);
            } else {
                setMemoriales(
                    snap.docs.map(d => {
                        const data = d.data();
                        const formatDate = (val: any) => {
                            if (!val) return '';
                            if (val.seconds) return new Date(val.seconds * 1000).getFullYear().toString();
                            return val.toString();
                        };
                        return {
                            id: d.id,
                            ...data,
                            nacimiento: formatDate(data.nacimiento),
                            fallecimiento: formatDate(data.fallecimiento),
                        } as Memorial;
                    })
                );
            }
        } catch {
            setMemoriales(DEMO_MEMORIALES);
        } finally {
            setLoading(false);
        }
    }, [filtroTipo]);

    useEffect(() => {
        fetchMemoriales();
    }, [fetchMemoriales]);

    useEffect(() => {
        if (!loading && memoriales.length > 0) {
            gsap.registerPlugin(ScrollTrigger);
            const ctx = gsap.context(() => {
                gsap.fromTo(".memorial-card",
                    { opacity: 0, y: 30, scale: 0.98 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 1.2, stagger: 0.1,
                        ease: "expo.out",
                        clearProps: "all"
                    }
                );
            }, cardsRef);
            return () => ctx.revert();
        }
    }, [loading, memoriales, filtroTipo, search]);

    const filtered = memoriales.filter(m =>
        m.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main ref={containerRef} className="min-h-screen bg-[#1A1A1A] text-white font-display pt-32 pb-48 selection:bg-white/10 antialiased overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Seccion - Estilo Editorial */}
                <header className="mb-32 text-center border-b border-white/5 pb-20 relative">
                    <span className="text-sm md:text-base font-black uppercase tracking-widest text-white/50 block mb-10">Muro de la Memoria</span>
                    <h1 className="font-serif text-7xl md:text-9xl mb-12 italic leading-none text-white tracking-tighter">
                        Memoriales <br /> <span className="text-white/30">Eternos</span>
                    </h1>
                    <p className="text-white/40 max-w-2xl mx-auto text-2xl font-light italic leading-relaxed border-x border-white/5 px-12">
                        "En cada historia reside un legado que trasciende el tiempo, habitando eternamente en la serenidad de nuestro recuerdo."
                    </p>
                    <div className="w-24 h-px bg-white/10 mx-auto mt-24"></div>
                </header>

                {/* Search Bar - Premium Glassmorphism */}
                <div className="mb-24">
                    <div className="relative max-w-3xl mx-auto group">
                        <div className="flex items-center bg-white/[0.01] rounded-[3rem] overflow-hidden p-4 border border-white/5 group-focus-within:border-white/20 group-focus-within:bg-white/[0.03] transition-all duration-1000 shadow-4xl backdrop-blur-3xl">
                            <span className="material-symbols-outlined text-white/10 px-8 group-focus-within:text-white transition-all duration-700">search</span>
                            <input
                                className="w-full border-none focus:ring-0 text-2xl bg-transparent py-6 placeholder:text-white/5 font-light italic text-white selection:bg-white/10"
                                placeholder="Buscar un legado..."
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="px-8 text-white/20 hover:text-white transition-all transform hover:scale-110"
                                    aria-label="Limpiar búsqueda"
                                >
                                    <span className="material-symbols-outlined text-3xl">close</span>
                                </button>
                            )}
                        </div>
                        {search && (
                            <p className="text-white/40 text-center mt-10 text-sm md:text-base font-black uppercase tracking-widest animate-pulse">
                                {filtered.length} Destellos en la memoria
                            </p>
                        )}
                    </div>
                </div>

                {/* Premium Filters - Stitch Navigation */}
                <nav className="flex flex-wrap items-center justify-center gap-6 mb-48" aria-label="Categorías de memoriales">
                    {['todos', 'hoy', 'reciente', 'cinerario'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setFiltroTipo(t as Tipo)}
                            className={`px-12 py-4 rounded-full text-xs md:text-sm font-black uppercase tracking-widest transition-all duration-1000 border relative group overflow-hidden ${filtroTipo === t
                                ? 'bg-white text-black border-white shadow-5xl scale-105'
                                : 'bg-black text-white/20 border-white/5 hover:border-white/20 hover:text-white'
                                }`}
                        >
                            <span className="relative z-10">{t === 'todos' ? 'Cronología Completa' : t === 'hoy' ? 'En Honor Hoy' : t}</span>
                            {filtroTipo === t && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full animate-shimmer"></div>}
                        </button>
                    ))}
                </nav>

                {/* Results Grid - Legacy Gallery */}
                {loading ? (
                    <div className="flex justify-center py-64">
                        <div className="w-20 h-20 border-2 border-white/5 border-t-white rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 md:gap-32">
                        {filtered.map(m => (
                            <Link
                                href={`/memoriales/${m.id}`}
                                key={m.id}
                                className="memorial-card group flex flex-col items-center text-center transition-all duration-1000"
                            >
                                <article className="w-full">
                                    <div className="aspect-[4/5] mb-12 rounded-[4rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-[2s] relative shadow-4xl border border-white/5 group-hover:border-white/20">
                                        <Image
                                            className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[3s] ease-out"
                                            src={m.imagen || '/assets/images/stitch/placeholder-memorial.webp'}
                                            alt={`Retrato de ${m.nombre}`}
                                            fill
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-[1.5s]"></div>

                                        {/* Hover Overlay Detail */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[1s] bg-black/20 backdrop-blur-[2px]">
                                            <span className="text-sm font-black uppercase tracking-widest text-white border border-white/20 px-10 py-4 rounded-full bg-black/40">Habitar su Legado</span>
                                        </div>
                                    </div>
                                    <h3 className="font-serif text-4xl md:text-5xl mb-6 text-white group-hover:italic transition-all duration-1000 tracking-tighter leading-none">{m.nombre}</h3>
                                    <p className="text-white/40 font-display text-sm font-black tracking-widest mb-12 uppercase italic">{m.nacimiento} — {m.fallecimiento}</p>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination Stitch-Style */}
                {!loading && filtered.length > 0 && (
                    <nav className="mt-64 pt-24 border-t border-white/5 flex flex-col items-center gap-16" aria-label="Navegación de páginas">
                        <div className="flex items-center gap-8">
                            <button className="w-16 h-16 rounded-full bg-white text-black font-black text-xs shadow-5xl ring-1 ring-white/20 relative group overflow-hidden" aria-current="page">
                                <span className="relative z-10">01</span>
                                <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            </button>
                            <button className="w-16 h-16 rounded-full border border-white/5 text-white/10 font-black text-xs hover:border-white/20 hover:text-white transition-all duration-700">02</button>
                            <button className="w-16 h-16 rounded-full border border-white/5 text-white/10 font-black text-xs hover:border-white/20 hover:text-white transition-all duration-700">03</button>
                        </div>
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent"></div>
                            <span className="text-sm md:text-base font-black uppercase tracking-widest text-white/30 italic">Profundizar en la Memoria</span>
                        </div>
                    </nav>
                )}
            </div>
        </main>
    );
}
