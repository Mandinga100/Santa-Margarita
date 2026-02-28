'use client';

import Link from 'next/link';

const beneficios = [
    {
        icono: 'lock',
        titulo: 'Precios Congelados',
        descripcion: 'Proteja su patrimonio de la inflación futura. El costo pactado hoy se mantiene vigente por siempre.',
    },
    {
        icono: 'family_restroom',
        titulo: 'Tranquilidad Familiar',
        descripcion: 'Evite que sus seres queridos enfrenten decisiones complejas y costos inesperados en momentos de duelo.',
    },
    {
        icono: 'spa',
        titulo: 'Voluntad Respetada',
        descripcion: 'Diseñe hoy su homenaje póstumo según sus preferencias personales, asegurando un legado auténtico.',
    },
];

const pasos = [
    {
        numero: '01',
        titulo: 'Asesoría Privada',
        descripcion: 'Un especialista le brinda orientación experta en una sesión confidencial para definir sus necesidades.',
    },
    {
        numero: '02',
        titulo: 'Selección del Plan',
        descripcion: 'Adecue nuestros servicios a su medida, eligiendo cada detalle del protocolo y la ornamentación.',
    },
    {
        numero: '03',
        titulo: 'Convenio Flexible',
        descripcion: 'Active su protección con opciones de pago personalizadas y garantice su paz mental indefinidamente.',
    },
];

export default function PrevisionPage() {
    return (
        <main className="min-h-screen bg-black text-white font-display pt-32 pb-24 selection:bg-white/10 antialiased">

            {/* Hero Section - Estética Inmersiva Stitch */}
            <section className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden mb-32 border-b border-white/5">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center scale-110"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518116515431-7e0409da7486?q=80&w=2070&auto=format&fit=crop')" }}
                ></div>
                <div className="relative z-20 text-center px-6 max-w-5xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block mb-8">Planificación Anticipada</span>
                    <h1 className="font-serif text-white text-5xl md:text-8xl mb-12 italic leading-tight">
                        La Paz de Decidir Hoy
                    </h1>
                    <div className="w-20 h-px bg-white/20 mx-auto"></div>
                </div>
            </section>

            {/* Introduction - Legibilidad Extrema */}
            <section className="max-w-4xl mx-auto px-6 text-center mb-40">
                <h2 className="sr-only">Introducción a la Previsión</h2>
                <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/70 italic">
                    "La previsión funeraria es un acto de amor supremo. Permite otorgar tranquilidad a quienes más ama, asegurando que su último adiós sea tan digno como su propia vida."
                </p>
            </section>

            {/* Benefits Grid - UI Refined */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20 mb-48">
                {beneficios.map((b) => (
                    <article key={b.titulo} className="flex flex-col items-center text-center group">
                        <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-10 group-hover:bg-white/10 transition-all duration-700">
                            <span className="material-symbols-outlined text-4xl text-white/60 group-hover:text-white group-hover:scale-110 transition-all">
                                {b.icono}
                            </span>
                        </div>
                        <h3 className="font-serif text-3xl mb-6 italic">{b.titulo}</h3>
                        <p className="text-white/50 text-lg leading-relaxed font-light">
                            {b.descripcion}
                        </p>
                    </article>
                ))}
            </section>

            {/* Steps Process - Clean Semantics */}
            <section className="max-w-7xl mx-auto px-6 mb-48">
                <div className="bg-white/[0.02] border border-white/5 rounded-[4rem] p-16 md:p-32">
                    <h2 className="font-serif text-4xl md:text-5xl text-center mb-24 italic">Protocolo de Activación</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                        {pasos.map((paso) => (
                            <div key={paso.numero} className="relative group">
                                <span className="text-9xl font-serif text-white/[0.03] absolute -top-16 -left-4 pointer-events-none group-hover:text-white/[0.08] transition-colors">
                                    {paso.numero}
                                </span>
                                <div className="relative">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-white/30">Etapa {paso.numero}</h4>
                                    <h3 className="text-3xl font-serif mb-6 italic">{paso.titulo}</h3>
                                    <p className="text-white/50 text-lg font-light leading-relaxed">
                                        {paso.descripcion}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA - Professional & Elegant */}
            <section className="max-w-5xl mx-auto px-6 text-center">
                <div className="bg-gradient-to-b from-white/[0.05] to-transparent p-20 md:p-32 rounded-[3.5rem] border border-white/10 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="font-serif text-4xl md:text-6xl mb-10 italic">Inicie su protección hoy</h2>
                        <p className="text-white/50 text-xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                            Nuestros asesores expertos están disponibles para brindarle una consulta privada sin compromiso.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                            <a
                                href="tel:+56964333760"
                                className="w-full sm:w-auto bg-white text-black px-12 py-6 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-slate-200 transition-all shadow-2xl shadow-white/5"
                            >
                                Llamar a un Asesor
                            </a>
                            <Link
                                href="/cotizacion"
                                className="w-full sm:w-auto border border-white/20 px-12 py-6 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white/5 transition-all"
                            >
                                Cotizar Online
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
