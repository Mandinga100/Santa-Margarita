# Design System Specification: High-End Editorial

## 1. Overview & Creative North Star
The funeral services industry requires a delicate balance of deep empathy and unwavering professionalism. This design system departs from standard corporate layouts to embrace **"The Quiet Curator"**—a Creative North Star that prioritizes serene white space, intentional asymmetry, and editorial-grade typography.

Rather than a rigid, boxy grid, this system uses "breathing room" as a functional element. By leveraging high-contrast typography scales and overlapping tonal layers, we create an experience that feels like a premium memorial volume rather than a digital interface. The goal is to instill trust through restraint and sophistication.

## 2. Colors
Our palette is rooted in a monochromatic base of pure whites and deep charcols, punctuated by a muted gold (`secondary`) that mimics the timeless quality of brass plaques.

### Tonal Strategy
*   **The "No-Line" Rule:** To maintain an ethereal, high-end feel, **do not use 1px solid borders** to separate sections. Boundaries must be defined through background color shifts. For example, a content block using `surface-container-low` (#f3f3f4) should sit directly on a `surface` (#f9f9f9) background without a dividing line.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers of fine paper. Use `surface-container-lowest` (#ffffff) for the most prominent interactive elements (like pricing cards) to make them "float" naturally against the `surface-dim` (#dadada) or `surface-container` (#eeeeee) foundations.
*   **The "Glass & Gradient" Rule:** For floating navigation or modal overlays, apply `surface` colors at 80% opacity with a `backdrop-filter: blur(20px)`. This "frosted glass" effect prevents the UI from feeling "pasted on" and maintains the serene depth of the experience.
*   **Signature Textures:** Use subtle linear gradients for primary CTAs, transitioning from `primary` (#000000) to `primary-container` (#1c1b1b). This adds a "weighted" feel that flat black cannot achieve.

## 3. Typography
The typography system is the voice of the brand: authoritative, empathetic, and timeless.

*   **Display & Headlines (Noto Serif):** Used for large, impactful statements. The serif's elegant terminals (as seen in "Dignidad en lo Esencial") should be set with slightly tighter tracking (-2%) to feel bespoke.
*   **Body & Labels (Manrope):** A clean, modern sans-serif that ensures legibility during moments of high stress.
*   **The High-Contrast Scale:** We use a dramatic jump between `display-lg` (3.5rem) and `body-md` (0.875rem). This hierarchy mirrors high-end editorial magazines, guiding the eye to the most important emotional cues first.
*   **Accents:** Use `secondary` (#775a19) for `label-md` and `label-sm` when highlighting unique value propositions like "INVERSIÓN ÚNICA."

## 4. Elevation & Depth
In this system, depth is a tool for serenity, not just decoration.

*   **Tonal Layering:** Avoid shadows where possible. Achieving hierarchy through stacking—placing a `surface-container-lowest` card on a `surface-container-low` section—creates a soft, natural lift.
*   **Ambient Shadows:** When a shadow is necessary (e.g., a floating Action Button), use an ultra-diffused shadow: `box-shadow: 0 12px 40px rgba(26, 28, 28, 0.06)`. The shadow color should be a tint of `on-surface` (#1a1c1c), never pure black.
*   **The Ghost Border Fallback:** If accessibility requires a border, use `outline-variant` (#c4c7c7) at 20% opacity. This "Ghost Border" provides a hint of structure without interrupting the visual flow.

## 5. Components

### Buttons
*   **Primary:** Solid `primary` (#000000) with `on-primary` text. Radius: `md` (0.75rem). For a signature touch, use `title-sm` typography for the label.
*   **Secondary (Gold):** `secondary-container` (#fed488) with `on-secondary-container` (#785a1a) text. Use for secondary actions that still require high visibility.

### Cards & Service Items
*   **Rule:** No dividers. Use Spacing `8` (2.75rem) to separate horizontal content and Spacing `4` (1.4rem) for vertical list items.
*   **Style:** `surface-container-lowest` background with a `md` (0.75rem) corner radius. Mimic the reference image by using a vertical stack for service lists with subtle gold iconography (`secondary`).

### Input Fields
*   **Style:** Use a "minimalist underline" or a `surface-container-low` filled state. Avoid heavy boxes.
*   **States:** The error state uses `error` (#ba1a1a) but should be accompanied by a soft `error-container` (#ffdad6) background shift to remain gentle.

### Iconography
*   **Professionalism:** Icons should be thin-stroke (1px to 1.5px) and colored in `secondary` (#775a19) to serve as elegant markers rather than heavy distractions.

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts. Place a large `display-md` heading on the left with significant white space on the right to create a "gallery" feel.
*   **Do** use the `secondary` gold color sparingly. It is a highlight, not a primary filler.
*   **Do** prioritize vertical rhythm. Use the Spacing Scale (3.5rem, 4rem, 5.5rem) to let the content breathe.

### Don't
*   **Don't** use 100% black text on pure white for long body passages; use `on-surface-variant` (#444748) to reduce eye strain.
*   **Don't** use sharp 90-degree corners. Everything must feel "softened" with at least `sm` (0.25rem) or `md` (0.75rem) radius.
*   **Don't** use "Drop Shadows" that are dark or tight. If it doesn't look like ambient natural light, it is too heavy for this system.