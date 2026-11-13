// cine-luz-a.jsx — Documental 006 «¿Hay algo que no se pueda comer un hongo?», capítulos 0 a 4
// (el reto, cómo come un hongo, la madera, pelo y caparazón, combustible y explosivos) y las piezas compartidas.
// Cada escena: LUZ.id = (ctx, e) => …   ·   e.L(i) = segundo en que empieza la frase i del bloque.
const { TAU, cl, pr, ss, eo, mixn, rng, rgba, mixc, LUZC, FU, halo, noche, estrellas, polvo, cam, oscurece, txt, rico, chip, rotulo, guia, titulo, sello, tache, flecha,
  red, pintaRed, petri, frasco, matraz, veredicto } = window.LZK;
const LUZ = window.LUZ;
for (const k of Object.keys(LUZ)) delete LUZ[k];
const en = (e, i, d = 0.7, r = 0) => { const a = e.L(i); return a == null ? 0 : ss(e.tl, a + r, a + r + d); };
const esquema = (ctx, a = 1, x = 60, y = 860) => chip(ctx, 'ESQUEMA', x, y, { c: '#8fa0bd', s: 18, a: a * 0.8 });
// Colores del documental: hifa (crema), enzima (amarillo), radical libre (naranja), lignina (café), celulosa (verde claro).
const C = { hifa: '#F3EFE2', enz: '#FFD23F', rad: '#FF7A4A', lig: '#C98A4B', cel: '#8FD4A0', verde: '#3DFF7A', azul: '#8FB4D8', oro: LUZC.oro, rojo: LUZC.rojo, gris: '#c9d2e3', fluor: '#5CF0C0', agua: '#6AD4FF' };
const PAL3 = [['CRECER ENCIMA', C.azul], ['ROMPER · DEGRADAR', C.oro], ['COMER DE VERDAD · MINERALIZAR', C.verde]];
const tag3 = (ctx, k, x, y, a = 1, o = {}) => chip(ctx, PAL3[k][0], x, y, { c: PAL3[k][1], a, s: o.s || 22, al: o.al || 'center' });
const lab = (ctx, x, y, a = 1, s = 'EN LABORATORIO', al = 'center') => chip(ctx, s, x, y, { c: C.agua, a, s: 20, al });

