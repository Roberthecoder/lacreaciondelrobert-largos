// cine-luz.jsx — kit "cine de luz" para documentales 100 % ilustrados (Fable 5.2, nov 2026).
// Sube de nivel al kit de cine: cada escena es un LIENZO (canvas 1920×1080) dibujado en función del tiempo,
// con luz aditiva de verdad (halos que se suman), redes de hifas que crecen, enjambres de bacterias, destellos
// y cámara lenta. Todo es determinista: el mismo tl da siempre el mismo cuadro (sirve para render por "seek").
// Uso en escenas.js:  v: { tipo: 'lienzo', id: 'nombre' }   →   window.LUZ.nombre = (ctx, e) => { ... }
// e = { tl, dur, p, T, L(i) }  ·  L(i) = segundo (dentro de la escena) en que empieza la frase i de ese bloque.

const TAU = Math.PI * 2;
const cl = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
const pr = (t, a, b) => cl((t - a) / (b - a));
const ss = (t, a, b) => { const x = pr(t, a, b); return x * x * (3 - 2 * x); };
const eo = (t, a, b) => 1 - Math.pow(1 - pr(t, a, b), 3);
const mixn = (a, b, t) => a + (b - a) * t;
const rng = (a) => () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const hex2 = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const rgba = (h, a = 1) => { const [r, g, b] = hex2(h); return `rgba(${r},${g},${b},${a})`; };
const mixc = (a, b, t) => { const A = hex2(a), B = hex2(b); return `rgb(${Math.round(mixn(A[0], B[0], t))},${Math.round(mixn(A[1], B[1], t))},${Math.round(mixn(A[2], B[2], t))})`; };

// Color de la luz de cada organismo (aproximación en pantalla del pico de emisión; fuentes en notas_visuales.md).
const LUZC = { dino: '#00A6FF', bact: '#00E5E0', pan: '#3DFF4A', myc: '#5CFF3A', pet: '#4BFF45', luc: '#B8FF1F', calor: '#FFB05A', oro: '#F4C25A', rojo: '#FF5A4A', blanco: '#F6F3EC' };
const FU = { serif: "'Fraunces', Georgia, serif", sans: "'Archivo', Arial, sans-serif", mono: "'Space Mono', ui-monospace, monospace", mano: "'Caveat', cursive" };

/* ---------- luz ---------- */
const _spr = {};
function sprite(color) {
  if (_spr[color]) return _spr[color];
  const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d');
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.07, rgba(color, 0.9)); g.addColorStop(0.28, rgba(color, 0.26));
  g.addColorStop(0.6, rgba(color, 0.06)); g.addColorStop(1, rgba(color, 0));
  x.fillStyle = g; x.fillRect(0, 0, 256, 256); return (_spr[color] = c);
}
// Halo aditivo: la luz se suma, como en una foto de larga exposición.
function halo(ctx, x, y, r, color, a = 1) {
  if (a <= 0.004 || r <= 0) return;
  const o = ctx.globalCompositeOperation, ga = ctx.globalAlpha;
  ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = ga * cl(a); ctx.drawImage(sprite(color), x - r, y - r, r * 2, r * 2);
  ctx.globalCompositeOperation = o; ctx.globalAlpha = ga;
}
function luzOn(ctx) { ctx.globalCompositeOperation = 'lighter'; }
function luzOff(ctx) { ctx.globalCompositeOperation = 'source-over'; }

/* ---------- fondos y cámara ---------- */
function noche(ctx, c0 = '#05070c', c1 = '#0a0f1c') { const g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, c0); g.addColorStop(1, c1); ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080); }
function estrellas(ctx, n, seed, T, a = 1, y1 = 700) { const r = rng(seed); for (let i = 0; i < n; i++) { const x = r() * 1920, y = r() * y1, s = 0.6 + r() * 1.6, tw = 0.6 + 0.4 * Math.sin(T * (0.6 + r()) + r() * 9); ctx.fillStyle = `rgba(220,230,255,${a * tw * (0.3 + r() * 0.6)})`; ctx.fillRect(x, y, s, s); } }
function polvo(ctx, n, seed, T, color = '#9fb4d8', a = 0.5) { const r = rng(seed); for (let i = 0; i < n; i++) { const x = (r() * 1920 + T * (4 + r() * 10)) % 1920, y = (r() * 1080 + Math.sin(T * 0.3 + i) * 20 + 1080) % 1080; halo(ctx, x, y, 3 + r() * 9, color, a * (0.15 + 0.35 * r())); } }
// Cámara: z = acercamiento, (cx, cy) = punto del mundo que queda al centro. Regresa una función para deshacerla.
function cam(ctx, z, cx = 960, cy = 540) { ctx.save(); ctx.translate(960, 540); ctx.scale(z, z); ctx.translate(-cx, -cy); return () => ctx.restore(); }
function oscurece(ctx, a) { if (a <= 0) return; ctx.fillStyle = `rgba(3,4,8,${cl(a)})`; ctx.fillRect(0, 0, 1920, 1080); }

/* ---------- texto ---------- */
function fuente(o) { return `${o.it ? 'italic ' : ''}${o.w || 500} ${o.s || 40}px ${FU[o.f || 'sans']}`; }
function txt(ctx, s, x, y, o = {}) {
  if ((o.a ?? 1) <= 0.004) return 0;
  ctx.save(); ctx.globalAlpha *= cl(o.a ?? 1); ctx.font = fuente(o); ctx.textAlign = o.al || 'left'; ctx.textBaseline = o.bl || 'alphabetic';
  try { ctx.letterSpacing = (o.ls || 0) + 'px'; } catch (e) {}
  if (o.sombra !== false) { ctx.shadowColor = 'rgba(0,0,0,.75)'; ctx.shadowBlur = o.sb ?? 14; ctx.shadowOffsetY = 2; }
  ctx.fillStyle = o.c || LUZC.blanco; ctx.fillText(s, x, y); const w = ctx.measureText(s).width; ctx.restore(); return w;
}
// Texto con *cursivas* para nombres científicos (se pasan a serif itálica).
function rico(ctx, s, x, y, o = {}) {
  const partes = s.split('*'); ctx.save(); let w = 0;
  const med = partes.map((p, i) => { const oo = i % 2 ? { ...o, f: 'serif', it: true, w: 500 } : o; ctx.font = fuente(oo); try { ctx.letterSpacing = (oo.ls || 0) + 'px'; } catch (e) {} const m = ctx.measureText(p).width; w += m; return m; });
  ctx.restore();
  let cx = o.al === 'center' ? x - w / 2 : o.al === 'right' ? x - w : x;
  partes.forEach((p, i) => { txt(ctx, p, cx, y, { ...(i % 2 ? { ...o, f: 'serif', it: true, w: 500 } : o), al: 'left' }); cx += med[i]; });
  return w;
}
// Etiqueta tipo ficha: borde fino del color de la luz, letra mono con espacio.
function chip(ctx, s, x, y, o = {}) {
  const a = cl(o.a ?? 1); if (a <= 0.004) return;
  const sz = o.s || 22, c = o.c || LUZC.oro; ctx.save(); ctx.font = `700 ${sz}px ${FU.mono}`; try { ctx.letterSpacing = '3px'; } catch (e) {}
  const w = ctx.measureText(s).width + sz * 1.5, h = sz * 1.9; const x0 = o.al === 'center' ? x - w / 2 : o.al === 'right' ? x - w : x;
  ctx.globalAlpha *= a; ctx.fillStyle = 'rgba(6,8,14,.72)'; ctx.strokeStyle = rgba(c, 0.9); ctx.lineWidth = 1.6;
  ctx.beginPath(); ctx.roundRect(x0, y - h / 2, w, h, h / 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = c; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillText(s, x0 + sz * 0.75, y + 1); ctx.restore();
}
// Rótulo de documental: línea fina que se dibuja + nombre (con cursivas) + renglón chico.
function rotulo(ctx, x, y, titulo, sub, a = 1, o = {}) {
  a = cl(a); if (a <= 0.004) return; const c = o.c || LUZC.oro, al = o.al || 'left', d = al === 'right' ? -1 : 1;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 44); ctx.lineTo(x, y - 44 + 78 * a); ctx.stroke(); ctx.restore();
  rico(ctx, titulo, x + 20 * d, y - 8 + (1 - a) * 8, { s: o.s || 46, f: 'serif', w: 500, a, al });
  if (sub) rico(ctx, sub, x + 20 * d, y + 30 + (1 - a) * 8, { s: 24, f: 'mono', w: 700, ls: 2, c, a: a * 0.95, al });
}
// Línea guía de un punto a su etiqueta.
function guia(ctx, x0, y0, x1, y1, a = 1, c = '#ffffff') { a = cl(a); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a * 0.7; ctx.strokeStyle = c; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(mixn(x0, x1, a), mixn(y0, y1, a)); ctx.stroke(); ctx.beginPath(); ctx.arc(x0, y0, 3.5, 0, TAU); ctx.fillStyle = c; ctx.fill(); ctx.restore(); }
function titulo(ctx, s, x, y, a = 1, o = {}) { return rico(ctx, s, x, y + (1 - cl(a)) * 14, { s: 84, f: 'serif', w: 500, a, al: 'center', ...o }); }
function sello(ctx, s, x, y, a = 1, c = LUZC.rojo, rot = -0.08, sz = 54) {
  a = cl(a); if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const k = 1 + (1 - eo(a, 0, 1)) * 0.5; ctx.scale(k, k); ctx.globalAlpha *= a;
  ctx.font = `700 ${sz}px ${FU.mono}`; try { ctx.letterSpacing = '6px'; } catch (e) {} const w = ctx.measureText(s).width + sz * 1.2, h = sz * 1.8;
  ctx.fillStyle = 'rgba(8,6,6,.6)'; ctx.strokeStyle = c; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 10); ctx.fill(); ctx.stroke();
  ctx.fillStyle = c; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(s, 3, 2); ctx.restore();
}
function tache(ctx, x, y, r, a = 1, c = LUZC.rojo) { a = cl(a); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = c; ctx.lineWidth = r * 0.14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU * a); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x - r * 0.7, y - r * 0.7); ctx.lineTo(x - r * 0.7 + r * 1.4 * a, y - r * 0.7 + r * 1.4 * a); ctx.stroke(); ctx.restore(); }
function flecha(ctx, x0, y0, x1, y1, a = 1, c = '#fff', w = 3) { a = cl(a); if (a <= 0) return; const x = mixn(x0, x1, a), y = mixn(y0, y1, a), an = Math.atan2(y1 - y0, x1 - x0); ctx.save(); ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.globalAlpha *= Math.min(1, a * 3); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x, y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 16 * Math.cos(an - 0.45), y - 16 * Math.sin(an - 0.45)); ctx.lineTo(x - 16 * Math.cos(an + 0.45), y - 16 * Math.sin(an + 0.45)); ctx.closePath(); ctx.fill(); ctx.restore(); }

