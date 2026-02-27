'use client';

import { useState } from 'react';
import Link from 'next/link';

const categorias = [
    {
        id: 'tramites',
        icono: 'gavel',
        titulo: 'Trámites Legales',
        preguntas: [
            {
                q: '¿Qué documentos necesito al momento del fallecimiento?',
                a: 'Necesitará el RUT o cédula de identidad del fallecido, su libreta de matrimonio o partida de nacimiento, y la libreta de familia del responsable que realiza los trámites. Nuestra funeraria le guiará en cada paso para obtener los documentos faltantes.',
            },
            {
                q: '¿Quién puede solicitar el certificado de defunción?',
                a: 'Cualquier persona puede solicitar el certificado de defunción en el Registro Civil. Sin embargo, para ciertos trámites legales como herencias o seguros, se requiere ser familiar directo acreditado. Nosotros coordinamos este trámite por usted sin costo adicional.',
            },
            {
                q: '¿Cuánto tiempo toma inscribir la defunción en el Registro Civil?',
                a: 'La inscripción debe realizarse dentro de los 3 días hábiles siguientes al fallecimiento. Nuestra funeraria gestiona este trámite de forma inmediata como parte de todos nuestros planes de servicio.',
            },
            {
                q: '¿Qué ocurre si el fallecido tenía deudas o créditos?',
                a: 'Las deudas no se heredan automáticamente. Los herederos tienen el derecho a aceptar o rechazar la herencia. Para rechazarla, existe un trámite notarial específico. Le recomendamos consultar un abogado; podemos derivarle a profesionales de confianza.',
            },
            {
                q: '¿Se puede retirar el cuerpo de otro país?',
                a: 'Sí. Coordinamos traslados internacionales con todas las exigencias sanitarias y documentales de cada país. El proceso incluye certificados sanitarios, embalsamamiento especializado y coordinación con agencias funerarias en el exterior.',
            },
        ],
    },
    {
        id: 'servicios',
        icono: 'local_florist',
        titulo: 'Nuestros Servicios',
        preguntas: [
            {
                q: '¿Cuántos planes de servicio tienen disponibles?',
                a: 'Contamos con 7 planes oficiales que van desde el Plan Margarita ($970.000 CLP) hasta el Plan Raúl ($3.590.000 CLP). Todos los precios están expresados en Pesos Chilenos e incluyen IVA. Consulte nuestra página de planes para el detalle completo.',
            },
            {
                q: '¿Los precios incluyen IVA?',
                a: 'Sí. Todos nuestros precios están expresados en Pesos Chilenos (CLP) e incluyen el IVA vigente. No existen cobros sorpresa; el precio que se acuerda es el precio final.',
            },
            {
                q: '¿Qué es la previsión funeraria anticipada?',
                a: 'Es un plan contratado con antelación que le permite asegurar el servicio a precio de hoy y evitar que sus familiares enfrenten los costos y decisiones en un momento de dolor. Consulte nuestra sección de Previsión para más detalles.',
            },
            {
                q: '¿Ofrecen servicio de cremación?',
                a: 'Sí. Disponemos de servicios de cremación con distintos niveles de acompañamiento. Las ánforas pueden elegirse entre varias opciones de material y diseño. Contáctenos para una cotización personalizada al +56 9 6433 3760.',
            },
            {
                q: '¿Tienen capilla de velación propia?',
                a: 'Sí. Contamos con capillas de velación propias, equipadas para ofrecer un ambiente íntimo y digno. Los planes superiores incluyen sala privada por hasta 24 horas con servicio de recepción para familiares.',
            },
        ],
    },
    {
        id: 'duelo',
        icono: 'favorite',
        titulo: 'Apoyo en el Duelo',
        preguntas: [
            {
                q: '¿Qué es el duelo y cuánto tiempo dura?',
                a: 'El duelo es el proceso natural de adaptación ante la pérdida de un ser querido. No tiene una duración fija; puede ser de meses o años. Lo importante es vivirlo sin aislarse y buscar apoyo cuando sea necesario. Cada persona lo vive de forma única.',
            },
            {
                q: '¿Cómo acompañar a alguien que perdió a un familiar?',
                a: 'La presencia es lo más valioso. No hace falta decir palabras perfectas; estar, escuchar y acompañar en silencio es suficiente. Evite frases como "ya va a pasar" o "fue lo mejor". En cambio, pregunte cómo puede ayudar de forma concreta.',
            },
            {
                q: '¿Cuándo debo buscar ayuda psicológica?',
                a: 'Si el dolor interfiere con las actividades del día a día por más de 6 semanas, si hay pensamientos de hacerse daño, o si el duelo se convierte en aislamiento total, es recomendable buscar apoyo profesional. Podemos orientarle hacia especialistas en duelo.',
            },
            {
                q: '¿Cómo hablar del fallecimiento con los niños?',
                a: 'Con honestidad y lenguaje apropiado para su edad. Evite eufemismos como "se fue de viaje" o "se durmió", pues generan confusión. Dígales la verdad de forma clara y amorosa, permítales hacer preguntas y exprese sus propias emociones frente a ellos.',
            },
        ],
    },
    {
        id: 'pagos',
        icono: 'payments',
        titulo: 'Medios de Pago y Seguros',
        preguntas: [
            {
                q: '¿Qué medios de pago aceptan?',
                a: 'Aceptamos efectivo, transferencia bancaria, cheques y tarjetas de débito/crédito. Para familias que lo necesiten, evaluamos facilidades de pago. Consulte directamente con nuestro equipo al +56 9 6433 3760.',
            },
            {
                q: '¿El SEGURO de VIDA del fallecido cubre los gastos funerarios?',
                a: 'Depende de la póliza. Muchas pólizas de vida incluyen cobertura funeraria. Solicite el certificado de defunción y contáctese con la aseguradora. Podemos asistirle en el proceso de presentación de la documentación requerida.',
            },
            {
                q: '¿El FONASA o ISAPRE cubre servicios funerarios?',
                a: 'Actualmente FONASA e ISAPREs no cubren servicios funerarios directamente. Sin embargo, algunas cajas de compensación ofrecen subsidios mortuorios para sus afiliados. Verifique su situación particular.',
            },
        ],
    },
];

