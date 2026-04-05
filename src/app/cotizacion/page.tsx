'use client';

import { useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';
import gsap from 'gsap';
import { sendEmailWithTemplate } from '@/lib/emailjs';

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '56964333760';

import { planesData as PLANES } from '@/data/planes';

const SERVICIOS = [
    { id: 'inhumacion', icono: 'local_florist', titulo: 'Inhumación Tradicional', desc: 'Solemne despedida con los más altos honores y respeto.' },
    { id: 'cremacion', icono: 'local_fire_department', titulo: 'Cremación', desc: 'Proceso inmaculado con ánfora de madera noble seleccionada.' },
    { id: 'prevision', icono: 'lock', titulo: 'Previsión Familiar', desc: 'Proteja el futuro hoy con la tranquilidad del precio garantizado.' },
];

type Step = 'datos' | 'servicio' | 'plan' | 'resumen' | 'enviado';

interface FormData {
    nombre: string;
    telefono: string;
    email: string;
    comuna: string;
    servicio: string;
    plan: string;
}

const INITIAL: FormData = {
    nombre: '', telefono: '', email: '', comuna: '',
    servicio: '', plan: '',
};

const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
});

function buildWhatsAppMsg(data: FormData): string {
    const plan = PLANES.find(p => p.id === data.plan);
    const svc = SERVICIOS.find(s => s.id === data.servicio);
    const lines = [
        `*Nueva Cotización Web — Funeraria Santa Margarita*`,
        ``,
        `👤 *Nombre:* ${data.nombre}`,
        `📱 *Teléfono:* ${data.telefono}`,
        `📧 *Email:* ${data.email}`,
        `📍 *Comuna:* ${data.comuna}`,
        `🔧 *Servicio:* ${svc?.titulo || data.servicio}`,
        `📋 *Plan:* ${plan ? `${plan.nombre} (${formatter.format(plan.precio)})` : data.plan}`,
    ];
    return encodeURIComponent(lines.join('\n'));
}

