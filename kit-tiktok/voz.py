# uso: python3 voz.py <guion_voz.json> <salida.wav>
# guion_voz.json: {"duracion": 18, "frases": [[0.15, "Primera frase."], [3.0, "Segunda frase."], ...]}
# Voz masculina calmada (Kokoro, em_alex, español latino). Escribe las palabras como se pronuncian:
#   WhatsApp -> "guásap", 3D -> "tres de", @smdevc -> "ese eme dev ce", Facebook -> "Feisbuk", reels -> "ríls".
# Modelo: necesitas kokoro-v1.0.onnx y voices-v1.0.bin en esta carpeta (ver README).
import json, sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
g = json.load(open(sys.argv[1])); SR = 24000; D = g["duracion"]; frases = g["frases"]
k = Kokoro('kokoro-v1.0.onnx', 'voices-v1.0.bin')
out = np.zeros(int(D * SR), np.float32)
for i, (t, txt) in enumerate(frases):
    a, _ = k.create(txt, voice='em_alex', speed=1.08, lang='es-419'); a = a.astype(np.float32)
    sig = frases[i + 1][0] if i + 1 < len(frases) else D
    fin = t + len(a) / SR
    print(f"@{t:5.2f} termina {fin:5.2f} (siguiente {sig})" + ("  <-- SE PASA, acorta la frase" if fin > sig + 0.6 else ""))
    s0 = int(t * SR); out[s0:s0 + len(a)] += a[:max(0, len(out) - s0)]
sf.write(sys.argv[2], out, SR); print("voz lista:", sys.argv[2])
