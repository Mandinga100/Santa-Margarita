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
        <main ref={containerRef} className="min-h-screen bg-[#191919] text-zinc-300 font-inter pt-32 pb-48 selection:bg-[#C5A059] selection:text-black antialiased overflow-x-hidden">

            <div className="max-w-7xl mx-auto px-6">

                {/* Header Section - Editorial Depth */}
                <header className="mb-32 text-center border-b border-zinc-800 pb-20 relative">
                    <span className="text-[10px] md:text-xs font-light uppercase tracking-[0.4em] text-[#C5A059] block mb-10">Santuario de Memoria Digital</span>
                    <h1 className="font-serif text-white text-5xl md:text-8xl mb-12 italic leading-tight tracking-tight">
                        Memoriales <br /> <span className="text-[#C5A059]/30">Eternos</span>
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-xl md:text-2xl font-light italic leading-relaxed border-x border-zinc-800 px-12">
                        &quot;En cada historia reside un legado que trasciende el tiempo, habitando eternamente en la serenidad de nuestra memoria compartida.&quot;
                    </p>
                    <div className="w-20 h-px bg-[#C5A059]/20 mx-auto mt-24"></div>
                </header>

                {/* Search Bar - Premium Glassmorphism */}
                <div className="mb-24">
                    <div className="relative max-w-3xl mx-auto group">
                        <div className="flex items-center bg-black/40 rounded-full overflow-hidden p-4 border border-zinc-800 group-focus-within:border-[#C5A059]/40 transition-all duration-700 shadow-2xl backdrop-blur-md">
                            <span className="material-symbols-outlined text-zinc-600 px-8">search</span>
                            <input
                                className="w-full border-none focus:ring-0 text-xl bg-transparent py-4 placeholder:text-zinc-700 font-light italic text-white"
                                placeholder="Encontrar un destello eterno..."
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="px-8 text-zinc-600 hover:text-white transition-all"
                                    aria-label="Limpiar búsqueda"
                                >
                                    <span className="material-symbols-outlined text-2xl">close</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Premium Filters */}
                <nav className="flex flex-wrap items-center justify-center gap-6 mb-48" aria-label="Categorías de memoriales">
                    {['todos', 'hoy', 'reciente', 'cinerario'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setFiltroTipo(t as Tipo)}
                            className={`px-10 py-3 rounded-full text-[10px] font-light uppercase tracking-[0.3em] transition-all duration-700 border ${filtroTipo === t
                                ? 'bg-[#C5A059] text-black border-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.3)]'
                                : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'
                                }`}
                        >
                            {t === 'todos' ? 'Legado Completo' : t === 'hoy' ? 'En Honor Hoy' : t === 'reciente' ? 'Memorias Recientes' : 'Cinerario Virtual'}
                        </button>
                    ))}
                </nav>

                {/* Results Grid - Legacy Gallery */}
                {loading ? (
                    <div className="flex justify-center py-64">
                        <div className="w-12 h-12 border border-zinc-800 border-t-[#C5A059] rounded-full animate-spin"></div>
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
                                    <div className="aspect-[4/5] mb-12 rounded-[3rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-[2s] relative shadow-2xl border border-zinc-800 group-hover:border-[#C5A059]/40">
                                        <Image
                                            className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[3s] ease-out"
                                            src={m.imagen || '/assets/images/stitch/placeholder-memorial.webp'}
                                            alt={`Retrato de ${m.nombre}`}
                                            fill
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[1s] bg-black/40 backdrop-blur-[2px]">
                                            <span className="text-[10px] font-light uppercase tracking-[0.4em] text-white border border-white/20 px-10 py-4 rounded-full bg-black/40">Habitar su Legado</span>
                                        </div>
                                    </div>
                                    <h3 className="font-serif text-3xl md:text-4xl mb-4 text-white group-hover:text-[#C5A059] transition-colors duration-700 tracking-tight leading-tight">{m.nombre}</h3>
                                    <p className="text-zinc-500 font-inter text-[10px] font-light tracking-[0.3em] mb-12 uppercase italic">{m.nacimiento} — {m.fallecimiento}</p>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && filtered.length > 0 && (
                    <nav className="mt-64 pt-24 border-t border-zinc-800 flex flex-col items-center gap-16" aria-label="Navegación de páginas">
                        <div className="flex items-center gap-6">
                            <button className="w-12 h-12 rounded-full bg-[#C5A059] text-black font-light text-[10px] shadow-xl">01</button>
                            <button className="w-12 h-12 rounded-full border border-zinc-800 text-zinc-600 font-light text-[10px] hover:border-zinc-600 hover:text-zinc-300 transition-all">02</button>
                        </div>
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-px h-24 bg-gradient-to-b from-[#C5A059]/20 to-transparent"></div>
                            <span className="text-[10px] font-light uppercase tracking-[0.4em] text-zinc-500 italic">Profundizar en la Memoria</span>
                        </div>
                    </nav>
                )}
            </div>
        </main>
    );
}