export default function CotizacionPage() {
    const [step, setStep] = useState<Step>('datos');
    const [form, setForm] = useState<FormData>(INITIAL);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (formRef.current) {
            gsap.fromTo(formRef.current,
                { opacity: 0, scale: 0.98, y: 10 },
                { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );
        }
    }, [step]);

    const update = (field: keyof FormData, val: string) =>
        setForm(prev => ({ ...prev, [field]: val }));

    const canContinueDatos = form.nombre.trim() && form.telefono.trim() && form.email.trim();
    const canContinueServicio = form.servicio !== '';
    const canContinuePlan = form.plan !== '';

    async function handleSubmit() {
        setLoading(true);
        setError('');

        try {
            await addDoc(collection(db, 'cotizaciones'), {
                ...form,
                estado: 'pendiente',
                createdAt: serverTimestamp(),
            });

            // Notificación vía EmailJS al negocio
            const plan = PLANES.find(p => p.id === form.plan);
            const svc = SERVICIOS.find(s => s.id === form.servicio);
            
            await sendEmailWithTemplate({
                subject: `Nueva Cotización Web - ${form.nombre}`,
                user_name: form.nombre,
                user_phone: form.telefono,
                user_email: form.email,
                mensaje: `Se ha recibido una nueva solicitud de cotización.\n\nComuna: ${form.comuna}\nServicio: ${svc?.titulo || form.servicio}\nPlan: ${plan?.nombre || form.plan}`,
                page_url: window.location.href,
            });

            setStep('enviado');
        } catch (err) {
            console.error(err);
            setError('Error al guardar. Puede contactarnos directamente por WhatsApp.');
        } finally {
            setLoading(false);
        }
    }

    const planSelected = PLANES.find(p => p.id === form.plan);
    const svcSelected = SERVICIOS.find(s => s.id === form.servicio);

    const steps = [
        { id: 'datos', label: 'Identidad' },
        { id: 'servicio', label: 'Ritual' },
        { id: 'plan', label: 'Homenaje' },
        { id: 'resumen', label: 'Presupuesto' },
    ];

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white font-display pt-32 pb-48 selection:bg-[#b8960c]/30 antialiased overflow-x-hidden relative">
            
            {/* Background Texture */}
            <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/assets/images/otros/clouds.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />

            <style jsx global>{`
                .silver-text {
                    background: linear-gradient(135deg, #e0e0e0 0%, #ffffff 40%, #b0b0b0 60%, #f0f0f0 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
                }
                .gold-glow {
                    box-shadow: 0 0 25px rgba(184, 150, 12, 0.2);
                }
                @keyframes bounce-x {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(5px); }
                }
                .animate-bounce-x {
                    animation: bounce-x 1s infinite;
                }
            `}</style>

            {/* Header */}
            <section className="max-w-4xl mx-auto px-6 text-center mb-24 relative z-10">
                <h1 className="font-serif text-5xl md:text-8xl text-white mb-10 italic leading-[0.9] tracking-tighter silver-text">Cotización Online</h1>
                <p className="text-white/50 text-xl font-light italic max-w-2xl mx-auto leading-relaxed">
                    Personalice cada detalle del homenaje. Estamos aquí para asegurar que el legado sea honrado con la mayor distinción.
                </p>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#b8960c]/30 to-transparent mx-auto mt-16"></div>
            </section>

            {/* Premium Stepper */}
            {step !== 'enviado' && (
                <nav className="max-w-4xl mx-auto px-6 mb-32 relative z-10" aria-label="Progreso">
                    <div className="absolute top-7 left-0 w-full h-px bg-white/5 -z-10 hidden md:block"></div>
                    <div className="flex justify-between relative px-2 md:px-12 gap-4">
                        {steps.map((s, i) => {
                            const active = s.id === step;
                            const currentIdx = steps.findIndex(st => st.id === step);
                            const completed = currentIdx > i;
                            return (
                                <div key={s.id} className="flex flex-col items-center gap-4 group flex-1">
                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border transition-all duration-700 relative text-xs md:text-sm ${
                                        active ? 'bg-[#b8960c] border-[#b8960c] text-[#0a0a0a] scale-110 gold-glow' :
                                        completed ? 'bg-zinc-900 border-[#b8960c]/30 text-[#b8960c]' : 'bg-transparent border-white/10 text-white/20'
                                    }`}>
                                        {completed ? <span className="material-symbols-outlined text-sm font-black">check</span> : i + 1}
                                    </div>
                                    <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] transition-all duration-500 text-center ${active ? 'text-[#b8960c]' : 'text-white/20'}`}>{s.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </nav>
            )}

            {/* Form Container */}
            <section className="max-w-6xl mx-auto px-6 relative z-10">
                <div ref={formRef} className="max-w-2xl mx-auto bg-white/[0.03] backdrop-blur-xl p-8 md:p-16 rounded-[2.5rem] border border-white/10 shadow-3xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>

                    {/* FASE 1: DATOS */}
                    {step === 'datos' && (
                        <div className="relative z-10">
                            <header className="mb-12">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b8960c]/50 block mb-4 px-1">Paso 01</span>
                                <h2 className="font-serif text-4xl md:text-5xl italic tracking-tighter leading-none mb-6">Información <br /><span className="text-white/30">de Contacto</span></h2>
                            </header>
                            <div className="space-y-8">
                                {[
                                    { id: 'nombre', label: 'Nombre Completo', placeholder: 'Ej: Juan Pérez', type: 'text', icon: 'person' },
                                    { id: 'telefono', label: 'WhatsApp de Contacto', placeholder: '+56 9 ...', type: 'tel', icon: 'call' },
                                    { id: 'email', label: 'Correo Electrónico', placeholder: 'ejemplo@correo.com', type: 'email', icon: 'mail' },
                                    { id: 'comuna', label: 'Comuna de Residencia', placeholder: 'Ej: Providencia', type: 'text', icon: 'location_on' },
                                ].map(f => (
                                    <div key={f.id} className="group relative">
                                        <label className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30 block mb-4 ml-2 group-focus-within:text-[#b8960c] transition-colors">{f.label}</label>
                                        <div className="relative">
                                            <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-[#b8960c]/50 transition-colors text-xl">{f.icon}</span>
                                            <input
                                                className="w-full bg-white/[0.04] border border-white/5 rounded-2xl py-6 pl-16 pr-8 text-white placeholder-white/10 outline-none focus:bg-white/[0.06] focus:border-[#b8960c]/50 transition-all text-lg font-light shadow-inner"
                                                placeholder={f.placeholder}
                                                type={f.type}
                                                value={form[f.id as keyof FormData]}
                                                onChange={e => update(f.id as keyof FormData, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setStep('servicio')}
                                    disabled={!canContinueDatos}
                                    className="w-full bg-[#b8960c] text-[#0a0a0a] py-6 rounded-full font-black uppercase tracking-[0.5em] text-[11px] hover:bg-[#d4af37] hover:scale-[1.02] transition-all duration-300 disabled:opacity-30 mt-12 shadow-xl shadow-[#b8960c]/20 flex items-center justify-center gap-4"
                                >
                                    Siguiente Paso
                                    <span className="material-symbols-outlined text-lg animate-bounce-x">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* FASE 2: SERVICIO */}
                    {step === 'servicio' && (
                        <div className="relative z-10">
                            <header className="mb-12">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b8960c]/50 block mb-4 px-1">Paso 02</span>
                                <h2 className="font-serif text-4xl md:text-5xl italic tracking-tighter leading-none mb-6">Tipo de <br /><span className="text-white/30">Servicio</span></h2>
                            </header>
                            <div className="grid grid-cols-1 gap-5">
                                {SERVICIOS.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => update('servicio', s.id)}
                                        className={`w-full text-left p-8 rounded-3xl border transition-all duration-500 group relative overflow-hidden ${
                                            form.servicio === s.id ? 'border-[#b8960c] bg-[#b8960c]/10' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'
                                        }`}
                                    >
                                        <div className="flex items-center gap-8 relative z-10">
                                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                                                form.servicio === s.id ? 'bg-[#b8960c] text-[#0a0a0a]' : 'bg-white/5 text-white/30'
                                            }`}>
                                                <span className="material-symbols-outlined text-3xl">{s.icono}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`text-xl font-serif italic tracking-tight mb-2 ${form.servicio === s.id ? 'text-[#b8960c]' : 'text-white'}`}>{s.titulo}</h4>
                                                <p className="text-sm font-light italic leading-relaxed text-white/40">{s.desc}</p>
                                            </div>
                                            {form.servicio === s.id && <span className="material-symbols-outlined text-[#b8960c] scale-125">check_circle</span>}
                                        </div>
                                    </button>
                                ))}
                                <div className="flex gap-4 mt-12">
                                    <button onClick={() => setStep('datos')} className="flex-1 border border-white/10 py-5 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-white/10 transition-all text-white/50">Atrás</button>
                                    <button
                                        onClick={() => setStep('plan')}
                                        disabled={!canContinueServicio}
                                        className="flex-[2] bg-[#b8960c] text-[#0a0a0a] py-5 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#d4af37] transition-all disabled:opacity-30 shadow-lg shadow-[#b8960c]/20"
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FASE 3: PLAN */}
                    {step === 'plan' && (
                        <div className="relative z-10">
                            <header className="mb-12">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b8960c]/50 block mb-4 px-1">Paso 03</span>
                                <h2 className="font-serif text-4xl md:text-5xl italic tracking-tighter leading-none mb-6">Plan de <br /><span className="text-white/30">Homenaje</span></h2>
                            </header>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {PLANES.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => update('plan', p.id)}
                                        className={`p-8 rounded-3xl border text-center transition-all duration-500 relative flex flex-col items-center justify-center gap-3 ${
                                            form.plan === p.id ? 'border-[#b8960c] bg-[#b8960c]/10 scale-[1.02] shadow-xl shadow-[#b8960c]/10' : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.05]'
                                        }`}
                                    >
                                        {p.destacado && <span className="text-[8px] font-black uppercase tracking-[0.3em] bg-[#b8960c] text-[#0a0a0a] px-3 py-1 rounded-full absolute -top-3">Más Solicitado</span>}
                                        <h4 className={`text-2xl font-serif italic tracking-tight ${form.plan === p.id ? 'text-[#b8960c]' : 'text-white'}`}>{p.nombre}</h4>
                                        <p className="text-xs font-bold tracking-[0.2em] text-white/30">{formatter.format(p.precio)}</p>
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-4 mt-12">
                                <button onClick={() => setStep('servicio')} className="flex-1 border border-white/10 py-5 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-white/10 transition-all text-white/50">Atrás</button>
                                <button
                                    onClick={() => setStep('resumen')}
                                    disabled={!canContinuePlan}
                                    className="flex-[2] bg-[#b8960c] text-[#0a0a0a] py-5 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#d4af37] transition-all disabled:opacity-30 shadow-lg shadow-[#b8960c]/20"
                                >
                                    Ver Resumen
                                </button>
                            </div>
                        </div>
                    )}

                    {/* FASE 4: RESUMEN */}
                    {step === 'resumen' && (
                        <div className="relative z-10">
                            <header className="mb-12">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b8960c]/50 block mb-4 px-1">Paso 04</span>
                                <h2 className="font-serif text-4xl md:text-5xl italic tracking-tighter leading-none mb-6">Resumen <br /><span className="text-white/30">del Presupuesto</span></h2>
                            </header>

                            <div className="bg-white/[0.02] rounded-3xl p-8 border border-white/5 mb-10 space-y-8">
                                <div className="flex justify-between items-start border-b border-white/5 pb-6">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-[#b8960c] block mb-2">Plan Seleccionado</span>
                                        <p className="text-3xl font-serif italic text-white tracking-tight">{planSelected?.nombre}</p>
                                    </div>
                                    <p className="text-2xl font-serif italic text-white">{formatter.format(planSelected?.precio || 0)}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm italic text-white/40">
                                        <span>Servicio</span>
                                        <span className="text-white">{svcSelected?.titulo}</span>
                                    </div>
                                    <div className="flex justify-between text-sm italic text-white/40">
                                        <span>IVA (19%)</span>
                                        <span className="text-white">{formatter.format((planSelected?.precio || 0) * 0.19)}</span>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-[#b8960c]/20 flex justify-between items-center">
                                    <span className="text-lg font-serif italic text-[#b8960c]">Total Inversión</span>
                                    <p className="text-5xl font-serif italic text-white tracking-tighter silver-text">{formatter.format(planSelected?.precio || 0)}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-[#b8960c] text-[#0a0a0a] py-8 rounded-full font-black uppercase tracking-[0.6em] text-[12px] hover:bg-[#d4af37] transition-all duration-300 shadow-2xl shadow-[#b8960c]/30 flex items-center justify-center gap-4 group"
                                >
                                    {loading ? 'Procesando...' : 'Confirmar Solicitud'}
                                    <span className="material-symbols-outlined text-xl group-hover:translate-x-2 transition-transform">verified</span>
                                </button>
                                <button onClick={() => setStep('plan')} className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] hover:text-[#b8960c] transition-all py-4">Editar Datos</button>
                            </div>
                        </div>
                    )}

                    {/* CONFIRMACIÓN */}
                    {step === 'enviado' && (
                        <div className="text-center py-10 relative z-10">
                            <div className="w-24 h-24 bg-[#b8960c] rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-[#b8960c]/40">
                                <span className="material-symbols-outlined text-5xl text-[#0a0a0a] font-bold">check</span>
                            </div>
                            <h2 className="font-serif text-5xl mb-6 italic tracking-tighter silver-text">Solicitud Enviada</h2>
                            <p className="text-lg text-white/40 font-light leading-relaxed mb-12 italic max-w-sm mx-auto">
                                Hemos recibido su solicitud. Un asesor especializado la revisará de inmediato para brindarle la mejor atención.
                            </p>

                            <div className="grid grid-cols-1 gap-5 max-w-sm mx-auto">
                                <a
                                    href={`https://wa.me/${WA_NUMBER}?text=${buildWhatsAppMsg(form)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-[#25D366] text-white py-6 rounded-full font-black uppercase tracking-[0.4em] text-[11px] hover:brightness-110 transition-all flex items-center justify-center gap-4 shadow-xl"
                                >
                                    <i className="fab fa-whatsapp text-xl"></i>
                                    Atención WhatsApp
                                </a>
                                <Link
                                    href="/"
                                    className="block text-white/30 text-[10px] font-black uppercase tracking-[0.4em] hover:text-white transition-all py-4"
                                >
                                    Volver al Inicio
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
