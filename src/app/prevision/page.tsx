'use client';

import Link from 'next/link';

const beneficios = [
    {
        icono: 'lock',
        titulo: 'Precio Congelado',
        descripcion: 'Contrata hoy al precio vigente. Su familia no enfrentará alzas inflacionarias en el futuro.',
    },
    {
        icono: 'favorite',
        titulo: 'Protege a tu Familia',
        descripcion: 'Eliminas la carga emocional y financiera de tus seres queridos en el momento más difícil.',
    },
    {
        icono: 'description',
        titulo: 'Instrucciones Claras',
        descripcion: 'Documenta tus preferencias: tipo de servicio, música, flores, lecturas y más.',
    },
    {
        icono: 'verified_user',
        titulo: 'Respaldo Legal',
        descripcion: 'Contrato certificado notarialmente con garantía de cumplimiento.',
    },
    {
        icono: 'support_agent',
        titulo: 'Acompañamiento Completo',
        descripcion: 'Tu familia será atendida por nuestro equipo las 24 horas cuando llegue el momento.',
    },
    {
        icono: 'payments',
        titulo: 'Pago en Cuotas',
        descripcion: 'Financiamos el plan en cómodas cuotas mensuales sin interés. Consulte condiciones.',
    },
];

const pasos = [
    {
        numero: '01',
        titulo: 'Asesoría Gratuita',
        descripcion: 'Conversamos con usted sobre el plan que mejor se adapta a sus necesidades y presupuesto. Sin compromiso.',
    },
    {
        numero: '02',
        titulo: 'Elección del Plan',
        descripcion: 'Selecciona el plan de servicio y personaliza las preferencias: tipo de velación, flores, música y detalles importantes.',
    },
    {
        numero: '03',
        titulo: 'Firma del Contrato',
        descripcion: 'Formalizamos el acuerdo con un contrato notarial claro, sin letra pequeña, con todas las condiciones especificadas.',
    },
    {
        numero: '04',
        titulo: 'Tranquilidad Asegurada',
        descripcion: 'Su documentación queda resguardada con nosotros. Su familia solo deberá llamarnos cuando llegue el momento.',
    },
];

const garantias = [
    { icono: 'verified', texto: 'Contrato notarial certificado' },
    { icono: 'gavel', texto: 'Regulado por la normativa chilena vigente' },
    { icono: 'lock', texto: 'Precio garantizado sin cláusulas de reajuste' },
    { icono: 'support_agent', texto: 'Atención 24/7 los 365 días del año' },
    { icono: 'receipt_long', texto: 'Sin letra pequeña ni cobros sorpresa' },
    { icono: 'family_restroom', texto: 'Transferible a familiares directos' },
];