function Acordeon({ pregunta, respuesta }: { pregunta: string; respuesta: string }) {
    const [abierto, setAbierto] = useState(false);

    return (
        <div className="border-b border-black/8 dark:border-white/8">
            <button
                onClick={() => setAbierto(!abierto)}
                className="w-full text-left flex items-start justify-between gap-4 py-5 group"
                aria-expanded={abierto}
            >
                <span className="font-semibold text-black dark:text-white text-sm md:text-base leading-snug group-hover:opacity-70 transition-opacity pr-4">
                    {pregunta}
                </span>
                <span
                    className="material-symbols-outlined text-[20px] flex-shrink-0 mt-0.5 text-[#7E7D7D] transition-all duration-300"
                    style={{ transform: abierto ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                    add
                </span>
            </button>
            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: abierto ? '500px' : '0px', opacity: abierto ? 1 : 0 }}
            >
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pb-5 pr-8">
                    {respuesta}
                </p>
            </div>
        </div>
    );
}

export default function FaqPage() {
    const [categoriaActiva, setCategoriaActiva] = useState('tramites');

    const categoriaSeleccionada = categorias.find((c) => c.id === categoriaActiva)!;

    const totalPreguntas = categorias.reduce((acc, c) => acc + c.preguntas.length, 0);

    return (
        <main className="min-h-screen bg-white dark:bg-black">
            {/* Hero */}
            <section className="bg-black text-white pt-16 pb-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 block mb-4">
                        Centro de Ayuda
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl font-medium mb-6 leading-tight">
                        Guía de Trámites<br />y Preguntas Frecuentes
                    </h1>
                    <p className="text-white/70 text-lg font-light max-w-2xl mx-auto leading-relaxed mb-8">
                        Resolvemos sus dudas sobre trámites legales, servicios funerarios y acompañamiento en el duelo.
                    </p>
                    {/* Stats strip */}
                    <div className="inline-flex items-center gap-6 bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-sm text-white/60">
                        <span><strong className="text-white">{totalPreguntas}</strong> preguntas respondidas</span>
                        <span className="w-px h-4 bg-white/20" />
                        <span><strong className="text-white">{categorias.length}</strong> categorías</span>
                        <span className="w-px h-4 bg-white/20" />
                        <span>Actualizado <strong className="text-white">2025</strong></span>
                    </div>
                </div>
            </section>

            {/* Navegación de categorías — sticky mobile */}
            <div className="sticky top-0 z-20 bg-white dark:bg-zinc-950 border-b border-black/10 dark:border-white/10 shadow-sm">
                <div className="max-w-5xl mx-auto px-6 flex overflow-x-auto gap-0" style={{ scrollbarWidth: 'none' }}>
                    {categorias.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setCategoriaActiva(cat.id)}
                            className="flex items-center gap-2 px-5 py-4 text-xs font-bold uppercase tracking-widest whitespace-nowrap border-b-2 transition-all"
                            style={{
                                borderColor: categoriaActiva === cat.id ? 'currentColor' : 'transparent',
                                color: categoriaActiva === cat.id ? undefined : '#7E7D7D',
                            }}
                        >
                            <span className="material-symbols-outlined text-[16px]">{cat.icono}</span>
                            {cat.titulo}
                        </button>
                    ))}
                </div>
            </div>

            {/* Contenido FAQ */}
            <section className="max-w-5xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Panel lateral desktop */}
                    <div className="hidden md:block">
                        <div className="sticky top-24 space-y-1">
                            {categorias.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setCategoriaActiva(cat.id)}
                                    className="w-full text-left flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                                    style={{
                                        background: categoriaActiva === cat.id ? 'black' : undefined,
                                        color: categoriaActiva === cat.id ? 'white' : '#7E7D7D',
                                    }}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-[18px]">{cat.icono}</span>
                                        {cat.titulo}
                                    </span>
                                    <span className="text-[10px] font-black opacity-50">
                                        {cat.preguntas.length}
                                    </span>
                                </button>
                            ))}

                            {/* Card de contacto */}
                            <div className="mt-8 p-5 bg-[#F2F2F2] dark:bg-zinc-900 rounded-2xl">
                                <span className="material-symbols-outlined text-2xl text-black/40 dark:text-white/40 block mb-3">support_agent</span>
                                <p className="text-xs font-bold text-black dark:text-white mb-1">¿Necesita asesoría?</p>
                                <p className="text-xs text-[#7E7D7D] mb-4 leading-relaxed">Disponibles 24/7 para orientarle sin compromiso.</p>
                                <a
                                    href="tel:+56964333760"
                                    className="flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg w-full justify-center hover:opacity-80 transition-opacity"
                                >
                                    <span className="material-symbols-outlined text-[14px]">call</span>
                                    +56 9 6433 3760
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Acordeones con animación */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-[20px] text-white dark:text-black">
                                    {categoriaSeleccionada.icono}
                                </span>
                            </div>
                            <div>
                                <h2 className="font-serif text-2xl font-bold text-black dark:text-white">
                                    {categoriaSeleccionada.titulo}
                                </h2>
                                <p className="text-xs text-[#7E7D7D]">{categoriaSeleccionada.preguntas.length} preguntas</p>
                            </div>
                        </div>
                        <div>
                            {categoriaSeleccionada.preguntas.map((item) => (
                                <Acordeon key={item.q} pregunta={item.q} respuesta={item.a} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section className="bg-[#F2F2F2] dark:bg-zinc-900/50 py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <h3 className="font-serif text-3xl font-semibold mb-4 text-black dark:text-white">
                        ¿No encontró su respuesta?
                    </h3>
                    <p className="text-[#7E7D7D] mb-8">
                        Nuestro equipo especializado está disponible las 24 horas del día, los 7 días de la semana.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="tel:+56964333760"
                            className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-zinc-800 transition-colors w-full sm:w-auto justify-center"
                        >
                            <span className="material-symbols-outlined text-[18px]">call</span>
                            Llamar Ahora
                        </a>
                        <Link
                            href="/cotizacion"
                            className="flex items-center gap-3 border border-black dark:border-white text-black dark:text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all w-full sm:w-auto justify-center"
                        >
                            <span className="material-symbols-outlined text-[18px]">request_quote</span>
                            Cotizar Online
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
