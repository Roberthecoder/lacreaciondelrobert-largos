// cine-luz-b.jsx — Documental 002 «¿Cómo se crea una cepa de un hongo?», capítulos 5 a 9.
const { TAU, cl, pr, ss, eo, mixn, rng, rgba, mixc, LUZC, halo, noche, estrellas, polvo, cam, oscurece, rico, rotulo, guia, titulo, sello, tache, flecha,
  red, pintaRed, tronco, petri, frasco, termometro, documento } = window.LZK;
const { fondoMicelio, txt, chip, en, esquema, CA, CB, CV, MIC, ROSA, ROJO, GRIS, disco, ovalo, caja, linea, nucleo, camino, hifa, fibula, placa, colonia, moho, abanico, racimo, setaPartida, champi, grano, granos, bolsa, frascoGrano, pinzas, bisturi, tubo, basidio, espora, lupa, estudio, mesa, lluvia, huella, escenaBolsa, puntas, conSector, ficha } = window.LZA;
const LUZ = window.LUZ;
const VIO = '#B79CFF';
const palomita = (ctx, x, y, s, a = 1, c = CV) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a); ctx.strokeStyle = c; ctx.lineWidth = s * 0.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - s * 0.5, y); ctx.lineTo(x - s * 0.12, y + s * 0.38); ctx.lineTo(x + s * 0.55, y - s * 0.42); ctx.stroke(); ctx.restore(); };
const equis = (ctx, x, y, s, a = 1, c = '#8693a8') => { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a); ctx.strokeStyle = c; ctx.lineWidth = s * 0.18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s * 0.4, y - s * 0.4); ctx.lineTo(x + s * 0.4, y + s * 0.4); ctx.moveTo(x + s * 0.4, y - s * 0.4); ctx.lineTo(x - s * 0.4, y + s * 0.4); ctx.stroke(); ctx.restore(); };
// Hifa dicariótica recta, de x0 a x1, con pares de núcleos y fíbulas completas en cada septo (crece hacia +x).
function dicarion(ctx, x0, x1, y, w, g, o = {}) {
  const c1 = o.c1 || CA, c2 = o.c2 || CB, n = o.celdas || 4, a = o.a ?? 1, xf = mixn(x0, x1, cl(g)), paso = (x1 - x0) / n, kf = o.kf ?? 1;
  hifa(ctx, [[x0, y], [xf, y]], w, 1, { a, punta: g < 1 });
  for (let i = 1; i < n; i++) { const sx = x0 + paso * i; if (sx > xf - w * 0.9) continue; linea(ctx, sx, y - w * 0.44, sx, y + w * 0.44, 'rgba(232,238,246,.86)', Math.max(2, w * 0.09), a); if (kf > 0) fibula(ctx, sx, y, w, kf, { a }); }
  for (let i = 0; i < n; i++) { const cx = x0 + paso * (i + 0.5); if (cx + w * 0.4 > xf) continue; const r = w * 0.2; if (c1) nucleo(ctx, cx - w * 0.3, y - w * 0.08, r, c1, a * (o.a1 ? o.a1(i) : 1)); if (c2) nucleo(ctx, cx + w * 0.3, y + w * 0.08, r, c2, a * (o.a2 ? o.a2(i) : 1)); }
}
// Mitocondria (esquema): cápsula pequeña.
function mito(ctx, x, y, rot, c, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= cl(a); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = rgba(c, 0.85); ctx.beginPath(); ctx.roundRect(-11, -5, 22, 10, 5); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(-5, -4); ctx.lineTo(-2, 3); ctx.moveTo(2, -4); ctx.lineTo(5, 3); ctx.stroke(); ctx.restore(); }

