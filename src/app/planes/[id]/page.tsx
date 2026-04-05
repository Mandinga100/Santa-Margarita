import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './Plan.module.css';
import HeroCarousel from '@/components/HeroCarousel';
import { planesData } from '@/data/planes';

export function generateStaticParams() {
  return planesData.map((plan) => ({
    id: plan.id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const plan = planesData.find(p => p.id === params.id);
  if (!plan) return { title: 'Plan no encontrado' };

  return {
    title: `${plan.nombre} - Elegancia en el Recuerdo | Funeraria Santa Margarita`,
    description: plan.descripcion,
  };
}

export default function PlanPage({ params }: { params: { id: string } }) {
  const plan = planesData.find(p => p.id === params.id);
  if (!plan) notFound();

  const arcaImages = plan.badges.length > 0 ? 
    plan.badges.map((badge, idx) => ({ src: plan.img, alt: `${plan.nombre} - ${badge} ${idx}` })) : 
    [{ src: plan.img, alt: plan.nombre }];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#b8960c]/30 font-sans">
      <section className="relative h-[95vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 scale-105">
          <Image
            alt={plan.nombre}
            fill
            className="object-cover opacity-60"
            src={plan.img}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_100%)] z-10 opacity-70" />
        </div>
        <div className="relative z-30 text-center px-6 max-w-5xl mx-auto mt-20">
          <div className="flex flex-col items-center mb-10 translate-y-4 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b8960c] bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-[#b8960c]/10 mb-8 inline-block shadow-2xl">
              Distinción Funeraria
            </span>
            <h1 className="font-serif italic text-8xl md:text-[11rem] leading-[0.8] tracking-tighter text-white drop-shadow-[0_10px_45px_rgba(0,0,0,1)]">
              {plan.nombre.replace('Plan ', '')}
            </h1>
            <div className="h-[2px] w-32 bg-[#b8960c] mt-10 mb-10 shadow-[0_0_15px_#b8960c]" />
          </div>
          <p className="text-white/80 text-lg md:text-2xl font-light italic leading-relaxed max-w-3xl mx-auto mb-16 drop-shadow-lg">
            {`“Una despedida con la elegancia y calidez que representa, brindando un homenaje respetuoso y completo en cada detalle.”`}
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link href={`/cotizacion?plan=${plan.id}`} className="w-full sm:w-auto bg-[#b8960c] text-black px-12 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:bg-[#d4af37] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[#b8960c]/30 text-center">
              Consultar Ahora
            </Link>
            <a
              className="w-full sm:w-auto bg-white/5 backdrop-blur-lg border border-white/10 text-white/80 px-12 py-5 rounded-full font-black text-[9px] uppercase tracking-[0.4em] hover:bg-white/10 hover:text-white transition-all text-center"
              href="#arca"
            >
              Detalles del Arca
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40 z-40">
          <span className="material-symbols-outlined text-4xl text-[#b8960c]">
            keyboard_double_arrow_down
          </span>
        </div>
      </section>

      <section id="detalles" className="py-32 bg-white text-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-10 lg:sticky lg:top-32">
              <h2 className="font-serif text-5xl md:text-7xl italic leading-tight text-[#0a0a0a]">
                Elegancia en <br />el Recuerdo.
              </h2>
              <div className="pt-8 border-t border-black/10">
                <div className="flex items-baseline gap-6 mb-4">
                  <span className="text-xs font-black uppercase tracking-[0.5em] text-[#b8960c]">
                    Homenaje Completo
                  </span>
                  <span className="text-7xl font-serif text-[#0a0a0a]">
                    {plan.precioStr}
                  </span>
                </div>
                <p className="text-sm text-black/50 font-normal leading-relaxed">
                  Sistema de acompañamiento distinguido que incluye una urna de alta calidad,
                  arreglos florales y gestión legal completa.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {plan.serviciosFull.map((title, idx) => (
                <div
                  key={idx}
                  className="group bg-[#f8f8f8] p-8 rounded-3xl border border-transparent hover:border-[#b8960c]/20 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-xl"
                >
                  <div className="flex items-center gap-6">
                    <span className="material-symbols-outlined text-[#b8960c] text-3xl opacity-80 group-hover:opacity-100">
                      diamond
                    </span>
                    <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-[#0a0a0a]">
                      {title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="arca" className="py-32 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-24">
            <h2 className="font-serif italic text-6xl text-white mb-6">
              El Arca {plan.nombre.replace('Plan ', '')}
            </h2>
            <p className="text-white/40 font-light tracking-[0.2em] uppercase text-[10px]">
              Artesanía y Elegancia en cada detalle
            </p>
          </div>
          
          <div className={styles['hero-urnas']}>
            <HeroCarousel images={arcaImages} />
          </div>

        </div>
      </section>

      <section className="py-44 bg-black text-center relative flex items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            alt="Acompañamiento"
            fill
            className="object-cover blur-[10px]"
            src={plan.img}
          />
        </div>
        <div className="relative z-10 max-w-4xl px-6">
          <h2 className="font-serif italic text-6xl md:text-8xl text-white mb-16 leading-tight">
            No camina solo. <br />Permítanos ayudar.
          </h2>
          <Link href="/contacto" className="bg-[#b8960c] text-black px-16 py-7 rounded-full font-black text-[12px] uppercase tracking-[0.5em] hover:scale-105 transition-all shadow-[0_20px_50px_rgba(184,150,12,0.3)]">
            Atención Inmediata 24 Horas
          </Link>
        </div>
      </section>
    </div>
  );
}
