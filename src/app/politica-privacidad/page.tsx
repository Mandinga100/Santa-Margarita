import React from 'react';
import NavbarPremium from '@/components/NavbarPremium/NavbarPremium';
import FooterPremium from '@/components/FooterPremium/FooterPremium';

export const metadata = {
  title: 'Política de Privacidad | Funeraria Santa Margarita',
  description: 'Conozca nuestro Protocolo de Transparencia Digital y el Sistema de Semáforo Ético para la protección de datos y honra de nuestros fallecidos.',
};

const PoliticaPrivacidad = () => {
  return (
    <main className="bg-[#191919] min-h-screen text-zinc-300 font-inter selection:bg-[#C5A059] selection:text-black">
      <NavbarPremium />
      
      {/* Header Section */}
      <section className="pt-40 pb-20 px-6 border-b border-zinc-800 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-white font-serif italic text-4xl md:text-6xl mb-6 tracking-tight">
            Política de Privacidad
          </h1>
          <p className="text-[#C5A059] font-light tracking-[0.3em] uppercase text-xs md:text-sm">
            Protocolo de Transparencia Digital v2.0
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Introduction */}
          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed font-light text-zinc-400 italic">
              "En Funeraria Santa Margarita, la dignidad de quienes ya no están y la tranquilidad de sus familias trasciende el plano físico, extendiéndose a nuestra arquitectura digital."
            </p>
            <p className="leading-relaxed">
              Esta política define cómo gestionamos la información en nuestro ecosistema web, bajo un sistema de cumplimiento estricto diseñado para proteger la memoria, la privacidad financiera y la integridad técnica.
            </p>
          </div>

          {/* Protocolo de Semáforo (Sistema de Luces) */}
          <div className="space-y-12">
            <h2 className="text-white font-serif text-3xl border-b border-[#C5A059]/30 pb-4">
              Sistema de Semáforo Ético y de Seguridad
            </h2>

            {/* Red Light */}
            <div className="bg-black/40 p-8 rounded-2xl border-l-4 border-red-600 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
                <h3 className="text-white font-bold text-xl uppercase tracking-widest text-sm">
                  LUZ ROJA (Estrictamente Prohibido)
                </h3>
              </div>
              <ul className="grid gap-4 text-sm font-light leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span><strong>Extracción Ilegal de Datos:</strong> Queda terminantemente prohibido el rastreo (scraping) de sitios terceros que restrinjan el acceso mediante <code>robots.txt</code> o políticas explícitas de privacidad.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span><strong>Datos Biométricos y Sensibles:</strong> No almacenamos RUT/DNI, direcciones de domicilio ni registros fotográficos personales sin el consentimiento legal de los familiares directos.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span><strong>Privacidad Financiera:</strong> Prohibido el procesamiento de tarjetas de crédito en texto plano. Todo pago es gestionado mediante tokens encriptados de Stripe o PayPal.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-bold">•</span>
                  <span><strong>Integridad de Backend:</strong> Prohibida la exposición de credenciales, llaves de API o secretos de servidor en el código fuente frontal.</span>
                </li>
              </ul>
            </div>

            {/* Yellow Light */}
            <div className="bg-black/40 p-8 rounded-2xl border-l-4 border-yellow-500 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.3)]"></div>
                <h3 className="text-white font-bold text-xl uppercase tracking-widest text-sm">
                  LUZ AMARILLA (Supervición Mandatoria)
                </h3>
              </div>
              <ul className="grid gap-4 text-sm font-light leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span><strong>Contenido Dinámico por IA:</strong> Todo obituario o dedicatoria generada de forma asistida debe pasar por una revisión humana final para asegurar el tono solemne.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-yellow-500 font-bold">•</span>
                  <span><strong>Cambios de Identidad Visual:</strong> Cualquier alteración en el Brand Kit (colores o tipografías) requiere validación de consistencia premium.</span>
                </li>
              </ul>
            </div>

            {/* Green Light */}
            <div className="bg-black/40 p-8 rounded-2xl border-l-4 border-green-600 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-4 h-4 bg-green-600 rounded-full shadow-[0_0_15px_rgba(22,163,74,0.3)]"></div>
                <h3 className="text-white font-bold text-xl uppercase tracking-widest text-sm">
                  LUZ VERDE (Estándar de Operación)
                </h3>
              </div>
              <ul className="grid gap-4 text-sm font-light leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>SEO Semántico:</strong> Optimización técnica para que las familias encuentren el memorial de sus seres queridos de forma rápida y respetuosa.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Accesibilidad WCAG:</strong> Diseño inclusivo para garantizar que personas en estado de duelo o con dificultades de visión puedan navegar con fluidez.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-zinc-800 text-center text-xs text-zinc-500">
            <p>© {new Date().getFullYear()} Funeraria Santa Margarita Chile. Última revisión: 2 de abril de 2026.</p>
          </div>
        </div>
      </section>

      <FooterPremium />
    </main>
  );
};

export default PoliticaPrivacidad;
