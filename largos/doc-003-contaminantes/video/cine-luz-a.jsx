// cine-luz-a.jsx — Documental 003 (contaminantes del cultivo de hongos), capítulos 0 a 4, y las PIEZAS compartidas (window.K3).
// Cada escena: LUZ.id = (ctx, e) => …   ·   e.L(i) = segundo en que empieza la frase i del bloque.
// Morfología (fuentes en ../fuentes.md): Trichoderma = conidióforo muy ramificado con fiálides en botellita y conidios verdes en
// cabezuelas húmedas (F17); Penicillium = pincel con cadenas secas (F17); Aspergillus = vesícula cubierta de fiálides (F17);
// mucorales = esporangióforo con esporangio globoso y columela (F1, F17); Bacillus = bacilo con endospora (F1).
const { TAU, cl, pr, ss, eo, mixn, rng, rgba, LUZC, halo, noche, polvo, cam, oscurece, txt, rico, chip, rotulo, guia, titulo, sello, tache, flecha,
  red, pintaRed, petri, frasco, bacteria, termometro, reloj } = window.LZK;
const LUZ = window.LUZ;
// mixc propio: regresa #rrggbb (el del kit regresa rgb(), que no se puede volver a mezclar ni pasar a rgba()).
const mixc = (a, b, t) => { const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16), k = t < 0 ? 0 : t > 1 ? 1 : t, m = (s) => Math.round(((A >> s) & 255) + (((B >> s) & 255) - ((A >> s) & 255)) * k); return '#' + ((1 << 24) | (m(16) << 16) | (m(8) << 8) | m(0)).toString(16).slice(1); };
const en = (e, i, d = 0.7, r = 0) => { const a = e.L(i); return a == null ? 0 : ss(e.tl, a + r, a + r + d); };
const esquema = (ctx, a = 1) => chip(ctx, 'ESQUEMA', 60, 870, { c: '#8fa0bd', s: 18, a: a * 0.8 });
// Colores de cada contaminante en pantalla.
const CO = { mic: '#EFEAD8', tri: '#35C45A', pen: '#58B8B0', asp: '#D9C13A', neg: '#7b8190', neu: '#FF8E6E', muc: '#aab0bc', tel: '#E9E6F2', lev: '#E9D49A', bac: '#7fd0ff', rojo: '#C8553A', mixo: '#FFD21F', hial: '#cfdcec', grano: '#c79a4e' };

