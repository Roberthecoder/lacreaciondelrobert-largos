// cine-luz-b.jsx — Documental 006 «¿Hay algo que no se pueda comer un hongo?», capítulos 5 a 9
// (radiación, la bolsa del súper, piedra-vidrio-oro, el sartén y la respuesta).
const { TAU, cl, pr, ss, eo, mixn, rng, rgba, mixc, LUZC, FU, halo, noche, estrellas, polvo, cam, oscurece, txt, rico, chip, rotulo, guia, titulo, sello, tache, flecha,
  red, pintaRed, petri, frasco, matraz, termometro, botella, veredicto } = window.LZK;
const { en, esquema, C, tag3, lab, ficha, bez, hifaTubo, enzima, chispa, viaje, hexa, malla, fibra, co2, burbujas, cadena, mesaFondo, sombra, seta, OBJ, ORDEN, MX, pelusa, mesa, vObjeto, cultivo } = window.LZA;
const LUZ = window.LUZ;
// Veredicto que empieza en la frase i del bloque (y su renglón chico en la frase i + 1).
const veredictoEn = (ctx, e, i, ...r) => { const t0 = e.L(i) ?? 0; veredicto(ctx, { ...e, tl: e.tl - t0, L: (k) => (e.L(i + k) == null ? null : e.L(i + k) - t0) }, ...r); };

/* ====== 05 · Radiación ====== */
// Colonia de moho sobre una pared: mancha con borde de hilos. oscura = con melanina.
function colonia(ctx, x, y, r, g, oscura = true, seed = 1) {
  if (g <= 0) return; const R = rng(seed), c = oscura ? '#0a0908' : '#9aa08a'; ctx.save(); ctx.fillStyle = c; ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.lineCap = 'round';
  ctx.beginPath(); for (let i = 0; i <= 24; i++) { const an = i / 24 * TAU, q = r * g * (0.72 + 0.2 * Math.sin(i * 2.7 + seed)); i ? ctx.lineTo(x + Math.cos(an) * q, y + Math.sin(an) * q) : ctx.moveTo(x + Math.cos(an) * q, y + Math.sin(an) * q); } ctx.fill();
  ctx.beginPath(); for (let i = 0; i < 46; i++) { const an = R() * TAU, q0 = r * g * 0.6, q1 = r * g * (0.95 + R() * 0.35); ctx.moveTo(x + Math.cos(an) * q0, y + Math.sin(an) * q0); ctx.lineTo(x + Math.cos(an + (R() - 0.5) * 0.3) * q1, y + Math.sin(an + (R() - 0.5) * 0.3) * q1); } ctx.stroke();
  if (oscura) { ctx.fillStyle = 'rgba(70,50,30,.5)'; ctx.beginPath(); ctx.arc(x - r * g * 0.2, y - r * g * 0.2, r * g * 0.25, 0, TAU); ctx.fill(); } ctx.restore();
}
const trebol = (ctx, x, y, r, a) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#F4C25A'; for (let i = 0; i < 3; i++) { const an = -Math.PI / 2 + i * TAU / 3; ctx.beginPath(); ctx.moveTo(x + Math.cos(an - 0.5) * r * 0.3, y + Math.sin(an - 0.5) * r * 0.3); ctx.arc(x, y, r, an - 0.5, an + 0.5); ctx.arc(x, y, r * 0.3, an + 0.5, an - 0.5, true); ctx.fill(); } ctx.beginPath(); ctx.arc(x, y, r * 0.17, 0, TAU); ctx.fill(); ctx.restore(); };
// Pared de concreto dentro del edificio que cubre el reactor: más contaminación a la derecha.
function paredReactor(ctx, e, g, osc = 1) {
  const T = e.T, gr = ctx.createLinearGradient(0, 0, 1920, 0); gr.addColorStop(0, '#2a2e2c'); gr.addColorStop(1, '#3a3026'); ctx.fillStyle = gr; ctx.fillRect(0, 0, 1920, 1080);
  const r = rng(61); ctx.strokeStyle = 'rgba(0,0,0,.35)'; ctx.lineWidth = 3; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(0, i * 216 + r() * 20); ctx.lineTo(1920, i * 216 + r() * 20); ctx.stroke(); } for (let i = 1; i < 6; i++) { ctx.beginPath(); ctx.moveTo(i * 330 + r() * 30, 0); ctx.lineTo(i * 330 + r() * 30, 1080); ctx.stroke(); }
  ctx.fillStyle = 'rgba(0,0,0,.14)'; for (let i = 0; i < 160; i++) { ctx.beginPath(); ctx.arc(r() * 1920, r() * 1080, 2 + r() * 7, 0, TAU); ctx.fill(); }
  ctx.fillStyle = '#1b1d1f'; ctx.fillRect(0, 96, 1920, 40); ctx.fillStyle = '#34383c'; ctx.fillRect(0, 100, 1920, 10);
  halo(ctx, 1700, 560, 1100, '#FF7A2A', 0.16 + 0.03 * Math.sin(T * 1.3)); trebol(ctx, 1730, 250, 70, 0.75);
  const R = rng(5); for (let i = 0; i < 26; i++) { const x = 140 + R() * 1640, y = 200 + R() * 620, rr = 26 + R() * 46, osc1 = R() < 0.15 + 0.85 * (x / 1920) * osc; colonia(ctx, x, y, rr * (osc1 ? 1 + 0.5 * (x / 1920) : 0.8), ss(g, i * 0.025, 0.4 + i * 0.025), osc1, i + 3); }
  oscurece(ctx, 0.28);
}
LUZ.chernobil = (ctx, e) => {
  const un = cam(ctx, 1.02 + 0.05 * ss(e.tl, 0, e.dur), 1000, 540); paredReactor(ctx, e, eo(e.tl, 0, 9), ss(e.tl, (e.L(2) ?? 10) - 1, (e.L(2) ?? 10) + 2)); un();
  rotulo(ctx, 150, 250, 'Chernóbil', 'PARED DENTRO DEL EDIFICIO DEL REACTOR · ESQUEMA', ss(e.tl, 0.3, 1.1), { c: C.oro });
  const a1 = en(e, 1, 0.8); ficha(ctx, 150, 330, 2000, '*Mycological Research*', 'ZHDANOVA ET AL.', a1); txt(ctx, '37', 190, 640, { s: 200, f: 'serif', w: 500, c: C.oro, a: a1 }); txt(ctx, 'especies de hongos', 450, 600, { s: 46, f: 'serif', a: a1 }); txt(ctx, 'en 19 géneros', 450, 648, { s: 30, f: 'mono', w: 700, c: '#c9d2e3', a: a1 });
  const a2 = en(e, 2, 0.8); flecha(ctx, 760, 800, 1560, 800, a2, '#FF9A5A', 4); chip(ctx, 'MÁS CONTAMINACIÓN → MÁS HONGOS OSCUROS (MELANINA)', 760, 850, { c: '#FF9A5A', a: a2, s: 20 });
};
LUZ.dadachova = (ctx, e) => {
  noche(ctx, '#08070a', '#0e0b0c'); const T = e.T, t1 = e.L(1) ?? 99, t2 = e.L(2) ?? 99, sale = 1 - ss(e.tl, t2 - 0.2, t2 + 0.6), k = ss(e.tl, t1 - 1.5, t1 + 2.5);
  if (sale > 0) { ctx.save(); ctx.globalAlpha = sale; const cajas = [[520, 'SIN RADIACIÓN EXTRA', 22, '#c9d2e3'], [1300, '≈ 500 VECES LA RADIACIÓN DE FONDO', 22 + Math.round(34 * k), '#FF9A5A']];
    cajas.forEach(([x, s, n, c], j) => { petri(ctx, x, 520, 250); const R = rng(8 + j * 3); for (let i = 0; i < n; i++) { const an = R() * TAU, d = Math.sqrt(R()) * 215, rr = 6 + R() * 8; ctx.fillStyle = '#3a2a1c'; ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, 520 + Math.sin(an) * d, rr * ss(e.tl, 0.4 + i * 0.05, 1.4 + i * 0.05), 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(201,163,122,.9)'; ctx.lineWidth = 2; ctx.stroke(); }
      chip(ctx, s, x, 820, { c, al: 'center', a: sale * ss(e.tl, 0.6, 1.3), s: 19 }); });
    // rayos sobre la caja de la derecha
    ctx.strokeStyle = 'rgba(255,154,90,.7)'; ctx.lineWidth = 3; for (let i = 0; i < 6; i++) { const x = 1120 + i * 72, f = (T * 0.8 + i * 0.3) % 1; ctx.beginPath(); for (let y = 150; y < 150 + 110; y += 6) { const xx = x + Math.sin((y + f * 80) * 0.14) * 9; y === 150 ? ctx.moveTo(xx, y) : ctx.lineTo(xx, y); } ctx.stroke(); }
    ctx.restore(); txt(ctx, 'crecieron más rápido', 1300, 880 - 6, { s: 40, f: 'mano', al: 'center', c: C.verde, a: sale * ss(e.tl, t1, t1 + 0.8) }); }
  ficha(ctx, 150, 130, 2007, '*PLoS ONE*', 'DADACHOVA ET AL. · NUEVA YORK', ss(e.tl, 0.3, 1.1) * sale);
  rotulo(ctx, 720, 180, 'Hongos con melanina', 'CÉLULAS OSCURAS · ESQUEMA', ss(e.tl, 0.8, 1.6) * sale, { c: '#c9a37a', s: 40 });
  // la idea: radiosíntesis
  const a2 = ss(e.tl, t2 + 0.3, t2 + 1.1); if (a2 > 0) { titulo(ctx, '«Radiosíntesis»', 960, 300, a2, { s: 110 }); sello(ctx, 'HIPÓTESIS', 960, 410, ss(e.tl, t2 + 1.4, t2 + 2), C.oro, 0.03, 40);
    // planta + luz  /  hongo + radiación ?
    const y = 640; halo(ctx, 430, y - 60, 150, '#FFE27A', 0.8 * a2); flecha(ctx, 520, y - 40, 640, y, a2, '#FFE27A', 4); ctx.save(); ctx.globalAlpha = a2; ctx.fillStyle = '#3f9a45'; ctx.beginPath(); ctx.ellipse(730, y + 10, 70, 34, -0.5, 0, TAU); ctx.fill(); ctx.strokeStyle = '#2a6a30'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(672, y + 44); ctx.lineTo(790, y - 26); ctx.stroke(); ctx.restore(); txt(ctx, 'LUZ → PLANTA', 600, y + 130, { s: 22, f: 'mono', w: 700, ls: 4, al: 'center', c: '#bfeac0', a: a2 });
    trebol(ctx, 1150, y - 40, 56, a2); flecha(ctx, 1230, y - 30, 1350, y, a2, '#FF9A5A', 4); ctx.save(); ctx.globalAlpha = a2; ctx.fillStyle = '#3a3026'; ctx.beginPath(); ctx.arc(1440, y + 10, 96, 0, TAU); ctx.fill(); ctx.restore(); colonia(ctx, 1440, y + 10, 70, a2, true, 9); txt(ctx, 'RADIACIÓN → HONGO', 1320, y + 130, { s: 22, f: 'mono', w: 700, ls: 4, al: 'center', c: '#FF9A5A', a: a2 }); txt(ctx, '?', 1580, y + 40, { s: 150, f: 'serif', c: C.oro, a: ss(e.tl, t2 + 1.6, t2 + 2.4) }); }
};
// Estación Espacial Internacional (esquema muy simple): viga con paneles solares y módulos.
function estacion(ctx, x, y, s, T) { ctx.save(); ctx.translate(x, y); ctx.rotate(-0.12 + Math.sin(T * 0.2) * 0.02); ctx.scale(s, s); ctx.fillStyle = '#9aa3b2'; ctx.fillRect(-260, -5, 520, 10);
  for (const d of [-1, 1]) for (let k = 0; k < 2; k++) { const px = d * (150 + k * 70); ctx.fillStyle = '#2a4a8a'; ctx.fillRect(px - 26, -110, 52, 100); ctx.fillRect(px - 26, 10, 52, 100); ctx.strokeStyle = '#6a8ad0'; ctx.lineWidth = 1.5; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(px - 26, -110 + i * 20); ctx.lineTo(px + 26, -110 + i * 20); ctx.moveTo(px - 26, 10 + i * 20); ctx.lineTo(px + 26, 10 + i * 20); ctx.stroke(); } }
  ctx.fillStyle = '#d9dee8'; ctx.beginPath(); ctx.roundRect(-28, -80, 56, 160, 16); ctx.fill(); ctx.fillStyle = '#b9c0cc'; ctx.beginPath(); ctx.roundRect(-70, -18, 140, 36, 12); ctx.fill(); ctx.restore(); }
