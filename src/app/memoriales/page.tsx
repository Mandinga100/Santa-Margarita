'use client';

import { useState, useEffect, useCallback } from 'react';
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

// Datos de demostración (Stitch Style)
const DEMO_MEMORIALES = [
    {
        id: 'demo1',
        nombre: 'Eduardo Valenzuela Ortiz',
        nacimiento: '1945',
        fallecimiento: '2026',
        tipo: 'reciente',
        mensaje: 'Padre amoroso, siempre en nuestros corazones.',
        imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoUo_S4dkrDSR3bED7_t3MHAg2Idhz8Ft3niZVHPvDd0jPe3g3zC4NfiNeMXlge5yeOUzWvjRPY6ZgSXj3q2frMfGog4Sj6ppwT5C_jzS-BHQd8sl87yK2f0ldw_pZWvHab9NV6TGk2agq_OPJGSnR9h5mncmVLNQLfT1pBpxrgx51MyRSvdtooCayy13S76cSeWYil3A6QzeQV_Snr_IxvsTPDulNUwuDmKkJgs1SbYKVAR7jnAS839hCf8YDxM3dzrxOA72i_f0'
    },
    {
        id: 'demo2',
        nombre: 'Marta Cecilia Lagos',
        nacimiento: '1952',
        fallecimiento: '2026',
        tipo: 'cinerario',
        mensaje: 'Luz que nunca se apaga.',
        imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCzF_jQs-FqJ2kZmpfmdULJpCAVZxNR3xypFVfqBhXYWJ1QpxgCfB4ZWV8KrqAme334V3ZDoEFSFrrx5lJ6ckMFpBx-aa5TAbTHhUkyBMyRDcZeaiS360KKcmE3nOOPq3kji6jZl5swaRsYtCbX3NznjC8y2qXFrhYRusvs28zDzzx6Azu840QXmoDxtUFa5l8FDQ6lKHbCkelw6eZ7CcjM2XFbBMGCK86KvTI74iCmxX09wo9hUS-UGuujSyNG2CTaGmUgeefbUs'
    },
    {
        id: 'demo3',
        nombre: 'Roberto Méndez Silva',
        nacimiento: '1938',
        fallecimiento: '2026',
        tipo: 'hoy',
        mensaje: '',
        imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDKhg2eOI9qNwG1r3blzhIJbqw1-3OxdqSafl5fxo8nGxA6yeMoW8J__3E1nQTav8NVCaMfPubW8w9kgITg0kxJYCQiaIpjLk5z-2CihuF3zymcv9ESbhWFebGZDqrGkXLNmpDv8Xz7WJZv2dYIjDPEyvDch5n8rjaw-x3aisFX97fGd0efwFxa_ooNymMPrRu5YWso00i0AojHCDTVMT-3-80NMp86NteKn2s69XCVQUfWOSrJbaWBcZlHcQAcB1xWbKRA3JJInQ'
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

    const filtered = memoriales.filter(m =>
        m.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-black text-white font-display pt-32 pb-24 selection:bg-white/10 antialiased">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Seccion - Estilo Editorial */}
                <header className="mb-24 text-center border-b border-white/5 pb-16">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block mb-6">Muro de la Memoria</span>
                    <h1 className="font-serif text-6xl md:text-8xl mb-8 italic leading-tight text-white">Memoriales Eternos</h1>
                    <p className="text-white/50 max-w-2xl mx-auto text-xl font-light italic leading-relaxed">
                        "En cada historia reside un legado que trasciende el tiempo, habitando eternamente en nuestro recuerdo."
                    </p>
                    <div className="w-16 h-px bg-white/20 mx-auto mt-16"></div>
                </header>

                {/* Search Bar - Inmersive Mode */}
                <div className="mb-20">
                    <div className="relative max-w-3xl mx-auto group">
                        <div className="flex items-center bg-white/[0.03] rounded-[2.5rem] overflow-hidden p-3 border border-white/5 group-focus-within:border-white/20 group-focus-within:bg-white/[0.06] transition-all duration-700 shadow-3xl shadow-black">
                            <span className="material-symbols-outlined text-white/20 px-6 group-focus-within:text-white transition-colors">search</span>
                            <input
                                className="w-full border-none focus:ring-0 text-xl bg-transparent py-5 placeholder:text-white/10 font-light text-white"
                                placeholder="Buscar un legado..."
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch('')}
                                    className="px-6 text-white/30 hover:text-white transition-all transform hover:scale-110"
                                    aria-label="Limpiar búsqueda"
                                >
                                    <span className="material-symbols-outlined text-2xl">close</span>
                                </button>
                            )}
                        </div>
                        {search && (
                            <p className="text-white/30 text-center mt-8 text-[10px] font-black uppercase tracking-widest animate-fade-in">
                                {filtered.length} Destellos en la memoria
                            </p>
                        )}
                    </div>
                </div>

                {/* Premium Filters */}
                <nav className="flex flex-wrap items-center justify-center gap-6 mb-32" aria-label="Categorías de memoriales">
                    {['todos', 'hoy', 'reciente', 'cinerario'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setFiltroTipo(t as Tipo)}
                            className={`px-10 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.4em] transition-all duration-700 border ${filtroTipo === t
                                ? 'bg-white text-black border-white shadow-3xl shadow-white/10 scale-105'
                                : 'bg-black text-white/30 border-white/5 hover:border-white/20 hover:text-white'
                                }`}
                        >
                            {t === 'todos' ? 'Cronología Completa' : t === 'hoy' ? 'En Honor Hoy' : t}
                        </button>
                    ))}
                </nav>

                {/* Results Grid - Legacy Gallery */}
                {loading ? (
                    <div className="flex justify-center py-48">
                        <div className="w-16 h-16 border border-white/10 border-t-white rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24">
                        {filtered.map(m => (
                            <Link
                                href={`/memoriales/${m.id}`}
                                key={m.id}
                                className="group flex flex-col items-center text-center transition-all duration-1000"
                            >
                                <article className="w-full">
                                    <div className="aspect-[3/4] mb-12 rounded-[2.5rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-[1.5s] relative shadow-3xl shadow-black border border-white/5 group-hover:border-white/20">
                                        <img
                                            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s] ease-out"
                                            src={m.imagen || '/assets/images/stitch/placeholder-memorial.webp'}
                                            alt={`Retrato de ${m.nombre}`}
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-1000"></div>
                                    </div>
                                    <h3 className="font-serif text-3xl md:text-4xl mb-4 text-white group-hover:italic group-hover:tracking-wider transition-all duration-700">{m.nombre}</h3>
                                    <p className="text-white/20 font-display text-[9px] font-black tracking-[0.6em] mb-12 uppercase">{m.nacimiento} — {m.fallecimiento}</p>

                                    <div className="opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-1000 ease-out">
                                        <span className="inline-block border border-white/20 text-white px-12 py-4 text-[9px] uppercase tracking-[0.4em] font-black rounded-full hover:bg-white hover:text-black transition-all">
                                            Habitar su Legado
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination Stitch-Style */}
                {!loading && filtered.length > 0 && (
                    <nav className="mt-48 pt-20 border-t border-white/5 flex flex-col items-center gap-12" aria-label="Navegación de páginas">
                        <div className="flex items-center gap-6">
                            <button className="w-14 h-14 rounded-full bg-white text-black font-black text-xs shadow-3xl shadow-white/10 ring-1 ring-white" aria-current="page">01</button>
                            <button className="w-14 h-14 rounded-full border border-white/5 text-white/20 font-black text-xs hover:border-white/20 hover:text-white transition-all">02</button>
                            <button className="w-14 h-14 rounded-full border border-white/5 text-white/20 font-black text-xs hover:border-white/20 hover:text-white transition-all">03</button>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent"></div>
                            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/10">Profundizar en la Memoria</span>
                        </div>
                    </nav>
                )}
            </div>
        </main>
    );
}
