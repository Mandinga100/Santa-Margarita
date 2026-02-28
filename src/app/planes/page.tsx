'use client';

import Link from 'next/link';

// Fuente verdad: planes oficiales Funeraria Santa Margarita
const planes = [
    {
        id: 'raul-premium',
        nombre: 'Raúl Premium',
        categoria: 'Elite VIP',
        precio: '$3.590.000',
        descripcion: 'Excelencia y acompañamiento absoluto.',
        destacado: true,
        icon: 'workspace_premium',
        incluye: ['Cofre Maderas Nobles VIP', 'Sala VIP Preferencial 24h', 'Coro en Ceremonia', 'Aviso Prensa Nacional', 'Mercedes Gala'],
    },
    {
        id: 'queule',
        nombre: 'Queule / Algarrobo',
        categoria: 'Superior',
        precio: '$2.990.000',
        descripcion: 'Atención personalizada y solemne.',
        destacado: false,
        icon: 'verified',
        incluye: ['Cofre Roble Nacional', 'Sala Velación 24h', 'Libro de Condolencias', 'Arreglos Florales Especiales', 'Carroza de Lujo'],
    },
    {
        id: 'quillay',
        nombre: 'Quillay',
        categoria: 'Estándar',
        precio: '$2.390.000',
        descripcion: 'Dignidad y respeto esencial.',
        destacado: false,
        icon: 'star',
        incluye: ['Cofre Madera Barnizada', 'Sala Velación 12h', 'Trámites Legales Completos', 'Carroza Estándar', 'Asesoría Familiar'],
    },
    {
        id: 'azucena',
        nombre: 'Azucena',
        categoria: 'Esencial',
        precio: '$1.360.000',
        descripcion: 'Calidad al alcance de todos.',
        destacado: false,
        icon: 'eco',
        incluye: ['Cofre Estándar Lineal', 'Traslado Local Inmediato', 'Capilla Pública / Domicilio', 'Apoyo en Trámites Civiles'],
    },
];

