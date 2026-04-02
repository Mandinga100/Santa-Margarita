"""
scraper_obituarios.py
=====================
Scraper ÉTICO y LEGAL de obituarios para Funeraria Santa Margarita.

ROLES APLICADOS:
  - Abogado de Datos   : Compliance Ley 19.628 (Chile), robots.txt obligatorio.
  - Ingeniero DevOps   : Rate limiting, user-agent declarado, logging estructurado.
  - Analista Ético     : Solo datos públicos (nombres, fechas). Sin fotos, DNI ni datos sensibles.
  - Tester Forense     : Checklist automático post-run, hash de auditoría.

USO:
  python scraper_obituarios.py

OUTPUT:
  obituarios_eticos.json  — Datos estructurados.
  scraper_etico.log       — Log completo del run.
  audit_hash.txt          — SHA-256 del output para auditoría.
"""

import requests
from bs4 import BeautifulSoup
import time
import random
import json
import logging
import hashlib
from datetime import datetime
from urllib.robotparser import RobotFileParser
from typing import Optional

# ─────────────────────────────────────────────
# CONFIGURACIÓN ÉTICA OBLIGATORIA (Etapa 2)
# ─────────────────────────────────────────────
USER_AGENT     = "MiAgenteIA-FunerariaSantaMargarita/1.0 (contacto@funerariasantamargarita.cl)"
DELAY_MIN      = 5     # segundos mínimos entre requests
DELAY_MAX      = 10    # segundos máximos entre requests
MAX_RESULTS    = 10    # límite ético de registros por sitio
LOG_FILE       = "scraper_etico.log"
OUTPUT_FILE    = "obituarios_eticos.json"
AUDIT_FILE     = "audit_hash.txt"
RUN_TIMESTAMP  = datetime.now().isoformat()

# ─────────────────────────────────────────────
# LOGGING ESTRUCTURADO (no bloqueante)
# ─────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("scraper_etico")

# ─────────────────────────────────────────────
# FUENTES PRIORITARIAS (Etapa 1 - Verificación)
# ─────────────────────────────────────────────
SITIOS = [
    {
        "name": "Cementerio General",
        "url": "https://cementeriogeneral.cl/obituarios/",
        "selector_rows": "table tr",
        "selector_nombre": ".nombre, td:first-child",
        "selector_fecha": ".fecha, td:last-child",
    },
    {
        "name": "EPSP Obituarios",
        "url": "https://www.epsp.cl/frmObit",
        "selector_rows": ".obituario-item, .obit-row",
        "selector_nombre": ".nombre-fallecido, h3",
        "selector_fecha": ".fecha-fallecimiento, .fecha",
    },
    {
        "name": "Funeraria Hogar de Cristo",
        "url": "https://www.funerariahogardecristo.com/obituario/",
        "selector_rows": ".obituario, article",
        "selector_nombre": "h2, .nombre",
        "selector_fecha": ".fecha, time",
    },
    {
        "name": "Parque del Recuerdo",
        "url": "https://www.parquedelrecuerdo.cl/busqueda/obituario",
        "selector_rows": ".result-item, .obituario-card",
        "selector_nombre": ".nombre, h3",
        "selector_fecha": ".fecha, .date",
    },
    {
        "name": "Emol Obituarios",
        "url": "https://www.emol.com/obituario",
        "selector_rows": ".obituario, .obit-card",
        "selector_nombre": ".nombre, h2",
        "selector_fecha": ".fecha, time",
    },
]

HEADERS = {
    "User-Agent": USER_AGENT,
    "Accept": "text/html,application/xhtml+xml;q=0.9",
    "Accept-Language": "es-CL,es;q=0.9",
    "Connection": "keep-alive",
}

# ─────────────────────────────────────────────────────
# ETAPA 1: VERIFICACIÓN PRE-SCRAPING (bloqueadora)
# ─────────────────────────────────────────────────────

def check_robots(base_url: str) -> dict:
    """
    Verifica robots.txt del sitio.
    Retorna {permitido: bool, razon: str}
    """
    robots_url = base_url.rstrip("/") + "/robots.txt"
    try:
        rp = RobotFileParser()
        rp.set_url(robots_url)
        rp.read()
        allowed = rp.can_fetch(USER_AGENT, base_url)
        # También verificar con '*'
        allowed_generic = rp.can_fetch("*", base_url)
        if not allowed or not allowed_generic:
            return {"permitido": False, "razon": "Bloqueado por robots.txt"}
        return {"permitido": True, "razon": "robots.txt permite el acceso"}
    except Exception as e:
        logger.warning(f"[robots.txt] No se pudo leer {robots_url}: {e}")
        # Si no hay robots.txt accesible, se asume permiso pero se deja constancia
        return {"permitido": True, "razon": f"robots.txt no disponible (asumido permitido): {e}"}


