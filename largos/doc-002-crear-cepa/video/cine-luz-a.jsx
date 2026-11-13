// cine-luz-a.jsx — Documental 002 «¿Cómo se crea una cepa de un hongo?», piezas compartidas y capítulos 0 a 4.
// Cada escena: LUZ.id = (ctx, e) => …   ·   e.L(i) = segundo en que empieza la frase i del bloque.
// Colores fijos en todo el video: núcleo tipo 1 = azul, núcleo tipo 2 = dorado, tercero = verde. Micelio = blanco hueso.
const { TAU, cl, pr, ss, eo, mixn, rng, rgba, mixc, LUZC, halo, noche, estrellas, polvo, cam, oscurece, txt: txt0, rico, chip: chip0, rotulo, guia, titulo, sello, tache, flecha,
  red, pintaRed, tronco, petri, frasco, termometro, documento } = window.LZK;
const LUZ = window.LUZ;
// Letra chica un poco más grande que en el kit (se lee mejor en pantalla de teléfono).
const txt = (ctx, s, x, y, o = {}) => txt0(ctx, s, x, y, o.s && o.s <= 24 && o.s > 1 ? { ...o, s: o.s * 1.18 } : o);
const chip = (ctx, s, x, y, o = {}) => chip0(ctx, s, x, y, { ...o, s: (o.s || 22) * 1.14 });
Object.keys(LUZ).forEach((k) => delete LUZ[k]);
const en = (e, i, d = 0.7, r = 0) => { const a = e.L(i); return a == null ? 0 : ss(e.tl, a + r, a + r + d); };
const esquema = (ctx, a = 1) => chip(ctx, 'ESQUEMA', 60, 860, { c: '#8fa0bd', s: 18, a: a * 0.8 });
const CA = '#4FA8FF', CB = '#F4C25A', CV = '#63E08A', MIC = '#F3EFE6', ROSA = '#F08CAB', ROJO = '#FF5A4A', GRIS = '#c9d2e3';

