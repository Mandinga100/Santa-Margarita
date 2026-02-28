import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Página no encontrada | Funeraria Santa Margarita',
    description: 'La página que busca no está disponible. Le ayudamos a encontrar el protocolo o asistencia que necesita.',
    robots: {
        index: false,
        follow: true
    }
};

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-6 text-center selection:bg-white/10 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('/assets/images/otros/clouds.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                <span className="text-[120px] font-serif font-black italic text-white/5 leading-none mb-4 select-none">404</span>
                <h1 className="text-4xl md:text-5xl font-serif italic mb-6 tracking-tighter">
                    Ruta no encontrada
                </h1>
                <p className="text-white/50 text-base md:text-lg font-light italic mb-12 border-l-2 border-[#b8960c] pl-6 text-left">
                    "A veces, los caminos cambian de dirección, pero nuestro compromiso de guiarle permanece inalterable."
                </p>

                <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
                    <Link
                        href="/"
                        className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-white/10 transition-all text-center flex items-center justify-center gap-3"
                    >
                        <span className="material-symbols-outlined text-xl">home</span>
                        Volver al Inicio
                    </Link>
                    <a
                        href="tel:+56964333760"
                        className="bg-gradient-to-r from-[#b8960c] to-[#d4af37] text-[#0a0a0a] px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest hover:brightness-110 shadow-2xl transition-all text-center flex items-center justify-center gap-3"
                    >
                        <i className="fab fa-whatsapp text-xl" />
                        Asistencia 24/7
                    </a>
                </div>
            </div>
        </main>
    );
}
