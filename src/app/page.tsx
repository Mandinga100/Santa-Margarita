'use client';

import { useEffect, useRef, useState } from 'react';
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const planesRef = useRef<HTMLElement>(null);
  const diffRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    setIsLoaded(true);

    // Hero Parallax Setup
    if (heroRef.current) {
      gsap.to(".hero-parallax-bg", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Advanced Title Reveal
    if (titleRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.5, ease: "expo.out", delay: 0.2 }
        );
        gsap.fromTo(".hero-subtitle",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.5, ease: "expo.out", delay: 0.5 }
        );
        gsap.fromTo(".hero-buttons",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "expo.out", delay: 0.8 }
        );
      }, heroRef);
      return () => ctx.revert();
    }

    // Fade up Cards (Planes)
    if (planesRef.current) {
      gsap.fromTo(".card-plane",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "expo.out",
          scrollTrigger: {
            trigger: planesRef.current,
            start: "top 85%",
          }
        }
      );
    }

    // Stats Counter Animation
    const counters = document.querySelectorAll('.stat-counter');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');

      ScrollTrigger.create({
        trigger: counter,
        start: "top 90%",
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            innerHTML: target,
            duration: 2.5,
            ease: "expo.out",
            snap: { innerHTML: 1 },
            onUpdate: function () {
              const val = Math.ceil(parseFloat(this.targets()[0].innerHTML));
              counter.innerHTML = val.toLocaleString('es-CL') + (counter.getAttribute('data-suffix') || '');
            }
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="bg-black">
      {/* SECTION 1: HERO PARALLAX + SWIPER IA */}
      <section id="hero" ref={heroRef} className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center m-0 bg-black">

        {/* Background Swiper - Optimized for LCP */}
        <div className="absolute inset-0 z-0 hero-parallax-bg w-full h-[110%] -top-[5%]">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            loop={true}
            allowTouchMove={false}
            className="w-full h-full"
          >
            {/* Slide 1 - Plan Raul + Avatar */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10"></div>
                <Image
                  src="/assets/images/ui/hero-bg.webp"
                  alt="Memorial Plan Raúl - Funeraria Santa Margarita"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute right-[5%] bottom-[15%] z-20 hidden lg:block opacity-80 mix-blend-screen scale-110">
                  <Image
                    src="/assets/images/ui/avatars-ia/avatar_familia_memorial_hijo_30s_1772292958547.webp"
                    alt="Avatar Familia"
                    width={500}
                    height={700}
                    className="object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.05)]"
                  />
                </div>
              </div>
            </SwiperSlide>
            {/* Slide 2 - Asistente Memorial */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10"></div>
                <Image
                  src="/assets/images/servicios/memoriales/servicios-memoriales-capilla-01.webp"
                  alt="Servicios Memoriales Exclusivos"
                  fill
                  className="object-cover"
                />
                <div className="absolute left-[5%] bottom-[10%] z-20 hidden xl:block opacity-90">
                  <Image
                    src="/assets/images/ui/avatars-ia/avatar_asistente_memorial_40s_1772293014273.webp"
                    alt="Asistente Memorial Profesional"
                    width={550}
                    height={800}
                    className="object-contain"
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Hero Content - Editorial Elegance */}
        <div className="relative z-20 text-center w-full max-w-6xl px-6">
          <span className="block text-white/40 tracking-[0.8em] uppercase text-[10px] font-black mb-8">Atención Permanente 24H</span>
          <h1 ref={titleRef} className="font-serif text-5xl md:text-8xl lg:text-9xl text-white font-light mb-10 leading-[0.85] tracking-tighter">
            Venerar la <br className="hidden md:block" />
            <span className="italic font-light text-white/80">Memoria Eterna</span>
          </h1>
          <p className="hero-subtitle text-white/50 text-xl md:text-2xl font-light mb-16 tracking-wide max-w-3xl mx-auto italic">
            "Donde el respeto se encuentra con la excelencia, honramos cada vida con dignidad suprema."
          </p>
          <div className="hero-buttons flex flex-col md:flex-row items-center justify-center gap-6">
            <a href="tel:+56964333760" className="bg-white text-black px-12 py-6 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-200 transition-all duration-500 w-full md:w-auto text-center shadow-3xl shadow-white/5">
              Llamada Urgente
            </a>
            <Link href="#planes" className="bg-transparent border border-white/20 text-white px-12 py-6 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-700 w-full md:w-auto text-center backdrop-blur-xl">
              Explorar Protocolos
            </Link>
          </div>
        </div>

        {/* Scroll Indicator - Minimalist */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-20">
          <div className="w-px h-20 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* SECTION 2: PLANES DESTACADOS - Inmersive Dark Mode */}
      <section id="planes" ref={planesRef} className="py-48 bg-black relative z-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <header className="text-center mb-32">
            <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/20 block mb-6">Protocolos de Dignidad</span>
            <h2 className="font-serif text-5xl md:text-7xl italic mb-10 text-white">Planes Funerarios Premium</h2>
            <div className="w-16 h-px bg-white/10 mx-auto"></div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {/* Card Raul (VIP Highlighted) */}
            <div className="card-plane order-first md:order-none lg:col-start-2 group bg-white text-black rounded-[3rem] overflow-hidden flex flex-col h-full shadow-3xl scale-105 z-10 transition-all duration-1000">
              <div className="h-80 overflow-hidden relative">
                <Image src="/assets/images/otros/rauli-main.webp" alt="Plan Funerario Raúl Premium" fill className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" />
                <div className="absolute top-6 right-6 bg-black text-white px-6 py-2 text-[8px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl">Recomendación VIP</div>
              </div>
              <div className="p-16 flex-grow flex flex-col">
                <h3 className="font-serif text-4xl mb-2 italic">Raúl Premium</h3>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-black/30 mb-8">El Estándar Supremo</span>
                <div className="mb-10 pb-10 border-b border-black/5">
                  <span className="text-5xl font-serif font-black italic">$3.590.000</span>
                  <p className="text-[8px] font-black uppercase tracking-widest mt-2 opacity-30">Costo Final / Incluye IVA</p>
                </div>
                <ul className="space-y-6 mb-12 flex-grow">
                  {['Cofre Maderas Nobles VIP', 'Asistente Memorial 24h', 'Protocolo de Gala Mercedes', 'Suite VIP Preferencial'].map(item => (
                    <li key={item} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-60">
                      <span className="material-symbols-outlined text-sm">verified</span> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/cotizacion?plan=premium" className="w-full text-center py-6 bg-black text-white text-[9px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all rounded-full shadow-2xl">Seleccionar Plan</Link>
              </div>
            </div>

            {/* Card Queule */}
            <div className="card-plane group bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden flex flex-col h-full hover:border-white/20 transition-all duration-1000">
              <div className="h-80 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-1000">
                <Image src="/assets/images/otros/queule-main.webp" alt="Plan Funerario Queule" fill className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" />
              </div>
              <div className="p-16 flex-grow flex flex-col">
                <h3 className="font-serif text-3xl mb-8 italic text-white/90">Queule</h3>
                <div className="mb-10 pb-10 border-b border-white/5">
                  <span className="text-4xl font-serif font-black italic text-white">$2.990.000</span>
                </div>
                <ul className="space-y-6 mb-12 flex-grow">
                  {['Cofre Roble Nacional', 'Sala Velación 24h', 'Trámites Legales', 'Arreglos Florales'].map(item => (
                    <li key={item} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                      <span className="material-symbols-outlined text-sm">radio_button_checked</span> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/planes" className="w-full text-center py-6 border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all rounded-full">Ver Detalles</Link>
              </div>
            </div>

            {/* Card Azucena */}
            <div className="card-plane group bg-white/[0.02] border border-white/5 rounded-[3rem] overflow-hidden flex flex-col h-full hover:border-white/20 transition-all duration-1000">
              <div className="h-80 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-1000">
                <Image src="/assets/images/planes/estandar/planes-acacia-urna-01.webp" alt="Plan Funerario Azucena" fill className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out" />
              </div>
              <div className="p-16 flex-grow flex flex-col">
                <h3 className="font-serif text-3xl mb-8 italic text-white/90">Azucena</h3>
                <div className="mb-10 pb-10 border-b border-white/5">
                  <span className="text-4xl font-serif font-black italic text-white">$1.360.000</span>
                </div>
                <ul className="space-y-6 mb-12 flex-grow">
                  {['Cofre Tradicional', 'Servicio Funeral Digno', 'Asesoría Familiar', 'Capilla Básica'].map(item => (
                    <li key={item} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                      <span className="material-symbols-outlined text-sm">radio_button_checked</span> {item}
                    </li>
                  ))}
                </ul>
                <Link href="/planes" className="w-full text-center py-6 border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all rounded-full">Ver Detalles</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICIOS MEMORIALES - Split Layout Premium */}
      <section id="servicios" className="py-48 bg-black relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative">
              <span className="text-[9px] font-black uppercase tracking-[0.6em] text-white/20 block mb-8">Espacios de Recogimiento</span>
              <h2 className="font-serif text-6xl lg:text-8xl italic mb-12 text-white leading-tight">Salas <br /> Memoriales</h2>
              <p className="text-white/40 text-2xl font-light italic mb-16 leading-relaxed">
                "Arquitectura diseñada para la paz. Ambientes climatizados, acústica perfecta y honor absoluto."
              </p>
              <Link href="/servicios" className="inline-flex items-center gap-6 text-white font-black uppercase tracking-[0.4em] text-[10px] group transition-all">
                Explorar el Legado
                <span className="material-symbols-outlined group-hover:translate-x-4 transition-transform duration-500">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-12 gap-6 h-[700px]">
              <div className="col-span-7 relative rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-[2s]">
                <Image src="/assets/images/otros/acacia1.webp" alt="Sala Memorial" fill className="object-cover" />
              </div>
              <div className="col-span-5 grid gap-6">
                <div className="relative rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-[2s]">
                  <Image src="/assets/images/otros/team1.webp" alt="Equipo" fill className="object-cover" />
                </div>
                <div className="bg-white/[0.03] p-12 rounded-[2.5rem] flex flex-col justify-center border border-white/5">
                  <span className="material-symbols-outlined text-4xl text-white/20 mb-6">psychology</span>
                  <h4 className="font-serif text-2xl italic text-white mb-4">Acompañamiento</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Soporte emocional post-servicio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: DIFERENCIADORES - Stats Performance */}
      <section id="diferenciador" ref={diffRef} className="py-32 bg-black border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 md:gap-10">
            {[
              { label: 'Disponibilidad', target: '24', suffix: '/7', icon: 'schedule' },
              { label: 'Familias', target: '5000', prefix: '+', icon: 'favorite' },
              { label: 'Excelencia', target: '30', suffix: ' Años', icon: 'verified' },
              { label: 'Cobertura', target: '100', suffix: '%', icon: 'map' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center group">
                <span className="material-symbols-outlined text-4xl mb-10 text-white/10 group-hover:text-white transition-all duration-700">{stat.icon}</span>
                <div className="text-6xl md:text-7xl font-serif font-black italic mb-4 text-white">
                  {stat.prefix}<span className="stat-counter" data-target={stat.target}>{stat.target}</span>{stat.suffix}
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: TESTIMONIOS - Swiper Premium */}
      <section id="testimonios" className="py-48 bg-black relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/20 block mb-12">Voces de Aliento</span>

          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 9000 }}
            spaceBetween={50}
            slidesPerView={1}
            autoHeight={true}
            className="pb-24 testimonios-swiper"
          >
            {[
              {
                name: 'Familia Rodríguez Vargas',
                img: '/assets/images/ui/avatars-ia/avatar_testimonio_cliente_femenino_1772293313257.webp',
                text: 'En el momento más oscuro, Santa Margarita fue un faro de luz. Dignidad pura para nuestra madre.'
              },
              {
                name: 'Roberto Echeverría',
                img: '/assets/images/ui/avatars-ia/avatar_testimonio_cliente_masculino_1772293330249.webp',
                text: 'El Plan Premium superó toda expectativa. Discreción y honor en cada detalle.'
              }
            ].map((t, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex flex-col items-center">
                  <div className="relative w-28 h-28 mb-12 rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-3xl">
                    <Image src={t.img} alt={t.name} fill className="object-cover" />
                  </div>
                  <blockquote className="text-3xl md:text-5xl font-serif italic text-white/80 leading-snug mb-12 px-4">
                    &quot;{t.text}&quot;
                  </blockquote>
                  <cite className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 non-italic">— {t.name}</cite>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* SECTION 6: CTA EMERGENCY - Dark Minimalist */}
      <section id="cta-principal" className="py-48 bg-white text-black relative rounded-t-[5rem] overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <span className="material-symbols-outlined text-6xl text-black/10 mb-12 block">contact_support</span>
          <h2 className="font-serif text-5xl md:text-8xl italic mb-12 leading-none">Estamos Contigo.</h2>
          <p className="text-black/40 mb-16 text-2xl font-light italic max-w-2xl mx-auto">Nuestro equipo de asistencia profesional aguarda para brindarle contención inmediata en este momento.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a href="tel:+56964333760" className="bg-black text-white px-16 py-7 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all shadow-3xl w-full md:w-auto">
              Atención Inmediata
            </a>
            <a href="https://wa.me/56964333760" target="_blank" rel="noopener noreferrer" className="border border-black/10 text-black px-16 py-7 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-black/5 transition-all w-full md:w-auto">
              WhatsApp 24H
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