/* ====== piezas compartidas ====== */
function disco(ctx, x, y, r, c, a = 1) { if (a <= 0 || r <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a); ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore(); }
function ovalo(ctx, x, y, rx, ry, rot, c, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a); ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot, 0, TAU); ctx.fill(); ctx.restore(); }
function caja(ctx, x, y, w, h, c, a = 1, r = 14, borde = null) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a); ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fill(); if (borde) { ctx.strokeStyle = borde; ctx.lineWidth = 2; ctx.stroke(); } ctx.restore(); }
function linea(ctx, x0, y0, x1, y1, c, w = 2, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a); ctx.strokeStyle = c; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
// Núcleo: bolita con brillo. c2: segundo color (núcleo recombinado, mitad y mitad en proporción k).
function nucleo(ctx, x, y, r, c, a = 1, c2 = null, k = 0.5) {
  if (a <= 0.004) return; halo(ctx, x, y, r * 3.2, c, 0.5 * a);
  ctx.save(); ctx.globalAlpha *= cl(a); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = c; ctx.fill();
  if (c2) { ctx.save(); ctx.clip(); ctx.fillStyle = c2; ctx.fillRect(x - r, y - r + 2 * r * (1 - k), 2 * r, 2 * r); ctx.restore(); }
  ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = Math.max(1, r * 0.14); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.arc(x - r * 0.3, y - r * 0.32, r * 0.28, 0, TAU); ctx.fill(); ctx.restore();
}
// Camino por puntos: at(u) da posición y ángulo; hasta(u) recorta.
function camino(pts) {
  const D = [0]; for (let i = 1; i < pts.length; i++) D.push(D[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])); const T = D[D.length - 1] || 1;
  const at = (u) => { const d = cl(u) * T; let i = 1; while (i < pts.length - 1 && D[i] < d) i++; const k = cl((d - D[i - 1]) / ((D[i] - D[i - 1]) || 1)); return { x: mixn(pts[i - 1][0], pts[i][0], k), y: mixn(pts[i - 1][1], pts[i][1], k), an: Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0]), i }; };
  const hasta = (u) => { const p = at(u), o = pts.slice(0, p.i); o.push([p.x, p.y]); return o; };
  return { T, at, hasta };
}
// Hifa: tubo con pared clara e interior oscuro. g = avance (crece solo por la punta). septos: fracciones del camino.
function hifa(ctx, pts, w, g = 1, o = {}) {
  const C = camino(pts); if (g <= 0.002 || (o.a ?? 1) <= 0.004) return C; const P = C.hasta(g);
  ctx.save(); ctx.globalAlpha *= cl(o.a ?? 1); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const tr = () => { ctx.beginPath(); P.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); };
  tr(); ctx.lineWidth = w; ctx.strokeStyle = o.pared || 'rgba(232,238,246,.86)'; ctx.stroke();
  tr(); ctx.lineWidth = Math.max(1, w - Math.max(3, w * 0.16)); ctx.strokeStyle = o.dentro || '#131c2b'; ctx.stroke();
  (o.septos || []).forEach((u) => { if (u > g - 0.004) return; const p = C.at(u), nx = -Math.sin(p.an), ny = Math.cos(p.an); ctx.strokeStyle = o.pared || 'rgba(232,238,246,.86)'; ctx.lineWidth = Math.max(2, w * 0.09); ctx.beginPath(); ctx.moveTo(p.x + nx * w * 0.46, p.y + ny * w * 0.46); ctx.lineTo(p.x - nx * w * 0.46, p.y - ny * w * 0.46); ctx.stroke(); });
  ctx.restore();
  if (o.punta && g < 1) { const p = C.at(g); halo(ctx, p.x, p.y, w * 1.6, MIC, 0.5 * (o.a ?? 1)); }
  return C;
}
// Fíbula sobre un septo de una hifa horizontal que crece hacia +x. La punta queda adelante (dir = 1).
// k: 0 nada · 0.55 gancho curvado hacia atrás sin tocar · 1 fusionado con la célula de atrás (fíbula completa).
function fibula(ctx, x, y, w, k, o = {}) {
  const dir = o.dir || 1, lado = o.lado || -1, rx = w * 0.6, ry = w * 0.5, y0 = y + lado * w * 0.42, N = 22, a = cl(o.a ?? 1);
  const pt = (u) => { const an = u * Math.PI; return [x + dir * rx * Math.cos(an), y0 + lado * ry * Math.sin(an) * 1.0]; };
  if (k <= 0.01 || a <= 0.004) return pt;
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const tr = () => { ctx.beginPath(); for (let i = 0; i <= N; i++) { const p = pt((i / N) * cl(k)); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } };
  tr(); ctx.lineWidth = w * 0.5; ctx.strokeStyle = o.pared || 'rgba(232,238,246,.86)'; ctx.stroke();
  tr(); ctx.lineWidth = w * 0.5 - Math.max(3, w * 0.14); ctx.strokeStyle = o.dentro || '#131c2b'; ctx.stroke(); ctx.restore();
  return pt;
}
// Caja de Petri vista desde arriba, con agar.
function placa(ctx, x, y, r, a = 1, agar = 'rgba(214,170,96,.20)') { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a); disco(ctx, x, y, r * 0.955, '#0b0d12', 0.55); disco(ctx, x, y, r * 0.955, agar); ctx.restore(); petri(ctx, x, y, r, a); }
// Colonia de micelio. tipo 'riz' = rizomórfico (cordones que radian) · 'alg' = algodonoso (masa esponjada, sin cordones).
function colonia(ctx, clave, x, y, r, g, o = {}) {
  if (g <= 0.003) return; const a = cl(o.a ?? 1), tipo = o.tipo || 'riz', c = o.c || MIC;
  ctx.save(); ctx.globalAlpha *= a;
  const rr = r * cl(g); const gr = ctx.createRadialGradient(x, y, 0, x, y, rr); gr.addColorStop(0, rgba(c, tipo === 'alg' ? 0.62 : 0.34)); gr.addColorStop(0.75, rgba(c, tipo === 'alg' ? 0.42 : 0.16)); gr.addColorStop(1, rgba(c, 0)); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, y, rr, 0, TAU); ctx.fill();
  ctx.translate(x, y);
  if (tipo === 'riz') pintaRed(ctx, red(clave + r, { seed: o.seed || 5, radio: r, brotes: 13, rama: 0.05, paso: Math.max(4, r / 46), celda: Math.max(5, r / 44), max: 5200 }), g, c, { esc: Math.max(1, r / 150), a: 0.95 });
  else { pintaRed(ctx, red(clave + 'a' + r, { seed: o.seed || 8, radio: r, brotes: 30, rama: 0.16, paso: Math.max(3, r / 70), celda: Math.max(3, r / 90), max: 8000 }), g, c, { esc: Math.max(0.6, r / 320), a: 0.7 });
    const R = rng((o.seed || 8) + 3); for (let i = 0; i < 70; i++) { const an = R() * TAU, d = Math.sqrt(R()) * rr * 0.96; halo(ctx, Math.cos(an) * d, Math.sin(an) * d, r * (0.07 + R() * 0.07), c, 0.2); } }
  ctx.restore();
}
// Moho contaminante (verde, como Trichoderma en placa): manchas verdes con orilla blanca.
function moho(ctx, x, y, r, g, seed = 3) { const R = rng(seed); for (let i = 0; i < 26; i++) { const an = R() * TAU, d = Math.sqrt(R()) * r * cl(g), s = r * (0.16 + R() * 0.2) * cl(g); disco(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, s * 1.2, '#e9efe6', 0.10); disco(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, s, '#2f8a55', 0.34); } }
// Sombrero en abanico (Pleurotus): visto un poco desde abajo, láminas que bajan hasta un pie corto y lateral.
const TONOS = { rosa: ['#E8799C', '#F9CAD6', '#CF6388'], blanca: ['#E9E1CF', '#FBF7EC', '#BFB49C'], gris: ['#7F8898', '#EDE8DD', '#A8A294'] };
function abanico(ctx, x, y, s, rot, tono = 'rosa', seed = 1, a = 1) {
  if (a <= 0) return; const [cap, lam, lin] = TONOS[tono]; ctx.save(); ctx.globalAlpha *= cl(a); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); const N = 16;
  const orilla = (i, k = 1) => { const an = -Math.PI * 0.06 - (i / N) * Math.PI * 0.88, rr = (64 + 6 * Math.sin(i * 1.9 + seed * 2.1)) * k; return [Math.cos(an) * rr, Math.sin(an) * rr * 0.74]; };
  ctx.beginPath(); ctx.moveTo(0, 6); for (let i = 0; i <= N; i++) { const p = orilla(i); ctx.lineTo(p[0], p[1]); } ctx.closePath(); ctx.fillStyle = lam; ctx.fill();
  ctx.lineWidth = 1.2; ctx.strokeStyle = lin; ctx.beginPath(); for (let i = 1; i < 30; i++) { const an = -Math.PI * 0.08 - (i / 30) * Math.PI * 0.84; ctx.moveTo(Math.cos(an) * 5, 6 + Math.sin(an) * 4); ctx.lineTo(Math.cos(an) * 61, Math.sin(an) * 45); } ctx.stroke();
  ctx.beginPath(); for (let i = 0; i <= N; i++) { const p = orilla(i, 1.02); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.lineWidth = 8; ctx.lineJoin = 'round'; ctx.strokeStyle = cap; ctx.stroke();
  ctx.fillStyle = lam; ctx.beginPath(); ctx.moveTo(-9, 2); ctx.quadraticCurveTo(-8, 12, -4, 17); ctx.lineTo(7, 17); ctx.quadraticCurveTo(10, 12, 9, 2); ctx.closePath(); ctx.fill();
  ctx.restore();
}
// Racimo de setas en repisa sobre madera.
function racimo(ctx, x, y, s, tono = 'rosa', a = 1, T = 0) {
  const P = [[-70, 6, 0.95, -0.42, 2], [78, 10, 0.9, 0.46, 3], [-22, -52, 1.12, -0.12, 5], [50, -66, 0.82, 0.3, 7], [0, 20, 1.35, 0.03, 1]];
  P.forEach(([dx, dy, k, rot, sd], i) => abanico(ctx, x + dx * s, y + dy * s, s * k, rot + Math.sin(T * 0.6 + i) * 0.012, tono, sd, a));
}
// Seta en corte lateral, partida en dos mitades que se separan (abre 0..1). Por fuera piel de color; por dentro tejido claro.
function setaPartida(ctx, x, y, s, abre, tono = 'rosa') {
  const [cap, , lin] = TONOS[tono];
  for (const d of [-1, 1]) { ctx.save(); ctx.translate(x + d * abre * 60 * s, y); ctx.rotate(d * abre * 0.07); ctx.scale(d * s, s);
    ctx.beginPath(); ctx.moveTo(0, -150); ctx.bezierCurveTo(100, -165, 230, -120, 250, -40); ctx.quadraticCurveTo(150, -62, 74, -6); ctx.quadraticCurveTo(54, 60, 50, 150); ctx.lineTo(0, 150); ctx.closePath();
    ctx.fillStyle = '#FBEFE6'; ctx.fill(); ctx.strokeStyle = cap; ctx.lineWidth = 10; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(0, -150); ctx.bezierCurveTo(100, -165, 230, -120, 250, -40); ctx.stroke();
    ctx.strokeStyle = lin; ctx.lineWidth = 3; ctx.beginPath(); for (let i = 0; i < 9; i++) { const u = i / 8; ctx.moveTo(mixn(244, 80, u), mixn(-42, -10, u) - 20 * Math.sin(u * Math.PI)); ctx.lineTo(mixn(238, 74, u), mixn(-30, 6, u) - 20 * Math.sin(u * Math.PI)); } ctx.stroke();
    ctx.strokeStyle = cap; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(74, -6); ctx.quadraticCurveTo(54, 60, 50, 150); ctx.stroke();
    // fibras del tejido interno (se ve desgarrado, no cortado)
    ctx.strokeStyle = 'rgba(214,180,170,.6)'; ctx.lineWidth = 1.5; ctx.beginPath(); for (let i = 0; i < 12; i++) { const yy = -130 + i * 23; ctx.moveTo(2, yy); ctx.lineTo(10 + (i % 3) * 7, yy + 6); } ctx.stroke();
    ctx.restore(); }
}
// Champiñón (Agaricus bisporus) de lado. tono: 0 blanco … 1 café (silvestre). cafe: mancha de oscurecimiento (0..1).
function champi(ctx, x, y, s, tono = 0, a = 1, cafe = 0) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = mixc('#EFE9DC', '#d9c9a6', tono); ctx.beginPath(); ctx.roundRect(-22, -30, 44, 70, 14); ctx.fill();
  ctx.fillStyle = mixc('#FAF6EC', '#9a6a3c', tono); ctx.beginPath(); ctx.moveTo(-74, -22); ctx.bezierCurveTo(-74, -92, 74, -92, 74, -22); ctx.quadraticCurveTo(0, -4, -74, -22); ctx.fill();
  ctx.fillStyle = 'rgba(120,90,60,.22)'; ctx.beginPath(); ctx.ellipse(0, -20, 60, 7, 0, 0, TAU); ctx.fill();
  if (cafe > 0) { ctx.fillStyle = rgba('#7a4a22', 0.75 * cafe); ctx.beginPath(); ctx.ellipse(-18, -52, 30, 18, -0.3, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(30, -40, 18, 11, 0.3, 0, TAU); ctx.fill(); }
  ctx.restore();
}
// Grano de cereal (cariópside) con surco. m: cuánto micelio lo cubre (0..1).
function grano(ctx, x, y, s, rot, m = 0, seed = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = mixc('#b8873f', '#e8e2d2', m * 0.72); ctx.beginPath(); ctx.ellipse(0, 0, 15, 8.5, 0, 0, TAU); ctx.fill();
  ctx.strokeStyle = mixc('#7a5522', '#cfc7b4', m * 0.8); ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(-11, 0); ctx.quadraticCurveTo(0, 2.5, 11, 0); ctx.stroke();
  if (m > 0.02) { const R = rng(seed * 7 + 1); ctx.strokeStyle = rgba(MIC, 0.6 * m); ctx.lineWidth = 0.8; ctx.beginPath(); for (let i = 0; i < 16; i++) { const an = R() * TAU, r0 = 9 + R() * 4, r1 = r0 + (5 + R() * 9) * m; ctx.moveTo(Math.cos(an) * r0 * 1.4, Math.sin(an) * r0 * 0.8); ctx.lineTo(Math.cos(an + 0.3) * r1 * 1.4, Math.sin(an + 0.3) * r1 * 0.9); } ctx.stroke(); }
  ctx.restore();
}
function granos(ctx, x, y, w, h, m, seed = 4, s = 1, frente = null) { // montón de granos en un rectángulo; frente(x,y) → 0..1 cuánto micelio en ese punto
  const R = rng(seed), nx = Math.max(2, Math.round(w / (27 * s))), ny = Math.max(2, Math.round(h / (17 * s)));
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const gx = x + (i + 0.5 + (j % 2) * 0.5 - 0.25 + (R() - 0.5) * 0.4) * w / nx, gy = y + (j + 0.5 + (R() - 0.5) * 0.4) * h / ny; grano(ctx, gx, gy, s * 0.86, R() * 3.1, frente ? frente(gx, gy) : m, i * 31 + j); }
}
// Bolsa de inóculo en grano: plástico transparente con filtro, granos y micelio (m 0..1 = colonización).
function bolsa(ctx, x, y, s, m, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(o.rot || 0); ctx.scale(s, s); const W = 200, H = 270;
  const P = () => { ctx.beginPath(); ctx.moveTo(-W + 26, -H); ctx.lineTo(W - 26, -H); ctx.lineTo(W, -H + 80); ctx.lineTo(W - 6, H - 50); ctx.quadraticCurveTo(W - 10, H, W - 60, H); ctx.lineTo(-W + 60, H); ctx.quadraticCurveTo(-W + 10, H, -W + 6, H - 50); ctx.lineTo(-W, -H + 80); ctx.closePath(); };
  P(); ctx.fillStyle = 'rgba(190,210,235,.07)'; ctx.fill();
  ctx.save(); P(); ctx.clip(); granos(ctx, -W, -H + 150, W * 2, H * 2 - 150, m, o.seed || 4, 1.25);
  if (m > 0.02) { ctx.globalCompositeOperation = 'lighter'; const R = rng(12); for (let i = 0; i < 46; i++) halo(ctx, (R() - 0.5) * W * 1.9, -H + 160 + R() * (H * 2 - 170), 40 + R() * 40, MIC, 0.13 * m); ctx.globalCompositeOperation = 'source-over'; }
  ctx.restore();
  P(); ctx.strokeStyle = 'rgba(215,230,250,.5)'; ctx.lineWidth = 3; ctx.stroke();
  ctx.strokeStyle = 'rgba(215,230,250,.35)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-W + 20, -H + 22); ctx.lineTo(W - 20, -H + 22); ctx.moveTo(-W + 16, -H + 34); ctx.lineTo(W - 16, -H + 34); ctx.stroke();
  ctx.fillStyle = 'rgba(240,240,236,.82)'; ctx.fillRect(-46, -H + 62, 92, 56); ctx.strokeStyle = 'rgba(150,160,175,.7)'; ctx.lineWidth = 1; for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(-46 + i * 15.3, -H + 62); ctx.lineTo(-46 + i * 15.3, -H + 118); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-W + 30, -H + 110); ctx.lineTo(-W + 26, H - 90); ctx.stroke();
  ctx.restore();
}
// Frasco con granos que se colonizan desde arriba (m 0..1).
function frascoGrano(ctx, x, y, w, h, m, seed = 6) {
  ctx.save(); ctx.beginPath(); ctx.roundRect(x - w / 2 + 4, y - h * 0.78, w - 8, h * 0.78 - 4, w * 0.08); ctx.clip();
  const y0 = y - h * 0.78; granos(ctx, x - w / 2, y0, w, h * 0.78, 0, seed, w / 190, (gx, gy) => cl((m * 1.25 * h * 0.78 - (gy - y0)) / (h * 0.2)));
  ctx.restore(); frasco(ctx, x, y, w, h, 1);
}
// Pinzas de punta fina (cerradas k = 1) con la punta en (x, y).
function pinzas(ctx, x, y, an, k = 1, a = 1, largo = 330) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a); ctx.translate(x, y); ctx.rotate(an); ctx.lineCap = 'round'; for (const d of [-1, 1]) { const g = ctx.createLinearGradient(0, 0, largo, 0); g.addColorStop(0, '#eef2f7'); g.addColorStop(1, '#7c8797'); ctx.strokeStyle = g; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, d * (1 - k) * 13 + d * 1.5); ctx.quadraticCurveTo(largo * 0.5, d * 20, largo, d * 5); ctx.stroke(); } ctx.restore(); }
function bisturi(ctx, x, y, an, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a); ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = '#dfe6ee'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(34, -22, 78, -12); ctx.lineTo(78, 6); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#6f7b8c'; ctx.beginPath(); ctx.roundRect(76, -12, 250, 20, 6); ctx.fill(); ctx.restore(); }
// Tubo de ensayo vertical con tapón; base en (x, y). contenido(ctx) dibuja dentro (ya recortado).
function tubo(ctx, x, y, w, h, contenido, a = 1, tapon = '#3b4252') {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a);
  const P = () => { ctx.beginPath(); ctx.moveTo(x - w / 2, y - h); ctx.lineTo(x - w / 2, y - w / 2); ctx.arc(x, y - w / 2, w / 2, Math.PI, 0, true); ctx.lineTo(x + w / 2, y - h); ctx.closePath(); };
  P(); ctx.fillStyle = 'rgba(150,180,215,.07)'; ctx.fill(); if (contenido) { ctx.save(); P(); ctx.clip(); contenido(ctx); ctx.restore(); }
  P(); ctx.strokeStyle = 'rgba(210,226,246,.5)'; ctx.lineWidth = Math.max(1.5, w * 0.05); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = Math.max(1.5, w * 0.08); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - w * 0.28, y - h * 0.86); ctx.lineTo(x - w * 0.28, y - h * 0.3); ctx.stroke();
  ctx.fillStyle = tapon; ctx.beginPath(); ctx.roundRect(x - w * 0.62, y - h - w * 0.5, w * 1.24, w * 0.62, w * 0.14); ctx.fill(); ctx.restore();
}
// Basidio: célula en garrote con 4 esterigmas y 4 esporas alargadas (Pleurotus: oblongo-cilíndricas). esp 0..1 = esporas formadas.
function basidio(ctx, x, y, s, esp = 1, a = 1, o = {}) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-9, 100); ctx.bezierCurveTo(-11, 40, -34, 10, -34, -30); ctx.bezierCurveTo(-34, -74, 34, -74, 34, -30); ctx.bezierCurveTo(34, 10, 11, 40, 9, 100); ctx.closePath();
  ctx.fillStyle = o.dentro || '#141d2c'; ctx.fill(); ctx.strokeStyle = 'rgba(232,238,246,.86)'; ctx.lineWidth = 3; ctx.stroke();
  const E = [[-25, -58, -0.5], [-9, -64, -0.14], [9, -64, 0.14], [25, -58, 0.5]]; ctx.lineCap = 'round';
  E.forEach(([ex, ey, an], i) => { const k = cl(esp * 1.3 - i * 0.05); if (k <= 0) return; const tx = ex + Math.sin(an) * 20 * cl(k * 2), ty = ey - Math.cos(an) * 20 * cl(k * 2);
    ctx.strokeStyle = 'rgba(232,238,246,.86)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(tx, ty); ctx.stroke();
    const kk = cl(k * 2 - 1); if (kk > 0 && !(o.sinEsporas)) { ctx.save(); ctx.translate(tx + Math.sin(an) * 15 * kk, ty - Math.cos(an) * 15 * kk); ctx.rotate(an); ctx.fillStyle = o.cesp || '#F7D9E2'; ctx.beginPath(); ctx.ellipse(0, 0, 7.5 * kk, 16 * kk, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); } });
  ctx.restore(); return E;
}
function espora(ctx, x, y, s, rot, c = '#F7D9E2', a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(0, 0, 16 * s, 7.5 * s, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); }
// Lupa: círculo con borde; dentro(ctx) dibuja con origen en el centro. La guía sale de (ox, oy).
function lupa(ctx, x, y, r, a, dentro, o = {}) {
  if (a <= 0.004) return; if (o.ox != null) guia(ctx, o.ox, o.oy, x + (o.ox < x ? -r : r) * 0.72, y + (o.oy < y ? -r : r) * 0.68, a, o.c || '#ffffff');
  ctx.save(); ctx.globalAlpha *= cl(a); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = o.fondo || '#070b13'; ctx.fill(); ctx.save(); ctx.clip(); ctx.translate(x, y); dentro(ctx); ctx.restore();
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.strokeStyle = 'rgba(226,236,250,.85)'; ctx.lineWidth = 5; ctx.stroke(); ctx.restore();
}
// Tarjeta de estudio: año grande, quién y dónde.
function estudio(ctx, x, y, anio, quien, donde, a = 1, c = LUZC.oro, w = 560) {
  a = cl(a); if (a <= 0.004) return; caja(ctx, x, y, w, 150, 'rgba(8,10,16,.78)', a, 16, rgba(c, 0.6)); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = c; ctx.fillRect(x, y + 16, 5, 118); ctx.restore();
  txt(ctx, anio, x + 28, y + 96, { s: 76, f: 'serif', w: 500, c, a }); const ax = x + 28 + 46 * String(anio).length + 20;
  rico(ctx, quien, ax, y + 66, { s: 30, f: 'sans', w: 600, a }); rico(ctx, donde, ax, y + 106, { s: 20, f: 'mono', w: 700, ls: 2, c: GRIS, a: a * 0.95 });
}
// Red de hifas tenue al fondo, para que las escenas de microscopio no queden vacías.
function fondoMicelio(ctx, seed, a = 0.16, x = 960, y = 540) { ctx.save(); ctx.translate(x, y); pintaRed(ctx, red('fm' + seed, { seed, radio: 1150, brotes: 9, rama: 0.06, paso: 11, celda: 14, max: 5200 }), 1, '#7f95c0', { a, esc: 1.3, puntas: false }); ctx.restore(); }
function mesa(ctx, y, c0 = '#241a12', c1 = '#120d09') { const g = ctx.createLinearGradient(0, y, 0, 1080); g.addColorStop(0, c0); g.addColorStop(1, c1); ctx.fillStyle = g; ctx.fillRect(0, y, 1920, 1080 - y); ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.fillRect(0, y, 1920, 3); }
// Partículas que caen (esporas en polvo). n, área y ritmo deterministas.
function lluvia(ctx, x, y, w, h, n, T, seed, c, a = 1, s = 2) { const R = rng(seed); for (let i = 0; i < n; i++) { const px = x + R() * w + Math.sin(T * (0.5 + R()) + i) * 10, v = 26 + R() * 40, py = y + ((R() * h + T * v) % h), k = 1 - Math.abs(((py - y) / h) * 2 - 1); disco(ctx, px, py, s * (0.6 + R()), c, a * (0.25 + 0.6 * k)); } }

