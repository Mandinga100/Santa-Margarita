# 📜 Proyecto Completo: Funeraria Santa Margarita

Este documento es el **archivo maestro de referencia técnica, visual y funcional** del proyecto. Está diseñado para servir como base para la replicación idéntica de secciones en herramientas como *Lovable* o para continuar el desarrollo de las fases faltantes.

---

## 🚀 1. Stack Tecnológico (Core)

El proyecto utiliza un stack moderno y de alto rendimiento, enfocado en la experiencia de usuario (UX) y el posicionamiento (SEO).

-   **Framework**: [Next.js 16](https://nextjs.org/) (React 19) con **App Router**.
-   **Lenguaje**: [TypeScript](https://www.typescript.org/) para robustez y tipado estático.
-   **Estilos**: [Tailwind CSS 3.4](https://tailwindcss.com/) (Clases utilitarias y sistema de diseño).
-   **Backend & Hosting**: [Firebase 12](https://firebase.google.com/) (Auth, Firestore, Hosting).
-   **Animaciones**: 
    -   [GSAP 3.14](https://greensock.com/gsap/) (Animaciones de alto rendimiento y scroll-based).
    -   [Framer Motion 12](https://www.framer.com/motion/) (Micro-interacciones y transiciones de componentes).
-   **Experiencia de Usuario**:
    -   [Lenis](https://lenis.darkroom.engineering/) (Smooth Scroll / Desplazamiento fluido).
    -   [Swiper 11](https://swiperjs.com/) (Carruseles y sliders premium).
-   **Optimización**: 
    -   `Sharp` para optimización de imágenes (WebP/AVIF).
    -   `PDF-Parse` para procesamiento de documentos.

---

## 🎨 2. Identidad Visual & Diseño (Brand Kit)

El diseño sigue una estética **Premium, Solemne y Minimalista**.

### 🎨 Colores de Marca (Netos)
| Elemento | Hexadecimal | Variable CSS | Estado |
| :--- | :--- | :--- | :--- |
| **Primario Negro** | `#000000` | `--primary-black` | ✅ Aplicado |
| **Primario Blanco** | `#FFFFFF` | `--primary-white` | ✅ Aplicado |
| **Gris Claro** | `#F2F2F2` | `--gray-light` | ✅ Aplicado |
| **Gris Medio** | `#7E7D7D` | `--gray-medium` | ✅ Aplicado |
| **Gris Oscuro** | `#333333` | `--gray-dark` | ✅ Aplicado |
| **Oro Acento** | `#C5A059` | `--accent-gold` | ✅ Aplicado |
| **Fondo Oscuro** | `#191919` | `background-dark` | ✅ Aplicado |

### 🔡 Tipografía
-   **Serif (Títulos)**: `Playfair Display` (Variable `--font-playfair`). ✅ Configurado.
-   **Sans (Cuerpo)**: `Inter` (Variable `--font-inter`). ✅ Configurado.

---

## 🛠️ 3. Estado de Integraciones & Funcionalidades

### ✅ Funcional & Listas
-   **Arquitectura Base**: Next.js App Router con Layouts Premium.
-   **SEO Técnico**: Generación de `sitemap.ts` y `robots.ts`.
-   **Navegación Premium**: Navbar y Footer responsivos con efectos de subrayado animado.
-   **Smooth Scrolling**: Integración global con Lenis.
-   **Landing "Plan Margarita"**: 100% funcional a nivel visual y de estructura UI.
-   **WhatsApp Flotante**: Botón de contacto directo operativo.
-   **Scraper Ético de Obituarios**: Módulo Python (`scripts/scraper_obituarios.py`) implementado con validación legal, ética y técnica (robots.txt, rate-limiting, audit-hash).

### ⚠️ Parcialmente Funcional
-   **Memoriales Virtuales**: Arquitectura de rutas lista (`/memoriales/[id]`). Integración con scraper ético documentada y vinculada en el Master Prompt de Lovable. Falta habilitar la Firebase Function de ingesta masiva.
-   **Formularios**: La interfaz de contacto y cotización está lista, pero la acción de envío (backend) está pendiente.

### ❌ Faltantes (Crítico)
-   **Pasarelas de Pago**: Integración con **Stripe**, **PayPal** o **WebPay**.
-   **Landing de Otros Planes**: `/planes/acacia` y `/planes/rauli` aún no han sido desarrolladas.
-   **Auth**: Sistema de gestión para memoriales.

---

## 🛣️ 4. Roadmap Actualizado (Abril 2026)

**Progreso General: 60%**

### 🏗️ FASE 1: ARQUITECTURA (85%)
1.  **[x] Integración de Stack Core** (Next.js, Tailwind, GSAP).
2.  **[x] Diseño de Layout Maestro** (Stitch Standard).
3.  **[x] Módulo de Backend (Scraping)**: Implementación de scraper ético.
4.  **[ ] Despliegue de Landings Faltantes** (Raulí y Acacia).

### ⚙️ FASE 2: FUNCIONALIDAD (35%)
1.  **[ ] Pasarelas de Pago**: Desarrollo de sección de checkout seguro.
2.  **[ ] Contacto 100% Funcional**: Conexión con servicios de correo y base de datos.
3.  **[x] Integración de Datos (Memoriales)**: Estructura de ingesta de obituarios definida.
4.  **[ ] Memoriales Interactivos**: Habilitar "Velas Virtuales" y "Condolencias" en tiempo real.

### 📈 FASE 3: OPTIMIZACIÓN (10%)
1.  **[ ] SEO Semántico Avanzado**: Inyección de JSON-LD por cada plan.
2.  **[ ] Core Web Vitals**: Puntuación 90+ en dispositivos móviles.

---

## 📄 5. Guía para "Lovable" / IA Replicación

Para replicar la sección de **Planes** (Ejemplo Margarita):
1.  **Hero**: Pantalla completa (`95vh`), imagen con `opacity-60`, gradiente radial y lineal para profundidad.
2.  **Tipografía**: Usar `italic` en títulos serif para un look más solemne.
3.  **Botones**: Bordes redondeados (`rounded-full`), tracking de texto amplio (`tracking-[0.4em]`), sombras suaves.
4.  **Cards**: Fondo gris muy claro (`#f8f8f8`) con bordes invisibles que se revelan al hacer hover.

---
**Última actualización**: 2 de abril de 2026
**Generado por**: Antigravity (AI Coding Assistant)
