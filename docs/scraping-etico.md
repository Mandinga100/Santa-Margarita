# 📜 Scraping Ético de Obituarios — Funeraria Santa Margarita

> **Estado**: ✅ Implementado  
> **Última actualización**: 2026-04-02  
> **Archivo**: `scripts/scraper_obituarios.py`

---

## ⚖️ Marco Legal y Ético

Este módulo opera bajo las siguientes regulaciones:

| Marco | Aplicación |
|-------|-----------|
| **Ley 19.628 (Chile)** | Solo datos públicos, sin tratamiento de datos sensibles |
| **robots.txt** | Verificación bloqueadora pre-scraping en **todos** los sitios |
| **GDPR-like** | Sin identificación personal, sin fotos, sin DNI/RUT |
| **Uso Ético** | Solo para integración en el módulo /memoriales del sitio propio |

> [!CAUTION]
> **USO PROHIBIDO**: Este scraper NO debe usarse para scraping masivo, reventa de datos, ni actividades comerciales sin acuerdo explícito con cada fuente.

---

## 🏗️ Arquitectura del Módulo

```
scripts/
└── scraper_obituarios.py   ← Script principal (Python 3.10+)

Output generado (gitignoreados):
├── obituarios_eticos.json  ← Datos estructurados
├── scraper_etico.log       ← Log completo del run
└── audit_hash.txt          ← SHA-256 para auditoría
```

---

## 🔄 Flujo de Cascada (4 Etapas)

```mermaid
flowchart TD
    A[Inicio] --> B{Etapa 1: robots.txt}
    B -- Bloqueado --> C[Log + Excluir sitio]
    B -- Permitido --> D[Etapa 2: Config Ética\n5-10s delay, user-agent declarado]
    D --> E[Etapa 3: Scraping BS4\nSolo nombre + fecha]
    E --> F[Filtro Ético\nSin DNI/fotos/emails]
    F --> G[Etapa 4: Checklist post-run\nHash SHA-256]
    G -- OK --> H[Guardar JSON output]
    G -- FALLO --> I[Alerta + NO guardar]
```

---

## 🌐 Fuentes Configuradas

| Sitio | URL | Estado |
|-------|-----|--------|
| Cementerio General | `cementeriogeneral.cl/obituarios/` | 🔍 Verificado en run |
| EPSP | `epsp.cl/frmObit` | 🔍 Verificado en run |
| Hogar de Cristo | `funerariahogardecristo.com/obituario/` | 🔍 Verificado en run |
| Parque del Recuerdo | `parquedelrecuerdo.cl/busqueda/obituario` | 🔍 Verificado en run |
| Emol Obituarios | `emol.com/obituario` | 🔍 Verificado en run |

---

## ⚙️ Configuración Ética (immutable)

```python
USER_AGENT  = "MiAgenteIA-FunerariaSantaMargarita/1.0 (contacto@funerariasantamargarita.cl)"
DELAY       = random.uniform(5, 10)  # segundos entre requests
MAX_RESULTS = 10                     # límite por sitio
```

> [!IMPORTANT]
> **NO modificar** `USER_AGENT` ni bajar los delays sin aprobación legal. El user-agent declarado permite a las fuentes identificar y bloquear el scraper si así lo desean (diseño ético intencional).

---

## 🚀 Instalación y Uso

### Prerequisitos

```powershell
# Python 3.10+
python --version

# Instalar dependencias
pip install requests beautifulsoup4
```

### Ejecución

```powershell
# Desde la raíz del proyecto
python scripts/scraper_obituarios.py
```

### Output esperado

```json
{
  "Cementerio General": {
    "sitio": "Cementerio General",
    "timestamp": "2026-04-02T10:00:00",
    "obituarios": [
      { "nombre": "Juan Pérez", "fecha": "01-04-2026" },
      { "nombre": "María González", "fecha": "31-03-2026" }
    ]
  }
}
```

---

## ✅ Checklist Post-Run (Tester Forense)

Validaciones automáticas que corren al final de cada ejecución:

- [ ] Total de registros `< 50` en todo el output
- [ ] Sin URLs de imágenes (`.jpg`, `.png`, `.webp`) extraídas
- [ ] Sin errores HTTP `4xx`/`5xx` críticos
- [ ] Timestamp corresponde al run actual
- [ ] SHA-256 generado y guardado en `audit_hash.txt`

> [!WARNING]
> Si **cualquier check falla**, el archivo `obituarios_eticos.json` **NO se guarda**. El log explica el motivo.

---

## 🔗 Integración con el Proyecto

Los datos extraídos se integran en la sección `/memoriales` del sitio web de Funeraria Santa Margarita:

1. **Cron Job Firebase** (Functions) ejecuta el scraper diariamente.
2. Los obituarios son normalizados y guardados en **Firestore** (`/obituarios` collection).
3. La página `/memoriales` consulta Firestore y renderiza los resultados con el diseño premium del sitio.

```
Firebase Function (schedule)
    └── scraper_obituarios.py
        └── obituarios_eticos.json
            └── Firestore /obituarios/{id}
                └── /memoriales → SSR via Next.js
```

---

## 📋 Registro de Cambios

| Fecha | Cambio |
|-------|--------|
| 2026-04-02 | Implementación inicial completa (4 etapas) |
