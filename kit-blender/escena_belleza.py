"""Escenas 3D de producto (belleza) para el anuncio de smdevc.
Uso: python3 escena_belleza.py <toma A|B|C> <frame_inicio> <frame_fin> [still]
Cada toma dura 96 cuadros (4 s a 24 fps)."""
import bpy, math, sys, random
from mathutils import Vector, Euler

import os
D = os.environ.get('KIT_OUT', os.path.dirname(os.path.abspath(__file__))) + '/'
shot = sys.argv[1]
f0, f1 = int(sys.argv[2]), int(sys.argv[3])
random.seed(7)

bpy.ops.wm.read_factory_settings(use_empty=True)
S = bpy.context.scene
S.frame_start, S.frame_end = 1, 96
S.render.fps = 24


def srgb(h):
    h = h.lstrip('#')
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((x + 0.055) / 1.055) ** 2.4 if x > 0.04045 else x / 12.92 for x in c)


def principled(name, hexc, rough=0.5, metal=0.0, coat=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    p = m.node_tree.nodes['Principled BSDF']
    p.inputs['Base Color'].default_value = (*srgb(hexc), 1)
    p.inputs['Roughness'].default_value = rough
    p.inputs['Metallic'].default_value = metal
    p.inputs['Coat Weight'].default_value = coat
    return m


def labeled(name, img, rough=0.35):
    """Material con etiqueta envuelta en cilindro (mapeo por coordenadas de objeto)."""
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    p = nt.nodes['Principled BSDF']
    p.inputs['Roughness'].default_value = rough
    p.inputs['Coat Weight'].default_value = 0.3
    tc = nt.nodes.new('ShaderNodeTexCoord')
    sep = nt.nodes.new('ShaderNodeSeparateXYZ')
    nt.links.new(tc.outputs['Generated'], sep.inputs[0])
    # Generated va de 0 a 1 en la caja del objeto -> centrar x,y en 0
    sx = nt.nodes.new('ShaderNodeMath'); sx.operation = 'SUBTRACT'; sx.inputs[1].default_value = 0.5
    sy = nt.nodes.new('ShaderNodeMath'); sy.operation = 'SUBTRACT'; sy.inputs[1].default_value = 0.5
    nt.links.new(sep.outputs['X'], sx.inputs[0]); nt.links.new(sep.outputs['Y'], sy.inputs[0])
    at = nt.nodes.new('ShaderNodeMath'); at.operation = 'ARCTAN2'
    nt.links.new(sy.outputs[0], at.inputs[0]); nt.links.new(sx.outputs[0], at.inputs[1])
    dv = nt.nodes.new('ShaderNodeMath'); dv.operation = 'MULTIPLY_ADD'
    dv.inputs[1].default_value = 1 / (2 * math.pi); dv.inputs[2].default_value = 0.5
    nt.links.new(at.outputs[0], dv.inputs[0])
    cmb = nt.nodes.new('ShaderNodeCombineXYZ')
    nt.links.new(dv.outputs[0], cmb.inputs['X']); nt.links.new(sep.outputs['Z'], cmb.inputs['Y'])
    tex = nt.nodes.new('ShaderNodeTexImage')
    tex.image = bpy.data.images.load(D + img)
    tex.extension = 'REPEAT'
    nt.links.new(cmb.outputs[0], tex.inputs['Vector'])
    nt.links.new(tex.outputs['Color'], p.inputs['Base Color'])
    return m


CAP = principled('cap', 'c2185b', 0.3, 0, 0.6)
GOLD = principled('gold', 'c9a24e', 0.22, 1.0)
STONE = principled('stone', 'eadbd2', 0.85)
BULB = principled('bulb', '24121c', 0.4)
TUBE = labeled('tube', 'label_tube.png')
JAR = labeled('jar', 'label_jar.png', 0.25)
GLASS = bpy.data.materials.new('glass'); GLASS.use_nodes = True
gp = GLASS.node_tree.nodes['Principled BSDF']
gp.inputs['Base Color'].default_value = (*srgb('e9a3b9'), 1)
gp.inputs['Roughness'].default_value = 0.05
gp.inputs['Transmission Weight'].default_value = 0.85
BOT = labeled('bottle', 'label_bottle.png', 0.2)


def tube(loc=(0, 0, 0), rot=(0, 0, 0), s=1.0):
    bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=0.18, depth=0.9, location=(0, 0, 0))
    b = bpy.context.object
    b.data.materials.append(TUBE)
    # extremo superior aplastado (sellado del tubo)
    for v in b.data.vertices:
        if v.co.z > 0.4:
            v.co.y *= 0.06; v.co.x *= 1.22; v.co.z += 0.05
    bev = b.modifiers.new('bv', 'BEVEL'); bev.width = 0.012; bev.segments = 3; bev.limit_method = 'ANGLE'
    bpy.ops.object.shade_smooth()
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=0.125, depth=0.16, location=(0, 0, -0.53))
    c = bpy.context.object; c.data.materials.append(CAP); bpy.ops.object.shade_smooth()
    c.parent = b
    b.location, b.rotation_euler, b.scale = loc, rot, (s, s, s)
    return b


