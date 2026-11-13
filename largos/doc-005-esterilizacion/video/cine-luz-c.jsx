// cine-luz-c.jsx — Documental 005 (esterilización), escenas de la versión 2 (13 nov 2026).
// Solo datos de artículos arbitrados: mediciones en bolsas (Ozanne 1993, Rutala 1982), ciclos cortos en inóculo (Gupta 2020),
// cinta testigo contra esporas (Lee 1979), ollas eléctricas (Swenson 2018), y la simulación de tubo, frasco y bolsa.
const { TAU, cl, pr, ss, eo, mixn, rng, rgba, mixc, LUZC, FU, halo, noche, polvo, cam, oscurece, txt, rico, chip, rotulo, guia, titulo, sello, tache, flecha, frasco, matraz, termometro } = window.LZK;
const { Lx, en, esquema, fte, C, calor, ganado, tempC, mapaCalor, barraColor, mmss, vapor, manometro, olla, bolsaCorte, bolsa, granos, frascoGrano, esporita, bacilo, endospora, graf, ejes, curva, cronometro, palomita, reloj7, corteCil, tuboCultivo } = window.LZA;
const { aire, ollaLlena, ampolleta, miniOlla } = window.LZB;
const LUZ = window.LUZ;

// Frasco de grano en corte, con mapa de calor (coordenadas del centro del contenido).
function frascoCorte(ctx, cx, cy, w, h, Fo, o = {}) {
  const r = w * 0.14; ctx.save(); ctx.globalAlpha *= o.a ?? 1;
  mapaCalor(ctx, (k) => { ctx.beginPath(); ctx.roundRect(cx - w / 2 * k, cy - h / 2 * k, w * k, h * k, r * k); }, Fo, { n: o.n || 22 });
  const R = rng(o.seed || 11); ctx.fillStyle = 'rgba(20,12,6,.25)'; for (let i = 0; i < (o.motas ?? 46); i++) { ctx.beginPath(); ctx.ellipse(cx + (R() - 0.5) * w * 0.9, cy + (R() - 0.5) * h * 0.92, 3 + R() * 3, 1.6 + R() * 1.6, R() * 3, 0, TAU); ctx.fill(); }
  ctx.strokeStyle = 'rgba(205,225,250,.85)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(cx - w / 2 - 5, cy - h / 2 - h * 0.24, w + 10, h * 1.24 + 5, [w * 0.1, w * 0.1, r, r]); ctx.stroke();
  ctx.fillStyle = '#9aa3ad'; ctx.beginPath(); ctx.roundRect(cx - w / 2 - 9, cy - h / 2 - h * 0.24 - 14, w + 18, 18, 5); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.16)'; ctx.fillRect(cx - w / 2 + 6, cy - h / 2 - h * 0.16, 5, h * 1.05); ctx.restore();
}
// La olla del gancho y del cierre: adentro lleva una bolsa de sustrato y un frasco de grano.
function escenaOlla2(ctx, e, o = {}) {
  noche(ctx, '#0a0807', '#120d0a'); halo(ctx, 640, 860, 700, '#ff9a4a', 0.07); ctx.fillStyle = '#0d0b0a'; ctx.fillRect(0, 838, 1920, 242);
  olla(ctx, 640, 800, 1.08, e.T, { rx: o.rx, psi: 15, dentro: (c) => { bolsaCorte(c, -92, -160, 196, 196, o.Fo, { seed: 4, motas: 80 }); frascoCorte(c, 126, -136, 112, 150, o.Fo * 2.25, { seed: 6 }); } });
}
const ALFA_S = 1.43e-7; // m²/s: difusividad térmica del agua a 25 °C (Blumm y Lindemann 2003)

/* ====== 00 · Gancho ====== */
LUZ.olla2 = (ctx, e) => {
  const rx = ss(e.tl, 1.0, 3.0), Fo = 0.01 + 0.035 * e.p, fin = cam(ctx, 1.06 - 0.06 * ss(e.tl, 0, 6), 760, 520); escenaOlla2(ctx, e, { rx, Fo }); fin();
  guia(ctx, 628, 300, 300, 200, ss(e.tl, 0.3, 1.0), C.oro); chip(ctx, 'MANÓMETRO: 15 psi ≈ 121 °C', 50, 160, { c: C.oro, s: 20, a: ss(e.tl, 0.4, 1.1) });
  txt(ctx, 'AL NIVEL DEL MAR · psi = LIBRAS POR PULGADA CUADRADA', 54, 204, { s: 15, f: 'mono', w: 700, ls: 2, c: '#8fa0bd', a: ss(e.tl, 0.9, 1.6) });
  const ac = ss(e.tl, 2.6, 3.4) * (1 - en(e, 2, 0.5)); guia(ctx, 540, 626, 1090, 640, ac, '#8fb4ff'); rotulo(ctx, 1110, 650, 'El centro de la bolsa', 'TODAVÍA FRÍO', ac, { c: '#8fb4ff', s: 40 });
  const a1 = en(e, 1, 0.8), f1 = 1 - en(e, 2, 0.6);
  txt(ctx, '15 min · 121 °C', 1420, 330, { s: 108, f: 'serif', w: 500, al: 'center', a: a1 * f1 }); txt(ctx, 'LA RECETA CLÁSICA DEL LABORATORIO', 1420, 388, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: C.oro, a: a1 * f1 });
  // lo que se acostumbra en el cultivo
  const a2 = en(e, 2, 0.8); txt(ctx, 'EN EL CULTIVO DE HONGOS SE ACOSTUMBRA', 1130, 190, { s: 20, f: 'mono', w: 700, ls: 5, c: C.oro, a: a2 });
  const X = (m) => 1130 + m * 3.6; [['Receta clásica', 15, 15, '15 min', 280, 0, '#8fa0bd'], ['Frascos de grano', 60, 90, '60 a 90 min', 420, 1.0, '#f2d64b'], ['Bolsas de sustrato', 120, 150, '2 a 2.5 h', 560, 3.2, '#f58a2c']].forEach(([n, m0, m1, v, y, d, c]) => { const ai = en(e, 2, 0.7, d), b = eo(e.tl, Lx(e, 2) + d, Lx(e, 2) + d + 1.4);
    txt(ctx, n, 1130, y - 22, { s: 36, f: 'serif', w: 500, a: ai }); ctx.save(); ctx.globalAlpha = ai; ctx.fillStyle = rgba(c, 0.35); ctx.beginPath(); ctx.roundRect(X(0), y, Math.max(4, (X(m0) - X(0)) * b), 34, 8); ctx.fill(); ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(X(m0) * b + X(0) * (1 - b) - (m0 === m1 ? 6 : 0), y, Math.max(6, (X(m1) - X(m0)) * b), 34, 8); ctx.fill(); ctx.restore();
    txt(ctx, v, X(m1) + 18, y + 28, { s: 34, f: 'mono', w: 700, c: '#fff', a: ai * b }); });
  const a3 = en(e, 3, 0.8); if (a3 > 0) { for (let i = 0; i < 5; i++) flecha(ctx, 1136 + i * 74, 700, 1186 + i * 74, 700, a3 * (0.5 + 0.5 * Math.sin(e.T * 2 - i)), calor(1 - i / 5), 5); txt(ctx, 'lo que tarda el calor en llegar al centro', 1130, 770, { s: 44, f: 'mano', w: 700, c: '#ffd9a0', a: a3 }); }
  esquema(ctx, ss(e.tl, 3, 4) * (1 - a1));
};

