'use client';

import { useState, FormEvent } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';

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
    { id: 'inhumacion', icono: 'local_florist', titulo: 'Inhumación Tradicional', desc: 'Servicio completo de sepultación con todos los honores.' },
    { id: 'cremacion', icono: 'local_fire_department', titulo: 'Cremación', desc: 'Proceso de incineración con ánfora de madera noble.' },
    { id: 'prevision', icono: 'lock', titulo: 'Previsión Anticipada', desc: 'Contrate hoy al precio vigente y proteja a su familia.' },
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
    const [docId, setDocId] = useState('');

    const update = (field: keyof FormData, val: string) =>
        setForm(prev => ({ ...prev, [field]: val }));

    const canContinueDatos = form.nombre.trim() && form.telefono.trim() && form.email.trim();
    const canContinueServicio = form.servicio !== '';
    const canContinuePlan = form.plan !== '';

    async function handleSubmit() {
        setLoading(true);
        setError('');

        try {
            const ref = await addDoc(collection(db, 'cotizaciones'), {
                ...form,
                estado: 'pendiente',
                createdAt: serverTimestamp(),
            });
            setDocId(ref.id);
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
        { id: 'datos', label: 'Datos' },
        { id: 'servicio', label: 'Selección' },
        { id: 'plan', label: 'Plan' },
        { id: 'resumen', label: 'Resumen' },
    ];

    const currentStepIndex = steps.findIndex(s => s.id === step);

    return (
        <main className="min-h-screen bg-[#f7f7f7] dark:bg-[#101622] pt-32 pb-24">

            {/* Header */}
            <section className="max-w-4xl mx-auto px-6 text-center mb-16">
                <h1 className="font-serif text-5xl md:text-6xl text-black dark:text-white mb-4">Cotización Online</h1>
                <p className="text-[#7E7D7D] text-lg font-light">Diseñe el servicio que mejor se adapte a sus deseos y presupuesto.</p>
            </section>

            {/* Stepper Stitch Style */}
            {step !== 'enviado' && (
                <div className="max-w-3xl mx-auto px-6 mb-20 relative">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-black/10 dark:bg-white/10 -translate-y-1/2 -z-10"></div>
                    <div className="flex justify-between">
                        {steps.map((s, i) => {
                            const active = s.id === step;
                            const completed = steps.findIndex(st => st.id === step) > i;
                            return (
                                <div key={s.id} className="flex flex-col items-center gap-2">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${active ? 'bg-black border-black text-white scale-110 shadow-xl shadow-black/20' :
                                            completed ? 'bg-white border-black text-black' : 'bg-white border-black/10 text-black/20'
                                        }`}>
                                        {completed ? <span className="material-symbols-outlined text-sm">check</span> : i + 1}
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${active ? 'text-black' : 'text-black/20 font-medium'}`}>{s.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <section className="max-w-5xl mx-auto px-6">
                <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900/50 p-12 rounded-[3.5rem] shadow-2xl shadow-black/[0.03] border border-black/5">

                    {/* PASO 1: DATOS */}
                    {step === 'datos' && (
                        <div className="animate-fade-in">
                            <h2 className="font-serif text-3xl mb-8 text-black dark:text-white">Información de Contacto</h2>
                            <div className="space-y-6">
                                {[
                                    { id: 'nombre', label: 'Nombre Completo', placeholder: 'Ej: Juan Pérez', type: 'text' },
                                    { id: 'telefono', label: 'WhatsApp / Teléfono', placeholder: '+56 9 ...', type: 'tel' },
                                    { id: 'email', label: 'Email', placeholder: 'juan@email.com', type: 'email' },
                                    { id: 'comuna', label: 'Comuna', placeholder: 'Ej: Providencia', type: 'text' },
                                ].map(f => (
                                    <div key={f.id}>
                                        <label className="text-[11px] uppercase tracking-[0.3em] font-bold text-black/30 dark:text-white/30 block mb-3 ml-1">{f.label}</label>
                                        <input
                                            className="w-full bg-[#fcfcfc] dark:bg-slate-800/50 border-none rounded-2xl py-4 px-6 text-black dark:text-white outline-none focus:ring-2 focus:ring-black/5 transition-all text-lg font-light"
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
                                    className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 transition-all disabled:opacity-20 mt-8 shadow-xl shadow-black/10"
                                >
                                    Siguiente Paso
                                </button>
                            </div>
                        </div>
                    )}

                    {/* PASO 2: SERVICIO */}
                    {step === 'servicio' && (
                        <div className="animate-fade-in">
                            <h2 className="font-serif text-3xl mb-8 text-black dark:text-white">Tipo de Servicio</h2>
                            <div className="space-y-4">
                                {SERVICIOS.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => update('servicio', s.id)}
                                        className={`w-full text-left p-6 rounded-3xl border-2 transition-all group ${form.servicio === s.id ? 'border-black bg-black text-white shadow-2xl' : 'border-black/5 hover:border-black/20 text-[#7E7D7D]'
                                            }`}
                                    >
                                        <div className="flex items-center gap-5">
                                            <span className={`material-symbols-outlined text-4xl ${form.servicio === s.id ? 'text-white' : 'text-black/20 group-hover:text-black transition-colors'}`}>{s.icono}</span>
                                            <div>
                                                <h4 className={`text-xl font-serif ${form.servicio === s.id ? 'text-white' : 'text-black dark:text-white'}`}>{s.titulo}</h4>
                                                <p className="text-sm font-light mt-1 opacity-70 leading-relaxed">{s.desc}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                <div className="flex gap-4 mt-12">
                                    <button onClick={() => setStep('datos')} className="flex-1 border-2 border-black/5 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-black/5 transition-all">Atrás</button>
                                    <button
                                        onClick={() => setStep('plan')}
                                        disabled={!canContinueServicio}
                                        className="flex-[2] bg-black text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 transition-all disabled:opacity-20"
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PASO 3: PLAN */}
                    {step === 'plan' && (
                        <div className="animate-fade-in">
                            <h2 className="font-serif text-3xl mb-8 text-black dark:text-white">Seleccione un Plan</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {PLANES.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => update('plan', p.id)}
                                        className={`p-6 rounded-3xl border-2 text-center transition-all ${form.plan === p.id ? 'border-black bg-black text-white shadow-xl' : 'border-black/5 hover:border-black/20 text-[#7E7D7D]'
                                            }`}
                                    >
                                        {p.popular && <span className="text-[8px] font-black uppercase tracking-widest block mb-2 opacity-50">Popular</span>}
                                        <h4 className={`text-xl font-serif ${form.plan === p.id ? 'text-white' : 'text-black dark:text-white'}`}>{p.nombre}</h4>
                                        <p className="text-xs font-bold mt-2 opacity-70 tracking-widest">{formatter.format(p.precio)}</p>
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-4 mt-12">
                                <button onClick={() => setStep('servicio')} className="flex-1 border-2 border-black/5 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-black/5 transition-all">Atrás</button>
                                <button
                                    onClick={() => setStep('resumen')}
                                    disabled={!canContinuePlan}
                                    className="flex-[2] bg-black text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 transition-all disabled:opacity-20"
                                >
                                    Ver Resumen
                                </button>
                            </div>
                        </div>
                    )}

                    {/* PASO 4: RESUMEN */}
                    {step === 'resumen' && (
                        <div className="animate-fade-in">
                            <h2 className="font-serif text-3xl mb-12 text-black dark:text-white">Resumen de Solicitud</h2>

                            <div className="space-y-8 mb-12">
                                <div className="border-b border-black/5 pb-6">
                                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-black/30 mb-4">Servicio Digital</h4>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-2xl font-serif text-black dark:text-white">{planSelected?.nombre}</p>
                                            <p className="text-sm font-light text-[#7E7D7D] mt-1">{svcSelected?.titulo}</p>
                                        </div>
                                        <p className="text-2xl font-serif text-black dark:text-white">{formatter.format(planSelected?.precio || 0)}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#7E7D7D]">Subtotal</span>
                                        <span className="text-black dark:text-white">{formatter.format((planSelected?.precio || 0) * 0.81)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-[#7E7D7D]">IVA (19%)</span>
                                        <span className="text-black dark:text-white">{formatter.format((planSelected?.precio || 0) * 0.19)}</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-4 border-t border-black/5">
                                        <span className="text-lg font-serif">Total Final</span>
                                        <span className="text-4xl font-serif text-black dark:text-white">{formatter.format(planSelected?.precio || 0)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-black text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 transition-all shadow-2xl shadow-black/20 flex items-center justify-center gap-3"
                                >
                                    {loading ? 'Procesando...' : 'Confirmar y Solicitar'}
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                                <button onClick={() => setStep('plan')} className="text-[#7E7D7D] text-xs font-bold uppercase tracking-widest hover:text-black transition-colors py-2">Volver y Editar</button>
                            </div>
                        </div>
                    )}

                    {/* CONFIRMACIÓN */}
                    {step === 'enviado' && (
                        <div className="text-center py-12 animate-fade-in">
                            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-10 shadow-3xl shadow-black/20">
                                <span className="material-symbols-outlined text-5xl text-white">check</span>
                            </div>
                            <h2 className="font-serif text-4xl mb-6 text-black dark:text-white">¡Solicitud Enviada!</h2>
                            <p className="text-lg text-[#7E7D7D] font-light leading-relaxed mb-12">
                                Hemos recibido sus datos. Un asesor especializado le contactará en los próximos minutos para formalizar su cotización.
                            </p>

                            <div className="space-y-4">
                                <a
                                    href={`https://wa.me/${WA_NUMBER}?text=${buildWhatsAppMsg(form)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-[#25D366] text-white py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:opacity-90 transition-all shadow-xl shadow-green-500/20 flex items-center justify-center gap-2"
                                >
                                    Hablar por WhatsApp Ahora
                                </a>
                                <Link
                                    href="/"
                                    className="block text-[#7E7D7D] text-[10px] font-bold uppercase tracking-widest hover:text-black pt-4"
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
