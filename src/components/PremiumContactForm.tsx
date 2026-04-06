'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendEmailWithTemplate } from '../lib/emailjs';

interface PremiumContactFormProps {
  title?: string;
  subtitle?: string;
  sourcePage?: string;
}

export default function PremiumContactForm({ 
  title = "Asesoría Personalizada 24/7",
  subtitle = "Nuestro equipo aguarda para brindarle contención inmediata.",
  sourcePage = "General"
}: PremiumContactFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: 'prevision', // prevision, urgencia, consulta
    mensaje: ''
  });

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    setStatus('idle');

    const fullMessage = `Tipo de Servicio: ${formData.servicio.toUpperCase()}\n\nMensaje: ${formData.mensaje || 'Deseo recibir asesoría.'}`;

    try {
      const success = await sendEmailWithTemplate({
        subject: `[${formData.servicio.toUpperCase()}] Nueva solicitud de ${formData.nombre}`,
        user_name: formData.nombre,
        user_phone: formData.telefono,
        user_email: formData.email,
        mensaje: fullMessage,
        page_url: typeof window !== 'undefined' ? window.location.href : sourcePage,
      });

      if (success) {
        setStatus('success');
        setFormData({ nombre: '', email: '', telefono: '', servicio: 'prevision', mensaje: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      setStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-[#b8960c] transition-all duration-300 placeholder:text-white/20";
  const labelClasses = "block text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-2 ml-1";

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        {/* Background Sparkle */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#b8960c]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-10">
            <h3 className="font-serif text-3xl md:text-4xl italic text-white mb-3">{title}</h3>
            <p className="text-white/50 text-sm font-light italic">{subtitle}</p>
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12 px-6"
              >
                <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-4xl text-emerald-400">check_circle</span>
                </div>
                <h4 className="text-2xl font-serif italic text-white mb-3">Solicitud Enviada</h4>
                <p className="text-white/60 text-sm mb-8 leading-relaxed">
                  Gracias por su confianza. Un asesor se pondrá en contacto con usted a la brevedad para brindarle el apoyo necesario.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] hover:text-amber-400 transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="grid grid-cols-1 gap-6">
                  {/* Nombre */}
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <label htmlFor="nombre" className={labelClasses}>Nombre Completo *</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      placeholder="Ej: Juan Pérez"
                      className={inputClasses}
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Teléfono */}
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                      <label htmlFor="telefono" className={labelClasses}>WhatsApp / Teléfono *</label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        required
                        placeholder="+56 9 1234 5678"
                        className={inputClasses}
                        value={formData.telefono}
                        onChange={handleChange}
                      />
                    </motion.div>

                    {/* Email */}
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                      <label htmlFor="email" className={labelClasses}>Correo Electrónico (Opcional)</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="ejemplo@correo.com"
                        className={inputClasses}
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </motion.div>
                  </div>

                  {/* Tipo de Servicio */}
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                    <label htmlFor="servicio" className={labelClasses}>Motivo de Contacto</label>
                    <select
                      id="servicio"
                      name="servicio"
                      className={`${inputClasses} appearance-none cursor-pointer`}
                      value={formData.servicio}
                      onChange={handleChange}
                    >
                      <option value="prevision" className="bg-[#1A1A1A]">Previsión Familiar (Anticipado)</option>
                      <option value="urgencia" className="bg-[#1A1A1A]">Necesidad Inmediata (Deceso)</option>
                      <option value="consulta" className="bg-[#1A1A1A]">Consulta General / Otros</option>
                    </select>
                  </motion.div>

                  {/* Mensaje */}
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                    <label htmlFor="mensaje" className={labelClasses}>Su Mensaje / Notas</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      placeholder="Cuéntenos cómo podemos ayudarle..."
                      className={`${inputClasses} resize-none`}
                      value={formData.mensaje}
                      onChange={handleChange}
                    />
                  </motion.div>
                </div>

                {status === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="text-red-400 text-xs text-center font-bold"
                  >
                    Error al enviar. Por favor intente nuevamente o llámenos directamente.
                  </motion.p>
                )}

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center pt-4"
                >
                  <button
                    type="submit"
                    disabled={isSending || !formData.nombre || !formData.telefono}
                    className="group relative inline-flex items-center justify-center gap-3 bg-[#b8960c] text-[#0a0a0a] px-10 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:bg-[#d4af37] transition-all duration-500 shadow-xl shadow-[#b8960c]/20 disabled:opacity-50 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative flex items-center gap-3">
                      {isSending ? (
                        <span className="material-symbols-outlined animate-spin text-lg">sync</span>
                      ) : (
                        <span className="material-symbols-outlined text-lg">send</span>
                      )}
                      {isSending ? 'Procesando...' : 'Solicitar Asesoría'}
                    </span>
                  </button>
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Info adicional bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-8 flex flex-wrap justify-center gap-6 text-white/30 text-[9px] font-black uppercase tracking-[0.3em]"
      >
        <div className="flex items-center gap-2"><span className="material-symbols-outlined text-base">verified_user</span> Datos protegidos</div>
        <div className="flex items-center gap-2"><span className="material-symbols-outlined text-base">history</span> Respuesta en &lt; 15 min</div>
        <div className="flex items-center gap-2"><span className="material-symbols-outlined text-base">support_agent</span> Atención humana 24/7</div>
      </motion.div>
    </div>
  );
}