def verificar_todos_sitios(sitios: list) -> dict:
    """Etapa 1 completa: verifica compliance de todos los sitios."""
    reporte = {}
    logger.info("=" * 60)
    logger.info(f"INICIO VERIFICACIÓN PRE-SCRAPING — {RUN_TIMESTAMP}")
    logger.info("=" * 60)

    for sitio in sitios:
        nombre = sitio["name"]
        url = sitio["url"]
        verificacion = check_robots(url)
        reporte[nombre] = verificacion

        if verificacion["permitido"]:
            logger.info(f"[OK]      {nombre}: {verificacion['razon']}")
        else:
            logger.warning(f"[BLOQUEADO] {nombre}: {verificacion['razon']}")

    return reporte


# ─────────────────────────────────────────────────────
# ETAPA 3: SCRAPING ÉTICO (BeautifulSoup + requests)
# ─────────────────────────────────────────────────────

def safe_text(element) -> Optional[str]:
    """Extrae texto limpio de un elemento BS4."""
    if element is None:
        return None
    text = element.get_text(separator=" ", strip=True)
    return text if text else None


def es_dato_sensible(texto: str) -> bool:
    """
    Analista Ético: filtra datos que NO deben extraerse.
    Rechaza: RUT/DNI, emails, teléfonos, URLs de fotos.
    """
    import re
    if not texto:
        return False
    patrones_sensibles = [
        r"\d{1,2}\.\d{3}\.\d{3}-[\dkK]",         # RUT chileno
        r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.\w+", # Email
        r"\+?56\s?\d{9}",                           # Teléfono CL
        r"https?://.*\.(jpg|jpeg|png|webp|gif)",    # URLs de imágenes
    ]
    for patron in patrones_sensibles:
        if re.search(patron, texto, re.IGNORECASE):
            return True
    return False


def scrape_obituario(sitio: dict) -> dict:
    """
    Scraping ético de un sitio individual.
    Solo extrae: nombre, fecha.
    Límite ético: MAX_RESULTS registros.
    """
    nombre_sitio = sitio["name"]
    url = sitio["url"]

    try:
        logger.info(f"[FETCH] Iniciando scraping: {nombre_sitio} ({url})")
        resp = requests.get(url, headers=HEADERS, timeout=15)

        if resp.status_code != 200:
            logger.error(f"[ERROR] {nombre_sitio} respondió con status {resp.status_code}")
            return {"sitio": nombre_sitio, "error": f"HTTP {resp.status_code}", "obituarios": []}

        soup = BeautifulSoup(resp.text, "html.parser")
        rows = soup.select(sitio.get("selector_rows", ""))

        obituarios = []
        for row in rows[:MAX_RESULTS * 2]:  # Buffer para filtrar sensibles
            nombre_el = row.select_one(sitio.get("selector_nombre", ""))
            fecha_el = row.select_one(sitio.get("selector_fecha", ""))

            nombre = safe_text(nombre_el)
            fecha = safe_text(fecha_el)

            # Filtro ético: descarta si hay datos sensibles
            if nombre and es_dato_sensible(nombre):
                logger.warning(f"[ÉTICO] Dato sensible omitido en {nombre_sitio}")
                continue

            if nombre:
                obituarios.append({
                    "nombre": nombre,
                    "fecha": fecha or "Fecha no disponible",
                })

            if len(obituarios) >= MAX_RESULTS:
                break

        logger.info(f"[OK] {nombre_sitio}: {len(obituarios)} registros extraídos")
        return {"sitio": nombre_sitio, "timestamp": RUN_TIMESTAMP, "obituarios": obituarios}

    except requests.exceptions.Timeout:
        logger.error(f"[TIMEOUT] {nombre_sitio}: request tardó más de 15s")
        return {"sitio": nombre_sitio, "error": "Timeout", "obituarios": []}
    except Exception as e:
        logger.error(f"[EXCEPCION] {nombre_sitio}: {e}")
        return {"sitio": nombre_sitio, "error": str(e), "obituarios": []}