LUZ.iss = (ctx, e) => {
  noche(ctx, '#03050b', '#070a14'); estrellas(ctx, 140, 4, e.T, 1, 1080); const T = e.T, t = (i) => e.L(i) ?? 99;
  estacion(ctx, 360 + e.tl * 3, 430, 0.9, T); halo(ctx, 1900, 1100, 900, '#3a7ad0', 0.3);
  ficha(ctx, 150, 130, 2022, '*Front. Microbiol.*', 'AVERESCH, SHUNK Y KERN', ss(e.tl, t(1), t(1) + 0.8));
  const a1 = ss(e.tl, t(1) + 0.6, t(1) + 1.4) * (1 - ss(e.tl, t(2) - 0.4, t(2) + 0.3)); titulo(ctx, '«Radiosíntesis»', 1240, 430, a1, { s: 96 }); sello(ctx, 'NO DEMOSTRADA', 1240, 560, ss(e.tl, t(1) + 3, t(1) + 3.6) * a1, C.rojo, -0.05, 50);
  // la caja de cultivo partida a la mitad, con un sensor debajo de cada lado
  const a2 = ss(e.tl, t(2), t(2) + 0.8); if (a2 > 0) { const x = 1120, y = 400, r = 230; ctx.save(); ctx.globalAlpha = a2; petri(ctx, x, y, r); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r * 0.94, Math.PI / 2, Math.PI * 1.5); ctx.clip(); ctx.fillStyle = '#12100c'; ctx.fillRect(x - r, y - r, r, r * 2); ctx.translate(x - 90, y); pintaRed(ctx, red('iss', { seed: 5, radio: 220, brotes: 9, max: 3000 }), eo(e.tl, t(2), t(2) + 5), '#5a4a38', {}); ctx.restore();
    ctx.strokeStyle = 'rgba(220,235,250,.6)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x, y + r); ctx.stroke();
    [[x - 120, '147', C.verde, 'BAJO EL HONGO'], [x + 120, '151', '#c9d2e3', 'SIN HONGO']].forEach(([sx, n, c, s]) => { ctx.fillStyle = '#12161e'; ctx.strokeStyle = c; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(sx - 95, y + r + 30, 190, 104, 10); ctx.fill(); ctx.stroke(); ctx.fillStyle = c; ctx.font = `700 60px ${FU.mono}`; ctx.textAlign = 'center'; ctx.fillText(n, sx, y + r + 96); ctx.font = `700 15px ${FU.mono}`; ctx.fillText('CONTEOS POR MINUTO', sx, y + r + 122); ctx.font = `700 17px ${FU.mono}`; ctx.fillText(s, sx, y + r + 162); });
    ctx.restore(); rotulo(ctx, 1420, 300, '*Cladosporium*', '*sphaerospermum*', a2, { c: '#c9a37a', s: 40 }); chip(ctx, 'CULTIVADO EN ÓRBITA', 1440, 400, { c: '#c9a37a', a: a2, s: 18 }); }
  const a3 = ss(e.tl, t(3), t(3) + 0.8); if (a3 > 0) { chip(ctx, 'CRECIÓ 1.21 ± 0.37 VECES MÁS RÁPIDO', 150, 640, { c: C.oro, a: a3, s: 22 }); flecha(ctx, 330, 670, 250, 740, ss(e.tl, t(3) + 1.5, t(3) + 2.1), '#FF9A5A'); flecha(ctx, 470, 670, 560, 740, ss(e.tl, t(3) + 2.2, t(3) + 2.8), C.agua);
    chip(ctx, '¿RADIACIÓN?', 150, 780, { c: '#FF9A5A', a: ss(e.tl, t(3) + 1.6, t(3) + 2.2), s: 24 }); chip(ctx, '¿FALTA DE GRAVEDAD?', 460, 780, { c: C.agua, a: ss(e.tl, t(3) + 2.3, t(3) + 2.9), s: 24 }); }
  esquema(ctx, a2, 60, 856);
};
LUZ.v_rad = (ctx, e) => { paredReactor(ctx, e, 1, 1); oscurece(ctx, 0.45); veredicto(ctx, e, 2, 'Sin pruebas de\nque se alimente\nde radiación', 'Crecer ahí no es comérsela', C.oro); };

/* ====== 06 · La bolsa del súper ====== */
LUZ.titular = (ctx, e) => {
  noche(ctx, '#080a0e', '#0c1016'); halo(ctx, 430, 480, 700, '#9fd8ff', 0.1); const T = e.T;
  sombra(ctx, 400, 850, 280); OBJ.bolsa(ctx, 400, 850, 3.4 + 0.1 * ss(e.tl, 0, e.dur), 0, T); rotulo(ctx, 150, 220, 'Bolsa del súper', 'OBJETO 4 DE 8', ss(e.tl, 0.3, 1.1), { c: C.oro });
  const a = en(e, 1, 0.6); if (a > 0) { ctx.save(); ctx.globalAlpha = a; ctx.translate(1110, 470); ctx.rotate(-0.04 + (1 - a) * 0.2); ctx.scale(0.8 + 0.2 * a, 0.8 + 0.2 * a); ctx.fillStyle = '#ece6d8'; ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.fillRect(-340, -220, 680, 440); ctx.shadowBlur = 0;
    ctx.fillStyle = '#1a1a1e'; ctx.fillRect(-300, -180, 600, 6); ctx.font = `700 22px ${FU.mono}`; ctx.textAlign = 'center'; ctx.fillText('· NOTICIAS ·', 0, -140); ctx.fillRect(-300, -120, 600, 3);
    ctx.font = `400 92px 'Anton', ${FU.sans}`; ctx.fillText('EL HONGO QUE', 0, -20); ctx.fillText('COME PLÁSTICO', 0, 80); ctx.fillStyle = 'rgba(26,26,30,.35)'; for (let i = 0; i < 4; i++) ctx.fillRect(-300, 120 + i * 22, i === 3 ? 380 : 600, 9); ctx.restore();
    chip(ctx, '¿QUÉ PLÁSTICO?', 800, 760, { c: C.oro, a: ss(e.tl, e.L(1) + 1.6, e.L(1) + 2.2), s: 24 }); chip(ctx, '¿EN QUÉ CONDICIONES?', 1080, 760, { c: C.agua, a: ss(e.tl, e.L(1) + 2.2, e.L(1) + 2.8), s: 24 }); }
};
// Conidio de Pestalotiopsis: en huso, de cinco células (las tres de en medio oscuras), con apéndices en la punta y uno en la base.
function conidio(ctx, x, y, s, rot, a = 1) { a = cl(a); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.strokeStyle = 'rgba(230,235,245,.85)'; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.beginPath(); for (const d of [-0.5, 0, 0.5]) { ctx.moveTo(60, 0); ctx.quadraticCurveTo(84, d * 30, 108, d * 60); } ctx.moveTo(-60, 0); ctx.lineTo(-84, 6); ctx.stroke();
  const cel = ['rgba(220,228,240,.5)', '#7a5a32', '#6a4a26', '#7a5a32', 'rgba(220,228,240,.5)']; ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 62, 20, 0, 0, TAU); ctx.clip(); cel.forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(-62 + i * 24.8, -22, 24.8, 44); }); ctx.strokeStyle = '#1a140c'; ctx.lineWidth = 2.5; for (let i = 1; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-62 + i * 24.8, -22); ctx.lineTo(-62 + i * 24.8, 22); ctx.stroke(); } ctx.restore();
  ctx.strokeStyle = 'rgba(230,235,245,.8)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(0, 0, 62, 20, 0, 0, TAU); ctx.stroke(); ctx.restore(); }
