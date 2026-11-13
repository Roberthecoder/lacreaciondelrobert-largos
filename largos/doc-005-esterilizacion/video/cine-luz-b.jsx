// cine-luz-b.jsx — Documental 005 (esterilización del sustrato), capítulos 4 a 8.
const { TAU, cl, pr, ss, eo, mixn, rng, rgba, mixc, LUZC, FU, halo, noche, polvo, cam, oscurece, txt, rico, chip, rotulo, guia, titulo, sello, tache, flecha, red, pintaRed, frasco, matraz, termometro } = window.LZK;
const { Lx, en, esquema, fte, C, calor, ganado, tempC, ALFA, mapaCalor, barraColor, mmss, vapor, manometro, olla, bolsaCorte, bolsa, granos, frascoGrano, esporita, bacilo, endospora, graf, ejes, curva, cronometro, palomita, particulas, particula, reloj7, escenaOlla, corteCil, botellaLab, tuboCultivo, erf, pot } = window.LZA;
const LUZ = window.LUZ;
const NCHFP = 'NCHFP (CENTRO NACIONAL DE CONSERVACIÓN CASERA DE ALIMENTOS, EE. UU.), USING PRESSURE CANNERS, 2025';
// Moléculas de aire (gris azulado) que flotan dentro de un rectángulo.
function aire(ctx, x, y, w, h, n, T, a = 1, seed = 5, sube = 0) { const R = rng(seed); for (let i = 0; i < n; i++) { const px = x + ((R() * w + Math.sin(T * (0.4 + R()) + i) * 18 + w) % w), py = y + ((R() * h + Math.cos(T * (0.3 + R()) + i * 2) * 14 - sube * (h + 200) * (0.5 + R()) + h * 4) % h), vis = sube > 0 ? cl(1 - sube * (0.6 + R())) : 1; ctx.fillStyle = `rgba(150,170,200,${0.85 * a * vis})`; ctx.beginPath(); ctx.arc(px, py, 5, 0, TAU); ctx.fill(); ctx.strokeStyle = `rgba(220,230,245,${0.5 * a * vis})`; ctx.lineWidth = 1; ctx.stroke(); } }