/* ====== 05 · Dos núcleos en una célula ====== */
LUZ.fusion = (ctx, e) => {
  noche(ctx, '#080c17', '#04060b'); fondoMicelio(ctx, 5, 0.1); const t = e.tl, T = e.T, y = 470, w = 116;
  const toca = eo(t, 0.2, 3.2), une = ss(t, 3.3, 4.6), mig = ss(t, e.L(2), e.L(2) + 5.4);
  if (une < 1) { hifa(ctx, [[60, y], [mixn(560, 946, toca), y]], w, 1, { septos: [0.3, 0.64] }); hifa(ctx, [[1860, y], [mixn(1360, 974, toca), y]], w, 1, { septos: [0.3, 0.64] }); }
  if (une > 0) { hifa(ctx, [[60, y], [1860, y]], w, 1, { a: une }); [326, 630, 1290, 1594].forEach((sx) => linea(ctx, sx, y - w * 0.44, sx, y + w * 0.44, 'rgba(232,238,246,.6)', 8, une)); halo(ctx, 960, y, 160, MIC, 0.5 * une * (1 - ss(t, 4.6, 6.5))); }
  // núcleos residentes
  [180, 470, 780].forEach((x) => nucleo(ctx, x, y - 14, 21, CA)); [1140, 1450, 1740].forEach((x) => nucleo(ctx, x, y + 14, 21, CB));
  // núcleos que migran al micelio del otro
  for (let i = 0; i < 3; i++) { const k = cl(mig * 1.5 - i * 0.22); if (k <= 0) continue; const xa = mixn(860 - i * 60, [1680, 1380, 1070][i], eo(k, 0, 1)), xb = mixn(1060 + i * 60, [240, 540, 850][i], eo(k, 0, 1));
    nucleo(ctx, xa, y + 18, 20, CA, cl(k * 5)); nucleo(ctx, xb, y - 18, 20, CB, cl(k * 5)); if (k < 0.97) { halo(ctx, xa - 34, y + 18, 54, CA, 0.5); halo(ctx, xb + 34, y - 18, 54, CB, 0.5); } }
  txt(ctx, 'MONOCARIÓN 1', 300, y - 110, { s: 22, f: 'mono', w: 700, ls: 5, al: 'center', c: CA, a: ss(t, 0.3, 1) }); txt(ctx, 'MONOCARIÓN 2', 1620, y - 110, { s: 22, f: 'mono', w: 700, ls: 5, al: 'center', c: CB, a: ss(t, 0.3, 1) });
  chip(ctx, 'LAS HIFAS SE FUSIONAN', 960, 250, { al: 'center', c: MIC, s: 24, a: ss(t, 3.3, 4) * (1 - en(e, 1, 0.5)) });
  chip(ctx, 'SE UNEN LAS CÉLULAS · LOS NÚCLEOS, NO', 960, 250, { al: 'center', c: CB, s: 24, a: en(e, 1, 0.6) * (1 - en(e, 2, 0.5)) });
  chip(ctx, 'LOS NÚCLEOS MIGRAN HACIA LAS PUNTAS', 960, 250, { al: 'center', c: MIC, s: 24, a: en(e, 2, 0.6) * (1 - en(e, 3, 0.5)) });
  const a3 = en(e, 3, 0.8); if (a3 > 0) { txt(ctx, '1 a 3 mm por hora', 960, 250, { s: 84, f: 'serif', w: 500, al: 'center', c: MIC, a: a3 });
    const bx = 500, k = eo(t, e.L(3) + 1.6, e.L(3) + 5); txt(ctx, 'NÚCLEOS', bx - 24, 668, { s: 22, f: 'mono', w: 700, ls: 4, al: 'right', c: CB, a: a3 }); caja(ctx, bx, 644, Math.max(30, 900 * k), 30, CB, a3, 15);
    txt(ctx, 'PUNTA', bx - 24, 728, { s: 22, f: 'mono', w: 700, ls: 4, al: 'right', c: GRIS, a: a3 }); caja(ctx, bx, 704, Math.max(30, 45 * k), 30, GRIS, a3, 15);
    txt(ctx, 'HASTA 20 VECES MÁS RÁPIDO', bx + 80, 728, { s: 22, f: 'mono', w: 700, ls: 4, c: CB, a: en(e, 3, 0.7, 4.4) });
    rico(ctx, '*Coprinopsis* · REVISIÓN DEL AÑO 2000', 960, 820, { s: 22, f: 'mono', w: 700, ls: 3, al: 'center', c: GRIS, a: en(e, 3, 0.7, 2) }); }
  esquema(ctx, 1);
};
LUZ.dicarion = (ctx, e) => {
  noche(ctx, '#080c17', '#04060b'); fondoMicelio(ctx, 7, 0.1); const t = e.tl, y = 500, g = eo(t, 0.1, 5.5);
  dicarion(ctx, -40, 1500, y, 104, mixn(0.3, 1, g), { celdas: 5 });
  titulo(ctx, 'Dicarión', 620, 250, en(e, 1, 0.8), { s: 130, c: CB });
  txt(ctx, 'UNO DE CADA PADRE EN CADA CÉLULA', 620, 310, { s: 22, f: 'mono', w: 700, ls: 5, al: 'center', c: MIC, a: ss(t, 1.4, 2.2) });
  const a2 = en(e, 2, 0.8); chip(ctx, 'DOS GENOMAS JUNTOS, SIN FUSIONARSE', 420, 720, { c: MIC, s: 22, a: a2 });
  flecha(ctx, 1330, 620, 1560, 650, en(e, 2, 0.7, 1.4), ROSA, 4); basidio(ctx, 1680, 600, 1.7, 1, en(e, 2, 0.7, 1.8)); nucleo(ctx, 1680, 560, 20, CA, en(e, 2, 0.7, 2.4), CB, 0.5);
  txt(ctx, 'SE FUSIONAN HASTA EL BASIDIO', 1650, 830, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: ROSA, a: en(e, 2, 0.7, 2.6) }); esquema(ctx, 1);
};
// La fíbula, paso a paso (Kües 2000): gancho hacia atrás → el núcleo más cercano a la punta entra al gancho → los dos se dividen a la vez →
// septos (uno cruza la hifa, otro cierra el gancho) → el gancho se fusiona con la célula de atrás y le entrega su núcleo.
LUZ.fibula = (ctx, e) => {
  noche(ctx, '#070b16', '#04050a'); fondoMicelio(ctx, 9, 0.08); const t = e.tl, y = 520, w = 120, fx = 1020, L = (i) => e.L(i) ?? 999;
  const tip = mixn(1340, 1540, pr(t, 0, e.dur)), k = 0.25 * ss(t, L(1) + 0.2, L(1) + 2.2) + 0.37 * ss(t, L(2) + 0.6, L(2) + 3.6) + 0.38 * ss(t, L(4) + 1.8, L(4) + 3.2);
  hifa(ctx, [[-80, y], [tip, y]], w, 1); const pt = fibula(ctx, fx, y, w, k);
  const ent = ss(t, L(3) + 0.2, L(3) + 1.6), div = ss(t, L(3) + 2.2, L(3) + 4.0), sep = ss(t, L(4) + 0.2, L(4) + 1.2), pasa = ss(t, L(4) + 3.2, L(4) + 5.2);
  // septos
  linea(ctx, fx, y - w * 0.44, fx, y + w * 0.44, 'rgba(232,238,246,.9)', 9, sep); { const p = pt(0.14); linea(ctx, p[0] - 24, p[1] - 12, p[0] + 24, p[1] + 12, 'rgba(232,238,246,.9)', 7, sep); }
  // núcleo azul (el más cercano a la punta): entra al gancho y se divide ahí
  const top = pt(0.46), ax = mixn(1150, top[0], ent), ay = mixn(505, top[1], ent);
  if (div <= 0) nucleo(ctx, ax, ay, 22, CA);
  else { const fin = pt(1), a1x = pasa > 0 ? mixn(mixn(top[0], fin[0], cl(pasa * 2)), 850, cl(pasa * 2 - 1)) : top[0] - 10 * div, a1y = pasa > 0 ? mixn(mixn(top[1], fin[1] - 6, cl(pasa * 2)), 505, cl(pasa * 2 - 1)) : top[1];
    const p0 = pt(0.02), bx = mixn(top[0], mixn(p0[0] + 20, 1290, cl(div * 2 - 1)), cl(div * 2)), by = mixn(top[1], mixn(p0[1] + 20, 505, cl(div * 2 - 1)), cl(div * 2));
    if (div < 1) linea(ctx, a1x, a1y, bx, by, rgba(CA, 0.6), 3, 1 - div); nucleo(ctx, a1x, a1y, 20, CA); nucleo(ctx, bx, by, 20, CA); }
  // núcleo dorado: se divide en la hifa, a los dos lados del futuro septo
  const g1 = mixn(990, 1190, div), g2 = mixn(990, 800, div); if (div > 0 && div < 1) linea(ctx, g1, 540, g2, 540, rgba(CB, 0.6), 3, 1 - div); nucleo(ctx, g1, 540, div > 0 ? 20 : 22, CB); if (div > 0) nucleo(ctx, g2, 540, 20, CB);
  txt(ctx, 'PUNTA', tip + 10, y - 86, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: GRIS, a: ss(t, 0.4, 1.2) }); flecha(ctx, tip - 150, y - 110, tip - 30, y - 110, ss(t, 0.4, 1.4), GRIS, 3);
  const pasos = [[L(1), L(3), 'UN GANCHO HACIA ATRÁS'], [L(3), L(3) + 2.2, 'UN NÚCLEO ENTRA AL GANCHO'], [L(3) + 2.2, L(4), 'LOS DOS SE DIVIDEN A LA VEZ'], [L(4), L(4) + 1.8, 'SE FORMAN LAS PAREDES'], [L(4) + 1.8, L(5), 'EL GANCHO SE FUSIONA Y ENTREGA SU NÚCLEO']];
  pasos.forEach(([a, b, s], i) => { const al = ss(t, a, a + 0.5) * (1 - ss(t, b - 0.4, b)); txt(ctx, String(i + 1), 150, 800, { s: 90, f: 'serif', w: 500, c: CB, a: al }); txt(ctx, s, 220, 790, { s: 30, f: 'mono', w: 700, ls: 5, c: MIC, a: al }); });
  const a5 = en(e, 5, 0.7); if (a5 > 0) { [[800, 1000], [1140, 1340]].forEach(([x0, x1], i) => { ctx.save(); ctx.globalAlpha = a5 * (1 - en(e, 6, 0.5) * 0.6); ctx.strokeStyle = CV; ctx.lineWidth = 3; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.roundRect(x0 - 60, y - 80, x1 - x0 + 120, 160, 30); ctx.stroke(); ctx.restore(); txt(ctx, 'UNO Y UNO', (x0 + x1) / 2, y + 130, { s: 22, f: 'mono', w: 700, ls: 5, al: 'center', c: CV, a: a5 * (1 - en(e, 6, 0.5)) }); }); }
  const a6 = en(e, 6, 0.8); guia(ctx, fx, 386, 760, 260, a6, CB); rotulo(ctx, 420, 250, 'Fíbula', 'EL GANCHO YA CERRADO, SOBRE EL SEPTO', a6, { c: CB, s: 84 });
  esquema(ctx, 1);
};
// Tramo de hifa con un septo al centro. tipo: 'ok' fíbula cerrada · 'falsa' gancho abierto con su núcleo atrapado · 'sin' sin fíbula.
function tramo(ctx, x0, y0, w, tipo, a = 1, s = 1.45) {
  if (a <= 0.004) return; const x = 0, y = 0; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x0, y0); ctx.scale(s, s); hifa(ctx, [[x - 250, y], [x + 250, y]], w, 1); linea(ctx, x, y - w * 0.44, x, y + w * 0.44, 'rgba(232,238,246,.86)', 7);
  const pt = fibula(ctx, x, y, w, tipo === 'ok' ? 1 : tipo === 'falsa' ? 0.66 : 0);
  if (tipo === 'ok') { nucleo(ctx, x - 150, y - 8, 16, CA); nucleo(ctx, x - 90, y + 10, 16, CB); nucleo(ctx, x + 110, y - 8, 16, CA); nucleo(ctx, x + 170, y + 10, 16, CB); }
  else if (tipo === 'falsa') { const p = pt(0.5), q = pt(0.14); linea(ctx, q[0] - 18, q[1] - 9, q[0] + 18, q[1] + 9, 'rgba(232,238,246,.86)', 6); nucleo(ctx, p[0], p[1], 14, CA); nucleo(ctx, x - 110, y + 6, 16, CB); nucleo(ctx, x + 110, y - 8, 16, CA); nucleo(ctx, x + 170, y + 10, 16, CB); }
  else { nucleo(ctx, x - 140, y, 16, MIC); nucleo(ctx, x - 80, y + 4, 16, MIC); nucleo(ctx, x + 100, y - 4, 16, MIC); nucleo(ctx, x + 170, y + 4, 16, MIC); }
  ctx.restore();
}
LUZ.falsas = (ctx, e) => {
  noche(ctx, '#070b16', '#04050a'); const t = e.tl, a2 = en(e, 2, 0.9), d = 1 - a2;
  const a0 = ss(t, 0.2, 1) * d; tramo(ctx, 500, 440, 96, 'ok', a0); palomita(ctx, 500, 230, 70, ss(t, 2.4, 3) * d); rotulo(ctx, 190, 680, 'Fíbula completa', 'CERRADA · LA CRUZA FUNCIONÓ', ss(t, 1.2, 2) * d, { c: CV });
  const a1 = en(e, 1, 0.8) * d; tramo(ctx, 1400, 440, 96, 'falsa', a1); equis(ctx, 1400, 230, 70, en(e, 1, 0.6, 2.4) * d, ROJO); rotulo(ctx, 1080, 680, 'Fíbula falsa', 'NO SE CIERRA · SOLO DIFIEREN EN LA A', en(e, 1, 0.8, 1) * d, { c: ROJO });
  guia(ctx, 1400, 322, 1560, 262, en(e, 1, 0.6, 3) * d, ROJO); txt(ctx, 'NÚCLEO ATRAPADO', 1570, 256, { s: 19, f: 'mono', w: 700, ls: 3, c: ROJO, a: en(e, 1, 0.6, 3.2) * d });
  if (a2 > 0) { tramo(ctx, 900, 440, 96, 'sin', a2); champi(ctx, 330, 500, 1.7, 0, a2); rotulo(ctx, 190, 680, 'Champiñón blanco', '*Agaricus bisporus* · SUS HIFAS NO FORMAN FÍBULAS', en(e, 2, 0.8, 0.8), { c: MIC });
    chip(ctx, 'VALE PARA MUCHAS SETAS, NO PARA TODAS', 800, 230, { al: 'center', c: CB, s: 22, a: en(e, 2, 0.7, 2) }); }
  esquema(ctx, 1);
};
LUZ.buller = (ctx, e) => {
  noche(ctx, '#070b16', '#04050a'); fondoMicelio(ctx, 11, 0.07); const t = e.tl, T = e.T, y1 = 330, y2 = 600, w = 84, a3 = en(e, 3, 0.8);
  // puente entre los dos micelios
  hifa(ctx, [[760, y1], [760, y2]], 60, ss(t, 0.3, 1.6));
  dicarion(ctx, 100, 1160, y1, w, 1, { celdas: 4 });
  const nuevo = ss(t, e.L(1), e.L(1) + 3.6); hifa(ctx, [[520, y2], [1800, y2]], w, 1);
  [840, 1160, 1480].forEach((sx, i) => { linea(ctx, sx, y2 - w * 0.44, sx, y2 + w * 0.44, 'rgba(232,238,246,.86)', 7); fibula(ctx, sx, y2, w, cl(nuevo * 3.4 - i * 0.6 - 0.9)); });
  [680, 1000, 1320, 1640].forEach((cx, i) => { nucleo(ctx, cx + 26, y2 + 8, 17, CV); nucleo(ctx, cx - 26, y2 - 8, 17, CA, cl(nuevo * 3.2 - i * 0.55)); });
  // el núcleo donado
  const v = ss(t, 1.6, e.L(1)); if (v > 0 && nuevo < 0.3) { const C = camino([[700, y1 - 6], [760, y1 + 20], [760, y2 - 30], [654, y2 - 8]]).at(v); nucleo(ctx, C.x, C.y, 17, CA); halo(ctx, C.x, C.y, 60, CA, 0.5); }
  txt(ctx, 'DICARIÓN', 180, y1 - 90, { s: 22, f: 'mono', w: 700, ls: 6, c: CB, a: ss(t, 0.2, 0.9) }); txt(ctx, 'MONOCARIÓN', 1500, y2 + 110, { s: 22, f: 'mono', w: 700, ls: 6, c: CV, a: ss(t, 0.2, 0.9) * (1 - nuevo) });
  txt(ctx, 'DICARIÓN NUEVO', 1500, y2 + 110, { s: 22, f: 'mono', w: 700, ls: 6, c: CA, a: nuevo });
  chip(ctx, 'DONA UN NÚCLEO', 830, 465, { c: CA, s: 22, a: ss(t, 1.8, 2.5) * (1 - en(e, 2, 0.5)) });
  rotulo(ctx, 1230, 200, 'Fenómeno de Buller', 'A. H. R. BULLER · 1930 Y 1931', en(e, 2, 0.8), { c: CB, s: 50 }); chip(ctx, 'O CRUZA «DI-MON»', 1250, 290, { c: CB, s: 20, a: en(e, 2, 0.7, 3.6) });
  if (a3 > 0) { const R = rng(8); for (let i = 0; i < 9; i++) mito(ctx, 160 + R() * 900, y1 + (R() - 0.5) * 44 + Math.sin(T + i) * 3, R() * 3, '#FF9A5C', a3); for (let i = 0; i < 10; i++) mito(ctx, 600 + R() * 1150, y2 + (R() - 0.5) * 44 + Math.sin(T + i) * 3, R() * 3, VIO, a3);
    tache(ctx, 760, 465, 46, en(e, 3, 0.6, 1.6), '#FF9A5C'); chip(ctx, 'LAS MITOCONDRIAS NO SE INTERCAMBIAN', 150, 790, { c: '#FF9A5C', s: 22, a: en(e, 3, 0.7, 1.2) }); rico(ctx, 'VISTO EN *Coprinopsis*', 160, 846, { s: 22, f: 'mono', w: 700, ls: 3, c: GRIS, a: en(e, 3, 0.7, 2) }); }
  chip(ctx, 'ESQUEMA', 1760, 860, { c: '#8fa0bd', s: 16, a: 0.8 });
};

