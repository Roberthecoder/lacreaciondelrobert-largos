// cine-luz-a.jsx — Documental 005 (esterilización del sustrato), piezas compartidas y capítulos 0 a 3.
// Cada escena: LUZ.id = (ctx, e) => …   ·   e.L(i) = segundo en que empieza la frase i del bloque.
const { TAU, cl, pr, ss, eo, mixn, rng, rgba, mixc, LUZC, FU, halo, noche, polvo, cam, oscurece, txt, rico, chip, rotulo, guia, titulo, sello, tache, flecha, frasco, matraz, termometro } = window.LZK;
const LUZ = window.LUZ;
const Lx = (e, i) => { const a = e.L(i); return a == null ? 1e9 : a; };
const en = (e, i, d = 0.7, r = 0) => { const a = e.L(i); return a == null ? 0 : ss(e.tl, a + r, a + r + d); };
const esquema = (ctx, a = 1, s = 'ESQUEMA') => chip(ctx, s, 1870, 52, { c: '#8fa0bd', s: 17, a: a * 0.85, al: 'right' });
// Fuente del dato, siempre abajo a la izquierda (arriba de los subtítulos).
const fte = (ctx, s, a = 1, y = 856) => chip(ctx, 'FUENTE: ' + s, 50, y, { c: '#8fa0bd', s: 16, a: a * 0.9 });
const C = { frio: '#3b7be0', vapor: '#dfe8f5', oro: LUZC.oro, rojo: '#ff5a4a', verde: '#3DFF7A', gris: '#c9d2e3', metal: '#9aa3ad' };

/* ====== calor ====== */
const CAL = ['#142a6e', '#1f6fd0', '#27c2c9', '#f2d64b', '#f58a2c', '#e8352b'];
function calor(u) { u = cl(u); const k = u * (CAL.length - 1), i = Math.min(CAL.length - 2, Math.floor(k)); return mixc(CAL[i], CAL[i + 1], k - i); }
// Conducción en un cilindro largo con la superficie a temperatura fija (solución de Fourier, 5 términos).
// Fo = α·t/R² (número de Fourier). Regresa la fracción del salto de temperatura ya ganada (0 = frío, 1 = igual que afuera) en el radio rr (0 centro, 1 orilla).
const LAM = [2.4048, 5.5201, 8.6537, 11.7915, 14.9309], J1L = [0.5191, -0.3403, 0.2715, -0.2325, 0.2065];
function J0(x) { let s = 1, t = 1; const q = x * x / 4; for (let k = 1; k < 40; k++) { t *= -q / (k * k); s += t; if (Math.abs(t) < 1e-12) break; } return s; }
function erf(x) { const a = 0.147, x2 = x * x; return Math.sign(x) * Math.sqrt(1 - Math.exp(-x2 * (4 / Math.PI + a * x2) / (1 + a * x2))); }
function ganado(rr, Fo) {
  if (Fo <= 0) return rr >= 1 ? 1 : 0;
  if (Fo < 0.04) return 1 - cl(erf((1 - rr) / (2 * Math.sqrt(Fo))));
  let th = 0; for (let n = 0; n < 5; n++) th += (2 / (LAM[n] * J1L[n])) * Math.exp(-LAM[n] * LAM[n] * Fo) * J0(LAM[n] * rr);
  return 1 - cl(th);
}
const ALFA = 1.5e-7; // m²/s, agua entre 25 y 70 °C (NIST: 0.146 a 0.161 mm²/s)
const tempC = (rr, Fo, t0 = 25, ts = 121) => t0 + (ts - t0) * ganado(rr, Fo);
// Mapa de temperatura en anillos. forma(k) traza la silueta a escala k (1 = orilla).
function mapaCalor(ctx, forma, Fo, o = {}) {
  const N = o.n || 28; for (let i = 0; i < N; i++) { const k = 1 - i / N, f = ganado(Math.max(0, k - 0.5 / N), Fo); ctx.fillStyle = calor(mixn(o.min || 0, o.max || 1, f)); forma(k); ctx.fill(); }
}
function barraColor(ctx, x, y, w, a = 1, t0 = '25 °C', t1 = '121 °C') {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 40; i++) { ctx.fillStyle = calor(i / 39); ctx.fillRect(x + i * w / 40, y, w / 40 + 1, 14); } ctx.restore();
  txt(ctx, t0, x, y + 42, { s: 20, f: 'mono', w: 700, c: '#8fb4ff', a }); txt(ctx, t1, x + w, y + 42, { s: 20, f: 'mono', w: 700, c: '#ff8a7a', a, al: 'right' });
}
const mmss = (min) => { const s = Math.max(0, Math.round(min * 60)); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); };