/* ====== 04 · El aire atrapado ====== */
LUZ.aire = (ctx, e) => {
  noche(ctx, '#0a0807', '#120d0a'); const T = e.T, a0 = ss(e.tl, 0.6, 1.8);
  ctx.fillStyle = '#0d0b0a'; ctx.fillRect(0, 838, 1920, 242);
  olla(ctx, 600, 800, 1.08, T, { rx: ss(e.tl, 0.2, 1.4), vaporIn: 0.7, vapor: 0.5, dentro: (c) => { bolsaCorte(c, 0, -170, 250, 210, 0.03, { seed: 4 }); aire(c, -200, -320, 400, 260, 70, T, a0, 9); } });
  guia(ctx, 440, 520, 200, 250, a0, '#aebdd6'); rotulo(ctx, 60, 190, 'Aire atrapado', 'NO SE VE, PERO OCUPA LUGAR', a0, { c: '#aebdd6', s: 44 });
  const a1 = en(e, 1, 0.8); manometro(ctx, 1190, 400, 130, 15 + 0.1 * Math.sin(T * 7), a1); txt(ctx, 'PRESIÓN', 1190, 590, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: C.gris, a: a1 }); txt(ctx, '15 psi', 1190, 650, { s: 56, f: 'serif', w: 500, al: 'center', a: a1 }); palomita(ctx, 1190, 700, 26, en(e, 1, 0.5, 0.8));
  const a1b = en(e, 1, 0.8, 2.6), niv = mixn(0.93, 0.74, en(e, 1, 2, 3)); termometro(ctx, 1600, 600, 330, niv, mixc('#e8352b', '#f58a2c', en(e, 1, 2, 3)), a1b);
  ctx.save(); ctx.globalAlpha = a1b; ctx.strokeStyle = C.verde; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.moveTo(1560, 600 - 316 * 0.93); ctx.lineTo(1680, 600 - 316 * 0.93); ctx.stroke(); ctx.restore(); txt(ctx, '121 °C', 1690, 600 - 316 * 0.93 + 8, { s: 22, f: 'mono', w: 700, c: C.verde, a: a1b });
  txt(ctx, 'TEMPERATURA REAL', 1600, 690, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: C.gris, a: a1b }); txt(ctx, 'menos de 121 °C', 1600, 750, { s: 50, f: 'serif', w: 500, al: 'center', c: '#ffb05a', a: en(e, 1, 0.8, 4) });
  txt(ctx, 'LA PRESIÓN LA SUMAN EL VAPOR Y EL AIRE; LA TEMPERATURA DEPENDE SOLO DEL VAPOR', 1400, 200, { s: 16, f: 'mono', w: 700, ls: 1, al: 'center', c: '#8fa0bd', a: en(e, 1, 0.8, 5.5) });
  const a2 = en(e, 2, 0.8); ['AIRE ATRAPADO', 'MENOS TEMPERATURA', 'PROCESO CORTO'].forEach((s, i) => chip(ctx, s, 1060 + i * 310, 812, { c: i === 2 ? C.rojo : '#ffb05a', s: 20, al: 'center', a: en(e, 2, 0.6, 1 + i * 1.6) }));
  fte(ctx, NCHFP, a2, 866); esquema(ctx, a0);
};
LUZ.purga = (ctx, e) => {
  noche(ctx, '#0a0807', '#120d0a'); const T = e.T, pone = ss(e.tl, 5.0, 6.0), fr = pr(e.tl, 0.6, 4.8);
  ctx.fillStyle = '#0d0b0a'; ctx.fillRect(0, 838, 1920, 242);
  olla(ctx, 620, 800, 1.08, T, { rx: 1, sinPesa: 1 - pone, vapor: 0, psi: 0.6 + 14 * pone * 0.3, dentro: (c) => { bolsaCorte(c, 0, -170, 250, 210, 0.02, { seed: 4 }); aire(c, -200, -320, 400, 260, 70, T, 1 - 0.2 * fr, 9, fr); } });
  // chorro continuo por el tubo de venteo
  const vx = 620 + 90 * 1.08, vy = 800 - 400 * 1.08; for (let i = 0; i < 22; i++) { const ph = (T * 0.7 + i / 22) % 1; halo(ctx, vx + Math.sin(i * 2.1 + T) * 60 * ph, vy - ph * 330, 26 + ph * 120, C.vapor, (1 - pone) * 0.5 * (1 - ph)); if (i % 3 === 0 && fr < 0.95) { ctx.fillStyle = `rgba(150,170,200,${0.8 * (1 - ph) * (1 - fr)})`; ctx.beginPath(); ctx.arc(vx + Math.sin(i * 1.3 + T) * 40 * ph, vy - ph * 300, 5, 0, TAU); ctx.fill(); } }
  rotulo(ctx, 1150, 280, 'Purgar el aire', 'VAPOR CONTINUO, SIN LA PESA', ss(e.tl, 0.2, 1), { s: 60 });
  cronometro(ctx, 1260, 520, 96, fr, ss(e.tl, 0.4, 1.2), C.oro); txt(ctx, mmss(10 * fr), 1400, 510, { s: 96, f: 'mono', w: 700, a: ss(e.tl, 0.4, 1.2) }); txt(ctx, 'MINUTOS DE VAPOR', 1404, 560, { s: 20, f: 'mono', w: 700, ls: 5, c: C.oro, a: ss(e.tl, 0.4, 1.2) });
  chip(ctx, 'DESPUÉS SE PONE LA PESA Y SE PRESURIZA', 1160, 700, { c: C.verde, s: 22, a: pone });
  fte(ctx, NCHFP, ss(e.tl, 0.8, 1.6), 866);
};
function miniOlla(ctx, x, y, s, T, a = 1) { olla(ctx, x, y, s, T, { a, vapor: 0.6, fuego: 0.7 }); }
LUZ.altitud = (ctx, e) => {
  noche(ctx, '#060a12', '#0c1420'); const T = e.T, a = ss(e.tl, 0.1, 0.9);
  // perfil: costa a la izquierda, meseta a ~1,500 m
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#16304f'; ctx.fillRect(0, 800, 330, 60); ctx.fillStyle = '#1c2a22'; ctx.beginPath(); ctx.moveTo(180, 860); ctx.lineTo(180, 800); ctx.lineTo(680, 800); ctx.bezierCurveTo(820, 800, 820, 560, 960, 560); ctx.lineTo(1560, 560); ctx.bezierCurveTo(1700, 560, 1760, 660, 1920, 680); ctx.lineTo(1920, 860); ctx.closePath(); ctx.fill(); ctx.restore();
  txt(ctx, 'NIVEL DEL MAR', 480, 842, { s: 19, f: 'mono', w: 700, ls: 5, al: 'center', c: '#8fb4ff', a }); txt(ctx, '≈ 1,500 m · GUADALAJARA', 1220, 602, { s: 19, f: 'mono', w: 700, ls: 5, al: 'center', c: C.oro, a });
  miniOlla(ctx, 480, 782, 0.6, T, a); miniOlla(ctx, 1220, 542, 0.6, T, a);
  // columna de aire que empuja desde afuera
  const a2 = en(e, 2, 0.8); [[480, 330, 9, '101 kPa'], [1220, 120, 5, '≈ 84 kPa']].forEach(([x, y0, n, v], k) => { for (let i = 0; i < n; i++) { const ph = (T * 0.25 + i / n) % 1; ctx.fillStyle = `rgba(150,170,200,${0.6 * a2 * Math.sin(ph * Math.PI)})`; for (const d of [-200, -170, 170, 200]) { ctx.beginPath(); ctx.arc(x + d, y0 + ph * (k ? 380 : 420), 5, 0, TAU); ctx.fill(); } }
    txt(ctx, 'AIRE DE AFUERA', x + 230, y0 + 250, { s: 20, f: 'mono', w: 700, ls: 3, c: '#aebdd6', a: a2 }); txt(ctx, v, x + 230, y0 + 306, { s: 54, f: 'serif', w: 500, c: '#aebdd6', a: a2 }); });
  const a1 = en(e, 1, 0.8); [[480, 552], [1220, 312]].forEach(([x, y]) => { txt(ctx, 'PESA: + 15 psi', x - 216, y + 30, { s: 22, f: 'mono', w: 700, ls: 2, al: 'right', c: C.oro, a: a1 }); txt(ctx, '(+ 103 kPa)', x - 216, y + 62, { s: 19, f: 'mono', w: 700, ls: 2, al: 'right', c: '#8fa0bd', a: a1 }); });
  txt(ctx, 'psi: LIBRAS POR PULGADA CUADRADA · kPa: KILOPASCALES', 60, 150, { s: 18, f: 'mono', w: 700, ls: 2, c: '#8fa0bd', a: a1 });
  const a3 = en(e, 3, 0.8); txt(ctx, '121 °C', 480, 400, { s: 90, f: 'serif', w: 500, al: 'center', c: '#ff8a7a', a: a3 }); txt(ctx, '205 kPa ADENTRO', 480, 440, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: C.gris, a: a3 });
  txt(ctx, '≈ 118 °C', 1220, 160, { s: 90, f: 'serif', w: 500, al: 'center', c: '#ffb05a', a: en(e, 3, 0.8, 0.8) }); txt(ctx, '187 kPa ADENTRO', 1220, 200, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: C.gris, a: en(e, 3, 0.8, 0.8) });
  fte(ctx, 'CÁLCULO CON TABLAS DE VAPOR SATURADO DEL NIST Y ATMÓSFERA ESTÁNDAR · ' + 'NCHFP 2025', ss(e.tl, 2, 3), 880);
};
LUZ.letal = (ctx, e) => {
  noche(ctx, '#07090f', '#0b0f18'); const a = ss(e.tl, 0.1, 0.9), k = pr(e.tl, 0.8, 4.5), fin = 1 - 0.93 * en(e, 1, 0.8);
  ctx.save(); ctx.globalAlpha = fin;
  cronometro(ctx, 520, 430, 150, k, a, '#ffb05a'); txt(ctx, '1 min a 118 °C', 520, 680, { s: 62, f: 'serif', w: 500, al: 'center', a });
  txt(ctx, '≈', 960, 470, { s: 150, f: 'serif', w: 400, al: 'center', c: C.gris, a: ss(e.tl, 1.6, 2.4) });
  cronometro(ctx, 1400, 430, 150, k * 0.53, ss(e.tl, 1.8, 2.6), '#ff8a7a'); txt(ctx, '½ min a 121 °C', 1400, 680, { s: 62, f: 'serif', w: 500, al: 'center', a: ss(e.tl, 1.8, 2.6) });
  txt(ctx, 'MISMO EFECTO SOBRE LAS ESPORAS DEL LOTE DE LA EPA (CÁLCULO: 0.53 min) · OTRAS CEPAS CAMBIAN', 960, 770, { s: 18, f: 'mono', w: 700, ls: 2, al: 'center', c: '#8fa0bd', a: ss(e.tl, 2.6, 3.4) });
  ctx.restore();
  const a1 = en(e, 1, 0.8); if (a1 > 0) { oscurece(ctx, 0.35 * a1); for (let i = 0; i < 4; i++) { const x = 600 + i * 190, h = 60 + i * 60, ai = en(e, 1, 0.6, 0.4 + i * 0.5); ctx.save(); ctx.globalAlpha = ai; ctx.fillStyle = rgba('#F4C25A', 0.25 + 0.2 * i); ctx.beginPath(); ctx.roundRect(x, 620 - h, 150, h, [10, 10, 0, 0]); ctx.fill(); ctx.restore(); }
    flecha(ctx, 580, 660, 1380, 660, a1, C.gris, 3); txt(ctx, 'MÁS ALTITUD', 1396, 668, { s: 20, f: 'mono', w: 700, ls: 4, c: C.gris, a: a1 }); titulo(ctx, 'En altura, más presión', 960, 300, a1, { s: 84 }); txt(ctx, 'ES LO QUE PIDEN LAS GUÍAS DE ENLATADO', 960, 356, { s: 20, f: 'mono', w: 700, ls: 6, al: 'center', c: C.oro, a: a1 }); }
  fte(ctx, 'LEMIEUX ET AL. 2006 (VALORES D) · JIMENEZ ET AL. 2024 (VALOR z) · NCHFP 2025', ss(e.tl, 1, 2));
};