def jar(loc=(0, 0, 0), rot=(0, 0, 0), s=1.0):
    bpy.ops.mesh.primitive_cylinder_add(vertices=96, radius=0.35, depth=0.3, location=(0, 0, 0))
    b = bpy.context.object; b.data.materials.append(JAR)
    bv = b.modifiers.new('bv', 'BEVEL'); bv.width = 0.02; bv.segments = 4
    bpy.ops.object.shade_smooth()
    bpy.ops.mesh.primitive_cylinder_add(vertices=96, radius=0.36, depth=0.12, location=(0, 0, 0.21))
    c = bpy.context.object; c.data.materials.append(GOLD)
    bv = c.modifiers.new('bv', 'BEVEL'); bv.width = 0.02; bv.segments = 4
    bpy.ops.object.shade_smooth(); c.parent = b
    b.location, b.rotation_euler, b.scale = loc, rot, (s, s, s)
    return b


def bottle(loc=(0, 0, 0), rot=(0, 0, 0), s=1.0):
    bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=0.16, depth=0.5, location=(0, 0, 0))
    b = bpy.context.object; b.data.materials.append(BOT)
    bv = b.modifiers.new('bv', 'BEVEL'); bv.width = 0.03; bv.segments = 5
    bpy.ops.object.shade_smooth()
    bpy.ops.mesh.primitive_cylinder_add(vertices=48, radius=0.07, depth=0.1, location=(0, 0, 0.3))
    c = bpy.context.object; c.data.materials.append(GOLD); bpy.ops.object.shade_smooth(); c.parent = b
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.065, location=(0, 0, 0.4))
    u = bpy.context.object; u.scale = (1, 1, 1.5); u.data.materials.append(BULB); bpy.ops.object.shade_smooth(); u.parent = b
    b.location, b.rotation_euler, b.scale = loc, rot, (s, s, s)
    return b


def key(obj, frame, **kw):
    for k, v in kw.items():
        setattr(obj, k, v)
        obj.keyframe_insert(k, frame=frame)


def smooth_all():
    for a in bpy.data.actions:
        for fc in getattr(a, 'fcurves', []):
            for kp in fc.keyframe_points:
                kp.interpolation = 'BEZIER'
                kp.easing = 'AUTO'


def area(loc, rot, energy, size, color='ffffff'):
    bpy.ops.object.light_add(type='AREA', location=loc)
    L = bpy.context.object
    L.rotation_euler = rot; L.data.energy = energy; L.data.size = size
    L.data.color = srgb(color)
    return L


def camera(loc, target, lens=50):
    bpy.ops.object.camera_add(location=loc)
    cam = bpy.context.object; cam.data.lens = lens; S.camera = cam
    t = bpy.data.objects.new('target', None); S.collection.objects.link(t); t.location = target
    tr = cam.constraints.new('TRACK_TO'); tr.target = t
    return cam, t


