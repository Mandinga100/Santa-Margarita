'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Economic Bar */}
      <div className="w-full bg-[#F2F2F2] dark:bg-[#191919] py-2 border-b border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 flex justify-end gap-8 items-center text-[11px] font-medium uppercase tracking-widest text-[#7E7D7D]">
          <div className="flex items-center gap-2">
            <span>UF</span>
            <span className="text-black dark:text-white">$37.542,12</span>
          </div>
          <div className="flex items-center gap-2">
            <span>UTM</span>
            <span className="text-black dark:text-white">$65.901,00</span>
          </div>
          <div className="hidden md:flex items-center gap-2 border-l border-zinc-300 dark:border-zinc-700 pl-8">
            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
            <span>{new Date().toLocaleDateString('es-CL', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-center p-0 m-0 w-[100vw]">
        <div className="absolute inset-0 bg-black/50 z-10 w-full h-[150%]"></div>
        <img
          className="absolute inset-0 w-full h-full object-cover"
          alt="Ethereal peaceful forest landscape with soft morning light"
          src="https://images.unsplash.com/photo-1542456079-22a7f59d9c22?q=80&w=2670&auto=format&fit=crop"
        />
        <div className="relative z-20 text-center max-w-4xl px-6">
          <h2 className="font-serif text-5xl md:text-7xl text-white font-medium mb-6 leading-tight drop-shadow-lg">
            Honrando la vida con dignidad y respeto
          </h2>
          <p className="text-white/90 text-lg md:text-xl font-light mb-10 tracking-wide drop-shadow-md">
            Excelencia y acompañamiento en los momentos que más importan.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/cotizacion" className="bg-white text-black px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-slate-100 transition-colors w-full md:w-auto text-center">
              Cotizar Servicio Online
            </Link>
            <Link href="/memoriales" className="bg-transparent border border-white text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors w-full md:w-auto text-center">
              Ver Memoriales
            </Link>
          </div>
        </div>
      </section>

      {/* Memorial Search Mini-bar */}
      <section className="relative z-30 -mt-8 px-6 pb-0 pt-0">
        <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-3 flex items-center border border-black/5">
          <div className="flex-1 flex items-center px-4 gap-4">
            <span className="material-symbols-outlined text-[#7E7D7D]">search</span>
            <input className="w-full border-none focus:ring-0 text-black dark:text-white placeholder:text-[#7E7D7D] text-sm md:text-lg bg-transparent" placeholder="Buscar fallecido en Memoriales..." type="text" />
          </div>
          <button className="bg-black text-white px-6 py-2 rounded-lg font-bold transition-opacity hover:opacity-90">
            Buscar
          </button>
        </div>
      </section>

      {/* Service Plans Shortcut */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h3 className="font-serif text-3xl font-semibold mb-4 text-black dark:text-white">Nuestros Planes</h3>
          <div className="w-16 h-1 bg-black mx-auto opacity-20 dark:bg-white dark:opacity-50"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-shadow flex flex-col h-full">
            <h4 className="font-serif text-xl font-bold mb-2 text-black dark:text-white">Margarita</h4>
            <div className="mb-6 border-b border-black/10 pb-4">
              <span className="text-3xl font-black text-black dark:text-white">$970.000</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[18px] text-green-600">check_circle</span> Servicio Esencial</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[18px] text-green-600">check_circle</span> Trámites Legales</li>
            </ul>
            <Link href="/planes" className="w-full text-center py-3 border border-black dark:border-white text-black dark:text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">Ver Detalle</Link>
          </div>

          <div className="bg-black text-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow flex flex-col h-full ring-2 ring-black/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-white text-black text-[9px] font-bold px-3 py-1 uppercase tracking-widest rounded-bl-lg">Más Popular</div>
            <h4 className="font-serif text-xl font-bold mb-2 text-white">Raúl Premium</h4>
            <div className="mb-6 border-b border-white/20 pb-4">
              <span className="text-3xl font-black text-white">$3.590.000</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow text-sm text-white/80">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[18px] text-white">check_circle</span> Urna Premium</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[18px] text-white">check_circle</span> Coronas Naturales</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[18px] text-white">check_circle</span> Traslados VIP</li>
            </ul>
            <Link href="/planes" className="w-full text-center py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-zinc-200 transition-all shadow-lg shadow-black/10">Ver Detalle</Link>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-shadow flex flex-col h-full">
            <h4 className="font-serif text-xl font-bold mb-2 text-black dark:text-white">Cremación</h4>
            <div className="mb-6 border-b border-black/10 pb-4">
              <span className="text-3xl font-black text-black dark:text-white">Consultar</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[18px] text-green-600">check_circle</span> Incineración</li>
              <li className="flex items-center gap-3"><span className="material-symbols-outlined text-[18px] text-green-600">check_circle</span> Ánforas a elección</li>
            </ul>
            <Link href="/planes" className="w-full text-center py-3 border border-black dark:border-white text-black dark:text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">Ver Detalle</Link>
          </div>

        </div>
      </section>

      {/* Support Resources Thumbnail */}
      <section className="bg-[#F2F2F2] dark:bg-zinc-900/50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
            <div>
              <h3 className="font-serif text-3xl font-semibold mb-2 text-black dark:text-white">Recursos y Apoyo en el Duelo</h3>
              <p className="text-[#7E7D7D] text-sm">Contenido especializado para guiarte en este difícil proceso.</p>
            </div>
            <Link href="/faq" className="text-black dark:text-white text-sm font-bold border-b border-black dark:border-white pb-1 hover:opacity-60 transition-opacity uppercase tracking-widest">
              Ver Guías
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <article className="group cursor-pointer bg-white rounded-lg p-4 shadow-sm flex items-center gap-6">
              <span className="material-symbols-outlined text-4xl text-black/20 group-hover:text-black transition-colors">auto_stories</span>
              <div>
                <h5 className="font-serif text-lg font-bold mb-1 text-black">Cómo afrontar la pérdida</h5>
                <p className="text-slate-500 text-sm">Descubre las etapas y cómo encontrar el apoyo necesario.</p>
              </div>
            </article>
            <article className="group cursor-pointer bg-white rounded-lg p-4 shadow-sm flex items-center gap-6">
              <span className="material-symbols-outlined text-4xl text-black/20 group-hover:text-black transition-colors">gavel</span>
              <div>
                <h5 className="font-serif text-lg font-bold mb-1 text-black">Guía de Trámites Legales</h5>
                <p className="text-slate-500 text-sm">Simplificamos los procesos administrativos que debes realizar.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

    </>
  );
}
