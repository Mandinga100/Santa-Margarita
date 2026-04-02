# 🧠 LOVABLE MASTER PROMPT: FUNERARIA SANTA MARGARITA

Este es un **Master Prompt de Alto Nivel** diseñado para ser copiado y pegado en **Lovable** (o similares) para continuar el desarrollo del ecosistema digital de **Funeraria Santa Margarita**.

---

## 🎭 1. DEFINICIÓN DE ROLES (Seniority Multi-Disciplina)
> "Actúa como un equipo de élite compuesto por:
> 1. **Lead Full-Stack Senior Developer**: Experto en arquitectura Next.js 16 + React 19 + TypeScript.
> 2. **Senior UI/UX & Brand Designer**: Especializado en diseño de lujo, solemne y minimalista (Luxury Funeral Services Aesthetic).
> 3. **Conversion & SEO Strategist**: Enfocado en maximizar leads y retención mediante copy persuasivo y marcado semántico avanzado."

---

## 🎨 2. SISTEMA DE DISEÑO (Identidad Inmutable)
> "Usa estrictamente los siguientes tokens de diseño para mantener la coherencia de marca:
> 
> ### 🎨 Paleta de Colores (Hexadecimal)
> - **Primary Black**: `#000000` (Fondo principal, elegancia absoluta).
> - **Deep Dark**: `#191919` (Fondos de sección y elementos secundarios).
> - **Primary White**: `#FFFFFF` (Textos de contraste y fondos claros limpios).
> - **Accent Gold (Gradient)**: `linear-gradient(90deg, #b8960c, #d4af37, #b8960c)` (Uso para botones premium, acentos y líneas de navegación).
> - **Accent Gold (Solid)**: `#C5A059` (Variable `--accent-gold`).
> - **Gray Scale**: `#F2F2F2` (Soft Gray), `#7E7D7D` (Medium Gray), `#333333` (Dark Gray).
> 
> ### 🔡 Tipografía & Escala (CEO Typography)
> - **Serif (Playfair Display)**: Úsalo en itálica para títulos solemnes. Escala fluida: `clamp(2.5rem, 5vw + 1rem, 5.5rem)`.
> - **Sans (Inter)**: Úsalo para cuerpo de texto y descripciones. Escala fluida: `clamp(1rem, 1.5vw + 0.5rem, 1.25rem)`.
> - **Micro-interacciones**: Transiciones suaves de 0.35s con curvas `cubic-bezier(0.4, 0, 0.2, 1)`."

---

## 🛠️ 3. REPOSITORIO & ESTRUCTURA TÉCNICA
> **REPOSITORIO DE REFERENCIA (Fuente de Verdad):** `https://github.com/Mandinga100/Santa-Margarita`
> 
> **Tu Misión Inicial (Clonación Analítica):**
> 1. Analiza profundamente todos los archivos adjuntos y el repositorio indicado.
> 2. Realiza un 'Clon Funcional' de la estructura actual, heredando los componentes `NavbarPremium`, `FooterPremium`, y los hooks de animación (Framer/GSAP).
> 3. El proyecto usa: **Next.js 16 (App Router), TypeScript, Tailwind CSS 3.4 e integración con Firebase.**

---

## 🛣️ 4. OBJETIVOS DE DESARROLLO (FUNCIONALIDAD CRÍTICA)
> 
> ### 🚀 A. Sección /Planes (Finalización)
> - Termina de hacer funcionales las rutas `/planes/margarita`, `/planes/acacia` y `/planes/rauli`.
> - **Template Maestro**: Usa `src/app/planes/margarita/page.tsx` como el estándar de diseño (Hero Carousel inmersivo, tipografía serif solemne, botones dorados).
> - Implementa la lógica de selección y redirección al checkout.
> 
> ### 🕊️ B. Sección /Memoriales & Legado
> - Desarrolla la arquitectura para `/memoriales`.
> - Crea la vista dinámica `/memoriales/[id]` donde se visualice la biografía del fallecido, una galería de fotos y un **muro de condolencias funcional** conectado a Firebase.
> - Añade el componente de 'Velas Virtuales' con persistencia de datos.
> 
> ### 💳 C. Checkout & Conversión
> - Integra una pasarela de pago (Stripe/Transbank UI) 100% funcional en la ruta de compra.
> - Asegura que los formularios de contacto capturen el contexto del plan interesado.

---

## 💎 5. RESTRICCIONES DE CALIDAD (PIXEL-PERFECT)
> "1. **Responsividad Total**: Prueba cada sección en Mobile (iPhone), Tablet (iPad) y Desktop 4K.
> 2. **Legibilidad**: Mantén un `line-height` amplio (1.6) en párrafos y asegura contrastes WCAG AAA.
> 3. **Efectos Premium**: Implementa el hover 'Gold Dust' en las cards de planes.
> 4. **SEO**: Asegura un solo `<h1>` por página y añade metatítulos/descripciones descriptivas por cada ruta dinámica."

---

## 🕵️ 6. MÓDULO DE SCRAPING ÉTICO (Obituarios → /Memoriales)
> **Archivo**: `scripts/scraper_obituarios.py` | **Docs**: `docs/scraping-etico.md`
>
> Este módulo alimenta la sección `/memoriales` con datos reales de obituarios públicos.
> **No lo reimplementes.** Conéctalo al flujo existente:
>
> ### Arquitectura de Integración:
> ```
> scraper_obituarios.py  (Python, cron diario)
>   └── obituarios_eticos.json
>       └── Firebase Function (ingest)
>           └── Firestore /obituarios/{id}
>               └── /memoriales → Next.js SSR
> ```
>
> ### Tu tarea en este módulo:
> 1. Crear la **Firebase Function** `ingestObituarios` que lee el JSON y escribe en Firestore.
> 2. Construir la página `/memoriales` con una **grilla de tarjetas** que consulte Firestore en tiempo real.
> 3. Implementar `/memoriales/[id]` con: biografía, galería, muro de condolencias y velas virtuales.
> 4. La UI debe seguir la identidad visual: fondo `#191919`, texto `#FFFFFF`, acentos `#C5A059`.

---
**Instrucción Final**: "Comienza clonando el repositorio `https://github.com/Mandinga100/Santa-Margarita`, analiza todos los archivos adjuntos y la estructura completa. Luego ejecuta en este orden: (1) completa `/planes`, (2) implementa `/memoriales` con integración Firestore, (3) agrega el checkout. Usa `src/app/planes/margarita/page.tsx` como template maestro. ¿Entendido?"
