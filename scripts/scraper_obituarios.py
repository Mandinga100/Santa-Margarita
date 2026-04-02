"""
scraper_obituarios.py
=====================
Scraper ÉTICO y LEGAL de obituarios para Funeraria Santa Margarita.

v2.0 - Optimizado con API de Parque del Recuerdo y selectores EPSP actualizados.
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
# CONFIGURACIÓN ÉTICA OBLIGATORIA
# ─────────────────────────────────────────────
USER_AGENT     = "MiAgenteIA-FunerariaSantaMargarita/2.0 (contacto@funerariasantamargarita.cl)"
DELAY_MIN      = 3     # Reducido ligeramente por uso de API
DELAY_MAX      = 7     
MAX_RESULTS    = 10    
LOG_FILE       = "scraper_etico.log"
OUTPUT_FILE    = "obituarios_eticos.json"
AUDIT_FILE     = "audit_hash.txt"
RUN_TIMESTAMP  = datetime.now().isoformat()
TODAY_YYYY_MM_DD = datetime.now().strftime("%Y-%m-%d")

# ─────────────────────────────────────────────
# LOGGING
# ─────────────────────────────────────────────
if logging.getLogger().hasHandlers():
    logging.getLogger().handlers.clear()

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
# FUENTES ACTUALIZADAS
# ─────────────────────────────────────────────
SITIOS = [
    {
        "name": "EPSP Obituarios",
        "url": "https://www.epsp.cl/frmObit",
        "type": "dom",
        "selector_rows": ".testimonial-item",
        "selector_nombre": "h4",
        "selector_fecha": "h6",
    },
    {
        "name": "Parque del Recuerdo",
        "url": f"https://parquedelrecuerdo.cl/api/pdr/v01/corporativo/common/avisos-funebres/fecha/{TODAY_YYYY_MM_DD}",
        "type": "api",
        "base_url": "https://www.parquedelrecuerdo.cl" # Para robots.txt
    },
    {
        "name": "Funeraria Hogar de Cristo",
        "url": "https://www.funerariahogardecristo.com/obituario/",
        "type": "dom",
        "selector_rows": ".obituario, article, .item-obituario",
        "selector_nombre": "h2, h3, .nombre",
        "selector_fecha": ".fecha, time, .date",
    }
]

HEADERS = {
    "User-Agent": USER_AGENT,
    "Accept": "application/json, text/html, */*",
    "Accept-Language": "es-CL,es;q=0.9",
}

# ─────────────────────────────────────────────────────
# ETAPA 1: VERIFICACIÓN PRE-SCRAPING
# ─────────────────────────────────────────────────────

def check_robots(base_url: str) -> dict:
    robots_url = base_url.rstrip("/") + "/robots.txt"
    try:
        rp = RobotFileParser()
        rp.set_url(robots_url)
        rp.read()
        allowed = rp.can_fetch(USER_AGENT, base_url)
        if not allowed:
            return {"permitido": False, "razon": "Bloqueado por robots.txt"}
        return {"permitido": True, "razon": "robots.txt permite el acceso"}
    except Exception as e:
        return {"permitido": True, "razon": f"robots.txt no accesible (asumido OK): {e}"}

def verificar_todos_sitios(sitios: list) -> dict:
    reporte = {}
    logger.info("=" * 60)
    logger.info(f"INICIO VERIFICACIÓN Compliance — {RUN_TIMESTAMP}")
    for sitio in sitios:
        nombre = sitio["name"]
        url_a_testear = sitio.get("base_url") or sitio["url"]
        verificacion = check_robots(url_a_testear)
        reporte[nombre] = verificacion
        logger.info(f"[{'OK' if verificacion['permitido'] else 'BLOCK'}] {nombre}: {verificacion['razon']}")
    return reporte

# ─────────────────────────────────────────────────────
# ETAPA 3: EXTRACCIÓN (API o DOM)
# ─────────────────────────────────────────────────────

def safe_text(element) -> Optional[str]:
    if element is None: return None
    return element.get_text(separator=" ", strip=True)

def scrape_obituario(sitio: dict) -> dict:
    nombre_sitio = sitio["name"]
    url = sitio["url"]
    tipo = sitio["type"]

    try:
        logger.info(f"[FETCH] Ingesta desde {nombre_sitio} ({tipo})")
        resp = requests.get(url, headers=HEADERS, timeout=15)

        if resp.status_code != 200:
            logger.error(f"[ERROR] HTTP {resp.status_code}")
            return {"sitio": nombre_sitio, "obituarios": []}

        obituarios = []

        if tipo == "api":
            # Caso Parque del Recuerdo
            data = resp.json()
            # La API devuelve una lista de objetos
            if isinstance(data, list):
                for item in data[:MAX_RESULTS]:
                    obituarios.append({
                        "nombre": item.get("fallecido", "Desconocido").title(),
                        "fecha": f"{item.get('fechaLlegada', '')} {item.get('horaLlegada', '')}".strip() or TODAY_YYYY_MM_DD
                    })
        else:
            # Caso DOM
            soup = BeautifulSoup(resp.text, "html.parser")
            rows = soup.select(sitio.get("selector_rows", ""))
            for row in rows[:MAX_RESULTS]:
                nom = safe_text(row.select_one(sitio.get("selector_nombre", "")))
                fec = safe_text(row.select_one(sitio.get("selector_fecha", "")))
                if nom:
                    obituarios.append({"nombre": nom.title(), "fecha": fec or TODAY_YYYY_MM_DD})

        logger.info(f"[OK] {nombre_sitio}: {len(obituarios)} registros extraídos.")
        return {"sitio": nombre_sitio, "obituarios": obituarios}

    except Exception as e:
        logger.error(f"[EXCEPCIÓN] {nombre_sitio}: {e}")
        return {"sitio": nombre_sitio, "obituarios": []}

# ─────────────────────────────────────────────────────
# ETAPA 4: POST-RUN & AUDITORÍA
# ─────────────────────────────────────────────────────

def checklist_y_guardar(resultados: dict):
    total = sum(len(v["obituarios"]) for v in resultados.values())
    
    # Auditoría
    contenido = json.dumps(resultados, sort_keys=True, ensure_ascii=False)
    final_hash = hashlib.sha256(contenido.encode("utf-8")).hexdigest()
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(resultados, f, indent=2, ensure_ascii=False)
    
    with open(AUDIT_FILE, "w") as f:
        f.write(f"Run: {RUN_TIMESTAMP}\nTotal: {total}\nHash: {final_hash}\n")
    
    logger.info("=" * 60)
    logger.info(f"PROCESO COMPLETADO EXITOASAMENTE")
    logger.info(f"Registros Totales: {total}")
    logger.info(f"Archivo: {OUTPUT_FILE}")
    logger.info(f"Hash: {final_hash}")
    logger.info("=" * 60)

# ─────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────

def main():
    reporte = verificar_todos_sitios(SITIOS)
    final_results = {}

    for sitio in SITIOS:
        if not reporte[sitio["name"]]["permitido"]: continue
        
        res = scrape_obituario(sitio)
        final_results[sitio["name"]] = res
        time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))

    checklist_y_guardar(final_results)

if __name__ == "__main__":
    main()
