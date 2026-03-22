# Documentación de Infraestructura: Cloudflare DNS & Firebase Hosting

Este documento detalla la configuración y despliegue de los registros DNS en Cloudflare para apuntar el dominio `funerariasantamargarita.cl` a los servidores de Firebase Hosting.

## Resumen Técnico
- **Dominio:** `funerariasantamargarita.cl`
- **Plataforma DNS:** Cloudflare
- **Plataforma de Hosting:** Firebase (App: `funeraria-sm`)
- **Estado:** ✅ Operativo (Live)
- **Fecha de Configuración:** 21 de marzo de 2026

## Configuración de Registros DNS

Para asegurar el correcto funcionamiento tanto del dominio raíz como del subdominio `www`, se aplicaron los siguientes registros:

| Tipo | Nombre (Host) | Contenido (Valor) | Proxy Status | TTL |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `www` | `funeraria-sm.web.app` | Proxy (Naranja) | Automático |
| **A** | `@` (Raíz) | `151.101.1.195` | Proxy (Naranja) | Automático |
| **A** | `@` (Raíz) | `151.101.65.195` | Proxy (Naranja) | Automático |

## Reglas de Redirección (301)
Se implementó una regla de redirección de host en Cloudflare para centralizar el tráfico:
- **De:** `www.funerariasantamargarita.cl`
- **A:** `https://funerariasantamargarita.cl$1`
- **Regla ID:** `FSM-www-redirect`

## Seguridad (SSL/TLS)
- **Modo SSL:** `Full (Strict)`
- **Justificación:** Firebase ya cuenta con certificados TLS válidos. Cloudflare se comunica de forma segura con el origen de Firebase.

## Automatización (Scripts)
Se han creado scripts en la raíz del proyecto para facilitar futuras actualizaciones:
- `deploy.sh`: Script en Bash para entornos Linux/Unix/GitBash.
- `deploy.ps1`: Script optimizado para PowerShell (Windows 10/11) que utiliza `Invoke-RestMethod` para mayor compatibilidad.

## Verificación de Despliegue
Tras el despliegue realizado el 21 de marzo de 2026, se verificó:
1. `firebase hosting:channel:list` confirmando que el canal `live` está asociado a `funeraria-sm.web.app`.
2. Respuesta HTTP `200 OK` desde el dominio raíz.
3. Respuesta `301 Redirect` desde el subdominio `www`.
4. Cabecera `Server: cloudflare` inyectada correctamente.

---
**Generado por:** AGENTE-FSM-DEPLOY-PRO  
**Estado de Memoria:** Windows 10 64-bit activa.
