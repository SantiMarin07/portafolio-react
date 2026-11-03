# Kit Blender · animaciones 3D de producto (smdevc)

Escenas de producto estilo estudio hechas en Blender por código: productos flotando, productos formando un círculo visto desde arriba y podio con escalones y arco. Sirven para Reels, TikTok y anuncios.

Los productos son genéricos con la etiqueta "TU MARCA" (tubo de crema, frasco y gotero) en los colores de la marca: crema, frambuesa y dorado.

## Requisitos
```bash
pip install --break-system-packages bpy pillow   # Blender 5.x como módulo de Python (~400 MB)
```
Funciona en la nube sin GPU (Cycles por CPU). En el PC de Santiago corre igual con Blender instalado, pero mucho más rápido.

## Probar en tu propio Blender (sin consola)
`prueba_en_blender.py` es un solo archivo para abrir en Blender 4.2 o más nuevo:
1. Pestaña **Scripting** → en el editor de texto, **Abrir** → elige `prueba_en_blender.py`.
2. Arriba del archivo cambia `TOMA` ("A", "B" o "C"), `MOTOR` ("EEVEE" o "CYCLES") y los colores si quieres.
3. Dale ▶ **Ejecutar script**. Crea una escena nueva `smdevc_prueba_<TOMA>` sin borrar lo tuyo, con la vista por la cámara.
4. **Render → Render Animation** (Ctrl+F12) guarda el video en `Videos/smdevc_blender`.

## Uso rápido
```bash
cd kit-blender
export KIT_OUT=/ruta/de/trabajo        # dónde quedan etiquetas y cuadros (por defecto, esta carpeta)
python3 etiquetas.py                   # genera label_tube.png, label_jar.png y label_bottle.png
python3 escena_belleza.py A 48 48 still   # prueba: 1 cuadro de la toma A
python3 escena_belleza.py A 1 96          # toma completa (96 cuadros = 4 s a 24 fps)
```
- Tomas: **A** = tubos flotando, **B** = círculo visto desde arriba, **C** = podio con arco.
- Los cuadros quedan en `$KIT_OUT/frames_<toma>/001.png …`. Si se corta, vuelve a correr el mismo comando: salta los cuadros que ya existen.
- Tiempo: unos 12 s por cuadro a 540x960 en la nube (2 núcleos), es decir unos 20 min por toma de 4 s. Córrelo en segundo plano.

## Armar el video
```bash
# Unir las tomas a 24 fps y escalar a 1080x1920
ffmpeg -framerate 24 -i frames_A/%03d.png -framerate 24 -i frames_B/%03d.png -framerate 24 -i frames_C/%03d.png \
  -filter_complex "[0][1][2]concat=n=3:v=1,scale=1080:1920:flags=lanczos,format=yuv420p" \
  -c:v libx264 -preset veryfast -crf 20 tomas.mp4
```
Los textos se ponen encima como PNG transparentes (HTML con Unbounded y Manrope, capturado con Playwright usando `omitBackground: true`) con el filtro `overlay` de ffmpeg.

## Cómo variar (para no repetir)
- Cambia el producto: tubo, frasco, gotero o la Gixxer (`public/vitrinas/gixxer150.glb`; descomprímelo con `npx @gltf-transform/cli dequantize`, porque Blender no lee meshopt).
- Cambia los colores de las tapas y del fondo (función `srgb('hex')`), la cámara (posición inicial y final en cada toma) y la cantidad de productos.
- Cambia `random.seed(7)` para que los productos flotantes caigan en otras posiciones.
- Toma "detrás de cámaras": renderiza la misma toma con `S.render.engine = 'BLENDER_WORKBENCH'` (se ve gris, como el visor de Blender) y alterna con la versión final.

## Reglas
- Nada de logos ni productos de marcas reales. Todo es "TU MARCA" o productos propios de Santiago.
- No digas que es el producto de un cliente: es un ejemplo.
- Zona segura en 1080x1920: textos importantes por encima de y=1500 y a la izquierda de x=900.

Las fuentes de `fuentes/` (Unbounded y Manrope) tienen licencia SIL Open Font License.
