import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = 'C:\\Users\\mandi\\Documents\\Proyectos\\Web\\Prueba\\public\\assets\\images';

const convertToWebp = async (dirpath) => {
    const files = fs.readdirSync(dirpath);
    for (const file of files) {
        const fullPath = path.join(dirpath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            await convertToWebp(fullPath);
        } else {
            const ext = path.extname(fullPath).toLowerCase();
            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                const dest = path.join(dirpath, `${path.basename(file, path.extname(file))}.webp`);
                console.log(`Convirtiendo: ${file} -> ${path.basename(dest)}`);
                try {
                    // Resize defaults: we could apply a width, but let's just compress automatically without altering width to avoid data-loss.
                    await sharp(fullPath)
                        .webp({ quality: 80, effort: 4 }) // Effort 4 is sharp balance of compression speed/ratio
                        .toFile(dest);

                    fs.unlinkSync(fullPath); // Elimina la original de forma segura luego del éxito
                    console.log(`[OK] Removido original: ${file}`);
                } catch (error) {
                    console.error(`[ERROR] Falló al convertir ${file}:`, error);
                }
            }
        }
    }
};

(async () => {
    console.log('Iniciando optimización por lotes a WebP...');
    await convertToWebp(assetsDir);
    console.log('Finalizado.');
})();