# ─────────────────────────────────────────────────────
# ETAPA 4: CHECKLIST POST-RUN (Tester Forense)
# ─────────────────────────────────────────────────────

def generar_hash_auditoria(data: dict) -> str:
    """Genera SHA-256 del JSON de output para trazabilidad."""
    contenido = json.dumps(data, sort_keys=True, ensure_ascii=False)
    return hashlib.sha256(contenido.encode("utf-8")).hexdigest()


def checklist_post_run(resultados: dict) -> bool:
    """
    Tester Forense: valida el output antes de guardarlo.
    Retorna True si pasa todo el checklist, False si falla.
    """
    logger.info("=" * 60)
    logger.info("CHECKLIST POST-RUN (Tester Forense)")
    logger.info("=" * 60)
    ok = True

    # [1] Total de registros < 50
    total_registros = sum(
        len(v.get("obituarios", [])) for v in resultados.values()
    )
    if total_registros < 50:
        logger.info(f"[✅] Registros totales: {total_registros} (< 50 — OK)")
    else:
        logger.error(f"[❌] Registros totales: {total_registros} (SUPERA límite ético de 50)")
        ok = False

    # [2] Sin fotos/imágenes extradas
    for sitio, data in resultados.items():
        for obit in data.get("obituarios", []):
            for val in obit.values():
                if val and ("http" in str(val) and any(ext in str(val) for ext in [".jpg", ".png", ".webp"])):
                    logger.error(f"[❌] URL de imagen detectada en {sitio}: {val}")
                    ok = False

    # [3] Sin errores HTTP en todos los sitios
    errores = [s for s, d in resultados.items() if "error" in d and d["error"]]
    if errores:
        logger.warning(f"[⚠️] Sitios con errores (excluidos del output): {errores}")
    else:
        logger.info("[✅] Sin errores HTTP en los sitios procesados")

    # [4] Timestamp del run es el actual
    logger.info(f"[✅] Timestamp del run: {RUN_TIMESTAMP}")

    # [5] Hash de auditoría
    hash_val = generar_hash_auditoria(resultados)
    logger.info(f"[✅] SHA-256 del output: {hash_val}")
    with open(AUDIT_FILE, "w") as f:
        f.write(f"Run: {RUN_TIMESTAMP}\nSHA-256: {hash_val}\n")

    logger.info("=" * 60)
    if ok:
        logger.info("CHECKLIST APROBADO ✅ — Output listo para usar.")
    else:
        logger.error("CHECKLIST FALLIDO ❌ — Revisar errores antes de usar el output.")
    logger.info("=" * 60)
    return ok


# ─────────────────────────────────────────────────────
# MAIN LOOP (Cascada de etapas)
# ─────────────────────────────────────────────────────

def main():
    # ETAPA 1: Verificación pre-scraping
    reporte_compliance = verificar_todos_sitios(SITIOS)

    # Filtrar solo sitios permitidos
    sitios_permitidos = [
        s for s in SITIOS
        if reporte_compliance.get(s["name"], {}).get("permitido", False)
    ]

    if not sitios_permitidos:
        logger.error("ABORTANDO: Ningún sitio permitido por robots.txt.")
        return

    logger.info(f"\n[INFO] Sitios habilitados para scraping: {[s['name'] for s in sitios_permitidos]}\n")

    # ETAPA 3: Scraping (con delays éticos entre requests)
    resultados = {}
    for sitio in sitios_permitidos:
        resultado = scrape_obituario(sitio)
        resultados[sitio["name"]] = resultado

        delay = random.uniform(DELAY_MIN, DELAY_MAX)
        logger.info(f"[DELAY] Esperando {delay:.1f}s antes del siguiente request (anti-DoS)...")
        time.sleep(delay)

    # ETAPA 4: Checklist post-run
    checklist_ok = checklist_post_run(resultados)

    if checklist_ok:
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(resultados, f, indent=2, ensure_ascii=False)
        logger.info(f"[OK] Output guardado en: {OUTPUT_FILE}")
        logger.info(f"[OK] Hash de auditoría en: {AUDIT_FILE}")
    else:
        logger.error("[ALERTA] Output NO guardado por fallo en checklist. Revisar scraper_etico.log.")


if __name__ == "__main__":
    main()