/* ====== 00 · Gancho ====== */
// La bolsa de inóculo. Abre el documental y regresa en el cierre (misma imagen, ya transformada).
function escenaBolsa(ctx, e, m, z, zx = 960, zy = 560) {
  noche(ctx, '#1c130d', '#0b0806'); halo(ctx, 960, 420, 900, '#ffcf8a', 0.10); mesa(ctx, 812);
  const fin = cam(ctx, z, zx, zy);
  ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.beginPath(); ctx.ellipse(960, 826, 290, 24, 0, 0, TAU); ctx.fill();
  bolsa(ctx, 960, 500, 1.2, m, { rot: Math.sin(e.T * 0.5) * 0.006 });
  return fin;
}
LUZ.bolsa = (ctx, e) => {
  const t = e.tl, zin = ss(t, e.L(1) - 0.6, e.L(1) + 2.2) * (1 - ss(t, e.L(4) - 0.4, e.L(4) + 1.6)), z = mixn(1, 3.4, zin), cae = eo(t, 0, 0.7);
  ctx.save(); ctx.translate(0, (1 - cae) * -60);
  const fin = escenaBolsa(ctx, e, mixn(0.12, 1, eo(t, 0, 5.5)), z, mixn(960, 990, zin), mixn(540, 640, zin));
  // al acercarse: hifas entre los granos
  if (zin > 0.05) { ctx.save(); ctx.translate(990, 640); ctx.scale(0.3, 0.3); pintaRed(ctx, red('bolsaZ', { seed: 23, radio: 520, brotes: 11, rama: 0.11, paso: 7, max: 7000 }), eo(t, e.L(1), e.L(1) + 6), MIC, { a: zin * 0.95, esc: 1.2 }); ctx.restore(); }
  fin(); ctx.restore();
  const fuera = 1 - zin;
  // lo que le dicen / lo que es
  const a0 = ss(t, 0.5, 1.2) * (1 - ss(t, e.L(1) - 0.8, e.L(1)));
  txt(ctx, 'LE DICEN', 110, 330, { s: 24, f: 'mono', w: 700, ls: 6, c: GRIS, a: a0 }); titulo(ctx, '«semilla de hongo»', 110, 400, a0, { s: 60, al: 'left' });
  if (a0 > 0) { const k = ss(t, 2.2, 3.0); linea(ctx, 110, 384, 110 + 500 * k, 384, ROJO, 5, a0 * (k > 0 ? 1 : 0)); }
  rotulo(ctx, 120, 560, 'Grano de cereal', 'CUBIERTO POR UN HONGO VIVO', ss(t, 3.4, 4.2) * (1 - ss(t, e.L(1) - 0.8, e.L(1))), { c: CB });
  { const am = en(e, 1, 0.8, 1.6) * (1 - en(e, 2, 0.5)); caja(ctx, 1240, 250, 520, 150, 'rgba(6,8,12,.82)', am, 16); rotulo(ctx, 1280, 330, 'Micelio', 'EL CUERPO DEL HONGO', am, { c: MIC, s: 60 }); }
  if (en(e, 2) > 0 && fuera < 0.95) { const a = en(e, 2, 0.8) * (1 - ss(t, e.L(4) - 0.5, e.L(4))); oscurece(ctx, 0.62 * a); titulo(ctx, 'una cepa', 960, 500, a, { s: 150, c: CB });
    chip(ctx, 'UN LINAJE AISLADO · SE MANTIENE POR COPIAS', 960, 610, { al: 'center', c: MIC, s: 24, a: en(e, 3, 0.7) * (1 - ss(t, e.L(4) - 0.5, e.L(4))) }); }
  // las dos preguntas del video
  const a5 = en(e, 5, 0.8);
  if (a5 > 0) { racimo(ctx, 330, 500, 0.9, 'rosa', a5, e.T); flecha(ctx, 330, 570, 330, 650, en(e, 5, 0.6, 0.6), MIC); placa(ctx, 330, 740, 76, en(e, 5, 0.6, 1)); colonia(ctx, 'g0', 330, 740, 66, eo(t, e.L(5) + 1.2, e.L(5) + 4.5), { seed: 3 });
    txt(ctx, 'COPIAR', 330, 290, { s: 26, f: 'mono', w: 700, ls: 8, al: 'center', c: ROSA, a: a5 });
    const b = en(e, 5, 0.8, 2.4), jx = eo(t, e.L(5) + 2.8, e.L(5) + 5.2) * 70; txt(ctx, 'CRUZAR', 1590, 290, { s: 26, f: 'mono', w: 700, ls: 8, al: 'center', c: CA, a: b });
    hifa(ctx, [[1400, 470], [1500 + jx, 500]], 34, b, { a: b }); hifa(ctx, [[1790, 600], [1690 - jx, 560]], 34, b, { a: b }); nucleo(ctx, 1450 + jx * 0.7, 485, 11, CA, b); nucleo(ctx, 1740 - jx * 0.7, 580, 11, CB, b);
    txt(ctx, 'SIN MACHOS NI HEMBRAS', 1590, 700, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: GRIS, a: en(e, 5, 0.7, 3.4) }); }
};

