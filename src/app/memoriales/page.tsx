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
    const [usingDemo, setUsingDemo] = useState(false);

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
                setUsingDemo(true);
                setMemoriales(DEMO_MEMORIALES);
            } else {
                setUsingDemo(false);
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
            setUsingDemo(true);
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
        <main className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919] pt-32 pb-24 font-display antialiased">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header Seccion */}
                <div className="mb-16 text-center">
                    <h1 className="font-serif text-5xl md:text-6xl mb-6 text-black dark:text-white">Memoriales Eternos</h1>
                    <p className="text-[#7E7D7D] max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Un espacio sagrado para honrar las vidas que han dejado una huella imborrable en nuestros corazones.
                    </p>
                </div>

                {/* Active Search Bar - Stitch Optimized */}
                <div className="mb-12">
                    <div className="relative max-w-2xl mx-auto">
                        <div className="flex items-center bg-white dark:bg-slate-800 rounded-2xl overflow-hidden p-2 shadow-2xl shadow-black/[0.03] border border-black/5 dark:border-white/5">
                            <span className="material-symbols-outlined text-slate-400 px-5">search</span>
                            <input
                                className="w-full border-none focus:ring-0 text-xl bg-transparent py-4 placeholder:text-slate-400 font-light"
                                placeholder="Buscar un memorial..."
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            {search && (
                                <button onClick={() => setSearch('')} className="px-5 text-slate-400 hover:text-black dark:hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-xl">cancel</span>
                                </button>
                            )}
                        </div>
                        {search && (
                            <p className="text-slate-500 text-center mt-5 text-sm italic">
                                Se encontraron {filtered.length} resultados para "{search}"
                            </p>
                        )}
                    </div>
                </div>

                {/* Refined Filters */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
                    {['todos', 'hoy', 'reciente', 'cinerario'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setFiltroTipo(t as Tipo)}
                            className={`px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] transition-all border ${filtroTipo === t
                                    ? 'bg-black text-white border-black dark:bg-white dark:text-black shadow-lg scale-105'
                                    : 'bg-white text-[#7E7D7D] border-black/5 dark:bg-slate-800 dark:border-white/5 hover:border-black/20'
                                }`}
                        >
                            {t === 'todos' ? 'Ver Todos' : t}
                        </button>
                    ))}
                </div>

                {/* Results Grid - Premium Cards */}
                {loading ? (
                    <div className="flex justify-center py-24">
                        <div className="w-12 h-12 border-2 border-black/5 border-t-black rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {filtered.map(m => (
                            <Link
                                href={`/memoriales/${m.id}`}
                                key={m.id}
                                className="group bg-white dark:bg-slate-800/50 rounded-[2.5rem] p-10 flex flex-col items-center text-center transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.06)] border border-transparent hover:border-black/5"
                            >
                                <div className="w-48 h-64 mb-10 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-xl">
                                    <img
                                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                                        src={m.imagen || '/assets/images/stitch/placeholder-memorial.webp'}
                                        alt={m.nombre}
                                    />
                                </div>
                                <h3 className="font-serif text-2xl mb-2 text-slate-900 dark:text-white group-hover:text-black transition-colors">{m.nombre}</h3>
                                <p className="text-[#7E7D7D] font-display text-[10px] font-bold tracking-[0.4em] mb-10 uppercase">{m.nacimiento} — {m.fallecimiento}</p>

                                <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <span className="bg-black text-white dark:bg-white dark:text-black px-10 py-3.5 text-[9px] uppercase tracking-[0.3em] font-black rounded-full shadow-xl shadow-black/10">
                                        Explorar Legado
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination Placeholder */}
                {!loading && filtered.length > 0 && (
                    <div className="mt-24 pt-12 border-t border-black/5 flex flex-col items-center gap-8">
                        <div className="flex items-center gap-3">
                            <button className="w-10 h-10 rounded-full bg-black text-white font-bold text-xs ring-4 ring-black/10">1</button>
                            <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 text-[#7E7D7D] font-bold text-xs hover:bg-black/5 transition-all">2</button>
                            <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 text-[#7E7D7D] font-bold text-xs hover:bg-black/5 transition-all">3</button>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20">Desplazarse para más</p>
                    </div>
                )}
            </div>
        </main>
    );
}
