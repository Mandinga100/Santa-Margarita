'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import PremiumContactForm from '@/components/PremiumContactForm';

export default function ContactoPage() {
    const headerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        if (headerRef.current) {
            tl.fromTo(headerRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
            );
        }

        if (formRef.current) {
            tl.fromTo(formRef.current,
                { opacity: 0, scale: 0.95, y: 40 },
                { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'expo.out' },
                "-=0.5"
            );
        }
    }, []);

    return (
        <main className="min-h-screen bg-[#0a0a0a] pt-40 pb-32 text-white font-display flex flex-col items-center justify-center selection:bg-white/10 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-[#b8960c]/10 to-transparent blur-[120px] pointer-events-none opacity-40 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-5xl w-full mx-auto px-6 text-center mb-16 relative z-10" ref={headerRef}>
                <MotionFallbackHeader>
                    <span className="material-symbols-outlined text-5xl text-[#b8960c] mb-6 block drop-shadow-lg">contact_support</span>
                    <h1 className="font-serif text-5xl md:text-8xl italic mb-6 text-white tracking-tighter">
                        Contáctanos
                    </h1>
                    <p className="text-white/40 text-lg md:text-xl font-light italic max-w-2xl mx-auto leading-relaxed border-t border-white/10 pt-6">
                        Nuestro equipo aguarda para brindarle contención inmediata en este momento.
                    </p>
                </MotionFallbackHeader>
            </div>

            <div className="max-w-4xl w-full mx-auto px-6 relative z-10" ref={formRef}>
                <PremiumContactForm
                    sourcePage="Contacto"
                    title="Asesoría Inmediata"
                    subtitle="Complete los datos para recibir asistencia profesional en menos de 15 minutos."
                />
            </div>

            {/* Support info */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto px-6 relative z-10 text-center border-t border-white/5 pt-12">
                <div>
                    <h4 className="text-[#b8960c] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Urgencias</h4>
                    <p className="text-white text-xl font-serif italic">+56 9 8765 4321</p>
                </div>
                <div>
                    <h4 className="text-[#b8960c] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Atención 24/7</h4>
                    <p className="text-white text-xl font-serif italic">Todos los días</p>
                </div>
                <div>
                    <h4 className="text-[#b8960c] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Ubicación</h4>
                    <p className="text-white text-xl font-serif italic">Santiago, Chile</p>
                </div>
            </div>
        </main>
    );
}

// Simple fallback for the motion container since we are using GSAP for the outer refs
function MotionFallbackHeader({ children }: { children: React.ReactNode }) {
    return <div className="space-y-4">{children}</div>;
}
