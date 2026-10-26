(function () {
var $ = TT.$, EO = TT.EO;
window.TOTAL = 18.0;
var P3 = window.__P3, scene = P3.scene, cam = P3.cam, r = P3.r;
var HF = 2 * Math.atan(Math.tan(THREE.MathUtils.degToRad(15)) * (1080 / 1920));
function fitDist(rad) { return rad / Math.sin(HF / 2); }
var sw = document.querySelectorAll('#swatches .sw'), cur = -1;
function paint(i) { if (i !== cur) { cur = i; sw[i].click(); } }
function orbit(tg, d, yaw, pitch) { cam.position.set(tg.x + Math.sin(yaw) * Math.cos(pitch) * d, tg.y + Math.sin(pitch) * d, tg.z + Math.cos(yaw) * Math.cos(pitch) * d); cam.lookAt(tg); }
var NAMES = ['Bronce', 'Negro mate', 'Azul', 'Rojo', 'Blanco perla'];
var CH = [[0, 0], [2.6, 1], [4.2, 2], [5.8, 3], [7.4, 4], [9.0, 0]];

TT.cap(0.05, 2.6, 230, [['Pinté mi Gixxer 150<br>en 5 colores 🎨', 74, '', 0], ['sin gastar un peso', 50, 'pk', 0.55]]);
TT.cap(9.0, 11.6, 230, [['Todo en 3D,<br>desde el celular 📱', 72, '', 0]]);
TT.cap(11.6, 14.4, 230, [['¿Tienes taller o<br>almacén de repuestos?', 66, '', 0], ['Muéstralos así 👇', 54, 'pk', 0.8]]);

window.setT = function (t, frame) {
  var ci = 0; CH.forEach(function (c) { if (t >= c[0]) ci = c[1]; });
  paint(ci);
  var isCta = t >= 14.4;
  TT.bokeh(t, 1);
  P3.moto.visible = true; P3.casa.visible = false; P3.shadow.visible = true; scene.fog = null;
  P3.moto.rotation.y = 0;
  P3.shadow.scale.set(2.6, 1.3, 1); P3.shadow.position.y = .002;
  var zoom = isCta ? 0 : -.35 * EO(t / 6);
  orbit(new THREE.Vector3(0, .62, 0), fitDist(1.12) + .55 + zoom, -1.15 + t * .42, .14);
  r.render(scene, cam);
  var gl = $('#gl2'); gl.style.opacity = isCta ? .35 : 1; gl.style.filter = isCta ? 'blur(14px)' : 'none'; gl.style.transform = 'translateY(' + (isCta ? 0 : 80) + 'px)';
  TT.drawCaps(t);
  TT.hideChip(); TT.setChip(t, 2.6, 9.0, NAMES[ci]);
  TT.cta(t, 14.4);
  if (t < 14.4) $('#sCta').style.opacity = 0;
  $('#flash').style.opacity = TT.flash(t, [2.6, 4.2, 5.8, 7.4], .25) + TT.flash(t, [14.4], .6);
  TT.grain(frame);
  return true;
};
window.ready = true;
})();