/* ====== 05 · El grano ====== */
LUZ.grano = (ctx, e) => {
  noche(ctx, '#0a0806', '#120e0a'); const T = e.T, a = ss(e.tl, 0.1, 0.9);
  halo(ctx, 420, 520, 520, '#ffb05a', 0.08); frascoGrano(ctx, 420, 780, 360, 520, 4, a, 0.72);
  rotulo(ctx, 720, 250, 'Inóculo de grano', 'TAMBIÉN LLAMADO «SEMILLA» O SPAWN', ss(e.tl, 0.5, 1.4), { s: 56 });
  // lupa sobre un grano: endosporas en la superficie
  const al = en(e, 1, 0.9), x = 1120, y = 570, r = 250; guia(ctx, 480, 600, x - r + 10, y, al, '#bfe4ff');
  ctx.save(); ctx.globalAlpha = al; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = '#17110a'; ctx.fill(); ctx.save(); ctx.clip();
  ctx.fillStyle = '#b88f4e'; ctx.beginPath(); ctx.ellipse(x + 40, y + 330, 620, 420, -0.1, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(70,45,15,.5)'; ctx.lineWidth = 3; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.ellipse(x + 40, y + 330, 620 - i * 16, 420 - i * 14, -0.1, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); }
  const R = rng(17); for (let i = 0; i < 12; i++) { const px = x - 190 + R() * 380, py = y - 40 + R() * 150 + Math.abs(px - x) * 0.18; if (i % 4 === 0) bacilo(ctx, px, py, 1.5, R() * 3, ss(e.tl, Lx(e, 1) + 0.8 + i * 0.12, Lx(e, 1) + 1.4 + i * 0.12), 1); else esporita(ctx, px, py, 1.6, R() * 3, ss(e.tl, Lx(e, 1) + 0.8 + i * 0.12, Lx(e, 1) + 1.4 + i * 0.12), '#eaf6ff', 0.5 + 0.2 * Math.sin(T * 2 + i)); }
  ctx.restore(); ctx.strokeStyle = 'rgba(220,235,255,.8)'; ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
  rico(ctx, 'Endosporas de *Bacillus*', 1400, 470, { s: 42, f: 'serif', w: 500, a: en(e, 1, 0.8, 1.5) }); txt(ctx, 'VIENEN DEL SUELO Y DEL CAMPO', 1402, 512, { s: 19, f: 'mono', w: 700, ls: 2, c: '#bfe4ff', a: en(e, 1, 0.8, 1.9) }); txt(ctx, 'RESISTEN MUCHO TIEMPO', 1402, 544, { s: 19, f: 'mono', w: 700, ls: 2, c: '#bfe4ff', a: en(e, 1, 0.8, 3.4) }); txt(ctx, 'EN EL AMBIENTE', 1402, 574, { s: 19, f: 'mono', w: 700, ls: 2, c: '#bfe4ff', a: en(e, 1, 0.8, 3.4) });
  fte(ctx, 'SETLOW Y CHRISTIE 2021 · RODRIGO ET AL. 2021 (ARROZ) · GUPTA ET AL. 2020', al); esquema(ctx, al, 'ESQUEMA · SIN ESCALA');
};
LUZ.endospora = (ctx, e) => {
  noche(ctx, '#05080e', '#091019'); const a = ss(e.tl, 0.1, 1), z = 2.5 + 0.12 * e.p, x = 620, y = 500;
  polvo(ctx, 14, 4, e.T, '#6f8ab8', 0.25); endospora(ctx, x, y, z, { a });
  const et = [[x + 60, y - 96 * z, 1180, 250, 'Cubierta', 'VARIAS CAPAS DE PROTEÍNAS', 1.0], [x + 250, y - 20, 1180, 420, 'Corteza', 'CAPA GRUESA DE PEPTIDOGLICANO', 1.8], [x + 120, y + 40, 1180, 590, 'Núcleo', 'ADN, ENZIMAS Y MUY POCA AGUA', 2.6]];
  et.forEach(([x0, y0, x1, y1, t, s, t0]) => { const ai = ss(e.tl, t0, t0 + 0.8); guia(ctx, x0, y0, x1, y1, ai, '#bfe4ff'); rotulo(ctx, x1 + 14, y1 + 10, t, s, ai, { c: '#bfe4ff', s: 46 }); });
  const a1 = en(e, 1, 0.8); txt(ctx, '~ 25 % de agua', 1196, 706, { s: 76, f: 'serif', w: 500, c: C.oro, a: a1 }); txt(ctx, 'EL NÚCLEO PUEDE BAJAR HASTA AHÍ (PESO HÚMEDO)', 1200, 746, { s: 17, f: 'mono', w: 700, ls: 2, c: C.gris, a: a1 });
  const a2 = en(e, 2, 0.8); chip(ctx, 'MENOS AGUA EN EL NÚCLEO:', 1200, 800, { c: '#ff8a7a', s: 19, a: a2 }); chip(ctx, 'MÁS RESISTENCIA AL CALOR HÚMEDO', 1200, 848, { c: '#ff8a7a', s: 19, a: en(e, 2, 0.8, 1.2) });
  fte(ctx, 'SETLOW Y CHRISTIE 2021, WORLD J. MICROBIOL. BIOTECHNOL. 37: 144', ss(e.tl, 1, 2)); esquema(ctx, a, 'ESQUEMA · CORTE');
};
// Etapas de la germinación (esquema): 0 en reposo (brillante) · 1 germina (entra agua, se oscurece e hincha) · 2 la célula sale de la cubierta · 3 célula que crece.
function etapa(ctx, x, y, k, a, T) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
  if (k === 0) { ctx.restore(); esporita(ctx, x, y, 5, 0, a, '#f2faff', 0.8); return; }
  if (k === 1) { ctx.fillStyle = '#5d7896'; ctx.strokeStyle = 'rgba(200,220,245,.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 0, 62, 42, 0, 0, TAU); ctx.fill(); ctx.stroke(); for (let i = 0; i < 6; i++) { const an = i / 6 * TAU + 0.4, ph = (T * 0.6 + i * 0.2) % 1; ctx.fillStyle = `rgba(120,190,255,${1 - ph})`; ctx.beginPath(); ctx.arc(Math.cos(an) * (120 - 60 * ph), Math.sin(an) * (90 - 46 * ph), 6, 0, TAU); ctx.fill(); } }
  if (k === 2) { ctx.fillStyle = '#3a5672'; ctx.strokeStyle = 'rgba(190,215,240,.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(-10, -19, 120, 38, 19); ctx.fill(); ctx.stroke(); ctx.strokeStyle = '#c9a160'; ctx.lineWidth = 7; ctx.beginPath(); ctx.ellipse(-20, 0, 56, 40, 0, 0.6, TAU - 0.6); ctx.stroke(); }
  if (k === 3) { ctx.fillStyle = '#3a5672'; ctx.strokeStyle = 'rgba(190,215,240,.6)'; ctx.lineWidth = 2; for (const d of [-1, 1]) { ctx.beginPath(); ctx.roundRect(d > 0 ? 6 : -146, -19 + d * 3, 140, 38, 19); ctx.fill(); ctx.stroke(); } }
  ctx.restore(); }
LUZ.germina = (ctx, e) => {
  noche(ctx, '#05080e', '#091019'); const T = e.T, xs = [240, 600, 960, 1320], N = ['EN REPOSO', 'GERMINA: ENTRA AGUA', 'SALE UNA CÉLULA', 'CRECE Y SE DIVIDE'], y = 500;
  xs.forEach((x, i) => { const ai = i === 0 ? ss(e.tl, 0.1, 0.8) : ss(e.tl, 2.0 + i * 0.7, 2.7 + i * 0.7); etapa(ctx, x, y, i, ai, T); txt(ctx, N[i], x, y + 130, { s: 19, f: 'mono', w: 700, ls: 3, al: 'center', c: i ? '#bfe4ff' : C.gris, a: ai }); if (i) flecha(ctx, xs[i - 1] + 130, y, x - 150, y, ai, 'rgba(210,222,240,.7)', 3); });
  // reloj de arena: cientos de años
  const a0 = ss(e.tl, 0.4, 1.2); ctx.save(); ctx.globalAlpha = a0; ctx.translate(240, 270); ctx.strokeStyle = C.oro; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-34, -52); ctx.lineTo(34, -52); ctx.lineTo(4, 0); ctx.lineTo(34, 52); ctx.lineTo(-34, 52); ctx.lineTo(-4, 0); ctx.closePath(); ctx.stroke(); ctx.fillStyle = C.oro; ctx.beginPath(); ctx.moveTo(-22, 52); ctx.lineTo(22, 52); ctx.lineTo(0, 30); ctx.closePath(); ctx.fill(); ctx.fillRect(-1.5, 0, 3, 30 * ((T * 0.8) % 1)); ctx.restore();
  txt(ctx, 'cientos de años', 310, 262, { s: 60, f: 'serif', w: 500, a: a0 }); txt(ctx, 'EN REPOSO, SI EL AMBIENTE LO PERMITE', 314, 300, { s: 17, f: 'mono', w: 700, ls: 2, c: C.oro, a: a0 });
  const am = ss(e.tl, 2.6, 3.4); txt(ctx, 'germina en minutos', 600, 720, { s: 60, f: 'serif', w: 500, al: 'center', c: '#bfe4ff', a: am }); txt(ctx, 'EL CRECIMIENTO VIENE DESPUÉS', 1140, 712, { s: 17, f: 'mono', w: 700, ls: 2, al: 'center', c: '#8fa0bd', a: ss(e.tl, 4, 4.8) });
  const a1 = en(e, 1, 0.8); rico(ctx, 'Esporas de algunas cepas de *Bacillus* resisten las temperaturas', 60, 800, { s: 34, f: 'sans', w: 500, c: '#ffd9a0', a: a1 }); rico(ctx, 'normales del procesado de alimentos con calor húmedo.', 60, 842, { s: 34, f: 'sans', w: 500, c: '#ffd9a0', a: a1 });
  fte(ctx, 'SETLOW Y CHRISTIE 2021', ss(e.tl, 1, 2), 150); esquema(ctx, ss(e.tl, 0.5, 1.2) * (1 - a1), 'ESQUEMA · SIN ESCALA');
};
function matrazGrano(ctx, x, y, s, n, seed, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(-114, -10); ctx.lineTo(-84, -60); ctx.lineTo(84, -60); ctx.lineTo(114, -10); ctx.lineTo(108, -2); ctx.lineTo(-108, -2); ctx.closePath(); ctx.clip(); ctx.fillStyle = '#6b4f28'; ctx.fillRect(-130, -70, 260, 80); granos(ctx, -120, -62, 240, 58, n, seed); ctx.restore(); matraz(ctx, x, y, s, 0, 'rgba(0,0,0,0)', 1); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#d9d2c0'; ctx.beginPath(); ctx.roundRect(-30, -292, 60, 44, 10); ctx.fill(); ctx.restore(); ctx.restore(); }
LUZ.penn = (ctx, e) => {
  noche(ctx, '#080a10', '#0c0f18'); const a = ss(e.tl, 0.1, 0.9), T = e.T;
  rotulo(ctx, 150, 200, 'Universidad Estatal de Pensilvania', 'PENN STATE · LABORATORIO DE INÓCULO DE HONGOS', en(e, 1, 0.8), { s: 44 });
  const a1 = en(e, 1, 0.8, 0.6), a1b = en(e, 1, 0.8, 5.5);
  matrazGrano(ctx, 380, 760, 0.82, 50, 3, Math.max(a * 0.5, a1)); txt(ctx, '250 ml', 380, 808, { s: 26, f: 'mono', w: 700, al: 'center', c: C.gris, a: a1 }); txt(ctx, '35 min', 380, 420, { s: 84, f: 'serif', w: 500, al: 'center', a: a1 });
  matrazGrano(ctx, 840, 760, 1.3, 120, 5, Math.max(a * 0.5, a1b)); txt(ctx, '1 L', 840, 808, { s: 26, f: 'mono', w: 700, al: 'center', c: C.gris, a: a1b }); txt(ctx, '45 min', 840, 330, { s: 84, f: 'serif', w: 500, al: 'center', a: a1b });
  txt(ctx, 'MATRACES CON CENTENO · A 121 °C', 610, 852, { s: 18, f: 'mono', w: 700, ls: 4, al: 'center', c: C.oro, a: a1 });
  const a2 = en(e, 2, 0.8); bolsa(ctx, 1450, 760, 330, 300, { a: a2, c: '#a8824a', seed: 6 }); granos(ctx, 1300, 470, 300, 280, a2 > 0 ? 150 : 0, 8, a2 * 0.9); txt(ctx, 'horas', 1450, 300, { s: 110, f: 'serif', w: 500, al: 'center', c: C.oro, a: a2 }); txt(ctx, 'BOLSAS MÁS GRANDES', 1450, 808, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: C.gris, a: a2 });
  fte(ctx, 'PENN STATE, MUSHROOM SPAWN LAB, «SPAWN PREPARATION» · BRÉANT 2025 · PRIORCLAVE 2023', ss(e.tl, 5, 6), 884);
};
function bolsaGrano(ctx, x, y, w, h, conta, a, seed) { bolsa(ctx, x, y, w, h, { a, c: '#a8824a', seed, conta }); if (conta > 0.05) for (let k = 0; k < 2; k++) { ctx.save(); ctx.globalAlpha = a * conta * 0.7; ctx.strokeStyle = '#c9d27a'; ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 12; i++) { const u = i / 12; ctx.lineTo(x - 14 + k * 28 + Math.sin(u * 9 + seed + k) * 7, y - h * 1.45 - u * 34); } ctx.stroke(); ctx.restore(); } }
const GT = { x: 220, y: 440, w: 880, h: 240, x0: 0, x1: 5, y0: 60, y1: 125 };
LUZ.tesis = (ctx, e) => {
  noche(ctx, '#0a0806', '#120e0a'); const a = ss(e.tl, 0.1, 0.9), T = e.T, conta = en(e, 3, 2.5, 0.4);
  for (let i = 0; i < 10; i++) bolsaGrano(ctx, 250 + i * 142, 800, 104, 130, conta * cl((conta * 12 - i) / 2), a * ss(e.tl, 0.3 + i * 0.08, 0.9 + i * 0.08), i + 2);
  rotulo(ctx, 1220, 210, 'Tesis de licenciatura', 'FINLANDIA · BRÉANT, 2025', a, { s: 44 });
  const a1 = en(e, 1, 0.8); for (let i = 0; i < 10; i++) { const ph = pr(e.tl, Lx(e, 1) + 0.3 + i * 0.1, Lx(e, 1) + 1.3 + i * 0.1); if (ph > 0 && ph < 1) bacilo(ctx, 250 + i * 142, mixn(500, 650, ph), 1.1, 1.2, Math.sin(ph * Math.PI), 1); }
  chip(ctx, 'GRUPO C: BACTERIAS AGREGADAS A PROPÓSITO', 1230, 330, { c: '#c9d27a', s: 18, a: a1 });
  // perfil del ciclo (según la tesis): arranca a 105 °C, baja a 79.5 °C a los 40 min, luego 4 h a 99.5 °C
  const { X, Y } = graf(GT), f = (h) => (h < 0.55 ? 105 : h < 0.75 ? mixn(105, 79.5, (h - 0.55) / 0.2) : h < 1 ? mixn(79.5, 99.5, (h - 0.75) / 0.25) : 99.5), av = eo(e.tl, Lx(e, 1) + 1.5, Lx(e, 1) + 6.5);
  ejes(ctx, GT, a1, { yt: [[79.5, '80'], [99.5, '100'], [121, '121 °C']], xt: [0, 1, 2, 3, 4, 5].map((v) => [v, v + ' h']), ts: 18 });
  ctx.save(); ctx.globalAlpha = a1; ctx.strokeStyle = C.verde; ctx.lineWidth = 2; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(X(0), Y(121)); ctx.lineTo(X(5), Y(121)); ctx.stroke(); ctx.restore();
  if (a1 > 0) curva(ctx, GT, f, 5 * av, '#ffb05a', 5);
  chip(ctx, '≈ 4 h A CASI 100 °C', 1230, 392, { c: '#ffb05a', s: 18, a: en(e, 1, 0.8, 4) }); chip(ctx, 'ESO ES PASTEURIZAR, NO ESTERILIZAR', 1230, 446, { c: '#ffb05a', s: 18, a: en(e, 1, 0.8, 5.4) });
  const a2 = en(e, 2, 0.6); halo(ctx, X(0.75), Y(79.5), 60, C.rojo, 0.7 * a2); guia(ctx, X(0.75), Y(79.5), X(1.5), Y(72), a2, C.rojo); txt(ctx, 'FALLA: BAJÓ A ≈ 80 °C', X(1.5) + 12, Y(72) + 7, { s: 20, f: 'mono', w: 700, ls: 2, c: C.rojo, a: a2 });
  const a3 = en(e, 3, 0.8); txt(ctx, 'Semana 7: las 10 contaminadas', 1230, 540, { s: 44, f: 'serif', w: 500, c: '#c9d27a', a: a3 }); rico(ctx, 'OLOR A *Bacillus* (PRUEBA OLFATIVA DE LA TESIS)', 1232, 580, { s: 17, f: 'mono', w: 700, ls: 2, c: C.gris, a: a3 });
  fte(ctx, 'BRÉANT 2025, HÄME UNIVERSITY OF APPLIED SCIENCES (TESIS, POCAS BOLSAS)', ss(e.tl, 1, 2), 880);
};
LUZ.tesis2 = (ctx, e) => {
  noche(ctx, '#0a0806', '#120e0a'); const a = ss(e.tl, 0.1, 0.9);
  txt(ctx, '2.5 h a 121 °C', 150, 190, { s: 76, f: 'serif', w: 500, a }); txt(ctx, 'MISMA TESIS · BOLSAS DE GRANO DE CENTENO', 154, 230, { s: 18, f: 'mono', w: 700, ls: 4, c: C.oro, a });
  const F = [['Sin bacterias agregadas', 'GRUPO Co', 5, [3], '1 de 5', 1], ['Con bacterias agregadas', 'GRUPO Co+', 5, [], '0 de 5', 2], ['Con bacterias y un día de reposo previo', 'GRUPO B', 10, [1, 4, 6, 8], '4 de 10', 2]];
  F.forEach(([n, g, k, mal, res, li], f) => { const y = 420 + f * 170, af = f === 2 ? en(e, li, 0.8, 3.2) : en(e, li, 0.8);
    txt(ctx, n, 150, y - 60, { s: f === 2 ? 30 : 34, f: 'serif', w: 500, a: af }); txt(ctx, g, 152, y - 28, { s: 17, f: 'mono', w: 700, ls: 3, c: C.gris, a: af });
    for (let i = 0; i < k; i++) bolsaGrano(ctx, 760 + i * 84, y, 60, 76, mal.includes(i) ? en(e, li, 1.2, (f === 2 ? 3.8 : 0.8) + i * 0.1) : 0, af, f * 11 + i);
    txt(ctx, res, 1640, y - 20, { s: 64, f: 'serif', w: 500, c: mal.length ? '#c9d27a' : C.verde, a: f === 2 ? en(e, li, 0.8, 4.6) : en(e, li, 0.8, 1.6) }); txt(ctx, 'CONTAMINADAS', 1644, y + 12, { s: 15, f: 'mono', w: 700, ls: 3, c: C.gris, a: f === 2 ? en(e, li, 0.8, 4.6) : en(e, li, 0.8, 1.6) }); });
  sello(ctx, 'INDICIO, NO PRUEBA', 1500, 200, en(e, 3, 0.5), C.oro, -0.05, 34);
  const a4 = en(e, 4, 0.8); if (a4 > 0) { oscurece(ctx, 0.66 * a4); ctx.save(); ctx.globalAlpha = a4; ctx.translate(520, 480); ctx.fillStyle = '#b88f4e'; ctx.beginPath(); ctx.ellipse(0, 0, 250, 104, -0.1, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(70,45,15,.7)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-200, 18); ctx.quadraticCurveTo(0, -30, 200, -20); ctx.stroke(); ctx.restore(); for (let i = 0; i < 6; i++) esporita(ctx, 380 + i * 54, 450 + Math.sin(i * 2) * 26, 1.8, i, a4, '#eaf6ff', 0.6); titulo(ctx, 'La bacteria ya venía en el grano', 1240, 440, a4, { s: 58 }); txt(ctx, 'ES LO QUE SUGIERE EL AUTOR DE LA TESIS', 1240, 496, { s: 19, f: 'mono', w: 700, ls: 4, al: 'center', c: C.oro, a: a4 }); }
  fte(ctx, 'BRÉANT 2025 (TESIS): SEGUIMIENTO HASTA LA SEMANA 15', ss(e.tl, 1, 2), 880);
};

