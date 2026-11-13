// cine-luz-b.jsx — Documental 004 (papel contra plástico), capítulos 5 a 9: recubrimientos y PFAS, vasos, México, conclusión y cierre.
const { TAU, cl, pr, ss, eo, mixn, rng, rgba, mixc, FU, halo, noche, cam, txt, rico, chip, guia, sello, tache, flecha,
  TINTA, MARCA, fondoColor, franja, tinta, panel, fuenteDato, barra, barraH, balanza, bolsaPapel, bolsaPlastico, cajaCarton, arbol, fabrica, camion, pozo, mar, rellenoSanitario, vaso, popote, casa, bote, luzSem } = window.LZK;
const { en, esquema, E, et, num, miles, parr, estudio, colgante, bolsaTela, bascula15, IND, PAPEL_GANA, CLARO, BX, BY } = window.LZA;
const LUZ = window.LUZ;
const GRIS = '#b9c2d6';
const tp = (ctx, s, x, y, o = {}) => txt(ctx, s, x, y, { f: 'sans', w: 500, s: 26, c: CLARO, sombra: false, ...o }); // texto sobre panel oscuro
const tm = (ctx, s, x, y, o = {}) => txt(ctx, s, x, y, { f: 'mono', w: 700, s: 20, ls: 3, c: MARCA.oro, sombra: false, ...o });