/* ---------- red de hifas (micelio que crece) ---------- */
// Genera una red ramificada desde (0,0). acepta(x,y) limita la forma. Cada segmento nace en b (0..1).
const _red = {};
function red(clave, o = {}) {
  if (_red[clave]) return _red[clave];
  const R = rng(o.seed || 7), paso = o.paso || 6, segs = [], celda = new Map(), C = o.celda || 8;
  const K = (x, y) => ((Math.floor(x / C) + 2048) << 12) | (Math.floor(y / C) + 2048);
  let tips = [], id = 0; const n0 = o.brotes || 7, a0 = o.ang0 ?? 0, abre = o.abre ?? TAU;
  for (let i = 0; i < n0; i++) tips.push({ x: 0, y: 0, a: a0 + (i / n0 - 0.5) * abre + R() * 0.4, d: 0, id: id++, t: 0 });
  const acepta = o.acepta || ((x, y) => Math.hypot(x, y) < (o.radio || 400));
  let maxT = 1;
  while (tips.length && segs.length < (o.max || 9000)) {
    const nt = [];
    for (const tp of tips) {
      if (o.sesgo != null) { let df = o.sesgo - tp.a; df = Math.atan2(Math.sin(df), Math.cos(df)); tp.a += df * 0.03; }
      else if (tp.x || tp.y) { let df = Math.atan2(tp.y, tp.x) - tp.a; df = Math.atan2(Math.sin(df), Math.cos(df)); tp.a += df * 0.035; }
      tp.a += (R() + R() + R() - 1.5) * 0.42;
      const nx = tp.x + Math.cos(tp.a) * paso, ny = tp.y + Math.sin(tp.a) * paso;
      if (!acepta(nx, ny)) continue;
      const k = K(nx, ny), oc = celda.get(k), choca = Math.hypot(nx, ny) > 22 && oc && oc.id !== tp.id && tp.t - oc.t > 5;
      segs.push([tp.x, tp.y, nx, ny, tp.t, Math.min(tp.d, 4)]); if (tp.t > maxT) maxT = tp.t;
      if (choca) continue; if (!oc) celda.set(k, { id: tp.id, t: tp.t });
      tp.x = nx; tp.y = ny; tp.t += 0.85 + 0.3 * R(); nt.push(tp);
      if (R() < (o.rama || 0.075)) { const s = R() < 0.5 ? -1 : 1; nt.push({ x: nx, y: ny, a: tp.a + s * (0.45 + R() * 0.6), d: tp.d + 1, id: id++, t: tp.t }); }
    }
    tips = nt;
  }
  segs.forEach((s) => (s[4] /= maxT)); segs.sort((a, b) => a[4] - b[4]);
  return (_red[clave] = segs);
}
// Dibuja la red hasta el avance g (0..1). brillo: luz aditiva. puntas: destello en lo recién crecido.
function pintaRed(ctx, segs, g, color, o = {}) {
  const A = o.a ?? 1; if (A <= 0.004 || g <= 0) return; const esc = o.esc || 1, W = [2.6, 1.8, 1.25, 0.9, 0.65];
  let n = 0, lo = 0, hi = segs.length; while (lo < hi) { const m = (lo + hi) >> 1; if (segs[m][4] <= g) lo = m + 1; else hi = m; } n = lo;
  ctx.save(); ctx.lineCap = 'round'; ctx.globalCompositeOperation = 'lighter';
  for (let pasada = 0; pasada < 2; pasada++) for (let d = 0; d < 5; d++) {
    ctx.beginPath(); for (let i = 0; i < n; i++) { const s = segs[i]; if (s[5] !== d) continue; ctx.moveTo(s[0], s[1]); ctx.lineTo(s[2], s[3]); }
    if (pasada === 0) { ctx.lineWidth = W[d] * 6 * esc; ctx.strokeStyle = rgba(color, 0.045 * A); } else { ctx.lineWidth = W[d] * esc; ctx.strokeStyle = rgba(color, (0.45 + 0.4 * (1 - d / 4)) * A); }
    ctx.stroke();
  }
  if (o.puntas !== false && g < 1) { const g0 = g - 0.035; for (let i = n - 1; i >= 0 && segs[i][4] > g0; i--) { const s = segs[i]; halo(ctx, s[2], s[3], 9 * esc, color, 0.5 * A * (1 - (g - s[4]) / 0.035)); } }
  ctx.restore();
}

