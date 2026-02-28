const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'c:\\Users\\mandi\\Documents\\Proyectos\\Web\\Prueba';
const DATA_FILE = 'C:\\Users\\mandi\\.gemini\\antigravity\\brain\\43457ae4-77f2-4e1f-8742-b29e6242a24e\\all_files.json';
const LOG_STITCH = path.join(ROOT_DIR, 'docs', 'logs', 'migracion-imagenes-stitch.md');
const LOG_LEGACY = path.join(ROOT_DIR, 'docs', 'logs', 'migracion-img-legacy.md');

// Read JSON and strip BOM if exists
let fileContent = fs.readFileSync(DATA_FILE, 'utf8');
if (fileContent.charCodeAt(0) === 0xFEFF) {
    fileContent = fileContent.slice(1);
}
const data = JSON.parse(fileContent);

function ensureDirSync(dirpath) {
    if (!fs.existsSync(dirpath)) fs.mkdirSync(dirpath, { recursive: true });
}

ensureDirSync(path.dirname(LOG_STITCH));
ensureDirSync(path.dirname(LOG_LEGACY));

fs.writeFileSync(LOG_STITCH, '# Log Migración Stitch\n\n| Origen | Destino | Notas |\n|---|---|---|\n', 'utf8');
fs.writeFileSync(LOG_LEGACY, '# Log Migración Legacy (img)\n\n| Origen | Destino | Notas |\n|---|---|---|\n', 'utf8');

const usedNames = new Set();

function getUniqueDest(baseDir, name) {
    let destPath = path.join(baseDir, name);
    let parsed = path.parse(destPath);
    let counter = 1;
    while (usedNames.has(destPath)) {
        let suffix = `-${counter.toString().padStart(2, '0')}`;
        destPath = path.join(parsed.dir, parsed.name + suffix + parsed.ext);
        counter++;
    }
    usedNames.add(destPath);
    return destPath;
}

function categorize(item) {
    const name = item.Name.toLowerCase();
    const ext = item.Extension.toLowerCase();
    const isImage = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'].includes(ext);
    const isLegacy = item.DirectoryName.includes('\\img') || item.DirectoryName.endsWith('\\img');

    let targetDir = '';

    if (isImage) {
        targetDir = 'public/assets/images/otros/';
        if (name.includes('logo') || name.includes('favicon') || name.includes('brand')) {
            targetDir = 'public/assets/images/brand/';
        }
        else if (name.includes('blog') || name.includes('articulo') || name.includes('art_culo')) {
            targetDir = 'public/assets/images/blog/';
        }
        else if (name.includes('nosotros') || name.includes('equipo') || name.includes('historia')) {
            targetDir = 'public/assets/images/nosotros/';
        }
        else if (name.includes('ui') || name.includes('icon') || name.includes('bg') || name.includes('background') || name.includes('banner') || name.includes('hero') || name.includes('btn') || name.includes('button') || name.includes('arrow') || name.includes('cursor') || name.includes('line') || name.includes('slider') || name.includes('slide')) {
            targetDir = 'public/assets/images/ui/';
        }
        else if (name.includes('plan') || name.includes('premium') || name.includes('estandar') || name.includes('estado') || name.includes('margarita')) {
            if (name.includes('premium')) targetDir = 'public/assets/images/planes/premium/';
            else if (name.includes('estandar') || name.includes('estándar')) targetDir = 'public/assets/images/planes/estandar/';
            else if (name.includes('estado') || name.includes('margarita ips') || name.includes('ips')) targetDir = 'public/assets/images/planes/estado/';
            else targetDir = 'public/assets/images/planes/';
        }
        else if (name.includes('servicio') || name.includes('memorial') || name.includes('velatorio') || name.includes('capilla') || name.includes('traslado') || name.includes('logistica') || name.includes('asesoria') || name.includes('legal') || name.includes('condolencia') || name.includes('urna') || name.includes('cortejo')) {
            if (name.includes('memorial') || name.includes('condolencia')) targetDir = 'public/assets/images/servicios/memoriales/';
            else if (name.includes('logistica')) targetDir = 'public/assets/images/servicios/logistica/';
            else if (name.includes('asesoria') || name.includes('legal')) targetDir = 'public/assets/images/servicios/asesoria-legal/';
            else if (name.includes('velatorio') || name.includes('capilla')) targetDir = 'public/assets/images/servicios/velatorio-capilla/';
            else if (name.includes('traslado')) targetDir = 'public/assets/images/servicios/traslados/';
            else targetDir = 'public/assets/images/servicios/';
        }
    } else {
        if (ext === '.html') targetDir = 'stitch/exports/';
        else if (ext === '.stproj') targetDir = 'stitch/proyectos/';
        else if (ext === '.stscene') targetDir = 'stitch/escenas/';
        else targetDir = 'stitch/config/';
    }

    let normalizeName = name.replace(/_/g, '-').replace(/[^a-z0-9.-]/g, '').replace(/-+/g, '-');
    if (normalizeName.startsWith('-')) normalizeName = normalizeName.slice(1);

    const absoluteTargetDir = path.join(ROOT_DIR, targetDir);
    ensureDirSync(absoluteTargetDir);

    const finalPath = getUniqueDest(absoluteTargetDir, normalizeName);
    const relDest = path.relative(ROOT_DIR, finalPath).replace(/\\/g, '/');
    const relSource = path.relative(ROOT_DIR, item.FullName).replace(/\\/g, '/');

    return {
        source: item.FullName,
        dest: finalPath,
        relDest,
        relSource,
        isLegacy
    };
}

const moves = data.map(categorize);
let movedCount = 0;

for (const move of moves) {
    if (fs.existsSync(move.source)) {
        fs.renameSync(move.source, move.dest);
        const logLine = `| ${move.relSource} | ${move.relDest} | Renombrado y categorizado automáticamente |\n`;
        if (move.isLegacy) {
            fs.appendFileSync(LOG_LEGACY, logLine, 'utf8');
        } else {
            fs.appendFileSync(LOG_STITCH, logLine, 'utf8');
        }
        movedCount++;
    }
}

console.log(`Log generado y archivos movidos (${movedCount} elementos procesados de ${moves.length}).`);
