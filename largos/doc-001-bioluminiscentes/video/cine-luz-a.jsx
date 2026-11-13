// cine-luz-a.jsx — Documental 001, capítulos 0 a 3 (gancho, luz sin calor, hongos, bacterias).
// Cada escena: LUZ.id = (ctx, e) => …   ·   e.L(i) = segundo en que empieza la frase i del bloque.
const { TAU, cl, pr, ss, eo, mixn, rng, rgba, mixc, LUZC, halo, noche, estrellas, polvo, cam, oscurece, txt, rico, chip, rotulo, guia, titulo, sello, tache, flecha,
  red, pintaRed, tronco, panellus, mycena, embudo, petri, frasco, matraz, bacteria, calamar, dino, petunia, luciernaga, foco, termometro, molecula, veredicto } = window.LZK;
const LUZ = window.LUZ;
const en = (e, i, d = 0.7, r = 0) => { const a = e.L(i); return a == null ? 0 : ss(e.tl, a + r, a + r + d); };
const esquema = (ctx, a = 1) => chip(ctx, 'ESQUEMA', 60, 870, { c: '#8fa0bd', s: 18, a: a * 0.8 });

/* ====== piezas compartidas ====== */
// Recámara de noche (genérica, sin detalles reales): cama, buró, ventana con luna y un frasco con Panellus sobre el buró.
// brillo: luz del hongo · techo: estrellitas fosforescentes · luna: luz que entra por la ventana.
function recamara(ctx, T, brillo, techo, luna) {
  const g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, '#070a14'); g.addColorStop(1, '#04060c'); ctx.fillStyle = g; ctx.fillRect(-200, -200, 2320, 1480);
  // ventana
  ctx.fillStyle = mixc('#060912', '#152444', luna); ctx.fillRect(1380, 150, 360, 420);
  halo(ctx, 1640, 250, 240, '#cfe0ff', 0.55 * luna); ctx.fillStyle = mixc('#0a0e18', '#eef3ff', luna); ctx.beginPath(); ctx.arc(1640, 250, 34, 0, TAU); ctx.fill();
  ctx.strokeStyle = '#0d111c'; ctx.lineWidth = 16; ctx.strokeRect(1380, 150, 360, 420); ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(1560, 150); ctx.lineTo(1560, 570); ctx.moveTo(1380, 360); ctx.lineTo(1740, 360); ctx.stroke();
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(120,150,220,${0.05 * luna})`; ctx.beginPath(); ctx.moveTo(1380, 570); ctx.lineTo(1740, 570); ctx.lineTo(1420, 1100); ctx.lineTo(820, 1100); ctx.closePath(); ctx.fill(); ctx.restore();
  // piso
  ctx.fillStyle = '#05070c'; ctx.fillRect(-200, 800, 2320, 500);
  // cama
  ctx.fillStyle = '#0b0f1a'; ctx.beginPath(); ctx.roundRect(60, 560, 760, 250, 26); ctx.fill(); ctx.fillStyle = '#0e1422'; ctx.beginPath(); ctx.roundRect(40, 420, 60, 400, 14); ctx.fill();
  ctx.fillStyle = '#121a2c'; ctx.beginPath(); ctx.roundRect(120, 520, 240, 90, 40); ctx.fill(); ctx.fillStyle = '#0d1424'; ctx.beginPath(); ctx.roundRect(330, 580, 500, 150, 40); ctx.fill();
  // buró
  ctx.fillStyle = '#0d0c0e'; ctx.fillRect(960, 640, 300, 180); ctx.fillStyle = '#131114'; ctx.fillRect(946, 622, 328, 22); ctx.strokeStyle = '#1b181c'; ctx.lineWidth = 3; ctx.strokeRect(984, 668, 252, 60); ctx.fillStyle = '#2a262c'; ctx.beginPath(); ctx.arc(1110, 698, 7, 0, TAU); ctx.fill();
  // estrellitas del techo (fosforescentes: solo brillan un rato después de recibir luz)
  const r = rng(40); for (let i = 0; i < 16; i++) { const x = 180 + r() * 1100, y = 50 + r() * 190, s = 9 + r() * 9, rot = r() * 3;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = mixc('#0c1016', '#d9f3a6', techo); ctx.beginPath(); for (let k = 0; k < 10; k++) { const an = k / 10 * TAU, rr = k % 2 ? s * 0.45 : s; k ? ctx.lineTo(Math.cos(an) * rr, Math.sin(an) * rr) : ctx.moveTo(Math.cos(an) * rr, Math.sin(an) * rr); } ctx.closePath(); ctx.fill(); ctx.restore(); if (techo > 0.02) halo(ctx, x, y, s * 3.4, '#c9f08a', 0.5 * techo); }
  // frasco con un trozo de madera y Panellus
  const resp = 0.9 + 0.1 * Math.sin(T * 1.3);
  halo(ctx, 1110, 560, 420, LUZC.pan, 0.2 * brillo * resp); halo(ctx, 1110, 640, 260, LUZC.pan, 0.14 * brillo);
  tronco(ctx, 1062, 568, 96, 40, 0.05, 8);
  panellus(ctx, 1078, 570, 0.34, -0.2, brillo * resp, 0.04, 2); panellus(ctx, 1108, 566, 0.42, 0.05, brillo * resp, 0.04, 3); panellus(ctx, 1138, 572, 0.3, 0.3, brillo * resp, 0.04, 5);
  frasco(ctx, 1110, 622, 132, 150, 0.9);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rgba(LUZC.pan, 0.05 * brillo); ctx.fillRect(946, 622, 328, 22); ctx.restore();
}
// Colonias brillantes en caja Petri (bacterias): trazos de siembra por estría.
function colonias(ctx, x, y, r, luz, color = LUZC.bact, seed = 4, avance = 1) {
  const R = rng(seed); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r * 0.93, 0, TAU); ctx.clip();
  for (let k = 0; k < 4; k++) { const a0 = k * 1.35 + 0.4, n = 46 - k * 9;
    for (let i = 0; i < n; i++) { if (i / n > avance) break; const u = i / n, px = x + Math.cos(a0) * r * 0.62 + Math.cos(a0 + 2.1) * (u - 0.5) * r * 0.9 + Math.sin(u * 26) * r * 0.16 * Math.cos(a0), py = y + Math.sin(a0) * r * 0.62 + Math.sin(a0 + 2.1) * (u - 0.5) * r * 0.9 + Math.sin(u * 26) * r * 0.16 * Math.sin(a0);
      const s = (3 + R() * 6) * (1 - k * 0.12) * r / 300; ctx.fillStyle = mixc('#2a3442', '#d9fffd', luz * 0.9); ctx.beginPath(); ctx.arc(px, py, s, 0, TAU); ctx.fill(); if (luz > 0.01) halo(ctx, px, py, s * 5.5, color, 0.6 * luz); } }
  ctx.restore();
}
// Emblemas pequeños de los cinco candidatos (para el gancho, el resumen y el cierre).
function emblema(ctx, cual, x, y, s, luz, T) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (cual === 'alga') { const f = luz * (0.55 + 0.45 * Math.pow(0.5 + 0.5 * Math.sin(T * 2.6), 6)); dino(ctx, -6, 22, 0.95, -0.25, f, 0, 3); dino(ctx, 30, 66, 0.5, 0.5, f * 0.8, 0, 5); }
  else if (cual === 'hongo') { tronco(ctx, -110, 30, 220, 60, 0.03, 5); panellus(ctx, -40, 34, 0.95, -0.1, luz, 0.03, 2); panellus(ctx, 34, 36, 0.75, 0.2, luz, 0.03, 4); }
  else if (cual === 'bact') { petri(ctx, 0, 30, 96); colonias(ctx, 0, 30, 96, luz, LUZC.bact, 9); }
  else if (cual === 'petunia') { petunia(ctx, 0, 110, 0.42, luz, 0.04, T); }
  else { const f = luz * Math.pow(0.5 + 0.5 * Math.sin(T * 1.9 + 1), 3); luciernaga(ctx, 0, 20, 0.85, 0.2, f, 0); }
  ctx.restore();
}

/* ====== 00 · Gancho ====== */
// Los cinco candidatos en fila. Abre el documental y regresa en el cierre (misma imagen, ya transformada).
function cincoLuces(ctx, e, o = {}) {
  const E = [['alga', 'ALGAS', LUZC.dino], ['hongo', 'HONGOS', LUZC.pan], ['bact', 'BACTERIAS', LUZC.bact], ['petunia', 'UNA PLANTA', LUZC.pet], ['luci', 'LUCIÉRNAGAS', LUZC.luc]];
  const y0 = o.y ?? 560, s = o.s ?? 1.25, A = o.a ?? 1;
  E.forEach(([k, n, c], i) => { const a = (o.entra === false ? 1 : eo(e.tl, i * 0.14, 0.55 + i * 0.14)) * A, x = 280 + i * 340, vuela = i === 4 ? (o.vuela || 0) : 0, y = y0 - vuela * 190 + Math.sin(e.T * 0.8 + i) * 6;
    ctx.save(); ctx.globalAlpha = a; emblema(ctx, k, x + vuela * 70, y, s, a * (o.luz ?? 1), e.T); ctx.restore();
    if (o.nombres !== false) txt(ctx, n, x, y0 + 260 * s / 1.25, { s: 24, f: 'mono', w: 700, ls: 5, al: 'center', c, a: a * (i === 4 ? 1 - 0.6 * vuela : 1) });
    if (o.duda) { const duda = o.duda(i) * (i === 4 ? 1 - vuela : 1); ctx.save(); ctx.globalAlpha = duda; ctx.strokeStyle = 'rgba(220,230,250,.5)'; ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.arc(x, y0 + 318, 20, e.T * 0.6, e.T * 0.6 + TAU); ctx.stroke(); ctx.restore(); txt(ctx, '?', x, y0 + 328, { s: 30, f: 'serif', w: 500, al: 'center', a: duda }); } });
}
LUZ.cinco = (ctx, e) => {
  noche(ctx, '#04060b', '#080d18'); polvo(ctx, 26, 5, e.T, '#7f95c0', 0.35);
  cincoLuces(ctx, e, { vuela: en(e, 3, 3.5), duda: (i) => en(e, 2, 0.6, i * 0.18) });
};

/* ====== 01 · Luz sin calor ====== */
LUZ.foco = (ctx, e) => {
  noche(ctx, '#07060a', '#0c0a10');
  const calor = ss(e.tl, e.L(1), e.L(1) + 2.4) * (1 - 0.55 * en(e, 3, 1.5));
  foco(ctx, 520, 430, 1.25, calor);
  termometro(ctx, 860, 640, 330, 0.12 + 0.86 * calor, mixc('#5a6a8a', '#ff5a3a', calor), ss(e.tl, e.L(1), e.L(1) + 0.8));
  txt(ctx, 'CALOR', 860, 740, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: LUZC.calor, a: ss(e.tl, e.L(1) + 0.6, e.L(1) + 1.4) });
  // la célula: con calor se dañaría; con química brilla en frío
  const ac = en(e, 2, 0.8), frio = en(e, 3, 1.2), sufre = ac * (1 - frio), x = 1380, y = 470, T = e.T;
  ctx.save(); ctx.globalAlpha = ac; ctx.beginPath(); for (let i = 0; i <= 60; i++) { const an = i / 60 * TAU, rr = 150 * (1 + 0.03 * Math.sin(an * 5 + T * 2) + sufre * 0.06 * Math.sin(an * 11 + T * 9)); i ? ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr) : ctx.moveTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); }
  ctx.fillStyle = mixc('#14202c', '#3a1c16', sufre * calor); ctx.fill(); ctx.strokeStyle = mixc('#8fb4d8', '#ff8a6a', sufre * calor); ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = 'rgba(160,190,230,.25)'; ctx.beginPath(); ctx.ellipse(x - 30, y + 10, 46, 38, 0.3, 0, TAU); ctx.fill(); ctx.restore();
  halo(ctx, x + 30, y - 20, 240, LUZC.bact, 0.55 * frio * (0.85 + 0.15 * Math.sin(T * 2))); halo(ctx, x + 30, y - 20, 60, '#ffffff', 0.5 * frio);
  rotulo(ctx, 1210, 720, 'Un ser vivo', sufre > 0.3 ? 'CON ESE CALOR SE COCINARÍA' : 'REACCIÓN QUÍMICA · LUZ FRÍA', ac, { c: sufre > 0.3 ? LUZC.rojo : LUZC.bact });
  rotulo(ctx, 330, 780, 'Un foco viejo', 'LUZ POR CALOR', ss(e.tl, e.L(1) + 0.3, e.L(1) + 1.1), { c: LUZC.calor });
};
LUZ.reaccion = (ctx, e) => {
  noche(ctx, '#05080d', '#08101a'); polvo(ctx, 20, 8, e.T, '#6f8ab8', 0.3);
  const junta = en(e, 3, 1.6), suelta = en(e, 4, 0.5), T = e.T, vib = junta * (1 - suelta) * Math.sin(T * 34) * 4;
  // luciferasa: enzima con hueco
  const aE = en(e, 1, 0.9), ex = mixn(1500, 1090, eo(e.tl, e.L(1), e.L(1) + 1.4)) - junta * 50, ey = 480;
  ctx.save(); ctx.globalAlpha = aE; ctx.translate(ex, ey); ctx.fillStyle = '#243656'; ctx.strokeStyle = '#7fa2d8'; ctx.lineWidth = 3;
  ctx.beginPath(); for (let i = 0; i <= 80; i++) { const an = 0.55 + (i / 80) * (TAU - 1.1) + Math.PI, rr = 190 * (1 + 0.05 * Math.sin(an * 4) + 0.03 * Math.sin(an * 9 + T)); ctx.lineTo(Math.cos(an) * rr, Math.sin(an) * rr); } ctx.quadraticCurveTo(-40, 0, Math.cos(0.55 + Math.PI) * 190, Math.sin(0.55 + Math.PI) * 190); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
  rotulo(ctx, 1330, 790, 'Luciferasa', 'LA ENZIMA: ACELERA', aE * (1 - 0.2 * junta), { c: '#7fa2d8' });
  // luciferina
  const aL = en(e, 0, 0.9), lx = mixn(mixn(200, 560, eo(e.tl, 0.1, 1.6)), ex - 150, junta) + vib, ly = mixn(470, ey, junta) + Math.sin(T * 1.2) * 8 * (1 - junta);
  if (junta > 0.5) halo(ctx, lx, ly, 240 + 60 * Math.sin(T * 20), LUZC.oro, 0.35 * junta * (1 - suelta));
  molecula(ctx, lx, ly, 1.05, mixc('#e9e2c9', '#ffe7a0', junta), 2, aL, 0.12 * Math.sin(T * 0.7) * (1 - junta));
  rotulo(ctx, 330, 790, 'Luciferina', 'LA MOLÉCULA: SE GASTA', aL * (1 - 0.2 * junta));
  // oxígeno
  const aO = en(e, 2, 0.7), ox = mixn(mixn(820, 800, eo(e.tl, e.L(2), e.L(2) + 1)), ex - 190, junta) + vib, oy = mixn(mixn(120, 250, eo(e.tl, e.L(2), e.L(2) + 1)), ey - 96, junta);
  ctx.save(); ctx.globalAlpha = aO * (1 - suelta); ctx.fillStyle = '#d8584a'; ctx.strokeStyle = '#ff9a8a'; ctx.lineWidth = 2; for (const d of [-1, 1]) { ctx.beginPath(); ctx.arc(ox + d * 22, oy, 26, 0, TAU); ctx.fill(); ctx.stroke(); } ctx.restore();
  txt(ctx, 'O₂', ox + 70, oy + 12, { s: 40, f: 'serif', w: 500, a: aO * (1 - junta) });
  txt(ctx, 'energía de sobra', lx - 10, ly - 130, { s: 44, f: 'mano', w: 700, al: 'center', c: LUZC.oro, a: junta * (1 - suelta) });
  // el fotón: onda que sale
  if (suelta > 0) { const k = eo(e.tl, e.L(4), e.L(4) + 2.6), px = mixn(lx, 1840, k), py = mixn(ly, 150, k); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = rgba(LUZC.bact, 0.9); ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath();
    for (let i = 0; i <= 60; i++) { const u = i / 60, qx = mixn(lx, px, u), qy = mixn(ly, py, u), w = Math.sin(u * 40 - T * 16) * 16 * Math.sin(u * Math.PI) * (0.4 + 0.6 * u); const nx = (ly - py), ny = (px - lx), nn = Math.hypot(nx, ny) || 1; i ? ctx.lineTo(qx + nx / nn * w, qy + ny / nn * w) : ctx.moveTo(qx, qy); } ctx.stroke(); ctx.restore();
    halo(ctx, px, py, 150, LUZC.bact, 1 - 0.5 * k); halo(ctx, px, py, 40, '#ffffff', 1); halo(ctx, lx, ly, 420 * (1 - k), LUZC.bact, 0.5 * (1 - k));
    chip(ctx, 'FOTÓN · LUZ FRÍA', 1500, 250, { c: LUZC.bact, a: ss(e.tl, e.L(4) + 1.2, e.L(4) + 2) }); }
  esquema(ctx);
};
LUZ.noes = (ctx, e) => {
  noche(ctx, '#05070c', '#090c14'); const T = e.T, fuera = en(e, 2, 1);
  // medusa con proteína verde fluorescente: solo brilla mientras le llega luz azul
  const ciclo = (e.tl % 4.2) / 4.2, lamp = e.tl < e.L(2) ? ss(ciclo, 0.12, 0.2) * (1 - ss(ciclo, 0.7, 0.78)) : 0;
  ctx.save(); ctx.globalAlpha = 1 - 0.75 * fuera;
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(60,110,255,${0.16 * lamp})`; ctx.beginPath(); ctx.moveTo(530, 170); ctx.lineTo(590, 170); ctx.lineTo(820, 760); ctx.lineTo(300, 760); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#2a3142'; ctx.fillRect(510, 140, 100, 34); txt(ctx, 'LÁMPARA AZUL', 640, 164, { s: 18, f: 'mono', w: 700, ls: 3, al: 'left', c: '#7f9cff', a: 0.9 });
  const mx = 560, my = 450 + Math.sin(T * 0.9) * 10, gl = lamp; if (gl > 0.02) halo(ctx, mx, my, 260, '#4cff7a', 0.5 * gl);
  ctx.fillStyle = mixc('#1b2434', '#7dffa0', gl * 0.8); ctx.strokeStyle = mixc('#5a6f92', '#c9ffd6', gl); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(mx - 120, my + 30); ctx.quadraticCurveTo(mx - 120, my - 110, mx, my - 110); ctx.quadraticCurveTo(mx + 120, my - 110, mx + 120, my + 30); ctx.quadraticCurveTo(mx, my + 5, mx - 120, my + 30); ctx.fill(); ctx.stroke();
  ctx.lineWidth = 2.5; ctx.lineCap = 'round'; for (let i = 0; i < 9; i++) { const x0 = mx - 100 + i * 25; ctx.beginPath(); ctx.moveTo(x0, my + 22); for (let k = 1; k <= 10; k++) ctx.lineTo(x0 + Math.sin(T * 1.6 + i + k * 0.7) * 9, my + 22 + k * 22); ctx.stroke(); }
  rotulo(ctx, 350, 800, 'Fluorescencia', 'NECESITA LUZ PRESTADA', en(e, 0, 0.8, 0.6), { c: '#4cff7a' });
  ctx.restore();
  // estrellita del techo: guarda luz y la va soltando
  const a1 = en(e, 1, 0.8), t1 = e.tl - (e.L(1) ?? 99), carga = ss(t1, 0.4, 1.2) * (1 - ss(t1, 2.0, 2.4)), brilla = ss(t1, 0.6, 1.4) * Math.exp(-Math.max(0, t1 - 2.2) * 0.35);
  ctx.save(); ctx.globalAlpha = a1 * (1 - 0.75 * fuera);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(255,230,170,${0.14 * carga})`; ctx.beginPath(); ctx.moveTo(1430, 170); ctx.lineTo(1490, 170); ctx.lineTo(1700, 760); ctx.lineTo(1220, 760); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#2a3142'; ctx.fillRect(1410, 140, 100, 34); txt(ctx, 'FOCO', 1540, 164, { s: 18, f: 'mono', w: 700, ls: 3, al: 'left', c: LUZC.calor, a: 0.9 });
  if (brilla > 0.02) halo(ctx, 1460, 440, 280, '#c9f08a', 0.55 * brilla);
  ctx.translate(1460, 440); ctx.rotate(0.2); ctx.fillStyle = mixc('#1c2230', '#e6ffb0', brilla); ctx.beginPath(); for (let k = 0; k < 10; k++) { const an = k / 10 * TAU - Math.PI / 2, rr = k % 2 ? 56 : 128; k ? ctx.lineTo(Math.cos(an) * rr, Math.sin(an) * rr) : ctx.moveTo(Math.cos(an) * rr, Math.sin(an) * rr); } ctx.closePath(); ctx.fill(); ctx.restore();
  rotulo(ctx, 1250, 800, 'Fosforescencia', 'GUARDA LUZ Y LA SUELTA', a1 * (1 - 0.75 * fuera), { c: '#c9f08a' });
  // bioluminiscencia: fabrica la suya
  if (fuera > 0) { const p = 0.85 + 0.15 * Math.sin(T * 1.6); halo(ctx, 960, 400, 380 * fuera, LUZC.pan, 0.5 * fuera * p); halo(ctx, 960, 400, 70, '#ffffff', 0.6 * fuera);
    titulo(ctx, 'Bioluminiscencia', 960, 600, en(e, 2, 0.9, 0.3)); txt(ctx, 'FABRICA SU PROPIA LUZ', 960, 660, { s: 26, f: 'mono', w: 700, ls: 8, al: 'center', c: LUZC.pan, a: en(e, 2, 0.9, 0.8) }); }
};
LUZ.colores = (ctx, e) => {
  noche(ctx, '#04060a', '#070a12'); const x0 = 240, x1 = 1680, y = 600, nm = (v) => mixn(x0, x1, (v - 440) / 160);
  const g = ctx.createLinearGradient(x0, 0, x1, 0); [['#2b2bff', 0], ['#0066ff', 0.16], ['#00b4ff', 0.25], ['#00e5c8', 0.34], ['#2bff5a', 0.5], ['#9dff2a', 0.66], ['#f0f02a', 0.82], ['#ffb02a', 1]].forEach(([c, s]) => g.addColorStop(s, c));
  const a = ss(e.tl, 0.2, 1.4); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x0, y - 9, (x1 - x0) * a, 18, 9); ctx.fill(); ctx.restore();
  for (let v = 450; v <= 600; v += 25) { txt(ctx, v + '', nm(v), y + 62, { s: 20, f: 'mono', w: 700, al: 'center', c: '#8fa0bd', a }); ctx.fillStyle = `rgba(143,160,189,${a})`; ctx.fillRect(nm(v) - 1, y + 14, 2, 16); }
  txt(ctx, 'LONGITUD DE ONDA DE LA LUZ, EN NANÓMETROS (nm)', 960, y + 120, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: '#8fa0bd', a });
  const P = [[475, 'Algas', '*Pyrocystis*', LUZC.dino, 0], [490, 'Bacterias', '*Aliivibrio fischeri*', LUZC.bact, 1], [525, 'Hongos', '*Panellus stipticus*', LUZC.pan, 0], [557, 'Luciérnagas', '*Photinus pyralis*', LUZC.luc, 1]];
  P.forEach(([v, n, sp, c, alt], i) => { const t0 = 1.3 + i * 0.85, k = eo(e.tl, t0, t0 + 0.9), x = nm(v), yy = y - 130 - alt * 150;
    halo(ctx, x, y, 110 * k, c, 0.9 * k); halo(ctx, x, y, 26, '#fff', 0.8 * k); guia(ctx, x, y - 14, x, yy + 52, k, c);
    rico(ctx, n, x, yy, { s: 42, f: 'serif', w: 500, al: 'center', a: k }); rico(ctx, sp, x, yy + 34, { s: 24, al: 'center', c: '#c9d2e3', a: k }); chip(ctx, '≈ ' + v + ' nm', x, yy - 62, { c, al: 'center', a: k }); });
  titulo(ctx, 'Cada grupo, su color', 960, 170, ss(e.tl, 0.6, 1.6), { s: 70 });
};

/* ====== 02 · Hongos ====== */
LUZ.panellus = (ctx, e) => {
  const dia = 1 - ss(e.tl, (e.L(1) ?? 3) + 1.2, (e.L(1) ?? 3) + 4.4);
  const g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, mixc('#04070b', '#7fa487', dia)); g.addColorStop(1, mixc('#030405', '#2e4a35', dia)); ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080);
  const fin = cam(ctx, 1.02 + 0.1 * e.p, 960 + 30 * e.p, 560);
  ctx.fillStyle = mixc('#030504', '#22382a', dia); for (let i = 0; i < 9; i++) ctx.fillRect(120 + i * 220 + (i % 2) * 40, -100, 46 + (i % 3) * 30, 760);
  ctx.fillStyle = mixc('#040504', '#3a3324', dia); ctx.fillRect(-100, 720, 2200, 500);
  tronco(ctx, 180, 520, 1560, 250, dia, 3);
  const R = rng(17), br = 1 - dia;
  for (let i = 0; i < 15; i++) { const x = 330 + R() * 1260, y = 540 + R() * 60, s = 0.75 + R() * 0.85; panellus(ctx, x, y, s, (R() - 0.5) * 0.5, br * (0.8 + 0.2 * Math.sin(e.T * 1.1 + i)), dia, i + 2); }
  halo(ctx, 960, 520, 900, LUZC.pan, 0.12 * br);
  // barra de escala
  const a = en(e, 1, 0.8, 0.5); ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(1420, 470); ctx.lineTo(1540, 470); ctx.moveTo(1420, 460); ctx.lineTo(1420, 480); ctx.moveTo(1540, 460); ctx.lineTo(1540, 480); ctx.stroke(); ctx.restore(); txt(ctx, '1 cm', 1480, 452, { s: 24, f: 'mono', w: 700, al: 'center', a });
  fin();
  rotulo(ctx, 150, 250, '*Panellus stipticus*', 'SOBRE MADERA MUERTA · 0.5 A 2 CM', en(e, 1, 0.9), { c: LUZC.pan });
};
LUZ.cepas = (ctx, e) => {
  noche(ctx, '#04070a', '#070d0c'); const T = e.T, on = en(e, 1, 1.4);
  for (const [x, luz] of [[560, on], [1360, 0]]) { tronco(ctx, x - 250, 450, 500, 130, 0.06, x); for (const [dx, s, r, sd] of [[-110, 1.5, -0.2, 2], [20, 1.9, 0.05, 3], [140, 1.3, 0.25, 4]]) panellus(ctx, x + dx, 470, s, r, luz * (0.85 + 0.15 * Math.sin(T * 1.2 + dx)), 0.07 + 0.12 * (1 - on), sd); }
  txt(ctx, 'POR FUERA, IGUALES', 960, 250, { s: 24, f: 'mono', w: 700, ls: 8, al: 'center', c: '#c9d2e3', a: ss(e.tl, 0.4, 1.2) * (1 - en(e, 4, 0.5)) });
  chip(ctx, 'ESTE DE ESTADOS UNIDOS', 560, 660, { c: LUZC.pan, al: 'center', a: en(e, 2) });
  ['NOROESTE DEL PACÍFICO', 'JAPÓN', 'RUSIA', 'NUEVA ZELANDA'].forEach((n, i) => chip(ctx, n, 1360 + (i % 2 ? 170 : -170) * (i ? 1 : 0) + (i === 0 ? 0 : 0), 660 + Math.ceil(i / 2) * 58, { c: '#8fa0bd', al: 'center', a: en(e, 3, 0.6, i * 0.35) }));
  // genes: tira completa contra tira con huecos
  const ag = en(e, 4, 0.9);
  for (const [x, comp] of [[560, 1], [1360, 0]]) for (let i = 0; i < 8; i++) { const falta = !comp && (i === 2 || i === 3 || i === 5), k = en(e, 4, 0.5, 0.2 + i * 0.12); ctx.save(); ctx.globalAlpha = k; const bx = x - 228 + i * 58, by = 210;
    if (falta) { ctx.setLineDash([6, 6]); ctx.strokeStyle = '#ff5a4a'; ctx.lineWidth = 2; ctx.strokeRect(bx, by, 48, 26); } else { ctx.fillStyle = comp ? rgba(LUZC.pan, 0.85) : '#8fa0bd'; ctx.beginPath(); ctx.roundRect(bx, by, 48, 26, 5); ctx.fill(); } ctx.restore(); }
  txt(ctx, 'GENES PARA HACER LUZ', 560, 180, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: LUZC.pan, a: ag }); txt(ctx, 'LE FALTAN GENES CLAVE', 1360, 180, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: LUZC.rojo, a: ag });
  chip(ctx, 'ESTUDIO DE 2025 · UNA CEPA QUE NO BRILLA', 960, 120, { c: LUZC.oro, al: 'center', a: en(e, 4, 0.8, 1.2) });
  titulo(ctx, '¿De dónde viene la cepa?', 960, 850, en(e, 5, 0.9), { s: 64 });
};
LUZ.micelio = (ctx, e) => {
  noche(ctx, '#040605', '#060a07');
  const fin = cam(ctx, 1.0 + 0.08 * e.p, 960, 560);
  // madera en corte: el micelio vive adentro
  ctx.fillStyle = '#120d09'; ctx.beginPath(); ctx.roundRect(120, 430, 1680, 470, 30); ctx.fill(); ctx.save(); ctx.clip();
  ctx.strokeStyle = 'rgba(60,42,28,.5)'; ctx.lineWidth = 2; const R = rng(5); for (let i = 0; i < 60; i++) { const y = 440 + R() * 450; ctx.beginPath(); ctx.moveTo(120, y); ctx.bezierCurveTo(600, y + (R() - 0.5) * 30, 1300, y + (R() - 0.5) * 30, 1800, y + (R() - 0.5) * 20); ctx.stroke(); }
  const segs = red('mic', { seed: 21, brotes: 7, ang0: 0, abre: 2.0, sesgo: 0, paso: 11, celda: 15, rama: 0.07, max: 15000, acepta: (x, y) => x > -20 && x < 1560 && y > -205 && y < 215 });
  ctx.translate(190, 665); pintaRed(ctx, segs, eo(e.tl, 0.2, (e.L(1) ?? 8) + 1.5), LUZC.pan, { a: 0.9 }); ctx.restore();
  // una sola seta: de brote a madura, cada vez más brillante
  const cre = ss(e.tl, (e.L(1) ?? 8), (e.L(1) ?? 8) + 5.5), s = mixn(0.35, 2.3, cre);
  panellus(ctx, 1240, 440, s, 0.02, mixn(0.08, 1, cre), 0.03, 3);
  fin();
  const am = en(e, 1, 0.8); ctx.save(); ctx.globalAlpha = am; ctx.strokeStyle = 'rgba(220,230,250,.5)'; ctx.lineWidth = 2; ctx.strokeRect(1560, 150, 40, 250); ctx.fillStyle = LUZC.pan; ctx.fillRect(1564, 396 - 242 * mixn(0.04, 1, cre), 32, 242 * mixn(0.04, 1, cre)); ctx.restore(); halo(ctx, 1580, 396 - 242 * cre, 60, LUZC.pan, am * cre);
  txt(ctx, '×10 a ×50', 1620, 200, { s: 58, f: 'serif', w: 500, a: en(e, 1, 0.8, 2.4) }); txt(ctx, 'UNA SOLA SETA,', 1620, 250, { s: 20, f: 'mono', w: 700, ls: 3, c: LUZC.pan, a: en(e, 1, 0.8, 2.4) }); txt(ctx, 'DE BROTE A MADURA', 1620, 280, { s: 20, f: 'mono', w: 700, ls: 3, c: LUZC.pan, a: en(e, 1, 0.8, 2.4) });
  rotulo(ctx, 170, 330, 'Micelio', 'LA RED DE HILOS: TAMBIÉN BRILLA', ss(e.tl, 2, 3), { c: LUZC.pan });
  chip(ctx, '≈ 525 nm · VERDE', 960, 180, { c: LUZC.pan, al: 'center', s: 30, a: en(e, 2, 0.8) });
};
LUZ.ruta = (ctx, e) => {
  noche(ctx, '#04070a', '#070c10'); const T = e.T, P = [[380, 'Ácido cafeico', 'MUY COMÚN EN PLANTAS Y HONGOS', '#e9e2c9', 1], [960, 'Hispidina', 'PASO INTERMEDIO', '#c9e9b0', 2], [1540, 'Luciferina', 'LA QUE DA LA LUZ', LUZC.pan, 2]];
  P.forEach(([x, n, s, c, an], i) => { const t0 = (e.L(1) ?? 2.6) + i * 1.5 - (i ? 0 : 0.3), a = ss(e.tl, t0, t0 + 0.8); if (i === 2) halo(ctx, x, 440, 330, LUZC.pan, 0.4 * a * (0.85 + 0.15 * Math.sin(T * 1.8)));
    molecula(ctx, x, 440 + Math.sin(T + i) * 6, 1.25, c, an, a, 0.08 * Math.sin(T * 0.6 + i)); rico(ctx, n, x, 640, { s: 50, f: 'serif', w: 500, al: 'center', a }); txt(ctx, s, x, 684, { s: 19, f: 'mono', w: 700, ls: 3, al: 'center', c: i === 2 ? LUZC.pan : '#8fa0bd', a });
    if (i < 2) flecha(ctx, x + 190, 440, x + 390, 440, ss(e.tl, t0 + 0.8, t0 + 1.5), '#c9d2e3'); });
  titulo(ctx, '¿Cómo lo hace?', 960, 210, ss(e.tl, 0.1, 0.9) * (1 - 0.0), { s: 72 });
  chip(ctx, 'RUTA DESCIFRADA EN 2018', 960, 800, { c: LUZC.oro, al: 'center', s: 26, a: en(e, 2, 0.8) }); esquema(ctx);
};
LUZ.ojo = (ctx, e) => {
  ctx.fillStyle = '#020304'; ctx.fillRect(0, 0, 1920, 1080);
  // lo que ve el ojo conforme se adapta: de casi nada a un brillo tenue (nunca una lámpara)
  const ad = ss(e.tl, (e.L(3) ?? 9), e.dur - 0.5), ver = 0.05 + 0.2 * ss(e.tl, 0, e.L(3) ?? 9) + 0.75 * ad;
  const fin = cam(ctx, 1.25, 1110, 560); ctx.save(); ctx.globalAlpha = 0.25 + 0.75 * ad; recamara(ctx, e.T, ver * 0.9, 0, 0.12); ctx.restore(); fin();
  oscurece(ctx, 0.55 * (1 - ad));
  // pupila que se abre
  const px = 330, py = 420, ap = mixn(18, 62, ad), a = ss(e.tl, 0.4, 1.4); ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(220,230,250,.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px - 150, py); ctx.quadraticCurveTo(px, py - 110, px + 150, py); ctx.quadraticCurveTo(px, py + 110, px - 150, py); ctx.stroke(); ctx.fillStyle = '#3a4a66'; ctx.beginPath(); ctx.arc(px, py, 76, 0, TAU); ctx.fill(); ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(px, py, ap, 0, TAU); ctx.fill(); ctx.restore();
  txt(ctx, 'TUS OJOS, ADAPTÁNDOSE', px, 590, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: '#8fa0bd', a }); ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(220,230,250,.4)'; ctx.lineWidth = 2; ctx.strokeRect(px - 150, 620, 300, 12); ctx.fillStyle = LUZC.pan; ctx.fillRect(px - 148, 622, 296 * ad, 8); ctx.restore(); txt(ctx, 'unos minutos', px, 680, { s: 40, f: 'mano', w: 700, al: 'center', a: a * ss(e.tl, (e.L(3) ?? 9), (e.L(3) ?? 9) + 1) });
  titulo(ctx, 'Una luz débil', 330, 250, en(e, 1, 0.9), { s: 64 });
};
LUZ.mycena = (ctx, e) => {
  noche(ctx, '#030605', '#050b08'); const T = e.T, fin = cam(ctx, 1.0 + 0.1 * e.p, 960, 560);
  tronco(ctx, 240, 640, 1440, 190, 0.05, 12); const R = rng(31), br = ss(e.tl, 0.2, 1.6);
  for (let i = 0; i < 11; i++) { const x = 420 + i * 108 + (R() - 0.5) * 50, s = 1.1 + R() * 1.3; mycena(ctx, x, 660 + R() * 20, s, br * (0.8 + 0.2 * Math.sin(T * 1.3 + i)), i + 1); }
  halo(ctx, 960, 480, 900, LUZC.myc, 0.1 * br);
  // vitrina de museo
  const v = en(e, 1, 1.2, 3); ctx.save(); ctx.globalAlpha = v; ctx.strokeStyle = 'rgba(210,225,245,.45)'; ctx.lineWidth = 3; ctx.strokeRect(300, 250, 1320, 620); ctx.fillStyle = 'rgba(180,200,230,.03)'; ctx.fillRect(300, 250, 1320, 620); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(340, 300); ctx.lineTo(340, 520); ctx.stroke(); ctx.fillStyle = '#12151c'; ctx.fillRect(280, 870, 1360, 40); ctx.restore();
  fin();
  rotulo(ctx, 150, 200, '*Mycena chlorophos*', 'ASIA Y EL PACÍFICO · BRILLA EN SUS SETAS', en(e, 1, 0.9), { c: LUZC.myc });
  chip(ctx, 'EN JAPÓN SE CULTIVA PARA EXHIBIRLO EN MUSEOS', 1740, 200, { c: LUZC.oro, al: 'right', a: en(e, 1, 0.8, 3.6) });
};
LUZ.armillaria = (ctx, e) => {
  noche(ctx, '#030506', '#05090a'); const fin = cam(ctx, 1.0 + 0.12 * e.p, 960, 560);
  // tronco podrido y abierto: bajo la corteza, abanicos de micelio que brillan
  tronco(ctx, 160, 420, 1600, 330, 0.05, 9); ctx.save(); ctx.beginPath(); ctx.moveTo(420, 440); ctx.bezierCurveTo(700, 400, 1200, 410, 1520, 450); ctx.lineTo(1480, 720); ctx.bezierCurveTo(1100, 760, 760, 750, 460, 715); ctx.closePath(); ctx.fillStyle = '#0e0b08'; ctx.fill(); ctx.clip();
  const g = eo(e.tl, 0.3, 5.5); for (const [x, y, a0, sd] of [[520, 590, 0, 51], [1460, 580, Math.PI, 52], [960, 730, -Math.PI / 2, 53]]) { ctx.save(); ctx.translate(x, y); pintaRed(ctx, red('arm' + sd, { seed: sd, brotes: 9, ang0: a0, abre: 1.7, sesgo: a0, paso: 7, rama: 0.11, max: 4200, acepta: (px, py) => Math.hypot(px, py) < 520 }), g, '#7dffb0', { a: 0.75 }); ctx.restore(); }
  ctx.restore(); halo(ctx, 960, 590, 800, '#7dffb0', 0.1 * g); fin();
  rotulo(ctx, 150, 240, '*Armillaria*', 'HACE BRILLAR LA MADERA PODRIDA', ss(e.tl, 0.6, 1.5), { c: '#7dffb0' });
  txt(ctx, '*foxfire*'.replace(/\*/g, ''), 1500, 250, { s: 120, f: 'serif', it: true, w: 400, al: 'center', a: ss(e.tl, 3.2, 4.2) }); txt(ctx, '«FUEGO DE ZORRO»', 1500, 310, { s: 24, f: 'mono', w: 700, ls: 6, al: 'center', c: '#7dffb0', a: ss(e.tl, 4, 5) });
};
LUZ.omphalotus = (ctx, e) => {
  const noc = en(e, 1, 1.6), comp = en(e, 2, 1.2), luz = mixn(0.75, 0.06, noc) * (1 - comp) + comp * 0.9;
  const g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, mixc('#05070a', '#3a4a52', luz * 0.6)); g.addColorStop(1, mixc('#030405', '#1f2a24', luz * 0.6)); ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080);
  const T = e.T, br = noc * (1 - comp);
  if (comp < 0.98) { ctx.save(); ctx.globalAlpha = 1 - comp; tronco(ctx, 380, 640, 1160, 200, luz, 7); [[700, 1.9, 1], [860, 2.5, 2], [1030, 2.1, 3], [1180, 1.6, 4], [790, 1.4, 5], [1100, 1.3, 6]].forEach(([x, s, sd]) => embudo(ctx, x, 690, s, 'omph', br * (0.85 + 0.15 * Math.sin(T + sd)), luz, sd)); ctx.restore(); }
  rotulo(ctx, 150, 240, '*Omphalotus*', 'EL HONGO CALABAZA', ss(e.tl, 0.4, 1.3) * (1 - comp), { c: '#ff9a3a' });
  sello(ctx, 'VENENOSO', 1480, 300, en(e, 1, 0.5, 1.8) * (1 - comp));
  if (comp > 0) { ctx.save(); ctx.globalAlpha = comp; embudo(ctx, 600, 700, 3.1, 'omph', 0, 0.95, 2); embudo(ctx, 1320, 700, 3.1, 'chant', 0, 0.95, 3); ctx.restore();
    rotulo(ctx, 420, 800, '*Omphalotus*', 'LÁMINAS FINAS Y APRETADAS', comp, { c: '#ff9a3a', s: 40 }); rotulo(ctx, 1140, 800, 'Chantarela', 'PLIEGUES ROMOS, QUE SE DIVIDEN', comp, { c: '#f0c63a', s: 40 });
    txt(ctx, 'SE CONFUNDEN', 960, 200, { s: 26, f: 'mono', w: 700, ls: 10, al: 'center', c: '#c9d2e3', a: comp * (1 - en(e, 3, 0.5)) }); sello(ctx, 'SE MIRA, NO SE COME', 960, 210, en(e, 3, 0.5, 0.2), LUZC.rojo, -0.03, 60); }
};
LUZ.v_hongo = (ctx, e) => {
  noche(ctx, '#04070a', '#070d0c'); petri(ctx, 580, 520, 330);
  ctx.save(); ctx.translate(580, 520); pintaRed(ctx, red('vh', { seed: 77, radio: 300, brotes: 8, max: 9000 }), eo(e.tl, 0, 6), LUZC.pan, {}); ctx.restore(); halo(ctx, 580, 520, 520, LUZC.pan, 0.14 * ss(e.tl, 0, 4));
  veredicto(ctx, e, 0, 'Buena idea,\ncon paciencia', '*Panellus* de cepa luminosa,\nen caja Petri o frasco cerrado', LUZC.pan);
};

/* ====== 03 · Bacterias ====== */
LUZ.calamar = (ctx, e) => {
  const T = e.T, g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, '#0a2038'); g.addColorStop(0.7, '#061222'); g.addColorStop(1, '#040a14'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080);
  const luna = 0.5 + 0.5 * en(e, 4, 1.2); halo(ctx, 1320, -40, 620, '#cfe0ff', 0.55 * luna);
  ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 7; i++) { const x = 900 + i * 130 + Math.sin(T * 0.3 + i) * 30; ctx.fillStyle = `rgba(150,190,255,${0.035 * luna})`; ctx.beginPath(); ctx.moveTo(x, -10); ctx.lineTo(x + 70, -10); ctx.lineTo(x - 260, 900); ctx.lineTo(x - 420, 900); ctx.closePath(); ctx.fill(); } ctx.restore();
  // arena
  ctx.fillStyle = '#16222e'; ctx.beginPath(); ctx.moveTo(0, 840); for (let x = 0; x <= 1920; x += 60) ctx.lineTo(x, 836 + Math.sin(x * 0.01) * 10); ctx.lineTo(1920, 1080); ctx.lineTo(0, 1080); ctx.fill(); const R = rng(8); ctx.fillStyle = 'rgba(160,190,220,.12)'; for (let i = 0; i < 160; i++) ctx.fillRect(R() * 1920, 846 + R() * 220, 2, 2);
  polvo(ctx, 34, 12, T, '#8fb4e0', 0.3);
  // bacterias libres en el agua (primeras frases)
  const ab = ss(e.tl, 0.2, 1.2) * (1 - en(e, 2, 1)); const Rb = rng(3); for (let i = 0; i < 40; i++) { const x = Rb() * 1920 + Math.sin(T * 0.4 + i) * 20, y = 120 + Rb() * 640 + Math.cos(T * 0.3 + i) * 14; ctx.save(); ctx.globalAlpha = ab; bacteria(ctx, x, y, 20, Rb() * 3 + T * 0.2, 0.05); ctx.restore(); }
  rotulo(ctx, 150, 250, '*Aliivibrio fischeri*', 'BACTERIA MARINA', en(e, 1, 0.9) * (1 - en(e, 2, 0.6)), { c: LUZC.bact });
  // calamar
  const ac = en(e, 2, 1.2), cx = mixn(2300, 960, eo(e.tl, e.L(2) ?? 99, (e.L(2) ?? 99) + 2.6)), cy = 430 + Math.sin(T * 0.8) * 12, vent = en(e, 5, 1.8);
  // sombra en la arena: la borra con su luz ventral
  const som = en(e, 4, 1.2) * (1 - 0.92 * vent); ctx.save(); ctx.globalAlpha = 0.55 * som; ctx.fillStyle = '#02050a'; ctx.beginPath(); ctx.ellipse(cx - 60, 880, 250, 34, 0, 0, TAU); ctx.fill(); ctx.restore();
  if (vent > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rgba(LUZC.bact, 0.07 * vent); ctx.beginPath(); ctx.moveTo(cx - 90, cy + 80); ctx.lineTo(cx + 110, cy + 80); ctx.lineTo(cx + 250, 900); ctx.lineTo(cx - 330, 900); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.globalAlpha = ac; calamar(ctx, cx, cy, 1.5, vent, T, 0.55); ctx.restore();
  rotulo(ctx, 150, 250, '*Euprymna scolopes*', 'CALAMAR DE HAWÁI', en(e, 2, 0.9, 1.2) * (1 - en(e, 4, 0.6)), { c: LUZC.oro });
  // lupa: el órgano de luz, con las bacterias adentro
  const lu = en(e, 3, 1) * (1 - en(e, 4, 0.8)); if (lu > 0) { const lx = 1480, ly = 420, lr = 210; guia(ctx, cx + 20, cy + 70, lx - lr * 0.72, ly + lr * 0.7, lu, LUZC.bact); ctx.save(); ctx.globalAlpha = lu; ctx.beginPath(); ctx.arc(lx, ly, lr, 0, TAU); ctx.fillStyle = '#04121a'; ctx.fill(); ctx.save(); ctx.clip(); const Rl = rng(6); for (let i = 0; i < 90; i++) bacteria(ctx, lx + (Rl() - 0.5) * 420 + Math.sin(T + i) * 5, ly + (Rl() - 0.5) * 420 + Math.cos(T * 0.8 + i) * 5, 30, Rl() * 3, 0.75 + 0.25 * Math.sin(T * 2 + i)); ctx.restore(); ctx.strokeStyle = 'rgba(220,235,255,.8)'; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); chip(ctx, 'ÓRGANO DE LUZ', lx, ly + lr + 44, { c: LUZC.bact, al: 'center', a: lu }); }
  txt(ctx, 'SIN SOMBRA', cx - 60, 965, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: LUZC.bact, a: 0 });
  chip(ctx, 'CAMUFLAJE CON LUZ', 960, 180, { c: LUZC.bact, al: 'center', s: 30, a: en(e, 6, 0.8) });
};
// Enjambre de bacterias con detección de quórum: n crece; el mensajero se acumula; al cruzar el umbral se encienden todas.
function enjambre(ctx, T, n, luz, msj, o = {}) {
  const R = rng(o.seed || 19), W = o.w || 1500, H = o.h || 720, x0 = o.x || 210, y0 = o.y || 140;
  const B = []; for (let i = 0; i < 300; i++) B.push([R(), R(), R(), R()]);
  if (msj > 0) { const Rm = rng(44); ctx.fillStyle = rgba(LUZC.oro, 0.75); for (let i = 0; i < Math.min(900, n * 3.2) * msj; i++) { const b = B[i % Math.max(1, Math.floor(n))], ph = (T * 0.25 + Rm()) % 1, an = Rm() * TAU, d = ph * 130; ctx.globalAlpha = (1 - ph) * 0.8; ctx.fillRect(x0 + b[0] * W + Math.cos(an) * d, y0 + b[1] * H + Math.sin(an) * d, 3.2, 3.2); } ctx.globalAlpha = 1; }
  for (let i = 0; i < Math.min(300, Math.floor(n)); i++) { const b = B[i], nace = cl(n - i); ctx.save(); ctx.globalAlpha = nace; bacteria(ctx, x0 + b[0] * W + Math.sin(T * 0.5 + i) * 12, y0 + b[1] * H + Math.cos(T * 0.4 + i * 2) * 10, o.len || 34, b[2] * 6 + Math.sin(T * 0.3 + i) * 0.4, luz * (0.85 + 0.15 * Math.sin(T * 3 + i))); ctx.restore(); }
}
LUZ.quorum = (ctx, e) => {
  noche(ctx, '#03090d', '#051218'); const T = e.T, tq = (e.L(4) ?? 14) + 2.4;
  const n = e.tl < (e.L(1) ?? 3) ? 1 + 0 : mixn(1, 6, ss(e.tl, e.L(1) ?? 3, e.L(2) ?? 6)) + 250 * Math.pow(ss(e.tl, (e.L(2) ?? 6) + 1, tq + 0.5), 2.2);
  const prende = ss(e.tl, tq, tq + 0.9), luz = 0.05 + 0.95 * prende, msj = en(e, 3, 1.2), nivel = cl(msj * ss(e.tl, e.L(3) ?? 9, tq) * 0.92 + 0.08 * prende);
  enjambre(ctx, T, n, luz, msj); halo(ctx, 960, 500, 1000, LUZC.bact, 0.16 * prende);
  // medidor del mensaje
  const am = msj; ctx.save(); ctx.globalAlpha = am; ctx.strokeStyle = 'rgba(220,230,250,.55)'; ctx.lineWidth = 3; ctx.strokeRect(1780, 200, 44, 520); ctx.fillStyle = rgba(LUZC.oro, 0.9); ctx.fillRect(1784, 716 - 512 * nivel, 36, 512 * nivel);
  ctx.strokeStyle = '#fff'; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.moveTo(1760, 716 - 512 * 0.9); ctx.lineTo(1844, 716 - 512 * 0.9); ctx.stroke(); ctx.restore();
  txt(ctx, 'QUÓRUM', 1750, 716 - 512 * 0.9 + 8, { s: 20, f: 'mono', w: 700, ls: 3, al: 'right', a: am }); txt(ctx, 'MENSAJE', 1802, 760, { s: 18, f: 'mono', w: 700, ls: 3, al: 'center', c: LUZC.oro, a: am }); txt(ctx, 'ACUMULADO', 1802, 786, { s: 18, f: 'mono', w: 700, ls: 3, al: 'center', c: LUZC.oro, a: am });
  rotulo(ctx, 150, 250, 'Una sola', 'CASI NO BRILLA', en(e, 1, 0.8) * (1 - en(e, 3, 0.6)), { c: '#8fa0bd' });
  chip(ctx, '1970 · «AUTOINDUCCIÓN»', 150, 200, { c: LUZC.oro, s: 26, a: en(e, 5, 0.8) * (1 - en(e, 6, 0.5)) });
  if (en(e, 6) > 0) { oscurece(ctx, 0.35 * en(e, 6) * (1 - en(e, 7, 0.6))); titulo(ctx, 'Detección de quórum', 960, 470, en(e, 6, 0.9) * (1 - en(e, 7, 0.6)), { s: 110 }); txt(ctx, 'SE CUENTAN ANTES DE GASTAR ENERGÍA', 960, 550, { s: 26, f: 'mono', w: 700, ls: 8, al: 'center', c: LUZC.bact, a: en(e, 6, 0.9, 1.2) * (1 - en(e, 7, 0.6)) }); }
  chip(ctx, '≈ 490 nm · AZUL VERDOSA', 960, 200, { c: LUZC.bact, al: 'center', s: 30, a: en(e, 7, 0.8) });
};
LUZ.riesgo = (ctx, e) => {
  noche(ctx, '#04080c', '#070d14'); const T = e.T, parte2 = en(e, 3, 1), parte3 = en(e, 5, 1), parte4 = en(e, 7, 1);
  // 1) caja con cepa conocida
  if (parte2 < 1) { ctx.save(); ctx.globalAlpha = 1 - parte2; petri(ctx, 620, 500, 290); colonias(ctx, 620, 500, 290, 0.9, LUZC.bact, 4); ctx.restore(); halo(ctx, 620, 500, 480, LUZC.bact, 0.14 * (1 - parte2));
    titulo(ctx, '¿Es segura?', 1330, 400, ss(e.tl, 0.1, 0.9) * (1 - parte2), { s: 84 }); chip(ctx, 'GRUPO DE RIESGO 1', 1330, 500, { c: '#3DFF7A', al: 'center', s: 32, a: en(e, 1, 0.8) * (1 - parte2) }); txt(ctx, 'EL DE MENOR RIESGO', 1330, 566, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: '#c9d2e3', a: en(e, 1, 0.8, 0.8) * (1 - parte2) }); txt(ctx, 'SEGÚN LAS COLECCIONES DE CULTIVOS', 1330, 600, { s: 18, f: 'mono', w: 700, ls: 4, al: 'center', c: '#8fa0bd', a: en(e, 1, 0.8, 1.2) * (1 - parte2) }); }
  // 2) el tutorial peligroso: marisco crudo
  if (parte2 > 0 && parte3 < 1) { ctx.save(); ctx.globalAlpha = parte2 * (1 - parte3); ctx.fillStyle = '#d9dde4'; ctx.beginPath(); ctx.ellipse(960, 600, 420, 110, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#b9bec8'; ctx.beginPath(); ctx.ellipse(960, 590, 330, 76, 0, 0, TAU); ctx.fill(); ctx.restore();
    ctx.save(); ctx.globalAlpha = parte2 * (1 - parte3); calamar(ctx, 990, 540, 1.25, 0, 0, 0.85); ctx.restore();
    txt(ctx, '«saca bacterias brillantes de un marisco crudo»', 960, 250, { s: 54, f: 'mano', w: 700, al: 'center', c: '#c9d2e3', a: parte2 * (1 - parte3) });
    tache(ctx, 960, 560, 230, en(e, 4, 0.6) * (1 - parte3)); sello(ctx, 'NO EN CASA', 470, 420, en(e, 4, 0.5, 0.3) * (1 - parte3)); }
  // 3) parientes que sí enferman
  if (parte3 > 0 && parte4 < 1) { const A = parte3 * (1 - parte4); [[520, '*Aliivibrio fischeri*', 'LA QUE BUSCAS', LUZC.bact, 0.9], [960, '*Vibrio vulnificus*', 'SÍ ENFERMA', LUZC.rojo, 0], [1400, '*Vibrio parahaemolyticus*', 'SÍ ENFERMA', LUZC.rojo, 0]].forEach(([x, n, s, c, lz], i) => { const k = en(e, 5, 0.7, i * 0.5) * (1 - parte4); ctx.save(); ctx.globalAlpha = k; bacteria(ctx, x, 440 + Math.sin(T + i) * 8, 190, -0.3 + i * 0.3, lz, c); if (!lz) { ctx.strokeStyle = rgba(LUZC.rojo, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, 440, 150, 0, TAU); ctx.stroke(); } ctx.restore(); rico(ctx, n, x, 660, { s: 38, al: 'center', a: k }); txt(ctx, s, x, 706, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c, a: k }); });
    txt(ctx, 'EN LOS MARISCOS CRUDOS VIVEN LAS TRES', 960, 200, { s: 24, f: 'mono', w: 700, ls: 6, al: 'center', c: '#c9d2e3', a: A }); titulo(ctx, '¿Cuál creció en tu caja?', 960, 850, en(e, 6, 0.8) * (1 - parte4), { s: 64 }); }
  // 4) lo responsable: cepa identificada
  if (parte4 > 0) { ctx.save(); ctx.globalAlpha = parte4; ctx.translate(700, 520); ctx.rotate(0.12); ctx.strokeStyle = 'rgba(210,225,245,.5)'; ctx.lineWidth = 3; ctx.fillStyle = 'rgba(120,150,190,.06)'; ctx.beginPath(); ctx.roundRect(-52, -250, 104, 480, [10, 10, 52, 52]); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#2a2d36'; ctx.fillRect(-58, -280, 116, 46); ctx.fillStyle = '#ece6d8'; ctx.fillRect(-46, -120, 92, 150); ctx.fillStyle = '#3a3d46'; for (let i = 0; i < 5; i++) ctx.fillRect(-36, -104 + i * 26, 50 + (i % 2) * 20, 6); ctx.restore(); halo(ctx, 716, 660, 170, LUZC.bact, 0.5 * parte4);
    rotulo(ctx, 980, 480, 'Cepa identificada', 'DE UNA COLECCIÓN O UN PROVEEDOR EDUCATIVO', parte4, { c: LUZC.bact, s: 58 }); chip(ctx, 'MEDIO: CALDO NUTRITIVO CON SAL', 1000, 620, { c: LUZC.oro, a: en(e, 8, 0.8) }); chip(ctx, 'TAMBIÉN SE VENDE YA PREPARADO', 1000, 680, { c: '#3DFF7A', a: en(e, 8, 0.8, 2.6) }); }
};
LUZ.v_bact = (ctx, e) => {
  noche(ctx, '#04090c', '#071016'); petri(ctx, 580, 520, 330); colonias(ctx, 580, 520, 330, ss(e.tl, 0, 2.5), LUZC.bact, 4, eo(e.tl, 0, 3)); halo(ctx, 580, 520, 540, LUZC.bact, 0.14 * ss(e.tl, 0, 3));
  veredicto(ctx, e, 1, 'Preciosa, pero ya\nes microbiología', 'Un experimento, no una mascota', LUZC.bact);
};
window.LZA = { recamara, colonias, emblema, enjambre, en, esquema, cincoLuces };