/* ---------- madera y hongos ---------- */
// Tronco acostado. luz 0 = noche (casi silueta), 1 = día.
function tronco(ctx, x, y, w, h, luz = 0, seed = 3) {
  const r = rng(seed), c0 = mixc('#0d0a08', '#6b4a2e', luz), c1 = mixc('#070605', '#3d2a1a', luz);
  const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, c0); g.addColorStop(1, c1);
  ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x, y, w, h, h * 0.42); ctx.fill();
  ctx.save(); ctx.clip(); ctx.strokeStyle = mixc('#040303', '#2a1a10', luz); ctx.lineWidth = 3; ctx.globalAlpha = 0.75;
  for (let i = 0; i < 46; i++) { const yy = y + r() * h, xx = x + r() * w, l = 60 + r() * 260; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.bezierCurveTo(xx + l * 0.3, yy + (r() - 0.5) * 16, xx + l * 0.7, yy + (r() - 0.5) * 16, xx + l, yy + (r() - 0.5) * 8); ctx.stroke(); }
  ctx.globalAlpha = 0.18 + 0.3 * luz; ctx.fillStyle = mixc('#1a2a1c', '#5d7a3a', luz); for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.ellipse(x + r() * w, y + r() * h * 0.3, 30 + r() * 70, 8 + r() * 12, 0, 0, TAU); ctx.fill(); }
  ctx.restore();
}
// Panellus stipticus: sombrerito en abanico/riñón (0.5–2 cm), pegado de lado a la madera, con pie corto lateral.
// brillo: sobre todo en los bordes de las láminas. luz: día (1) o noche (0).
function panellus(ctx, x, y, s, rot, brillo, luz, seed = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); const r = rng(seed);
  const cap = mixc('#15110c', '#c9a473', luz), lam = mixc('#100d09', '#e3c69a', luz);
  // sombrero visto un poco desde abajo: abanico con borde lobulado
  ctx.beginPath(); ctx.moveTo(0, 0); const N = 14;
  for (let i = 0; i <= N; i++) { const a = -Math.PI * 0.08 - (i / N) * Math.PI * 0.84, rr = 62 + 5 * Math.sin(i * 2.3 + seed) + r() * 3; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr * 0.72); }
  ctx.closePath(); ctx.fillStyle = lam; ctx.fill();
  // láminas: radian desde el pie
  ctx.lineWidth = 1.3; ctx.strokeStyle = mixc('#1c1711', '#a8834f', luz); ctx.beginPath();
  for (let i = 1; i < 26; i++) { const a = -Math.PI * 0.1 - (i / 26) * Math.PI * 0.8; ctx.moveTo(Math.cos(a) * 8, Math.sin(a) * 6); ctx.lineTo(Math.cos(a) * 60, Math.sin(a) * 43); } ctx.stroke();
  // orilla del sombrero (lo de arriba, que se asoma)
  ctx.beginPath(); for (let i = 0; i <= N; i++) { const a = -Math.PI * 0.08 - (i / N) * Math.PI * 0.84, rr = 64 + 5 * Math.sin(i * 2.3 + seed); i ? ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr * 0.72) : ctx.moveTo(Math.cos(a) * rr, Math.sin(a) * rr * 0.72); }
  ctx.lineWidth = 7; ctx.strokeStyle = cap; ctx.stroke();
  // pie corto lateral
  ctx.fillStyle = mixc('#120e0a', '#d8bd92', luz); ctx.beginPath(); ctx.ellipse(2, 4, 11, 8, 0, 0, TAU); ctx.fill();
  if (brillo > 0.004) {
    ctx.globalCompositeOperation = 'lighter'; ctx.lineWidth = 2.2; ctx.strokeStyle = rgba(LUZC.pan, 0.55 * brillo); ctx.beginPath();
    for (let i = 1; i < 26; i++) { const a = -Math.PI * 0.1 - (i / 26) * Math.PI * 0.8; ctx.moveTo(Math.cos(a) * 14, Math.sin(a) * 10); ctx.lineTo(Math.cos(a) * 60, Math.sin(a) * 43); } ctx.stroke();
    ctx.lineWidth = 9; ctx.strokeStyle = rgba(LUZC.pan, 0.1 * brillo); ctx.stroke();
    halo(ctx, 22, -22, 120, LUZC.pan, 0.42 * brillo);
  }
  ctx.restore();
}
// Seta de sombrero y pie (Mycena chlorophos: sombrero de 1–3 cm, pie fino).
function mycena(ctx, x, y, s, brillo, seed = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const inc = Math.sin(seed * 3) * 0.12; ctx.rotate(inc);
  ctx.strokeStyle = '#1b2a1c'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(6, -50, 0, -100); ctx.stroke();
  ctx.fillStyle = '#16221a'; ctx.beginPath(); ctx.moveTo(-46, -100); ctx.quadraticCurveTo(-40, -150, 0, -152); ctx.quadraticCurveTo(40, -150, 46, -100); ctx.quadraticCurveTo(0, -88, -46, -100); ctx.fill();
  if (brillo > 0.004) { ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rgba(LUZC.myc, 0.5 * brillo); ctx.fill();
    ctx.strokeStyle = rgba(LUZC.myc, 0.6 * brillo); ctx.lineWidth = 1.5; ctx.beginPath(); for (let i = -6; i <= 6; i++) { ctx.moveTo(i * 6.5, -100 + Math.abs(i) * 0.6); ctx.lineTo(i * 5, -128); } ctx.stroke();
    ctx.strokeStyle = rgba(LUZC.myc, 0.35 * brillo); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(6, -50, 0, -100); ctx.stroke();
    halo(ctx, 0, -120, 150, LUZC.myc, 0.5 * brillo); }
  ctx.restore();
}
// Hongo en embudo. tipo 'omph' (Omphalotus: láminas verdaderas, finas y apretadas) o 'chant' (chantarela: pliegues romos que se bifurcan).
function embudo(ctx, x, y, s, tipo, brillo = 0, luz = 1, seed = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(Math.sin(seed * 5) * 0.1);
  const base = tipo === 'omph' ? '#e2741c' : '#f0b62a', c = mixc('#1a0f06', base, luz), c2 = mixc('#120a04', tipo === 'omph' ? '#b9530f' : '#d99a1c', luz);
  ctx.fillStyle = c2; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.quadraticCurveTo(-22, -70, -78, -128); ctx.lineTo(78, -128); ctx.quadraticCurveTo(22, -70, 14, 0); ctx.closePath(); ctx.fill();
  ctx.save(); ctx.clip();
  if (tipo === 'omph') { ctx.strokeStyle = mixc('#0c0703', '#8a3d0a', luz); ctx.lineWidth = 1.5; ctx.beginPath(); for (let i = -22; i <= 22; i++) { ctx.moveTo(i * 3.5, -132); ctx.quadraticCurveTo(i * 1.4, -70, i * 0.5, -4); } ctx.stroke();
    if (brillo > 0.004) { ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = rgba(LUZC.pan, 0.5 * brillo); ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = rgba(LUZC.pan, 0.16 * brillo); ctx.fillRect(-90, -140, 180, 150); } }
  else { ctx.strokeStyle = mixc('#0c0703', '#b07a10', luz); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = -4; i <= 4; i++) { ctx.moveTo(i * 3, -10); ctx.quadraticCurveTo(i * 6, -60, i * 13, -100); ctx.moveTo(i * 13, -100); ctx.lineTo(i * 13 - 6, -130); ctx.moveTo(i * 13, -100); ctx.lineTo(i * 13 + 6, -130); } ctx.stroke(); }
  ctx.restore();
  ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(0, -130, 84, 17, 0, 0, TAU); ctx.fill(); ctx.fillStyle = c2; ctx.beginPath(); ctx.ellipse(0, -127, 46, 8, 0, 0, TAU); ctx.fill();
  if (brillo > 0.004 && tipo === 'omph') halo(ctx, 0, -70, 170, LUZC.pan, 0.32 * brillo);
  ctx.restore();
}

/* ---------- vidrio ---------- */
function petri(ctx, x, y, r, a = 1) {
  ctx.save(); ctx.globalAlpha *= a; const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r); g.addColorStop(0, 'rgba(150,180,210,.07)'); g.addColorStop(1, 'rgba(60,80,110,.03)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  ctx.strokeStyle = 'rgba(200,220,245,.38)'; ctx.lineWidth = 3; ctx.stroke(); ctx.strokeStyle = 'rgba(200,220,245,.16)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r * 0.955, 0, TAU); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r * 0.978, Math.PI * 1.08, Math.PI * 1.32); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.2)'; ctx.beginPath(); ctx.arc(x, y, r * 0.978, Math.PI * 0.1, Math.PI * 0.2); ctx.stroke(); ctx.restore();
}
function frasco(ctx, x, y, w, h, a = 1, tapa = true) {
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = 'rgba(120,150,190,.05)'; ctx.strokeStyle = 'rgba(200,220,245,.36)'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x - w / 2, y - h, w, h, [w * 0.16, w * 0.16, w * 0.1, w * 0.1]); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - w * 0.38, y - h * 0.82); ctx.lineTo(x - w * 0.38, y - h * 0.3); ctx.stroke();
  if (tapa) { ctx.fillStyle = '#2a2d36'; ctx.beginPath(); ctx.roundRect(x - w * 0.46, y - h - h * 0.09, w * 0.92, h * 0.1, 6); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.fillRect(x - w * 0.46, y - h - h * 0.09, w * 0.92, 4); }
  ctx.restore();
}
function matraz(ctx, x, y, s, nivel = 0.45, color = null, a = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a;
  const P = () => { ctx.beginPath(); ctx.moveTo(-26, -260); ctx.lineTo(-26, -170); ctx.lineTo(-120, -12); ctx.quadraticCurveTo(-126, 0, -110, 0); ctx.lineTo(110, 0); ctx.quadraticCurveTo(126, 0, 120, -12); ctx.lineTo(26, -170); ctx.lineTo(26, -260); };
  P(); ctx.save(); ctx.clip(); ctx.fillStyle = color || 'rgba(40,90,120,.25)'; ctx.fillRect(-140, -nivel * 200, 280, 220); ctx.restore();
  P(); ctx.strokeStyle = 'rgba(200,220,245,.42)'; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = 'rgba(120,150,190,.04)'; ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-36, -140); ctx.lineTo(-92, -40); ctx.stroke();
  ctx.strokeStyle = 'rgba(200,220,245,.5)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-32, -262); ctx.lineTo(32, -262); ctx.stroke(); ctx.restore();
}

