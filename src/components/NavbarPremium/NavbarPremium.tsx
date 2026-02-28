'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function NavbarPremium() {
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Background transition effect
        gsap.to(navRef.current, {
            scrollTrigger: {
                trigger: 'body',
                start: 'top -50',
                toggleActions: 'play none none reverse',
            },
            backgroundColor: 'rgba(25, 25, 25, 0.95)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            duration: 0.3,
        });

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent border-b border-transparent"
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Brand / Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <img
                        src="/assets/images/brand/logo-white.webp"
                        alt="Logo Oficial Funeraria Santa Margarita"
                        className="h-10 w-auto group-hover:opacity-80 transition-opacity"
                    />
                </Link>

                {/* Navigation Links */}
                <div className="hidden lg:flex items-center gap-8 text-white">
                    <Link className="text-sm font-medium hover:text-white/60 transition-colors uppercase tracking-widest" href="#hero">Inicio</Link>
                    <Link className="text-sm font-medium hover:text-white/60 transition-colors uppercase tracking-widest" href="#planes">Planes</Link>
                    <Link className="text-sm font-medium hover:text-white/60 transition-colors uppercase tracking-widest" href="#servicios">Servicios</Link>
                    <Link className="text-sm font-medium hover:text-white/60 transition-colors uppercase tracking-widest" href="#diferenciador">Nosotros</Link>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-4">
                    <Link href="/cotizacion" className="hidden md:inline-flex bg-white text-black px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors shadow-lg shadow-black/10">
                        Cotización 24/7
                    </Link>
                    <a href="https://wa.me/56964333760?text=Hola%20necesito%20información" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white flex items-center justify-center h-10 w-10 md:w-auto md:px-4 rounded-full text-sm font-bold shadow-lg shadow-green-900/40 hover:scale-105 active:scale-95 transition-transform">
                        <i className="fab fa-whatsapp text-lg"></i>
                        <span className="hidden md:inline ml-2">Asistencia Inmediata</span>
                    </a>

                    {/* Mobile Toggle Placeholder */}
                    <button className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
}