/* ====== 06 · ¿Y pasteurizar? ====== */
// Microbios variados (bastones, cocos, esporas de moho) repartidos en un círculo; vivos = fracción que queda.
function microbios(ctx, x, y, r, vivos, T, seed = 3, a = 1) { const R = rng(seed), n = 70; for (let i = 0; i < n; i++) { const an = R() * TAU, d = Math.sqrt(R()) * r * 0.9, px = x + Math.cos(an) * d + Math.sin(T * 0.7 + i) * 4, py = y + Math.sin(an) * d + Math.cos(T * 0.6 + i * 2) * 4, k = R(), orden = R(), ai = a * cl((vivos - orden) * 12 + 1); if (ai <= 0) continue;
    if (k < 0.4) bacilo(ctx, px, py, 0.7, R() * 3, ai, 0); else if (k < 0.75) { ctx.fillStyle = rgba('#9ad06a', 0.85 * ai); ctx.beginPath(); ctx.arc(px, py, 7, 0, TAU); ctx.fill(); } else esporita(ctx, px, py, 1.1, R() * 3, ai, '#eaf6ff', 0.3); } }
LUZ.pastvs = (ctx, e) => {
  noche(ctx, '#07090f', '#0b0f18'); const T = e.T, a = ss(e.tl, 0.1, 0.9), r = 250, xL = 500, xR = 1420, y = 520;
  const disco = (x, c) => { ctx.save(); ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = '#17110a'; ctx.fill(); ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.stroke(); ctx.restore(); };
  disco(xL, '#ffb05a'); disco(xR, '#ff5a4a');
  const vp = 1 - 0.86 * en(e, 1, 3, 0.6), ve = 1 - 1.1 * en(e, 2, 2.4, 0.4);
  ctx.save(); ctx.beginPath(); ctx.arc(xL, y, r - 4, 0, TAU); ctx.clip(); ctx.translate(xL - r, y); pintaRed(ctx, red('pas', { seed: 5, radio: 560, brotes: 5, ang0: 0, abre: 1.6, sesgo: 0, max: 5000, acepta: (px, py) => Math.hypot(px - r, py) < r }), eo(e.tl, Lx(e, 1) + 2.5, e.dur + 2), '#f1ecdf', {}); ctx.restore();
  microbios(ctx, xL, y, r, vp, T, 3, a); microbios(ctx, xR, y, r, cl(ve), T, 8, a);
  txt(ctx, 'Pasteurizar', xL, 200, { s: 76, f: 'serif', w: 500, al: 'center', a }); txt(ctx, 'CALOR MÁS SUAVE', xL, 240, { s: 19, f: 'mono', w: 700, ls: 5, al: 'center', c: '#ffb05a', a });
  txt(ctx, 'Esterilizar', xR, 200, { s: 76, f: 'serif', w: 500, al: 'center', a }); txt(ctx, '121 °C · VAPOR A PRESIÓN', xR, 240, { s: 19, f: 'mono', w: 700, ls: 5, al: 'center', c: '#ff5a4a', a });
  txt(ctx, '≠', 960, 540, { s: 150, f: 'serif', w: 400, al: 'center', c: C.gris, a: ss(e.tl, 0.6, 1.4) });
  chip(ctx, 'QUEDAN MENOS · EL HONGO GANA LA CARRERA', xL, 818, { c: '#ffb05a', s: 18, al: 'center', a: en(e, 1, 0.8, 2.6) }); chip(ctx, 'LA META: QUE NO QUEDE NINGUNO VIVO', xR, 818, { c: '#ff5a4a', s: 18, al: 'center', a: en(e, 2, 0.8, 1.6) });
  txt(ctx, 'micelio', xL - 190, y + 10, { s: 36, f: 'mano', w: 700, c: '#f1ecdf', a: en(e, 1, 0.8, 4) });
  fte(ctx, 'PRIORCLAVE 2023 (FABRICANTE DE AUTOCLAVES) · GRIMM ET AL. 2024', ss(e.tl, 1, 2), 870); esquema(ctx, a);
};
// Seta Pleurotus ostreatus: sombrero en concha o abanico, láminas decurrentes (bajan por el pie), pie corto y lateral; crece en racimos.
function pleurotus(ctx, x, y, s, rot, a = 1, seed = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.fillStyle = '#efe9da'; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.quadraticCurveTo(-30, -60, -96, -92); ctx.lineTo(100, -92); ctx.quadraticCurveTo(26, -56, 14, 0); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(150,140,115,.8)'; ctx.lineWidth = 1.5; ctx.beginPath(); for (let i = -9; i <= 9; i++) { ctx.moveTo(i * 10.4, -92); ctx.quadraticCurveTo(i * 3.4, -50, i * 1.2, -4); } ctx.stroke();
  const g = ctx.createLinearGradient(0, -130, 0, -84); g.addColorStop(0, '#8d8f96'); g.addColorStop(1, '#5f6168'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-102, -90); ctx.bezierCurveTo(-90, -138, 70, -150, 106, -90); for (let i = 0; i <= 8; i++) { const u = 1 - i / 8; ctx.lineTo(-102 + 208 * u, -88 + Math.sin(u * 14 + seed) * 4); } ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.12)'; ctx.beginPath(); ctx.ellipse(-20, -120, 50, 10, -0.1, 0, TAU); ctx.fill(); ctx.restore(); }