/* ====== 02 · Mediciones en bolsas ====== */
LUZ.ozanne = (ctx, e) => {
  noche(ctx, '#07090f', '#0b0f18'); const a = ss(e.tl, 0.2, 1), x0 = 640, X = (m) => x0 + m * 12.4;
  txt(ctx, 'MINUTOS PARA QUE EL CENTRO DE LA CARGA LLEGUE A 121 °C', 150, 150, { s: 22, f: 'mono', w: 700, ls: 4, c: C.gris, a });
  txt(ctx, '276 BOLSAS DE RESIDUOS DE LABORATORIO, A MEDIO LLENAR · AUTOCLAVE A 121 °C', 150, 186, { s: 17, f: 'mono', w: 700, ls: 2, c: C.oro, a: ss(e.tl, 1.2, 2) });
  // franja de la receta: 15 minutos
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(61,255,122,.10)'; ctx.fillRect(X(0), 240, X(15) - X(0), 520); ctx.strokeStyle = 'rgba(210,222,240,.2)'; ctx.lineWidth = 1.5; for (let m = 0; m <= 90; m += 15) { ctx.beginPath(); ctx.moveTo(X(m), 240); ctx.lineTo(X(m), 760); ctx.stroke(); } ctx.restore();
  [0, 15, 30, 45, 60, 75, 90].forEach((m) => txt(ctx, String(m), X(m), 796, { s: 20, f: 'mono', w: 700, al: 'center', c: m === 15 ? C.verde : C.gris, a }));
  txt(ctx, 'LOS 15 min DE LA RECETA', X(0) + 6, 232, { s: 16, f: 'mono', w: 700, ls: 2, c: C.verde, a: ss(e.tl, 1.6, 2.4) });
  const F = [['Bolsa cerrada', 'CONTROL', 46, 1, 0.3], ['Doble bolsa', '', 60, 2, 0.3], ['En contenedor vertical', '', 82, 2, 2.6], ['Bolsa con cortes', 'PARA QUE ENTRE EL VAPOR', 37, 3, 0.3]];
  F.forEach(([n, s, m, li, d], i) => { const y = 320 + i * 118, ai = en(e, li, 0.7, d - 0.3), b = eo(e.tl, Lx(e, li) + d, Lx(e, li) + d + 1.5);
    txt(ctx, n, 150, y + 6, { s: 38, f: 'serif', w: 500, a: ai }); if (s) txt(ctx, s, 152, y + 38, { s: 15, f: 'mono', w: 700, ls: 3, c: C.oro, a: ai });
    ctx.save(); ctx.globalAlpha = ai; const g = ctx.createLinearGradient(X(0), 0, X(m), 0); g.addColorStop(0, calor(0.15)); g.addColorStop(1, calor(0.86)); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(X(0), y - 28, Math.max(4, (X(m) - X(0)) * b), 56, 10); ctx.fill(); ctx.restore();
    txt(ctx, Math.round(m * b) + ' min', X(m * b) + 20, y + 16, { s: 46, f: 'serif', w: 500, c: i === 3 ? C.verde : '#fff', a: ai }); });
  fte(ctx, 'OZANNE, HUOT Y MONTPETIT 1993, APPL. ENVIRON. MICROBIOL. 59: 4335 · PROMEDIOS', ss(e.tl, 1, 2));
};
LUZ.rutala = (ctx, e) => {
  noche(ctx, '#080a0e', '#0c0f15'); const T = e.T, a = ss(e.tl, 0.2, 1), xs = [380, 900, 1460], K = [['2.3 kg', 0.72], ['4.5 kg', 0.9], ['6.8 kg', 1.06]], base = 700;
  txt(ctx, 'RESIDUOS DE LABORATORIO EN BOLSAS DE AUTOCLAVE · ESPORAS DE PRUEBA ADENTRO', 960, 160, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c: C.gris, a });
  K.forEach(([kg, s], i) => { const ai = ss(e.tl, 0.4 + i * 0.5, 1.2 + i * 0.5), x = xs[i], w = 250 * s, h = 250 * s;
    // contenedor de acero (aparece en la frase 1 para las dos cargas grandes)
    const ac = i ? en(e, 1, 0.8) : 0; ctx.save(); ctx.globalAlpha = ac; const g = ctx.createLinearGradient(x - w, 0, x + w, 0); g.addColorStop(0, '#59606b'); g.addColorStop(0.3, '#bcc4ce'); g.addColorStop(1, '#474d57'); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x - w * 0.72, base - h * 0.5, w * 1.44, h * 0.5 + 14, [6, 6, 16, 16]); ctx.fill(); ctx.restore();
    bolsa(ctx, x, base, w, h, { c: '#8d8f94', seed: 3 + i, a: ai }); ampolleta(ctx, x, base - h * 0.5, 1.3 * s, ai); halo(ctx, x, base - h * 0.5, 60 * s, '#bfe4ff', 0.4 * ai);
    txt(ctx, kg, x, base + 62, { s: 44, f: 'serif', w: 500, al: 'center', a: ai });
    if (i) { txt(ctx, '90 min', x, 250, { s: 76, f: 'serif', w: 500, al: 'center', c: '#fff', a: en(e, 1, 0.8, 0.8) }); txt(ctx, 'EN CONTENEDOR DE ACERO INOXIDABLE', x, 292, { s: 16, f: 'mono', w: 700, ls: 2, al: 'center', c: C.oro, a: en(e, 1, 0.8, 0.8) }); palomita(ctx, x + 150, 236, 24, en(e, 1, 0.5, 2.2)); } });
  txt(ctx, 'lo único que aseguró matar las esporas', 420, 300, { s: 40, f: 'mano', w: 700, al: 'center', c: '#bfe4ff', a: en(e, 1, 0.8, 3) });
  const a2 = en(e, 2, 0.8); flecha(ctx, 1300, 846, 420, 846, a2, '#ffd27a', 4); chip(ctx, 'MENOS CARGA Y ACERO EN VEZ DE PLÁSTICO: EL CALOR ENTRA MEJOR', 960, 800, { c: '#ffd27a', s: 19, al: 'center', a: a2 });
  fte(ctx, 'RUTALA, STIEGEL Y SARUBBI 1982, APPL. ENVIRON. MICROBIOL. 43: 1311', ss(e.tl, 1, 2), 890); esquema(ctx, a);
};

