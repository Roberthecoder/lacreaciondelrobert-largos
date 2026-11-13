// cine-luz-a.jsx — Documental 004 (papel contra plástico), capítulos 0 a 4: gancho, cómo se pesa, Inglaterra, Dinamarca y lo que no se pesa.
// Cada escena: LUZ.id = (ctx, e) => …   ·   e.L(i) = segundo en que empieza la frase i del bloque.
// Regla de este documental: cada cifra en pantalla lleva unidad, año y estudio (fuenteDato). Todo lo dibujado es esquema.
const { TAU, cl, pr, ss, eo, mixn, rng, rgba, mixc, FU, halo, noche, cam, txt, rico, chip, guia, sello, tache, flecha,
  TINTA, MARCA, fondoColor, franja, tinta, panel, fuenteDato, barra, barraH, balanza, bolsaPapel, bolsaPlastico, cajaCarton, arbol, fabrica, camion, pozo, mar, rellenoSanitario, vaso, popote, casa, bote, luzSem } = window.LZK;
const LUZ = window.LUZ;
FU.anton = "'Anton', Impact, sans-serif";
const CLARO = '#F6F3EC';
const en = (e, i, d = 0.7, r = 0) => { const a = e.L(i); return a == null ? 0 : ss(e.tl, a + r, a + r + d); };
const esquema = (ctx, a = 1, x = 60, y = 800) => chip(ctx, 'ESQUEMA', x, y, { c: '#cfd6e6', s: 17, a: a * 0.85 });
// Escena sobre fondo de color de la marca: fondo, cámara lenta, contenido y franja de subtítulos.
const E = (color, fn, o = {}) => (ctx, e) => { fondoColor(ctx, MARCA[color] || color, o); const fin = cam(ctx, 1 + 0.025 * e.p, 960, 540); fn(ctx, e); fin(); franja(ctx); };
// Letra mono chica (etiquetas) y número grande (Anton).
const et = (ctx, s, x, y, o = {}) => txt(ctx, s, x, y, { s: 22, f: 'mono', w: 700, ls: 2, c: TINTA, sombra: false, ...o });
const num = (ctx, s, x, y, sz, o = {}) => txt(ctx, s, x, y, { s: sz, f: 'anton', w: 400, c: TINTA, sombra: false, al: 'center', ...o });
const miles = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// Renglones de texto centrados o alineados.
const parr = (ctx, lineas, x, y, o = {}) => lineas.forEach((l, i) => rico(ctx, l, x, y + i * (o.lh || (o.s || 34) * 1.25), { s: 34, f: 'sans', w: 600, c: TINTA, sombra: false, ...o }));
// Tarjeta de estudio: quién, qué y cuándo. o: w, h, pais, org[], pie
function estudio(ctx, x, y, a, o) {
  a = cl(a); if (a <= 0) return; const w = o.w || 520, h = o.h || 250; panel(ctx, x, y, w, h, a);
  ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = o.c || MARCA.oro; ctx.fillRect(x + 30, y + 30, 6, h - 60); ctx.restore();
  txt(ctx, o.pais, x + 56, y + 58, { s: 22, f: 'mono', w: 700, ls: 4, c: o.c || MARCA.oro, a, sombra: false });
  (o.org || []).forEach((l, i) => rico(ctx, l, x + 56, y + 106 + i * 44, { s: o.so || 36, f: 'serif', w: 500, c: CLARO, a, sombra: false }));
  if (o.pie) txt(ctx, o.pie, x + 56, y + h - 34, { s: 20, f: 'mono', w: 700, ls: 2, c: '#b9c2d6', a, sombra: false });
}
// Etiqueta colgante (como las de producto).
function colgante(ctx, x, y, s, texto, a = 1, o = {}) { a = cl(a); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate((o.rot ?? -0.08) + (1 - a) * 0.3); ctx.font = `700 ${s}px ${FU.mono}`; const w = ctx.measureText(texto).width + s * 2.2, h = s * 2.1; ctx.fillStyle = o.c || '#2E9E57'; ctx.beginPath(); ctx.moveTo(-w / 2 + h / 2, -h / 2); ctx.lineTo(w / 2, -h / 2); ctx.lineTo(w / 2, h / 2); ctx.lineTo(-w / 2 + h / 2, h / 2); ctx.lineTo(-w / 2, 0); ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.arc(-w / 2 + h * 0.45, 0, s * 0.22, 0, TAU); ctx.fill(); ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(texto, s * 0.3, 2); ctx.restore(); }
// Bolsa de tela (para el dato del algodón).
function bolsaTela(ctx, x, y, s, a = 1) { a = cl(a); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#D9CDB4'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(-50, -230); ctx.bezierCurveTo(-50, -350, 50, -350, 50, -230); ctx.stroke(); ctx.fillStyle = '#EDE4CF'; ctx.beginPath(); ctx.roundRect(-110, -240, 220, 240, [4, 4, 16, 16]); ctx.fill(); ctx.strokeStyle = 'rgba(120,100,70,.35)'; ctx.lineWidth = 2; ctx.setLineDash([8, 6]); ctx.strokeRect(-100, -230, 200, 220); ctx.restore(); }

/* ====== báscula de 15 platos (hilo visual del documental) ====== */
// Los 15 indicadores del estudio danés (Miljøstyrelsen 2018, Tabla III).
const IND = ['CAMBIO CLIMÁTICO', 'AGOTAMIENTO DE OZONO', 'TOXICIDAD HUMANA · CÁNCER', 'TOXICIDAD HUMANA · NO CÁNCER', 'OZONO FOTOQUÍMICO', 'RADIACIÓN IONIZANTE', 'PARTÍCULAS', 'ACIDIFICACIÓN', 'EUTROFIZACIÓN TERRESTRE', 'EUTROFIZACIÓN · AGUA DULCE', 'EUTROFIZACIÓN MARINA', 'ECOTOXICIDAD · AGUA DULCE', 'RECURSOS FÓSILES', 'RECURSOS ABIÓTICOS', 'AGUA'];
const PAPEL_GANA = [0, 2, 12]; // clima, toxicidad humana (cáncer) y recursos fósiles: los 3 donde el papel sin blanquear queda delante de la LDPE
// o: x0, x1, y, ap(i) aparición, dy(i) desplazamiento, col(i) color del plato, etq (0..1 nombres), extra (plato 16 punteado), c (tinta), sz
function bascula15(ctx, e, o = {}) {
  const x0 = o.x0 ?? 250, x1 = o.x1 ?? 1670, y = o.y ?? 170, n = 15 + (o.extra ? 1 : 0), c = o.c || TINTA, A = cl(o.a ?? 1), k = o.k || 1; if (A <= 0) return;
  ctx.save(); ctx.globalAlpha *= A; ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineCap = 'round'; ctx.lineWidth = 9 * k; ctx.beginPath(); ctx.moveTo(x0 - 46, y); ctx.lineTo(x1 + 46, y); ctx.stroke();
  const xm = (x0 + x1) / 2; ctx.beginPath(); ctx.moveTo(xm, y - 4); ctx.lineTo(xm - 26 * k, y - 50 * k); ctx.lineTo(xm + 26 * k, y - 50 * k); ctx.closePath(); ctx.fill(); ctx.restore();
  for (let i = 0; i < n; i++) { const x = x0 + i * (x1 - x0) / (n - 1), a = cl(o.ap ? o.ap(i) : 1) * A; if (a <= 0) continue; const ex = i === 15, len = (86 + (o.dy ? o.dy(i) : 0) + Math.sin(e.T * 1.1 + i * 1.3) * 3) * k * (0.4 + 0.6 * a), col = ex ? null : (o.col ? o.col(i) : c);
    ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = c; ctx.lineWidth = 2 * k; if (ex) ctx.setLineDash([7, 7]); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 30 * k, y + len); ctx.moveTo(x, y); ctx.lineTo(x + 30 * k, y + len); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(x, y + len, 36 * k, 11 * k, 0, 0, Math.PI); ctx.closePath(); if (ex) { ctx.lineWidth = 3 * k; ctx.stroke(); } else { ctx.fillStyle = col; ctx.fill(); ctx.setLineDash([]); ctx.lineWidth = 2; ctx.stroke(); }
    ctx.restore();
    const ea = cl(o.etq ?? 1) * a; if (ea > 0 && !ex) { ctx.save(); ctx.translate(x - 6, y + len + 30 * k); ctx.rotate(Math.PI / 2); txt(ctx, IND[i], 0, 0, { s: o.sz || 17, f: 'mono', w: 700, ls: 1, c: o.cet ? o.cet(i) : c, a: ea, sombra: false }); ctx.restore(); }
  }
}