export default function PrevisionPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-black">
            {/* Hero */}
            <section className="relative bg-black text-white overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-white/3 blur-3xl" />
                </div>
                <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
                    <span className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-[10px] font-bold uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-6">
                        <span className="material-symbols-outlined text-[12px]">verified_user</span>
                        Previsión Funeraria Anticipada
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl font-medium mb-6 leading-tight max-w-3xl mx-auto">
                        El mayor acto de amor<br />hacia tu familia
                    </h1>
                    <p className="text-white/70 text-lg font-light max-w-2xl mx-auto leading-relaxed mb-10">
                        Planificar con anticipación no es pensar en la muerte; es asegurar que quienes amas
                        no tengan que tomar decisiones difíciles en el peor momento, y al precio de hoy.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="tel:+56964333760"
                            className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-zinc-100 transition-colors w-full sm:w-auto justify-center"
                        >
                            <span className="material-symbols-outlined text-[18px]">call</span>
                            Asesoría Gratuita · +56 9 6433 3760
                        </a>
                        <a
                            href="https://wa.me/56964333760?text=Hola, quiero información sobre planes de previsión funeraria anticipada."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 border border-white/40 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors w-full sm:w-auto justify-center"
                        >
                            <span className="material-symbols-outlined text-[18px]">chat</span>
                            Consultar por WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* Trust strip — estadísticas */}
            <div className="bg-[#F2F2F2] dark:bg-zinc-900 border-y border-black/5 py-6 px-6">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl font-black text-black dark:text-white">7</span>
                        <span className="text-sm text-[#7E7D7D]">Planes disponibles<br />desde $970.000 CLP</span>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-black/10" />
                    <div className="flex items-center gap-4">
                        <span className="text-4xl font-black text-black dark:text-white">24/7</span>
                        <span className="text-sm text-[#7E7D7D]">Atención permanente<br />cuando nos necesite</span>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-black/10" />
                    <div className="flex items-center gap-4">
                        <span className="text-4xl font-black text-black dark:text-white">0%</span>
                        <span className="text-sm text-[#7E7D7D]">Interés en cuotas<br />según el plan</span>
                    </div>
                </div>
            </div>

            {/* Beneficios */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-14">
                    <h2 className="font-serif text-3xl md:text-4xl font-semibold text-black dark:text-white mb-4">
                        ¿Por qué contratar una Previsión Funeraria?
                    </h2>
                    <p className="text-[#7E7D7D] max-w-xl mx-auto text-sm leading-relaxed">
                        Una decisión tomada hoy puede cambiar completamente la experiencia de su familia mañana.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {beneficios.map((b) => (
                        <div
                            key={b.titulo}
                            className="p-7 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-zinc-900 hover:shadow-lg transition-all hover:-translate-y-0.5 group"
                        >
                            <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-[22px] text-white dark:text-black">{b.icono}</span>
                            </div>
                            <h3 className="font-bold text-lg text-black dark:text-white mb-2">{b.titulo}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{b.descripcion}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Proceso de 4 pasos */}
            <section className="bg-black text-white py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">
                            Así de simple es contratar su previsión
                        </h2>
                        <p className="text-white/60 max-w-xl mx-auto text-sm">
                            Sin burocracia. Sin letra pequeña. Con total claridad en cada paso.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {pasos.map((paso, i) => (
                            <div key={paso.numero} className="relative">
                                {i < pasos.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-white/10 -translate-y-0.5 z-0" />
                                )}
                                <div className="relative z-10">
                                    <div className="text-5xl font-black text-white/10 mb-3 font-serif">{paso.numero}</div>
                                    <h3 className="font-bold text-white mb-2">{paso.titulo}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">{paso.descripcion}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Garantías — NUEVA SECCIÓN */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <div className="text-center mb-10">
                    <h2 className="font-serif text-3xl font-semibold text-black dark:text-white mb-3">
                        Garantías que respaldan su decisión
                    </h2>
                    <p className="text-[#7E7D7D] text-sm">Todo por escrito. Todo verificable. Sin sorpresas.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {garantias.map((g) => (
                        <div key={g.texto} className="flex items-center gap-4 p-5 rounded-xl border border-black/5 dark:border-white/10 bg-[#FAFAFA] dark:bg-zinc-900">
                            <div className="w-9 h-9 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-[16px] text-white dark:text-black">{g.icono}</span>
                            </div>
                            <p className="text-sm font-semibold text-black dark:text-white leading-snug">{g.texto}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Planes disponibles */}
            <section className="max-w-5xl mx-auto px-6 pb-20">
                <div className="text-center mb-10">
                    <h2 className="font-serif text-3xl font-semibold text-black dark:text-white mb-4">
                        Elija el plan que mejor le representa
                    </h2>
                    <p className="text-[#7E7D7D] text-sm">
                        Todos los planes pueden contratarse como previsión anticipada con precio congelado.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                        { nombre: 'Margarita', precio: '$970.000' },
                        { nombre: 'Azucena', precio: '$1.360.000' },
                        { nombre: 'Rosal Abelia', precio: '$1.750.000' },
                        { nombre: 'Acacia', precio: '$2.250.000' },
                        { nombre: 'Quillay', precio: '$2.390.000' },
                        { nombre: 'Queule', precio: '$2.990.000' },
                        { nombre: 'Raúl', precio: '$3.590.000', destacado: true },
                    ].map((plan) => (
                        <div
                            key={plan.nombre}
                            className="p-5 rounded-xl text-center border transition-all hover:-translate-y-1 hover:shadow-md cursor-default"
                            style={{
                                background: (plan as any).destacado ? 'black' : undefined,
                                borderColor: (plan as any).destacado ? 'black' : undefined,
                                color: (plan as any).destacado ? 'white' : undefined,
                            }}
                        >
                            {(plan as any).destacado && (
                                <span className="text-[9px] font-bold uppercase tracking-widest text-white/60 block mb-1">★ Popular</span>
                            )}
                            <p className="font-serif font-bold text-lg mb-1">{plan.nombre}</p>
                            <p className="text-xs font-black opacity-60">{plan.precio}</p>
                        </div>
                    ))}
                    <Link
                        href="/planes"
                        className="p-5 rounded-xl text-center border border-dashed border-black/20 dark:border-white/20 flex flex-col items-center justify-center gap-2 text-[#7E7D7D] hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all group"
                    >
                        <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform">open_in_new</span>
                        <span className="text-xs font-bold uppercase tracking-widest">Ver todos</span>
                    </Link>
                </div>
            </section>

            {/* CTA Final */}
            <section className="bg-[#F2F2F2] dark:bg-zinc-900/50 py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="material-symbols-outlined text-4xl text-black/20 dark:text-white/20 block mb-4">volunteer_activism</span>
                    <h3 className="font-serif text-3xl font-semibold mb-4 text-black dark:text-white">
                        Tome esta decisión hoy con tranquilidad
                    </h3>
                    <p className="text-[#7E7D7D] text-base mb-8 leading-relaxed max-w-xl mx-auto">
                        La asesoría es completamente gratuita y sin compromiso. Contáctenos y un especialista
                        le guiará con paciencia y respeto.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="tel:+56964333760"
                            className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 transition-colors w-full sm:w-auto justify-center"
                        >
                            <span className="material-symbols-outlined text-[18px]">call</span>
                            Llamar · 24/7
                        </a>
                        <a
                            href="https://wa.me/56964333760?text=Hola, me interesa contratar una previsión funeraria anticipada."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 border border-black dark:border-white text-black dark:text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all w-full sm:w-auto justify-center"
                        >
                            <span className="material-symbols-outlined text-[18px]">chat</span>
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
