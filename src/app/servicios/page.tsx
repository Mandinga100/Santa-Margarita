'use client';

import Link from 'next/link';

const servicios = [
    {
        title: 'Servicios Funerarios',
        description: 'Ceremonias personalizadas que reflejan la esencia de su ser querido. Desde homenajes íntimos hasta servicios de gala con atención al más mínimo detalle.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7RuP3KNdPrYIbglckhUe46rvYsbC9nrmxYlxr5F9O3JaceN_r7lky7QIEL8sTqxzsEbqAFxpyNdE25yx46SUVzqYAmA0T763gXkAcrfwgbaW5-D7eRDluyaOk-PtwscQ--14u7hGKRREZN90rxvVsYYfB7X9820giv7_HwU7LabxX7sM5br4Ry7Eq0mPPTSxAvF_R4V9m6Aq2AAkxgQ-ynjnPV8hVjgggVDMN_v7M-ezJMuEJ6grmOZdBgahB7EaIekKg3TGDmgg',
        features: ['Capillas de velación premium', 'Carruajes de honor', 'Atención multiconfesional']
    },
    {
        title: 'Crematorio y Cinerarios',
        description: 'Un proceso llevado con el máximo respeto en nuestras instalaciones de vanguardia, rodeadas de jardines diseñados para la reflexión y la paz.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBL0OrItcdiLSS_ghT9c7owX82P9RuemkVfJab2kjLWvgahtOkrxiuRLDlffDMZy-jCs6sLIpIcWBM79KznSq8KsOdD5PLFnUMZaimo2J_9VGrSsi-NincESrCqeg3knpGzoQu654tyml4J0pqeQlyKmtuzsLiM16M70GznWF81_tNb61n0iCPoGbMLz7XqhTtIAKQw-0z8rRKCg8ijG735EqoMP3jmHreXO4FHHaPvDvWrRxsaHmILz8nOjcywTz0nMusMeCBi644',
        features: ['Urnas de diseño exclusivo', 'Espacios memoriales naturales', 'Certificación ambiental']
    },
    {
        title: 'Traslados Nacionales e Internacionales',
        description: 'Gestión logística integral para el traslado de restos a cualquier parte del mundo, cumpliendo con todas las normativas de seguridad y sanidad.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKKxz62qQfRjODn-sBYQZ2ifoIwjnN3yoicGkW2Rm7i_abQxPsB8OaX8Om93YnA79FRwh4mqRGPN66QAp0PiczUy2PYJ9DS8v9ilQyHdpYV7j2j1sKi6OY_2iIQ9xemYow63nm5LIsHms3BgqEzTrPK3wW9wdRW2CZKGXH-MLDKUmjHaGqtIFl2BSM1ttKicnIlxIhfd__SCMeovlVo6ZTem2F85MTmEcKRqw5ClZwirYwk7cGqrDmzsY0G5CZtYMmCYHYFY_lhyE',
        features: ['Repatriación especializada', 'Trámites consulares', 'Custodia profesional 24h']
    },
    {
        title: 'Asesoría Legal y Trámites',
        description: 'Aliviamos la carga administrativa gestionando certificados, licencias y procesos legales necesarios, permitiéndole enfocarse en lo que realmente importa.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEyR-i8ybgXenH-wsA9w1QQGCxV3eXt7L7jCm5-u3iaGhnNG5KnGIKZb97j-dGjdr5B5blak2SGmDhcNj2U0wDxS8ay9iZFTsKiJC2LnAbLAf4owvWYLPLXVpwvtkcEoBdW7Fx3ZSZuV81HJeWJ6nuwQcf5D_aBJFnf8PrtdJByGpyaQSeUhfEHZ-9SPON8goMI6aNuqk_ZQ_nla992WGT5RFoeDK3eu3Ov-qAaw7A-MGhyA2LlW_0w10J8FwMn4AhLbwh3P8i19A',
        features: ['Gestión de herencias', 'Documentación gubernamental', 'Apoyo en seguros de vida']
    }
];

