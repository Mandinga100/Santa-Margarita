# 🛣️ ROADMAP: EVOLUCIÓN DE PLANES Y SERVICIOS (FASE 3)

Este documento detalla los pasos técnicos, estratégicos y de diseño necesarios para transformar la sección de **Planes y Servicios** en un ecosistema de conversión de alto impacto con landings dedicadas.

---

## 🛠️ FASE 1: INGENIERÍA DE CONTENIDO Y ARQUITECTURA
**Objetivo:** Establecer una base sólida de información y estructura SEO.
**Estimado:** 2 - 3 Horas

1.  **[ ] Auditoría Técnica de Planes**: 
    - Extraer beneficios únicos de cada plan desde `catalogo-planes.md`.
    - Diferenciar claramente por qué elegir el plan *Margarita* vs *Raulí*.
2.  **[ ] Definición de Rutas Dinámicas**: 
    - Preparar las subcarpetas en `src/app/planes/[slug]/page.tsx` para permitir URLs del tipo `/planes/plan-rauli-premium`.
3.  **[ ] Copywriting Emocional (Marketing 2.0)**: 
    - Redactar los textos persuasivos para cada plan focalizando en la **Dignidad** y **Respeto**.
4.  **[ ] Suministro de Assets Multimedia**: 
    - Selección y optimización (WebP) de imágenes específicas que representen el nivel de cada servicio.

---

## 🎨 FASE 2: DESARROLLO UI/UX (LANDING PAGES DEDICADAS)
**Objetivo:** Crear una experiencia de usuario inmersiva y de lujo ("Stitch Standard").
**Estimado:** 5 - 8 Horas

1.  **[ ] Rediseño de Cards (Home)**: 
    - Implementar efectos de hover "Gold Dust" que den un preview de la landing dedicada.
2.  **[ ] Layout Maestro para Sub-landings**: 
    - Diseño de un Hero solemne con tipografía `Playfair Display`.
    - Grid de beneficios con iconografía premium `amber-600`.
    - Comparativa de valores y tabla de transparencia total para el cliente.
3.  **[ ] Micro-interacciones GSAP**: 
    - Animaciones de revelado suave al hacer scroll (Reveal Effects).
    - Contadores dinámicos para el precio (si aplica) o número de servicios incluidos.

---

## ⚙️ FASE 3: CONVERSIÓN Y SEO SEMÁNTICO
**Objetivo:** Maximizar el retorno de inversión y la visibilidad orgánica.
**Estimado:** 2 - 4 Horas

1.  **[ ] Inyección de Formulario de Contexto**: 
    - El formulario de contacto o botón de WhatsApp debe saber *exactamente* qué plan el usuario estaba viendo.
2.  **[ ] JSON-LD Individual**: 
    - Marcado de datos estructurados Schema.org para cada landing individual (Mejor indexación en Google).
3.  **[ ] Optimización Core Web Vitals**: 
    - Asegurar que las landings carguen en menos de 1.5s (LCP) manteniendo la calidad 4K de las imágenes.

---

## 🚀 RECOMENDACIONES ESTRATÉGICAS (VENTAS Y NEGOCIO)

### 1. Sistema de "Add-ons" (Oportunidad de Upselling)
- [ ] Ofrecer "Upgrades" directos: Coronas florales premium, Cafetería extendida, o Memorial Digital con QR.

### 2. Estrategia de Precios Psicológicos
- [ ] **Efecto Ancla**: Destacar visualmente el plan intermedio (*Acacia*) como el más equilibrado para guiar la decisión de compra.

### 3. Landings de Necesidad vs Previsión
- [ ] Crear dos variaciones de copy: una para **Urgencia** (Acción inmediata) y otra para **Previsión** (Seguridad y tranquilidad financiera).

### 4. Prueba Social Contextual
- [ ] Integrar testimonios que mencionen específicamente el plan que el usuario está consultando.

---

**Estado del Proyecto:** FASE 3: PLANIFICACIÓN
**Última Actualización:** 30 de marzo de 2026
**Responsable:** Proyecto Funeraria Santa Margarita - IA Unit (Antigravity)
