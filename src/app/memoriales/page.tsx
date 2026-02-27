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

// Datos de demostración que se muestran si Firestore no tiene documentos aún
const DEMO_MEMORIALES = [
    {
        id: 'demo1',
        nombre: 'Eduardo Valenzuela Ortiz',
        nacimiento: '1945',
        fallecimiento: '2026',
        tipo: 'reciente',
        mensaje: 'Padre amoroso, siempre en nuestros corazones.',
    },
    {
        id: 'demo2',
        nombre: 'Marta Cecilia Lagos',
        nacimiento: '1952',
        fallecimiento: '2026',
        tipo: 'cinerario',
        mensaje: 'Luz que nunca se apaga.',
    },
    {
        id: 'demo3',
        nombre: 'Roberto Méndez Silva',
        nacimiento: '1938',
        fallecimiento: '2026',
        tipo: 'hoy',
        mensaje: '',
    },
    {
        id: 'demo4',
        nombre: 'Lucía Fernández Tapia',
        nacimiento: '1960',
        fallecimiento: '2026',
        tipo: 'reciente',
        mensaje: 'Abuela querida, tu legado vive en nosotros.',
    },
    {
        id: 'demo5',
        nombre: 'Carlos Andrés Rojas',
        nacimiento: '1955',
        fallecimiento: '2026',
        tipo: 'cinerario',
        mensaje: '',
    },
    {
        id: 'demo6',
        nombre: 'Ana María Fuentes',
        nacimiento: '1970',
        fallecimiento: '2026',
        tipo: 'hoy',
        mensaje: 'Siempre en la memoria de quienes te amaron.',
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
}

const TIPO_LABELS: Record<string, { label: string; color: string }> = {
    hoy: { label: 'Servicio de Hoy', color: 'bg-black text-white dark:bg-white dark:text-black' },
    reciente: { label: 'Servicio Reciente', color: 'bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white' },
    cinerario: { label: 'Cinerario', color: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300' },
};

// Iniciales para avatar
function getInitials(name: string) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase();
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
                // Sin datos en Firestore aún → mostrar demo
                setUsingDemo(true);
                setMemoriales(DEMO_MEMORIALES);
            } else {
                setUsingDemo(false);
                setMemoriales(
                    snap.docs.map(d => ({ id: d.id, ...d.data() } as Memorial))
                );
            }
        } catch {
            // Error de conexión → fallback a demo
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

    const tabs: { id: Tipo; label: string; icon: string }[] = [
        { id: 'todos', label: 'Todos', icon: 'grid_view' },
        { id: 'hoy', label: 'Hoy', icon: 'today' },
        { id: 'reciente', label: 'Recientes', icon: 'history' },
        { id: 'cinerario', label: 'Cinerarios', icon: 'local_fire_department' },
    ];

    return (
        <main className="min-h-screen bg-white dark:bg-black">
            {/* Hero dark */}
            <section className="bg-black text-white px-6 pt-16 pb-14">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 block mb-4">
                        Memoriales y Obituarios
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl font-medium mb-5">
                        Un espacio para recordarles
                    </h1>
                    <p className="text-white/60 text-base font-light max-w-xl mx-auto leading-relaxed mb-8">
                        Honramos la memoria de quienes han partido. Aquí encontrará los servicios
                        actuales y recientes de Funeraria Santa Margarita.
                    </p>

                    {/* Buscador */}
                    <div className="relative max-w-md mx-auto">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-[20px]">search</span>
                        <input
                            type="text"
                            placeholder="Buscar por nombre o apellido…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Tabs filtro — sticky */}
            <div className="sticky top-0 z-20 bg-white dark:bg-zinc-950 border-b border-black/5 dark:border-white/5 shadow-sm">
                <div className="max-w-5xl mx-auto px-6 flex overflow-x-auto gap-0 hide-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setFiltroTipo(tab.id)}
                            className={`flex items-center gap-2 px-5 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap border-b-2 transition-all ${filtroTipo === tab.id
                                ? 'border-black dark:border-white text-black dark:text-white'
                                : 'border-transparent text-[#7E7D7D] hover:text-black dark:hover:text-white'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Aviso modo demo */}
            {usingDemo && !loading && (
                <div className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-800 px-6 py-3">
                    <p className="max-w-5xl mx-auto text-xs text-amber-800 dark:text-amber-400 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px]">info</span>
                        Mostrando datos de ejemplo. Conecte Firestore para ver memoriales reales.
                    </p>
                </div>
            )}

            {/* Grilla memoriales */}
            <section className="max-w-5xl mx-auto px-6 py-14">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 text-[#7E7D7D]">
                        <span className="material-symbols-outlined text-4xl animate-spin mb-4">progress_activity</span>
                        <p className="text-sm">Cargando memoriales…</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <span className="material-symbols-outlined text-5xl text-black/10 dark:text-white/10 mb-4">search_off</span>
                        <p className="font-semibold text-black dark:text-white mb-1">Sin resultados</p>
                        <p className="text-sm text-[#7E7D7D]">
                            No se encontraron memoriales para <strong>"{search}"</strong>
                        </p>
                        <button
                            onClick={() => setSearch('')}
                            className="mt-4 text-sm underline underline-offset-4 text-[#7E7D7D] hover:text-black dark:hover:text-white transition-colors"
                        >
                            Limpiar búsqueda
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filtered.map(m => {
                            const tipoInfo = TIPO_LABELS[m.tipo] ?? { label: m.tipo, color: 'bg-zinc-100 text-zinc-600' };
                            const initials = getInitials(m.nombre);
                            return (
                                <div
                                    key={m.id}
                                    className="group border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 hover:shadow-lg transition-all hover:-translate-y-0.5"
                                >
                                    {/* Foto / Avatar */}
                                    <div className="h-36 bg-gradient-to-br from-zinc-200 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center relative overflow-hidden">
                                        <span className="font-serif text-4xl font-bold text-black/20 dark:text-white/20 select-none">
                                            {initials}
                                        </span>
                                        {/* Badge tipo */}
                                        <span className={`absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${tipoInfo.color}`}>
                                            {tipoInfo.label}
                                        </span>
                                        {/* Vela decorativa */}
                                        <span className="absolute left-3 bottom-3 material-symbols-outlined text-[20px] text-black/10 dark:text-white/10">
                                            local_fire_department
                                        </span>
                                    </div>

                                    {/* Contenido */}
                                    <div className="p-5">
                                        <h3 className="font-serif font-bold text-black dark:text-white text-lg leading-snug mb-1">
                                            {m.nombre}
                                        </h3>
                                        <p className="text-xs text-[#7E7D7D] font-medium mb-3">
                                            {m.nacimiento} — {m.fallecimiento}
                                        </p>
                                        {m.mensaje && (
                                            <p className="text-sm text-slate-500 dark:text-slate-400 italic leading-relaxed mb-4 line-clamp-2">
                                                "{m.mensaje}"
                                            </p>
                                        )}
                                        <a
                                            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER || '56964333760'}?text=${encodeURIComponent(`Hola, deseo información sobre el servicio de ${m.nombre}.`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#7E7D7D] hover:text-black dark:hover:text-white transition-colors group-hover:gap-3"
                                        >
                                            Consultar información
                                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="bg-[#F2F2F2] dark:bg-zinc-900/50 py-14 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="material-symbols-outlined text-3xl text-black/20 dark:text-white/20 block mb-4">volunteer_activism</span>
                    <h3 className="font-serif text-2xl font-semibold mb-3 text-black dark:text-white">
                        ¿Desea publicar un memorial?
                    </h3>
                    <p className="text-[#7E7D7D] text-sm mb-7 max-w-md mx-auto leading-relaxed">
                        Los familiares de personas que contraten nuestros servicios pueden solicitar
                        que incluyamos un espacio de memoria en este sitio.
                    </p>
                    <a
                        href="tel:+56964333760"
                        className="inline-flex items-center gap-3 bg-black text-white dark:bg-white dark:text-black px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:opacity-80 transition-opacity"
                    >
                        <span className="material-symbols-outlined text-[18px]">call</span>
                        Contactar · +56 9 6433 3760
                    </a>
                </div>
            </section>
        </main>
    );
}
