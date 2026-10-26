#!/bin/bash
# uso: ./mezclar.sh <carpeta_cuadros> <voz.wav> <duracion_seg> <salida.mp4>
# Une cuadros + voz + musica de marca (musica.m4a) con la voz por encima. Sale listo para TikTok (H.264, -14 LUFS).
set -e; cd "$(dirname "$0")"
FR=$1; VOZ=$2; D=$3; OUT=$4
RATE=$(python3 -c "print(round(16/$D,4))")
ffmpeg -y -v error -framerate 30 -i $FR/f%04d.png -i $VOZ -i musica.m4a -filter_complex \
"[0:v]tpad=stop_mode=clone:stop_duration=3,trim=duration=$D,format=yuv420p[v];\
[1:a]aresample=44100,highpass=f=70,equalizer=f=150:t=q:w=1.2:g=2.5,equalizer=f=3500:t=q:w=1.5:g=2,acompressor=threshold=-20dB:ratio=3:attack=8:release=180,aecho=0.85:0.4:30:0.06,volume=1.6,asplit=2[vo][sc];\
[2:a]atempo=$RATE,apad,atrim=0:$D,afade=t=out:st=$(python3 -c "print($D-1.3)"):d=1.3,volume=0.55[mu];\
[mu][sc]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[mud];\
[vo][mud]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[a]" \
-map "[v]" -map "[a]" -c:v libx264 -preset slow -b:v 4200k -maxrate 5500k -bufsize 9000k -profile:v high -c:a aac -b:a 160k -ac 2 -movflags +faststart -t $D $OUT
echo "video listo: $OUT"