/* ====== piezas ====== */
function vapor(ctx, x, y, T, n = 8, a = 1, alto = 240, abre = 30) { for (let i = 0; i < n; i++) { const ph = (T * 0.45 + i / n) % 1; halo(ctx, x + Math.sin(i * 2.4 + T * 0.8) * abre * ph, y - ph * alto, 22 + ph * 80, C.vapor, a * (1 - ph) * 0.4); } }
function manometro(ctx, x, y, r, psi, a = 1, max = 20) {
  ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.fillStyle = '#2a2d36'; ctx.beginPath(); ctx.arc(0, 0, r * 1.1, 0, TAU); ctx.fill();
  ctx.fillStyle = '#ece8dc'; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill();
  const A = (v) => Math.PI * 0.75 + (v / max) * Math.PI * 1.5;
  ctx.strokeStyle = '#d8453a'; ctx.lineWidth = r * 0.1; ctx.beginPath(); ctx.arc(0, 0, r * 0.82, A(15), A(max)); ctx.stroke();
  ctx.strokeStyle = '#22252c'; for (let v = 0; v <= max; v++) { const an = A(v), l = v % 5 ? 0.9 : 0.8; ctx.lineWidth = v % 5 ? 1.5 : 3; ctx.beginPath(); ctx.moveTo(Math.cos(an) * r * l, Math.sin(an) * r * l); ctx.lineTo(Math.cos(an) * r * 0.97, Math.sin(an) * r * 0.97); ctx.stroke(); }
  ctx.fillStyle = '#22252c'; ctx.font = `700 ${r * 0.24}px ${FU.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; for (const v of [0, 5, 10, 15, 20]) { const an = A(v); ctx.fillText(String(v), Math.cos(an) * r * 0.6, Math.sin(an) * r * 0.6); } ctx.fillText('psi', 0, r * 0.52);
  const an = A(psi); ctx.strokeStyle = '#c2281e'; ctx.lineWidth = r * 0.07; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-Math.cos(an) * r * 0.18, -Math.sin(an) * r * 0.18); ctx.lineTo(Math.cos(an) * r * 0.78, Math.sin(an) * r * 0.78); ctx.stroke();
  ctx.fillStyle = '#22252c'; ctx.beginPath(); ctx.arc(0, 0, r * 0.1, 0, TAU); ctx.fill(); ctx.restore();
}
// Olla de presión genérica (cuerpo de aluminio, tapa, manómetro y pesa sobre el tubo de venteo), sobre la estufa.
// (x, y) = centro de la base. rx 0..1 = vista de rayos X (la pared se vuelve transparente). o.dentro(ctx) dibuja el interior (coordenadas de la olla).
function olla(ctx, x, y, s, T, o = {}) {
  const rx = cl(o.rx || 0), psi = o.psi ?? 15, P = () => { ctx.beginPath(); ctx.roundRect(-210, -330, 420, 330, [10, 10, 34, 34]); };
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= o.a ?? 1;
  ctx.fillStyle = '#15171d'; ctx.beginPath(); ctx.roundRect(-300, 16, 600, 30, 8); ctx.fill(); ctx.fillStyle = '#2a2d36'; ctx.fillRect(-170, 2, 340, 14);
  if (o.fuego !== 0) for (let i = 0; i < 9; i++) halo(ctx, -140 + i * 35, 6, 34 + 10 * Math.sin(T * 11 + i * 2.1), '#3aa0ff', 0.6 * (o.fuego ?? 1));
  P(); ctx.fillStyle = '#080b12'; ctx.fill();
  if (rx > 0.01) { ctx.save(); P(); ctx.clip(); ctx.globalAlpha *= rx;
    for (let i = 0; i < 10; i++) halo(ctx, -170 + ((i * 97 + T * 30) % 340), -300 + ((i * 61) % 240) + Math.sin(T + i) * 10, 90, C.vapor, 0.07 * (o.vaporIn ?? 1));
    if (o.dentro) o.dentro(ctx);
    ctx.fillStyle = 'rgba(60,140,230,.38)'; ctx.fillRect(-210, -40 + Math.sin(T * 3) * 1.5, 420, 44); ctx.strokeStyle = 'rgba(200,220,245,.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-200, -56); ctx.lineTo(200, -56); ctx.stroke();
    for (let i = 0; i < 7; i++) { const ph = (T * 0.9 + i * 0.37) % 1; ctx.fillStyle = `rgba(220,235,255,${0.5 * (1 - ph)})`; ctx.beginPath(); ctx.arc(-170 + i * 56, -8 - ph * 30, 4, 0, TAU); ctx.fill(); }
    ctx.restore(); }
  ctx.save(); ctx.globalAlpha *= 1 - 0.94 * rx; const g = ctx.createLinearGradient(-210, 0, 210, 0); g.addColorStop(0, '#59606b'); g.addColorStop(0.2, '#bcc4ce'); g.addColorStop(0.5, '#8c949f'); g.addColorStop(1, '#474d57'); P(); ctx.fillStyle = g; ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fillRect(-150, -310, 14, 270); ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.fillRect(-210, -70, 420, 5); ctx.restore();
  P(); ctx.strokeStyle = `rgba(220,232,248,${0.25 + 0.5 * rx})`; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = '#1b1d22'; ctx.beginPath(); ctx.roundRect(-268, -262, 60, 30, 8); ctx.fill(); ctx.beginPath(); ctx.roundRect(208, -262, 60, 30, 8); ctx.fill();
  const gt = ctx.createLinearGradient(-228, 0, 228, 0); gt.addColorStop(0, '#6a717c'); gt.addColorStop(0.25, '#cfd6df'); gt.addColorStop(1, '#565c66'); ctx.fillStyle = gt; ctx.beginPath(); ctx.roundRect(-228, -374, 456, 46, [20, 20, 6, 6]); ctx.fill();
  ctx.fillStyle = '#1b1d22'; for (const d of [-1, 1]) { ctx.beginPath(); ctx.roundRect(d * 186 - 13, -392, 26, 24, 6); ctx.fill(); }
  ctx.fillStyle = '#7d858f'; ctx.fillRect(84, -396, 12, 24);
  const sube = o.sinPesa || 0; ctx.save(); ctx.translate(90 + sube * 120, -398 - sube * 90); ctx.rotate((1 - sube) * 0.17 * Math.sin(T * 9) * (o.baila ?? 1) + sube * 0.5); ctx.fillStyle = '#23262d'; ctx.beginPath(); ctx.moveTo(-24, 0); ctx.lineTo(24, 0); ctx.lineTo(17, -42); ctx.lineTo(-17, -42); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#3a3e48'; ctx.beginPath(); ctx.roundRect(-9, -54, 18, 14, 4); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.15)'; ctx.fillRect(-18, -34, 5, 28); ctx.restore();
  if ((o.vapor ?? 1) > 0) vapor(ctx, 90, -440, T, 9, o.vapor ?? 1, 230, 40);
  ctx.fillStyle = '#7d858f'; ctx.fillRect(-76, -404, 12, 32); manometro(ctx, -70, -462, 60, psi + 0.15 * Math.sin(T * 7));
  ctx.restore();
}
// Bolsa de sustrato en corte dentro de la olla (coordenadas locales): bloque con mapa de calor, plástico y filtro.
function bolsaCorte(ctx, cx, cy, w, h, Fo, o = {}) {
  const r = Math.min(w, h) * 0.2; ctx.save(); ctx.globalAlpha *= o.a ?? 1;
  mapaCalor(ctx, (k) => { ctx.beginPath(); ctx.roundRect(cx - w / 2 * k, cy - h / 2 * k, w * k, h * k, r * k); }, Fo, o);
  const R = rng(o.seed || 5); ctx.fillStyle = 'rgba(20,12,6,.22)'; for (let i = 0; i < (o.motas ?? 110); i++) { const px = cx + (R() - 0.5) * w * 0.94, py = cy + (R() - 0.5) * h * 0.94; ctx.beginPath(); ctx.ellipse(px, py, 2 + R() * 4, 1.5 + R() * 2, R() * 3, 0, TAU); ctx.fill(); }
  ctx.strokeStyle = 'rgba(225,235,250,.75)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(cx - w / 2 - 4, cy + h / 2 + 3); ctx.lineTo(cx - w / 2 - 4, cy - h / 2 - 6); ctx.lineTo(cx - w * 0.16, cy - h / 2 - h * 0.34); ctx.lineTo(cx + w * 0.16, cy - h / 2 - h * 0.34); ctx.lineTo(cx + w / 2 + 4, cy - h / 2 - 6); ctx.lineTo(cx + w / 2 + 4, cy + h / 2 + 3); ctx.closePath(); ctx.stroke();
  ctx.fillStyle = 'rgba(240,244,250,.85)'; ctx.fillRect(cx - w * 0.07, cy - h / 2 - h * 0.22, w * 0.14, h * 0.1); ctx.restore();
}
// Bolsa de sustrato vista por fuera (base en y).
function bolsa(ctx, x, y, w, h, o = {}) {
  const R = rng(o.seed || 3), c = o.c || '#7a5632'; ctx.save(); ctx.globalAlpha *= o.a ?? 1;
  ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(x - w / 2, y - h, w, h, w * 0.12); ctx.fill();
  ctx.save(); ctx.clip(); for (let i = 0; i < 70; i++) { ctx.fillStyle = R() < 0.5 ? 'rgba(255,225,170,.22)' : 'rgba(20,10,4,.3)'; ctx.beginPath(); ctx.ellipse(x + (R() - 0.5) * w, y - R() * h, 2 + R() * 5, 1.5 + R() * 2.5, R() * 3, 0, TAU); ctx.fill(); }
  if (o.conta) { for (let i = 0; i < 9; i++) { ctx.fillStyle = `rgba(190,205,120,${0.55 * o.conta})`; ctx.beginPath(); ctx.ellipse(x + (R() - 0.5) * w * 0.8, y - R() * h * 0.9, 8 + R() * 16, 6 + R() * 10, R() * 3, 0, TAU); ctx.fill(); } }
  ctx.restore();
  ctx.strokeStyle = 'rgba(225,235,250,.6)'; ctx.lineWidth = 2; ctx.fillStyle = 'rgba(200,220,245,.06)'; ctx.beginPath(); ctx.moveTo(x - w / 2 - 3, y); ctx.lineTo(x - w / 2 - 3, y - h - 4); ctx.lineTo(x - w * 0.18, y - h * 1.42); ctx.lineTo(x + w * 0.18, y - h * 1.42); ctx.lineTo(x + w / 2 + 3, y - h - 4); ctx.lineTo(x + w / 2 + 3, y); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = 'rgba(240,244,250,.85)'; ctx.fillRect(x - w * 0.08, y - h * 1.3, w * 0.16, h * 0.12);
  ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - w * 0.36, y - h * 0.9); ctx.lineTo(x - w * 0.36, y - h * 0.2); ctx.stroke(); ctx.restore();
}
// Granos de cereal dentro de un rectángulo (centeno: alargados, con surco).
function granos(ctx, x, y, w, h, n, seed = 2, a = 1) { const R = rng(seed); ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { const px = x + R() * w, py = y + R() * h, an = R() * 3.14, l = 9 + R() * 4; ctx.save(); ctx.translate(px, py); ctx.rotate(an); ctx.fillStyle = ['#c9a160', '#b88f4e', '#d6b274'][i % 3]; ctx.beginPath(); ctx.ellipse(0, 0, l, l * 0.42, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(70,45,15,.6)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(-l * 0.7, 0); ctx.lineTo(l * 0.7, 0); ctx.stroke(); ctx.restore(); } ctx.restore(); }
function frascoGrano(ctx, x, y, w, h, seed = 2, a = 1, lleno = 0.7) { ctx.save(); ctx.globalAlpha *= a; ctx.save(); ctx.beginPath(); ctx.roundRect(x - w / 2 + 4, y - h * lleno, w - 8, h * lleno - 4, [4, 4, w * 0.1, w * 0.1]); ctx.clip(); ctx.fillStyle = '#6b4f28'; ctx.fillRect(x - w / 2, y - h, w, h); granos(ctx, x - w / 2, y - h * lleno, w, h * lleno, Math.round(w * h * lleno / 190), seed); ctx.restore(); frasco(ctx, x, y, w, h, 1); ctx.restore(); }
// Endospora libre vista al microscopio de contraste de fases: ovalada y brillante.
function esporita(ctx, x, y, s, an = 0, a = 1, c = '#eaf6ff', brillo = 0.5) { if (a <= 0.004) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(0, 0, 10 * s, 6.5 * s, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(90,110,140,.9)'; ctx.lineWidth = 1.6 * s; ctx.stroke(); ctx.restore(); if (brillo > 0) halo(ctx, x, y, 26 * s, '#bfe4ff', brillo * a); }
// Bacilo (bastón) con su endospora en un extremo (posición terminal o subterminal, que ensancha un poco la célula).
function bacilo(ctx, x, y, s, an, a = 1, espora = 1) { if (a <= 0.004) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = '#3a5672'; ctx.strokeStyle = 'rgba(190,215,240,.55)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.roundRect(-34 * s, -7 * s, 60 * s, 14 * s, 7 * s); ctx.fill(); ctx.stroke(); if (espora) { ctx.beginPath(); ctx.ellipse(24 * s, 0, 12 * s, 9.5 * s, 0, 0, TAU); ctx.fillStyle = '#3a5672'; ctx.fill(); ctx.stroke(); ctx.fillStyle = '#eaf6ff'; ctx.beginPath(); ctx.ellipse(24 * s, 0, 9 * s, 6.5 * s, 0, 0, TAU); ctx.fill(); } ctx.restore(); if (espora) halo(ctx, x + Math.cos(an) * 24 * s, y + Math.sin(an) * 24 * s, 22 * s, '#bfe4ff', 0.4 * a); }
// Corte de una endospora (esquema): cubierta, corteza y núcleo. vivo 0..1 apaga el núcleo.
function endospora(ctx, x, y, s, o = {}) {
  const a = o.a ?? 1, capas = o.capas ?? 1, vivo = o.vivo ?? 1; if (a <= 0.004) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a;
  const E = (rx, ry, f, st, lw = 2) => { ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, TAU); if (f) { ctx.fillStyle = f; ctx.fill(); } if (st) { ctx.strokeStyle = st; ctx.lineWidth = lw; ctx.stroke(); } };
  E(150, 104, '#5d4a2c', '#c9a160', 3); E(141, 96, null, 'rgba(20,12,4,.7)', 2); E(133, 89, '#7d6a42', null); // cubierta (varias láminas)
  E(124, 81, null, 'rgba(240,225,180,.8)', 1.5); // membrana externa
  E(121, 78, '#cdbb8c', null); // corteza
  ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 121, 78, 0, 0, TAU); ctx.clip(); ctx.strokeStyle = 'rgba(120,100,60,.35)'; ctx.lineWidth = 1.2; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(0, 0, 116 - i * 6, 74 - i * 5, 0, 0, TAU); ctx.stroke(); } ctx.restore();
  E(92, 55, '#e9dfc2', null); E(86, 50, mixc('#1a1d24', '#274a7a', vivo), 'rgba(170,205,255,.9)', 2.5); // pared germinal, membrana interna y núcleo
  const R = rng(9); ctx.strokeStyle = mixc('#3a3d44', '#9fd0ff', vivo); ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const u = i / 60, px = -50 + u * 100, py = Math.sin(u * 17) * 16 * Math.sin(u * Math.PI) + Math.sin(u * 5) * 8; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke();
  ctx.fillStyle = mixc('#4a4d54', '#d9ecff', vivo); for (let i = 0; i < 34; i++) { const an = R() * TAU, d = Math.sqrt(R()); ctx.beginPath(); ctx.arc(Math.cos(an) * d * 74, Math.sin(an) * d * 42, 2.2, 0, TAU); ctx.fill(); }
  ctx.restore(); if (vivo > 0.05 && o.halo !== 0) halo(ctx, x, y, 150 * s, '#7fb8ff', 0.22 * vivo * a);
}
// Gráfica: g = { x, y, w, h, x0, x1, y0, y1 } (y = orilla de abajo). Regresa X(v), Y(v).
function graf(g) { return { X: (v) => g.x + (v - g.x0) / (g.x1 - g.x0) * g.w, Y: (v) => g.y - (v - g.y0) / (g.y1 - g.y0) * g.h }; }
function ejes(ctx, g, a, o = {}) {
  if (a <= 0.004) return; const { X, Y } = graf(g); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = 'rgba(210,222,240,.7)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(g.x, g.y - g.h); ctx.lineTo(g.x, g.y); ctx.lineTo(g.x + g.w * a, g.y); ctx.stroke();
  ctx.strokeStyle = 'rgba(210,222,240,.1)'; ctx.lineWidth = 1; (o.yt || []).forEach(([v]) => { ctx.beginPath(); ctx.moveTo(g.x, Y(v)); ctx.lineTo(g.x + g.w, Y(v)); ctx.stroke(); }); ctx.restore();
  (o.yt || []).forEach(([v, s]) => txt(ctx, s, g.x - 14, Y(v) + 7, { s: o.ts || 20, f: 'mono', w: 700, al: 'right', c: C.gris, a }));
  (o.xt || []).forEach(([v, s]) => txt(ctx, s, X(v), g.y + 32, { s: o.ts || 20, f: 'mono', w: 700, al: 'center', c: C.gris, a }));
  if (o.xl) txt(ctx, o.xl, g.x + g.w / 2, g.y + 68, { s: 19, f: 'mono', w: 700, ls: 4, al: 'center', c: '#8fa0bd', a });
  if (o.yl) { ctx.save(); ctx.translate(g.x - (o.ylx || 96), g.y - g.h / 2); ctx.rotate(-Math.PI / 2); txt(ctx, o.yl, 0, 0, { s: 19, f: 'mono', w: 700, ls: 4, al: 'center', c: '#8fa0bd', a }); ctx.restore(); }
}
// Curva y = f(x) dibujada hasta xmax.
function curva(ctx, g, f, xmax, color, lw = 4, dash) { const { X, Y } = graf(g); if (xmax <= g.x0) return; ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; if (dash) ctx.setLineDash(dash); ctx.beginPath(); const n = 120; for (let i = 0; i <= n; i++) { const v = g.x0 + (Math.min(xmax, g.x1) - g.x0) * i / n; i ? ctx.lineTo(X(v), Y(f(v))) : ctx.moveTo(X(v), Y(f(v))); } ctx.stroke(); ctx.restore(); }
function cronometro(ctx, x, y, r, frac, a = 1, c = '#fff') { if (a <= 0.004) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.fillStyle = 'rgba(8,10,16,.8)'; ctx.strokeStyle = c; ctx.lineWidth = r * 0.07; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = c; ctx.fillRect(-r * 0.12, -r * 1.22, r * 0.24, r * 0.2); ctx.globalAlpha *= 0.35; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r * 0.84, -Math.PI / 2, -Math.PI / 2 + TAU * cl(frac)); ctx.closePath(); ctx.fill(); ctx.globalAlpha /= 0.35; const an = -Math.PI / 2 + TAU * frac; ctx.lineWidth = r * 0.06; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * r * 0.74, Math.sin(an) * r * 0.74); ctx.stroke(); ctx.restore(); }
function palomita(ctx, x, y, r, a = 1, c = C.verde) { a = cl(a); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = c; ctx.lineWidth = r * 0.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - r * 0.6, y); ctx.lineTo(x - r * 0.15, y + r * 0.45); ctx.lineTo(x + r * 0.7, y - r * 0.5); ctx.stroke(); ctx.restore(); }
// Partículas de sustrato húmedo (aserrín): manchas irregulares. Regresa la lista [x, y, r] para pintar encima.
const _part = {};
function particulas(clave, x, y, w, h, n, seed, r0 = 26, r1 = 30) { if (_part[clave]) return _part[clave]; const R = rng(seed), P = []; let tries = 0; while (P.length < n && tries++ < n * 80) { const px = x + R() * w, py = y + R() * h, r = r0 + R() * r1; if (P.every((q) => Math.hypot(q[0] - px, q[1] - py) > (q[2] + r) * 0.86)) P.push([px, py, r, R() * 9]); } return (_part[clave] = P); }
function particula(ctx, p, color, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = color; ctx.beginPath(); for (let i = 0; i <= 14; i++) { const an = i / 14 * TAU, rr = p[2] * (0.82 + 0.16 * Math.sin(an * 3 + p[3]) + 0.08 * Math.sin(an * 7 + p[3] * 2)); i ? ctx.lineTo(p[0] + Math.cos(an) * rr, p[1] + Math.sin(an) * rr * 0.86) : ctx.moveTo(p[0] + Math.cos(an) * rr, p[1] + Math.sin(an) * rr * 0.86); } ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
const reloj7 = (ctx, s, x, y, o = {}) => txt(ctx, s, x, y, { s: 64, f: 'mono', w: 700, ls: 4, ...o });

/* ====== 00 · Gancho ====== */
// La olla del gancho y del cierre. Fo = avance del calor en la bolsa; rx = rayos X.
function escenaOlla(ctx, e, o = {}) {
  noche(ctx, '#0a0807', '#120d0a'); halo(ctx, 640, 860, 700, '#ff9a4a', 0.07);
  ctx.fillStyle = '#0d0b0a'; ctx.fillRect(0, 838, 1920, 242);
  olla(ctx, 640, 800, 1.08, e.T, { rx: o.rx, psi: o.psi ?? 15, vaporIn: o.vaporIn, dentro: (c) => { bolsaCorte(c, 0, -170, 250, 210, o.Fo, { seed: 4 }); if (o.dentro) o.dentro(c); } });
}
LUZ.olla = (ctx, e) => {
  const rx = ss(e.tl, 1.0, 3.0), Fo = 0.012 + 0.06 * e.p, z = 1.06 - 0.06 * ss(e.tl, 0, 6);
  const fin = cam(ctx, z, 760, 520); escenaOlla(ctx, e, { rx, Fo }); fin();
  // lo que marca la olla y lo que pasa en el centro
  guia(ctx, 628, 300, 300, 200, ss(e.tl, 0.3, 1.0), C.oro); chip(ctx, 'MANÓMETRO: 15 psi ≈ 121 °C', 50, 160, { c: C.oro, s: 20, a: ss(e.tl, 0.4, 1.1) });
  txt(ctx, 'AL NIVEL DEL MAR · psi = LIBRAS POR PULGADA CUADRADA', 54, 204, { s: 15, f: 'mono', w: 700, ls: 2, c: '#8fa0bd', a: ss(e.tl, 0.9, 1.6) });
  const ac = ss(e.tl, 2.6, 3.4) * (1 - en(e, 3, 0.5)); guia(ctx, 640, 616, 1010, 640, ac, '#8fb4ff'); rotulo(ctx, 1030, 650, 'El centro de la bolsa', 'TODAVÍA FRÍO', ac, { c: '#8fb4ff', s: 40 });
  const a1 = en(e, 1, 0.8), fuera1 = 1 - en(e, 3, 0.6);
  txt(ctx, '15 min · 121 °C', 1420, 330, { s: 108, f: 'serif', w: 500, al: 'center', a: a1 * fuera1 });
  txt(ctx, 'LA RECETA CLÁSICA DEL LABORATORIO', 1420, 388, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: C.oro, a: a1 * fuera1 });
  chip(ctx, '¿Y EN EL CENTRO DE UNA BOLSA DE SUSTRATO?', 1420, 470, { c: '#8fb4ff', s: 22, al: 'center', a: en(e, 2, 0.7) * fuera1 });
  // dos relojes
  const a3 = en(e, 3, 0.8), m = 15 * pr(e.tl, Lx(e, 3) + 0.4, e.dur - 1);
  txt(ctx, 'RELOJ DE LA OLLA', 1240, 200, { s: 20, f: 'mono', w: 700, ls: 5, c: C.oro, a: a3 }); reloj7(ctx, mmss(m), 1240, 268, { a: a3 });
  txt(ctx, 'RELOJ DEL CENTRO', 1580, 200, { s: 20, f: 'mono', w: 700, ls: 5, c: '#8fb4ff', a: a3 }); reloj7(ctx, '00:00', 1580, 268, { a: a3, c: '#8fb4ff' });
  txt(ctx, 'aún no llega a 121 °C', 1580, 310, { s: 34, f: 'mano', w: 700, c: '#8fb4ff', a: a3 });
  const a4 = en(e, 4, 0.7), a5 = en(e, 5, 0.7);
  for (let i = 0; i < 5; i++) esporita(ctx, 1262 + i * 34, 452 + Math.sin(e.T * 1.4 + i) * 5, 1.2, i * 0.9, a4, '#eaf6ff', 0.5);
  rotulo(ctx, 1240, 540, 'Los microbios', 'ENDOSPORAS QUE RESISTEN EL CALOR', a4, { s: 40 });
  rotulo(ctx, 1240, 740, 'El calor', 'EN UN BLOQUE HÚMEDO AVANZA DESPACIO', a5, { c: '#ff8a5a', s: 40 });
  if (a5 > 0) for (let i = 0; i < 4; i++) flecha(ctx, 1250 + i * 70, 650, 1298 + i * 70, 650, a5 * (0.5 + 0.5 * Math.sin(e.T * 2 - i)), calor(1 - i / 4), 5);
  esquema(ctx, ss(e.tl, 3, 4) * (1 - en(e, 1, 0.4)));
};

/* ====== 01 · De dónde salen los 15 minutos ====== */
LUZ.receta = (ctx, e) => {
  noche(ctx, '#0b0a10', '#12101a'); polvo(ctx, 16, 3, e.T, '#8a7fb8', 0.25);
  const a0 = ss(e.tl, 0.1, 0.9);
  ctx.save(); ctx.globalAlpha = a0; ctx.translate(520, 470); ctx.rotate(-0.025); ctx.fillStyle = '#ece6d8'; ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.beginPath(); ctx.roundRect(-330, -250, 660, 500, 10); ctx.fill(); ctx.shadowBlur = 0;
  ctx.fillStyle = '#b9442e'; ctx.fillRect(-330, -250, 660, 12); ctx.restore();
  ctx.save(); ctx.translate(520, 470); ctx.rotate(-0.025);
  txt(ctx, 'ESTERILIZACIÓN CON VAPOR', 0, -170, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: '#7a3a2a', a: a0, sombra: false });
  txt(ctx, '15 min', 0, -50, { s: 130, f: 'serif', w: 600, al: 'center', c: '#1b1d22', a: a0, sombra: false });
  txt(ctx, 'a 121 °C', 0, 50, { s: 84, f: 'serif', w: 500, al: 'center', c: '#1b1d22', a: a0, sombra: false });
  const a1 = en(e, 1, 0.8); txt(ctx, 'el material, con vapor', 0, 150, { s: 62, f: 'mano', w: 700, al: 'center', c: '#b9442e', a: a1, sombra: false });
  ctx.save(); ctx.globalAlpha = a1; ctx.strokeStyle = '#b9442e'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-230, 172); ctx.lineTo(-230 + 460 * a1, 168); ctx.stroke(); ctx.restore(); ctx.restore();
  const a2 = en(e, 2, 0.9);
  const R = rng(12); for (let i = 0; i < 16; i++) { const an = R() * TAU, d = 40 + R() * 150; esporita(ctx, 1380 + Math.cos(an) * d * 1.3 + Math.sin(e.T * 0.6 + i) * 6, 400 + Math.sin(an) * d * 0.8 + Math.cos(e.T * 0.5 + i * 2) * 6, 1.7 + R() * 0.8, R() * 3, a2 * ss(e.tl, Lx(e, 2) + i * 0.08, Lx(e, 2) + 0.6 + i * 0.08)); }
  rotulo(ctx, 1150, 690, 'Endosporas bacterianas', 'DE LOS BLANCOS MÁS RESISTENTES AL CALOR', a2, { c: '#bfe4ff' });
  fte(ctx, 'LEMIEUX ET AL. 2006 · SETLOW Y CHRISTIE 2021', ss(e.tl, 1, 2)); esquema(ctx, a2);
};
LUZ.indicador = (ctx, e) => {
  noche(ctx, '#06090f', '#0a1018'); const T = e.T, a = ss(e.tl, 0.1, 0.9);
  // tira indicadora en su sobre
  ctx.save(); ctx.globalAlpha = a; ctx.translate(330, 500); ctx.rotate(-0.12); ctx.fillStyle = 'rgba(210,225,245,.12)'; ctx.strokeStyle = 'rgba(210,225,245,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(-70, -230, 140, 460, 10); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#f1ecdf'; ctx.fillRect(-24, -180, 48, 360); ctx.fillStyle = '#7a8aa6'; for (let i = 0; i < 5; i++) ctx.fillRect(-14, -160 + i * 16, 28, 5); ctx.restore();
  txt(ctx, 'TIRA INDICADORA', 330, 800, { s: 20, f: 'mono', w: 700, ls: 5, al: 'center', c: C.gris, a }); txt(ctx, '1,000,000 DE ESPORAS', 330, 832, { s: 17, f: 'mono', w: 700, ls: 3, al: 'center', c: C.oro, a: ss(e.tl, 2.5, 3.3) });
  // lupa al microscopio
  const al = ss(e.tl, 0.8, 1.8), x = 880, y = 470, r = 310; guia(ctx, 356, 430, x - r + 20, y - 60, al, '#bfe4ff');
  ctx.save(); ctx.globalAlpha = al; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = '#0c1826'; ctx.fill(); ctx.save(); ctx.clip();
  const R = rng(31); for (let i = 0; i < 26; i++) { const px = x + (R() - 0.5) * r * 1.9, py = y + (R() - 0.5) * r * 1.9, an = R() * TAU + Math.sin(T * 0.3 + i) * 0.1, k = R(), ap = ss(e.tl, 1.2 + i * 0.07, 1.8 + i * 0.07);
    if (k < 0.45) bacilo(ctx, px, py, 2.1, an, ap, 1); else if (k < 0.6) bacilo(ctx, px, py, 2.1, an, ap, 0); else esporita(ctx, px, py, 2, an, ap, '#eaf6ff', 0.45); }
  ctx.restore(); ctx.strokeStyle = 'rgba(220,235,255,.8)'; ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
  // barra de escala: una endospora mide alrededor de 1 µm de ancho; aquí es solo indicativa del orden de tamaño
  rotulo(ctx, 1250, 300, '*Geobacillus stearothermophilus*', 'BACTERIA TERMÓFILA', ss(e.tl, 2.0, 2.9), { c: '#bfe4ff', s: 40 });
  chip(ctx, 'INDICADOR BIOLÓGICO DE AUTOCLAVE', 1270, 400, { c: C.oro, s: 19, a: ss(e.tl, 4.2, 5) });
  guia(ctx, 1100, 560, 1300, 560, ss(e.tl, 5.5, 6.2), '#bfe4ff'); txt(ctx, 'endospora: forma de reposo', 1314, 572, { s: 40, f: 'mano', w: 700, c: '#bfe4ff', a: ss(e.tl, 5.6, 6.4) });
  fte(ctx, 'GEORGE ET AL. 2024 · LEMIEUX ET AL. 2006', ss(e.tl, 1.5, 2.3)); esquema(ctx, al, 'ESQUEMA · SIN ESCALA');
};
const GD = { x: 250, y: 740, w: 1020, h: 560, x0: 0, x1: 15, y0: -4, y1: 6 };
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶' }, pot = (n) => '10' + String(n).split('').map((c) => SUP[c]).join('');
LUZ.valord = (ctx, e) => {
  noche(ctx, '#07090f', '#0b0f18'); const { X, Y } = graf(GD), a = ss(e.tl, 0.2, 1.2);
  ejes(ctx, GD, a, { yt: [[6, '1,000,000'], [4, '10,000'], [2, '100'], [0, '1'], [-2, '1 en 100'], [-4, '1 en 10,000']], xt: [0, 3, 6, 9, 12, 15].map((v) => [v, String(v)]), xl: 'MINUTOS A 121 °C (EN EL MATERIAL)', yl: 'ESPORAS VIVAS · ESCALA LOGARÍTMICA', ylx: 196 });
  // pasos: 1 durante las frases 0–2, hasta 10 en la frase 3
  const n = eo(e.tl, 2.2, 5.5) + 9 * ss(e.tl, Lx(e, 3) + 0.2, Lx(e, 3) + 2.8), f = (v) => 6 - v / 1.5;
  curva(ctx, GD, f, n * 1.5, '#bfe4ff', 5);
  for (let k = 0; k <= Math.floor(n + 0.001); k++) { halo(ctx, X(k * 1.5), Y(6 - k), 26, '#bfe4ff', 0.6); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(X(k * 1.5), Y(6 - k), 6, 0, TAU); ctx.fill(); }
  // un paso D
  const a0 = ss(e.tl, 3.2, 4.2); ctx.save(); ctx.globalAlpha = a0; ctx.strokeStyle = C.oro; ctx.lineWidth = 2.5; ctx.setLineDash([7, 7]); ctx.beginPath(); ctx.moveTo(X(0), Y(5)); ctx.lineTo(X(1.5), Y(5)); ctx.lineTo(X(1.5), Y(-4)); ctx.stroke(); ctx.restore();
  txt(ctx, '÷ 10', X(1.5) + 16, Y(5.45), { s: 34, f: 'mono', w: 700, c: C.oro, a: a0 });
  txt(ctx, 'D', X(0.75), Y(5) + 44, { s: 46, f: 'serif', w: 600, al: 'center', c: C.oro, a: a0 });
  // panel derecho
  txt(ctx, 'VALOR D', 1400, 190, { s: 26, f: 'mono', w: 700, ls: 10, c: C.oro, a });
  rico(ctx, 'tiempo en que el calor', 1400, 240, { s: 34, f: 'sans', w: 500, c: C.gris, a }); rico(ctx, 'mata al 90 % de las esporas', 1400, 284, { s: 34, f: 'sans', w: 500, c: C.gris, a });
  const a1 = en(e, 1, 0.8); txt(ctx, 'D = 1.5 min', 1400, 400, { s: 78, f: 'serif', w: 500, a: a1 }); txt(ctx, 'A 121 °C · LOTE DE LA EPA', 1400, 444, { s: 19, f: 'mono', w: 700, ls: 3, c: C.oro, a: a1 }); rico(ctx, '*G. stearothermophilus* ATCC 7953', 1400, 482, { s: 24, f: 'sans', w: 500, c: C.gris, a: a1 });
  const a2 = en(e, 2, 0.7) * (1 - en(e, 5, 0.5)); for (let i = 0; i < 10; i++) esporita(ctx, 1412 + i * 44, 560, 1.5, 0.4, a2 * (i === 0 ? 1 : 1 - 0.8 * en(e, 2, 0.8, 0.8 + i * 0.12)), i === 0 ? '#eaf6ff' : '#5a6474', i === 0 ? 0.6 : 0);
  txt(ctx, 'cada 1.5 min sobrevive 1 de cada 10', 1400, 620, { s: 36, f: 'mano', w: 700, c: '#bfe4ff', a: a2 });
  const a3 = en(e, 3, 0.7); txt(ctx, '15 min = 10 pasos', X(7.5), 170, { s: 44, f: 'serif', w: 500, al: 'center', a: a3 });
  const a4 = en(e, 4, 0.7); guia(ctx, X(9), Y(0), X(9) + 90, Y(0) - 84, a4, C.oro); chip(ctx, 'PASO 6: QUEDA 1, EN PROMEDIO', X(9) + 96, Y(0) - 100, { c: C.oro, s: 20, a: a4 });
  const a5 = en(e, 5, 0.7); guia(ctx, X(15), Y(-4), X(13.6), Y(-3.4), a5, C.verde); chip(ctx, 'PASO 10: 1 EN 10,000', X(13.5), Y(-3.4), { c: C.verde, s: 20, a: a5, al: 'right' });
  fte(ctx, 'LEMIEUX ET AL. 2006 (VALOR D) · JIMENEZ ET AL. 2024 · CÁLCULO', ss(e.tl, 6, 7));
};
LUZ.sal = (ctx, e) => {
  noche(ctx, '#07090f', '#0b0f18'); const a = ss(e.tl, 0.1, 0.9), x0 = 240, x1 = 1680, y = 520, X = (p) => mixn(x0, x1, (6 - p) / 12);
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(210,222,240,.6)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(mixn(x0, x1, a), y); ctx.stroke(); ctx.restore();
  for (let p = 6; p >= -6; p -= 2) { ctx.fillStyle = `rgba(210,222,240,${0.7 * a})`; ctx.fillRect(X(p) - 1.5, y - 14, 3, 28); txt(ctx, pot(p), X(p), y + 62, { s: 26, f: 'mono', w: 700, al: 'center', c: C.gris, a }); }
  txt(ctx, 'ESPORAS QUE SE ESPERA ENCONTRAR VIVAS (DE UN MILLÓN AL INICIO)', 960, y + 120, { s: 19, f: 'mono', w: 700, ls: 4, al: 'center', c: '#8fa0bd', a });
  const b = ss(e.tl, 0.6, 1.6); halo(ctx, X(-4), y, 50, '#bfe4ff', 0.7 * b); guia(ctx, X(-4), y, X(-4), y - 150, b, '#bfe4ff'); txt(ctx, '15 min con D = 1.5 min', X(-4), y - 210, { s: 34, f: 'serif', w: 500, al: 'center', a: b }); txt(ctx, '1 EN 10,000', X(-4), y - 168, { s: 22, f: 'mono', w: 700, ls: 4, al: 'center', c: '#bfe4ff', a: b });
  const c = ss(e.tl, 2.2, 3.4); halo(ctx, X(-6), y, 70, C.verde, 0.8 * c); guia(ctx, X(-6), y, X(-6), y - 250, c, C.verde); txt(ctx, 'Hospitales', X(-6) + 10, y - 318, { s: 46, f: 'serif', w: 500, al: 'right', a: c }); txt(ctx, '1 EN 1,000,000', X(-6) + 10, y - 272, { s: 24, f: 'mono', w: 700, ls: 4, al: 'right', c: C.verde, a: c });
  const d = en(e, 1, 0.9); rotulo(ctx, 250, 250, 'Nivel de garantía de esterilidad', 'EN INGLÉS: STERILITY ASSURANCE LEVEL (SAL) · LO TÍPICO: ' + pot(-6), d, { c: C.verde, s: 50 });
  fte(ctx, 'GEORGE ET AL. 2024', ss(e.tl, 1, 2));
};
LUZ.material = (ctx, e) => {
  noche(ctx, '#0b0a10', '#12101a'); const a = ss(e.tl, 0.1, 0.8), b = ss(e.tl, 1.6, 2.6);
  txt(ctx, '15 min a 121 °C', 960, 330, { s: 120, f: 'serif', w: 500, al: 'center', a: a * (1 - 0.55 * b) });
  txt(ctx, '…en ', 760, 520, { s: 84, f: 'serif', w: 400, al: 'right', a: b, c: C.gris }); txt(ctx, 'el material', 770, 520, { s: 124, f: 'serif', w: 600, it: true, c: C.oro, a: b });
  halo(ctx, 1040, 480, 520, C.oro, 0.12 * b); bolsaCorte(ctx, 1590, 600, 200, 170, 0.05, { a: ss(e.tl, 2.6, 3.6), seed: 7 });
  txt(ctx, 'no la olla, no el aire: lo que quieres esterilizar', 960, 720, { s: 46, f: 'mano', w: 700, al: 'center', c: '#bfe4ff', a: ss(e.tl, 3, 3.9) });
};

/* ====== 02 · El reloj empieza en el centro ====== */
LUZ.relojes = (ctx, e) => {
  noche(ctx, '#0a0807', '#110d0b'); const T = e.T, y = 560, xs = [330, 860, 1420], a = ss(e.tl, 0.1, 0.9);
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(210,222,240,.55)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(180, y); ctx.lineTo(mixn(180, 1760, eo(e.tl, 0.2, 2.4)), y); ctx.stroke(); ctx.restore();
  flecha(ctx, 1700, y, 1764, y, ss(e.tl, 2, 2.6), 'rgba(210,222,240,.8)', 4); txt(ctx, 'TIEMPO', 1764, y + 44, { s: 18, f: 'mono', w: 700, ls: 5, al: 'right', c: '#8fa0bd', a });
  const E = [['Prendes la estufa', 'LA OLLA ESTÁ FRÍA'], ['La olla marca 121 °C', 'EL VAPOR YA LLEGÓ'], ['El centro llega a 121 °C', 'AQUÍ EMPIEZAN LOS 15 MINUTOS']];
  xs.forEach((x, i) => { const ai = ss(e.tl, 0.4 + i * 0.7, 1.1 + i * 0.7), c = i === 2 ? C.verde : C.gris; ctx.fillStyle = rgba(i === 2 ? '#3DFF7A' : '#c9d2e3', ai); ctx.beginPath(); ctx.arc(x, y, 12, 0, TAU); ctx.fill();
    txt(ctx, E[i][0], x, y + 80, { s: 38, f: 'serif', w: 500, al: 'center', a: ai }); txt(ctx, E[i][1], x, y + 118, { s: 17, f: 'mono', w: 700, ls: 3, al: 'center', c, a: ai });
    ctx.save(); ctx.globalAlpha = ai; if (i === 0) { ctx.fillStyle = '#2a2d36'; ctx.fillRect(x - 70, y - 120, 140, 14); for (let k = 0; k < 5; k++) halo(ctx, x - 52 + k * 26, y - 128, 26 + 6 * Math.sin(T * 11 + k), '#3aa0ff', 0.7); }
    else if (i === 1) manometro(ctx, x, y - 170, 74, 15 + 0.15 * Math.sin(T * 7)); else bolsaCorte(ctx, x, y - 170, 190, 150, 0.9, { seed: 6, motas: 60 }); ctx.restore(); });
  tache(ctx, xs[0], y - 150, 96, en(e, 1, 0.5, 0.2)); tache(ctx, xs[1], y - 170, 96, en(e, 2, 0.5, 0.2));
  const g = ss(e.tl, 2.6, 3.6); halo(ctx, xs[2], y - 170, 260, C.verde, 0.16 * g); const fr = pr(e.tl, 3.4, e.dur);
  cronometro(ctx, 1700, 330, 62, fr, g, C.verde); txt(ctx, mmss(15 * fr), 1700, 446, { s: 34, f: 'mono', w: 700, al: 'center', c: C.verde, a: g });
  ctx.save(); ctx.globalAlpha = g; ctx.strokeStyle = C.verde; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xs[2], y); ctx.lineTo(mixn(xs[2], 1740, fr), y); ctx.stroke(); ctx.restore();
  fte(ctx, 'LEMIEUX ET AL. 2006 · UBC BOTANY 2021', ss(e.tl, 1.5, 2.4));
};
function botellaLab(ctx, x, y, w, h, nivel = 0.6, a = 1, Fo = null) { ctx.save(); ctx.globalAlpha *= a; const P = () => { ctx.beginPath(); ctx.moveTo(x - w * 0.2, y - h); ctx.lineTo(x + w * 0.2, y - h); ctx.lineTo(x + w * 0.2, y - h * 0.86); ctx.quadraticCurveTo(x + w / 2, y - h * 0.8, x + w / 2, y - h * 0.68); ctx.lineTo(x + w / 2, y - 6); ctx.quadraticCurveTo(x + w / 2, y, x + w / 2 - 6, y); ctx.lineTo(x - w / 2 + 6, y); ctx.quadraticCurveTo(x - w / 2, y, x - w / 2, y - 6); ctx.lineTo(x - w / 2, y - h * 0.68); ctx.quadraticCurveTo(x - w / 2, y - h * 0.8, x - w * 0.2, y - h * 0.86); ctx.closePath(); };
  P(); ctx.save(); ctx.clip(); if (Fo != null) { const cy = y - h * nivel / 2; mapaCalor(ctx, (k) => { ctx.beginPath(); ctx.ellipse(x, cy, w * 0.72 * k, h * nivel * 0.72 * k, 0, 0, TAU); }, Fo, { n: 16 }); ctx.fillStyle = '#080b12'; ctx.fillRect(x - w, y - h * 1.1, w * 2, h * 1.1 - h * nivel); } else { ctx.fillStyle = 'rgba(214,170,90,.55)'; ctx.fillRect(x - w, y - h * nivel, w * 2, h); } ctx.restore();
  P(); ctx.strokeStyle = 'rgba(205,222,245,.6)'; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = '#2f6fd6'; ctx.beginPath(); ctx.roundRect(x - w * 0.25, y - h - h * 0.07, w * 0.5, h * 0.09, 4); ctx.fill(); ctx.restore(); }
LUZ.tabla = (ctx, e) => {
  noche(ctx, '#070a10', '#0b1019'); const D = [[75, 25], [250, 30], [500, 40], [1000, 45], [1500, 50], [2000, 55]], base = 690, a = ss(e.tl, 0.2, 1.1);
  const hab = [Lx(e, 1), Lx(e, 1) + 1.6, Lx(e, 1) + 2.6, Lx(e, 2), Lx(e, 2) + 1.3, Lx(e, 3)], fuerte = [1, 0, 0, 1, 0, 1];
  txt(ctx, 'CICLO DE LÍQUIDOS EN AUTOCLAVE · MINUTOS TOTALES A 121 °C', 250, 150, { s: 21, f: 'mono', w: 700, ls: 5, c: C.gris, a });
  const calienta = en(e, 5, 1.2);
  D.forEach(([ml, min], i) => { const x = 330 + i * 250, k = Math.cbrt(ml / 2000), w = 150 * k, h = 250 * k, ai = ss(e.tl, 0.5 + i * 0.2, 1.2 + i * 0.2), b = eo(e.tl, hab[i], hab[i] + 1.0), c = fuerte[i] ? C.oro : '#7f8ba3';
    botellaLab(ctx, x, base, w, h, 0.62, ai, calienta > 0 ? 0.02 + 0.5 * calienta * pr(e.tl, Lx(e, 5), e.dur) / (k * k) * 0.25 : null);
    txt(ctx, ml >= 1000 ? (ml / 1000) + ' L' : ml + ' ml', x, base + 44, { s: 26, f: 'mono', w: 700, al: 'center', c: C.gris, a: ai });
    const bh = min * 4.2 * b, by = base - h - 40; ctx.save(); ctx.globalAlpha = b; ctx.fillStyle = rgba(fuerte[i] ? '#F4C25A' : '#7f8ba3', 0.9); ctx.beginPath(); ctx.roundRect(x - 26, by - bh, 52, bh, [8, 8, 0, 0]); ctx.fill(); ctx.restore();
    txt(ctx, String(Math.round(min * b)), x, by - bh - 16, { s: fuerte[i] ? 54 : 38, f: 'serif', w: 500, al: 'center', c: fuerte[i] ? '#fff' : C.gris, a: b }); if (i === 0) txt(ctx, 'min', x + 46, by - bh - 16, { s: 22, f: 'mono', w: 700, c, a: b }); });
  chip(ctx, 'YA INCLUYEN EL TIEMPO PARA QUE EL LÍQUIDO LLEGUE A 121 °C', 960, 800, { c: C.verde, s: 20, al: 'center', a: en(e, 4, 0.8) * (1 - calienta) });
  txt(ctx, 'más volumen, más espera para el centro', 960, 812, { s: 44, f: 'mano', w: 700, al: 'center', c: '#bfe4ff', a: calienta });
  fte(ctx, 'UBC BOTANY, AUTOCLAVE GOOD PRACTICE GUIDE (2021), TABLA DEL FABRICANTE STERIS', ss(e.tl, 1.5, 2.4)); esquema(ctx, calienta, 'MAPA DE CALOR: ESQUEMA');
};
// Autoclave industrial en corte con bolsas de residuos de construcción (esquema del experimento de la EPA).
function autoclaveEPA(ctx, e, cables, tiras) {
  const T = e.T; ctx.save(); ctx.fillStyle = '#10141c'; ctx.strokeStyle = 'rgba(190,205,225,.7)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.roundRect(240, 250, 1180, 500, 250); ctx.fill(); ctx.stroke();
  ctx.save(); ctx.clip(); for (let i = 0; i < 14; i++) halo(ctx, 300 + ((i * 131 + T * 26) % 1080), 300 + (i * 67) % 400, 130, C.vapor, 0.06); ctx.restore();
  ctx.fillStyle = '#2a2f3a'; ctx.fillRect(380, 690, 900, 12); ctx.restore();
  const B = [[520, 688, 190, 150, '#8d8f94', 'TABLAROCA'], [760, 688, 210, 170, '#b9b3a2', 'PLAFONES'], [1010, 688, 200, 140, '#7a5a6a', 'ALFOMBRA'], [640, 520, 180, 130, '#9a9ca0', ''], [900, 506, 190, 130, '#8a6a78', '']], P = [];
  B.forEach(([x, y, w, h, c, n], i) => { const R = rng(i * 7 + 3); ctx.fillStyle = c; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const an = k / 20 * TAU, rr = 1 + 0.08 * Math.sin(an * 4 + i) + 0.05 * Math.sin(an * 7 + i * 3); k ? ctx.lineTo(x + Math.cos(an) * w / 2 * rr, y - h / 2 + Math.sin(an) * h / 2 * rr) : ctx.moveTo(x + Math.cos(an) * w / 2 * rr, y - h / 2 + Math.sin(an) * h / 2 * rr); } ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.4)'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let k = 0; k < 12; k++) ctx.fillRect(x + (R() - 0.5) * w * 0.7, y - h / 2 + (R() - 0.5) * h * 0.6, 18 + R() * 30, 5);
    if (n) txt(ctx, n, x, y + 40, { s: 17, f: 'mono', w: 700, ls: 3, al: 'center', c: C.gris });
    const nt = i < 3 ? 5 : 4 + (i === 4 ? 1 : 0); for (let k = 0; k < nt; k++) P.push([x + (R() - 0.5) * w * 0.62, y - h / 2 + (R() - 0.5) * h * 0.6]); });
  P.slice(0, 24).forEach(([px, py], i) => { const ai = cl(cables * 24 - i); if (ai <= 0) return; ctx.save(); ctx.globalAlpha = ai; ctx.strokeStyle = 'rgba(255,200,90,.75)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(px, py); ctx.bezierCurveTo(px, py - 120, 1300, 270 + i * 4, 1404, 300 + i * 6); ctx.stroke(); ctx.restore(); halo(ctx, px, py, 16, '#ffc85a', 0.9 * ai); ctx.fillStyle = rgba('#ffe7a0', ai); ctx.beginPath(); ctx.arc(px, py, 4, 0, TAU); ctx.fill();
    if (i % 2 === 0) { ctx.save(); ctx.globalAlpha = tiras; ctx.fillStyle = '#f1ecdf'; ctx.translate(px + 14, py + 8); ctx.rotate(0.4 + i); ctx.fillRect(-4, -13, 8, 26); ctx.restore(); } });
  return P;
}
LUZ.epa = (ctx, e) => {
  noche(ctx, '#080a0e', '#0c0f15'); const fin = cam(ctx, 0.84 + 0.04 * e.p, 960, 500); autoclaveEPA(ctx, e, eo(e.tl, Lx(e, 1), Lx(e, 1) + 3), en(e, 1, 0.8, 3.4)); fin();
  rotulo(ctx, 1400, 290, 'Autoclave comercial', 'EPA · MARZO DE 2005', ss(e.tl, 0.4, 1.3), { s: 40 });
  txt(ctx, 'EPA: AGENCIA DE PROTECCIÓN', 1420, 366, { s: 17, f: 'mono', w: 700, ls: 2, c: '#8fa0bd', a: ss(e.tl, 1, 1.8) }); txt(ctx, 'AMBIENTAL DE ESTADOS UNIDOS', 1420, 392, { s: 17, f: 'mono', w: 700, ls: 2, c: '#8fa0bd', a: ss(e.tl, 1, 1.8) });
  chip(ctx, '24 TERMOPARES', 1410, 480, { c: '#ffc85a', s: 22, a: en(e, 1, 0.7, 0.4) }); txt(ctx, 'termómetros de cable', 1414, 534, { s: 36, f: 'mano', w: 700, c: '#ffc85a', a: en(e, 1, 0.7, 0.9) });
  chip(ctx, 'TIRAS: 1,000,000 DE ESPORAS C/U', 1410, 620, { c: '#f1ecdf', s: 19, a: en(e, 1, 0.7, 3.6) });
  fte(ctx, 'LEMIEUX ET AL. 2006, APPL. ENVIRON. MICROBIOL. 72: 7687', ss(e.tl, 1, 2)); esquema(ctx, ss(e.tl, 0.5, 1.2), 'ESQUEMA: EL ACOMODO REAL NO SE DETALLA');
};
const GC = { x: 240, y: 740, w: 1120, h: 540, x0: 0, x1: 120, y0: 20, y1: 140 };
LUZ.curvas = (ctx, e) => {
  noche(ctx, '#07090f', '#0b0f18'); const { X, Y } = graf(GC), a = ss(e.tl, 0.1, 0.9);
  ejes(ctx, GC, a, { yt: [20, 40, 60, 80, 100, 121, 135].map((v) => [v, v + ' °C']), xt: [0, 30, 60, 90, 120].map((v) => [v, String(v)]), xl: 'MINUTOS DE CICLO', ylx: 130 });
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.verde; ctx.lineWidth = 2.5; ctx.setLineDash([12, 9]); ctx.beginPath(); ctx.moveTo(X(0), Y(121)); ctx.lineTo(X(120), Y(121)); ctx.stroke(); ctx.restore();
  txt(ctx, 'META: 121 °C', X(120) + 16, Y(121) + 7, { s: 20, f: 'mono', w: 700, ls: 2, c: C.verde, a });
  const t0 = mixn(0, 120, pr(e.tl, 0.6, 4.6)); curva(ctx, GC, (t) => 22 + 113 * (1 - Math.exp(-t / 3.2)), t0, '#ff7a5a', 6);
  txt(ctx, 'CÁMARA ≈ 135 °C', X(34), Y(135) - 18, { s: 22, f: 'mono', w: 700, ls: 3, c: '#ff7a5a', a: ss(e.tl, 2, 2.8) });
  const F = [[131, 26], [124, 40], [117, 46], [108, 52], [96, 60], [84, 70], [70, 80]], t1 = mixn(0, 120, pr(e.tl, Lx(e, 1), Lx(e, 1) + 4.4));
  F.forEach(([tf, tau], i) => curva(ctx, GC, (t) => 22 + (tf - 22) * (1 - Math.exp(-Math.pow(t / tau, 1.25))), t1, calor(0.25 + 0.6 * (tf - 70) / 61), 3.5));
  const a1 = en(e, 1, 0.8, 2.6); txt(ctx, 'TERMOPARES DENTRO DEL MATERIAL', X(66), Y(32), { s: 20, f: 'mono', w: 700, ls: 3, c: '#8fd0ff', a: a1 });
  const a2 = en(e, 2, 0.6); ctx.save(); ctx.globalAlpha = a2; ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(120), Y(20)); ctx.lineTo(X(120), Y(140)); ctx.stroke(); ctx.restore();
  txt(ctx, '2 horas', 1420, 440, { s: 84, f: 'serif', w: 500, a: a2 }); txt(ctx, 'Y VARIOS PUNTOS SEGUÍAN', 1424, 490, { s: 19, f: 'mono', w: 700, ls: 3, c: C.rojo, a: a2 }); txt(ctx, 'POR DEBAJO DE 121 °C', 1424, 520, { s: 19, f: 'mono', w: 700, ls: 3, c: C.rojo, a: a2 });
  fte(ctx, 'LEMIEUX ET AL. 2006', ss(e.tl, 1, 2)); esquema(ctx, a, 'ESQUEMA: FORMA DE LAS CURVAS, NO LOS DATOS MEDIDOS');
};
// Tubo de cultivo con caldo: claro (sin crecimiento) o turbio (crecimiento).
function tuboCultivo(ctx, x, y, turbio, a = 1, T = 0) { ctx.save(); ctx.globalAlpha *= a; const P = () => { ctx.beginPath(); ctx.moveTo(x - 22, y - 190); ctx.lineTo(x - 22, y - 22); ctx.arc(x, y - 22, 22, Math.PI, 0, true); ctx.lineTo(x + 22, y - 190); };
  P(); ctx.save(); ctx.clip(); ctx.fillStyle = mixc('#8a5a9a', '#b9b08a', turbio); ctx.globalAlpha *= 0.5 + 0.4 * turbio; ctx.fillRect(x - 30, y - 130, 60, 140); ctx.restore(); if (turbio > 0.3) { const R = rng(Math.round(x)); ctx.fillStyle = `rgba(240,235,200,${0.5 * turbio})`; for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.arc(x - 16 + R() * 32, y - 14 - R() * 110 + Math.sin(T + i) * 3, 2 + R() * 2.5, 0, TAU); ctx.fill(); } }
  ctx.fillStyle = '#f1ecdf'; ctx.fillRect(x - 5, y - 96, 10, 70); P(); ctx.strokeStyle = 'rgba(210,225,245,.7)'; ctx.lineWidth = 3; ctx.stroke(); ctx.fillStyle = '#3a3e48'; ctx.beginPath(); ctx.roundRect(x - 27, y - 212, 54, 30, 6); ctx.fill(); ctx.restore(); }
LUZ.tiras = (ctx, e) => {
  noche(ctx, '#080a10', '#0c0f18'); const T = e.T, a = ss(e.tl, 0.2, 1), fin = 1 - 0.7 * en(e, 3, 0.8);
  ctx.save(); ctx.globalAlpha = fin;
  txt(ctx, 'LAS TIRAS, YA INCUBADAS EN CALDO DE CULTIVO', 960, 170, { s: 21, f: 'mono', w: 700, ls: 5, al: 'center', c: C.gris, a });
  const a1 = en(e, 1, 0.8); for (let i = 0; i < 6; i++) tuboCultivo(ctx, 250 + i * 86, 640, 0, a * ss(e.tl, 0.4 + i * 0.1, 1 + i * 0.1), T);
  rotulo(ctx, 240, 300, '15 min a 121 °C en ese punto', 'SIN CRECIMIENTO', a1, { c: C.verde, s: 38 }); for (let i = 0; i < 6; i++) palomita(ctx, 250 + i * 86, 690, 22, a1 * ss(e.tl, Lx(e, 1) + 0.6 + i * 0.12, Lx(e, 1) + 1 + i * 0.12));
  const a2 = en(e, 2, 0.8), tb = [1, 1, 0, 1, 1, 1, 0, 1]; for (let i = 0; i < 8; i++) tuboCultivo(ctx, 1010 + i * 86, 640, tb[i] * ss(e.tl, Lx(e, 2) + 0.5 + i * 0.15, Lx(e, 2) + 1.8 + i * 0.15), a * ss(e.tl, 0.6 + i * 0.1, 1.2 + i * 0.1), T);
  rotulo(ctx, 1000, 300, 'No llegó a 15 min a 121 °C', 'CRECIMIENTO EN LA MAYORÍA', a2, { c: C.rojo, s: 38 });
  txt(ctx, 'turbio = las esporas germinaron y crecieron', 1320, 740, { s: 36, f: 'mano', w: 700, al: 'center', c: '#e9dfb0', a: en(e, 2, 0.8, 1.6) });
  ctx.restore();
  if (en(e, 3) > 0) { oscurece(ctx, 0.5 * en(e, 3, 0.8)); titulo(ctx, 'La receta funciona.', 960, 440, en(e, 3, 0.8), { s: 92 }); titulo(ctx, 'Lo difícil es cumplirla en el centro.', 960, 560, en(e, 3, 0.8, 1.2), { s: 72, c: C.oro }); }
  fte(ctx, 'LEMIEUX ET AL. 2006', ss(e.tl, 1, 2) * fin); esquema(ctx, a * fin, 'ESQUEMA: EL NÚMERO DE TUBOS ES ILUSTRATIVO');
};

/* ====== 03 · El calor camina lento ====== */
LUZ.cadena = (ctx, e) => {
  noche(ctx, '#0a0806', '#120e0a'); const T = e.T, P = particulas('cad', 340, 260, 1490, 500, 120, 21, 24, 26);
  ctx.fillStyle = 'rgba(70,120,190,.16)'; ctx.fillRect(300, 230, 1560, 560);
  // frente de calor por conducción: avanza con la raíz del tiempo
  const d = 120 + 520 * Math.sqrt(pr(e.tl, 0, e.dur));
  P.forEach((p) => { const f = 1 - cl(erf((p[0] - 300) / d)); particula(ctx, p, mixc('#3a2a1c', '#e8552b', f * 0.9)); if (f > 0.35) halo(ctx, p[0], p[1], p[2] * 1.6, '#ff8a4a', 0.25 * f); });
  // vapor que llega por la izquierda y casi no entra
  for (let i = 0; i < 16; i++) { const ph = (T * 0.35 + i / 16) % 1, y = 260 + (i * 97) % 500; halo(ctx, 40 + ph * 250, y + Math.sin(T + i) * 14, 50 + 30 * Math.sin(i), C.vapor, 0.35 * (1 - ph)); }
  ctx.fillStyle = 'rgba(223,232,245,.5)'; ctx.fillRect(296, 230, 4, 560);
  txt(ctx, 'VAPOR', 150, 210, { s: 22, f: 'mono', w: 700, ls: 8, al: 'center', c: C.vapor, a: ss(e.tl, 0.3, 1) }); txt(ctx, 'SUSTRATO HÚMEDO', 420, 210, { s: 22, f: 'mono', w: 700, ls: 8, c: '#e0b98a', a: ss(e.tl, 0.5, 1.2) });
  const a1 = en(e, 1, 0.7); tache(ctx, 300, 510, 60, a1 * 0.9, C.vapor); chip(ctx, 'EL VAPOR CASI NO ENTRA', 60, 820, { c: C.vapor, s: 19, a: a1 * (1 - en(e, 2, 0.4)) });
  // el recado de mano en mano
  const a2 = en(e, 2, 0.6); if (a2 > 0) { const cad = P.filter((p) => Math.abs(p[1] - 520) < 90).sort((p, q) => p[0] - q[0]), u = pr(e.tl, Lx(e, 2) + 0.5, e.dur) * (cad.length - 1), i = Math.min(cad.length - 2, Math.floor(u)), k = u - i, px = mixn(cad[i][0], cad[i + 1][0], ss(k, 0.2, 0.8)), py = mixn(cad[i][1], cad[i + 1][1], ss(k, 0.2, 0.8)) - Math.sin(k * Math.PI) * 30;
    ctx.save(); ctx.globalAlpha = a2 * 0.6; ctx.strokeStyle = '#ffe7a0'; ctx.lineWidth = 3; ctx.setLineDash([4, 10]); ctx.beginPath(); cad.slice(0, i + 1).forEach((p, j) => (j ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.lineTo(px, py); ctx.stroke(); ctx.restore(); halo(ctx, px, py, 70, '#ffd27a', a2); halo(ctx, px, py, 22, '#ffffff', a2); }
  rotulo(ctx, 1240, 180, 'Conducción', 'DE PARTÍCULA EN PARTÍCULA', a2, { c: '#ffb05a' });
  fte(ctx, 'LEMIEUX ET AL. 2006', ss(e.tl, 3, 4) * en(e, 2, 0.5)); esquema(ctx, ss(e.tl, 3.2, 4));
};
LUZ.difus = (ctx, e) => {
  noche(ctx, '#07090f', '#0b0f18'); const a = ss(e.tl, 0.1, 0.9), x0 = 420, w = 1300, k = pr(e.tl, 2.2, e.dur - 1);
  rotulo(ctx, 150, 200, 'Difusividad térmica', 'QUÉ TAN RÁPIDO SE MUEVE EL CALOR EN UN MATERIAL', a, { s: 54 });
  // dos barras calentadas por la izquierda; el frente avanza como √(α·t): dibujado a escala (√(97/0.146) ≈ 26)
  const barra = (y, nombre, c0, da, alfa, val, uni) => { const dist = w * 1.05 * Math.sqrt(k) * (alfa === 97 ? 1 : 1 / 25.8); ctx.save(); ctx.globalAlpha = da; ctx.beginPath(); ctx.roundRect(x0, y - 44, w, 88, 12); ctx.fillStyle = c0; ctx.fill(); ctx.save(); ctx.clip();
      for (let i = 0; i < 130; i++) { const px = x0 + i * w / 130, f = 1 - cl(erf((px - x0) / Math.max(1, dist))); if (f < 0.01) break; ctx.fillStyle = calor(0.35 + 0.65 * f); ctx.globalAlpha = da * cl(f * 1.6); ctx.fillRect(px, y - 44, w / 130 + 1, 88); } ctx.restore(); ctx.strokeStyle = 'rgba(215,228,246,.6)'; ctx.lineWidth = 2.5; ctx.stroke(); ctx.restore();
    for (let i = 0; i < 4; i++) halo(ctx, x0 - 30, y - 30 + i * 20, 46 + 8 * Math.sin(e.T * 9 + i), '#ff8a3a', 0.6 * da);
    txt(ctx, nombre, 150, y + 14, { s: 44, f: 'serif', w: 500, a: da }); txt(ctx, val, x0, y + 108, { s: 58, f: 'serif', w: 500, a: da, c: '#fff' }); txt(ctx, uni, x0 + 14 + val.length * 31, y + 108, { s: 24, f: 'mono', w: 700, ls: 2, c: C.oro, a: da }); };
  barra(380, 'Agua', '#16304f', en(e, 1, 0.8), 0.146, '≈ 0.14', 'mm²/s (MILÍMETROS CUADRADOS POR SEGUNDO)');
  barra(610, 'Aluminio', '#5d646e', en(e, 2, 0.8), 97, '97', 'mm²/s');
  const a3 = en(e, 3, 0.7); txt(ctx, '≈ 700 ×', 1700, 250, { s: 110, f: 'serif', w: 500, al: 'right', c: C.oro, a: a3 });
  txt(ctx, 'BARRAS A ESCALA: EN EL MISMO TIEMPO, EL FRENTE DE CALOR AVANZA COMO √(α·t)', 420, 790, { s: 17, f: 'mono', w: 700, ls: 2, c: '#8fa0bd', a: en(e, 2, 0.8, 0.8) });
  fte(ctx, 'NIST (INSTITUTO NACIONAL DE ESTÁNDARES Y TECNOLOGÍA, EE. UU.): AGUA, 0.146 A 25 °C · ALUMINIO: WILSON 2007', ss(e.tl, 1.5, 2.4));
};
LUZ.cuadrado = (ctx, e) => {
  noche(ctx, '#0a0806', '#120e0a'); const a = ss(e.tl, 0.1, 0.9), k = 0.5 * pr(e.tl, 0.8, e.dur - 0.5), y = 500;
  const cir = (x, r, Fo, n) => { ctx.save(); ctx.globalAlpha = a; mapaCalor(ctx, (q) => { ctx.beginPath(); ctx.arc(x, y, r * q, 0, TAU); }, Fo, { n }); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.strokeStyle = 'rgba(225,235,250,.8)'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); };
  cir(430, 110, k, 18); cir(1010, 220, k / 4, 30);
  txt(ctx, 'GROSOR × 1', 430, 790, { s: 22, f: 'mono', w: 700, ls: 5, al: 'center', c: C.gris, a }); txt(ctx, 'GROSOR × 2', 1010, 790, { s: 22, f: 'mono', w: 700, ls: 5, al: 'center', c: C.gris, a });
  txt(ctx, 'centro: ' + Math.round(tempC(0, k)) + ' °C', 430, 680, { s: 40, f: 'mano', w: 700, al: 'center', c: '#ffd9a0', a });
  txt(ctx, 'centro: ' + Math.round(tempC(0, k / 4)) + ' °C', 1010, 240, { s: 40, f: 'mano', w: 700, al: 'center', c: '#bfe4ff', a });
  txt(ctx, 't ∝ R² / α', 1560, 330, { s: 88, f: 'serif', w: 500, it: true, al: 'center', a: ss(e.tl, 1.2, 2.2) });
  txt(ctx, 't: TIEMPO · R: RADIO O MEDIO GROSOR', 1560, 384, { s: 16, f: 'mono', w: 700, ls: 2, al: 'center', c: '#8fa0bd', a: ss(e.tl, 1.6, 2.4) }); txt(ctx, 'α: DIFUSIVIDAD TÉRMICA', 1560, 410, { s: 16, f: 'mono', w: 700, ls: 2, al: 'center', c: '#8fa0bd', a: ss(e.tl, 1.6, 2.4) });
  const a1 = en(e, 1, 0.8); txt(ctx, 'doble grosor', 1560, 560, { s: 54, f: 'serif', w: 500, al: 'center', a: a1 }); txt(ctx, 'tiempo × 4', 1560, 650, { s: 84, f: 'serif', w: 500, al: 'center', c: C.oro, a: en(e, 1, 0.8, 0.7) });
  barraColor(ctx, 1380, 730, 360, a); fte(ctx, 'ECUACIÓN DE CALOR DE FOURIER · CÁLCULO: CILINDRO LARGO, SOLO CONDUCCIÓN', ss(e.tl, 1, 2));
};
// Corte de un cilindro con mapa de calor, a escala.
function corteCil(ctx, x, y, r, Fo, o = {}) { ctx.save(); ctx.globalAlpha *= o.a ?? 1; mapaCalor(ctx, (q) => { ctx.beginPath(); ctx.arc(x, y, r * q, 0, TAU); }, Fo, { n: o.n || 30 });
  if (o.motas) { const R = rng(o.motas); ctx.fillStyle = 'rgba(20,12,6,.2)'; for (let i = 0; i < 260; i++) { const an = R() * TAU, d = Math.sqrt(R()) * r * 0.97; ctx.beginPath(); ctx.ellipse(x + Math.cos(an) * d, y + Math.sin(an) * d, 2 + R() * 4, 1.5 + R() * 2, R() * 3, 0, TAU); ctx.fill(); } }
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.strokeStyle = 'rgba(225,235,250,.85)'; ctx.lineWidth = o.lw || 3; ctx.stroke(); ctx.restore(); }
const GM = { x: 1290, y: 520, w: 540, h: 300, x0: 0, x1: 4.2, y0: 25, y1: 125 };
LUZ.mapa = (ctx, e) => {
  noche(ctx, '#080706', '#0f0c0a'); const a = ss(e.tl, 0.2, 1.1), T = e.T;
  // tiempo simulado (horas): frase 1 → 0 a 6 min; frase 2 → hasta 4.1 h
  const th = 0.1 * pr(e.tl, Lx(e, 1) + 4.5, Lx(e, 2) - 1.2) + 4.0 * ss(e.tl, Lx(e, 2) + 0.4, Lx(e, 3) - 0.6), seg = th * 3600;
  const FoT = ALFA * seg / (0.0075 * 0.0075), FoB = ALFA * seg / (0.05 * 0.05), tT = tempC(0, FoT), tB = tempC(0, FoB), bx = 780, by = 500, br = 300, tx = 230, ty = 400, tr = 45;
  corteCil(ctx, bx, by, br, FoB, { a, motas: 7 }); corteCil(ctx, tx, ty, tr, FoT, { a, n: 14, lw: 5 });
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(225,235,250,.35)'; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(tx, ty, tr + 7, 0, TAU); ctx.stroke(); ctx.restore();
  txt(ctx, 'TUBO DE ENSAYO', tx, 270, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: C.gris, a }); txt(ctx, '1.5 cm DE ANCHO', tx, 300, { s: 17, f: 'mono', w: 700, ls: 3, al: 'center', c: C.oro, a });
  txt(ctx, 'BOLSA DE SUSTRATO', bx, 142, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: C.gris, a }); txt(ctx, '10 cm DE ANCHO · CORTES A LA MISMA ESCALA', bx, 172, { s: 17, f: 'mono', w: 700, ls: 3, al: 'center', c: C.oro, a });
  const a1 = en(e, 1, 0.7); ctx.fillStyle = `rgba(255,255,255,${a1})`; ctx.beginPath(); ctx.arc(tx, ty, 3, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(bx, by, 5, 0, TAU); ctx.fill();
  txt(ctx, 'centro: ' + Math.round(tT) + ' °C', tx, 500, { s: 40, f: 'mano', w: 700, al: 'center', c: '#ffd9a0', a: a1 }); if (tT > 119.9) palomita(ctx, tx, 540, 22, ss(e.tl, Lx(e, 2) - 1.2, Lx(e, 2) - 0.6));
  ctx.save(); ctx.globalAlpha = a1; ctx.fillStyle = 'rgba(6,8,14,.6)'; ctx.beginPath(); ctx.roundRect(bx - 150, by + 20, 300, 60, 30); ctx.fill(); ctx.restore(); txt(ctx, 'centro: ' + Math.round(tB) + ' °C', bx, by + 64, { s: 44, f: 'mano', w: 700, al: 'center', c: '#fff', a: a1 }); if (tB > 119.9) palomita(ctx, bx + 190, by + 50, 26, 1);
  // reloj simulado y gráfica del centro
  const hh = Math.floor(th), mm = Math.floor((th - hh) * 60); txt(ctx, 'TIEMPO SIMULADO', 1290, 600, { s: 19, f: 'mono', w: 700, ls: 5, c: C.gris, a: a1 }); txt(ctx, hh + ' h ' + String(mm).padStart(2, '0') + ' min', 1290, 668, { s: 64, f: 'mono', w: 700, a: a1 });
  ejes(ctx, GM, a1, { yt: [[25, '25'], [121, '121 °C']], xt: [0, 1, 2, 3, 4].map((v) => [v, v + ' h']), ts: 18 });
  txt(ctx, 'TEMPERATURA EN EL CENTRO', 1290, 196, { s: 18, f: 'mono', w: 700, ls: 4, c: '#8fa0bd', a: a1 });
  if (a1 > 0) { curva(ctx, GM, (h) => tempC(0, ALFA * h * 3600 / 5.625e-5), th, '#ffd27a', 4); curva(ctx, GM, (h) => tempC(0, ALFA * h * 3600 / 2.5e-3), th, '#7fc4ff', 4); const { X, Y } = graf(GM); txt(ctx, 'TUBO', X(0.16), Y(121) - 12, { s: 17, f: 'mono', w: 700, c: '#ffd27a', a: ss(e.tl, Lx(e, 2) - 2, Lx(e, 2) - 1) }); txt(ctx, 'BOLSA', X(2.2), Y(88), { s: 17, f: 'mono', w: 700, c: '#7fc4ff', a: en(e, 2, 0.8, 2.5) }); }
  chip(ctx, 'TUBO: ≈ 5 min', 1290, 730, { c: '#ffd27a', s: 22, a: ss(e.tl, Lx(e, 2) - 1.4, Lx(e, 2) - 0.7) }); chip(ctx, 'BOLSA: ≈ 4 h', 1290, 790, { c: '#7fc4ff', s: 22, a: en(e, 2, 0.7, 4) });
  const a3 = en(e, 3, 0.7) * (1 - en(e, 4, 0.5)); txt(ctx, '× 44', 1600, 780, { s: 96, f: 'serif', w: 500, c: C.oro, a: a3 }); txt(ctx, '(5 cm ÷ 0.75 cm)²', 1604, 824, { s: 20, f: 'mono', w: 700, ls: 2, c: C.gris, a: a3 });
  sello(ctx, 'PEOR CASO', 230, 700, en(e, 4, 0.5, 0.3), C.oro, -0.06, 40); txt(ctx, 'SOLO CONDUCCIÓN', 230, 770, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: C.oro, a: en(e, 4, 0.5, 0.6) });
  // vapor que se cuela en una bolsa real
  const a5 = en(e, 5, 0.8); if (a5 > 0) { for (let i = 0; i < 26; i++) { const an = i * 2.4, ph = (T * 0.25 + i * 0.137) % 1, d = br * (1.05 - 0.6 * ph); halo(ctx, bx + Math.cos(an) * d, by + Math.sin(an) * d, 26, C.vapor, a5 * 0.7 * Math.sin(ph * Math.PI)); } chip(ctx, 'EN UNA BOLSA REAL ENTRA ALGO DE VAPOR Y EL CENTRO SE CALIENTA ANTES', 420, 835, { c: C.vapor, s: 17, a: a5 }); }
  fte(ctx, 'ESTIMACIÓN PROPIA (NO ES MEDICIÓN): CILINDRO LARGO, α DEL AGUA (NIST), SUPERFICIE A 121 °C', ss(e.tl, 2, 3) * (1 - a5), 880);
};
LUZ.poros = (ctx, e) => {
  noche(ctx, '#0a0806', '#120e0a'); const T = e.T, P = particulas('por', 430, 210, 1440, 580, 130, 33, 24, 26), z = 1 + 0.06 * e.p, fin = cam(ctx, z, 1000, 500);
  const lleno = ss(e.tl, Lx(e, 1) + 0.6, Lx(e, 2)), xl = 420 + 1100 * lleno; // el condensado llena los poros de izquierda a derecha
  ctx.fillStyle = '#0c0a09'; ctx.fillRect(400, 180, 1500, 640);
  { const gw = ctx.createLinearGradient(xl - 140, 0, xl + 20, 0); gw.addColorStop(0, 'rgba(50,120,220,.5)'); gw.addColorStop(1, 'rgba(50,120,220,0)'); ctx.fillStyle = gw; ctx.fillRect(400, 180, 1500, 640); }
  const d = 90 + 200 * en(e, 2, 6); P.forEach((p) => { const f = 1 - cl(erf((p[0] - 400) / d)); particula(ctx, p, mixc('#3a2a1c', '#d8502b', f * 0.85)); });
  // vapor: entra mientras los poros están vacíos; con los poros llenos se queda en la orilla
  for (let i = 0; i < 30; i++) { const ph = (T * 0.3 + i / 30) % 1, alcance = mixn(900, 40, lleno), y = 200 + (i * 83) % 600; halo(ctx, 120 + ph * (300 + alcance), y + Math.sin(T * 1.3 + i) * 16, 34, C.vapor, 0.5 * (1 - ph)); }
  // gotitas donde el vapor toca partículas frías
  const a1 = en(e, 1, 0.6); if (a1 > 0) P.forEach((p, i) => { if (p[0] < xl + 160 && p[0] > xl - 60) { ctx.fillStyle = `rgba(150,205,255,${0.9 * a1})`; ctx.beginPath(); ctx.arc(p[0] - p[2] * 0.8, p[1] + Math.sin(i) * 10, 7, 0, TAU); ctx.fill(); halo(ctx, p[0] - p[2] * 0.8, p[1], 22, '#8fd0ff', 0.6 * a1); } });
  fin();
  txt(ctx, 'VAPOR', 190, 150, { s: 22, f: 'mono', w: 700, ls: 8, al: 'center', c: C.vapor, a: ss(e.tl, 0.3, 1) });
  rotulo(ctx, 1180, 150, 'Condensado', 'EL VAPOR SE VUELVE AGUA Y LLENA LOS POROS', a1, { c: '#8fd0ff', s: 42 });
  const a2 = en(e, 2, 0.8); for (let i = 0; i < 3; i++) flecha(ctx, 470 + i * 150, 500, 570 + i * 150, 500, a2 * (0.5 + 0.5 * Math.sin(T * 1.5 - i)), '#ffb05a', 6); chip(ctx, 'CON LOS POROS LLENOS: CONDUCCIÓN, QUE ES LENTA', 60, 800, { c: '#ffb05a', s: 20, a: a2 });
  sello(ctx, 'HIPÓTESIS DE LOS AUTORES', 1560, 800, ss(e.tl, 1.5, 2.1), C.oro, -0.04, 28);
  fte(ctx, 'LEMIEUX ET AL. 2006', ss(e.tl, 1, 2)); esquema(ctx, ss(e.tl, 0.6, 1.4));
};
LUZ.puntofrio = (ctx, e) => {
  noche(ctx, '#080706', '#0f0c0a'); const a = ss(e.tl, 0.1, 0.9), T = e.T, cx = 760, cy = 500, Fo = 0.05 + 0.05 * e.p;
  bolsaCorte(ctx, cx, cy + 40, 560, 470, Fo, { a, seed: 8, motas: 240, n: 34 });
  // sonda (termopar) hasta el centro
  const s = ss(e.tl, 1.0, 2.6); ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = '#ffc85a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(cx + 380, 140); ctx.lineTo(mixn(cx + 380, cx, s), mixn(140, cy + 40, s)); ctx.stroke(); ctx.restore();
  halo(ctx, cx, cy + 40, 120 + 14 * Math.sin(T * 2), '#7fc4ff', 0.6 * s); ctx.fillStyle = rgba('#ffffff', s); ctx.beginPath(); ctx.arc(cx, cy + 40, 7, 0, TAU); ctx.fill();
  guia(ctx, cx, cy + 40, 1240, 400, ss(e.tl, 2, 2.8), '#7fc4ff'); rotulo(ctx, 1250, 410, 'Punto frío', 'EL QUE MÁS TARDA EN CALENTARSE', ss(e.tl, 2.2, 3), { c: '#7fc4ff', s: 64 });
  const a1 = en(e, 1, 0.8); [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dx, dy], i) => { const k = 0.5 + 0.5 * Math.sin(T * 1.6 + i); flecha(ctx, cx + dx * 250, cy + 40 + dy * 205, cx + dx * (150 - 20 * k), cy + 40 + dy * (120 - 20 * k), a1, '#ffd9a0', 6); });
  txt(ctx, 'el calor entra desde todas las orillas;', 1260, 560, { s: 40, f: 'mano', w: 700, c: '#ffd9a0', a: a1 }); txt(ctx, 'el centro es lo último en recibirlo', 1260, 606, { s: 40, f: 'mano', w: 700, c: '#ffd9a0', a: a1 });
  barraColor(ctx, 1260, 700, 360, a); fte(ctx, 'JIMENEZ ET AL. 2024 (PUNTO FRÍO) · ECUACIÓN DE CALOR', ss(e.tl, 1, 2)); esquema(ctx, a);
};

window.LZA = { Lx, en, esquema, fte, C, calor, ganado, tempC, ALFA, mapaCalor, barraColor, mmss, vapor, manometro, olla, bolsaCorte, bolsa, granos, frascoGrano, esporita, bacilo, endospora, graf, ejes, curva, cronometro, palomita, particulas, particula, reloj7, escenaOlla, corteCil, botellaLab, tuboCultivo, erf, pot };