/* ====== 06 · Una cruza, paso a paso ====== */
LUZ.esporada = (ctx, e) => {
  noche(ctx, '#0a1410', '#050a08'); mesa(ctx, 760, '#1c241c', '#0b100c'); const t = e.tl, L1 = e.L(1), quita = ss(t, L1 + 4.2, L1 + 5.6);
  caja(ctx, 380, 740, 620, 26, '#06070a', 1, 3, 'rgba(255,255,255,.18)');
  // el sombrero, con las láminas hacia abajo
  ctx.save(); ctx.translate(690, 742 - quita * 240); ctx.scale(1.15, 1.7); ctx.globalAlpha = 1 - quita * 0.5; ctx.fillStyle = '#F9CAD6'; ctx.beginPath(); ctx.moveTo(-230, 0); ctx.lineTo(230, 0); ctx.quadraticCurveTo(0, -24, -230, 0); ctx.fill(); ctx.fillStyle = '#E8799C'; ctx.beginPath(); ctx.moveTo(-236, -4); ctx.bezierCurveTo(-200, -110, 200, -110, 236, -4); ctx.quadraticCurveTo(0, -30, -236, -4); ctx.fill(); ctx.strokeStyle = '#CF6388'; ctx.lineWidth = 2; ctx.beginPath(); for (let i = -11; i <= 11; i++) { ctx.moveTo(i * 20, -1); ctx.lineTo(i * 19, -12 + Math.abs(i) * 0.5); } ctx.stroke(); ctx.restore();
  // esporas que caen al papel
  if (t > L1 && quita < 1) lluvia(ctx, 480, 700, 420, 40, 60, e.T, 6, '#f8dfe2', (1 - quita) * 0.9, 1.5);
  // campana de vidrio
  const tapa = ss(t, L1 + 0.2, L1 + 1.2) * (1 - quita); ctx.save(); ctx.globalAlpha = tapa; ctx.translate(690, 744 - (1 - ss(t, L1 + 0.2, L1 + 1.2)) * 200); ctx.strokeStyle = 'rgba(210,228,248,.6)'; ctx.fillStyle = 'rgba(160,190,225,.07)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-300, 0); ctx.lineTo(-300, -190); ctx.bezierCurveTo(-300, -400, 300, -400, 300, -190); ctx.lineTo(300, 0); ctx.fill(); ctx.stroke(); ctx.restore();
  titulo(ctx, 'Esporada', 690, 250, ss(t, 0.4, 1.2), { s: 96, c: ROSA });
  chip(ctx, 'LÁMINAS HACIA ABAJO, SOBRE PAPEL', 1090, 560, { c: MIC, s: 22, a: en(e, 1, 0.6, 0.2) * (1 - quita) }); chip(ctx, 'TAPADO UNAS HORAS', 1090, 630, { c: MIC, s: 22, a: en(e, 1, 0.6, 1.6) * (1 - quita) });
  if (quita > 0) { caja(ctx, 1120, 240, 600, 470, '#040406', quita, 10, 'rgba(255,255,255,.14)'); huella(ctx, 1420, 620, 290, eo(t, L1 + 4.4, L1 + 6.6), quita); txt(ctx, 'LA HUELLA, VISTA DESDE ARRIBA', 1420, 760, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: GRIS, a: quita }); }
};
// Hifa de monocarión para lupa: septos simples, sin fíbulas, núcleos de un solo tipo.
function mono(ctx, c, g = 1, r = 200) { const P = [[-r, 30], [-r * 0.3, 10], [r * 0.3, 26], [r, -6]]; const C = hifa(ctx, P, 54, g, { septos: [0.33, 0.66], punta: true }); [0.16, 0.5, 0.82].forEach((u) => { if (u < g - 0.05) { const p = C.at(u); nucleo(ctx, p.x, p.y, 13, c); } }); }
LUZ.dilucion = (ctx, e) => {
  noche(ctx, '#0a1410', '#050a08'); const t = e.tl, T = e.T;
  // dilución en serie: cada tubo, menos esporas
  [0, 1, 2].forEach((i) => { const x = 180 + i * 170, a = ss(t, 0.2 + i * 0.7, 0.9 + i * 0.7), n = [60, 16, 4][i]; tubo(ctx, x, 700, 90, 380, (c) => { c.fillStyle = 'rgba(150,205,240,.22)'; c.fillRect(x - 50, 440, 100, 260); const R = rng(i + 3); for (let k = 0; k < n; k++) disco(c, x - 34 + R() * 68, 460 + R() * 220 + Math.sin(T + k) * 3, 3, '#f8dfe2', 0.9); }, a); if (i < 2) flecha(ctx, x + 60, 380, x + 110, 380, ss(t, 0.9 + i * 0.7, 1.4 + i * 0.7), MIC, 3); });
  txt(ctx, 'DILUCIÓN EN SERIE', 350, 780, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: GRIS, a: ss(t, 0.6, 1.4) }); flecha(ctx, 600, 520, 720, 520, ss(t, 2.4, 3), MIC, 4);
  const px = 1020, py = 480, a = ss(t, 2.4, 3.2); placa(ctx, px, py, 290, a); const R = rng(41), COL = ['#dfeaff', '#fff0cc', '#e4ffe9', '#f3e4ff', '#ffe6ec', '#e6fbff', '#fff7d9'];
  const pos = [[-150, -90], [40, -160], [160, -20], [-40, 20], [-170, 100], [70, 150], [190, -150]];
  pos.forEach(([dx, dy], i) => { disco(ctx, px + dx, py + dy, 3, '#f8dfe2', a); colonia(ctx, 'dl' + i, px + dx, py + dy, 54, eo(t, 3.4 + i * 0.25, 8.5 + i * 0.25) * 0.95, { seed: 50 + i, c: COL[i] }); });
  txt(ctx, 'UNA COLONIA = UNA ESPORA', px, py + 340, { s: 22, f: 'mono', w: 700, ls: 5, al: 'center', c: MIC, a: ss(t, 4.4, 5.2) });
  const a1 = en(e, 1, 0.8); lupa(ctx, 1600, 420, 200, a1, (c) => mono(c, '#9fd0ff', pr(t, e.L(1), e.L(1) + 3), 190), { ox: px + 160, oy: py - 20 });
  txt(ctx, 'MONOCARIÓN', 1600, 680, { s: 24, f: 'mono', w: 700, ls: 6, al: 'center', c: CA, a: a1 }); txt(ctx, 'SIN FÍBULAS', 1600, 718, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: GRIS, a: en(e, 1, 0.6, 0.8) });
  txt(ctx, 'CADA UNO, DISTINTO', 1600, 752, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: GRIS, a: en(e, 1, 0.6, 1.8) });
};
LUZ.enfrentar = (ctx, e) => {
  noche(ctx, '#0a1410', '#050a08'); const t = e.tl, x = 620, y = 500, r = 325, g = mixn(0.05, 1, eo(t, 0.4, e.L(1) + 2));
  placa(ctx, x, y, r); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r * 0.94, 0, TAU); ctx.clip();
  ctx.save(); ctx.beginPath(); ctx.rect(x - r, y - r, r, r * 2); ctx.clip(); colonia(ctx, 'enA', x - 150, y, 290, g, { seed: 61, c: '#dfeaff' }); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(x, y - r, r, r * 2); ctx.clip(); colonia(ctx, 'enB', x + 150, y, 290, g, { seed: 67, c: '#fff0cc' }); ctx.restore(); ctx.restore();
  caja(ctx, x - 163, y - 13, 26, 26, 'rgba(232,214,170,.9)', 1, 3); caja(ctx, x + 137, y - 13, 26, 26, 'rgba(232,214,170,.9)', 1, 3);
  chip(ctx, 'MONOCARIÓN 1', x - 170, y - r - 34, { al: 'center', c: CA, s: 20, a: ss(t, 0.4, 1.1) }); chip(ctx, 'MONOCARIÓN 2', x + 180, y - r - 34, { al: 'center', c: CB, s: 20, a: ss(t, 0.8, 1.5) });
  txt(ctx, 'DE PADRES DISTINTOS, FRENTE A FRENTE', x, y + r + 46, { s: 21, f: 'mono', w: 700, ls: 4, al: 'center', c: GRIS, a: ss(t, 1.6, 2.4) });
  const a1 = en(e, 1, 0.8); ctx.save(); ctx.globalAlpha = a1 * 0.9; ctx.strokeStyle = CV; ctx.lineWidth = 3; ctx.setLineDash([10, 10]); ctx.beginPath(); ctx.roundRect(x - 24, y - 250, 48, 500, 24); ctx.stroke(); ctx.restore();
  txt(ctx, 'ZONA DE ENCUENTRO', 1400, 150, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: CV, a: a1 * (1 - en(e, 2, 0.4)) });
  lupa(ctx, 1400, 450, 270, a1, (c) => { dicarion(c, -340, 340, 30, 124, 1, { celdas: 2, kf: ss(t, e.L(1) + 1.6, e.L(1) + 4) }); }, { ox: x + 24, oy: y - 60, c: CV });
  chip(ctx, 'FÍBULAS CERRADAS', 1400, 770, { al: 'center', c: CV, s: 22, a: en(e, 1, 0.6, 3.6) });
  sello(ctx, 'HÍBRIDO', 1400, 130, en(e, 2, 0.5, 0.3), CV, -0.04, 60);
};
LUZ.seleccion = (ctx, e) => {
  noche(ctx, '#0a1410', '#050a08'); mesa(ctx, 700, '#1c241c', '#0b100c'); const t = e.tl, V = [0.5, 0.92, 0.35, 0.7, 1.0, 0.45], elige = ss(t, 4.4, 5.4);
  V.forEach((v, i) => { const x = 240 + i * 290, ok = v > 0.9, ap = ss(t, 0.2 + i * 0.25, 0.9 + i * 0.25), dim = ap * (1 - (ok ? 0 : 0.65 * elige)), k = eo(t, 1.2 + i * 0.25, 4 + i * 0.25);
    caja(ctx, x - 80, 560, 160, 150, '#d9d2c2', dim, 10); caja(ctx, x - 80, 560, 160, 150, 'rgba(120,90,60,.25)', dim, 10); racimo(ctx, x, 540 - 10 * v, 0.5 + 0.75 * v * k, 'rosa', dim * cl(k * 3));
    caja(ctx, x - 70, 760, 140, 16, 'rgba(255,255,255,.08)', dim, 8); caja(ctx, x - 70, 760, Math.max(16, 140 * v * k), 16, CV, dim, 8); caja(ctx, x - 70, 790, 140, 16, 'rgba(255,255,255,.08)', dim, 8); caja(ctx, x - 70, 790, Math.max(16, 140 * (0.3 + 0.7 * V[(i + 2) % 6] * 0.6 + (ok ? 0.28 : 0)) * k), 16, CB, dim, 8);
    txt(ctx, 'HÍBRIDO ' + (i + 1), x, 300, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: GRIS, a: dim }); if (ok) palomita(ctx, x, 230, 60, elige); });
  chip(ctx, 'VERDE: CUÁNTO CRECE', 240, 850, { al: 'left', c: CV, s: 18, a: ss(t, 1.4, 2.2) }); chip(ctx, 'DORADO: CUÁNTO PRODUCE', 640, 850, { al: 'left', c: CB, s: 18, a: ss(t, 2.2, 3) });
  titulo(ctx, 'Cultivar, medir, elegir', 960, 170, ss(t, 0.3, 1.2), { s: 76 }); chip(ctx, 'ESQUEMA', 1760, 850, { c: '#8fa0bd', s: 16, a: 0.8 });
};
// Contorno aproximado de México (longitud, latitud). Es un esquema para ubicar un punto.
const MX = [[-117.1, 32.5], [-114.7, 32.7], [-114.8, 32.5], [-111.1, 31.3], [-108.2, 31.3], [-108.2, 31.8], [-106.5, 31.8], [-104.4, 29.6], [-103.1, 29.0], [-102.4, 29.8], [-101.0, 29.4], [-100.5, 28.7], [-99.5, 27.5], [-98.3, 26.1], [-97.15, 25.95], [-97.7, 24.5], [-97.85, 22.25], [-97.3, 21.0], [-96.1, 19.2], [-94.4, 18.15], [-92.6, 18.55], [-91.8, 18.65], [-90.7, 19.35], [-90.55, 19.85], [-90.4, 20.85], [-89.65, 21.3], [-88.2, 21.6], [-87.1, 21.6], [-86.75, 21.15], [-87.45, 20.2], [-87.5, 19.3], [-88.3, 18.5], [-88.9, 17.9], [-89.15, 17.8], [-91.0, 17.8], [-91.0, 17.25], [-90.4, 16.4], [-90.4, 16.1], [-91.7, 16.07], [-92.2, 15.3], [-92.2, 14.55], [-93.9, 16.0], [-95.2, 16.17], [-96.5, 15.65], [-97.1, 15.85], [-99.9, 16.85], [-101.55, 17.63], [-102.2, 17.95], [-104.3, 19.05], [-105.7, 20.4], [-105.25, 20.65], [-105.3, 21.55], [-106.42, 23.2], [-107.9, 24.6], [-109.4, 25.6], [-110.9, 27.9], [-112.0, 28.8], [-113.55, 31.3], [-114.8, 31.8], [-114.85, 31.0], [-113.55, 28.95], [-112.27, 27.35], [-111.35, 26.0], [-110.3, 24.2], [-109.7, 24.0], [-109.4, 23.4], [-109.7, 23.05], [-109.92, 22.88], [-110.25, 23.45], [-112.15, 24.6], [-112.2, 26.0], [-113.6, 26.7], [-115.08, 27.85], [-114.1, 28.0], [-114.3, 28.6], [-115.7, 30.3], [-116.6, 31.85]];
const geo = (lon, lat, x0, y0, k) => [x0 + (lon + 118) * k, y0 + (33 - lat) * k * 1.08];
function mexico(ctx, x0, y0, k, a) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); MX.forEach(([lo, la], i) => { const p = geo(lo, la, x0, y0, k); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }); ctx.closePath(); ctx.fillStyle = 'rgba(99,224,138,.10)'; ctx.fill(); ctx.strokeStyle = 'rgba(160,235,185,.7)'; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore(); }
LUZ.oaxaca = (ctx, e) => {
  noche(ctx, '#0a1410', '#050a08'); const t = e.tl, T = e.T, a2 = en(e, 2, 0.9), x0 = 90, y0 = 210, k = 25;
  mexico(ctx, x0, y0, k, ss(t, 0.1, 1) * (1 - 0.6 * a2)); const p = geo(-97.78, 17.8, x0, y0, k), ap = ss(t, 1.2, 1.8) * (1 - 0.6 * a2);
  halo(ctx, p[0], p[1], 50 + 20 * Math.sin(T * 3), ROSA, 0.7 * ap); disco(ctx, p[0], p[1], 8, ROSA, ap); guia(ctx, p[0], p[1], 440, 760, ap, ROSA); txt(ctx, 'HUAJUAPAN DE LEÓN, OAXACA', 300, 800, { s: 22, f: 'mono', w: 700, ls: 4, c: ROSA, a: ap });
  txt(ctx, 'MAPA ESQUEMÁTICO', 110, 200, { s: 16, f: 'mono', w: 700, ls: 4, c: '#8fa0bd', a: ap * 0.8 });
  const a1 = en(e, 1, 0.8) * (1 - a2); txt(ctx, '2010', 1060, 260, { s: 130, f: 'serif', w: 500, c: CB, a: a1 }); txt(ctx, 'DOS SETAS SILVESTRES', 1070, 310, { s: 22, f: 'mono', w: 700, ls: 6, c: MIC, a: a1 });
  ['Universidad Tecnológica de la Mixteca', 'Instituto Politécnico Nacional (IPN)', 'Universidad Nacional Autónoma de México (UNAM)'].forEach((s, i) => { const al = en(e, 1, 0.7, 1.4 + i * 2.4) * (1 - a2); linea(ctx, 1070, 400 + i * 100, 1070, 452 + i * 100, CV, 4, al); txt(ctx, s, 1094, 440 + i * 100, { s: 36, f: 'serif', w: 500, a: al }); });
  txt(ctx, 'PUBLICADO EN 2014 · BRAZILIAN JOURNAL OF MICROBIOLOGY', 1070, 730, { s: 18, f: 'mono', w: 700, ls: 3, c: GRIS, a: en(e, 1, 0.7, 8.4) * (1 - a2) });
  if (a2 > 0) { tronco(ctx, 760, 520, 1000, 130, 0.3, 12); racimo(ctx, 1010, 470, 1.7, 'blanca', a2, T); racimo(ctx, 1510, 470, 1.7, 'rosa', en(e, 2, 0.8, 1), T);
    rotulo(ctx, 850, 760, 'Blanca', '*P. djamor* var. *djamor*', en(e, 2, 0.7, 0.6), { c: MIC, s: 42 }); rotulo(ctx, 1360, 760, 'Rosa', '*P. djamor* var. *roseus*', en(e, 2, 0.7, 1.6), { c: ROSA, s: 42 });
    chip(ctx, 'LA MISMA ESPECIE', 1260, 230, { al: 'center', c: CB, s: 24, a: en(e, 2, 0.7, 2.4) }); }
};
LUZ.h56 = (ctx, e) => {
  noche(ctx, '#0a1410', '#050a08'); const t = e.tl, a1 = en(e, 1, 0.8), a2 = en(e, 2, 0.8), d0 = 1 - a1;
  // desdicariotización: de cada dicarión salen sus dos componentes monocarióticos
  const sep = ss(t, 2.2, 4.6); [[330, '#dfeaff', CA, CB, 'BLANCA'], [600, '#ffd9e4', CV, VIO, 'ROSA']].forEach(([y, , c1, c2, n], i) => { const a = ss(t, 0.2 + i * 0.5, 1 + i * 0.5) * d0;
    ctx.save(); ctx.globalAlpha = a * (1 - sep); dicarion(ctx, 180, 800, y, 70, 1, { celdas: 3, c1, c2 }); ctx.restore();
    if (sep > 0) { ctx.save(); ctx.globalAlpha = a * sep; const dy = 56 * sep; [[c1, -dy], [c2, dy]].forEach(([c, d]) => { hifa(ctx, [[1000, y + d], [1620, y + d]], 54, 1, { septos: [0.33, 0.66] }); [1100, 1310, 1520].forEach((x) => nucleo(ctx, x, y + d, 13, c)); }); ctx.restore(); flecha(ctx, 830, y, 960, y, sep * a, MIC, 4); }
    txt(ctx, n, 180, y - 70, { s: 20, f: 'mono', w: 700, ls: 6, c: i ? ROSA : MIC, a }); });
  chip(ctx, 'MÉTODO QUÍMICO · SIN ESPORAS', 180, 180, { c: CB, s: 22, a: ss(t, 0.6, 1.4) * d0 }); txt(ctx, 'DE CADA DICARIÓN, SUS DOS MONOCARIONES', 1310, 190, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: GRIS, a: sep * d0 });
  if (d0 > 0.02) chip(ctx, 'ESQUEMA', 60, 860, { c: '#8fa0bd', s: 16, a: 0.8 * d0 });
  // 56 híbridas
  if (a1 > 0) { const n = Math.round(56 * eo(t, e.L(1) + 0.3, e.L(1) + 3.6)), gx = 150, gy = 190, c = 86, sel = 37;
    for (let i = 0; i < 56; i++) { if (i >= n) break; const x = gx + (i % 8) * c + c / 2, y = gy + Math.floor(i / 8) * c + c / 2, es = i === sel ? a2 : 0; placa(ctx, x, y, 36, a1 * (1 - 0.6 * a2 * (i === sel ? 0 : 1))); colonia(ctx, 'h' + (i % 6), x, y, 30, 0.7 + 0.25 * ((i * 7) % 5) / 4 + 0.05 * es, { seed: 80 + (i % 6), a: a1 * (1 - 0.6 * a2 * (i === sel ? 0 : 1)), c: i % 3 ? '#F9E3E9' : MIC }); if (es > 0) { halo(ctx, x, y, 90, CV, 0.5 * es); ctx.save(); ctx.globalAlpha = es; ctx.strokeStyle = CV; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, 42, 0, TAU); ctx.stroke(); ctx.restore(); } }
    txt(ctx, String(n), 940, 420, { s: 220, f: 'serif', w: 500, c: CB, a: a1 * (1 - a2) }); txt(ctx, 'CEPAS HÍBRIDAS', 950, 480, { s: 26, f: 'mono', w: 700, ls: 8, c: MIC, a: a1 * (1 - a2) }); }
  if (a2 > 0) { const B = [['HÍBRIDO', 1059, CV], ['PADRE BLANCO', 986, MIC], ['PADRE ROSA', 504, ROSA]], k = eo(t, e.L(2) + 0.8, e.L(2) + 4.5);
    txt(ctx, 'CRECIMIENTO DEL MICELIO EN CAJA', 900, 230, { s: 20, f: 'mono', w: 700, ls: 4, c: GRIS, a: a2 }); txt(ctx, 'mm² POR DÍA', 900, 262, { s: 20, f: 'mono', w: 700, ls: 4, c: GRIS, a: a2 });
    B.forEach(([n, v, c], i) => { const y = 330 + i * 110; txt(ctx, n, 900, y, { s: 22, f: 'mono', w: 700, ls: 4, c, a: a2 }); caja(ctx, 900, y + 14, Math.max(30, 520 * v / 1059 * k), 36, c, a2, 18); txt(ctx, String(Math.round(v * k)).replace(/(\d)(\d{3})$/, '$1 $2'), 900 + 520 * v / 1059 * k + 20, y + 44, { s: 40, f: 'serif', w: 500, c, a: a2 }); });
    txt(ctx, 'GUADARRAMA-MENDOZA Y COLS., 2014', 900, 690, { s: 18, f: 'mono', w: 700, ls: 3, c: GRIS, a: en(e, 2, 0.6, 2) }); }
};
LUZ.multi = (ctx, e) => {
  noche(ctx, '#0a1410', '#050a08'); const t = e.tl, x = 520, y = 480, r = 330, g = eo(t, 0.8, 9);
  placa(ctx, x, y, r); const R = rng(15); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r * 0.94, 0, TAU); ctx.clip();
  for (let i = 0; i < 38; i++) { const an = R() * TAU, d = Math.sqrt(R()) * 250, px = x + Math.cos(an) * d, py = y + Math.sin(an) * d; disco(ctx, px, py, 3, '#f8dfe2', ss(t, 0.2 + i * 0.02, 0.6 + i * 0.02)); if (i < 16) colonia(ctx, 'mu' + (i % 5), px, py, 80, g, { seed: 90 + (i % 5), a: 0.8 }); }
  disco(ctx, x, y, 300, MIC, 0.16 * ss(t, 5, 10)); ctx.restore();
  titulo(ctx, 'Cultivo multiespórico', 1290, 220, ss(t, 3.6, 4.4), { s: 66 }); txt(ctx, 'MUCHAS ESPORAS JUNTAS EN LA MISMA CAJA', 1290, 270, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: GRIS, a: ss(t, 4.2, 5) });
  const a1 = en(e, 1, 0.8); for (let i = 0; i < 4; i++) { const yy = 360 + i * 92, ap = en(e, 1, 0.6, 0.4 + i * 0.7), ok = i === 2, par = [[0, 1], [1, 1], [0, 3], [2, 0]][i];
    ficha(ctx, 1080, yy, par[0], ap, 0.9); txt(ctx, '×', 1180, yy + 12, { s: 40, f: 'serif', al: 'center', a: ap }); ficha(ctx, 1280, yy, par[1], ap, 0.9); if (ok) palomita(ctx, 1420, yy, 44, en(e, 1, 0.5, 1 + i * 0.7)); else equis(ctx, 1420, yy, 40, en(e, 1, 0.5, 1 + i * 0.7));
    if (ok) txt(ctx, 'DICARIÓN', 1470, yy + 9, { s: 20, f: 'mono', w: 700, ls: 4, c: CV, a: en(e, 1, 0.5, 1.4 + i * 0.7) }); }
  txt(ctx, 'ENTRE HERMANOS: 1 DE CADA 4 PAREJAS', 1290, 750, { s: 22, f: 'mono', w: 700, ls: 4, al: 'center', c: CB, a: en(e, 1, 0.6, 4) });
  chip(ctx, 'NO SE ELIGE A LOS PADRES', 1290, 820, { al: 'center', c: ROJO, s: 22, a: en(e, 2, 0.7) }); esquema(ctx, 1);
};

