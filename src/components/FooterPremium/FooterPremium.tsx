import Link from 'next/link';
import Image from 'next/image';

export default function FooterPremium() {
    return (
        <footer className="bg-[#111111] text-zinc-400 pt-20 pb-10 border-t-4 border-black">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 border-b border-zinc-800 pb-16">

                {/* Brand Information */}
                <div className="flex flex-col gap-6">
                    <Link href="/" className="inline-block opacity-90 hover:opacity-100 transition-opacity">
                        <Image src="/assets/images/brand/logo-white.webp" alt="Funeraria Santa Margarita" width={180} height={60} className="w-auto h-12 object-contain" />
                    </Link>
                    <p className="text-sm font-light leading-relaxed">
                        Ofrecemos servicios funerarios compasivos y personalizados para honrar la memoria de sus seres queridos. Nuestro equipo está aquí para brindar apoyo y consuelo en momentos difíciles.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://wa.me/56964333760" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors" aria-label="WhatsApp">
                            <i className="fab fa-whatsapp text-lg"></i>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-colors" aria-label="Instagram">
                            <i className="fab fa-instagram text-lg"></i>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors" aria-label="Facebook">
                            <i className="fab fa-facebook-f text-lg"></i>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-serif font-bold text-lg mb-6 uppercase tracking-widest text-[11px]">Navegación</h4>
                    <ul className="space-y-3 font-light text-sm">
                        <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
                        <li><Link href="/planes" className="hover:text-white transition-colors">Planes Funerarios</Link></li>
                        <li><Link href="/memoriales" className="hover:text-white transition-colors">Memoriales Virtuales</Link></li>
                        <li><Link href="/faq" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
                        <li><Link href="/cotizacion" className="hover:text-white transition-colors">Cotización Online</Link></li>
                    </ul>
                </div>

                {/* Legal and Information */}
                <div>
                    <h4 className="text-white font-serif font-bold text-lg mb-6 uppercase tracking-widest text-[11px]">Centro de Ayuda</h4>
                    <ul className="space-y-3 font-light text-sm">
                        <li><Link href="/guia-duelo" className="hover:text-white transition-colors">Guía para el Duelo</Link></li>
                        <li><Link href="/tramites" className="hover:text-white transition-colors">Trámites Legales</Link></li>
                        <li><Link href="/contratos" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
                        <li><Link href="/politica-privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
                    </ul>
                </div>

                {/* Contact Module */}
                <div>
                    <h4 className="text-white font-serif font-bold text-lg mb-6 uppercase tracking-widest text-[11px]">Contacto de Urgencia</h4>
                    <ul className="space-y-4 text-sm font-light">
                        <li className="flex items-start gap-4">
                            <i className="fas fa-map-marker-alt text-white/50 mt-1"></i>
                            <span>Macul, Santiago, Chile <br /> <a href="#" className="underline decoration-zinc-700 hover:text-white text-xs mt-1 inline-block">Ver en Mapa</a></span>
                        </li>
                        <li className="flex items-center gap-4 group">
                            <i className="fas fa-phone-alt text-white/50 group-hover:text-white transition-colors"></i>
                            <a href="tel:+56964333760" className="hover:text-white font-bold transition-colors">+56 9 6433 3760</a>
                        </li>
                        <li className="flex items-center gap-4 group">
                            <i className="fas fa-envelope text-white/50 group-hover:text-white transition-colors"></i>
                            <a href="mailto:contacto@funerariasantamargarita.cl" className="hover:text-white transition-colors">contacto@funerariasantamargarita.cl</a>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-600 font-light">
                <p>© {new Date().getFullYear()} Funeraria Santa Margarita Chile. Todos los derechos reservados.</p>
                <p className="mt-2 md:mt-0 flex items-center gap-1">Diseñado por Daniel Misle</p>
            </div>
        </footer>
    );
}
