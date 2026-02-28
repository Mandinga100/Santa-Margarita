import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Actualizaciones al Protocolo | Blog de Funeraria Santa Margarita',
    description: 'Novedades, protocolos y guías sobre procesos funerarios para el apoyo familiar.',
    alternates: {
        canonical: 'https://funeraria-sm.web.app/blog'
    }
};

export default function BlogPlaceholder() {
    return (
        <main className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] font-display pt-40 pb-32 text-center flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-6">
                <span className="material-symbols-outlined text-6xl text-black/10 mb-8 block">menu_book</span>
                <h1 className="font-serif text-5xl md:text-7xl italic mb-6 tracking-tighter text-[#1A1A1A]">
                    Bitácora de <br /><span className="text-black/40">Protocolos</span>
                </h1>
                <p className="text-black/50 text-xl font-light italic max-w-2xl mx-auto mb-16 leading-relaxed">
                    Nuestra sección de artículos y guías de apoyo está siendo curada por especialistas para ofrecer la máxima calidad de lectura. Próximamente disponible.
                </p>
                <Link
                    href="/"
                    className="inline-flex border-2 border-[#1A1A1A] text-[#1A1A1A] px-12 py-5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-all shadow-md"
                >
                    Retornar al Inicio
                </Link>
            </div>
        </main>
    );
}