/* ====== 07 · ¿Para qué cruzar hongos? ====== */
function icono(ctx, cual, x, y, a, T) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  if (cual === 0) { ctx.strokeStyle = CV; ctx.lineWidth = 8; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-40 + i * 30, 30); ctx.lineTo(-10 + i * 30, 0); ctx.lineTo(-40 + i * 30, -30); ctx.stroke(); } }
  else if (cual === 1) { ctx.restore(); termometro(ctx, x, y + 26, 70, 0.8, '#FF7A4A', a); return; }
  else if (cual === 2) { ctx.strokeStyle = CA; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(0, -44); ctx.lineTo(38, -28); ctx.quadraticCurveTo(38, 26, 0, 46); ctx.quadraticCurveTo(-38, 26, -38, -28); ctx.closePath(); ctx.stroke(); }
  else { for (let i = 0; i < 7; i++) disco(ctx, -30 + (i % 4) * 20, -14 + Math.floor(i / 4) * 26, 5, '#f8dfe2'); ctx.strokeStyle = ROJO; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-44, 40); ctx.lineTo(44, -40); ctx.stroke(); }
  ctx.restore(); }
LUZ.u1 = (ctx, e) => {
  noche(ctx, '#17120a', '#090705'); const t = e.tl, T = e.T, a2 = en(e, 2, 0.8), d1 = 1 - a2;
  titulo(ctx, '¿Para qué?', 800, 330, ss(t, 0.2, 1) * d1, { s: 130, c: CB });
  ['CRECER MÁS RÁPIDO', 'AGUANTAR CALOR', 'RESISTIR ENFERMEDADES', 'NO SOLTAR ESPORAS'].forEach((s, i) => { const a = en(e, 1, 0.6, 0.2 + i * 0.85) * d1, x = 280 + i * 400; icono(ctx, i, x, 540, a, T); txt(ctx, s, x, 660, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: MIC, a }); });
  txt(ctx, 'EJEMPLOS DOCUMENTADOS, A CONTINUACIÓN', 960, 760, { s: 18, f: 'mono', w: 700, ls: 4, al: 'center', c: GRIS, a: en(e, 1, 0.6, 3.4) * d1 });
  if (a2 > 0) { const a4 = en(e, 4, 0.8), sube = eo(t, e.L(4), e.L(4) + 1.2);
    txt(ctx, '1980', 140, 280, { s: 150, f: 'serif', w: 500, c: CB, a: a2 }); txt(ctx, 'PRIMEROS CHAMPIÑONES BLANCOS HÍBRIDOS', 150, 330, { s: 22, f: 'mono', w: 700, ls: 4, c: MIC, a: a2 });
    // dos cultivares padres → híbrido
    const yy = mixn(560, 470, sube); champi(ctx, 760, yy, 1.1, 0, a2 * (1 - 0.5 * a4)); champi(ctx, 1160, yy, 1.1, 0.16, a2 * (1 - 0.5 * a4)); txt(ctx, '×', 960, yy - 20, { s: 80, f: 'serif', al: 'center', a: a2 * (1 - a4) });
    txt(ctx, 'DOS CULTIVARES DISTINTOS', 960, yy + 90, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: GRIS, a: a2 * (1 - en(e, 3, 0.5)) });
    const a3 = en(e, 3, 0.8); if (a3 > 0) { const hx = 960, hy = mixn(600, 470, sube); halo(ctx, hx, hy - 40, 260, CB, 0.3 * a3); champi(ctx, hx, hy, 1.7, 0.03, a3); rotulo(ctx, 1150, mixn(540, 330, sube), 'Horst U1', 'VARIEDAD BLANCA PRINCIPAL EN MUCHOS PAÍSES', a3, { c: CB, s: 60 }); }
    if (a4 > 0) { for (let i = 0; i < 9; i++) { const x = 240 + i * 180, ap = en(e, 4, 0.5, 1 + i * 0.3); linea(ctx, 960, 540, x, 650, 'rgba(244,194,90,.5)', 2, ap); for (let k = 0; k < 4; k++) disco(ctx, mixn(960, x, (k + 1) / 5), mixn(540, 650, (k + 1) / 5), 3, '#f8dfe2', ap); champi(ctx, x, 740, 0.72, 0.03 + (i % 3) * 0.02, ap); }
      txt(ctx, 'IDÉNTICAS O MUY PARECIDAS · VENÍAN DE ESPORAS DE LOS PRIMEROS HÍBRIDOS', 960, 850, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: CB, a: en(e, 4, 0.6, 3.6) }); } }
};
LUZ.wageningen = (ctx, e) => {
  noche(ctx, '#17120a', '#090705'); const t = e.tl, T = e.T, a1 = en(e, 1, 0.9), d = 1 - a1;
  estudio(ctx, 150, 170, '2017', 'Universidad de Wageningen', 'PAÍSES BAJOS · REVISIÓN SOBRE EL CHAMPIÑÓN', ss(t, 0.2, 1) * d, CB, 900);
  ['«La cruza de verdad casi no se ha', 'hecho en las últimas décadas».'].forEach((s, i) => rico(ctx, s, 160, 450 + i * 84, { s: 68, f: 'serif', it: true, w: 400, a: ss(t, 3 + i * 1.2, 4 + i * 1.2) * d }));
  txt(ctx, 'SONNENBERG Y COLS., 2017 · TRADUCCIÓN', 164, 600, { s: 18, f: 'mono', w: 700, ls: 3, c: GRIS, a: ss(t, 5.6, 6.4) * d });
  // décadas casi vacías
  const ad = ss(t, 6.4, 7.2) * d; linea(ctx, 160, 760, 1500, 760, GRIS, 3, ad); [1980, 1990, 2000, 2010, 2017].forEach((y, i) => { const x = 160 + (y - 1980) / 37 * 1340; linea(ctx, x, 748, x, 772, GRIS, 3, ad); txt(ctx, String(y), x, 812, { s: 22, f: 'mono', w: 700, al: 'center', c: i === 0 ? CB : GRIS, a: ad }); });
  champi(ctx, 160, 730, 0.5, 0, ad); champi(ctx, 1500, 730, 0.5, 0, ss(t, 8.4, 9.2) * d); txt(ctx, 'CASI LA MISMA GENÉTICA', 830, 720, { s: 20, f: 'mono', w: 700, ls: 5, al: 'center', c: CB, a: ss(t, 8.8, 9.6) * d });
  if (a1 > 0) { const cx = 960, cy = 480; champi(ctx, cx, cy + 60, 2.3, 1, a1); const esc = en(e, 1, 0.8, 1.2);
    ctx.save(); ctx.globalAlpha = esc; ctx.strokeStyle = CA; ctx.lineWidth = 6; ctx.setLineDash([18, 12]); ctx.lineDashOffset = -T * 30; ctx.beginPath(); ctx.arc(cx, cy, 250, 0, TAU); ctx.stroke(); ctx.restore(); halo(ctx, cx, cy, 420, CA, 0.12 * esc);
    // la mancha bacteriana y el hongo parásito rebotan
    const u = (T * 0.35) % 1, rb = 250 + 190 * Math.abs(1 - 2 * u); for (let i = 0; i < 5; i++) { const an = 2.6 + i * 0.22; ctx.save(); ctx.translate(cx + Math.cos(an) * rb, cy + Math.sin(an) * rb); ctx.rotate(an + i); ctx.fillStyle = rgba('#b9824a', 0.9 * esc); ctx.beginPath(); ctx.roundRect(-13, -6, 26, 12, 6); ctx.fill(); ctx.restore(); }
    for (let i = 0; i < 5; i++) { const an = 0.2 + i * 0.2; halo(ctx, cx + Math.cos(an) * rb, cy + Math.sin(an) * rb, 26, '#d9d9e8', 0.8 * esc); disco(ctx, cx + Math.cos(an) * rb, cy + Math.sin(an) * rb, 6, '#e9e9f5', esc); }
    rotulo(ctx, 150, 330, 'Mancha bacteriana', 'ENFERMEDAD POR BACTERIAS', en(e, 1, 0.7, 3), { c: '#d9a066', s: 42 }); rotulo(ctx, 1330, 330, '*Lecanicillium fungicola*', 'UN HONGO PARÁSITO', en(e, 1, 0.7, 5), { c: '#d9d9e8', s: 42 });
    chip(ctx, 'RESISTENCIA ENCONTRADA EN CHAMPIÑONES SILVESTRES', 960, 830, { al: 'center', c: CA, s: 22, a: en(e, 1, 0.7, 7) }); chip(ctx, 'ESQUEMA', 60, 860, { c: '#8fa0bd', s: 16, a: 0.8 * a1 }); }
};
function pulmones(ctx, x, y, s, rojo, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const c = mixc('#d99aa6', '#ff5a4a', rojo); ctx.strokeStyle = '#e9d6da'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, -150); ctx.lineTo(0, -70); ctx.moveTo(0, -70); ctx.lineTo(-40, -30); ctx.moveTo(0, -70); ctx.lineTo(40, -30); ctx.stroke();
  for (const d of [-1, 1]) { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(d * 20, -60); ctx.bezierCurveTo(d * 110, -120, d * 150, 20, d * 130, 110); ctx.bezierCurveTo(d * 90, 140, d * 30, 110, d * 22, 60); ctx.closePath(); ctx.fill(); } ctx.restore(); if (rojo > 0.05) halo(ctx, x, y, 220 * s, '#ff5a4a', 0.3 * rojo * a); }
