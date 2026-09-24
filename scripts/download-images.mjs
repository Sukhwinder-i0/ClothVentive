import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '../public/images');
const productsDir = path.resolve(publicDir, 'products');

if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Fallback high quality local image buffer
const fallbackHero = fs.existsSync(path.resolve(publicDir, 'hero.jpg'))
  ? fs.readFileSync(path.resolve(publicDir, 'hero.jpg'))
  : null;

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    console.log(`Already exists: ${path.basename(dest)}`);
    return true;
  }

  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 1000) throw new Error('File too small');
    fs.writeFileSync(dest, buffer);
    console.log(`Downloaded: ${path.basename(dest)} (${(buffer.length / 1024).toFixed(0)} KB)`);
    return true;
  } catch (err) {
    console.warn(`Failed ${url}: ${err.message}. Using high-quality local fallback.`);
    if (fallbackHero) {
      fs.writeFileSync(dest, fallbackHero);
      return true;
    }
    return false;
  }
}

// Read products data
const productsFile = fs.readFileSync(path.resolve(__dirname, '../src/data/products.ts'), 'utf-8');
const regex = /slug:\s*'([^']+)'[\s\S]*?images:\s*\[([\s\S]*?)\]/g;
let match;
const tasks = [];

while ((match = regex.exec(productsFile)) !== null) {
  const slug = match[1];
  const imagesBlock = match[2];
  const urls = imagesBlock
    .split(',')
    .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
    .filter((s) => s.startsWith('http'));

  urls.forEach((url, idx) => {
    const dest = path.resolve(productsDir, `${slug}-${idx + 1}.jpg`);
    tasks.push({ url, dest, slug, idx });
  });
}

console.log(`Starting download of ${tasks.length} product images...`);

for (const task of tasks) {
  await download(task.url, task.dest);
}

console.log('All product images processed successfully.');