export default function PlanesPage() {
    return (
        <main className="min-h-screen bg-black text-white font-display pt-32 pb-24 selection:bg-white/10 antialiased">
            <div className="max-w-7xl mx-auto px-6">

                {/* Hero Section - Estilo Stitch */}
                <section className="text-center mb-32 border-b border-white/5 pb-24">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block mb-8">Protocolos de Despedida</span>
                    <h1 className="font-serif text-5xl md:text-8xl mb-12 italic leading-tight">Nuestros Planes</h1>
                    <p className="text-white/60 max-w-3xl mx-auto text-xl font-light leading-relaxed italic">
                        "Diseñados para otorgar la dignidad suprema que cada vida merece, brindando tranquilidad absoluta a quienes permanecen."
                    </p>
                </section>

                {/* Comparison Table Section - Dark Editorial */}
                <section className="mb-40 overflow-hidden rounded-[3rem] bg-white/[0.02] border border-white/10 shadow-3xl shadow-black/40">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-white/5 text-white">
                                    <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] border-b border-white/10">Especificaciones</th>
                                    <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] text-center border-b border-white/10">Azucena</th>
                                    <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] text-center border-b border-white/10">Quillay</th>
                                    <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] text-center border-b border-white/10">Queule</th>
                                    <th className="p-10 text-[10px] font-black uppercase tracking-[0.4em] text-center border-b border-amber-500/50 text-amber-500">Raúl Premium VIP</th>
                                </tr>
                            </thead>
                            <tbody className="text-white/70">
                                <tr className="border-b border-white/5">
                                    <td className="p-10 text-[10px] font-black uppercase tracking-widest text-white/30">Urna / Cofre</td>
                                    <td className="p-10 text-lg text-center font-light">Línea Estándar</td>
                                    <td className="p-10 text-lg text-center font-light">Madera Barnizada</td>
                                    <td className="p-10 text-lg text-center font-light">Roble Nacional</td>
                                    <td className="p-10 text-lg text-center font-serif italic text-white">Nobles de Importación</td>
                                </tr>
                                <tr className="bg-white/[0.01] border-b border-white/5">
                                    <td className="p-10 text-[10px] font-black uppercase tracking-widest text-white/30">Sala Velatorio</td>
                                    <td className="p-10 text-lg text-center font-light italic text-white/40">Instalación Local</td>
                                    <td className="p-10 text-lg text-center font-light">Privada 12h</td>
                                    <td className="p-10 text-lg text-center font-light">Privada 24h</td>
                                    <td className="p-10 text-lg text-center font-serif italic text-white underline decoration-amber-500/20 underline-offset-8">Suite VIP 24h</td>
                                </tr>
                                <tr className="border-b border-white/5">
                                    <td className="p-10 text-[10px] font-black uppercase tracking-widest text-white/30">Vehículos Gala</td>
                                    <td className="p-10 text-lg text-center text-white/20">—</td>
                                    <td className="p-10 text-lg text-center font-light">Instalación</td>
                                    <td className="p-10 text-lg text-center font-light">Lujo</td>
                                    <td className="p-10 text-lg text-center font-serif italic text-white">Mercedes / Volvo VIP</td>
                                </tr>
                                <tr className="bg-white/[0.01]">
                                    <td className="p-10 text-[10px] font-black uppercase tracking-widest text-white/30">Homenaje Digital</td>
                                    <td className="p-10 text-center text-white/40 italic">Básico</td>
                                    <td className="p-10 text-center text-white/60 italic">Personalizado</td>
                                    <td className="p-10 text-center text-white/80 italic">Interactiva</td>
                                    <td className="p-10 text-center font-serif italic text-amber-500">Memorial Inmersivo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Plan Highlights Grid - UI Refined */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {planes.map(plan => (
                        <article
                            key={plan.id}
                            className={`p-16 rounded-[3.5rem] flex flex-col transition-all duration-700 hover:-translate-y-4 shadow-3xl ${plan.destacado
                                ? 'bg-white text-black scale-105 z-10 shadow-white/5'
                                : 'bg-white/[0.02] border border-white/10 hover:border-white/30 shadow-black/50'
                                }`}
                        >
                            <span className={`material-symbols-outlined text-5xl mb-12 ${plan.destacado ? 'text-black' : 'text-white/20'}`}>
                                {plan.icon}
                            </span>

                            {plan.destacado && (
                                <span className="inline-block bg-black/5 text-black text-[9px] font-black uppercase tracking-[0.4em] px-5 py-2 rounded-full mb-8 self-start border border-black/10">
                                    {plan.categoria}
                                </span>
                            )}

                            <h3 className="font-serif text-3xl font-bold mb-6 italic">{plan.nombre}</h3>

                            <div className="mb-12 flex flex-col gap-2">
                                <span className={`text-4xl font-serif font-black ${plan.destacado ? 'text-black' : 'text-white'}`}>
                                    {plan.precio}
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Valor Final CLP</span>
                            </div>

                            <ul className="space-y-8 mb-16 flex-1">
                                {plan.incluye.map(inc => (
                                    <li key={inc} className={`flex items-start gap-4 text-xs tracking-wide font-medium leading-relaxed ${plan.destacado ? 'text-black/70' : 'text-white/50'}`}>
                                        <span className={`material-symbols-outlined text-sm mt-0.5 ${plan.destacado ? 'text-black' : 'text-amber-500/50'}`}>check_circle</span>
                                        {inc}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/cotizacion"
                                className={`w-full text-center py-6 rounded-full font-black uppercase text-[10px] tracking-[0.4em] transition-all shadow-xl ${plan.destacado
                                    ? 'bg-black text-white hover:bg-slate-800'
                                    : 'bg-white text-black hover:bg-slate-200'
                                    }`}
                            >
                                Cotizar
                            </Link>
                        </article>
                    ))}
                </div>

                {/* Final Safety CTA */}
                <section className="mt-40 p-24 rounded-[4rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <span className="material-symbols-outlined text-7xl mb-10 text-amber-500/20">support_agent</span>
                        <h3 className="font-serif text-5xl md:text-7xl mb-10 italic leading-tight">Asistencia Inmediata 24/7</h3>
                        <p className="text-white/50 text-xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                            Nuestro equipo de asesores expertos está disponible para brindarle la paz mental que su familia necesita en este momento.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                            <a href="tel:+56964333760" className="w-full sm:w-auto bg-white text-black px-16 py-6 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-slate-200 transition-all shadow-2xl shadow-white/5">
                                LLAMADA URGENTE
                            </a>
                            <a href="https://wa.me/56964333760" className="w-full sm:w-auto border border-white/20 px-16 py-6 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-white/5 transition-all">
                                WHATSAPP 24 HORAS
                            </a>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