/* ====== 01 · La «semilla» que no es semilla ====== */
function huella(ctx, x, y, r, g, a = 1) { // huella de esporas de una seta en abanico: rayitas radiales (las láminas) en polvo crema-rosado
  if (g <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a); ctx.translate(x, y); const R = rng(77); ctx.lineCap = 'round';
  for (let i = 0; i < 64; i++) { const an = -Math.PI * 0.06 - (i / 63) * Math.PI * 0.88, l = r * (0.9 + 0.1 * Math.sin(i * 1.3)); ctx.strokeStyle = `rgba(246,214,214,${(0.25 + 0.5 * R()) * cl(g * 1.4 - R() * 0.4)})`; ctx.lineWidth = 2.2 + R() * 2.4; ctx.beginPath(); ctx.moveTo(Math.cos(an) * r * 0.12, Math.sin(an) * r * 0.1); ctx.lineTo(Math.cos(an) * l, Math.sin(an) * l * 0.78); ctx.stroke(); }
  ctx.restore(); halo(ctx, x, y - r * 0.35, r * 1.2, '#f6d6d6', 0.10 * g * a);
}
LUZ.esporas = (ctx, e) => {
  noche(ctx, '#0b0a12', '#07070c'); const t = e.tl, T = e.T;
  tronco(ctx, 150, 520, 760, 150, 0.3, 9); racimo(ctx, 530, 470, 1.9, 'rosa', eo(t, 0, 0.6), T);
  // la semilla que no existe
  const s0 = ss(t, 0.2, 0.8) * (1 - en(e, 2, 0.6));
  ctx.save(); ctx.globalAlpha = s0; ctx.translate(1380, 400); ctx.rotate(-0.3); ctx.fillStyle = '#9a6a35'; ctx.beginPath(); ctx.moveTo(0, -90); ctx.bezierCurveTo(70, -50, 70, 60, 0, 90); ctx.bezierCurveTo(-70, 60, -70, -50, 0, -90); ctx.fill(); ctx.strokeStyle = '#6b4520'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, -70); ctx.quadraticCurveTo(14, 0, 0, 70); ctx.stroke(); ctx.restore();
  tache(ctx, 1380, 400, 140, ss(t, 0.9, 1.6) * s0); txt(ctx, 'LOS HONGOS NO HACEN SEMILLAS', 1380, 610, { s: 24, f: 'mono', w: 700, ls: 5, al: 'center', c: ROJO, a: ss(t, 1.2, 1.9) * s0 });
  // esporas: polvo fino que cae de las láminas
  const a1 = en(e, 1, 0.8); if (a1 > 0) lluvia(ctx, 330, 500, 400, 260, 150, T, 5, '#f8dfe2', a1 * 0.9, 1.6);
  rotulo(ctx, 200, 800, 'Esporas', 'POLVO MICROSCÓPICO', a1, { c: ROSA });
  const a2 = en(e, 2, 0.8); if (a2 > 0) { caja(ctx, 1090, 180, 600, 470, '#040406', a2, 10, 'rgba(255,255,255,.14)'); huella(ctx, 1390, 560, 290, eo(t, e.L(2) + 0.3, e.L(2) + 3.6), a2);
    txt(ctx, 'HUELLA DE ESPORAS', 1390, 700, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: GRIS, a: a2 }); chip(ctx, 'CIENTOS DE MILES O MILLONES', 1390, 760, { al: 'center', c: ROSA, s: 24, a: en(e, 2, 0.7, 1.4) }); }
};
LUZ.inoculo = (ctx, e) => {
  noche(ctx, '#17110b', '#0a0806'); mesa(ctx, 770); const t = e.tl;
  // esporas: no es lo que se suele sembrar
  const a0 = ss(t, 0.1, 0.8); caja(ctx, 150, 330, 330, 260, '#040406', a0, 10, 'rgba(255,255,255,.14)'); huella(ctx, 315, 545, 150, 1, a0); tache(ctx, 315, 460, 120, ss(t, 1.0, 1.8), ROJO);
  txt(ctx, 'ESPORAS', 315, 650, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: GRIS, a: a0 });
  flecha(ctx, 520, 460, 690, 460, ss(t, 1.6, 2.4), MIC, 4);
  frascoGrano(ctx, 880, 770, 300, 470, eo(t, 1.8, 9)); halo(ctx, 880, 520, 420, MIC, 0.07 * eo(t, 2, 9));
  rotulo(ctx, 1110, 400, 'Micelio sobre grano', 'ESO ES LO QUE SE SIEMBRA', ss(t, 2.6, 3.4), { c: MIC });
  const a1 = en(e, 1, 0.7);
  rico(ctx, '*spawn*', 1130, 560, { s: 76, f: 'serif', w: 500, a: a1 }); txt(ctx, 'EN INGLÉS', 1134, 496, { s: 20, f: 'mono', w: 700, ls: 5, c: GRIS, a: a1 });
  txt(ctx, 'EN MÉXICO', 1134, 640, { s: 20, f: 'mono', w: 700, ls: 5, c: GRIS, a: en(e, 1, 0.7, 1.2) }); rico(ctx, '«semilla» o inóculo', 1130, 706, { s: 66, f: 'serif', w: 500, c: CB, a: en(e, 1, 0.7, 1.2) });
};
LUZ.sinden = (ctx, e) => {
  noche(ctx, '#1a140d', '#0c0906'); const t = e.tl;
  txt(ctx, '≈ 1930', 150, 300, { s: 170, f: 'serif', w: 500, c: CB, a: ss(t, 0.1, 0.9) });
  rotulo(ctx, 160, 400, 'James Sinden', 'FITOPATÓLOGO · PENN STATE', ss(t, 0.8, 1.6), { c: CB });
  // cosechas disparejas: camas de champiñón con muy distinta producción
  const N = [7, 2, 5, 1, 6, 3], a0 = ss(t, 2.4, 3.2) * (1 - en(e, 1, 0.6) * 0.75);
  N.forEach((n, i) => { const x = 150 + i * 150, y = 770; caja(ctx, x, y - 26, 134, 40, '#3a2a1a', a0, 6); for (let k = 0; k < n; k++) { const ap = ss(t, 3 + i * 0.3 + k * 0.12, 3.5 + i * 0.3 + k * 0.12); champi(ctx, x + 20 + (k % 4) * 32, y - 34 - Math.floor(k / 4) * 44, 0.3 * ap, 0, a0); } });
  txt(ctx, 'COSECHAS DISPAREJAS', 590, 830, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: GRIS, a: a0 * ss(t, 4.4, 5.2) });
  // el experimento: micelio sobre granos de cereal
  const a1 = en(e, 1, 0.8); if (a1 > 0) { ctx.save(); ctx.globalAlpha = a1; frascoGrano(ctx, 1220, 770, 280, 440, eo(t, e.L(1) + 0.6, e.L(3) + 3)); ctx.restore(); halo(ctx, 1220, 540, 400, MIC, 0.06 * a1);
    txt(ctx, 'MICELIO SOBRE GRANOS DE CEREAL', 1220, 830, { s: 22, f: 'mono', w: 700, ls: 5, al: 'center', c: MIC, a: a1 }); }
  const a2 = en(e, 2, 0.8); rico(ctx, '«…en una semana', 1440, 330, { s: 46, f: 'serif', it: true, w: 400, a: a2 }); rico(ctx, 'estaba convencido»', 1440, 396, { s: 46, f: 'serif', it: true, w: 400, a: a2 });
  txt(ctx, 'J. SINDEN, CITADO POR PENN STATE', 1444, 446, { s: 18, f: 'mono', w: 700, ls: 3, c: GRIS, a: a2 });
  sello(ctx, 'PATENTE · 1932', 1630, 590, en(e, 3, 0.5), CB, -0.07, 40);
  chip(ctx, 'HOY: CASI TODA LA «SEMILLA» COMERCIAL', 1870, 720, { al: 'right', c: MIC, s: 20, a: en(e, 3, 0.7, 1.6) });
};
LUZ.dosvias = (ctx, e) => {
  noche(ctx, '#15110f', '#08070a'); const t = e.tl, a1 = en(e, 1, 0.8), sube = eo(t, e.L(1) - 0.2, e.L(1) + 1.2);
  bolsa(ctx, 960, mixn(450, 270, sube), mixn(0.85, 0.42, sube), 1);
  rotulo(ctx, 1230, 380, 'El grano', 'SOLO ES EL VEHÍCULO', ss(t, 0.3, 1.1) * (1 - a1), { c: GRIS });
  rotulo(ctx, 1230, 540, 'La cepa', 'ES LO VALIOSO', ss(t, 1.6, 2.4) * (1 - a1), { c: CB });
  if (a1 > 0) { flecha(ctx, 900, 400, 520, 500, en(e, 1, 0.8, 0.4), ROSA, 4); flecha(ctx, 1020, 400, 1400, 500, en(e, 1, 0.8, 2.6), CA, 4);
    const b = en(e, 1, 0.7, 0.9); titulo(ctx, 'Copiar', 470, 590, b, { s: 80, c: ROSA }); abanico(ctx, 350, 740, 1.2, -0.1, 'rosa', 2, b); flecha(ctx, 440, 710, 520, 710, en(e, 1, 0.5, 1.5), MIC); placa(ctx, 610, 710, 76, b); colonia(ctx, 'dv', 610, 710, 66, eo(t, e.L(1) + 1.6, e.L(1) + 5), { seed: 4 });
    const c = en(e, 1, 0.7, 3.1); titulo(ctx, 'Cruzar', 1450, 590, c, { s: 80, c: CA }); placa(ctx, 1450, 720, 100, c); const g = eo(t, e.L(1) + 3.4, e.L(1) + 6.4);
    ctx.save(); ctx.beginPath(); ctx.arc(1450, 720, 94, 0, TAU); ctx.clip(); colonia(ctx, 'dvA', 1402, 720, 60, g, { seed: 9, c: '#d9e9ff' }); colonia(ctx, 'dvB', 1498, 720, 60, g, { seed: 12, c: '#ffeec9' }); ctx.restore();
    chip(ctx, 'SOBRE TODO · HAY MÁS VÍAS', 960, 842, { al: 'center', c: GRIS, s: 18, a: en(e, 1, 0.7, 4.2) }); }
};