/* ====== piezas compartidas ====== */
// Tarjeta de estudio: año grande, revista en cursiva y autores.
function ficha(ctx, x, y, anio, rev, aut, a = 1, c = C.oro) {
  a = cl(a); if (a <= 0.004) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(0, (1 - a) * 12);
  ctx.font = `500 30px ${FU.serif}`; const w = Math.max(330, ctx.measureText(rev.replace(/\*/g, '')).width + 186, aut ? aut.length * 13.5 + 60 : 0);
  ctx.fillStyle = 'rgba(8,9,14,.78)'; ctx.strokeStyle = rgba(c, 0.8); ctx.lineWidth = 1.6; ctx.beginPath(); ctx.roundRect(x, y, w, aut ? 112 : 78, 12); ctx.fill(); ctx.stroke();
  ctx.fillStyle = c; ctx.fillRect(x, y + 14, 5, aut ? 84 : 50); ctx.restore();
  txt(ctx, String(anio), x + 26, y + 52 + (1 - a) * 12, { s: 44, f: 'serif', w: 600, c, a });
  rico(ctx, rev, x + 156, y + 50 + (1 - a) * 12, { s: 30, f: 'serif', w: 500, a });
  if (aut) txt(ctx, aut, x + 26, y + 92 + (1 - a) * 12, { s: 19, f: 'mono', w: 700, ls: 2, c: '#aab6cc', a });
}
const bez = (p0, p1, p2, p3, n = 28) => { const P = []; for (let i = 0; i <= n; i++) { const t = i / n, u = 1 - t; P.push([u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]); } return P; };
// Hifa: tubo con pared, septos y citoplasma que fluye hacia la punta. g = cuánto ha crecido (0..1). Regresa la punta [x, y, ángulo].
function hifaTubo(ctx, pts, g, o = {}) {
  const w = o.w || 38, c = o.c || C.hifa, a = cl(o.a ?? 1); g = cl(g); if (g <= 0 || a <= 0.004) return [pts[0][0], pts[0][1], 0];
  let tot = 0; const Ls = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); Ls.push(d); tot += d; }
  const lim = tot * g, P = [pts[0]]; let acc = 0, ang = 0;
  for (let i = 1; i < pts.length; i++) { ang = Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0]); if (acc + Ls[i - 1] <= lim) { P.push(pts[i]); acc += Ls[i - 1]; } else { const u = (lim - acc) / Ls[i - 1]; P.push([mixn(pts[i - 1][0], pts[i][0], u), mixn(pts[i - 1][1], pts[i][1], u)]); break; } }
  const tip = P[P.length - 1], traza = () => { ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) ctx.lineTo(P[i][0], P[i][1]); };
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  traza(); ctx.strokeStyle = rgba(c, 0.92); ctx.lineWidth = w; ctx.stroke();
  traza(); ctx.strokeStyle = o.dentro || '#10151d'; ctx.lineWidth = w - 7; ctx.stroke();
  traza(); ctx.strokeStyle = rgba(c, 0.16); ctx.lineWidth = w - 7; ctx.stroke();
  // septos y citoplasma
  let d = 0, prox = o.sep || 150, k = 0; const T = o.T || 0;
  for (let i = 1; i < P.length; i++) { const dx = P[i][0] - P[i - 1][0], dy = P[i][1] - P[i - 1][1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L;
    while (prox <= d + L) { const u = (prox - d) / L, x = P[i - 1][0] + dx * u, y = P[i - 1][1] + dy * u; ctx.strokeStyle = rgba(c, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + nx * (w / 2 - 3), y + ny * (w / 2 - 3)); ctx.lineTo(x - nx * (w / 2 - 3), y - ny * (w / 2 - 3)); ctx.stroke(); prox += o.sep || 150; }
    for (let q = 0; q < 2; q++) { const u = ((k * 0.37 + q * 0.5 + T * 0.16) % 1 + 1) % 1, x = P[i - 1][0] + dx * u, y = P[i - 1][1] + dy * u, off = Math.sin(k * 7.3 + q * 3) * (w * 0.2); ctx.fillStyle = rgba(c, 0.32); ctx.beginPath(); ctx.arc(x + nx * off, y + ny * off, w * 0.07, 0, TAU); ctx.fill(); }
    d += L; k++; }
  ctx.restore(); halo(ctx, tip[0], tip[1], w * 1.5, c, 0.3 * a); return [tip[0], tip[1], ang];
}
// Enzima (esquema): un «comecocos» que muerde enlaces.
function enzima(ctx, x, y, s, rot, color, T, a = 1, num) {
  a = cl(a); if (a <= 0.004) return; const m = 0.3 + 0.22 * Math.sin(T * 9 + x * 0.05);
  halo(ctx, x, y, s * 2.6, color, 0.4 * a); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, s, m, TAU - m); ctx.closePath(); ctx.fill();
  ctx.rotate(-rot); if (num) { ctx.fillStyle = '#14100a'; ctx.font = `700 ${s * 0.9}px ${FU.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(num, -s * 0.2, 1); } ctx.restore();
}
// Radical libre (esquema): chispa con un punto.
function chispa(ctx, x, y, r, color, a = 1, giro = 0) {
  a = cl(a); if (a <= 0.004) return; halo(ctx, x, y, r * 3, color, 0.7 * a); ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(giro); ctx.strokeStyle = '#fff'; ctx.lineWidth = r * 0.22; ctx.lineCap = 'round';
  ctx.beginPath(); for (let i = 0; i < 4; i++) { const an = i * Math.PI / 4; ctx.moveTo(Math.cos(an) * r, Math.sin(an) * r); ctx.lineTo(-Math.cos(an) * r, -Math.sin(an) * r); } ctx.stroke(); ctx.restore();
}
// Viaje de un punto a otro con vaivén; u 0..1.
const viaje = (a, b, u, amp = 26, f = 1) => { const k = ss(u, 0, 1); return [mixn(a[0], b[0], k) + Math.sin(u * Math.PI * 2 * f) * amp * (1 - k), mixn(a[1], b[1], k) + Math.sin(u * Math.PI) * -amp]; };
function hexa(ctx, x, y, r, color, a = 1, rot = 0, lw = 3, aro = true) {
  a = cl(a); if (a <= 0.004) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineJoin = 'round';
  ctx.beginPath(); for (let i = 0; i <= 6; i++) { const an = i / 6 * TAU + Math.PI / 6; i ? ctx.lineTo(Math.cos(an) * r, Math.sin(an) * r) : ctx.moveTo(Math.cos(an) * r, Math.sin(an) * r); } ctx.stroke();
  if (aro) { ctx.globalAlpha *= 0.55; ctx.beginPath(); ctx.arc(0, 0, r * 0.55, 0, TAU); ctx.stroke(); } ctx.restore();
}
// Lignina (esquema): malla irregular de anillos de carbono unidos entre sí. roto(i, x, y) = 0 entera … 1 deshecha.
function malla(ctx, x, y, cols, rows, paso, seed, roto, color = C.lig, a = 1) {
  const R = rng(seed), N = [];
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const nx = x + (i + (j % 2) * 0.5) * paso + (R() - 0.5) * paso * 0.3, ny = y + j * paso * 0.82 + (R() - 0.5) * paso * 0.3, b = roto ? cl(roto(j * cols + i, nx, ny)) : 0, an = R() * TAU; N.push([nx + Math.cos(an) * b * 46, ny + Math.sin(an) * b * 46 - b * b * 30, b, R() * 3 + b * 2.4]); }
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineCap = 'round';
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) { const n = N[j * cols + i]; for (const [di, dj] of [[1, 0], [j % 2 ? 1 : 0, 1], [j % 2 ? 0 : -1, 1]]) { const ii = i + di, jj = j + dj; if (ii < 0 || ii >= cols || jj >= rows) continue; const m = N[jj * cols + ii], al = 1 - cl(Math.max(n[2], m[2]) * 5); if (al <= 0) continue; ctx.globalAlpha = a * al * 0.85; ctx.beginPath(); ctx.moveTo(n[0], n[1]); ctx.lineTo(m[0], m[1]); ctx.stroke(); } }
  ctx.restore();
  N.forEach((n) => { ctx.save(); ctx.globalAlpha *= a * (1 - cl(n[2] * 6)); ctx.fillStyle = '#0b0d12'; ctx.beginPath(); ctx.arc(n[0], n[1], paso * 0.25, 0, TAU); ctx.fill(); ctx.restore(); hexa(ctx, n[0], n[1], paso * 0.24, color, a * (1 - 0.8 * n[2]), n[3], 3); });
  return N;
}
// Celulosa (esquema): cadena recta de anillos de azúcar. corte(i) separa las cuentas.
function fibra(ctx, x0, x1, y, color = C.cel, a = 1, r = 12, corte) {
  const n = Math.floor((x1 - x0) / (r * 2.6)); ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = color; ctx.lineWidth = 2.5;
  for (let i = 0; i < n; i++) { const c = corte ? cl(corte(i)) : 0, x = x0 + i * r * 2.6 + r, yy = y + (i % 2 ? 3 : -3) - c * 24 * Math.sin(i * 2.1);
    if (i && c < 0.1) { ctx.beginPath(); ctx.moveTo(x - r * 1.7, y + ((i - 1) % 2 ? 3 : -3)); ctx.lineTo(x - r * 0.9, yy); ctx.stroke(); }
    ctx.fillStyle = rgba(color, 0.14); ctx.beginPath(); for (let k = 0; k <= 6; k++) { const an = k / 6 * TAU; k ? ctx.lineTo(x + Math.cos(an) * r, yy + Math.sin(an) * r * 0.86) : ctx.moveTo(x + Math.cos(an) * r, yy + Math.sin(an) * r * 0.86); } ctx.fill(); ctx.stroke(); }
  ctx.restore();
}
// Molécula de CO₂ (esquema) que sube.
function co2(ctx, x, y, s, a = 1) { a = cl(a); if (a <= 0.004) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = '#e9eef7'; ctx.beginPath(); ctx.arc(x - s * 1.5, y, s * 0.7, 0, TAU); ctx.arc(x + s * 1.5, y, s * 0.7, 0, TAU); ctx.fill(); ctx.fillStyle = '#5b6578'; ctx.beginPath(); ctx.arc(x, y, s * 0.85, 0, TAU); ctx.fill(); ctx.restore(); txt(ctx, 'CO₂', x, y + s * 2.6, { s: s * 1.5, f: 'mono', w: 700, al: 'center', c: C.verde, a }); }
function burbujas(ctx, e, t0, x, y, n, ancho = 160, alto = 260) { for (let i = 0; i < n; i++) { const u = ((e.tl - t0) / 3.4 - i / n); if (e.tl < t0 + i * 0.35) continue; const f = ((u % 1) + 1) % 1; co2(ctx, x + Math.sin(i * 2.4) * ancho * 0.5 + Math.sin(f * 6 + i) * 10, y - f * alto, 9, Math.sin(f * Math.PI)); } }
// Cadena en zigzag (esquema): carbonos en los vértices y un átomo arriba y abajo de cada uno (H o F).
function cadena(ctx, x, y, n, paso, o = {}) {
  const a = cl(o.a ?? 1); if (a <= 0.004) return; const cs = o.cs || '#aab6cc', sub = o.sub || 'H', csub = o.csub || '#e9eef7', rs = o.rs || 13, T = o.T || 0;
  const P = []; for (let i = 0; i < n; i++) P.push([x + i * paso, y + (i % 2 ? -1 : 1) * paso * 0.28]);
  ctx.save(); ctx.globalAlpha *= a; ctx.lineCap = 'round';
  for (let i = 0; i < n; i++) { const m = o.muestra ? cl(o.muestra(i)) : 1; if (m <= 0) continue; ctx.globalAlpha = a * m; const [px, py] = P[i], d = i % 2 ? -1 : 1;
    if (i && (!o.muestra || o.muestra(i - 1) > 0)) { ctx.strokeStyle = cs; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(P[i - 1][0], P[i - 1][1]); ctx.lineTo(px, py); ctx.stroke(); }
    for (const s of [-0.5, 0.5]) { const sx = px + s * paso * 0.62, sy = py + d * paso * 0.72; ctx.strokeStyle = rgba(csub, 0.6); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy); ctx.stroke();
      ctx.fillStyle = csub; ctx.beginPath(); ctx.arc(sx, sy, rs, 0, TAU); ctx.fill(); ctx.fillStyle = '#0b0d12'; ctx.font = `700 ${rs * 1.15}px ${FU.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(sub, sx, sy + 1); }
    ctx.fillStyle = '#3a4252'; ctx.beginPath(); ctx.arc(px, py, rs * 1.05, 0, TAU); ctx.fill(); ctx.strokeStyle = cs; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = '#e9eef7'; ctx.font = `700 ${rs * 1.15}px ${FU.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('C', px, py + 1); }
  ctx.restore(); return P;
}

/* ---------- la mesa y sus ocho objetos ---------- */
function mesaFondo(ctx, T, luz = 1) {
  const g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, mixc('#070504', '#1b130c', luz)); g.addColorStop(0.55, mixc('#050403', '#120c08', luz)); ctx.fillStyle = g; ctx.fillRect(-300, -300, 2520, 1680);
  halo(ctx, 960, -60, 1100, '#FFB05A', 0.2 * luz);
  const y0 = 560, m = ctx.createLinearGradient(0, y0, 0, 1080); m.addColorStop(0, mixc('#1a100a', '#6a4526', luz)); m.addColorStop(1, mixc('#0c0705', '#2e1c0f', luz)); ctx.fillStyle = m; ctx.fillRect(-300, y0, 2520, 800);
  const r = rng(9); ctx.save(); ctx.strokeStyle = 'rgba(20,10,4,.35)'; ctx.lineWidth = 2; for (let i = 0; i < 40; i++) { const y = y0 + 8 + r() * 480, x = -200 + r() * 2200, l = 200 + r() * 700; ctx.beginPath(); ctx.moveTo(x, y); ctx.bezierCurveTo(x + l * 0.3, y + (r() - 0.5) * 10, x + l * 0.7, y + (r() - 0.5) * 10, x + l, y); ctx.stroke(); }
  ctx.strokeStyle = `rgba(255,214,160,${0.28 * luz})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-300, y0); ctx.lineTo(2220, y0); ctx.stroke(); ctx.restore();
  halo(ctx, 960, 700, 1000, '#FFB05A', 0.08 * luz);
}
const sombra = (ctx, x, y, w) => { ctx.save(); ctx.fillStyle = 'rgba(0,0,0,.38)'; ctx.beginPath(); ctx.ellipse(x, y + 4, w, w * 0.14, 0, 0, TAU); ctx.fill(); ctx.restore(); };
// Seta Pleurotus (seta ostra): sombrero en concha, pie corto de lado y láminas que bajan por el pie (decurrentes).
function seta(ctx, x, y, s, rot = 0, tono = 0.5, a = 1) {
  a = cl(a); if (a <= 0.004) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = '#efe6d2'; ctx.beginPath(); ctx.moveTo(-9, 0); ctx.quadraticCurveTo(-12, -24, -44, -46); ctx.lineTo(52, -50); ctx.quadraticCurveTo(14, -26, 9, 0); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#b9aa8c'; ctx.lineWidth = 1.2; ctx.beginPath(); for (let i = -6; i <= 7; i++) { ctx.moveTo(i * 1.1, -2); ctx.quadraticCurveTo(i * 2.6, -26, i * 6.6, -48); } ctx.stroke();
  const cap = mixc('#8b8f9a', '#cdb892', tono); ctx.fillStyle = cap; ctx.beginPath(); ctx.moveTo(-50, -44); ctx.bezierCurveTo(-44, -78, 40, -84, 60, -48); ctx.quadraticCurveTo(6, -40, -50, -44); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.beginPath(); ctx.ellipse(-4, -66, 30, 7, -0.05, 0, TAU); ctx.fill(); ctx.restore();
}
// Cada objeto: (ctx, x, y = base, s, t = transformación 0..1, T).
const OBJ = {
  madera(ctx, x, y, s, t, T) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const c0 = mixc('#8a5a32', '#e2dccb', t), c1 = mixc('#5e3b1f', '#b9b09a', t);
    const g = ctx.createLinearGradient(0, -74, 0, 0); g.addColorStop(0, c0); g.addColorStop(1, c1); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-78, -74, 140, 74, 10); ctx.fill();
    ctx.strokeStyle = mixc('#4a2d16', '#8f8672', t); ctx.lineWidth = 2; const r = rng(4); for (let i = 0; i < 9; i++) { const yy = -68 + i * 7.6; ctx.beginPath(); ctx.moveTo(-74, yy); ctx.bezierCurveTo(-30, yy + (r() - 0.5) * 8, 10, yy + (r() - 0.5) * 8, 58, yy + (r() - 0.5) * 4); ctx.stroke(); }
    ctx.fillStyle = mixc('#c99a66', '#f1ecdf', t); ctx.beginPath(); ctx.ellipse(62, -37, 17, 37, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = mixc('#8a5a32', '#b9b09a', t); ctx.lineWidth = 1.6; for (let k = 1; k <= 3; k++) { ctx.beginPath(); ctx.ellipse(62, -37, 17 * k / 3.4, 37 * k / 3.4, 0, 0, TAU); ctx.stroke(); }
    if (t > 0.02) { ctx.strokeStyle = `rgba(255,255,255,${0.6 * t})`; ctx.lineWidth = 1.4; for (let i = 0; i < 26; i++) { const xx = -74 + r() * 128, yy = -70 + r() * 66; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + 10 + r() * 22, yy + (r() - 0.5) * 6); ctx.stroke(); } }
    ctx.restore(); if (t > 0.3) { const k = ss(t, 0.3, 1); seta(ctx, x - 30 * s, y - 70 * s, s * 0.62 * k, -0.25, 0.3, k); seta(ctx, x + 8 * s, y - 72 * s, s * 0.8 * k, 0.1, 0.5, k); seta(ctx, x + 40 * s, y - 68 * s, s * 0.5 * k, 0.4, 0.7, k); } },
  pelo(ctx, x, y, s, t, T) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.lineCap = 'round'; const r = rng(12);
    for (let i = 0; i < 26; i++) { const k = (i / 25 - 0.5), c = mixc(['#3a2414', '#5a3a20', '#24160c'][i % 3], '#e9e4d6', t * (0.5 + 0.5 * r())); ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-70 + k * 10, -30 + k * 16); ctx.bezierCurveTo(-30, -66 + k * 30, 20, -6 + k * 44, 76 + r() * 10, -34 + k * 60 + r() * 8); ctx.stroke(); }
    ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.roundRect(-62, -44, 12, 34, 4); ctx.fill(); ctx.restore(); },
  escarabajo(ctx, x, y, s, t, T) { ctx.save(); ctx.translate(x, y - 34 * s); ctx.scale(s, s); ctx.rotate(-0.12);
    ctx.strokeStyle = '#1a1612'; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (const d of [-1, 1]) for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-20 + i * 26, d * 22); ctx.lineTo(-34 + i * 34, d * 46); ctx.lineTo(-44 + i * 40, d * 52); ctx.stroke(); }
    const g = ctx.createLinearGradient(0, -34, 0, 34); g.addColorStop(0, '#2f6b4a'); g.addColorStop(0.5, '#173a2a'); g.addColorStop(1, '#0c1f17'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(14, 0, 50, 33, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#0a1510'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-36, 0); ctx.lineTo(64, 0); ctx.stroke();
    ctx.fillStyle = '#1d4a35'; ctx.beginPath(); ctx.ellipse(-46, 0, 20, 26, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#13251c'; ctx.beginPath(); ctx.ellipse(-70, 0, 12, 14, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#13251c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-78, -8); ctx.quadraticCurveTo(-96, -20, -100, -34); ctx.moveTo(-78, 8); ctx.quadraticCurveTo(-96, 20, -100, 34); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.ellipse(8, -16, 30, 6, -0.1, 0, TAU); ctx.fill(); ctx.restore(); },
  bolsa(ctx, x, y, s, t, T) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(236,240,246,.9)'; ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-62, 0); ctx.quadraticCurveTo(-74, -50, -54, -92); ctx.lineTo(-44, -138); ctx.quadraticCurveTo(-30, -150, -24, -128); ctx.lineTo(-18, -96); ctx.quadraticCurveTo(0, -86, 18, -96); ctx.lineTo(24, -128); ctx.quadraticCurveTo(30, -150, 44, -138); ctx.lineTo(54, -92); ctx.quadraticCurveTo(74, -50, 62, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(150,160,180,.7)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-40, -86); ctx.quadraticCurveTo(-20, -40, -34, -6); ctx.moveTo(8, -88); ctx.quadraticCurveTo(26, -50, 10, -8); ctx.moveTo(40, -84); ctx.quadraticCurveTo(48, -50, 44, -14); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.beginPath(); ctx.ellipse(-30, -60 + Math.sin(T * 1.2) * 3, 5, 20, 0.2, 0, TAU); ctx.fill(); ctx.restore(); },
  vaso(ctx, x, y, s, t, T) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const P = () => { ctx.beginPath(); ctx.moveTo(-44, -120); ctx.lineTo(44, -120); ctx.lineTo(34, 0); ctx.lineTo(-34, 0); ctx.closePath(); };
    P(); ctx.fillStyle = 'rgba(160,200,230,.13)'; ctx.fill(); ctx.strokeStyle = 'rgba(220,235,250,.75)'; ctx.lineWidth = 3; ctx.stroke();
    ctx.strokeStyle = 'rgba(220,235,250,.6)'; ctx.beginPath(); ctx.ellipse(0, -120, 44, 9, 0, 0, TAU); ctx.stroke(); ctx.fillStyle = 'rgba(200,225,245,.2)'; ctx.beginPath(); ctx.ellipse(0, -6, 33, 6, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-30, -104); ctx.lineTo(-25, -30); ctx.stroke();
    if (t > 0.02) { ctx.save(); P(); ctx.clip(); ctx.translate(6, -56); ctx.scale(0.42, 0.42); pintaRed(ctx, red('vasoG', { seed: 31, radio: 120, brotes: 5, max: 700, rama: 0.11 }), t, '#e9f2ff', { a: 0.8, puntas: false }); ctx.restore(); }
    ctx.restore(); },
  piedra(ctx, x, y, s, t, T) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const P = [[-72, 0], [-80, -34], [-52, -70], [-8, -86], [42, -74], [76, -40], [70, 0]];
    ctx.fillStyle = '#7d8087'; ctx.beginPath(); P.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#9a9da5'; ctx.beginPath(); ctx.moveTo(-52, -70); ctx.lineTo(-8, -86); ctx.lineTo(42, -74); ctx.lineTo(4, -48); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#5c5f66'; ctx.beginPath(); ctx.moveTo(4, -48); ctx.lineTo(42, -74); ctx.lineTo(76, -40); ctx.lineTo(70, 0); ctx.lineTo(20, 0); ctx.closePath(); ctx.fill();
    if (t > 0.02) { const r = rng(6); for (let i = 0; i < 7; i++) { const lx = -50 + r() * 96, ly = -72 + r() * 46, rr = (6 + r() * 12) * ss(t, i * 0.08, 0.5 + i * 0.08); ctx.fillStyle = ['#e6a12c', '#c9d18a', '#e0b84a'][i % 3]; ctx.beginPath(); for (let k = 0; k <= 10; k++) { const an = k / 10 * TAU, q = rr * (1 + 0.25 * Math.sin(k * 3 + i)); k ? ctx.lineTo(lx + Math.cos(an) * q, ly + Math.sin(an) * q * 0.7) : ctx.moveTo(lx + Math.cos(an) * q, ly + Math.sin(an) * q * 0.7); } ctx.fill(); } }
    ctx.restore(); },
  anillo(ctx, x, y, s, t, T) { ctx.save(); ctx.translate(x, y - 16 * s); ctx.scale(s, s); halo(ctx, 0, 0, 90, LUZC.oro, 0.25 + 0.08 * Math.sin(T * 1.6));
    ctx.strokeStyle = '#8a6418'; ctx.lineWidth = 15; ctx.beginPath(); ctx.ellipse(0, 3, 44, 17, 0, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#f0c24a'; ctx.lineWidth = 11; ctx.beginPath(); ctx.ellipse(0, 0, 44, 17, 0, 0, TAU); ctx.stroke();
    ctx.strokeStyle = '#fff3c4'; ctx.lineWidth = 4; ctx.lineCap = 'round'; const a0 = Math.PI * 1.1 + Math.sin(T * 0.9) * 0.2; ctx.beginPath(); ctx.ellipse(0, -1, 44, 17, 0, a0, a0 + 0.7); ctx.stroke(); ctx.restore(); },
  sarten(ctx, x, y, s, t, T) { ctx.save(); ctx.translate(x, y - 20 * s); ctx.scale(s, s); ctx.strokeStyle = '#15171c'; ctx.lineWidth = 15; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(50, 8); ctx.lineTo(112, 22); ctx.stroke(); ctx.strokeStyle = '#3a3f4a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(60, 7); ctx.lineTo(106, 17); ctx.stroke();
    ctx.fillStyle = '#4a4f5a'; ctx.beginPath(); ctx.ellipse(-8, 4, 72, 28, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#9aa1ad'; ctx.beginPath(); ctx.ellipse(-8, 0, 72, 27, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#16181d'; ctx.beginPath(); ctx.ellipse(-8, 2, 63, 21, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.4)'; ctx.lineWidth = 3; const a0 = Math.PI * 1.15 + Math.sin(T * 0.8) * 0.25; ctx.beginPath(); ctx.ellipse(-8, 2, 52, 15, 0, a0, a0 + 0.8); ctx.stroke(); ctx.restore(); },
};
const ORDEN = [['madera', 'MADERA'], ['pelo', 'PELO'], ['escarabajo', 'CAPARAZÓN'], ['bolsa', 'BOLSA'], ['vaso', 'VIDRIO'], ['piedra', 'PIEDRA'], ['anillo', 'ORO'], ['sarten', 'TEFLÓN']];
const MX = (i) => 162 + i * 228;
// Micelio blanco que cubre un objeto (pelo, caparazón).
function pelusa(ctx, clave, x, y, radio, g, seed, a = 0.85) { if (g <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(1, 0.62); pintaRed(ctx, red(clave, { seed, radio, brotes: 9, max: 1400, rama: 0.12, paso: 5 }), g, '#f6f3ea', { a, puntas: g < 1 }); ctx.restore(); }
// La mesa con los ocho objetos. o.t(i) = transformación, o.luz(i) = resalte 0..1, o.nombre(i) = opacidad de la etiqueta, o.cae = entrada.
function mesa(ctx, e, o = {}) {
  const T = e.T, by = o.y ?? 760, s = o.s ?? 1.26;
  ORDEN.forEach(([k, n], i) => { const x = MX(i), ent = o.cae ? eo(e.tl, i * 0.07, 0.5 + i * 0.07) : 1, luz = o.luz ? cl(o.luz(i)) : 0, t = o.t ? cl(o.t(i)) : 0, ap = o.apaga ? cl(o.apaga(i)) : 0;
    if (luz > 0.01) halo(ctx, x, by - 80, 280, '#FFD9A0', 0.3 * luz);
    ctx.save(); ctx.globalAlpha = ent * (1 - 0.72 * ap); sombra(ctx, x, by, 78 * s); OBJ[k](ctx, x, by - (1 - ent) * 90, s * (1 + 0.07 * luz), t, T);
    if (t > 0.02 && k === 'pelo') pelusa(ctx, 'mesaPelo', x, by - 34, 84, t, 14);
    if (t > 0.02 && k === 'escarabajo') pelusa(ctx, 'mesaEsc', x, by - 38, 80, t, 15);
    ctx.restore();
    const na = o.nombre ? cl(o.nombre(i)) : 1; txt(ctx, n, x, by + 70, { s: 22, f: 'mono', w: 700, ls: 3, al: 'center', c: luz > 0.3 ? '#FFE2B0' : '#c9b79c', a: na * ent * (1 - 0.6 * ap) }); });
}

/* ====== 00 · El reto ====== */
LUZ.mesa = (ctx, e) => {
  const z = mixn(1.03, 1.0, ss(e.tl, 0, 3)) + 0.02 * ss(e.tl, 3, e.dur), un = cam(ctx, z, 960 + Math.sin(e.T * 0.15) * 8, 560);
  mesaFondo(ctx, e.T, 1);
  const grupos = [[0, 1, 2], [3, 4, 5], [6, 7]], tiempo = (i) => { for (let g = 0; g < 3; g++) { const k = grupos[g].indexOf(i); if (k >= 0) { const a = e.L(g + 1) ?? 99, d = ((e.L(g + 2) ?? a + 4) - a) / grupos[g].length; return [a + k * d, a + (k + 1) * d]; } } return [99, 100]; };
  const barrido = (i) => ss(e.tl, 0.25 + i * 0.09, 0.5 + i * 0.09) * (1 - ss(e.tl, 0.6 + i * 0.09, 1.0 + i * 0.09));
  mesa(ctx, e, { cae: true, luz: (i) => { const [a, b] = tiempo(i); return Math.max(barrido(i), ss(e.tl, a, a + 0.35) * (1 - ss(e.tl, b - 0.1, b + 0.4))); }, nombre: (i) => ss(e.tl, tiempo(i)[0], tiempo(i)[0] + 0.4) });
  un();
  // signos de pregunta sobre cada objeto y la libreta
  const q = en(e, 4, 0.5);
  if (q > 0) ORDEN.forEach((_, i) => { const a = en(e, 4, 0.4, i * 0.12), x = MX(i), y = 470 + Math.sin(e.T * 1.4 + i) * 6; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(255,226,176,.7)'; ctx.lineWidth = 2.5; ctx.setLineDash([7, 8]); ctx.beginPath(); ctx.arc(x, y, 34, e.T * 0.5, e.T * 0.5 + TAU); ctx.stroke(); ctx.restore(); txt(ctx, '?', x, y + 17, { s: 50, f: 'serif', w: 500, al: 'center', c: '#FFE2B0', a }); });
  titulo(ctx, '¿Cuáles *no* se puede comer un hongo?', 960, 440, ss(e.tl, 0.4, 1.3) * (1 - en(e, 4, 0.5)), { s: 70 });
  titulo(ctx, 'Anota tu respuesta', 960, 300, en(e, 4, 0.7) * (1 - en(e, 5, 0.5)), { s: 84 });
  chip(ctx, 'OCHO OBJETOS', 960, 370, { c: C.oro, al: 'center', a: q * (1 - en(e, 5, 0.5)) });
  titulo(ctx, '¿Qué significa «comer»?', 960, 320, en(e, 5, 0.8), { s: 96 });
};

/* ====== 01 · Cómo come un hongo ====== */
LUZ.hifa = (ctx, e) => {
  noche(ctx, '#06080d', '#0a0e16'); polvo(ctx, 18, 3, e.T, '#7f8aa0', 0.25); const T = e.T;
  const z = mixn(1.12, 1, ss(e.tl, 0, e.L(1) ?? 3)), un = cam(ctx, z, 900, 470);
  // la comida: una cadena larga (polímero) sobre la que crece la hifa
  const aCom = en(e, 2, 0.9), t3 = e.L(3) ?? 99, t4 = e.L(4) ?? 99, N = 15, bx = (i) => 500 + i * 58, by = 720;
  const P = bez([-60, 520], [300, 560], [560, 380], [1100, 470], 30), tip = hifaTubo(ctx, P, eo(e.tl, 0, 2.6), { T, w: 62, sep: 190 });
  const corte = (i) => t3 + 1.3 + ((i * 5) % N) * 0.22; // segundo en que una enzima corta el enlace i
  if (aCom > 0) { ctx.save(); ctx.globalAlpha = aCom;
    for (let i = 0; i < N; i++) { const c = ss(e.tl, corte(i), corte(i) + 0.4), sube = ss(e.tl, t4 + 0.3 + i * 0.16, t4 + 2.2 + i * 0.16), x = mixn(bx(i), mixn(300, 1040, i / (N - 1)), sube), y0 = by + Math.sin(i * 2.2 + T * 2) * 5 * c, yh = 440 + 60 * Math.sin((i / (N - 1)) * 2.2 + 0.4), y = mixn(y0, yh, sube);
      if (i < N - 1 && ss(e.tl, corte(i), corte(i) + 0.15) < 1) { ctx.strokeStyle = '#d99a5a'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(bx(i) + 18, by); ctx.lineTo(bx(i + 1) - 18, by); ctx.stroke(); }
      ctx.globalAlpha = aCom * (1 - ss(sube, 0.8, 1)); ctx.fillStyle = '#e8b06a'; ctx.strokeStyle = '#8a5a2a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 22 - 8 * sube, 0, TAU); ctx.fill(); ctx.stroke(); }
    ctx.restore(); }
  // enzimas que salen de la punta
  if (e.tl > t3) for (let i = 0; i < N - 1; i++) { const t1 = corte(i), u = pr(e.tl, t1 - 1.2, t1), [x, y] = viaje([tip[0] + 10, tip[1] + 14], [bx(i) + 29, by - 4], u, 30, 1.5); enzima(ctx, x, y, 13, Math.PI / 2, C.enz, T, Math.min(u * 6, 1) * (1 - ss(e.tl, t1 + 0.5, t1 + 1.1))); }
  if (e.tl > t4) halo(ctx, 700, 470, 520, C.enz, 0.1 * ss(e.tl, t4 + 0.6, t4 + 2.4));
  un();
  rotulo(ctx, 150, 250, 'Hifa', 'UN HILO DEL HONGO · SIN BOCA', ss(e.tl, 0.6, 1.4) * (1 - en(e, 2, 0.5)), { c: C.hifa });
  // el micelio completo, en un recuadro
  const am = en(e, 1, 0.9) * (1 - en(e, 3, 0.6)); if (am > 0) { ctx.save(); ctx.globalAlpha = am; ctx.beginPath(); ctx.arc(1500, 330, 215, 0, TAU); ctx.fillStyle = '#05070b'; ctx.fill(); ctx.strokeStyle = 'rgba(240,235,220,.5)'; ctx.lineWidth = 2; ctx.stroke(); ctx.clip(); ctx.translate(1500, 330); pintaRed(ctx, red('h_mic', { seed: 21, radio: 205, brotes: 8, max: 5000 }), eo(e.tl, e.L(1), e.L(1) + 5), C.hifa, {}); ctx.restore(); rotulo(ctx, 1300, 640, 'Micelio', 'LA RED COMPLETA DE HIFAS', am, { c: C.hifa }); }
  rotulo(ctx, 150, 250, 'Digestión por fuera', 'PRIMERO DIGIERE, LUEGO TRAGA', en(e, 2, 0.8), { c: C.enz });
  chip(ctx, 'COMIDA: UNA MOLÉCULA GRANDE', 905, 856, { c: '#e8b06a', al: 'center', a: aCom * (1 - en(e, 4, 0.5)) });
  const ae = en(e, 3, 0.6); guia(ctx, 1150, 560, 1330, 420, ae * (1 - en(e, 4, 0.5)), C.enz); rotulo(ctx, 1340, 420, 'Enzimas', 'CORTAN AFUERA DE LA HIFA', ae * (1 - en(e, 4, 0.5)), { c: C.enz });
  rotulo(ctx, 1240, 300, 'Absorbe', 'POR TODA SU SUPERFICIE', en(e, 4, 0.8), { c: C.verde });
  esquema(ctx, ss(e.tl, 1, 2), 1700, 856);
};

LUZ.palabras = (ctx, e) => {
  noche(ctx, '#07080c', '#0b0d14'); const T = e.T, K = 1.55;
  titulo(ctx, '«Comer» puede ser tres cosas', 960, 180, ss(e.tl, 0.2, 1), { s: 70 });
  const col = [330, 960, 1590], y0 = 470, G = (x, f) => { ctx.save(); ctx.translate(x, y0); ctx.scale(K, K); f(); ctx.restore(); };
  // 1 · crecer encima
  const a1 = en(e, 1, 0.8); if (a1 > 0) { const x = col[0]; G(x, () => { ctx.globalAlpha = a1; ctx.fillStyle = '#6f7f95'; ctx.beginPath(); ctx.roundRect(-150, 0, 300, 80, 10); ctx.fill();
      const r = rng(5); ctx.fillStyle = '#d9b77a'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(-130 + r() * 260, -4 - r() * 5, 4 + r() * 4, 0, TAU); ctx.fill(); }
      ctx.beginPath(); ctx.rect(-170, -150, 340, 152); ctx.clip(); ctx.translate(0, -2); ctx.scale(1, 0.5); pintaRed(ctx, red('p_enc', { seed: 3, radio: 150, brotes: 9, max: 1500, abre: Math.PI, ang0: -Math.PI / 2 }), eo(e.tl, e.L(1), e.L(1) + 4), C.hifa, {}); });
    txt(ctx, 'MATERIAL INTACTO', x, y0 + 70, { s: 22, f: 'mono', w: 700, ls: 2, al: 'center', c: '#10141c', a: a1, sombra: false }); txt(ctx, 'come el polvo de encima', x, y0 - 150, { s: 40, f: 'mano', al: 'center', c: '#d9b77a', a: en(e, 1, 0.6, 1.6) }); tag3(ctx, 0, x, 680, a1, { s: 24 }); }
  // 2 · romper
  const a2 = en(e, 2, 0.8); if (a2 > 0) { const x = col[1], k = ss(e.tl, e.L(2) + 0.8, e.L(2) + 2.6), r = rng(8); G(x, () => { ctx.globalAlpha = a2; ctx.fillStyle = '#b98a52';
      for (let i = 0; i < 6; i++) { const dx = (i - 2.5) * 50, sep = (i - 2.5) * 12 * k, dy = Math.sin(i * 2.4) * 20 * k; ctx.save(); ctx.translate(dx + sep, 40 + dy); ctx.rotate((r() - 0.5) * 0.7 * k); ctx.beginPath(); ctx.roundRect(-24, -40, 48, 80, 6); ctx.fill(); ctx.restore(); } });
    txt(ctx, '¿a dónde fue el carbono?', x, y0 - 70, { s: 40, f: 'mano', al: 'center', c: C.oro, a: en(e, 2, 0.6, 2.4) }); tag3(ctx, 1, x, 680, a2, { s: 24 }); }
  // 3 · comer de verdad
  const a3 = en(e, 3, 0.8); if (a3 > 0) { const x = col[2], k = ss(e.tl, e.L(3) + 0.8, e.L(3) + 5.5); G(x, () => { ctx.globalAlpha = a3 * (1 - 0.75 * k); ctx.fillStyle = '#b98a52'; ctx.beginPath(); ctx.roundRect(-150 * (1 - 0.5 * k), 80 * 0.6 * k, 300 * (1 - 0.5 * k), 80 * (1 - 0.6 * k), 10); ctx.fill();
      ctx.globalAlpha = a3; ctx.translate(0, 50); ctx.scale(1, 0.5); pintaRed(ctx, red('p_come', { seed: 13, radio: 160, brotes: 10, max: 2600 }), 0.15 + 0.85 * k, C.hifa, {}); });
    burbujas(ctx, e, e.L(3) + 1.4, x, y0 + 10, 5, 300, 150); txt(ctx, 'CO₂ y agua, o más hongo', x, y0 - 190, { s: 40, f: 'mano', al: 'center', c: C.verde, a: en(e, 3, 0.6, 2.6) }); tag3(ctx, 2, x, 680, a3, { s: 19 }); }
  // advertencia
  const a4 = en(e, 4, 0.8); if (a4 > 0) { ctx.save(); ctx.globalAlpha = a4; ctx.strokeStyle = 'rgba(200,220,245,.7)'; ctx.lineWidth = 3; ctx.fillStyle = rgba(C.agua, 0.2); ctx.beginPath(); ctx.roundRect(486, 752, 34, 106, [4, 4, 17, 17]); ctx.fill(); ctx.stroke(); ctx.fillStyle = rgba(C.agua, 0.5); ctx.beginPath(); ctx.roundRect(489, 806, 28, 49, [0, 0, 14, 14]); ctx.fill(); ctx.restore();
    chip(ctx, 'EN UN TUBO DE LABORATORIO', 546, 806, { c: C.agua, a: a4, s: 26 }); txt(ctx, '≠', 1085, 826, { s: 64, f: 'serif', al: 'center', c: C.rojo, a: a4 }); chip(ctx, 'A ESCALA REAL', 1130, 806, { c: C.oro, a: a4, s: 26 }); }
};

/* ====== 02 · La madera ====== */
// Pared de la madera (esquema): fibras de celulosa envueltas en una malla de lignina.
function paredMadera(ctx, x, y, w, h, o = {}) {
  const filas = Math.floor(h / 92);
  for (let j = 0; j < filas; j++) for (let k = 0; k < 2; k++) fibra(ctx, x, x + w, y + 46 + j * 92 + k * 26 - 13, o.ccel || C.cel, (o.acel ?? 1), 12, o.corte);
  return malla(ctx, x + 20, y + 4, Math.floor(w / 96), filas + 1, 96, o.seed || 5, o.roto, C.lig, o.alig ?? 1);
}
LUZ.madera = (ctx, e) => {
  noche(ctx, '#0a0705', '#120c08'); halo(ctx, 430, 520, 700, '#FFB05A', 0.1); const T = e.T;
  sombra(ctx, 430, 610, 260); OBJ.madera(ctx, 440, 610, 3.1 + 0.1 * ss(e.tl, 0, e.dur), 0, T);
  const al = en(e, 1, 0.9), x = 1400, y = 470, r = 350; if (al > 0) { guia(ctx, 560, 450, x - r + 8, y - 60, al, C.lig);
    ctx.save(); ctx.globalAlpha = al; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = '#0b0d12'; ctx.fill(); ctx.strokeStyle = rgba(C.lig, 0.8); ctx.lineWidth = 3; ctx.stroke(); ctx.clip();
    const lat = 1 + 0.05 * Math.sin(T * 0.7); paredMadera(ctx, x - r - 10, y - r - 20 + Math.sin(T * 0.3) * 8, r * 2 + 40, r * 2 + 80, { acel: 0.35 + 0.65 * en(e, 2, 1), alig: lat * 0.95 }); ctx.restore();
    rotulo(ctx, 150, 740, 'Lignina', 'MALLA DE ANILLOS DE CARBONO', al, { c: C.lig }); rotulo(ctx, 150, 846, 'Celulosa', 'FIBRAS · CADENAS DE AZÚCAR', en(e, 2, 0.8), { c: C.cel }); }
  rotulo(ctx, 150, 250, 'Madera', 'OBJETO 1 DE 8', ss(e.tl, 0.3, 1.1), { c: C.oro }); esquema(ctx, al, 1560, 860);
};
LUZ.blanca = (ctx, e) => {
  noche(ctx, '#07080c', '#0c0b0d'); const T = e.T, t1 = e.L(1) ?? 99, t2 = e.L(2) ?? 99, t3 = e.L(3) ?? 99;
  const un = cam(ctx, 1 + 0.05 * ss(e.tl, 0, e.dur), 1050, 540);
  const x0 = 720, frente = (x) => ss(e.tl, t2 + 0.6 + (x - x0) / 190, t2 + 2.2 + (x - x0) / 190);
  const N = paredMadera(ctx, x0, 300, 1160, 520, { roto: (i, x) => frente(x), ccel: mixc(C.cel, '#f6f3ea', ss(e.tl, t3, t3 + 3)), seed: 9 });
  const tip = hifaTubo(ctx, bez([-60, 240], [200, 250], [330, 520], [560, 540], 26), eo(e.tl, 0.2, 3.4), { T, w: 46 });
  // enzimas que salen de la punta y se quedan frente a la malla
  if (e.tl > t1) for (let i = 0; i < 7; i++) { const u = pr(e.tl, t1 + i * 0.4, t1 + 1.6 + i * 0.4), dest = [740 + (i % 3) * 70 + ss(e.tl, t2, t2 + 6) * 420, 360 + i * 66 + Math.sin(T * 1.3 + i) * 12], [x, y] = viaje([tip[0], tip[1]], dest, u, 36, 1); enzima(ctx, x, y, 15, 0, C.enz, T, Math.min(1, u * 5));
    // radicales libres desde cada enzima hacia la malla
    if (e.tl > t2 && u >= 1) for (let k = 0; k < 3; k++) { const f = (((e.tl - t2) * 0.9 + k / 3 + i * 0.13) % 1), n = N[(i * 7 + k * 11 + Math.floor((e.tl - t2) * 0.9 + k / 3 + i * 0.13) * 5) % N.length]; chispa(ctx, mixn(x + 16, n[0], f), mixn(y, n[1], f), 8, C.rad, Math.sin(f * Math.PI), T * 3 + k); } }
  if (e.tl > t3) burbujas(ctx, e, t3 + 0.3, 1100, 520, 7, 760, 330);
  un();
  ficha(ctx, 1390, 120, 2012, '*Science*', 'FLOUDAS ET AL.', ss(e.tl, 0.2, 1));
  rotulo(ctx, 110, 610, 'Pudrición blanca', 'HIFA DEL HONGO', ss(e.tl, 1.2, 2), { c: C.hifa });
  const ae = ss(e.tl, t1 + 0.4, t1 + 1.2); rotulo(ctx, 110, 725, 'Enzimas', 'PEROXIDASAS', ae, { c: C.enz });
  rotulo(ctx, 110, 840, 'Radicales libres', 'NO SON ESPECÍFICOS', ss(e.tl, t2 + 0.4, t2 + 1.2), { c: C.rad });
  tag3(ctx, 2, 1240, 860, ss(e.tl, t3 + 0.5, t3 + 1.3)); esquema(ctx, 1, 1700, 860);
};
// Bloque de madera grande con dos formas de pudrición.
function bloque(ctx, x, y, w, h, tipo, k) {
  ctx.save(); const base = tipo === 'blanca' ? mixc('#8a5a32', '#e6e0cf', k) : mixc('#8a5a32', '#4a2a14', k);
  ctx.fillStyle = base; ctx.beginPath(); ctx.roundRect(x, y, w, h, 12); ctx.fill(); ctx.save(); ctx.clip(); const r = rng(tipo === 'blanca' ? 3 : 4);
  ctx.strokeStyle = tipo === 'blanca' ? mixc('#4a2d16', '#a59c86', k) : mixc('#4a2d16', '#2a1508', k); ctx.lineWidth = 2.5; for (let i = 0; i < 22; i++) { const yy = y + (i + 0.5) * h / 22; ctx.beginPath(); ctx.moveTo(x, yy); ctx.bezierCurveTo(x + w * 0.3, yy + (r() - 0.5) * 14, x + w * 0.7, yy + (r() - 0.5) * 14, x + w, yy); ctx.stroke(); }
  if (tipo === 'blanca') { ctx.strokeStyle = `rgba(255,255,255,${0.75 * k})`; ctx.lineWidth = 2; for (let i = 0; i < 90; i++) { const xx = x + r() * w, yy = y + r() * h, l = 30 + r() * 70; ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + l * k, yy + (r() - 0.5) * 8); ctx.stroke(); } }
  else { ctx.strokeStyle = `rgba(10,5,2,${0.95 * k})`; ctx.lineWidth = 6 * k + 0.01; const nx = 5, ny = 3; for (let i = 1; i < nx; i++) { const xx = x + i * w / nx + (r() - 0.5) * 16; ctx.beginPath(); ctx.moveTo(xx, y); ctx.lineTo(xx + (r() - 0.5) * 24, y + h * ss(k, 0.2, 1)); ctx.stroke(); } for (let j = 1; j < ny; j++) { const yy = y + j * h / ny + (r() - 0.5) * 12; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w * ss(k, 0, 0.8), yy + (r() - 0.5) * 18); ctx.stroke(); } }
  ctx.restore(); ctx.restore();
}
LUZ.pudriciones = (ctx, e) => {
  mesaFondo(ctx, e.T, 0.9); const k1 = ss(e.tl, 0.3, 3.4), k2 = ss(e.tl, (e.L(1) ?? 3.6) + 0.3, (e.L(1) ?? 3.6) + 4);
  sombra(ctx, 520, 716, 300); bloque(ctx, 250, 420, 540, 290, 'blanca', k1); sombra(ctx, 1400, 716, 300); bloque(ctx, 1130, 420, 540, 290, 'cafe', k2);
  rotulo(ctx, 250, 330, 'Pudrición blanca', 'DESHACE LA LIGNINA · QUEDA BLANQUIZCA', ss(e.tl, 0.4, 1.2), { c: '#f1ecdf' });
  rotulo(ctx, 1130, 330, 'Pudrición café', 'COME CELULOSA · DEJA LIGNINA EN CUBOS', en(e, 1, 0.8), { c: '#d08a4a', s: 46 });
  esquema(ctx, 1, 60, 846);
};
// Racimo de setas Pleurotus sobre un bloque de sustrato.
LUZ.pleurotus = (ctx, e) => {
  mesaFondo(ctx, e.T, 0.95); const col = ss(e.tl, 0.2, 3.2), fr = ss(e.tl, 2.6, 8), x = 620, y = 740, r = rng(17);
  sombra(ctx, x, y, 330);
  // bloque de bagazo (fibras) que el micelio vuelve blanco antes de dar setas
  ctx.save(); ctx.beginPath(); ctx.roundRect(x - 290, y - 250, 580, 250, 26); ctx.fillStyle = mixc('#9a7a45', '#ece6d6', col); ctx.fill(); ctx.clip();
  ctx.lineWidth = 3; for (let i = 0; i < 150; i++) { const xx = x - 290 + r() * 580, yy = y - 250 + r() * 250, an = r() * 3, l = 20 + r() * 40; ctx.strokeStyle = mixc(['#c9a865', '#7a5a2c', '#b08a4a'][i % 3], '#f6f3ea', col * (0.6 + 0.4 * r())); ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + Math.cos(an) * l, yy + Math.sin(an) * l); ctx.stroke(); }
  ctx.restore();
  const S = [[-150, -236, 1.9, -0.5, 0.2], [-60, -246, 2.5, -0.2, 0.4], [50, -250, 2.9, 0.08, 0.5], [150, -240, 2.2, 0.38, 0.65], [-10, -244, 1.7, -0.02, 0.8], [220, -226, 1.5, 0.6, 0.3]];
  S.forEach(([dx, dy, s, rot, tono], i) => { const k = ss(fr, i * 0.1, 0.5 + i * 0.1); seta(ctx, x + dx, y + dy, s * k, rot, tono, k); });
  rotulo(ctx, 1080, 330, '*Pleurotus*', 'SETAS · HONGOS DE PUDRICIÓN BLANCA', ss(e.tl, 0.4, 1.2), { c: '#f1ecdf' });
  const a1 = en(e, 1, 0.8); chip(ctx, 'SUSTRATO: BAGAZO DE AGAVE', 1100, 470, { c: '#c9a865', a: a1 }); ficha(ctx, 1100, 520, 2024, '*Rev. Mex. Cienc. Agríc.*', 'P. OSTREATUS · RENDIMIENTO MEDIO', a1);
  chip(ctx, 'PRIMERO COLONIZA (BLANCO), LUEGO DA SETAS', 1100, 690, { c: '#f1ecdf', a: ss(e.tl, 2.2, 3), s: 18 });
};
// Línea de tiempo del Carbonífero (359 a 299 millones de años) y el cálculo de 2012.
function carbonBase(ctx, e, o = {}) {
  const T = e.T, g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, '#0d1a14'); g.addColorStop(0.6, '#0a120d'); g.addColorStop(1, '#050807'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080);
  halo(ctx, 500, 200, 800, '#9fe0a0', 0.07);
  const X = (ma) => 180 + (370 - ma) / (370 - 250) * 1560, ys = 610;
  // capas: pantano, turba y carbón bajo el Carbonífero
  ctx.fillStyle = '#16261c'; ctx.fillRect(0, ys, 1920, 60); const xc0 = X(359), xc1 = X(299);
  ctx.fillStyle = '#060606'; ctx.beginPath(); ctx.moveTo(xc0, ys + 60); ctx.lineTo(xc1, ys + 60); ctx.lineTo(xc1 + 30, ys + 60); ctx.lineTo(xc1, ys + 130); ctx.lineTo(xc0, ys + 130); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(120,130,140,.35)'; ctx.lineWidth = 2; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.moveTo(xc0, ys + 78 + k * 18); ctx.lineTo(xc1 - k * 6, ys + 78 + k * 18); ctx.stroke(); }
  // árboles del pantano (licopsidas, esquema): tronco alto con copa bifurcada
  const r = rng(23); for (let i = 0; i < 16; i++) { const x = xc0 + 20 + (i / 15) * (xc1 - xc0 - 40) + (r() - 0.5) * 20, h = 150 + r() * 130, sw = Math.sin(T * 0.5 + i) * 3; ctx.strokeStyle = '#1e3a28'; ctx.lineCap = 'round'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(x, ys); ctx.lineTo(x + sw, ys - h); ctx.stroke(); ctx.lineWidth = 5;
    for (const d of [-1, 1]) { ctx.beginPath(); ctx.moveTo(x + sw, ys - h); ctx.lineTo(x + sw + d * 26, ys - h - 34); ctx.moveTo(x + sw + d * 26, ys - h - 34); ctx.lineTo(x + sw + d * 44, ys - h - 52); ctx.moveTo(x + sw + d * 26, ys - h - 34); ctx.lineTo(x + sw + d * 14, ys - h - 62); ctx.stroke(); } ctx.fillStyle = '#2a5a3a'; for (const [dx, dy] of [[-44, -52], [-14, -62], [14, -62], [44, -52]]) { ctx.beginPath(); ctx.ellipse(x + sw + dx, ys - h + dy - 6, 15, 10, 0, 0, TAU); ctx.fill(); } }
  // eje de tiempo
  const ya = 790; ctx.strokeStyle = 'rgba(230,235,245,.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(370), ya); ctx.lineTo(X(250), ya); ctx.stroke();
  ctx.fillStyle = rgba('#9fe0a0', 0.18); ctx.fillRect(xc0, ya - 12, xc1 - xc0, 24); txt(ctx, 'CARBONÍFERO', (xc0 + xc1) / 2, ya + 7, { s: 20, f: 'mono', w: 700, ls: 6, al: 'center', c: '#bfeac0' });
  txt(ctx, 'PÉRMICO', (xc1 + X(252)) / 2, ya + 7, { s: 20, f: 'mono', w: 700, ls: 6, al: 'center', c: '#9aa6b8' });
  for (const ma of [359, 299, 252]) { ctx.fillStyle = '#e6ebf5'; ctx.fillRect(X(ma) - 1, ya - 18, 2, 36); txt(ctx, ma + ' Ma', X(ma), ya + 50, { s: 20, f: 'mono', w: 700, al: 'center', c: '#c9d2e3' }); }
  txt(ctx, 'Ma = MILLONES DE AÑOS ATRÁS', 180, ya + 84, { s: 17, f: 'mono', w: 700, ls: 2, c: '#8fa0bd' });
  return { X, ys, ya };
}
LUZ.carbon = (ctx, e) => {
  const { X, ys, ya } = carbonBase(ctx, e), T = e.T;
  ficha(ctx, 150, 130, 2012, '*Science*', 'FLOUDAS ET AL. · 31 GENOMAS', ss(e.tl, 0.3, 1.1));
  const a1 = en(e, 1, 0.8), xm = X(295); if (a1 > 0) { ctx.save(); ctx.globalAlpha = a1; ctx.strokeStyle = C.enz; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(xm, ya - 20); ctx.lineTo(xm, 330); ctx.stroke(); ctx.restore(); halo(ctx, xm, ya, 60, C.enz, 0.6 * a1);
    ctx.save(); ctx.translate(xm, ys - 4); ctx.scale(1, 0.5); pintaRed(ctx, red('c_295', { seed: 4, radio: 130, brotes: 7, max: 900, abre: Math.PI, ang0: -Math.PI / 2 }), eo(e.tl, e.L(1), e.L(1) + 6), C.hifa, { a: a1 }); ctx.restore();
    rotulo(ctx, xm + 24, 380, '≈ 295 Ma', 'CÁLCULO: PRIMERA ENZIMA CONTRA LA LIGNINA', a1, { c: C.enz }); }
  // entierro de carbono (esquema): alto en el Carbonífero y cae al final
  const a2 = en(e, 2, 1.6); if (a2 > 0) { ctx.save(); ctx.strokeStyle = '#e6ebf5'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); const n = 60; for (let i = 0; i <= n * a2; i++) { const ma = 359 - (i / n) * 100, y = 560 - 120 * ss(ma, 286, 306); i ? ctx.lineTo(X(ma), y) : ctx.moveTo(X(ma), y); } ctx.stroke(); ctx.restore(); chip(ctx, 'ENTIERRO DE CARBONO (ESQUEMA)', X(350), 392, { c: '#e6ebf5', a: a2, s: 18 }); }
  const a3 = en(e, 3, 0.7); sello(ctx, 'HIPÓTESIS', 1500, 250, a3, C.oro, -0.06, 52); txt(ctx, '«al menos en parte»', 1500, 330, { s: 40, f: 'mano', al: 'center', c: C.oro, a: en(e, 3, 0.7, 1.6) });
};
LUZ.carbon2 = (ctx, e) => {
  const { X, ys, ya } = carbonBase(ctx, e), T = e.T;
  ficha(ctx, 150, 130, 2016, '*PNAS*', 'NELSEN ET AL.', ss(e.tl, 0.3, 1.1), C.rojo);
  sello(ctx, 'HIPÓTESIS', 1500, 250, 1 - ss(e.tl, 2.2, 2.8), C.oro, -0.06, 52); sello(ctx, 'RECHAZADA EN 2016', 1470, 250, ss(e.tl, 2.4, 3), C.rojo, -0.06, 44);
  const a1 = en(e, 1, 0.8); if (a1 > 0) { const R = rng(3); for (let i = 0; i < 10; i++) { const x = X(350) + R() * (X(305) - X(350)), y = ys - 16 - R() * 26, an = R() * 3 + Math.sin(T + i) * 0.3; ctx.save(); ctx.globalAlpha = a1; ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = '#9ad0ff'; ctx.beginPath(); ctx.roundRect(-13, -5, 26, 10, 5); ctx.fill(); ctx.restore(); }
    for (const xx of [X(340), X(318)]) { ctx.save(); ctx.translate(xx, ys - 2); ctx.scale(1, 0.45); pintaRed(ctx, red('c2_' + Math.round(xx), { seed: Math.round(xx), radio: 90, brotes: 6, max: 500, abre: Math.PI, ang0: -Math.PI / 2 }), eo(e.tl, e.L(1), e.L(1) + 4), C.hifa, { a: a1 }); ctx.restore(); }
    chip(ctx, 'OTRAS BACTERIAS Y HONGOS TAMBIÉN MODIFICAN LA LIGNINA', X(359), 400, { c: '#9ad0ff', a: a1, s: 18 }); }
  const a2 = en(e, 2, 0.8); if (a2 > 0) { ctx.save(); ctx.globalAlpha = a2 * 0.6; ctx.strokeStyle = C.agua; ctx.lineWidth = 2; for (let i = 0; i < 70; i++) { const x = X(359) + ((i * 97) % 760), y = 120 + ((i * 53 + T * 420) % 480); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 6, y + 22); ctx.stroke(); } ctx.restore();
    const k = ss(e.tl, e.L(2) + 0.5, e.L(2) + 5); ctx.fillStyle = rgba('#b8905a', 0.75 * a2); ctx.fillRect(X(359), ys + 60 - 46 * k, X(299) - X(359), 46 * k);
    chip(ctx, 'CLIMA TROPICAL SIEMPRE HÚMEDO', X(354), 460, { c: C.agua, a: a2, s: 18 }); chip(ctx, 'CUENCAS QUE SE LLENAN DE SEDIMENTO', X(354), 720, { c: '#d9b77a', a: en(e, 2, 0.8, 2.4), s: 18 }); }
};
// Fondo de los veredictos: el objeto grande a la izquierda.
function vObjeto(ctx, e, k, t, s = 3.4, x = 560, y = 720) { noche(ctx, '#0a0806', '#120d09'); halo(ctx, x, y - 160, 760, '#FFB05A', 0.12); sombra(ctx, x, y, 80 * s); OBJ[k](ctx, x, y, s, t, e.T); }
LUZ.v_madera = (ctx, e) => { vObjeto(ctx, e, 'madera', ss(e.tl, 0.2, 4.5), 3.3, 560, 760); veredicto(ctx, e, 0, 'Se la comen\nde verdad', 'Los hongos de pudrición blanca\nmineralizan la lignina', C.oro); };