// Charola de comida para llevar y caja de papas (esquema).
function charola(ctx, x, y, s, c = '#D9B98C', a = 1) { a = cl(a); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.beginPath(); ctx.ellipse(0, 4, 150, 12, 0, 0, TAU); ctx.fill(); ctx.fillStyle = mixc(c, '#000000', 0.18); ctx.beginPath(); ctx.moveTo(-150, -70); ctx.lineTo(150, -70); ctx.lineTo(120, 0); ctx.lineTo(-120, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = c; ctx.beginPath(); ctx.ellipse(0, -70, 150, 24, 0, 0, TAU); ctx.fill(); ctx.fillStyle = mixc(c, '#000000', 0.3); ctx.beginPath(); ctx.ellipse(0, -66, 128, 16, 0, 0, TAU); ctx.fill(); ctx.restore(); }
function papas(ctx, x, y, s, a = 1) { a = cl(a); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.beginPath(); ctx.ellipse(0, 4, 90, 10, 0, 0, TAU); ctx.fill(); const r = rng(8); ctx.fillStyle = '#F2C230'; for (let i = 0; i < 9; i++) { ctx.save(); ctx.translate(-60 + i * 15, -150); ctx.rotate((r() - 0.5) * 0.5); ctx.fillRect(-7, -70 - r() * 50, 14, 130); ctx.restore(); } ctx.fillStyle = '#E5352B'; ctx.beginPath(); ctx.moveTo(-80, -170); ctx.quadraticCurveTo(0, -130, 80, -170); ctx.lineTo(58, 0); ctx.lineTo(-58, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(-30, -100, 60, 44); ctx.restore(); }
function envoltura(ctx, x, y, s, a = 1) { a = cl(a); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = 'rgba(0,0,0,.15)'; ctx.beginPath(); ctx.ellipse(0, 4, 150, 12, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#F3EEDF'; ctx.beginPath(); ctx.moveTo(-170, 0); ctx.lineTo(-120, -90); ctx.lineTo(-40, -60); ctx.lineTo(30, -110); ctx.lineTo(130, -70); ctx.lineTo(170, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#C98A3A'; ctx.beginPath(); ctx.ellipse(0, -84, 96, 50, 0, Math.PI, TAU); ctx.fill(); ctx.fillStyle = '#6B3F1E'; ctx.fillRect(-96, -84, 192, 22); ctx.fillStyle = '#58B947'; ctx.fillRect(-100, -66, 200, 10); ctx.fillStyle = '#E8B25C'; ctx.beginPath(); ctx.roundRect(-96, -58, 192, 34, 12); ctx.fill(); ctx.fillStyle = '#F3EEDF'; ctx.beginPath(); ctx.moveTo(-170, 0); ctx.lineTo(-110, -44); ctx.lineTo(0, -20); ctx.lineTo(110, -46); ctx.lineTo(170, 0); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(229,53,43,.5)'; ctx.lineWidth = 3; for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(i * 40 - 10, -4); ctx.lineTo(i * 40 + 10, -26); ctx.stroke(); } ctx.restore(); }

/* ====== 05 · Lo que el papel trae pegado ====== */
LUZ.desechables = E('lila', (ctx, e) => {
  const y = 720, I = [[(a) => bolsaPapel(ctx, 230, y, 0.7, { a }), 'BOLSA', 230, 0.2], [(a) => cajaCarton(ctx, 500, y, 0.75, { a }), 'CAJA', 510, 0.6], [(a) => vaso(ctx, 780, y, 0.95, 'papel', { a }), 'VASO DE CAFÉ', 780, 0], [(a) => charola(ctx, 1060, y, 0.8, '#D9B98C', a), 'CHAROLA', 1060, 0.5], [(a) => papas(ctx, 1330, y, 0.95, a), 'CAJA DE PAPAS', 1330, 1], [(a) => popote(ctx, 1560, y, 250, 0.22, '#F3EEDF', { a, rayas: '#E5352B' }), 'POPOTE', 1590, 1.5]];
  I.forEach(([f, n, x, r], i) => { const a = i < 2 ? eo(e.tl, r, r + 0.7) : eo(e.tl, (e.L(1) ?? 4) + r, (e.L(1) ?? 4) + r + 0.7); ctx.save(); ctx.translate(0, (1 - a) * 50); f(a); ctx.restore(); et(ctx, n, x, y + 54, { al: 'center', s: 20, a }); });
  num(ctx, 'PAPEL Y CARTÓN DE UN SOLO USO', 960, 240, 92, { a: ss(e.tl, 0.2, 0.9) });
  // lupa sobre el vaso
  const a2 = en(e, 2, 0.8), lx = mixn(1100, 790, a2), ly = mixn(330, 560, a2); ctx.save(); ctx.globalAlpha = a2; ctx.strokeStyle = TINTA; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(lx, ly, 96, 0, TAU); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.22)'; ctx.fill(); ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx + 70, ly + 70); ctx.lineTo(lx + 150, ly + 150); ctx.stroke();
  ctx.beginPath(); ctx.arc(lx, ly, 90, 0, TAU); ctx.clip(); ctx.fillStyle = '#F7F3EA'; ctx.fillRect(lx - 100, ly - 100, 120, 200); ctx.fillStyle = '#7fd0ff'; ctx.fillRect(lx + 20, ly - 100, 12, 200); ctx.fillStyle = '#5a3a22'; ctx.fillRect(lx + 32, ly - 100, 80, 200); ctx.restore();
  et(ctx, '¿QUÉ HAY EN LA PARED DEL VASO?', 960, 330, { al: 'center', s: 24, a: a2 });
}, { piso: 720 });

// Corte de la pared del vaso (escena interna: fondo oscuro).
LUZ.corte_vaso = (ctx, e) => {
  noche(ctx, '#0b0d14', '#12141d'); const a0 = ss(e.tl, 0.2, 1), a1 = en(e, 1, 0.8), T = e.T;
  // capas, de izquierda (afuera) a derecha (café)
  const x0 = 130, w = 820, y0 = 200, h = 560; ctx.save(); ctx.globalAlpha = a0; ctx.beginPath(); ctx.roundRect(x0, y0, w, h, 18); ctx.clip();
  ctx.fillStyle = '#1a1d28'; ctx.fillRect(x0, y0, 150, h);
  ctx.fillStyle = '#E9DFC8'; ctx.fillRect(x0 + 150, y0, 380, h); const r = rng(12); ctx.strokeStyle = 'rgba(150,120,80,.55)'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let i = 0; i < 260; i++) { const fx = x0 + 150 + r() * 380, fy = y0 + r() * h, an = r() * TAU, l = 20 + r() * 50; ctx.beginPath(); ctx.moveTo(fx, fy); ctx.quadraticCurveTo(fx + Math.cos(an) * l * 0.5 + (r() - 0.5) * 20, fy + Math.sin(an) * l * 0.5, Math.min(x0 + 528, fx + Math.cos(an) * l), fy + Math.sin(an) * l); ctx.stroke(); }
  const gl = ctx.createLinearGradient(x0 + 530, 0, x0 + 570, 0); gl.addColorStop(0, '#9fe0ff'); gl.addColorStop(0.5, '#e6f8ff'); gl.addColorStop(1, '#7fcdf5'); ctx.fillStyle = gl; ctx.fillRect(x0 + 530, y0, 40, h);
  ctx.fillStyle = '#4a2c16'; ctx.fillRect(x0 + 570, y0, 260, h); ctx.fillStyle = 'rgba(255,220,170,.12)'; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(x0 + 610 + r() * 200, y0 + ((r() * h + T * 30) % h), 5 + r() * 9, 0, TAU); ctx.fill(); }
  ctx.restore();
  txt(ctx, 'PARED DE UN VASO DE PAPEL, EN CORTE', x0, 170, { s: 22, f: 'mono', w: 700, ls: 4, c: MARCA.lila, a: a0 });
  const L = [[x0 + 75, 'AFUERA', '#8f99b3'], [x0 + 340, 'FIBRA DE PAPEL', '#2a1d10'], [x0 + 700, 'CAFÉ', '#E9DFC8']]; L.forEach(([x, s, c]) => txt(ctx, s, x, 490, { s: 24, f: 'mono', w: 700, ls: 3, c, a: a0, al: 'center', sombra: false }));
  guia(ctx, x0 + 550, 330, 1020, 300, ss(e.tl, 1.6, 2.4), '#9fe0ff'); txt(ctx, 'Recubrimiento', 1040, 296, { s: 54, f: 'serif', w: 500, a: ss(e.tl, 1.8, 2.6) }); txt(ctx, 'IMPIDE QUE EL LÍQUIDO MOJE LA FIBRA', 1040, 340, { s: 20, f: 'mono', w: 700, ls: 3, c: '#9fe0ff', a: ss(e.tl, 2.2, 3) }); txt(ctx, 'El material varía: el resumen del PNUMA menciona vasos', 1040, 386, { s: 25, f: 'sans', w: 500, c: GRIS, a: ss(e.tl, 3, 3.8) }); txt(ctx, '«con recubrimiento» y, en un caso, de ácido poliláctico (PLA).', 1040, 420, { s: 25, f: 'sans', w: 500, c: GRIS, a: ss(e.tl, 3, 3.8) });
  // platos y charolas
  ctx.save(); ctx.globalAlpha = a1; ctx.fillStyle = '#1b1e2a'; ctx.beginPath(); ctx.roundRect(1020, 480, 780, 290, 22); ctx.fill(); ctx.restore(); txt(ctx, 'PLATOS Y CHAROLAS · ESTUDIOS QUE REVISÓ EL PNUMA', 1050, 530, { s: 19, f: 'mono', w: 700, ls: 2, c: MARCA.oro, a: a1, sombra: false });
  ctx.save(); ctx.globalAlpha = a1; ctx.fillStyle = '#E9DFC8'; ctx.fillRect(1050, 570, 520, 60); ctx.fillStyle = '#9fe0ff'; ctx.fillRect(1050, 556, 520 * en(e, 1, 1.4, 0.6), 14); ctx.restore();
  txt(ctx, 'PAPEL', 1070, 610, { s: 22, f: 'mono', w: 700, ls: 3, c: '#2a1d10', a: a1, sombra: false }); txt(ctx, 'capa de polietileno', 1590, 572, { s: 24, f: 'sans', w: 600, c: '#9fe0ff', a: en(e, 1, 0.8, 1.2), sombra: false });
  txt(ctx, 'Polietileno de baja densidad (LDPE): un plástico.', 1050, 684, { s: 26, f: 'sans', w: 500, c: CLARO, a: en(e, 1, 0.8, 1.6), sombra: false }); txt(ctx, 'El resumen también menciona papel con capa de cera.', 1050, 722, { s: 22, f: 'sans', w: 500, c: GRIS, a: en(e, 1, 0.8, 2.4), sombra: false });
  fuenteDato(ctx, 'PNUMA · 2021 · VAJILLA Y VASOS DE UN SOLO USO', a1, 1410, 806); esquema(ctx, a0, x0, 800);
};

LUZ.pfas_estudio = E('lila', (ctx, e) => {
  const t1 = e.L(1) ?? 5.8, a1 = en(e, 1, 0.8), a2 = en(e, 2, 0.8), a3 = en(e, 3, 0.8), a4 = en(e, 4, 0.8), sal = 1 - ss(e.tl, t1 - 0.2, t1 + 0.6);
  // gota de grasa que no atraviesa
  ctx.save(); ctx.globalAlpha = sal; envoltura(ctx, 620, 660, 1.3, ss(e.tl, 0.1, 0.8)); papas(ctx, 1220, 660, 1.3, ss(e.tl, 0.5, 1.2)); ctx.restore();
  for (let k = 0; k < 2; k++) { const u = pr((e.tl + k * 1.3) % 2.6, 0, 1.4), gx = [640, 1230][k], gy = mixn(240, 520, u * u) - Math.sin(pr((e.tl + k * 1.3) % 2.6, 1.4, 2.4) * Math.PI) * 60; ctx.save(); ctx.globalAlpha = sal * ss(e.tl, 1, 1.6); ctx.fillStyle = '#F2A20C'; ctx.beginPath(); ctx.moveTo(gx, gy - 30); ctx.quadraticCurveTo(gx + 22, gy + 4, gx, gy + 14); ctx.quadraticCurveTo(gx - 22, gy + 4, gx, gy - 30); ctx.fill(); ctx.restore(); }
  et(ctx, 'ANTIGRASA: PARA QUE LA GRASA NO ATRAVIESE EL EMPAQUE', 960, 760, { al: 'center', s: 24, a: ss(e.tl, 1.4, 2.2) * sal }); num(ctx, '¿QUÉ LO HACE POSIBLE?', 960, 200, 80, { a: ss(e.tl, 0.4, 1.1) * sal });
  // el estudio
  estudio(ctx, 110, 130, a1, { w: 760, h: 300, pais: 'ESTADOS UNIDOS · PUBLICADO EN 2017', org: ['Schaider y colaboradores', '*Environmental Science &*', '*Technology Letters*'], pie: 'MUESTRAS RECOGIDAS EN 2014 Y 2015', c: MARCA.lila, so: 34 });
  panel(ctx, 110, 460, 760, 340, a1); const n = Math.round(407 * pr(e.tl, t1 + 1, t1 + 5)); ctx.save(); ctx.globalAlpha = a1; for (let i = 0; i < 407; i++) { ctx.fillStyle = i < n ? (i < 395 ? MARCA.lila : MARCA.oro) : 'rgba(255,255,255,.08)'; ctx.beginPath(); ctx.roundRect(146 + (i % 37) * 18.6, 500 + Math.floor(i / 37) * 18.6, 13, 13, 3); ctx.fill(); } ctx.restore();
  txt(ctx, String(n), 146, 778, { s: 70, f: 'anton', w: 400, c: CLARO, a: a1, sombra: false }); tp(ctx, 'muestras de empaques de comida rápida', 290, 752, { a: a1, s: 26 }); tp(ctx, '395 de 27 cadenas · 12 de otros 4 restaurantes', 290, 782, { a: a1, s: 20, c: GRIS });
  // resultados
  const ap = en(e, 1, 0.8, 3); panel(ctx, 930, 130, 880, 670, ap); tm(ctx, 'MUESTRAS CON FLÚOR DETECTABLE', 970, 186, { a: ap, c: MARCA.lila }); tp(ctx, 'El flúor es el marcador que usó el estudio para PFAS', 970, 222, { a: ap, s: 22, c: GRIS });
  const g2 = eo(e.tl, (e.L(2) ?? 14) + 0.5, (e.L(2) ?? 14) + 2.4), g4 = eo(e.tl, (e.L(4) ?? 26) + 0.2, (e.L(4) ?? 26) + 1.8);
  tp(ctx, 'Papel para envolver (hamburguesas, pan)', 970, 290, { a: a2, s: 28 }); barraH(ctx, 970, 334, 640, 54, 0.46, MARCA.lila, { a: g2, val: Math.round(46 * g2) + ' %', sv: 54 });
  tp(ctx, 'Cartón (cajas de papas, de pizza)', 970, 440, { a: a4, s: 28 }); barraH(ctx, 970, 484, 640, 54, 0.20, MARCA.oro, { a: g4, val: Math.round(20 * g4) + ' %', sv: 54 });
  ctx.save(); ctx.globalAlpha = a3 * 0.2; ctx.fillStyle = '#fff'; ctx.fillRect(970, 560, 800, 2); ctx.restore(); txt(ctx, 'PFAS', 970, 650, { s: 84, f: 'anton', w: 400, c: MARCA.lila, a: a3, sombra: false }); tp(ctx, 'sustancias perfluoroalquiladas', 1170, 612, { a: a3, s: 30 }); tp(ctx, 'y polifluoroalquiladas', 1170, 650, { a: a3, s: 30 });
  tp(ctx, 'Compuestos fluorados. En empaques se usaban como antigrasa.', 970, 712, { a: a3, s: 22, c: GRIS });
  fuenteDato(ctx, 'SCHAIDER ET AL. · 2017 · MUESTRAS DE 2014–2015 · 407 MUESTRAS · EE. UU.', a2, 960);
}, { piso: 660 });

LUZ.pfas_linea = E('lila', (ctx, e) => {
  const a0 = ss(e.tl, 0.2, 0.9), a1 = en(e, 1, 0.8), a2 = en(e, 2, 0.8), T = e.T;
  num(ctx, '«QUÍMICOS ETERNOS»', 1050, 220, 110, { a: a0 });
  // cadena carbono-flúor, en esquema
  ctx.save(); ctx.globalAlpha = a0; const cx0 = 420, cy = 360; for (let i = 0; i < 8; i++) { const x = cx0 + i * 140, y = cy + (i % 2 ? 26 : -26) + Math.sin(T * 1.2 + i) * 3; if (i < 7) { const x2 = cx0 + (i + 1) * 140, y2 = cy + ((i + 1) % 2 ? 26 : -26) + Math.sin(T * 1.2 + i + 1) * 3; ctx.strokeStyle = TINTA; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2, y2); ctx.stroke(); }
    for (const d of [-1, 1]) { ctx.strokeStyle = TINTA; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + d * 12, y + d * 64); ctx.stroke(); ctx.fillStyle = '#18A058'; ctx.beginPath(); ctx.arc(x + d * 12, y + d * 64, 19, 0, TAU); ctx.fill(); txt(ctx, 'F', x + d * 12, y + d * 64 + 9, { s: 24, f: 'mono', w: 700, c: '#fff', al: 'center', sombra: false }); }
    ctx.fillStyle = TINTA; ctx.beginPath(); ctx.arc(x, y, 24, 0, TAU); ctx.fill(); txt(ctx, 'C', x, y + 9, { s: 26, f: 'mono', w: 700, c: '#fff', al: 'center', sombra: false }); } ctx.restore();
  et(ctx, 'CADENAS DE CARBONO CON FLÚOR: TARDAN MUCHÍSIMO EN DEGRADARSE', 960, 490, { al: 'center', s: 22, a: ss(e.tl, 1.2, 2) }); esquema(ctx, a0, 60, 480);
  // línea de tiempo
  const y = 600, X = [330, 760, 1190, 1590], g = cl(Math.max(ss(e.tl, 0.8, 2) * 0.36, a1 * 0.7, a2)); ctx.save(); ctx.strokeStyle = TINTA; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(200, y); ctx.lineTo(200 + 1520 * g, y); ctx.stroke(); ctx.restore();
  const P = [[X[0], '2014–2015', ['Se recogen las muestras', 'del estudio de empaques'], ss(e.tl, 0.9, 1.6), TINTA], [X[1], '2017', ['Se publica el estudio:', 'flúor en 46 % y 20 %'], ss(e.tl, 1.5, 2.2), TINTA], [X[2], '28 FEB 2024', ['FDA: los antigrasa con PFAS', 'ya no se venden en EE. UU.', 'para empaques de papel'], a1, '#7a1fa2'], [X[3], '12 AGO 2026', ['Unión Europea: límite de PFAS', 'en empaques que tocan comida', '(25 ppb por cada PFAS)'], a2, '#7a1fa2']];
  P.forEach(([x, f, ls, a, c]) => { ctx.save(); ctx.globalAlpha = cl(a); ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, 15 * (0.5 + 0.5 * cl(a)), 0, TAU); ctx.fill(); ctx.restore(); num(ctx, f, x, y + 72, 46, { a, c }); ls.forEach((l, i) => tinta(ctx, l, x, y + 112 + i * 30, { s: 22, f: 'sans', w: 600, al: 'center', a })); });
  et(ctx, 'FDA = ADMINISTRACIÓN DE ALIMENTOS Y MEDICAMENTOS DE EE. UU. · ppb = PARTES POR MIL MILLONES', 960, 800, { al: 'center', s: 17, a: a1 });
  fuenteDato(ctx, 'FDA 2024 · REGLAMENTO (UE) 2025/40, ARTÍCULO 5 · SCHAIDER ET AL. 2017', a1);
});