/* ====== 02 · Copiar una seta ====== */
LUZ.seta = (ctx, e) => {
  noche(ctx, '#1f0f18', '#0c070b'); const t = e.tl, T = e.T, a2 = en(e, 2, 0.9), z = mixn(1, 1.08, e.p);
  halo(ctx, 700, 420, 800, ROSA, 0.08);
  const fin = cam(ctx, z, 960, 520); ctx.save(); ctx.globalAlpha = 1 - a2; tronco(ctx, 180, 560, 1000, 190, 0.32, 4); racimo(ctx, 660, 520, 2.5, 'rosa', eo(t, 0, 0.7), T); ctx.restore(); fin();
  rotulo(ctx, 1260, 380, 'Seta rosa', '*Pleurotus djamor*', en(e, 1, 0.8) * (1 - a2), { c: ROSA });
  chip(ctx, 'SANA Y FRESCA', 1280, 480, { c: MIC, s: 22, a: en(e, 1, 0.7, 1.4) * (1 - a2) });
  if (a2 > 0) { const abre = eo(t, e.L(2) + 0.8, e.L(2) + 3.2); ctx.save(); ctx.globalAlpha = a2; setaPartida(ctx, 960, 520, 1.5, abre, 'rosa');
    // por fuera: polvo y microbios (puntitos sobre la piel)
    const R = rng(31); for (const d of [-1, 1]) for (let i = 0; i < 16; i++) { const u = 0.08 + R() * 0.9, v = 1 - u, bx = 3 * v * u * u * 230 + 3 * v * v * u * 100 + u * u * u * 250, by = v * v * v * -150 + 3 * v * v * u * -165 + 3 * v * u * u * -120 + u * u * u * -40, px = 960 + d * (abre * 90 + bx * 1.5), py = 520 + by * 1.5 - 8 - R() * 8; disco(ctx, px, py, 3 + R() * 3, ['#8fd36a', '#d9b45a', '#9aa7ff'][i % 3], 0.9); }
    ctx.restore();
    flecha(ctx, 880, 300, 760, 300, en(e, 2, 0.6, 0.8), MIC, 5); flecha(ctx, 1040, 300, 1160, 300, en(e, 2, 0.6, 0.8), MIC, 5);
    chip(ctx, 'SE JALA CON LAS MANOS · SIN CUCHILLO', 960, 200, { al: 'center', c: MIC, s: 22, a: en(e, 2, 0.6, 0.6) });
    guia(ctx, 1345, 350, 1400, 262, en(e, 2, 0.6, 3.0), '#d9b45a'); txt(ctx, 'POR FUERA: POLVO Y MICROBIOS', 1330, 240, { s: 21, f: 'mono', w: 700, ls: 3, c: '#d9b45a', a: en(e, 2, 0.6, 3.2) });
    guia(ctx, 1020, 560, 1330, 680, en(e, 2, 0.6, 4.6), MIC); txt(ctx, 'POR DENTRO: TEJIDO LIMPIO', 1340, 690, { s: 21, f: 'mono', w: 700, ls: 3, c: MIC, a: en(e, 2, 0.6, 4.8) }); }
};
// Campana de flujo laminar (esquema): marco, filtro arriba y aire filtrado que baja.
function campana(ctx, T, a = 1, aire = 1) {
  ctx.save(); ctx.globalAlpha *= a; caja(ctx, 250, 120, 1220, 80, '#2a3342', 1, 10); ctx.fillStyle = 'rgba(160,190,225,.5)'; for (let i = 0; i < 40; i++) ctx.fillRect(268 + i * 30, 132, 14, 56);
  ctx.strokeStyle = '#3a4558'; ctx.lineWidth = 18; ctx.beginPath(); ctx.moveTo(259, 200); ctx.lineTo(259, 800); ctx.moveTo(1461, 200); ctx.lineTo(1461, 800); ctx.stroke(); caja(ctx, 230, 790, 1260, 26, '#2a3342', 1, 6);
  ctx.fillStyle = 'rgba(140,175,215,.05)'; ctx.fillRect(268, 200, 1184, 590);
  ctx.strokeStyle = `rgba(170,205,245,${0.22 * aire})`; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.setLineDash([26, 44]); ctx.lineDashOffset = -T * 90; for (let i = 0; i < 12; i++) { ctx.beginPath(); ctx.moveTo(330 + i * 98, 214); ctx.lineTo(330 + i * 98, 600); ctx.stroke(); } ctx.setLineDash([]); ctx.restore();
}
LUZ.campana = (ctx, e) => {
  noche(ctx, '#0d1420', '#070a10'); const t = e.tl, T = e.T; campana(ctx, T, 1, 0.6 + 0.4 * en(e, 2)); esquema(ctx, 1);
  // media seta abierta, a la izquierda
  ctx.save(); ctx.translate(560, 650); ctx.rotate(-0.5); setaPartida(ctx, 0, 0, 0.62, 1, 'rosa'); ctx.restore();
  // caja con agar, de lado
  const a1 = en(e, 1, 0.8), px = 1080, py = 740;
  ctx.save(); ctx.globalAlpha = Math.max(0.35, a1); caja(ctx, px - 190, py - 20, 380, 30, 'rgba(214,170,96,.42)', 1, 5); ctx.strokeStyle = 'rgba(210,226,246,.6)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px - 196, py - 46); ctx.lineTo(px - 196, py + 12); ctx.lineTo(px + 196, py + 12); ctx.lineTo(px + 196, py - 46); ctx.stroke(); ctx.restore();
  // tapa de la caja: levantada apenas lo necesario
  const tapa = 1 - ss(t, e.L(1) + 3.6, e.L(1) + 4.6); ctx.save(); ctx.globalAlpha = Math.max(0.35, a1); ctx.translate(px + 196, py - 56 - 120 * tapa); ctx.strokeStyle = 'rgba(210,226,246,.55)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-398, 18); ctx.lineTo(-398, 0); ctx.lineTo(6, 0); ctx.lineTo(6, 18); ctx.stroke(); ctx.restore();
  // pinzas: bajan a la seta, toman un pedacito y lo llevan al agar
  const k1 = ss(t, 0.3, 2.0), k2 = ss(t, e.L(1) + 0.4, e.L(1) + 2.8), k3 = ss(t, e.L(1) + 3.0, e.L(1) + 3.8);
  const sx = 520, sy = 640, tx = mixn(mixn(760, sx, k1), px, k2) + k3 * 180, ty = mixn(mixn(360, sy, k1), py - 26, k2) - Math.sin(k2 * Math.PI) * 190 - k3 * 240;
  const tiene = k1 >= 0.98 && k2 < 0.98, puesto = k2 >= 0.98;
  if (tiene) caja(ctx, tx - 9, ty - 9, 18, 18, '#FBEFE6', 1, 3); if (puesto) caja(ctx, px - 9, py - 35, 18, 18, '#FBEFE6', 1, 3);
  pinzas(ctx, tx, ty, -1.05, k1 > 0.9 && k2 < 0.99 ? 1 : 0.2, 1 - ss(t, e.L(1) + 3.8, e.L(1) + 4.4));
  chip(ctx, 'PINZAS ESTÉRILES', 760, 300, { c: MIC, s: 20, a: ss(t, 0.4, 1.1) * (1 - a1) }); chip(ctx, 'PEDACITO: 2 A 5 mm', 300, 440, { c: ROSA, s: 22, a: ss(t, 2.2, 2.9) * (1 - en(e, 3)) });
  rotulo(ctx, 1290, 690, 'Agar', 'GELATINA CON NUTRIENTES', a1 * (1 - en(e, 3, 0.6)), { c: CB, s: 40 });
  const a2 = en(e, 2, 0.8); txt(ctx, 'CAMPANA DE FLUJO LAMINAR', 860, 262, { s: 30, f: 'mono', w: 700, ls: 8, al: 'center', c: '#bcd6f5', a: a2 }); txt(ctx, 'AIRE FILTRADO QUE BAJA', 860, 304, { s: 20, f: 'mono', w: 700, ls: 5, al: 'center', c: GRIS, a: en(e, 2, 0.7, 0.8) });
  txt(ctx, 'O UNA CAJA SIN CORRIENTES DE AIRE', 860, 344, { s: 20, f: 'mono', w: 700, ls: 5, al: 'center', c: GRIS, a: en(e, 2, 0.7, 2.6) });
  // lo que flota en el aire de afuera
  const a3 = en(e, 3, 0.8); if (a3 > 0) { const R = rng(9); for (let i = 0; i < 22; i++) { const x0 = 1500 + R() * 380, y0 = 150 + R() * 330, dr = (T * (12 + R() * 16)) % 60; disco(ctx, x0 - dr * 0.4, y0 + Math.sin(T + i) * 8 + dr * 0.5, 4 + R() * 4, i % 3 ? '#57b87a' : '#c9b06a', a3 * 0.8); }
    txt(ctx, 'AFUERA: ESPORAS DE MOHO', 1700, 110, { s: 18, f: 'mono', w: 700, ls: 3, al: 'center', c: '#7fd39a', a: a3 }); txt(ctx, 'Y BACTERIAS EN EL AIRE', 1700, 138, { s: 18, f: 'mono', w: 700, ls: 3, al: 'center', c: '#7fd39a', a: a3 });
    chip(ctx, 'EN EL AGAR CRECE TODO LO QUE CAIGA', 860, 420, { al: 'center', c: ROJO, s: 22, a: en(e, 3, 0.7, 1.2) }); }
};
// Puntas de hifas que crecen (vista de microscopio), origen al centro de la lupa.
function puntas(ctx, g, r = 200, septos = true) {
  const H = [[[-r, 40], [-r * 0.4, 30], [r * 0.2, -6], [r * 0.9, -30]], [[-r * 0.5, 32], [-r * 0.2, 70], [r * 0.3, 96], [r * 0.85, 110]], [[-r * 0.05, 10], [r * 0.2, -50], [r * 0.5, -100], [r * 0.8, -150]]];
  H.forEach((p, i) => hifa(ctx, p, 44, cl(g * 1.2 - i * 0.18), { septos: septos ? [0.3, 0.62] : [], punta: true }));
}
LUZ.colonia = (ctx, e) => {
  noche(ctx, '#0d0f16', '#07080c'); const t = e.tl, g = mixn(0.04, 0.82, eo(t, 0.2, e.dur));
  placa(ctx, 640, 480, 370); colonia(ctx, 'col', 640, 480, 330, g, { seed: 5 }); caja(ctx, 628, 468, 24, 24, '#FBEFE6', 1, 4);
  rotulo(ctx, 120, 800, 'Hifas', 'HILOS BLANCOS · JUNTAS FORMAN EL MICELIO', ss(t, 0.6, 1.4), { c: MIC });
  const a1 = en(e, 1, 0.7); lupa(ctx, 1420, 450, 250, a1, (c) => puntas(c, pr(t, e.L(1), e.dur + 1), 230), { ox: 640 + 330 * g, oy: 480 });
  chip(ctx, 'CRECEN SOLO POR LA PUNTA', 1420, 750, { al: 'center', c: MIC, s: 22, a: en(e, 1, 0.6, 0.8) }); chip(ctx, 'LA COLONIA AVANZA EN CÍRCULO', 1420, 810, { al: 'center', c: GRIS, s: 20, a: en(e, 1, 0.6, 1.6) });
  ctx.save(); ctx.globalAlpha = 0.5 * a1; ctx.strokeStyle = MIC; ctx.setLineDash([8, 12]); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(640, 480, 330 * g + 14, 0, TAU); ctx.stroke(); ctx.restore();
};
LUZ.transfer = (ctx, e) => {
  noche(ctx, '#0f1018', '#07080c'); const t = e.tl, y = 440, r = 215;
  // caja contaminada
  const a0 = ss(t, 0.1, 0.8), dim = 1 - 0.55 * en(e, 1, 0.8); ctx.save(); ctx.globalAlpha = dim; placa(ctx, 360, y, r, a0); colonia(ctx, 't0', 360, y, 120, 0.9 * a0, { seed: 6 }); ctx.save(); ctx.beginPath(); ctx.arc(360, y, r * 0.94, 0, TAU); ctx.clip(); moho(ctx, 470, y - 60, 150, eo(t, 0.3, 2.4), 3); moho(ctx, 280, y + 120, 80, eo(t, 0.9, 2.6), 8); ctx.restore(); ctx.restore();
  tache(ctx, 360, y, 150, ss(t, 1.4, 2.1) * dim); txt(ctx, 'CONTAMINADA: SE DESECHA', 360, y + r + 60, { s: 21, f: 'mono', w: 700, ls: 4, al: 'center', c: ROJO, a: ss(t, 1.5, 2.2) * dim });
  // caja limpia y transferencia
  const a1 = en(e, 1, 0.8); placa(ctx, 960, y, r, a1); colonia(ctx, 't1', 960, y, 172, 0.95 * a1, { seed: 14 }); caja(ctx, 951, y - 9, 18, 18, '#FBEFE6', a1, 3);
  txt(ctx, 'LIMPIA', 960, y + r + 60, { s: 21, f: 'mono', w: 700, ls: 6, al: 'center', c: CV, a: a1 });
  const L1 = e.L(1), corta = ss(t, L1 + 1.4, L1 + 2.4), viaja = ss(t, L1 + 2.8, L1 + 4.6), cx0 = 960 + 150, cy0 = y - 40, cx = mixn(cx0, 1560, viaja), cy = mixn(cy0, y, viaja) - Math.sin(viaja * Math.PI) * 150;
  placa(ctx, 1560, y, r, en(e, 1, 0.8, 1.6)); colonia(ctx, 't2', 1560, y, 190, mixn(0, 0.8, eo(t, L1 + 4.8, e.dur)), { seed: 21 });
  if (corta > 0) { ctx.save(); ctx.globalAlpha = corta; ctx.strokeStyle = CB; ctx.lineWidth = 3; ctx.strokeRect(cx0 - 15, cy0 - 15, 30, 30); ctx.restore(); if (viaja > 0) caja(ctx, cx0 - 13, cy0 - 13, 26, 26, '#10131b', 1, 2); caja(ctx, cx - 13, cy - 13, 26, 26, 'rgba(232,214,170,.9)', corta, 3); disco(ctx, cx, cy, 9, MIC, 0.8 * corta); }
  bisturi(ctx, cx + 12, cy - 12, -0.7, ss(t, L1 + 0.8, L1 + 1.4) * (1 - ss(t, L1 + 4.6, L1 + 5.2)));
  guia(ctx, cx0 + 4, cy0 - 20, 1130, 190, en(e, 1, 0.6, 1.2), CB); txt(ctx, 'DE LA ORILLA, NO DEL CENTRO', 1140, 180, { s: 20, f: 'mono', w: 700, ls: 3, c: CB, a: en(e, 1, 0.6, 1.4) });
  txt(ctx, 'CAJA NUEVA', 1560, y + r + 60, { s: 21, f: 'mono', w: 700, ls: 6, al: 'center', c: GRIS, a: en(e, 1, 0.6, 3) });
  const a2 = en(e, 2, 0.8); flecha(ctx, 1160, y + 150, 1360, y + 150, a2, CB, 4); txt(ctx, 'TRANSFERENCIA', 1260, y + 196, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: CB, a: a2 });
  const a3 = en(e, 3, 0.8); if (a3 > 0) { oscurece(ctx, 0.88 * a3); abanico(ctx, 700, 520, 2.4, -0.1, 'rosa', 2, a3); txt(ctx, '=', 960, 520, { s: 120, f: 'serif', al: 'center', a: a3 }); placa(ctx, 1220, 470, 150, a3); colonia(ctx, 't3', 1220, 470, 130, 0.9 * a3, { seed: 14 });
    chip(ctx, 'UN CLON DE LA SETA ORIGINAL', 960, 720, { al: 'center', c: ROSA, s: 26, a: en(e, 3, 0.7, 0.8) }); txt(ctx, 'PENN STATE · MUSHROOM SPAWN LAB', 960, 780, { s: 18, f: 'mono', w: 700, ls: 4, al: 'center', c: GRIS, a: en(e, 3, 0.7, 1.4) }); }
  titulo(ctx, 'Clonación de tejido', 960, 130, en(e, 2, 0.8, 1.8), { s: 66 });
};