/* ====== 00 · Gancho ====== */
// La bolsa de papel del inicio. Regresa en el cierre, ya usada (misma posición).
const BX = 560, BY = 770;
LUZ.gancho = E('amarillo', (ctx, e) => {
  const cae = eo(e.tl, 0, 0.55), bote1 = Math.sin(pr(e.tl, 0.55, 1.1) * Math.PI) * 26;
  bolsaPapel(ctx, BX, BY - (1 - cae) * 300 - bote1, 1.45, { abre: 0.2 + 0.8 * ss(e.tl, 0.5, 1.2), rot: (1 - cae) * -0.3 + Math.sin(e.T * 0.9) * 0.008 });
  // la etiqueta «la opción ecológica», tachada
  const ae = ss(e.tl, 0.9, 1.5); colgante(ctx, BX + 6, BY - 250, 30, 'LA OPCIÓN ECOLÓGICA', ae, { rot: -0.07 + Math.sin(e.T * 1.3) * 0.015 });
  const at = pr(e.tl, 2.2, 2.8); if (at > 0) { ctx.save(); ctx.strokeStyle = MARCA.rojo; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(BX - 215, BY - 228); ctx.lineTo(BX - 215 + 450 * at, BY - 228 - 44 * at); ctx.stroke(); ctx.restore(); }
  // × 3
  const a3 = ss(e.tl, 3.4, 4.2); num(ctx, '× 3', 1130, 540, 230, { a: a3 }); et(ctx, 'USOS, COMO MÍNIMO', 1130, 592, { al: 'center', s: 26, a: a3 });
  for (let i = 0; i < 3; i++) { const ai = ss(e.tl, 4.4 + i * 0.5, 4.9 + i * 0.5); bolsaPapel(ctx, 1010 + i * 120, 762 + (1 - ai) * 30, 0.34, { a: ai, arruga: i * 0.5, seed: 3 + i }); et(ctx, 'USO ' + (i + 1), 1010 + i * 120, 800, { al: 'center', s: 18, a: ai }); }
  // contra quién y en qué
  const a1 = en(e, 1, 0.8); bolsaPlastico(ctx, 1610, 770 + (1 - a1) * 40, 0.85, { a: a1, T: e.T });
  et(ctx, 'PARA GANARLE EN CLIMA A:', 1610, 356, { al: 'center', s: 20, a: a1 }); parr(ctx, ['una bolsa de plástico', 'delgada, sin reusar'], 1610, 392, { al: 'center', s: 28, a: a1, lh: 34 });
  fuenteDato(ctx, 'ENVIRONMENT AGENCY (INGLATERRA Y GALES) · PUBLICADO 2011 · DATOS DE 2006', en(e, 1, 0.8, 1.2), 900);
  // Irlanda
  const a2 = en(e, 2, 0.8); panel(ctx, 900, 110, 760, 150, a2); txt(ctx, 'IRLANDA · DATO CITADO EN EL MISMO ESTUDIO', 936, 162, { s: 20, f: 'mono', w: 700, ls: 3, c: MARCA.oro, a: a2, sombra: false });
  rico(ctx, 'Las de papel no se reusaban para ir de compras', 936, 218, { s: 31, f: 'serif', w: 500, c: CLARO, a: a2, sombra: false });
}, { piso: 770 });

LUZ.pregunta = E('amarillo', (ctx, e) => {
  const pal = ['¿LA', 'ESTAFA', 'DEL', 'CARTÓN?']; ctx.save(); ctx.font = `400 170px ${FU.anton}`; let x = 960 - (pal.reduce((t, w) => t + ctx.measureText(w).width, 0) + 3 * 42) / 2;
  pal.forEach((w, i) => { const a = eo(e.tl, 0.1 + i * 0.22, 0.6 + i * 0.22), ww = ctx.measureText(w).width; txt(ctx, w, x, 400 + (1 - a) * 40, { s: 170, f: 'anton', w: 400, c: i === 1 ? MARCA.rojo : TINTA, a, sombra: false }); x += ww + 42; }); ctx.restore();
  const y = 760; [[(a) => bolsaPapel(ctx, 330, y, 0.72, { a }), 'BOLSA'], [(a) => cajaCarton(ctx, 640, y, 0.8, { a }), 'CAJA'], [(a) => vaso(ctx, 930, y, 0.85, 'papel', { a }), 'VASO'], [(a) => popote(ctx, 1160, y, 230, 0.2, '#F3EEDF', { a, rayas: '#E5352B' }), 'POPOTE']].forEach(([f, n], i) => { const a = eo(e.tl, 1.3 + i * 0.35, 1.9 + i * 0.35); ctx.save(); ctx.translate(0, (1 - a) * 50); f(a); ctx.restore(); et(ctx, n, [330, 640, 930, 1180][i], 806, { al: 'center', s: 20, a }); });
  const d = en(e, 1, 0.5); sello(ctx, 'DEPENDE', 1520, 600, d, CLARO, -0.1, 84);
  ['DEL INDICADOR · DEL PESO', 'DEL PAÍS · DE LOS USOS'].forEach((s, i) => et(ctx, s, 1520, 716 + i * 36, { al: 'center', s: 24, a: en(e, 1, 0.6, 1.6 + i * 0.7) }));
}, { piso: 770 });

LUZ.tres = E('amarillo', (ctx, e) => {
  const C = [[0.2, 'ESTUDIO 1 · INGLATERRA', ['Datos de 2006', '(publicado en 2011)'], 'EL PAPEL PIERDE', 'en clima', MARCA.coral], [2.6, 'ESTUDIO 2 · DINAMARCA', ['Publicado en 2018', ''], 'EL PAPEL GANA', 'en clima', MARCA.menta], [e.L(1) ?? 5, 'ESTUDIO 3 · PNUMA (ONU)', ['Revisiones de', '2020 y 2021'], 'OTRA PREGUNTA', '¿cuántas veces se usa?', MARCA.oro]];
  C.forEach(([t0, pais, org, big, sub, col], i) => { const a = eo(e.tl, t0, t0 + 0.8), x = 150 + i * 560, y = 190 + Math.sin(e.T * 0.7 + i) * 5;
    ctx.save(); ctx.translate(x + 250, 0); ctx.scale(0.2 + 0.8 * a, 1); ctx.translate(-x - 250, 0); panel(ctx, x, y, 500, 430, a);
    txt(ctx, pais, x + 40, y + 60, { s: 21, f: 'mono', w: 700, ls: 3, c: col, a, sombra: false }); org.forEach((l, k) => txt(ctx, l, x + 40, y + 112 + k * 40, { s: 32, f: 'serif', w: 500, c: CLARO, a, sombra: false }));
    ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.fillRect(x + 40, y + 210, 420 * ss(e.tl, t0 + 0.5, t0 + 1.4), 4); ctx.restore();
    txt(ctx, big, x + 40, y + 300, { s: 62, f: 'anton', w: 400, c: col, a: ss(e.tl, t0 + 0.7, t0 + 1.3), sombra: false }); txt(ctx, sub, x + 40, y + 352, { s: 30, f: 'sans', w: 600, c: CLARO, a: ss(e.tl, t0 + 0.9, t0 + 1.5), sombra: false }); });
  const a2 = en(e, 2, 0.8); bolsaPapel(ctx, 520, 830, 0.42, { a: a2 }); bolsaPlastico(ctx, 1400, 830, 0.42, { a: a2, T: e.T }); num(ctx, 'PAPEL  CONTRA  PLÁSTICO', 960, 790, 70, { a: a2 });
  et(ctx, 'PNUMA = PROGRAMA DE LAS NACIONES UNIDAS PARA EL MEDIO AMBIENTE', 960, 668, { al: 'center', s: 19, a: en(e, 1, 0.8, 1.4) * (1 - a2 * 0) });
});

