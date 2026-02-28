'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Parallax Setup
    if (heroRef.current) {
      gsap.to(".hero-parallax-bg", {
        yPercent: 30,
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
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
      );
      gsap.fromTo(".hero-buttons",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 0.8 }
      );
    }

    // Fade up Cards (Planes)
    if (planesRef.current) {
      gsap.fromTo(".card-plane",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out",
          scrollTrigger: {
            trigger: planesRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Stats Counter Animation
    const counters = document.querySelectorAll('.stat-counter');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target') || '0');

      ScrollTrigger.create({
        trigger: diffRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            innerHTML: target,
            duration: 2.5,
            ease: "power2.out",
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
    <>
      {/* SECTION 1: HERO PARALLAX + SWIPER IA */}
      <section id="hero" ref={heroRef} className="relative h-[100vh] w-full overflow-hidden flex items-center justify-center m-0 bg-[#0a0a0a]">

        {/* Background Swiper */}
        <div className="absolute inset-0 z-0 hero-parallax-bg w-full h-[120%] -top-[10%]">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            allowTouchMove={false}
            className="w-full h-full"
          >
            {/* Slide 1 - Plan Raul + Avatar */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30 z-10"></div>
                <img src="/assets/images/ui/hero-bg.webp" alt="Memorial Plan Raúl - Funeraria Santa Margarita" className="absolute inset-0 w-full h-full object-cover" />
                {/* Floating IA Avatar Detail */}
                <div className="absolute right-[10%] bottom-[20%] z-20 hidden md:block opacity-90 mix-blend-screen scale-110">
                  <img src="/assets/images/ui/avatars-ia/avatar_familia_memorial_hijo_30s_1772292958547.webp" alt="Avatar Familia Duelo" className="w-[400px] h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]" />
                </div>
              </div>
            </SwiperSlide>
            {/* Slide 2 - Asistente Memorial */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 z-10"></div>
                <img src="/assets/images/servicios/memoriales/servicios-memoriales-capilla-01.webp" alt="Servicios Memoriales Exclusivos" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1542456079-22a7f59d9c22?q=80&w=2670&auto=format&fit=crop' }} />
                <div className="absolute left-[10%] bottom-[15%] z-20 hidden lg:block opacity-90 scale-100">
                  <img src="/assets/images/ui/avatars-ia/avatar_asistente_memorial_40s_1772293014273.webp" alt="Asistente Memorial Profesional" className="w-[450px] h-auto object-contain drop-shadow-[0_0_40px_rgba(0,0,0,0.8)]" />
                </div>
              </div>
            </SwiperSlide>
            {/* Slide 3 - Director */}
            <SwiperSlide>
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 z-10"></div>
                <img src="/assets/images/otros/clouds.webp" alt="Acompañamiento 24/7" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute right-[5%] bottom-[5%] z-20 hidden md:block opacity-95">
                  <img src="/assets/images/ui/avatars-ia/avatar_equipo_director_1772293297539.webp" alt="Director Funerario" className="w-[400px] h-auto object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.9)]" />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center w-full max-w-5xl px-6 mt-16 md:mt-0">
          <span className="block text-white/70 tracking-[0.3em] uppercase text-xs font-bold mb-6">Atención Permanente las 24 Horas</span>
          <h1 ref={titleRef} className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-medium mb-6 leading-[1.1] drop-shadow-2xl">
            Funeraria Santa Margarita <br className="hidden md:block" />
            <span className="italic font-light text-white/90">Acompañamiento Digno 24/7</span>
          </h1>
          <p className="hero-subtitle text-white/80 text-lg md:text-2xl font-light mb-12 tracking-wide drop-shadow-md max-w-3xl mx-auto">
            Excelencia, empatía y respeto absoluto. Planes integrales y memoriales exclusivos para honrar la vida de quienes amamos.
          </p>
          <div className="hero-buttons flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <a href="tel:+56964333760" className="bg-white text-black px-8 py-4 rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-colors w-full md:w-auto text-center flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <i className="fas fa-phone"></i> Llamar Ahora 24/7
            </a>
            <Link href="#planes" className="bg-transparent border border-white/40 text-white px-8 py-4 rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 w-full md:w-auto text-center backdrop-blur-sm">
              Ver Planes Desde $1.360.000
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce opacity-60">
          <span className="text-white text-xs uppercase tracking-[0.2em] mb-2 font-bold">Descubrir</span>
          <i className="fas fa-chevron-down text-white"></i>
        </div>
      </section>

      {/* SECTION 2: PLANES DESTACADOS (Hover 3D Grid) */}
      <section id="planes" ref={planesRef} className="py-24 bg-[#FAF9F6] dark:bg-[#121212] relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7E7D7D] block mb-3">Previsión y Dignidad</span>
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold mb-6 text-black dark:text-white">Planes Funerarios Premium</h2>
            <div className="w-20 h-0.5 bg-black mx-auto opacity-30 dark:bg-white dark:opacity-40"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card Azucena */}
            <div className="card-plane group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl transition-all duration-400 [transform-style:preserve-3d]">
              <div className="h-64 overflow-hidden relative">
                <img src="/assets/images/planes/estandar/planes-acacia-urna-01.webp" alt="Plan Funerario Azucena" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { e.currentTarget.src = '/assets/images/otros/acacia-main.webp' }} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">Servicio Esencial</div>
              </div>
              <div className="p-8 flex-grow flex flex-col transform translate-translate-z-10">
                <h3 className="font-serif text-2xl font-bold mb-1 text-black dark:text-white">Azucena</h3>
                <div className="mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-3xl font-black text-black dark:text-white">$1.360.000</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-3"><i className="fas fa-check text-[#25D366] mt-1"></i> Cofre estándar terminación fina</li>
                  <li className="flex items-start gap-3"><i className="fas fa-check text-[#25D366] mt-1"></i> Velación en capilla pública/domicilio</li>
                  <li className="flex items-start gap-3"><i className="fas fa-check text-[#25D366] mt-1"></i> Trámites legales y civil completos</li>
                </ul>
                <Link href="/planes/plan-azucena" className="w-full text-center py-4 border border-black dark:border-white text-black dark:text-white text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors rounded-sm">Detalle del Plan</Link>
              </div>
            </div>

            {/* Card Raul (VIP) */}
            <div className="card-plane group bg-black border border-zinc-800 rounded-sm overflow-hidden flex flex-col h-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-400 relative [transform-style:preserve-3d]">
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800 h-1"></div>
              <div className="h-64 overflow-hidden relative">
                <img src="/assets/images/otros/rauli-main.webp" alt="Plan Funerario Raúl Premium" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                <div className="absolute top-4 right-4 bg-yellow-600/90 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-lg">Premium Elegido ★</div>
              </div>
              <div className="p-8 flex-grow flex flex-col text-white transform translate-translate-z-10">
                <h3 className="font-serif text-2xl font-bold mb-1">Raúl</h3>
                <div className="mb-6 pb-6 border-b border-zinc-800">
                  <span className="text-3xl font-black">$3.590.000</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow text-sm text-zinc-400">
                  <li className="flex items-start gap-3"><i className="fas fa-check text-yellow-500 mt-1"></i> Cofre maderas nobles importadas VIP</li>
                  <li className="flex items-start gap-3"><i className="fas fa-check text-yellow-500 mt-1"></i> Sala Memorial Privada VIP 24 hrs</li>
                  <li className="flex items-start gap-3"><i className="fas fa-check text-yellow-500 mt-1"></i> Coronas florales premium y cafetería</li>
                  <li className="flex items-start gap-3"><i className="fas fa-check text-yellow-500 mt-1"></i> Traslado nacional + Anuncio prensa</li>
                </ul>
                <Link href="/planes/plan-raul" className="w-full text-center py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors rounded-sm">Detalle del Plan VIP</Link>
              </div>
            </div>

            {/* Card Queule */}
            <div className="card-plane group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl transition-all duration-400 [transform-style:preserve-3d]">
              <div className="h-64 overflow-hidden relative">
                <img src="/assets/images/otros/queule-main.webp" alt="Plan Funerario Queule" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm">Servicio Superior</div>
              </div>
              <div className="p-8 flex-grow flex flex-col transform translate-translate-z-10">
                <h3 className="font-serif text-2xl font-bold mb-1 text-black dark:text-white">Queue / Algarrobo</h3>
                <div className="mb-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-3xl font-black text-black dark:text-white">$2.150.000</span>
                </div>
                <ul className="space-y-4 mb-8 flex-grow text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-3"><i className="fas fa-check text-[#25D366] mt-1"></i> Urna madera sólida tallada</li>
                  <li className="flex items-start gap-3"><i className="fas fa-check text-[#25D366] mt-1"></i> Sala velatorio preferencial</li>
                  <li className="flex items-start gap-3"><i className="fas fa-check text-[#25D366] mt-1"></i> Arreglo floral y libro de condolencias</li>
                </ul>
                <Link href="/planes" className="w-full text-center py-4 border border-black dark:border-white text-black dark:text-white text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors rounded-sm">Ver Catálogo Completo</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICIOS MEMORIALES (Masonry Abstract) */}
      <section id="servicios" className="py-24 bg-white dark:bg-[#191919] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7E7D7D] block mb-3">Infraestructura de Inmortalidad</span>
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold mb-6 text-black dark:text-white">Servicios Memoriales Exclusivos</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8 font-light leading-relaxed">
                Ofrecemos salas de velatorio diseñadas arquitectónicamente para brindar paz y recogimiento. Espacios íntimos, climatizados y con acústica cuidada para acompañar a las familias en su proceso de duelo, apoyados por tecnología de homenajes virtuales.
              </p>
              <Link href="/memoriales" className="inline-flex items-center gap-3 text-black dark:text-white font-bold uppercase tracking-widest text-sm hover:opacity-70 transition-opacity border-b-2 border-black dark:border-white pb-1">
                Explorar Memoriales <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            {/* Abstract Masonry Layout */}
            <div className="grid grid-cols-2 gap-4 h-[600px]">
              <div className="col-span-1 row-span-2 relative rounded-sm overflow-hidden group">
                <img src="/assets/images/otros/acacia1.webp" alt="Sala de velatorio premium" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="col-span-1 row-span-1 relative rounded-sm overflow-hidden group">
                <img src="/assets/images/otros/team1.webp" alt="Equipo Profesional de Duelo" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="col-span-1 row-span-1 relative rounded-sm overflow-hidden bg-zinc-100 dark:bg-zinc-800 p-8 flex flex-col justify-center">
                <i className="fas fa-hand-holding-heart text-4xl text-black dark:text-white mb-4"></i>
                <h4 className="font-serif text-xl font-bold text-black dark:text-white mb-2">Acompañamiento Psicológico</h4>
                <p className="text-sm text-zinc-500">Asistencia integral post-servicio con especialistas en duelo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: DIFERENCIADORES (Stats GSAP) */}
      <section id="diferenciador" ref={diffRef} className="py-20 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/images/otros/clouds.webp')] bg-cover bg-center mix-blend-screen"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold mb-16">¿Por Qué Confían en Nosotros?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="flex flex-col items-center">
              <i className="fas fa-clock text-3xl mb-4 text-zinc-400"></i>
              <div className="text-4xl lg:text-5xl font-black mb-2 flex items-center justify-center">
                <span className="stat-counter" data-target="24">0</span><span className="text-2xl ml-1">/7</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Disponibilidad Inmediata</p>
            </div>
            <div className="flex flex-col items-center">
              <i className="fas fa-heart text-3xl mb-4 text-zinc-400"></i>
              <div className="text-4xl lg:text-5xl font-black mb-2 flex items-center justify-center">
                +<span className="stat-counter" data-target="5000">0</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Familias Atendidas</p>
            </div>
            <div className="flex flex-col items-center">
              <i className="fas fa-shield-alt text-3xl mb-4 text-zinc-400"></i>
              <div className="text-4xl lg:text-5xl font-black mb-2 flex items-center justify-center">
                <span className="stat-counter" data-target="15">0</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Años de Excelencia</p>
            </div>
            <div className="flex flex-col items-center">
              <i className="fas fa-map-marked-alt text-3xl mb-4 text-zinc-400"></i>
              <div className="text-4xl lg:text-5xl font-black mb-2 flex items-center justify-center">
                <span className="stat-counter" data-target="100">0</span><span className="text-2xl ml-1">%</span>
              </div>
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Cobertura Nacional</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TESTIMONIOS (Swiper) */}
      <section id="testimonios" className="py-24 bg-[#FAF9F6] dark:bg-[#121212] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7E7D7D] block mb-3">Historias Reales</span>
          <h2 className="font-serif text-4xl lg:text-5xl font-semibold mb-16 text-black dark:text-white">Lo Que Dicen Nuestras Familias</h2>

          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 8000 }}
            spaceBetween={50}
            slidesPerView={1}
            className="pb-16"
          >
            {/* Testimonio 1 */}
            <SwiperSlide>
              <div className="flex flex-col items-center">
                <img src="/assets/images/ui/avatars-ia/avatar_testimonio_cliente_femenino_1772293313257.webp" alt="Testimonio Cliente" className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-white dark:border-zinc-800 shadow-xl" />
                <div className="flex gap-1 text-black dark:text-white mb-6">
                  <i className="fas fa-star text-sm"></i><i className="fas fa-star text-sm"></i><i className="fas fa-star text-sm"></i><i className="fas fa-star text-sm"></i><i className="fas fa-star text-sm"></i>
                </div>
                <p className="text-xl md:text-2xl font-serif text-black dark:text-white italic leading-relaxed mb-6">
                  &quot;En el momento más oscuro de nuestras vidas, el equipo de Santa Margarita fue un faro de luz. Se encargaron de absolutamente todo, permitiéndonos enfocarnos en despedir a nuestra madre con la paz que ella merecía. Su profesionalismo es superado solo por su inmensa empatía.&quot;
                </p>
                <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">Familia Rodríguez Vargas</span>
              </div>
            </SwiperSlide>

            {/* Testimonio 2 */}
            <SwiperSlide>
              <div className="flex flex-col items-center">
                <img src="/assets/images/ui/avatars-ia/avatar_testimonio_cliente_masculino_1772293330249.webp" alt="Testimonio Cliente" className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-white dark:border-zinc-800 shadow-xl" />
                <div className="flex gap-1 text-black dark:text-white mb-6">
                  <i className="fas fa-star text-sm"></i><i className="fas fa-star text-sm"></i><i className="fas fa-star text-sm"></i><i className="fas fa-star text-sm"></i><i className="fas fa-star text-sm"></i>
                </div>
                <p className="text-xl md:text-2xl font-serif text-black dark:text-white italic leading-relaxed mb-6">
                  &quot;La sala de memoriales premium superó todas nuestras expectativas. El respeto, la discreción y el increíble nivel de detalle en el servicio del Plan Raúl nos brindaron un consuelo invaluable. Estaremos eternamente agradecidos por su gestión impecable.&quot;
                </p>
                <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">Roberto Echeverría</span>
              </div>
            </SwiperSlide>

            {/* Testimonio 3 - Abuela IA */}
            <SwiperSlide>
              <div className="flex flex-col items-center">
                <img src="/assets/images/ui/avatars-ia/avatar_familia_memorial_abuela_60s_1772292972995.webp" alt="Testimonio Cliente" className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-white dark:border-zinc-800 shadow-xl" />
                <div className="flex gap-1 text-black dark:text-white mb-6">
                  <i className="fas fa-star text-sm"></i><i className="fas fa-star text-sm"></i><i className="fas fa-star text-sm"></i><i className="fas fa-star text-sm"></i><i className="fas fa-star text-sm"></i>
                </div>
                <p className="text-xl md:text-2xl font-serif text-black dark:text-white italic leading-relaxed mb-6">
                  &quot;El trato humano y cálido del director funerario hizo que un proceso abrumador se sintiera llevadero. El traslado nacional fue rápido y sin contratiempos. Recomendamos Santa Margarita a cualquier familia que busque excelencia y verdadera compasión.&quot;
                </p>
                <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">Marta Salinas y Familia</span>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* SECTION 6: CTA EMERGENCY */}
      <section id="cta-principal" className="py-20 bg-zinc-900 text-center relative">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <span className="material-symbols-outlined text-5xl text-white/50 mb-6 block">support_agent</span>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold mb-6 text-white">Estamos Contigo Ahora.</h2>
          <p className="text-zinc-400 mb-10 text-lg">Independiente de la hora, nuestro equipo de asistencia está esperando para brindarte respuestas y contención inmediata.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+56964333760" className="bg-white text-black px-8 py-4 rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-zinc-200 transition-colors w-full sm:w-auto">
              Llamar al +56 9 6433 3760
            </a>
            <a href="https://wa.me/56964333760?text=Solicito%20asistencia%20urgente" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white px-8 py-4 rounded-sm font-bold text-sm uppercase tracking-widest hover:bg-[#20ba56] transition-colors w-full sm:w-auto">
              Asistencia por WhatsApp
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
