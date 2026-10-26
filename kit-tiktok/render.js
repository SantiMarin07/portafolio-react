// uso: node render.js <pagina.html> <carpeta_cuadros> [desde] [hasta]   (30 fps; TOTAL lo define el guion)
// Ejemplo: node render.js moto.html cuadros_moto        -> renderiza todo el video
// Se puede partir en pedazos y correrlos en paralelo: node render.js moto.html c 0 180 & node render.js moto.html c 180 360 ...
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => {
  const [page, dir, a0, b0] = process.argv.slice(2);
  const br = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--allow-file-access-from-files'] });
  const p = await br.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.log('ERROR en la pagina:', e.message));
  await p.goto('file://' + path.resolve(__dirname, page), { waitUntil: 'domcontentloaded' });
  await p.waitForFunction('window.ready && window.__gixxerReady', null, { timeout: 240000, polling: 500 });
  await p.evaluate(() => document.fonts.ready);
  const total = Math.round(await p.evaluate(() => window.TOTAL) * 30);
  const a = a0 ? +a0 : 0, b = b0 ? +b0 : total;
  fs.mkdirSync(dir, { recursive: true });
  for (let i = a; i < b; i++) {
    const f = `${dir}/f${String(i).padStart(4, '0')}.png`; if (fs.existsSync(f)) continue;
    await p.evaluate(([t, i]) => window.setT(t, i), [i / 30, i]); await p.screenshot({ path: f });
  }
  await br.close(); console.log('cuadros listos', dir, a, b);
})();
