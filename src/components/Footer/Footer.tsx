import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-white text-black p-1.5 rounded-lg">
                                <span className="material-symbols-outlined text-xl">church</span>
                            </div>
                            <h6 className="font-serif text-xl font-bold tracking-tight">Santa Margarita</h6>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                            Acompañando a las familias con la mayor dignidad y excelencia en servicios funerarios.
                        </p>
                        <div className="flex gap-4">
                            {/* RRSS Omitidas por ahora, se usarán las del cliente si existen */}
                        </div>
                    </div>

                    {/* Sitemap Links */}
                    <div>
                        <h6 className="text-xs font-bold uppercase tracking-widest mb-6">Nuestra Empresa</h6>
                        <ul className="space-y-4 text-sm text-zinc-400">
                            <li><Link className="hover:text-white transition-colors" href="#">Sobre Nosotros</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="#">Nuestras Sucursales</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/faq">Preguntas Frecuentes</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="text-xs font-bold uppercase tracking-widest mb-6">Servicios</h6>
                        <ul className="space-y-4 text-sm text-zinc-400">
                            <li><Link className="hover:text-white transition-colors" href="/planes">Planes Funerarios</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/cotizacion">Cotización Online</Link></li>
                            <li><Link className="hover:text-white transition-colors" href="/memoriales">Memoriales y Condolencias</Link></li>
                        </ul>
                    </div>

                    {/* Contacto Directo */}
                    <div>
                        <h6 className="text-xs font-bold uppercase tracking-widest mb-6">Contacto Directo</h6>
                        <ul className="space-y-4 text-sm text-zinc-400">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-white text-sm mt-0.5">location_on</span>
                                <span>Av. Macul #4252, Macul,<br />Santiago.</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-white text-sm">phone</span>
                                <a href="tel:+56964333760" className="hover:text-white transition-colors">+56 9 6433 3760</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-white text-sm">mail</span>
                                <a href="mailto:contacto@funerariasantamargarita.cl" className="hover:text-white transition-colors">contacto@funerariasantamargarita.cl</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-500 font-medium uppercase tracking-widest pb-20 lg:pb-0">
                    <p>© {new Date().getFullYear()} Funeraria Santa Margarita. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