function tubo(ctx, x, y, w, h, color, nivel = 0.8) { ctx.save(); ctx.beginPath(); ctx.roundRect(x - w / 2, y - h, w, h, [6, 6, w / 2, w / 2]); ctx.fillStyle = 'rgba(120,150,190,.06)'; ctx.fill(); ctx.save(); ctx.clip(); ctx.fillStyle = color; ctx.fillRect(x - w / 2, y - h * nivel, w, h); ctx.restore(); ctx.strokeStyle = 'rgba(210,225,245,.6)'; ctx.lineWidth = 3; ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - w * 0.3, y - h * 0.9); ctx.lineTo(x - w * 0.3, y - h * 0.25); ctx.stroke(); ctx.restore(); }
LUZ.pestalo = (ctx, e) => {
  noche(ctx, '#060b09', '#0a110e'); const T = e.T, t1 = e.L(1) ?? 99, t2 = e.L(2) ?? 99;
  rotulo(ctx, 150, 240, '*Pestalotiopsis microspora*', 'AISLADO DE PLANTAS · AMAZONÍA DE ECUADOR', ss(e.tl, 0.3, 1.1), { c: '#bfeac0', s: 42 });
  [[330, 470, 1.25, -0.3], [560, 610, 1.0, 0.4], [270, 700, 0.85, 0.1]].forEach(([x, y, s, r], i) => conidio(ctx, x + Math.sin(T * 0.5 + i) * 10, y + Math.cos(T * 0.4 + i * 2) * 8, s, r + Math.sin(T * 0.3 + i) * 0.08, ss(e.tl, 0.5 + i * 0.3, 1.3 + i * 0.3)));
  chip(ctx, 'ESPORAS (CONIDIOS) DE CINCO CÉLULAS · ESQUEMA', 150, 840, { c: '#8fa0bd', s: 18, a: ss(e.tl, 1.4, 2.2) * 0.9 });
  ficha(ctx, 1330, 120, 2011, '*Appl. Environ. Microbiol.*', 'RUSSELL ET AL. · YALE', ss(e.tl, t1 - 0.4, t1 + 0.4));
  // dos tubos con poliuretano suspendido: sin hongo y con hongo
  const a1 = ss(e.tl, t1, t1 + 0.8); if (a1 > 0) { const k = ss(e.tl, t1 + 1, t1 + 6), dia = Math.round(5 * k); ctx.save(); ctx.globalAlpha = a1;
    tubo(ctx, 900, 800, 110, 470, 'rgba(240,240,236,.92)'); tubo(ctx, 1130, 800, 110, 470, `rgba(240,240,236,${mixn(0.92, 0.46, k)})`);
    ctx.save(); ctx.beginPath(); ctx.rect(1075, 330, 110, 470); ctx.clip(); ctx.translate(1130, 440); ctx.scale(0.5, 0.9); pintaRed(ctx, red('pest', { seed: 8, radio: 150, brotes: 7, max: 1400, sesgo: Math.PI / 2, abre: Math.PI, ang0: Math.PI / 2 }), 0.3 + 0.7 * k, '#8a7a5a', {}); ctx.restore(); ctx.restore();
    txt(ctx, 'SIN HONGO', 900, 846, { s: 19, f: 'mono', w: 700, ls: 2, al: 'center', c: '#c9d2e3', a: a1 }); txt(ctx, 'CON HONGO', 1130, 846, { s: 19, f: 'mono', w: 700, ls: 2, al: 'center', c: '#bfeac0', a: a1 });
    txt(ctx, 'DÍA ' + dia, 1300, 480, { s: 70, f: 'serif', w: 500, c: C.oro, a: a1 }); chip(ctx, 'TURBIDEZ: A LA MITAD', 1300, 550, { c: C.oro, a: ss(k, 0.8, 1), s: 22 }); lab(ctx, 1300, 620, a1, 'EN UN TUBO', 'left'); }
  const a2 = ss(e.tl, t2, t2 + 0.8); chip(ctx, 'POLIURETANO EN AGUA', 1300, 700, { c: '#f1ecdf', a: a2, s: 20 });
  if (a2 > 0) { ctx.save(); ctx.globalAlpha = a2; OBJ.bolsa(ctx, 1740, 880, 1.0, 0, T); ctx.restore(); tache(ctx, 1740, 810, 84, ss(e.tl, t2 + 1.2, t2 + 2)); chip(ctx, 'NO UNA BOLSA', 1300, 770, { c: C.rojo, a: ss(e.tl, t2 + 1.2, t2 + 1.9), s: 20 }); }
};
// Cadena de PET (esquema): anillos unidos por enlaces éster (marcados), que son los que corta la enzima.
function petCad(ctx, x0, y, n, corte, a = 1, T = 0) {
  const paso = 250, E = []; ctx.save(); ctx.globalAlpha *= a;
  for (let i = 0; i < n; i++) { const k = corte ? cl(corte(i)) : 0, x = x0 + i * paso, yy = y + Math.sin(i * 2.3) * 26 * k + (i % 2 ? 1 : -1) * 20 * k, sep = 16 * k;
    hexa(ctx, x, yy, 34, '#9ad0ff', a, Math.PI / 6, 4);
    if (i < n - 1) { const k2 = corte ? cl(corte(i + 1)) : 0, y2 = y + Math.sin((i + 1) * 2.3) * 26 * k2 + ((i + 1) % 2 ? 1 : -1) * 20 * k2; const xa = x + 38, xb = x + paso - 38;
      // éster · CH2–CH2 · éster
      const seg = [[xa, xa + 44, C.rad], [xa + 60 + sep, xb - 60 - sep, '#aab6cc'], [xb - 44, xb, C.rad]]; seg.forEach(([p, q, c], j) => { const ya = j === 0 ? yy : j === 2 ? y2 : (yy + y2) / 2 + (k + k2) * 9; ctx.strokeStyle = c; ctx.lineWidth = j === 1 ? 5 : 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(p, ya); ctx.lineTo(q, ya); ctx.stroke(); if (j !== 1) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc((p + q) / 2, ya - 17, 9, 0, TAU); ctx.fill(); ctx.fillStyle = '#14100a'; ctx.font = `700 12px ${FU.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('O', (p + q) / 2, ya - 16); } });
      E.push([xa + 52, yy], [xb - 52, y2]); } }
  ctx.restore(); return E;
}
// Botella de PET transparente con tapa azul (esquema).
function botellaPET(ctx, x, y, s, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); const P = () => { ctx.beginPath(); ctx.moveTo(-16, -250); ctx.lineTo(16, -250); ctx.lineTo(18, -216); ctx.quadraticCurveTo(52, -190, 52, -150); ctx.lineTo(52, -14); ctx.quadraticCurveTo(52, 0, 38, 0); ctx.lineTo(-38, 0); ctx.quadraticCurveTo(-52, 0, -52, -14); ctx.lineTo(-52, -150); ctx.quadraticCurveTo(-52, -190, -18, -216); ctx.closePath(); };
  P(); ctx.fillStyle = 'rgba(150,200,235,.16)'; ctx.fill(); ctx.strokeStyle = 'rgba(210,232,250,.8)'; ctx.lineWidth = 3; ctx.stroke(); ctx.strokeStyle = 'rgba(210,232,250,.4)'; ctx.lineWidth = 2; for (const yy of [-150, -110, -100, -40]) { ctx.beginPath(); ctx.moveTo(-52, yy); ctx.lineTo(52, yy); ctx.stroke(); }
  ctx.fillStyle = '#2f6fd0'; ctx.beginPath(); ctx.roundRect(-19, -272, 38, 24, 4); ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-36, -170); ctx.lineTo(-36, -30); ctx.stroke(); ctx.restore(); }
LUZ.pet = (ctx, e) => {
  noche(ctx, '#06090d', '#0a0f15'); const T = e.T, t = (i) => e.L(i) ?? 99;
  botellaPET(ctx, 200, 850, 1.5, 0.95); rotulo(ctx, 330, 240, 'PET', 'TEREFTALATO DE POLIETILENO · ESQUEMA', ss(e.tl, 0.3, 1.1), { c: '#9ad0ff' });
  const kc = (i) => ss(e.tl, t(1) + 1.4 + i * 0.5, t(1) + 2.2 + i * 0.5), E = petCad(ctx, 420, 400, 6, kc, ss(e.tl, 0.4, 1.4), T);
  chip(ctx, 'ENLACE ÉSTER', 600, 320, { c: C.rad, al: 'center', a: ss(e.tl, 1.6, 2.3), s: 18 });
  if (e.tl > t(1)) E.forEach(([x, y], i) => { const u = pr(e.tl, t(1) + 0.2 + i * 0.25, t(1) + 1.6 + i * 0.25); enzima(ctx, mixn(x, x, u), mixn(140, y - 2, ss(u, 0, 1)), 15, Math.PI / 2, C.enz, T, Math.min(1, u * 5) * (1 - ss(e.tl, t(2) + 4, t(2) + 5) * 0.5)); });
  const a1 = ss(e.tl, t(1), t(1) + 0.8); rotulo(ctx, 1330, 240, 'Enzima purificada', 'CUTINASA DE *Humicola insolens*', a1, { c: C.enz, s: 42 }); ficha(ctx, 1330, 90, 2009, '*Macromolecules*', null, a1);
  // dos películas de PET: poco cristalina y más cristalina
  const pel = (y, k, s1, s2, c, a) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(200,220,245,.4)'; ctx.lineWidth = 2; ctx.setLineDash([6, 6]); ctx.strokeRect(430, y, 520, 84); ctx.setLineDash([]); ctx.fillStyle = rgba(c, 0.55); ctx.fillRect(430, y, 520 * (1 - k), 84); ctx.restore(); txt(ctx, s1, 980, y + 36, { s: 22, f: 'mono', w: 700, ls: 2, c, a }); txt(ctx, s2, 980, y + 70, { s: 30, f: 'serif', w: 500, a }); };
  const k1 = 0.97 * ss(e.tl, t(1) + 1.5, t(1) + 6.5); pel(560, k1, 'PELÍCULA DE PET · 7 % CRISTALINA', k1 > 0.96 ? 'perdió 97 % de su peso en 96 horas' : 'pierde peso: ' + Math.round(k1 * 100) + ' %', '#9ad0ff', a1);
  const a3 = ss(e.tl, t(3), t(3) + 0.8); pel(700, 0.08 * ss(e.tl, t(3) + 0.5, t(3) + 4), 'PELÍCULA DE PET · 35 % CRISTALINA', 'la enzima arrancó ≈ 10 veces más lento', '#6a8ab0', a3);
  const a2 = ss(e.tl, t(2), t(2) + 0.8); termometro(ctx, 1560, 830, 250, 0.2 + 0.6 * ss(e.tl, t(2), t(2) + 2), C.rojo, a2); txt(ctx, '70 °C', 1600, 640, { s: 64, f: 'serif', w: 500, c: C.rojo, a: a2 }); chip(ctx, 'SIN HONGO VIVO', 1600, 700, { c: C.oro, a: a2, s: 20 }); lab(ctx, 1600, 760, a2, 'EN LABORATORIO', 'left');
};
LUZ.polietileno = (ctx, e) => {
  noche(ctx, '#07090d', '#0b0e14'); const T = e.T, t1 = e.L(1) ?? 99;
  ctx.save(); ctx.globalAlpha = 0.9; OBJ.bolsa(ctx, 240, 860, 1.7, 0, T); ctx.restore();
  rotulo(ctx, 480, 240, 'Polietileno', 'SOLO CARBONO (C) E HIDRÓGENO (H) · ESQUEMA', ss(e.tl, 0.3, 1.1), { c: '#e9eef7' });
  const P = cadena(ctx, 520, 520, 13, 100, { sub: 'H', rs: 17, a: ss(e.tl, 0.2, 1.2), muestra: (i) => ss(e.tl, 0.2 + i * 0.1, 0.6 + i * 0.1) });
  const tip = hifaTubo(ctx, bez([-60, 420], [80, 400], [180, 520], [330, 520], 16), ss(e.tl, 1, 3), { T, w: 50 });
  if (e.tl > t1) for (let i = 0; i < 6; i++) { const f = ((e.tl - t1) * 0.45 + i / 6) % 1, d = P[1 + i * 2], va = f < 0.5 ? ss(f, 0, 0.5) : 1 - ss(f, 0.5, 1), x = mixn(tip[0] + 20, d[0] - 10, va), y = mixn(tip[1] - 60 - i * 12, d[1] - 70, va) - Math.sin(f * Math.PI) * 60; enzima(ctx, x, y, 15, Math.PI / 2 * va, C.enz, T, Math.sin(f * Math.PI) * 1.4); if (f > 0.44 && f < 0.6) halo(ctx, d[0], d[1] - 40, 46, '#ffffff', 0.5 * Math.sin((f - 0.44) / 0.16 * Math.PI)); }
  chip(ctx, 'SIN ENLACES ÉSTER QUE CORTAR', 1120, 760, { c: C.rojo, al: 'center', a: ss(e.tl, t1 + 3, t1 + 3.8), s: 24 }); chip(ctx, 'LAS ENZIMAS DEL PET Y DEL POLIURETANO NO TIENEN DÓNDE CORTAR', 1120, 826, { c: C.enz, al: 'center', a: ss(e.tl, t1 + 4.2, t1 + 5), s: 17 });
};
LUZ.lear = (ctx, e) => {
  noche(ctx, '#07080c', '#0b0c12'); const T = e.T, t = (i) => e.L(i) ?? 99;
  ficha(ctx, 150, 130, 2022, '*Environ. Res. Lett.*', 'LEAR ET AL. · REVISIÓN', ss(e.tl, 0.3, 1.1));
  // 664 microbios propuestos: un punto por cada uno
  const dim = 1 - ss(e.tl, t(3) - 0.3, t(3) + 0.6); for (let i = 0; i < 664; i++) { const cx = i % 40, cy = Math.floor(i / 40), a = ss(e.tl, 0.6 + i * 0.006, 0.9 + i * 0.006) * dim; if (a <= 0) break; ctx.fillStyle = rgba(i % 5 === 0 ? '#f1ecdf' : '#7a8aa8', a); ctx.beginPath(); ctx.arc(160 + cx * 18.5, 330 + cy * 18.5, 5.5, 0, TAU); ctx.fill(); }
  txt(ctx, String(Math.round(664 * ss(e.tl, 0.6, 4.6))), 150, 730, { s: 110, f: 'serif', w: 500, c: C.oro, a: dim }); txt(ctx, 'microbios propuestos', 400, 700, { s: 34, f: 'serif', a: dim }); txt(ctx, 'HONGOS INCLUIDOS', 400, 736, { s: 20, f: 'mono', w: 700, ls: 3, c: '#f1ecdf', a: dim });
  // los cuatro plásticos sin pruebas
  const PL = [['PE', 'polietileno', t(1) + 0.3], ['PP', 'polipropileno', t(2) + 0.2], ['PS', 'poliestireno (unicel)', t(2) + 2], ['PVC', 'policloruro de vinilo', t(2) + 4]];
  PL.forEach(([s, n, t0], i) => { const a = ss(e.tl, t0, t0 + 0.6), x = 1010 + (i % 2) * 410, y = 250 + Math.floor(i / 2) * 200; if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(14,16,24,.9)'; ctx.strokeStyle = 'rgba(200,210,230,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(x, y, 380, 160, 14); ctx.fill(); ctx.stroke(); ctx.restore();
    txt(ctx, s, x + 24, y + 78, { s: 72, f: 'serif', w: 600, c: '#e9eef7', a }); txt(ctx, n, x + 26, y + 126, { s: 26, f: 'sans', c: '#aab6cc', a }); sello(ctx, 'SIN PRUEBAS', x + 268, y + 52, ss(e.tl, t0 + 0.7, t0 + 1.2), C.rojo, -0.08, 20); });
  chip(ctx, 'SUSTANCIAL = 20 % O MÁS DE LA MASA · PLÁSTICO PURO', 1010, 680, { c: C.oro, a: ss(e.tl, t(1) + 2.5, t(1) + 3.2), s: 17 });
  // la trampa de los aditivos
  const a3 = ss(e.tl, t(3), t(3) + 0.8); if (a3 > 0) { const x = 520, y = 560, k = ss(e.tl, t(3) + 1, t(3) + 6); ctx.save(); ctx.globalAlpha = a3; ctx.fillStyle = 'rgba(8,9,14,.82)'; ctx.beginPath(); ctx.roundRect(150, 300, 760, 470, 18); ctx.fill(); ctx.strokeStyle = rgba(C.agua, 0.6); ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = 'rgba(236,240,246,.85)'; ctx.beginPath(); ctx.roundRect(x - 150, y - 60, 300, 60, 8); ctx.fill(); ctx.fillStyle = '#2a2e38'; ctx.beginPath(); ctx.roundRect(x - 200, y, 400, 26, 6); ctx.fill(); ctx.beginPath(); ctx.roundRect(x - 110, y + 26, 220, 90, 10); ctx.fill(); ctx.fillStyle = C.verde; ctx.font = `700 46px ${FU.mono}`; ctx.textAlign = 'center'; ctx.fillText((10 - 0.6 * k).toFixed(1) + ' g', x, y + 90);
    for (let i = 0; i < 7; i++) { const f = ((e.tl - t(3)) * 0.35 + i / 7) % 1; ctx.fillStyle = rgba('#FFD23F', Math.sin(f * Math.PI)); ctx.beginPath(); ctx.arc(x - 130 + i * 44 + Math.sin(f * 5 + i) * 10, y - 70 - f * 110, 6, 0, TAU); ctx.fill(); } ctx.restore();
    chip(ctx, 'ADITIVOS QUE SE SUELTAN', x, 372, { c: '#FFD23F', al: 'center', a: a3, s: 20 }); txt(ctx, 'pesa menos, pero nadie se lo comió', x, 740, { s: 38, f: 'mano', al: 'center', c: C.agua, a: ss(e.tl, t(3) + 2, t(3) + 2.8) }); txt(ctx, 'CIFRAS DE EJEMPLO', x + 360, 340, { s: 14, f: 'mono', w: 700, ls: 2, al: 'right', c: '#8fa0bd', a: a3 }); }
};
LUZ.v_bolsa = (ctx, e) => { vObjeto(ctx, e, 'bolsa', 0, 3.6, 560, 800); veredicto(ctx, e, 2, 'Sin pruebas\nsólidas de que\nla degraden', 'Y mucho menos de que se la coman', C.oro); };

/* ====== 07 · Piedra, vidrio y oro ====== */
LUZ.piedra = (ctx, e) => {
  noche(ctx, '#08090a', '#0d0e10'); halo(ctx, 520, 500, 760, '#c9d2e3', 0.08); const T = e.T, t1 = e.L(1) ?? 99, t2 = e.L(2) ?? 99, lq = ss(e.tl, t2, t2 + 5);
  sombra(ctx, 520, 800, 330); OBJ.piedra(ctx, 520, 800, 4.1, lq, T); if (e.tl > t1) { pelusa(ctx, 'pi1', 420, 560, 110, ss(e.tl, t1 + 0.4, t1 + 4), 41, 0.5); pelusa(ctx, 'pi2', 640, 620, 90, ss(e.tl, t1 + 1.2, t1 + 5), 42, 0.5); }
  rotulo(ctx, 150, 240, 'Piedra', 'OBJETO 5 DE 8', ss(e.tl, 0.3, 1.1), { c: C.oro });
  ['MÁRMOL', 'GRANITO', 'BASALTO', 'CUARZO'].forEach((s, i) => chip(ctx, s, 1000 + (i % 2) * 250, 260 + Math.floor(i / 2) * 64, { c: '#c9d2e3', a: ss(e.tl, t1 + 0.6 + i * 0.9, t1 + 1.1 + i * 0.9) * (1 - 0.5 * ss(e.tl, t2, t2 + 0.6)), s: 24 }));
  ficha(ctx, 1000, 420, 2017, '*Microbiology Spectrum*', 'GADD · REVISIÓN', ss(e.tl, t1 + 0.3, t1 + 1));
  const a2 = ss(e.tl, t2, t2 + 0.8); rotulo(ctx, 1000, 640, 'Líquenes', 'HONGO + SOCIO QUE HACE FOTOSÍNTESIS', a2, { c: '#e6a12c' }); chip(ctx, 'ÁCIDO OXÁLICO: DAÑA LA PIEDRA', 1000, 730, { c: '#c9d18a', a: ss(e.tl, t2 + 2, t2 + 2.8), s: 22 });
  if (a2 > 0) for (let i = 0; i < 6; i++) { const f = ((e.tl - t2) * 0.4 + i / 6) % 1; halo(ctx, 360 + i * 60, 520 + f * 60 + (i % 2) * 40, 16, '#c9d18a', Math.sin(f * Math.PI) * 0.9); }
};
LUZ.tuneles = (ctx, e) => {
  noche(ctx, '#0a0806', '#0f0b08'); const T = e.T, t1 = e.L(1) ?? 99, r = rng(71); ctx.fillStyle = 'rgba(90,60,30,.25)'; for (let i = 0; i < 70; i++) { ctx.beginPath(); ctx.arc(r() * 1920, r() * 1080, 4 + r() * 16, 0, TAU); ctx.fill(); }
  // grano de mineral en corte
  const G = [[520, 300], [900, 220], [1350, 260], [1560, 480], [1470, 760], [1040, 840], [640, 790], [450, 560]]; const forma = () => { ctx.beginPath(); G.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); };
  const gr = ctx.createLinearGradient(450, 220, 1560, 840); gr.addColorStop(0, '#c9b9a8'); gr.addColorStop(1, '#8f8478'); forma(); ctx.fillStyle = gr; ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,.25)'; ctx.lineWidth = 2; ctx.save(); forma(); ctx.clip(); for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(400 + i * 90, 200); ctx.lineTo(300 + i * 90, 860); ctx.stroke(); } ctx.restore();
  const TU = [bez([300, 420], [480, 430], [640, 520], [900, 470], 26), bez([700, 980], [760, 820], [900, 700], [1150, 640], 26), bez([1700, 300], [1560, 340], [1400, 420], [1220, 420], 26)];
  TU.forEach((P, i) => { const g = eo(e.tl, 0.4 + i * 1.2, 7 + i * 1.2); // el túnel (oscuro) y la hifa adentro
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#1a1410'; ctx.lineWidth = 36; ctx.beginPath(); const n = Math.max(1, Math.floor(P.length * g)); for (let k = 0; k < n; k++) (k ? ctx.lineTo(P[k][0], P[k][1]) : ctx.moveTo(P[k][0], P[k][1])); ctx.stroke(); ctx.restore();
    const tip = hifaTubo(ctx, P, g, { T, w: 22, sep: 90 }); halo(ctx, tip[0], tip[1], 60, '#c9d18a', 0.75 * ss(e.tl, t1 - 0.5, t1 + 0.6) * (0.7 + 0.3 * Math.sin(T * 4 + i))); });
  ctx.fillStyle = '#e6ebf5'; ctx.fillRect(1560, 760, 72, 4); txt(ctx, '10 µm', 1596, 796, { s: 22, f: 'mono', w: 700, al: 'center' }); chip(ctx, 'TÚNELES DE 3 A 10 µm', 1500, 836, { c: '#c9b9a8', s: 18, a: ss(e.tl, 1.4, 2.2) });
  rotulo(ctx, 150, 240, 'Grano de mineral', 'SUELO DE BOSQUE · EUROPA', ss(e.tl, 0.3, 1.1), { c: '#c9b9a8' });
  ficha(ctx, 1380, 110, 2000, '*Geoderma*', 'VAN BREEMEN ET AL.', ss(e.tl, 1, 1.8)); const a1 = ss(e.tl, t1, t1 + 0.8); chip(ctx, 'LO MÁS PROBABLE: LOS CAVAN HONGOS', 150, 800, { c: C.oro, a: a1, s: 22 }); chip(ctx, 'ÁCIDOS EN LA PUNTA DE LA HIFA', 150, 856, { c: '#c9d18a', a: ss(e.tl, t1 + 1.4, t1 + 2.2), s: 20 }); esquema(ctx, 1, 1380, 250);
};
LUZ.piedra_come = (ctx, e) => {
  const T = e.T, t1 = e.L(1) ?? 99, t2 = e.L(2) ?? 99, g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, '#0d1620'); g.addColorStop(1, '#0a0d12'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080);
  // roca (abajo) y el hongo en su superficie
  const ys = 600; ctx.fillStyle = '#6a6d74'; ctx.beginPath(); ctx.moveTo(0, ys + 20); for (let i = 0; i <= 24; i++) ctx.lineTo(i * 80, ys + Math.sin(i * 1.7) * 14 + Math.sin(i * 0.6) * 10); ctx.lineTo(1920, 1080); ctx.lineTo(0, 1080); ctx.closePath(); ctx.fill(); const r = rng(13); ctx.fillStyle = 'rgba(0,0,0,.16)'; for (let i = 0; i < 60; i++) { ctx.beginPath(); ctx.arc(r() * 1920, ys + 40 + r() * 400, 4 + r() * 12, 0, TAU); ctx.fill(); }
  ctx.save(); ctx.translate(960, ys + 4); ctx.scale(1.6, 0.34); pintaRed(ctx, red('pc', { seed: 6, radio: 380, brotes: 12, max: 4000 }), eo(e.tl, 0, 6), C.hifa, {}); ctx.restore(); colonia(ctx, 960, ys - 6, 60, 1, true, 4);
  // energía: no viene de la piedra
  const a0 = ss(e.tl, 0.6, 1.4) * (1 - ss(e.tl, t1 - 0.3, t1 + 0.4)); txt(ctx, 'ENERGÍA', 960, ys + 190, { s: 44, f: 'mono', w: 700, ls: 10, al: 'center', c: C.enz, a: a0 }); tache(ctx, 960, ys + 176, 120, ss(e.tl, 1.6, 2.4) * a0); chip(ctx, 'UN HONGO NECESITA COMPUESTOS ORGÁNICOS', 960, 300, { c: C.oro, al: 'center', a: a0, s: 24 });
  // lo que traen el aire y la lluvia
  const a1 = ss(e.tl, t1, t1 + 0.8); if (a1 > 0) { for (let i = 0; i < 40; i++) { const x = (i * 137) % 1920, f = ((T * 0.5 + i * 0.37) % 1), y = 110 + f * (ys - 130); ctx.strokeStyle = rgba(C.agua, 0.5 * a1); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 4, y + 20); ctx.stroke(); if (i % 3 === 0) { const xx = mixn(x, 960 + (i - 20) * 16, ss(f, 0.5, 1)); halo(ctx, xx, y, 14, '#FFB05A', a1 * Math.sin(f * Math.PI)); ctx.fillStyle = rgba('#FFB05A', a1 * Math.sin(f * Math.PI)); ctx.beginPath(); ctx.arc(xx, y, 5, 0, TAU); ctx.fill(); } }
    rotulo(ctx, 150, 250, 'Su comida', 'LO QUE TRAEN EL AIRE Y EL AGUA DE LLUVIA', a1, { c: '#FFB05A' }); }
  const a2 = ss(e.tl, t2, t2 + 0.8); if (a2 > 0) { for (let i = 0; i < 6; i++) { const f = ((e.tl - t2) * 0.3 + i / 6) % 1, x = 600 + i * 150, y = mixn(ys + 240, ys + 10, f); ctx.save(); ctx.globalAlpha = a2 * Math.sin(f * Math.PI); ctx.fillStyle = '#b9a6ff'; ctx.beginPath(); ctx.arc(x, y, 17, 0, TAU); ctx.fill(); ctx.fillStyle = '#14101e'; ctx.font = `700 20px ${FU.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('P', x, y + 1); ctx.restore(); }
    rotulo(ctx, 1240, 800, 'De la piedra', 'SOLO MINERALES, COMO EL FÓSFORO (P)', a2, { c: '#b9a6ff' }); }
  esquema(ctx, 1, 60, 856);
};
// Lente con moho: polvo y huellas debajo, la red encima y los surcos que deja.
function lente(ctx, e, x, y, r, g, polvoA, surco) {
  const T = e.T; halo(ctx, x, y, r * 1.5, '#9fd8ff', 0.12); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); const gr = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r); gr.addColorStop(0, '#24405a'); gr.addColorStop(1, '#0c1826'); ctx.fillStyle = gr; ctx.fill(); ctx.clip();
  if (polvoA > 0) { const R = rng(19); ctx.fillStyle = rgba('#d9b77a', 0.75 * polvoA); for (let i = 0; i < 90; i++) { const an = R() * TAU, d = Math.sqrt(R()) * r * 0.92; ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, 1.5 + R() * 3.5, 0, TAU); ctx.fill(); }
    ctx.strokeStyle = rgba('#e9eef7', 0.3 * polvoA); ctx.lineWidth = 3; for (let k = 2; k < 9; k++) { ctx.beginPath(); ctx.ellipse(x + r * 0.34, y + r * 0.3, k * 9, k * 12, 0.5, Math.PI * 0.95, Math.PI * 2.05); ctx.stroke(); } }
  ctx.translate(x - r * 0.1, y); const S = red('lente', { seed: 27, radio: r * 0.9, brotes: 8, max: 5000 });
  if (surco > 0) { ctx.save(); ctx.globalCompositeOperation = 'source-over'; ctx.strokeStyle = `rgba(4,8,14,${0.85 * surco})`; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); for (const s of S) { ctx.moveTo(s[0] + 2, s[1] + 2); ctx.lineTo(s[2] + 2, s[3] + 2); } ctx.stroke(); ctx.restore(); }
  pintaRed(ctx, S, g, '#e9f2ff', { a: 1 - 0.75 * surco }); ctx.restore();
  ctx.strokeStyle = '#1a1c22'; ctx.lineWidth = 34; ctx.beginPath(); ctx.arc(x, y, r + 15, 0, TAU); ctx.stroke(); ctx.strokeStyle = '#3a3f4a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r + 30, 0, TAU); ctx.stroke(); ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r * 0.9, Math.PI * 1.1, Math.PI * 1.3); ctx.stroke();
}
LUZ.lente = (ctx, e) => {
  noche(ctx, '#06090d', '#0a0e14'); const T = e.T, t = (i) => e.L(i) ?? 99, a1 = ss(e.tl, t(1), t(1) + 0.8), sal = 1 - a1;
  if (sal > 0) { ctx.save(); ctx.globalAlpha = sal; sombra(ctx, 960, 800, 300); OBJ.vaso(ctx, 960, 800, 4.2, 0, T); ctx.restore(); }
  rotulo(ctx, 150, 240, 'Vidrio', 'OBJETO 6 DE 8', ss(e.tl, 0.3, 1.1), { c: C.oro });
  if (a1 > 0) { ctx.save(); ctx.globalAlpha = a1; lente(ctx, e, 720, 520, 290, eo(e.tl, t(1) + 0.4, t(1) + 9), ss(e.tl, t(2), t(2) + 1), ss(e.tl, t(3) + 0.5, t(3) + 3)); ctx.restore();
    rotulo(ctx, 1160, 300, 'Lente de binoculares', 'CON MOHO · ESQUEMA', a1, { c: '#9fd8ff' }); ficha(ctx, 1160, 380, 2003, '*Community Eye Health*', 'WATKINS', a1); }
  const a2 = ss(e.tl, t(2), t(2) + 0.8); chip(ctx, 'SU COMIDA: POLVO, GRASA Y HUELLAS', 1160, 560, { c: '#d9b77a', a: a2, s: 22 }); tag3(ctx, 0, 1160, 630, ss(e.tl, t(2) + 1.6, t(2) + 2.4), { al: 'left', s: 24 });
  chip(ctx, 'SUS ÁCIDOS GRABAN SURCOS EN EL VIDRIO', 1160, 720, { c: C.rojo, a: ss(e.tl, t(3), t(3) + 0.8), s: 22 }); chip(ctx, 'QUEDA LA HUELLA DE LA RED', 1160, 786, { c: '#9fd8ff', a: ss(e.tl, t(3) + 2, t(3) + 2.8), s: 20 });
};
LUZ.chaetomium = (ctx, e) => {
  noche(ctx, '#07090c', '#0b0e12'); const T = e.T, t1 = e.L(1) ?? 99, k = ss(e.tl, t1 + 1.5, t1 + 9);
  rotulo(ctx, 150, 240, '*Chaetomium globosum*', 'MOHO AISLADO DEL LENTE DE UNOS BINOCULARES · VIETNAM', ss(e.tl, 0.3, 1.1), { c: '#c9a37a', s: 44 }); ficha(ctx, 1330, 120, 2021, '*VNU J. Sci.*', 'PHI ET AL.', ss(e.tl, 0.8, 1.6));
  // esporas en forma de limón
  for (let i = 0; i < 5; i++) { const x = 220 + i * 86, y = 420 + Math.sin(T * 0.8 + i) * 10, a = ss(e.tl, 0.8 + i * 0.2, 1.4 + i * 0.2) * (1 - ss(e.tl, t1, t1 + 0.6)); ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.rotate(i); ctx.fillStyle = '#8a6a3a'; ctx.beginPath(); ctx.moveTo(-26, 0); ctx.quadraticCurveTo(0, -24, 26, 0); ctx.quadraticCurveTo(0, 24, -26, 0); ctx.fill(); ctx.strokeStyle = '#3a2a14'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  chip(ctx, 'ESPORAS EN FORMA DE LIMÓN · ESQUEMA', 150, 500, { c: '#8fa0bd', s: 18, a: ss(e.tl, 1.6, 2.4) * (1 - ss(e.tl, t1, t1 + 0.6)) });
  // la prueba: un vidrio rociado con esporas
  const a1 = ss(e.tl, t1, t1 + 0.8); if (a1 > 0) { const x = 250, y = 370, w = 900, h = 440; ctx.save(); ctx.globalAlpha = a1; ctx.fillStyle = 'rgba(150,190,220,.12)'; ctx.strokeStyle = 'rgba(220,235,250,.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x, y, w, h, 10); ctx.fill(); ctx.stroke(); ctx.save(); ctx.clip();
    const R = rng(44); for (let i = 0; i < 46; i++) { const px = x + R() * w, py = y + R() * h; ctx.fillStyle = 'rgba(138,106,58,.9)'; ctx.beginPath(); ctx.ellipse(px, py, 5, 3, R() * 3, 0, TAU); ctx.fill(); }
    [[x + 190, y + 130, 150, 3], [x + 560, y + 300, 170, 5], [x + 760, y + 100, 110, 7], [x + 330, y + 350, 100, 9]].forEach(([cx, cy, rr, sd]) => { ctx.save(); ctx.translate(cx, cy); pintaRed(ctx, red('ch' + sd, { seed: sd, radio: rr, brotes: 7, max: 1600, rama: 0.11 }), k, '#b9a27a', {}); ctx.restore(); }); ctx.restore(); ctx.restore();
    txt(ctx, 'SEMANA ' + Math.max(1, Math.ceil(k * 4)) + ' DE 4', x, y - 20, { s: 22, f: 'mono', w: 700, ls: 4, c: '#c9d2e3', a: a1 });
    txt(ctx, '≈ ' + Math.round(30 * k) + ' %', 1240, 520, { s: 150, f: 'serif', w: 500, c: C.oro, a: a1 }); txt(ctx, 'del vidrio cubierto', 1250, 580, { s: 40, f: 'serif', a: a1 });
    chip(ctx, 'AGUA + MINERALES + GOTA DE DETERGENTE', 1250, 660, { c: C.agua, a: a1, s: 18 }); chip(ctx, 'SIN AZÚCAR', 1250, 720, { c: C.oro, a: a1, s: 22 }); lab(ctx, 1250, 784, a1, 'EN LABORATORIO', 'left'); }
};
LUZ.oro = (ctx, e) => {
  noche(ctx, '#0a0806', '#100c08'); const T = e.T, t = (i) => e.L(i) ?? 99, a2 = ss(e.tl, t(2), t(2) + 0.8), sal = 1 - a2;
  if (sal > 0) { ctx.save(); ctx.globalAlpha = sal; sombra(ctx, 560, 700, 300); OBJ.anillo(ctx, 560, 700, 5, 0, T); ctx.restore(); }
  rotulo(ctx, 150, 240, 'Oro', 'OBJETO 7 DE 8', ss(e.tl, 0.3, 1.1) * sal, { c: C.oro });
  const a1 = ss(e.tl, t(1), t(1) + 0.8); ficha(ctx, 1200, 130, 2019, '*Nature Communications*', 'BOHU ET AL.', a1); chip(ctx, 'JUNTO A UNA MINA DE ORO · AUSTRALIA OCCIDENTAL', 1200, 290, { c: C.oro, a: a1 * sal, s: 18 });
  if (a2 > 0) { const x = 640, y = 500, r = 320, col = 60 + 110 * eo(e.tl, t(2) + 0.6, t(2) + 8), vac = col + 70 * ss(e.tl, t(2) + 2.5, t(2) + 7); ctx.save(); ctx.globalAlpha = a2; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = '#1c1710'; ctx.fill(); petri(ctx, x, y, r);
    const R = rng(88); for (let i = 0; i < 520; i++) { const an = R() * TAU, d = Math.sqrt(R()) * r * 0.93, v = ss(d, vac - 26, vac + 10); if (v <= 0) continue; ctx.fillStyle = rgba('#F4C25A', 0.9 * v); ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d, 2.4, 0, TAU); ctx.fill(); }
    ctx.save(); ctx.translate(x, y); pintaRed(ctx, red('fus', { seed: 16, radio: 172, brotes: 12, max: 5000, rama: 0.1 }), (col - 40) / 135, '#ff9ab8', {}); ctx.restore(); ctx.fillStyle = 'rgba(255,154,184,.25)'; ctx.beginPath(); ctx.arc(x, y, col * 0.8, 0, TAU); ctx.fill(); ctx.restore();
    rotulo(ctx, 1200, 330, '*Fusarium oxysporum*', 'COLONIA ROSADA EN AGAR', a2, { c: '#ff9ab8', s: 44 }); chip(ctx, 'PUNTOS: ORO COLOIDAL, PARTÍCULAS DIMINUTAS', 1200, 430, { c: C.oro, a: a2, s: 18 });
    const ah = ss(e.tl, t(2) + 3.5, t(2) + 4.3); guia(ctx, x + vac - 20, y - 20, 1200, 500, ah, '#e9eef7'); chip(ctx, 'HALO SIN ORO: EL HONGO LO OXIDÓ', 1200, 500, { c: '#e9eef7', a: ah, s: 20 }); chip(ctx, 'OXIDAR NO ES COMER', 1200, 566, { c: C.rojo, a: ss(e.tl, t(2) + 5, t(2) + 5.8), s: 20 }); esquema(ctx, a2, 60, 856); }
  const a3 = ss(e.tl, t(3), t(3) + 0.8); if (a3 > 0) { lab(ctx, 1040, 660, a3, 'EN LABORATORIO', 'left'); ctx.save(); ctx.globalAlpha = a3; OBJ.anillo(ctx, 1110, 820, 1.6, 0, T); ctx.restore(); chip(ctx, 'EL ANILLO: IGUAL', 1200, 796, { c: C.oro, a: a3, s: 20 }); }
};
LUZ.v_piedra = (ctx, e) => {
  noche(ctx, '#0a0806', '#120d09'); halo(ctx, 560, 520, 760, '#FFB05A', 0.12); const T = e.T;
  sombra(ctx, 330, 520, 200); OBJ.piedra(ctx, 330, 520, 2.4, 1, T); sombra(ctx, 800, 560, 130); OBJ.vaso(ctx, 800, 560, 2.3, ss(e.tl, 0, 3), T); sombra(ctx, 540, 820, 160); OBJ.anillo(ctx, 540, 820, 2.8, 0, T);
  veredicto(ctx, e, 1, 'Crecen encima\ny los atacan', 'Pero no son su comida', C.oro);
};