/* ====== 03 · Pelo y caparazón ====== */
// Queratina (esquema): cadenas onduladas de proteína unidas por puentes de azufre (S–S).
function queratina(ctx, x0, x1, y, filas, o = {}) {
  const T = o.T || 0, sep = o.sep || 54, a = cl(o.a ?? 1), cq = '#E7A0B8'; ctx.save(); ctx.lineCap = 'round';
  for (let j = 0; j < filas; j++) { const yy = y + j * sep; ctx.strokeStyle = cq; ctx.lineWidth = 6; let dib = false; ctx.beginPath();
    for (let x = x0; x <= x1; x += 8) { const c = o.corte ? cl(o.corte(x, j)) : 0, py = yy + Math.sin(x * 0.045 + j * 1.7) * 11 + c * (j % 2 ? 26 : -26) * Math.sin(x * 0.02 + j); if (c > 0.5 && Math.floor(x / 56) % 2 === 0) { dib = false; continue; } ctx.globalAlpha = a * (1 - 0.5 * c); dib ? ctx.lineTo(x, py) : ctx.moveTo(x, py); dib = true; } ctx.stroke(); }
  for (let j = 0; j < filas - 1; j++) for (let x = x0 + 40 + (j % 2) * 46; x < x1 - 20; x += 92) { const c = o.puente ? cl(o.puente(x, j)) : 0, b = o.brillo || 0, y1 = y + j * sep + Math.sin(x * 0.045 + j * 1.7) * 11, y2 = y + (j + 1) * sep + Math.sin(x * 0.045 + (j + 1) * 1.7) * 11, m = (y1 + y2) / 2, gap = c * 14;
    ctx.globalAlpha = a; ctx.strokeStyle = C.enz; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, m - 9 - gap); ctx.moveTo(x, m + 9 + gap); ctx.lineTo(x, y2); ctx.stroke(); if (c < 0.5) { ctx.beginPath(); ctx.moveTo(x, m - 9); ctx.lineTo(x, m + 9); ctx.stroke(); }
    for (const d of [-1, 1]) { ctx.fillStyle = C.enz; ctx.beginPath(); ctx.arc(x, m + d * (9 + gap), 8, 0, TAU); ctx.fill(); ctx.fillStyle = '#14100a'; ctx.font = `700 11px ${FU.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('S', x, m + d * (9 + gap) + 1); } if (b > 0.01) halo(ctx, x, m, 30, C.enz, 0.5 * b * (1 - c)); }
  ctx.restore();
}
LUZ.pelo = (ctx, e) => {
  noche(ctx, '#0a0707', '#120c0c'); const T = e.T;
  // un pelo de cerca: tallo con escamas (cutícula)
  ctx.save(); ctx.translate(430, 560); ctx.rotate(-0.5 + 0.02 * Math.sin(T * 0.6)); const g = ctx.createLinearGradient(0, -70, 0, 70); g.addColorStop(0, '#7a4c28'); g.addColorStop(0.5, '#4a2c16'); g.addColorStop(1, '#22130a'); ctx.fillStyle = g; ctx.fillRect(-700, -70, 1400, 140);
  ctx.strokeStyle = 'rgba(20,10,4,.75)'; ctx.lineWidth = 3; for (let i = -12; i < 13; i++) { const x = i * 56 + ((e.tl * 6) % 56); ctx.beginPath(); ctx.moveTo(x, -70); ctx.quadraticCurveTo(x + 30, -30, x + 6, 0); ctx.quadraticCurveTo(x + 34, 36, x + 2, 70); ctx.stroke(); }
  ctx.fillStyle = 'rgba(255,220,180,.14)'; ctx.fillRect(-700, -58, 1400, 16); ctx.restore();
  rotulo(ctx, 150, 250, 'Pelo', 'OBJETO 2 DE 8', ss(e.tl, 0.3, 1.1), { c: C.oro });
  const al = en(e, 1, 0.9), x = 1330, y = 470, r = 320; if (al > 0) { guia(ctx, 610, 470, x - r + 6, y, al, '#E7A0B8'); ctx.save(); ctx.globalAlpha = al; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = '#0c0a0e'; ctx.fill(); ctx.strokeStyle = 'rgba(231,160,184,.8)'; ctx.lineWidth = 3; ctx.stroke(); ctx.clip();
    queratina(ctx, x - r - 20, x + r + 20, y - 230, 9, { T, a: 1, sep: 58, brillo: en(e, 2, 0.8) * (0.7 + 0.3 * Math.sin(T * 3)) }); ctx.restore();
    rotulo(ctx, 760, 800, 'Queratina', 'PELO · UÑAS · CUERNOS · PEZUÑAS · PLUMAS', al, { c: '#E7A0B8' }); chip(ctx, 'PUENTES DE AZUFRE (S–S)', x, y - r - 34, { c: C.enz, al: 'center', a: en(e, 2, 0.8) }); }
  esquema(ctx, al, 60, 846);
};
LUZ.tijeras = (ctx, e) => {
  noche(ctx, '#08070a', '#0e0b10'); const T = e.T, t1 = e.L(1) ?? 99, t2 = e.L(2) ?? 99;
  const x0 = 520, x1 = 1800, y0 = 470, cA = ss(e.tl, t2 + 0.6, t2 + 2.2), cB = ss(e.tl, t2 + 1.8, t2 + 3.4), cC = ss(e.tl, t2 + 3.0, t2 + 4.6);
  queratina(ctx, x0, x1, y0, 5, { T, sep: 62, corte: (x, j) => (x < 960 ? cA : x < 1380 ? cB * (j > 1 ? 1 : 0.5) : cC), puente: (x) => (x < 960 ? cA : x < 1380 ? cB : cC) });
  const tip = hifaTubo(ctx, bez([-60, 180], [160, 200], [300, 420], [470, 560], 24), eo(e.tl, 0.2, 3), { T, w: 44 });
  const E = [['1', '#FFD23F', [760, 440], 'CORTA EN MEDIO DE LA CADENA'], ['2', '#FF9A5A', [1170, 600], 'CORTA DESDE LA PUNTA'], ['3', '#8FE0FF', [1590, 500], 'CORTA LOS PEDAZOS CHICOS']];
  E.forEach(([n, c, d, s], i) => { const u = pr(e.tl, t1 + 1 + i * 1.3, t1 + 3.2 + i * 1.3); if (u <= 0) return; const dd = [d[0] + Math.sin(T * 1.6 + i) * 26 * (e.tl > t2 ? 1 : 0.3), d[1] + Math.cos(T * 1.3 + i) * 18], [x, y] = viaje([tip[0], tip[1]], dd, u, 40, 1); enzima(ctx, x, y, 26, 0, c, T, Math.min(1, u * 5), n);
    chip(ctx, n + ' · ' + s, d[0], 830 - (i % 2) * 52, { c, al: 'center', a: ss(e.tl, t2 + 0.4 + i * 1.2, t2 + 1.1 + i * 1.2), s: 18 }); });
  rotulo(ctx, 110, 700, '*Trichophyton rubrum*', 'HONGO DE LA PIEL', ss(e.tl, 1, 1.8) * (1 - ss(e.tl, t2, t2 + 0.5)), { c: C.hifa, s: 40 });
  ficha(ctx, 1330, 120, 2016, '*Appl. Microbiol. Biotechnol.*', 'LANGE ET AL. · ≥ 3 QUERATINASAS', ss(e.tl, t1, t1 + 0.8));
  rotulo(ctx, 560, 330, 'Queratina', 'CADENAS DE PROTEÍNA + PUENTES S–S', ss(e.tl, 0.6, 1.4), { c: '#E7A0B8' }); esquema(ctx, 1, 60, 846);
};
// Quitina (esquema): cadena de anillos de azúcar, cada uno con un grupo con nitrógeno (N).
function quitinaCad(ctx, x0, x1, y, o = {}) {
  const r = o.r || 20, n = Math.floor((x1 - x0) / (r * 2.9)), a = cl(o.a ?? 1), c = o.c || C.fluor; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const k = o.corte ? cl(o.corte(i)) : 0, x = x0 + i * r * 2.9 + r + k * (i % 2 ? 10 : -10), yy = y + (i % 2 ? 5 : -5) + k * (i % 2 ? 24 : -24);
    if (i && (o.corte ? cl(o.corte(i)) : 0) < 0.15) { ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x - r * 1.9, y + ((i - 1) % 2 ? 5 : -5)); ctx.lineTo(x - r, yy); ctx.stroke(); }
    hexa(ctx, x, yy, r, c, 1, 0, 3, false); ctx.fillStyle = rgba(c, 0.12); ctx.beginPath(); ctx.arc(x, yy, r * 0.8, 0, TAU); ctx.fill();
    const d = i % 2 ? 1 : -1; ctx.strokeStyle = '#b9a6ff'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, yy + d * r); ctx.lineTo(x, yy + d * (r + 14)); ctx.stroke(); ctx.fillStyle = '#b9a6ff'; ctx.beginPath(); ctx.arc(x, yy + d * (r + 22), 9, 0, TAU); ctx.fill(); ctx.fillStyle = '#14101e'; ctx.font = `700 12px ${FU.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('N', x, yy + d * (r + 22) + 1); }
  ctx.restore();
}
LUZ.quitina = (ctx, e) => {
  noche(ctx, '#060a0a', '#0a1010'); const T = e.T, t3 = e.L(3) ?? 99;
  halo(ctx, 400, 560, 560, '#3a9a6a', 0.1); sombra(ctx, 400, 700, 240); OBJ.escarabajo(ctx, 420, 700, 3.2, 0, T);
  rotulo(ctx, 150, 250, 'Caparazón', 'OBJETO 3 DE 8', ss(e.tl, 0.3, 1.1), { c: C.oro });
  const a1 = en(e, 1, 0.8); guia(ctx, 520, 560, 760, 620, a1, C.fluor);
  quitinaCad(ctx, 760, 1420, 660, { a: a1, corte: (i) => ss(e.tl, t3 + 1.2 + ((i * 3) % 11) * 0.3, t3 + 1.7 + ((i * 3) % 11) * 0.3) * (i % 2) });
  rotulo(ctx, 780, 800, 'Quitina', 'CADENA DE AZÚCARES CON NITRÓGENO', a1, { c: C.fluor });
  // la hifa, en corte: su pared lleva el mismo material
  const a2 = en(e, 2, 0.8); if (a2 > 0) { const x = 1560, y = 300; ctx.save(); ctx.globalAlpha = a2; ctx.fillStyle = '#10151d'; ctx.beginPath(); ctx.arc(x, y, 150, 0, TAU); ctx.fill(); ctx.strokeStyle = rgba(C.fluor, 0.9); ctx.lineWidth = 22; ctx.beginPath(); ctx.arc(x, y, 150, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#0b1414'; ctx.lineWidth = 2; for (let i = 0; i < 40; i++) { const an = i / 40 * TAU + T * 0.05; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * 140, y + Math.sin(an) * 140); ctx.lineTo(x + Math.cos(an) * 160, y + Math.sin(an) * 160); ctx.stroke(); }
    ctx.fillStyle = 'rgba(243,239,226,.14)'; ctx.beginPath(); ctx.arc(x - 30, y + 20, 46, 0, TAU); ctx.fill(); ctx.restore(); rotulo(ctx, 800, 300, 'Pared de la hifa', 'TAMBIÉN LLEVA QUITINA', a2, { c: C.fluor }); guia(ctx, 1400, 300, 1290, 300, a2, C.fluor); }
  if (e.tl > t3) for (let i = 0; i < 5; i++) { const u = pr(e.tl, t3 + 0.2 + i * 0.3, t3 + 1.6 + i * 0.3), [x, y] = viaje([1560, 470], [840 + i * 120 + Math.sin(T * 1.4 + i) * 14, 620], u, 30, 1); enzima(ctx, x, y, 15, Math.PI / 2, C.enz, T, Math.min(1, u * 5)); }
  chip(ctx, 'QUITINASAS: ENZIMAS QUE CORTAN QUITINA', 1090, 540, { c: C.enz, al: 'center', a: ss(e.tl, t3 + 0.3, t3 + 1), s: 20 }); esquema(ctx, a1, 60, 846);
};
LUZ.trichoderma = (ctx, e) => {
  noche(ctx, '#060a08', '#0a100c'); const T = e.T, t1 = e.L(1) ?? 99, un = cam(ctx, 1 + 0.06 * ss(e.tl, 0, e.dur), 960, 520);
  // hifa presa (gruesa) y Trichoderma (delgada, verde) enrollada alrededor
  const P = bez([-60, 560], [500, 500], [1300, 620], [1980, 540], 40); hifaTubo(ctx, P, 1, { T, w: 74, sep: 260 });
  const g = eo(e.tl, 0, 4.5), Q = []; for (let i = 0; i <= 150 * g; i++) { const u = i / 150, k = Math.min(39, Math.floor(u * 40)), p = P[k], q = P[k + 1], f = u * 40 - k, x = mixn(p[0], q[0], f), y = mixn(p[1], q[1], f), envuelve = ss(u, 0.12, 0.25); Q.push([x, y + mixn(-240 + u * 900, Math.sin(u * 46) * 58, envuelve), Math.cos(u * 46)]); }
  for (const frente of [false, true]) { ctx.save(); ctx.lineCap = 'round'; ctx.lineWidth = 15; let dib = false; ctx.beginPath(); Q.forEach((p) => { if ((p[2] > 0) !== frente && Q.indexOf(p) > 22) { dib = false; return; } dib ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); dib = true; }); ctx.strokeStyle = frente ? '#7CFF8A' : '#2f7a45'; ctx.stroke(); if (frente) { ctx.lineWidth = 6; ctx.strokeStyle = '#0c1a10'; ctx.stroke(); } ctx.restore(); if (!frente) hifaTubo(ctx, P, 1, { T, w: 74, sep: 260, a: 0.55 }); }
  // quitinasas y huecos en la pared de la presa
  for (let i = 0; i < 9; i++) { const x = 460 + i * 150, k = Math.min(39, Math.floor(((x + 60) / 2040) * 40)), y = P[k][1] - 30, a = ss(e.tl, 2.2 + i * 0.3, 2.8 + i * 0.3); enzima(ctx, x + Math.sin(T * 2 + i) * 10, y + Math.cos(T * 1.7 + i) * 6, 12, Math.PI / 2, C.enz, T, a); ctx.save(); ctx.globalAlpha = ss(e.tl, 3 + i * 0.3, 4 + i * 0.3); ctx.fillStyle = '#060a08'; ctx.beginPath(); ctx.ellipse(x + 16, y - 8, 12, 7, 0, 0, TAU); ctx.fill(); ctx.restore(); }
  // escudo: la pared de Trichoderma protegida de su propia enzima
  const a1 = ss(e.tl, t1, t1 + 1); if (a1 > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.lineCap = 'round'; ctx.lineWidth = 26; ctx.strokeStyle = rgba('#7CFF8A', 0.2 * a1 * (0.7 + 0.3 * Math.sin(T * 3))); ctx.beginPath(); Q.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore(); }
  un();
  rotulo(ctx, 150, 250, '*Trichoderma*', 'PARÁSITO DE OTROS HONGOS', ss(e.tl, 0.4, 1.2), { c: '#7CFF8A' }); rotulo(ctx, 1330, 800, 'Hongo presa', 'SU PARED DE QUITINA SE DESARMA', ss(e.tl, 2, 2.8), { c: C.hifa });
  ficha(ctx, 1380, 150, 2026, '*mBio*', 'PROTEÍNA QID74', a1, '#7CFF8A'); chip(ctx, 'PROTEGE SU PROPIA PARED', 1380, 300, { c: '#7CFF8A', a: a1, s: 20 }); esquema(ctx, 1, 60, 846);
};
LUZ.v_pelo = (ctx, e) => {
  noche(ctx, '#0a0806', '#120d09'); halo(ctx, 560, 520, 760, '#FFB05A', 0.12); const t = ss(e.tl, 0.2, 4);
  sombra(ctx, 380, 560, 190); OBJ.pelo(ctx, 380, 560, 2.5, t, e.T); pelusa(ctx, 'vp1', 380, 480, 190, t, 14); sombra(ctx, 720, 800, 190); OBJ.escarabajo(ctx, 720, 800, 2.4, t, e.T); pelusa(ctx, 'vp2', 720, 720, 180, t, 15);
  veredicto(ctx, e, 0, 'Los degradan y\nse alimentan', 'Queratina y quitina:\nhay hongos con esas enzimas', C.oro);
};

/* ====== 04 · Combustible y explosivos ====== */
LUZ.queroseno = (ctx, e) => {
  noche(ctx, '#0a0806', '#100c08'); const T = e.T, x = 300, y = 240, w = 900, h = 560, yi = y + h * 0.68;
  // tanque en corte: combustible arriba, agua al fondo, y el hongo en la frontera
  ctx.save(); ctx.beginPath(); ctx.roundRect(x, y, w, h, 30); ctx.clip(); ctx.fillStyle = '#3a2a08'; ctx.fillRect(x, y, w, h);
  const gq = ctx.createLinearGradient(0, y, 0, yi); gq.addColorStop(0, '#b9861a'); gq.addColorStop(1, '#8a5e0e'); ctx.fillStyle = gq; ctx.beginPath(); ctx.moveTo(x, y + 60); for (let i = 0; i <= 30; i++) ctx.lineTo(x + i * w / 30, y + 60 + Math.sin(i * 0.9 + T * 1.2) * 5); ctx.lineTo(x + w, yi); ctx.lineTo(x, yi); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#1d4a6a'; ctx.fillRect(x, yi, w, h);
  const g = eo(e.tl, 0.2, 7), r = rng(31); ctx.fillStyle = '#5a3a1c'; ctx.beginPath(); ctx.moveTo(x, yi + 8); for (let i = 0; i <= 40; i++) { const xx = x + i * w / 40; ctx.lineTo(xx, yi - (10 + 22 * r()) * g); } ctx.lineTo(x + w, yi + 12); ctx.closePath(); ctx.fill();
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, yi + 14 - y); ctx.clip(); ctx.translate(x + w / 2, yi - 6); ctx.scale(1.5, 0.55); pintaRed(ctx, red('q_mat', { seed: 9, radio: 300, brotes: 12, max: 3000, abre: Math.PI, ang0: -Math.PI / 2 }), g, '#d9b98a', {}); ctx.restore();
  // moléculas del combustible (cadenas de carbono) que bajan hacia el hongo
  const a1 = en(e, 1, 0.8); for (let i = 0; i < 7; i++) { const f = ((T * 0.12 + i / 7) % 1), xx = x + 90 + i * 118, yy = mixn(y + 110, yi - 40, f); ctx.save(); ctx.globalAlpha = a1 * Math.sin(f * Math.PI); ctx.strokeStyle = '#fff3c4'; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.beginPath(); for (let k = 0; k < 6; k++) { const px = xx + k * 13, py = yy + (k % 2 ? -6 : 6); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
  ctx.restore(); ctx.strokeStyle = 'rgba(200,210,225,.6)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.roundRect(x, y, w, h, 30); ctx.stroke();
  chip(ctx, 'COMBUSTIBLE DE AVIÓN (QUEROSENO)', x + 40, y + 120, { c: '#ffd77a', a: ss(e.tl, 0.5, 1.2), s: 18 }); chip(ctx, 'AGUA EN EL FONDO', x + 40, y + h - 60, { c: C.agua, a: ss(e.tl, 0.9, 1.6), s: 18 });
  rotulo(ctx, 1290, 380, '*Amorphotheca resinae*', '«HONGO DEL QUEROSENO»', ss(e.tl, 0.5, 1.3), { c: '#d9b98a', s: 42 }); guia(ctx, 1200, yi - 20, 1290, 430, ss(e.tl, 0.8, 1.5), '#d9b98a');
  chip(ctx, 'LO USA COMO ALIMENTO', 1310, 520, { c: C.verde, a: a1 }); chip(ctx, 'TANQUE EN CORTE · ESQUEMA', 1310, 590, { c: '#8fa0bd', s: 18, a: 0.8 });
};
// TNT (esquema): un anillo de carbono con un grupo metilo y tres grupos nitro.
function tntMol(ctx, x, y, s, a = 1, rot = 0) {
  a = cl(a); if (a <= 0.004) return; hexa(ctx, x, y, 40 * s, '#ffb37a', a, rot, 4 * s); const G = [[-Math.PI / 2, 'CH₃', '#e9eef7'], [Math.PI / 2, 'NO₂', '#ff7a6a'], [-Math.PI / 6 - Math.PI * 2 / 3 + Math.PI, 'NO₂', '#ff7a6a'], [Math.PI + Math.PI / 6 + Math.PI * 2 / 3 - Math.PI, 'NO₂', '#ff7a6a']];
  [[-90, 'CH₃', '#e9eef7'], [90, 'NO₂', '#ff7a6a'], [-30, 'NO₂', '#ff7a6a'], [-150, 'NO₂', '#ff7a6a']].forEach(([g, t, c]) => { const an = g * Math.PI / 180 + rot, x1 = x + Math.cos(an) * 40 * s, y1 = y + Math.sin(an) * 40 * s, x2 = x + Math.cos(an) * 66 * s, y2 = y + Math.sin(an) * 66 * s; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = c; ctx.lineWidth = 3 * s; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore(); txt(ctx, t, x + Math.cos(an) * 92 * s, y + Math.sin(an) * 88 * s + 8 * s, { s: 22 * s, f: 'mono', w: 700, al: 'center', c, a }); });
}
// Matraz con caldo y bolitas de micelio.
function cultivo(ctx, e, x, y, s, turbio = '#3a3320') {
  matraz(ctx, x, y, s, 0.5, rgba(turbio, 0.55)); const r = rng(77);
  for (let i = 0; i < 16; i++) { const px = x + (r() - 0.5) * 170 * s + Math.sin(e.T * 0.7 + i) * 8, py = y - 16 * s - r() * 70 * s + Math.cos(e.T * 0.9 + i * 2) * 5, rr = (7 + r() * 9) * s * eo(e.tl, 0, 4); ctx.fillStyle = 'rgba(246,243,234,.9)'; ctx.beginPath(); ctx.arc(px, py, rr, 0, TAU); ctx.fill(); halo(ctx, px, py, rr * 2.4, '#f6f3ea', 0.25); }
}
LUZ.tnt = (ctx, e) => {
  noche(ctx, '#0b0706', '#130b09'); const T = e.T, t1 = e.L(1) ?? 99, t2 = e.L(2) ?? 99;
  halo(ctx, 680, 560, 700, '#FF7A4A', 0.08); cultivo(ctx, e, 680, 820, 2.0);
  for (let i = 0; i < 5; i++) tntMol(ctx, 570 + i * 56 + Math.sin(T * 0.8 + i) * 14, 740 - (i % 2) * 44 + Math.cos(T * 0.6 + i * 2) * 8, 0.3, ss(e.tl, t1 + 0.3 + i * 0.2, t1 + 1 + i * 0.2) * (1 - 0.6 * ss(e.tl, t2 + 1, t2 + 5)), T * 0.2 + i);
  rotulo(ctx, 150, 250, 'Explosivos', 'TRINITROTOLUENO (TNT)', ss(e.tl, 0.3, 1.1), { c: C.rad });
  const a1 = ss(e.tl, t1, t1 + 0.8); tntMol(ctx, 1160, 420, 1.2, a1, Math.sin(T * 0.3) * 0.05); chip(ctx, 'TNT · ESQUEMA', 1160, 600, { c: '#ffb37a', al: 'center', a: a1, s: 18 });
  ficha(ctx, 1380, 150, 1990, '*Appl. Environ. Microbiol.*', 'FERNANDO, BUMPUS Y AUST', a1, C.rad); rotulo(ctx, 1380, 360, '*Phanerochaete chrysosporium*', 'HONGO DE PUDRICIÓN BLANCA', ss(e.tl, t1 + 1.6, t1 + 2.4), { c: C.hifa, s: 34 });
  const a2 = ss(e.tl, t2, t2 + 0.8); if (a2 > 0) { burbujas(ctx, e, t2 + 0.8, 680, 320, 5, 60, 200); const n = Math.round(35 * ss(e.tl, t2 + 1.4, t2 + 4.4));
    txt(ctx, n + ' %', 1400, 640, { s: 190, f: 'serif', w: 500, c: C.verde, a: a2 }); txt(ctx, 'del TNT → CO₂', 1410, 710, { s: 44, f: 'serif', w: 500, a: a2 }); chip(ctx, '1.3 mg/L · 18 DÍAS', 1410, 780, { c: C.oro, a: a2 }); lab(ctx, 1410, 840, a2, 'EN LABORATORIO', 'left'); }
};
LUZ.tnt_barras = (ctx, e) => {
  noche(ctx, '#0b0706', '#110a09'); const yb = 790, H = 4.5, T = e.T, t = (i) => e.L(i) ?? 99;
  titulo(ctx, 'La letra chiquita', 760, 200, ss(e.tl, 0.2, 1), { s: 70 });
  ctx.strokeStyle = 'rgba(230,235,245,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(200, yb); ctx.lineTo(1420, yb); ctx.stroke();
  for (const p of [0, 50, 100]) { txt(ctx, p + ' %', 180, yb - p * H + 8, { s: 20, f: 'mono', w: 700, al: 'right', c: '#8fa0bd' }); ctx.fillStyle = 'rgba(230,235,245,.12)'; ctx.fillRect(200, yb - p * H, 1220, 1); }
  const barra = (x, v, c, k, et, w = 150) => { if (k <= 0) return; const h = v * H * k; const g = ctx.createLinearGradient(0, yb - h, 0, yb); g.addColorStop(0, c); g.addColorStop(1, rgba(c, 0.35)); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x, yb - h, w, h, [8, 8, 0, 0]); ctx.fill(); halo(ctx, x + w / 2, yb - h, 120, c, 0.3 * k); txt(ctx, '≈ ' + Math.round(v * k) + ' %', x + w / 2, yb - h - 18, { s: 44, f: 'serif', w: 600, al: 'center', c, a: k }); txt(ctx, et, x + w / 2, yb + 36, { s: 19, f: 'mono', w: 700, ls: 2, al: 'center', c, a: k }); };
  // caso 1 (el de antes): poco TNT
  barra(330, 35, C.verde, ss(e.tl, 0.3, 1.6), 'SE VOLVIÓ CO₂'); chip(ctx, '1.3 mg/L · 18 DÍAS', 405, yb + 86, { c: C.oro, al: 'center', a: ss(e.tl, 0.5, 1.2), s: 18 });
  // caso 2: nivel de agua contaminada
  chip(ctx, '100 mg/L · 90 DÍAS', 1010, yb + 86, { c: C.oro, al: 'center', a: ss(e.tl, t(1), t(1) + 0.7), s: 18 });
  barra(820, 85, C.oro, ss(e.tl, t(2) + 0.2, t(2) + 2), 'DESAPARECIÓ'); barra(1050, 20, C.verde, ss(e.tl, t(3) + 0.2, t(3) + 1.6), 'SE VOLVIÓ CO₂');
  const a4 = ss(e.tl, t(4), t(4) + 0.8); if (a4 > 0) { ctx.save(); ctx.globalAlpha = a4; ctx.strokeStyle = C.rojo; ctx.lineWidth = 3; ctx.setLineDash([8, 7]); ctx.beginPath(); ctx.moveTo(1230, yb - 85 * H); ctx.lineTo(1290, yb - 85 * H); ctx.lineTo(1290, yb - 20 * H); ctx.lineTo(1230, yb - 20 * H); ctx.stroke(); ctx.restore();
    txt(ctx, 'roto, pero no', 1310, yb - 56 * H, { s: 38, f: 'mano', c: C.rojo, a: a4 }); txt(ctx, 'mineralizado', 1310, yb - 56 * H + 40, { s: 38, f: 'mano', c: C.rojo, a: a4 }); chip(ctx, 'ROMPER NO ES COMER DE VERDAD', 1310, yb - 56 * H + 100, { c: C.oro, a: ss(e.tl, t(4) + 1, t(4) + 1.8), s: 18 }); }
  lab(ctx, 1310, 700, ss(e.tl, t(5), t(5) + 0.8), 'CULTIVOS DE LABORATORIO', 'left');
};

window.LZA = { en, esquema, C, tag3, lab, ficha, bez, hifaTubo, enzima, chispa, viaje, hexa, malla, fibra, co2, burbujas, cadena, mesaFondo, sombra, seta, OBJ, ORDEN, MX, pelusa, mesa, vObjeto, cultivo, paredMadera };