W = bpy.data.worlds.new('w'); S.world = W; W.use_nodes = True
bg = W.node_tree.nodes['Background']

if shot == 'A':
    # Tubos flotando y girando, el principal al centro. Fondo crema plano.
    bg.inputs[0].default_value = (*srgb('f5e3da'), 1); bg.inputs[1].default_value = 1.9
    hero = tube((0, 0, 0), (math.radians(-8), math.radians(14), 0), 1.35)
    key(hero, 1, rotation_euler=Euler((math.radians(-8), math.radians(14), math.radians(-25))))
    key(hero, 96, rotation_euler=Euler((math.radians(4), math.radians(-6), math.radians(35))))
    key(hero, 1, location=Vector((0, 0, -0.05))); key(hero, 96, location=Vector((0, 0, 0.08)))
    for i in range(14):
        ang = i / 14 * 2 * math.pi + random.uniform(-0.2, 0.2)
        r = random.uniform(0.9, 1.9)
        x, z = math.cos(ang) * r * 0.75, math.sin(ang) * r * 1.25
        y = random.uniform(0.4, 2.2)
        rot0 = Euler([random.uniform(0, 6.28) for _ in range(3)])
        t = tube((x, y, z), rot0, random.uniform(0.75, 0.95))
        spin = Euler([rot0[k] + random.uniform(-1.2, 1.2) for k in range(3)])
        key(t, 1, rotation_euler=rot0); key(t, 96, rotation_euler=spin)
        key(t, 1, location=Vector((x, y, z))); key(t, 96, location=Vector((x * 1.06, y, z + random.uniform(-0.15, 0.25))))
    area((-2.5, -3, 3), (math.radians(55), 0, math.radians(-40)), 700, 5)
    area((3, -2, 1), (math.radians(80), 0, math.radians(55)), 260, 4, 'ffe6ee')
    area((0, 3, 2), (math.radians(-60), 0, 0), 300, 4)
    cam, tg = camera((0, -6.2, 0.2), (0, 0, 0.05), 55)
    key(cam, 1, location=Vector((0.25, -6.4, 0.25))); key(cam, 96, location=Vector((-0.15, -5.1, 0.05)))

elif shot == 'B':
    # Anillo de tubos visto desde arriba, girando (como la referencia).
    bg.inputs[0].default_value = (*srgb('f5e3da'), 1); bg.inputs[1].default_value = 1.9
    ring = bpy.data.objects.new('ring', None); S.collection.objects.link(ring)
    n = 16
    for i in range(n):
        a = i / n * 2 * math.pi
        t = tube((math.cos(a) * 1.45, math.sin(a) * 1.45, 0), (math.radians(90), 0, a + math.radians(90)), 0.95)
        t.parent = ring
    key(ring, 1, rotation_euler=Euler((0, 0, 0))); key(ring, 96, rotation_euler=Euler((0, 0, math.radians(-110))))
    key(ring, 1, scale=Vector((0.82, 0.82, 0.82))); key(ring, 96, scale=Vector((1.0, 1.0, 1.0)))
    j = jar((0, 0, 0), (math.radians(90), 0, 0), 1.05)
    key(j, 1, rotation_euler=Euler((math.radians(70), 0, math.radians(-20)))); key(j, 96, rotation_euler=Euler((math.radians(78), 0, math.radians(25))))
    area((-2, -2, 6), (math.radians(20), 0, math.radians(-40)), 900, 6)
    area((3, 2, 4), (math.radians(-30), math.radians(30), 0), 300, 4, 'ffe6ee')
    cam, tg = camera((0, -0.4, 8.5), (0, 0, 0), 50)
    key(cam, 1, location=Vector((0, -0.6, 8.8))); key(cam, 96, location=Vector((0, -0.2, 7.6)))

