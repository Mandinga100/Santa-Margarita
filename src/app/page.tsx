'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const planesRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Parallax
    if (heroRef.current) {
      gsap.to('.hero-parallax-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Badge 24Hrs fade in
    gsap.fromTo('.badge-24hrs-hero',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out', delay: 0.3 }
    );

    // CTAs hero fade in
    gsap.fromTo('.hero-ctas-bottom',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'expo.out', delay: 1.2 }
    );

    // Title reveal
    if (titleRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(titleRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 2, ease: 'expo.out', delay: 0.6 }
        );
      }, heroRef);
      return () => ctx.revert();
    }

    // Planes cards stagger
    if (planesRef.current) {
      gsap.fromTo('.card-plane',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'expo.out',
          scrollTrigger: { trigger: planesRef.current, start: 'top 85%' },
        }
      );
    }

    // Stats counters
    const counters = document.querySelectorAll<HTMLElement>('.stat-counter[data-target]');
    counters.forEach((counter) => {
      const raw = counter.getAttribute('data-target') || '0';
      const target = parseFloat(raw);
      if (isNaN(target)) return;
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            innerHTML: target,
            duration: 2.5,
            ease: 'expo.out',
            snap: { innerHTML: 1 },
            onUpdate: function () {
              const val = Math.ceil(parseFloat(this.targets()[0].innerHTML));
              counter.innerHTML = val.toLocaleString('es-CL') + (counter.getAttribute('data-suffix') || '');
            },
          });
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div className="bg-black">
      <style>{`
        /* ========= GLOBAL CSS ========= */

        /* Ken Burns GPU */
        .ken-burns-wrapper .swiper-slide-active img.ken-burns {
          transform: scale(1.04) translateZ(0);
          transition: transform 6s ease-out;
        }

        /* Swiper bullets */
        .swiper-pagination-bullet { background: #b8960c !important; opacity: 0.6; }
        .swiper-pagination-bullet-active { background: #f5f0eb !important; opacity: 1; }

        /* Swiper fade GPU-accelerated */
        .hero-swiper { will-change: transform; transform: translateZ(0); }
        .hero-swiper .swiper-slide { backface-visibility: hidden; }

        /* Badge Centrado Vidrio */
        .badge-24hrs-hero {
          background: rgba(255,255,255,0.18) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.3);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          border-radius: 50px;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          user-select: none;
        }
        .badge-24hrs-hero:hover {
          box-shadow: 0 0 30px rgba(255,255,255,0.4);
        }

        /* Badge Vidrio oscuro (sobre fondos negros) */
        .badge-vidrio {
          background: rgba(255,255,255,0.10);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 25px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }

        /* Badge Vidrio claro (sobre fondos blancos) */
        .badge-vidrio-dark {
          background: rgba(0,0,0,0.07);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 25px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }

        /* Slogan gradiente */
        .slogan-grad {
          background: linear-gradient(135deg, #c0c0c0 0%, #ffffff 50%, #c0c0c0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* CTAs Hero Bottom */
        .hero-ctas-bottom {
          position: absolute;
          bottom: 8vh;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 1rem;
          z-index: 30;
          white-space: nowrap;
        }
        @media (max-width: 640px) {
          .hero-ctas-bottom {
            flex-direction: column;
            gap: 0.75rem;
            bottom: 12vh;
            width: 90%;
            left: 5%;
            transform: none;
          }
          .hero-ctas-bottom a { width: 100%; text-align: center; }
        }

        /* Plan Cards Uniforme */
        .plan-card {
          background: #F8F9FA;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.10);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .plan-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
        }
        .plan-card-img {
          height: 200px;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .plan-card-body {
          padding: 1.5rem 2rem 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        /* Confianza claro card */
        .stat-card {
          background: rgba(26,26,26,0.05);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          transition: background 0.3s;
        }
        .stat-card:hover { background: rgba(26,26,26,0.1); }
      `}</style>

      {/* ============================
          SECTION 1: HERO
      ============================== */}
      <section
        id="inicio"
        ref={heroRef}
        className="relative min-h-[100vh] w-full overflow-hidden flex items-center justify-center bg-[#0a0a0a]"
        aria-label="Inicio"
      >
        {/* Carrusel + parallax GPU-acelerado (PASO 5) */}
        <div className="absolute inset-0 z-0 hero-parallax-bg w-full h-[120%] -top-[10%] ken-burns-wrapper">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={800}
            autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true }}
            loop={true}
            allowTouchMove={true}
            grabCursor={true}
            watchSlidesProgress={true}
            className="w-full h-full hero-swiper"
          >
            {[
              { src: '/assets/images/ui/hero-bg.webp', alt: 'Funeraria Santa Margarita Fachada' },
              { src: '/assets/images/otros/acacia1.webp', alt: 'Sala de Velatorio' },
              { src: '/assets/images/otros/team1.webp', alt: 'Equipo de Atención' },
            ].map((img, i) => (
              <SwiperSlide key={i}>
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/30 to-[#0a0a0a]/90 z-10" />
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    priority={i === 0}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                    className="object-cover ken-burns"
                    sizes="100vw"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Badge 24Hrs – Centrado arriba (PASO 1) */}
        <div className="badge-24hrs-hero absolute top-[14%] left-[50%] -translate-x-1/2 z-30 flex items-center gap-2 px-5 py-2.5 cursor-default transition-all duration-300 whitespace-nowrap">
          <i className="fas fa-clock text-sm" />
          <span className="text-[11px] font-black uppercase tracking-widest">Atención Permanente 24Hrs</span>
        </div>

        {/* Contenido Central: Slogans fijos centrado */}
        <div
          ref={titleRef}
          className="hero-content relative z-20 text-center w-full max-w-5xl px-6"
          style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
        >
          <h1 className="slogan-grad font-serif text-4xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight tracking-tight drop-shadow-2xl">
            Acompañamos con respeto,<br />
            <span className="italic">despedimos con amor</span>
          </h1>
          <p className="sub-slogan text-[#f5f0eb]/80 text-lg md:text-2xl font-light tracking-wide max-w-3xl mx-auto italic drop-shadow-lg">
            &ldquo;Donde el respeto se encuentra con la excelencia, honramos cada vida con dignidad&rdquo;
          </p>
        </div>

        {/* CTAs Hero Restaurados – Bottom Center (PASO 1) */}
        <div className="hero-ctas-bottom">
          <Link
            href="/cotizacion?plan=estandar"
            className="inline-flex items-center justify-center gap-2 bg-[#f5f0eb] text-[#0a0a0a] px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl shadow-black/40"
          >
            <i className="fas fa-file-contract text-sm" />
            Cotización Inmediata
          </Link>
          <a
            href="https://wa.me/56964333760?text=Hola%2C%20necesito%20asesor%C3%ADa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#20b557] hover:scale-105 transition-all duration-300 shadow-2xl shadow-green-900/40"
          >
            <i className="fab fa-whatsapp text-base" />
            Asesoría WhatsApp
          </a>
        </div>
      </section>

      {/* ============================
          SECTION 2: PLANES FUNERARIOS → FONDO NEGRO (PASO 2)
      ============================== */}
      <section
        id="planes"
        ref={planesRef}
        className="py-32 relative"
        style={{ background: '#1A1A1A', color: '#FFFFFF' }}
        aria-label="Planes Funerarios"
      >
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-20">
            <span className="badge-vidrio inline-block text-[9px] font-black uppercase tracking-[0.6em] text-white/50 px-5 py-2 mb-8">
              Protocolos de Dignidad
            </span>
            <h2 className="font-serif text-5xl md:text-7xl italic mb-4 text-white">
              Planes Funerarios
            </h2>
            <p className="text-white/50 text-lg font-light italic">Soluciones personalizadas según tus necesidades</p>
            <div className="w-16 h-px bg-[#b8960c]/60 mx-auto mt-8" />
          </header>

          {/* CARDS UNIFORMES (PASO 4) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* PLAN ACACIA */}
            <div className="card-plane plan-card">
              <div className="plan-card-img">
                <Image
                  src="/assets/images/planes/acacia-urna-principal.webp"
                  alt="Plan Acacia – Urna"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[2000ms]"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="plan-card-body">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif text-2xl italic text-[#1a1a1a]">Plan Acacia</h3>
                    <span className="text-[#8a6f09] font-black text-lg">$2.250.000</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="text-[10px] font-black uppercase bg-[#25D366]/15 text-[#178540] px-3 py-1 rounded-full"><i className="fas fa-check mr-1" /> Asesoría 24/7</span>
                    <span className="text-[10px] font-black uppercase bg-[#25D366]/15 text-[#178540] px-3 py-1 rounded-full"><i className="fas fa-check mr-1" /> Urna Incluida</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <Link href="/planes" className="text-center py-2.5 border border-[#1a1a1a]/30 text-[#1a1a1a] text-[9px] font-black uppercase tracking-wider hover:bg-[#1a1a1a] hover:text-white transition-all rounded-full">Detalles</Link>
                  <a href="tel:+56964333760" className="text-center py-2.5 bg-[#b8960c] text-white text-[9px] font-black uppercase tracking-wider hover:bg-[#9a7d0a] transition-all rounded-full">Llamar</a>
                </div>
              </div>
            </div>

            {/* PLAN QUILLAY */}
            <div className="card-plane plan-card">
              <div className="plan-card-img">
                <Image
                  src="/assets/images/planes/quillay-urna-principal.webp"
                  alt="Plan Quillay – Urna"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[2000ms]"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="plan-card-body">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif text-2xl italic text-[#1a1a1a]">Plan Quillay</h3>
                    <span className="text-[#8a6f09] font-black text-lg">$2.390.000</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="text-[10px] font-black uppercase bg-[#25D366]/15 text-[#178540] px-3 py-1 rounded-full"><i className="fas fa-check mr-1" /> Retiro 24h</span>
                    <span className="text-[10px] font-black uppercase bg-[#25D366]/15 text-[#178540] px-3 py-1 rounded-full"><i className="fas fa-check mr-1" /> Capilla Velatoria</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <Link href="/planes" className="text-center py-2.5 border border-[#1a1a1a]/30 text-[#1a1a1a] text-[9px] font-black uppercase tracking-wider hover:bg-[#1a1a1a] hover:text-white transition-all rounded-full">Detalles</Link>
                  <a href="tel:+56964333760" className="text-center py-2.5 bg-[#b8960c] text-white text-[9px] font-black uppercase tracking-wider hover:bg-[#9a7d0a] transition-all rounded-full">Llamar</a>
                </div>
              </div>
            </div>

            {/* PLAN RAÚL */}
            <div className="card-plane plan-card" style={{ background: '#1a1a1a', position: 'relative' }}>
              <div className="absolute top-4 right-4 z-10">
                <span className="text-[8px] font-black uppercase tracking-widest bg-[#b8960c] text-white px-3 py-1.5 rounded-full">Destacado</span>
              </div>
              <div className="plan-card-img">
                <Image
                  src="/assets/images/planes/raul-urna-principal.webp"
                  alt="Plan Raúl – Urna"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-[2000ms]"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="plan-card-body" style={{ background: '#1a1a1a' }}>
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-serif text-2xl italic text-white">Plan Raúl</h3>
                    <span className="text-[#b8960c] font-black text-lg">$3.590.000</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    <span className="text-[10px] font-black uppercase bg-[#25D366]/20 text-[#25D366] px-3 py-1 rounded-full"><i className="fas fa-check mr-1" /> Carroza Mercedes</span>
                    <span className="text-[10px] font-black uppercase bg-[#25D366]/20 text-[#25D366] px-3 py-1 rounded-full"><i className="fas fa-check mr-1" /> Coro Memorial</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <Link href="/planes" className="text-center py-2.5 border border-white/30 text-white text-[9px] font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all rounded-full">Detalles</Link>
                  <a href="tel:+56964333760" className="text-center py-2.5 bg-[#b8960c] text-white text-[9px] font-black uppercase tracking-wider hover:bg-[#d4af37] transition-all rounded-full">Llamar</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 3: SERVICIOS → FONDO BLANCO (PASO 2)
      ============================== */}
      <section
        id="servicios"
        className="py-32 relative"
        style={{ background: '#FFFFFF', color: '#1A1A1A' }}
        aria-label="Servicios Funerarios"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="badge-vidrio-dark inline-block text-[9px] font-black uppercase tracking-[0.6em] text-[#1a1a1a]/60 px-5 py-2 mb-10">
                Acompañamiento Completo
              </span>
              <h2 className="font-serif text-5xl lg:text-7xl italic mb-8 leading-tight text-[#1a1a1a]">
                Servicios<br />Funerarios
              </h2>
              <p className="text-[#1a1a1a]/60 text-xl font-light italic mb-12 leading-relaxed">
                Coordinamos cada detalle con discreción y profesionalismo para que su familia pueda enfocarse en el recuerdo.
              </p>
              <Link href="/servicios" className="inline-flex items-center gap-3 border-2 border-[#1a1a1a] text-[#1a1a1a] px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#1a1a1a] hover:text-white transition-all duration-500">
                Conocer Servicios
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-12 gap-4 h-[500px]">
              <div className="col-span-7 relative rounded-[2.5rem] overflow-hidden">
                <Image src="/assets/images/otros/acacia1.webp" alt="Sala Memorial" fill className="object-cover" loading="lazy" sizes="40vw" />
              </div>
              <div className="col-span-5 grid gap-4">
                <div className="relative rounded-[2rem] overflow-hidden">
                  <Image src="/assets/images/otros/team1.webp" alt="Equipo" fill className="object-cover" loading="lazy" sizes="20vw" />
                </div>
                <div className="bg-black/5 p-6 rounded-[2rem] flex flex-col justify-center border border-black/5">
                  <span className="material-symbols-outlined text-2xl text-[#1a1a1a]/30 mb-3">psychology</span>
                  <h3 className="font-serif text-lg italic text-[#1a1a1a] mb-1">Salas de Velatorio</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]/40">Soporte post-servicio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 4: MEMORIALES → FONDO NEGRO (PASO 2)
      ============================== */}
      <section
        id="memoriales"
        className="py-32 relative"
        style={{ background: '#1A1A1A', color: '#FFFFFF' }}
        aria-label="Memoriales Digitales"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="badge-vidrio inline-block text-[9px] font-black uppercase tracking-[0.6em] text-white/50 px-5 py-2 mb-10">
            Espacios del Recuerdo
          </span>
          <h2 className="font-serif text-5xl md:text-7xl italic mb-6 text-white">
            Memoriales
          </h2>
          <p className="text-white/50 text-xl font-light italic max-w-3xl mx-auto mb-16">
            Espacios diseñados para el recuerdo eterno. Honra la memoria de tus seres queridos con un memorial digital único.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {[
              { src: '/assets/images/otros/acacia1.webp', label: 'Capilla Interior' },
              { src: '/assets/images/otros/acacia2.webp', label: 'Sala Privada' },
              { src: '/assets/images/otros/acacia3.webp', label: 'Jardín Memorial' },
            ].map((item, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-xl group">
                <Image src={item.src} alt={item.label} fill className="object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" sizes="33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-4 left-0 right-0 text-center text-white text-[10px] font-black uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
          <Link href="/memoriales" className="inline-flex items-center gap-3 border border-white/30 text-white px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-[#1a1a1a] transition-all">
            Ver Memorial Digital
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* ============================
          SECTION 5: NOSOTROS → FONDO BLANCO (PASO 2)
      ============================== */}
      <section
        id="nosotros"
        className="py-32 relative"
        style={{ background: '#FFFFFF', color: '#1A1A1A' }}
        aria-label="Sobre Nosotros"
      >
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-20">
            <span className="badge-vidrio-dark inline-block text-[9px] font-black uppercase tracking-[0.6em] text-[#1a1a1a]/50 px-5 py-2 mb-8">
              Desde 1996
            </span>
            <h2 className="font-serif text-5xl md:text-7xl italic mb-4 text-[#1a1a1a]">
              Nuestro Legado
            </h2>
            <p className="text-[#1a1a1a]/60 text-xl font-light italic max-w-3xl mx-auto">
              Custodiamos historias de vida con una veneración absoluta, uniendo la tradición más respetuosa con la innovación de vanguardia.
            </p>
            <div className="w-16 h-px bg-[#b8960c]/60 mx-auto mt-8" />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: 'shrine', title: 'Dignidad', desc: 'Tratamos cada existencia con el honor supremo que merece, con solemnidad absoluta en cada detalle.' },
              { icon: 'favorite', title: 'Respeto', desc: 'Entendemos la profundidad del duelo humano y actuamos con la máxima discreción y empatía.' },
              { icon: 'auto_awesome', title: 'Excelencia', desc: 'Buscamos la perfección estética y operativa en cada ceremonia que coordinamos.' },
            ].map((v, i) => (
              <div key={i} className="group bg-[#f5f0eb] rounded-[1.5rem] p-10 border border-black/5 shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-500 text-center">
                <span className="material-symbols-outlined text-5xl text-[#1a1a1a]/15 group-hover:text-[#b8960c] transition-colors duration-500 mb-6 block">{v.icon}</span>
                <h3 className="font-serif text-3xl italic text-[#1a1a1a] mb-4">{v.title}</h3>
                <p className="text-[#1a1a1a]/60 font-light leading-relaxed text-[15px]">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/nosotros" className="inline-flex items-center gap-3 border-2 border-[#1a1a1a] text-[#1a1a1a] px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#1a1a1a] hover:text-white transition-all duration-500">
              Conocer Nuestra Historia
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 6: PREVISIÓN → FONDO NEGRO (PASO 2)
      ============================== */}
      <section
        id="prevision"
        className="py-32 relative"
        style={{ background: '#1A1A1A', color: '#FFFFFF' }}
        aria-label="Previsión Familiar"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-[2.5rem] p-10 md:p-20 border border-white/10 bg-white/[0.03] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url('/assets/images/otros/clouds.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="badge-vidrio inline-block text-[9px] font-black uppercase tracking-[0.6em] text-white/50 px-5 py-2 mb-8">
                  Protocolo Vitalicio
                </span>
                <h2 className="font-serif text-5xl md:text-7xl italic leading-none text-white mb-8">
                  La Paz de <br /> Saber Decidir
                </h2>
                <p className="text-white/50 text-xl font-light italic mb-12 leading-relaxed">
                  &ldquo;Un legado se construye con amor, pero se protege con previsión.&rdquo;
                </p>
                <Link href="/prevision" className="inline-flex items-center gap-3 bg-[#b8960c] text-[#0a0a0a] px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#d4af37] transition-all shadow-xl shadow-[#b8960c]/20">
                  Explorar Previsión
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>

              <div className="grid gap-6">
                {[
                  { icon: 'lock', title: 'Precios Congelados', desc: 'Proteja su patrimonio de la inflación futura. El costo pactado hoy se mantiene vigente.' },
                  { icon: 'family_restroom', title: 'Tranquilidad Familiar', desc: 'Evite que los suyos enfrenten decisiones complejas en el momento más vulnerable.' },
                  { icon: 'spa', title: 'Voluntad Respetada', desc: 'Diseñe hoy su homenaje póstumo según sus valores y preferencias.' },
                ].map((b, i) => (
                  <div key={i} className="flex gap-5 items-start group">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#b8960c] group-hover:border-[#b8960c] transition-all duration-500 text-white/40 group-hover:text-white">
                      <span className="material-symbols-outlined text-xl">{b.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-serif text-xl italic text-white mb-1">{b.title}</h4>
                      <p className="text-white/40 font-light text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 7: CONFIANZA → FONDO BLANCO (PASO 2)
      ============================== */}
      <section
        id="confianza"
        className="py-32 relative"
        style={{ background: '#FFFFFF', color: '#1A1A1A' }}
        aria-label="Confianza Comprobada"
      >
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-20">
            <h2 className="font-serif text-5xl md:text-7xl italic text-[#1a1a1a] mb-4">Confianza Comprobada</h2>
            <div className="w-16 h-px bg-[#b8960c]/60 mx-auto" />
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* IZQ: Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: 'fa-clock', label: 'Disponibilidad', target: '24', suffix: '/7', prefix: '' },
                { icon: 'fa-heart', label: 'Familias Atendidas', target: '5000', suffix: '', prefix: '+' },
                { icon: 'fa-medal', label: 'Años de Excelencia', target: '30', suffix: '', prefix: '' },
                { icon: 'fa-star', label: 'Satisfacción', target: '100', suffix: '%', prefix: '' },
              ].map((s, i) => (
                <div key={i} className="stat-card group">
                  <i className={`fas ${s.icon} text-2xl mb-3 text-[#1a1a1a]/20 group-hover:text-[#b8960c] transition-colors duration-500 block`} />
                  <div className="text-4xl font-serif font-black italic text-[#1a1a1a] mb-1">
                    {s.prefix}
                    <span className="stat-counter" data-target={s.target} data-suffix={s.suffix}>{s.target}{s.suffix}</span>
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#1a1a1a]/40">{s.label}</p>
                </div>
              ))}
            </div>

            {/* DER: Testimonios */}
            <div>
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 8000 }}
                spaceBetween={30}
                slidesPerView={1}
                autoHeight
                className="pb-12"
              >
                {[
                  {
                    name: 'Familia Rodríguez Vargas',
                    img: '/assets/images/ui/avatars-ia/avatar_testimonio_cliente_femenino_1772293313257.webp',
                    text: 'En el momento más difícil, Santa Margarita fue un faro de luz. Dignidad y respeto en cada detalle.',
                  },
                  {
                    name: 'Roberto Echeverría',
                    img: '/assets/images/ui/avatars-ia/avatar_testimonio_cliente_masculino_1772293330249.webp',
                    text: 'El plan Raúl superó toda expectativa. Discreción y honor en cada momento.',
                  },
                ].map((t, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="flex flex-col items-center text-center p-6">
                      <div className="relative w-20 h-20 mb-6 rounded-full overflow-hidden shadow-xl ring-2 ring-[#b8960c]/30">
                        <Image src={t.img} alt={t.name} fill className="object-cover" loading="lazy" />
                      </div>
                      <blockquote className="text-xl md:text-2xl font-serif italic text-[#1a1a1a]/75 leading-snug mb-6">
                        &ldquo;{t.text}&rdquo;
                      </blockquote>
                      <cite className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1a1a1a]/40 not-italic">— {t.name}</cite>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 8: CONTACTO → FONDO NEGRO
      ============================== */}
      <section
        id="contacto"
        className="py-32 relative"
        style={{ background: '#0a0a0a' }}
        aria-label="Contacto y Asesoría"
      >
        <div className="max-w-5xl mx-auto px-6 text-center text-[#f5f0eb] mb-16">
          <span className="material-symbols-outlined text-4xl text-[#b8960c] mb-4 block">contact_support</span>
          <h2 className="font-serif text-5xl md:text-6xl italic mb-4 text-white">Estamos Contigo.</h2>
          <p className="text-white/50 text-lg font-light italic max-w-2xl mx-auto">
            Nuestro equipo aguarda para brindarle contención inmediata en este momento.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 md:p-14 shadow-2xl">
            <h2 className="text-center text-2xl text-white font-serif italic mb-10">Asesoría Personalizada 24/7</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                className="w-full px-5 py-4 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#b8960c] transition-colors"
                placeholder="Nombre completo"
                required
              />
              <input
                type="tel"
                className="w-full px-5 py-4 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#b8960c] transition-colors"
                placeholder="Teléfono WhatsApp"
                required
              />
              <div className="md:col-span-2">
                <textarea
                  className="w-full px-5 py-4 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#b8960c] transition-colors"
                  rows={4}
                  placeholder="Cuéntanos tu necesidad..."
                />
              </div>
              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  className="bg-[#b8960c] text-[#0a0a0a] px-12 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#d4af37] transition-all inline-flex items-center gap-3"
                >
                  <i className="fab fa-whatsapp text-lg" />
                  Recibir Asesoría Inmediata
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
