import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const workspaceRoot = process.cwd();
const publicDir = path.join(workspaceRoot, 'public');
const outRoot = path.join(publicDir, 'img-opt');

const widths = [48, 64, 96, 128, 192];
const formats = /** @type {const} */ ([
  { ext: 'avif', type: 'image/avif' },
  { ext: 'webp', type: 'image/webp' },
]);

/**
 * @param {string} p
 */
async function statSafe(p) {
  try {
    return await fs.stat(p);
  } catch {
    return null;
  }
}

/**
 * Input is absolute path within workspace/public OR workspace root (e.g. project.png).
 * Output mirrors location under public/img-opt, with name suffixed by -{width}.{ext}.
 *
 * @param {string} absInput
 * @returns {Promise<void>}
 */
async function optimizeOne(absInput) {
  const inputStat = await statSafe(absInput);
  if (!inputStat) return;

  const relToPublic = path.relative(publicDir, absInput);
  const isInPublic = !relToPublic.startsWith('..') && !path.isAbsolute(relToPublic);
  const rel = isInPublic ? relToPublic : path.relative(workspaceRoot, absInput);

  const parsed = path.parse(rel);
  const outDir = path.join(outRoot, parsed.dir);
  await fs.mkdir(outDir, { recursive: true });

  const pipeline = sharp(absInput, { failOn: 'none' }).rotate();

  // For small UI icon-like images, resizing to explicit widths is fine and predictable.
  for (const w of widths) {
    for (const fmt of formats) {
      const outName = `${parsed.name}-${w}.${fmt.ext}`;
      const outPath = path.join(outDir, outName);

      const outStat = await statSafe(outPath);
      if (outStat && outStat.mtimeMs >= inputStat.mtimeMs) continue;

      let img = pipeline.clone().resize({
        width: w,
        withoutEnlargement: true,
        fit: 'inside',
      });

      if (fmt.ext === 'webp') img = img.webp({ quality: 78 });
      if (fmt.ext === 'avif') img = img.avif({ quality: 55 });

      await img.toFile(outPath);
    }
  }
}

async function main() {
  /** @type {string[]} */
  const inputs = [];

  // “Choose project” + “Scale” card images.
  const imagesDir = path.join(publicDir, 'images');
  const imageFiles = await fs.readdir(imagesDir);
  for (const f of imageFiles) {
    if (!f.toLowerCase().endsWith('.png')) continue;
    inputs.push(path.join(imagesDir, f));
  }

  // Logos shown in UI.
  for (const f of ['logo.png', 'logo2.png']) {
    inputs.push(path.join(publicDir, f));
  }

  // Root social preview image (kept as PNG in meta tags, but optimized variants
  // are still useful if you later swap to <picture> or use it in-page).
  inputs.push(path.join(workspaceRoot, 'project.png'));

  let count = 0;
  for (const p of inputs) {
    // eslint-disable-next-line no-console
    console.log(`Optimizing ${path.relative(workspaceRoot, p)}…`);
    await optimizeOne(p);
    count++;
  }

  // eslint-disable-next-line no-console
  console.log(`Done. Processed ${count} input image(s). Output in ${path.relative(workspaceRoot, outRoot)}/`);
}

await main();