LUZ.sinesporas = (ctx, e) => {
  noche(ctx, '#17120a', '#090705'); const t = e.tl, T = e.T, a1 = en(e, 1, 0.9);
  tronco(ctx, 100, 560, 620, 130, 0.3, 14); racimo(ctx, 400, 510, 2.0, 'gris', 1, T); chip(ctx, 'ESQUEMA', 60, 860, { c: '#8fa0bd', s: 16, a: 0.8 });
  rotulo(ctx, 150, 250, 'Seta ostra', '*Pleurotus ostreatus*', ss(t, 0.3, 1.1), { c: MIC });
  // nube de esporas hacia quien cosecha
  const nube = ss(t, 0.8, 3) * (1 - a1); if (nube > 0) { const R = rng(3); for (let i = 0; i < 220; i++) { const u = (R() + T * (0.04 + R() * 0.05)) % 1, px = 480 + u * 880, py = 480 + (R() - 0.5) * (120 + 220 * u) + Math.sin(T + i) * 8; disco(ctx, px, py, 1.6 + R() * 1.8, '#efe9dc', nube * (0.3 + 0.5 * (1 - u))); } }
  pulmones(ctx, 1420, 520, 1.3, ss(t, 3.2, 7) * (1 - a1), 1 - 0.75 * a1);
  txt(ctx, 'QUIEN COSECHA LAS RESPIRA', 1420, 250, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: GRIS, a: ss(t, 2.4, 3.2) * (1 - a1) });
  chip(ctx, 'INFLAMACIÓN DE LOS ALVÉOLOS POR INHALAR ESPORAS', 1250, 790, { al: 'center', c: ROJO, s: 20, a: ss(t, 4.6, 5.4) * (1 - a1) });
  if (a1 > 0) { estudio(ctx, 880, 260, '2006', 'Variedad sin esporas', 'LLEGÓ AL MERCADO', a1, CV, 760); chip(ctx, 'CRUZAS A PARTIR DE UNA MUTACIÓN NATURAL', 890, 480, { c: CV, s: 22, a: en(e, 1, 0.7, 2.4) });
    for (let i = 0; i < 6; i++) disco(ctx, 420 + i * 30, 640 + (i % 2) * 14, 4, '#efe9dc', 0.5 * a1); tache(ctx, 495, 650, 70, en(e, 1, 0.6, 1.4)); txt(ctx, 'SIN ESPORAS', 495, 770, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: CV, a: en(e, 1, 0.6, 1.8) }); }
};
// Shiitake (Lentinula edodes), esquema: sombrero convexo café con escamitas claras hacia la orilla, láminas blancas, pie fibroso.
function shiitake(ctx, x, y, s, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#d9c7a8'; ctx.beginPath(); ctx.moveTo(-20, -10); ctx.quadraticCurveTo(-26, 60, -12, 120); ctx.lineTo(18, 120); ctx.quadraticCurveTo(26, 60, 20, -10); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#f1e9d8'; ctx.beginPath(); ctx.ellipse(0, -8, 108, 16, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#cdbf9f'; ctx.lineWidth = 1.5; ctx.beginPath(); for (let i = -12; i <= 12; i++) { ctx.moveTo(i * 2, -2); ctx.lineTo(i * 8.6, -8 + (1 - Math.abs(i) / 12) * 13); } ctx.stroke();
  const g = ctx.createLinearGradient(0, -100, 0, 0); g.addColorStop(0, '#8a5a34'); g.addColorStop(1, '#5c3a20'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-112, -8); ctx.bezierCurveTo(-110, -100, 110, -100, 112, -8); ctx.quadraticCurveTo(0, -22, -112, -8); ctx.fill();
  const R = rng(5); ctx.fillStyle = 'rgba(240,226,200,.8)'; for (let i = 0; i < 26; i++) { const an = Math.PI + R() * Math.PI, d = 0.72 + R() * 0.24; ctx.beginPath(); ctx.ellipse(Math.cos(an) * 104 * d, -10 + Math.sin(an) * 62 * d, 4 + R() * 3, 2.5, an, 0, TAU); ctx.fill(); }
  ctx.restore(); }
