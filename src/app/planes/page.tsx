'use client';

import Link from 'next/link';

// Fuente verdad: planes oficiales Funeraria Santa Margarita
const planes = [
    {
        id: 'raul-premium',
        nombre: 'Raúl',
        categoria: 'Más Completo',
        precio: '$3.590.000',
        descripcion: 'El servicio más completo con todos los honores y acompañamiento integral para la familia.',
        destacado: true,
        incluye: [
            'Cofre de maderas nobles importadas',
            'Carroza fúnebre de gala',
            'Sala de velación privada 24 hrs',
            'Coronas de flores naturales',
            'Traslado de restos a nivel nacional',
            'Aviso en prensa nacional',
            'Trámites legales completos',
            'Acompañamiento psicológico',
            'Capilla ardiente decorada',
            'Servicio de café y recepción',
        ],
    },
    {
        id: 'queule',
        nombre: 'Queule',
        categoria: 'Servicio Completo',
        precio: '$2.990.000',
        descripcion: 'Servicio completo con excelente presentación y atención personalizada.',
        destacado: false,
        incluye: [
            'Cofre de madera noble nacional',
            'Carroza fúnebre',
            'Sala de velación 12 hrs',
            'Arreglos florales incluidos',
            'Traslado provincial',
            'Trámites legales completos',
            'Acompañamiento familiar',
            'Capilla ardiente',
        ],
    },
    {
        id: 'quillay',
        nombre: 'Quillay',
        categoria: 'Servicio Solemne',
        precio: '$2.390.000',
        descripcion: 'Servicio solemne con todos los elementos esenciales para una despedida digna.',
        destacado: false,
        incluye: [
            'Cofre de madera barnizada',
            'Carroza fúnebre',
            'Sala de velación 8 hrs',
            'Arreglos florales',
            'Traslado local',
            'Trámites legales',
            'Capilla ardiente básica',
        ],
    },
    {
        id: 'acacia',
        nombre: 'Acacia',
        categoria: 'Servicio Integral',
        precio: '$2.250.000',
        descripcion: 'Servicio integral con los componentes fundamentales para un servicio de calidad.',
        destacado: false,
        incluye: [
            'Cofre estándar superior',
            'Carroza fúnebre',
            'Sala de velación 6 hrs',
            'Arreglo floral simple',
            'Traslado local',
            'Trámites legales',
        ],
    },
    {
        id: 'rosal-abelia',
        nombre: 'Rosal Abelia',
        categoria: 'Servicio Esencial Plus',
        precio: '$1.750.000',
        descripcion: 'Servicio esencial ampliado con sala de velación y carroza incluida.',
        destacado: false,
        incluye: [
            'Cofre estándar',
            'Carroza fúnebre',
            'Sala de velación compartida',
            'Traslado local',
            'Trámites básicos',
        ],
    },
    {
        id: 'azucena',
        nombre: 'Azucena',
        categoria: 'Servicio Esencial',
        precio: '$1.360.000',
        descripcion: 'Servicio esencial con los elementos fundamentales para una despedida digna.',
        destacado: false,
        incluye: [
            'Cofre estándar',
            'Traslado local',
            'Velación en capilla pública',
            'Trámites básicos',
        ],
    },
    {
        id: 'margarita',
        nombre: 'Margarita',
        categoria: 'Servicio Básico',
        precio: '$970.000',
        descripcion: 'Servicio básico que asegura una despedida digna con los elementos esenciales.',
        destacado: false,
        incluye: [
            'Cofre económico',
            'Traslado local',
            'Trámites legales básicos',
        ],
    },
];