LUZ.popotes = E('lila', (ctx, e) => {
  const a0 = ss(e.tl, 0.2, 0.9), M = [['PAPEL', 18, 20, '#F3EEDF', '#E5352B', 1], ['BAMBÚ', 4, 5, '#C9A766', null, 2], ['PLÁSTICO', 3, 4, '#45C9F2', null, 2], ['VIDRIO', 2, 5, 'rgba(220,240,250,.8)', null, 2], ['ACERO', 0, 5, '#AEB6C4', null, 3]];
  estudio(ctx, 110, 130, a0, { w: 620, h: 250, pais: 'BÉLGICA · PUBLICADO EN 2023', org: ['Boisacq y colaboradores', '*Food Additives & Contaminants*'], pie: '39 MARCAS DE POPOTES · 5 MATERIALES', c: MARCA.lila, so: 32 });
  num(ctx, 'MARCAS CON PFAS', 1290, 190, 80, { a: a0 }); et(ctx, 'CADA PUNTO ES UNA MARCA · PUNTO LLENO = PFAS DETECTADOS', 1290, 232, { al: 'center', s: 19, a: a0 });
  panel(ctx, 110, 410, 1700, 390, a0);
  M.forEach(([n, k, t, c, ray, li], i) => { const x = 250 + i * 340, t0 = li === 1 ? (e.L(1) ?? 4.9) : li === 2 ? (e.L(2) ?? 8.9) : (e.L(3) ?? 13.7), a = ss(e.tl, 0.6 + i * 0.2, 1.2 + i * 0.2), on = ss(e.tl, t0, t0 + 0.6), res = i === 2 ? 1 : (li === 2 ? 0.75 : 1);
    popote(ctx, x - 96, 700, 230, 0.12, c, { a, rayas: ray }); tm(ctx, n, x - 50, 462, { a, c: CLARO, s: 22 });
    for (let j = 0; j < t; j++) { const px = x - 44 + (j % 5) * 38, py = 500 + Math.floor(j / 5) * 38, lleno = j < k ? ss(e.tl, t0 + j * 0.06, t0 + 0.3 + j * 0.06) : 0; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(px, py, 13, 0, TAU); ctx.stroke(); ctx.fillStyle = rgba('#B9A0FF', lleno); ctx.fill(); ctx.restore(); }
    txt(ctx, k + ' de ' + t, x - 50, 720, { s: 52, f: 'anton', w: 400, c: k === 0 ? '#35DDA9' : CLARO, a: on * res, sombra: false }); tp(ctx, Math.round(k / t * 100) + ' %', x - 50, 756, { a: on * res, s: 22, c: GRIS }); });
  const a4 = en(e, 4, 0.8), a5 = en(e, 5, 0.7); panel(ctx, 780, 258, 1030, 122, Math.max(en(e, 2, 0.8, 2.2), a4)); tm(ctx, 'DOS MATICES DEL ESTUDIO', 814, 300, { a: Math.max(en(e, 2, 0.8, 2.2), a4), c: MARCA.lila, s: 18 });
  tp(ctx, 'Concentraciones bajas.', 814, 344, { a: en(e, 2, 0.8, 2.2), s: 26 }); tp(ctx, 'No se sabe si se agregaron o son contaminación.', 1110, 344, { a: a4, s: 26 });
  fuenteDato(ctx, 'BOISACQ ET AL. · FOOD ADDITIVES & CONTAMINANTS: PART A · 2023 · BÉLGICA', a0);
  if (a5 > 0) { ctx.save(); ctx.globalAlpha = a5 * 0.82; ctx.fillStyle = '#14161d'; ctx.fillRect(-200, 250, 2400, 240); ctx.restore(); txt(ctx, '«PAPEL» NO DICE QUÉ MÁS TRAE', 960, 410, { s: 120, f: 'anton', w: 400, c: MARCA.lila, a: a5, al: 'center', sombra: false }); }
});

