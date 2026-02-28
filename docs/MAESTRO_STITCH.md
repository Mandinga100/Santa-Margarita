# Maestro de Integración Stitch - Funeraria Santa Margarita

## 🎯 Objetivo
Este documento sirve como la fuente de verdad absoluta para la arquitectura frontend y el sistema de diseño basado en la exportación de Stitch (Febrero 2026).

## 🏗️ Tecnología Actual
- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS (Vanilla CSS para componentes críticos)
- **Animaciones:** GSAP + ScrollTrigger
- **Base de Datos:** Firebase Firestore
- **Despliegue:** Firebase Hosting (Static Export)

## 📂 Mapeo de Páginas y Estructura

| Página | Ruta Local | Origen Stitch (Export) | Estado |
| :--- | :--- | :--- | :--- |
| **Home** | `src/app/page.tsx` | index.html | ✅ Optimizado |
| **Planes** | `src/app/planes/page.tsx` | planes-de-servicio-comparativa-detallada.html | ✅ Optimizado |
| **Servicios**| `src/app/servicios/page.tsx`| servicios-integrales-y-acompa-amiento.html | ✅ Creado |
| **Nosotros** | `src/app/nosotros/page.tsx` | nuestra-historia-legado-y-valores.html | ✅ Creado |
| **Memoriales**| `src/app/memoriales/page.tsx`| memoriales-y-homenajes-listado-memorial.html | ✅ Optimizado |
| **Detalle Memorial** | `src/app/memoriales/[id]/page.tsx` | memorial-individual-y-muro-de-condolencias.html | ✅ Dinámico |
| **Cotización**| `src/app/cotizacion/page.tsx`| cotizacion-online-step-1/2/3 | ✅ Multi-step |
| **Previsión** | `src/app/prevision/page.tsx` | prevision-funeraria-planeaci-n-anticipada.html | ✅ Optimizado |
| **FAQ** | `src/app/faq/page.tsx` | preguntas-frecuentes-gu-a-de-apoyo.html | ✅ Optimizado |

## 🎨 Sistema de Diseño (Design Tokens)
- **Tipografía:** 
  - Serif: `Playfair Display` (Italic para acentos premium)
  - Display: `Inter` (Variable para legibilidad)
- **Colores:**
  - Primario: `#000000` (Elegancia absoluta)
  - Acento: `Amber-500` (Para detalles de honor/velas)
  - Fondo: `#f7f7f7` (Light) / `#121212` (Dark)
- **Componentes Críticos:**
  - `NavbarPremium`: Navegación fluida con blur y scroll trigger.
  - `SmoothScroll`: Implementación de Lenis para scroll ultra-suave.
  - `MemorialCard`: Efecto 3D hover con transición de grayscale a color.

## ⚙️ Configuración Especial
- **Dynamic Routes:** Se utiliza `generateStaticParams` en `/memoriales/[id]` para permitir el `output: export` de Next.js.
- **Firebase:** Integración de Firestore para memoriales y condolencias en tiempo real.

## 💾 Historial de Cambios (Fusión Stitch)
1. **Fase 1:** Mapeo de assets y unificación de rutas.
2. **Fase 2:** Refactorización de `memoriales` y `cotizacion` con lógica Firebase.
3. **Fase 3:** Creación de `servicios` y `nosotros` desde cero basándose en exports.
4. **Fase 4:** Ajustes de navegación global y optimización de build.

---
*Documentación generada por Antigravity AI - Arquitecto Web Senior.*