/* ====== piezas compartidas ====== */
function micelio(ctx, clave, x, y, g, color, o = {}) { ctx.save(); ctx.translate(x, y); pintaRed(ctx, red(clave, o), g, color, o); ctx.restore(); }
// Moho en polvo (esporulación): puntitos opacos que van llenando un círculo de adentro hacia afuera.
function polvoMoho(ctx, x, y, r, color, g, seed = 1, n = 500, a = 1) {
  if (g <= 0 || a <= 0) return; const R = rng(seed); ctx.save();
  for (let i = 0; i < n; i++) { const an = R() * TAU, d = Math.sqrt(R()) * r, sz = 1.6 + R() * 3.6, k = 0.45 + 0.55 * R(); const ap = cl((g - d / r) * 4); if (ap <= 0) continue;
    ctx.globalAlpha = ap * a * k; ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d * (0.92 + 0.08 * Math.sin(i)), sz, 0, TAU); ctx.fill(); }
  ctx.restore(); halo(ctx, x, y, r * 1.5 * Math.min(1, g), color, 0.22 * a * Math.min(1, g));
}
// Micelio algodonoso: copos de luz blanda.
function algodon(ctx, x, y, r, color, g, seed = 1, a = 1, n = 46) { if (g <= 0) return; const R = rng(seed); for (let i = 0; i < n; i++) { const an = R() * TAU, d = Math.sqrt(R()) * r, s = 22 + R() * 46, k = R(); if (d / r > g) continue; halo(ctx, x + Math.cos(an) * d, y + Math.sin(an) * d, s * (0.6 + 0.4 * g), color, a * (0.1 + 0.14 * k)); } }
// Hifa como tubo (pared clara, interior oscuro, septos).
function tubo(ctx, pts, w, color, a = 1, fondo = '#0a0f18') {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const tr = () => { ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); };
  tr(); ctx.lineWidth = w; ctx.strokeStyle = rgba(color, 0.9); ctx.stroke(); tr(); ctx.lineWidth = Math.max(1, w - 6); ctx.strokeStyle = fondo; ctx.stroke(); tr(); ctx.lineWidth = Math.max(1, w - 6); ctx.strokeStyle = rgba(color, 0.14); ctx.stroke(); ctx.restore();
}
// Fiálide: célula en forma de botellita.
function fialide(ctx, x, y, an, len, color, a = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(an); ctx.globalAlpha *= a; ctx.fillStyle = rgba(color, 0.22); ctx.strokeStyle = rgba(color, 0.95); ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, -len * 0.14); ctx.quadraticCurveTo(len * 0.5, -len * 0.3, len * 0.75, -len * 0.07); ctx.lineTo(len, -len * 0.05); ctx.lineTo(len, len * 0.05); ctx.lineTo(len * 0.75, len * 0.07); ctx.quadraticCurveTo(len * 0.5, len * 0.3, 0, len * 0.14); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
// Trichoderma: conidióforo repetidamente ramificado; fiálides en botellita; conidios verdes en cabezuelas húmedas (F17).
function conidioTricho(ctx, x, y, s, g, T = 0, esp = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const H = 520, c = CO.hial; ctx.lineCap = 'round';
  const hg = H * cl(g * 1.25); ctx.strokeStyle = rgba(c, 0.9); ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(10, -hg * 0.5, 0, -hg); ctx.stroke();
  const punta = (px, py, an, k) => { for (const d of [-0.5, 0, 0.5]) { const a2 = an + d; fialide(ctx, px, py, a2, 34, c, k); const ex = px + Math.cos(a2) * 44, ey = py + Math.sin(a2) * 44, ee = k * esp;
      if (ee > 0) { ctx.save(); ctx.globalAlpha = ee; ctx.fillStyle = rgba(CO.tri, 0.5); ctx.beginPath(); ctx.arc(ex, ey, 13, 0, TAU); ctx.fill(); const R = rng(Math.round(px * 7 + py * 3 + d * 10)); ctx.fillStyle = CO.tri; for (let i = 0; i < 7; i++) { const q = R() * TAU, dd = R() * 9; ctx.beginPath(); ctx.arc(ex + Math.cos(q) * dd, ey + Math.sin(q) * dd, 4, 0, TAU); ctx.fill(); } ctx.restore(); halo(ctx, ex, ey, 30, CO.tri, 0.35 * ee); } } };
  const N = 5; for (let i = 0; i < N; i++) { const u = (i + 1) / (N + 1), yy = -H * u, k = cl((g * 1.25 - u) * 5); if (k <= 0) continue; const len = (150 - 105 * u) * k;
    for (const d of [-1, 1]) { const an = -Math.PI / 2 + d * 1.15, bx = Math.cos(an) * len + 6 * (1 - u), by = yy + Math.sin(an) * len; ctx.strokeStyle = rgba(c, 0.9); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(4, yy); ctx.lineTo(bx, by); ctx.stroke();
      if (i < 3) { const mx = Math.cos(an) * len * 0.5, my = yy + Math.sin(an) * len * 0.5, a3 = an + d * 0.9, l2 = len * 0.42; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(mx + Math.cos(a3) * l2, my + Math.sin(a3) * l2); ctx.stroke(); punta(mx + Math.cos(a3) * l2, my + Math.sin(a3) * l2, a3, cl(k * 2 - 1)); }
      punta(bx, by, an, cl(k * 2 - 1)); } }
  punta(0, -hg, -Math.PI / 2, cl(g * 4 - 3)); ctx.restore();
}
// Penicillium: estipe, métulas y fiálides en pincel; conidios en cadenas largas y secas (F17).
function penicilo(ctx, x, y, s, g, color = CO.pen, T = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const c = CO.hial, H = 250; ctx.lineCap = 'round'; const hg = H * cl(g * 2.2);
  ctx.strokeStyle = rgba(c, 0.9); ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -hg); ctx.stroke();
  const k1 = cl(g * 4 - 1.6), k2 = cl(g * 4 - 2.2), k3 = cl(g * 2.2 - 1.2);
  for (const m of [-0.42, 0, 0.42]) { const an = -Math.PI / 2 + m, mx = Math.cos(an) * 62 * k1, my = -H + Math.sin(an) * 62 * k1; if (k1 <= 0) continue; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, -H); ctx.lineTo(mx, my); ctx.stroke();
    for (const f of [-0.2, 0, 0.2]) { const a2 = -Math.PI / 2 + m * 0.75 + f; fialide(ctx, mx, my, a2, 46, c, k2); for (let i = 0; i < 9; i++) { const kk = cl(k3 * 9 - i); if (kk <= 0) break; const d = 54 + i * 15, w = Math.sin(T * 1.4 + i * 0.5 + m * 9 + f * 20) * i * 0.5, px = mx + Math.cos(a2) * d + w, py = my + Math.sin(a2) * d; ctx.globalAlpha = kk; ctx.fillStyle = color; ctx.beginPath(); ctx.arc(px, py, 6.6, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; } } }
  if (k3 > 0) halo(ctx, 0, -H - 150, 190, color, 0.22 * k3); ctx.restore();
}
// Aspergillus: el conidióforo termina en una vesícula cubierta de fiálides; conidios en cadenas secas (cabeza radiada) (F17).
function aspergilo(ctx, x, y, s, g, color = CO.asp, T = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const c = CO.hial, H = 300; ctx.lineCap = 'round'; const hg = H * cl(g * 2.2);
  ctx.strokeStyle = rgba(c, 0.9); ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(-6, 0); ctx.quadraticCurveTo(8, -hg * 0.5, 0, -hg); ctx.stroke();
  const kv = cl(g * 4 - 1.7), kf = cl(g * 4 - 2.3), kc = cl(g * 2.2 - 1.2);
  if (kv > 0) { ctx.fillStyle = '#131b28'; ctx.strokeStyle = rgba(c, 0.95); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, -H - 26, 40 * kv, 0, TAU); ctx.fill(); ctx.stroke(); }
  if (kf > 0) for (let i = 0; i < 17; i++) { const an = -Math.PI * 1.22 + (i / 16) * Math.PI * 1.44, px = Math.cos(an) * 40, py = -H - 26 + Math.sin(an) * 40; fialide(ctx, px, py, an, 26, c, kf);
    for (let k = 0; k < 8; k++) { const kk = cl(kc * 8 - k); if (kk <= 0) break; const d = 72 + k * 13; ctx.globalAlpha = kk; ctx.fillStyle = color; ctx.beginPath(); ctx.arc(Math.cos(an) * d + Math.sin(T + i + k) * 0.8, -H - 26 + Math.sin(an) * d, 5.6, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; } }
  if (kc > 0) halo(ctx, 0, -H - 40, 230, color, 0.2 * kc); ctx.restore();
}
// Mucoral: esporangióforo alto con un esporangio globoso lleno de esporas; adentro, la columela. riz: rizoides (Rhizopus).
function esporangio(ctx, x, y, s, g, o = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const H = o.h || 240, inc = o.inc || 0, hg = H * cl(g * 1.6), tx = Math.sin(inc) * hg, ty = -Math.cos(inc) * hg; ctx.lineCap = 'round';
  if (o.riz) { ctx.strokeStyle = rgba(CO.hial, 0.55); ctx.lineWidth = 2.5; for (let i = 0; i < 5; i++) { const an = Math.PI / 2 + (i - 2) * 0.42; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(Math.cos(an) * 16, 14, Math.cos(an) * 34, Math.sin(an) * 34); ctx.stroke(); } }
  ctx.strokeStyle = rgba(CO.hial, 0.85); ctx.lineWidth = 4.5; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(tx * 0.3, ty * 0.55, tx, ty); ctx.stroke();
  const kc = cl(g * 3.2 - 1.9), osc = cl(g * 3 - 2);
  if (kc > 0) { const r = (o.r || 24) * kc; ctx.fillStyle = mixc('#cfd6e2', '#2b2f3a', osc); ctx.strokeStyle = mixc('#e6ecf5', '#7b8494', osc); ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(tx, ty - r * 0.8, r, 0, TAU); ctx.fill(); ctx.stroke();
    if (o.detalle) { ctx.fillStyle = 'rgba(210,220,236,.5)'; ctx.beginPath(); ctx.ellipse(tx, ty - r * 0.45, r * 0.46, r * 0.52, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(230,236,246,.9)'; ctx.lineWidth = 1; ctx.stroke(); const R = rng(9); ctx.fillStyle = 'rgba(150,158,172,.9)'; for (let i = 0; i < 70; i++) { const an = R() * TAU, d = Math.sqrt(R()) * r * 0.93, px = tx + Math.cos(an) * d, py = ty - r * 0.8 + Math.sin(an) * d; if (Math.hypot((px - tx) / 0.46, (py - (ty - r * 0.45)) / 0.52) < r) continue; ctx.beginPath(); ctx.arc(px, py, r * 0.05, 0, TAU); ctx.fill(); } }
    else { ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.beginPath(); ctx.arc(tx - r * 0.35, ty - r * 1.1, r * 0.2, 0, TAU); ctx.fill(); } }
  ctx.restore();
}
// Bacilo con endospora (óvalo refringente adentro). celda: 1 = célula viva, 0 = solo queda la endospora.
function bacilo(ctx, x, y, len, an, celda = 1, espora = 1, color = CO.bac) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(an); const w = len * 0.34;
  if (celda > 0) { ctx.globalAlpha = celda; ctx.fillStyle = 'rgba(70,110,150,.35)'; ctx.strokeStyle = rgba(color, 0.9); ctx.lineWidth = Math.max(1.2, len * 0.012); ctx.beginPath(); ctx.roundRect(-len / 2, -w / 2, len, w, w / 2); ctx.fill(); ctx.stroke(); ctx.globalAlpha = 1; }
  if (espora > 0) { ctx.globalAlpha = espora; ctx.fillStyle = '#f4fbff'; ctx.strokeStyle = '#9fe0ff'; ctx.lineWidth = Math.max(1.5, len * 0.02); ctx.beginPath(); ctx.ellipse(len * 0.14, 0, len * 0.17, w * 0.34, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.globalAlpha = 1; }
  ctx.restore(); if (espora > 0 && len > 40) halo(ctx, x + Math.cos(an) * len * 0.14, y + Math.sin(an) * len * 0.14, len * 0.5, '#bfeaff', 0.5 * espora);
}
// Ácaro: cuerpo ovalado sin cintura y OCHO patas (cuatro pares) en el adulto.
function acaro(ctx, x, y, s, rot, T, color = '#d8c9a8', nums = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const P = [[30, 0.62], [14, 1.2], [-12, 1.95], [-30, 2.55]];
  for (const d of [-1, 1]) P.forEach(([px, th0], i) => { const th = th0 + Math.sin(T * 9 + i * 1.7 + (d > 0 ? 0 : Math.PI)) * 0.14, th2 = th + (th0 < 1.57 ? -0.35 : 0.35), bx = px, by = d * 22, mx = bx + Math.cos(th) * 44, my = by + d * Math.sin(th) * 44, ex = mx + Math.cos(th2) * 38, ey = my + d * Math.sin(th2) * 38;
    ctx.strokeStyle = mixc(color, '#000000', 0.25); ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(mx, my); ctx.lineTo(ex, ey); ctx.stroke();
    if (nums > 0) { const k = d < 0 ? i : 7 - i; ctx.save(); ctx.translate(ex + Math.cos(th2) * 15, ey + d * Math.sin(th2) * 15); ctx.rotate(-rot); txt(ctx, String(k + 1), 0, 6, { s: 16, f: 'mono', w: 700, al: 'center', c: LUZC.oro, a: cl(nums * 9 - k) }); ctx.restore(); } });
  const g = ctx.createRadialGradient(-6, -10, 4, 0, 0, 52); g.addColorStop(0, mixc(color, '#ffffff', 0.35)); g.addColorStop(1, mixc(color, '#000000', 0.3)); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(-4, 0, 46, 32, 0, 0, TAU); ctx.fill();
  ctx.fillStyle = mixc(color, '#000000', 0.2); ctx.beginPath(); ctx.ellipse(44, 0, 13, 10, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = mixc(color, '#000000', 0.2); ctx.lineWidth = 3; for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(52, d * 4); ctx.lineTo(64, d * 7); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 1.2; for (let i = 0; i < 6; i++) { const an = Math.PI * 0.6 + i * 0.36; ctx.beginPath(); ctx.moveTo(-4 + Math.cos(an) * 44, Math.sin(an) * 30); ctx.lineTo(-4 + Math.cos(an) * 62, Math.sin(an) * 44); ctx.stroke(); }
  ctx.restore();
}
// Mosca de perfil. tipo 'sci' (esciárido: delgada, antenas y patas largas) o 'for' (fórido: tórax abultado, antenas cortas).
function mosca(ctx, x, y, s, tipo, T, dir = 1, vuela = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); ctx.lineCap = 'round'; const F = '#3a3f4d', B = '#aab3c8', aleteo = vuela * Math.sin(T * 60) * 0.5;
  ctx.strokeStyle = B; ctx.lineWidth = 2.2; const sci = tipo === 'sci';
  for (let i = 0; i < 3; i++) { const bx = 4 - i * 9, w = Math.sin(T * 7 + i * 2) * 3 * (1 - vuela); ctx.beginPath(); ctx.moveTo(bx, 8); ctx.lineTo(bx + 6 - i * 8 + w, sci ? 30 : 22); ctx.lineTo(bx + 12 - i * 14 + w, sci ? 54 : 38); ctx.stroke(); }
  ctx.fillStyle = F; ctx.strokeStyle = B; ctx.lineWidth = 1.6;
  if (sci) { ctx.beginPath(); ctx.ellipse(-44, 4, 36, 8.5, 0.08, 0, TAU); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, 0, 15, 12, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(19, -2, 7.5, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(23, -8); ctx.quadraticCurveTo(44, -34, 70, -30); ctx.stroke(); ctx.fillStyle = B; for (let i = 1; i < 9; i++) { const u = i / 9, px = mixn(mixn(23, 44, u), mixn(44, 70, u), u), py = mixn(mixn(-8, -34, u), mixn(-34, -30, u), u); ctx.beginPath(); ctx.arc(px, py, 1.9, 0, TAU); ctx.fill(); } }
  else { ctx.beginPath(); ctx.ellipse(-30, 6, 24, 11, 0.25, 0, TAU); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, -5, 17, 17, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(17, 6, 7, 0, TAU); ctx.fill(); ctx.stroke(); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(22, 3); ctx.lineTo(31, -2); ctx.stroke(); }
  ctx.save(); ctx.translate(-4, -8); ctx.rotate(-0.12 - aleteo - vuela * 0.5); ctx.fillStyle = 'rgba(190,210,235,.2)'; ctx.strokeStyle = 'rgba(210,225,245,.7)'; ctx.lineWidth = 1.3; ctx.beginPath(); ctx.ellipse(-44, -6, sci ? 50 : 40, 13, 0.06, 0, TAU); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(-88, -8); ctx.moveTo(-10, -2); ctx.quadraticCurveTo(-50, 4, -84, -2); ctx.stroke(); ctx.restore();
  ctx.restore();
}
// Larva de mosca: sin patas, blanquecina. cabeza true = cápsula negra (como se describe en esciáridos); false = extremo afilado, cabeza poco visible (fóridos, F8).
function larva(ctx, x, y, s, rot, T, cabeza = true, a = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a; const N = 13;
  for (let i = N - 1; i >= 0; i--) { const u = i / (N - 1), px = (u - 0.5) * 150, py = Math.sin(u * 5 + T * 4) * 9 * (0.3 + u), r = (cabeza ? 12 : mixn(12, 4.5, Math.pow(u, 2))) * (1 - 0.25 * Math.pow(1 - u, 3));
    ctx.fillStyle = 'rgba(238,236,224,.92)'; ctx.strokeStyle = 'rgba(160,160,150,.8)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(px, py, 8, r, 0, 0, TAU); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle = 'rgba(120,100,70,.4)'; ctx.beginPath(); ctx.ellipse(-10, Math.sin(2.3 + T * 4) * 5, 44, 4, 0, 0, TAU); ctx.fill();
  if (cabeza) { ctx.fillStyle = '#0b0b0d'; ctx.strokeStyle = '#555'; ctx.beginPath(); ctx.ellipse(82, Math.sin(5 + T * 4) * 11, 9, 9, 0, 0, TAU); ctx.fill(); ctx.stroke(); }
  ctx.restore();
}
// Nematodo: gusano liso y transparente. est > 0 dibuja el estilete (aguja bucal) asomando.
function nematodo(ctx, x, y, s, rot, T, est = 0, a = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const P = []; for (let i = 0; i <= 50; i++) { const u = i / 50; P.push([(u - 1) * 420, Math.sin(u * 7 - T * 3) * 34 * (1 - u * 0.8)]); }
  const tr = () => { ctx.beginPath(); P.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); };
  tr(); ctx.lineWidth = 26; ctx.strokeStyle = 'rgba(190,215,235,.85)'; ctx.stroke(); tr(); ctx.lineWidth = 21; ctx.strokeStyle = '#111a26'; ctx.stroke(); tr(); ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(150,180,160,.35)'; ctx.stroke();
  const h = P[50]; if (est > 0) { ctx.strokeStyle = '#ffe9a8'; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.moveTo(h[0] - 30, h[1]); ctx.lineTo(h[0] + 10 + 22 * est, h[1]); ctx.stroke(); ctx.fillStyle = '#ffe9a8'; ctx.beginPath(); ctx.arc(h[0] - 30, h[1], 5, 0, TAU); ctx.fill(); }
  ctx.restore();
}
// Seta ostra (Pleurotus) de lado: sombrero en abanico, láminas que bajan por el pie lateral.
function ostra(ctx, x, y, s, tono = 0, seed = 1, a = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a; const cap = mixc('#b9b0a2', '#6a4a30', tono), lam = mixc('#efe9dc', '#9a7a56', tono), inc = Math.sin(seed * 4.1) * 0.12; ctx.rotate(inc);
  ctx.fillStyle = lam; ctx.beginPath(); ctx.moveTo(-16, 0); ctx.quadraticCurveTo(-30, -70, -130, -118); ctx.lineTo(140, -118); ctx.quadraticCurveTo(34, -70, 22, 0); ctx.closePath(); ctx.fill();
  ctx.save(); ctx.clip(); ctx.strokeStyle = mixc('#b9ad98', '#5a4028', tono); ctx.lineWidth = 1.6; ctx.beginPath(); for (let i = -16; i <= 16; i++) { ctx.moveTo(i * 8.4, -122); ctx.quadraticCurveTo(i * 3.5, -64, i * 1.1, -2); } ctx.stroke(); ctx.restore();
  const g = ctx.createLinearGradient(0, -170, 0, -110); g.addColorStop(0, mixc(cap, '#ffffff', 0.18)); g.addColorStop(1, cap); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-138, -116); ctx.bezierCurveTo(-120, -176, 120, -182, 148, -116); ctx.quadraticCurveTo(0, -100, -138, -116); ctx.fill(); ctx.restore();
}
// Champiñón de lado. pie y sombrero permiten dibujar la forma de "baqueta" (pie largo, sombrero chico).
function champi(ctx, x, y, s, pie = 1, somb = 1, a = 1, tono = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a; const hp = 50 * pie, c = mixc('#efe7d6', '#b08a5a', tono);
  ctx.fillStyle = mixc('#e3d9c4', '#9a7648', tono); ctx.beginPath(); ctx.roundRect(-14, -hp, 28, hp + 4, 8); ctx.fill();
  const g = ctx.createLinearGradient(0, -hp - 50 * somb, 0, -hp); g.addColorStop(0, mixc(c, '#ffffff', 0.3)); g.addColorStop(1, c); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-46 * somb, -hp + 4); ctx.bezierCurveTo(-56 * somb, -hp - 86 * somb, 56 * somb, -hp - 86 * somb, 46 * somb, -hp + 4); ctx.quadraticCurveTo(0, -hp - 6, -46 * somb, -hp + 4); ctx.fill(); ctx.restore();
}
// Frasco con grano. mic: avance del micelio (0..1, desde arriba). humedo: zona de mancha húmeda abajo a la derecha.
function frascoGrano(ctx, x, y, w, h, o = {}) {
  const R = rng(o.seed || 5), mic = o.mic || 0, hum = o.humedo || 0, verde = o.verde || 0, a = o.a ?? 1; ctx.save(); ctx.globalAlpha *= a;
  ctx.save(); ctx.beginPath(); ctx.roundRect(x - w / 2 + 5, y - h * 0.86, w - 10, h * 0.86 - 5, w * 0.08); ctx.clip();
  ctx.fillStyle = '#8a6a34'; ctx.fillRect(x - w / 2, y - h * 0.86, w, h); const n = Math.round(w * h / 170), gs = Math.sqrt(w * h) / 48;
  for (let i = 0; i < n; i++) { const px = x - w / 2 + R() * w, py = y - R() * h * 0.84, rot = R() * 3, k = R(); const dm = (y - py) / (h * 0.84), blanco = cl((mic * 1.25 - (1 - dm)) * 5) , dh = Math.hypot((px - (x + w * 0.2)) / (w * 0.45), (py - (y - h * 0.16)) / (h * 0.26)), mojado = hum * cl((1 - dh) * 3), dv = Math.hypot((px - (x - w * 0.1)) / (w * 0.5), (py - (y - h * 0.5)) / (h * 0.3)), vv = verde * cl((verde * 1.3 - dv) * 3);
    let c = mixc(mixc('#b8873e', '#d9b468', k), '#f2eee2', blanco * (1 - mojado) * 0.9); if (mojado > 0) c = mixc(c, '#8a6a34', mojado * 0.7); if (vv > 0) c = mixc(c, CO.tri, vv);
    ctx.save(); ctx.translate(px, py); ctx.rotate(rot); ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(0, 0, gs * 1.5, gs * 0.85, 0, 0, TAU); ctx.fill();
    if (mojado > 0.3) { ctx.strokeStyle = `rgba(240,240,225,${0.7 * mojado})`; ctx.lineWidth = 1.6; ctx.stroke(); ctx.fillStyle = `rgba(255,255,255,${0.35 * mojado})`; ctx.beginPath(); ctx.ellipse(-gs * 0.4, -gs * 0.25, gs * 0.45, gs * 0.2, 0, 0, TAU); ctx.fill(); } ctx.restore(); }
  ctx.restore(); frasco(ctx, x, y, w, h, 1, o.tapa !== false); ctx.restore();
}
// Bolsa de cultivo con bloque de sustrato. color: del sustrato; mic: blanqueo por micelio.
function bolsa(ctx, x, y, w, h, o = {}) {
  const R = rng(o.seed || 3), a = o.a ?? 1; ctx.save(); ctx.globalAlpha *= a; const base = mixc(o.color || '#8a6a3a', '#ece7da', (o.mic || 0) * 0.8);
  ctx.fillStyle = base; ctx.beginPath(); ctx.roundRect(x - w / 2, y - h * 0.68, w, h * 0.68, 18); ctx.fill(); ctx.save(); ctx.clip();
  for (let i = 0; i < 160; i++) { ctx.fillStyle = `rgba(${R() < 0.5 ? '40,26,10' : '255,240,200'},${0.1 + R() * 0.16})`; const px = x - w / 2 + R() * w, py = y - R() * h * 0.68; ctx.save(); ctx.translate(px, py); ctx.rotate(R() * 3); ctx.fillRect(-10, -1.5, 20 + R() * 16, 3); ctx.restore(); } ctx.restore();
  ctx.strokeStyle = 'rgba(210,228,250,.5)'; ctx.fillStyle = 'rgba(160,190,230,.06)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - w / 2 - 8, y + 4); ctx.lineTo(x - w / 2 - 8, y - h * 0.74); ctx.quadraticCurveTo(x - w * 0.3, y - h * 0.92, x - w * 0.16, y - h); ctx.lineTo(x + w * 0.16, y - h); ctx.quadraticCurveTo(x + w * 0.3, y - h * 0.92, x + w / 2 + 8, y - h * 0.74); ctx.lineTo(x + w / 2 + 8, y + 4); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = 'rgba(235,240,250,.75)'; ctx.fillRect(x - w * 0.1, y - h * 0.86, w * 0.2, h * 0.07); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - w / 2 + 6, y - h * 0.62); ctx.lineTo(x - w / 2 + 6, y - h * 0.2); ctx.stroke(); ctx.restore();
}
// Olla de presión con manómetro y válvula. vapor: 0..1.
function olla(ctx, x, y, s, vapor = 0, T = 0, aguja = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const g = ctx.createLinearGradient(-170, 0, 170, 0); g.addColorStop(0, '#4a5262'); g.addColorStop(0.35, '#aab4c6'); g.addColorStop(1, '#3a4150'); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-170, -260, 340, 260, [14, 14, 34, 34]); ctx.fill();
  ctx.fillStyle = '#20242e'; ctx.beginPath(); ctx.roundRect(-232, -214, 64, 26, 10); ctx.fill(); ctx.beginPath(); ctx.roundRect(168, -214, 64, 26, 10); ctx.fill();
  ctx.fillStyle = '#7f899c'; ctx.beginPath(); ctx.roundRect(-186, -292, 372, 38, 14); ctx.fill(); ctx.fillStyle = '#20242e'; ctx.beginPath(); ctx.roundRect(-34, -322, 68, 32, 10); ctx.fill();
  ctx.fillStyle = '#2a2f3a'; ctx.beginPath(); ctx.roundRect(84, -326 - Math.abs(Math.sin(T * 9)) * 6 * vapor, 26, 36, 6); ctx.fill();
  ctx.fillStyle = '#f1efe6'; ctx.strokeStyle = '#20242e'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(-104, -338, 40, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#d0392b'; ctx.beginPath(); ctx.moveTo(-104, -338); ctx.arc(-104, -338, 34, -0.5, 0.3); ctx.fill();
  const an = Math.PI * 0.85 + aguja * Math.PI * 0.95; ctx.strokeStyle = '#111'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-104, -338); ctx.lineTo(-104 + Math.cos(an) * 30, -338 + Math.sin(an) * 30); ctx.stroke();
  ctx.restore();
  if (vapor > 0) for (let i = 0; i < 7; i++) { const u = ((T * 0.5 + i / 7) % 1); halo(ctx, x + (97 + Math.sin(i * 3 + T) * 30 * u) * s, y - (340 + u * 230) * s, (26 + u * 60) * s, '#dfe8f5', 0.3 * vapor * (1 - u)); }
}
// Busto con pulmones (silueta genérica). estado 0 = sano, 1 = con infección (halo rojo).
function busto(ctx, x, y, s, estado = 0, a = 1, T = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a; ctx.fillStyle = '#18202f'; ctx.strokeStyle = 'rgba(160,185,225,.5)'; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.arc(0, -330, 78, 0, TAU); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-200, 60); ctx.quadraticCurveTo(-200, -220, -60, -236); ctx.lineTo(60, -236); ctx.quadraticCurveTo(200, -220, 200, 60); ctx.closePath(); ctx.fill(); ctx.stroke();
  const resp = 1 + 0.03 * Math.sin(T * 1.6), c = mixc('#6fa8dc', '#e0563f', estado);
  ctx.strokeStyle = rgba(c, 0.9); ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -246); ctx.lineTo(0, -150); ctx.moveTo(0, -150); ctx.lineTo(-40, -120); ctx.moveTo(0, -150); ctx.lineTo(40, -120); ctx.stroke();
  for (const d of [-1, 1]) { ctx.save(); ctx.translate(d * 66, -60); ctx.scale(resp, resp); ctx.fillStyle = rgba(c, 0.3); ctx.strokeStyle = rgba(c, 0.9); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-d * 30, -80); ctx.bezierCurveTo(d * 30, -110, d * 76, -20, d * 60, 70); ctx.bezierCurveTo(d * 30, 96, -d * 30, 80, -d * 34, 40); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
  ctx.restore(); if (estado > 0.02) halo(ctx, x, y - 60 * s, 260 * s, '#ff5a4a', 0.4 * estado * a);
}
// Gota de agua.
function gota(ctx, x, y, r, a = 1) { if (a <= 0 || r <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = 'rgba(120,190,255,.35)'; ctx.strokeStyle = 'rgba(190,225,255,.9)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.8, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.ellipse(x - r * 0.35, y - r * 0.3, r * 0.22, r * 0.14, -0.5, 0, TAU); ctx.fill(); ctx.restore(); }
// Caja de Petri con el duelo: micelio blanco (desde la izquierda) contra un moho (desde la derecha).
function duelo(ctx, x, y, r, gM, gC, color, o = {}) {
  const k = r / 360, dx = r * 0.5, ac = (cx) => (px, py) => Math.hypot(px - cx, py) < 338;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.save(); ctx.translate(-180, 0); pintaRed(ctx, red('duM' + (o.seed || 0), { seed: 11 + (o.seed || 0), acepta: ac(180), max: 7000, brotes: 9 }), gM, CO.mic, { a: o.aM ?? 1 }); ctx.restore();
  if (gC > 0) { ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 340, 0, TAU); ctx.clip(); ctx.save(); ctx.translate(200, -40); pintaRed(ctx, red('duC' + (o.seed || 0), { seed: 23 + (o.seed || 0), acepta: ac(-200), max: 6000, brotes: 9 }), gC, o.blanco ? mixc(color, '#f2f2ee', o.blanco) : color, { a: 0.9 }); ctx.restore();
    if (o.polvo !== false) polvoMoho(ctx, 200, -40, 620 * gC, color, cl(gC * 1.3 - 0.12), 31 + (o.seed || 0), 900, o.aP ?? 1); ctx.restore(); }
  ctx.restore(); petri(ctx, x, y, r);
}
// Emblemas pequeños para desfiles y resúmenes.
function emblema(ctx, cual, x, y, s, T, g = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (cual === 'moho') aspergilo(ctx, 0, 110, 0.5, g, CO.tri, T);
  else if (cual === 'bact') { bacilo(ctx, -10, -10, 150, -0.4, 1, 1); bacilo(ctx, 30, 60, 90, 0.5, 1, 0); }
  else if (cual === 'acaro') acaro(ctx, 0, 10, 1.25, -0.5 + Math.sin(T * 0.7) * 0.1, T, '#d6a184');
  else if (cual === 'mosca') mosca(ctx, 20, 0, 1.5, 'sci', T, 1, 0);
  else if (cual === 'nema') nematodo(ctx, 95, 10, 0.42, -0.2, T, 1);
  else if (cual === 'virus') { ctx.strokeStyle = '#ff8fb0'; ctx.fillStyle = 'rgba(255,120,160,.2)'; ctx.lineWidth = 3; for (const [px, py, r] of [[-30, -20, 44], [44, 30, 30], [40, -56, 20]]) { ctx.beginPath(); for (let i = 0; i <= 6; i++) { const an = i / 6 * TAU + T * 0.2; i ? ctx.lineTo(px + Math.cos(an) * r, py + Math.sin(an) * r) : ctx.moveTo(px + Math.cos(an) * r, py + Math.sin(an) * r); } ctx.fill(); ctx.stroke(); } }
  ctx.restore();
}
window.K3 = { en, esquema, CO, micelio, polvoMoho, algodon, tubo, fialide, conidioTricho, penicilo, aspergilo, esporangio, bacilo, acaro, mosca, larva, nematodo, ostra, champi, frascoGrano, bolsa, olla, busto, gota, duelo, emblema };

/* ====== 00 · Gancho ====== */
LUZ.gancho = (ctx, e) => {
  noche(ctx, '#05080d', '#0a1016'); polvo(ctx, 18, 5, e.T, '#7f95c0', 0.25);
  const fin = cam(ctx, 1.02 + 0.06 * e.p, 800, 470);
  duelo(ctx, 800, 470, 360, 0.5 + 0.3 * eo(e.tl, 0, 5), 0.22 + 0.5 * eo(e.tl, 0, e.dur), CO.tri);
  fin();
  rotulo(ctx, 110, 300, 'Tu hongo', 'MICELIO BLANCO', ss(e.tl, 0.4, 1.2), { c: CO.mic });
  guia(ctx, 1150, 420, 1290, 660, en(e, 1, 0.8), CO.tri); rotulo(ctx, 1290, 730, '*Trichoderma*', 'MOHO VERDE', en(e, 1, 0.9, 0.3), { c: CO.tri });
};
LUZ.desfile = (ctx, e) => {
  noche(ctx, '#05070c', '#0b0f18'); polvo(ctx, 22, 9, e.T, '#7f95c0', 0.25);
  const E = [['moho', 'MOHOS', CO.tri], ['bact', 'BACTERIAS', CO.bac], ['acaro', 'ÁCAROS', '#e0a184'], ['mosca', 'MOSCAS', '#aab3c8'], ['nema', 'NEMATODOS', '#bfe0d0'], ['virus', 'VIRUS', '#ff8fb0']];
  E.forEach(([k, n, c], i) => { const t0 = 0.3 + (i ? e.L(1) + (i - 1) * 1.2 - 0.3 : 0), a = eo(e.tl, t0, t0 + 0.8), x = 210 + i * 300, y = 440 + Math.sin(e.T * 0.8 + i) * 6 + (1 - a) * 40;
    ctx.save(); ctx.globalAlpha = a; halo(ctx, x, y, 170, c, 0.12); emblema(ctx, k, x, y, 1.25, e.T, a); ctx.restore(); txt(ctx, n, x, 660, { s: 24, f: 'mono', w: 700, ls: 5, al: 'center', c, a }); });
  ['RECONOCERLOS', 'POR DÓNDE ENTRAN', 'QUÉ SE HACE'].forEach((s, i) => chip(ctx, s, 480 + i * 480, 780, { al: 'center', s: 26, a: en(e, 2, 0.6, 0.4 + i * 1.3) }));
};

/* ====== 01 · Una carrera por la comida ====== */
LUZ.banquete = (ctx, e) => {
  noche(ctx, '#0b0907', '#141009');
  const a0 = eo(e.tl, 0.1, 0.9), a1 = eo(e.tl, 1.3, 2.1), a2 = eo(e.tl, 2.6, 3.4), todos = en(e, 1, 1.2), bc = en(e, 2, 1);
  halo(ctx, 960, 560, 900, '#ffb05a', 0.1);
  frascoGrano(ctx, 420, 760 + (1 - a0) * 30, 300, 430, { a: a0, seed: 4 }); bolsa(ctx, 960, 760 + (1 - a1) * 30, 330, 470, { a: a1, color: '#b89a4a', seed: 6 }); bolsa(ctx, 1500, 760 + (1 - a2) * 30, 330, 470, { a: a2, color: '#7a5632', seed: 8 });
  ['GRANO COCIDO', 'PAJA HÚMEDA', 'ASERRÍN'].forEach((s, i) => txt(ctx, s, 420 + i * 540, 830, { s: 24, f: 'mono', w: 700, ls: 5, al: 'center', c: LUZC.oro, a: [a0, a1, a2][i] }));
  // todo lo que vive quiere el banquete: puntos de colores que se acercan
  const R = rng(17), cols = [CO.tri, CO.pen, CO.neu, CO.asp, CO.bac, CO.muc];
  for (let i = 0; i < 70; i++) { const an = R() * TAU, d0 = 900 + R() * 300, tx = 420 + Math.floor(R() * 3) * 540 + (R() - 0.5) * 220, ty = 480 + (R() - 0.5) * 300, k = eo(e.tl, e.L(1) + R() * 2.5, e.L(1) + 3 + R() * 6), c = cols[i % 6];
    if (k <= 0) continue; halo(ctx, mixn(tx + Math.cos(an) * d0, tx, k), mixn(ty + Math.sin(an) * d0 * 0.6, ty, k) + Math.sin(e.T * 2 + i) * 4, 13 + R() * 9, c, 0.8 * todos); }
  // Bacillus sobre el grano
  if (bc > 0) { const Rb = rng(3); for (let i = 0; i < 26; i++) { const k = cl(bc * 26 - i * 0.5 - (e.tl - e.L(2) < 0 ? 0 : 0)); const px = 330 + Rb() * 190, py = 420 + Rb() * 260, an = Rb() * 3; if (eo(e.tl, e.L(2) + i * 0.16, e.L(2) + i * 0.16 + 0.5) <= 0) continue; ctx.save(); ctx.globalAlpha = eo(e.tl, e.L(2) + i * 0.16, e.L(2) + i * 0.16 + 0.5); bacilo(ctx, px, py, 34, an, 1, 0); ctx.restore(); }
    rotulo(ctx, 620, 300, '*Bacillus*', 'ORGÁNICO + HÚMEDO + OXÍGENO', bc, { c: CO.bac }); }
};
LUZ.aire = (ctx, e) => {
  noche(ctx, '#060a12', '#0a1220');
  // haz de luz con esporas flotando
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createLinearGradient(700, 0, 1100, 800); g.addColorStop(0, 'rgba(160,190,240,.10)'); g.addColorStop(1, 'rgba(160,190,240,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(620, 0); ctx.lineTo(1000, 0); ctx.lineTo(1380, 860); ctx.lineTo(560, 860); ctx.closePath(); ctx.fill(); ctx.restore();
  const R = rng(8), cols = [CO.tri, CO.pen, CO.neu, CO.asp, CO.muc, '#ffffff'], viento = en(e, 1, 1.5), T = e.T;
  // caja de Petri abierta, en perspectiva
  ctx.save(); ctx.translate(960, 740); ctx.scale(1, 0.32); petri(ctx, 0, 0, 330); ctx.restore();
  for (let i = 0; i < 90; i++) { const x0 = 420 + R() * 1080, sp = 26 + R() * 40, ph = R() * 900, c = cols[i % 6], sz = 5 + R() * 8, sw = R() * 6; const yy = ((ph + e.tl * sp) % 760) + 40, xx = x0 + Math.sin(T * 0.7 + sw) * (20 + 110 * viento) + viento * Math.sin(yy * 0.01 + T) * 60; halo(ctx, xx, yy, sz, c, 0.75); }
  // colonias que nacen donde cayeron
  const Rc = rng(21); for (let i = 0; i < 9; i++) { const an = Rc() * TAU, d = Math.sqrt(Rc()) * 270, t0 = 1.5 + Rc() * 12, k = eo(e.tl, t0, t0 + 4), c = cols[i % 5]; if (k <= 0) continue; ctx.save(); ctx.translate(960 + Math.cos(an) * d, 740 + Math.sin(an) * d * 0.32); ctx.scale(1, 0.32); polvoMoho(ctx, 0, 0, 20 + 46 * k, c, 1, i + 2, 60, 0.9); ctx.restore(); }
  rotulo(ctx, 110, 300, 'Por el aire', 'ESPORAS', ss(e.tl, 0.4, 1.2));
  // aire acondicionado
  const av = en(e, 1, 0.8); ctx.save(); ctx.globalAlpha = av; ctx.fillStyle = '#d9dee8'; ctx.beginPath(); ctx.roundRect(1380, 150, 380, 110, 16); ctx.fill(); ctx.fillStyle = '#8f98aa'; ctx.fillRect(1400, 226, 340, 10); ctx.strokeStyle = 'rgba(200,225,255,.6)'; ctx.lineWidth = 3; ctx.lineCap = 'round';
  for (let i = 0; i < 5; i++) { const u = (T * 0.5 + i / 5) % 1; ctx.globalAlpha = av * (1 - u); ctx.beginPath(); for (let k = 0; k <= 20; k++) { const q = k / 20, px = 1700 - i * 60 - q * 420 * u - 100 * u, py = 270 + q * 300 * u + Math.sin(q * 9 + T * 3) * 10; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore();
  ['AGUA', 'GRANO', 'TIERRA', 'INSECTOS', 'HERRAMIENTAS', 'PERSONAS'].forEach((s, i) => { const a = en(e, 2, 0.5, i * 0.75); chip(ctx, s, i < 3 ? 110 : 1810, 470 + (i % 3) * 86, { al: i < 3 ? 'left' : 'right', a, s: 24, c: cols[i % 5] }); flecha(ctx, i < 3 ? 400 : 1520, 470 + (i % 3) * 86, i < 3 ? 640 : 1280, 700, a, 'rgba(220,230,250,.45)', 2); });
};
LUZ.carrera = (ctx, e) => {
  noche(ctx, '#05080d', '#0a1016');
  ctx.save(); ctx.globalAlpha = 0.45; duelo(ctx, 960, 470, 400, 0.3 + 0.5 * e.p, 0.2 + 0.45 * e.p, CO.tri, { seed: 2 }); ctx.restore(); oscurece(ctx, 0.35);
  titulo(ctx, 'Saber cultivar hongos', 960, 400, en(e, 0, 0.9, 0.3), { s: 78 }); titulo(ctx, 'es saber controlar la contaminación', 960, 510, en(e, 1, 0.9), { s: 78, c: LUZC.oro });
  chip(ctx, 'STAMETS Y CHILTON · THE MUSHROOM CULTIVATOR · 1983', 960, 640, { al: 'center', a: en(e, 1, 0.8, 1), s: 20 });
};

/* ====== 02 · El moho verde ====== */
LUZ.tr_blanco = (ctx, e) => {
  noche(ctx, '#050a08', '#0a140e');
  const fin = cam(ctx, 1 + 0.07 * e.p, 760, 480); const x = 700, y = 480, r = 340;
  micelio(ctx, 'trM', x, y, 0.75 + 0.25 * e.p, CO.mic, { seed: 5, radio: 318, max: 8000, a: 0.8, brotes: 10 });
  const b = ss(e.tl, e.L(1) - 0.5, e.L(1) + 5), v = ss(e.tl, e.L(2) + 1, e.L(2) + 6.5), px = x + 120, py = y - 70;
  algodon(ctx, px, py, 60 + 120 * b, '#ffffff', b, 3, 1.3); micelio(ctx, 'trT', px, py, b, '#ffffff', { seed: 9, radio: 175, max: 4000, a: 0.9, brotes: 12, rama: 0.12 });
  // esporulación en bandas concéntricas verdes (F2)
  for (let k = 0; k < 3; k++) polvoMoho(ctx, px, py, 40 + k * 55, CO.tri, cl(v * 3 - k) * 1.3, 40 + k, 260 + k * 160, cl(v * 3 - k));
  petri(ctx, x, y, r); fin();
  rotulo(ctx, 1240, 300, '*Trichoderma*', 'BLANCO Y ALGODONOSO AL PRINCIPIO', en(e, 1, 0.8), { c: v > 0.3 ? CO.tri : CO.mic });
  const dia = 1 + Math.floor(3.999 * ss(e.tl, e.L(1), e.L(2) + 2)); txt(ctx, 'DÍA', 1270, 520, { s: 26, f: 'mono', w: 700, ls: 8, c: '#9fb0c8', a: en(e, 1) }); txt(ctx, String(dia), 1270, 660, { s: 150, f: 'serif', w: 500, a: en(e, 1), c: dia >= 4 ? CO.tri : LUZC.blanco });
  chip(ctx, 'ESPORAS: APARECE EL VERDE', 1260, 760, { a: v, c: CO.tri }); chip(ctx, 'EN MEDIO DE LABORATORIO', 1260, 824, { a: en(e, 2, 0.6, 0.6), c: '#8fa0bd', s: 18 });
};
LUZ.tr_micro = (ctx, e) => {
  noche(ctx, '#040807', '#08120c'); polvo(ctx, 16, 4, e.T, '#6fb88a', 0.2);
  const g = ss(e.tl, 0.1, e.L(1) + 2.5); conidioTricho(ctx, 820, 850, 1.28, g, e.T, ss(e.tl, e.L(1) + 2.6, e.L(1) + 5));
  rotulo(ctx, 130, 300, '*Trichoderma*', 'AL MICROSCOPIO', ss(e.tl, 0.3, 1.1), { c: CO.tri });
  guia(ctx, 836, 640, 1200, 640, ss(e.tl, 1.4, 2.2)); chip(ctx, 'CONIDIÓFORO MUY RAMIFICADO', 1210, 640, { a: ss(e.tl, 1.6, 2.4), c: CO.hial });
  guia(ctx, 1010, 420, 1200, 420, en(e, 1, 0.7, 0.6)); chip(ctx, 'FIÁLIDES: «BOTELLITAS»', 1210, 420, { a: en(e, 1, 0.7, 0.8), c: CO.hial });
  guia(ctx, 990, 268, 1200, 250, ss(e.tl, e.L(1) + 3.6, e.L(1) + 4.4), CO.tri); chip(ctx, 'ESPORAS VERDES EN BOLITAS HÚMEDAS', 1210, 250, { a: ss(e.tl, e.L(1) + 3.8, e.L(1) + 4.6), c: CO.tri });
  esquema(ctx);
};
LUZ.tr_gana = (ctx, e) => {
  noche(ctx, '#040807', '#07100b'); const T = e.T, a1 = en(e, 1, 1), a2 = en(e, 2, 1);
  // hifa del hongo cultivado (tubo grueso); se rompe al final
  const rota = ss(e.tl, e.L(2) + 4, e.L(2) + 8); const H = []; for (let i = 0; i <= 40; i++) H.push([80 + i * 36, 520 + Math.sin(i * 0.3) * 14]);
  tubo(ctx, H, 62, CO.mic, 1 - 0.55 * rota); for (let i = 5; i < 40; i += 7) { ctx.strokeStyle = rgba(CO.mic, 0.6 * (1 - 0.5 * rota)); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(H[i][0], H[i][1] - 28); ctx.lineTo(H[i][0], H[i][1] + 28); ctx.stroke(); }
  rotulo(ctx, 130, 330, 'Hifa del hongo cultivado', null, ss(e.tl, 0.3, 1), { c: CO.mic, s: 40 });
  // Trichoderma llega, suelta enzimas y se enrolla
  const llega = ss(e.tl, e.L(1), e.L(1) + 3), P = []; for (let i = 0; i <= 30 * llega; i++) P.push([60 + i * 14, 860 - i * 8 - Math.sin(i * 0.4) * 10]);
  if (P.length > 1) tubo(ctx, P, 20, CO.tri, 1);
  const R = rng(5); for (let i = 0; i < 40; i++) { const t0 = e.L(1) + 1.5 + R() * 6, u = ((e.tl - t0) / 3) % 1, px = 420 + R() * 700, c = i % 2 ? '#ffd27a' : '#ff8a7a'; if (e.tl < t0) continue; halo(ctx, px, mixn(700, 560, u) + Math.sin(T * 3 + i) * 5, 9, c, 0.8 * (1 - u) * a1); }
  chip(ctx, 'ENZIMAS', 540, 760, { a: en(e, 1, 0.6, 2), c: '#ffd27a' }); chip(ctx, 'SUSTANCIAS TÓXICAS', 800, 760, { a: en(e, 1, 0.6, 4), c: '#ff8a7a' });
  if (a2 > 0) { const k = ss(e.tl, e.L(2) + 0.5, e.L(2) + 5), n = Math.floor(220 * k); ctx.save(); ctx.lineCap = 'round';
    for (const capa of [0, 1]) { ctx.beginPath(); let abierto = false; for (let i = 0; i <= n; i++) { const u = i / 220, px = 480 + u * 900, ph = u * TAU * 7, py = 520 + Math.sin(480 / 36 * 0.3 + u * 7.5) * 14 + Math.sin(ph) * 46, frente = Math.cos(ph) > 0; if (frente === (capa === 1)) { abierto ? ctx.lineTo(px, py) : ctx.moveTo(px, py); abierto = true; } else abierto = false; }
      ctx.lineWidth = 15; ctx.strokeStyle = rgba(CO.tri, capa ? 1 : 0.35); ctx.stroke(); } ctx.restore();
    for (let i = 0; i < 6; i++) halo(ctx, 600 + i * 140, 520 + Math.sin(i) * 20, 60 + 30 * Math.sin(T * 3 + i), '#ff8a5a', 0.35 * rota);
    rotulo(ctx, 1050, 300, 'Micoparásito', 'SE ENROLLA · ROMPE LA PARED · SE ALIMENTA', a2, { c: CO.tri }); }
  esquema(ctx);
};
LUZ.tr_especies = (ctx, e) => {
  noche(ctx, '#060a08', '#0b130e'); const a0 = ss(e.tl, 0.2, 1), a1 = en(e, 1, 0.9);
  // champiñón sobre composta con parche verde
  ctx.save(); ctx.globalAlpha = a0; ctx.fillStyle = '#2a1c12'; ctx.beginPath(); ctx.roundRect(120, 640, 700, 150, 16); ctx.fill(); polvoMoho(ctx, 560, 660, 120, CO.tri, ss(e.tl, 1, 4), 3, 380); for (let i = 0; i < 5; i++) champi(ctx, 200 + i * 62, 650, 1.1 + 0.2 * Math.sin(i * 3), 1, 1); ctx.restore();
  rotulo(ctx, 150, 330, '*Trichoderma aggressivum*', 'EN CHAMPIÑÓN (*Agaricus*)', a0, { c: CO.tri, s: 42 });
  // setas en bolsa con parches verdes
  ctx.save(); ctx.globalAlpha = a1; bolsa(ctx, 1420, 800, 330, 380, { color: '#b89a4a', mic: 0.6, seed: 5 }); polvoMoho(ctx, 1350, 650, 70, CO.tri, ss(e.tl, e.L(1) + 1, e.L(1) + 4), 5, 220); polvoMoho(ctx, 1500, 730, 50, CO.tri, ss(e.tl, e.L(1) + 2, e.L(1) + 5), 6, 160); ostra(ctx, 1640, 640, 0.8, 0, 2); ostra(ctx, 1700, 720, 0.6, 0, 5); ctx.restore();
  rotulo(ctx, 1010, 330, '*T. pleuroti* y *T. pleuroticola*', 'EN SETAS (*Pleurotus*)', a1, { c: CO.tri, s: 42 });
};
LUZ.tr_entra = (ctx, e) => {
  noche(ctx, '#060a08', '#0b130e'); const T = e.T;
  bolsa(ctx, 960, 800, 340, 460, { color: '#b89a4a', mic: 0.7, seed: 7 }); polvoMoho(ctx, 960, 600, 120, CO.tri, ss(e.tl, 3, e.dur), 8, 400);
  const V = [['GENTE', 250, 300], ['EQUIPO', 250, 480], ['PLÁSTICOS', 250, 660]];
  V.forEach(([s, x, y], i) => { const a = ss(e.tl, 0.3 + i * 1.1, 1 + i * 1.1); chip(ctx, s, x, y, { al: 'center', a, s: 26, c: LUZC.oro }); for (let k = 0; k < 8; k++) { const u = ((T * 0.35 + k / 8) % 1); halo(ctx, mixn(x + 110, 820, u), mixn(y, 620, u) + Math.sin(u * 9 + i) * 12, 8, CO.tri, 0.8 * a * Math.sin(u * Math.PI)); } });
  const a1 = en(e, 1, 0.9), u1 = eo(e.tl, e.L(1), e.L(1) + 3.5);
  ctx.save(); ctx.globalAlpha = a1; mosca(ctx, mixn(1800, 1330, u1), mixn(250, 420, u1) + Math.sin(T * 5) * 8, 2.2, 'sci', T, -1, 1); acaro(ctx, mixn(1800, 1280, u1), 700, 1.1, Math.PI, T, '#c8553a'); ctx.restore();
  for (let k = 0; k < 6; k++) { halo(ctx, mixn(1800, 1330, u1) + 30 + k * 14, mixn(250, 420, u1) + 10 + Math.sin(k * 2) * 12, 7, CO.tri, a1); halo(ctx, mixn(1800, 1280, u1) + (k - 3) * 12, 690 + Math.sin(k) * 12, 6, CO.tri, a1); }
  chip(ctx, 'MOSCAS', 1560, 260, { a: a1, s: 24, c: '#aab3c8' }); chip(ctx, 'ÁCAROS QUE COMEN SUS ESPORAS', 1380, 800, { a: en(e, 1, 0.6, 1.4), s: 22, c: '#e0a184' });
};
LUZ.tr_desecha = (ctx, e) => {
  noche(ctx, '#07090c', '#0c1016'); const u = eo(e.tl, e.L(1), e.L(1) + 3), x = mixn(520, 1380, u);
  // el laboratorio (izquierda) y la puerta
  ctx.fillStyle = '#0f141d'; ctx.fillRect(0, 780, 1920, 120); ctx.strokeStyle = 'rgba(200,220,245,.35)'; ctx.lineWidth = 6; ctx.strokeRect(930, 240, 20, 540); txt(ctx, 'LABORATORIO', 480, 250, { s: 24, f: 'mono', w: 700, ls: 8, al: 'center', c: '#8fa0bd' }); txt(ctx, 'AFUERA', 1420, 250, { s: 24, f: 'mono', w: 700, ls: 8, al: 'center', c: '#8fa0bd', a: en(e, 1) });
  frascoGrano(ctx, x, 780, 240, 340, { mic: 0.9, verde: 0.9, seed: 9 });
  chip(ctx, 'CERRADO', x, 380, { al: 'center', c: LUZC.oro, a: ss(e.tl, 0.6, 1.3) });
  sello(ctx, 'SE DESTRUYE', 1380, 560, ss(e.tl, e.L(1) + 2.6, e.L(1) + 3.1), LUZC.rojo, -0.08, 50);
  flecha(ctx, 700, 600, 1160, 600, en(e, 1, 1.5) * (1 - u), LUZC.oro, 4);
};

/* ====== 03 · Los otros mohos ====== */
LUZ.penicillium = (ctx, e) => {
  noche(ctx, '#050a0c', '#091318'); const g = ss(e.tl, 0, e.L(2));
  micelio(ctx, 'peM', 520, 500, 0.9, CO.mic, { seed: 14, radio: 290, max: 5000, a: 0.35 });
  algodon(ctx, 560, 470, 60 + 150 * g, '#ffffff', 1, 4, 1.2, 40); polvoMoho(ctx, 560, 470, 30 + 130 * g, CO.pen, 1.2, 12, 700); petri(ctx, 520, 500, 310);
  rotulo(ctx, 960, 290, '*Penicillium*', 'VERDE AZULADO · POLVOSO', ss(e.tl, 0.4, 1.2), { c: CO.pen });
  guia(ctx, 560 + (45 + 140 * g), 470, 960, 420, en(e, 1, 0.7)); chip(ctx, 'ORILLA BLANCA: CRECIMIENTO NUEVO', 970, 420, { a: en(e, 1, 0.7, 0.3), c: CO.mic, s: 20 });
  const gm = ss(e.tl, e.L(2), e.L(2) + 4); if (gm > 0) { penicilo(ctx, 1620, 860, 1, gm, CO.pen, e.T); chip(ctx, 'PINCEL · ESPORAS EN CADENA', 1620, 250, { al: 'center', a: ss(e.tl, e.L(2) + 2.5, e.L(2) + 3.3), c: CO.pen, s: 20 }); esquema(ctx, gm); }
  chip(ctx, 'PROBABLEMENTE EL MÁS COMÚN EN EL LABORATORIO', 1540, 640, { al: 'right', a: en(e, 3, 0.8), s: 20 });
};
LUZ.aspergillus = (ctx, e) => {
  noche(ctx, '#0a0a06', '#12110a');
  [[CO.asp, 'AMARILLO'], [CO.tri, 'VERDE'], ['#565b66', 'NEGRO']].forEach(([c, n], i) => { const a = eo(e.tl, 0.2 + i * 0.7, 1 + i * 0.7), x = 240 + i * 290; ctx.save(); ctx.globalAlpha = a; polvoMoho(ctx, x, 600, 95, c, a * 1.2, 20 + i, 420); petri(ctx, x, 600, 125); ctx.restore(); txt(ctx, n, x, 780, { s: 22, f: 'mono', w: 700, ls: 5, al: 'center', c: i === 2 ? '#aab0bc' : c, a }); });
  rotulo(ctx, 130, 300, '*Aspergillus*', 'VARIAS ESPECIES, VARIOS COLORES', ss(e.tl, 0.3, 1.1), { c: CO.asp });
  const g = ss(e.tl, e.L(1) - 0.5, e.L(1) + 4); aspergilo(ctx, 1400, 860, 1.5, g, CO.asp, e.T);
  guia(ctx, 1400, 370, 1150, 300, ss(e.tl, e.L(1) + 1.6, e.L(1) + 2.4)); chip(ctx, 'VESÍCULA: CABEZA HINCHADA', 1140, 300, { al: 'right', a: ss(e.tl, e.L(1) + 1.8, e.L(1) + 2.6), c: CO.hial, s: 20 });
  chip(ctx, 'CADENAS DE ESPORAS', 1700, 150, { al: 'center', a: ss(e.tl, e.L(1) + 3.6, e.L(1) + 4.4), c: CO.asp, s: 20 }); esquema(ctx, g);
};
LUZ.asp_riesgo = (ctx, e) => {
  noche(ctx, '#0a0807', '#120d0b'); const T = e.T, a1 = en(e, 1), a2 = en(e, 2), a3 = en(e, 3), a4 = en(e, 4, 0.5);
  busto(ctx, 420, 800, 1.15, 0, ss(e.tl, 0.2, 1), T); if (a2 > 0) busto(ctx, 1040, 800, 1.15, ss(e.tl, e.L(2) + 1.5, e.L(2) + 4), a2, T);
  // esporas que se respiran
  const R = rng(6); for (let i = 0; i < 46; i++) { const quien = i % 2, x1 = quien ? 1040 : 420, u = ((e.tl * 0.22 + R()) % 1), x0 = x1 + (R() - 0.5) * 700, y0 = 150 + R() * 200, a = (quien ? a2 : a1) * Math.sin(u * Math.PI); const k = u * u; halo(ctx, mixn(x0, x1 + (R() - 0.5) * 120, k), mixn(y0, 700 + (R() - 0.5) * 100, k), 8, CO.asp, 0.8 * a); }
  chip(ctx, 'A DIARIO · SIN ENFERMAR', 420, 880 - 20, { al: 'center', a: a1, c: '#6fa8dc', s: 20 });
  rotulo(ctx, 800, 250, 'Aspergilosis', 'DEFENSAS BAJAS O ENFERMEDAD PULMONAR', a2, { c: LUZC.rojo, s: 44 });
  if (a3 > 0) { ctx.save(); ctx.globalAlpha = a3 * (1 - 0.7 * a4); polvoMoho(ctx, 1620, 560, 100, CO.asp, 1.2, 9, 420); petri(ctx, 1620, 560, 130); ctx.restore(); rotulo(ctx, 1470, 770, '*Aspergillus flavus*', 'AFLATOXINAS', a3 * (1 - a4), { c: CO.asp, s: 38 }); }
  if (a4 > 0) { oscurece(ctx, 0.45 * a4); sello(ctx, 'NO SE ABRE NI SE HUELE EN CASA', 960, 500, a4, LUZC.rojo, -0.04, 58); }
};
LUZ.neurospora = (ctx, e) => {
  noche(ctx, '#0c0706', '#160c0a'); const g = ss(e.tl, 0.2, e.L(2) - 0.3), T = e.T;
  micelio(ctx, 'neu', 560, 490, 0.12 + 0.88 * g, CO.neu, { seed: 31, radio: 300, max: 9000, brotes: 14, rama: 0.11 }); algodon(ctx, 560, 490, 300 * g, CO.neu, 1, 7, 0.6); polvoMoho(ctx, 560, 490, 290 * g, '#ff9a70', cl(g * 1.4 - 0.5), 4, 800, 0.8); petri(ctx, 560, 490, 320);
  rotulo(ctx, 950, 230, '*Neurospora*', 'MOHO ROSA · EL VELOCISTA', ss(e.tl, 0.3, 1.1), { c: CO.neu });
  const ar = en(e, 1, 0.7) * (1 - en(e, 2, 0.8)); reloj(ctx, 1130, 470, 110, 24 * ss(e.tl, e.L(1), e.L(2) - 0.3), ar); txt(ctx, Math.round(24 * ss(e.tl, e.L(1), e.L(2) - 0.3)) + ' h', 1290, 500, { s: 90, f: 'serif', w: 500, a: ar });
  // frascos vecinos: atraviesa el filtro
  const a2 = en(e, 2, 0.9); if (a2 > 0) { const k = ss(e.tl, e.L(2) + 0.6, e.L(2) + 5.5);
    [1100, 1400, 1700].forEach((x, i) => { ctx.save(); ctx.globalAlpha = a2; frascoGrano(ctx, x, 830, 200, 290, { mic: i ? 0.6 : 0.2, seed: 12 + i }); const inf = i ? cl(k * 2.4 - i * 0.9) : 1; ctx.save(); ctx.beginPath(); ctx.roundRect(x - 95, 830 - 250, 190, 245, 16); ctx.clip(); polvoMoho(ctx, x, 620, 260 * inf, CO.neu, 1.2, 50 + i, 500, 0.9); ctx.restore(); ctx.restore(); });
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = rgba(CO.neu, 0.8 * a2); ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let j = 0; j < 2; j++) for (let h = 0; h < 5; h++) { const kk = cl(k * 2.2 - j * 0.9); if (kk <= 0) continue; const x0 = 1100 + j * 300 + (h - 2) * 14, x1 = 1400 + j * 300 + (h - 2) * 14; ctx.beginPath(); for (let q = 0; q <= 20 * kk; q++) { const u = q / 20, px = mixn(x0, x1, u), py = 512 - Math.sin(u * Math.PI) * (70 + h * 12) + Math.sin(u * 20 + h) * 4; q ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore();
    chip(ctx, 'ATRAVIESA ALGODÓN Y FILTROS', 1400, 380, { al: 'center', a: en(e, 2, 0.7, 0.8), c: CO.neu, s: 22 }); }
};
LUZ.neuro_calor = (ctx, e) => {
  noche(ctx, '#0a0807', '#140f0b'); const T = e.T, cal = ss(e.tl, 1, e.L(1)), fin = en(e, 1, 2);
  // baño de agua
  ctx.fillStyle = 'rgba(90,150,210,.16)'; ctx.strokeStyle = 'rgba(200,225,250,.5)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(360, 300, 1100, 500, [8, 8, 40, 40]); ctx.fill(); ctx.stroke(); halo(ctx, 910, 620, 700, '#ff7a3a', 0.16 * cal);
  for (let i = 0; i < 12; i++) { const u = ((T * 0.3 + i / 12) % 1); ctx.strokeStyle = `rgba(220,235,255,${0.5 * cal * (1 - u)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(420 + i * 90, 780 - u * 460, 6 + u * 6, 0, TAU); ctx.stroke(); }
  termometro(ctx, 1560, 720, 360, 0.2 + 0.4 * cal, mixc('#5a8ad8', '#ff5a3a', cal), 1); txt(ctx, Math.round(25 + 35 * cal) + ' °C', 1620, 520, { s: 70, f: 'serif', w: 500 }); chip(ctx, '30 MINUTOS', 1620, 600, { a: ss(e.tl, 2, 2.8), s: 22 });
  // conidios (redondos, anaranjados): mueren. Ascosporas (ovaladas, con costillas): despiertan.
  const R = rng(12); for (let i = 0; i < 34; i++) { const px = 420 + R() * 980, py = 360 + R() * 400, mu = cl(fin * 1.6 - R() * 0.6); ctx.fillStyle = mixc(CO.neu, '#3a3d46', mu); ctx.globalAlpha = 1 - 0.5 * mu; ctx.beginPath(); ctx.arc(px + Math.sin(T + i) * 4, py + Math.cos(T * 0.8 + i) * 4, 9, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; }
  [[620, 480, 0.3], [980, 640, -0.4], [1220, 450, 0.9]].forEach(([px, py, rot], i) => { ctx.save(); ctx.translate(px, py); ctx.rotate(rot); ctx.fillStyle = mixc('#2a2420', '#5a3a26', fin); ctx.strokeStyle = mixc('#8a7a6a', '#ffd9a0', fin); ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(0, 0, 50, 26, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.lineWidth = 1.4; for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.ellipse(0, 0, 50, 26 * Math.abs(Math.sin((k + 2.5) / 5 * Math.PI / 1.02)), 0, 0, TAU); ctx.stroke(); }
    const tb = ss(e.tl, e.L(1) + 1.5 + i * 0.5, e.L(1) + 4.5 + i * 0.5); if (tb > 0) { ctx.strokeStyle = CO.neu; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(48, 0); ctx.quadraticCurveTo(48 + 60 * tb, -30 * tb, 48 + 130 * tb, 10 * tb); ctx.stroke(); } ctx.restore(); if (fin > 0) halo(ctx, px, py, 110, '#ffb070', 0.45 * fin); });
  rotulo(ctx, 130, 250, 'Ascosporas', 'DUERMEN HASTA QUE EL CALOR LAS ACTIVA', ss(e.tl, 0.3, 1.1), { c: '#ffb070', s: 44 });
  chip(ctx, 'CONIDIOS: MUEREN', 500, 840, { a: fin, c: '#8f98aa', s: 22 }); chip(ctx, 'ASCOSPORAS: GERMINAN', 900, 840, { a: ss(e.tl, e.L(1) + 2, e.L(1) + 2.8), c: CO.neu, s: 22 }); esquema(ctx);
};
LUZ.mucor = (ctx, e) => {
  noche(ctx, '#07080b', '#0d0f15'); const g = ss(e.tl, e.L(1) - 2.5, e.L(1) + 4.5), R = rng(4);
  ctx.fillStyle = '#3a2a1a'; ctx.beginPath(); ctx.roundRect(80, 790, 980, 90, 14); ctx.fill(); algodon(ctx, 570, 780, 480, CO.muc, cl(g * 2), 6, 0.7, 50);
  for (let i = 0; i < 34; i++) { const x = 110 + R() * 920, h = 200 + R() * 240, d = R() * 0.35, inc = (R() - 0.5) * 0.3; esporangio(ctx, x, 795, 1, cl(g * 1.35 - d), { h, inc, r: 15 + R() * 6 }); }
  rotulo(ctx, 130, 280, '*Mucor* y *Rhizopus*', 'MOHOS DE ALFILER', ss(e.tl, 0.3, 1.1), { c: CO.muc });
  // detalle de un esporangio
  const a2 = en(e, 2, 0.9); if (a2 > 0) { ctx.save(); ctx.globalAlpha = a2; ctx.fillStyle = '#0a0d14'; ctx.strokeStyle = 'rgba(200,220,245,.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1420, 400, 230, 0, TAU); ctx.fill(); ctx.stroke(); ctx.save(); ctx.clip(); esporangio(ctx, 1420, 700, 1, 1, { h: 240, r: 130, detalle: true }); ctx.restore(); ctx.restore();
    chip(ctx, 'ESPORANGIO: SACO DE ESPORAS', 1420, 130, { al: 'center', a: a2, c: CO.muc, s: 20 }); guia(ctx, 1420, 430, 1640, 560, a2); chip(ctx, 'COLUMELA', 1650, 590, { al: 'center', a: a2, c: CO.hial, s: 18 }); }
  const a3 = en(e, 3, 0.9); if (a3 > 0) { ctx.save(); ctx.globalAlpha = a3; ctx.fillStyle = '#d9b47a'; ctx.strokeStyle = '#8a5a2a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(1180, 860); ctx.lineTo(1180, 740); ctx.bezierCurveTo(1150, 690, 1240, 660, 1280, 690); ctx.bezierCurveTo(1320, 660, 1410, 690, 1380, 740); ctx.lineTo(1380, 860); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#d8324a'; ctx.beginPath(); ctx.moveTo(1560, 870); ctx.bezierCurveTo(1470, 800, 1480, 710, 1560, 710); ctx.bezierCurveTo(1640, 710, 1650, 800, 1560, 870); ctx.fill(); ctx.fillStyle = '#3f8a3a'; ctx.beginPath(); ctx.ellipse(1560, 708, 40, 12, 0, 0, TAU); ctx.fill();
    for (let i = 0; i < 7; i++) { esporangio(ctx, 1210 + i * 24, 700 + Math.abs(i - 3) * 6, 0.45, a3, { h: 110, r: 16, inc: (i - 3) * 0.08, riz: true }); esporangio(ctx, 1520 + i * 14, 730, 0.4, a3, { h: 100, r: 16, inc: (i - 3) * 0.1 }); } ctx.restore();
    chip(ctx, 'PAN Y FRESAS', 1650, 660, { a: a3, c: LUZC.oro, s: 20 }); }
};
LUZ.telarana = (ctx, e) => {
  noche(ctx, '#08080c', '#0e0e16'); const T = e.T, g = ss(e.tl, 0.5, e.L(3)), pud = ss(e.tl, e.L(2) + 1, e.L(3)), rosa = ss(e.tl, e.L(2) + 4, e.L(3) + 1), papel = eo(e.tl, e.L(4), e.L(4) + 2.2);
  ctx.fillStyle = '#2a1e14'; ctx.beginPath(); ctx.roundRect(160, 780, 1000, 100, 16); ctx.fill();
  ostra(ctx, 520, 800, 1.7, pud * 0.8, 1); ostra(ctx, 800, 800, 1.35, pud * 0.8, 3); ostra(ctx, 340, 800, 1.1, pud * 0.6, 6);
  const c = mixc(CO.tel, '#ffb0c0', rosa);
  micelio(ctx, 'tel', 640, 700, g, c, { seed: 44, max: 9000, brotes: 16, rama: 0.13, a: 0.8, acepta: (x, y) => Math.abs(x) < 470 && y > -330 && y < 100 && Math.hypot(x / 470, (y + 100) / 240) < 1 });
  algodon(ctx, 640, 620, 440, c, cl(g * 1.3), 9, 2.2, 80);
  // esporas secas que se sueltan
  const s3 = en(e, 3, 0.8) * (1 - papel); if (s3 > 0) { const R = rng(7); for (let i = 0; i < 60; i++) { const u = ((e.tl - e.L(3)) * 0.25 + R()) % 1, an = -Math.PI / 2 + (R() - 0.5) * 2.4, px = 640 + (R() - 0.5) * 500 + Math.cos(an) * u * 420 + u * 160, py = 600 + Math.sin(an) * u * 380; halo(ctx, px, py, 7, '#ffffff', 0.9 * s3 * (1 - u)); }
    gota(ctx, 470, 380 + ((e.tl * 160) % 200), 12, s3); for (let i = 0; i < 3; i++) flecha(ctx, 120, 480 + i * 60, 330, 480 + i * 60, s3, 'rgba(200,225,255,.6)', 3);
    chip(ctx, 'ESPORAS SECAS', 1040, 240, { a: s3, c: '#ffffff', s: 22 }); chip(ctx, 'TOCAR · REGAR · CORRIENTES DE AIRE', 1040, 300, { a: s3, c: '#8fa0bd', s: 18 }); }
  if (papel > 0) { ctx.save(); ctx.globalAlpha = 0.72; ctx.fillStyle = '#dfe8f2'; ctx.strokeStyle = 'rgba(140,170,210,.9)'; ctx.lineWidth = 3; const yy = mixn(60, 420, papel); ctx.beginPath(); ctx.moveTo(200, yy + 60); for (let i = 0; i <= 20; i++) ctx.lineTo(200 + i * 46, yy + Math.sin(i * 0.9 + 1) * 10 - Math.sin(i / 20 * Math.PI) * 70); ctx.lineTo(1120, yy + 330 * papel); ctx.quadraticCurveTo(660, yy + 380 * papel, 200, yy + 330 * papel); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); for (let i = 0; i < 9; i++) gota(ctx, 300 + i * 90, mixn(60, 420, papel) + 40 + Math.sin(i * 2) * 40 + 80 * papel, 9, papel);
    chip(ctx, 'PRIMERO: PAPEL HÚMEDO ENCIMA', 1250, 520, { a: papel, c: LUZC.oro, s: 22 }); }
  rotulo(ctx, 1250, 380 + 40 * 0, 'Telaraña', '*Cladobotryum* (FASE ASEXUAL DE *Hypomyces*)', ss(e.tl, 0.4, 1.2) * (1 - 0 * papel), { c: c, s: 46 });
  chip(ctx, 'AL ENVEJECER: ROSADO', 1250, 600 + 60, { a: rosa * (1 - s3), c: '#ffb0c0', s: 20 });
};
LUZ.levaduras = (ctx, e) => {
  noche(ctx, '#0a0906', '#12100a'); const T = e.T;
  micelio(ctx, 'lvM', 420, 480, 0.9, CO.mic, { seed: 19, a: 0.6, max: 5000, acepta: (x, y) => Math.hypot(x - 180, y) < 280 && x < 190 }); const R = rng(15);
  for (let i = 0; i < 9; i++) { const px = 650 + R() * 190, py = 300 + R() * 360, r = (16 + R() * 26) * eo(e.tl, 0.3 + i * 0.4, 2.5 + i * 0.4), cc = mixc('#f0e2b0', '#b08a4a', R() * 0.7); if (r <= 0) continue; const g = ctx.createRadialGradient(px - r * 0.3, py - r * 0.3, 1, px, py, r); g.addColorStop(0, '#fffbe8'); g.addColorStop(0.4, cc); g.addColorStop(1, mixc(cc, '#000000', 0.3)); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(px, py, r * 1.1, r, 0, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.75)'; ctx.beginPath(); ctx.ellipse(px - r * 0.35, py - r * 0.4, r * 0.25, r * 0.12, -0.6, 0, TAU); ctx.fill(); }
  petri(ctx, 600, 480, 300);
  rotulo(ctx, 1010, 280, 'Levaduras', 'SIN PELUSA', ss(e.tl, 0.3, 1.1), { c: CO.lev });
  // al microscopio: células esféricas con cápsula de moco
  const am = ss(e.tl, 2.2, 3.2); [[1250, 560, 54], [1420, 620, 40], [1320, 700, 30], [1540, 520, 46]].forEach(([px, py, r], i) => { ctx.save(); ctx.globalAlpha = am; halo(ctx, px, py, r * 2.6, CO.lev, 0.25); ctx.fillStyle = 'rgba(233,212,154,.16)'; ctx.strokeStyle = 'rgba(233,212,154,.5)'; ctx.setLineDash([5, 6]); ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(px, py, r * 1.6 + Math.sin(T * 1.5 + i) * 3, 0, TAU); ctx.fill(); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = '#2a2415'; ctx.strokeStyle = CO.lev; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(px, py, r, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); });
  chip(ctx, 'CÉLULA ESFÉRICA · MOCO CREMA A CAFÉ', 1040, 800, { a: ss(e.tl, 3.4, 4.2), c: CO.lev, s: 20 }); chip(ctx, '*CRYPTOCOCCUS*, SEGÚN EL MANUAL'.replace(/\*/g, ''), 1040, 380, { a: ss(e.tl, 4.6, 5.4), c: '#8fa0bd', s: 18 }); esquema(ctx, am);
};

/* ====== 04 · Las bacterias ====== */
LUZ.bacillus = (ctx, e) => {
  noche(ctx, '#080a0c', '#0d1218'); const T = e.T, hum = ss(e.tl, 0.5, e.L(2) + 2);
  frascoGrano(ctx, 560, 850, 440, 620, { mic: 0.62, humedo: hum, seed: 21 });
  rotulo(ctx, 960, 300, '*Bacillus*', 'MANCHA HÚMEDA · PUDRICIÓN AGRIA', en(e, 0, 0.8, 0.6), { c: CO.bac });
  guia(ctx, 660, 740, 960, 470, en(e, 2, 0.7)); chip(ctx, 'GRANO DEMASIADO MOJADO', 970, 470, { a: en(e, 2, 0.7, 0.2), c: CO.bac, s: 22 }); chip(ctx, 'ORILLAS BLANCUZCAS EN CADA SEMILLA', 970, 534, { a: en(e, 2, 0.7, 1.6), c: CO.mic, s: 20 });
  const o = en(e, 3, 0.8); if (o > 0) { ctx.save(); ctx.strokeStyle = 'rgba(190,210,120,.55)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 5; i++) { const u = (T * 0.25 + i / 5) % 1; ctx.globalAlpha = o * Math.sin(u * Math.PI); ctx.beginPath(); for (let k = 0; k <= 20; k++) { const q = k / 20, px = 440 + i * 60 + Math.sin(q * 7 + T * 2 + i) * 18, py = 200 - u * 90 + (1 - q) * 70 * 1; k ? ctx.lineTo(px, py - q * 40) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore();
    ['MANZANA PODRIDA', 'CALCETÍN SUCIO', 'TOCINO QUEMADO'].forEach((s, i) => chip(ctx, s, 970, 640 + i * 64, { a: en(e, 3, 0.5, 0.3 + i * 1.3), c: '#c9d67a', s: 22 })); }
};
LUZ.endospora = (ctx, e) => {
  noche(ctx, '#06090d', '#0a1118'); const cal = ss(e.tl, e.L(1), e.L(1) + 3), est = ss(e.tl, e.L(2) + 3, e.L(2) + 5);
  halo(ctx, 760, 430, 800, '#ff6a3a', 0.2 * cal * (1 - 0)); bacilo(ctx, 760 + Math.sin(e.T * 20) * 2 * cal, 430, 760, -0.06, 1 - 0.85 * cal, 1 - est);
  rotulo(ctx, 130, 250, 'Endospora', 'CÁPSULA DE RESISTENCIA', ss(e.tl, 0.4, 1.2), { c: '#bfeaff' }); guia(ctx, 868, 418, 1060, 250, ss(e.tl, 0.8, 1.6), '#bfeaff');
  termometro(ctx, 1560, 700, 380, 0.2 + 0.45 * cal + 0.3 * est, mixc('#5a8ad8', '#ff5a3a', cal), en(e, 1));
  chip(ctx, 'LA CÉLULA: EL CALOR LA DESTRUYE', 300, 660, { a: en(e, 1, 0.7, 0.8), c: '#8f98aa', s: 22 }); chip(ctx, 'LA ENDOSPORA: SIGUE AHÍ', 300, 724, { a: en(e, 1, 0.7, 2.4), c: '#bfeaff', s: 22 });
  chip(ctx, 'PASTEURIZACIÓN: SOBREVIVE', 960, 660, { a: en(e, 2, 0.7, 0.4), c: LUZC.oro, s: 22 }); chip(ctx, 'ESTERILIZACIÓN: NO', 960, 724, { a: en(e, 2, 0.7, 2.6), c: LUZC.rojo, s: 22 });
  if (est > 0) for (let i = 0; i < 8; i++) halo(ctx, 868 + Math.cos(i) * 90 * est, 418 + Math.sin(i * 2.3) * 60 * est, 30, '#ffffff', 0.6 * (1 - est)); esquema(ctx);
};
LUZ.olla = (ctx, e) => {
  noche(ctx, '#09090b', '#111116'); const T = e.T, v = ss(e.tl, 0.6, 2.5), ap = 1 - en(e, 2, 0.8);
  olla(ctx, 480, 840, 1.25, v, T, v * 0.75); halo(ctx, 480, 880, 320, '#ff7a2a', 0.5);
  txt(ctx, '15', 860, 420, { s: 150, f: 'serif', w: 500, a: ss(e.tl, 1.2, 2) * ap }); txt(ctx, 'LIBRAS DE PRESIÓN', 866, 470, { s: 22, f: 'mono', w: 700, ls: 5, c: LUZC.oro, a: ss(e.tl, 1.2, 2) * ap });
  txt(ctx, '1 h', 860, 640, { s: 110, f: 'serif', w: 500, a: ss(e.tl, 2.6, 3.4) * ap }); txt(ctx, 'SEGÚN EL MANUAL', 866, 690, { s: 22, f: 'mono', w: 700, ls: 5, c: LUZC.oro, a: ss(e.tl, 2.6, 3.4) * ap });
  const a1 = en(e, 1, 0.9); if (a1 > 0) { ctx.save(); ctx.globalAlpha = a1; ctx.translate(110, 0); ctx.fillStyle = 'rgba(100,160,220,.25)'; ctx.strokeStyle = 'rgba(200,225,250,.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(1240, 560); ctx.lineTo(1700, 560); ctx.quadraticCurveTo(1690, 800, 1560, 820); ctx.lineTo(1380, 820); ctx.quadraticCurveTo(1250, 800, 1240, 560); ctx.fill(); ctx.stroke(); const R = rng(8); for (let i = 0; i < 90; i++) { const px = 1290 + R() * 360, py = 650 + R() * 150; if (Math.abs(px - 1470) > 210 - (py - 650) * 0.55) continue; ctx.fillStyle = mixc('#b8873e', '#d9b468', R()); ctx.beginPath(); ctx.ellipse(px, py, 11, 6.5, R() * 3, 0, TAU); ctx.fill(); } ctx.restore();
    txt(ctx, '24 h', 1580, 420, { s: 110, f: 'serif', w: 500, al: 'center', a: a1 * ap }); txt(ctx, 'EN REMOJO, ANTES DE ESTERILIZAR', 1580, 480, { s: 22, f: 'mono', w: 700, ls: 4, al: 'center', c: CO.bac, a: a1 * ap }); }
  const a2 = en(e, 2, 0.8); if (a2 > 0) { oscurece(ctx, 0.8 * a2); const R = rng(2); for (let i = 0; i < 16; i++) bacilo(ctx, 200 + R() * 1500, 250 + R() * 300, 70, R() * 3, a2, a2); titulo(ctx, 'La más difícil de controlar', 960, 700, a2, { s: 70 }); chip(ctx, 'SEGÚN STAMETS Y CHILTON, 1983', 960, 790, { al: 'center', a: a2, s: 18, c: '#8fa0bd' }); }
};
// Sombrero de seta visto desde arriba, con manchas que cambian de color.
function sombrero(ctx, x, y, s, manchas, tono, seed = 3) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const g = ctx.createRadialGradient(-60, -70, 20, 0, 0, 330); g.addColorStop(0, '#d2cbc0'); g.addColorStop(1, '#8f877b'); ctx.fillStyle = g;
  ctx.beginPath(); for (let i = 0; i <= 60; i++) { const an = i / 60 * TAU, rr = 300 * (1 + 0.05 * Math.sin(an * 5 + 1) + 0.03 * Math.sin(an * 9)) * (1 - 0.16 * Math.pow(Math.max(0, Math.cos(an - Math.PI / 2)), 4)); i ? ctx.lineTo(Math.cos(an) * rr, Math.sin(an) * rr * 0.86) : ctx.moveTo(Math.cos(an) * rr, Math.sin(an) * rr * 0.86); } ctx.closePath(); ctx.fill(); ctx.save(); ctx.clip();
  const R = rng(seed), c = tono < 0.5 ? mixc('#efe2a0', '#d9a52a', tono * 2) : mixc('#d9a52a', '#6a4322', tono * 2 - 1);
  for (let i = 0; i < 16; i++) { const an = R() * TAU, d = Math.sqrt(R()) * 230, r = (18 + R() * 46) * cl(manchas * 2.2 - R() * 1.1); if (r <= 0) continue; ctx.fillStyle = rgba('#000000', 0.12 * tono); ctx.beginPath(); ctx.ellipse(Math.cos(an) * d + 3, Math.sin(an) * d * 0.86 + 4, r * 1.15, r * 0.9, an, 0, TAU); ctx.fill(); ctx.fillStyle = c; ctx.globalAlpha = 0.9; ctx.beginPath(); ctx.ellipse(Math.cos(an) * d, Math.sin(an) * d * 0.86, r * 1.1, r * 0.85, an, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; }
  ctx.restore(); ctx.restore();
}
window.K3.sombrero = sombrero;
LUZ.tolaasii = (ctx, e) => {
  noche(ctx, '#0a0907', '#13100b'); const m = ss(e.tl, 1, e.L(1) + 2), tono = ss(e.tl, e.L(1), e.L(1) + 5.5);
  sombrero(ctx, 600, 480, 1.05, m, tono);
  rotulo(ctx, 1010, 290, '*Pseudomonas tolaasii*', 'MANCHA BACTERIANA', ss(e.tl, 0.4, 1.2), { c: '#d9a52a', s: 44 });
  ['#efe2a0', '#d9a52a', '#6a4322'].forEach((c, i) => { const a = en(e, 1, 0.6, i * 1.7); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(1030 + i * 260, 420, 90, 90, 18); ctx.fill(); ctx.restore(); txt(ctx, ['AMARILLO PÁLIDO', 'DORADO', 'CAFÉ'][i], 1075 + i * 260, 560, { s: 18, f: 'mono', w: 700, ls: 2, al: 'center', c, a }); if (i < 2) flecha(ctx, 1140 + i * 260, 465, 1270 + i * 260, 465, a, '#c9d2e3', 3); });
  const a2 = en(e, 2, 0.8); if (a2 > 0) { const R = rng(9); for (let i = 0; i < 9; i++) { const px = 1080 + R() * 600, py = 650 + R() * 150; ctx.save(); ctx.globalAlpha = a2; bacteria(ctx, px + Math.sin(e.T + i) * 6, py, 60, R() * 3, 0.1); ctx.restore(); for (let k = 0; k < 4; k++) { const u = ((e.T * 0.3 + k / 4 + R()) % 1); halo(ctx, px - u * 300, py - u * 60 + Math.sin(k * 3 + i) * 30, 8, '#ff9a5a', a2 * (1 - u)); } } chip(ctx, 'TOLAASINA: SU TOXINA', 1380, 850, { al: 'center', a: a2, c: '#ff9a5a', s: 22 }); esquema(ctx, a2); }
};
LUZ.secar = (ctx, e) => {
  noche(ctx, '#07090c', '#0c1116'); const seca = en(e, 1, 4), mojado = 1 - seca, m = ss(e.tl, 2, e.L(1)) * 0.8;
  sombrero(ctx, 640, 480, 1.05, m, 0.5, 3); const R = rng(13); for (let i = 0; i < 26; i++) { const an = R() * TAU, d = Math.sqrt(R()) * 250, r = 10 + R() * 16; gota(ctx, 640 + Math.cos(an) * d, 480 + Math.sin(an) * d * 0.86, r * mojado, 1); }
  txt(ctx, '4 a 6 h', 1100, 420, { s: 120, f: 'serif', w: 500, a: ss(e.tl, 0.8, 1.6) * (1 - 0.7 * seca) }); txt(ctx, 'MOJADOS DESPUÉS DE REGAR', 1106, 480, { s: 22, f: 'mono', w: 700, ls: 4, c: '#7fc0ff', a: ss(e.tl, 0.8, 1.6) * (1 - 0.7 * seca) });
  if (seca > 0) { ctx.save(); ctx.strokeStyle = 'rgba(210,230,255,.6)'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 6; i++) { const u = (e.T * 0.4 + i / 6) % 1; ctx.globalAlpha = Math.sin(u * Math.PI) * cl(seca * 3); ctx.beginPath(); for (let k = 0; k <= 24; k++) { const q = k / 24, px = 120 + q * 1000 * u + u * 300, py = 240 + i * 90 + Math.sin(q * 8 + e.T * 3 + i) * 12; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore();
    chip(ctx, 'QUE EL SOMBRERO SEQUE PRONTO', 1100, 620, { a: en(e, 1, 0.6, 0.6), c: LUZC.oro, s: 22 }); chip(ctx, 'SIN CONDENSACIÓN ENCIMA', 1100, 690, { a: en(e, 1, 0.6, 2.6), c: LUZC.oro, s: 22 }); }
};