/* ====== 03 · Simulación: tubo, frasco y bolsa ====== */
const GS = { x: 1330, y: 500, w: 520, h: 280, x0: 0, x1: 6.4, y0: 25, y1: 125 };
const tLleg = (R) => 0.871 * R * R / ALFA_S / 3600; // horas hasta que el centro queda a 1 °C de la superficie
LUZ.simula = (ctx, e) => {
  noche(ctx, '#080706', '#0f0c0a'); const a = ss(e.tl, 0.2, 1.1), T = e.T, L1 = Lx(e, 1), L2 = Lx(e, 2), L3 = Lx(e, 3);
  const th = 0.11 * pr(e.tl, L1 + 1.2, L2 - 0.8) + 2.6 * ss(e.tl, L2 + 0.3, L2 + 3.6) + 3.45 * ss(e.tl, L2 + 4.4, L3 - 0.4), seg = th * 3600;
  const O = [['TUBO DE ENSAYO', '1.5 cm', 0.0075, 150, 470, 30, '#ffd27a'], ['FRASCO', '8 cm', 0.04, 440, 470, 160, '#9fe0c0'], ['BOLSA', '12 cm', 0.06, 930, 470, 240, '#7fc4ff']];
  O.forEach(([n, d, R, x, y, r, c], i) => { const Fo = ALFA_S * seg / (R * R), tc = tempC(0, Fo);
    corteCil(ctx, x, y, r, Fo, { a, motas: i ? 7 : 0, n: i ? 30 : 14, lw: i ? 3 : 5 });
    if (i < 2) { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(225,235,250,.4)'; ctx.lineWidth = i ? 8 : 7; ctx.beginPath(); ctx.arc(x, y, r + (i ? 6 : 6), 0, TAU); ctx.stroke(); ctx.restore(); }
    txt(ctx, n, x, y - r - 54, { s: 19, f: 'mono', w: 700, ls: 4, al: 'center', c: C.gris, a }); txt(ctx, d + ' DE ANCHO', x, y - r - 26, { s: 16, f: 'mono', w: 700, ls: 3, al: 'center', c: C.oro, a });
    const a1 = en(e, 1, 0.7); if (i) { ctx.save(); ctx.globalAlpha = a1; ctx.fillStyle = 'rgba(6,8,14,.62)'; ctx.beginPath(); ctx.roundRect(x - 84, y - 28, 168, 56, 28); ctx.fill(); ctx.restore(); txt(ctx, Math.round(tc) + ' °C', x, y + 14, { s: 40, f: 'mano', w: 700, al: 'center', c: '#fff', a: a1 }); } else txt(ctx, Math.round(tc) + ' °C', x, y + r + 50, { s: 40, f: 'mano', w: 700, al: 'center', c: '#ffd9a0', a: a1 });
    if (tc > 119.95) palomita(ctx, x + (i ? 0 : 0), y + (i ? 70 : r + 92), 22, 1, c); });
  txt(ctx, 'CORTES A LA MISMA ESCALA', 560, 800, { s: 16, f: 'mono', w: 700, ls: 4, al: 'center', c: '#8fa0bd', a: a * (1 - en(e, 3, 0.4)) });
  sello(ctx, 'PEOR CASO', 1560, 122, ss(e.tl, 2.4, 3), C.oro, -0.04, 34); txt(ctx, 'SOLO CONDUCCIÓN · DIFUSIVIDAD DEL AGUA: 0.143 mm²/s', 1590, 178, { s: 15, f: 'mono', w: 700, ls: 2, al: 'center', c: C.oro, a: ss(e.tl, 3, 3.8) });
  // gráfica de la temperatura en el centro y reloj simulado
  const a1 = en(e, 1, 0.7); ejes(ctx, GS, a1, { yt: [[25, '25'], [121, '121 °C']], xt: [0, 2, 4, 6].map((v) => [v, v + ' h']), ts: 18 });
  if (a1 > 0) O.forEach(([n, d, R, x, y, r, c]) => curva(ctx, GS, (h) => tempC(0, ALFA_S * h * 3600 / (R * R)), th, c, 4));
  const hh = Math.floor(th), mm = Math.floor((th - hh) * 60); txt(ctx, 'TIEMPO SIMULADO', 1330, 600, { s: 18, f: 'mono', w: 700, ls: 5, c: C.gris, a: a1 }); txt(ctx, hh + ' h ' + String(mm).padStart(2, '0') + ' min', 1330, 664, { s: 60, f: 'mono', w: 700, a: a1 });
  chip(ctx, 'TUBO: ≈ 6 min', 1330, 716, { c: '#ffd27a', s: 20, a: ss(e.tl, L2 - 1.6, L2 - 0.9) }); chip(ctx, 'FRASCO: ≈ 2 h 40 min', 1330, 766, { c: '#9fe0c0', s: 20, a: en(e, 2, 0.6, 3.4) }); chip(ctx, 'BOLSA: ≈ 6 h', 1330, 816, { c: '#7fc4ff', s: 20, a: en(e, 2, 0.6, 7.4) });
  const a3 = en(e, 3, 0.7) * (1 - en(e, 4, 0.5)); if (a3 > 0) { txt(ctx, '(12 ÷ 8)² = 2.25', 690, 800, { s: 76, f: 'serif', w: 500, al: 'center', c: C.oro, a: a3 }); txt(ctx, 'ANCHO × 1.5 → TIEMPO × 2.25', 690, 846, { s: 22, f: 'mono', w: 700, ls: 5, al: 'center', c: '#fff', a: a3 }); flecha(ctx, 610, 470, 680, 470, a3, C.oro, 5); }
  const a4 = en(e, 4, 0.8); if (a4 > 0) { O.slice(1).forEach(([n, d, R, x, y, r]) => { for (let i = 0; i < 20; i++) { const an = i * 2.4, ph = (T * 0.25 + i * 0.137) % 1, dd = r * (1.05 - 0.6 * ph); halo(ctx, x + Math.cos(an) * dd, y + Math.sin(an) * dd, 22, C.vapor, a4 * 0.7 * Math.sin(ph * Math.PI)); } }); chip(ctx, 'EN CARGAS REALES ENTRA ALGO DE VAPOR: LOS TIEMPOS MEDIDOS SON MENORES', 60, 846, { c: C.vapor, s: 17, a: a4 }); }
  fte(ctx, 'SIMULACIÓN PROPIA (NO ES MEDICIÓN) · DIFUSIVIDAD: BLUMM Y LINDEMANN 2003', ss(e.tl, 2, 3) * (1 - a4), 890);
};

/* ====== 04 · Aire, altitud y ollas ====== */
LUZ.aire2 = (ctx, e) => {
  noche(ctx, '#0a0807', '#120d0a'); const T = e.T, a0 = ss(e.tl, 0.6, 1.8); ctx.fillStyle = '#0d0b0a'; ctx.fillRect(0, 838, 1920, 242);
  olla(ctx, 600, 800, 1.08, T, { rx: ss(e.tl, 0.2, 1.4), vaporIn: 0.6, vapor: 0.5, dentro: (c) => { bolsaCorte(c, -92, -160, 196, 196, 0.03, { seed: 4, motas: 80 }); frascoCorte(c, 126, -136, 112, 150, 0.05, { seed: 6 }); aire(c, -200, -320, 400, 260, 80, T, a0, 9); } });
  guia(ctx, 440, 520, 200, 250, a0, '#aebdd6'); rotulo(ctx, 60, 190, 'Aire atrapado', 'NO SE VE, PERO OCUPA LUGAR', a0, { c: '#aebdd6', s: 44 });
  const a1 = en(e, 1, 0.8), S = [['Donde queda aire,', 'EL VAPOR NO TOCA EL MATERIAL', '#aebdd6'], ['Esa zona', 'SE CALIENTA MENOS', '#ffb05a'], ['Para esterilizar con vapor', 'TODO EL AIRE TIENE QUE SALIR', C.verde]];
  S.forEach(([t, s, c], i) => rotulo(ctx, 1130, 300 + i * 170, t, s, en(e, 1, 0.7, i * 2.2), { c, s: 46 }));
  fte(ctx, 'VAN DOORNMALEN Y KOPINGA 2008, AM. J. INFECT. CONTROL 36: 86', a1, 880); esquema(ctx, a0);
};
LUZ.purga2 = (ctx, e) => {
  noche(ctx, '#0a0807', '#120d0a'); const T = e.T, pone = ss(e.tl, e.dur - 2.2, e.dur - 1.2), fr = pr(e.tl, 0.5, e.dur - 2.4); ctx.fillStyle = '#0d0b0a'; ctx.fillRect(0, 838, 1920, 242);
  olla(ctx, 620, 800, 1.08, T, { rx: 1, sinPesa: 1 - pone, vapor: 0, psi: 0.6 + 4 * pone, dentro: (c) => { bolsaCorte(c, -92, -160, 196, 196, 0.02, { seed: 4, motas: 80 }); frascoCorte(c, 126, -136, 112, 150, 0.04, { seed: 6 }); aire(c, -200, -320, 400, 260, 80, T, 1 - 0.2 * fr, 9, fr); } });
  const vx = 620 + 90 * 1.08, vy = 800 - 400 * 1.08; for (let i = 0; i < 22; i++) { const ph = (T * 0.7 + i / 22) % 1; halo(ctx, vx + Math.sin(i * 2.1 + T) * 60 * ph, vy - ph * 330, 26 + ph * 120, C.vapor, (1 - pone) * 0.5 * (1 - ph)); if (i % 3 === 0 && fr < 0.95) { ctx.fillStyle = `rgba(150,170,200,${0.8 * (1 - ph) * (1 - fr)})`; ctx.beginPath(); ctx.arc(vx + Math.sin(i * 1.3 + T) * 40 * ph, vy - ph * 300, 5, 0, TAU); ctx.fill(); } }
  rotulo(ctx, 1150, 300, 'Purgar el aire', 'DEJAR SALIR VAPOR ANTES DE CERRAR', ss(e.tl, 0.2, 1), { s: 60 });
  txt(ctx, 'el vapor empuja el aire hacia afuera', 1160, 470, { s: 42, f: 'mano', w: 700, c: '#aebdd6', a: ss(e.tl, 1.6, 2.4) });
  chip(ctx, 'DESPUÉS SE CIERRA Y SUBE LA PRESIÓN', 1160, 620, { c: C.verde, s: 22, a: pone }); esquema(ctx, 1);
};
LUZ.altitud2 = (ctx, e) => {
  noche(ctx, '#060a12', '#0c1420'); const T = e.T, a = ss(e.tl, 0.1, 0.9);
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#16304f'; ctx.fillRect(0, 800, 330, 60); ctx.fillStyle = '#1c2a22'; ctx.beginPath(); ctx.moveTo(180, 860); ctx.lineTo(180, 800); ctx.lineTo(680, 800); ctx.bezierCurveTo(820, 800, 820, 560, 960, 560); ctx.lineTo(1560, 560); ctx.bezierCurveTo(1700, 560, 1760, 660, 1920, 680); ctx.lineTo(1920, 860); ctx.closePath(); ctx.fill(); ctx.restore();
  txt(ctx, 'NIVEL DEL MAR', 480, 842, { s: 19, f: 'mono', w: 700, ls: 5, al: 'center', c: '#8fb4ff', a }); txt(ctx, '1,500 m DE ALTITUD', 1220, 602, { s: 19, f: 'mono', w: 700, ls: 5, al: 'center', c: C.oro, a });
  miniOlla(ctx, 480, 782, 0.6, T, a); miniOlla(ctx, 1220, 542, 0.6, T, a);
  const a1 = en(e, 1, 0.8); [[480, 552], [1220, 312]].forEach(([x, y]) => { txt(ctx, 'PESA: + 15 psi', x - 216, y + 30, { s: 22, f: 'mono', w: 700, ls: 2, al: 'right', c: C.oro, a: a1 }); txt(ctx, '(+ 103 kPa)', x - 216, y + 62, { s: 19, f: 'mono', w: 700, ls: 2, al: 'right', c: '#8fa0bd', a: a1 }); });
  txt(ctx, 'psi: LIBRAS POR PULGADA CUADRADA · kPa: KILOPASCALES', 60, 150, { s: 18, f: 'mono', w: 700, ls: 2, c: '#8fa0bd', a: a1 });
  const a2 = en(e, 2, 0.8); [[480, 330, 9, '101 kPa'], [1220, 120, 5, '≈ 85 kPa']].forEach(([x, y0, n, v], k) => { for (let i = 0; i < n; i++) { const ph = (T * 0.25 + i / n) % 1; ctx.fillStyle = `rgba(150,170,200,${0.6 * a2 * Math.sin(ph * Math.PI)})`; for (const d of [-200, -170, 170, 200]) { ctx.beginPath(); ctx.arc(x + d, y0 + ph * (k ? 380 : 420), 5, 0, TAU); ctx.fill(); } }
    txt(ctx, 'AIRE DE AFUERA', x + 230, y0 + 250, { s: 20, f: 'mono', w: 700, ls: 3, c: '#aebdd6', a: a2 }); txt(ctx, v, x + 230, y0 + 306, { s: 54, f: 'serif', w: 500, c: '#aebdd6', a: a2 }); });
  const a3 = en(e, 2, 0.8, 3); txt(ctx, '121 °C', 480, 400, { s: 90, f: 'serif', w: 500, al: 'center', c: '#ff8a7a', a: a3 }); txt(ctx, '205 kPa ADENTRO', 480, 440, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: C.gris, a: a3 });
  txt(ctx, '≈ 118 °C', 1220, 160, { s: 90, f: 'serif', w: 500, al: 'center', c: '#ffb05a', a: en(e, 2, 0.8, 4.2) }); txt(ctx, '≈ 189 kPa ADENTRO', 1220, 200, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: C.gris, a: en(e, 2, 0.8, 4.2) });
  fte(ctx, 'CÁLCULO: PRESIÓN A 1,500 m (WEST 1996) Y VAPOR SATURADO (WAGNER Y PRUSS 2002)', ss(e.tl, 2, 3), 890);
};
LUZ.letal2 = (ctx, e) => {
  noche(ctx, '#07090f', '#0b0f18'); const a = ss(e.tl, 0.1, 0.9), x0 = 420, X = (m) => x0 + m * 26;
  txt(ctx, 'MINUTOS EN EL CENTRO PARA EL MISMO EFECTO SOBRE LAS ESPORAS', 150, 160, { s: 21, f: 'mono', w: 700, ls: 4, c: C.gris, a });
  const F = [['A 121 °C', 15, '15 min', '#ff8a7a', 0.4, 'LA RECETA'], ['A 118 °C', 26, '≈ 26 min', '#ffb05a', 2.4, 'ESPORAS DEL LOTE DE LA EPA (z = 10.9 °C)'], ['A 118 °C', 49, '≈ 49 min', '#f2d64b', 5.2, 'OTRA CEPA DE REFERENCIA (z = 5.1 °C)']];
  F.forEach(([n, m, v, c, d, s], i) => { const y = 300 + i * 160, ai = ss(e.tl, d, d + 0.7), b = eo(e.tl, d + 0.2, d + 1.6); txt(ctx, n, 150, y + 12, { s: 46, f: 'serif', w: 500, a: ai }); ctx.save(); ctx.globalAlpha = ai; ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(X(0), y - 30, Math.max(4, (X(m) - X(0)) * b), 60, 10); ctx.fill(); ctx.restore(); txt(ctx, v, X(m * b) + 20, y + 16, { s: 46, f: 'serif', w: 500, a: ai }); txt(ctx, s, X(0), y + 62, { s: 15, f: 'mono', w: 700, ls: 2, c: '#8fa0bd', a: ai }); });
  txt(ctx, '× 1.7', X(26) + 240, 476, { s: 54, f: 'mono', w: 700, c: '#ffb05a', a: ss(e.tl, 3.6, 4.3) }); txt(ctx, '× 3.3', X(49) + 240, 636, { s: 54, f: 'mono', w: 700, c: '#f2d64b', a: ss(e.tl, 6.4, 7.1) });
  const a1 = en(e, 1, 0.8); if (a1 > 0) { oscurece(ctx, 0.88 * a1); titulo(ctx, 'Más altitud, más tiempo', 960, 420, a1, { s: 96 }); txt(ctx, 'O MÁS PRESIÓN, SI LA OLLA LA PERMITE', 960, 490, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: C.oro, a: en(e, 1, 0.8, 1.2) }); }
  fte(ctx, 'CÁLCULO CON VALORES z DE LEMIEUX ET AL. 2006 Y DE LA TABLA 2 DE PMC12191528 (2025)', ss(e.tl, 1, 2) * (1 - a1), 880);
};
// Olla eléctrica de presión genérica (sin marca).
function ollaElec(ctx, x, y, s, a, c = '#3a3f4a') { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const g = ctx.createLinearGradient(-110, 0, 110, 0); g.addColorStop(0, '#70777f'); g.addColorStop(0.3, '#c4ccd6'); g.addColorStop(1, '#5a616b'); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-110, -190, 220, 190, [14, 14, 26, 26]); ctx.fill(); ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(-120, -236, 240, 56, [40, 40, 8, 8]); ctx.fill(); ctx.fillStyle = '#1b1d22'; ctx.beginPath(); ctx.roundRect(-30, -258, 60, 26, 10); ctx.fill(); ctx.fillStyle = '#12151b'; ctx.beginPath(); ctx.roundRect(-64, -130, 128, 84, 10); ctx.fill(); ctx.fillStyle = '#4ee0a0'; ctx.font = `700 30px ${FU.mono}`; ctx.textAlign = 'center'; ctx.fillText('P', 0, -100); ctx.fillStyle = '#2a2d36'; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(-42 + i * 28, -64, 7, 0, TAU); ctx.fill(); } ctx.fillStyle = '#15171d'; ctx.fillRect(-90, 0, 180, 10); ctx.restore(); }
LUZ.ollas = (ctx, e) => {
  noche(ctx, '#080a10', '#0c0f18'); const T = e.T, a = ss(e.tl, 0.2, 1), xs = [330, 750, 1170, 1590], cs = ['#3a3f4a', '#5a2f2f', '#2f4a5a', '#3f3a52'];
  txt(ctx, 'CUATRO MARCAS DE OLLAS ELÉCTRICAS DE PRESIÓN', 960, 170, { s: 22, f: 'mono', w: 700, ls: 5, al: 'center', c: C.gris, a });
  const a1 = en(e, 1, 0.7);
  xs.forEach((x, i) => { const ai = ss(e.tl, 0.4 + i * 0.25, 1.1 + i * 0.25); ollaElec(ctx, x, 560, 1.15, ai, cs[i]); if (ai > 0.5) vapor(ctx, x, 270, T + i, 5, 0.5 * ai, 110, 20);
    txt(ctx, 'MEDIOS E INSTRUMENTOS', x, 626, { s: 16, f: 'mono', w: 700, ls: 2, al: 'center', c: C.gris, a: a1 }); palomita(ctx, x + 150, 620, 16, en(e, 1, 0.5, 0.5 + i * 0.2));
    const ab = en(e, 1, 0.7, 2.6); ampolleta(ctx, x - 40, 730, 1.3, ab); txt(ctx, 'ESPORAS', x + 4, 722, { s: 16, f: 'mono', w: 700, ls: 2, c: '#bfe4ff', a: ab }); txt(ctx, 'DE PRUEBA', x + 4, 746, { s: 16, f: 'mono', w: 700, ls: 2, c: '#bfe4ff', a: ab });
    const ar = en(e, 1, 0.5, 4 + i * 0.4); if (i === 3) palomita(ctx, x + 150, 730, 22, ar); else tache(ctx, x + 150, 730, 18, ar); });
  txt(ctx, 'solo una mató las esporas de prueba', 960, 840, { s: 46, f: 'mano', w: 700, al: 'center', c: '#bfe4ff', a: en(e, 1, 0.8, 5.6) });
  fte(ctx, 'SWENSON ET AL. 2018, PLOS ONE 13: e0208769', ss(e.tl, 1, 2), 890); esquema(ctx, a);
};