/* ====== 03 · Cuando la copia cambia ====== */
// Colonia con sector: micelio rizomórfico (cordones) y una cuña algodonosa que se adelanta. sec 0..1.
function conSector(ctx, clave, x, y, r, g, sec) {
  colonia(ctx, clave, x, y, r, g, { seed: 17 });
  if (sec > 0.01) { const a0 = -0.95, a1 = -0.25, rs = r * g * (1 + 0.2 * sec); ctx.save(); ctx.beginPath(); ctx.moveTo(x + Math.cos((a0 + a1) / 2) * r * 0.18, y + Math.sin((a0 + a1) / 2) * r * 0.18); ctx.arc(x, y, rs + 4, a0, a1); ctx.closePath(); ctx.clip();
    disco(ctx, x, y, rs + 6, '#15130f', 0.85 * sec); disco(ctx, x, y, rs, '#F6E7C8', 0.42 * sec); const R = rng(31); for (let i = 0; i < 90; i++) { const an = a0 + R() * (a1 - a0), d = (0.2 + 0.8 * Math.sqrt(R())) * rs; halo(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, r * (0.06 + R() * 0.07), '#FFF4DC', 0.32 * sec); } ctx.restore(); }
}
LUZ.sector = (ctx, e) => {
  noche(ctx, '#0b1416', '#06090b'); const t = e.tl, x = 620, y = 480, r = 330;
  // resiembra tras resiembra: la colonia vuelve a crecer en cada caja
  const fin1 = e.L(1) + 1.2, n = Math.min(3, Math.floor(pr(t, 0, fin1) * 4)), loc = (pr(t, 0, fin1) * 4) % 1, g = t < fin1 ? mixn(0.1, 0.8, eo(loc, 0, 1)) : mixn(0.5, 0.86, eo(t, fin1, fin1 + 6));
  placa(ctx, x, y, 370); conSector(ctx, 'sec' + (t < fin1 ? n : 9), x, y, r, g, t < fin1 ? 0 : ss(t, fin1 + 0.4, fin1 + 4));
  txt(ctx, 'RESIEMBRA', 1120, 250, { s: 24, f: 'mono', w: 700, ls: 8, c: GRIS, a: ss(t, 0.2, 0.9) * (1 - en(e, 5)) }); txt(ctx, String(t < fin1 ? n + 1 : 5) + (t < fin1 ? '' : '…'), 1120, 380, { s: 150, f: 'serif', w: 500, c: CB, a: ss(t, 0.2, 0.9) * (1 - en(e, 5)) });
  const a1 = ss(t, fin1 + 1.6, fin1 + 2.4);
  guia(ctx, x + 150, y - 190, 1080, 470, a1, '#F6E7C8'); rotulo(ctx, 1100, 500, 'Sector', 'UNA ZONA QUE CRECE DISTINTO', a1 * (1 - en(e, 5)), { c: '#F6E7C8' });
  const a2 = en(e, 2, 0.7) * (1 - en(e, 5));
  guia(ctx, x - 160, y + 190, 300, 800, a2, MIC); txt(ctx, 'ASPECTO TÍPICO DE LA CEPA: CORDONES', 150, 836, { s: 19, f: 'mono', w: 700, ls: 3, c: MIC, a: a2 });
  ['OTRO RITMO', 'OTRO ASPECTO: ALGODONOSO', 'OTRO COLOR'].forEach((s, i) => chip(ctx, s, 1120, 590 + i * 58, { c: '#F6E7C8', s: 20, a: en(e, 2, 0.6, 0.6 + i * 0.9) * (1 - en(e, 5)) }));
  tache(ctx, x + 150, y - 190, 120, en(e, 3, 0.7)); chip(ctx, 'NO RESEMBRAR DE AQUÍ', x + 150, y - 350, { al: 'center', c: ROJO, s: 22, a: en(e, 3, 0.7, 0.6) });
  chip(ctx, 'HIPÓTESIS: ALGÚN CAMBIO GENÉTICO', 1120, 790, { c: CB, s: 20, a: en(e, 4, 0.7, 1.4) * (1 - en(e, 5)) });
  const a5 = en(e, 5, 0.8); if (a5 > 0) { estudio(ctx, 1080, 230, '2014', 'Revisión de L. Homolka', 'REVISTA *Fungal Biology*', a5, CB, 700);
    ['Resembrar una y otra vez', '«no evita cambios genéticos', 'ni fisiológicos».'].forEach((s, i) => rico(ctx, s, 1090, 480 + i * 66, { s: 48, f: 'serif', w: 400, it: i > 0, a: en(e, 5, 0.7, 1.2 + i * 0.5) })); }
};
// Estante con tubos de cultivo (sin etiquetas inventadas).
function estante(ctx, x, y, w, filas, a, T, av = 1) {
  for (let f = 0; f < filas; f++) { const yy = y + f * 230; caja(ctx, x, yy, w, 16, '#2c3a40', a, 4); const n = Math.floor(w / 62);
    for (let i = 0; i < n; i++) { const ap = cl(av * (filas * n) - (f * n + i)); if (ap <= 0) continue; const tx = x + 34 + i * 62, k = (i * 7 + f * 3) % 4;
      tubo(ctx, tx, yy - 4, 34, 170, (c) => { if (k === 1) { c.fillStyle = 'rgba(150,200,235,.28)'; c.fillRect(tx - 20, yy - 100, 40, 100); for (let j = 0; j < 4; j++) disco(c, tx - 6 + (j % 2) * 12, yy - 26 - j * 12, 5, MIC, 0.9); }
        else { c.fillStyle = 'rgba(214,170,96,.5)'; c.beginPath(); c.moveTo(tx - 20, yy); c.lineTo(tx + 20, yy); c.lineTo(tx + 20, yy - 120); c.lineTo(tx - 20, yy - 40); c.fill(); c.strokeStyle = rgba(MIC, 0.85); c.lineWidth = 5; c.beginPath(); c.moveTo(tx - 14, yy - 46); c.lineTo(tx + 15, yy - 112); c.stroke(); } }, a * ap);
      caja(ctx, tx - 13, yy - 150, 26, 30, 'rgba(240,240,232,.8)', a * ap, 2); linea(ctx, tx - 8, yy - 140, tx + 8, yy - 140, '#6b7280', 2, a * ap); linea(ctx, tx - 8, yy - 131, tx + 4, yy - 131, '#6b7280', 2, a * ap); } }
}
LUZ.cepario = (ctx, e) => {
  noche(ctx, '#0a1518', '#05090b'); const t = e.tl, T = e.T, a1 = en(e, 1, 0.9), dim = 1 - 0.6 * a1;
  halo(ctx, 520, 400, 800, '#7fd0e0', 0.06); estante(ctx, 110, 330, 760, 3, dim, T, eo(t, 0.1, 4.5));
  titulo(ctx, 'Cepario', 1400, 330, ss(t, 0.5, 1.4) * (1 - a1), { s: 110 }); txt(ctx, 'QUE LA CEPA CAMBIE LO MENOS POSIBLE', 1400, 400, { s: 21, f: 'mono', w: 700, ls: 4, al: 'center', c: '#7fd0e0', a: ss(t, 2.4, 3.2) * (1 - a1) });
  txt(ctx, 'MIENTRAS ESPERA', 1400, 436, { s: 21, f: 'mono', w: 700, ls: 4, al: 'center', c: '#7fd0e0', a: ss(t, 4.2, 5) * (1 - a1) });
  if (a1 > 0) { const tx = 1070, ty = 800; tubo(ctx, tx, ty, 150, 600, (c) => { c.fillStyle = 'rgba(150,205,240,.26)'; c.fillRect(tx - 80, ty - 380, 160, 380); c.fillStyle = 'rgba(220,240,255,.5)'; c.fillRect(tx - 80, ty - 382, 160, 4);
      const R = rng(4); for (let i = 0; i < 9; i++) { const px = tx - 46 + R() * 92, py = ty - 50 - R() * 200 + Math.sin(T * 0.7 + i) * 5, ro = R() * 3;
        if (en(e, 3) > 0.5) { c.save(); c.translate(px, py); c.rotate(ro); c.fillStyle = 'rgba(240,238,228,.9)'; c.beginPath(); c.ellipse(0, 0, 20, 7, 0, 0, TAU); c.fill(); c.restore(); disco(c, px, py, 9, MIC, 0.5); }
        else { c.save(); c.translate(px, py); c.rotate(ro); c.fillStyle = 'rgba(214,170,96,.75)'; c.fillRect(-11, -11, 22, 22); c.restore(); halo(c, px, py, 26, MIC, 0.5); disco(c, px, py, 10, MIC, 0.75); } } }, a1);
    rotulo(ctx, 1200, 300, 'Agua destilada estéril', en(e, 3) > 0.5 ? 'MICELIO SOBRE DISCOS DE PAPEL FILTRO' : 'TROCITOS DE AGAR CON MICELIO', a1, { c: '#9fd8f5' });
    chip(ctx, 'MÉTODO DE CASTELLANI · 1939', 1210, 400, { c: CB, s: 22, a: en(e, 2, 0.7) });
    const a3 = en(e, 3, 0.8); estudio(ctx, 1200, 470, '2014', 'UNAM · Biomédicas', '*Humphreya coffeata* · A 4 °C', a3, '#9fd8f5', 660);
    const m = Math.round(18 * eo(t, e.L(3) + 3.5, e.L(3) + 9)); txt(ctx, String(m), 1210, 780, { s: 150, f: 'serif', w: 500, c: CV, a: en(e, 3, 0.6, 3) }); txt(ctx, 'MESES', 1400, 730, { s: 26, f: 'mono', w: 700, ls: 8, c: CV, a: en(e, 3, 0.6, 3) }); txt(ctx, 'SEGUÍA VIVO', 1400, 772, { s: 22, f: 'mono', w: 700, ls: 4, c: GRIS, a: en(e, 3, 0.6, 9.2) }); }
};
function tanque(ctx, x, y, s, T, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const g = ctx.createLinearGradient(-90, 0, 90, 0); g.addColorStop(0, '#59667a'); g.addColorStop(0.4, '#c3cedd'); g.addColorStop(1, '#4a5568'); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-90, -250, 180, 250, [60, 60, 22, 22]); ctx.fill(); ctx.fillStyle = '#39424f'; ctx.beginPath(); ctx.roundRect(-46, -290, 92, 46, 8); ctx.fill(); ctx.restore();
  for (let i = 0; i < 7; i++) { const u = (T * 0.22 + i / 7) % 1; halo(ctx, x + Math.sin(i * 2.1 + T * 0.6) * 46 * s + (i % 2 ? 1 : -1) * u * 50 * s, y - 290 * s + u * 150 * s, (40 + 70 * u) * s, '#cfe6ff', 0.3 * a * (1 - u)); } }
