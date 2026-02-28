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
        { id: 'datos', label: 'Identidad' },
        { id: 'servicio', label: 'Selección' },
        { id: 'plan', label: 'Tributo' },
        { id: 'resumen', label: 'Confirmación' },
    ];

    return (
        <main className="min-h-screen bg-black text-white font-display pt-32 pb-24 selection:bg-white/10 antialiased">

            {/* Header - Editorial Style */}
            <section className="max-w-4xl mx-auto px-6 text-center mb-24">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block mb-6">Proyecciones de Despedida</span>
                <h1 className="font-serif text-5xl md:text-8xl text-white mb-8 italic">Configurador Personal</h1>
                <p className="text-white/50 text-xl font-light italic italic">"Diseñe un homenaje a la altura de una vida extraordinaria."</p>
                <div className="w-16 h-px bg-white/20 mx-auto mt-16"></div>
            </section>

            {/* Stepper Stitch Style (Refined for Dark) */}
            {step !== 'enviado' && (
                <nav className="max-w-3xl mx-auto px-6 mb-32 relative" aria-label="Progreso de cotización">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 -z-10"></div>
                    <div className="flex justify-between">
                        {steps.map((s, i) => {
                            const active = s.id === step;
                            const currentIdx = steps.findIndex(st => st.id === step);
                            const completed = currentIdx > i;
                            return (
                                <div key={s.id} className="flex flex-col items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-700 ${active ? 'bg-white border-white text-black scale-110 shadow-3xl shadow-white/20' :
                                        completed ? 'bg-white/10 border-white/20 text-white' : 'bg-black border-white/5 text-white/10'
                                        }`}>
                                        {completed ? <span className="material-symbols-outlined text-sm">check</span> : i + 1}
                                    </div>
                                    <span className={`text-[9px] font-black uppercase tracking-[0.3em] transition-colors duration-500 ${active ? 'text-white' : 'text-white/20'}`}>{s.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </nav>
            )}

            <section className="max-w-5xl mx-auto px-6">
                <div className="max-w-2xl mx-auto bg-white/[0.02] p-12 md:p-16 rounded-[4rem] border border-white/5 shadow-3xl shadow-black">

                    {/* PASO 1: DATOS */}
                    {step === 'datos' && (
                        <div className="animate-fade-in">
                            <h2 className="font-serif text-4xl mb-12 italic">Identidad Personal</h2>
                            <div className="space-y-10">
                                {[
                                    { id: 'nombre', label: 'Nombre Completo', placeholder: 'Ingrese su nombre', type: 'text' },
                                    { id: 'telefono', label: 'Comunicación Móvil', placeholder: '+56 9 ...', type: 'tel' },
                                    { id: 'email', label: 'Correo de Contacto', placeholder: 'email@ejemplo.com', type: 'email' },
                                    { id: 'comuna', label: 'Comuna / Localidad', placeholder: 'Ej: Las Condes', type: 'text' },
                                ].map(f => (
                                    <div key={f.id} className="group">
                                        <label className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30 block mb-4 ml-1 group-focus-within:text-white transition-colors">{f.label}</label>
                                        <input
                                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 px-8 text-white placeholder-white/10 outline-none focus:bg-white/[0.06] focus:border-white/20 transition-all text-lg font-light shadow-inner"
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
                                    className="w-full bg-white text-black py-7 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-slate-200 transition-all disabled:opacity-5 mt-12 shadow-2xl shadow-white/5"
                                >
                                    Siguiente Fase
                                </button>
                            </div>
                        </div>
                    )}

                    {/* PASO 2: SERVICIO */}
                    {step === 'servicio' && (
                        <div className="animate-fade-in">
                            <h2 className="font-serif text-4xl mb-12 italic">Selección de Ritual</h2>
                            <div className="space-y-6">
                                {SERVICIOS.map(s => (
                                    <button
                                        key={s.id}
                                        onClick={() => update('servicio', s.id)}
                                        className={`w-full text-left p-8 rounded-[2.5rem] border transition-all duration-500 group ${form.servicio === s.id ? 'border-white bg-white text-black shadow-3xl shadow-white/10' : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                                            }`}
                                    >
                                        <div className="flex items-center gap-8">
                                            <span className={`material-symbols-outlined text-5xl transition-all duration-700 ${form.servicio === s.id ? 'text-black scale-110' : 'text-white/10 group-hover:text-white/40'}`}>{s.icono}</span>
                                            <div>
                                                <h4 className={`text-2xl font-serif mb-2 italic ${form.servicio === s.id ? 'text-black' : 'text-white'}`}>{s.titulo}</h4>
                                                <p className={`text-sm font-light leading-relaxed ${form.servicio === s.id ? 'text-black/60' : 'text-white/40'}`}>{s.desc}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                                <div className="flex gap-6 mt-16">
                                    <button onClick={() => setStep('datos')} className="flex-1 border border-white/10 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[9px] hover:bg-white/5 transition-all">Regresar</button>
                                    <button
                                        onClick={() => setStep('plan')}
                                        disabled={!canContinueServicio}
                                        className="flex-[2] bg-white text-black py-6 rounded-full font-black uppercase tracking-[0.3em] text-[9px] hover:bg-slate-200 transition-all disabled:opacity-5"
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
                            <h2 className="font-serif text-4xl mb-12 italic">Nivel de Tributo</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {PLANES.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => update('plan', p.id)}
                                        className={`p-10 rounded-[2.5rem] border text-center transition-all duration-500 relative overflow-hidden group ${form.plan === p.id ? 'border-white bg-white text-black shadow-3xl shadow-white/10' : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                                            }`}
                                    >
                                        {p.popular && <span className={`text-[8px] font-black uppercase tracking-[0.4em] block mb-4 ${form.plan === p.id ? 'text-black/40' : 'text-amber-500/60'}`}>Recomendado</span>}
                                        <h4 className={`text-2xl font-serif mb-4 italic ${form.plan === p.id ? 'text-black' : 'text-white'}`}>{p.nombre}</h4>
                                        <p className={`text-xs font-black tracking-[0.2em] uppercase ${form.plan === p.id ? 'text-black/40' : 'text-white/20'}`}>{formatter.format(p.precio)}</p>
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-6 mt-16">
                                <button onClick={() => setStep('servicio')} className="flex-1 border border-white/10 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[9px] hover:bg-white/5 transition-all">Regresar</button>
                                <button
                                    onClick={() => setStep('resumen')}
                                    disabled={!canContinuePlan}
                                    className="flex-[2] bg-white text-black py-6 rounded-full font-black uppercase tracking-[0.3em] text-[9px] hover:bg-slate-200 transition-all disabled:opacity-5"
                                >
                                    Ver Detalle Final
                                </button>
                            </div>
                        </div>
                    )}

                    {/* PASO 4: RESUMEN */}
                    {step === 'resumen' && (
                        <div className="animate-fade-in">
                            <h2 className="font-serif text-4xl mb-12 italic leading-tight">Presupuesto de Honor</h2>

                            <div className="space-y-10 mb-16 border-b border-white/5 pb-12">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 block mb-4">Selección Curada</span>
                                        <p className="text-3xl font-serif italic mb-2">Plan {planSelected?.nombre}</p>
                                        <p className="text-lg font-light text-white/50">{svcSelected?.titulo}</p>
                                    </div>
                                    <p className="text-3xl font-serif italic text-white">{formatter.format(planSelected?.precio || 0)}</p>
                                </div>

                                <div className="space-y-5 pt-8 border-t border-white/5">
                                    <div className="flex justify-between text-sm font-light text-white/40">
                                        <span>Valor Neto Base</span>
                                        <span className="font-mono">{formatter.format((planSelected?.precio || 0) * 0.81)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-light text-white/40">
                                        <span>Impuesto al Valor (19%)</span>
                                        <span className="font-mono">{formatter.format((planSelected?.precio || 0) * 0.19)}</span>
                                    </div>
                                    <div className="flex justify-between items-end pt-8 mt-4 border-t border-white/10">
                                        <span className="text-xl font-serif italic">Inversión Final</span>
                                        <span className="text-5xl font-serif italic text-white">{formatter.format(planSelected?.precio || 0)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-white text-black py-7 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-slate-200 transition-all shadow-3xl shadow-white/5 flex items-center justify-center gap-5"
                                >
                                    {loading ? 'Transmitiendo...' : 'Procesar Solicitud'}
                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                                <button onClick={() => setStep('plan')} className="text-white/30 text-[9px] font-black uppercase tracking-[0.4em] hover:text-white transition-colors py-4">Editar Parámetros</button>
                            </div>
                        </div>
                    )}

                    {/* CONFIRMACIÓN */}
                    {step === 'enviado' && (
                        <div className="text-center py-16 animate-fade-in">
                            <div className="w-28 h-28 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-12 shadow-3xl shadow-white/5">
                                <span className="material-symbols-outlined text-6xl text-white">done_all</span>
                            </div>
                            <h2 className="font-serif text-5xl mb-8 italic">Misión Recibida</h2>
                            <p className="text-xl text-white/40 font-light leading-relaxed mb-16 italic italic">
                                "Su solicitud ha sido integrada a nuestro protocolo prioritario. Un asesor senior se comunicará a la brevedad."
                            </p>

                            <div className="space-y-6">
                                <a
                                    href={`https://wa.me/${WA_NUMBER}?text=${buildWhatsAppMsg(form)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-white text-black py-7 rounded-full font-black uppercase tracking-[0.4em] text-[10px] hover:bg-slate-200 transition-all shadow-3xl shadow-white/5 flex items-center justify-center gap-4"
                                >
                                    WhatsApp Prioritario
                                </a>
                                <Link
                                    href="/"
                                    className="block text-white/20 text-[9px] font-black uppercase tracking-[0.4em] hover:text-white pt-8 transition-colors"
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