LUZ.shiitake = (ctx, e) => {
  noche(ctx, '#17120a', '#090705'); const t = e.tl, k = eo(t, 1.5, 7);
  shiitake(ctx, 380, 520, 2.0, ss(t, 0.1, 0.8)); shiitake(ctx, 640, 600, 1.2, ss(t, 0.4, 1.1)); halo(ctx, 480, 440, 520, '#FF7A4A', 0.14 * k);
  rotulo(ctx, 150, 220, 'Shiitake', '*Lentinula edodes*', ss(t, 0.4, 1.2), { c: CB }); chip(ctx, 'ESQUEMA', 60, 860, { c: '#8fa0bd', s: 16, a: 0.8 });
  termometro(ctx, 900, 700, 380, 0.3 + 0.6 * k, mixc('#F4C25A', '#FF5A3A', k), ss(t, 1, 1.8)); txt(ctx, 'MÁS CALOR', 900, 790, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: '#FF7A4A', a: ss(t, 1.4, 2.2) });
  estudio(ctx, 1080, 190, '2024', 'Equipo de Corea del Sur', 'GENOMA DEL SHIITAKE', ss(t, 2.4, 3.2), CB, 720);
  // cromosoma con un bloque resaltado
  const a = ss(t, 4, 4.8); caja(ctx, 1090, 470, 700, 46, 'rgba(200,214,240,.22)', a, 23, 'rgba(200,214,240,.6)'); caja(ctx, 1500, 470, 110, 46, CB, a * ss(t, 5, 5.8), 8); halo(ctx, 1555, 493, 130, CB, 0.5 * ss(t, 5, 5.8));
  txt(ctx, 'CROMOSOMA 9', 1090, 440, { s: 20, f: 'mono', w: 700, ls: 4, c: GRIS, a }); guia(ctx, 1555, 530, 1555, 600, ss(t, 5.4, 6), CB);
  txt(ctx, 'BLOQUE DE ADN LIGADO A', 1555, 640, { s: 22, f: 'mono', w: 700, ls: 4, al: 'center', c: CB, a: ss(t, 5.6, 6.4) }); txt(ctx, 'FORMAR SETAS CON MÁS CALOR', 1555, 676, { s: 22, f: 'mono', w: 700, ls: 4, al: 'center', c: CB, a: ss(t, 5.6, 6.4) });
};

