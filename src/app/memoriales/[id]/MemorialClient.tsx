'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import Link from 'next/link';

interface Memorial {
    id: string;
    nombre: string;
    nacimiento: string;
    fallecimiento: string;
    biografia?: string;
    imagen?: string;
    velas?: number;
}

interface Condolencia {
    id: string;
    autor: string;
    mensaje: string;
    fecha: any;
}


export default function MemorialDetallePage() {
    const { id } = useParams();
    const [memorial, setMemorial] = useState<Memorial | null>(null);
    const [condolencias, setCondolencias] = useState<Condolencia[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!id) return;
            setLoading(true);
            try {
                const docRef = doc(db, 'memoriales', id as string);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setMemorial({ id: docSnap.id, ...docSnap.data() } as Memorial);

                    // Fetch Condolencias
                    const q = query(
                        collection(db, 'condolencias'),
                        where('memorialId', '==', id),
                        orderBy('fecha', 'desc'),
                        limit(10)
                    );
                    const querySnap = await getDocs(q);
                    setCondolencias(querySnap.docs.map(d => ({ id: d.id, ...d.data() } as Condolencia)));
                } else {
                    // Si es demo (los IDs demo del listado)
                    const demoData: Record<string, Memorial> = {
                        demo1: {
                            id: 'demo1',
                            nombre: 'Eduardo Valenzuela Ortiz',
                            nacimiento: '1945',
                            fallecimiento: '2026',
                            biografia: 'Eduardo fue un hombre de gran rectitud y amor por su familia. Dedicó su vida a la enseñanza y al servicio público, dejando un legado de honestidad y perseverancia en todos sus alumnos y seres queridos.',
                            imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoUo_S4dkrDSR3bED7_t3MHAg2Idhz8Ft3niZVHPvDd0jPe3g3zC4NfiNeMXlge5yeOUzWvjRPY6ZgSXj3q2frMfGog4Sj6ppwT5C_jzS-BHQd8sl87yK2f0ldw_pZWvHab9NV6TGk2agq_OPJGSnR9h5mncmVLNQLfT1pBpxrgx51MyRSvdtooCayy13S76cSeWYil3A6QzeQV_Snr_IxvsTPDulNUwuDmKkJgs1SbYKVAR7jnAS839hCf8YDxM3dzrxOA72i_f0',
                            velas: 124
                        },
                        demo2: {
                            id: 'demo2',
                            nombre: 'Marta Cecilia Lagos',
                            nacimiento: '1952',
                            fallecimiento: '2026',
                            biografia: 'Marta fue la luz de nuestro hogar. Su alegría contagiosa y su pasión por la jardinería transformaron cada espacio que habitó en un paraíso terrenal. Siempre la recordaremos entre flores y risas.',
                            imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCzF_jQs-FqJ2kZmpfmdULJpCAVZxNR3xypFVfqBhXYWJ1QpxgCfB4ZWV8KrqAme334V3ZDoEFSFrrx5lJ6ckMFpBx-aa5TAbTHhUkyBMyRDcZeaiS360KKcmE3nOOPq3kji6jZl5swaRsYtCbX3NznjC8y2qXFrhYRusvs28zDzzx6Azu840QXmoDxtUFa5l8FDQ6lKHbCkelw6eZ7CcjM2XFbBMGCK86KvTI74iCmxX09wo9hUS-UGuujSyNG2CTaGmUgeefbUs',
                            velas: 89
                        },
                        demo3: {
                            id: 'demo3',
                            nombre: 'Roberto Méndez Silva',
                            nacimiento: '1938',
                            fallecimiento: '2026',
                            biografia: 'Un visionario y emprendedor que nunca olvidó sus raíces. Roberto construyó más que empresas; construyó puentes entre personas y oportunidades. Su fuerza seguirá guiando nuestro camino.',
                            imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDKhg2eOI9qNwG1r3blzhIJbqw1-3OxdqSafl5fxo8nGxA6yeMoW8J__3E1nQTav8NVCaMfPubW8w9kgITg0kxJYCQiaIpjLk5z-2CihuF3zymcv9ESbhWFebGZDqrGkXLNmpDv8Xz7WJZv2dYIjDPEyvDch5n8rjaw-x3aisFX97fGd0efwFxa_ooNymMPrRu5YWso00i0AojHCDTVMT-3-80NMp86NteKn2s69XCVQUfWOSrJbaWBcZlHcQAcB1xWbKRA3JJInQ',
                            velas: 215
                        }
                    };
                    if (demoData[id as string]) {
                        setMemorial(demoData[id as string]);
                        setCondolencias([
                            { id: 'c1', autor: 'Familia Mendoza', mensaje: 'Nuestro más sentido pésame. Un gran ejemplo de vida.', fecha: { seconds: Date.now() / 1000 - 3600 * 2 } },
                            { id: 'c2', autor: 'Carlos Soto', mensaje: 'Lo extrañaremos profundamente. Gracias por todo.', fecha: { seconds: Date.now() / 1000 - 3600 * 24 } }
                        ]);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7] dark:bg-[#101622]">
            <div className="w-12 h-12 border-2 border-black/5 border-t-black rounded-full animate-spin"></div>
        </div>
    );

    if (!memorial) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f7f7f7] dark:bg-[#101622] px-6 text-center">
            <h1 className="font-serif text-4xl mb-4">Memorial no encontrado</h1>
            <Link href="/memoriales" className="text-sm font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-all">Volver al listado</Link>
        </div>
    );

    return (
        <main className="min-h-screen bg-white dark:bg-[#101622] font-display selection:bg-black selection:text-white">

            {/* Header / Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="relative inline-block mb-12 group">
                        <div className="absolute -inset-4 bg-black/5 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
                            <img
                                src={memorial.imagen || '/assets/images/stitch/placeholder-memorial.webp'}
                                alt={memorial.nombre}
                                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100"
                            />
                        </div>
                    </div>
                    <h1 className="font-serif text-5xl md:text-7xl mb-4 italic text-black dark:text-white">{memorial.nombre}</h1>
                    <p className="text-[#7E7D7D] text-lg tracking-[0.4em] uppercase font-light">{memorial.nacimiento} — {memorial.fallecimiento}</p>
                    <div className="w-16 h-px bg-black/10 mx-auto mt-12"></div>
                </div>
            </section>

            {/* Action Bar */}
            <section className="sticky top-20 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-y border-black/5">
                <div className="max-w-4xl mx-auto flex divide-x divide-black/5">
                    <button className="flex-1 py-8 flex flex-col items-center gap-2 hover:bg-black/5 transition-all group">
                        <span className="material-symbols-outlined text-amber-500 fill-1 text-3xl">flare</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Encender Vela</span>
                    </button>
                    <button className="flex-1 py-8 bg-black text-white flex flex-col items-center gap-2 hover:bg-slate-900 transition-all group">
                        <span className="material-symbols-outlined text-3xl">edit_note</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Escribir Condolencia</span>
                    </button>
                </div>
            </section>

            {/* Biography */}
            <section className="py-32 px-6">
                <div className="max-w-2xl mx-auto">
                    <h2 className="font-serif text-4xl mb-12 text-center italic text-black dark:text-white">Su Legado</h2>
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-xl leading-relaxed font-light text-slate-700 dark:text-slate-300 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left first-letter:italic">
                            {memorial.biografia || 'Un ser humano excepcional que tocó las vidas de todos los que tuvieron el honor de conocerle...'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Candle Count */}
            <section className="py-20 bg-[#fcfcfc] dark:bg-slate-800/20 border-y border-black/5">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#7E7D7D] mb-8">{memorial.velas || 0} Luces encendidas en su honor</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[...Array(Math.min(24, memorial.velas || 5))].map((_, i) => (
                            <span key={i} className="material-symbols-outlined text-amber-500 fill-1 text-2xl opacity-40 hover:opacity-100 transition-all cursor-default animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                                flare
                            </span>
                        ))}
                        {(memorial.velas || 0) > 24 && <span className="text-slate-300 self-end text-xs font-bold">...</span>}
                    </div>
                </div>
            </section>

            {/* Condolences Wall */}
            <section className="py-32 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="font-serif text-4xl mb-16 text-center italic text-black dark:text-white">Muro de Condolencias</h2>

                    <div className="space-y-6">
                        {condolencias.length > 0 ? (
                            condolencias.map(c => (
                                <div key={c.id} className="bg-[#f9f9f9] dark:bg-slate-800/40 p-12 rounded-[2rem] border border-black/5">
                                    <div className="flex justify-between items-start mb-6">
                                        <h4 className="font-serif text-xl text-black dark:text-white">{c.autor}</h4>
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-black/20">
                                            {c.fecha?.seconds ? new Date(c.fecha.seconds * 1000).toLocaleDateString() : 'Recientemente'}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 font-light italic leading-relaxed text-lg">
                                        "{c.mensaje}"
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 border-2 border-dashed border-black/5 rounded-[2rem]">
                                <p className="text-[#7E7D7D] font-light italic">No hay mensajes aún. Sea el primero en compartir un recuerdo.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-16 text-center">
                        <Link href="/memoriales" className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 hover:text-black hover:tracking-[0.5em] transition-all">
                            Volver a Memoriales
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