/* ====== 08 · El sartén ====== */
const CF = { sub: 'F', csub: C.fluor };
LUZ.cf = (ctx, e) => {
  noche(ctx, '#06090a', '#0a0f10'); const T = e.T, t = (i) => e.L(i) ?? 99, a1 = ss(e.tl, t(1), t(1) + 0.8);
  halo(ctx, 400, 520, 620, '#c9d2e3', 0.08); sombra(ctx, 380, 700, 300); OBJ.sarten(ctx, 400, 700, 3.4, 0, T); rotulo(ctx, 150, 240, 'Sartén de teflón', 'OBJETO 8 DE 8', ss(e.tl, 0.3, 1.1), { c: C.oro });
  const P = cadena(ctx, 900, 520, 10, 100, { ...CF, rs: 18, a: a1, muestra: (i) => ss(e.tl, t(1) + i * 0.15, t(1) + 0.5 + i * 0.15) });
  rotulo(ctx, 880, 250, 'Teflón (PTFE)', 'CARBONOS (C) FORRADOS DE FLÚOR (F) · ESQUEMA', a1, { c: C.fluor });
  chip(ctx, 'PARIENTE DE LOS PFAS · «QUÍMICOS ETERNOS»', 880, 350, { c: C.oro, a: ss(e.tl, t(2), t(2) + 0.8), s: 20 });
  const a3 = ss(e.tl, t(3), t(3) + 0.8); if (a3 > 0) { const p = P[4], q = [p[0] - 31, p[1] + 72], lat = 0.7 + 0.3 * Math.sin(T * 4); halo(ctx, (p[0] + q[0]) / 2, (p[1] + q[1]) / 2, 90, '#ffffff', 0.7 * a3 * lat); ctx.save(); ctx.globalAlpha = a3; ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, 62, 0, TAU); ctx.stroke(); ctx.restore();
    guia(ctx, (p[0] + q[0]) / 2, (p[1] + q[1]) / 2 + 62, 1100, 760, a3, '#fff'); rotulo(ctx, 1110, 770, 'Enlace carbono–flúor', 'EL MÁS FUERTE DE LA QUÍMICA ORGÁNICA', a3, { c: '#ffffff' }); ficha(ctx, 1380, 110, 2008, '*Chem. Soc. Rev.*', "O'HAGAN", a3, C.fluor); }
};
LUZ.pfas_pocos = (ctx, e) => {
  noche(ctx, '#06090a', '#0a0f10'); const T = e.T, t1 = e.L(1) ?? 99;
  const P = cadena(ctx, 760, 520, 11, 100, { ...CF, rs: 18 }), tip = hifaTubo(ctx, bez([-60, 300], [150, 310], [300, 500], [520, 520], 22), eo(e.tl, 0.2, 3), { T, w: 52 });
  rotulo(ctx, 110, 700, 'Pudrición blanca', 'EL MISMO SISTEMA DE LA LIGNINA Y EL TNT', ss(e.tl, 0.8, 1.6), { c: C.hifa, s: 42 });
  // enzimas y radicales que llegan a la cadena y rebotan
  for (let i = 0; i < 5; i++) enzima(ctx, 600 + (i % 2) * 60 + Math.sin(T + i) * 10, 330 + i * 80 + Math.cos(T * 1.3 + i) * 10, 15, 0, C.enz, T, ss(e.tl, 2.4 + i * 0.3, 3 + i * 0.3));
  if (e.tl > 3.4) for (let i = 0; i < 12; i++) { const f = ((e.tl * 0.7 + i / 12) % 1), d = P[i % 11], y0 = 330 + (i % 5) * 80, ida = f < 0.55, u = ida ? f / 0.55 : (f - 0.55) / 0.45, x = ida ? mixn(640, d[0] - 30, u) : mixn(d[0] - 30, d[0] - 190, u), y = ida ? mixn(y0, d[1] + ((i % 2) ? 60 : -60), u) : mixn(d[1] + ((i % 2) ? 60 : -60), d[1] + ((i % 2) ? 230 : -230), u); chispa(ctx, x, y, 8, C.rad, ida ? Math.min(1, u * 4) : 1 - u, T * 3 + i); if (!ida && u < 0.25) halo(ctx, d[0] - 30, d[1] + ((i % 2) ? 60 : -60), 40, C.fluor, 0.8 * (1 - u * 4)); }
  chip(ctx, 'LOS RADICALES CASI NO LE HACEN NADA', 1260, 820, { c: C.rad, al: 'center', a: ss(e.tl, 4, 4.8), s: 22 });
  const a1 = ss(e.tl, t1, t1 + 0.8); ficha(ctx, 1280, 110, 2024, '*J. Fungi*', 'TORRES-FARRADÁ ET AL. · REVISIÓN', a1); chip(ctx, '«SORPRENDENTEMENTE, MUY POCOS ESTUDIOS»', 1280, 262, { c: C.oro, a: ss(e.tl, t1 + 1, t1 + 1.8), s: 18 }); esquema(ctx, 1, 60, 856);
};
// PFOA (esquema): cadena de ocho carbonos con flúor y una cabeza ácida.
function pfoa(ctx, x, y, s, a = 1, rot = 0) { a = cl(a); if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); cadena(ctx, 0, 0, 7, 54, { ...CF, rs: 10, a }); ctx.globalAlpha = a; ctx.fillStyle = '#ff7a6a'; ctx.beginPath(); ctx.roundRect(7 * 54 - 22, -24, 92, 44, 10); ctx.fill(); ctx.fillStyle = '#14100a'; ctx.font = `700 21px ${FU.mono}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('COOH', 7 * 54 + 24, -1); ctx.restore(); }
LUZ.pfas_lab = (ctx, e) => {
  noche(ctx, '#07090c', '#0b0d12'); const T = e.T, t = (i) => e.L(i) ?? 99, k = ss(e.tl, 1.5, t(1) + 3), pega = ss(e.tl, t(2) + 0.6, t(2) + 2.6);
  rotulo(ctx, 150, 240, 'PFOA', 'ÁCIDO PERFLUOROOCTANOICO · UN PFAS · ESQUEMA', ss(e.tl, 0.3, 1.1), { c: C.fluor });
  // la lacasa (enzima grande) y las moléculas de PFOA
  const ex = 560, ey = 560; halo(ctx, ex, ey, 260, C.enz, 0.18); enzima(ctx, ex, ey, 120, 0.1 * Math.sin(T), C.enz, T * 0.25, 1); txt(ctx, 'LACASA', ex - 20, ey - 196, { s: 24, f: 'mono', w: 700, ls: 5, al: 'center', c: C.enz }); rico(ctx, 'enzima de *Pleurotus ostreatus*', ex - 20, ey - 158, { s: 28, f: 'serif', al: 'center', c: '#e9eef7' });
  for (let i = 0; i < 4; i++) { const an = -0.45 + i * 0.5, libre = [1020 + (i % 2) * 150, 350 + i * 105 + Math.sin(T * 0.9 + i) * 10], peg = [ex + Math.cos(an) * 138, ey + Math.sin(an) * 138]; pfoa(ctx, mixn(libre[0], peg[0], pega), mixn(libre[1], peg[1], pega), 0.5, i < 2 ? 1 - 0.75 * k * (1 - pega) : 1, mixn(0, an, pega)); }
  ctx.fillStyle = '#b9a6ff'; ctx.beginPath(); ctx.arc(330 + Math.sin(T * 1.3) * 16, 700 + Math.cos(T * 1.1) * 12, 16, 0, TAU); ctx.fill(); chip(ctx, 'MEDIADOR QUÍMICO', 150, 770, { c: '#b9a6ff', a: ss(e.tl, t(1), t(1) + 0.7), s: 18 });
  // el reporte original
  const a0 = ss(e.tl, 1, 1.8) * (1 - 0.65 * pega); txt(ctx, Math.round(50 * k) + ' %', 1430, 400, { s: 150, f: 'serif', w: 500, c: C.oro, a: a0 }); txt(ctx, 'del PFOA deshecho (reporte original)', 1440, 456, { s: 26, f: 'serif', a: a0 });
  const a1 = ss(e.tl, t(1), t(1) + 0.8); txt(ctx, 'DÍA ' + Math.round(157 * ss(e.tl, 1.5, t(1) + 3)), 1440, 540, { s: 54, f: 'mono', w: 700, c: '#e9eef7', a: a0 * (0.4 + 0.6 * a1) }); lab(ctx, 1440, 600, a1 * (1 - 0.65 * pega), 'EN LABORATORIO', 'left');
  const a2 = ss(e.tl, t(2), t(2) + 0.6); sello(ctx, '2023: NO SE PUDO REPETIR', 1400, 330, a2, C.rojo, -0.05, 36); chip(ctx, 'EL PFOA SE PEGABA A LA ENZIMA: PARECÍA DESAPARECER', 960, 840, { c: C.rojo, al: 'center', a: ss(e.tl, t(2) + 2.2, t(2) + 3), s: 20 });
};
LUZ.ftoh = (ctx, e) => {
  noche(ctx, '#07090c', '#0b0d12'); const T = e.T, t = (i) => e.L(i) ?? 99;
  cultivo(ctx, e, 330, 800, 1.7); rotulo(ctx, 150, 240, '*Phanerochaete*', '28 DÍAS · CULTIVO DE LABORATORIO', ss(e.tl, 0.3, 1.1), { c: C.hifa });
  // antes → después: sigue habiendo flúor
  const a0 = ss(e.tl, 0.8, 1.6); ctx.save(); ctx.translate(700, 420); cadena(ctx, 0, 0, 6, 70, { ...CF, rs: 13, a: a0 }); ctx.restore(); chip(ctx, 'COMPUESTO CON FLÚOR (6:2 FTOH)', 690, 330, { c: C.fluor, a: a0, s: 18 });
  const a1 = ss(e.tl, t(1), t(1) + 0.8); flecha(ctx, 1200, 420, 1320, 420, ss(e.tl, t(1) - 0.6, t(1) + 0.4), '#e9eef7', 4); ctx.save(); ctx.translate(1400, 420); cadena(ctx, 0, 0, 5, 70, { ...CF, rs: 13, a: a1 }); ctx.restore(); chip(ctx, 'OTRO ÁCIDO QUE SIGUE CON FLÚOR', 1390, 330, { c: C.rad, a: a1, s: 18 });
  if (a1 > 0) { const k = ss(e.tl, t(1) + 0.5, t(1) + 3.5), x = 700, y = 640, w = 1000; ctx.save(); ctx.globalAlpha = a1; ctx.fillStyle = 'rgba(200,210,230,.14)'; ctx.fillRect(x, y, w, 46); ctx.fillStyle = rgba(C.rad, 0.5); ctx.fillRect(x, y, w * 0.43 * k, 46); ctx.fillStyle = C.rad; ctx.fillRect(x, y, w * 0.32 * k, 46); ctx.restore(); txt(ctx, 'entre 32 % y 43 % terminó así', x, y + 96, { s: 36, f: 'serif', a: a1 }); txt(ctx, 'TSENG ET AL., 2014', x + w, y + 92, { s: 18, f: 'mono', w: 700, ls: 2, al: 'right', c: '#8fa0bd', a: a1 }); }
  const a2 = ss(e.tl, t(2), t(2) + 0.8); if (a2 > 0) { oscurece(ctx, 0.6 * a2); titulo(ctx, 'Transformar a medias', 960, 440, a2, { s: 96 }); titulo(ctx, 'no es mineralizar', 960, 560, ss(e.tl, t(2) + 0.6, t(2) + 1.4), { s: 96, c: C.rojo }); }
  esquema(ctx, 1 - a2, 60, 856);
};
LUZ.v_teflon = (ctx, e) => {
  noche(ctx, '#0a0806', '#120d09'); halo(ctx, 640, 420, 760, '#c9d2e3', 0.1); sombra(ctx, 620, 560, 300); OBJ.sarten(ctx, 640, 560, 3.6, 0, e.T);
  titulo(ctx, '¿Y el teflón?', 640, 240, ss(e.tl, 0.2, 1) * (1 - en(e, 1, 0.5)), { s: 84 });
  veredictoEn(ctx, e, 1, 2, 'Sin evidencia\nde que se lo\ncoman', 'Ningún estudio confiable\nencontrado para este guion', C.oro);
};

/* ====== 09 · La respuesta ====== */
// Estado final de cada objeto (0 = igual, 1 = transformado).
const FINAL = [1, 1, 1, 0, 1, 1, 0, 0];
LUZ.mesa_final = (ctx, e) => {
  const un = cam(ctx, 1.0 + 0.02 * ss(e.tl, 0, e.dur), 960 + Math.sin(e.T * 0.15) * 8, 560); mesaFondo(ctx, e.T, 1); const t = (i) => e.L(i) ?? 99, T0 = [t(1), t(1) + 2.6, t(1) + 3.4, 99, t(2) + 3, t(2), 99, 99];
  const lz = (i) => { const g = [[0, 1, 2], [4, 5], [6], [3, 7]].findIndex((G) => G.includes(i)), a = t(g + 1), b = t(g + 2) === 99 ? e.dur + 9 : t(g + 2); return ss(e.tl, a, a + 0.4) * (1 - ss(e.tl, b - 0.2, b + 0.4)); };
  mesa(ctx, e, { t: (i) => (FINAL[i] ? ss(e.tl, T0[i], T0[i] + 4) : 0), luz: lz, apaga: (i) => (i === 3 || i === 7 ? 0 : ss(e.tl, t(4), t(4) + 1)) }); un();
  titulo(ctx, 'De regreso a la mesa', 960, 300, ss(e.tl, 0.2, 1) * (1 - ss(e.tl, t(1) - 0.3, t(1) + 0.3)), { s: 84 });
  chip(ctx, 'IGUAL', MX(6), 520, { c: C.oro, al: 'center', a: ss(e.tl, t(3) + 0.4, t(3) + 1) * (1 - ss(e.tl, t(4), t(4) + 0.5)), s: 24 }); lab(ctx, MX(6), 460, ss(e.tl, t(3) + 2, t(3) + 2.6) * (1 - ss(e.tl, t(4), t(4) + 0.5)), 'SOLO EN LABORATORIO, EN POLVO FINÍSIMO');
  const a4 = ss(e.tl, t(4) + 0.4, t(4) + 1.2); titulo(ctx, 'Intactos', 960, 320, a4, { s: 110 }); for (const i of [3, 7]) flecha(ctx, 960 + (MX(i) - 960) * 0.25, 370, MX(i), 520, a4, C.oro, 4);
};
LUZ.respuesta = (ctx, e) => {
  mesaFondo(ctx, e.T, 1); const t = (i) => e.L(i) ?? 99, a1 = ss(e.tl, t(1), t(1) + 0.8), a2 = ss(e.tl, t(2), t(2) + 0.8), a3 = ss(e.tl, t(3), t(3) + 0.8);
  mesa(ctx, e, { t: (i) => FINAL[i], luz: (i) => (i >= 4 && i <= 6 ? a1 * (1 - a2) : i <= 2 ? a2 * (1 - a3) : a3), apaga: (i) => (i === 3 || i === 7 ? 0 : a3 * 0.8) });
  titulo(ctx, '¿Cuáles *no* se puede comer un hongo?', 960, 200, ss(e.tl, 0.2, 1) * (1 - a3), { s: 66 });
  const corchete = (i0, i1, s, c, a, y = 500) => { if (a <= 0) return; const x0 = MX(i0) - 96, x1 = MX(i1) + 96; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = c; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y + 26); ctx.lineTo(x0, y); ctx.lineTo(x1, y); ctx.lineTo(x1, y + 26); ctx.stroke(); ctx.restore(); chip(ctx, s, (x0 + x1) / 2, y - 40, { c, al: 'center', a, s: 20 }); };
  corchete(4, 6, 'NO SON COMIDA: LOS ATACAN', C.azul, a1 * (1 - 0.5 * a3)); corchete(0, 2, 'DE CARBONO · HECHOS POR LA NATURALEZA', C.verde, a2 * (1 - 0.5 * a3));
  corchete(3, 3, 'INVENTO HUMANO', C.rojo, a3, 430); corchete(7, 7, 'INVENTO HUMANO', C.rojo, a3, 430);
  titulo(ctx, 'Lo que más se les resiste', 800, 190, a3, { s: 76 }); titulo(ctx, 'lo fabricamos nosotros', 800, 290, ss(e.tl, t(3) + 0.8, t(3) + 1.6), { s: 76, c: C.oro });
};
LUZ.preguntas = (ctx, e) => {
  mesaFondo(ctx, e.T, 1); mesa(ctx, e, { t: (i) => FINAL[i] }); oscurece(ctx, 0.74 * ss(e.tl, 0, 1.2)); const t = (i) => e.L(i) ?? 99;
  ctx.save(); ctx.globalAlpha = ss(e.tl, 0.3, 1); ctx.translate(960, 210); ctx.rotate(-0.02); ctx.fillStyle = '#ece6d8'; ctx.fillRect(-470, -70, 940, 140); ctx.fillStyle = '#1a1a1e'; ctx.font = `400 84px 'Anton', ${FU.sans}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('EL HONGO QUE COME PLÁSTICO', 0, 6); ctx.restore();
  [['¿Creció encima, lo rompió o se lo comió de verdad?', C.verde], ['¿Hongo vivo o enzima purificada?', C.enz], ['¿Tubo de laboratorio o escala real?', C.agua]].forEach(([s, c], i) => { const a = ss(e.tl, t(i + 1), t(i + 1) + 0.7), y = 420 + i * 150; if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(8,9,14,.82)'; ctx.strokeStyle = rgba(c, 0.85); ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(300 + (1 - a) * 40, y - 58, 1320, 116, 16); ctx.fill(); ctx.stroke(); ctx.restore();
    txt(ctx, String(i + 1), 370, y + 24, { s: 76, f: 'serif', w: 600, al: 'center', c, a }); txt(ctx, s, 440, y + 17, { s: 48, f: 'serif', w: 500, a }); });
};
