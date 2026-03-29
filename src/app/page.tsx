'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { planesData } from '../data/planes';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const planesRef = useRef<HTMLElement>(null);

  const [contactForm, setContactForm] = useState({ nombre: '', telefono: '', mensaje: '' });
  const [openPlanIndex, setOpenPlanIndex] = useState<number | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nombre, telefono, mensaje } = contactForm;
    if (!nombre.trim() || !telefono.trim()) return;
    const texto = encodeURIComponent(
      `Hola, soy *${nombre}*. Mi teléfono: ${telefono}.\n\n${mensaje || 'Solicito asesoría funeral.'}`
    );
    window.open(`https://wa.me/56964333760?text=${texto}`, '_blank', 'noopener,noreferrer');
  };

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

    // Generic Section Parallax
    const parallaxBgs = gsap.utils.toArray<HTMLElement>('.section-parallax-bg');
    parallaxBgs.forEach((bg) => {
      gsap.to(bg, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: bg.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

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

        /* Slogan plata brillante ANIMADO con borde negro y aura blanca dinámica */
        .slogan-plata {
          background: linear-gradient(
            to right, 
            #959595 0%, 
            #e0e0e0 20%, 
            #ffffff 45%, 
            #ffffff 55%, 
            #e0e0e0 80%, 
            #959595 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: 
            silverShimmer 12s linear infinite,
            auraPulse 12s ease-in-out infinite;
          
          /* Borde negro para legibilidad + Glow inicial */
          filter: 
            drop-shadow(1px 1px 0px rgba(0,0,0,1))
            drop-shadow(-1px -1px 0px rgba(0,0,0,1))
            drop-shadow(1px -1px 0px rgba(0,0,0,1))
            drop-shadow(-1px 1px 0px rgba(0,0,0,1))
            drop-shadow(0 0 15px rgba(255,255,255,0.4));
          
          will-change: filter;
        }

        @keyframes silverShimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @keyframes auraPulse {
          0%, 100% { 
            filter: 
              drop-shadow(1px 1px 0px rgba(0,0,0,1))
              drop-shadow(-1px -1px 0px rgba(0,0,0,1))
              drop-shadow(1px -1px 0px rgba(0,0,0,1))
              drop-shadow(-1px 1px 0px rgba(0,0,0,1))
              /* Brillo fino y definido */
              drop-shadow(0 0 4px rgba(255,255,255,0.4))
              drop-shadow(0 0 8px rgba(255,255,255,0.2));
          }
          50% { 
            filter: 
              drop-shadow(1px 1px 0px rgba(0,0,0,1))
              drop-shadow(-1px -1px 0px rgba(0,0,0,1))
              drop-shadow(1px -1px 0px rgba(0,0,0,1))
              drop-shadow(-1px 1px 0px rgba(0,0,0,1))
              /* Expansión controlada del destello periférico */
              drop-shadow(0 0 6px rgba(255,255,255,0.6))
              drop-shadow(0 0 12px rgba(255,255,255,0.3));
          }
        }

        @media (max-width: 768px) {
          .slogan-plata {
            background-size: 150% auto;
            animation: 
              silverShimmer 10s linear infinite,
              auraPulse 10s ease-in-out infinite;
          }
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

        /* Swiper Flechas Pasarela */
        .swiper-button-next.custom-arrow,
        .swiper-button-prev.custom-arrow {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 4px solid rgba(255, 255, 255, 0.5);
          color: white;
          width: 80px;
          height: 80px;
          border-radius: 24px;
          transition: all 0.5s ease;
          opacity: 0.85;
          z-index: 30;
        }
        @media (max-width: 768px) {
          .swiper-button-next.custom-arrow,
          .swiper-button-prev.custom-arrow {
            width: 50px;
            height: 50px;
            border-radius: 16px;
          }
        }
        .swiper-button-next.custom-arrow:hover,
        .swiper-button-prev.custom-arrow:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
          opacity: 1;
        }
        .swiper-button-disabled.custom-arrow {
          opacity: 0 !important;
          pointer-events: none !important;
        }

        /* Swiper Paginación Planes - hidden for pasarela */
        .planes-swiper .swiper-pagination {
          display: none;
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

        /* Removed gradient planes-section */
        @keyframes fadeUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-up { 
          animation: fadeUp 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; 
        }
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
        {/* Carrusel + parallax GPU-acelerado */}
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

        {/* Badge 24Hrs – Centrado arriba */}
        <div className="badge-24hrs-hero absolute top-[14%] left-[50%] -translate-x-1/2 z-30 flex items-center gap-2 px-5 py-2.5 cursor-default transition-all duration-300 whitespace-nowrap">
          <i className="fas fa-clock text-sm" />
          <span className="text-[11px] font-black uppercase tracking-widest">Atención Permanente 24Hrs</span>
        </div>

        {/* Contenido Central: Slogans fijos centrado */}
        <div
          ref={titleRef}
          className="hero-content relative z-20 text-center w-full max-w-5xl px-6"
        >
          <h1 className="slogan-plata font-serif text-4xl md:text-7xl lg:text-8xl font-light mb-6 leading-tight tracking-tight drop-shadow-2xl">
            Acompañamos con respeto,<br />
            <span className="italic">despedimos con amor</span>
          </h1>
          <p className="sub-slogan text-[#f5f0eb]/80 text-lg md:text-2xl font-light tracking-wide max-w-3xl mx-auto italic drop-shadow-lg">
            &ldquo;Donde el respeto se encuentra con la excelencia, honramos cada vida con dignidad&rdquo;
          </p>
        </div>

        {/* CTAs Hero Bottom Center */}
        <div className="hero-ctas-bottom">
          <Link
            href="/cotizacion"
            className="inline-flex items-center justify-center gap-2 bg-[#f5f0eb] text-[#0a0a0a] px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white hover:scale-105 transition-all duration-300 shadow-2xl shadow-black/40"
          >
            <i className="fas fa-file-contract text-sm" />
            Cotización Online
          </Link>
          <Link
            href="/prevision"
            className="inline-flex items-center justify-center gap-2 bg-[#b8960c] text-[#0a0a0a] px-8 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:bg-[#d4af37] hover:scale-105 transition-all duration-300 shadow-2xl shadow-[#b8960c]/30"
          >
            <i className="fas fa-shield-alt text-sm" />
            Previsión Anticipada
          </Link>
        </div>
      </section>

      {/* ============================
          SECTION 2: PLANES FUNERARIOS → FONDO NEGRO EXACTO
      ============================== */}
      <section
        id="planes"
        ref={planesRef}
        className="py-16 md:py-32 relative bg-[#1A1A1A] text-white overflow-hidden"
        aria-label="Planes Funerarios"
      >
        <div className="section-parallax-bg absolute z-0 inset-0 w-full h-[120%] -top-[10%] opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/assets/images/otros/clouds.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container mx-auto px-4 relative z-10">
          <header className="text-center mb-6 md:mb-12 relative z-10 animate-fade-up flex flex-col items-center">
            <div className="inline-block border border-gray-600 rounded-full px-6 py-1 text-[11px] md:text-sm text-gray-400 mb-6 font-bold tracking-[0.3em] uppercase">
              PROTOCOLOS DE DIGNIDAD
            </div>
            <h2 className="text-5xl md:text-7xl mb-4 font-serif italic text-white drop-shadow-2xl ceo-title-2">
              <span translate="no" className="notranslate">Planes Funerarios</span>
            </h2>
            <p className="text-[#a1a1aa] text-lg md:text-xl font-light italic mb-8 max-w-2xl mx-auto ceo-text-desc">
              Soluciones personalizadas según tus necesidades
            </p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#b8960c] to-transparent mx-auto" />
          </header>

          <div className="swiper-carousel relative max-w-[1400px] mx-auto">
            <Swiper
              modules={[Autoplay, Navigation, EffectCoverflow]}
              navigation={{
                nextEl: '.swiper-button-next.custom-arrow',
                prevEl: '.swiper-button-prev.custom-arrow',
              }}
              effect="coverflow"
              onClick={(swiper) => {
                if (swiper.clickedIndex === swiper.activeIndex + 1) {
                  swiper.slideNext();
                } else if (swiper.clickedIndex === swiper.activeIndex - 1) {
                  swiper.slidePrev();
                }
              }}
              coverflowEffect={{
                rotate: 10,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              centeredSlides={true}
              spaceBetween={16}
              slidesPerView={1}
              loop={false}
              speed={800}
              autoplay={{ delay: 10000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1.5, spaceBetween: 24 },
                768: { slidesPerView: 2.2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1440: { slidesPerView: 3.5, spaceBetween: 24 }
              }}
              className="!pt-4 !pb-10 md:!py-8"
            >
              {planesData.map((plan, i) => (
                <SwiperSlide key={i} className="flex justify-center px-4 md:p-4">
                  <div className="plan-card relative w-full sm:max-w-sm h-[32rem] md:h-[36rem] lg:h-[40rem] bg-gradient-to-b from-black/95 to-gray-900 text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col hover:shadow-3xl hover:-translate-y-2 transition-all duration-700 group cursor-pointer border border-white/5 mx-auto">
                    
                    {/* Hero Img Plan Exacta */}
                    <div className="h-[40%] bg-cover bg-center relative group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('${plan.img}')` }}>
                      {i >= 5 && ( /* Raúl and Castaño are highlighted dynamically based on index for highest price tiers */
                        <span className="absolute top-4 right-4 md:top-6 md:right-6 bg-gradient-to-r from-amber-500 to-yellow-400 md:bg-none md:bg-amber-400/90 text-[#1a1a1a] md:text-black px-3 py-1.5 md:px-4 md:py-2 rounded-full font-black md:font-bold text-[9px] md:text-sm shadow-xl md:shadow-2xl backdrop-blur-md md:backdrop-blur-sm uppercase tracking-[0.2em] md:tracking-wider z-10 flex items-center gap-1.5 md:gap-0 border border-amber-300/50 md:border-transparent transition-transform group-hover:scale-105">
                          <span className="material-symbols-outlined text-[14px] md:hidden">star</span>
                          <span className="md:ml-1">Destacado</span>
                        </span>
                      )}
                    </div>

                    {/* Info Container */}
                    <div className="p-5 md:p-8 flex flex-col justify-between flex-1 relative z-10 bg-transparent">
                      <div className="text-center">
                        <h3 className="text-[clamp(1.5rem,5vw,2.25rem)] md:text-4xl font-black mb-2 drop-shadow-xl font-serif italic">{plan.nombre}</h3>
                        <div className="text-[clamp(1.25rem,4vw,2.25rem)] md:text-4xl font-black mb-4 md:mb-6 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl">{plan.precio}</div>
                      </div>
                      
                      {/* Badges Top2 Servicios */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        {plan.badges.map((badge, j) => (
                          <div key={j} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-3 px-4 rounded-xl font-bold text-[10px] md:text-xs shadow-xl backdrop-blur transition-all text-center flex items-center justify-center hover:bg-emerald-500/20">
                            ✓ {badge.toUpperCase()}
                          </div>
                        ))}
                      </div>

                      {/* CTAs */}
                      <div className="flex gap-3 pt-4 border-t border-white/10 mt-auto relative z-20">
                        <button onClick={(e) => { e.stopPropagation(); setOpenPlanIndex(i); }} className="flex-1 bg-white/5 backdrop-blur border border-white/20 text-white py-3.5 px-4 rounded-xl font-bold text-[11px] md:text-sm hover:bg-white/10 transition-all shadow-xl text-center uppercase tracking-widest flex items-center justify-center">
                          Ver Detalles
                        </button>
                        <a href="tel:+56964333760" className="flex-1 bg-gradient-to-r from-amber-400 to-orange-500 text-black py-3.5 px-4 rounded-xl font-bold text-[11px] md:text-sm hover:from-amber-500 hover:to-orange-600 transition-all shadow-xl text-center uppercase tracking-widest flex items-center justify-center">
                          Llamar Ahora
                        </a>
                      </div>
                    </div>

                    {/* Tooltip Full Services - Acivated on Click */}
                    <div className={`servicios-tooltip absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-2xl p-6 md:p-8 rounded-3xl transition-all duration-500 z-50 overflow-y-auto flex flex-col ${openPlanIndex === i ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-8 pointer-events-none'}`} style={{ scrollbarWidth: 'thin', scrollbarColor: '#b5900e transparent' }}>
                      <div className="sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-3xl pb-4 pt-2 border-b border-amber-400/30 mb-6 z-10 flex justify-between items-center">
                         <h4 className="font-bold text-xl md:text-2xl text-amber-400 font-serif italic drop-shadow-lg">{plan.nombre}</h4>
                         <button onClick={(e) => { e.stopPropagation(); setOpenPlanIndex(null); }} className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white border border-white/20 shadow-md">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                         </button>
                      </div>
                      <ul className="list-none space-y-4 text-gray-200 pb-10">
                        {plan.serviciosFull.map((s, idx) => (
                          <li key={idx} className="flex gap-4 items-start text-sm md:text-[15px] leading-relaxed group/li transition-colors hover:text-white">
                            <span className="text-amber-500 font-black shrink-0 mt-0.5 flex items-center justify-center bg-amber-500/10 w-5 h-5 md:w-6 md:h-6 rounded-full border border-amber-500/20 shadow-md group-hover/li:bg-amber-500 group-hover/li:text-black transition-colors">✓</span> 
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows Stitch-Exactas */}
            <div className="swiper-button-prev custom-arrow absolute -left-4 md:-left-20 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-black/60 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white/50 hover:bg-white/30 opacity-80 hover:opacity-100 transition-all z-20">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </div>
            <div className="swiper-button-next custom-arrow absolute -right-4 md:-right-20 top-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 bg-black/60 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white/50 hover:bg-white/30 opacity-80 hover:opacity-100 transition-all z-20">
               <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          SECTION 3: SERVICIOS → FONDO BLANCO (PASO 2)
      ============================== */}
      <section
        id="servicios"
        className="py-32 relative bg-white text-[#1A1A1A] overflow-hidden"
        aria-label="Servicios Funerarios"
      >
        <div className="section-parallax-bg absolute z-0 inset-0 w-full h-[120%] -top-[10%] opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url('/assets/images/otros/clouds.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="badge-vidrio-dark inline-block text-[9px] font-black uppercase tracking-[0.6em] text-[#1a1a1a]/60 px-5 py-2 mb-10">
                Acompañamiento Completo
              </span>
              <h2 className="font-serif text-5xl lg:text-7xl italic mb-8 leading-tight text-[#1a1a1a] ceo-title-2">
                Servicios<br />Funerarios
              </h2>
              <p className="text-[#1a1a1a]/60 text-xl font-light italic mb-12 leading-relaxed ceo-text-main">
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
        className="py-32 relative bg-[#1A1A1A] text-white overflow-hidden"
        aria-label="Memoriales Digitales"
      >
        <div className="section-parallax-bg absolute z-0 inset-0 w-full h-[120%] -top-[10%] opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/assets/images/otros/clouds.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="badge-vidrio inline-block text-[9px] font-black uppercase tracking-[0.6em] text-white/50 px-5 py-2 mb-10">
            Espacios del Recuerdo
          </span>
          <h2 className="font-serif text-5xl md:text-7xl italic mb-6 text-white ceo-title-2">
            Memoriales
          </h2>
          <p className="text-white/50 text-xl font-light italic max-w-3xl mx-auto mb-16 ceo-text-main">
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
        className="py-32 relative bg-white text-[#1A1A1A] overflow-hidden"
        aria-label="Sobre Nosotros"
      >
        <div className="section-parallax-bg absolute z-0 inset-0 w-full h-[120%] -top-[10%] opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url('/assets/images/otros/clouds.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <header className="text-center mb-20">
            <span className="badge-vidrio-dark inline-block text-[9px] font-black uppercase tracking-[0.6em] text-[#1a1a1a]/50 px-5 py-2 mb-8">
              Desde 1996
            </span>
            <h2 className="font-serif text-5xl md:text-7xl italic mb-4 text-[#1a1a1a] ceo-title-2">
              Nuestro Legado
            </h2>
            <p className="text-[#1a1a1a]/60 text-xl font-light italic max-w-3xl mx-auto ceo-text-main">
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
        className="py-32 relative bg-[#1A1A1A] text-white"
        aria-label="Previsión Familiar"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="rounded-[2.5rem] p-10 md:p-20 border border-white/10 bg-white/[0.03] relative overflow-hidden">
            <div className="section-parallax-bg absolute z-0 inset-0 w-full h-[120%] -top-[10%] opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/assets/images/otros/clouds.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="badge-vidrio inline-block text-[9px] font-black uppercase tracking-[0.6em] text-white/50 px-5 py-2 mb-8">
                  Protocolo Vitalicio
                </span>
                <h2 className="font-serif text-5xl md:text-7xl italic leading-none text-white mb-8 ceo-title-2">
                  La Paz de <br /> Saber Decidir
                </h2>
                <p className="text-white/50 text-xl font-light italic mb-12 leading-relaxed ceo-text-main">
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
        className="py-32 relative bg-white text-[#1A1A1A] overflow-hidden"
        aria-label="Confianza Comprobada"
      >
        <div className="section-parallax-bg absolute z-0 inset-0 w-full h-[120%] -top-[10%] opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url('/assets/images/otros/clouds.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <header className="text-center mb-20">
            <h2 className="font-serif text-5xl md:text-7xl italic text-[#1a1a1a] mb-4 ceo-title-2">Confianza Comprobada</h2>
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
                    img: '/assets/images/ui/avatars-ia/avatar-testimonio-femenino.webp',
                    text: 'En el momento más difícil, Santa Margarita fue un faro de luz. Dignidad y respeto en cada detalle.',
                  },
                  {
                    name: 'Roberto Echeverría',
                    img: '/assets/images/ui/avatars-ia/avatar-testimonio-masculino.webp',
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
        className="py-32 relative bg-[#0a0a0a]"
        aria-label="Contacto y Asesoría"
      >
        <div className="max-w-5xl mx-auto px-6 text-center text-[#f5f0eb] mb-16">
          <span className="material-symbols-outlined text-4xl text-[#b8960c] mb-4 block">contact_support</span>
          <h2 className="font-serif text-5xl md:text-6xl italic mb-4 text-white">Estamos Contigo.</h2>
          <p className="text-white/50 text-lg font-light italic max-w-2xl mx-auto">
            Nuestro equipo aguarda para brindarle contención inmediata en este momento.
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="rounded-[2.5rem] p-10 md:p-14 border border-white/10 bg-white/[0.03] relative overflow-hidden">
            <div className="section-parallax-bg absolute z-0 inset-0 w-full h-[120%] -top-[10%] opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url('/assets/images/otros/clouds.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="relative z-10">
              <h2 className="text-center text-2xl text-white font-serif italic mb-10">Asesoría Personalizada 24/7</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleContactSubmit} noValidate>
                <input
                  type="text"
                  className="w-full px-5 py-4 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#b8960c] transition-colors"
                  placeholder="Nombre completo *"
                  required
                  value={contactForm.nombre}
                  onChange={(e) => setContactForm(f => ({ ...f, nombre: e.target.value }))}
                />
                <input
                  type="tel"
                  className="w-full px-5 py-4 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#b8960c] transition-colors"
                  placeholder="Teléfono WhatsApp *"
                  required
                  value={contactForm.telefono}
                  onChange={(e) => setContactForm(f => ({ ...f, telefono: e.target.value }))}
                />
                <div className="md:col-span-2">
                  <textarea
                    className="w-full px-5 py-4 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#b8960c] transition-colors"
                    rows={4}
                    placeholder="Cuéntanos tu necesidad..."
                    value={contactForm.mensaje}
                    onChange={(e) => setContactForm(f => ({ ...f, mensaje: e.target.value }))}
                  />
                </div>
                <div className="md:col-span-2 text-center">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-3 bg-[#b8960c] text-[#0a0a0a] px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#d4af37] hover:scale-105 transition-all duration-300 shadow-xl shadow-[#b8960c]/20 disabled:opacity-70 disabled:hover:scale-100"
                    disabled={!contactForm.nombre.trim() || !contactForm.telefono.trim()}
                  >
                    <i className="fab fa-whatsapp text-lg" />
                    Contáctanos
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
