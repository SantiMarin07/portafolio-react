// Motor común para videos TikTok (1080x1920). Requiere window.__P3 y el overlay de head.html.
var TT = (function () {
  var $ = function (s) { return document.querySelector(s); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var E = function (t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
  var EO = function (t) { t = clamp(t, 0, 1); return 1 - Math.pow(1 - t, 3); };
  var BACK = function (t) { t = clamp(t, 0, 1); var c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
  var seg = function (t, a, b) { return E((t - a) / (b - a)); };
  // Ocultar overlays del video original (menos el llamado final)
  ['#sHook', '#sLogo', '#sSeg', '#sChip'].forEach(function (s) { var e = $(s); if (e) e.style.display = 'none'; });
  var st = document.createElement('style');
  st.textContent = '#tt{position:absolute;inset:0;pointer-events:none}' +
    '.cap{position:absolute;left:70px;right:170px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:18px;opacity:0}' +
    '.cap .bx{display:inline-block;background:rgba(10,8,14,.78);color:#fff;font-family:MR,sans-serif;font-weight:800;line-height:1.16;padding:18px 30px 22px;border-radius:22px;box-shadow:0 12px 40px rgba(0,0,0,.35)}' +
    '.cap .bx.pk{background:#ff7aa8;color:#1a0b12}' +
    '.cap .bx.wt{background:#fff;color:#14101a}' +
    '#ttChip{position:absolute;left:0;right:100px;top:1330px;text-align:center;opacity:0}' +
    '#ttChip span{display:inline-flex;align-items:center;gap:14px;padding:18px 32px;border-radius:999px;background:rgba(18,16,26,.8);border:2px solid rgba(255,122,168,.7);font:800 40px MR,sans-serif;color:#fff}' +
    '#ttChip i{width:18px;height:18px;border-radius:50%;background:#ff7aa8;display:inline-block}';
  document.head.appendChild(st);
  var host = document.createElement('div'); host.id = 'tt'; $('#root').appendChild(host);
  var chip = document.createElement('div'); chip.id = 'ttChip'; chip.innerHTML = '<span><i></i><b></b></span>'; host.appendChild(chip);
  var caps = [];
  function cap(a, b, top, lines) { // lines: [[html, sizePx, cls]]
    var el = document.createElement('div'); el.className = 'cap'; el.style.top = top + 'px';
    el.innerHTML = lines.map(function (l) { return '<span class="bx ' + (l[2] || '') + '" style="font-size:' + l[1] + 'px">' + l[0] + '</span>'; }).join('');
    host.appendChild(el); caps.push({ a: a, b: b, el: el, n: el.children.length, d: lines.map(function (l) { return l[3] || 0; }) });
  }
  function drawCaps(t) {
    caps.forEach(function (c) {
      var on = t >= c.a && t < c.b; c.el.style.opacity = on ? 1 : 0; if (!on) return;
      for (var i = 0; i < c.n; i++) {
        var k = (t - c.a - c.d[i]) / 0.28, ch = c.el.children[i];
        ch.style.transform = 'scale(' + (k <= 0 ? 0 : BACK(k)) + ')'; ch.style.opacity = k <= 0 ? 0 : 1;
      }
      var out = c.b - t; if (out < 0.12) c.el.style.opacity = out / 0.12;
    });
  }
  function setChip(t, a, b, text) {
    if (t >= a && t < b) { chip.querySelector('b').textContent = text; var k = EO((t - a) / .3); chip.style.opacity = Math.min(1, k, (b - t) / .15); chip.style.transform = 'translateY(' + (1 - k) * 30 + 'px)'; }
  }
  function hideChip() { chip.style.opacity = 0; }
  // Fondo bokeh y grano
  var bk = $('#bokeh').getContext('2d');
  function rnd(i, k) { var x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); }
  var BK = []; for (var i = 0; i < 34; i++) BK.push({ x: rnd(i, 1) * 1080, y: rnd(i, 2) * 1920, r: 14 + rnd(i, 3) * 80, v: 12 + rnd(i, 4) * 40, a: .05 + rnd(i, 5) * .14, g: rnd(i, 6) > .6, p: rnd(i, 7) * 6 });
  function bokeh(t, alpha) {
    bk.clearRect(0, 0, 1080, 1920); if (!alpha) return; bk.globalAlpha = alpha;
    BK.forEach(function (b) {
      var y = ((b.y - b.v * t) % 2100 + 2100) % 2100 - 90, x = b.x + Math.sin(t * .5 + b.p) * 30;
      var g = bk.createRadialGradient(x, y, 0, x, y, b.r), c = b.g ? '230,194,138' : '255,122,168';
      g.addColorStop(0, 'rgba(' + c + ',' + b.a + ')'); g.addColorStop(1, 'rgba(' + c + ',0)');
      bk.fillStyle = g; bk.beginPath(); bk.arc(x, y, b.r, 0, 7); bk.fill();
    });
    bk.globalAlpha = 1;
  }
  var gr = $('#grain').getContext('2d'), NZ = [];
  for (var n = 0; n < 6; n++) { var c = document.createElement('canvas'); c.width = 540; c.height = 960; var cx = c.getContext('2d'), im = cx.createImageData(540, 960);
    for (var q = 0; q < im.data.length; q += 4) { var v = (rnd(q + n * 7, n + 1) * 255) | 0; im.data[q] = im.data[q + 1] = im.data[q + 2] = v; im.data[q + 3] = 255; } cx.putImageData(im, 0, 0); NZ.push(c); }
  function grain(frame) { gr.drawImage(NZ[(frame || 0) % NZ.length], 0, 0); }
  // Llamado final (reutiliza #sCta)
  var ctaW = [].slice.call(document.querySelectorAll('#sCta .m>span'));
  function cta(t, a) {
    var sCt = $('#sCta'); sCt.style.opacity = seg(t, a - .02, a + .12);
    ctaW.forEach(function (w, i) { w.style.transform = 'translateY(' + ((1 - EO((t - a - .2 - i * .18) / .45)) * 112) + '%)'; });
    var sub = $('#ctaSub'); var k = seg(t, a + .7, a + 1.05); sub.style.opacity = k; sub.style.transform = 'translateY(' + (1 - k) * 18 + 'px)';
    var pill = $('#pill'), pp = (t - a - .95) / .45, pulse = t > a + 1.6 ? 1 + .035 * Math.pow(Math.sin((t - a - 1.6) * Math.PI), 2) : 1;
    pill.style.transform = 'scale(' + ((pp <= 0 ? 0 : BACK(pp)) * pulse) + ')'; pill.style.opacity = clamp(pp * 3, 0, 1);
    $('#ctaTk').style.opacity = seg(t, a + 1.3, a + 1.7);
  }
  function flash(t, times, amt) { var f = 0; times.forEach(function (c) { var d = t - c; if (d >= 0 && d < .3) f = Math.max(f, amt * (1 - d / .3)); }); return f; }
  return { $: $, E: E, EO: EO, seg: seg, cap: cap, drawCaps: drawCaps, setChip: setChip, hideChip: hideChip, bokeh: bokeh, grain: grain, cta: cta, flash: flash };
})();
