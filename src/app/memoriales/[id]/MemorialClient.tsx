'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

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
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

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
                    // Si es demo
                    const demoData: Record<string, Memorial> = {
                        demo1: {
                            id: 'demo1',
                            nombre: 'Eduardo Valenzuela Ortiz',
                            nacimiento: '1945',
                            fallecimiento: '2026',
                            biografia: 'Eduardo fue un hombre de gran rectitud y amor por su familia. Dedicó su vida a la enseñanza y al servicio público, dejando un legado de honestidad y perseverancia en todos sus alumnos y seres queridos. Su partida deja un vacío profundo, pero su ejemplo seguirá guiando a las futuras generaciones de su linaje.',
                            imagen: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
                            velas: 124
                        },
                        demo2: {
                            id: 'demo2',
                            nombre: 'Marta Cecilia Lagos',
                            nacimiento: '1952',
                            fallecimiento: '2026',
                            biografia: 'Marta fue la luz de nuestro hogar. Su alegría contagiosa y su pasión por la jardinería transformaron cada espacio que habitó en un paraíso terrenal. Siempre la recordaremos entre flores y risas, su espíritu libre vuela ahora sobre los campos que tanto amó cuidar.',
                            imagen: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
                            velas: 89
                        }
                    };
                    if (demoData[id as string]) {
                        setMemorial(demoData[id as string]);
                        setCondolencias([
                            { id: 'c1', autor: 'Familia Mendoza', mensaje: 'Nuestro más sentido pésame. Un gran ejemplo de vida para todos nosotros.', fecha: { seconds: Date.now() / 1000 - 3600 * 2 } },
                            { id: 'c2', autor: 'Carlos Soto', mensaje: 'Lo extrañaremos profundamente. Gracias por todo el apoyo brindado siempre.', fecha: { seconds: Date.now() / 1000 - 3600 * 24 } }
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

    useEffect(() => {
        if (!loading && memorial) {
            const ctx = gsap.context(() => {
                // Image and Header Parallax
                gsap.to(".portrait-parallax", {
                    yPercent: 15,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".portrait-container",
                        start: "top center",
                        end: "bottom top",
                        scrub: true
                    }
                });

                // Condolences Staggered Entry
                gsap.fromTo(".condolence-card",
                    { opacity: 0, scale: 0.95 },
                    {
                        opacity: 1, scale: 1, duration: 1.2, stagger: 0.2, ease: "expo.out",
                        scrollTrigger: {
                            trigger: ".condolences-grid",
                            start: "top 85%",
                        }
                    }
                );

                // Candle Animation
                gsap.fromTo(".candle-item",
                    { opacity: 0, scale: 0 },
                    {
                        opacity: 1, scale: 1, duration: 0.8, stagger: 0.05, ease: "back.out(2)",
                        scrollTrigger: {
                            trigger: ".candle-wall",
                            start: "top 90%",
                        }
                    }
                );
            }, containerRef);
            return () => ctx.revert();
        }
    }, [loading, memorial]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-24 h-24 border-2 border-white/5 border-t-white rounded-full animate-spin"></div>
        </div>
    );

    if (!memorial) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 text-center">
            <h1 className="font-serif text-6xl mb-12 text-white">Silencio Eterno</h1>
            <p className="text-white/20 text-xl font-light mb-16 italic">"El memorial que busca no reside en este plano."</p>
            <Link href="/memoriales" className="group flex items-center gap-6 text-white font-black uppercase tracking-[0.6em] text-[10px] transition-all">
                <span className="material-symbols-outlined group-hover:-translate-x-4 transition-transform duration-700">arrow_back</span>
                Regresar a la Galería
            </Link>
        </div>
    );

    return (
        <main ref={containerRef} className="min-h-screen bg-black text-white font-display selection:bg-white/10 antialiased overflow-x-hidden">

            {/* Header / Hero - Editorial Portrait Styling */}
            <section className="pt-48 pb-32 px-6 relative portrait-container">
                <div className="max-w-5xl mx-auto text-center border-b border-white/5 pb-32">
                    <div className="relative inline-block mb-24 portrait-parallax">
                        <div className="absolute -inset-20 bg-white/5 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
                        <div className="relative w-80 h-80 md:w-[500px] md:h-[500px] rounded-full overflow-hidden border border-white/10 shadow-3xl bg-zinc-900 group">
                            <Image
                                src={memorial.imagen || '/assets/images/stitch/placeholder-memorial.webp'}
                                alt={`Retrato de ${memorial.nombre}`}
                                fill
                                priority
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-[3s] ease-in-out cursor-crosshair group-hover:scale-105"
                            />
                        </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/30 block mb-10">Homenaje Póstumo Digital</span>
                    <h1 className="font-serif text-7xl md:text-9xl mb-10 italic tracking-tighter leading-[0.8] text-white underline decoration-white/5 underline-offset-[20px]">{memorial.nombre}</h1>
                    <p className="text-white/20 text-2xl tracking-[0.4em] uppercase font-light italic">{memorial.nacimiento}  —  {memorial.fallecimiento}</p>
                </div>
            </section>

            {/* Sticky Action Bar - Professional Navigation */}
            <section className="sticky top-0 z-50 border-b border-white/5 bg-black/90 backdrop-blur-3xl">
                <div className="max-w-6xl mx-auto flex h-36">
                    <button className="flex-1 flex flex-col items-center justify-center gap-4 transition-all duration-1000 hover:bg-white/[0.03] group border-r border-white/5">
                        <span className="material-symbols-outlined text-amber-500 group-hover:scale-150 transition-transform duration-1000 text-4xl fill-1 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">flare</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 group-hover:text-white transition-colors">Encender Luz Relevante</span>
                    </button>
                    <button className="flex-1 flex bg-white text-black flex-col items-center justify-center gap-4 transition-all duration-1000 hover:bg-zinc-200 group relative overflow-hidden">
                        <span className="relative z-10 material-symbols-outlined text-4xl group-hover:rotate-12 transition-transform duration-700">auto_awesome</span>
                        <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.5em]">Ofrecer Tributo</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s]"></div>
                    </button>
                </div>
            </section>

            {/* Biography Section - Premium Editorial Typography */}
            <section className="py-64 px-6 bg-black relative">
                <div className="max-w-4xl mx-auto relative content-reveal">
                    <div className="absolute -left-32 -top-20 text-[250px] font-serif italic text-white/[0.03] leading-none select-none pointer-events-none">"</div>
                    <h2 className="font-serif text-6xl mb-24 text-center italic text-white/90 leading-none">El Legado de una Vida</h2>

                    <div className="prose prose-invert max-w-none text-center lg:text-left">
                        <p className="text-3xl md:text-5xl leading-[1.5] font-light text-white/70 italic first-letter:text-9xl first-letter:font-serif first-letter:mr-8 first-letter:mt-6 first-letter:float-left first-letter:italic first-letter:text-white first-letter:not-italic selection:bg-white selection:text-black">
                            {memorial.biografia || 'Un ser humano cuya existencia trascendió las palabras, dejando una huella imborrable en el alma de quienes caminaron a su lado...'}
                        </p>
                    </div>

                    <div className="flex justify-center mt-40">
                        <div className="w-32 h-px bg-white/20"></div>
                        <div className="mx-8 w-1 h-1 bg-white/50 rounded-full"></div>
                        <div className="w-32 h-px bg-white/20"></div>
                    </div>
                </div>
            </section>

            {/* Candle Wall - Visual Symbolic Tribute */}
            <section className="py-48 bg-white/[0.01] border-y border-white/5 relative overflow-hidden candle-wall">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03),transparent)] pointer-events-none"></div>
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <span className="text-[11px] font-black uppercase tracking-[0.6em] text-white/20 block mb-16 italic">Presencias Luminosas</span>
                    <div className="flex flex-wrap justify-center gap-10">
                        {[...Array(Math.min(48, memorial.velas || 8))].map((_, i) => (
                            <div key={i} className="candle-item group relative cursor-help">
                                <span className="material-symbols-outlined text-amber-500/20 text-4xl fill-1 group-hover:text-amber-400 group-hover:scale-150 transition-all duration-1000 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
                                    flare
                                </span>
                                <div className="absolute inset-0 bg-amber-500/0 blur-2xl rounded-full group-hover:bg-amber-500/20 transition-all duration-1000"></div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-20 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">{memorial.velas || 0} Testimonios de Luz</p>
                </div>
            </section>

            {/* Condolences Wall - Staggered Flow */}
            <section className="py-64 px-6 bg-black">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-40 text-center">
                        <h2 className="font-serif text-6xl md:text-8xl mb-8 italic text-white decoration-white/5 underline underline-offset-[30px]">Palabras de Gracia</h2>
                    </header>

                    <div className="grid gap-16 condolences-grid">
                        {condolencias.length > 0 ? (
                            condolencias.map(c => (
                                <article key={c.id} className="condolence-card bg-white/[0.02] p-20 rounded-[4rem] border border-white/5 hover:border-white/20 transition-all duration-1000 hover:bg-white/[0.05] relative overflow-hidden group">
                                    <div className="absolute -right-10 -top-10 text-[120px] font-serif italic text-white/[0.01] group-hover:text-white/[0.03] transition-colors pointer-events-none">"</div>
                                    <div className="flex justify-between items-center mb-12 border-b border-white/5 pb-10">
                                        <h4 className="font-serif text-3xl text-white italic">{c.autor}</h4>
                                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
                                            {c.fecha?.seconds ? new Date(c.fecha.seconds * 1000).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Infinito'}
                                        </span>
                                    </div>
                                    <p className="text-white/50 font-light italic leading-loose text-2xl md:text-3xl max-w-3xl">
                                        &quot;{c.mensaje}&quot;
                                    </p>
                                </article>
                            ))
                        ) : (
                            <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-[4rem] group hover:border-white/20 transition-all duration-1000">
                                <span className="material-symbols-outlined text-6xl text-white/5 mb-10 group-hover:text-white/20 transition-colors">history_edu</span>
                                <p className="text-white/20 text-2xl font-light italic">"Aún no hay ecos en este memorial. Sea la primera voz de recuerdo."</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-48 text-center">
                        <Link href="/memoriales" className="group inline-flex items-center gap-8 py-8 px-16 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-1000 shadow-3xl shadow-white/5">
                            <span className="material-symbols-outlined text-2xl group-hover:-translate-x-4 transition-transform duration-1000">arrow_back</span>
                            <span className="text-[11px] font-black uppercase tracking-[0.6em]">Volver al Santuario Digital</span>
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
