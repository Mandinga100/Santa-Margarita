'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { usePathname } from 'next/navigation';

export default function NavbarPremium() {
    const navRef = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState('inicio');

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

        // Current active section observer (only for home)
        if (pathname === '/') {
            const sections = document.querySelectorAll('section[id]');
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveSection(entry.target.id);
                        }
                    });
                },
                { rootMargin: '-30% 0px -70% 0px' }
            );

            sections.forEach((section) => observer.observe(section));

            return () => {
                sections.forEach((section) => observer.unobserve(section));
                ScrollTrigger.getAll().forEach((st) => st.kill());
            };
        }

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, [pathname]);

    const getHref = (id: string) => pathname === '/' ? `#${id}` : `/#${id}`;

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-transparent border-b border-transparent nav-dark flex flex-col"
            role="navigation"
        >
            {/* Secondary Navbar */}
            <div className="navbar-secondary w-full py-1.5 px-4 bg-black/40 backdrop-blur-md border-b border-white/10 hidden md:block">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] text-gray-300 font-medium tracking-widest uppercase">
                    <span id="datetime">28 Feb 2026 | 17:30</span>
                    <span>UF: <span id="uf-value">$37.123</span> | UTM: <span id="utm-value">$66.789</span></span>
                </div>
            </div>
            <div className="w-full px-[2vw] h-20 flex items-center justify-between pt-[2vh]">

                {/* Brand / Logo */}
                <Link href={getHref('inicio')} className="flex items-center gap-3 group logo-left">
                    <img
                        src="/assets/images/brand/logo-white.webp"
                        alt="Logo Oficial Funeraria Santa Margarita"
                        className="h-12 md:h-16 w-auto max-w-[220px] md:max-w-[280px] group-hover:opacity-80 transition-opacity object-contain"
                    />
                </Link>

                {/* Navigation Links (Orden Jerárquico) */}
                <div className="hidden lg:flex items-center gap-6 text-white ml-auto mr-10">
                    <Link className={`nav-link text-[10px] font-black transition-colors uppercase tracking-[0.3em] ${activeSection === 'inicio' ? 'active' : ''}`} href={getHref('inicio')}>Inicio</Link>
                    <Link className={`nav-link text-[10px] font-black transition-colors uppercase tracking-[0.3em] ${activeSection === 'planes' ? 'active' : ''}`} href={getHref('planes')}>Planes</Link>
                    <Link className={`nav-link text-[10px] font-black transition-colors uppercase tracking-[0.3em] ${activeSection === 'servicios' ? 'active' : ''}`} href={getHref('servicios')}>Servicios</Link>
                    <Link className="nav-link text-[10px] font-black transition-colors uppercase tracking-[0.3em]" href="/memoriales">Memoriales</Link>
                    <Link className={`nav-link text-[10px] font-black transition-colors uppercase tracking-[0.3em] ${activeSection === 'nosotros' ? 'active' : ''}`} href={getHref('nosotros')}>Nosotros</Link>
                    <Link className={`nav-link text-[10px] font-black transition-colors uppercase tracking-[0.3em] ${activeSection === 'prevision' ? 'active' : ''}`} href={getHref('prevision')}>Previsión</Link>
                    <Link className={`nav-link text-[10px] font-black transition-colors uppercase tracking-[0.3em] ${activeSection === 'contacto' ? 'active text-[#b8960c]' : ''}`} href={getHref('contacto')}>Contacto</Link>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-4 ctas-right">
                    {/* Cotización -> Derecha extrema, d-none d-md-flex (hidden md:flex) */}
                    <Link href="http://localhost:3000/cotizacion?plan=estandar" className="hidden md:inline-flex border border-white text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                        Cotización Inmediata
                    </Link>

                    {/* Mobile Toggle Placeholder */}
                    <button className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors ml-auto">
                        <i className="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
}
