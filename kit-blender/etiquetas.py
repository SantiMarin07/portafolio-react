from PIL import Image, ImageDraw, ImageFont
import sys
import os
HERE = os.path.dirname(os.path.abspath(__file__))
F = HERE + '/fuentes/'
OUT = os.environ.get('KIT_OUT', HERE) + '/'
CREAM = (250, 243, 239)
INK = (36, 18, 28)
RASP = (194, 24, 91)
GOLD = (122, 85, 32)

def tube():
    # u = around the tube (full circle), v = height. Real size 1.13 x 0.9 -> 2260 x 1800
    W, H = 2260, 1800
    im = Image.new('RGB', (W, H), CREAM)
    # vertical text drawn on a temp canvas then rotated
    t = Image.new('RGBA', (1500, 420), (0, 0, 0, 0))
    d = ImageDraw.Draw(t)
    big = ImageFont.truetype(F + 'Unbounded-700.ttf', 230)
    d.text((750, 150), 'TU MARCA', font=big, fill=INK, anchor='mm')
    sm = ImageFont.truetype(F + 'Manrope-800.ttf', 62)
    d.text((750, 330), 'CREMA FACIAL  ·  100 ML', font=sm, fill=RASP, anchor='mm')
    t = t.rotate(90, expand=True)
    cx = int(W * 0.25)
    im.paste(t, (cx - t.width // 2, H // 2 - t.height // 2 - 60), t)
    im.save(OUT + 'label_tube.png')

def jar():
    # jar: r 0.35 -> circ 2.2, h 0.3 -> 2200 x 300 (x2)
    W, H = 4400, 600
    im = Image.new('RGB', (W, H), CREAM)
    d = ImageDraw.Draw(im)
    big = ImageFont.truetype(F + 'Unbounded-700.ttf', 190)
    sm = ImageFont.truetype(F + 'Manrope-800.ttf', 64)
    cx = int(W * 0.25)
    d.text((cx, 250), 'TU MARCA', font=big, fill=INK, anchor='mm')
    d.text((cx, 440), 'MASCARILLA  ·  250 G', font=sm, fill=RASP, anchor='mm')
    im.save(OUT + 'label_jar.png')

def bottle():
    # dropper bottle r 0.16 -> circ 1.0, h 0.5 -> 2000 x 1000
    W, H = 2000, 1000
    im = Image.new('RGB', (W, H), (243, 223, 214))
    d = ImageDraw.Draw(im)
    big = ImageFont.truetype(F + 'Unbounded-700.ttf', 150)
    sm = ImageFont.truetype(F + 'Manrope-800.ttf', 50)
    cx = int(W * 0.25)
    d.text((cx, 430), 'TU', font=big, fill=INK, anchor='mm')
    d.text((cx, 590), 'MARCA', font=big, fill=INK, anchor='mm')
    d.text((cx, 760), 'SÉRUM · 30 ML', font=sm, fill=RASP, anchor='mm')
    im.save(OUT + 'label_bottle.png')

tube(); jar(); bottle()
print('ok')