export default function ServiciosPage() {
    return (
        <main className="min-h-screen bg-[#f7f7f7] dark:bg-[#121212] pt-32 pb-24 font-display antialiased">

            {/* Hero Section */}
            <section className="max-w-5xl mx-auto px-6 py-20 text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#7E7D7D] block mb-6">Excelencia en Acompañamiento</span>
                <h1 className="text-5xl md:text-7xl font-serif text-black dark:text-white mb-10 italic">
                    Servicios Integrales y Legado
                </h1>
                <p className="text-xl text-[#7E7D7D] max-w-2xl mx-auto leading-relaxed font-light">
                    En los momentos de mayor fragilidad, ofrecemos un entorno de serenidad y profesionalismo absoluto para honrar la vida y el legado de quienes más ama.
                </p>
                <div className="w-20 h-px bg-black/10 mx-auto mt-16"></div>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {servicios.map((s, idx) => (
                        <div
                            key={idx}
                            className="group flex flex-col bg-white dark:bg-slate-800/40 rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.06)] border border-black/5"
                        >
                            <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                                <img
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    src={s.image}
                                    alt={s.title}
                                />
                            </div>
                            <div className="p-12">
                                <h3 className="text-3xl font-serif mb-6 italic text-black dark:text-white">{s.title}</h3>
                                <p className="text-[#7E7D7D] mb-10 leading-relaxed font-light text-lg">
                                    {s.description}
                                </p>
                                <ul className="space-y-4">
                                    {s.features.map((f, i) => (
                                        <li key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-black/40">
                                            <span className="material-symbols-outlined text-black text-sm">check_circle</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                    {/* Featured: Floristería (Wide) */}
                    <div className="md:col-span-2 group flex flex-col md:flex-row bg-white dark:bg-slate-800/40 rounded-[3rem] overflow-hidden transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.06)] border border-black/5">
                        <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden bg-slate-100">
                            <img
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYpGcDTcprOQZ4a5vwoarkUgy2CTYjR_5Rs8UHCdb8z166bnMjtU_GbyVdLBe-2bX8K7m21odDlkq_U3HjNZlTFbxXvKkKNiRx1Bda5WCBFl-DwsisB4DjEV2pR_lPMERWZ7wOj8Dbtu0UjrXd0UK7IA4RvSRaaMZy0vFI4cViY4T7I6bWdTW1nPuHc4GF-2bBLXxtep_MiZv65pQRYJMn0P0T9UX2QMjgJyqWqCf_2excw6_4gfJtcQn5ikqesOyH7ifG3ZaKeLE"
                                alt="Floristería de Autor"
                            />
                        </div>
                        <div className="md:w-1/2 p-16 flex flex-col justify-center">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 mb-6">Detalles que trascienden</span>
                            <h3 className="text-4xl font-serif mb-8 italic text-black dark:text-white">Floristería y Ornamentación</h3>
                            <p className="text-lg text-[#7E7D7D] mb-10 font-light leading-relaxed">
                                Diseños florales de autor que transmiten consuelo y esperanza. Utilizamos únicamente flores frescas de la más alta calidad para crear arreglos que honran la memoria con elegancia.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black/40">
                                    <span className="material-symbols-outlined text-sm">local_florist</span> Arreglos Fúnebres
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black/40">
                                    <span className="material-symbols-outlined text-sm">local_florist</span> Coronas de Honor
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black/40">
                                    <span className="material-symbols-outlined text-sm">local_florist</span> Decoración de Salas
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black/40">
                                    <span className="material-symbols-outlined text-sm">local_florist</span> Diseños de Autor
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Emergency CTA */}
            <section className="bg-black text-white py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1542456079-22a7f59d9c22')] bg-cover bg-center"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-5xl font-serif mb-8 italic">Estamos aquí para ayudarle 24/7</h2>
                    <p className="text-lg text-white/50 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                        Nuestro equipo de profesionales está disponible en todo momento para brindarle la asesoría y el apoyo compasivo que su familia necesita.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <a
                            className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-slate-200 transition-all shadow-2xl"
                            href="tel:+56964333760"
                        >
                            Llamar ahora
                        </a>
                        <a
                            className="border border-white/20 text-white px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white/5 transition-all"
                            href="https://wa.me/56964333760"
                        >
                            WhatsApp Urgente
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