/* ====== 06 · El vaso de café ====== */
LUZ.vasos = E('naranja', (ctx, e) => {
  const a1 = en(e, 1, 0.8), a2 = en(e, 2, 0.8), a3 = en(e, 3, 0.8), t3 = e.L(3) ?? 16, T = e.T;
  estudio(ctx, 110, 130, a1, { w: 600, h: 250, pais: 'PNUMA · 2021', org: ['Revisión de análisis de ciclo', 'de vida de vasos'], pie: 'DESECHABLES Y REUSABLES', c: MARCA.naranja, so: 32 });
  // repisa-báscula con tres vasos al mismo nivel
  const y = 660 + Math.sin(T * 1.2) * 2, X = [820, 1160, 1500], N = [['PLÁSTICO', 'de origen fósil'], ['BIOPLÁSTICO', ''], ['PAPEL', 'con recubrimiento']], K = ['plastico', 'bio', 'papel'];
  ctx.save(); ctx.strokeStyle = TINTA; ctx.fillStyle = TINTA; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(680, y + 6); ctx.lineTo(1640, y + 6); ctx.stroke(); ctx.beginPath(); ctx.moveTo(1160, y + 10); ctx.lineTo(1120, y + 90); ctx.lineTo(1200, y + 90); ctx.closePath(); ctx.fill(); ctx.restore();
  const cambio = ss(e.tl, t3 + 0.6, t3 + 2.2);
  K.forEach((k, i) => { const a = eo(e.tl, 0.2 + i * 0.35, 0.9 + i * 0.35); if (i === 0) { vaso(ctx, X[0], y - (1 - a) * 60 - cambio * 220, 0.95, 'plastico', { a: a * (1 - cambio) }); vaso(ctx, X[0], y - (1 - cambio) * 220, 0.95, 'papel', { a: cambio }); } else vaso(ctx, X[i], y - (1 - a) * 60, 0.95, k, { a }); et(ctx, i === 0 && cambio > 0.5 ? 'PAPEL' : N[i][0], X[i], y + 130, { al: 'center', s: 22, a }); if (N[i][1]) et(ctx, i === 0 && cambio > 0.5 ? 'con recubrimiento' : N[i][1], X[i], y + 158, { al: 'center', s: 17, a }); });
  num(ctx, '≈', 990, y - 80, 110, { a: a2 }); num(ctx, '≈', 1330, y - 80, 110, { a: a2 });
  num(ctx, 'IMPACTOS PARECIDOS', 1160, 250, 92, { a: a2 }); et(ctx, 'SIN IMPORTAR EL MATERIAL DEL VASO DESECHABLE', 1160, 296, { al: 'center', s: 22, a: a2 });
  et(ctx, 'EL RESUMEN NO DA CIFRAS POR MATERIAL: DICE «SIMILARES»', 1160, 336, { al: 'center', s: 18, a: a2 });
  panel(ctx, 110, 420, 470, 170, a3); tm(ctx, 'CAMBIAR PLÁSTICO POR PAPEL', 140, 470, { a: a3, s: 18, c: MARCA.naranja }); tp(ctx, 'La báscula casi no se mueve', 140, 520, { a: a3, s: 30 }); tp(ctx, 'si ambos son de un solo uso.', 140, 556, { a: a3, s: 24, c: GRIS });
  fuenteDato(ctx, 'PNUMA · 2021 · VASOS DE UN SOLO USO Y SUS ALTERNATIVAS', a1, 1160);
});

LUZ.reusable = E('naranja', (ctx, e) => {
  const a0 = ss(e.tl, 0.2, 0.9), t1 = e.L(1) ?? 5.4, a1 = en(e, 1, 0.8), a2 = en(e, 2, 0.8), a3 = en(e, 3, 0.8);
  vaso(ctx, 300, 740, 1.35, 'reusable', { a: a0 }); et(ctx, 'VASO REUSABLE', 300, 790, { al: 'center', s: 22, a: a0 });
  const n = Math.round(70 * pr(e.tl, t1 + 0.4, t1 + 6.5)); num(ctx, String(n), 300, 280, 150, { a: a1 }); et(ctx, 'REÚSOS', 300, 318, { al: 'center', s: 24, a: a1 });
  // regla de 0 a 80 reúsos
  const x0 = 560, x1 = 1760, y = 420, X = (v) => x0 + (x1 - x0) * v / 80; panel(ctx, 500, 170, 1310, 400, a1); tm(ctx, 'REÚSOS PARA QUE SU EFECTO EN EL CLIMA SEA MENOR QUE EL DE UN DESECHABLE DE PLÁSTICO', 540, 222, { a: a1, s: 17, c: MARCA.naranja });
  ctx.save(); ctx.globalAlpha = a1; ctx.fillStyle = 'rgba(255,255,255,.1)'; ctx.fillRect(x0, y - 16, x1 - x0, 32); const g = pr(e.tl, t1 + 0.4, t1 + 6.5); ctx.fillStyle = 'rgba(255,160,74,.35)'; ctx.fillRect(X(20), y - 46, (X(70) - X(20)) * ss(e.tl, t1 + 2, t1 + 3.4), 92); ctx.fillStyle = CLARO; ctx.fillRect(x0, y - 16, (x1 - x0) * g * 70 / 80, 32);
  for (let v = 0; v <= 80; v += 10) { ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.fillRect(X(v) - 1, y + 22, 2, 14); } ctx.restore();
  for (let v = 0; v <= 80; v += 10) txt(ctx, String(v), X(v), y + 62, { s: 20, f: 'mono', w: 700, c: GRIS, a: a1, al: 'center', sombra: false });
  txt(ctx, '20', X(20), y - 62, { s: 64, f: 'anton', w: 400, c: MARCA.naranja, a: ss(e.tl, t1 + 2, t1 + 2.6), al: 'center', sombra: false }); txt(ctx, '70', X(70), y - 62, { s: 64, f: 'anton', w: 400, c: MARCA.naranja, a: ss(e.tl, t1 + 3, t1 + 3.6), al: 'center', sombra: false });
  tp(ctx, 'Es un rango: depende de contra qué vaso se compare.', 560, 530, { a: a2, s: 26 });
  tinta(ctx, 'Comparado con vasos de PET (tereftalato de polietileno), PP (polipropileno) y PLA (ácido poliláctico).', 500, 610, { s: 22, f: 'sans', w: 600, a: a2 });
  // lavado
  const lv = (x, t, sub, dib) => { panel(ctx, x, 650, 420, 150, a3); dib(x + 70, 726); tp(ctx, t, x + 140, 716, { a: a3, s: 28 }); tp(ctx, sub, x + 140, 752, { a: a3, s: 20, c: GRIS }); };
  lv(790, 'Lavavajillas', 'de preferencia', (x, y2) => { ctx.save(); ctx.globalAlpha = a3; ctx.strokeStyle = CLARO; ctx.lineWidth = 4; ctx.strokeRect(x - 34, y2 - 44, 68, 84); ctx.beginPath(); ctx.arc(x, y2 + 6, 22, 0, TAU); ctx.stroke(); ctx.fillStyle = CLARO; ctx.fillRect(x - 26, y2 - 36, 30, 6); ctx.restore(); });
  lv(1250, 'A mano', 'con agua fría', (x, y2) => { ctx.save(); ctx.globalAlpha = a3; ctx.fillStyle = '#45C9F2'; ctx.beginPath(); ctx.moveTo(x, y2 - 46); ctx.quadraticCurveTo(x + 38, y2 + 14, x, y2 + 36); ctx.quadraticCurveTo(x - 38, y2 + 14, x, y2 - 46); ctx.fill(); ctx.restore(); });
  et(ctx, 'LAVADO EFICIENTE:', 500, 730, { s: 20, a: a3 });
  fuenteDato(ctx, 'PNUMA · 2021 · POTENCIAL DE CALENTAMIENTO GLOBAL', a1, 1150);
});