LUZ.frio = (ctx, e) => {
  noche(ctx, '#081318', '#04080b'); const t = e.tl, T = e.T, a2 = en(e, 2, 0.9), dim = 1 - 0.93 * a2;
  ctx.save(); ctx.globalAlpha = dim;
  // 1 · aceite mineral sobre el cultivo
  const a = ss(t, 0.2, 1); tubo(ctx, 330, 700, 110, 420, (c) => { c.fillStyle = 'rgba(214,170,96,.55)'; c.beginPath(); c.moveTo(270, 700); c.lineTo(390, 700); c.lineTo(390, 470); c.lineTo(270, 600); c.fill(); c.strokeStyle = rgba(MIC, 0.9); c.lineWidth = 9; c.beginPath(); c.moveTo(280, 590); c.lineTo(384, 478); c.stroke(); c.fillStyle = 'rgba(250,224,120,.30)'; c.fillRect(270, 400, 120, 300); }, a);
  txt(ctx, 'ACEITE MINERAL', 330, 770, { s: 22, f: 'mono', w: 700, ls: 4, al: 'center', c: '#f5dc86', a }); txt(ctx, 'SOBRE EL CULTIVO', 330, 802, { s: 18, f: 'mono', w: 700, ls: 3, al: 'center', c: GRIS, a });
  // 2 · congelación con crioprotector (criovial)
  const b = ss(t, 3.0, 3.8); tubo(ctx, 760, 700, 90, 250, (c) => { c.fillStyle = 'rgba(190,225,250,.45)'; c.fillRect(710, 520, 100, 180); for (let i = 0; i < 5; i++) disco(c, 740 + (i % 2) * 34, 560 + i * 26, 8, MIC, 0.9); }, b, '#3d6fb5');
  ctx.save(); ctx.globalAlpha *= b; ctx.strokeStyle = '#bfe3ff'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { const an = i * Math.PI / 3 + T * 0.2; ctx.beginPath(); ctx.moveTo(760 + Math.cos(an) * 46, 340 + Math.sin(an) * 46); ctx.lineTo(760 - Math.cos(an) * 46, 340 - Math.sin(an) * 46); ctx.stroke(); } ctx.restore();
  txt(ctx, 'CONGELACIÓN', 760, 770, { s: 22, f: 'mono', w: 700, ls: 4, al: 'center', c: '#bfe3ff', a: b }); txt(ctx, 'CON UN CRIOPROTECTOR', 760, 802, { s: 18, f: 'mono', w: 700, ls: 3, al: 'center', c: GRIS, a: b });
  // 3 · nitrógeno líquido
  const c3 = ss(t, 5.6, 6.4); tanque(ctx, 1200, 700, 1.25, T, c3); txt(ctx, '−196 °C', 1200, 250, { s: 70, f: 'serif', w: 500, al: 'center', c: '#cfe6ff', a: ss(t, 6.4, 7.2) });
  txt(ctx, 'NITRÓGENO LÍQUIDO', 1200, 770, { s: 22, f: 'mono', w: 700, ls: 4, al: 'center', c: '#cfe6ff', a: c3 });
  // 4 · liofilizar: no
  const d = en(e, 1, 0.8); ctx.save(); ctx.globalAlpha *= d; ctx.fillStyle = 'rgba(150,180,215,.08)'; ctx.strokeStyle = 'rgba(210,226,246,.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(1560, 520, 110, 180, 12); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#8a93a6'; ctx.fillRect(1574, 492, 82, 30); ctx.fillStyle = 'rgba(235,230,215,.75)'; ctx.beginPath(); ctx.moveTo(1566, 696); ctx.lineTo(1664, 696); ctx.lineTo(1664, 672); ctx.quadraticCurveTo(1615, 650, 1566, 676); ctx.fill(); ctx.restore();
  tache(ctx, 1615, 600, 120, en(e, 1, 0.7, 1.2)); txt(ctx, 'LIOFILIZAR', 1615, 770, { s: 22, f: 'mono', w: 700, ls: 4, al: 'center', c: ROJO, a: d }); txt(ctx, 'NO SIRVE PARA LA MAYORÍA', 1615, 802, { s: 18, f: 'mono', w: 700, ls: 3, al: 'center', c: GRIS, a: en(e, 1, 0.7, 1.4) });
  ctx.restore();
  if (a2 > 0) { // refrigerador: no para cepas tropicales
    ctx.save(); ctx.globalAlpha = a2; const g = ctx.createLinearGradient(520, 0, 880, 0); g.addColorStop(0, '#aeb9c8'); g.addColorStop(1, '#6d7889'); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(520, 170, 360, 640, 26); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(520, 380, 360, 6); ctx.fillStyle = '#3d4654'; ctx.beginPath(); ctx.roundRect(548, 230, 16, 110, 8); ctx.fill(); ctx.beginPath(); ctx.roundRect(548, 430, 16, 150, 8); ctx.fill(); ctx.restore();
    placa(ctx, 740, 600, 96, a2); colonia(ctx, 'ref', 740, 600, 84, 0.9, { seed: 4, c: '#F9D5DF', a: a2 }); tache(ctx, 700, 490, 250, en(e, 2, 0.7, 1));
    rotulo(ctx, 980, 330, 'Seta rosa', '*Pleurotus djamor* · TROPICAL', en(e, 2, 0.7, 0.6), { c: ROSA });
    chip(ctx, 'CEPAS TROPICALES: SIN REFRIGERADOR', 990, 440, { c: ROJO, s: 22, a: en(e, 2, 0.7, 1.8) }); }
};

/* ====== 04 · Sin machos ni hembras ====== */
// Himenio: fila de basidios sobre la cara de una lámina (corte).
function himenio(ctx, w, T, k = 1) { const n = 7; ctx.fillStyle = '#2a1c26'; ctx.fillRect(-w, 90, w * 2, 300); ctx.strokeStyle = 'rgba(240,200,215,.3)'; ctx.lineWidth = 2; for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.moveTo(-w + i * w / 8, 100); ctx.lineTo(-w + i * w / 8 + 30, 380); ctx.stroke(); }
  for (let i = 0; i < n; i++) { const x = -w * 0.86 + i * (w * 1.72 / (n - 1)); basidio(ctx, x, 20 + (i % 2) * 14, 0.92, i % 3 === 1 ? cl(k * 0.6) : k, 1); } }
LUZ.laminas = (ctx, e) => {
  noche(ctx, '#0c0e1d', '#06070e'); const t = e.tl, T = e.T, a2 = en(e, 2, 0.9);
  abanico(ctx, 520, 640, 5.2, -0.06, 'rosa', 3, 1 - 0.3 * a2);
  // una seta que todavía no existe
  const a0 = ss(t, 0.3, 1.1) * (1 - en(e, 1, 0.6)); ctx.save(); ctx.globalAlpha = a0; ctx.translate(1180, 560); ctx.strokeStyle = CB; ctx.lineWidth = 4; ctx.setLineDash([14, 14]); ctx.lineDashOffset = -T * 20; ctx.beginPath(); ctx.moveTo(-150, 0); ctx.bezierCurveTo(-150, -190, 150, -190, 150, 0); ctx.quadraticCurveTo(0, 30, -150, 0); ctx.moveTo(-34, 16); ctx.lineTo(-40, 190); ctx.lineTo(40, 190); ctx.lineTo(34, 16); ctx.stroke(); ctx.restore();
  txt(ctx, '?', 1180, 520, { s: 150, f: 'serif', w: 500, al: 'center', c: CB, a: a0 }); txt(ctx, 'UNA SETA QUE NUNCA HA EXISTIDO', 1180, 820, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: CB, a: a0 });
  const a1 = en(e, 1, 0.8) * (1 - a2); titulo(ctx, 'Sexo, versión hongo', 1330, 300, a1, { s: 76 });
  if (a1 > 0) { ctx.save(); ctx.globalAlpha = en(e, 1, 0.6, 1.4) * (1 - a2); disco(ctx, 1160, 520, 60, '#f3d9a8'); disco(ctx, 1160, 520, 22, '#e2b56a');
    ctx.strokeStyle = '#dfe6f2'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1520, 520); for (let i = 0; i <= 20; i++) ctx.lineTo(1520 + i * 8, 520 + Math.sin(i * 0.9 + T * 4) * 12); ctx.stroke(); ovalo(ctx, 1500, 520, 26, 17, 0, '#dfe6f2'); ctx.restore();
    tache(ctx, 1160, 520, 86, en(e, 1, 0.5, 2.2) * (1 - a2)); tache(ctx, 1560, 520, 86, en(e, 1, 0.5, 2.6) * (1 - a2));
    txt(ctx, 'SIN ÓVULOS', 1160, 660, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: GRIS, a: en(e, 1, 0.5, 2.2) * (1 - a2) }); txt(ctx, 'NI ESPERMATOZOIDES', 1560, 660, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: GRIS, a: en(e, 1, 0.5, 2.6) * (1 - a2) }); }
  txt(ctx, 'LÁMINAS', 300, 250, { s: 22, f: 'mono', w: 700, ls: 6, c: ROSA, a: a2 }); guia(ctx, 420, 500, 330, 262, a2, ROSA);
  lupa(ctx, 1260, 480, 330, a2, (c) => { c.save(); c.translate(0, 40); himenio(c, 330, T, eo(t, e.L(2) + 0.5, e.L(2) + 3.5)); c.restore(); }, { ox: 640, oy: 470, c: ROSA, fondo: '#0a0710' });
  rotulo(ctx, 1010, 852, 'Basidios', 'CÉLULAS EN FORMA DE GARROTE', en(e, 2, 0.7, 1.4), { c: ROSA, s: 40 });
};
LUZ.basidio = (ctx, e) => {
  noche(ctx, '#0a0c18', '#05060b'); halo(ctx, 900, 400, 700, ROSA, 0.07); const t = e.tl, T = e.T, x = 900, y = 470, s = 3.4;
  const fus = ss(t, 0.6, 2.6), mei = ss(t, e.L(1), e.L(1) + 1.6), sube = ss(t, e.L(1) + 1.6, e.L(1) + 3.4), vuela = en(e, 2, 3.5, 1.2);
  basidio(ctx, x, y, s, sube * (1 - 0), 1, { sinEsporas: vuela > 0.02 });
  // los cuatro productos de la meiosis: cada uno con su mezcla (proporción distinta de azul y dorado)
  const K = [0.75, 0.3, 0.6, 0.42], E = [[-25, -58, -0.5], [-9, -64, -0.14], [9, -64, 0.14], [25, -58, 0.5]];
  if (mei < 0.02) { const d = (1 - fus) * 34; if (fus < 0.98) { nucleo(ctx, x - d, y - 80, 22, CA); nucleo(ctx, x + d, y - 80, 22, CB); } else nucleo(ctx, x, y - 80, 30 + Math.sin(T * 5) * 1.5, CA, 1, CB, 0.5); }
  else E.forEach(([ex, ey, an], i) => { const bx = x + (i - 1.5) * 26 * mei, by = y - 80, sx = x + (ex + Math.sin(an) * 37) * s, sy = y + (ey - Math.cos(an) * 37) * s; if (vuela > 0.02) return;
    nucleo(ctx, mixn(bx, sx, sube), mixn(by, sy, sube), mixn(14, 9, sube), CA, 1, CB, K[i]); });
  if (vuela > 0.02) E.forEach(([ex, ey, an], i) => { const sx = x + (ex + Math.sin(an) * 35) * s, sy = y + (ey - Math.cos(an) * 35) * s, dx = [520, 660, 800, 940][i] * 1.0, tx = mixn(sx, 1180 + i * 170, vuela), ty = mixn(sy, 400 + (i % 2) * 150, vuela);
    espora(ctx, tx, ty, mixn(3.4, 3.8, vuela), mixn(an + Math.PI / 2, 0.3 - i * 0.2, vuela)); nucleo(ctx, tx, ty, 12, CA, 1, CB, K[i]); });
  chip(ctx, 'DOS NÚCLEOS SE FUSIONAN', 300, 250, { c: MIC, s: 22, a: ss(t, 0.4, 1.1) * (1 - en(e, 1, 0.5)) });
  chip(ctx, 'MEIOSIS', 300, 250, { c: CB, s: 26, a: en(e, 1, 0.6) * (1 - en(e, 2, 0.5)) }); chip(ctx, 'CUATRO ESPORAS', 300, 320, { c: ROSA, s: 22, a: en(e, 1, 0.6, 2.2) * (1 - en(e, 2, 0.5)) });
  txt(ctx, 'CADA ESPORA: UNA MEZCLA NUEVA', 1440, 700, { s: 24, f: 'mono', w: 700, ls: 5, al: 'center', c: CB, a: en(e, 2, 0.7, 2.4) });
  rotulo(ctx, 150, 780, 'Basidio', 'ESPORAS ALARGADAS, COMO EN *Pleurotus*', ss(t, 1.4, 2.2), { c: ROSA, s: 40 }); esquema(ctx, 1);
};
LUZ.monocarion = (ctx, e) => {
  noche(ctx, '#090d18', '#05070c'); fondoMicelio(ctx, 3, 0.1); const t = e.tl, g = eo(t, 0.5, 6.5), K = 0.62;
  const P = [[330, 520], [520, 505], [760, 530], [1010, 490], [1260, 520], [1560, 480]], R1 = [[760, 530], [900, 640], [1090, 700], [1330, 730]], R2 = [[1010, 490], [1120, 380], [1300, 310], [1520, 290]];
  hifa(ctx, R1, 40, cl((g - 0.4) * 2.2), { septos: [0.5], punta: true }); hifa(ctx, R2, 40, cl((g - 0.58) * 2.6), { septos: [0.55], punta: true });
  const C = hifa(ctx, P, 46, g, { septos: [0.2, 0.42, 0.63, 0.83], punta: true });
  [0.1, 0.31, 0.52, 0.73, 0.92].forEach((u) => { if (u < g - 0.03) { const p = C.at(u); nucleo(ctx, p.x, p.y, 12, CA, 1, CB, K); } });
  [[R1, 0.3, (g - 0.4) * 2.2], [R1, 0.78, (g - 0.4) * 2.2], [R2, 0.3, (g - 0.58) * 2.6], [R2, 0.8, (g - 0.58) * 2.6]].forEach(([pp, u, gg]) => { if (u < gg - 0.05) { const p = camino(pp).at(u); nucleo(ctx, p.x, p.y, 11, CA, 1, CB, K); } });
  espora(ctx, 300, 522, 4.6, 0.05); nucleo(ctx, 292, 522, 13, CA, 1 - ss(t, 0.5, 1.4), CB, K);
  txt(ctx, 'ESPORA QUE GERMINA', 300, 630, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: ROSA, a: ss(t, 0.2, 0.9) });
  rotulo(ctx, 150, 250, 'Monocarión', 'UN SOLO TIPO DE NÚCLEO · SIN FÍBULAS', ss(t, 2.4, 3.2), { c: CA });
  const a1 = en(e, 1, 0.7); abanico(ctx, 1640, 720, 1.8, -0.1, 'rosa', 2, a1 * 0.55); tache(ctx, 1640, 680, 120, en(e, 1, 0.6, 0.5)); txt(ctx, 'NORMALMENTE NO FORMA SETAS', 1640, 850, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: ROJO, a: a1 });
  esquema(ctx, 1);
};
const TIPOS = ['A1 B1', 'A1 B2', 'A2 B1', 'A2 B2'];
function ficha(ctx, x, y, i, a = 1, s = 1) { const A = i < 2 ? 0 : 1, B = i % 2; caja(ctx, x - 58 * s, y - 26 * s, 116 * s, 52 * s, 'rgba(10,14,24,.9)', a, 12 * s, 'rgba(220,230,250,.35)');
  txt(ctx, 'A' + (A + 1), x - 26 * s, y + 9 * s, { s: 26 * s, f: 'mono', w: 700, al: 'center', c: A ? '#9fd0ff' : CA, a, sombra: false }); txt(ctx, 'B' + (B + 1), x + 26 * s, y + 9 * s, { s: 26 * s, f: 'mono', w: 700, al: 'center', c: B ? '#ffe7a6' : '#E0A12E', a, sombra: false }); }