/* ---------- seres ---------- */
function bacteria(ctx, x, y, len, an, luz, color = LUZC.bact) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(an); const w = len * 0.42;
  ctx.fillStyle = mixc('#26313f', '#bff7f4', cl(luz) * 0.85); ctx.beginPath(); ctx.roundRect(-len / 2, -w / 2, len, w, w / 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 1; ctx.stroke(); ctx.restore();
  if (luz > 0.01) halo(ctx, x, y, len * (1.2 + 1.6 * luz), color, 0.75 * luz);
}
// Calamar hawaiano Euprymna scolopes: pequeño, manto redondeado, dos aletas como orejitas, ojos grandes.
function calamar(ctx, x, y, s, luzVentral = 0, T = 0, tono = 0.5) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const na = Math.sin(T * 1.4) * 0.12;
  if (luzVentral > 0.01) halo(ctx, 0, 62, 260, LUZC.bact, 0.5 * luzVentral);
  const cu = mixc('#1a1420', '#7a5a4a', tono), cu2 = mixc('#120e16', '#4f372f', tono);
  // brazos cortos
  ctx.strokeStyle = cu2; ctx.lineCap = 'round'; for (let i = 0; i < 8; i++) { const k = (i - 3.5) / 3.5; ctx.lineWidth = 11 - Math.abs(k) * 3; ctx.beginPath(); ctx.moveTo(-104, k * 30); ctx.quadraticCurveTo(-160, k * 46 + Math.sin(T * 2 + i) * 6, -196 - (1 - Math.abs(k)) * 26, k * 60 + Math.sin(T * 1.7 + i * 2) * 9); ctx.stroke(); }
  // aletas
  ctx.fillStyle = cu2; for (const d of [-1, 1]) { ctx.save(); ctx.translate(40, d * 78); ctx.rotate(d * (0.5 + na)); ctx.beginPath(); ctx.ellipse(0, d * 22, 44, 30, 0, 0, TAU); ctx.fill(); ctx.restore(); }
  // manto y cabeza
  const g = ctx.createRadialGradient(10, -30, 10, 20, 0, 150); g.addColorStop(0, mixc(cu, '#ffffff', 0.12)); g.addColorStop(1, cu2); ctx.fillStyle = g;
  ctx.beginPath(); ctx.ellipse(30, 0, 112, 92, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(-84, 0, 52, 62, 0, 0, TAU); ctx.fill();
  // cromatóforos
  const r = rng(11); ctx.fillStyle = 'rgba(40,20,20,.45)'; for (let i = 0; i < 46; i++) { const a = r() * TAU, d = Math.sqrt(r()) * 96; ctx.beginPath(); ctx.arc(30 + Math.cos(a) * d * 1.1, Math.sin(a) * d * 0.9, 2 + r() * 4, 0, TAU); ctx.fill(); }
  // ojos
  for (const d of [-1, 1]) { ctx.fillStyle = '#e9e4d8'; ctx.beginPath(); ctx.ellipse(-92, d * 42, 19, 17, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#0a0a0c'; ctx.beginPath(); ctx.ellipse(-95, d * 42, 9, 12, 0, 0, TAU); ctx.fill(); }
  ctx.restore();
}
// Dinoflagelado Pyrocystis lunula: célula en media luna, pared transparente, cloroplastos dorados.
// dia 1: cloroplastos extendidos; dia 0 (noche): recogidos al centro. flash: destello azul.
function dino(ctx, x, y, s, rot, flash = 0, dia = 0, seed = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const P = () => { ctx.beginPath(); ctx.moveTo(-100, 0); ctx.quadraticCurveTo(0, -78, 100, 0); ctx.quadraticCurveTo(0, -22, -100, 0); };
  if (flash > 0.01) { halo(ctx, 0, -26, 220, LUZC.dino, 0.9 * flash); }
  P(); ctx.fillStyle = flash > 0.01 ? rgba(LUZC.dino, 0.12 + 0.5 * flash) : 'rgba(150,190,220,.07)'; ctx.fill(); ctx.strokeStyle = 'rgba(200,225,250,.5)'; ctx.lineWidth = 2; ctx.stroke();
  ctx.save(); P(); ctx.clip(); const r = rng(seed * 13 + 5);
  for (let i = 0; i < 46; i++) { const u = (r() - 0.5) * 2, v = r(); const ux = u * mixn(26, 82, dia), uy = -18 - (1 - u * u) * 26 * (0.3 + 0.7 * v) * mixn(0.7, 1, dia) + (1 - dia) * (-6);
    ctx.fillStyle = `rgba(${200 + r() * 40},${150 + r() * 40},60,${0.75 - 0.2 * (1 - dia)})`; ctx.beginPath(); ctx.ellipse(ux, uy, 4.5, 3, r() * 3, 0, TAU); ctx.fill(); }
  ctx.fillStyle = 'rgba(220,235,255,.25)'; ctx.beginPath(); ctx.ellipse(0, -30, 13, 10, 0, 0, TAU); ctx.fill();
  ctx.restore(); ctx.restore();
}
// Petunia en maceta. dia 1/0. brillo en flores y brotes (los más brillantes según la empresa).
function petunia(ctx, x, y, s, brillo = 0, dia = 1, T = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = mixc('#0d0907', '#a85a36', dia); ctx.beginPath(); ctx.moveTo(-92, -120); ctx.lineTo(92, -120); ctx.lineTo(70, 0); ctx.lineTo(-70, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = mixc('#120c09', '#c4704a', dia); ctx.fillRect(-102, -138, 204, 24);
  const r = rng(21), tallo = mixc('#0a120b', '#3f7a35', dia), hoja = mixc('#0b150c', '#4c9440', dia), flor = mixc('#1a1c1b', '#f4f1ea', dia);
  const flores = [];
  for (let i = 0; i < 13; i++) { const a = -Math.PI / 2 + (i / 12 - 0.5) * 2.5, l = 150 + r() * 150, mx = Math.cos(a) * l * 0.5 + (r() - 0.5) * 40, my = -138 + Math.sin(a) * l * 0.6 - 30, ex = Math.cos(a) * l + Math.sin(T * 0.7 + i) * 3, ey = -138 + Math.sin(a) * l;
    ctx.strokeStyle = tallo; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo((i - 6) * 9, -138); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
    for (let k = 1; k <= 3; k++) { const u = k / 4, px = mixn((i - 6) * 9, ex, u) + (mx - ex / 2) * 0.5 * Math.sin(u * 3.1), py = mixn(-138, ey, u) + (my - (ey - 138) / 2) * 0.2; ctx.save(); ctx.translate(px, py); ctx.rotate(a + (k % 2 ? 1 : -1) * 1.1); ctx.fillStyle = hoja; ctx.beginPath(); ctx.ellipse(22, 0, 26, 11, 0, 0, TAU); ctx.fill(); ctx.restore(); }
    flores.push([ex, ey, a, i % 4 === 3]); }
  for (const [fx, fy, a, brote] of flores) { ctx.save(); ctx.translate(fx, fy); ctx.rotate(a + Math.PI / 2);
    if (brote) { ctx.fillStyle = mixc('#0f1a10', '#9fca7a', dia); ctx.beginPath(); ctx.ellipse(0, -14, 9, 20, 0, 0, TAU); ctx.fill(); if (brillo > 0.01) halo(ctx, 0, -14, 70, LUZC.pet, 0.75 * brillo); }
    else { ctx.fillStyle = flor; ctx.beginPath(); for (let k = 0; k <= 40; k++) { const t = k / 40 * TAU, rr = 34 * (1 + 0.1 * Math.cos(5 * t)); k ? ctx.lineTo(Math.cos(t) * rr, Math.sin(t) * rr * 0.72 - 6) : ctx.moveTo(Math.cos(t) * rr, Math.sin(t) * rr * 0.72 - 6); } ctx.fill();
      ctx.strokeStyle = mixc('#131514', '#c9bfd8', dia); ctx.lineWidth = 1.2; ctx.beginPath(); for (let k = 0; k < 5; k++) { const t = k / 5 * TAU + 0.3; ctx.moveTo(0, -6); ctx.lineTo(Math.cos(t) * 32, Math.sin(t) * 23 - 6); } ctx.stroke();
      ctx.fillStyle = mixc('#0c100c', '#d9d36a', dia); ctx.beginPath(); ctx.ellipse(0, -6, 6, 4.5, 0, 0, TAU); ctx.fill();
      if (brillo > 0.01) { ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rgba(LUZC.pet, 0.3 * brillo); ctx.beginPath(); ctx.ellipse(0, -6, 34, 25, 0, 0, TAU); ctx.fill(); halo(ctx, 0, -6, 95, LUZC.pet, 0.5 * brillo); } }
    ctx.restore(); }
  ctx.restore();
}
// Luciérnaga Photinus pyralis vista desde arriba: pronoto rosado con mancha oscura, élitros oscuros con orilla clara, linterna al final del abdomen.
function luciernaga(ctx, x, y, s, rot, flash = 0, alas = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  if (flash > 0.01) halo(ctx, 0, 74, 230, LUZC.luc, flash);
  ctx.fillStyle = flash > 0.01 ? mixc('#c9c37a', '#f0ff9a', flash) : '#b9b27a'; ctx.beginPath(); ctx.ellipse(0, 64, 24, 30, 0, 0, TAU); ctx.fill();
  if (alas > 0.01) { ctx.fillStyle = 'rgba(190,210,230,.16)'; for (const d of [-1, 1]) { ctx.save(); ctx.rotate(d * 0.9 * alas); ctx.beginPath(); ctx.ellipse(d * 18, 40, 20, 78, 0, 0, TAU); ctx.fill(); ctx.restore(); } }
  for (const d of [-1, 1]) { ctx.save(); ctx.rotate(d * 0.55 * alas); ctx.fillStyle = '#17181c'; ctx.beginPath(); ctx.ellipse(d * 15, 20, 17, 62, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#c9b56a'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(d * 15, 20, 16, 61, 0, d > 0 ? -1.2 : Math.PI - 1.9, d > 0 ? 1.9 : Math.PI + 1.2); ctx.stroke(); ctx.restore(); }
  ctx.fillStyle = '#e9a29a'; ctx.beginPath(); ctx.ellipse(0, -46, 30, 22, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#17181c'; ctx.beginPath(); ctx.ellipse(0, -44, 9, 13, 0, 0, TAU); ctx.fill();
  ctx.strokeStyle = '#17181c'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(d * 8, -64); ctx.quadraticCurveTo(d * 30, -100, d * 52, -112); ctx.stroke(); for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(d * 20, -20 + i * 30); ctx.lineTo(d * 52, -30 + i * 38); ctx.stroke(); } }
  ctx.restore();
}
function abeto(ctx, x, y, h, c = '#060a08') { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(x, y - h); for (let i = 1; i <= 7; i++) { const u = i / 7, w = h * 0.3 * u; ctx.lineTo(x + w, y - h + h * u * 0.96); ctx.lineTo(x + w * 0.45, y - h + h * u * 0.9); } for (let i = 7; i >= 1; i--) { const u = i / 7, w = h * 0.3 * u; ctx.lineTo(x - w * 0.45, y - h + h * u * 0.9); ctx.lineTo(x - w, y - h + h * u * 0.96); } ctx.closePath(); ctx.fill(); ctx.fillRect(x - h * 0.02, y - h * 0.1, h * 0.04, h * 0.1); }

/* ---------- objetos ---------- */
function foco(ctx, x, y, s, calor = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (calor > 0.02) { halo(ctx, 0, -40, 520 * calor, LUZC.calor, 0.8 * calor); halo(ctx, 0, -40, 200, '#fff0c8', calor); }
  ctx.strokeStyle = 'rgba(210,225,245,.5)'; ctx.fillStyle = `rgba(255,220,160,${0.05 + 0.12 * calor})`; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(0, -40, 120, Math.PI * 0.72, Math.PI * 0.28); ctx.quadraticCurveTo(46, 110, 44, 150); ctx.lineTo(-44, 150); ctx.quadraticCurveTo(-46, 110, -78, 48); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#3a3d46'; ctx.beginPath(); ctx.roundRect(-46, 150, 92, 70, 8); ctx.fill(); ctx.strokeStyle = '#1c1e24'; ctx.lineWidth = 4; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-46, 168 + i * 18); ctx.lineTo(46, 160 + i * 18); ctx.stroke(); }
  ctx.strokeStyle = '#6b6f7a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-18, 150); ctx.lineTo(-34, -20); ctx.moveTo(18, 150); ctx.lineTo(34, -20); ctx.stroke();
  ctx.strokeStyle = mixc('#5a4a3a', '#fff3d0', cl(calor * 1.2)); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 28; i++) { const u = i / 28; const px = mixn(-34, 34, u), py = -24 + Math.sin(u * TAU * 5) * 10; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.restore();
}
function termometro(ctx, x, y, h, nivel, c = LUZC.rojo, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = 'rgba(210,225,245,.6)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x - 13, y - h, 26, h, 13); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y + 14, 26, 0, TAU); ctx.fillStyle = c; ctx.fill(); ctx.stroke(); ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(x - 7, y - (h - 14) * cl(nivel), 14, (h - 14) * cl(nivel) + 6, 7); ctx.fill(); ctx.restore(); }
function reloj(ctx, x, y, r, hora, a = 1) { // hora 0..24: mitad clara (día) y mitad oscura (noche), aguja única de 24 h
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
  ctx.fillStyle = 'rgba(255,214,120,.2)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, -Math.PI, 0); ctx.fill(); ctx.fillStyle = 'rgba(40,70,140,.32)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, 0, Math.PI); ctx.fill();
  ctx.strokeStyle = 'rgba(220,230,250,.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.stroke();
  for (let i = 0; i < 24; i++) { const an = i / 24 * TAU; ctx.lineWidth = i % 6 ? 1.5 : 3.5; ctx.beginPath(); ctx.moveTo(Math.cos(an) * r * 0.88, Math.sin(an) * r * 0.88); ctx.lineTo(Math.cos(an) * r * 0.97, Math.sin(an) * r * 0.97); ctx.stroke(); }
  const an = -Math.PI + (hora / 24) * TAU; ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * r * 0.78, Math.sin(an) * r * 0.78); ctx.stroke(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(0, 0, 7, 0, TAU); ctx.fill(); ctx.restore(); }
function maleta(ctx, x, y, s, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#8a93a6'; ctx.lineWidth = 9; ctx.beginPath(); ctx.roundRect(-40, -118, 80, 40, 12); ctx.stroke(); ctx.fillStyle = '#3d5a8a'; ctx.beginPath(); ctx.roundRect(-120, -90, 240, 170, 18); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(-120, -14, 240, 10); ctx.fillStyle = '#d9b45a'; ctx.fillRect(-70, -22, 26, 26); ctx.fillRect(44, -22, 26, 26); ctx.restore(); }
function documento(ctx, x, y, s, a = 1, lineas = 9, av = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.03); ctx.fillStyle = '#ece6d8'; ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.fillRect(-170, -230, 340, 460); ctx.shadowBlur = 0; ctx.fillStyle = '#3a3d46'; ctx.fillRect(-130, -190, 150, 12); ctx.fillStyle = '#8a8f9c'; const r = rng(5); for (let i = 0; i < lineas; i++) { const w = (180 + r() * 80) * cl(av * lineas - i); ctx.fillRect(-130, -140 + i * 32, w, 7); } ctx.restore(); }
function botella(ctx, x, y, s, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#e9edf2'; ctx.beginPath(); ctx.moveTo(-20, -220); ctx.lineTo(20, -220); ctx.lineTo(24, -180); ctx.quadraticCurveTo(70, -150, 70, -100); ctx.lineTo(70, 0); ctx.lineTo(-70, 0); ctx.lineTo(-70, -100); ctx.quadraticCurveTo(-70, -150, -24, -180); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#2f6fd6'; ctx.fillRect(-24, -250, 48, 34); ctx.fillStyle = '#2f6fd6'; ctx.fillRect(-70, -110, 140, 70); txt(ctx, 'CLORO', 0, -64, { s: 30, f: 'mono', w: 700, al: 'center', c: '#fff', sombra: false }); ctx.restore(); }
// Molécula en esquema: anillo(s) hexagonales con "brazos". No es la estructura exacta; siempre se rotula como esquema.
function molecula(ctx, x, y, s, color, anillos = 1, a = 1, giro = 0) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(giro); ctx.scale(s, s); ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.lineJoin = 'round';
  for (let k = 0; k < anillos; k++) { const ox = k * 69 - (anillos - 1) * 34.5; ctx.beginPath(); for (let i = 0; i <= 6; i++) { const an = i / 6 * TAU + Math.PI / 6; i ? ctx.lineTo(ox + Math.cos(an) * 40, Math.sin(an) * 40) : ctx.moveTo(ox + Math.cos(an) * 40, Math.sin(an) * 40); } ctx.stroke(); ctx.beginPath(); ctx.arc(ox, 0, 22, 0, TAU); ctx.globalAlpha *= 0.5; ctx.stroke(); ctx.globalAlpha /= 0.5; }
  const ex = (anillos - 1) * 34.5 + 40; ctx.beginPath(); ctx.moveTo(ex - 5, 20); ctx.lineTo(ex + 34, 42); ctx.lineTo(ex + 70, 22); ctx.moveTo(-ex + 5, -20); ctx.lineTo(-ex - 32, -40); ctx.stroke();
  ctx.fillStyle = color; ctx.beginPath(); ctx.arc(ex + 70, 22, 7, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(-ex - 32, -40, 7, 0, TAU); ctx.fill(); ctx.restore(); }
// Semáforo de veredicto: tres luces y la frase.
function veredicto(ctx, e, nivel, frase, sub, color) {
  const a = ss(e.tl, 0.2, 1.0), c = ['#3DFF7A', '#F4C25A', '#FF5A4A'][nivel];
  txt(ctx, 'VEREDICTO', 1180, 330, { s: 26, f: 'mono', w: 700, ls: 10, c: color || LUZC.oro, a });
  for (let i = 0; i < 3; i++) { const on = i === nivel ? ss(e.tl, 0.8 + i * 0.1, 1.5) : 0, cc = ['#3DFF7A', '#F4C25A', '#FF5A4A'][i]; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(220,230,250,.4)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(1200 + i * 62, 392, 20, 0, TAU); ctx.stroke(); ctx.fillStyle = rgba(cc, 0.1 + 0.9 * on); ctx.fill(); ctx.restore(); if (on > 0) halo(ctx, 1200 + i * 62, 392, 70, cc, 0.7 * on); }
  const lin = frase.split('\n'); lin.forEach((l, i) => rico(ctx, l, 1180, 500 + i * 80, { s: 68, f: 'serif', w: 500, a: ss(e.tl, 1.0 + i * 0.25, 1.9 + i * 0.25) }));
  if (sub) { const ls = sub.split('\n'); ls.forEach((l, i) => rico(ctx, l, 1180, 520 + lin.length * 80 + i * 44, { s: 32, f: 'sans', w: 500, c: '#c9d2e3', a: ss(e.tl, e.L(1) ?? 2.4, (e.L(1) ?? 2.4) + 0.8) })); }
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = c; ctx.fillRect(1180, 440, 150 * a, 3); ctx.restore();
}

/* ---------- componente: una escena de lienzo ---------- */
function EscenaLienzo({ v, p, tl, T, pal, dur, ls }) {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    const c = ref.current, D = (window.LUZ || {})[v.id]; if (!c) return; const ctx = c.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, 1920, 1080);
    const L = (i) => (ls && ls[i] != null ? ls[i] : null);
    if (D) { ctx.save(); try { D(ctx, { tl, dur: dur || 1, p, T, L, n: (ls || []).length, pal, v }); } catch (err) { console.error('[lienzo ' + v.id + ']', err.message); } ctx.restore(); }
    else { noche(ctx); txt(ctx, 'FALTA: ' + v.id, 960, 540, { s: 60, f: 'mono', al: 'center', c: '#ff5a4a' }); }
  });
  return <canvas ref={ref} width={1920} height={1080} style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, background: '#05070c' }} />;
}