LUZ.para_llevar = E('naranja', (ctx, e) => {
  const a0 = ss(e.tl, 0.2, 0.9), t1 = e.L(1) ?? 8.7, a1 = en(e, 1, 0.8), T = e.T;
  const firme = eo(e.tl, 1.6, 3.4) * (1 - a1), duda = a1 * Math.sin((e.tl - t1) * 2.2) * 0.1, ang = -0.16 * firme + duda;
  num(ctx, 'COMIDA PARA LLEVAR', 760, 200, 84, { a: a0 }); const P = balanza(ctx, 760, 330, 1.05, ang, { a: a0 });
  charola(ctx, P[0][0], P[0][1], 0.62, 'rgba(225,240,250,.85)', a0); charola(ctx, P[1][0], P[1][1], 0.62, '#D9B98C', a0);
  et(ctx, 'PLÁSTICO', P[0][0], P[0][1] + 56, { al: 'center', s: 22, a: a0 }); et(ctx, 'PAPEL', P[1][0], P[1][1] + 56, { al: 'center', s: 22, a: a0 }); et(ctx, 'EL PLATO MÁS BAJO = MÁS IMPACTO (ESQUEMA, SIN CIFRAS)', 760, 796, { al: 'center', s: 18, a: a0 });
  panel(ctx, 1200, 250, 600, 190, ss(e.tl, 2.4, 3.2)); tm(ctx, 'EMPAQUES DE UN SOLO USO', 1234, 300, { a: ss(e.tl, 2.4, 3.2), c: MARCA.naranja, s: 19 }); tp(ctx, 'El de papel, «muchas veces»', 1234, 352, { a: ss(e.tl, 2.4, 3.2), s: 32 }); tp(ctx, 'resulta preferible. No siempre.', 1234, 394, { a: ss(e.tl, 2.4, 3.2), s: 26, c: GRIS });
  // reciclaje y composta que desaparecen
  const ic = (x, s, c) => { ctx.save(); ctx.globalAlpha = a0 * (1 - 0.85 * a1); ctx.strokeStyle = c; ctx.lineWidth = 8; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(x, 560, 36, k * TAU / 3 + T * 0.4, k * TAU / 3 + 1.5 + T * 0.4); ctx.stroke(); } ctx.restore(); et(ctx, s, x, 630, { al: 'center', s: 18, a: a0 * (1 - 0.6 * a1) }); };
  ic(1300, 'RECICLAJE', '#0f7a44'); ic(1480, 'COMPOSTA', '#7A5230'); tache(ctx, 1300, 560, 50, a1, MARCA.rojo); tache(ctx, 1480, 560, 50, en(e, 1, 0.7, 0.5), MARCA.rojo);
  num(ctx, 'PUEDE CAMBIAR', 1270, 740, 64, { a: en(e, 1, 0.7, 1.2), c: MARCA.rojo });
  fuenteDato(ctx, 'PNUMA 2021 (RESUME PNUMA 2020) · EMPAQUES DE COMIDA PARA LLEVAR', ss(e.tl, 2.4, 3.2) * (1 - en(e, 2, 0.4)), 760);
});

/* ====== 07 · México ====== */
const DBGIR = 'SEMARNAT · INECC · DIAGNÓSTICO BÁSICO DE RESIDUOS 2026 · DATOS DE 2022';
LUZ.mx_contador = E('crema', (ctx, e) => {
  const a0 = ss(e.tl, 0.1, 0.7), g = eo(e.tl, 0.3, 3.6), r = rng(77);
  et(ctx, 'MÉXICO · RESIDUOS SÓLIDOS URBANOS', 960, 190, { al: 'center', s: 26, a: a0 });
  num(ctx, miles(139902 * g), 960, 430, 250, { a: a0 }); num(ctx, 'TONELADAS AL DÍA', 960, 520, 70, { a: a0 });
  for (let i = 0; i < 46; i++) { const u = cl(g * 46 - i), x = 300 + r() * 1320, h = r(); ctx.save(); ctx.translate(x, 800 - h * 120 * (1 - Math.abs(x - 960) / 900) - (1 - u) * 300); ctx.rotate((r() - 0.5) * 0.6); ctx.globalAlpha = u; ctx.fillStyle = ['#2A2D36', '#3b3f4c', '#C8A070', '#F3F6FB', '#58616f'][i % 5]; ctx.beginPath(); ctx.ellipse(0, -36, 46, 40, 0, 0, TAU); ctx.fill(); ctx.fillRect(-10, -86, 20, 20); ctx.restore(); }
  camion(ctx, mixn(-300, 420, eo(e.tl, 0.4, 2.6)), 808, 0.7, e.T, { c2: '#18A058' });
  fuenteDato(ctx, DBGIR, ss(e.tl, 0.6, 1.4));
});

LUZ.mx_100 = E('crema', (ctx, e) => {
  const a0 = ss(e.tl, 0.1, 0.7); num(ctx, 'DE CADA 100 KILOS', 620, 200, 84, { a: a0 });
  for (let i = 0; i < 100; i++) { const c = i % 10, f = Math.floor(i / 10), a = ss(e.tl, 0.2 + i * 0.012, 0.6 + i * 0.012), car = i < 7, pap = i >= 7 && i < 12, on = car ? ss(e.tl, 1.6 + i * 0.1, 2 + i * 0.1) : pap ? ss(e.tl, 2.5 + (i - 7) * 0.1, 2.9 + (i - 7) * 0.1) : 0; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = mixc('#9aa0ad', car ? '#B07F45' : '#ffffff', on); ctx.strokeStyle = TINTA; ctx.lineWidth = on > 0.5 ? 3 : 0.5; ctx.beginPath(); ctx.roundRect(340 + c * 56, 250 + f * 54, 48, 46, 8); ctx.fill(); ctx.stroke(); ctx.restore(); }
  const a1 = ss(e.tl, 1.6, 2.3), a2 = ss(e.tl, 2.5, 3.2); num(ctx, '6.7 kg', 1180, 400, 130, { a: a1, al: 'left', c: '#8a5a22' }); et(ctx, 'CARTÓN', 1184, 440, { s: 28, a: a1 }); num(ctx, '5.4 kg', 1180, 620, 130, { a: a2, al: 'left' }); et(ctx, 'PAPEL', 1184, 660, { s: 28, a: a2 });
  et(ctx, 'CADA CUADRO ES 1 KG (REDONDEADO: 7 Y 5 CUADROS)', 340, 812, { s: 18, a: a1 });
  fuenteDato(ctx, DBGIR + ' · TABLA 14', ss(e.tl, 0.6, 1.4));
});

