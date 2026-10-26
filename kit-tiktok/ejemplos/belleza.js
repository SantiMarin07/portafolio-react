(function () {
var $ = TT.$, EO = TT.EO;
window.TOTAL = 18.0;
var P3 = window.__P3, scene = P3.scene, cam = P3.cam, r = P3.r;
function orbit(tg, d, yaw, pitch) { cam.position.set(tg.x + Math.sin(yaw) * Math.cos(pitch) * d, tg.y + Math.sin(pitch) * d, tg.z + Math.cos(yaw) * Math.cos(pitch) * d); cam.lookAt(tg); }
var beauty = new THREE.Group(); scene.add(beauty);
var BH = {};
['labial', 'perfume', 'crema', 'sombras'].forEach(function (id) {
  var p = P.filter(function (q) { return q.id === id; })[0], g = p.build();
  var box = new THREE.Box3().setFromObject(g), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
  var s = Math.min(2.6 / size.y, 2.2 / Math.max(size.x, size.z));
  g.scale.setScalar(s); g.position.set(-c.x * s, -box.min.y * s, -c.z * s);
  var h = new THREE.Group(); h.add(g); h.visible = false; beauty.add(h); BH[id] = h;
});
var SEQ = [[0, 3, 'labial'], [3, 6, 'labial'], [6, 9, 'perfume'], [9, 12, 'crema'], [12, 14.4, 'sombras'], [14.4, 18, 'perfume']];

TT.cap(0.05, 3.0, 230, [['¿Aún mandas 20 fotos<br>por WhatsApp? 😩', 66, '', 0]]);
TT.cap(3.0, 6.0, 230, [['Mejor muéstralo así 👇', 66, 'pk', 0]]);
TT.cap(6.0, 9.0, 230, [['Tu clienta gira<br>cada producto ✨', 70, '', 0]]);
TT.cap(9.0, 12.0, 230, [['y te pide directo<br>por WhatsApp 💬', 70, '', 0]]);
TT.cap(12.0, 14.4, 230, [['Para consultoras y<br>tiendas de belleza 💄', 66, '', 0]]);

window.setT = function (t, frame) {
  TT.bokeh(t, 1);
  P3.moto.visible = false; P3.casa.visible = false; P3.shadow.visible = true; scene.fog = null;
  Object.keys(BH).forEach(function (k) { BH[k].visible = false; });
  var cur = SEQ[0]; SEQ.forEach(function (s) { if (t >= s[0] && t < s[1]) cur = s; });
  var h = BH[cur[2]], lc = t - cur[0]; h.visible = true;
  h.rotation.y = .5 + lc * .9 + (1 - EO(lc / .55)) * 2.4;
  P3.shadow.scale.set(2.4, 2.4, 1); P3.shadow.position.y = .002;
  var isCta = t >= 14.4, hook = t < 3.0;
  orbit(new THREE.Vector3(0, 1.3, 0), 15.8 - 1.4 * EO(lc / 1.5), .15, .12);
  r.render(scene, cam);
  var gl = $('#gl2');
  gl.style.opacity = isCta ? .35 : (hook ? .65 : 1);
  gl.style.filter = isCta ? 'blur(14px)' : (hook ? 'blur(16px) grayscale(.8)' : 'none');
  gl.style.transform = 'translateY(' + (isCta ? 0 : 90) + 'px)';
  TT.drawCaps(t);
  TT.hideChip(); TT.setChip(t, 9.3, 12.0, 'Pedidos directo a WhatsApp');
  TT.cta(t, 14.4);
  if (t < 14.4) $('#sCta').style.opacity = 0;
  $('#flash').style.opacity = TT.flash(t, [3.0], .7) + TT.flash(t, [6.0, 9.0, 12.0], .2) + TT.flash(t, [14.4], .6);
  TT.grain(frame);
  return true;
};
window.ready = true;
})();
