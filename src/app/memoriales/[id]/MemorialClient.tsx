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
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-16 h-16 border border-white/10 border-t-white rounded-full animate-spin"></div>
        </div>
    );

    if (!memorial) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 text-center">
            <h1 className="font-serif text-5xl mb-8 text-white">Memorial no encontrado</h1>
            <Link href="/memoriales" className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white border-b border-white/10 pb-4 transition-all">Regresar a la Galería</Link>
        </div>
    );

    return (
        <main className="min-h-screen bg-black text-white font-display selection:bg-white/10 antialiased overflow-x-hidden">

            {/* Header / Hero - Estilo Editorial Sanitario */}
            <section className="pt-40 pb-24 px-6 relative">
                <div className="max-w-4xl mx-auto text-center border-b border-white/5 pb-24">
                    <div className="relative inline-block mb-16 transform transition-transform duration-[2s] hover:scale-105">
                        <div className="absolute -inset-10 bg-white/5 rounded-full blur-[80px] opacity-40"></div>
                        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border border-white/10 shadow-3xl">
                            <img
                                src={memorial.imagen || '/assets/images/stitch/placeholder-memorial.webp'}
                                alt={`Retrato de ${memorial.nombre}`}
                                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
                            />
                        </div>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/40 block mb-6">En Memoria Eterna</span>
                    <h1 className="font-serif text-6xl md:text-8xl mb-8 italic tracking-tight leading-[0.9] text-white">{memorial.nombre}</h1>
                    <p className="text-white/30 text-xl tracking-[0.5em] uppercase font-black">{memorial.nacimiento} — {memorial.fallecimiento}</p>
                </div>
            </section>

            {/* Sticky Action Bar - Premium Dark Glass */}
            <section className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-2xl">
                <div className="max-w-5xl mx-auto flex h-32">
                    <button className="flex-1 flex flex-col items-center justify-center gap-3 transition-all duration-700 hover:bg-white/[0.03] group border-r border-white/5">
                        <span className="material-symbols-outlined text-amber-400 group-hover:scale-125 transition-transform duration-500 text-3xl fill-1">flare</span>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">Encender Luz</span>
                    </button>
                    <button className="flex-1 flex bg-white text-black flex-col items-center justify-center gap-3 transition-all duration-700 hover:bg-white/90 group">
                        <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform duration-500">auto_awesome</span>
                        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-black">Ofrecer Tributo</span>
                    </button>
                </div>
            </section>

            {/* Biography Section - Editorial Layout */}
            <section className="py-40 px-6">
                <div className="max-w-3xl mx-auto relative">
                    <div className="absolute -left-20 top-0 text-[180px] font-serif italic text-white/[0.02] leading-none select-none">"</div>
                    <h2 className="font-serif text-5xl mb-20 text-center italic text-white/90">Ecos de una Vida</h2>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-2xl md:text-3xl leading-[1.6] font-light text-white/50 first-letter:text-8xl first-letter:font-serif first-letter:mr-6 first-letter:mt-4 first-letter:float-left first-letter:italic first-letter:text-white">
                            {memorial.biografia || 'Un ser humano excepcional cuyo legado trasciende las palabras, habitando en los gestos, las risas y los recuerdos de quienes tuvieron la bendición de cruzarse en su camino...'}
                        </p>
                    </div>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-32"></div>
                </div>
            </section>

            {/* Candle Wall - Visual Tribute */}
            <section className="py-24 bg-white/[0.02] border-y border-white/5">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-12">{memorial.velas || 0} Luces habitando este espacio</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        {[...Array(Math.min(32, memorial.velas || 8))].map((_, i) => (
                            <div key={i} className="group relative">
                                <span className="material-symbols-outlined text-amber-500/30 text-3xl fill-1 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}>
                                    flare
                                </span>
                                <div className="absolute inset-0 bg-amber-500/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                        ))}
                        {(memorial.velas || 0) > 32 && <span className="text-white/10 self-center text-xs font-black tracking-widest">+</span>}
                    </div>
                </div>
            </section>

            {/* Condolences Wall - Premium Cards */}
            <section className="py-40 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="font-serif text-5xl mb-24 text-center italic text-white">Pensamientos Compartidos</h2>

                    <div className="grid gap-12">
                        {condolencias.length > 0 ? (
                            condolencias.map(c => (
                                <article key={c.id} className="bg-white/[0.02] p-16 rounded-[3rem] border border-white/5 hover:border-white/10 transition-all duration-700 hover:bg-white/[0.03]">
                                    <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-8">
                                        <h4 className="font-serif text-2xl text-white italic">{c.autor}</h4>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/10">
                                            {c.fecha?.seconds ? new Date(c.fecha.seconds * 1000).toLocaleDateString() : 'Presente'}
                                        </span>
                                    </div>
                                    <p className="text-white/40 font-light italic leading-relaxed text-2xl">
                                        "{c.mensaje}"
                                    </p>
                                </article>
                            ))
                        ) : (
                            <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-[3rem]">
                                <p className="text-white/20 text-xl font-light italic">El silencio también es un homenaje. Sea el primero en romperlo con un recuerdo.</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-32 text-center">
                        <Link href="/memoriales" className="group inline-flex items-center gap-4 py-6 px-12 border border-white/5 rounded-full hover:bg-white hover:text-black transition-all duration-700">
                            <span className="material-symbols-outlined text-xl group-hover:-translate-x-2 transition-transform duration-500">arrow_back</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Cronología de Memoriales</span>
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