LUZ.paja = (ctx, e) => {
  noche(ctx, '#0b0a06', '#14110a'); const a = ss(e.tl, 0.1, 0.9), T = e.T;
  // bolsa de paja con un racimo de setas
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#8a7434'; ctx.beginPath(); ctx.roundRect(200, 330, 300, 470, 60); ctx.fill(); ctx.save(); ctx.clip(); const R = rng(4); ctx.lineCap = 'round'; for (let i = 0; i < 150; i++) { const px = 200 + R() * 300, py = 330 + R() * 470, an = R() * 3.14, l = 20 + R() * 40; ctx.strokeStyle = ['#d9bf62', '#c2a548', '#e6cf7c'][i % 3]; ctx.lineWidth = 3 + R() * 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + Math.cos(an) * l, py + Math.sin(an) * l); ctx.stroke(); } ctx.restore(); ctx.strokeStyle = 'rgba(225,235,250,.5)'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
  const cr = eo(e.tl, 0.6, 4); [[470, 560, 1.0, 0.5, 2], [500, 500, 0.85, 0.2, 3], [480, 640, 0.9, 0.85, 5], [520, 590, 0.7, 0.5, 7], [470, 470, 0.6, -0.1, 9]].forEach(([x, y, s, r, sd], i) => pleurotus(ctx, x, y, s * cr * 1.25, r + Math.sin(T * 0.6 + i) * 0.015, a, sd));
  rotulo(ctx, 150, 220, '*Pleurotus ostreatus*', 'SETA · SOBRE PAJA SIN SUPLEMENTAR', ss(e.tl, 0.6, 1.5), { s: 50 });
  // barras: solo la proporción que da el resumen del estudio (hasta +50 % en peso seco)
  const a1 = en(e, 1, 0.8), base = 760, b1 = eo(e.tl, Lx(e, 1) + 0.4, Lx(e, 1) + 1.6), b2 = eo(e.tl, Lx(e, 1) + 2.2, Lx(e, 1) + 3.6);
  ctx.save(); ctx.globalAlpha = a1; ctx.fillStyle = '#ffb05a'; ctx.beginPath(); ctx.roundRect(1000, base - 280 * b1, 170, 280 * b1, [10, 10, 0, 0]); ctx.fill(); ctx.fillStyle = '#ff5a4a'; ctx.beginPath(); ctx.roundRect(1330, base - 280 * b2, 170, 280 * b2, [10, 10, 0, 0]); ctx.fill();
  ctx.fillStyle = 'rgba(255,90,74,.35)'; ctx.strokeStyle = '#ff8a7a'; ctx.setLineDash([9, 7]); ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(1330, base - 280 * b2 - 140 * b2, 170, 140 * b2, [10, 10, 0, 0]); ctx.fill(); ctx.stroke(); ctx.setLineDash([]); ctx.strokeStyle = 'rgba(210,222,240,.6)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(940, base); ctx.lineTo(1580, base); ctx.stroke(); ctx.restore();
  txt(ctx, 'PASTEURIZADA', 1085, base + 40, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: '#ffb05a', a: a1 }); txt(ctx, 'EN AUTOCLAVE', 1415, base + 40, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: '#ff8a7a', a: a1 });
  txt(ctx, 'hasta + 50 %', 1860, 300, { s: 76, f: 'serif', w: 500, al: 'right', c: C.oro, a: en(e, 1, 0.8, 3.4) }); txt(ctx, 'COSECHA EN PESO SECO', 1860, 338, { s: 17, f: 'mono', w: 700, ls: 3, al: 'right', c: C.gris, a: en(e, 1, 0.8, 3.4) });
  const a2 = en(e, 2, 0.8); txt(ctx, 'buenas cosechas,', 900, 300, { s: 46, f: 'mano', w: 700, al: 'center', c: '#ffd9a0', a: a2 }); txt(ctx, 'pocas plagas', 900, 346, { s: 46, f: 'mano', w: 700, al: 'center', c: '#ffd9a0', a: a2 }); guia(ctx, 1085, 470, 960, 366, a2, '#ffd9a0');
  txt(ctx, 'COSECHA', 930, 620, { s: 17, f: 'mono', w: 700, ls: 4, al: 'right', c: '#8fa0bd', a: a1 });
  fte(ctx, 'GRIMM, SONNTAG Y RAHMANN 2024, J. MICROBIOL. BIOTECHNOL. FOOD SCI. · BARRAS: SOLO LA PROPORCIÓN', a1, 870);
};
LUZ.buffet = (ctx, e) => {
  noche(ctx, '#0a0806', '#120e0a'); const T = e.T, a = ss(e.tl, 0.1, 0.9);
  // izquierda: sustrato pobre · derecha: sustrato nutritivo
  const a1 = en(e, 1, 0.8); bolsa(ctx, 260, 760, 230, 270, { a: a * (1 - 0.5 * a1), c: '#a8923e', seed: 2 }); txt(ctx, 'PAJA SOLA', 260, 810, { s: 19, f: 'mono', w: 700, ls: 4, al: 'center', c: C.gris, a: a * (1 - 0.5 * a1) }); txt(ctx, 'pocos nutrientes', 260, 330, { s: 38, f: 'mano', w: 700, al: 'center', c: '#d9bf62', a: a * (1 - 0.5 * a1) });
  bolsa(ctx, 620, 760, 230, 270, { a: Math.max(a * 0.4, a1), c: '#7a5632', seed: 5 }); txt(ctx, 'ASERRÍN CON SALVADO', 620, 810, { s: 19, f: 'mono', w: 700, ls: 4, al: 'center', c: C.gris, a: a1 }); txt(ctx, 'muy nutritivo', 620, 330, { s: 38, f: 'mano', w: 700, al: 'center', c: C.oro, a: a1 });
  // lupa: carrera entre el micelio y un sobreviviente
  const a2 = Math.max(en(e, 1, 0.9, 2), 0), x = 1300, y = 500, r = 300, t0 = Lx(e, 2); guia(ctx, 700, 640, x - r + 10, y + 40, a2, C.oro);
  ctx.save(); ctx.globalAlpha = a2; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = '#1c130b'; ctx.fill(); ctx.save(); ctx.clip();
  ctx.save(); ctx.translate(x - r, y); pintaRed(ctx, red('buf', { seed: 9, radio: 700, brotes: 5, ang0: 0, abre: 1.5, sesgo: 0, max: 5000, acepta: (px, py) => Math.hypot(px - r, py) < r }), 0.1 + 0.3 * pr(e.tl, t0 - 3, e.dur), '#f1ecdf', {}); ctx.restore();
  const g = pr(e.tl, t0 + 0.6, e.dur), n = Math.round(1 + 260 * g * g), R = rng(23); for (let i = 0; i < n; i++) { const an = R() * TAU, d = Math.sqrt(R()) * (20 + 250 * Math.sqrt(i / 260)); bacilo(ctx, x + 150 + Math.cos(an) * d, y + 20 + Math.sin(an) * d * 0.9, 0.8, R() * 3 + Math.sin(T + i) * 0.1, 1, 0); }
  ctx.restore(); ctx.strokeStyle = 'rgba(220,235,255,.8)'; ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
  txt(ctx, 'micelio', x - 250, y - 190, { s: 38, f: 'mano', w: 700, c: '#f1ecdf', a: a2 }); txt(ctx, 'un sobreviviente', x + 60, y + 250, { s: 38, f: 'mano', w: 700, al: 'center', c: '#9ad0ff', a: en(e, 2, 0.8) });
  chip(ctx, 'COMIDA DE SOBRA: PUEDE GANARLE AL HONGO', 1300, 840, { c: C.rojo, s: 19, al: 'center', a: en(e, 2, 0.8, 2) });
  fte(ctx, 'PRIORCLAVE 2023 (FABRICANTE DE AUTOCLAVES)', a1, 866); esquema(ctx, a2);
};