/* ====== 05 · Ciclos cortos en inóculo de grano ====== */
LUZ.gupta = (ctx, e) => {
  noche(ctx, '#0a0806', '#120e0a'); const a = ss(e.tl, 0.2, 1), base = 720, H = 4.2, xs = [760, 1140, 1520], D = [[54, 23.33], [89.33, 83.33], [98.66, 98.66]];
  frascoGrano(ctx, 300, 760, 250, 400, 4, a, 0.7); txt(ctx, 'INÓCULO DE GRANO', 300, 810, { s: 18, f: 'mono', w: 700, ls: 4, al: 'center', c: C.gris, a }); txt(ctx, 'EN BOTELLAS DE VIDRIO', 300, 838, { s: 15, f: 'mono', w: 700, ls: 3, al: 'center', c: C.oro, a });
  txt(ctx, 'CUÁNTO BAJA LA CONTAMINACIÓN FRENTE AL GRANO SIN TRATAR', 560, 150, { s: 20, f: 'mono', w: 700, ls: 3, c: C.gris, a }); txt(ctx, 'CICLOS DE 20 min A 15 psi (LIBRAS POR PULGADA CUADRADA), UNO CADA 24 HORAS', 560, 184, { s: 16, f: 'mono', w: 700, ls: 2, c: C.oro, a: ss(e.tl, 1.4, 2.2) });
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(210,222,240,.6)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(580, base); ctx.lineTo(1760, base); ctx.stroke(); ctx.strokeStyle = 'rgba(210,222,240,.15)'; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.moveTo(580, base - 100 * H); ctx.lineTo(1760, base - 100 * H); ctx.stroke(); ctx.restore(); txt(ctx, '100 %', 1770, base - 100 * H + 7, { s: 18, f: 'mono', w: 700, c: C.gris, a });
  xs.forEach((x, i) => { const li = i === 0 ? 1 : 2, d = i === 1 ? 0.2 : i === 2 ? 2.2 : 0.2, ai = en(e, li, 0.7, d - 0.2), b = eo(e.tl, Lx(e, li) + d, Lx(e, li) + d + 1.6);
    txt(ctx, (i + 1) + (i ? ' ciclos' : ' ciclo'), x, base + 52, { s: 40, f: 'serif', w: 500, al: 'center', a: ai });
    [[-70, D[i][0], '#8fa0bd', 'HONGOS'], [70, D[i][1], i === 0 ? C.rojo : '#f2d64b', 'BACTERIAS']].forEach(([dx, v, c, n]) => { ctx.save(); ctx.globalAlpha = ai; ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(x + dx - 50, base - v * H * b, 100, Math.max(2, v * H * b), [8, 8, 0, 0]); ctx.fill(); ctx.restore(); txt(ctx, Math.round(v * b) + ' %', x + dx, base - v * H * b - 14, { s: dx > 0 ? 44 : 30, f: 'serif', w: 500, al: 'center', c: dx > 0 ? '#fff' : C.gris, a: ai }); txt(ctx, n, x + dx, base + 84, { s: 14, f: 'mono', w: 700, ls: 2, al: 'center', c, a: ai }); }); });
  const a3 = en(e, 3, 0.8); rico(ctx, 'Bacteria aislada: *Bacillus*', 580, 266, { s: 44, f: 'serif', w: 500, c: '#bfe4ff', a: a3 }); for (let i = 0; i < 4; i++) bacilo(ctx, 1150 + i * 96, 252 + Math.sin(e.T + i) * 5, 1.2, 0.2 * i - 0.3, a3, 1);
  fte(ctx, 'GUPTA, KUMAR, SINGH Y SUMMUNA 2020, INDIAN J. AGRIC. SCI. 90: 1000', ss(e.tl, 1, 2), 890);
};