window.LUZ = window.LUZ || {};
window.LZK = { TAU, cl, pr, ss, eo, mixn, rng, rgba, mixc, LUZC, FU, halo, luzOn, luzOff, noche, estrellas, polvo, cam, oscurece, txt, rico, chip, rotulo, guia, titulo, sello, tache, flecha,
  red, pintaRed, tronco, panellus, mycena, embudo, petri, frasco, matraz, bacteria, calamar, dino, petunia, luciernaga, abeto, foco, termometro, reloj, maleta, documento, botella, molecula, veredicto };
window.EscenaLienzo = EscenaLienzo;

/* =====================================================================================================
   Documental 004 (papel contra plástico): fondos de color de la marca, tinta oscura, gráficas de datos
   hechas en el lienzo (barras, balanza, báscula de muchos platos) y objetos cotidianos a escala humana.
   Todo es esquema: los tamaños entre objetos no están a escala.
   ===================================================================================================== */
const TINTA = '#16120f';
const MARCA = { amarillo: '#FFD23F', menta: '#35DDA9', rosa: '#FF86AE', cian: '#45C9F2', lila: '#B9A0FF', naranja: '#FFA04A', crema: '#F4EFE4', coral: '#FF6B5A', azul: '#2346ff', teal: '#11a39a', kraft: '#C49A6C', hoja: '#3fbf4a', oro: '#F4C25A', rojo: '#E5352B', verde: '#18A058' };
// Fondo de color con luz suave, trama de puntos y piso opcional (o.piso = y del horizonte).
function fondoColor(ctx, c, o = {}) {
  const g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, mixc(c, '#ffffff', 0.22)); g.addColorStop(0.7, c); g.addColorStop(1, mixc(c, '#000000', 0.16));
  ctx.fillStyle = g; ctx.fillRect(-400, -400, 2720, 1880);
  ctx.save(); ctx.fillStyle = 'rgba(255,255,255,.13)'; for (let j = 0; j < 14; j++) for (let i = 0; i < 25; i++) { const r = 2 + 5 * cl(1 - Math.hypot(i * 80 - 1500, j * 80 - 200) / 1300); ctx.beginPath(); ctx.arc(i * 80 + (j % 2) * 40, j * 80 + 20, r, 0, TAU); ctx.fill(); } ctx.restore();
  if (o.piso) { const p = ctx.createLinearGradient(0, o.piso, 0, 1080); p.addColorStop(0, mixc(c, '#000000', 0.22)); p.addColorStop(1, mixc(c, '#000000', 0.42)); ctx.fillStyle = p; ctx.fillRect(-400, o.piso, 2720, 900); ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fillRect(-400, o.piso, 2720, 3); }
}
// Va al final de cada escena clara: oscurece la franja de subtítulos y la esquina de la marca del capítulo.
function franja(ctx, a = 1) {
  const g = ctx.createLinearGradient(0, 850, 0, 1080); g.addColorStop(0, 'rgba(14,12,18,0)'); g.addColorStop(0.3, `rgba(14,12,18,${0.62 * a})`); g.addColorStop(1, `rgba(14,12,18,${0.9 * a})`); ctx.fillStyle = g; ctx.fillRect(0, 850, 1920, 230);
  const r = ctx.createRadialGradient(0, 0, 0, 0, 0, 620); r.addColorStop(0, `rgba(14,12,18,${0.7 * a})`); r.addColorStop(0.5, `rgba(14,12,18,${0.4 * a})`); r.addColorStop(1, 'rgba(14,12,18,0)'); ctx.fillStyle = r; ctx.fillRect(0, 0, 620, 300);
}
const tinta = (ctx, s, x, y, o = {}) => rico(ctx, s, x, y, { c: TINTA, sombra: false, ...o });
// Tarjeta oscura para datos (fondo de las gráficas sobre color).
function panel(ctx, x, y, w, h, a = 1, o = {}) { a = cl(a); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 14; ctx.fillStyle = o.c || '#14161d'; ctx.beginPath(); ctx.roundRect(x, y + (1 - a) * 18, w, h, o.r ?? 26); ctx.fill(); ctx.restore(); }
// De qué estudio sale el dato: siempre abajo, centrado. Estudio · año de publicación · año del dato.
function fuenteDato(ctx, s, a = 1, x = 960, y = 846) { chip(ctx, 'FUENTE · ' + s, x, y, { c: '#F4C25A', s: 21, a, al: 'center' }); }
// Barra vertical que crece. v = fracción de la altura máxima (0..1). o: val (texto arriba), nom (texto abajo), sub, tinta.
function barra(ctx, x, yb, w, hmax, v, color, o = {}) {
  const a = cl(o.a ?? 1), h = Math.max(2, hmax * v * a), ti = o.tinta || '#F6F3EC';
  if (a <= 0) return; ctx.save(); ctx.fillStyle = `rgba(255,255,255,${0.08 * cl(a * 3)})`; ctx.fillRect(x - w / 2, yb - hmax, w, hmax);
  const g = ctx.createLinearGradient(0, yb - h, 0, yb); g.addColorStop(0, mixc(color, '#ffffff', 0.25)); g.addColorStop(1, color); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x - w / 2, yb - h, w, h, [10, 10, 0, 0]); ctx.fill(); ctx.restore();
  if (o.val) txt(ctx, o.val, x, yb - h - 16, { s: o.sv || 50, f: 'serif', w: 600, al: 'center', c: ti, a: cl(a * 2), sombra: false });
  if (o.nom) txt(ctx, o.nom, x, yb + 40, { s: o.sn || 24, f: 'mono', w: 700, ls: 2, al: 'center', c: ti, a: cl(a * 2), sombra: false });
  if (o.sub) txt(ctx, o.sub, x, yb + 70, { s: 20, f: 'sans', w: 500, al: 'center', c: ti, a: cl(a * 2) * 0.75, sombra: false });
}
// Barra horizontal (para comparar razones o porcentajes).
function barraH(ctx, x, y, wmax, h, v, color, o = {}) {
  const a = cl(o.a ?? 1), w = Math.max(2, wmax * v * a), ti = o.tinta || '#F6F3EC';
  if (a <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a * 3); ctx.fillStyle = o.riel || 'rgba(255,255,255,.08)'; ctx.beginPath(); ctx.roundRect(x, y - h / 2, wmax, h, h / 4); ctx.fill(); ctx.fillStyle = color; ctx.beginPath(); ctx.roundRect(x, y - h / 2, w, h, h / 4); ctx.fill(); ctx.restore();
  if (o.nom) txt(ctx, o.nom, x - 20, y + 9, { s: o.sn || 26, f: 'mono', w: 700, ls: 1, al: 'right', c: ti, a: cl(a * 2), sombra: false });
  if (o.val) txt(ctx, o.val, x + w + 18, y + 14, { s: o.sv || 40, f: 'serif', w: 600, c: ti, a: cl(a * 2), sombra: false });
}
// Balanza de dos platos. ang > 0 baja el plato derecho. Regresa los centros de los platos para dibujar encima.
function balanza(ctx, x, y, s, ang, o = {}) {
  const c = o.c || TINTA, L = 300 * s, a = cl(o.a ?? 1); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineCap = 'round';
  ctx.lineWidth = 12 * s; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 330 * s); ctx.stroke(); ctx.beginPath(); ctx.roundRect(x - 110 * s, y + 320 * s, 220 * s, 22 * s, 8); ctx.fill();
  const ex = Math.cos(ang) * L, ey = Math.sin(ang) * L; ctx.lineWidth = 9 * s; ctx.beginPath(); ctx.moveTo(x - ex, y - ey); ctx.lineTo(x + ex, y + ey); ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, 16 * s, 0, TAU); ctx.fill();
  const P = [[x - ex, y - ey + 150 * s], [x + ex, y + ey + 150 * s]];
  P.forEach(([px, py], i) => { const bx = i ? x + ex : x - ex, by = i ? y + ey : y - ey; ctx.lineWidth = 2.5 * s; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(px - 95 * s, py); ctx.moveTo(bx, by); ctx.lineTo(px + 95 * s, py); ctx.stroke(); ctx.beginPath(); ctx.ellipse(px, py, 105 * s, 15 * s, 0, 0, Math.PI); ctx.lineTo(px - 105 * s, py); ctx.fill(); });
  ctx.restore(); return P;
}
// Bolsa de papel kraft de súper (fondo cuadrado, fuelle lateral, asas de papel torcido). (x, y) = centro de la base.
// o.abre 0..1 boca abierta · o.arruga 0..1 marcas de uso · o.rota 0..1 se rasga del fondo · o.c color.
function bolsaPapel(ctx, x, y, s = 1, o = {}) {
  const c = o.c || '#C8A070', a = cl(o.a ?? 1); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s);
  const W2 = 120, Hh = 330, ab = o.abre ?? 0.6;
  ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.beginPath(); ctx.ellipse(10, 4, 150, 16, 0, 0, TAU); ctx.fill();
  // asa de atrás
  ctx.strokeStyle = mixc(c, '#000000', 0.35); ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-40, -Hh - 6 * ab); ctx.bezierCurveTo(-40, -Hh - 100, 62, -Hh - 100, 62, -Hh - 6 * ab); ctx.stroke();
  // interior (boca) y fuelle lateral
  ctx.fillStyle = mixc(c, '#000000', 0.4); ctx.beginPath(); ctx.moveTo(-W2, -Hh); ctx.lineTo(-W2 + 46, -Hh - 26 * ab); ctx.lineTo(W2 + 46, -Hh - 26 * ab); ctx.lineTo(W2, -Hh); ctx.closePath(); ctx.fill();
  ctx.fillStyle = mixc(c, '#000000', 0.22); ctx.beginPath(); ctx.moveTo(W2, -Hh); ctx.lineTo(W2 + 46, -Hh - 26 * ab); ctx.lineTo(W2 + 40, -18); ctx.lineTo(W2, 0); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = mixc(c, '#000000', 0.38); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(W2 + 24, -Hh - 13 * ab); ctx.lineTo(W2 + 14, -Hh * 0.45); ctx.lineTo(W2 + 20, -9); ctx.stroke();
  // frente
  const g = ctx.createLinearGradient(-W2, 0, W2, 0); g.addColorStop(0, mixc(c, '#ffffff', 0.14)); g.addColorStop(1, c); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-W2, 0); ctx.lineTo(-W2, -Hh);
  for (let i = 0; i <= 24; i++) ctx.lineTo(-W2 + i * (2 * W2 / 24), -Hh + (i % 2 ? 5 : 0)); ctx.lineTo(W2, 0); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = mixc(c, '#000000', 0.16); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-W2, -52); ctx.lineTo(W2, -52); ctx.moveTo(-W2, -52); ctx.lineTo(-W2 + 40, 0); ctx.stroke();
  if (o.arruga) { const r = rng(o.seed || 9); ctx.strokeStyle = rgba('#5a3d1e', 0.4 * o.arruga); ctx.lineWidth = 2.2; for (let i = 0; i < 16; i++) { const x0 = -W2 + 14 + r() * (2 * W2 - 28), y0 = -Hh + 20 + r() * (Hh - 50), an = r() * TAU, l = 24 + r() * 70; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + Math.cos(an) * l * 0.5, y0 + Math.sin(an) * l * 0.5 + (r() - 0.5) * 12); ctx.lineTo(x0 + Math.cos(an) * l, y0 + Math.sin(an) * l); ctx.stroke(); }
    ctx.strokeStyle = rgba('#ffffff', 0.22 * o.arruga); ctx.beginPath(); ctx.moveTo(-W2 + 8, -Hh * 0.52); ctx.lineTo(W2 - 6, -Hh * 0.5); ctx.stroke(); }
  if (o.rota) { ctx.fillStyle = o.fondoRoto || '#14161d'; ctx.beginPath(); ctx.moveTo(-70, 2); const n = 9; for (let i = 0; i <= n; i++) ctx.lineTo(-70 + i * 140 / n, 2 - (i % 2 ? 70 : 34) * o.rota * (1 - Math.abs(i - n / 2) / n)); ctx.lineTo(70, 2); ctx.closePath(); ctx.fill(); }
  // asa de enfrente
  ctx.strokeStyle = mixc(c, '#000000', 0.2); ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-62, -Hh + 14); ctx.bezierCurveTo(-62, -Hh - 96, 40, -Hh - 96, 40, -Hh + 14); ctx.stroke();
  ctx.fillStyle = mixc(c, '#000000', 0.12); ctx.fillRect(-76, -Hh + 8, 28, 22); ctx.fillRect(26, -Hh + 8, 28, 22);
  ctx.restore();
}
// Bolsa de plástico tipo camiseta (la delgada del súper). o.grosor 0..1 la hace más opaca y gruesa (bolsa danesa de LDPE).
function bolsaPlastico(ctx, x, y, s = 1, o = {}) {
  const a = cl(o.a ?? 1); if (a <= 0) return; const T = o.T || 0, gr = o.grosor || 0, c = o.c || '#F3F6FB';
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate((o.rot || 0) + Math.sin(T * 1.1) * 0.015); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,.14)'; ctx.beginPath(); ctx.ellipse(0, 4, 120, 13, 0, 0, TAU); ctx.fill();
  const w = 108 + Math.sin(T * 0.9) * 3; const P = () => { ctx.beginPath(); ctx.moveTo(-w + 12, 0); ctx.quadraticCurveTo(-w - 14, -120, -w + 6, -230); ctx.lineTo(-w + 2, -330); ctx.quadraticCurveTo(-w + 22, -346, -w + 44, -330); ctx.quadraticCurveTo(-w + 48, -262, -30, -236); ctx.quadraticCurveTo(0, -226, 30, -236); ctx.quadraticCurveTo(w - 48, -262, w - 44, -330); ctx.quadraticCurveTo(w - 22, -346, w - 2, -330); ctx.lineTo(w - 6, -230); ctx.quadraticCurveTo(w + 14, -120, w - 12, 0); ctx.quadraticCurveTo(0, 12, -w + 12, 0); ctx.closePath(); };
  P(); ctx.fillStyle = rgba(c, 0.62 + 0.3 * gr); ctx.fill(); ctx.strokeStyle = rgba('#6d7890', 0.55); ctx.lineWidth = 2.2 + 2 * gr; ctx.stroke();
  ctx.save(); P(); ctx.clip(); ctx.strokeStyle = 'rgba(110,125,150,.32)'; ctx.lineWidth = 2; const r = rng(o.seed || 4); for (let i = 0; i < 9; i++) { const x0 = -w + r() * 2 * w; ctx.beginPath(); ctx.moveTo(x0, -230 + r() * 30); ctx.quadraticCurveTo(x0 + (r() - 0.5) * 50, -120, x0 + (r() - 0.5) * 70, -6); ctx.stroke(); }
  ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.ellipse(-w * 0.45, -130, 14, 80, 0.1, 0, TAU); ctx.fill(); ctx.restore();
  ctx.restore();
}
// Caja de cartón corrugado, vista de tres cuartos, con solapas.
function cajaCarton(ctx, x, y, s = 1, o = {}) {
  const c = o.c || '#C69A62', a = cl(o.a ?? 1); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,.16)'; ctx.beginPath(); ctx.ellipse(20, 4, 190, 18, 0, 0, TAU); ctx.fill();
  ctx.fillStyle = c; ctx.fillRect(-150, -190, 230, 190); ctx.fillStyle = mixc(c, '#000000', 0.2); ctx.beginPath(); ctx.moveTo(80, -190); ctx.lineTo(170, -230); ctx.lineTo(170, -40); ctx.lineTo(80, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = mixc(c, '#000000', 0.42); ctx.beginPath(); ctx.moveTo(-150, -190); ctx.lineTo(-60, -230); ctx.lineTo(170, -230); ctx.lineTo(80, -190); ctx.closePath(); ctx.fill();
  const ab = o.abre ?? 0.5; ctx.fillStyle = mixc(c, '#ffffff', 0.1); ctx.beginPath(); ctx.moveTo(-150, -190); ctx.lineTo(80, -190); ctx.lineTo(60, -190 - 70 * ab); ctx.lineTo(-176, -190 - 60 * ab); ctx.closePath(); ctx.fill();
  ctx.fillStyle = mixc(c, '#000000', 0.1); ctx.beginPath(); ctx.moveTo(80, -190); ctx.lineTo(170, -230); ctx.lineTo(206, -230 - 54 * ab); ctx.lineTo(112, -190 - 46 * ab); ctx.closePath(); ctx.fill();
  ctx.fillStyle = mixc(c, '#ffffff', 0.25); ctx.fillRect(-150, -108, 230, 20); ctx.strokeStyle = mixc(c, '#000000', 0.3); ctx.lineWidth = 2; ctx.strokeRect(-150, -190, 230, 190);
  ctx.restore();
}
// Árbol de día: tronco y copa redonda. o.talado 0..1 lo vuelve tocón.
function arbol(ctx, x, y, h, o = {}) {
  const a = cl(o.a ?? 1); if (a <= 0) return; const T = o.T || 0, tal = o.talado || 0, c = o.c || '#2E9E57'; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
  ctx.fillStyle = '#7A5230'; ctx.beginPath(); ctx.roundRect(-h * 0.055, -h * mixn(0.5, 0.1, tal), h * 0.11, h * mixn(0.5, 0.1, tal), 4); ctx.fill();
  if (tal > 0.5) { ctx.fillStyle = '#D9B58A'; ctx.beginPath(); ctx.ellipse(0, -h * 0.1, h * 0.055, h * 0.018, 0, 0, TAU); ctx.fill(); }
  const ca = 1 - cl(tal * 2); if (ca > 0) { ctx.globalAlpha *= ca; ctx.rotate(Math.sin(T * 0.8 + x) * 0.012 + tal * 1.2);
    [[0, -0.72, 0.3, 0], [-0.19, -0.6, 0.22, 0.12], [0.2, -0.58, 0.23, 0.08], [0.02, -0.52, 0.24, 0.16]].forEach(([dx, dy, r, d]) => { ctx.fillStyle = mixc(c, '#000000', d); ctx.beginPath(); ctx.arc(dx * h, dy * h, r * h, 0, TAU); ctx.fill(); });
    ctx.fillStyle = 'rgba(255,255,255,.14)'; ctx.beginPath(); ctx.arc(-0.08 * h, -0.8 * h, 0.13 * h, 0, TAU); ctx.fill(); }
  ctx.restore();
}
// Fábrica con techo de sierra, chimeneas y humo que sube (T).
function fabrica(ctx, x, y, s = 1, T = 0, o = {}) {
  const a = cl(o.a ?? 1); if (a <= 0) return; const c = o.c || '#4A5568'; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  if (o.humo !== false) for (let k = 0; k < 2; k++) for (let i = 0; i < 6; i++) { const u = ((T * 0.22 + i / 6 + k * 0.4) % 1), px = -120 + k * 62 + u * 60 + Math.sin(u * 5 + i) * 10, py = -330 - u * 190; ctx.fillStyle = `rgba(245,245,250,${0.55 * (1 - u)})`; ctx.beginPath(); ctx.arc(px, py, 16 + u * 36, 0, TAU); ctx.fill(); }
  ctx.fillStyle = mixc(c, '#000000', 0.2); ctx.fillRect(-140, -330, 40, 200); ctx.fillRect(-78, -300, 40, 170); ctx.fillStyle = '#E5352B'; ctx.fillRect(-140, -330, 40, 16); ctx.fillRect(-78, -300, 40, 16);
  ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(-180, 0); ctx.lineTo(-180, -150); for (let i = 0; i < 4; i++) { ctx.lineTo(-180 + i * 90 + 90, -210); ctx.lineTo(-180 + i * 90 + 90, -150); } ctx.lineTo(180, 0); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#FFE08A'; for (let i = 0; i < 5; i++) ctx.fillRect(-156 + i * 66, -110, 40, 34); ctx.fillStyle = mixc(c, '#000000', 0.35); ctx.fillRect(-30, -56, 64, 56);
  ctx.restore();
}
// Camión de reparto (caja cerrada). Las ruedas giran con T.
function camion(ctx, x, y, s = 1, T = 0, o = {}) {
  const a = cl(o.a ?? 1); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin(T * 9) * 1.2); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(0, 4, 190, 12, 0, 0, TAU); ctx.fill();
  ctx.fillStyle = o.c || '#F6F3EC'; ctx.beginPath(); ctx.roundRect(-180, -170, 240, 140, 8); ctx.fill(); ctx.fillStyle = o.c2 || '#E5352B'; ctx.beginPath(); ctx.roundRect(66, -128, 104, 98, [8, 26, 6, 6]); ctx.fill();
  ctx.fillStyle = '#BFE6F7'; ctx.beginPath(); ctx.roundRect(104, -116, 54, 42, [4, 18, 4, 4]); ctx.fill(); ctx.fillStyle = '#2A2D36'; ctx.fillRect(-184, -34, 360, 12);
  for (const wx of [-116, 116]) { ctx.fillStyle = '#1b1d23'; ctx.beginPath(); ctx.arc(wx, -22, 30, 0, TAU); ctx.fill(); ctx.fillStyle = '#9aa3b5'; ctx.beginPath(); ctx.arc(wx, -22, 13, 0, TAU); ctx.fill(); ctx.strokeStyle = '#1b1d23'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(wx + Math.cos(T * 6) * 13, -22 + Math.sin(T * 6) * 13); ctx.lineTo(wx - Math.cos(T * 6) * 13, -22 - Math.sin(T * 6) * 13); ctx.stroke(); }
  ctx.restore();
}
// Bomba de pozo de petróleo (balancín), en esquema.
function pozo(ctx, x, y, s = 1, T = 0, o = {}) {
  const a = cl(o.a ?? 1); if (a <= 0) return; const an = Math.sin(T * 1.6) * 0.22; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#2A2D36'; ctx.fillStyle = '#2A2D36'; ctx.lineWidth = 12; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(0, -170); ctx.lineTo(40, 0); ctx.stroke(); ctx.save(); ctx.translate(0, -170); ctx.rotate(an); ctx.beginPath(); ctx.moveTo(-130, 0); ctx.lineTo(120, 0); ctx.stroke(); ctx.beginPath(); ctx.moveTo(120, -6); ctx.quadraticCurveTo(160, 20, 124, 60); ctx.lineTo(112, 0); ctx.fill(); ctx.restore();
  ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(126 * Math.cos(an) + 6, -170 + 126 * Math.sin(an) + 40); ctx.lineTo(132, 0); ctx.stroke(); ctx.fillRect(-90, -8, 250, 10); ctx.restore();
}
// Mar: franjas de olas que se mueven con T, de y hacia abajo.
function mar(ctx, y, T = 0, o = {}) {
  const c = o.c || '#1E78C8', h = o.h || 400; for (let k = 0; k < 5; k++) { const yy = y + k * (o.paso || 46), amp = 9 + k * 2; ctx.fillStyle = mixc(c, k % 2 ? '#0B3D7A' : '#48B6E8', 0.18 + k * 0.12); ctx.beginPath(); ctx.moveTo(-50, yy + h); ctx.lineTo(-50, yy);
    for (let x = -50; x <= 1980; x += 30) ctx.lineTo(x, yy + Math.sin(x * 0.012 + T * (0.9 + k * 0.15) + k * 1.7) * amp); ctx.lineTo(1980, yy + h); ctx.closePath(); ctx.fill(); }
}
// Corte de un relleno sanitario o tiradero: capas de residuos y tierra, de (x, y) hacia abajo.
function rellenoSanitario(ctx, x, y, w, h, o = {}) {
  const r = rng(o.seed || 31), capas = o.capas || 4, hc = h / capas; ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  for (let k = 0; k < capas; k++) { ctx.fillStyle = mixc('#3a2c22', '#1c1612', k / capas); ctx.fillRect(x, y + k * hc, w, hc); ctx.fillStyle = mixc('#6b5238', '#3d2f22', k / capas); ctx.fillRect(x, y + k * hc, w, hc * 0.2);
    for (let i = 0; i < w / 26; i++) { const px = x + r() * w, py = y + k * hc + hc * 0.28 + r() * hc * 0.66, t = r(); ctx.fillStyle = t < 0.3 ? 'rgba(200,160,112,.5)' : t < 0.55 ? 'rgba(235,240,248,.4)' : t < 0.8 ? 'rgba(90,110,80,.5)' : 'rgba(120,130,150,.45)'; ctx.save(); ctx.translate(px, py); ctx.rotate(r() * 3); ctx.fillRect(-10 - r() * 12, -5 - r() * 5, 20 + r() * 26, 9 + r() * 10); ctx.restore(); } }
  ctx.restore();
}
// Vaso desechable con tapa. tipo: 'papel' (blanco con manga kraft), 'plastico' (transparente), 'bio' (verdoso), 'reusable' (termo).
function vaso(ctx, x, y, s = 1, tipo = 'papel', o = {}) {
  const a = cl(o.a ?? 1); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.beginPath(); ctx.ellipse(0, 3, 80, 10, 0, 0, TAU); ctx.fill();
  const P = () => { ctx.beginPath(); ctx.moveTo(-74, -220); ctx.lineTo(74, -220); ctx.lineTo(54, 0); ctx.lineTo(-54, 0); ctx.closePath(); };
  if (tipo === 'reusable') { ctx.fillStyle = o.c || '#11a39a'; ctx.beginPath(); ctx.roundRect(-62, -250, 124, 250, [14, 14, 22, 22]); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(-48, -230, 16, 200); ctx.fillStyle = '#2A2D36'; ctx.beginPath(); ctx.roundRect(-68, -284, 136, 44, 12); ctx.fill(); ctx.fillStyle = '#4a4f5e'; ctx.fillRect(10, -296, 34, 16); }
  else { P(); ctx.fillStyle = tipo === 'papel' ? '#F7F3EA' : tipo === 'bio' ? 'rgba(190,235,200,.75)' : 'rgba(225,240,250,.65)'; ctx.fill(); ctx.strokeStyle = 'rgba(60,70,90,.45)'; ctx.lineWidth = 2.5; ctx.stroke();
    if (tipo === 'papel') { ctx.fillStyle = '#C8A070'; ctx.beginPath(); ctx.moveTo(-68, -160); ctx.lineTo(68, -160); ctx.lineTo(60, -60); ctx.lineTo(-60, -60); ctx.closePath(); ctx.fill(); }
    else { ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(-50, -200, 12, 170); }
    if (o.tapa !== false) { ctx.fillStyle = tipo === 'papel' ? '#2A2D36' : 'rgba(240,246,252,.9)'; ctx.beginPath(); ctx.roundRect(-82, -244, 164, 26, 10); ctx.fill(); ctx.beginPath(); ctx.roundRect(-64, -262, 128, 22, 10); ctx.fill(); ctx.strokeStyle = 'rgba(60,70,90,.45)'; ctx.stroke(); } }
  ctx.restore();
}
// Popote. c = color del material.
function popote(ctx, x, y, l, an, c, o = {}) { const a = cl(o.a ?? 1); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(-11, -l, 22, l, 6); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(-7, -l + 4, 5, l - 8); if (o.rayas) { ctx.fillStyle = o.rayas; for (let i = 0; i < l / 44; i++) { ctx.beginPath(); ctx.moveTo(-11, -l + i * 44 + 10); ctx.lineTo(11, -l + i * 44 + 24); ctx.lineTo(11, -l + i * 44 + 40); ctx.lineTo(-11, -l + i * 44 + 26); ctx.closePath(); ctx.fill(); } } ctx.strokeStyle = 'rgba(40,40,50,.4)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(-11, -l, 22, l, 6); ctx.stroke(); ctx.restore(); }
// Casa sencilla y bote de basura (para la línea de vida de la bolsa).
function casa(ctx, x, y, s = 1, o = {}) { const a = cl(o.a ?? 1); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#F6F3EC'; ctx.fillRect(-90, -130, 180, 130); ctx.fillStyle = '#E5352B'; ctx.beginPath(); ctx.moveTo(-112, -126); ctx.lineTo(0, -214); ctx.lineTo(112, -126); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#7A5230'; ctx.fillRect(-22, -72, 44, 72); ctx.fillStyle = '#BFE6F7'; ctx.fillRect(40, -100, 34, 34); ctx.fillRect(-74, -100, 34, 34); ctx.restore(); }
function bote(ctx, x, y, s = 1, o = {}) { const a = cl(o.a ?? 1); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = o.c || '#5B6578'; ctx.beginPath(); ctx.moveTo(-56, -150); ctx.lineTo(56, -150); ctx.lineTo(44, 0); ctx.lineTo(-44, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = mixc(o.c || '#5B6578', '#000000', 0.3); ctx.beginPath(); ctx.roundRect(-66, -172, 132, 24, 8); ctx.fill(); ctx.fillRect(-16, -186, 32, 14); ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 4; for (const d of [-22, 0, 22]) { ctx.beginPath(); ctx.moveTo(d, -130); ctx.lineTo(d * 0.8, -16); ctx.stroke(); } ctx.restore(); }
// Palomita y círculo de color (semáforos de tablas).
function luzSem(ctx, x, y, r, c, a = 1) { a = cl(a); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r * (0.6 + 0.4 * a), 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }

Object.assign(window.LZK, { TINTA, MARCA, fondoColor, franja, tinta, panel, fuenteDato, barra, barraH, balanza, bolsaPapel, bolsaPlastico, cajaCarton, arbol, fabrica, camion, pozo, mar, rellenoSanitario, vaso, popote, casa, bote, luzSem });
