# Kit de videos TikTok · smdevc

Videos verticales de 1080x1920 y 18 s, con la misma escena 3D del portafolio: la moto Gixxer 150 que cambia de color, los productos de belleza y la casa por capas. Llevan subtítulos grandes, voz calmada, música de marca y un llamado final a **@smdevc**.

## Preparar (una vez por sesión)
```bash
git clone https://github.com/SantiMarin07/portafolio-react.git && cd portafolio-react && git checkout kit-tiktok
cd kit-tiktok && npm install          # fuentes Unbounded y Manrope
pip install --break-system-packages kokoro-onnx soundfile
curl -L -o kokoro-v1.0.onnx https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx
curl -L -o voices-v1.0.bin  https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin
```
Playwright y Chromium ya vienen instalados (`require('playwright')`).

## Hacer un video
1. **Guion visual.** Copia `ejemplos/moto.js` o `ejemplos/belleza.js` a un archivo nuevo y cambia los textos, los tiempos y la cámara:
   - `TT.cap(desde, hasta, top, [[texto, tamaño, clase, retraso]])` pone un subtítulo. La clase puede ser `''` (oscuro), `'pk'` (rosado) o `'wt'` (blanco).
   - `TT.setChip(t, desde, hasta, texto)` pone la etiqueta inferior.
   - `TT.cta(t, 14.4)` pone el cierre con la píldora @smdevc.
   - Escenas disponibles en `window.__P3`: `moto` (colores con `#swatches .sw`), `casa`, y los productos de belleza con `P.filter(...)` (labial, perfume, crema, sombras…).
   - El gancho en los primeros 2 s decide todo: una pregunta o una promesa concreta.
2. `./armar.sh mi_guion.js mi_video.html`
3. **Cuadros.** Corre `node render.js mi_video.html cuadros_x` (540 cuadros, unos 10 a 20 min). Para ir más rápido, pártelo en 3 o 4 pedazos en paralelo: `node render.js mi_video.html cuadros_x 0 135 &` y así con los demás.
4. **Revisa.** Mira con Read 4 o 5 cuadros (el gancho, la mitad y el cierre): que no haya texto cortado, palabras solas en una línea o emojis partidos.
5. **Voz.** Haz un JSON como `ejemplos/moto_voz.json` y corre `python3 voz.py mi_voz.json voz.wav`. Si sale "SE PASA", acorta esa frase.
6. `./mezclar.sh cuadros_x voz.wav 18 video.mp4`

## Buenas prácticas
- 15 a 20 s.
- Subtítulos en la zona segura: no pongas nada debajo de y=1500 ni a la derecha de x=900, porque ahí van los botones de TikTok.
- Una sola idea por video y un llamado claro: "Sígueme en @smdevc y escríbeme que te cotizo".