/* ====== 08 · Más allá de la cruza ====== */
// Hongo oreja (Auricularia), esquema: cuerpo gelatinoso café en forma de oreja, con pliegues.
function oreja(ctx, x, y, s, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const g = ctx.createRadialGradient(-10, -20, 10, 0, 0, 120); g.addColorStop(0, '#8a5236'); g.addColorStop(1, '#3d2014'); ctx.fillStyle = g;
  ctx.beginPath(); ctx.moveTo(-20, 80); ctx.bezierCurveTo(-130, 50, -120, -90, -20, -100); ctx.bezierCurveTo(90, -110, 130, 0, 80, 60); ctx.bezierCurveTo(50, 90, 10, 60, -20, 80); ctx.fill();
  ctx.strokeStyle = 'rgba(30,14,8,.55)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-10, 60); ctx.bezierCurveTo(-80, 30, -70, -50, -10, -62); ctx.moveTo(0, 40); ctx.bezierCurveTo(-36, 10, -20, -30, 30, -36); ctx.moveTo(30, 44); ctx.quadraticCurveTo(70, 20, 70, -20); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,220,190,.25)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-90, -40); ctx.quadraticCurveTo(-70, -84, -24, -90); ctx.stroke(); ctx.restore(); }
LUZ.protoplastos = (ctx, e) => {
  noche(ctx, '#120c1c', '#07050c'); fondoMicelio(ctx, 13, 0.08); const t = e.tl, T = e.T, L1 = e.L(1), dig = ss(t, L1 + 0.4, L1 + 3), fus = ss(t, L1 + 3.6, L1 + 6), a2 = en(e, 2, 0.9), d = 1 - 0.75 * a2;
  ctx.save(); ctx.globalAlpha = d;
  [[400, CA], [1040, CB]].forEach(([x0, c], i) => { const cx = mixn(x0, i ? 830 : 610, fus), y = 470;
    // la célula: de cilindro con pared a esfera sin pared
    const w = mixn(340, 220, dig), h = mixn(140, 220, dig); ctx.save(); ctx.globalAlpha *= 1 - ss(fus, 0.75, 1); ctx.fillStyle = '#1a1430'; ctx.strokeStyle = rgba('#e8eef6', 0.86 * (1 - dig) + 0.35 * dig); ctx.lineWidth = mixn(11, 2.5, dig); ctx.beginPath(); ctx.roundRect(cx - w / 2, y - h / 2, w, h, mixn(36, 110, dig)); ctx.fill(); ctx.stroke(); ctx.restore(); nucleo(ctx, cx, y, 28, c, 1 - ss(fus, 0.75, 1));
    // enzimas que digieren la pared
    if (dig > 0 && dig < 1) for (let k = 0; k < 10; k++) { const an = k * 0.63 + T * 0.8; disco(ctx, cx + Math.cos(an) * (w / 2 + 14), y + Math.sin(an) * (h / 2 + 14), 6, VIO, 0.9 * (1 - Math.abs(dig * 2 - 1) * 0.3)); } });
  if (fus > 0.75) { const k = ss(fus, 0.75, 1); ctx.save(); ctx.globalAlpha *= k; ctx.fillStyle = '#1a1430'; ctx.strokeStyle = 'rgba(232,238,246,.35)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.ellipse(720, 470, 200, 140, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); nucleo(ctx, 670, 458, 28, CA, k); nucleo(ctx, 772, 484, 28, CB, k); halo(ctx, 720, 470, 320, VIO, 0.3 * k); }
  ctx.restore();
  chip(ctx, 'CÉLULAS CON PARED', 720, 250, { al: 'center', c: MIC, s: 22, a: ss(t, 0.3, 1) * (1 - en(e, 1, 0.5)) });
  chip(ctx, 'ENZIMAS QUITAN LA PARED', 720, 250, { al: 'center', c: VIO, s: 22, a: ss(t, L1 + 0.2, L1 + 0.9) * (1 - ss(t, L1 + 3, L1 + 3.5)) });
  chip(ctx, 'PROTOPLASTOS QUE SE FUSIONAN', 720, 250, { al: 'center', c: CB, s: 22, a: ss(t, L1 + 3.5, L1 + 4.2) * (1 - a2) });
  txt(ctx, 'FUSIÓN CON POLIETILENGLICOL', 720, 730, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: GRIS, a: ss(t, L1 + 4.6, L1 + 5.4) * (1 - a2) });
  if (a2 > 0) { oreja(ctx, 1380, 500, 1.6, a2); oreja(ctx, 1600, 580, 0.9, en(e, 2, 0.7, 0.5)); estudio(ctx, 1040, 170, '2026', 'China', 'MEJORA POR FUSIÓN DE PROTOPLASTOS', a2, VIO, 760); rotulo(ctx, 1100, 800, 'Hongo oreja', '*Auricularia heimuer*', en(e, 2, 0.7, 1), { c: VIO, s: 44 }); }
  esquema(ctx, 1);
};
function tijeras(ctx, x, y, s, rot, c = VIO, a = 1, abre = 0.4) { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.strokeStyle = c; ctx.lineWidth = 7; ctx.lineCap = 'round'; for (const d of [-1, 1]) { ctx.save(); ctx.rotate(d * abre * 0.5); ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(60, 0); ctx.stroke(); ctx.beginPath(); ctx.arc(-26, d * 4, 15, 0, TAU); ctx.stroke(); ctx.restore(); } ctx.restore(); }
function adn(ctx, x, y, w, T, a = 1, c = 'rgba(200,214,240,.7)') { if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.strokeStyle = c; for (const d of [0, Math.PI]) { ctx.beginPath(); for (let i = 0; i <= 60; i++) { const px = x + i * w / 60, py = y + Math.sin(i * 0.36 + d + T * 0.6) * 22; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.lineWidth = 2; ctx.beginPath(); for (let i = 2; i < 60; i += 3) { const px = x + i * w / 60, s = Math.sin(i * 0.36 + T * 0.6) * 22; ctx.moveTo(px, y + s); ctx.lineTo(px, y - s); } ctx.stroke(); ctx.restore(); }
LUZ.crispr = (ctx, e) => {
  noche(ctx, '#120c1c', '#07050c'); const t = e.tl, T = e.T, a1 = en(e, 1, 0.8), a2 = en(e, 2, 0.8), a3 = en(e, 3, 0.9), d0 = 1 - a1;
  txt(ctx, 'CRISPR', 960, 340, { s: 200, f: 'serif', w: 500, al: 'center', c: VIO, a: ss(t, 0.1, 0.9) * d0 });
  chip(ctx, 'REPETICIONES PALINDRÓMICAS CORTAS, AGRUPADAS Y REGULARMENTE ESPACIADAS', 960, 420, { al: 'center', c: GRIS, s: 18, a: ss(t, 0.8, 1.6) * d0 });
  adn(ctx, 460, 620, 1000, T, ss(t, 1.2, 2) * d0); tijeras(ctx, 960, 560, 1.6, Math.PI / 2, VIO, ss(t, 1.8, 2.4) * d0, 0.5 + 0.4 * Math.sin(T * 4)); txt(ctx, 'UNA HERRAMIENTA PARA EDITAR GENES', 960, 760, { s: 22, f: 'mono', w: 700, ls: 5, al: 'center', c: MIC, a: ss(t, 2.2, 3) * d0 });
  if (a1 > 0) { const d3 = 1 - a3; adn(ctx, 800, 520, 900, T, a1 * (1 - a2)); tijeras(ctx, 1250, 460, 1.4, Math.PI / 2, VIO, a1 * (1 - a2), 0.5 + 0.4 * Math.sin(T * 4)); txt(ctx, 'EDICIÓN DE UN GEN DEL CHAMPIÑÓN', 1250, 640, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: GRIS, a: a1 * (1 - a2) }); rotulo(ctx, 150, 220, 'Yinong Yang', 'PENN STATE · CHAMPIÑÓN BLANCO', a1 * d3, { c: VIO });
    champi(ctx, 400, 600, 2.2, 0, a1 * d3 * (1 - a2 * 0.0), 0.75 * eo(t, e.L(2) + 5, e.L(2) + 9)); txt(ctx, 'EDITADO: SE OSCURECE MENOS', 400, 730, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: CV, a: en(e, 2, 0.6, 5.4) * d3 });
    // seis genes de la enzima; uno se apaga
    const off = ss(t, e.L(2) + 1.6, e.L(2) + 2.6); txt(ctx, 'SEIS GENES DE LA ENZIMA QUE LO OSCURECE', 760, 330, { s: 20, f: 'mono', w: 700, ls: 3, c: GRIS, a: a2 * d3 });
    for (let i = 0; i < 6; i++) { const x = 800 + i * 150, on = i === 3 ? 1 - off : 1, ap = a2 * d3 * ss(t, e.L(2) + i * 0.12, e.L(2) + 0.5 + i * 0.12); caja(ctx, x - 50, 370, 100, 50, mixc('#2a2438', '#3f8f5c', on), ap, 25, 'rgba(255,255,255,.3)'); disco(ctx, x - 25 + 50 * on, 395, 19, MIC, ap); if (i === 3) txt(ctx, 'APAGADO', x, 462, { s: 18, f: 'mono', w: 700, ls: 3, al: 'center', c: ROJO, a: off * ap }); }
    const bar = 100 - 30 * eo(t, e.L(2) + 3, e.L(2) + 5.4); txt(ctx, 'ACTIVIDAD DE LA ENZIMA', 760, 560, { s: 20, f: 'mono', w: 700, ls: 3, c: GRIS, a: en(e, 2, 0.6, 2.6) * d3 }); caja(ctx, 760, 584, 800, 40, 'rgba(255,255,255,.07)', en(e, 2, 0.6, 2.6) * d3, 20); caja(ctx, 760, 584, 8 * bar, 40, CB, en(e, 2, 0.6, 2.6) * d3, 20);
    txt(ctx, '−30 %', 760, 740, { s: 110, f: 'serif', w: 500, c: CB, a: en(e, 2, 0.6, 4.6) * d3 }); txt(ctx, 'NO ES «NUNCA SE OSCURECE»', 1100, 730, { s: 20, f: 'mono', w: 700, ls: 3, c: GRIS, a: en(e, 2, 0.6, 6) * d3 }); }
  if (a3 > 0) { documento(ctx, 500, 500, 1.2, a3, 9, pr(t, e.L(3) + 0.4, e.L(3) + 4)); txt(ctx, 'ABRIL DE 2016', 860, 280, { s: 26, f: 'mono', w: 700, ls: 8, c: CB, a: a3 });
    ['Departamento de Agricultura', 'de Estados Unidos'].forEach((s, i) => txt(ctx, s, 860, 350 + i * 64, { s: 56, f: 'serif', w: 500, a: en(e, 3, 0.7, 0.6) }));
    chip(ctx, 'NO LLEVA ADN AJENO DE VIRUS NI DE BACTERIAS', 870, 520, { c: MIC, s: 22, a: en(e, 3, 0.7, 4.4) }); chip(ctx, 'RESPUESTA: NO SE REGULA', 870, 600, { c: CV, s: 22, a: en(e, 3, 0.7, 6.4) });
    sello(ctx, 'LUZ VERDE', 1300, 740, en(e, 4, 0.5, 0.4), CV, -0.06, 66); txt(ctx, 'PRIMER ORGANISMO EDITADO CON CRISPR QUE LA RECIBE', 870, 850, { s: 20, f: 'mono', w: 700, ls: 3, c: GRIS, a: en(e, 4, 0.6, 1.6) }); }
};
LUZ.kioto = (ctx, e) => {
  noche(ctx, '#120c1c', '#07050c'); const t = e.tl, T = e.T, a1 = en(e, 1, 0.9), d0 = 1 - a1, y = 480, w = 110;
  estudio(ctx, 150, 180, '2024', 'Universidad de Kioto', 'EDICIÓN SIN ADN AJENO', ss(t, 0.2, 1) * d0, VIO, 760); if (d0 > 0.01) { ctx.save(); ctx.globalAlpha = d0; tronco(ctx, 480, 640, 620, 120, 0.3, 18); racimo(ctx, 780, 590, 1.9, 'gris', ss(t, 0.6, 1.4), T); ctx.restore(); }
  rotulo(ctx, 160, 480, 'Seta ostra', '*Pleurotus ostreatus*', ss(t, 1.4, 2.2) * d0, { c: MIC });
  if (a1 > 0) { const L2 = e.L(2), L3 = e.L(3), une = ss(t, e.L(1) + 2.6, e.L(1) + 4.6), salta = ss(t, L2 + 0.6, L2 + 2.6), corta = ss(t, L2 + 2.8, L2 + 4.2), sepa = ss(t, L3 + 0.4, L3 + 2.8), a4 = en(e, 4, 0.8);
    ctx.save(); ctx.globalAlpha = a1;
    if (sepa < 1) { // dos monocariones que se acercan y forman una célula con dos núcleos
      const gap = (1 - une) * 190; ctx.save(); ctx.globalAlpha = a1 * (1 - ss(sepa, 0, 0.35));
      if (une < 1) { hifa(ctx, [[250, y], [900 - gap, y]], w, 1); hifa(ctx, [[1670, y], [1020 + gap, y]], w, 1); } else hifa(ctx, [[250, y], [1670, y]], w, 1); ctx.restore(); }
    const ax = mixn(mixn(640, 820, une), 560, sepa), bx = mixn(mixn(1280, 1100, une), 1360, sepa), ay = mixn(y, 360, sepa), by = mixn(y, 600, sepa);
    if (sepa > 0) { ctx.save(); ctx.globalAlpha = a1 * ss(sepa, 0.3, 1); hifa(ctx, [[280, 360], [860, 360]], 90, 1, { a: 0.45 }); hifa(ctx, [[1040, 600], [1680, 600]], 90, 1); ctx.restore(); }
    nucleo(ctx, ax, ay, 24, CA, 1 - 0.55 * sepa); nucleo(ctx, bx, by, 24, CB);
    // la marca de edición en el núcleo dorado
    if (corta > 0) { ctx.save(); ctx.globalAlpha = a1 * corta; ctx.fillStyle = '#120c1c'; ctx.beginPath(); ctx.moveTo(bx, by - 26); ctx.lineTo(bx - 8, by - 6); ctx.lineTo(bx + 8, by - 6); ctx.closePath(); ctx.fill(); ctx.restore(); halo(ctx, bx, by - 14, 60, VIO, 0.7 * corta * (1 - sepa * 0.5)); }
    // la maquinaria de CRISPR: empieza junto al núcleo azul y pasa al vecino
    const tx = mixn(ax + 10, bx - 6, salta), ty = mixn(ay - 56, by - 54, salta) - Math.sin(salta * Math.PI) * 60; tijeras(ctx, tx, ty, 0.9, Math.PI / 2, VIO, 1 - ss(t, L3 + 0.2, L3 + 1), 0.3 + 0.5 * Math.abs(Math.sin(T * 5)) * (salta > 0.95 && corta < 1 ? 1 : 0.2));
    ctx.restore();
    txt(ctx, 'MONOCARIÓN CON LA MAQUINARIA DE CRISPR', 560, 300, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: VIO, a: a1 * (1 - une) }); txt(ctx, 'OTRO MONOCARIÓN', 1360, 300, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: CB, a: en(e, 1, 0.6, 1) * (1 - une) });
    chip(ctx, 'SE CRUZAN: UN DICARIÓN', 960, 250, { al: 'center', c: MIC, s: 22, a: une * (1 - en(e, 2, 0.5)) });
    chip(ctx, 'LA MAQUINARIA PASA AL NÚCLEO VECINO Y LO EDITA', 960, 250, { al: 'center', c: VIO, s: 22, a: en(e, 2, 0.6) * (1 - en(e, 3, 0.5)) });
    if (sepa > 0.3) { rotulo(ctx, 1060, 760, 'Monocarión editado', 'SIN ADN AJENO', en(e, 3, 0.7, 2.4), { c: CV, s: 50 }); txt(ctx, 'EL QUE LLEVABA LA MAQUINARIA SE DESCARTA', 570, 290, { s: 19, f: 'mono', w: 700, ls: 3, al: 'center', c: GRIS, a: en(e, 3, 0.7, 2.8) * 0.9 }); chip(ctx, 'SE SEPARAN LOS NÚCLEOS', 960, 190, { al: 'center', c: MIC, s: 22, a: en(e, 3, 0.6) * (1 - a4) }); }
    if (a4 > 0) titulo(ctx, 'El dicarión, usado como herramienta', 960, 200, a4, { s: 64, c: CB }); esquema(ctx, a1); }
};

