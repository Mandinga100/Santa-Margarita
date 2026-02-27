import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#191919]/95 backdrop-blur-md border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="bg-black text-white p-2 rounded-lg">
            <span className="material-symbols-outlined text-2xl">temple_buddhist</span>
          </div>
          <h1 className="font-serif text-xl font-bold tracking-tight text-black dark:text-white">Santa Margarita</h1>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          <Link className="text-sm font-medium hover:text-black/60 transition-colors" href="/cotizacion">Cotización Online</Link>
          <Link className="text-sm font-medium hover:text-black/60 transition-colors" href="/memoriales">Memoriales</Link>
          <Link className="text-sm font-medium hover:text-black/60 transition-colors" href="/planes">Planes</Link>
          <Link className="text-sm font-medium hover:text-black/60 transition-colors" href="/faq">Preguntas</Link>
        </nav>
        <div className="flex items-center gap-4">
          <a className="hidden md:flex flex-col items-end mr-4" href="tel:+56964333760">
            <span className="text-[10px] text-[#7E7D7D] font-bold uppercase tracking-tighter">Asistencia 24/7</span>
            <span className="text-sm font-bold text-black dark:text-white">+56 9 6433 3760</span>
          </a>
          <button className="bg-[#25D366] text-white flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-green-200 dark:shadow-none transition-transform hover:scale-105 active:scale-95">
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span className="hidden md:inline">WhatsApp</span>
          </button>
          {/* Menu Mobile Toggle */}
          <button className="lg:hidden text-black dark:text-white p-1">
            <span className="material-symbols-outlined text-[32px]">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
