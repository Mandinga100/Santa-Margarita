'use client';

import Link from 'next/link';

const servicios = [
    {
        title: 'Servicios Funerarios',
        description: 'Ceremonias de gala personalizadas que honran la esencia de cada ser querido con una atención meticulosa a la estética y el protocolo.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7RuP3KNdPrYIbglckhUe46rvYsbC9nrmxYlxr5F9O3JaceN_r7lky7QIEL8sTqxzsEbqAFxpyNdE25yx46SUVzqYAmA0T763gXkAcrfwgbaW5-D7eRDluyaOk-PtwscQ--14u7hGKRREZN90rxvVsYYfB7X9820giv7_HwU7LabxX7sM5br4Ry7Eq0mPPTSxAvF_R4V9m6Aq2AAkxgQ-ynjnPV8hVjgggVDMN_v7M-ezJMuEJ6grmOZdBgahB7EaIekKg3TGDmgg',
        features: ['Capillas VIP exclusivas', 'Carruajes de honor', 'Atención solemne 24h']
    },
    {
        title: 'Crematorio y Cinerarios',
        description: 'Procesos llevados con el máximo respeto en instalaciones de vanguardia, rodeadas de jardines diseñados para la reflexión y la paz eterna.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL0OrItcdiLSS_ghT9c7owX82P9RuemkVfJab2kjLWvgahtOkrxiuRLDlffDMZy-jCs6sLIpIcWBM79KznSq8KsOdD5PLFnUMZaimo2J_9VGrSsi-NincESrCqeg3knpGzoQu654tyml4J0pqeQlyKmtuzsLiM16M70GznWF81_tNb61n0iCPoGbMLz7XqhTtIAKQw-0z8rRKCg8ijG735EqoMP3jmHreXO4FHHaPvDvWrRxsaHmILz8nOjcywTz0nMusMeCBi644',
        features: ['Urnas de diseño fino', 'Espacios memoriales naturales', 'Protocolos certificados']
    },
    {
        title: 'Traslados Internacionales',
        description: 'Gestión logística integral para el retorno de restos a cualquier destino mundial, cumpliendo rigurosamente normativas de seguridad y sanidad.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKKxz62qQfRjODn-sBYQZ2ifoIwjnN3yoicGkW2Rm7i_abQxPsB8OaX8Om93YnA79FRwh4mqRGPN66QAp0PiczUy2PYJ9DS8v9ilQyHdpYV7j2j1sKi6OY_2iIQ9xemYow63nm5LIsHms3BgqEzTrPK3wW9wdRW2CZKGXH-MLDKUmjHaGqtIFl2BSM1ttKicnIlxIhfd__SCMeovlVo6ZTem2F85MTmEcKRqw5ClZwirYwk7cGqrDmzsY0G5CZtYMmCYHYFY_lhyE',
        features: ['Repatriación asistida', 'Trámites consulares', 'Custodia profesional']
    },
    {
        title: 'Asesoría Administrativa',
        description: 'Aliviamos su carga gestionando certificados, licencias y procesos legales, permitiéndole vivir su duelo con la serenidad necesaria.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEyR-i8ybgXenH-wsA9w1QQGCxV3eXt7L7jCm5-u3iaGhnNG5KnGIKZb97j-dGjdr5B5blak2SGmDhcNj2U0wDxS8ay9iZFTsKiJC2LnAbLAf4owvWYLPLXVpwvtkcEoBdW7Fx3ZSZuV81HJeWJ6nuwQcf5D_aBJFnf8PrtdJByGpyaQSeUhfEHZ-9SPON8goMI6aNuqk_ZQ_nla992WGT5RFoeDK3eu3Ov-qAaw7A-MGhyA2LlW_0w10J8FwMn4AhLbwh3P8i19A',
        features: ['Gestión de herencias', 'Apoyo en seguros', 'Trámites gubernamentales']
    }
];

