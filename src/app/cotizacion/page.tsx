'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';
import gsap from 'gsap';

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '56964333760';

const PLANES = [
    { id: 'margarita', nombre: 'Margarita', precio: 970000 },
    { id: 'azucena', nombre: 'Azucena', precio: 1360000 },
    { id: 'rosal', nombre: 'Rosal Abelia', precio: 1750000 },
    { id: 'acacia', nombre: 'Acacia', precio: 2250000 },
    { id: 'quillay', nombre: 'Quillay', precio: 2390000 },
    { id: 'queule', nombre: 'Queule', precio: 2990000 },
    { id: 'raul', nombre: 'Raúl', precio: 3590000, popular: true },
];

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
        // Step transition animation
        if (formRef.current) {
            gsap.fromTo(formRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }
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
        { id: 'servicio', label: 'Servicio' },
        { id: 'plan', label: 'Tributo' },
        { id: 'resumen', label: 'Resumen' },
    ];

    return (
        <main className="min-h-screen bg-black text-white font-display pt-32 pb-48 selection:bg-white/10 antialiased overflow-x-hidden">

            {/* Header - Editorial Style */}
            <section className="max-w-4xl mx-auto px-6 text-center mb-32">
                <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/30 block mb-10">Proyecciones de Honor</span>
                <h1 className="font-serif text-6xl md:text-9xl text-white mb-12 italic leading-[0.85] tracking-tighter">Configurador <br /> <span className="text-white/30">Personal</span></h1>
                <p className="text-white/40 text-2xl font-light italic max-w-2xl mx-auto border-x border-white/5 px-12 leading-relaxed">
                    "Diseñe el tributo que el legado de su familia merece, con la serenata y el respeto de la mayor distinción."
                </p>
                <div className="w-24 h-px bg-white/10 mx-auto mt-20"></div>
            </section>

            {/* Stepper Premium */}
            {step !== 'enviado' && (
                <nav className="max-w-4xl mx-auto px-6 mb-48 relative" aria-label="Progreso de cotización">
                    <div className="absolute top-6 left-0 w-full h-px bg-white/5 -z-10"></div>
                    <div className="flex justify-between relative px-2 md:px-12">
                        {steps.map((s, i) => {
                            const active = s.id === step;
                            const currentIdx = steps.findIndex(st => st.id === step);
                            const completed = currentIdx > i;
                            return (
                                <div key={s.id} className="flex flex-col items-center gap-6 group">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-1000 relative ${active ? 'bg-white border-white text-black scale-110 shadow-[0_0_40px_rgba(255,255,255,0.2)]' :
                                        completed ? 'bg-zinc-900 border-white/20 text-white' : 'bg-black border-white/5 text-white/10'
                                        }`}>
                                        {completed ? <span className="material-symbols-outlined text-sm font-black">check</span> : i + 1}
                                        {active && <div className="absolute inset-[-10px] border border-white/10 rounded-full animate-ping-slow"></div>}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-1000 ${active ? 'text-white' : 'text-white/10 group-hover:text-white/30'}`}>{s.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </nav>
            )}

            <section className="max-w-6xl mx-auto px-6 relative">
                <div ref={formRef} className="max-w-2xl mx-auto bg-white/[0.01] p-12 md:p-20 rounded-[5rem] border border-white/5 shadow-4xl backdrop-blur-3xl relative overflow-hidden group">
                    <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-amber-500/5 transition-colors duration-[2s]"></div>

                    {/* PASO 1: DATOS */}
                    {step === 'datos' && (
                        <div>
                            <header className="mb-16">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 block mb-6 px-1">Fase 01</span>
                                <h2 className="font-serif text-5xl italic tracking-tighter leading-none mb-10">Identidad <br /><span className="text-white/30">del Solicitante</span></h2>
                            </header>
                            <div className="space-y-12">
                                {[
                                    { id: 'nombre', label: 'Nombre Completo', placeholder: 'Ingrese su nombre', type: 'text' },
                                    { id: 'telefono', label: 'Comunicación Móvil', placeholder: '+56 9 ...', type: 'tel' },
                                    { id: 'email', label: 'Correo Electrónico', placeholder: 'email@ejemplo.com', type: 'email' },
                                    { id: 'comuna', label: 'Ubicación / Comuna', placeholder: 'Ej: Las Condes', type: 'text' },
                                ].map(f => (
                                    <div key={f.id} className="group relative">
                                        <label className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20 block mb-6 ml-2 transition-all duration-700 group-focus-within:text-white group-focus-within:translate-x-2">{f.label}</label>
                                        <input
                                            className="w-full bg-white/[0.02] border border-white/5 rounded-[2rem] py-8 px-10 text-white placeholder-white/5 outline-none focus:bg-white/[0.04] focus:border-white/20 transition-all text-xl font-light italic shadow-inner selection:bg-white/10"
                                            placeholder={f.placeholder}
                                            type={f.type}
                                            value={form[f.id as keyof FormData]}
                                            onChange={e => update(f.id as keyof FormData, e.target.value)}
                                        />
                                    </div>
                                ))}
                                <button
                                    onClick={() => setStep('servicio')}
                                    disabled={!canContinueDatos}
                                    className="w-full bg-white text-black py-10 rounded-full font-black uppercase tracking-[0.6em] text-[11px] hover:bg-zinc-200 transition-all duration-700 disabled:opacity-5 mt-16 shadow-3xl overflow-hidden relative group"
                                >
                                    <span className="relative z-10 italic">Avanzar al Ritual</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* PASO 2: SERVICIO */}
                    {step === 'servicio' && (
                        <div>
                            <header className="mb-16">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 block mb-6 px-1">Fase 02</span>
                                <h2 className="font-serif text-5xl italic tracking-tighter leading-none mb-10">Selección <br /><span className="text-white/30">del Ritual</span></h2>
                            </header>
                            <div className="grid grid-cols-1 gap-8">
                                {SERVICIOS.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => update('servicio', s.id)}
                                        className={`w-full text-left p-10 rounded-[3.5rem] border transition-all duration-1000 group relative overflow-hidden ${form.servicio === s.id ? 'border-white bg-white text-black shadow-4xl scale-[1.02]' : 'border-white/5 bg-white/[0.01] hover:border-white/20'
                                            }`}
                                    >
                                        <div className="flex items-center gap-10 relative z-10">
                                            <span className={`material-symbols-outlined text-6xl transition-all duration-1000 ${form.servicio === s.id ? 'text-black scale-110' : 'text-white/10 group-hover:text-amber-500/50'}`}>{s.icono}</span>
                                            <div>
                                                <h4 className={`text-3xl font-serif mb-3 italic tracking-tighter leading-none ${form.servicio === s.id ? 'text-black' : 'text-white'}`}>{s.titulo}</h4>
                                                <p className={`text-base font-light italic leading-relaxed ${form.servicio === s.id ? 'text-black/60' : 'text-white/20'}`}>{s.desc}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                <div className="flex flex-col sm:flex-row gap-8 mt-16">
                                    <button onClick={() => setStep('datos')} className="flex-1 border border-white/10 py-8 rounded-full font-black uppercase tracking-[0.5em] text-[10px] hover:bg-white/5 transition-all italic">Regresar</button>
                                    <button
                                        onClick={() => setStep('plan')}
                                        disabled={!canContinueServicio}
                                        className="flex-[2] bg-white text-black py-8 rounded-full font-black uppercase tracking-[0.5em] text-[10px] hover:bg-zinc-200 transition-all duration-700 disabled:opacity-5 italic shadow-3xl"
                                    >
                                        Continuar al Tributo
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PASO 3: PLAN */}
                    {step === 'plan' && (
                        <div>
                            <header className="mb-16">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 block mb-6 px-1">Fase 03</span>
                                <h2 className="font-serif text-5xl italic tracking-tighter leading-none mb-10">Nivel de <br /><span className="text-white/30">Homenaje</span></h2>
                            </header>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {PLANES.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => update('plan', p.id)}
                                        className={`p-10 rounded-[3.5rem] border text-center transition-all duration-1000 relative overflow-hidden group ${form.plan === p.id ? 'border-white bg-white text-black shadow-4xl scale-[1.02]' : 'border-white/5 bg-white/[0.01] hover:border-white/20'
                                            }`}
                                    >
                                        {p.popular && <span className={`text-[9px] font-black uppercase tracking-[0.5em] block mb-6 ${form.plan === p.id ? 'text-black/40' : 'text-amber-500/50'}`}>Recomendado VIP</span>}
                                        <h4 className={`text-4xl font-serif mb-6 italic tracking-tighter ${form.plan === p.id ? 'text-black' : 'text-white'}`}>{p.nombre}</h4>
                                        <p className={`text-[11px] font-black tracking-[0.3em] uppercase ${form.plan === p.id ? 'text-black/30' : 'text-white/10'}`}>{formatter.format(p.precio)}</p>
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-8 mt-20">
                                <button onClick={() => setStep('servicio')} className="flex-1 border border-white/10 py-8 rounded-full font-black uppercase tracking-[0.5em] text-[10px] hover:bg-white/5 transition-all italic">Regresar</button>
                                <button
                                    onClick={() => setStep('resumen')}
                                    disabled={!canContinuePlan}
                                    className="flex-[2] bg-white text-black py-8 rounded-full font-black uppercase tracking-[0.5em] text-[10px] hover:bg-zinc-200 transition-all duration-700 disabled:opacity-5 italic shadow-3xl"
                                >
                                    Generar Presupuesto
                                </button>
                            </div>
                        </div>
                    )}

                    {/* PASO 4: RESUMEN */}
                    {step === 'resumen' && (
                        <div>
                            <header className="mb-16">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 block mb-6 px-1">Fase 04</span>
                                <h2 className="font-serif text-5xl italic tracking-tighter leading-none mb-10">Resumen <br /><span className="text-white/30">de Inversión</span></h2>
                            </header>

                            <div className="space-y-12 mb-20">
                                <div className="flex justify-between items-end border-b border-white/5 pb-12">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-6">Selección Curada</span>
                                        <p className="text-4xl font-serif italic mb-4 tracking-tighter">Plan {planSelected?.nombre}</p>
                                        <p className="text-xl font-light italic text-white/40">{svcSelected?.titulo}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-4xl font-serif italic text-white tracking-tighter">{formatter.format(planSelected?.precio || 0)}</p>
                                        <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.3em]">Total Bruto</span>
                                    </div>
                                </div>

                                <div className="space-y-8 px-4">
                                    <div className="flex justify-between text-base font-light italic text-white/30">
                                        <span>Valor Neto Base</span>
                                        <span className="font-serif tracking-widest">{formatter.format((planSelected?.precio || 0) * 0.81)}</span>
                                    </div>
                                    <div className="flex justify-between text-base font-light italic text-white/30">
                                        <span>Impuestos (IVA 19%)</span>
                                        <span className="font-serif tracking-widest">{formatter.format((planSelected?.precio || 0) * 0.19)}</span>
                                    </div>
                                    <div className="pt-12 mt-12 border-t border-white/10 flex justify-between items-baseline">
                                        <span className="text-2xl font-serif italic text-white/40">Inversión Final CLP</span>
                                        <p className="text-7xl font-serif italic text-white tracking-tighter shadow-white/5 drop-shadow-2xl">{formatter.format(planSelected?.precio || 0)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-8">
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-white text-black py-10 rounded-full font-black uppercase tracking-[0.8em] text-[11px] hover:bg-zinc-200 transition-all duration-1000 shadow-5xl group overflow-hidden relative"
                                >
                                    <div className="flex items-center justify-center gap-6 relative z-10">
                                        <span className="italic">{loading ? 'Transmitiendo...' : 'Procesar Honor'}</span>
                                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </button>
                                <button onClick={() => setStep('plan')} className="text-white/20 text-[10px] font-black uppercase tracking-[0.8em] hover:text-white transition-all py-4 italic">Editar Parámetros</button>
                            </div>
                        </div>
                    )}

                    {/* CONFIRMACIÓN */}
                    {step === 'enviado' && (
                        <div className="text-center py-20">
                            <div className="w-32 h-32 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-16 relative group">
                                <div className="absolute inset-[-15px] border border-white/5 rounded-full animate-ping-slow"></div>
                                <span className="material-symbols-outlined text-7xl text-white group-hover:scale-110 transition-transform duration-1000">done_all</span>
                            </div>
                            <h2 className="font-serif text-6xl mb-10 italic tracking-tighter">Paz Recibida</h2>
                            <p className="text-2xl text-white/30 font-light leading-relaxed mb-20 italic px-10">
                                "Su solicitud ha sido integrada a nuestro protocolo prioritario. Un asesor senior curará su caso y se comunicará a la brevedad."
                            </p>

                            <div className="space-y-10 px-8">
                                <a
                                    href={`https://wa.me/${WA_NUMBER}?text=${buildWhatsAppMsg(form)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-white text-black py-10 rounded-full font-black uppercase tracking-[0.8em] text-[11px] hover:bg-zinc-200 transition-all shadow-4xl flex items-center justify-center gap-6 group overflow-hidden relative"
                                >
                                    <span className="relative z-10">WhatsApp VIP</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                </a>
                                <Link
                                    href="/"
                                    className="block text-white/20 text-[11px] font-black uppercase tracking-[0.8em] hover:text-white pt-10 transition-all italic underline decoration-white/5 underline-offset-[20px]"
                                >
                                    Cerrar y Regresar
                                </Link>
                            </div>
                        </div>
                    )}

                </div>
            </section>

        </main>
    );
}