/* ====== 09 · La bolsa, otra vez ====== */
LUZ.cierre = (ctx, e) => {
  // Regresa a la bolsa con la que abre el documental; ahora lleva su etiqueta de cepa y alrededor aparece lo aprendido.
  const t = e.tl, T = e.T, fin = escenaBolsa(ctx, e, 1, mixn(1.12, 1, eo(t, 0, 3))); fin();
  // etiqueta colgante
  const et = ss(t, 0.6, 1.6); ctx.save(); ctx.globalAlpha = et; ctx.translate(1150, 250); ctx.rotate(0.1 + Math.sin(T * 1.2) * 0.03); ctx.strokeStyle = '#c9b48a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-40, -44); ctx.lineTo(0, 0); ctx.stroke(); ctx.fillStyle = '#efe6d2'; ctx.beginPath(); ctx.roundRect(-10, 0, 190, 100, 10); ctx.fill(); ctx.fillStyle = '#1c130d'; ctx.beginPath(); ctx.arc(8, 16, 6, 0, TAU); ctx.fill(); ctx.restore();
  if (et > 0) { ctx.save(); ctx.translate(1150, 250); ctx.rotate(0.1); txt(ctx, 'CEPA', 36, 44, { s: 30, f: 'mono', w: 700, ls: 6, c: '#3a2a18', a: et, sombra: false }); txt(ctx, 'CÓDIGO · FECHA', 24, 78, { s: 14, f: 'mono', w: 700, ls: 2, c: '#7a6a50', a: et, sombra: false }); ctx.restore(); }
  const a1 = en(e, 1, 0.7) * (1 - en(e, 2, 0.5)); txt(ctx, 'LE DICEN', 110, 330, { s: 24, f: 'mono', w: 700, ls: 6, c: GRIS, a: a1 }); titulo(ctx, '«semilla de hongo»', 110, 400, a1, { s: 60, al: 'left' }); linea(ctx, 110, 384, 110 + 500 * en(e, 1, 0.8, 1.4), 384, ROJO, 5, a1 * (en(e, 1, 0.8, 1.4) > 0 ? 1 : 0));
  const a2 = en(e, 2, 0.8) * (1 - en(e, 3, 0.5)); titulo(ctx, 'una cepa', 380, 420, a2, { s: 120, c: CB });
  // lo aprendido, alrededor
  const a3 = en(e, 3, 0.8); if (a3 > 0) { abanico(ctx, 250, 330, 1.5, -0.1, 'rosa', 2, a3); flecha(ctx, 340, 320, 420, 320, en(e, 3, 0.5, 0.6), MIC, 3); placa(ctx, 510, 320, 76, en(e, 3, 0.6, 0.8)); colonia(ctx, 'ci', 510, 320, 66, eo(t, e.L(3) + 1, e.L(3) + 3.5) * 0.9, { seed: 4 }); txt(ctx, 'EL CLON DE UNA SETA', 380, 450, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: ROSA, a: a3 }); }
  const a4 = en(e, 4, 0.8); if (a4 > 0) { ctx.save(); ctx.globalAlpha = a4; dicarion(ctx, 1330, 1800, 300, 60, 1, { celdas: 2 }); ctx.restore(); txt(ctx, 'LA CRUZA DE DOS MONOCARIONES', 1570, 390, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: CA, a: a4 });
    const b = en(e, 4, 0.8, 2.4); ctx.save(); ctx.globalAlpha = b; dicarion(ctx, 1330, 1640, 540, 54, 1, { celdas: 1 }); hifa(ctx, [[1560, 640], [1800, 640]], 54, 1); hifa(ctx, [[1600, 540], [1600, 640]], 36, 1); ctx.restore(); nucleo(ctx, 1700, 640, 11, CV, b); const v = (T * 0.4) % 1, C = camino([[1560, 540], [1600, 560], [1600, 630], [1660, 640]]).at(v); nucleo(ctx, C.x, C.y, 11, CA, b);
    txt(ctx, 'O UN NÚCLEO DONADO', 1570, 730, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: CV, a: b }); }
  const a5 = en(e, 5, 0.8); if (a5 > 0) { lupa(ctx, 320, 660, 130, a5, (c) => { c.save(); c.scale(0.9, 0.9); dicarion(c, -220, 220, 14, 76, 1, { celdas: 2 }); c.restore(); }, {}); txt(ctx, 'FÍBULAS AL MICROSCOPIO', 300, 836, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: CB, a: a5 });
    const tb = en(e, 5, 0.8, 3); tubo(ctx, 620, 760, 70, 280, (c) => { c.fillStyle = 'rgba(150,205,240,.28)'; c.fillRect(580, 580, 80, 180); for (let j = 0; j < 4; j++) disco(c, 606 + (j % 2) * 26, 730 - j * 28, 8, MIC, 0.9); }, tb); txt(ctx, 'CEPARIO', 620, 836, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: '#9fd8f5', a: tb }); }
};