LUZ.mx_trat = E('crema', (ctx, e) => {
  const a0 = ss(e.tl, 0.1, 0.7), a1 = en(e, 1, 0.8), g0 = eo(e.tl, 0.5, 2.4), g1 = eo(e.tl, (e.L(1) ?? 4.4) + 0.5, (e.L(1) ?? 4.4) + 3);
  et(ctx, 'DE TODA LA BASURA QUE SE GENERA', 160, 190, { s: 24, a: a0 }); ctx.save(); ctx.globalAlpha = a0; ctx.fillStyle = 'rgba(22,18,15,.2)'; ctx.beginPath(); ctx.roundRect(160, 214, 1600, 90, 14); ctx.fill(); ctx.fillStyle = '#18A058'; ctx.beginPath(); ctx.roundRect(160, 214, 1600 * 0.05 * g0, 90, [14, 0, 0, 14]); ctx.fill(); ctx.restore();
  num(ctx, Math.round(5 * g0) + ' %', 160, 430, 130, { a: a0, al: 'left', c: '#0f7a44' }); parr(ctx, ['recibe algún', 'tratamiento'], 410, 376, { s: 36, a: a0, lh: 44 });
  et(ctx, 'DE LO QUE LLEGA A LOS SITIOS DE DISPOSICIÓN FINAL', 160, 520, { s: 24, a: a1 }); ctx.save(); ctx.globalAlpha = a1; ctx.fillStyle = 'rgba(22,18,15,.2)'; ctx.beginPath(); ctx.roundRect(160, 544, 1600, 90, 14); ctx.fill(); ctx.fillStyle = MARCA.rojo; ctx.beginPath(); ctx.roundRect(160, 544, 1600 * 0.844 * g1, 90, [14, 0, 0, 14]); ctx.fill(); ctx.restore();
  num(ctx, (84.4 * g1).toFixed(1) + ' %', 160, 760, 130, { a: a1, al: 'left', c: '#b3221a' }); parr(ctx, ['va a sitios que no', 'cumplen la norma'], 640, 706, { s: 36, a: a1, lh: 44 }); et(ctx, miles(82793 * g1) + ' TONELADAS AL DÍA', 1080, 760, { s: 26, a: a1 });
  fuenteDato(ctx, DBGIR, a0);
});

// Bajo tierra: escena interna, fondo oscuro.
LUZ.relleno = (ctx, e) => {
  const a1 = en(e, 1, 0.8), a2 = en(e, 2, 0.8), T = e.T, t1 = e.L(1) ?? 3;
  ctx.fillStyle = '#F4EFE4'; ctx.fillRect(0, 0, 1920, 210); ctx.fillStyle = '#7CC27A'; ctx.fillRect(0, 196, 1920, 24); camion(ctx, 1500 + Math.sin(T * 0.5) * 30, 200, 0.6, T, { c2: '#18A058' });
  rellenoSanitario(ctx, 0, 216, 1920, 864, { capas: 5 }); ctx.fillStyle = 'rgba(8,8,12,.35)'; ctx.fillRect(0, 216, 1920, 864);
  txt(ctx, '¿QUÉ PASA BAJO TIERRA?', 640, 150, { s: 70, f: 'anton', w: 400, c: TINTA, a: ss(e.tl, 0.2, 0.9), sombra: false });
  // papel que se descompone
  const des = ss(e.tl, t1, t1 + 5), px = 520, py = 560; ctx.save(); ctx.translate(px, py); ctx.rotate(-0.1); const r = rng(5); for (let i = 0; i < 40; i++) { const cx = -130 + (i % 8) * 34, cy = -80 + Math.floor(i / 8) * 34, k = r(); ctx.globalAlpha = cl(1 - des * (0.5 + k)); ctx.fillStyle = mixc('#E9DFC8', '#5a4630', des * k); ctx.fillRect(cx + des * (r() - 0.5) * 30, cy + des * r() * 20, 32 - des * 10 * k, 32 - des * 10 * k); } ctx.restore();
  for (let i = 0; i < 16; i++) { const u = ((T * 0.25 + i / 16) % 1), bx = px - 140 + ((i * 53) % 280) + Math.sin(u * 8 + i) * 12, by = py - 60 - u * 330; ctx.save(); ctx.globalAlpha = a1 * (1 - u) * 0.9; ctx.strokeStyle = '#ffd98a'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(bx, by, 9 + u * 14, 0, TAU); ctx.stroke(); ctx.restore(); halo(ctx, bx, by, 30, '#FFB05A', a1 * (1 - u) * 0.35); }
  txt(ctx, 'PAPEL', px, py + 130, { s: 24, f: 'mono', w: 700, ls: 4, al: 'center', c: '#E9DFC8' }); txt(ctx, 'Metano (CH₄)', px, 330, { s: 60, f: 'serif', w: 500, al: 'center', a: a1 }); txt(ctx, 'SE DESCOMPONE · GAS CON EFECTO FUERTE EN EL CLIMA', px, 374, { s: 19, f: 'mono', w: 700, ls: 2, al: 'center', c: '#ffd98a', a: a1 });
  // plástico casi sin cambio
  ctx.save(); ctx.globalAlpha = 0.5 + 0.5 * a2; ctx.translate(1340, py + 110); ctx.rotate(0.5); bolsaPlastico(ctx, 0, 0, 0.7, { seed: 6 }); ctx.restore();
  txt(ctx, 'PLÁSTICO', 1380, py + 130, { s: 24, f: 'mono', w: 700, ls: 4, al: 'center', c: '#F3F6FB' }); txt(ctx, 'Casi sin cambio', 1380, 330, { s: 60, f: 'serif', w: 500, al: 'center', a: a2 }); txt(ctx, '«RELATIVAMENTE INERTE» · SIGUE AHÍ', 1380, 374, { s: 19, f: 'mono', w: 700, ls: 2, al: 'center', c: '#9fe0ff', a: a2 });
  fuenteDato(ctx, 'PNUMA 2021 (RESUME PNUMA 2020) · BOLSAS EN RELLENOS SANITARIOS', a1, 960, 800); esquema(ctx, 1, 60, 800);
};

LUZ.sin_cifra = E('crema', (ctx, e) => {
  const a0 = ss(e.tl, 0.2, 0.9), a1 = en(e, 1, 0.8), T = e.T;
  vaso(ctx, 360, 740, 1.2, 'papel', { a: a0 }); charola(ctx, 640, 740, 0.9, '#D9B98C', a0);
  et(ctx, 'VASOS Y CHAROLAS DE CARTÓN CON RECUBRIMIENTO', 1300, 220, { al: 'center', s: 22, a: a0 }); num(ctx, '¿CUÁNTO SE RECICLA EN MÉXICO?', 1300, 300, 72, { a: a0 });
  // medidor vacío
  ctx.save(); ctx.globalAlpha = a0; ctx.strokeStyle = TINTA; ctx.lineWidth = 6; ctx.setLineDash([14, 12]); ctx.beginPath(); ctx.roundRect(900, 360, 800, 90, 14); ctx.stroke(); ctx.restore();
  num(ctx, '?', 1300 + Math.sin(T * 1.5) * 8, 440, 90, { a: a0 }); num(ctx, 'SIN CIFRA OFICIAL ENCONTRADA', 1300, 540, 62, { a: ss(e.tl, 2.4, 3.2), c: '#b3221a' });
  et(ctx, 'NO SE HALLÓ AL PREPARAR ESTE GUION (NOVIEMBRE DE 2026). NO SIGNIFICA QUE SEA CERO.', 1300, 590, { al: 'center', s: 17, a: ss(e.tl, 3.4, 4.2) });
  num(ctx, 'LO QUE NO SE MIDE NO SE PUEDE PRESUMIR', 1300, 740, 58, { a: a1 });
}, { piso: 740 });

