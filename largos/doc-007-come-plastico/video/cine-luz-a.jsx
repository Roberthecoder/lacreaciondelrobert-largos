// cine-luz-a.jsx — Documental 007 · ¿Los organismos come plástico son una estafa? Todas las escenas.
// Cada escena: LUZ.id = (ctx, e) => …   ·   e.L(i) = segundo en que empieza la frase i del bloque.
const { TAU, cl, pr, ss, eo, mixn, rng, rgba, mixc, LUZC, FU, halo, noche, polvo, cam, oscurece, txt, rico, chip, rotulo, guia, titulo, sello, tache, flecha, botella } = window.LZK;
const LUZ = window.LUZ;
const Lx = (e, i) => { const a = e.L(i); return a == null ? 1e9 : a; };
const en = (e, i, d = 0.7, r = 0) => { const a = e.L(i); return a == null ? 0 : ss(e.tl, a + r, a + r + d); };
const esquema = (ctx, a = 1, s = 'ESQUEMA') => chip(ctx, s, 1870, 52, { c: '#8fa0bd', s: 17, a: a * 0.85, al: 'right' });
const fte = (ctx, s, a = 1, y = 880) => chip(ctx, 'FUENTE: ' + s, 50, y, { c: '#a9b8d2', s: 19, a: a * 0.95 });
const C = { pe: '#bfe3ff', oro: LUZC.oro, rojo: '#ff5a4a', verde: '#3DFF7A', gris: '#c9d2e3', co2: '#9fe0c0', pet: '#8fd0ff', cafe: '#b98a4e' };
const palomita = (ctx, x, y, r, a = 1, c = C.verde) => { a = cl(a); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = c; ctx.lineWidth = r * 0.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(x - r * 0.6, y); ctx.lineTo(x - r * 0.15, y + r * 0.45); ctx.lineTo(x + r * 0.7, y - r * 0.5); ctx.stroke(); ctx.restore(); };

