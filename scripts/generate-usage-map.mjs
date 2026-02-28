import fs from 'fs';
import path from 'path';

const ROOT_DIR = 'c:\\Users\\mandi\\Documents\\Proyectos\\Web\\Prueba';
const ASSETS_DIR = path.join(ROOT_DIR, 'public', 'assets', 'images');
const MAP_DEST = path.join(ROOT_DIR, 'docs', 'assets', 'mapa-uso-completo.md');
const HTML_DIR = path.join(ROOT_DIR, 'docs', 'assets', 'html-actualizado');
const PENDIENTES_DEST = path.join(ROOT_DIR, 'docs', 'assets', 'pendientes-vinculacion.md');
const README_DEST = path.join(ROOT_DIR, 'public', 'assets', 'README.md');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

ensureDir(path.dirname(MAP_DEST));
ensureDir(HTML_DIR);
ensureDir(path.join(HTML_DIR, 'planes'));
ensureDir(path.join(HTML_DIR, 'servicios'));

const allFiles = [];
function getFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            getFiles(full);
        } else {
            allFiles.push(full);
        }
    }
}
getFiles(ASSETS_DIR);

// Categorize files
const mappedAssets = [];
const unmappedAssets = [];

for (const file of allFiles) {
    const ext = path.extname(file).toLowerCase();
    if (!['.png', '.jpeg', '.jpg', '.webp', '.svg'].includes(ext)) continue;

    const relPath = '/' + path.relative(path.join(ROOT_DIR, 'public'), file).replace(/\\/g, '/');
    const name = path.basename(file).toLowerCase();

    let mapped = false;
    let section = '';
    let category = '';
    let expectedLocation = '';
    let usage = '';
    let alt = '';

    // Simple heuristic
    if (relPath.includes('/ui/')) {
        if (name.includes('hero')) {
            section = 'INDEX.HTML - Home Principal';
            category = 'Hero Banner';
            usage = 'Banner principal';
            alt = 'Funeraria Santa Margarita - Acompañamiento digno 24/7';
            expectedLocation = 'index.html';
            mapped = true;
        } else if (name.includes('icon') || name.includes('arrow') || name.includes('cursor')) {
            section = 'GLOBAL - UI Elements';
            category = 'UI Components';
            usage = 'UI Interactivo';
            alt = 'Icono decorativo';
            expectedLocation = '_global.html';
            mapped = true;
        }
    }

    if (name.includes('plan') || name.includes('premium') || name.includes('estandar') || name.includes('estado') || name.includes('acacia') || name.includes('algarrobo') || name.includes('araucaria') || name.includes('castano') || name.includes('ips') || name.includes('queule') || name.includes('rauli') || name.includes('rosal') || name.includes('quillay')) {
        let planName = name.replace('.webp', '').replace('.svg', '').replace('-main', '').replace(/[0-9]/g, '');
        if (!planName) planName = 'generic';
        section = `PLANES/PLAN-${planName.toUpperCase()}.HTML - Plan Funerario`;
        category = name.includes('main') ? 'Hero Plan' : 'Galería Plan';
        usage = name.includes('main') ? 'Hero banner del plan' : 'Carrusel o detalle de opciones';
        alt = `Plan Funerario ${planName} - Funeraria Santa Margarita`;
        expectedLocation = `planes/plan-${planName}.html`;
        mapped = true;
    }

    if (name.includes('memorial') || name.includes('condolencia') || name.includes('velatorio') || name.includes('traslado') || name.includes('asesoria') || name.includes('logistica')) {
        let servName = 'general';
        if (name.includes('memorial')) servName = 'memoriales';
        if (name.includes('velatorio')) servName = 'velatorio';
        if (name.includes('traslado')) servName = 'traslados';
        if (name.includes('asesoria')) servName = 'asesoria-legal';
        if (name.includes('logistica')) servName = 'logistica';

        section = `SERVICIOS/${servName.toUpperCase()}.HTML - Servicio`;
        category = name.includes('hero') ? 'Hero Servicio' : 'Galería Servicio';
        usage = name.includes('hero') ? 'Hero servicio' : 'Cards de instalación';
        alt = `Servicio de ${servName} premium - Funeraria Santa Margarita`;
        expectedLocation = `servicios/${servName}.html`;
        mapped = true;
    }

    if (name.includes('about') || name.includes('team') || name.includes('nosotros')) {
        section = 'NOSOTROS.HTML - Institucional';
        category = 'Equipo e Institución';
        usage = 'Fotos institucionales';
        alt = 'Equipo de Funeraria Santa Margarita';
        expectedLocation = 'nosotros.html';
        mapped = true;
    }

    if (name.includes('logo') || name.includes('brand')) {
        section = 'GLOBAL - Brand';
        category = 'Logotipo corporativo';
        usage = 'Navbar / Footer';
        alt = 'Logo Oficial Funeraria Santa Margarita';
        expectedLocation = '_global.html';
        mapped = true;
    }

    // Default mapping for index based on specific names like "calidad", "compasion" which sound like values for landing
    if (!mapped && (name.includes('calidad') || name.includes('compasion') || name.includes('consuelo') || name.includes('empatia') || name.includes('excelencia') || name.includes('personalizado') || name.includes('profesional') || name.includes('respeto'))) {
        section = 'INDEX.HTML - Home Principal';
        category = 'Valores Corporativos';
        usage = 'Grid de valores o sección Nosotros destacada';
        alt = `Valor corporativo: ${name.replace('.webp', '')}`;
        expectedLocation = 'index.html';
        mapped = true;
    }


    if (mapped) {
        mappedAssets.push({ section, category, relPath, alt, usage, expectedLocation });
    } else {
        // Fallback or unmapped
        if (relPath.includes('screen-')) {
            unmappedAssets.push({ name, relPath, suggestion: 'Revisar para uso en portafolio de layouts o blog' });
        } else {
            unmappedAssets.push({ name, relPath, suggestion: 'Revisar para blog o secciones misceláneas' });
        }
    }
}

