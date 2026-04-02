import React from 'react';
import NavbarPremium from '@/components/NavbarPremium/NavbarPremium';
import FooterPremium from '@/components/FooterPremium/FooterPremium';

export const metadata = {
  title: 'Guía para el Duelo | Funeraria Santa Margarita',
  description: 'Un espacio de acompañamiento y consuelo. Herramientas para transitar la pérdida con dignidad y amor.',
};

const GuiaDuelo = () => {
  return (
    <main className="bg-[#191919] min-h-screen text-zinc-300 font-inter selection:bg-[#C5A059] selection:text-black">
      <NavbarPremium />
      
      {/* Hero Section */}
      <section className="pt-48 pb-24 px-6 border-b border-zinc-800 bg-black/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C5A059] font-light tracking-[0.4em] uppercase text-[10px] md:text-xs mb-6">
            Acompañamiento en la Pérdida
          </p>
          <h1 className="text-white font-serif italic text-4xl md:text-7xl mb-8 tracking-tight">
            Caminar con Sanación
          </h1>
          <div className="w-20 h-[1px] bg-[#C5A059] mx-auto opacity-50"></div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto space-y-24">
          
          {/* Introduction Quote */}
          <div className="text-center">
            <p className="text-xl md:text-2xl leading-relaxed font-serif italic text-zinc-400">
              "El duelo no es un proceso que se supera, es un camino que se transita. Es la última gran conversación de amor con quien ha partido."
            </p>
          </div>

          {/* Core Counsel Section */}
          <div className="grid gap-16">
            
            {/* Step 1 */}
            <div className="group space-y-4">
              <span className="text-[#C5A059] font-serif text-5xl opacity-40 group-hover:opacity-100 transition-opacity">01</span>
              <h2 className="text-white font-serif text-3xl">La Importancia del Adiós</h2>
              <p className="font-light leading-relaxed text-zinc-400">
                El ritual de despedida es fundamental para la psique humana. Permítase sentir cada emoción sin juicio. No hay una forma "correcta" de doler, solo su propia forma.
              </p>
            </div>

            {/* Step 2 */}
            <div className="group space-y-4">
              <span className="text-[#C5A059] font-serif text-5xl opacity-40 group-hover:opacity-100 transition-opacity">02</span>
              <h2 className="text-white font-serif text-3xl">Cuidar de Sí Mismo</h2>
              <p className="font-light leading-relaxed text-zinc-400">
                La pérdida genera un desgaste físico y emocional profundo. El descanso, la hidratación y el silencio no son lujos, son herramientas de sanación obligatorias en este periodo de transición.
              </p>
            </div>

            {/* Step 3 */}
            <div className="group space-y-4">
              <span className="text-[#C5A059] font-serif text-5xl opacity-40 group-hover:opacity-100 transition-opacity">03</span>
              <h2 className="text-white font-serif text-3xl">Honrar la Memoria</h2>
              <p className="font-light leading-relaxed text-zinc-400">
                Mantener vivo el legado no se trata de aferrarse al pasado, sino de integrar las enseñanzas de quien partió en nuestro presente. Pequeños actos diarios de bondad en su nombre son memoriales vivos.
              </p>
            </div>

          </div>

          {/* Call to Action - Solemne */}
          <div className="bg-zinc-900/40 p-12 rounded-3xl border border-zinc-800 text-center">
            <h3 className="text-white font-serif text-2xl mb-6 italic">¿Necesita un oído que escuche?</h3>
            <p className="text-zinc-500 font-light mb-8 max-w-md mx-auto">Nuestro equipo está capacitado no solo para gestionar servicios, sino para acompañar con empatía absoluta.</p>
            <a 
              href="https://wa.me/56964333760" 
              className="inline-block border border-[#C5A059] text-[#C5A059] px-10 py-3 rounded-full uppercase tracking-[0.3em] text-[10px] hover:bg-[#C5A059] hover:text-black transition-all duration-500"
            >
              Hablar con nosotros
            </a>
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

export default GuiaDuelo;