LUZ.cdmx = E('crema', (ctx, e) => {
  const a0 = ss(e.tl, 0.2, 0.9), a1 = en(e, 1, 0.8), T = e.T;
  // tienda
  ctx.save(); ctx.globalAlpha = a0; ctx.fillStyle = '#F6F3EC'; ctx.fillRect(140, 330, 720, 400); ctx.fillStyle = '#2A2D36'; ctx.fillRect(140, 250, 720, 90); for (let i = 0; i < 8; i++) { ctx.fillStyle = i % 2 ? '#E5352B' : '#F6F3EC'; ctx.beginPath(); ctx.moveTo(140 + i * 90, 340); ctx.lineTo(230 + i * 90, 340); ctx.lineTo(230 + i * 90, 390); ctx.quadraticCurveTo(185 + i * 90, 420, 140 + i * 90, 390); ctx.closePath(); ctx.fill(); } ctx.fillStyle = '#BFE6F7'; ctx.fillRect(190, 450, 300, 200); ctx.fillStyle = '#7A5230'; ctx.fillRect(600, 470, 180, 260); ctx.restore();
  txt(ctx, 'TIENDA', 500, 312, { s: 44, f: 'anton', w: 400, c: CLARO, a: a0, al: 'center', sombra: false, ls: 6 });
  bolsaPlastico(ctx, 340, 640, 0.5, { a: a0, T }); tache(ctx, 340, 560, 80, ss(e.tl, 1.4, 2.2), MARCA.rojo);
  panel(ctx, 980, 190, 830, 280, ss(e.tl, 1, 1.8)); tm(ctx, 'CIUDAD DE MÉXICO · DESDE 2020', 1016, 244, { a: ss(e.tl, 1, 1.8), c: MARCA.oro }); tp(ctx, 'Prohibido entregar bolsas de plástico', 1016, 300, { a: ss(e.tl, 1, 1.8), s: 36, f: 'serif' }); tp(ctx, 'al consumidor en los puntos de venta.', 1016, 344, { a: ss(e.tl, 1, 1.8), s: 36, f: 'serif' });
  tp(ctx, 'Excepciones: las compostables y las necesarias por higiene.', 1016, 400, { a: ss(e.tl, 2.6, 3.4), s: 24, c: GRIS }); tp(ctx, 'Decreto publicado el 25 de junio de 2019.', 1016, 436, { a: ss(e.tl, 2.6, 3.4), s: 22, c: GRIS });
  num(ctx, '2020', 1395, 700, 230, { a: ss(e.tl, 3.2, 4) * (1 - a1) }); et(ctx, 'AÑO EN QUE EMPEZÓ A APLICARSE', 1395, 748, { al: 'center', s: 20, a: ss(e.tl, 3.6, 4.4) * (1 - a1) });
  const f = (y, t, v, c, a) => { tinta(ctx, t, 1000, y, { s: 40, f: 'serif', w: 500, a }); num(ctx, v, 1790, y + 4, 60, { a, al: 'right', c }); };
  f(580, 'El material', 'CAMBIA', '#0f7a44', a1); f(680, 'Cuántas veces se usa', 'NO LO DICE', '#b3221a', en(e, 1, 0.8, 2.4));
  fuenteDato(ctx, 'GACETA OFICIAL DE LA CIUDAD DE MÉXICO · 25 JUN 2019 · VIGENTE DESDE 2020', ss(e.tl, 1, 1.8), 1100);
}, { piso: 730 });

/* ====== 08 · Entonces, ¿estafa o no? ====== */
LUZ.balance_final = E('menta', (ctx, e) => {
  const a0 = ss(e.tl, 0.1, 0.7), a1 = en(e, 1, 0.8), a2 = en(e, 2, 0.8);
  num(ctx, '¿ESTAFA?', 420, 330, 190, { a: a0 }); sello(ctx, 'NO COMO MATERIAL', 440, 430, ss(e.tl, 1, 1.5), CLARO, -0.07, 46); bolsaPapel(ctx, 420, 800, 0.72, { a: a0 });
  const C = [['INGLATERRA · DATOS DE 2006', 'Pierde en clima', 'si se usa una sola vez', MARCA.rosa], ['DINAMARCA · 2018', 'Gana en clima', 'y pierde en 12 de 15 indicadores', MARCA.cian], ['PNUMA · 2020–2021', 'Depende del lugar', 'y de cuántas veces se use', MARCA.oro]];
  C.forEach(([p, b, s, c], i) => { const a = en(e, 1, 0.7, i * 1.2), y = 160 + i * 172; panel(ctx, 860, y, 950, 150, a); tm(ctx, p, 896, y + 46, { a, c, s: 19 }); tp(ctx, b, 896, y + 100, { a, s: 44, f: 'serif' }); tp(ctx, s, 1340, y + 100, { a, s: 24, c: GRIS }); });
  num(ctx, 'CAMBIAR DE MATERIAL NO BASTA', 1335, 780, 70, { a: a2 });
});

LUZ.cita = E('menta', (ctx, e) => {
  const a0 = ss(e.tl, 0.2, 0.9), a1 = en(e, 1, 0.7); panel(ctx, 470, 170, 1340, 600, a0);
  txt(ctx, '“', 520, 380, { s: 260, f: 'serif', w: 600, c: MARCA.menta, a: a0, sombra: false });
  txt(ctx, '«Un solo uso»', 640, 350, { s: 120, f: 'serif', w: 500, c: MARCA.menta, a: a1, sombra: false }); txt(ctx, 'es más problemático', 640, 470, { s: 92, f: 'serif', w: 500, c: CLARO, a: en(e, 1, 0.7, 0.6), sombra: false }); txt(ctx, 'que «plástico».', 640, 580, { s: 92, f: 'serif', w: 500, c: CLARO, a: en(e, 1, 0.7, 1.2), sombra: false });
  tm(ctx, 'PNUMA · 2021 · TRADUCCIÓN DEL INGLÉS', 640, 690, { a: a0, c: MARCA.oro }); tp(ctx, 'Programa de las Naciones Unidas para el Medio Ambiente', 640, 728, { a: a0, s: 24, c: GRIS });
});

LUZ.traslado = E('menta', (ctx, e) => {
  const a0 = ss(e.tl, 0.2, 0.9), a1 = en(e, 1, 0.8), t1 = e.L(1) ?? 8.1, sal = 1 - ss(e.tl, t1 - 0.3, t1 + 0.5), mv = eo(e.tl, 2.6, 6);
  ctx.save(); ctx.globalAlpha = sal; vaso(ctx, 460, 720, 1.2, 'plastico', { a: a0 }); vaso(ctx, 1460, 720, 1.2, 'papel', { a: ss(e.tl, 1, 1.8) }); ctx.restore();
  et(ctx, 'DESECHABLE DE PLÁSTICO', 460, 770, { al: 'center', s: 20, a: a0 * sal }); et(ctx, 'DESECHABLE DE PAPEL', 1460, 770, { al: 'center', s: 20, a: ss(e.tl, 1, 1.8) * sal });
  flecha(ctx, 620, 560, 1300, 560, ss(e.tl, 2.2, 3.4) * sal, TINTA, 7);
  // el bulto de cargas que se pasa de un lado a otro
  const bx = mixn(460, 1460, mv), by = 330 - Math.sin(mv * Math.PI) * 60; ctx.save(); ctx.globalAlpha = ss(e.tl, 1.6, 2.4) * sal; ctx.fillStyle = '#14161d'; ctx.beginPath(); ctx.ellipse(bx, by, 190, 96, 0, 0, TAU); ctx.fill(); ctx.restore();
  txt(ctx, 'LAS CARGAS', bx, by - 8, { s: 40, f: 'anton', w: 400, c: MARCA.menta, a: ss(e.tl, 1.6, 2.4) * sal, al: 'center', sombra: false }); txt(ctx, 'clima · agua · residuos', bx, by + 30, { s: 22, f: 'sans', w: 600, c: CLARO, a: ss(e.tl, 1.6, 2.4) * sal, al: 'center', sombra: false });
  num(ctx, '«PROBABLEMENTE SOLO TRASLADA LAS CARGAS»', 960, 190, 62, { a: ss(e.tl, 3.4, 4.2) * sal });
  // fabricar pesa
  fabrica(ctx, 380, 620, 1.15, e.T, { a: a1 }); num(ctx, 'FABRICAR', 1180, 360, 170, { a: a1 }); parr(ctx, ['Una parte grande del impacto', 'está en producir el objeto.'], 1180, 440, { s: 40, al: 'center', a: a1, lh: 50 });
  et(ctx, 'EL RESUMEN DEL PNUMA DICE «CONTRIBUCIÓN SIGNIFICATIVA»; EL ESTUDIO INGLÉS, QUE «DOMINA»', 1180, 590, { al: 'center', s: 17, a: en(e, 1, 0.8, 1.6) });
  fuenteDato(ctx, a1 > 0.5 ? 'ENVIRONMENT AGENCY 2011 · MILJØSTYRELSEN 2018 · PNUMA 2021' : 'PNUMA · 2021', ss(e.tl, 3.4, 4.2));
}, { piso: 720 });