// Generate MAPA
let mapContent = `# MAPA DE USO DE ASSETS COMPLETO\n\nEste mapa centraliza la ubicación técnica y SEO-friendly de los archivos utilizados en el portal.\n\n`;
const sections = [...new Set(mappedAssets.map(x => x.section))];
for (const sec of sections) {
    mapContent += `## ${sec}\n\n`;
    const inSection = mappedAssets.filter(x => x.section === sec);
    const categories = [...new Set(inSection.map(x => x.category))];
    for (const cat of categories) {
        mapContent += `### ${cat}\n| Elemento | Ruta | Alt Text | Uso |\n|----------|------|----------|-----|\n`;
        const items = inSection.filter(x => x.category === cat);
        for (const item of items) {
            const elemName = path.basename(item.relPath, path.extname(item.relPath)).replace(/-/g, ' ');
            mapContent += `| ${elemName} | \`${item.relPath}\` | "${item.alt}" | ${item.usage} |\n`;
        }
        mapContent += `\n`;
    }
}
fs.writeFileSync(MAP_DEST, mapContent, 'utf8');

// Generate Pendientes
let pendContent = `# PENDIENTES DE VINCULACIÓN\n\nLista de imágenes sin uso claro establecido aún en código principal.\n\n| Imagen | Ruta | Posible uso | Acción |\n|--------|------|-------------|--------|\n`;
for (const item of unmappedAssets) {
    pendContent += `| ${item.name} | \`${item.relPath}\` | ${item.suggestion} | Pendiente revisión visual |\n`;
}
fs.writeFileSync(PENDIENTES_DEST, pendContent, 'utf8');


// Generate HTML Snippets for requested pages
const htmlTemplates = {};
for (const mapped of mappedAssets) {
    if (!htmlTemplates[mapped.expectedLocation]) htmlTemplates[mapped.expectedLocation] = [];
    htmlTemplates[mapped.expectedLocation].push(mapped);
}

for (const [location, assets] of Object.entries(htmlTemplates)) {
    if (location === '_global.html') continue; // skip globals

    // Grouping for HTML snippets layout
    let htmlFile = `<!-- SNIPPET GENERADO AUTO - MIGRACIÓN ASSETS -->\n<!-- ARCHIVO OBJETIVO: ${location.toUpperCase()} -->\n\n<main class="page-container">\n`;
    htmlFile += `  <section class="hero-section">\n`;

    const heroes = assets.filter(a => a.category.includes('Hero'));
    for (const h of heroes) {
        htmlFile += `    <img src="${h.relPath}" \n         alt="${h.alt}" \n         class="img-fluid hero-img" \n         width="1920" height="1080">\n`;
    }
    if (heroes.length === 0) htmlFile += `    <!-- Hero image pendiente -->\n`;
    htmlFile += `  </section>\n\n  <section class="content-gallery">\n`;

    const others = assets.filter(a => !a.category.includes('Hero'));
    if (others.length > 0) {
        htmlFile += `    <div class="swiper-container">\n      <div class="swiper-wrapper">\n`;
        for (const o of others) {
            htmlFile += `        <div class="swiper-slide">\n          <img src="${o.relPath}" \n               alt="${o.alt}" \n               class="img-fluid" \n               loading="lazy" \n               width="800" height="600">\n        </div>\n`;
        }
        htmlFile += `      </div>\n    </div>\n`;
    }

    htmlFile += `  </section>\n</main>\n`;
    const finalDestHtml = path.join(HTML_DIR, location);
    ensureDir(path.dirname(finalDestHtml));
    fs.writeFileSync(finalDestHtml, htmlFile, 'utf8');
}


// Generate README in assets
const readmeContent = `# Assets - Funeraria Santa Margarita

## Estructura
- \`images/brand/\`: Logos e isotipos.
- \`images/servicios/\`: Assets de la oferta de servicios core.
- \`images/planes/\`: Elementos visuales atados a planes a futuro.
- \`images/ui/\`: Interfaz, cursores, svgs.
- \`images/otros/\`: Misceláneos.

## Mapa completo
Ver \`/docs/assets/mapa-uso-completo.md\` el cual vincula HTML semánticamente.

## HTML actualizado
Ver \`/docs/assets/html-actualizado/\` para extraer componentes y tags \`<img>\` correctos.
`;
fs.writeFileSync(README_DEST, readmeContent, 'utf8');

console.log("Completado mappeo avanzado HTML y Markdowns.");