LUZ.tabla = (ctx, e) => {
  noche(ctx, '#0a0d1a', '#05060c'); const t = e.tl, T = e.T;
  // ADN con dos regiones
  const a0 = ss(t, 0.2, 1); ctx.save(); ctx.globalAlpha = a0; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (const d of [0, Math.PI]) { ctx.strokeStyle = 'rgba(200,214,240,.6)'; ctx.beginPath(); for (let i = 0; i <= 80; i++) { const px = 130 + i * 8.4, py = 330 + Math.sin(i * 0.3 + d + T * 0.5) * 26; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore();
  const ra = ss(t, 3.4, 4.1), rb = ss(t, 4.4, 5.1); caja(ctx, 250, 286, 130, 88, rgba(CA, 0.35), ra, 14, CA); txt(ctx, 'A', 315, 350, { s: 60, f: 'serif', w: 500, al: 'center', a: ra }); caja(ctx, 540, 286, 130, 88, rgba(CB, 0.35), rb, 14, CB); txt(ctx, 'B', 605, 350, { s: 60, f: 'serif', w: 500, al: 'center', a: rb });
  chip(ctx, 'ADN = ÁCIDO DESOXIRRIBONUCLEICO', 130, 210, { c: GRIS, s: 18, a: ss(t, 1.2, 2) });
  rotulo(ctx, 150, 500, 'Género *Pleurotus*', 'DOS REGIONES DECIDEN LA COMPATIBILIDAD', ss(t, 1.6, 2.4), { c: ROSA, s: 42 });
  txt(ctx, 'ENTRE TODAS LAS ESPORAS DE UNA SETA:', 150, 640, { s: 20, f: 'mono', w: 700, ls: 3, c: GRIS, a: en(e, 1, 0.6) }); txt(ctx, 'CUATRO TIPOS', 150, 676, { s: 26, f: 'mono', w: 700, ls: 6, c: MIC, a: en(e, 1, 0.6) });
  // tabla 4 × 4
  const a1 = en(e, 1, 0.8), x0 = 1130, y0 = 290, c = 136;
  for (let i = 0; i < 4; i++) { ficha(ctx, x0 + c * i + c / 2, y0 - 44, i, a1 * ss(t, e.L(1) + i * 0.15, e.L(1) + 0.6 + i * 0.15)); ficha(ctx, x0 - 76, y0 + c * i + c / 2, i, a1 * ss(t, e.L(1) + i * 0.15, e.L(1) + 0.6 + i * 0.15)); }
  for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { const ok = i + j === 3, ap = ss(t, e.L(1) + 1.6 + (j * 4 + i) * 0.2, e.L(1) + 2 + (j * 4 + i) * 0.2), x = x0 + i * c, y = y0 + j * c, foco = en(e, 2, 0.6) > 0 && j === 0 ? 1 : 0;
    caja(ctx, x + 5, y + 5, c - 10, c - 10, ok ? rgba(CV, 0.22 + 0.12 * Math.sin(T * 3)) : 'rgba(255,255,255,.035)', a1 * ap, 12, ok ? CV : 'rgba(220,230,250,.14)');
    if (ok) { ctx.save(); ctx.globalAlpha = a1 * ap; ctx.strokeStyle = CV; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + c * 0.3, y + c * 0.52); ctx.lineTo(x + c * 0.45, y + c * 0.66); ctx.lineTo(x + c * 0.72, y + c * 0.34); ctx.stroke(); ctx.restore(); halo(ctx, x + c / 2, y + c / 2, 90, CV, 0.3 * a1 * ap); }
    else { ctx.save(); ctx.globalAlpha = a1 * ap * 0.5; ctx.strokeStyle = '#8693a8'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x + c * 0.4, y + c * 0.4); ctx.lineTo(x + c * 0.6, y + c * 0.6); ctx.moveTo(x + c * 0.6, y + c * 0.4); ctx.lineTo(x + c * 0.4, y + c * 0.6); ctx.stroke(); ctx.restore(); } }
  chip(ctx, 'COMPATIBLES: DISTINTOS EN A Y EN B', 150, 760, { c: CV, s: 20, a: en(e, 1, 0.6, 4.2) });
  const a2 = en(e, 2, 0.8); if (a2 > 0) { ctx.save(); ctx.globalAlpha = a2; ctx.strokeStyle = CB; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(x0 - 140, y0 + 2, c * 4 + 146, c - 4, 16); ctx.stroke(); ctx.restore(); }
  titulo(ctx, '1 de cada 4', 470, 860, en(e, 2, 0.8, 1.2), { s: 84, c: CB });
};
LUZ.desconocido = (ctx, e) => {
  noche(ctx, '#0a0d1a', '#05060c'); const t = e.tl, a1 = en(e, 1, 0.8);
  // Coprinopsis cinerea (esquema): sombrero gris acampanado y estriado, pie delgado
  ctx.save(); ctx.globalAlpha = a1; ctx.translate(300, 640); ctx.strokeStyle = '#e6e2d8'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 150); ctx.quadraticCurveTo(8, 60, 0, -40); ctx.stroke(); ctx.fillStyle = '#8f8a86'; ctx.beginPath(); ctx.moveTo(-84, -20); ctx.bezierCurveTo(-70, -190, 70, -190, 84, -20); ctx.quadraticCurveTo(0, -42, -84, -20); ctx.fill(); ctx.strokeStyle = 'rgba(40,36,36,.5)'; ctx.lineWidth = 2; ctx.beginPath(); for (let i = -6; i <= 6; i++) { ctx.moveTo(i * 13, -26 - (6 - Math.abs(i)) * 1.5); ctx.quadraticCurveTo(i * 9, -100, i * 3, -150); } ctx.stroke(); ctx.restore();
  rotulo(ctx, 150, 250, '*Coprinopsis cinerea*', 'CÁLCULO RECOGIDO EN UNA REVISIÓN DEL AÑO 2000', a1, { c: CB, s: 44 }); esquema(ctx, a1);
  const bx = 640, bw = 1060; txt(ctx, 'ENTRE ESPORAS HERMANAS', bx, 400, { s: 22, f: 'mono', w: 700, ls: 5, c: GRIS, a: ss(t, 0.2, 0.9) });
  caja(ctx, bx, 424, bw, 54, 'rgba(255,255,255,.06)', ss(t, 0.2, 0.9), 27); caja(ctx, bx, 424, Math.max(54, bw * 0.25 * eo(t, 0.5, 2.2)), 54, CA, ss(t, 0.2, 0.9), 27); txt(ctx, '25 %', bx + bw * 0.25 + 30, 466, { s: 46, f: 'serif', w: 500, c: CA, a: ss(t, 1.4, 2.2) });
  txt(ctx, 'CON UN DESCONOCIDO', bx, 580, { s: 22, f: 'mono', w: 700, ls: 5, c: GRIS, a: a1 }); const k = eo(t, e.L(1) + 0.8, e.L(1) + 4);
  caja(ctx, bx, 604, bw, 54, 'rgba(255,255,255,.06)', a1, 27); caja(ctx, bx, 604, Math.max(54, bw * 0.98 * k), 54, CV, a1, 27); halo(ctx, bx + bw * 0.98 * k, 631, 120, CV, 0.4 * a1 * k);
  txt(ctx, 'más de 98 %', bx, 760, { s: 96, f: 'serif', w: 500, c: CV, a: en(e, 1, 0.7, 3.6) });
  chip(ctx, 'UNAS 160 VERSIONES DE A · UNAS 80 DE B', bx + 4, 830, { c: CB, s: 20, a: en(e, 1, 0.7, 5.2) });
};

window.LZA = { fondoMicelio, txt, chip, en, esquema, CA, CB, CV, MIC, ROSA, ROJO, GRIS, disco, ovalo, caja, linea, nucleo, camino, hifa, fibula, placa, colonia, moho, abanico, racimo, setaPartida, champi, grano, granos, bolsa, frascoGrano, pinzas, bisturi, tubo, basidio, espora, lupa, estudio, mesa, lluvia, huella, escenaBolsa, puntas, conSector, ficha, TIPOS };
