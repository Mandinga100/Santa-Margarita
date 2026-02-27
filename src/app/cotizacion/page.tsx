'use client';

import { useState, FormEvent } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER || '56964333760';

const PLANES = [
    { id: 'margarita', nombre: 'Margarita', precio: '$970.000' },
    { id: 'azucena', nombre: 'Azucena', precio: '$1.360.000' },
    { id: 'rosal', nombre: 'Rosal Abelia', precio: '$1.750.000' },
    { id: 'acacia', nombre: 'Acacia', precio: '$2.250.000' },
    { id: 'quillay', nombre: 'Quillay', precio: '$2.390.000' },
    { id: 'queule', nombre: 'Queule', precio: '$2.990.000' },
    { id: 'raul', nombre: 'Raúl', precio: '$3.590.000', popular: true },
];

const SERVICIOS = [
    { id: 'inhumacion', icono: 'local_florist', titulo: 'Inhumación Tradicional', desc: 'Servicio completo de sepultación con todos los honores y acompañamiento.' },
    { id: 'cremacion', icono: 'local_fire_department', titulo: 'Cremación', desc: 'Proceso de incineración con ánfora de madera noble incluida.' },
    { id: 'prevision', icono: 'lock', titulo: 'Previsión Anticipada', desc: 'Contrate hoy al precio vigente y proteja a su familia del futuro.' },
];