export default function PlanesPage() {
    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="bg-black text-white pt-16 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 block mb-4">Funeraria Santa Margarita</span>
                    <h1 className="font-serif text-4xl md:text-6xl font-medium mb-6 leading-tight">
                        Planes de Servicio Funerario
                    </h1>
                    <p className="text-white/70 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                        Ofrecemos una gama completa de planes para acompañarle en este difícil momento.
                        Todos los precios incluyen IVA y están expresados en Pesos Chilenos (CLP).
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="tel:+56964333760"
                            className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-zinc-100 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[18px]">call</span>
                            +56 9 6433 3760
                        </a>
                        <Link
                            href="/cotizacion"
                            className="flex items-center gap-3 border border-white text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[18px]">request_quote</span>
                            Cotizar Online
                        </Link>
                    </div>
                </div>
            </section>

            {/* Nota de precios */}
            <div className="bg-[#F2F2F2] dark:bg-zinc-900 border-b border-black/5 py-3 px-6">
                <p className="max-w-7xl mx-auto text-center text-xs text-[#7E7D7D] font-medium uppercase tracking-widest">
                    Todos los precios en Pesos Chilenos (CLP) · Incluyen IVA · Vigentes al {new Date().toLocaleDateString('es-CL', { month: 'long', year: 'numeric' })}
                </p>
            </div>

            {/* Grid de planes */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {planes.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${plan.destacado
                                    ? 'bg-black text-white shadow-2xl ring-2 ring-black'
                                    : 'bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800'
                                }`}
                        >
                            {plan.destacado && (
                                <div className="absolute top-0 left-0 right-0 bg-white/10 text-white text-[9px] font-bold uppercase tracking-[0.3em] text-center py-2">
                                    ★ Más Solicitado
                                </div>
                            )}

                            <div className={`p-8 ${plan.destacado ? 'pt-10' : ''}`}>
                                {/* Badge categoría */}
                                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] block mb-3 ${plan.destacado ? 'text-white/50' : 'text-[#7E7D7D]'}`}>
                                    {plan.categoria}
                                </span>

                                {/* Nombre plan */}
                                <h2 className={`font-serif text-3xl font-bold mb-2 ${plan.destacado ? 'text-white' : 'text-black dark:text-white'}`}>
                                    {plan.nombre}
                                </h2>

                                {/* Precio */}
                                <div className={`mb-4 pb-4 border-b ${plan.destacado ? 'border-white/20' : 'border-black/10 dark:border-white/10'}`}>
                                    <span className={`text-4xl font-black tracking-tight ${plan.destacado ? 'text-white' : 'text-black dark:text-white'}`}>
                                        {plan.precio}
                                    </span>
                                    <span className={`text-xs block mt-1 font-medium ${plan.destacado ? 'text-white/50' : 'text-[#7E7D7D]'}`}>
                                        Pesos Chilenos · IVA incluido
                                    </span>
                                </div>

                                {/* Descripción */}
                                <p className={`text-sm leading-relaxed mb-6 ${plan.destacado ? 'text-white/70' : 'text-slate-500 dark:text-slate-400'}`}>
                                    {plan.descripcion}
                                </p>

                                {/* Lista de incluidos */}
                                <ul className="space-y-3 mb-8 flex-grow">
                                    {plan.incluye.map((item) => (
                                        <li key={item} className={`flex items-start gap-3 text-sm ${plan.destacado ? 'text-white/90' : 'text-slate-600 dark:text-slate-300'}`}>
                                            <span className={`material-symbols-outlined text-[16px] mt-0.5 flex-shrink-0 ${plan.destacado ? 'text-white' : 'text-green-600'}`}>
                                                check_circle
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <div className="flex flex-col gap-3 mt-auto">
                                    <Link
                                        href="/cotizacion"
                                        className={`w-full text-center py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${plan.destacado
                                                ? 'bg-white text-black hover:bg-zinc-100'
                                                : 'bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200'
                                            }`}
                                    >
                                        Cotizar este plan
                                    </Link>
                                    <a
                                        href={`https://wa.me/56964333760?text=Hola, me interesa el Plan ${plan.nombre} (${plan.precio})`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full text-center py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border ${plan.destacado
                                                ? 'border-white/30 text-white hover:bg-white/10'
                                                : 'border-black/20 text-black hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5'
                                            }`}
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="material-symbols-outlined text-[14px]">chat</span>
                                            Consultar por WhatsApp
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sección de contacto/asistencia */}
            <section className="bg-[#F2F2F2] dark:bg-zinc-900/50 py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="material-symbols-outlined text-4xl text-black/20 dark:text-white/20 block mb-4">support_agent</span>
                    <h3 className="font-serif text-3xl font-semibold mb-4 text-black dark:text-white">¿Necesita asesoría personalizada?</h3>
                    <p className="text-[#7E7D7D] text-base mb-8 leading-relaxed">
                        Nuestro equipo está disponible las 24 horas para orientarle sobre el plan que mejor se adapta
                        a sus necesidades y presupuesto. No hay consulta sin costo, estamos aquí para acompañarle.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="tel:+56964333760"
                            className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 transition-colors w-full sm:w-auto justify-center"
                        >
                            <span className="material-symbols-outlined text-[18px]">call</span>
                            Llamar Ahora · 24/7
                        </a>
                        <a
                            href="mailto:contacto@funerariasantamargarita.cl"
                            className="flex items-center gap-3 border border-black dark:border-white text-black dark:text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all w-full sm:w-auto justify-center"
                        >
                            <span className="material-symbols-outlined text-[18px]">mail</span>
                            Escribir por Email
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
