'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { sendEmailWithTemplate } from '@/lib/emailjs';

export default function ContactoPage() {
    const formRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({ nombre: '', telefono: '', mensaje: '' });
    const [isSending, setIsSending] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (formRef.current) {
            gsap.fromTo(formRef.current,
                { opacity: 0, scale: 0.95, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'expo.out' }
            );
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.nombre.trim() || !formData.telefono.trim() || isSending) return;

        setIsSending(true);
        try {
            await sendEmailWithTemplate({
                subject: 'Asesoría Inmediata solicitada desde /contacto',
                user_name: formData.nombre,
                user_phone: formData.telefono,
                mensaje: formData.mensaje || 'Solicito asesoría de urgencia.',
                page_url: window.location.href,
            });
            setShowSuccess(true);
            setFormData({ nombre: '', telefono: '', mensaje: '' });
            setTimeout(() => setShowSuccess(false), 5000);
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            alert('Hubo un error al enviar el mensaje. Por favor intente nuevamente.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#1A1A1A] pt-40 pb-32 text-white font-display flex flex-col items-center justify-center selection:bg-white/10 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-radial from-white/5 to-transparent blur-3xl rounded-full pointer-events-none opacity-50"></div>

            <div className="max-w-5xl w-full mx-auto px-6 text-center text-[#f5f0eb] mb-16 relative z-10">
                <span className="material-symbols-outlined text-4xl text-[#b8960c] mb-6 block drop-shadow-lg">contact_support</span>
                <h1 className="font-serif text-5xl md:text-7xl italic mb-6 text-white tracking-tighter">
                    Estamos Contigo.
                </h1>
                <p className="text-white/60 text-xl font-light italic max-w-2xl mx-auto leading-relaxed px-5 border-l border-white/20">
                    Nuestro equipo especializado aguarda para brindarle contención inmediata y discreta en este momento.
                </p>
            </div>

            <div className="max-w-4xl w-full mx-auto px-6 relative z-10" ref={formRef}>
                <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-2xl relative overflow-hidden">
                    {/* Glass sheen */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>

                    <h2 className="text-center text-3xl text-white font-serif italic mb-12 tracking-tighter">
                        Asesoría Personalizada 24/7
                    </h2>
                    {showSuccess ? (
                        <div className="text-center py-12 bg-[#b8960c]/10 border border-[#b8960c]/30 rounded-3xl mt-8">
                            <span className="material-symbols-outlined text-5xl text-[#b8960c] mb-6 block drop-shadow-md">check_circle</span>
                            <h3 className="text-2xl text-white font-serif italic mb-3">Mensaje enviado exitosamente</h3>
                            <p className="text-white/60 text-base">Nos pondremos en contacto contigo a la brevedad.</p>
                        </div>
                    ) : (
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-black uppercase tracking-widest text-white/50 pl-2">Razón Social o Nombre</label>
                            <input
                                type="text"
                                className="w-full px-6 py-5 rounded-2xl text-base bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#b8960c] focus:bg-white/10 transition-all shadow-inner"
                                placeholder="Escriba su nombre completo"
                                required
                                value={formData.nombre}
                                onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-black uppercase tracking-widest text-white/50 pl-2">WhatsApp / Celular</label>
                            <input
                                type="tel"
                                className="w-full px-6 py-5 rounded-2xl text-base bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#b8960c] focus:bg-white/10 transition-all shadow-inner"
                                placeholder="+56 9 XXXX XXXX"
                                required
                                value={formData.telefono}
                                onChange={e => setFormData({ ...formData, telefono: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2 flex flex-col gap-2 mt-2">
                            <label className="text-sm font-black uppercase tracking-widest text-white/50 pl-2">Motivo de Asistencia</label>
                            <textarea
                                className="w-full px-6 py-5 rounded-2xl text-base bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#b8960c] focus:bg-white/10 transition-all shadow-inner resize-none"
                                rows={5}
                                placeholder="Describa brevemente cómo podemos apoyarle..."
                                required
                                value={formData.mensaje}
                                onChange={e => setFormData({ ...formData, mensaje: e.target.value })}
                            />
                        </div>
                        <div className="md:col-span-2 text-center mt-8">
                            <button
                                type="submit"
                                disabled={isSending || !formData.nombre.trim() || !formData.telefono.trim()}
                                className="w-full md:w-auto bg-gradient-to-r from-[#b8960c] to-[#d4af37] text-[#0a0a0a] px-16 py-6 rounded-full font-black text-sm uppercase tracking-widest hover:brightness-110 hover:shadow-2xl hover:shadow-[#b8960c]/20 transition-all inline-flex justify-center items-center gap-4 disabled:opacity-70"
                            >
                                {isSending ? (
                                    <span className="material-symbols-outlined animate-spin text-2xl">sync</span>
                                ) : (
                                    <span className="material-symbols-outlined text-2xl">send</span>
                                )}
                                <span>{isSending ? 'Conectando...' : 'Recibir Asesoría Inmediata'}</span>
                            </button>
                            <p className="text-white/40 text-xs tracking-wider uppercase font-black italic mt-6">* Protocolo de confidencialidad absoluta activo.</p>
                        </div>
                    </form>
                    )}
                </div>
            </div>
        </main>
    );
}
