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
        titulo: 'Cero Estrés Familiar',
        descripcion: 'Sus seres queridos no tendrán que tomar decisiones difíciles bajo la presión del duelo.',
    },
    {
        icono: 'spa',
        titulo: 'Servicio Personalizado',
        descripcion: 'Diseñe un homenaje que refleje su vida y legado. Elija cada detalle según su voluntad.',
    },
];

const pasos = [
    {
        numero: '01',
        titulo: 'Asesoría Profesional',
        descripcion: 'Un especialista le guiará para entender sus necesidades en una sesión privada y respetuosa.',
    },
    {
        numero: '02',
        titulo: 'Selección de Plan',
        descripcion: 'Elija entre nuestros planes integrales o personalice uno a medida de sus preferencias.',
    },
    {
        numero: '03',
        titulo: 'Convenio de Previsión',
        descripcion: 'Formalice su plan con opciones de pago flexibles y garantice su tranquilidad futura.',
    },
];

export default function PrevisionPage() {
    return (
        <main className="min-h-screen bg-[#f7f7f7] dark:bg-[#191919] pt-24 pb-20">
            {/* Hero Section - Stitch Style */}
            <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden mb-24">
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105 animate-slow-zoom"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518116515431-7e0409da7486?q=80&w=2070&auto=format&fit=crop')" }}
                ></div>
                <div className="relative z-20 text-center px-6 max-w-5xl">
                    <h1 className="font-serif text-white text-5xl md:text-8xl mb-8 leading-tight drop-shadow-2xl">
                        Previsión: La Tranquilidad de Decidir Hoy
                    </h1>
                    <div className="w-24 h-1 bg-white/40 mx-auto rounded-full"></div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6">

                {/* Introduction */}
                <section className="max-w-4xl mx-auto text-center mb-32">
                    <p className="text-2xl md:text-3xl font-light leading-relaxed text-slate-800 dark:text-slate-200">
                        La previsión funeraria es un acto de amor y responsabilidad. Permite tomar decisiones importantes con serenidad, asegurando que sus deseos sean respetados y evitando cargas inesperadas para sus seres queridos.
                    </p>
                </section>

                {/* Benefits Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-40">
                    {beneficios.map((b) => (
                        <div key={b.titulo} className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-black/5 group-hover:-translate-y-2 transition-transform duration-500">
                                <span className="material-symbols-outlined text-4xl text-black dark:text-white">{b.icono}</span>
                            </div>
                            <h3 className="font-serif text-2xl mb-4 text-black dark:text-white">{b.titulo}</h3>
                            <p className="text-[#7E7D7D] leading-relaxed font-light">{b.descripcion}</p>
                        </div>
                    ))}
                </section>

                {/* Steps Process */}
                <section className="mb-40 py-24 bg-white dark:bg-slate-800/20 rounded-[4rem] px-12 border border-black/5 dark:border-white/5">
                    <h2 className="font-serif text-4xl md:text-5xl text-center mb-24 text-black dark:text-white italic">Cómo Funciona</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {pasos.map((paso) => (
                            <div key={paso.numero} className="relative group">
                                <div className="text-8xl font-serif text-black/5 dark:text-white/5 absolute -top-12 -left-4 pointer-events-none group-hover:text-black/10 transition-colors">
                                    {paso.numero}
                                </div>
                                <div className="relative pt-4">
                                    <h4 className="font-bold uppercase tracking-[0.3em] text-[10px] mb-6 text-black dark:text-white opacity-50">Paso {paso.numero}</h4>
                                    <h3 className="text-2xl font-serif mb-4 text-black dark:text-white">{paso.titulo}</h3>
                                    <p className="text-[#7E7D7D] font-light leading-relaxed">{paso.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Final CTA */}
                <section className="bg-black text-white p-16 md:p-24 rounded-[3rem] text-center shadow-3xl shadow-black/20 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                        <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">Comience su planeación hoy mismo</h2>
                        <p className="text-white/50 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                            Estamos aquí para escucharle y resolver todas sus dudas sin compromiso alguno. La paz mental comienza con una conversación.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a
                                href="tel:+56964333760"
                                className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:bg-slate-200 transition-all shadow-xl shadow-white/10"
                            >
                                Hablar con un Asesor
                            </a>
                            <Link
                                href="/cotizacion"
                                className="w-full sm:w-auto border-2 border-white/20 px-12 py-5 rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:bg-white/10 transition-all"
                            >
                                Cotizar Online
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