/* ====== piezas ====== */
// Larva segmentada que camina (x, y = cabeza). c = color del cuerpo; n = segmentos; s = escala.
function larva(ctx, x, y, s, T, o = {}) {
  const n = o.n || 11, c = o.c || '#e9dcc0', dir = o.dir || 1, a = o.a ?? 1; if (a <= 0.004) return; ctx.save(); ctx.globalAlpha *= a;
  for (let i = n - 1; i >= 0; i--) { const px = x - dir * i * 26 * s, py = y + Math.sin(T * 5 - i * 0.7) * 5 * s * (o.onda ?? 1), r = (i === 0 ? 17 : 20 - Math.abs(i - n / 2) * 0.8) * s;
    ctx.fillStyle = i === 0 ? (o.cabeza || '#7a4a22') : mixc(c, '#000000', 0.06 * (i % 2)); ctx.beginPath(); ctx.ellipse(px, py, r * 0.9, r, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(60,40,20,.45)'; ctx.lineWidth = 1.5; ctx.stroke();
    if (i > 0 && i < 4) { ctx.strokeStyle = 'rgba(60,40,20,.7)'; ctx.lineWidth = 2 * s; ctx.beginPath(); ctx.moveTo(px, py + r * 0.8); ctx.lineTo(px + dir * 5 * s, py + r * 1.35); ctx.stroke(); } }
  ctx.fillStyle = '#1b120a'; ctx.beginPath(); ctx.arc(x + dir * 6 * s, y - 4 * s, 2.6 * s, 0, TAU); ctx.fill(); ctx.restore();
}
// Película de polietileno (bolsa) con hoyos. H = [[x, y, r]…]; k = cuánto se han abierto.
function pelicula(ctx, x, y, w, h, H, k, a = 1) {
  ctx.save(); ctx.globalAlpha *= a; const g = ctx.createLinearGradient(x, y, x + w, y + h); g.addColorStop(0, 'rgba(190,225,255,.30)'); g.addColorStop(0.5, 'rgba(190,225,255,.14)'); g.addColorStop(1, 'rgba(190,225,255,.26)');
  ctx.beginPath(); ctx.roundRect(x, y, w, h, 14); H.forEach(([hx, hy, r], i) => { const rr = r * cl(k - i * 0.12) ; if (rr > 0.5) { ctx.moveTo(hx + rr, hy); for (let j = 0; j <= 16; j++) { const an = -j / 16 * TAU; ctx.lineTo(hx + Math.cos(an) * rr * (1 + 0.14 * Math.sin(j * 2.3 + i)), hy + Math.sin(an) * rr * (1 + 0.14 * Math.cos(j * 1.7 + i))); } } });
  ctx.fillStyle = g; ctx.fill('evenodd'); ctx.strokeStyle = 'rgba(210,235,255,.55)'; ctx.lineWidth = 2; ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.lineWidth = 3; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(x + 40 + i * w / 5, y + 10); ctx.lineTo(x + 10 + i * w / 5, y + h - 10); ctx.stroke(); } ctx.restore();
}
// Migajas de plástico (el plástico mordido sigue siendo plástico).
function migajas(ctx, x, y, n, seed, k, a = 1) { const R = rng(seed); ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { const dx = (R() - 0.5) * 260, dy = R() * 120, ai = cl(k * n - i); ctx.fillStyle = `rgba(200,230,255,${0.7 * ai})`; ctx.beginPath(); ctx.ellipse(x + dx, y + dy * ai, 4 + R() * 6, 3 + R() * 3, R() * 3, 0, TAU); ctx.fill(); } ctx.restore(); }
// Cadena de polímero: cuentas unidas (carbono con carbono).
function cadena(ctx, x, y, n, T, c, a = 1, paso = 44, corte = -1) { ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < n; i++) { const px = x + i * paso + (corte >= 0 && i > corte ? 30 : 0), py = y + Math.sin(i * 0.9 + T) * 12; if (i && i - 1 !== corte) { ctx.strokeStyle = 'rgba(220,230,245,.7)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(px - paso + 12, y + Math.sin((i - 1) * 0.9 + T) * 12); ctx.lineTo(px - 12, py); ctx.stroke(); } ctx.fillStyle = c; ctx.beginPath(); ctx.arc(px, py, 13, 0, TAU); ctx.fill(); } ctx.restore(); }
function bacteriaRod(ctx, x, y, s, an, a = 1, c = '#4a86b8') { if (a <= 0.004) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = c; ctx.strokeStyle = 'rgba(200,225,250,.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(-36 * s, -13 * s, 72 * s, 26 * s, 13 * s); ctx.fill(); ctx.stroke(); ctx.restore(); }
function enzima(ctx, x, y, r, an, a = 1, c = '#F4C25A', boca = 0.5) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(an); ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, boca, TAU - boca); ctx.closePath(); ctx.fill(); ctx.restore(); }
function burbujasCO2(ctx, x, y, n, T, a = 1, alto = 300) { for (let i = 0; i < n; i++) { const ph = (T * 0.3 + i / n) % 1; halo(ctx, x + Math.sin(i * 2.2 + T) * 40, y - ph * alto, 16, C.co2, a * (1 - ph) * 0.8); } }

/* ====== 00 · Gancho ====== */
const HOYOS = [[700, 430, 46], [860, 560, 34], [600, 600, 28], [980, 420, 30], [780, 660, 24]];
function escenaBolsa(ctx, e, k, o = {}) {
  noche(ctx, '#07090c', '#0d1118'); halo(ctx, 800, 520, 620, '#8fd0ff', 0.06); pelicula(ctx, 420, 280, 760, 480, HOYOS, k, o.a ?? 1);
  migajas(ctx, 800, 770, 46, 5, cl(k / 1.5), o.mig ?? 1);
  larva(ctx, 700 + 46 + 40 * Math.sin(e.T * 0.6), 430 - 40, 1.2, e.T, { c: '#eadfc6', n: 9, dir: -1 }); larva(ctx, 940, 600, 1.0, e.T + 2, { c: '#e6d8ba', n: 8 });
}
LUZ.hoyo = (ctx, e) => {
  const k = 0.5 + 1.2 * e.p, fin = cam(ctx, 1.08 - 0.08 * ss(e.tl, 0, 6), 800, 520); escenaBolsa(ctx, e, k); fin();
  const f3 = 1 - en(e, 3, 0.5); guia(ctx, 746, 430, 1290, 520, ss(e.tl, 0.3, 1) * f3, C.oro); rotulo(ctx, 1300, 530, 'Un hoyo en la bolsa', 'POLIETILENO MORDIDO', ss(e.tl, 0.4, 1.2) * f3, { c: C.oro, s: 46 });
  guia(ctx, 820, 800, 1290, 680, ss(e.tl, 2.4, 3.2) * f3, C.pe); rotulo(ctx, 1300, 690, 'Las migajas', 'SIGUEN SIENDO PLÁSTICO', ss(e.tl, 2.6, 3.4) * f3, { c: C.pe, s: 46 });
  const a1 = en(e, 1, 0.8) * (1 - en(e, 2, 0.5)); chip(ctx, '2017 · «LA ORUGA QUE SE COME LAS BOLSAS»', 1290, 810, { c: '#fff', s: 22, a: a1 });
  const a2 = en(e, 2, 0.8) * (1 - en(e, 3, 0.5)); ['GUSANOS', 'BACTERIAS', 'HONGOS'].forEach((s, i) => chip(ctx, s, 1290 + i * 190, 810, { c: C.oro, s: 22, a: a2 * ss(e.tl, Lx(e, 2) + 1.6 + i * 0.7, Lx(e, 2) + 2.2 + i * 0.7) }));
  const a3 = en(e, 3, 0.8); if (a3 > 0) { oscurece(ctx, 0.7 * a3); titulo(ctx, '¿De verdad se lo comen?', 960, 470, a3, { s: 104 }); txt(ctx, 'O NOS VENDIERON UNA PROMESA QUE NO CUADRA', 960, 550, { s: 24, f: 'mono', w: 700, ls: 7, al: 'center', c: C.oro, a: en(e, 3, 0.8, 1.6) }); }
  esquema(ctx, ss(e.tl, 3, 4) * (1 - a3));
};

/* ====== 01 · La oruga ====== */
LUZ.oruga = (ctx, e) => {
  noche(ctx, '#0a0906', '#12100a'); const T = e.T, a = ss(e.tl, 0.1, 0.9);
  larva(ctx, 760, 420, 2.6, T, { c: '#ecdfc4', n: 10, a, onda: 0.6 });
  rico(ctx, '*Galleria mellonella*', 240, 640, { s: 64, f: 'serif', w: 500, a: ss(e.tl, 0.8, 1.6) }); txt(ctx, 'LARVA DE LA POLILLA DE LA CERA · VIVE EN PANALES', 244, 688, { s: 20, f: 'mono', w: 700, ls: 4, c: C.oro, a: ss(e.tl, 1.4, 2.2) });
  // el experimento original: pasta de orugas sobre polietileno
  const a1 = en(e, 1, 0.8); if (a1 > 0) { ctx.save(); ctx.globalAlpha = a1; pelicula(ctx, 1180, 300, 560, 260, [], 0, 1); ctx.fillStyle = 'rgba(214,190,140,.85)'; ctx.beginPath(); ctx.ellipse(1460, 430, 150 * eo(e.tl, Lx(e, 1) + 0.6, Lx(e, 1) + 2.4), 70, 0, 0, TAU); ctx.fill(); ctx.restore();
    txt(ctx, 'PASTA DE ORUGAS MOLIDAS SOBRE POLIETILENO', 1460, 270, { s: 17, f: 'mono', w: 700, ls: 3, al: 'center', c: C.gris, a: a1 }); flecha(ctx, 1460, 580, 1460, 660, en(e, 1, 0.6, 3), C.oro, 4);
    rotulo(ctx, 1240, 730, 'Etilenglicol', 'EL PRODUCTO QUE SE REPORTÓ', en(e, 1, 0.8, 3.6), { c: C.oro, s: 46 }); }
  fte(ctx, 'BOMBELLI, HOWE Y BERTOCCHINI 2017, CURRENT BIOLOGY 27: R292', a1); esquema(ctx, a);
};
const GE = { x: 240, y: 700, w: 1000, h: 430 };
function espectro(ctx, k, color, off, a, lw = 4) { ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.beginPath(); const P = [[0.16, 0.5, 0.03], [0.34, 0.22, 0.02], [0.55, 0.75, 0.018], [0.62, 0.6, 0.02], [0.8, 0.45, 0.03]]; for (let i = 0; i <= 240 * k; i++) { const u = i / 240; let v = 0.06 + 0.03 * Math.sin(u * 40 + off * 9); P.forEach(([m, h, w]) => { v += h * (1 + off * 0.06) * Math.exp(-Math.pow((u - m - off * 0.004) / w, 2)); }); const px = GE.x + u * GE.w, py = GE.y - 30 - off * 70 - v * (GE.h - 150); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
LUZ.espectro = (ctx, e) => {
  noche(ctx, '#07090f', '#0b0f18'); const a = ss(e.tl, 0.2, 1), f3 = 1 - en(e, 3, 0.6);
  ctx.save(); ctx.globalAlpha = f3;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = 'rgba(210,222,240,.7)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(GE.x, GE.y - GE.h); ctx.lineTo(GE.x, GE.y); ctx.lineTo(GE.x + GE.w, GE.y); ctx.stroke(); ctx.restore();
  txt(ctx, 'ESPECTRO INFRARROJO DE LA SUPERFICIE DEL POLIETILENO', GE.x, 210, { s: 20, f: 'mono', w: 700, ls: 4, c: C.gris, a });
  espectro(ctx, eo(e.tl, 0.6, 3), C.oro, 0, a); txt(ctx, 'POLIETILENO + PASTA DE ORUGAS', GE.x + GE.w + 20, GE.y - 60, { s: 18, f: 'mono', w: 700, ls: 2, c: C.oro, a: ss(e.tl, 2, 2.8) });
  const a1 = en(e, 1, 0.8); espectro(ctx, eo(e.tl, Lx(e, 1) + 0.8, Lx(e, 1) + 3), '#ff9a70', 1, a1); txt(ctx, 'POLIETILENO + YEMA DE HUEVO', GE.x + GE.w + 20, GE.y - 130, { s: 18, f: 'mono', w: 700, ls: 2, c: '#ff9a70', a: en(e, 1, 0.8, 2) });
  espectro(ctx, eo(e.tl, Lx(e, 1) + 3, Lx(e, 1) + 5.2), '#ff7a9a', 2, a1); txt(ctx, 'POLIETILENO + CARNE DE CERDO MOLIDA', GE.x + GE.w + 20, GE.y - 200, { s: 18, f: 'mono', w: 700, ls: 2, c: '#ff7a9a', a: en(e, 1, 0.8, 4.2) });
  rotulo(ctx, 1280, 300, 'Universidad de Maguncia', 'ALEMANIA · QUÍMICA ORGÁNICA · 2017', a, { s: 40 });
  const a2 = en(e, 2, 0.8); sello(ctx, 'FALTA LA PRUEBA', 1560, 640, a2, C.rojo, -0.05, 44); txt(ctx, 'las señales podían venir de restos de la oruga', 760, 790, { s: 42, f: 'mano', w: 700, al: 'center', c: '#ffd9a0', a: en(e, 2, 0.8, 1.6) });
  ctx.restore();
  const a3 = en(e, 3, 0.8); if (a3 > 0) { titulo(ctx, 'Morder y moler no es digerir', 960, 430, a3, { s: 96 }); migajas(ctx, 960, 520, 40, 9, 1, a3); txt(ctx, 'EN PEDACITOS, SIGUE SIENDO PLÁSTICO', 960, 720, { s: 24, f: 'mono', w: 700, ls: 7, al: 'center', c: C.pe, a: en(e, 3, 0.8, 1.6) }); }
  fte(ctx, 'WEBER, PUSCH Y OPATZ 2017, CURRENT BIOLOGY 27: R744', ss(e.tl, 1, 2) * f3); esquema(ctx, a * f3, 'ESQUEMA: FORMA DE LAS CURVAS, NO LOS DATOS');
};

/* ====== 02 · ¿Qué cuenta como comer? ====== */
LUZ.etapas = (ctx, e) => {
  noche(ctx, '#080a10', '#0c0f18'); const T = e.T, a = ss(e.tl, 0.1, 0.9), xs = [300, 740, 1180, 1620], N = ['1 · Deteriorar', '2 · Fragmentar', '3 · Asimilar', '4 · Mineralizar'], S = ['LA SUPERFICIE CAMBIA', 'SE ROMPE EN PEDAZOS', 'ENTRA A LA CÉLULA', 'SALE COMO CO₂ Y AGUA'], y = 430;
  txt(ctx, 'PARA DECIR QUE UN ORGANISMO DEGRADA UN PLÁSTICO', 960, 180, { s: 22, f: 'mono', w: 700, ls: 5, al: 'center', c: C.gris, a });
  xs.forEach((x, i) => { const ai = ss(e.tl, 0.8 + i * 1.3, 1.5 + i * 1.3), fuerte = i === 3 ? en(e, 1, 0.8) : 0, tenue = i < 2 ? 1 : 1 - 0.65 * en(e, 2, 0.8) * (1 - en(e, 4, 0.5));
    ctx.save(); ctx.globalAlpha = ai * tenue; if (i === 0) { pelicula(ctx, x - 110, y - 80, 220, 160, [], 0); ctx.fillStyle = 'rgba(120,90,50,.5)'; for (let k = 0; k < 6; k++) { ctx.beginPath(); ctx.arc(x - 70 + k * 28, y + Math.sin(k * 2) * 40, 9, 0, TAU); ctx.fill(); } }
    else if (i === 1) migajas(ctx, x, y - 60, 30, 3, 1);
    else if (i === 2) { bacteriaRod(ctx, x, y, 2.2, 0.2); ctx.fillStyle = C.pe; for (let k = 0; k < 4; k++) { const ph = (T * 0.4 + k / 4) % 1; ctx.beginPath(); ctx.arc(x - 150 + ph * 130, y - 50 + ph * 44, 6, 0, TAU); ctx.fill(); } }
    else { burbujasCO2(ctx, x, y + 90, 9, T, 1, 200); txt(ctx, 'CO₂', x, y + 20, { s: 64, f: 'serif', w: 500, al: 'center', c: C.co2 }); }
    ctx.restore(); if (fuerte > 0) halo(ctx, x, y, 240, C.verde, 0.16 * fuerte);
    txt(ctx, N[i], x, 640, { s: 40, f: 'serif', w: 500, al: 'center', a: ai * tenue, c: i === 3 && fuerte > 0.5 ? C.verde : '#fff' }); txt(ctx, S[i], x, 678, { s: 16, f: 'mono', w: 700, ls: 3, al: 'center', c: C.oro, a: ai * tenue }); if (i) flecha(ctx, xs[i - 1] + 150, y, x - 160, y, ai, 'rgba(210,222,240,.6)', 3); });
  chip(ctx, 'MINERALIZAR: EL CARBONO DEL PLÁSTICO TERMINA EN DIÓXIDO DE CARBONO (CO₂), AGUA Y BIOMASA', 960, 770, { al: 'center', c: C.verde, s: 19, a: en(e, 1, 0.8) * (1 - en(e, 2, 0.5)) });
  chip(ctx, 'MUCHOS ESTUDIOS SE QUEDAN AQUÍ: PESO PERDIDO O SUPERFICIE CAMBIADA', 520, 770, { al: 'center', c: C.rojo, s: 19, a: en(e, 2, 0.8) * (1 - en(e, 3, 0.5)) });
  chip(ctx, 'EL PESO PERDIDO PUEDE SER DE LOS ADITIVOS, NO DEL POLÍMERO', 960, 770, { al: 'center', c: '#ffb05a', s: 19, a: en(e, 3, 0.8) * (1 - en(e, 4, 0.5)) });
  const a4 = en(e, 4, 0.8); if (a4 > 0) { oscurece(ctx, 0.8 * a4); txt(ctx, '0.2 %', 960, 430, { s: 210, f: 'serif', w: 500, al: 'center', c: C.oro, a: a4 }); txt(ctx, 'DEL PESO DEL POLIETILENO, EN 10 AÑOS', 960, 520, { s: 26, f: 'mono', w: 700, ls: 7, al: 'center', c: '#fff', a: en(e, 4, 0.8, 1.2) }); txt(ctx, 'ALBERTSSON Y KARLSSON 1990, CITADO POR MONTAZER ET AL. 2020', 960, 580, { s: 17, f: 'mono', w: 700, ls: 3, al: 'center', c: '#8fa0bd', a: en(e, 4, 0.8, 2) }); }
  fte(ctx, 'MONTAZER, HABIBI NAJAFI Y LEVIN 2020, POLYMERS 12: 123 · DANSO ET AL. 2019', ss(e.tl, 1, 2) * (1 - a4)); esquema(ctx, a * (1 - a4));
};

/* ====== 03 · El gusano de la harina ====== */
function unicel(ctx, x, y, w, h, k, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.roundRect(x, y, w, h, 12); ctx.fillStyle = '#eef2f6'; ctx.fill(); ctx.save(); ctx.clip(); const R = rng(4); ctx.fillStyle = 'rgba(160,175,195,.5)'; for (let i = 0; i < 260; i++) { ctx.beginPath(); ctx.arc(x + R() * w, y + R() * h, 5 + R() * 5, 0, TAU); ctx.stroke(); } ctx.fillStyle = '#080a10'; for (let i = 0; i < 7; i++) { const rr = (30 + R() * 40) * cl(k * 1.4 - i * 0.12); ctx.beginPath(); ctx.arc(x + 40 + R() * (w - 80), y + R() * h, rr, 0, TAU); ctx.fill(); } ctx.restore(); ctx.strokeStyle = 'rgba(160,175,195,.6)'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
LUZ.tenebrio = (ctx, e) => {
  noche(ctx, '#0a0906', '#12100a'); const T = e.T, a = ss(e.tl, 0.1, 0.9), k = pr(e.tl, 0, e.dur);
  unicel(ctx, 200, 330, 560, 320, k, a); [[470, 400, 1], [560, 520, -1], [400, 600, 1], [640, 440, -1]].forEach(([x, y, d], i) => larva(ctx, x + 20 * Math.sin(T * 0.5 + i), y, 0.55, T + i, { c: '#c98a3a', cabeza: '#6a3a14', n: 10, dir: d, a }));
  rico(ctx, '*Tenebrio molitor*', 200, 740, { s: 54, f: 'serif', w: 500, a: ss(e.tl, 0.8, 1.6) }); txt(ctx, 'GUSANO DE LA HARINA · UNICEL = POLIESTIRENO EXPANDIDO', 204, 782, { s: 18, f: 'mono', w: 700, ls: 3, c: C.oro, a: ss(e.tl, 1.4, 2.2) });
  // a dónde fue el carbono del unicel
  const a1 = en(e, 1, 0.8), b1 = eo(e.tl, Lx(e, 1) + 1.2, Lx(e, 1) + 3.4), b2 = eo(e.tl, Lx(e, 2) + 0.3, Lx(e, 2) + 2), x0 = 980, w = 800;
  txt(ctx, 'CARBONO DEL UNICEL INGERIDO · 16 DÍAS · MARCADO CON CARBONO 13', x0, 370, { s: 17, f: 'mono', w: 700, ls: 3, c: C.gris, a: a1 });
  ctx.save(); ctx.globalAlpha = a1; ctx.fillStyle = 'rgba(210,222,240,.12)'; ctx.beginPath(); ctx.roundRect(x0, 400, w, 90, 14); ctx.fill(); ctx.fillStyle = C.co2; ctx.beginPath(); ctx.roundRect(x0, 400, w * 0.477 * b1, 90, [14, 0, 0, 14]); ctx.fill(); ctx.fillStyle = C.cafe; ctx.fillRect(x0 + w * 0.477, 400, w * 0.492 * b2, 90); ctx.restore();
  txt(ctx, (47.7 * b1).toFixed(1) + ' %', x0 + 20, 580, { s: 84, f: 'serif', w: 500, c: C.co2, a: a1 }); txt(ctx, 'SALIÓ COMO DIÓXIDO DE CARBONO (CO₂)', x0 + 24, 622, { s: 18, f: 'mono', w: 700, ls: 3, c: C.co2, a: a1 }); if (a1 > 0) burbujasCO2(ctx, x0 + 190, 390, 7, T, a1 * b1, 120);
  const a2 = en(e, 2, 0.8); txt(ctx, (49.2 * b2).toFixed(1) + ' %', x0 + w - 20, 580, { s: 84, f: 'serif', w: 500, al: 'right', c: C.cafe, a: a2 }); txt(ctx, 'SALIÓ EN EL EXCREMENTO', x0 + w - 24, 654, { s: 18, f: 'mono', w: 700, ls: 3, al: 'right', c: C.cafe, a: a2 });
  palomita(ctx, x0 + 30, 720, 30, en(e, 1, 0.5, 4)); txt(ctx, 'sí lo mineraliza: es el mejor caso', x0 + 80, 736, { s: 42, f: 'mano', w: 700, c: C.verde, a: en(e, 1, 0.8, 4) });
  fte(ctx, 'YANG ET AL. 2015, ENVIRON. SCI. TECHNOL. 49: 12080', a1); esquema(ctx, a);
};
LUZ.cuenta = (ctx, e) => {
  noche(ctx, '#080a10', '#0c0f18'); const T = e.T, a = ss(e.tl, 0.1, 0.9), f2 = 1 - en(e, 2, 0.6);
  ctx.save(); ctx.globalAlpha = f2;
  const R = rng(8); for (let i = 0; i < 100; i++) { const x = 160 + (i % 20) * 44, y = 300 + Math.floor(i / 20) * 50; larva(ctx, x + 22, y + Math.sin(T + i) * 2, 0.26, T + i, { c: '#c98a3a', cabeza: '#6a3a14', n: 4, a: a * ss(e.tl, 0.3 + i * 0.012, 0.8 + i * 0.012) }); }
  txt(ctx, '100 GUSANOS', 160, 240, { s: 22, f: 'mono', w: 700, ls: 6, c: C.oro, a }); txt(ctx, '34 a 39 mg', 160, 660, { s: 96, f: 'serif', w: 500, a: ss(e.tl, 1.4, 2.2) }); txt(ctx, 'DE UNICEL AL DÍA · mg = MILIGRAMOS', 164, 704, { s: 19, f: 'mono', w: 700, ls: 4, c: C.gris, a: ss(e.tl, 1.8, 2.6) });
  const a1 = en(e, 1, 0.8); flecha(ctx, 1010, 480, 1130, 480, a1, C.oro, 5); txt(ctx, '1 kg AL DÍA', 1180, 330, { s: 22, f: 'mono', w: 700, ls: 6, c: C.oro, a: a1 }); txt(ctx, (2.7 * eo(e.tl, Lx(e, 1) + 0.4, Lx(e, 1) + 2.4)).toFixed(1) + ' millones', 1180, 480, { s: 110, f: 'serif', w: 500, a: a1 }); txt(ctx, 'DE GUSANOS (CÁLCULO: 1,000,000 mg ÷ 0.37 mg POR GUSANO)', 1184, 530, { s: 17, f: 'mono', w: 700, ls: 2, c: C.gris, a: en(e, 1, 0.8, 1.6) });
  ctx.restore();
  const a2 = en(e, 2, 0.8); if (a2 > 0) { txt(ctx, '350 a 400', 960, 400, { s: 190, f: 'serif', w: 500, al: 'center', c: '#fff', a: a2 }); txt(ctx, 'MILLONES DE TONELADAS DE PLÁSTICO SE PRODUCEN CADA AÑO', 960, 490, { s: 26, f: 'mono', w: 700, ls: 6, al: 'center', c: C.oro, a: en(e, 2, 0.8, 1) }); for (let i = 0; i < 40; i++) { const ph = (T * 0.08 + i / 40) % 1; ctx.save(); ctx.globalAlpha = a2 * 0.5 * Math.sin(ph * Math.PI); botella(ctx, 120 + ((i * 173) % 1700), 1000 - ph * 380, 0.35, 1); ctx.restore(); } }
  fte(ctx, a2 > 0.5 ? 'DANSO, CHOW Y STREIT 2019, APPL. ENVIRON. MICROBIOL. 85: e01095-19' : 'YANG ET AL. 2015 · CÁLCULO PROPIO', ss(e.tl, 1, 2));
};

/* ====== 04 · La bacteria ====== */
LUZ.ideonella = (ctx, e) => {
  noche(ctx, '#05080e', '#091019'); const T = e.T, a = ss(e.tl, 0.1, 0.9), k = pr(e.tl, 1, Lx(e, 2));
  // película de PET amorfo con bacterias encima, que la van adelgazando
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(140,205,255,.28)'; ctx.strokeStyle = 'rgba(180,225,255,.7)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(160, 520 + 60 * k, 760, 150 - 110 * k, 10); ctx.fill(); ctx.stroke(); ctx.restore();
  const R = rng(12); for (let i = 0; i < 9; i++) bacteriaRod(ctx, 220 + i * 82 + Math.sin(T * 0.7 + i) * 8, 492 + 60 * k + Math.cos(T + i) * 4, 0.9, (R() - 0.5) * 0.6, a * ss(e.tl, 0.4 + i * 0.15, 1 + i * 0.15));
  rico(ctx, '*Ideonella sakaiensis*', 160, 300, { s: 60, f: 'serif', w: 500, a: ss(e.tl, 0.6, 1.4) }); txt(ctx, 'JAPÓN, 2016 · PET = TEREFTALATO DE POLIETILENO', 164, 344, { s: 19, f: 'mono', w: 700, ls: 3, c: C.oro, a: ss(e.tl, 1.2, 2) });
  txt(ctx, 'USA EL PET COMO SU PRINCIPAL FUENTE DE CARBONO Y ENERGÍA', 164, 760, { s: 18, f: 'mono', w: 700, ls: 3, c: C.pet, a: ss(e.tl, 3, 3.8) });
  // dos enzimas cortan la cadena en sus piezas
  const a1 = en(e, 1, 0.8), corte = Math.floor(2 + 5 * pr(e.tl, Lx(e, 1) + 1, Lx(e, 2))); if (a1 > 0) { cadena(ctx, 1060, 330, 9, T, C.pet, a1, 84, corte); enzima(ctx, 1060 + corte * 84 + 56, 330 - 46, 34, Math.PI / 2 + 0.2 * Math.sin(T * 6), a1); rotulo(ctx, 1060, 470, 'Dos enzimas', 'CORTAN EL PET EN SUS PIEZAS', a1, { c: C.oro, s: 44 }); chip(ctx, 'ÁCIDO TEREFTÁLICO', 1060, 600, { c: C.pet, s: 20, a: en(e, 1, 0.7, 2) }); chip(ctx, 'ETILENGLICOL', 1380, 600, { c: C.pet, s: 20, a: en(e, 1, 0.7, 2.8) }); }
  const a2 = en(e, 2, 0.8); if (a2 > 0) { oscurece(ctx, 0.95 * a2); [['PET amorfo', 'CADENAS DESORDENADAS', 0, C.verde], ['PET cristalino', 'CADENAS EMPACADAS · BOTELLAS COMERCIALES', 1, C.rojo]].forEach(([n, s, j, c]) => { const x = 300 + j * 860, ai = en(e, 2, 0.8, j * 2.4); for (let r = 0; r < 5; r++) { ctx.save(); ctx.globalAlpha = ai; ctx.strokeStyle = C.pet; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); for (let u = 0; u <= 30; u++) { const px = x + u * 14, py = 330 + r * 44 + (j ? 0 : Math.sin(u * 0.7 + r * 2.1 + T * 0.6) * 22 + Math.sin(u * 0.23 + r) * 18); u ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
      txt(ctx, n, x, 620, { s: 54, f: 'serif', w: 500, a: ai }); txt(ctx, s, x + 2, 660, { s: 17, f: 'mono', w: 700, ls: 3, c, a: ai }); if (j) tache(ctx, x + 470, 420, 44, en(e, 2, 0.5, 3.6)); else palomita(ctx, x + 470, 420, 40, en(e, 2, 0.5, 1.2)); enzima(ctx, x + 440 - (j ? 0 : 60 * Math.abs(Math.sin(T))), 300, 26, Math.PI, ai); }); }
  const a3 = en(e, 3, 0.8); chip(ctx, 'LAS MEJORES ENZIMAS CONOCIDAS PARA PET TODAVÍA TRABAJAN A VELOCIDAD MODERADA', 960, 790, { al: 'center', c: '#ffb05a', s: 20, a: a3 });
  fte(ctx, a2 > 0.5 ? 'TOURNIER ET AL. 2020 · LEAR ET AL. 2021 · DANSO ET AL. 2019' : 'YOSHIDA ET AL. 2016, SCIENCE 351: 1196', ss(e.tl, 1, 2)); esquema(ctx, a);
};

/* ====== 05 · Lo que sí funciona ====== */
LUZ.reactor = (ctx, e) => {
  noche(ctx, '#07090c', '#0d1118'); const T = e.T, a = ss(e.tl, 0.1, 0.9), k = pr(e.tl, Lx(e, 1) + 0.6, Lx(e, 2) + 2);
  // tanque
  ctx.save(); ctx.globalAlpha = a; const g = ctx.createLinearGradient(260, 0, 760, 0); g.addColorStop(0, '#4a515c'); g.addColorStop(0.3, '#aab3be'); g.addColorStop(1, '#3d434d'); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(260, 260, 500, 500, [70, 70, 40, 40]); ctx.fill(); ctx.fillStyle = '#0b1420'; ctx.beginPath(); ctx.roundRect(310, 330, 400, 380, 30); ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle = 'rgba(80,170,240,.28)'; ctx.fillRect(310, 400, 400, 320);
  const R = rng(6); for (let i = 0; i < 60; i++) { const px = 330 + R() * 360, py = 420 + R() * 270, vivo = i / 60 > k * 0.9; if (vivo) { ctx.fillStyle = 'rgba(200,235,255,.85)'; ctx.beginPath(); ctx.ellipse(px + Math.sin(T * 2 + i) * 10, py + Math.cos(T * 1.7 + i) * 8, 8, 5, R() * 3, 0, TAU); ctx.fill(); } else { ctx.fillStyle = C.oro; ctx.beginPath(); ctx.arc(px + Math.sin(T * 2 + i) * 14, py + Math.cos(T * 1.7 + i) * 10, 3, 0, TAU); ctx.fill(); } }
  for (let i = 0; i < 6; i++) enzima(ctx, 360 + ((i * 97 + T * 60) % 320), 450 + (i * 53) % 220, 14, T * 3 + i, 1);
  ctx.restore(); ctx.strokeStyle = '#8c949f'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(510, 220); ctx.lineTo(510, 620); ctx.stroke(); ctx.save(); ctx.translate(510, 620); ctx.scale(Math.cos(T * 5), 1); ctx.fillStyle = '#8c949f'; ctx.fillRect(-70, -8, 140, 16); ctx.restore(); ctx.restore();
  rotulo(ctx, 860, 250, 'La enzima, a un reactor', 'SIN ORGANISMO: SOLO LA PROTEÍNA', ss(e.tl, 0.6, 1.4), { s: 52, c: C.oro });
  const a1 = en(e, 1, 0.8); txt(ctx, Math.round(90 * cl(k * 1.1)) + ' %', 860, 520, { s: 170, f: 'serif', w: 500, c: C.verde, a: a1 }); txt(ctx, 'DEL PET DESPOLIMERIZADO EN 10 HORAS', 866, 570, { s: 20, f: 'mono', w: 700, ls: 4, c: '#fff', a: a1 }); txt(ctx, mmh(10 * cl(k * 1.1)), 1290, 500, { s: 60, f: 'mono', w: 700, c: C.gris, a: a1 });
  const a2 = en(e, 2, 0.8); ['PET PRETRATADO PARA VOLVERLO AMORFO', '3 mg DE ENZIMA POR GRAMO DE PLÁSTICO', 'ENZIMA REDISEÑADA EN LABORATORIO'].forEach((s, i) => chip(ctx, s, 866, 650 + i * 56, { c: '#ffb05a', s: 19, a: en(e, 2, 0.7, i * 1.3) * (1 - en(e, 3, 0.5)) }));
  const a3 = en(e, 3, 0.8) * (1 - en(e, 4, 0.5)); if (a3 > 0) { for (let i = 0; i < 3; i++) botella(ctx, 960 + i * 150, 830, 0.7, a3 * ss(e.tl, Lx(e, 3) + 0.5 + i * 0.5, Lx(e, 3) + 1.1 + i * 0.5)); txt(ctx, 'BOTELLAS NUEVAS CON LOS MONÓMEROS RECUPERADOS', 1400, 760, { s: 18, f: 'mono', w: 700, ls: 3, c: C.verde, a: a3 }); }
  const a4 = en(e, 4, 0.8); if (a4 > 0) { oscurece(ctx, 0.95 * a4); titulo(ctx, 'Reciclaje industrial con enzimas', 960, 400, a4, { s: 84, c: C.verde }); titulo(ctx, 'No un organismo comiendo basura en el mar', 960, 520, en(e, 4, 0.8, 1.6), { s: 60, c: '#ffb05a' }); }
  fte(ctx, 'TOURNIER ET AL. 2020, NATURE 580: 216', ss(e.tl, 1, 2) * (1 - a4)); esquema(ctx, a * (1 - a4));
};
const mmh = (h) => { const m = Math.round(h * 60); return String(Math.floor(m / 60)).padStart(2, '0') + ' h ' + String(m % 60).padStart(2, '0'); };

/* ====== 06 · Los plásticos que nadie se come ====== */
LUZ.pastel = (ctx, e) => {
  noche(ctx, '#080a10', '#0c0f18'); const a = ss(e.tl, 0.1, 0.9), cx = 520, cy = 500, r = 270, k = eo(e.tl, Lx(e, 2) + 0.3, Lx(e, 2) + 2.2);
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = C.pet; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + TAU); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#39414e'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r + 14 * k, -Math.PI / 2, -Math.PI / 2 + TAU * 0.8 * Math.max(k, 0.001)); ctx.closePath(); ctx.fill(); ctx.restore();
  txt(ctx, 'PRODUCCIÓN ANUAL DE PLÁSTICO', cx, 180, { s: 20, f: 'mono', w: 700, ls: 5, al: 'center', c: C.gris, a }); txt(ctx, 'más de 80 %', cx, cy + r + 76, { s: 60, f: 'serif', w: 500, al: 'center', a: k });
  rotulo(ctx, 940, 230, 'El PET es la excepción', 'JUNTO CON EL POLIURETANO DE TIPO ÉSTER', ss(e.tl, 0.5, 1.3), { c: C.pet, s: 50 });
  const P = [['Polietileno', 'BOLSAS, ENVASES'], ['Polipropileno', 'TAPAS, EMPAQUES'], ['Poliestireno', 'UNICEL'], ['PVC', 'POLICLORURO DE VINILO'], ['Nailon', 'POLIAMIDA']];
  P.forEach(([n, s], i) => { const ai = en(e, 1, 0.6, 0.6 + i * 0.9), y = 380 + i * 78; txt(ctx, n, 950, y, { s: 40, f: 'serif', w: 500, a: ai }); txt(ctx, s, 1290, y - 4, { s: 16, f: 'mono', w: 700, ls: 3, c: C.gris, a: ai }); tache(ctx, 1700, y - 12, 18, en(e, 1, 0.4, 1 + i * 0.9)); });
  txt(ctx, 'NINGUNA ENZIMA DEFINIDA QUE ACTÚE SOBRE EL POLÍMERO (REVISIÓN DE 2019)', 950, 790, { s: 17, f: 'mono', w: 700, ls: 2, c: C.rojo, a: en(e, 1, 0.8, 5) });
  fte(ctx, 'DANSO, CHOW Y STREIT 2019, APPL. ENVIRON. MICROBIOL. 85: e01095-19', ss(e.tl, 1, 2));
};
LUZ.especies = (ctx, e) => {
  noche(ctx, '#05080e', '#091019'); const T = e.T, a = ss(e.tl, 0.1, 0.9), R = rng(3);
  for (let i = 0; i < 400; i++) { const x = 120 + (i % 40) * 42, y = 250 + Math.floor(i / 40) * 46, ai = a * ss(e.tl, 0.2 + i * 0.006, 0.6 + i * 0.006), firme = i < 14; ctx.fillStyle = rgba(firme ? '#3DFF7A' : '#5a6474', ai * (firme ? 1 : 1 - 0.5 * ss(e.tl, 5, 7))); ctx.beginPath(); ctx.roundRect(x, y + Math.sin(T + i) * 2, 26, 12, 6); ctx.fill(); }
  txt(ctx, 'MÁS DE 400 ESPECIES SEÑALADAS COMO DEGRADADORAS DE PLÁSTICO', 120, 200, { s: 21, f: 'mono', w: 700, ls: 4, c: C.gris, a });
  txt(ctx, 'para los plásticos más comunes, la evidencia es escasa, lenta o disputada', 960, 790, { s: 46, f: 'mano', w: 700, al: 'center', c: '#ffd9a0', a: ss(e.tl, 5, 6) });
  fte(ctx, 'LEAR ET AL. 2021, ENVIRONMENTAL MICROBIOME 16: 2', ss(e.tl, 1, 2)); esquema(ctx, a, 'ESQUEMA: LOS PUNTOS VERDES SON ILUSTRATIVOS');
};
LUZ.cadenaCC = (ctx, e) => {
  noche(ctx, '#080706', '#0f0c0a'); const T = e.T, a = ss(e.tl, 0.1, 0.9);
  for (let r = 0; r < 3; r++) cadena(ctx, 120, 330 + r * 90, 40, T * 0.6 + r, '#6f7a8c', a, 44);
  [[420, 300], [900, 420], [1380, 340]].forEach(([x, y], i) => { const b = Math.abs(Math.sin(T * 1.4 + i)); enzima(ctx, x + 30 * b, y - 70 - 40 * b, 30, Math.PI / 2, a * ss(e.tl, 2.5 + i * 0.6, 3.2 + i * 0.6)); });
  rotulo(ctx, 150, 640, 'Carbono con carbono', 'CADENAS LARGUÍSIMAS, SIN PUNTOS DÉBILES', ss(e.tl, 0.6, 1.4), { s: 52 });
  rotulo(ctx, 1000, 640, 'Superficie que repele el agua', 'LAS ENZIMAS NO SE AGARRAN', ss(e.tl, 3.4, 4.2), { s: 52, c: '#ffb05a' });
  const a1 = en(e, 1, 0.8); if (a1 > 0) { oscurece(ctx, 0.8 * a1); const X = (v) => 260 + v * 1400; ctx.save(); ctx.globalAlpha = a1; ctx.strokeStyle = 'rgba(210,222,240,.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(X(0), 500); ctx.lineTo(X(1), 500); ctx.stroke(); ctx.fillStyle = C.oro; ctx.fillRect(X(0.985), 470, X(1) - X(0.985), 60); ctx.restore(); txt(ctx, 'HISTORIA DE LA VIDA', X(0), 450, { s: 20, f: 'mono', w: 700, ls: 5, c: C.gris, a: a1 }); guia(ctx, X(0.992), 470, X(0.86), 360, en(e, 1, 0.6, 1), C.oro); txt(ctx, 'pocas décadas de plásticos', X(0.86), 340, { s: 48, f: 'mano', w: 700, al: 'right', c: C.oro, a: en(e, 1, 0.8, 1) }); txt(ctx, 'LA FRANJA ESTÁ EXAGERADA PARA QUE SE VEA', X(1), 580, { s: 15, f: 'mono', w: 700, ls: 2, al: 'right', c: '#8fa0bd', a: a1 }); }
  fte(ctx, 'DANSO, CHOW Y STREIT 2019', ss(e.tl, 1, 2)); esquema(ctx, a);
};

/* ====== 07 · Veredicto ====== */
LUZ.veredicto = (ctx, e) => {
  noche(ctx, '#080a10', '#0c0f18'); const a = ss(e.tl, 0.1, 0.9);
  titulo(ctx, '¿Estafa?', 960, 230, a, { s: 120 });
  const F = [['Los estudios', 'SON REALES', C.verde, 0, 1.2], ['Algunos organismos', 'SÍ ROMPEN ALGUNOS PLÁSTICOS', C.verde, 0, 2.8], ['La promesa', '«SOLTAMOS GUSANOS O BACTERIAS Y EL PLÁSTICO DESAPARECE»', C.rojo, 1, 0.3]];
  F.forEach(([t, s, c, li, d], i) => { const ai = li ? en(e, 1, 0.8, d) : ss(e.tl, d, d + 0.8), y = 400 + i * 140; rotulo(ctx, 420, y, t, s, ai, { c, s: 54 }); if (i < 2) palomita(ctx, 340, y + 4, 30, ai, c); else tache(ctx, 340, y + 4, 28, ai); });
  sello(ctx, 'NO CUADRA', 1480, 540, en(e, 1, 0.5, 2.4), C.rojo, -0.07, 60);
};
LUZ.preguntas = (ctx, e) => {
  noche(ctx, '#07090c', '#0d1118'); const a = ss(e.tl, 0.1, 0.9);
  titulo(ctx, 'Tres preguntas para la próxima noticia', 960, 200, a, { s: 68 });
  const Q = [['1', '¿Midieron CO₂ que salió del plástico?', 'O SOLO PESO PERDIDO', C.co2], ['2', '¿Qué plástico era, y en qué forma?', 'POLVO AMORFO O UNA BOTELLA REAL', C.pet], ['3', '¿A qué velocidad?', 'COMPARADA CON LO QUE PRODUCIMOS', C.oro]];
  Q.forEach(([n, t, s, c], i) => { const ai = en(e, i + 1, 0.8), y = 370 + i * 160; txt(ctx, n, 260, y + 20, { s: 110, f: 'serif', w: 500, c, a: ai }); txt(ctx, t, 380, y, { s: 56, f: 'serif', w: 500, a: ai }); txt(ctx, s, 384, y + 44, { s: 20, f: 'mono', w: 700, ls: 4, c, a: ai }); });
};
LUZ.cierre = (ctx, e) => {
  const fin = cam(ctx, 1.0 + 0.08 * ss(e.tl, 0, 8), 800, 520); escenaBolsa(ctx, e, 1.6); fin();
  const a1 = en(e, 1, 0.8); guia(ctx, 820, 800, 1290, 420, a1, C.pe); rotulo(ctx, 1300, 430, 'El plástico que falta', 'NO DESAPARECIÓ', a1, { c: C.pe, s: 52 }); txt(ctx, 'solo cambió de tamaño', 1304, 560, { s: 54, f: 'mano', w: 700, c: '#ffd9a0', a: en(e, 1, 0.8, 2.4) });
  txt(ctx, 'HASTA QUE ALGUIEN LO DEMUESTRE', 1306, 620, { s: 18, f: 'mono', w: 700, ls: 4, c: C.gris, a: en(e, 1, 0.8, 3.4) }); esquema(ctx, 1);
};