else:
    # Podio con escalones y arco: tubo de pie, tubo acostado, frasco y gotero.
    bg.inputs[0].default_value = (*srgb('f5e3da'), 1); bg.inputs[1].default_value = 1.3
    bpy.ops.mesh.primitive_plane_add(size=60, location=(0, 0, 0)); bpy.context.object.data.materials.append(STONE)
    def box(loc, sc):
        bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o = bpy.context.object; o.scale = sc
        bv = o.modifiers.new('bv', 'BEVEL'); bv.width = 0.015; bv.segments = 3
        o.data.materials.append(STONE); return o
    box((0, 0.2, 0.35), (2.6, 1.6, 0.7))       # bloque principal
    box((1.55, -0.2, 0.18), (0.8, 1.2, 0.36))  # escalón
    box((-1.6, -0.1, 0.12), (1.0, 1.4, 0.24))  # escalón bajo
    # arco
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0.1, 1.0, 1.85)); arc = bpy.context.object
    arc.scale = (1.9, 0.35, 2.3); arc.data.materials.append(STONE)
    bpy.ops.mesh.primitive_cylinder_add(vertices=96, radius=0.62, depth=1.2, location=(0.1, 1.0, 2.05), rotation=(math.radians(90), 0, 0)); h1 = bpy.context.object
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0.1, 1.0, 1.35)); h2 = bpy.context.object; h2.scale = (1.24, 1.2, 1.4)
    for h in (h1, h2):
        md = arc.modifiers.new('b', 'BOOLEAN'); md.object = h; md.operation = 'DIFFERENCE'; h.hide_render = True; h.hide_viewport = True
    bv = arc.modifiers.new('bv', 'BEVEL'); bv.width = 0.015; bv.segments = 3
    t1 = tube((0.1, 0.35, 1.2), (0, 0, math.radians(-15)), 1.1)
    t2 = tube((1.45, -0.45, 0.54), (math.radians(90), 0, math.radians(70)), 1.0)
    jar((-0.85, -0.35, 0.86), (0, 0, math.radians(-20)), 0.9)
    bottle((-1.6, -0.35, 0.5), (0, 0, math.radians(-15)), 1.0)
    # tubo flotando dentro del arco, girando
    tf = tube((0.1, 1.0, 2.45), (math.radians(180), 0, 0), 0.75)
    key(tf, 1, rotation_euler=Euler((math.radians(180), math.radians(8), math.radians(-30))))
    key(tf, 96, rotation_euler=Euler((math.radians(180), math.radians(-8), math.radians(60))))
    key(tf, 1, location=Vector((0.1, 1.0, 2.4))); key(tf, 96, location=Vector((0.1, 1.0, 2.55)))
    area((-3, -3, 5), (math.radians(45), 0, math.radians(-40)), 1100, 5)
    area((4, -1, 2.5), (math.radians(75), 0, math.radians(70)), 350, 4, 'ffe0ea')
    area((0.1, 3.5, 2.5), (math.radians(-80), 0, 0), 250, 2.5, 'ff9cbc')
    cam, tg = camera((0.8, -8.0, 1.7), (0, 0.3, 1.25), 40)
    key(cam, 1, location=Vector((1.6, -8.2, 1.8))); key(cam, 96, location=Vector((-0.6, -7.6, 1.5)))

smooth_all()
S.render.engine = 'CYCLES'
S.cycles.samples = 16
S.cycles.adaptive_threshold = 0.04
S.cycles.use_denoising = True
S.cycles.max_bounces = 6
S.cycles.transmission_bounces = 6
S.render.use_persistent_data = True
S.view_settings.view_transform = 'AgX'
S.view_settings.look = 'AgX - Base Contrast'
S.render.resolution_x, S.render.resolution_y = 540, 960
S.render.image_settings.file_format = 'PNG'
os.makedirs(D + 'frames_' + shot, exist_ok=True)
for f in range(f0, f1 + 1):
    S.frame_set(f)
    S.render.filepath = D + 'frames_%s/%03d.png' % (shot, f)
    if len(sys.argv) > 4 or not os.path.exists(S.render.filepath):
        bpy.ops.render.render(write_still=True)
        print('FRAME', shot, f, flush=True)