/* ====== 01 · ¿Cómo se pesa lo «ecológico»? ====== */
LUZ.ciclo = E('menta', (ctx, e) => {
  const X = [230, 600, 970, 1320, 1680], Y = 650, N = ['MATERIA PRIMA', 'FABRICACIÓN', 'TRANSPORTE', 'USO', 'DESECHO'];
  const ap = [en(e, 2, 0.8), en(e, 3, 0.6), en(e, 3, 0.6, 1.0), en(e, 3, 0.6, 1.6), en(e, 3, 0.6, 2.4)];
  num(ctx, '¿MÁS ECOLÓGICO?', 960, 220, 120, { a: ss(e.tl, 0.2, 0.9) * (1 - en(e, 4, 0.6)) });
  et(ctx, 'UNA BOLSA NO CONTAMINA EN UN SOLO LUGAR', 960, 282, { al: 'center', s: 26, a: en(e, 1, 0.7) * (1 - en(e, 4, 0.6)) });
  // camino punteado
  const av = pr(e.tl, e.L(1) ?? 3, (e.L(4) ?? 14)); ctx.save(); ctx.strokeStyle = rgba(TINTA, 0.55); ctx.lineWidth = 5; ctx.setLineDash([4, 18]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(120, Y + 36); ctx.lineTo(120 + 1680 * cl(av * 1.05), Y + 36); ctx.stroke(); ctx.restore();
  arbol(ctx, X[0] - 80, Y, 250, { a: ap[0], T: e.T, talado: en(e, 2, 1.6, 1.2) }); arbol(ctx, X[0] - 150, Y, 180, { a: ap[0], T: e.T, c: '#278a4b' }); pozo(ctx, X[0] + 70, Y, 0.72, e.T, { a: en(e, 2, 0.8, 2.0) });
  fabrica(ctx, X[1], Y, 0.85, e.T, { a: ap[1] }); camion(ctx, X[2] + Math.sin(e.T * 0.6) * 14, Y + 6, 0.8, e.T, { a: ap[2] }); casa(ctx, X[3], Y, 0.95, { a: ap[3] }); bote(ctx, X[4], Y, 0.95, { a: ap[4] });
  N.forEach((n, i) => et(ctx, n, X[i], Y + 86, { al: 'center', s: 21, a: ap[i] }));
  // la bolsa viaja
  const bx = mixn(140, 1700, cl(av)); bolsaPapel(ctx, bx, Y + 30 - Math.abs(Math.sin(e.T * 3)) * 8, 0.22, { a: ss(e.tl, (e.L(1) ?? 3), (e.L(1) ?? 3) + 0.5) });
  // llave: análisis de ciclo de vida
  const a4 = en(e, 4, 0.9); ctx.save(); ctx.globalAlpha = a4; ctx.strokeStyle = TINTA; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(120, 330); ctx.lineTo(120, 300); ctx.lineTo(120 + 1680 * a4, 300); if (a4 > 0.98) ctx.lineTo(1800, 330); ctx.stroke(); ctx.restore();
  num(ctx, 'ANÁLISIS DE CICLO DE VIDA (ACV)', 960, 250, 84, { a: a4 });
  const a5 = en(e, 5, 0.7); et(ctx, '← LA CUNA', 150, 362, { s: 26, a: a5 }); et(ctx, 'LA TUMBA →', 1770, 362, { s: 26, al: 'right', a: a5 });
  esquema(ctx, ap[0], 60, 810);
}, { piso: 650 });

LUZ.bascula15 = E('menta', (ctx, e) => {
  const a0 = ss(e.tl, 0.3, 1), t1 = e.L(1) ?? 4.5, t4 = e.L(4) ?? 17, sal = 1 - ss(e.tl, t1 - 0.6, t1);
  num(ctx, '1', 960, 520, 360, { a: a0 * sal }); et(ctx, '¿UN SOLO NÚMERO?', 960, 690, { al: 'center', s: 30, a: a0 * sal }); tache(ctx, 960, 400, 190, ss(e.tl, 2.2, 3) * sal, MARCA.rojo);
  const gana = (i) => [0, 3, 4, 8, 11, 13].includes(i), mov = ss(e.tl, t4, t4 + 1.6);
  bascula15(ctx, e, { ap: (i) => ss(e.tl, t1 + i * 0.22, t1 + 0.5 + i * 0.22), dy: (i) => mov * (gana(i) ? -34 : 44), etq: 1,
    col: (i) => { const res = [0, 14, 1, 9, 2].indexOf(i), t2 = e.L(2) ?? 10, on = res >= 0 ? ss(e.tl, t2 + res * 0.9, t2 + res * 0.9 + 0.4) * (1 - ss(e.tl, t2 + res * 0.9 + 1.2, t2 + res * 0.9 + 1.8)) : 0; return mixc(mixc(TINTA, MARCA.oro, on), gana(i) ? '#0f7a44' : '#c5271d', mov); } });
  const c15 = Math.round(15 * pr(e.tl, t1, t1 + 3.6)); num(ctx, String(c15), 1500, 770, 150, { a: ss(e.tl, t1, t1 + 0.5), al: 'right' }); parr(ctx, ['indicadores', 'distintos'], 1520, 716, { s: 34, a: ss(e.tl, t1, t1 + 0.5), lh: 40 });
  const am = ss(e.tl, t4 + 0.6, t4 + 1.4); luzSem(ctx, 300, 728, 13, '#0f7a44', am); et(ctx, 'EN UNOS PLATOS GANA', 326, 736, { s: 21, a: am }); luzSem(ctx, 300, 772, 13, '#c5271d', am); et(ctx, 'EN OTROS PIERDE (EJEMPLO, NO SON RESULTADOS)', 326, 780, { s: 21, a: am });
  fuenteDato(ctx, 'MILJØSTYRELSEN (AGENCIA AMBIENTAL DE DINAMARCA) · 2018 · 15 CATEGORÍAS DE IMPACTO', ss(e.tl, t1 + 1, t1 + 1.8));
});

LUZ.mejor = E('menta', (ctx, e) => {
  const a = ss(e.tl, 0.2, 0.9), b = en(e, 1, 0.6);
  ctx.save(); ctx.globalAlpha = a * (1 - 0.25 * b); ctx.fillStyle = '#14161d'; ctx.beginPath(); ctx.roundRect(240, 210, 700, 170, 40); ctx.fill(); ctx.beginPath(); ctx.moveTo(360, 378); ctx.lineTo(330, 440); ctx.lineTo(430, 378); ctx.closePath(); ctx.fill(); ctx.restore();
  txt(ctx, '«El papel es mejor»', 590, 316, { s: 64, f: 'serif', w: 500, c: CLARO, a, al: 'center', sombra: false });
  bolsaPapel(ctx, 1560, 780, 0.9, { a });
  num(ctx, '¿MEJOR EN QUÉ?', 720, 680 + (1 - b) * 30, 180, { a: b });
}, { piso: 780 });

/* ====== 02 · Inglaterra ====== */
LUZ.uk_intro = E('rosa', (ctx, e) => {
  estudio(ctx, 130, 170, ss(e.tl, 0.2, 1), { w: 760, h: 330, pais: 'ESTUDIO 1 · INGLATERRA Y GALES', org: ['Environment Agency', 'Agencia de Medio Ambiente', 'de Inglaterra y Gales'], pie: 'PUBLICADO: 2011 · BOLSAS DE SÚPER DE 2006', c: MARCA.rosa });
  const ab = ss(e.tl, 1.2, 2); [['plastico', 250], ['papel', 470], ['tela', 690]].forEach(([k, x], i) => { const a = ss(e.tl, 1.4 + i * 0.4, 2 + i * 0.4); k === 'papel' ? bolsaPapel(ctx, x, 790, 0.55, { a }) : k === 'tela' ? bolsaTela(ctx, x, 790, 0.62, a) : bolsaPlastico(ctx, x, 790, 0.6, { a, T: e.T }); });
  et(ctx, 'ANÁLISIS DE CICLO DE VIDA DE BOLSAS DE SÚPER', 150, 556, { s: 20, a: ab });
  // el mandado de un mes: 483 artículos
  const a1 = en(e, 1, 0.8), t1 = e.L(1) ?? 7.5; panel(ctx, 990, 170, 800, 640, a1); txt(ctx, 'LA TAREA QUE SE COMPARA', 1030, 230, { s: 21, f: 'mono', w: 700, ls: 4, c: MARCA.rosa, a: a1, sombra: false });
  txt(ctx, 'Cargar el mandado de un mes', 1030, 284, { s: 44, f: 'serif', w: 500, c: CLARO, a: a1, sombra: false });
  const n = Math.round(483 * pr(e.tl, t1 + 0.6, t1 + 3.6)); ctx.save(); ctx.globalAlpha = a1; const r = rng(4), cols = ['#FFD23F', '#35DDA9', '#FF86AE', '#45C9F2', '#F6F3EC', '#FFA04A'];
  for (let i = 0; i < 483; i++) { const cx = 1040 + (i % 35) * 20.6, cy = 330 + Math.floor(i / 35) * 20.6, c = cols[Math.floor(r() * 6)]; ctx.fillStyle = i < n ? c : 'rgba(255,255,255,.08)'; ctx.beginPath(); ctx.roundRect(cx, cy, 14, 14, 3); ctx.fill(); } ctx.restore();
  txt(ctx, String(n), 1030, 760, { s: 110, f: 'anton', w: 400, c: CLARO, a: a1, sombra: false }); txt(ctx, 'artículos del súper a la casa', 1250, 720, { s: 30, f: 'sans', w: 600, c: CLARO, a: a1, sombra: false }); txt(ctx, 'REINO UNIDO · 2006/07', 1250, 758, { s: 20, f: 'mono', w: 700, ls: 3, c: '#b9c2d6', a: a1, sombra: false });
  fuenteDato(ctx, 'ENVIRONMENT AGENCY · REPORTE SC030148 · 2011', a1, 500);
}, { piso: 790 });

LUZ.uk_peso = E('rosa', (ctx, e) => {
  const a1 = en(e, 1, 0.7), a2 = en(e, 2, 0.7), a3 = en(e, 3, 0.7);
  const ang = 0.3 * eo(e.tl, e.L(2) ?? 6.7, (e.L(2) ?? 6.7) + 1.4) - 0.1 * a1 * (1 - a2) + Math.sin(e.T * 1.5) * 0.008;
  num(ctx, 'EL PESO DE UNA BOLSA', 960, 190, 78, { a: ss(e.tl, 0.2, 0.9) });
  const P = balanza(ctx, 720, 330, 1.05, ang);
  bolsaPlastico(ctx, P[0][0], P[0][1], 0.5, { a: a1, T: e.T }); bolsaPapel(ctx, P[1][0], P[1][1], 0.52, { a: a2 });
  const g1 = (8.12 * pr(e.tl, e.L(1) ?? 3, (e.L(1) ?? 3) + 1.2)).toFixed(2), g2 = (55.2 * pr(e.tl, e.L(2) ?? 6.7, (e.L(2) ?? 6.7) + 1.4)).toFixed(2);
  panel(ctx, 1200, 260, 580, 190, a1); txt(ctx, 'BOLSA DE PLÁSTICO DELGADA', 1236, 310, { s: 20, f: 'mono', w: 700, ls: 3, c: MARCA.cian, a: a1, sombra: false }); txt(ctx, 'HDPE: polietileno de alta densidad', 1236, 342, { s: 22, f: 'sans', w: 500, c: '#b9c2d6', a: a1, sombra: false }); txt(ctx, g1 + ' g', 1236, 424, { s: 84, f: 'anton', w: 400, c: CLARO, a: a1, sombra: false });
  panel(ctx, 1200, 474, 580, 170, a2); txt(ctx, 'BOLSA DE PAPEL', 1236, 524, { s: 20, f: 'mono', w: 700, ls: 3, c: MARCA.kraft, a: a2, sombra: false }); txt(ctx, g2 + ' g', 1236, 618, { s: 84, f: 'anton', w: 400, c: CLARO, a: a2, sombra: false });
  num(ctx, '× 6.8', 1380, 770, 130, { a: a3 }); parr(ctx, ['más material', 'por bolsa'], 1540, 720, { s: 32, a: a3, lh: 38 });
  fuenteDato(ctx, 'ENVIRONMENT AGENCY · 2011 · TABLA 3.2 · BOLSAS DE SÚPER DE 2006', a1, 700);
});

LUZ.uk_fabrica = E('rosa', (ctx, e) => {
  const a = ss(e.tl, 0.2, 0.9), g = eo(e.tl, 1.0, 3.2);
  arbol(ctx, 300, 520, 260, { a, T: e.T, talado: ss(e.tl, 1, 2.4) }); arbol(ctx, 210, 520, 190, { a, T: e.T }); fabrica(ctx, 640, 520, 0.9, e.T, { a: ss(e.tl, 0.6, 1.3) }); bolsaPapel(ctx, 1560, 520, 0.8, { a: ss(e.tl, 1.2, 1.9) });
  flecha(ctx, 380, 440, 470, 440, ss(e.tl, 1, 1.6), TINTA, 6); flecha(ctx, 840, 440, 1380, 440, ss(e.tl, 1.4, 2.4), TINTA, 6);
  et(ctx, 'IMPACTO DE LA BOLSA DE PAPEL · EN LAS 8 CATEGORÍAS QUE MIDIÓ EL ESTUDIO', 200, 606, { s: 22, a });
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(22,18,15,.18)'; ctx.beginPath(); ctx.roundRect(200, 630, 1520, 96, 14); ctx.fill(); const w = 1520 * 0.7 * g; ctx.fillStyle = '#14161d'; ctx.beginPath(); ctx.roundRect(200, 630, w, 96, [14, 0, 0, 14]); ctx.fill();
  const gr = ctx.createLinearGradient(200 + w, 0, 200 + w + 200 * g, 0); gr.addColorStop(0, '#14161d'); gr.addColorStop(1, 'rgba(20,22,29,0)'); ctx.fillStyle = gr; ctx.fillRect(200 + w - 1, 630, 200 * g, 96); ctx.restore();
  txt(ctx, 'MÁS DE 70 %', 240, 700, { s: 64, f: 'anton', w: 400, c: MARCA.rosa, a: ss(e.tl, 1.6, 2.4), sombra: false }); txt(ctx, 'extraer y fabricar el material', 640, 692, { s: 34, f: 'sans', w: 600, c: CLARO, a: ss(e.tl, 2, 2.8), sombra: false });
  et(ctx, 'TRANSPORTE, USO Y DESECHO: EL RESTO', 1700, 770, { s: 20, al: 'right', a: ss(e.tl, 2.6, 3.4) }); et(ctx, 'EL ESTUDIO NO DA UN PORCENTAJE EXACTO: DICE «MÁS DE 70 %»', 200, 770, { s: 20, a: ss(e.tl, 2.6, 3.4) });
  fuenteDato(ctx, 'ENVIRONMENT AGENCY · 2011 · DATOS DE 2006 · SECCIÓN 5.2.4', ss(e.tl, 1.6, 2.4));
}, { piso: 520 });

LUZ.uk_barras = E('rosa', (ctx, e) => {
  const a0 = ss(e.tl, 0.2, 0.9), t1 = e.L(1) ?? 5.3, t3 = e.L(3) ?? 19.5, t4 = e.L(4) ?? 24.3, a1 = ss(e.tl, t1, t1 + 0.6), a2 = en(e, 2, 0.7), a3 = en(e, 3, 0.7), a4 = en(e, 4, 0.7);
  et(ctx, 'POR EL MANDADO DE UN MES · BOLSAS DE PAPEL USADAS UNA SOLA VEZ', 640, 150, { s: 22, a: a0 });
  // panel 1: gases de efecto invernadero
  panel(ctx, 110, 180, 700, 620, a0); txt(ctx, 'GASES DE EFECTO INVERNADERO', 150, 236, { s: 22, f: 'mono', w: 700, ls: 3, c: MARCA.rosa, a: a0, sombra: false }); txt(ctx, 'kg de CO₂ equivalente', 150, 270, { s: 24, f: 'sans', w: 500, c: '#b9c2d6', a: a0, sombra: false });
  const H = 360, yb = 716, g1 = eo(e.tl, 1.0, 2.6), g2 = eo(e.tl, t1, t1 + 2.2), g3 = eo(e.tl, t3, t3 + 1.6);
  barra(ctx, 270, yb, 120, H, 1.578 / 5.523, MARCA.cian, { a: g1, val: (1.578 * g1).toFixed(2), nom: 'PLÁSTICO', sub: 'HDPE · 40 % reusadas' });
  barra(ctx, 480, yb, 120, H, 2.082 / 5.523, 'rgba(69,201,242,.45)', { a: g3, val: (2.082 * g3).toFixed(2), nom: 'PLÁSTICO', sub: 'sin reúso' });
  barra(ctx, 680, yb, 120, H, 1, MARCA.kraft, { a: g2, val: (5.523 * g2).toFixed(2), nom: 'PAPEL', sub: 'sin reúso' });
  // razones
  const xr = 860; num(ctx, '× 3.5', xr, 330, 140, { a: a1 * ss(e.tl, t1 + 1.6, t1 + 2.2), al: 'left' }); et(ctx, 'PAPEL CONTRA PLÁSTICO (40 % REUSADAS)', xr + 6, 372, { s: 19, a: a1 * ss(e.tl, t1 + 1.6, t1 + 2.2) });
  // el supuesto: 4 de cada 10
  const yq = 470; et(ctx, 'EL SUPUESTO: 4 DE CADA 10 BOLSAS DE', xr + 6, yq - 30, { s: 19, a: a2 }); et(ctx, 'PLÁSTICO SE REUSABAN COMO BOLSA DE BASURA', xr + 6, yq - 4, { s: 19, a: a2 });
  for (let i = 0; i < 10; i++) { const ai = en(e, 2, 0.4, 0.4 + i * 0.12); bolsaPlastico(ctx, xr + 30 + i * 54, yq + 108, 0.2, { a: ai * (i < 4 ? 1 : 0.45), T: e.T, seed: i + 2 }); if (i < 4) { ctx.save(); ctx.globalAlpha = ai; ctx.fillStyle = '#14161d'; ctx.beginPath(); ctx.arc(xr + 30 + i * 54, yq + 124, 9, 0, TAU); ctx.fill(); ctx.restore(); } }
  num(ctx, '× 2.65', xr, 690, 100, { a: a3 * ss(e.tl, t3 + 1, t3 + 1.6), al: 'left' }); et(ctx, 'SI NINGUNA DE PLÁSTICO SE REÚSA', xr + 6, 724, { s: 19, a: a3 * ss(e.tl, t3 + 1, t3 + 1.6) });
  // panel 2: eutrofización
  const px = 1500 - 0; panel(ctx, 1470, 180, 350, 370, a4); txt(ctx, 'EUTROFIZACIÓN', 1496, 232, { s: 22, f: 'mono', w: 700, ls: 3, c: MARCA.rosa, a: a4, sombra: false }); txt(ctx, 'g de fosfato (PO₄) equivalente', 1496, 264, { s: 20, f: 'sans', w: 500, c: '#b9c2d6', a: a4, sombra: false });
  const g5 = eo(e.tl, t4 + 0.4, t4 + 2.2); barra(ctx, 1560, 496, 90, 150, 0.775 / 5.039, MARCA.cian, { a: g5, val: (0.775 * g5).toFixed(2), nom: 'PLÁSTICO', sv: 34, sn: 18 }); barra(ctx, 1730, 496, 90, 150, 1, MARCA.kraft, { a: g5, val: (5.039 * g5).toFixed(2), nom: 'PAPEL', sv: 34, sn: 18 });
  txt(ctx, '× 6.5', 1600, 340, { s: 60, f: 'anton', w: 400, c: CLARO, a: ss(e.tl, t4 + 1.8, t4 + 2.4), al: 'center', sombra: false });
  fuenteDato(ctx, 'ENVIRONMENT AGENCY · 2011 · DATOS DE 2006 · TABLAS 5.1, 5.4 Y 6.1', ss(e.tl, 1.6, 2.4), 760);
});

LUZ.uk_tres = E('rosa', (ctx, e) => {
  const a1 = en(e, 1, 0.7), t1 = e.L(1) ?? 2.8, a2 = en(e, 2, 0.8), a3 = en(e, 3, 0.8), a4 = en(e, 4, 0.8), a5 = en(e, 5, 0.8);
  num(ctx, '3', 330, 520, 420, { a: ss(e.tl, 0.2, 0.8) }); et(ctx, 'USOS, COMO MÍNIMO', 330, 580, { al: 'center', s: 26, a: ss(e.tl, 0.6, 1.2) });
  for (let i = 0; i < 3; i++) { const ai = ss(e.tl, t1 + 0.6 + i * 1.6, t1 + 1.2 + i * 1.6), x = 640 + i * 200; bolsaPapel(ctx, x, 470 + (1 - ai) * 30, 0.55, { a: ai, arruga: i * 0.5, seed: 4 + i }); et(ctx, 'USO ' + (i + 1), x, 512, { al: 'center', s: 20, a: ai }); }
  const ok = ss(e.tl, t1 + 5.2, t1 + 5.8); luzSem(ctx, 1040, 196, 22, '#0f7a44', ok); ctx.save(); ctx.globalAlpha = ok; ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(1030, 196); ctx.lineTo(1038, 205); ctx.lineTo(1052, 187); ctx.stroke(); ctx.restore();
  panel(ctx, 1180, 180, 600, 250, a1); txt(ctx, 'QUÉ SIGNIFICA ESE «3»', 1216, 232, { s: 20, f: 'mono', w: 700, ls: 3, c: MARCA.rosa, a: a1, sombra: false });
  ['Solo en clima', '(potencial de calentamiento global).', 'Contra una bolsa de plástico HDPE', 'que no se reúsa.'].forEach((l, i) => txt(ctx, l, 1216, 280 + i * 38, { s: i % 2 ? 26 : 30, f: 'sans', w: i % 2 ? 500 : 700, c: i % 2 ? '#b9c2d6' : CLARO, a: a1, sombra: false }));
  // no se contó como bolsa de basura
  bote(ctx, 300, 780, 0.72, { a: a2 }); bolsaPapel(ctx, 470, 780, 0.4, { a: a2, rota: ss(e.tl, (e.L(2) ?? 11) + 1.2, (e.L(2) ?? 11) + 2.4), fondoRoto: '#c96a8c', arruga: 0.8 }); tache(ctx, 385, 700, 60, ss(e.tl, (e.L(2) ?? 11) + 1.6, (e.L(2) ?? 11) + 2.4), MARCA.rojo);
  parr(ctx, ['No se contó como', 'bolsa de basura:', 'sin evidencia de que sirva'], 570, 670, { s: 26, a: a2, lh: 32 });
  // algodón
  bolsaTela(ctx, 1010, 780, 0.5, a3); const n131 = Math.round(131 * pr(e.tl, e.L(3) ?? 18, (e.L(3) ?? 18) + 2.2)); num(ctx, String(n131), 1180, 730, 110, { a: a3, al: 'left' }); parr(ctx, ['usos: bolsa', 'de algodón'], 1180, 764, { s: 24, a: a3, lh: 28 });
  // marcador
  panel(ctx, 1400, 560, 400, 240, a4); txt(ctx, 'ESTUDIO 1 · EN CLIMA', 1432, 608, { s: 19, f: 'mono', w: 700, ls: 3, c: MARCA.rosa, a: a4, sombra: false }); txt(ctx, 'Gana el plástico', 1432, 664, { s: 44, f: 'serif', w: 500, c: CLARO, a: a4, sombra: false });
  txt(ctx, '…CON ESTOS SUPUESTOS', 1432, 718, { s: 26, f: 'anton', w: 400, c: MARCA.oro, a: a5, sombra: false }); txt(ctx, 'pesos de 2006 · 1 uso · 40 % de reúso', 1432, 760, { s: 20, f: 'sans', w: 500, c: '#b9c2d6', a: a5, sombra: false });
  fuenteDato(ctx, 'ENVIRONMENT AGENCY · 2011 · DATOS DE 2006', a1, 800, 846);
});

/* ====== 03 · Dinamarca ====== */
function podio(ctx, x, y, a, rev, T) {
  const B = [[0, 200, '1.º', 'PAPEL SIN', 'BLANQUEAR'], [-250, 140, '2.º', 'BIOPOLÍMERO', ''], [250, 100, '3.º', 'PLÁSTICO', 'LDPE']];
  B.forEach(([dx, h, n, l1, l2], i) => { const ai = cl(a * 1.4 - i * 0.2), hh = h * eo(ai, 0, 1); ctx.save(); ctx.globalAlpha = cl(ai); ctx.fillStyle = '#14161d'; ctx.beginPath(); ctx.roundRect(x + dx - 120, y - hh, 240, hh, [10, 10, 0, 0]); ctx.fill(); ctx.restore();
    txt(ctx, n, x + dx, y - hh + 66, { s: 56, f: 'anton', w: 400, c: i === 0 ? MARCA.oro : CLARO, a: cl(ai), al: 'center', sombra: false });
    const r = cl(rev - i * 0.25); if (i === 0) bolsaPapel(ctx, x + dx, y - hh - (1 - r) * 40, 0.52, { a: r, c: '#B98F5E' }); else bolsaPlastico(ctx, x + dx, y - hh - (1 - r) * 40, 0.5, { a: r, T, grosor: i === 2 ? 0.8 : 0.4, c: i === 1 ? '#CDEFD2' : '#F3F6FB' });
    txt(ctx, '?', x + dx, y - hh - 60, { s: 110, f: 'anton', w: 400, c: TINTA, a: cl(ai) * (1 - cl(rev * 3 - i * 0.6)), al: 'center', sombra: false });
    et(ctx, l1, x + dx, y + 36, { al: 'center', s: 19, a: r }); if (l2) et(ctx, l2, x + dx, y + 60, { al: 'center', s: 19, a: r }); });
}
LUZ.dk_podio = E('cian', (ctx, e) => {
  estudio(ctx, 110, 170, ss(e.tl, 0.2, 1), { w: 560, h: 330, pais: 'ESTUDIO 2 · DINAMARCA', org: ['Miljøstyrelsen', 'Agencia de Protección', 'Ambiental de Dinamarca'], pie: 'PUBLICADO: FEBRERO DE 2018', c: MARCA.cian });
  et(ctx, 'CÁLCULOS DE LA UNIVERSIDAD TÉCNICA', 126, 548, { s: 19, a: ss(e.tl, 1, 1.8) }); et(ctx, 'DE DINAMARCA (DTU) · 15 INDICADORES', 126, 574, { s: 19, a: ss(e.tl, 1, 1.8) });
  const a1 = en(e, 1, 1), rev = pr(e.tl, e.L(2) ?? 10.8, (e.L(2) ?? 10.8) + 1.6);
  num(ctx, 'CAMBIO CLIMÁTICO', 1080, 190, 76, { a: a1 }); et(ctx, 'LAS TRES BOLSAS CON MENOR IMPACTO', 1080, 234, { al: 'center', s: 21, a: a1 });
  podio(ctx, 1080, 740, a1, rev, e.T);
  const a3 = en(e, 3, 0.8); panel(ctx, 110, 620, 560, 180, a3); txt(ctx, 'REÚSOS PARA IGUALAR A LA LDPE, EN CLIMA', 140, 668, { s: 18, f: 'mono', w: 700, ls: 2, c: MARCA.cian, a: a3, sombra: false }); txt(ctx, '0', 150, 778, { s: 110, f: 'anton', w: 400, c: CLARO, a: a3, sombra: false }); txt(ctx, 'papel sin blanquear', 230, 746, { s: 28, f: 'sans', w: 600, c: CLARO, a: a3, sombra: false }); txt(ctx, 'LDPE: polietileno de baja densidad', 230, 780, { s: 20, f: 'sans', w: 500, c: '#b9c2d6', a: a3, sombra: false });
  fuenteDato(ctx, 'MILJØSTYRELSEN · 2018 · TABLAS III Y IV', a1, 1080);
});

LUZ.dk_reglas = E('cian', (ctx, e) => {
  const a0 = ss(e.tl, 0.2, 0.9), a1 = en(e, 1, 0.7), a2 = en(e, 2, 0.7), a3 = en(e, 3, 0.7), a4 = en(e, 4, 0.7);
  num(ctx, '¿SE EQUIVOCÓ?', 960, 540, 190, { a: a0 * (1 - a1) }); sello(ctx, 'OTRAS CONDICIONES', 1240, 180, a1, CLARO, -0.03, 44);
  panel(ctx, 110, 250, 1700, 540, a1); const X1 = 620, X2 = 1220;
  txt(ctx, 'INGLATERRA · DATOS DE 2006', X1, 310, { s: 21, f: 'mono', w: 700, ls: 3, c: MARCA.rosa, a: a1, sombra: false }); txt(ctx, 'DINAMARCA · 2018', X2, 310, { s: 21, f: 'mono', w: 700, ls: 3, c: MARCA.cian, a: a1, sombra: false });
  const fila = (y, nom, a, v1, v2, max, col, u1, u2) => { txt(ctx, nom, 150, y + 12, { s: 30, f: 'serif', w: 500, c: CLARO, a, sombra: false }); const g = eo(a, 0, 1); barraH(ctx, X1, y, 440, 44, v1 / max, col, { a: g, val: (v1 * g).toFixed(1) + ' g' }); barraH(ctx, X2, y, 440, 44, v2 / max, col, { a: g, val: (v2 * g).toFixed(1) + ' g' }); txt(ctx, u1, X1, y + 52, { s: 19, f: 'sans', w: 500, c: '#b9c2d6', a, sombra: false }); txt(ctx, u2, X2, y + 52, { s: 19, f: 'sans', w: 500, c: '#b9c2d6', a, sombra: false }); };
  fila(390, 'Bolsa de plástico', a2, 8.12, 24.2, 62, MARCA.cian, 'HDPE (alta densidad)', 'LDPE (baja densidad)'); fila(520, 'Bolsa de papel', a3, 55.2, 44.7, 62, MARCA.kraft, '', 'sin blanquear');
  txt(ctx, 'Final supuesto', 150, 656, { s: 30, f: 'serif', w: 500, c: CLARO, a: a4, sombra: false }); txt(ctx, '(sin dato en este guion)', X1, 656, { s: 22, f: 'sans', w: 500, c: '#8690a8', a: a4, sombra: false });
  ['INCINERACIÓN', 'RECICLAJE', 'BOLSA DE BASURA Y LUEGO INCINERACIÓN'].forEach((s, i) => { const ai = en(e, 4, 0.5, 0.5 + i * 0.7); luzSem(ctx, X2 + 12, 640 + i * 34, 9, MARCA.cian, ai); txt(ctx, s, X2 + 34, 648 + i * 34, { s: 20, f: 'mono', w: 700, ls: 2, c: CLARO, a: ai, sombra: false }); });
  txt(ctx, 'NO SE CONSIDERÓ EL RELLENO SANITARIO', X2, 766, { s: 18, f: 'mono', w: 700, ls: 2, c: MARCA.oro, a: en(e, 4, 0.6, 2.6), sombra: false });
  fuenteDato(ctx, 'ENVIRONMENT AGENCY 2011 (TABLA 3.2) · MILJØSTYRELSEN 2018 (TABLA 2)', a2);
});

LUZ.dk_43 = E('cian', (ctx, e) => {
  const a1 = en(e, 1, 0.8), t1 = e.L(1) ?? 2.6, a2 = en(e, 2, 0.5), a3 = en(e, 3, 0.8);
  num(ctx, 'EL GIRO', 960, 440, 260, { a: ss(e.tl, 0.2, 0.8) * (1 - a1) });
  et(ctx, 'REÚSOS PARA IGUALAR A LA BOLSA DE PLÁSTICO (LDPE) · BOLSA DE PAPEL SIN BLANQUEAR', 150, 170, { s: 21, a: a1 });
  panel(ctx, 110, 200, 1300, 470, a1); const n = Math.round(43 * pr(e.tl, t1 + 2.6, t1 + 6.6));
  txt(ctx, 'SOLO CLIMA', 150, 270, { s: 22, f: 'mono', w: 700, ls: 3, c: MARCA.cian, a: a1, sombra: false }); txt(ctx, '0', 150, 370, { s: 96, f: 'anton', w: 400, c: CLARO, a: a1, sombra: false }); txt(ctx, 'reúsos', 216, 366, { s: 30, f: 'sans', w: 600, c: CLARO, a: a1, sombra: false });
  txt(ctx, 'LOS 15 INDICADORES A LA VEZ', 480, 270, { s: 22, f: 'mono', w: 700, ls: 3, c: MARCA.oro, a: a1, sombra: false });
  txt(ctx, String(n), 480, 430 + 0, { s: 170 + 16 * a2 * (1 - en(e, 3, 0.6)), f: 'anton', w: 400, c: MARCA.oro, a: ss(e.tl, t1 + 2.4, t1 + 3), sombra: false }); txt(ctx, 'reúsos, como mínimo', 720, 420, { s: 34, f: 'sans', w: 600, c: CLARO, a: ss(e.tl, t1 + 2.4, t1 + 3), sombra: false });
  for (let i = 0; i < 43; i++) { const on = i < n; bolsaPapel(ctx, 500 + (i % 22) * 40, 550 + Math.floor(i / 22) * 86, 0.13, { a: a1 * (on ? 1 : 0.18), arruga: on ? Math.min(1, i / 20) : 0, seed: i }); }
  txt(ctx, 'El 43 es el indicador que más reúsos pide de los 15.', 150, 660, { s: 22, f: 'sans', w: 500, c: '#b9c2d6', a: ss(e.tl, t1 + 6, t1 + 7), sombra: false });
  panel(ctx, 110, 690, 1300, 110, a3); txt(ctx, 'PAPEL BLANQUEADO', 150, 740, { s: 22, f: 'mono', w: 700, ls: 3, c: '#F6F3EC', a: a3, sombra: false }); txt(ctx, 'más impacto en la fabricación · reúsos: 1 (clima) y 43 (todos)', 150, 776, { s: 26, f: 'sans', w: 500, c: CLARO, a: a3, sombra: false });
  fuenteDato(ctx, 'MILJØSTYRELSEN · 2018 · TABLA IV', a1, 760);
});

LUZ.dk_platos = E('cian', (ctx, e) => {
  const t0 = 0.4, t1 = e.L(1) ?? 8.2, t3 = e.L(3) ?? 19.5, g = (i) => PAPEL_GANA.includes(i);
  bascula15(ctx, e, { y: 150, ap: (i) => ss(e.tl, 0.1 + i * 0.05, 0.6 + i * 0.05), etq: 1,
    dy: (i) => g(i) ? -30 * ss(e.tl, t0 + 1 + PAPEL_GANA.indexOf(i) * 1.8, t0 + 2 + PAPEL_GANA.indexOf(i) * 1.8) : 46 * ss(e.tl, t1 + i * 0.1, t1 + 1 + i * 0.1),
    col: (i) => g(i) ? mixc(TINTA, '#B98F5E', ss(e.tl, t0 + 1 + PAPEL_GANA.indexOf(i) * 1.8, t0 + 2 + PAPEL_GANA.indexOf(i) * 1.8)) : mixc(TINTA, '#F3F6FB', ss(e.tl, t1 + i * 0.1, t1 + 1 + i * 0.1)) });
  const a0 = ss(e.tl, 1.2, 2), a1 = ss(e.tl, t1, t1 + 0.8);
  luzSem(ctx, 300, 700, 15, '#B98F5E', a0); num(ctx, '3', 380, 728, 100, { a: a0 }); parr(ctx, ['platos donde le va mejor', 'al papel sin blanquear'], 430, 692, { s: 26, a: a0, lh: 32 });
  luzSem(ctx, 900, 700, 15, '#F3F6FB', a1); num(ctx, '12', 1000, 728, 100, { a: a1 }); parr(ctx, ['platos donde le va mejor', 'al plástico (LDPE)'], 1070, 692, { s: 26, a: a1, lh: 32 });
  num(ctx, 'DEPENDE DEL PLATO', 960, 800, 64, { a: ss(e.tl, t3, t3 + 0.7) });
  fuenteDato(ctx, 'MILJØSTYRELSEN · 2018 · PAPEL SIN BLANQUEAR CONTRA LDPE · TABLA III', a0);
});

/* ====== 04 · Lo que la báscula no pesa ====== */
LUZ.no_pesa = E('#5B8DEF', (ctx, e) => {
  const a1 = en(e, 1, 0.8);
  bascula15(ctx, e, { y: 170, x0: 240, x1: 1500, extra: true, ap: (i) => i === 15 ? ss(e.tl, 1.6, 2.6) : ss(e.tl, 0.1 + i * 0.04, 0.6 + i * 0.04), etq: 0.55, sz: 15, dy: (i) => i === 15 ? 40 : 0 });
  const ax = ss(e.tl, 2.4, 3.2); panel(ctx, 1380, 330, 430, 190, ax); txt(ctx, 'EL PLATO QUE FALTA', 1410, 382, { s: 20, f: 'mono', w: 700, ls: 3, c: MARCA.oro, a: ax, sombra: false }); txt(ctx, 'Basura tirada', 1410, 436, { s: 44, f: 'serif', w: 500, c: CLARO, a: ax, sombra: false }); txt(ctx, 'en calles, ríos y mar: no medida', 1410, 478, { s: 24, f: 'sans', w: 500, c: '#b9c2d6', a: ax, sombra: false });
  flecha(ctx, 1560, 330, 1505, 290, ax, TINTA, 5);
  panel(ctx, 1040, 600, 770, 200, a1); txt(ctx, 'ESTUDIO DANÉS, 2018', 1076, 652, { s: 20, f: 'mono', w: 700, ls: 3, c: MARCA.cian, a: a1, sombra: false }); txt(ctx, 'Efecto «despreciable»…', 1076, 708, { s: 44, f: 'serif', w: 500, c: CLARO, a: a1, sombra: false }); txt(ctx, 'para Dinamarca. Por eso no lo midió.', 1076, 756, { s: 28, f: 'sans', w: 500, c: '#b9c2d6', a: a1, sombra: false });
  fuenteDato(ctx, 'ENVIRONMENT AGENCY 2011 · MILJØSTYRELSEN 2018', ax, 520, 780);
});

// Paisaje: tierra arriba, río que baja al mar. Bolsas que viajan por el río.
function rioMar(ctx, e, n, a = 1) {
  ctx.save(); ctx.fillStyle = '#7CC27A'; ctx.fillRect(-200, 300, 2400, 420); ctx.fillStyle = '#69B36B'; for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.ellipse(i * 300 + 60, 330, 220, 46, 0, Math.PI, TAU); ctx.fill(); }
  ctx.fillStyle = '#2F8FD8'; ctx.beginPath(); ctx.moveTo(300, 300); ctx.bezierCurveTo(480, 420, 250, 520, 560, 600); ctx.lineTo(760, 640); ctx.lineTo(860, 600); ctx.bezierCurveTo(520, 500, 640, 400, 380, 300); ctx.closePath(); ctx.fill(); ctx.restore();
  mar(ctx, 600, e.T, { h: 500 });
  for (let i = 0; i < n; i++) { const u = ((e.T * 0.07 + i / n) % 1), px = u < 0.5 ? mixn(340, 700, u * 2) + Math.sin(u * 14) * 40 : mixn(700, 1500 - i * 60, (u - 0.5) * 2), py = u < 0.5 ? mixn(310, 615, u * 2) : 640 + Math.sin(e.T * 1.4 + i) * 9 + (i % 3) * 46;
    ctx.save(); ctx.translate(px, py); ctx.rotate(Math.sin(e.T + i) * 0.5); bolsaPlastico(ctx, 0, 30, 0.16, { a: a * cl(u * 8) * cl((1 - u) * 6), T: e.T, seed: i + 1 }); ctx.restore(); }
}
LUZ.rio_mar = E('#8FD3F4', (ctx, e) => {
  rioMar(ctx, e, 9, ss(e.tl, 0.3, 1.2)); arbol(ctx, 980, 420, 150, { T: e.T }); arbol(ctx, 1080, 440, 120, { T: e.T, c: '#278a4b' }); casa(ctx, 1260, 440, 0.6); casa(ctx, 1400, 430, 0.5);
  num(ctx, '¿Y DONDE LA BASURA SÍ LLEGA AL MAR?', 1100, 200, 66, { a: ss(e.tl, 0.3, 1) });
  const a1 = en(e, 1, 0.8), t1 = e.L(1) ?? 4.1; panel(ctx, 1010, 470, 800, 330, a1); txt(ctx, 'PNUMA · 2020', 1050, 524, { s: 22, f: 'mono', w: 700, ls: 4, c: MARCA.oro, a: a1, sombra: false });
  txt(ctx, 'Programa de las Naciones Unidas', 1050, 572, { s: 34, f: 'serif', w: 500, c: CLARO, a: a1, sombra: false }); txt(ctx, 'para el Medio Ambiente', 1050, 614, { s: 34, f: 'serif', w: 500, c: CLARO, a: a1, sombra: false });
  for (let i = 0; i < 7; i++) { const ai = ss(e.tl, t1 + 1.2 + i * 0.4, t1 + 1.7 + i * 0.4); ctx.save(); ctx.globalAlpha = ai; ctx.fillStyle = '#ece6d8'; ctx.fillRect(1054 + i * 64, 650 + (1 - ai) * 16, 46, 60); ctx.fillStyle = '#8a8f9c'; for (let k = 0; k < 4; k++) ctx.fillRect(1060 + i * 64, 662 + k * 11 + (1 - ai) * 16, 30 - (k % 2) * 8, 4); ctx.restore(); }
  const n7 = Math.round(7 * pr(e.tl, t1 + 1.2, t1 + 4)); txt(ctx, n7 + ' análisis de ciclo de vida de bolsas', 1050, 764, { s: 30, f: 'sans', w: 600, c: CLARO, a: a1, sombra: false }); txt(ctx, 'publicados desde 2010', 1560, 690, { s: 21, f: 'sans', w: 500, c: '#b9c2d6', a: a1, sombra: false });
  esquema(ctx, 1, 60, 250);
});

