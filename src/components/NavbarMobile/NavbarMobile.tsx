'use client';

import Link from 'next/link';

export default function NavbarMobile() {
    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#191919] border-t border-black/10 pb-env(safe-area-inset-bottom)">
            <ul className="flex justify-around items-center h-16 px-2">
                <li>
                    <Link href="/" className="flex flex-col items-center justify-center w-16 h-full text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-2xl mb-1">home</span>
                        <span className="text-[10px] font-medium tracking-wide">Inicio</span>
                    </Link>
                </li>
                <li>
                    <Link href="/cotizacion" className="flex flex-col items-center justify-center w-16 h-full text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-2xl mb-1">request_quote</span>
                        <span className="text-[10px] font-medium tracking-wide">Cotizar</span>
                    </Link>
                </li>
                <li>
                    <a href="tel:+56964333760" className="flex flex-col items-center justify-center w-16 h-full text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors relative -top-3">
                        <div className="bg-black text-white rounded-full p-3 shadow-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl">call</span>
                        </div>
                    </a>
                </li>
                <li>
                    <Link href="/memoriales" className="flex flex-col items-center justify-center w-16 h-full text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-2xl mb-1">church</span>
                        <span className="text-[10px] font-medium tracking-wide">Memoriales</span>
                    </Link>
                </li>
                <li>
                    <Link href="/faq" className="flex flex-col items-center justify-center w-16 h-full text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-2xl mb-1">help</span>
                        <span className="text-[10px] font-medium tracking-wide">Ayuda</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
