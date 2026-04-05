'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const WA_SVG = (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { planesData as planes } from '../../data/planes';

const WA_NUMBER = '56964333760';

function waLink(planNombre: string): string {
  const msg = `Hola, quiero hablar con un ejecutivo sobre el ${planNombre} de Funeraria Santa Margarita.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// Atributos comparativos — detectados desde serviciosFull + incluye
const comparativoAtributos = [
  { key: 'asesoría',              label: 'Asesoría' },
  { key: 'inscripción',           label: 'Inscripción Registro Civil' },
  { key: 'carroza',               label: 'Carroza Panorámica' },
  { key: 'vehículo de acompañ',   label: 'Vehículo Acompañamiento' },
  { key: 'libro de condolencias', label: 'Libro de Condolencias' },
  { key: 'cafetería',             label: 'Cortesía Cafetería' },
  { key: 'arreglo floral',        label: 'Arreglo Floral' },
  { key: 'aviso de prensa',       label: 'Aviso de Prensa' },
  { key: 'sala',                  label: 'Sala de Velación' },
  { key: 'certificación',         label: 'Certificación Médica' },
];

function tieneAtributo(plan: typeof planes[0], key: string): boolean {
  return [...plan.incluye, ...plan.serviciosFull, plan.descripcion]
    .join(' ')
    .toLowerCase()
    .includes(key.toLowerCase());
}

export default function PlanesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo('.planes-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'expo.out' }
      );
      gsap.fromTo('.plan-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'expo.out',
          scrollTrigger: { trigger: '.planes-grid', start: 'top 85%' },
        }
      );
      gsap.fromTo('.table-row',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, duration: 1.2, stagger: 0.08, ease: 'expo.out',
          scrollTrigger: { trigger: '.comparison-table', start: 'top 80%' },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-[#1A1A1A] text-white font-display pt-24 md:pt-32 pb-24 md:pb-48 selection:bg-white/10 antialiased overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero ── */}
        <section className="text-center mb-16 md:mb-48 planes-header">
          <span className="text-xs md:text-sm font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/50 block mb-6 md:mb-12">
            Protocolos de Dignidad Suprema
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-9xl mb-6 md:mb-12 italic leading-[0.9] tracking-tighter ceo-title-1">
            Nuestros{' '}
            <span translate="no" className="text-white/40 notranslate">Planes</span>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto text-base md:text-2xl font-light leading-relaxed italic border-x border-white/5 px-4 md:px-12 ceo-text-main">
            &ldquo;Cada vida es una obra maestra que merece ser honrada con la mayor solemnidad y excelencia posible.&rdquo;
          </p>
        </section>

        {/* ── GRID DE PLANES (arriba del comparativo) ── */}
        <div className="planes-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7 mb-20 md:mb-48">
          {planes.map(plan => (
            <article
              key={plan.id}
              className={`plan-card p-5 md:p-8 rounded-3xl flex flex-col transition-all duration-1000 shadow-2xl group ${
                plan.destacado
                  ? 'bg-white text-black md:scale-[1.03] z-10 shadow-white/5 border-none'
                  : 'bg-white/[0.01] border border-white/5 hover:border-white/20 shadow-black/50 hover:bg-white/[0.03]'
              }`}
            >
              {/* Icon */}
              <span
                className={`material-symbols-outlined text-4xl mb-5 transition-all duration-1000 ${
                  plan.destacado ? 'text-black' : 'text-white/10 group-hover:text-amber-500/50 group-hover:scale-110'
                }`}
              >
                {plan.icon}
              </span>

              {/* Badge recomendado */}
              {plan.destacado && (
                <span className="inline-block bg-black text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full mb-5 self-start">
                  RECOMENDADO
                </span>
              )}

              {/* Nombre */}
              <h3 className="font-serif text-2xl md:text-3xl mb-3 italic leading-tight">{plan.nombre}</h3>

              {/* Precio — sin overflow en ningún breakpoint */}
              <div className="mb-6 flex flex-col gap-1">
                <span
                  className={`font-serif italic break-words leading-tight text-2xl md:text-3xl lg:text-4xl ${
                    plan.destacado ? 'text-black' : 'text-white'
                  }`}
                >
                  {plan.precioStr}
                </span>
                <span
                  className={`text-[10px] font-black uppercase tracking-[0.3em] ${
                    plan.destacado ? 'text-black/50' : 'text-white/40'
                  }`}
                >
                  Valor Liquidación
                </span>
              </div>

              {/* Incluye */}
              <ul className="space-y-2 md:space-y-3 mb-7 flex-1">
                {plan.incluye.map(inc => (
                  <li
                    key={inc}
                    className={`flex items-start gap-2 text-xs md:text-sm font-light leading-snug transition-colors duration-700 ${
                      plan.destacado ? 'text-black/60 group-hover:text-black' : 'text-white/30 group-hover:text-white/60'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-sm mt-0.5 shrink-0 ${
                        plan.destacado ? 'text-black' : 'text-amber-500/40'
                      }`}
                    >
                      check_circle
                    </span>
                    {inc}
                  </li>
                ))}
              </ul>

              {/* ── CTA HIERARCHY ──
                  1. Cotizar Ahora       → PRINCIPAL
                  2. Planificar Ahora    → /prevision (navegación interna)
                  3. Contactar Ejecutivo → WhatsApp con mensaje dinámico
              */}

              {/* 1 — CTA PRINCIPAL: Cotizar Ahora */}
              <Link
                href="/cotizacion"
                className={`w-full text-center py-4 md:py-5 rounded-full font-black uppercase text-xs md:text-sm tracking-widest transition-all duration-700 shadow-xl mb-2 ${
                  plan.destacado
                    ? 'bg-black text-white hover:bg-zinc-800 active:bg-zinc-900'
                    : 'bg-white text-black hover:bg-zinc-100 active:bg-zinc-200'
                }`}
              >
                Cotizar Ahora
              </Link>

              {/* 2 — SECUNDARIO: Planificar Ahora → /prevision */}
              <Link
                href="/prevision"
                className={`w-full text-center py-3 md:py-4 rounded-full font-black uppercase text-[10px] md:text-xs tracking-widest transition-all duration-700 border mb-2 flex items-center justify-center gap-1.5 ${
                  plan.destacado
                    ? 'border-black/20 text-black/70 hover:bg-black/5 active:bg-black/10'
                    : 'border-white/20 text-white/60 hover:bg-white/5 active:bg-white/10'
                }`}
              >
                <span className={`material-symbols-outlined text-sm ${plan.destacado ? 'text-black/50' : 'text-amber-500/60'}`}>
                  calendar_month
                </span>
                Planificar Ahora
              </Link>

              {/* 3 — WhatsApp: Contactar Ejecutivo */}
              <a
                href={waLink(plan.nombre)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Contactar ejecutivo por WhatsApp sobre ${plan.nombre}`}
                className="w-full py-3 md:py-3.5 rounded-full font-black uppercase text-[10px] md:text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 bg-[#25D366] text-white shadow-md shadow-[#25D366]/20 hover:bg-[#1ebe5d] active:bg-[#17a851] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60"
              >
                {WA_SVG}
                Contactar Ejecutivo
              </a>
            </article>
          ))}
        </div>

        {/* ── COMPARATIVO (debajo de los planes) — 100% desde planesData ── */}
        <section className="mb-20 md:mb-48 comparison-table">
          <header className="text-center mb-8 md:mb-14">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40 block mb-3">
              Comparativa completa
            </span>
            <h2 className="font-serif text-3xl md:text-5xl italic text-white/80 tracking-tight">
              ¿Qué incluye cada plan?
            </h2>
          </header>

          <div className="overflow-x-auto rounded-2xl md:rounded-[2.5rem] bg-white/[0.01] border border-white/5 shadow-2xl">
            <table
              className="w-full text-left border-collapse"
              style={{ minWidth: `${planes.length * 120 + 150}px` }}
            >
              <thead>
                <tr className="bg-white/[0.03]">
                  <th className="p-4 md:p-6 text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 w-36 md:w-44">
                    Atributo
                  </th>
                  {planes.map(plan => (
                    <th
                      key={plan.id}
                      className={`p-3 md:p-5 text-center border-b ${
                        plan.destacado
                          ? 'border-amber-500/20 bg-amber-500/[0.03]'
                          : 'border-white/5'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className={`material-symbols-outlined text-lg ${plan.destacado ? 'text-amber-400' : 'text-white/30'}`}>
                          {plan.icon}
                        </span>
                        <span className={`text-[10px] md:text-xs font-black uppercase tracking-wide leading-tight ${plan.destacado ? 'text-amber-400' : 'text-white/60'}`}>
                          {plan.nombre.replace('Plan ', '')}
                        </span>
                        <span className={`text-[9px] font-bold ${plan.destacado ? 'text-amber-400/60' : 'text-white/25'}`}>
                          {plan.precioStr}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparativoAtributos.map((attr, rowIdx) => (
                  <tr
                    key={attr.key}
                    className={`table-row border-b border-white/5 hover:bg-white/[0.02] transition-colors ${
                      rowIdx % 2 !== 0 ? 'bg-white/[0.01]' : ''
                    }`}
                  >
                    <td className="p-3 md:p-5 text-[10px] md:text-xs font-black uppercase tracking-widest text-white/40 whitespace-nowrap">
                      {attr.label}
                    </td>
                    {planes.map(plan => {
                      const tiene = tieneAtributo(plan, attr.key);
                      return (
                        <td
                          key={plan.id}
                          className={`p-3 md:p-5 text-center ${plan.destacado ? 'bg-amber-500/[0.02]' : ''}`}
                        >
                          {tiene
                            ? <span className="material-symbols-outlined text-lg text-emerald-400">check_circle</span>
                            : <span className="text-white/10 text-base leading-none">—</span>
                          }
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── CTA Final ── */}
        <section className="p-8 md:p-24 lg:p-36 rounded-3xl md:rounded-[5rem] bg-white text-black text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 md:p-24 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-[3s]">
            <span className="material-symbols-outlined text-[100px] md:text-[200px]">history_edu</span>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="material-symbols-outlined text-4xl md:text-6xl mb-6 md:mb-10 text-black/20">verified_user</span>
            <h3 className="font-serif text-4xl sm:text-5xl md:text-7xl mb-6 md:mb-10 italic leading-[0.9] tracking-tighter ceo-title-2">
              Asistencia las{' '}
              <span className="text-black/30">24 Horas</span>
            </h3>
            <p className="text-black/50 text-base md:text-xl mb-10 md:mb-16 max-w-2xl mx-auto font-light leading-relaxed italic border-l border-black/10 pl-6 text-left ceo-text-desc">
              &ldquo;Nuestros directores de protocolo están listos para guiarle con la máxima distinción y empatía.&rdquo;
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
              <a
                href="tel:+56964333760"
                className="w-full sm:w-auto bg-black text-white px-8 md:px-16 py-4 md:py-6 rounded-full font-black uppercase text-sm tracking-widest hover:bg-zinc-800 transition-all shadow-2xl"
              >
                Llamada Inmediata
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, quiero hablar con un ejecutivo de Funeraria Santa Margarita.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-black/10 text-black px-8 md:px-16 py-4 md:py-6 rounded-full font-black uppercase text-sm tracking-widest hover:bg-black/5 transition-all"
              >
                WhatsApp Protocolo
              </a>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