/* ====== 07 · ¿Cuántos minutos? ====== */
LUZ.depende = (ctx, e) => {
  noche(ctx, '#080a10', '#0c0f18'); const a = ss(e.tl, 0.1, 0.9), x0 = 700, x1 = 1660, X = (h) => mixn(x0, x1, h / 3), ys = [360, 530, 700];
  titulo(ctx, 'Depende de tu carga', 960, 200, a, { s: 80 });
  const a1 = en(e, 1, 0.8); ctx.save(); ctx.globalAlpha = a1; ctx.strokeStyle = 'rgba(210,222,240,.25)'; ctx.lineWidth = 1.5; for (let h = 0; h <= 3; h += 0.5) { ctx.beginPath(); ctx.moveTo(X(h), 270); ctx.lineTo(X(h), 770); ctx.stroke(); } ctx.restore();
  [0, 1, 2, 3].forEach((h) => txt(ctx, h + ' h', X(h), 806, { s: 20, f: 'mono', w: 700, al: 'center', c: C.gris, a: a1 }));
  const F = [['Poco aserrín', 'VOLUMEN PEQUEÑO', 0, 20 / 60, 'menos de 20 min', 2, 0], ['Bolsas o bloques grandes', 'EL MISMO ASERRÍN', 0, 2.5, 'más de 2.5 h', 3, 1], ['Frascos de grano', 'SEGÚN TAMAÑO Y HUMEDAD', 0.75, 2, '45 min a 2 h', 4, 0]];
  F.forEach(([n, s, h0, h1, v, li, mas], i) => { const y = ys[i], ai = en(e, li, 0.8), b = eo(e.tl, Lx(e, li) + 0.4, Lx(e, li) + 1.8);
    txt(ctx, n, 150, y - 4, { s: 38, f: 'serif', w: 500, a: ai }); txt(ctx, s, 152, y + 28, { s: 16, f: 'mono', w: 700, ls: 3, c: C.oro, a: ai });
    ctx.save(); ctx.globalAlpha = ai; ctx.fillStyle = calor(0.55 + 0.2 * i); ctx.beginPath(); ctx.roundRect(X(h0), y - 30, Math.max(4, (X(h1) - X(h0)) * b), 60, 12); ctx.fill(); if (mas) { for (let k = 0; k < 3; k++) { ctx.globalAlpha = ai * b * (0.5 - k * 0.15); ctx.beginPath(); ctx.roundRect(X(h1) + 10 + k * 34, y - 30, 26, 60, 8); ctx.fill(); } } ctx.restore();
    txt(ctx, v, mas ? X(1.25) : X(h1) + 26, y + (mas ? 12 : 14), { s: 40, f: 'serif', w: 500, c: mas ? '#1b1208' : '#fff', a: ai * b, al: mas ? 'center' : 'left', sombra: !mas }); });
  fte(ctx, 'PRIORCLAVE 2023 · ES LA GUÍA DE UN FABRICANTE DE AUTOCLAVES, NO UN ARTÍCULO ARBITRADO', a1, 866);
};
// Ampolleta de indicador biológico (esquema).
function ampolleta(ctx, x, y, s, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(200,220,245,.25)'; ctx.strokeStyle = 'rgba(225,235,250,.9)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(-9, -30, 18, 60, 8); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#f1ecdf'; ctx.fillRect(-4, -4, 8, 26); ctx.fillStyle = '#6a7aa0'; ctx.fillRect(-9, -30, 18, 12); ctx.restore(); }
LUZ.validar = (ctx, e) => {
  noche(ctx, '#080706', '#0f0c0a'); const T = e.T, a = ss(e.tl, 0.1, 0.9), xs = [330, 900, 1470], y = 470;
  titulo(ctx, 'Validar el ciclo', 960, 190, a, { s: 72 });
  const a1 = en(e, 1, 0.8); bolsaCorte(ctx, xs[0], y + 30, 300, 250, 0.03, { a: a1, seed: 5, motas: 140 }); ampolleta(ctx, xs[0], y + 30, 1.5, en(e, 1, 0.6, 0.8)); halo(ctx, xs[0], y + 30, 90, '#bfe4ff', 0.4 * en(e, 1, 0.6, 0.8));
  txt(ctx, '1 · INDICADOR EN EL CENTRO', xs[0], 730, { s: 19, f: 'mono', w: 700, ls: 3, al: 'center', c: C.gris, a: a1 }); txt(ctx, 'con esporas', xs[0], 772, { s: 36, f: 'mano', w: 700, al: 'center', c: '#bfe4ff', a: a1 });
  const a1b = en(e, 1, 0.8, 3.2); flecha(ctx, xs[0] + 200, y + 30, xs[1] - 180, y + 30, a1b, 'rgba(210,222,240,.7)', 4); olla(ctx, xs[1], 640, 0.6, T, { a: a1b }); txt(ctx, '2 · CORRER EL CICLO', xs[1], 730, { s: 19, f: 'mono', w: 700, ls: 3, al: 'center', c: C.gris, a: a1b });
  const a1c = en(e, 1, 0.8, 5); flecha(ctx, xs[1] + 190, y + 30, xs[2] - 220, y + 30, a1c, 'rgba(210,222,240,.7)', 4);
  ctx.save(); ctx.globalAlpha = a1c; ctx.fillStyle = '#1a1f2a'; ctx.strokeStyle = 'rgba(200,215,240,.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.roundRect(xs[2] - 190, 300, 380, 370, 18); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,170,80,.08)'; ctx.fillRect(xs[2] - 170, 320, 340, 330); ctx.restore(); halo(ctx, xs[2], 480, 240, '#ffb05a', 0.12 * a1c);
  txt(ctx, '3 · INCUBAR EL INDICADOR', xs[2], 730, { s: 19, f: 'mono', w: 700, ls: 3, al: 'center', c: C.gris, a: a1c });
  const a2 = en(e, 2, 0.8), a3 = en(e, 3, 0.8); tuboCultivo(ctx, xs[2] - 90, 620, 0, Math.max(a1c * 0.6, a2), T); tuboCultivo(ctx, xs[2] + 90, 620, a3, Math.max(a1c * 0.25, a3), T);
  palomita(ctx, xs[2] - 90, 366, 24, a2); tache(ctx, xs[2] + 90, 366, 22, a3);
  chip(ctx, 'NO CRECEN: EL CICLO SIRVE PARA ESA CARGA', 960, 818, { c: C.verde, s: 19, al: 'center', a: a2 * (1 - a3) }); chip(ctx, 'CRECEN: ALARGAR EL CICLO Y REPETIR LA PRUEBA', 960, 818, { c: C.rojo, s: 19, al: 'center', a: a3 });
  fte(ctx, 'RUTALA ET AL. 1982 · LEMIEUX ET AL. 2006 · SWENSON ET AL. 2018', a1, 870); esquema(ctx, a1);
};
function ollaLlena(ctx, x, y, s, T, apretada, a = 1) { olla(ctx, x, y, s, T, { a, rx: 1, vapor: 0.4, vaporIn: apretada ? 0.2 : 1, dentro: (c) => { if (apretada) { for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) bolsaCorte(c, -134 + i * 134, -112 - j * 122, 128, 104, 0.012, { seed: i + j * 3, motas: 20, n: 12 }); } else { bolsaCorte(c, -95, -140, 120, 130, 0.5, { seed: 2, motas: 20, n: 12 }); bolsaCorte(c, 95, -140, 120, 130, 0.5, { seed: 4, motas: 20, n: 12 }); for (let i = 0; i < 8; i++) { const ph = (T * 0.5 + i / 8) % 1; halo(c, [-190, 0, 190][i % 3], -60 - ph * 240, 30, C.vapor, 0.5 * (1 - ph)); } } } }); }
LUZ.errores = (ctx, e) => {
  noche(ctx, '#0a0807', '#120d0a'); const T = e.T, xs = [360, 960, 1560], y = 500;
  titulo(ctx, 'Tres errores fáciles de cometer', 960, 190, ss(e.tl, 0.1, 0.9), { s: 68 });
  const N = [['Contar desde que', 'se prende el fuego'], ['No sacar', 'el aire'], ['Llenar la olla', 'demasiado apretada']];
  xs.forEach((x, i) => { const ai = en(e, i + 1, 0.7); txt(ctx, String(i + 1), x - 200, 330, { s: 90, f: 'serif', w: 400, c: C.oro, a: ai }); N[i].forEach((l, k) => txt(ctx, l, x, 740 + k * 46, { s: 38, f: 'serif', w: 500, al: 'center', a: ai }));
    if (i === 0) { ctx.save(); ctx.globalAlpha = ai; ctx.fillStyle = '#2a2d36'; ctx.fillRect(x - 150, y + 110, 180, 16); ctx.restore(); for (let k = 0; k < 6; k++) halo(ctx, x - 130 + k * 28, y + 100, 32 + 8 * Math.sin(T * 11 + k), '#3aa0ff', 0.7 * ai); cronometro(ctx, x + 70, y - 20, 96, pr(e.tl, Lx(e, 1), e.dur), ai, '#fff'); }
    if (i === 1) olla(ctx, x, y + 150, 0.62, T, { a: ai, rx: 1, vapor: 0.4, vaporIn: 0.3, dentro: (c) => { bolsaCorte(c, 0, -170, 250, 210, 0.02, { seed: 4, motas: 40 }); window.LZB.aire(c, -200, -320, 400, 260, 60, T, 1, 9); } });
    if (i === 2) ollaLlena(ctx, x, y + 150, 0.62, T, true, ai);
    tache(ctx, x + 170, 330, 34, en(e, i + 1, 0.5, 1)); });
  fte(ctx, 'LEMIEUX ET AL. 2006 · NCHFP 2025', en(e, 1, 0.8));
};
LUZ.carga = (ctx, e) => {
  noche(ctx, '#0a0807', '#120d0a'); const T = e.T, a = ss(e.tl, 0.1, 0.8);
  ollaLlena(ctx, 500, 800, 0.95, T, true, a); ollaLlena(ctx, 1420, 800, 0.95, T, false, a);
  txt(ctx, 'Carga apretada', 500, 200, { s: 54, f: 'serif', w: 500, al: 'center', a }); txt(ctx, 'EL VAPOR NO RODEA LAS BOLSAS', 500, 240, { s: 18, f: 'mono', w: 700, ls: 4, al: 'center', c: C.rojo, a: ss(e.tl, 1, 1.8) });
  txt(ctx, 'Carga suelta', 1420, 200, { s: 54, f: 'serif', w: 500, al: 'center', a }); txt(ctx, 'LA MEJOR DESTRUCCIÓN DE ESPORAS', 1420, 240, { s: 18, f: 'mono', w: 700, ls: 4, al: 'center', c: C.verde, a: ss(e.tl, 2.2, 3) });
  txt(ctx, 'peor', 960, 470, { s: 60, f: 'mano', w: 700, al: 'center', c: C.rojo, a: ss(e.tl, 1.2, 2) }); flecha(ctx, 900, 500, 790, 500, ss(e.tl, 1.2, 2), C.rojo, 4); txt(ctx, 'mejor', 960, 640, { s: 60, f: 'mano', w: 700, al: 'center', c: C.verde, a: ss(e.tl, 2.4, 3.2) }); flecha(ctx, 1030, 670, 1140, 670, ss(e.tl, 2.4, 3.2), C.verde, 4);
  fte(ctx, 'LEMIEUX ET AL. 2006 (AUTOCLAVE COMERCIAL DE LA EPA)', ss(e.tl, 0.8, 1.6), 880); esquema(ctx, a);
};