export default function ServiciosPage() {
    return (
        <main className="min-h-screen bg-black text-white font-display pt-32 pb-24 selection:bg-white/10 antialiased">

            {/* Hero Section - Inmersivo Stitch */}
            <section className="max-w-5xl mx-auto px-6 py-24 text-center border-b border-white/5 mb-32">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block mb-8">Protocolos de Excelencia</span>
                <h1 className="text-5xl md:text-8xl font-serif text-white mb-12 italic leading-tight">
                    Homenajes que Trascienden
                </h1>
                <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light italic">
                    "En los instantes de mayor fragilidad, transformamos el adiós en un tributo solemne a la grandeza de una vida."
                </p>
                <div className="w-16 h-px bg-white/20 mx-auto mt-20"></div>
            </section>

            {/* Services Grid - Visual Cards UI */}
            <section className="max-w-7xl mx-auto px-6 mb-48">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                    {servicios.map((s, idx) => (
                        <article
                            key={idx}
                            className="group flex flex-col bg-white/[0.02] rounded-[3rem] overflow-hidden transition-all duration-700 hover:-translate-y-2 border border-white/5 hover:border-white/20 shadow-3xl shadow-black/60"
                        >
                            <div className="aspect-[16/10] overflow-hidden bg-black/40 grayscale group-hover:grayscale-0 transition-all duration-1000">
                                <img
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    src={s.image}
                                    alt={`Visualización de ${s.title}`}
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-16">
                                <h3 className="text-3xl font-serif mb-8 italic">{s.title}</h3>
                                <p className="text-white/50 mb-12 leading-relaxed font-light text-lg">
                                    {s.description}
                                </p>
                                <ul className="space-y-6">
                                    {s.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-5 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 group-hover:text-white/60 transition-colors">
                                            <span className="material-symbols-outlined text-amber-500/60 text-base">check_circle</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}

                    {/* Featured: Floristería (Full Width Edition) */}
                    <article className="md:col-span-2 group flex flex-col md:flex-row bg-white/[0.02] rounded-[4rem] overflow-hidden transition-all duration-700 hover:-translate-y-2 border border-white/5 hover:border-white/20 shadow-3xl shadow-black/60">
                        <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden bg-black/40 grayscale group-hover:grayscale-0 transition-all duration-1000">
                            <img
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYpGcDTcprOQZ4a5vwoarkUgy2CTYjR_5Rs8UHCdb8z166bnMjtU_GbyVdLBe-2bX8K7m21odDlkq_U3HjNZlTFbxXvKkKNiRx1Bda5WCBFl-DwsisB4DjEV2pR_lPMERWZ7wOj8Dbtu0UjrXd0UK7IA4RvSRaaMZy0vFI4cViY4T7I6bWdTW1nPuHc4GF-2bBLXxtep_MiZv65pQRYJMn0P0T9UX2QMjgJyqWqCf_2excw6_4gfJtcQn5ikqesOyH7ifG3ZaKeLE"
                                alt="Floristería de Autor"
                                loading="lazy"
                            />
                        </div>
                        <div className="md:w-1/2 p-20 flex flex-col justify-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mb-8">Distinción Visual</span>
                            <h3 className="text-4xl md:text-5xl font-serif mb-10 italic">Floristería de Autor</h3>
                            <p className="text-xl text-white/50 mb-12 font-light leading-relaxed">
                                Diseños florales curados que transmiten esperanza y consuelo. Utilizamos especies exclusivas para crear tributos visuales de inigualable elegancia.
                            </p>
                            <div className="grid grid-cols-2 gap-10">
                                {['Arreglos Fúnebres', 'Coronas de Honor', 'Decoración de Salas', 'Diseños de Autor'].map((item) => (
                                    <div key={item} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
                                        <span className="material-symbols-outlined text-base text-white/20">local_florist</span> {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Emergency Service Section - High Impact */}
            <section className="max-w-6xl mx-auto px-6">
                <div className="bg-gradient-to-b from-white/[0.05] to-transparent p-24 md:p-32 rounded-[4rem] border border-white/10 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-7xl font-serif mb-10 italic leading-tight">Asistencia Inmediata</h2>
                        <p className="text-xl text-white/40 mb-16 font-light max-w-2xl mx-auto leading-relaxed">
                            Nuestro protocolo de respuesta está activo las 24 horas del día para brindarle el apoyo compasivo que su familia requiere ahora.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-10">
                            <a
                                className="bg-white text-black px-16 py-6 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-slate-200 transition-all shadow-2xl shadow-white/5"
                                href="tel:+56964333760"
                            >
                                Llamada Urgente
                            </a>
                            <a
                                className="border border-white/20 text-white px-16 py-6 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-white/5 transition-all"
                                href="https://wa.me/56964333760"
                            >
                                WhatsApp 24h
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
