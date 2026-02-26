# 🗂️ ÍNDICE MAESTRO: PROYECTO FUNERARIA SANTA MARGARITA

## 0. CONTEXTO GENERAL Y OBJETIVO
Este documento constituye la fuente única de verdad para el proyecto **Funeraria Santa Margarita**. El objetivo es desarrollar una plataforma web de clase mundial con una identidad visual solemne y de excelencia.

---

## 1. ROLES Y RESPONSABILIDADES (SDP-U)
El proyecto es gestionado por un Agente de IA Multidisciplinario operando bajo los siguientes roles:
- **Desarrollador Full-Stack Senior**: Implementación de Next.js, TS y Firebase.
- **Arquitecto de Seguridad**: Blindaje de despliegues y gestión de accesos.
- **Diseñador UI/UX Senior**: Creación de la interfaz de excelencia artística.
- **Estratega DevOps**: Automatización de verificación de entornos y flujos Git.

---

## 2. STACK TECNOLÓGICO CORE
| Tecnología | Función | Estado |
| :--- | :--- | :--- |
| **Next.js 16 (App Router)** | Framework Frontend/Backend | Activo |
| **TypeScript** | Tipado Estático y Robustez | Activo |
| **Vanilla CSS (Modules)** | Sistema de Estilos Dinámicos | Activo |
| **Firebase Hosting** | Despliegue e Infraestructura | Activo |
| **Firebase Firestore** | Base de Datos NoSQL | Pendiente |
| **Git** | Control de Versiones | Activo |

---

## 3. ARQUITECTURA DE DIRECTORIOS (Snapshot)
```text
C:.
├───.agent              # Flujos de trabajo y Workflows
├───.git                # Control de versiones (Hook pre-commit activo)
├───backup              # Backups comprimidos y optimizados
├───docs                # Documentación técnica y estratégica (Índice Maestro)
├───public              # Activos estáticos (Imágenes Hero, SVGs)
├───scripts             # Scripts de automatización y verificación
│   ├───backup.ps1      # Generador de backups optimizados
│   └───verify-firebase.ps1 # Validador de entorno y cuenta
└───src                 # Código fuente de la aplicación
    ├───app             # Rutas y Layouts (Next.js App Router)
    │   ├───cotizacion  # Página de cotización multi-step
    │   └───memoriales  # Galería de memoriales interactiva
    └───components      # Componentes UI reutilizables
        ├───Footer      # Pie de página institucional
        ├───Header      # Cabecera con indicadores UF/UTM
        ├───Hero        # Sección de impacto visual
        └───WhatsAppButton # Componente flotante animado
```

---

## 4. DISEÑO Y ESTÉTICA (SISTEMA DE DISEÑO)
### Paleta de Colores
- **Primario**: `#000000` (Black Obsidian) - Fondo y distinción.
- **Acento**: `#C5A059` (Gold Dust) - Contrastes, Títulos y Call-to-Actions.
- **Texto**: `#FFFFFF` / `#7E7D7D` - Legibilidad y Jerarquía.
### Tipografía
- **Headings**: `Playfair Display` (Serif) - Tradición y Respeto.
- **Body**: `Inter` (Sans-serif) - Modernidad y Claridad.

---

## 5. AUTOMATIZACIÓN Y SEGURIDAD (DEVOPS)
- **Guardia de Entorno**: Script `scripts/verify-firebase.ps1` que valida que el usuario esté en `funeraria-sm` con el correo `funerariasantamargarita2026@gmail.com`.
- **Pre-commit Hook**: Git bloquea cualquier commit si la verificación de Firebase falla.
- **Backups**: Script `scripts/backup.ps1` que genera respaldos en `/backup` excluyendo archivos temporales y `node_modules`.
- **Static Export**: Configuración en `next.config.ts` optimizada para Firebase Hosting.

---

## 6. ESTADO ACTUAL Y HITOS
### ✅ Completado
1. Estructura base del proyecto Next.js 16.
2. Identidad visual y Global CSS establecida.
3. Header, Hero, Footer y WhatsApp Button funcionales.
4. Página de Cotización v1 (Multi-step).
5. Galería de Memoriales v1.
6. Despliegue inicial en Producción: [funeraria-sm.web.app](https://funeraria-sm.web.app).

### 🚀 Próximos Pasos
1. Conexión de indicadores económicos a API real (UF/UTM).
2. Implementación de Firestore para memoriales dinámicos.
3. Integración de Pasarela de Pagos (PayPal/Webpay).
4. Configuración de Dominio Personalizado.

---
**Documento autogenerado por Antigravity (IA Unit). Última actualización: 26-02-2026**
