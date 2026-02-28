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
];

function Acordeon({ pregunta, respuesta }: { pregunta: string; respuesta: string }) {
    const [abierto, setAbierto] = useState(false);

    return (
        <div className="border-b border-black/5 dark:border-white/5 last:border-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors rounded-3xl overflow-hidden mb-2">
            <button
                onClick={() => setAbierto(!abierto)}
                className="w-full text-left flex items-center justify-between gap-6 py-6 px-4 group"
                aria-expanded={abierto}
            >
                <span className="font-serif text-xl md:text-2xl text-black dark:text-white transition-opacity duration-300">
                    {pregunta}
                </span>
                <span
                    className="material-symbols-outlined text-2xl text-black/20 dark:text-white/20 transition-transform duration-500"
                    style={{ transform: abierto ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                    expand_more
                </span>
            </button>
            <div
                className="overflow-hidden transition-all duration-500 ease-in-out px-4"
                style={{ maxHeight: abierto ? '600px' : '0px', opacity: abierto ? 1 : 0 }}
            >
                <div className="pb-8 pt-2">
                    <p className="text-[#7E7D7D] dark:text-slate-400 text-lg leading-loose font-light max-w-2xl">
                        {respuesta}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function FaqPage() {
    const [categoriaActiva, setCategoriaActiva] = useState('tramites');
    const [searchQuery, setSearchQuery] = useState('');

    const categoriaSeleccionada = categorias.find((c) => c.id === categoriaActiva)!;

    return (
        <main className="min-h-screen bg-[#fcfcfc] dark:bg-[#101622] pt-32 pb-24">

            {/* Header Section */}
            <section className="max-w-4xl mx-auto px-6 text-center mb-24">
                <h1 className="font-serif text-6xl md:text-8xl mb-8 text-black dark:text-white leading-tight">
                    Preguntas Frecuentes
                </h1>
                <p className="text-[#7E7D7D] text-xl font-light leading-relaxed max-w-2xl mx-auto">
                    Encuentre respuestas detalladas sobre nuestros servicios funerarios, planes de previsión y el apoyo legal necesario.
                </p>
            </section>

            {/* Search Bar - Pillar Style */}
            <section className="max-w-2xl mx-auto px-6 mb-24">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-black/20 dark:text-white/20 group-focus-within:text-black transition-colors">search</span>
                    </div>
                    <input
                        className="w-full bg-white dark:bg-slate-900/50 border-none rounded-full py-6 pl-16 pr-8 text-lg shadow-2xl shadow-black/5 focus:ring-2 focus:ring-black/5 transition-all outline-none text-black dark:text-white placeholder:text-black/20"
                        placeholder="¿En qué podemos ayudarle hoy?"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </section>

            {/* Categories & Content */}
            <section className="max-w-5xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

                    {/* Sidebar Nav */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/30 dark:text-white/30 mb-8 pl-4">Categorías</h4>
                        {categorias.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setCategoriaActiva(cat.id)}
                                className={`w-full text-left px-6 py-4 rounded-2xl text-sm font-semibold tracking-wide transition-all ${categoriaActiva === cat.id
                                        ? 'bg-black text-white shadow-xl shadow-black/20'
                                        : 'text-[#7E7D7D] hover:bg-black/5 dark:hover:bg-white/5'
                                    }`}
                            >
                                {cat.titulo}
                            </button>
                        ))}
                    </div>

                    {/* FAQ List */}
                    <div className="md:col-span-3">
                        <h2 className="font-serif text-3xl mb-12 pb-6 border-b border-black/5 dark:border-white/5 text-black dark:text-white">
                            {categoriaSeleccionada.titulo}
                        </h2>
                        <div className="space-y-4">
                            {categoriaSeleccionada.preguntas
                                .filter(q => q.q.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((item) => (
                                    <Acordeon key={item.q} pregunta={item.q} respuesta={item.a} />
                                ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Support CTA */}
            <section className="mt-40 max-w-5xl mx-auto px-6 pb-24 border-t border-black/5 pt-32 text-center">
                <h3 className="font-serif text-4xl mb-6 text-black dark:text-white">¿Aún tiene dudas?</h3>
                <p className="text-[#7E7D7D] mb-12 font-light text-lg">Estamos aquí para acompañarle las 24 horas del día, los 365 días del año.</p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-black/30 mb-3">Llamada Gratuita 24/7</span>
                        <a href="tel:+56964333760" className="font-serif text-3xl text-black dark:text-white hover:opacity-70 transition-opacity">
                            +56 9 6433 3760
                        </a>
                    </div>
                    <div className="h-1 w-12 bg-black/5 hidden md:block"></div>
                    <button className="bg-black text-white px-12 py-5 rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:bg-zinc-800 transition-colors shadow-2xl shadow-black/20">
                        Contacto Directo
                    </button>
                </div>
            </section>

        </main>
    );
}
