# Funeraria Santa Margarita - Arquitectura Frontend V1

Este documento representa la **FUENTE DE VERDAD ABSOLUTA** del Frontend para el proyecto Funeraria Santa Margarita.
Cualquier modificación arquitectónica o cambio de dependencias debe quedar reflejado aquí.

## 1. Stack Tecnológico Establecido
- **Framework Core**: Next.js 16 (App Router)
- **Engine de Estilos**: Tailwind CSS 3.4
- **Librería de Animaciones**: GSAP (ScrollTrigger para Parallax y Contadores)
- **Librería de Carrousel**: Swiper (Autoplay, Pagination, EffectFade)
- **Manejo de Base de Datos**: Firebase Firestore (Inicializado nativamente con SDK Modular)

## 2. Decisiones de Diseño & SEO Global
### 2.1 SEO y OpenGraph (`src/app/layout.tsx`)
- Metadatos estáticos inicializados globalmente orientados a "Funeraria Santiago", "Planes Funerarios", etc.
- **Microdata JSON-LD**: Se inyecta un objeto `@type: FuneralHome` global para mejorar el Local SEO y rastreo de Google en toda la web.

### 2.2 Componentes UI y Layout
- **NavbarPremium**: Componente "Sticky" con escucha de scroll (GSAP) transparente que muta a un blur oscuro y bordes tenues para mejorar legibilidad al hacer scroll.
- **WhatsAppFlotante**: Accesibilidad universal con fallback estático y animaciones de Pulse. Integrado también una "Emergency Bar" fija roja al inferior del z-index alto en móviles y escritorio.
- **FooterPremium**: Jerarquía lógica de columnas (Marca, Navegación, Legal, Contacto).

## 3. Estructura de Assets y Multimedia
Toda imagen fue migrada y optimizada a formato estricto **WebP**.
- **Avatares IA:** `/public/assets/images/ui/avatars-ia/` (Utilizados para testimonios dinámicos y acompañantes en sliders).
- Respeto a convenciones de CSS con `aspect-ratio` y control manual de fallback para imágenes en SSR de Next.js.

## 4. Convenciones de Desarrollo (Linter & Bugs Comunes)
1. **Typescript Strict:** Todas las respuestas de un try/catch tiparlas como `unknown` (no `any`), evaluando vía `error instanceof Error`.
2. **Importaciones Tailwind Config:** En caso de conflictos con Node CommonJS/ESM, utilizar /* eslint-disable @typescript-eslint/no-require-imports */.
3. Preferir atributos booleanos puros, y dependencias explícitas en React Hooks (`useEffect`).