/* ====== 08 · Cierre ====== */
LUZ.cierre = (ctx, e) => {
  // La misma olla del gancho. Ahora el calor sí llega al centro y el reloj del centro empieza a contar.
  const T = e.T, rx = en(e, 2, 2), L5 = Lx(e, 5), L6 = Lx(e, 6), Fo = 0.012 + 0.2 * ss(e.tl, Lx(e, 2), L5) + 0.9 * ss(e.tl, L5, L6 + 1.6), tc = tempC(0, Fo), llego = ss(e.tl, L6 + 1.2, L6 + 1.8), a3 = en(e, 3, 0.8) * (1 - en(e, 4, 0.6));
  const z = 1.0 + 0.06 * ss(e.tl, 0, 8), fin = cam(ctx, z, 760, 520);
  escenaOlla(ctx, e, { rx, Fo, dentro: (c) => { if (a3 > 0) window.LZB.aire(c, -200, -320, 400, 260, 60, T, a3, 9); } }); fin();
  const a1 = en(e, 1, 0.7) * (1 - en(e, 2, 0.6)); chip(ctx, 'LA PESA SE MUEVE', 1130, 300, { c: C.oro, s: 22, a: a1 }); chip(ctx, 'EL MANÓMETRO MARCA 15 psi', 1130, 370, { c: C.oro, s: 22, a: en(e, 1, 0.7, 1.4) * (1 - en(e, 2, 0.6)) });
  const a2 = en(e, 2, 0.8, 1.6); txt(ctx, 'CENTRO DE LA BOLSA', 1180, 200, { s: 20, f: 'mono', w: 700, ls: 5, c: '#8fb4ff', a: a2 }); txt(ctx, Math.round(tc) + ' °C', 1180, 290, { s: 96, f: 'serif', w: 500, c: mixc('#8fb4ff', '#ff8a7a', ganado(0, Fo)), a: a2 });
  txt(ctx, 'RELOJ DEL CENTRO', 1560, 200, { s: 20, f: 'mono', w: 700, ls: 5, c: llego > 0.5 ? C.verde : '#8fb4ff', a: a2 }); reloj7(ctx, mmss(15 * pr(e.tl, L6 + 1.8, e.dur - 0.3)), 1560, 284, { a: a2, c: llego > 0.5 ? C.verde : '#8fb4ff' });
  chip(ctx, 'AIRE SIN PURGAR: MENOS GRADOS', 1180, 380, { c: '#aebdd6', s: 20, a: a3 }); chip(ctx, 'AHORA SÍ CUENTAN LOS 15 MINUTOS', 1180, 380, { c: C.verde, s: 20, a: llego });
  // lupa al centro: endosporas en reposo que se apagan cuando el calor por fin llega
  const a4 = en(e, 4, 0.9), x = 1500, y = 600, r = 190; if (a4 > 0) { guia(ctx, 650, 616, x - r + 10, y, a4, '#bfe4ff'); ctx.save(); ctx.globalAlpha = a4; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = '#0c1826'; ctx.fill(); ctx.restore();
    const vivo = 1 - ss(e.tl, L6 + 2.5, e.dur - 0.5); [[-70, -40, 0.3], [60, -60, -0.4], [-20, 60, 0.9], [90, 50, 0.1]].forEach(([dx, dy, r0], i) => { ctx.save(); ctx.translate(x + dx + Math.sin(T * 0.7 + i) * 4, y + dy + Math.cos(T * 0.6 + i) * 4); ctx.rotate(r0); endospora(ctx, 0, 0, 0.4, { a: a4, vivo, halo: vivo > 0.3 ? 1 : 0 }); ctx.restore(); });
    ctx.save(); ctx.globalAlpha = a4; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.strokeStyle = 'rgba(220,235,255,.8)'; ctx.lineWidth = 5; ctx.stroke(); ctx.restore();
    txt(ctx, vivo > 0.5 ? 'ENDOSPORAS EN REPOSO' : 'ENDOSPORAS INACTIVADAS', x, y + r + 40, { s: 19, f: 'mono', w: 700, ls: 4, al: 'center', c: vivo > 0.5 ? '#bfe4ff' : C.verde, a: a4 }); }
  esquema(ctx, rx);
};
window.LZB = { aire, microbios, pleurotus, ollaLlena, ampolleta, miniOlla };