type Step = 'datos' | 'servicio' | 'plan' | 'enviado';

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
        `📋 *Plan:* ${plan ? `${plan.nombre} (${plan.precio})` : data.plan}`,
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

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!canContinuePlan) return;
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

    function resetForm() {
        setForm(INITIAL);
        setStep('datos');
        setDocId('');
        setError('');
    }

    const stepIndex: Record<Step, number> = { datos: 0, servicio: 1, plan: 2, enviado: 3 };

    return (
        <main className="min-h-screen bg-white dark:bg-black">
            {/* Hero */}
            <section className="bg-black text-white px-6 pt-16 pb-14">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 block mb-4">
                        Cotización en línea
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
                        Reciba una cotización personalizada
                    </h1>
                    <p className="text-white/60 text-base font-light max-w-xl mx-auto">
                        Complete el formulario y un asesor le contactará a la brevedad.
                        Sin compromiso, sin letra pequeña.
                    </p>
                </div>
            </section>

            {/* Stepper */}
            {step !== 'enviado' && (
                <div className="bg-[#F2F2F2] dark:bg-zinc-900 border-b border-black/5 dark:border-white/5 py-4 px-6">
                    <div className="max-w-xl mx-auto flex items-center justify-center gap-2">
                        {(['datos', 'servicio', 'plan'] as const).map((s, i) => {
                            const labels = ['Sus datos', 'Tipo de servicio', 'Elija un plan'];
                            const current = stepIndex[step];
                            const done = i < current;
                            const active = i === current;
                            return (
                                <div key={s} className="flex items-center gap-2">
                                    <div className={`flex items-center gap-2 ${active ? 'opacity-100' : done ? 'opacity-70' : 'opacity-30'}`}>
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${active ? 'bg-black text-white dark:bg-white dark:text-black' : done ? 'bg-black/20 text-black dark:bg-white/20 dark:text-white' : 'bg-black/10 text-black/40 dark:bg-white/10 dark:text-white/40'}`}>
                                            {done ? <span className="material-symbols-outlined text-[14px]">check</span> : i + 1}
                                        </div>
                                        <span className="text-xs font-bold hidden sm:block text-black dark:text-white">{labels[i]}</span>
                                    </div>
                                    {i < 2 && <div className="w-6 h-px bg-black/20 dark:bg-white/20 mx-1" />}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Form */}
            <section className="max-w-2xl mx-auto px-6 py-14">
                {/* PASO 1 — DATOS */}
                {step === 'datos' && (
                    <form className="space-y-5" onSubmit={e => { e.preventDefault(); if (canContinueDatos) setStep('servicio'); }}>
                        <div>
                            <h2 className="font-serif text-2xl font-semibold text-black dark:text-white mb-1">Sus datos de contacto</h2>
                            <p className="text-sm text-[#7E7D7D] mb-6">Le contactaremos únicamente para enviarle su cotización.</p>
                        </div>

                        {[
                            { id: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'Ej: María González', icon: 'person' },
                            { id: 'telefono', label: 'Teléfono de contacto', type: 'tel', placeholder: '+56 9 ...', icon: 'phone' },
                            { id: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'correo@ejemplo.com', icon: 'mail' },
                            { id: 'comuna', label: 'Comuna de requerimiento', type: 'text', placeholder: 'Ej: Santiago Centro', icon: 'location_on' },
                        ].map(f => (
                            <div key={f.id}>
                                <label className="block text-sm font-semibold text-black dark:text-white mb-1.5">{f.label}</label>
                                <div className="relative">
                                    <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#7E7D7D]">{f.icon}</span>
                                    <input
                                        type={f.type}
                                        placeholder={f.placeholder}
                                        value={form[f.id as keyof FormData]}
                                        onChange={e => update(f.id as keyof FormData, e.target.value)}
                                        required={['nombre', 'telefono', 'email'].includes(f.id)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-[#F9F9F9] dark:bg-zinc-900 text-black dark:text-white placeholder:text-[#7E7D7D] focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow text-sm"
                                    />
                                </div>
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={!canContinueDatos}
                            className="w-full mt-2 flex items-center justify-center gap-3 bg-black text-white dark:bg-white dark:text-black px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:opacity-80 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            Continuar
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                    </form>
                )}

                {/* PASO 2 — SERVICIO */}
                {step === 'servicio' && (
                    <div>
                        <h2 className="font-serif text-2xl font-semibold text-black dark:text-white mb-1">¿Qué tipo de servicio necesita?</h2>
                        <p className="text-sm text-[#7E7D7D] mb-6">Puede cambiar su elección más adelante.</p>

                        <div className="space-y-3 mb-8">
                            {SERVICIOS.map(s => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => update('servicio', s.id)}
                                    className={`w-full text-left flex items-start gap-4 p-5 rounded-2xl border transition-all ${form.servicio === s.id
                                        ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black'
                                        : 'border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-black dark:text-white hover:border-black/30 dark:hover:border-white/30'
                                        }`}
                                >
                                    <span className={`material-symbols-outlined text-[26px] mt-0.5 flex-shrink-0 ${form.servicio === s.id ? 'text-white dark:text-black' : 'text-[#7E7D7D]'}`}>{s.icono}</span>
                                    <div>
                                        <p className="font-bold text-sm">{s.titulo}</p>
                                        <p className={`text-xs mt-1 leading-relaxed ${form.servicio === s.id ? 'text-white/70 dark:text-black/70' : 'text-[#7E7D7D]'}`}>{s.desc}</p>
                                    </div>
                                    {form.servicio === s.id && (
                                        <span className="material-symbols-outlined text-[20px] ml-auto flex-shrink-0 text-white dark:text-black">check_circle</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setStep('datos')}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-black/20 dark:border-white/20 text-black dark:text-white text-sm font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                Atrás
                            </button>
                            <button
                                type="button"
                                disabled={!canContinueServicio}
                                onClick={() => setStep('plan')}
                                className="flex-1 flex items-center justify-center gap-3 bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:opacity-80 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Continuar
                                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* PASO 3 — PLAN */}
                {step === 'plan' && (
                    <form onSubmit={handleSubmit}>
                        <h2 className="font-serif text-2xl font-semibold text-black dark:text-white mb-1">Seleccione un plan de referencia</h2>
                        <p className="text-sm text-[#7E7D7D] mb-6">El precio es referencial; el asesor le confirmará el valor final.</p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                            {PLANES.map(p => (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => update('plan', p.id)}
                                    className={`relative p-4 rounded-xl border text-center transition-all hover:-translate-y-0.5 ${form.plan === p.id
                                        ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black shadow-lg'
                                        : 'border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-black dark:text-white hover:border-black/30 dark:hover:border-white/30'
                                        }`}
                                >
                                    {p.popular && (
                                        <span className={`text-[9px] font-bold uppercase tracking-wider block mb-1 ${form.plan === p.id ? 'text-white/60 dark:text-black/60' : 'text-[#7E7D7D]'}`}>
                                            ★ Popular
                                        </span>
                                    )}
                                    <p className="font-serif font-bold text-base">{p.nombre}</p>
                                    <p className={`text-[11px] font-black mt-1 ${form.plan === p.id ? 'text-white/70 dark:text-black/70' : 'text-[#7E7D7D]'}`}>{p.precio}</p>
                                    {form.plan === p.id && (
                                        <span className="material-symbols-outlined text-[16px] absolute top-2 right-2 text-white dark:text-black">check_circle</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {error && (
                            <p className="text-red-600 text-sm mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px]">error</span>
                                {error}
                            </p>
                        )}

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setStep('servicio')}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-black/20 dark:border-white/20 text-black dark:text-white text-sm font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                                Atrás
                            </button>
                            <button
                                type="submit"
                                disabled={!canContinuePlan || loading}
                                className="flex-1 flex items-center justify-center gap-3 bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:opacity-80 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <span className="animate-spin material-symbols-outlined text-[18px]">progress_activity</span>
                                        Enviando…
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[18px]">send</span>
                                        Solicitar cotización
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}

                {/* CONFIRMACIÓN */}
                {step === 'enviado' && (
                    <div className="text-center py-8">
                        <span className="material-symbols-outlined text-5xl text-black/20 dark:text-white/20 block mb-6">check_circle</span>
                        <h2 className="font-serif text-3xl font-semibold text-black dark:text-white mb-3">
                            Solicitud recibida
                        </h2>
                        <p className="text-[#7E7D7D] text-base mb-2 max-w-sm mx-auto leading-relaxed">
                            Su cotización ha sido registrada exitosamente. Un asesor le contactará a la brevedad.
                        </p>
                        {docId && (
                            <p className="text-xs text-black/30 dark:text-white/30 mb-8">
                                Referencia: <span className="font-mono">{docId.slice(0, 12)}…</span>
                            </p>
                        )}

                        {/* Contacto inmediato por WhatsApp */}
                        <div className="bg-[#F2F2F2] dark:bg-zinc-900 rounded-2xl p-6 mb-8 max-w-sm mx-auto">
                            <p className="text-sm font-semibold text-black dark:text-white mb-1">¿Necesita atención inmediata?</p>
                            <p className="text-xs text-[#7E7D7D] mb-4">Escríbanos directamente con los detalles de su solicitud.</p>
                            <a
                                href={`https://wa.me/${WA_NUMBER}?text=${buildWhatsAppMsg(form)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-6 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest hover:opacity-90 transition-opacity w-full"
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Contactar por WhatsApp
                            </a>
                        </div>

                        <button
                            type="button"
                            onClick={resetForm}
                            className="text-sm text-[#7E7D7D] hover:text-black dark:hover:text-white transition-colors underline underline-offset-4"
                        >
                            Realizar otra cotización
                        </button>
                    </div>
                )}
            </section>

            {/* Info adicional */}
            {step !== 'enviado' && (
                <div className="bg-[#F2F2F2] dark:bg-zinc-900/50 py-10 px-6">
                    <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-6 text-center sm:text-left">
                        <div className="flex-1 flex gap-4 items-start">
                            <span className="material-symbols-outlined text-[24px] text-black/30 dark:text-white/30 flex-shrink-0">shield</span>
                            <div>
                                <p className="font-bold text-sm text-black dark:text-white">Sin compromiso</p>
                                <p className="text-xs text-[#7E7D7D] mt-0.5">Puede cancelar o modificar en cualquier momento antes de firmar.</p>
                            </div>
                        </div>
                        <div className="flex-1 flex gap-4 items-start">
                            <span className="material-symbols-outlined text-[24px] text-black/30 dark:text-white/30 flex-shrink-0">schedule</span>
                            <div>
                                <p className="font-bold text-sm text-black dark:text-white">Respuesta en &lt; 2 horas</p>
                                <p className="text-xs text-[#7E7D7D] mt-0.5">Nuestro equipo responde en horario extendido todos los días.</p>
                            </div>
                        </div>
                        <div className="flex-1 flex gap-4 items-start">
                            <span className="material-symbols-outlined text-[24px] text-black/30 dark:text-white/30 flex-shrink-0">lock</span>
                            <div>
                                <p className="font-bold text-sm text-black dark:text-white">Datos protegidos</p>
                                <p className="text-xs text-[#7E7D7D] mt-0.5">Su información es almacenada de forma segura y no compartida.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