/* ====== 06 · La cuenta ====== */
LUZ.cuenta = (ctx, e) => {
  noche(ctx, '#080a10', '#0c0f18'); const a = ss(e.tl, 0.1, 0.9), x0 = 560, X = (m) => x0 + m * 7.6, R = [['Frasco de grano', 340, 42, 60, 90, 4], ['Bolsa de sustrato', 580, 100, 120, 150, 5]];
  titulo(ctx, 'El ciclo es una suma', 960, 170, a, { s: 72 });
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(210,222,240,.22)'; ctx.lineWidth = 1.5; for (let m = 0; m <= 165; m += 15) { ctx.beginPath(); ctx.moveTo(X(m), 250); ctx.lineTo(X(m), 720); ctx.stroke(); } ctx.restore();
  [0, 30, 60, 90, 120, 150].forEach((m) => txt(ctx, m + ' min', X(m), 756, { s: 19, f: 'mono', w: 700, al: 'center', c: C.gris, a }));
  const b1 = eo(e.tl, Lx(e, 1) + 0.3, Lx(e, 1) + 2.4), b2 = eo(e.tl, Lx(e, 2) + 0.2, Lx(e, 2) + 1.2), b3 = eo(e.tl, Lx(e, 3) + 0.2, Lx(e, 3) + 1.4), a1 = en(e, 1, 0.6), a2 = en(e, 2, 0.6), a3 = en(e, 3, 0.6);
  R.forEach(([n, y, sub, r0, r1, li], i) => { txt(ctx, n, 110, y + 12, { s: 36, f: 'serif', w: 500, a });
    if (i) bolsaCorte(ctx, 496, y, 70, 60, 0.2 * b1 + 0.8 * b2, { a, motas: 14, n: 10 }); else frascoCorte(ctx, 496, y + 6, 44, 56, 0.2 * b1 + 0.8 * b2, { a, motas: 10, n: 10 });
    ctx.save(); ctx.globalAlpha = a1; const g = ctx.createLinearGradient(X(0), 0, X(sub), 0); g.addColorStop(0, calor(0.12)); g.addColorStop(1, calor(0.88)); ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(X(0), y - 34, Math.max(4, (X(sub) - X(0)) * b1), 68, [10, 0, 0, 10]); ctx.fill(); ctx.restore();
    ctx.save(); ctx.globalAlpha = a2; ctx.fillStyle = C.verde; ctx.fillRect(X(sub), y - 34, (X(sub + 15) - X(sub)) * b2, 68); ctx.restore(); txt(ctx, '15', X(sub + 7.5), y + 12, { s: 30, f: 'mono', w: 700, al: 'center', c: '#062a12', a: a2 * b2, sombra: false });
    const m0 = sub + 15, m1 = (r0 + r1) / 2; ctx.save(); ctx.globalAlpha = a3 * 0.9; ctx.fillStyle = 'rgba(244,194,90,.28)'; ctx.strokeStyle = C.oro; ctx.lineWidth = 2; ctx.setLineDash([8, 6]); ctx.beginPath(); ctx.roundRect(X(m0), y - 34, Math.max(2, (X(m1) - X(m0)) * b3), 68, [0, 10, 10, 0]); ctx.fill(); ctx.stroke(); ctx.restore();
    const ar = en(e, li, 0.7), br = eo(e.tl, Lx(e, li) + 0.2, Lx(e, li) + 1.2); ctx.save(); ctx.globalAlpha = ar; ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(X(r0), y + 56); ctx.lineTo(X(r0), y + 74); ctx.lineTo(mixn(X(r0), X(r1), br), y + 74); if (br > 0.98) ctx.lineTo(X(r1), y + 56); ctx.stroke(); ctx.restore();
    txt(ctx, i ? '2 a 2.5 horas' : '60 a 90 minutos', X((r0 + r1) / 2), y + 122, { s: 46, f: 'serif', w: 500, al: 'center', c: '#fff', a: ar }); });
  txt(ctx, '1 · EL CENTRO SUBE A 121 °C', X(0), 262, { s: 17, f: 'mono', w: 700, ls: 2, c: '#ff8a5a', a: a1 }); txt(ctx, 'BOLSAS MEDIDAS: DE 37 A 82 min', X(0), 284 + 420, { s: 15, f: 'mono', w: 700, ls: 2, c: '#ff8a5a', a: a1 * (1 - en(e, 5, 0.4)) });
  txt(ctx, '2 · LOS 15 min DE LA RECETA', X(60), 262, { s: 17, f: 'mono', w: 700, ls: 2, c: C.verde, a: a2 }); txt(ctx, '3 · MARGEN: ALTITUD, AIRE, ESPORAS', X(112), 262, { s: 17, f: 'mono', w: 700, ls: 2, c: C.oro, a: a3 });
  const a6 = en(e, 6, 0.8); chip(ctx, 'PUBLICADO · GRANO: 90 A 120 min', 130, 800, { c: '#f2d64b', s: 19, a: a6 }); chip(ctx, 'PUBLICADO · BOLSAS DE SUSTRATO: 90 A 160 min', 700, 800, { c: '#f58a2c', s: 19, a: en(e, 6, 0.8, 1.6) });
  fte(ctx, a6 > 0.5 ? 'CURR. AGRIC. RES. J. 13: 73 (2025) · J. FUNGI 12: 432 (2026)' : 'OZANNE ET AL. 1993 (SUBIDA DEL CENTRO) · LARGO DE LAS BARRAS: ILUSTRATIVO', ss(e.tl, 1, 2), 890); esquema(ctx, a1);
};
// Cinta testigo: franja beige con rayas diagonales que se oscurecen (k: 0 sin procesar, 1 ya cambió).
function cinta(ctx, x, y, w, h, k, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.roundRect(x, y, w, h, 6); ctx.fillStyle = '#e9dcc0'; ctx.fill(); ctx.save(); ctx.clip(); ctx.strokeStyle = mixc('#f3ecd9', '#2a2018', k); ctx.lineWidth = h * 0.16; for (let i = -2; i < w / (h * 0.7) + 2; i++) { ctx.beginPath(); ctx.moveTo(x + i * h * 0.7, y + h + 4); ctx.lineTo(x + i * h * 0.7 + h * 0.8, y - 4); ctx.stroke(); } ctx.restore(); ctx.strokeStyle = 'rgba(0,0,0,.3)'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
LUZ.cinta = (ctx, e) => {
  noche(ctx, '#080706', '#0f0c0a'); const T = e.T, a = ss(e.tl, 0.1, 0.9), k = ss(e.tl, Lx(e, 1) + 0.6, Lx(e, 1) + 2.6), f2 = 1 - en(e, 2, 0.6), f3 = 1 - en(e, 3, 0.6);
  // bolsa en corte con el centro frío y su cinta por fuera
  ctx.save(); ctx.globalAlpha = f3; bolsaCorte(ctx, 420, 520, 420, 360, 0.02 + 0.03 * k, { a, seed: 5, motas: 200, n: 30 }); cinta(ctx, 250, 300, 340, 46, k, a); ctx.restore();
  rotulo(ctx, 760, 250, 'Cinta testigo', 'INDICADOR QUÍMICO POR FUERA DEL PAQUETE', ss(e.tl, 0.6, 1.4) * f2, { s: 54, c: '#e9dcc0' });
  const a1 = en(e, 1, 0.7) * f2; guia(ctx, 590, 322, 770, 420, a1 * k, '#e9dcc0'); chip(ctx, 'CAMBIÓ DE COLOR: RECIBIÓ VAPOR CALIENTE', 780, 420, { c: C.verde, s: 20, a: a1 * k });
  guia(ctx, 420, 520, 770, 560, en(e, 1, 0.7, 3) * f2, '#8fb4ff'); chip(ctx, 'EL CENTRO: TODAVÍA FRÍO', 780, 560, { c: '#8fb4ff', s: 20, a: en(e, 1, 0.7, 3) * f2 });
  txt(ctx, 'avisa que el paquete pasó por el proceso', 780, 690, { s: 42, f: 'mano', w: 700, c: '#e9dcc0', a: en(e, 1, 0.7, 4.4) * f2 });
  // 21 indicadores químicos contra esporas de prueba
  const a2 = en(e, 2, 0.8) * f3; if (a2 > 0) { txt(ctx, '21 INDICADORES QUÍMICOS CONTRA ESPORAS DE PRUEBA · DE 116 A 132 °C', 780, 220, { s: 18, f: 'mono', w: 700, ls: 3, c: C.gris, a: a2 });
    for (let i = 0; i < 21; i++) { const x = 790 + (i % 7) * 142, y = 280 + Math.floor(i / 7) * 120, ok = i === 4 || i === 16, ai = a2 * ss(e.tl, Lx(e, 2) + 0.4 + i * 0.07, Lx(e, 2) + 0.9 + i * 0.07), r = en(e, 2, 0.6, 4.6); cinta(ctx, x, y, 110, 40, 1, ai * (ok ? 1 : 1 - 0.6 * r)); if (ok) { halo(ctx, x + 55, y + 20, 80, C.verde, 0.5 * r * a2); palomita(ctx, x + 55, y + 74, 16, r * a2); } }
    txt(ctx, 'solo 2 siguieron bien el tiempo y la temperatura', 790, 720, { s: 44, f: 'mano', w: 700, c: '#bfe4ff', a: en(e, 2, 0.8, 5.2) * f3 }); }
  // indicador biológico
  const a3 = en(e, 3, 0.8); if (a3 > 0) { ampolleta(ctx, 330, 520, 5, a3); halo(ctx, 330, 520, 200, '#bfe4ff', 0.25 * a3); const x = 900, y = 500, r = 250; guia(ctx, 370, 560, x - r + 14, y, a3, '#bfe4ff');
    ctx.save(); ctx.globalAlpha = a3; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = '#0c1826'; ctx.fill(); ctx.save(); ctx.clip(); const R = rng(31); for (let i = 0; i < 20; i++) { const px = x + (R() - 0.5) * r * 1.8, py = y + (R() - 0.5) * r * 1.8, an = R() * TAU + Math.sin(T * 0.3 + i) * 0.1; if (R() < 0.5) bacilo(ctx, px, py, 1.9, an, 1, 1); else esporita(ctx, px, py, 1.9, an, 1, '#eaf6ff', 0.45); } ctx.restore(); ctx.strokeStyle = 'rgba(220,235,255,.8)'; ctx.lineWidth = 6; ctx.stroke(); ctx.restore();
    rotulo(ctx, 1210, 330, 'Indicador biológico', 'ESPORAS VIVAS EN EL CENTRO DE LA CARGA', a3, { c: '#bfe4ff', s: 50 }); rico(ctx, '*Geobacillus stearothermophilus*', 1214, 470, { s: 34, f: 'serif', w: 500, a: en(e, 3, 0.8, 2) }); txt(ctx, 'BACTERIA TERMÓFILA: CRECE EN CALIENTE', 1216, 508, { s: 16, f: 'mono', w: 700, ls: 2, c: C.oro, a: en(e, 3, 0.8, 4) }); }
  fte(ctx, a3 > 0.5 ? 'RUTALA, JONES Y WEBER 1996, INFECT. CONTROL HOSP. EPIDEMIOL. 17: 423' : 'LEE, MONTVILLE Y SINSKEY 1979, APPL. ENVIRON. MICROBIOL. 37: 1113', ss(e.tl, 1.5, 2.4), 890); esquema(ctx, a, 'ESQUEMA · SIN ESCALA');
};

/* ====== 07 · Cierre ====== */
LUZ.cierre2 = (ctx, e) => {
  const T = e.T, L2 = Lx(e, 2), L3 = Lx(e, 3), rx = en(e, 2, 2), Fo = 0.01 + 0.2 * ss(e.tl, L2, L3) + 0.9 * ss(e.tl, L3, L3 + 3), tc = tempC(0, Fo), llego = ss(e.tl, L3 + 2.6, L3 + 3.2), tfin = e.dur - 1.6;
  const fin = cam(ctx, 1.0 + 0.06 * ss(e.tl, 0, 8), 760, 520); escenaOlla2(ctx, e, { rx, Fo }); fin();
  const a1 = en(e, 1, 0.7) * (1 - en(e, 2, 0.6)); chip(ctx, 'LA PESA SE MUEVE', 1130, 300, { c: C.oro, s: 22, a: a1 }); chip(ctx, 'EL MANÓMETRO MARCA 15 psi', 1130, 370, { c: C.oro, s: 22, a: en(e, 1, 0.7, 1.4) * (1 - en(e, 2, 0.6)) });
  const a2 = en(e, 2, 0.8, 1.6); txt(ctx, 'CENTRO DE LA BOLSA', 1180, 200, { s: 20, f: 'mono', w: 700, ls: 5, c: '#8fb4ff', a: a2 }); txt(ctx, Math.round(tc) + ' °C', 1180, 290, { s: 96, f: 'serif', w: 500, c: mixc('#8fb4ff', '#ff8a7a', ganado(0, Fo)), a: a2 });
  txt(ctx, 'RELOJ DEL CENTRO', 1560, 200, { s: 20, f: 'mono', w: 700, ls: 5, c: llego > 0.5 ? C.verde : '#8fb4ff', a: a2 }); reloj7(ctx, mmss(15 * pr(e.tl, L3 + 3.2, tfin)), 1560, 284, { a: a2, c: llego > 0.5 ? C.verde : '#8fb4ff' });
  chip(ctx, 'AHORA SÍ CUENTAN LOS 15 MINUTOS', 1180, 380, { c: C.verde, s: 20, a: llego });
  const a4 = en(e, 2, 0.9, 2.4), x = 1500, y = 610, r = 180; if (a4 > 0) { guia(ctx, 545, 626, x - r + 10, y, a4, '#bfe4ff'); ctx.save(); ctx.globalAlpha = a4; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = '#0c1826'; ctx.fill(); ctx.restore();
    const vivo = 1 - ss(e.tl, tfin, tfin + 1); [[-70, -40, 0.3], [60, -60, -0.4], [-20, 60, 0.9], [90, 50, 0.1]].forEach(([dx, dy, r0], i) => { ctx.save(); ctx.translate(x + dx + Math.sin(T * 0.7 + i) * 4, y + dy + Math.cos(T * 0.6 + i) * 4); ctx.rotate(r0); endospora(ctx, 0, 0, 0.38, { a: a4, vivo, halo: vivo > 0.3 ? 1 : 0 }); ctx.restore(); });
    ctx.save(); ctx.globalAlpha = a4; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.strokeStyle = 'rgba(220,235,255,.8)'; ctx.lineWidth = 5; ctx.stroke(); ctx.restore();
    txt(ctx, vivo > 0.5 ? 'ENDOSPORAS EN REPOSO' : 'ENDOSPORAS INACTIVADAS', x, y + r + 40, { s: 19, f: 'mono', w: 700, ls: 4, al: 'center', c: vivo > 0.5 ? '#bfe4ff' : C.verde, a: a4 }); }
  esquema(ctx, rx);
};