LUZ.semaforo = E('#5B8DEF', (ctx, e) => {
  const F = ['Clima', 'Acidificación', 'Eutrofización', 'Uso de agua', 'Uso de suelo', 'Basura en tierra', 'Basura en el mar', 'Microplásticos'], V = '#22B866', R = '#F0483E', AM = '#F4B63A', G = '#59617a';
  const a0 = ss(e.tl, 0.2, 0.9), t1 = e.L(1) ?? 6.5, t2 = e.L(2) ?? 11.6; panel(ctx, 250, 120, 1420, 690, a0);
  txt(ctx, 'BOLSA DE PLÁSTICO', 900, 180, { s: 21, f: 'mono', w: 700, ls: 3, c: MARCA.cian, a: a0, al: 'center', sombra: false }); txt(ctx, 'DE UN SOLO USO', 900, 208, { s: 21, f: 'mono', w: 700, ls: 3, c: MARCA.cian, a: a0, al: 'center', sombra: false });
  txt(ctx, 'BOLSA DE PAPEL', 1350, 180, { s: 21, f: 'mono', w: 700, ls: 3, c: MARCA.kraft, a: ss(e.tl, t2, t2 + 0.6), al: 'center', sombra: false }); txt(ctx, 'DE UN SOLO USO', 1350, 208, { s: 21, f: 'mono', w: 700, ls: 3, c: MARCA.kraft, a: ss(e.tl, t2, t2 + 0.6), al: 'center', sombra: false });
  F.forEach((f, i) => { const y = 270 + i * 60, ar = ss(e.tl, 0.4 + i * 0.1, 1 + i * 0.1); txt(ctx, f, 300, y + 10, { s: 32, f: 'serif', w: 500, c: CLARO, a: ar, sombra: false }); ctx.save(); ctx.globalAlpha = ar * 0.15; ctx.fillStyle = '#fff'; ctx.fillRect(290, y + 28, 1340, 1.5); ctx.restore();
    const pl = i < 5 ? ss(e.tl, 1.6 + i * 0.7, 2 + i * 0.7) : ss(e.tl, t1 + (i - 5) * 1.1, t1 + 0.4 + (i - 5) * 1.1); luzSem(ctx, 900, y, 19, i < 5 ? V : R, pl); txt(ctx, i < 5 ? 'sale bien' : 'sale mal', 932, y + 8, { s: 21, f: 'sans', w: 600, c: '#b9c2d6', a: pl, sombra: false });
    const pa = ss(e.tl, t2 + 0.6 + i * 0.5, t2 + 1 + i * 0.5), cp = i >= 5 ? V : i === 3 ? G : AM; luzSem(ctx, 1350, y, 19, cp, pa); txt(ctx, i >= 5 ? 'menos que el plástico' : i === 3 ? 'sin dato en el resumen' : 'puede ser mayor', 1382, y + 8, { s: 21, f: 'sans', w: 600, c: '#b9c2d6', a: pa, sombra: false }); });
  txt(ctx, 'En papel, el resumen agrupa los tres tipos de basura tirada como «littering» y añade agotamiento de ozono entre los que pueden ser mayores.', 300, 778, { s: 18, f: 'sans', w: 500, c: '#8f99b3', a: ss(e.tl, t2 + 3, t2 + 4), sombra: false });
  fuenteDato(ctx, 'PNUMA 2021 (RESUME PNUMA 2020) · META-ANÁLISIS DE 7 ANÁLISIS DE CICLO DE VIDA', ss(e.tl, 1, 1.8));
});

