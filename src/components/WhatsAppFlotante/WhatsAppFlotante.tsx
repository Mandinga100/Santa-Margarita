'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function WhatsAppFlotante() {
    const btnRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        // Pulse animation for the WhatsApp button
        gsap.to(btnRef.current, {
            scale: 1.05,
            duration: 0.8,
            yoyo: true,
            repeat: -1,
            ease: "power1.inOut"
        });
    }, []);

    return (
        <>
            <a
                ref={btnRef}
                href="https://wa.me/56964333760?text=Hola%20necesito%20información%20sobre%20los%20servicios"
                className="fixed bottom-6 right-6 z-[99] bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20ba56] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
            >
                <i className="fab fa-whatsapp text-3xl"></i>
            </a>

            {/* Emergency Footer Bar - Fixed overlap with NavbarMobile */}
            <div className="fixed bottom-16 lg:bottom-0 left-0 w-full bg-[#1A1A1A] text-white py-1.5 px-4 z-[45] lg:z-[98] text-center text-[10px] md:text-xs font-bold tracking-wider flex items-center justify-center gap-3 border-t border-white/5">
                <i className="fas fa-exclamation-triangle animate-pulse text-white"></i>
                <span>SERVICIO 24/7 DISPONIBLE | <strong>+56 9 6433 3760</strong></span>
            </div>
        </>
    );
}
