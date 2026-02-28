'use client';

import Link from 'next/link';

// Fuente verdad: planes oficiales Funeraria Santa Margarita
const planes = [
    {
        id: 'raul-premium',
        nombre: 'Raúl Premium',
        categoria: 'Más Solicitado',
        precio: '$3.590.000',
        descripcion: 'Excelencia y acompañamiento absoluto.',
        destacado: true,
        icon: 'workspace_premium',
        incluye: ['Cofre Maderas Nobles VIP', 'Sala VIP Preferencial 24h', 'Coro en Ceremonia', 'Aviso Prensa Nacional', 'Mercedes Gala'],
    },
    {
        id: 'queule',
        nombre: 'Queule / Algarrobo',
        categoria: 'Servicio Superior',
        precio: '$2.990.000',
        descripcion: 'Atención personalizada y solemne.',
        destacado: false,
        icon: 'verified',
        incluye: ['Cofre Roble Nacional', 'Sala Velación 24h', 'Libro de Condolencias', 'Arreglos Florales Especiales', 'Carroza de Lujo'],
    },
    {
        id: 'quillay',
        nombre: 'Quillay',
        categoria: 'Servicio Estándar',
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
        <main className="min-h-screen bg-[#f7f7f7] dark:bg-[#121212] pt-32 pb-24 font-display antialiased">
            <div className="max-w-7xl mx-auto px-6">

                {/* Hero Section */}
                <section className="text-center mb-24">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#7E7D7D] block mb-5">Previsión y Dignidad</span>
                    <h1 className="font-serif text-5xl md:text-7xl mb-10 text-black dark:text-white leading-tight italic">Nuestros Planes de Servicio</h1>
                    <p className="text-[#7E7D7D] max-w-3xl mx-auto text-xl font-light leading-relaxed">
                        Brindamos honor y respeto en cada detalle. Compare nuestras opciones diseñadas para ofrecer tranquilidad, dignidad y un acompañamiento integral en los momentos que más lo requiere.
                    </p>
                </section>

                {/* Comparison Table Section - Stitch Premium */}
                <section className="mb-32 overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-800/30 border border-black/5 shadow-2xl shadow-black/[0.03]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-black text-white">
                                    <th className="p-8 text-[10px] font-bold uppercase tracking-[0.3em]">Características</th>
                                    <th className="p-8 text-[10px] font-bold uppercase tracking-[0.3em] text-center">Azucena (Esencial)</th>
                                    <th className="p-8 text-[10px] font-bold uppercase tracking-[0.3em] text-center">Quillay</th>
                                    <th className="p-8 text-[10px] font-bold uppercase tracking-[0.3em] text-center">Queule/Algarrobo</th>
                                    <th className="p-8 text-[10px] font-bold uppercase tracking-[0.3em] text-center text-amber-500">Raúl Premium VIP</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-700 dark:text-slate-300">
                                <tr className="border-b border-black/5">
                                    <td className="p-8 text-xs font-black uppercase tracking-widest text-black/40">Urna / Cofre</td>
                                    <td className="p-8 text-sm text-center">Estándar</td>
                                    <td className="p-8 text-sm text-center">Madera Barnizada</td>
                                    <td className="p-8 text-sm text-center">Roble Nacional</td>
                                    <td className="p-8 text-sm text-center font-bold text-black dark:text-white">Nobles Importadas</td>
                                </tr>
                                <tr className="bg-[#fcfcfc] dark:bg-slate-900/10 border-b border-black/5">
                                    <td className="p-8 text-xs font-black uppercase tracking-widest text-black/40">Sala Velatorio</td>
                                    <td className="p-8 text-sm text-center italic">Instalación Local</td>
                                    <td className="p-8 text-sm text-center">Privada 12h</td>
                                    <td className="p-8 text-sm text-center">Privada 24h</td>
                                    <td className="p-8 text-sm text-center font-bold text-black dark:text-white underline decoration-amber-500/30">Suite VIP 24h</td>
                                </tr>
                                <tr className="border-b border-black/5">
                                    <td className="p-8 text-xs font-black uppercase tracking-widest text-black/40">Carroza de Gala</td>
                                    <td className="p-8 text-sm text-center text-slate-300">—</td>
                                    <td className="p-8 text-sm text-center">Instalación</td>
                                    <td className="p-8 text-sm text-center">Lujo</td>
                                    <td className="p-8 text-sm text-center font-bold text-black dark:text-white">Mercedes / Volvo VIP</td>
                                </tr>
                                <tr className="bg-[#fcfcfc] dark:bg-slate-900/10 border-b border-black/5">
                                    <td className="p-8 text-xs font-black uppercase tracking-widest text-black/40">Acompañamiento</td>
                                    <td className="p-8 text-sm text-center font-bold text-black/80">Básico</td>
                                    <td className="p-8 text-sm text-center font-bold text-black/80">Integral</td>
                                    <td className="p-8 text-sm text-center font-bold text-black/80">Avanzado</td>
                                    <td className="p-8 text-sm text-center font-black text-black dark:text-white">Personalizado 24/7</td>
                                </tr>
                                <tr>
                                    <td className="p-8 text-xs font-black uppercase tracking-widest text-black/40">Homenaje Digital</td>
                                    <td className="p-8 text-sm text-center"><span className="material-symbols-outlined text-green-600">check</span></td>
                                    <td className="p-8 text-sm text-center"><span className="material-symbols-outlined text-green-600">check</span></td>
                                    <td className="p-8 text-sm text-center"><span className="material-symbols-outlined text-green-600">check</span></td>
                                    <td className="p-8 text-sm text-center font-bold text-black dark:text-white"><span className="material-symbols-outlined text-green-600">check_circle</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Plan Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {planes.map(plan => (
                        <div
                            key={plan.id}
                            className={`p-12 rounded-[2.5rem] flex flex-col transition-all duration-700 hover:-translate-y-4 ${plan.destacado
                                    ? 'bg-black text-white shadow-3xl shadow-black/20 ring-8 ring-black/5 scale-105 z-10'
                                    : 'bg-white dark:bg-slate-800 shadow-xl shadow-black/[0.03] border border-black/5'
                                }`}
                        >
                            <span className={`material-symbols-outlined text-4xl mb-8 ${plan.destacado ? 'text-amber-500' : 'text-black/10'}`}>
                                {plan.icon}
                            </span>

                            {plan.destacado && (
                                <span className="inline-block bg-white/10 text-white text-[8px] font-black uppercase tracking-[0.4em] px-4 py-2 rounded-full mb-6 self-start border border-white/10">
                                    {plan.categoria}
                                </span>
                            )}

                            <h3 className="font-serif text-3xl font-bold mb-4">{plan.nombre}</h3>

                            <div className="mb-10 flex flex-col gap-1">
                                <span className={`text-4xl font-serif font-black ${plan.destacado ? 'text-white' : 'text-black dark:text-white'}`}>
                                    {plan.precio}
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Valor Final CLP</span>
                            </div>

                            <ul className="space-y-6 mb-12 flex-1">
                                {plan.incluye.map(inc => (
                                    <li key={inc} className="flex items-start gap-3 text-[11px] tracking-wide font-medium leading-relaxed">
                                        <span className={`material-symbols-outlined text-sm ${plan.destacado ? 'text-amber-500' : 'text-black/20'}`}>check</span>
                                        {inc}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/cotizacion"
                                className={`w-full text-center py-5 rounded-full font-black uppercase text-[10px] tracking-[0.3em] transition-all ${plan.destacado
                                        ? 'bg-white text-black hover:bg-slate-200'
                                        : 'bg-black text-white dark:bg-white dark:text-black hover:opacity-80'
                                    }`}
                            >
                                Cotizar Ahora
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Footer CTA Section */}
                <div className="mt-32 p-20 rounded-[4rem] bg-black text-white text-center shadow-3xl shadow-black/30 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                        <span className="material-symbols-outlined text-6xl mb-8 text-white/20 group-hover:scale-110 transition-transform duration-1000">support_agent</span>
                        <h3 className="font-serif text-5xl mb-8 italic tracking-tight italic">Estamos Procesando su Paz Mental</h3>
                        <p className="text-white/40 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                            Atención compasiva e inmediata las 24 horas del día. Si necesita asistencia urgente, nuestro equipo está listo para responder ahora.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a href="tel:+56964333760" className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-slate-200 transition-all shadow-2xl">Llamar Ahora 24/7</a>
                            <a href="https://wa.me/56964333760" className="border border-white/20 px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white/5 transition-all">WhatsApp Urgente</a>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