LUZ.lugar = E('#5B8DEF', (ctx, e) => {
  const a0 = ss(e.tl, 0.2, 0.9), a1 = en(e, 1, 0.6), a2 = en(e, 2, 0.6), sal = 1 - a1;
  // izquierda: buena recolección · derecha: recolección deficiente
  panel(ctx, 110, 190, 620, 420, a0 * sal, { c: '#DDF3E4' }); panel(ctx, 790, 190, 620, 420, ss(e.tl, 1, 1.8) * sal, { c: '#CFE7FA' });
  ctx.save(); ctx.globalAlpha = a0 * sal; camion(ctx, 330 + Math.sin(e.T * 0.8) * 20, 560, 0.75, e.T); bote(ctx, 600, 560, 0.7); bolsaPlastico(ctx, 600, 440, 0.18, { T: e.T }); ctx.restore(); et(ctx, 'CON BUENA RECOLECCIÓN', 420, 250, { al: 'center', s: 21, a: a0 * sal });
  ctx.save(); ctx.globalAlpha = ss(e.tl, 1, 1.8) * sal; ctx.beginPath(); ctx.rect(800, 300, 600, 300); ctx.clip(); mar(ctx, 420, e.T, { h: 300, paso: 36 }); for (let i = 0; i < 6; i++) bolsaPlastico(ctx, 880 + i * 90 + Math.sin(e.T + i) * 12, 470 + (i % 3) * 40 + Math.sin(e.T * 1.3 + i) * 8, 0.16, { T: e.T, seed: i, rot: Math.sin(e.T + i) * 0.4 }); ctx.restore(); et(ctx, 'CON RECOLECCIÓN DEFICIENTE', 1100, 250, { al: 'center', s: 21, a: ss(e.tl, 1, 1.8) * sal });
  // medidor: fuerza de los argumentos contra la bolsa de plástico
  const g = eo(e.tl, 3.4, 6); et(ctx, 'ARGUMENTOS CONTRA LA BOLSA DE PLÁSTICO DE UN SOLO USO', 110, 668, { s: 21, a: ss(e.tl, 2.6, 3.4) * sal });
  ctx.save(); ctx.globalAlpha = ss(e.tl, 2.6, 3.4) * sal; ctx.fillStyle = 'rgba(22,18,15,.25)'; ctx.beginPath(); ctx.roundRect(110, 690, 620, 40, 12); ctx.fill(); ctx.beginPath(); ctx.roundRect(790, 690, 620, 40, 12); ctx.fill(); ctx.fillStyle = TINTA; ctx.beginPath(); ctx.roundRect(110, 690, 620 * 0.35 * g, 40, 12); ctx.fill(); ctx.fillStyle = MARCA.rojo; ctx.beginPath(); ctx.roundRect(790, 690, 620 * 0.85 * g, 40, 12); ctx.fill(); ctx.restore();
  et(ctx, 'MÁS FUERTES', 1100, 772, { al: 'center', s: 22, a: ss(e.tl, 5, 5.8) * sal }); et(ctx, 'EL RESUMEN NO DA UNA CIFRA: LAS BARRAS SOLO INDICAN LA DIRECCIÓN', 110, 772, { s: 17, a: ss(e.tl, 5, 5.8) * sal });
  fuenteDato(ctx, 'PNUMA 2021 (RESUME PNUMA 2020)', ss(e.tl, 2.6, 3.4) * sal, 760);
  num(ctx, 'NO HAY GANADOR UNIVERSAL', 800, 400, 120, { a: a1 * (1 - 0.0 * a2) }); ctx.save(); ctx.globalAlpha = a2; ctx.fillStyle = TINTA; ctx.fillRect(800 - 500 * a2, 440, 1000 * a2, 6); ctx.restore();
  num(ctx, 'HAY GANADOR POR LUGAR', 800, 600, 120, { a: a2, c: '#fff' });
});

window.LZA = { en, esquema, E, et, num, miles, parr, estudio, colgante, bolsaTela, bascula15, IND, PAPEL_GANA, CLARO, BX, BY, rioMar };
