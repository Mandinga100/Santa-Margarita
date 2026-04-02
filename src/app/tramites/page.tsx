import React from 'react';
import NavbarPremium from '@/components/NavbarPremium/NavbarPremium';
import FooterPremium from '@/components/FooterPremium/FooterPremium';

export const metadata = {
  title: 'Gestión Legal y Trámites | Funeraria Santa Margarita',
  description: 'Un soporte integral para que usted se enfoque en lo importante. Gestionamos la documentación con rigor y discreción.',
};

const TramitesLegales = () => {
  return (
    <main className="bg-[#191919] min-h-screen text-zinc-300 font-inter selection:bg-[#C5A059] selection:text-black font-light">
      <NavbarPremium />
      
      {/* Header Section */}
      <section className="pt-48 pb-24 px-6 border-b border-zinc-800 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C5A059] font-light tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6">
            Soberanía en la Gestión del Honor
          </p>
          <h1 className="text-white font-serif italic text-4xl md:text-7xl mb-8 tracking-tight">
            Gestión de Trámites
          </h1>
          <div className="w-20 h-[1px] bg-[#C5A059] mx-auto opacity-50"></div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-32">
          
          {/* Mission Statement */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-lg leading-relaxed font-serif italic text-zinc-400">
              "Nuestra misión es liberar a las familias del peso administrativo, actuando con celeridad y el máximo respeto por la legalidad vigente."
            </p>
          </div>

          {/* Procedure Step-by-Step */}
          <div className="space-y-24">
            
            {/* Step 1: Certificación */}
            <div className="relative p-10 bg-black/60 rounded-3xl border border-zinc-800 shadow-2xl backdrop-blur-md overflow-hidden group">
              <div className="absolute top-0 right-10 p-0 transform -translate-y-1/2">
                <span className="text-[120px] font-serif text-white/5 opacity-40 select-none">I</span>
              </div>
              <h3 className="text-white font-serif text-2xl mb-8 tracking-wide border-b border-[#C5A059]/30 pb-4">
                La Certificación Médica de Defunción
              </h3>
              <p className="font-light leading-relaxed text-zinc-400 mb-6">
                Este es el documento base para cualquier gestión posterior. Nuestros asesores verifican meticulosamente la validez del certificado médico antes de proceder al Registro Civil.
              </p>
              <ul className="grid gap-3 text-sm text-zinc-500 italic">
                <li className="flex gap-2"><span>–</span> Inscripción oficial en el Registro Civil.</li>
                <li className="flex gap-2"><span>–</span> Obtención de pases de sepultación o incineración.</li>
              </ul>
            </div>

            {/* Step 2: Autorizaciones y Permisos */}
            <div className="relative p-10 bg-black/60 rounded-3xl border border-zinc-800 shadow-2xl backdrop-blur-md overflow-hidden">
               <div className="absolute top-0 right-10 p-0 transform -translate-y-1/2">
                  <span className="text-[120px] font-serif text-white/5 opacity-40 select-none">II</span>
                </div>
              <h3 className="text-white font-serif text-2xl mb-8 tracking-wide border-b border-[#C5A059]/30 pb-4">
                Autorizaciones Sanitarias y de Traslado
              </h3>
              <p className="font-light leading-relaxed text-zinc-400 mb-6">
                Gestionamos la movilización con la máxima sobriedad y en estricto cumplimiento de las normas de la SEREMI de Salud. Cada movimiento está regido por protocolos de dignidad operativa.
              </p>
              <ul className="grid gap-3 text-sm text-zinc-500 italic">
                <li className="flex gap-2"><span>–</span> Trámites para traslados interregionales o internacionales.</li>
                <li className="flex gap-2"><span>–</span> Permisos específicos de cementerios y parques de recuerdo.</li>
              </ul>
            </div>

            {/* Step 3: Beneficios y Asesoría Legal */}
            <div className="relative p-10 bg-black/60 rounded-3xl border border-zinc-800 shadow-2xl backdrop-blur-md overflow-hidden">
               <div className="absolute top-0 right-10 p-0 transform -translate-y-1/2">
                <span className="text-[120px] font-serif text-white/5 opacity-40 select-none">III</span>
              </div>
              <h3 className="text-white font-serif text-2xl mb-8 tracking-wide border-b border-[#C5A059]/30 pb-4">
                Asesoría de Beneficios Previsionales
              </h3>
              <p className="font-light leading-relaxed text-zinc-400 mb-6">
                Entendemos que la pérdida también implica responsabilidades ante instituciones (IPS, AFP, Compañías de Seguro). Le asesoramos para activar las garantías correspondientes a la cuota mortuaria.
              </p>
              <ul className="grid gap-3 text-sm text-zinc-500 italic">
                <li className="flex gap-2"><span>–</span> Activación de beneficios de cuota mortuaria.</li>
                <li className="flex gap-2"><span>–</span> Apoyo en herencias y trámites de posesión efectiva (referencia legal).</li>
              </ul>
            </div>

          </div>

          {/* Sello de Confianza - Final */}
          <div className="bg-zinc-950/80 p-12 rounded-3xl border border-[#C5A059]/20 text-center shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
            <h4 className="text-white font-serif text-2xl mb-6">Tranquilidad Administrativa</h4>
            <p className="text-zinc-500 font-light mb-8 max-w-lg mx-auto">Nuestro equipo de abogados y gestores administrativos opera las 24 horas para asegurar que su única preocupación sea el recuerdo.</p>
          </div>

          <div className="pt-20 border-t border-zinc-800 text-center text-[10px] uppercase tracking-widest text-zinc-600">
            <p>© {new Date().getFullYear()} Funeraria Santa Margarita Chile. Excelencia en la Gestión del Duelo.</p>
          </div>
        </div>
      </section>

      <FooterPremium />
    </main>
  );
};

export default TramitesLegales;