LUZ.consejos = E('menta', (ctx, e) => {
  const a0 = ss(e.tl, 0.2, 0.9), T = e.T; num(ctx, 'USAR MUCHAS VECES LO QUE YA EXISTE', 960, 220, 84, { a: a0 });
  const col = (i, li, t, s1, s2, dib) => { const x = 130 + i * 570, a = en(e, li, 0.8), t0 = e.L(li) ?? 99; panel(ctx, x, 280, 520, 520, a); dib(x + 150, 700, a, t0); tm(ctx, t, x + 36, 334, { a, c: MARCA.menta, s: 21 }); tp(ctx, s1, x + 36, 384, { a, s: 30 }); tp(ctx, s2, x + 36, 422, { a, s: 23, c: GRIS }); const n = 1 + Math.floor(cl((e.tl - t0 - 0.8) / (i === 2 ? 0.1 : 0.5), 0, i === 2 ? 60 : 8)); txt(ctx, '× ' + (i === 2 && n > 20 ? '20–70' : n), x + (i === 2 && n > 20 ? 250 : 300), 620, { s: i === 2 && n > 20 ? 76 : 96, f: 'anton', w: 400, c: CLARO, a, sombra: false }); tp(ctx, i === 2 ? 'reúsos' : 'usos', x + 304, 664, { a, s: 24, c: GRIS }); };
  col(0, 1, 'BOLSA DE PAPEL', 'Hasta que se rompa', 'y, si aguanta, al final para la basura', (x, y, a, t0) => bolsaPapel(ctx, x, y, 0.62, { a, arruga: cl((e.tl - t0) / 5) }));
  col(1, 2, 'BOLSA DE PLÁSTICO', 'Reusarla', 'y al final como bolsa de basura', (x, y, a) => bolsaPlastico(ctx, x, y, 0.62, { a, T }));
  col(2, 3, 'VASO', 'Uno reusable', 'usado decenas de veces y bien lavado', (x, y, a) => vaso(ctx, x, y, 0.95, 'reusable', { a }));
  fuenteDato(ctx, 'MILJØSTYRELSEN 2018 · ENVIRONMENT AGENCY 2011 · PNUMA 2021', en(e, 1, 0.8));
});

LUZ.mejor2 = E('menta', (ctx, e) => {
  const a0 = ss(e.tl, 0.2, 0.9), a1 = en(e, 1, 0.7);
  cajaCarton(ctx, 420, 760, 1.25, { a: a0 }); colgante(ctx, 430, 440, 64, 'ECO', ss(e.tl, 0.8, 1.4), { rot: -0.12 + Math.sin(e.T * 1.4) * 0.03 }); et(ctx, 'COLOR CAFÉ · DICE «PAPEL»', 430, 806, { al: 'center', s: 22, a: ss(e.tl, 1.4, 2.2) });
  bascula15(ctx, e, { x0: 860, x1: 1740, y: 190, k: 0.72, etq: 0, a: a1, ap: (i) => en(e, 1, 0.5, i * 0.06), dy: (i) => (PAPEL_GANA.includes(i) ? -26 : 30) * en(e, 1, 1.4, 1), col: (i) => PAPEL_GANA.includes(i) ? '#0f7a44' : '#c5271d' });
  num(ctx, '¿MEJOR EN QUÉ?', 1300, 560 + (1 - a1) * 30, 180, { a: a1 }); parr(ctx, ['¿En qué indicador? ¿Con qué peso?', '¿En qué país? ¿Con cuántos usos?'], 1300, 640, { s: 34, al: 'center', a: en(e, 1, 0.8, 1.4), lh: 46 });
}, { piso: 760 });

/* ====== 09 · La misma bolsa ====== */
// La imagen del inicio, transformada: la misma bolsa, ya usada, con el contador de usos corriendo.
LUZ.cierre = E('amarillo', (ctx, e) => {
  const T = e.T, t2 = e.L(2) ?? 6.4, t3 = e.L(3) ?? 13, a1 = en(e, 1, 0.7), a2 = en(e, 2, 0.8), a3 = en(e, 3, 0.8), a4 = en(e, 4, 0.7), a5 = en(e, 5, 0.8);
  const usos = e.tl < t2 ? 1 : Math.min(3, 1 + Math.floor((e.tl - t2) / 1.6)) + (e.tl > t3 ? Math.floor((e.tl - t3) / 1.1) : 0), salto = e.tl > t2 ? Math.abs(Math.sin(((e.tl - t2) % 1.1) / 1.1 * Math.PI)) * 0 : 0;
  bolsaPapel(ctx, BX, BY - salto, 1.45, { abre: 1, arruga: cl((usos - 1) / 6), rot: Math.sin(T * 0.9) * 0.008 });
  colgante(ctx, BX + 6, BY - 250, 30, 'LA OPCIÓN ECOLÓGICA', ss(e.tl, 0.3, 0.9), { rot: -0.07 + Math.sin(T * 1.3) * 0.015, c: mixc('#8a8f7c', '#2E9E57', cl((usos - 2) / 2)) });
  sello(ctx, 'TODAVÍA NO', BX + 40, BY - 130, a1 * (1 - ss(e.tl, t2 + 3.2, t2 + 3.8)), MARCA.rojo, -0.1, 50);
  // contador de usos
  panel(ctx, 960, 150, 420, 300, ss(e.tl, 0.6, 1.3)); tm(ctx, 'USOS DE ESTA BOLSA', 996, 204, { a: ss(e.tl, 0.6, 1.3), c: MARCA.amarillo }); txt(ctx, String(usos), 1170, 410, { s: 210, f: 'anton', w: 400, c: usos >= 3 ? MARCA.menta : CLARO, a: ss(e.tl, 0.6, 1.3), al: 'center', sombra: false });
  panel(ctx, 1420, 150, 400, 300, a2); tm(ctx, 'EN CLIMA', 1452, 204, { a: a2, c: MARCA.amarillo }); tp(ctx, 'Desde el 3.er uso', 1452, 262, { a: a2, s: 34, f: 'serif' }); tp(ctx, 'tiene menos impacto que', 1452, 306, { a: a2, s: 22, c: GRIS }); tp(ctx, 'una de plástico (HDPE)', 1452, 336, { a: a2, s: 22, c: GRIS }); tp(ctx, 'que no se reúsa.', 1452, 366, { a: a2, s: 22, c: GRIS }); tp(ctx, 'Inglaterra · datos de 2006', 1452, 416, { a: a2, s: 19, c: MARCA.oro, f: 'mono', w: 700 });
  // el impacto de fabricarla, repartido entre los usos
  et(ctx, 'EL IMPACTO DE FABRICARLA, REPARTIDO ENTRE SUS USOS (ESQUEMA)', 960, 520, { s: 20, a: a3 }); ctx.save(); ctx.globalAlpha = a3; const w = 860 / usos; for (let i = 0; i < usos; i++) { ctx.fillStyle = i % 2 ? '#2a2d36' : '#14161d'; ctx.beginPath(); ctx.roundRect(960 + i * w + 2, 544, w - 4, 80, 8); ctx.fill(); } ctx.restore();
  et(ctx, 'CADA USO CARGA UNA PARTE MÁS CHICA', 960, 664, { s: 20, a: a3 * ss(e.tl, t3 + 1.5, t3 + 2.3) });
  num(ctx, 'NO SOLO DE QUÉ ESTÁ HECHA', 1390, 740, 54, { a: a4 * (1 - a5) }); num(ctx, '¿CUÁNTAS VECES SE USA?', 1390, 770, 92, { a: a5 });
  fuenteDato(ctx, 'ENVIRONMENT AGENCY · 2011 · DATOS DE 2006', a2 * (1 - a4), 1390, 846);
}, { piso: 770 });
