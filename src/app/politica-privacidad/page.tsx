import React from 'react';

export const metadata = {
  title: 'Protocolo de Integridad y Privacidad | Funeraria Santa Margarita',
  description: 'Nuestro compromiso con la honra, la dignidad y la protección soberana de la información de las familias.',
};

const PoliticaPrivacidad = () => {
  return (
    <main className="bg-[#191919] min-h-screen text-zinc-300 font-inter selection:bg-[#C5A059] selection:text-black">
      
      {/* Header Section */}
      <section className="pt-48 pb-24 px-6 border-b border-zinc-800 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C5A059] font-light tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6">
            Compromiso de Integridad Corporativa
          </p>
          <h1 className="text-white font-serif italic text-4xl md:text-7xl mb-8 tracking-tight">
            Privacidad y Dignidad Digital
          </h1>
          <div className="w-20 h-[1px] bg-[#C5A059] mx-auto opacity-50"></div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto space-y-20">
          
          {/* Introduction */}
          <div className="prose prose-invert max-w-none text-center">
            <p className="text-xl leading-relaxed font-serif italic text-zinc-400">
              "En la era de la información, el respeto por la memoria trasciende el espacio físico. La custodia de los datos de nuestros seres queridos es, para nosotros, un acto de honor."
            </p>
          </div>

          {/* Legal Framework */}
          <div className="bg-zinc-900/50 p-8 border border-zinc-800/50 rounded-lg text-center italic text-sm text-zinc-500">
            Esta política se rige bajo la <strong>Ley 19.628 sobre Protección de la Vida Privada</strong> (Chile), 
            asegurando un tratamiento de la información que respete siempre el derecho a la honra y la intimidad familiar.
          </div>

          {/* Protocolo de Integridad (Sistema de Semáforo) */}
          <div className="space-y-16">
            <div className="text-center">
              <h2 className="text-white font-serif text-3xl mb-4">Protocolo de Soberanía Informativa</h2>
              <p className="text-zinc-500 text-sm font-light">Nuestro sistema de estándares para la protección de la memoria familiar.</p>
            </div>

            {/* Red Light - ACCIONES PROHIBIDAS */}
            <div className="relative p-10 bg-black/60 rounded-3xl border border-red-900/20 shadow-2xl backdrop-blur-md overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.6)]"></div>
              </div>
              <h3 className="text-white font-serif text-2xl mb-8 tracking-wide">
                I. ACCIONES PROHIBIDAS <span className="text-red-900/50 text-xs ml-2 uppercase font-sans">(Compromiso de Integridad)</span>
              </h3>
              <ul className="space-y-6 text-sm md:text-base font-light text-zinc-400 leading-relaxed">
                <li className="flex gap-4">
                  <span className="text-red-600 font-serif text-xl">01</span>
                  <span><strong>Acceso No Autorizado a Fuentes:</strong> No realizamos ni permitimos la recolección automática de registros en repositorios de terceros que hayan declarado explícitamente restricciones de acceso digital. Respetamos la voluntad soberana de cada fuente informativa.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-red-600 font-serif text-xl">02</span>
                  <span><strong>Custodia de Datos de Identidad:</strong> Queda terminantemente prohibido almacenar identificadores nacionales, direcciones de residencia o material audiovisual de carácter privado sin la autorización notariada de los deudos.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-red-600 font-serif text-xl">03</span>
                  <span><strong>Seguridad Transaccional:</strong> Bajo ningún concepto almacenamos información financiera en nuestros sistemas. Toda gestión de pago se realiza mediante protocolos de cifrado externo de alto nivel.</span>
                </li>
              </ul>
            </div>

            {/* Yellow Light - SUPERVISIÓN ÉTICA */}
            <div className="relative p-10 bg-black/60 rounded-3xl border border-yellow-900/20 shadow-2xl backdrop-blur-md overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="w-4 h-4 bg-yellow-500 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.4)]"></div>
              </div>
              <h3 className="text-white font-serif text-2xl mb-8 tracking-wide">
                II. PROCESOS BAJO SUPERVISIÓN ÉTICA
              </h3>
              <ul className="space-y-6 text-sm md:text-base font-light text-zinc-400 leading-relaxed">
                <li className="flex gap-4">
                  <span className="text-yellow-500 font-serif text-xl">01</span>
                  <span><strong>Dignificación de Contenidos:</strong> Cualquier texto o biografía asistida por herramientas de inteligencia artificial es sometida a una revisión humana exhaustiva para garantizar que el tono sea siempre solemne y compasivo.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-yellow-500 font-serif text-xl">02</span>
                  <span><strong>Coherencia de Identidad:</strong> Los cambios en la presentación visual de la marca son auditados para no afectar la sobriedad requerida en el servicio funerario.</span>
                </li>
              </ul>
            </div>

            {/* Green Light - ESTÁNDARES DE EXCELENCIA */}
            <div className="relative p-10 bg-black/60 rounded-3xl border border-green-900/20 shadow-2xl backdrop-blur-md overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="w-4 h-4 bg-green-600 rounded-full shadow-[0_0_20px_rgba(22,163,74,0.4)]"></div>
              </div>
              <h3 className="text-white font-serif text-2xl mb-8 tracking-wide">
                III. ESTÁNDARES DE EXCELENCIA DIGITAL
              </h3>
              <ul className="space-y-6 text-sm md:text-base font-light text-zinc-400 leading-relaxed">
                <li className="flex gap-4">
                  <span className="text-green-600 font-serif text-xl">01</span>
                  <span><strong>Optimización para el Recuerdo:</strong> Implementamos estructuras de visibilidad que permiten a las familias encontrar los memoriales de sus seres queridos con facilidad y suma rapidez.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-green-600 font-serif text-xl">02</span>
                  <span><strong>Hospitalidad Digital (Accesibilidad):</strong> Nuestra plataforma está diseñada para ser navegada sin obstáculos, reconociendo que nuestros usuarios suelen encontrarse en momentos de alta vulnerabilidad emocional.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-20 border-t border-zinc-800 text-center text-[10px] uppercase tracking-widest text-zinc-600">
            <p>© {new Date().getFullYear()} Funeraria Santa Margarita Chile. Excelencia en la Gestión del Duelo.</p>
          </div>
        </div>
      </section>

    </main>
  );
};

export default PoliticaPrivacidad;
