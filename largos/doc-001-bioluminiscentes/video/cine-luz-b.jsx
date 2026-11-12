// cine-luz-b.jsx — Documental 001, capítulos 4 a 8 (algas, petunia, luciérnagas, resumen y cierre).
const { TAU, cl, pr, ss, eo, mixn, rng, rgba, mixc, LUZC, halo, noche, estrellas, polvo, cam, oscurece, txt, rico, chip, rotulo, guia, titulo, sello, tache, flecha,
  red, pintaRed, tronco, panellus, mycena, embudo, petri, frasco, matraz, bacteria, calamar, dino, petunia, luciernaga, abeto, foco, termometro, reloj, maleta, documento, botella, molecula, veredicto } = window.LZK;
const { recamara, colonias, emblema, enjambre, en, esquema } = window.LZA;
const LUZ = window.LUZ;

// Frasco (matraz) con muchas células de Pyrocystis. fuerza: qué tanto destellan al agitar (0..1). agita: ángulo.
function matrazAlgas(ctx, x, y, s, T, agita, fuerza, vivas = 1, seed = 3) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(agita); ctx.translate(-x, -y);
  matraz(ctx, x, y, s, 0.52, 'rgba(20,60,90,.28)');
  const R = rng(seed); let suma = 0;
  for (let i = 0; i < 60; i++) { const u = R(), v = R(), yy = y - v * 100 * s, half = (118 - (y - yy) / s * 0.55) * s, xx = x + (u - 0.5) * 2 * half * 0.92, fase = R() * 10, vel = 2.2 + R() * 2.5;
    const f = fuerza * Math.pow(Math.max(0, Math.sin(T * vel + fase)), 14); suma += f;
    ctx.save(); ctx.globalAlpha = 0.5 + 0.5 * vivas; dino(ctx, xx, yy, 0.14 * s * (0.8 + R() * 0.5), R() * 6 + T * 0.2, f, 0, i); ctx.restore(); if (f > 0.05) halo(ctx, xx, yy, 46 * s, LUZC.dino, f * 0.9); }
  if (suma > 0.2) halo(ctx, x, y - 50 * s, 330 * s, LUZC.dino, Math.min(0.5, suma * 0.06));
  ctx.restore();
}

/* ====== 04 · Algas ====== */
LUZ.celula = (ctx, e) => {
  const dia = en(e, 4, 2), T = e.T; noche(ctx, mixc('#031018', '#0d4a66', dia * 0.8), mixc('#020a12', '#083448', dia * 0.8));
  if (dia > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 6; i++) { const x = 300 + i * 260 + Math.sin(T * 0.3 + i) * 40; ctx.fillStyle = `rgba(255,240,190,${0.05 * dia})`; ctx.beginPath(); ctx.moveTo(x, -10); ctx.lineTo(x + 120, -10); ctx.lineTo(x - 200, 1090); ctx.lineTo(x - 420, 1090); ctx.closePath(); ctx.fill(); } ctx.restore(); }
  polvo(ctx, 30, 6, T, '#8fc4e0', 0.3);
  const a = ss(e.tl, 0.3, 1.6), fin = cam(ctx, 1.0 + 0.08 * e.p, 960, 540);
  ctx.save(); ctx.globalAlpha = a; dino(ctx, 960, 620 + Math.sin(T * 0.6) * 10, 5.2, -0.12 + Math.sin(T * 0.3) * 0.03, 0, 0.25 + 0.75 * dia, 7); ctx.restore();
  // burbujas de oxígeno al hacer fotosíntesis
  if (dia > 0) { const R = rng(9); for (let i = 0; i < 16; i++) { const ph = (T * 0.16 + R()) % 1, x = 560 + R() * 800, y = 520 - ph * 380; ctx.save(); ctx.globalAlpha = dia * (1 - ph) * 0.8; ctx.strokeStyle = '#d9f3ff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + Math.sin(T + i) * 8, y, 5 + R() * 8, 0, TAU); ctx.stroke(); ctx.restore(); } }
  fin();
  rotulo(ctx, 150, 240, '*Pyrocystis*', 'DINOFLAGELADOS · ALGAS DE UNA SOLA CÉLULA, DEL MAR', en(e, 1, 0.9), { c: LUZC.dino });
  guia(ctx, 1150, 430, 1380, 300, en(e, 2, 0.7), '#e9c46a'); txt(ctx, 'CLOROPLASTOS', 1396, 296, { s: 20, f: 'mono', w: 700, ls: 4, c: '#e9c46a', a: en(e, 2, 0.7, 0.3) });
  chip(ctx, 'SE CONSIGUE PARA ESCUELAS', 960, 800, { c: LUZC.oro, al: 'center', a: en(e, 3, 0.8) * (1 - en(e, 4, 0.5)) }); rico(ctx, 'por ejemplo, *Pyrocystis lunula*', 960, 862, { s: 34, al: 'center', a: en(e, 3, 0.8, 0.5) * (1 - en(e, 4, 0.5)) });
  chip(ctx, 'DE DÍA: FOTOSÍNTESIS', 960, 800, { c: '#ffe08a', al: 'center', s: 28, a: en(e, 4, 0.8, 0.6) });
};
LUZ.destello = (ctx, e) => {
  noche(ctx, '#02060c', '#040b14'); const T = e.T, t1 = e.L(1) ?? 4, lento = en(e, 1, 0.8);
  const agita = ss(e.tl, 1.2, 1.6) * (1 - lento) * Math.sin(e.tl * 13) * 0.16, f = ss(e.tl, 1.3, 1.9) * (1 - 0.8 * lento);
  matrazAlgas(ctx, mixn(960, 520, lento), 760, 2.2, T, agita, f);
  chip(ctx, 'DE NOCHE · AL AGITAR', 960, 180, { c: LUZC.dino, al: 'center', s: 28, a: ss(e.tl, 1.6, 2.4) * (1 - lento) });
  // un solo destello, en cámara lenta: sube rápido y se apaga en ~200 ms
  if (lento > 0) { const x0 = 1020, x1 = 1740, y0 = 640, k = pr(e.tl, t1 + 0.8, t1 + 3.6), curva = (u) => (u < 0.18 ? u / 0.18 : Math.exp(-(u - 0.18) * 5.5));
    ctx.save(); ctx.globalAlpha = lento; ctx.strokeStyle = 'rgba(220,230,250,.5)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y0); ctx.moveTo(x0, y0); ctx.lineTo(x0, 300); ctx.stroke();
    ctx.strokeStyle = LUZC.dino; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 80 * k; i++) { const u = i / 80; ctx.lineTo(x0 + u * (x1 - x0), y0 - curva(u) * 300); } ctx.stroke(); ctx.restore();
    const u = k; halo(ctx, x0 + u * (x1 - x0), y0 - curva(u) * 300, 90, LUZC.dino, lento * (0.3 + 0.7 * curva(u)));
    dino(ctx, 1380, 250, 1.3, -0.1, lento * curva(u), 0, 4);
    txt(ctx, 'TIEMPO', x1, y0 + 44, { s: 18, f: 'mono', w: 700, ls: 4, al: 'right', c: '#8fa0bd', a: lento }); txt(ctx, 'BRILLO', x0 - 14, 320, { s: 18, f: 'mono', w: 700, ls: 4, al: 'right', c: '#8fa0bd', a: lento });
    ctx.save(); ctx.globalAlpha = lento * ss(e.tl, t1 + 2.4, t1 + 3); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y0 + 16); ctx.lineTo(x0 + (x1 - x0) * 0.62, y0 + 16); ctx.stroke(); ctx.restore();
    txt(ctx, '≈ 200 milisegundos', x0 + (x1 - x0) * 0.31, y0 + 64, { s: 44, f: 'serif', w: 500, al: 'center', a: lento * ss(e.tl, t1 + 2.4, t1 + 3.2) }); }
};
LUZ.reloj = (ctx, e) => {
  noche(ctx, '#03070d', '#060c16'); const T = e.T;
  // el reloj interno recorre un día completo durante la escena (día arriba, noche abajo)
  const hora = (6 + e.tl / e.dur * 30) % 24, esNoche = hora >= 12 ? 1 : 0, prof = esNoche ? Math.sin((hora - 12) / 12 * Math.PI) : 0;
  const calor = en(e, 3, 1.2) * (1 - en(e, 4, 0.8));
  reloj(ctx, 470, 500, 230, hora, ss(e.tl, 0.2, 1.2));
  txt(ctx, 'SU DÍA', 470, 228, { s: 20, f: 'mono', w: 700, ls: 6, al: 'center', c: '#ffe08a', a: ss(e.tl, 0.6, 1.4) }); txt(ctx, 'SU NOCHE', 470, 792, { s: 20, f: 'mono', w: 700, ls: 6, al: 'center', c: '#7fa2ff', a: ss(e.tl, 0.6, 1.4) });
  // se agita siempre igual; lo que cambia es la hora
  const agita = Math.sin(e.tl * 13) * 0.07 * (0.5 + 0.5 * Math.sin(e.tl * 1.4) > 0.5 ? 1 : 0.3);
  matrazAlgas(ctx, 1180, 780, 2.0, T, agita, (0.06 + 0.94 * prof) * (1 - calor), 1 - calor);
  chip(ctx, esNoche ? 'AGITAR DE NOCHE: DESTELLOS' : 'AGITAR DE DÍA: CASI NADA', 1180, 180, { c: esNoche ? LUZC.dino : '#8fa0bd', al: 'center', a: en(e, 1, 0.8) * (1 - en(e, 2, 0.5)) });
  // condiciones
  const ac = en(e, 2, 0.8); chip(ctx, '12 h DE LUZ · 12 h DE OSCURIDAD', 1180, 180, { c: LUZC.oro, al: 'center', a: ac * (1 - en(e, 4, 0.5)) });
  termometro(ctx, 1640, 660, 380, mixn(0.42, 0.95, calor), mixc('#3d9bff', '#ff5a3a', calor), ac);
  ctx.save(); ctx.globalAlpha = ac; ctx.fillStyle = rgba('#3DFF7A', 0.22); ctx.fillRect(1662, 660 - 366 * 0.56, 22, 366 * 0.26); ctx.restore(); txt(ctx, '15 a 22 °C', 1700, 660 - 366 * 0.42, { s: 34, f: 'serif', w: 500, a: ac }); txt(ctx, 'CUARTO FRESCO', 1700, 660 - 366 * 0.42 + 32, { s: 16, f: 'mono', w: 700, ls: 3, c: '#3DFF7A', a: ac });
  sello(ctx, 'CON CALOR, MUEREN', 1180, 480, calor > 0.4 ? calor : 0, LUZC.rojo, -0.05, 44);
  // mejor brillo: ya entrada su noche
  const am = en(e, 4, 0.9); ctx.save(); ctx.globalAlpha = am; ctx.strokeStyle = LUZC.dino; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(470, 500, 252, Math.PI * 0.2, Math.PI * 0.62); ctx.stroke(); ctx.restore(); halo(ctx, 470 + Math.cos(Math.PI * 0.41) * 252, 500 + Math.sin(Math.PI * 0.41) * 252, 120, LUZC.dino, 0.5 * am);
  chip(ctx, 'MEJOR BRILLO: YA ENTRADA SU NOCHE', 1180, 180, { c: LUZC.dino, al: 'center', a: am });
  rotulo(ctx, 150, 920 - 800, 'Tienen reloj', null, 0);
};
LUZ.mar = (ctx, e) => {
  const g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, '#0f5a86'); g.addColorStop(0.35, '#083458'); g.addColorStop(1, '#020812'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080);
  const T = e.T, baja = eo(e.tl, 0.4, 5.5);
  // rayos de colores: cada uno llega a distinta profundidad (cualitativo, sin cifras)
  [['ROJO', '#ff4a3a', 0.2], ['AMARILLO', '#ffd84a', 0.42], ['VERDE', '#4aff6a', 0.66], ['AZUL', '#2a9bff', 1]].forEach(([n, c, hasta], i) => { const x = 560 + i * 270, y1 = 140 + 760 * Math.min(baja, hasta) * (hasta === 1 ? 0.98 : 1);
    const gr = ctx.createLinearGradient(0, 130, 0, y1); gr.addColorStop(0, rgba(c, 0.85)); gr.addColorStop(1, rgba(c, 0)); ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = gr; ctx.fillRect(x - 34, 130, 68, y1 - 130); ctx.restore();
    txt(ctx, n, x, 110, { s: 20, f: 'mono', w: 700, ls: 4, al: 'center', c, a: ss(e.tl, 0.2, 1) }); });
  ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 0; x <= 1920; x += 20) ctx.lineTo(x, 130 + Math.sin(x * 0.02 + T) * 5); ctx.stroke();
  txt(ctx, 'MÁS HONDO', 260, 760, { s: 18, f: 'mono', w: 700, ls: 5, al: 'center', c: '#8fb4e0', a: 0.9 }); flecha(ctx, 260, 250, 260, 720, ss(e.tl, 0.4, 2), '#8fb4e0', 2);
  const R = rng(4); for (let i = 0; i < 14; i++) { const f = Math.pow(Math.max(0, Math.sin(T * (1.4 + R()) + R() * 9)), 10); dino(ctx, 420 + R() * 1200, 600 + R() * 260, 0.35 + R() * 0.3, R() * 6, f * en(e, 0, 1, 2), 0, i); }
  chip(ctx, '≈ 475 nm · EL AZUL DEL MAR', 1450, 760, { c: LUZC.dino, al: 'center', s: 28, a: ss(e.tl, 0.8, 1.8) });
  titulo(ctx, 'El azul es el que mejor viaja bajo el agua', 960, 880, en(e, 1, 0.9), { s: 46 });
};
// Coladera de drenaje y olas, para las reglas de "no se libera".
function coladera(ctx, x, y, s, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#1a2230'; ctx.strokeStyle = '#8a93a6'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(0, 0, 110, 0, TAU); ctx.fill(); ctx.stroke(); ctx.lineWidth = 9; ctx.lineCap = 'round'; for (let i = -2; i <= 2; i++) { const h = Math.sqrt(1 - Math.pow(i / 3, 2)) * 84; ctx.beginPath(); ctx.moveTo(i * 34, -h); ctx.lineTo(i * 34, h); ctx.stroke(); } ctx.restore(); }
function olas(ctx, x, y, s, T, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#5ab4ff'; ctx.lineWidth = 9; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; ctx.lineTo(-110 + u * 220, -50 + k * 50 + Math.sin(u * 12 + T * 2 + k) * 13); } ctx.stroke(); } ctx.restore(); }
function arbolito(ctx, x, y, s, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#6b4a2e'; ctx.fillRect(-12, 20, 24, 80); ctx.fillStyle = '#3f9a45'; ctx.beginPath(); ctx.arc(0, -30, 78, 0, TAU); ctx.fill(); ctx.fillStyle = '#56b45a'; ctx.beginPath(); ctx.arc(-26, -52, 38, 0, TAU); ctx.fill(); ctx.restore(); }
LUZ.cloro = (ctx, e) => {
  noche(ctx, '#05080d', '#090d15'); const T = e.T, fase2 = en(e, 2, 1);
  titulo(ctx, 'Una regla', 960, 200, ss(e.tl, 0.1, 0.9) * (1 - en(e, 1, 0.5)), { s: 80 });
  const a1 = en(e, 1, 0.8) * (1 - fase2);
  coladera(ctx, 640, 500, 1.5, a1); tache(ctx, 640, 500, 210, en(e, 1, 0.6, 1.2) * (1 - fase2)); txt(ctx, 'AL DRENAJE, NO', 640, 780, { s: 24, f: 'mono', w: 700, ls: 6, al: 'center', c: LUZC.rojo, a: a1 });
  olas(ctx, 1280, 500, 1.5, T, a1); tache(ctx, 1280, 500, 210, en(e, 1, 0.6, 1.8) * (1 - fase2)); txt(ctx, 'AL MAR, TAMPOCO', 1280, 780, { s: 24, f: 'mono', w: 700, ls: 6, al: 'center', c: LUZC.rojo, a: a1 });
  if (fase2 > 0) { const t2 = e.L(2) ?? 6, gota = pr(e.tl, t2 + 1.2, t2 + 2.2), muere = ss(e.tl, t2 + 2.2, t2 + 4);
    ctx.save(); ctx.globalAlpha = fase2; matrazAlgas(ctx, 1160, 800, 2.1, T, 0, 0.5 * (1 - muere), 1 - muere); ctx.restore();
    ctx.save(); ctx.translate(820, 400); ctx.rotate(0.9 * ss(e.tl, t2 + 0.5, t2 + 1.3)); botella(ctx, 0, 110, 1.2, fase2); ctx.restore();
    if (gota > 0 && gota < 1) { ctx.fillStyle = '#e9f3ff'; ctx.beginPath(); ctx.arc(1150, mixn(280, 600, gota), 9, 0, TAU); ctx.fill(); }
    chip(ctx, 'ANTES DE TIRARLAS: CLORO', 960, 170, { c: LUZC.oro, al: 'center', s: 28, a: fase2 }); txt(ctx, 'Lo que cultivas no se libera', 1560, 520, { s: 54, f: 'mano', w: 700, al: 'center', a: ss(e.tl, t2 + 4.2, t2 + 5) }); }
};
LUZ.v_alga = (ctx, e) => {
  noche(ctx, '#02060c', '#040b14'); const emp = Math.sin(e.tl * 12) * 0.1 * (Math.sin(e.tl * 1.1) > 0.3 ? 1 : 0);
  matrazAlgas(ctx, 580, 840, 2.4, e.T, emp, 0.25 + 0.75 * (Math.sin(e.tl * 1.1) > 0.1 ? 1 : 0));
  veredicto(ctx, e, 0, 'La más fácil,\nsegura y vistosa', 'Solo brillan cuando tú las mueves', LUZC.dino);
};

/* ====== 05 · Petunia ====== */
// Planta de tabaco (hojas grandes ovaladas), para el antecedente de 2020.
function tabaco(ctx, x, y, s, brillo, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#17301a'; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -230); ctx.stroke();
  for (let i = 0; i < 7; i++) { const yy = -30 - i * 30, d = i % 2 ? 1 : -1, l = 130 - i * 9; ctx.save(); ctx.translate(0, yy); ctx.rotate(d * (1.0 + i * 0.04)); ctx.fillStyle = '#16301a'; ctx.beginPath(); ctx.ellipse(0, -l / 2, l * 0.27, l / 2, 0, 0, TAU); ctx.fill(); if (brillo > 0.01) { ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = rgba(LUZC.pet, 0.35 * brillo); ctx.fill(); halo(ctx, 0, -l / 2, l * 0.6, LUZC.pet, 0.18 * brillo); } ctx.restore(); } ctx.restore(); }
LUZ.petunia = (ctx, e) => {
  const T = e.T, t6 = e.L(6) ?? 28;
  // día y noche: la frase 6 muestra que brilla siempre, pero solo se nota a oscuras
  let dia = 1 - ss(e.tl, (e.L(1) ?? 3) + 0.2, (e.L(1) ?? 3) + 2.2); if (e.tl > t6) dia = ss(e.tl, t6, t6 + 1) * (1 - ss(e.tl, t6 + 2.2, t6 + 3.4));
  const g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, mixc('#05080d', '#bcd9e6', dia)); g.addColorStop(1, mixc('#03050a', '#e9e2cf', dia)); ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080);
  ctx.fillStyle = mixc('#060708', '#b89a72', dia); ctx.fillRect(0, 820, 1920, 260);
  const gen = en(e, 3, 1) * (1 - en(e, 6, 0.8)), px = mixn(960, 640, ss(e.tl, (e.L(3) ?? 9) - 0.6, (e.L(3) ?? 9) + 1) * (1 - en(e, 6, 1)));
  const fin = cam(ctx, 1.0 + 0.05 * e.p, 960, 560); petunia(ctx, px, 830, 1.5, 1 - dia * 0.97, dia, T); halo(ctx, px, 480, 700, LUZC.pet, 0.12 * (1 - dia)); fin();
  rotulo(ctx, 150, 240, 'Firefly Petunia', 'DE LA EMPRESA LIGHT BIO', en(e, 2, 0.9) * (1 - en(e, 3, 0.5)), { c: LUZC.pet });
  // genes de hongos que brillan → planta
  if (gen > 0) { ctx.save(); ctx.globalAlpha = gen * (1 - en(e, 4, 0.6)); embudo(ctx, 1500, 640, 1.7, 'omph', 0.9, 0.08, 4); embudo(ctx, 1600, 650, 1.3, 'omph', 0.9, 0.08, 6); ctx.restore();
    for (let i = 0; i < 5 && en(e, 4, 0.6) < 1; i++) { const u = (e.tl * 0.35 + i / 5) % 1, x = mixn(1440, px + 180, u), y = 500 - Math.sin(u * Math.PI) * 150; ctx.save(); ctx.globalAlpha = gen * Math.sin(u * Math.PI); ctx.fillStyle = LUZC.pet; ctx.beginPath(); ctx.roundRect(x - 22, y - 9, 44, 18, 5); ctx.fill(); ctx.restore(); halo(ctx, x, y, 44, LUZC.pet, 0.5 * gen * Math.sin(u * Math.PI)); }
    txt(ctx, 'GENES DE HONGOS QUE BRILLAN', 1250, 280, { s: 22, f: 'mono', w: 700, ls: 5, al: 'center', c: LUZC.pet, a: gen * (1 - en(e, 4, 0.5)) });
    const a4 = en(e, 4, 0.9) * (1 - en(e, 5, 0.6)); tabaco(ctx, 1420, 820, 1.7, a4 * 0.55, a4 * gen); chip(ctx, '2020 · EXPERIMENTO EN TABACO', 1300, 200, { c: LUZC.oro, al: 'center', a: a4 }); rico(ctx, 'con genes del hongo *Neonothopanus nambi*', 1300, 262, { s: 32, al: 'center', a: a4 });
    const a5 = en(e, 5, 0.9); molecula(ctx, 1180, 420, 1.2, '#e9e2c9', 1, a5 * gen, 0); rico(ctx, 'Ácido cafeico', 1180, 540, { s: 40, f: 'serif', w: 500, al: 'center', a: a5 * gen }); txt(ctx, 'LAS PLANTAS YA LO TIENEN', 1180, 580, { s: 18, f: 'mono', w: 700, ls: 4, al: 'center', c: LUZC.pet, a: a5 * gen }); flecha(ctx, 1040, 440, px + 230, 470, a5 * gen, LUZC.pet); }
  chip(ctx, dia > 0.5 ? 'DE DÍA TAMBIÉN BRILLA: NO SE NOTA' : 'A OSCURAS: SE NOTA', 960, 180, { c: dia > 0.5 ? '#5a6a8a' : LUZC.pet, al: 'center', s: 26, a: en(e, 6, 0.6) * (1 - en(e, 7, 0.5)) });
  if (en(e, 7) > 0) { const a7 = en(e, 7, 0.9); halo(ctx, 1500, 260, 300, '#cfe0ff', 0.5 * a7); ctx.save(); ctx.globalAlpha = a7; ctx.fillStyle = '#eef3ff'; ctx.beginPath(); ctx.arc(1500, 260, 60, 0, TAU); ctx.fill(); ctx.restore(); txt(ctx, '«como la luz de la luna»', 1500, 430, { s: 54, f: 'mano', w: 700, al: 'center', a: a7 }); chip(ctx, 'LO DICE LA EMPRESA · NO ES UNA MEDICIÓN', 1500, 500, { c: LUZC.oro, al: 'center', a: en(e, 7, 0.8, 1.6) }); }
};
LUZ.usda = (ctx, e) => {
  noche(ctx, '#06080c', '#0a0d14'); const T = e.T;
  ctx.save(); ctx.translate(0, (1 - eo(e.tl, 0, 1.2)) * 60); documento(ctx, 520, 520, 1.45, ss(e.tl, 0, 0.9), 9, pr(e.tl, 0.8, 9)); ctx.restore();
  chip(ctx, 'USDA-APHIS · 1 DE SEPTIEMBRE DE 2023', 520, 150, { c: LUZC.oro, al: 'center', a: ss(e.tl, 0.6, 1.4) });
  txt(ctx, 'DEPARTAMENTO DE AGRICULTURA DE ESTADOS UNIDOS (USDA)', 520, 904, { s: 15, f: 'mono', w: 700, ls: 2, al: 'center', c: '#8fa0bd', a: ss(e.tl, 1, 2) });
  // la conclusión: mismo riesgo de plaga que una petunia normal
  const a = ss(e.tl, 5.2, 6.4); ctx.save(); ctx.globalAlpha = a; petunia(ctx, 1160, 600, 0.72, 0, 1, T); petunia(ctx, 1600, 600, 0.72, 0.9, 0.12, T); ctx.restore();
  txt(ctx, '=', 1380, 440, { s: 120, f: 'serif', w: 400, al: 'center', a: ss(e.tl, 6.4, 7.2) });
  txt(ctx, 'PETUNIA NORMAL', 1160, 660, { s: 18, f: 'mono', w: 700, ls: 4, al: 'center', c: '#c9d2e3', a }); txt(ctx, 'FIREFLY PETUNIA', 1600, 660, { s: 18, f: 'mono', w: 700, ls: 4, al: 'center', c: LUZC.pet, a });
  rico(ctx, 'Mismo riesgo de plaga', 1380, 760, { s: 54, f: 'serif', w: 500, al: 'center', a: ss(e.tl, 7, 8) });
  txt(ctx, 'NO LE APLICA EL REGLAMENTO DE ORGANISMOS', 1380, 812, { s: 19, f: 'mono', w: 700, ls: 3, al: 'center', c: LUZC.oro, a: ss(e.tl, 10.5, 11.5) }); txt(ctx, 'MODIFICADOS GENÉTICAMENTE (EN ESTADOS UNIDOS)', 1380, 842, { s: 19, f: 'mono', w: 700, ls: 3, al: 'center', c: LUZC.oro, a: ss(e.tl, 10.5, 11.5) });
};
LUZ.frontera = (ctx, e) => {
  noche(ctx, '#05070b', '#090c13'); const T = e.T, bx = 960;
  ctx.fillStyle = '#0a1420'; ctx.fillRect(0, 0, bx, 1080); ctx.fillStyle = '#0d1410'; ctx.fillRect(bx, 0, 960, 1080);
  ctx.save(); ctx.strokeStyle = 'rgba(240,240,240,.7)'; ctx.lineWidth = 5; ctx.setLineDash([26, 18]); ctx.lineDashOffset = -T * 12; ctx.beginPath(); ctx.moveTo(bx, 110); ctx.lineTo(bx, 900); ctx.stroke(); ctx.restore();
  txt(ctx, 'ESTADOS UNIDOS', 480, 200, { s: 30, f: 'mono', w: 700, ls: 10, al: 'center', c: '#9fb8e0', a: ss(e.tl, 0.2, 1) }); txt(ctx, 'MÉXICO', 1440, 200, { s: 30, f: 'mono', w: 700, ls: 10, al: 'center', c: '#9fe0a8', a: ss(e.tl, 0.2, 1) });
  txt(ctx, '?', 1440, 560, { s: 300, f: 'serif', w: 400, al: 'center', c: '#9fe0a8', a: ss(e.tl, 0.4, 1.2) * (1 - en(e, 2, 0.6)) * 0.5 });
  const viaja = en(e, 3, 2.4), mx = mixn(430, 900, eo(e.tl, e.L(3) ?? 19.5, (e.L(3) ?? 19.5) + 2.2));
  ctx.save(); ctx.globalAlpha = 1 - 0.0; petunia(ctx, viaja > 0 ? mx : 430, 700, 0.8, 0.9, 0.1, T); ctx.restore();
  chip(ctx, 'SOLO SE VENDE DENTRO DE ESTADOS UNIDOS', 480, 800, { c: LUZC.oro, al: 'center', a: en(e, 1, 0.8) * (1 - viaja) });
  const a2 = en(e, 2, 0.9); ctx.save(); ctx.translate(1440, 520); documento(ctx, 0, 0, 0.9, a2, 7, pr(e.tl, (e.L(2) ?? 6.6) + 0.5, (e.L(2) ?? 6.6) + 6)); ctx.restore(); sello(ctx, 'PERMISO', 1440, 600, en(e, 2, 0.5, 2.4), '#3DFF7A', -0.12, 40);
  txt(ctx, 'LEY DE BIOSEGURIDAD DE ORGANISMOS', 1440, 800, { s: 19, f: 'mono', w: 700, ls: 3, al: 'center', c: '#9fe0a8', a: en(e, 2, 0.8, 3) }); txt(ctx, 'GENÉTICAMENTE MODIFICADOS', 1440, 830, { s: 19, f: 'mono', w: 700, ls: 3, al: 'center', c: '#9fe0a8', a: en(e, 2, 0.8, 3) });
  txt(ctx, 'ORGANISMO VIVO MODIFICADO · PARA LIBERARLO AL AMBIENTE', 1440, 868, { s: 15, f: 'mono', w: 700, ls: 2, al: 'center', c: '#8fa0bd', a: en(e, 2, 0.8, 5) });
  if (viaja > 0) { maleta(ctx, mx, 780, 1.1, viaja); tache(ctx, 900, 640, 190, en(e, 3, 0.6, 2.2)); }
};
LUZ.v_pet = (ctx, e) => { noche(ctx, '#05090a', '#08100c'); petunia(ctx, 620, 840, 1.45, 0.95, 0.03, e.T); halo(ctx, 620, 480, 640, LUZC.pet, 0.12); veredicto(ctx, e, 2, 'Hermosa idea.\nEn México,\npor ahora, no', null, LUZC.pet); };

/* ====== 06 · Luciérnagas ====== */
LUZ.luci = (ctx, e) => {
  noche(ctx, '#05080a', '#090d0c'); const T = e.T, pat = (t) => Math.pow(Math.max(0, Math.sin(t * 1.6)), 5);
  const fl = pat(e.tl), mueve = en(e, 2, 1.2), x = mixn(960, 560, Math.max(en(e, 1, 1.2), 0)), fin = cam(ctx, 1 + 0.05 * e.p, 960, 540);
  luciernaga(ctx, x, 470, 2.5, 0.25 + Math.sin(T * 0.6) * 0.04, fl, 0); fin();
  rotulo(ctx, 1000, 330, '*Photinus pyralis*', 'LUCIÉRNAGA COMÚN DE NORTEAMÉRICA', en(e, 1, 0.9) * (1 - mueve), { c: LUZC.luc });
  chip(ctx, '≈ 557 nm · AMARILLO VERDOSA', 1010, 470, { c: LUZC.luc, s: 28, a: en(e, 1, 0.8, 2.6) * (1 - mueve) });
  // eficiencia: de 10 reacciones, unas 4 dan un fotón (medido en laboratorio)
  if (mueve > 0) { const t2 = e.L(2) ?? 12; for (let i = 0; i < 10; i++) { const k = ss(e.tl, t2 + 0.8 + i * 0.25, t2 + 1.3 + i * 0.25), da = i < 4, x0 = 1010 + i * 78, luce = da ? ss(e.tl, t2 + 4 + i * 0.3, t2 + 4.6 + i * 0.3) : 0;
      ctx.save(); ctx.globalAlpha = k * mueve; ctx.strokeStyle = 'rgba(220,230,250,.6)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x0, 470, 26, 0, TAU); ctx.stroke(); ctx.fillStyle = da ? rgba(LUZC.luc, 0.15 + 0.85 * luce) : 'rgba(120,130,150,.18)'; ctx.fill(); ctx.restore(); if (luce > 0) halo(ctx, x0, 470, 80, LUZC.luc, 0.8 * luce); }
    txt(ctx, '≈ 4 de cada 10', 1360, 330, { s: 84, f: 'serif', w: 500, al: 'center', a: ss(e.tl, t2 + 4.4, t2 + 5.4) }); txt(ctx, 'REACCIONES DAN UN FOTÓN', 1360, 600, { s: 22, f: 'mono', w: 700, ls: 6, al: 'center', c: LUZC.luc, a: ss(e.tl, t2 + 4.8, t2 + 5.8) }); chip(ctx, 'MEDIDO EN LABORATORIO', 1360, 670, { c: LUZC.oro, al: 'center', a: ss(e.tl, t2 + 5.4, t2 + 6.2) }); }
};
// Larva de luciérnaga (alargada, con placas) y caracol.
function larva(ctx, x, y, s, T, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < 11; i++) { const w = 26 - Math.abs(i - 4) * 2.2, px = i * 21, py = Math.sin(T * 3 + i * 0.7) * 3; ctx.fillStyle = '#4a3a2c'; ctx.beginPath(); ctx.ellipse(px, py, 13, w, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#8a6e52'; ctx.beginPath(); ctx.ellipse(px, py - w * 0.3, 9, w * 0.5, 0, 0, TAU); ctx.fill(); } halo(ctx, 205, 0, 50, LUZC.luc, 0.5 + 0.3 * Math.sin(T * 2)); ctx.fillStyle = '#18120e'; ctx.beginPath(); ctx.ellipse(-16, 0, 12, 10, 0, 0, TAU); ctx.fill(); ctx.restore(); }
function caracol(ctx, x, y, s, a = 1) { ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#8a7a5a'; ctx.beginPath(); ctx.roundRect(-90, 10, 170, 30, 15); ctx.fill(); ctx.strokeStyle = '#8a7a5a'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-80, 14); ctx.lineTo(-104, -22); ctx.moveTo(-66, 14); ctx.lineTo(-76, -26); ctx.stroke(); ctx.fillStyle = '#b08a4a'; ctx.beginPath(); ctx.arc(20, -20, 56, 0, TAU); ctx.fill(); ctx.strokeStyle = '#6b4f24'; ctx.lineWidth = 5; ctx.beginPath(); for (let i = 0; i < 60; i++) { const an = i * 0.26, rr = 52 - i * 0.82; ctx.lineTo(20 + Math.cos(an) * rr, -20 + Math.sin(an) * rr); } ctx.stroke(); ctx.restore(); }
LUZ.ciclo = (ctx, e) => {
  noche(ctx, '#05070a', '#090b0e'); const T = e.T, p1 = 1 - en(e, 2, 0.8), suelo = en(e, 3, 1.2), fin5 = en(e, 5, 1);
  // 1) el frasco: no
  if (p1 > 0) { ctx.save(); ctx.globalAlpha = p1; luciernaga(ctx, 960, 560, 1.1, 0.5, Math.pow(Math.max(0, Math.sin(T * 1.6)), 5) * 0.5, 0); frasco(ctx, 960, 740, 330, 400); ctx.restore(); tache(ctx, 960, 540, 270, ss(e.tl, 0.8, 1.5) * p1); }
  // 2) la línea de la vida: casi toda es larva
  const a2 = en(e, 2, 0.9) * (1 - 0.0); ctx.save(); ctx.globalAlpha = a2 * (1 - 0.6 * fin5);
  const x0 = 260, x1 = 1660, y = 250, corte = mixn(x0, x1, 0.92), av = eo(e.tl, e.L(2) ?? 5, (e.L(2) ?? 5) + 2.4);
  ctx.fillStyle = '#5a4630'; ctx.beginPath(); ctx.roundRect(x0, y - 16, (corte - x0) * Math.min(1, av / 0.92), 32, 16); ctx.fill(); if (av > 0.92) { ctx.fillStyle = LUZC.luc; ctx.beginPath(); ctx.roundRect(corte + 6, y - 16, (x1 - corte - 6) * (av - 0.92) / 0.08, 32, 16); ctx.fill(); } ctx.restore();
  txt(ctx, 'LARVA · HASTA 2 AÑOS', mixn(x0, corte, 0.5), y + 70, { s: 24, f: 'mono', w: 700, ls: 5, al: 'center', c: '#c9a878', a: en(e, 3, 0.8) * (1 - 0.6 * fin5) });
  txt(ctx, 'ADULTO', x1 - 40, y - 44, { s: 24, f: 'mono', w: 700, ls: 5, al: 'center', c: LUZC.luc, a: a2 * ss(av, 0.92, 1) * (1 - 0.6 * fin5) }); txt(ctx, 'POCAS SEMANAS', x1 - 40, y + 70, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: LUZC.luc, a: a2 * ss(av, 0.92, 1) * (1 - 0.6 * fin5) });
  if (a2 > 0 && av >= 1) luciernaga(ctx, x1 + 110, y - 6 + Math.sin(T * 2) * 8, 0.5, 0.4, Math.pow(Math.max(0, Math.sin(T * 1.6)), 5) * a2 * (1 - fin5), 0.8);
  // 3) bajo la hojarasca: la larva cazadora
  if (suelo > 0) { ctx.save(); ctx.globalAlpha = suelo * (1 - fin5); ctx.fillStyle = '#1a140e'; ctx.fillRect(0, 640, 1920, 440); const R = rng(14); for (let i = 0; i < 70; i++) { ctx.save(); ctx.translate(R() * 1920, 610 + R() * 70); ctx.rotate(R() * 3); ctx.fillStyle = ['#4a3418', '#5a3f1c', '#3a2a14', '#6b4a22'][i % 4]; ctx.beginPath(); ctx.ellipse(0, 0, 46 + R() * 30, 14 + R() * 8, 0, 0, TAU); ctx.fill(); ctx.restore(); } ctx.restore();
    const caza = en(e, 4, 1), lx = mixn(360, 900, eo(e.tl, e.L(3) ?? 10, (e.L(4) ?? 16) + 3)); larva(ctx, lx, 770, 2.2, T, suelo * (1 - fin5)); caracol(ctx, 1480, 790, 1.7, caza * (1 - fin5));
    rotulo(ctx, 240, 560, 'Larva', 'CAZADORA: CARACOLES, BABOSAS Y LOMBRICES', caza * (1 - fin5), { c: LUZC.luc, s: 40 }); }
  if (fin5 > 0) { oscurece(ctx, 0.5 * fin5); titulo(ctx, 'En tu cuarto no cabe esa vida', 960, 560, fin5, { s: 76 }); }
};
LUZ.amenazas = (ctx, e) => {
  noche(ctx, '#05080a', '#080c0b'); const T = e.T, t2 = e.L(2) ?? 9;
  // luciérnagas al fondo: se van apagando con cada amenaza
  const quedan = 1 - 0.28 * en(e, 2, 0.6, 0.2) - 0.28 * en(e, 2, 0.6, 2) - 0.28 * en(e, 2, 0.6, 3.8); const R = rng(23);
  for (let i = 0; i < 70; i++) { const x = R() * 1920, y = 120 + R() * 760, f = Math.pow(Math.max(0, Math.sin(T * (0.8 + R()) + R() * 9)), 8); if (i / 70 < quedan) halo(ctx, x + Math.sin(T * 0.3 + i) * 20, y, 26, LUZC.luc, f * 0.9); }
  titulo(ctx, '¿Qué las amenaza más?', 960, 200, en(e, 1, 0.9), { s: 72 }); chip(ctx, 'ESTUDIO DE 2020 · ESPECIALISTAS DE TODO EL MUNDO', 960, 280, { c: LUZC.oro, al: 'center', a: en(e, 1, 0.8, 1.4) });
  const A = [ss(e.tl, t2 + 0.2, t2 + 1), ss(e.tl, t2 + 2, t2 + 2.8), ss(e.tl, t2 + 3.8, t2 + 4.6)];
  // tocón: pérdida de hábitat
  ctx.save(); ctx.globalAlpha = A[0]; ctx.fillStyle = '#5a4630'; ctx.beginPath(); ctx.roundRect(350, 520, 180, 120, 10); ctx.fill(); ctx.fillStyle = '#c9a878'; ctx.beginPath(); ctx.ellipse(440, 520, 90, 24, 0, 0, TAU); ctx.fill(); ctx.strokeStyle = '#8a6a44'; ctx.lineWidth = 2; for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.ellipse(440, 520, 22 * i, 6 * i, 0, 0, TAU); ctx.stroke(); } ctx.restore();
  // farol: luz artificial de noche
  ctx.save(); ctx.globalAlpha = A[1]; ctx.strokeStyle = '#8a93a6'; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(960, 650); ctx.lineTo(960, 430); ctx.quadraticCurveTo(960, 390, 1010, 390); ctx.stroke(); ctx.fillStyle = '#fff7dc'; ctx.beginPath(); ctx.ellipse(1022, 400, 30, 14, 0, 0, TAU); ctx.fill(); ctx.restore(); halo(ctx, 1022, 420, 330, '#fff2c0', 0.6 * A[1]);
  // aspersor: pesticidas
  ctx.save(); ctx.globalAlpha = A[2]; ctx.fillStyle = '#c9d2e3'; ctx.beginPath(); ctx.roundRect(1430, 480, 90, 170, 14); ctx.fill(); ctx.fillStyle = '#d8584a'; ctx.fillRect(1448, 440, 54, 44); ctx.fillRect(1500, 448, 40, 14); const Rp = rng(5); ctx.fillStyle = 'rgba(200,255,160,.7)'; for (let i = 0; i < 40; i++) { const u = (T * 0.5 + Rp()) % 1; ctx.fillRect(1545 + u * 160, 455 + (Rp() - 0.5) * u * 130, 4, 4); } ctx.restore();
  [['PERDER SU HÁBITAT', 440], ['LUZ ARTIFICIAL DE NOCHE', 960], ['PESTICIDAS', 1480]].forEach(([n, x], i) => txt(ctx, n, x, 740, { s: 24, f: 'mono', w: 700, ls: 5, al: 'center', c: LUZC.rojo, a: A[i] }));
};
// Bosque de oyamel de noche con luciérnagas.
function bosque(ctx, T, cuantas, seed = 3) {
  const g = ctx.createLinearGradient(0, 0, 0, 1080); g.addColorStop(0, '#060c14'); g.addColorStop(1, '#03060a'); ctx.fillStyle = g; ctx.fillRect(0, 0, 1920, 1080); estrellas(ctx, 90, 4, T, 0.8, 420);
  const R = rng(seed); for (let k = 0; k < 3; k++) { const c = ['#0a1410', '#07100c', '#040907'][k]; for (let i = 0; i < 16; i++) abeto(ctx, R() * 2000 - 40, 760 + k * 90, 420 + R() * 300 + k * 60, c); if (k === 1) { const Rf = rng(seed + 9); for (let i = 0; i < cuantas * 0.5; i++) { const f = Math.pow(Math.max(0, Math.sin(T * (0.9 + Rf() * 0.8) + Rf() * 20)), 9); halo(ctx, Rf() * 1920 + Math.sin(T * 0.4 + i) * 30, 420 + Rf() * 380 + Math.cos(T * 0.5 + i) * 16, 18, LUZC.luc, f); } } }
  ctx.fillStyle = '#030605'; ctx.fillRect(0, 900, 1920, 180);
  const Rf = rng(seed + 20); for (let i = 0; i < cuantas * 0.5; i++) { const f = Math.pow(Math.max(0, Math.sin(T * (0.9 + Rf() * 0.9) + Rf() * 20)), 8); halo(ctx, Rf() * 1920 + Math.sin(T * 0.5 + i) * 40, 380 + Rf() * 520 + Math.cos(T * 0.6 + i * 2) * 22, 30, LUZC.luc, f); }
}
LUZ.nana = (ctx, e) => {
  const fin = cam(ctx, 1.0 + 0.08 * e.p, 960, 560); bosque(ctx, e.T, mixn(60, 420, ss(e.tl, 0, (e.L(1) ?? 3) + 3)), 3);
  // visitantes sin luces, con guía
  const av = en(e, 2, 1.2); ctx.save(); ctx.globalAlpha = av; ctx.fillStyle = '#010302'; for (let i = 0; i < 6; i++) { const x = 760 + i * 74, h = 150 + (i % 3) * 22; ctx.beginPath(); ctx.arc(x, 920 - h, 20, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.roundRect(x - 24, 920 - h + 20, 48, h, 18); ctx.fill(); } ctx.restore(); fin();
  rotulo(ctx, 150, 240, '*Photinus palaciosi*', 'NANACAMILPA, TLAXCALA · CADA VERANO', en(e, 1, 0.9), { c: LUZC.luc });
  ['CENTRO AUTORIZADO', 'SEGUIR SUS REGLAS', 'SIN LUCES', 'SIN ATRAPAR'].forEach((s, i) => chip(ctx, s, 1740, 200 + i * 62, { c: LUZC.oro, al: 'right', a: en(e, 2, 0.6, 1.2 + i * 1.2) }));
};
LUZ.v_luci = (ctx, e) => { bosque(ctx, e.T, 320, 7); oscurece(ctx, 0.25); veredicto(ctx, e, 2, 'No se tiene.\nSe visita', null, LUZC.luc); };

/* ====== 07 · Resumen ====== */
LUZ.escalera = (ctx, e) => {
  noche(ctx, '#04060b', '#080c16'); const T = e.T;
  const P = [['alga', 'Algas *Pyrocystis*', 'FÁCILES Y SEGURAS · BRILLAN AL MOVERLAS', LUZC.dino, 0], ['hongo', 'Hongo *Panellus*', 'LUZ SUAVE Y CONTINUA · PIDE PACIENCIA', LUZC.pan, 0], ['bact', 'Bacterias *Aliivibrio fischeri*', 'CEPA IDENTIFICADA · MICROBIOLOGÍA EN SERIO', LUZC.bact, 1], ['petunia', 'La petunia', 'EN MÉXICO, POR AHORA, NO', LUZC.pet, 2], ['luci', 'Luciérnagas', 'NUNCA EN UN FRASCO', LUZC.luc, 2]];
  txt(ctx, 'DE MÁS FÁCIL A MÁS DIFÍCIL', 960, 150, { s: 22, f: 'mono', w: 700, ls: 10, al: 'center', c: '#c9d2e3', a: ss(e.tl, 0.3, 1.2) });
  P.forEach(([k, n, s, c, niv], i) => { const a = en(e, i + 1, 0.9), y = 250 + i * 122, x = 200 + i * 46, act = a * (1 - 0.45 * en(e, i + 2, 0.6));
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(255,255,255,.035)'; ctx.beginPath(); ctx.roundRect(x, y - 50, 1180, 104, 18); ctx.fill(); ctx.fillStyle = c; ctx.fillRect(x, y - 50, 5, 104 * a); ctx.restore();
    txt(ctx, String(i + 1), x + 60, y + 22, { s: 70, f: 'serif', w: 400, al: 'center', c, a });
    ctx.save(); ctx.globalAlpha = a; emblema(ctx, k, x + 200, y - 20 - (k === 'petunia' ? 16 : 0), 0.64, act, T); ctx.restore();
    rico(ctx, n, x + 320, y - 2, { s: 42, f: 'serif', w: 500, a }); txt(ctx, s, x + 320, y + 32, { s: 18, f: 'mono', w: 700, ls: 3, c, a: a * 0.95 });
    const cc = ['#3DFF7A', '#F4C25A', '#FF5A4A'][niv]; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = cc; ctx.beginPath(); ctx.arc(x + 1130, y, 13, 0, TAU); ctx.fill(); ctx.restore(); halo(ctx, x + 1130, y, 50, cc, 0.6 * a); });
};
LUZ.regla = (ctx, e) => {
  noche(ctx, '#05070b', '#090c13'); const T = e.T;
  titulo(ctx, 'Una regla para todas', 960, 210, ss(e.tl, 0.1, 0.9), { s: 76 });
  const a = en(e, 1, 0.8), it = [['AL JARDÍN', 480, (x) => arbolito(ctx, x, 500, 1.3, a)], ['AL DRENAJE', 960, (x) => coladera(ctx, x, 500, 1.15, a)], ['AL MAR', 1440, (x) => olas(ctx, x, 500, 1.2, T, a)]];
  it.forEach(([n, x, f], i) => { f(x); tache(ctx, x, 500, 170, en(e, 1, 0.5, 1.2 + i * 0.9)); txt(ctx, 'NI ' + n, x, 730, { s: 24, f: 'mono', w: 700, ls: 6, al: 'center', c: LUZC.rojo, a: en(e, 1, 0.5, 1.2 + i * 0.9) }); });
  if (en(e, 2) > 0) { oscurece(ctx, 0.72 * en(e, 2, 0.8)); titulo(ctx, 'Lo que nace en tu cuarto,', 960, 480, en(e, 2, 0.9), { s: 84 }); titulo(ctx, 'termina en tu cuarto.', 960, 590, en(e, 2, 0.9, 0.7), { s: 84, c: LUZC.oro }); }
};

/* ====== 08 · Cierre ====== */
LUZ.cierre = (ctx, e) => {
  const T = e.T, fuera = en(e, 6, 2.2), z = mixn(1.9, 1.0, fuera) + 0.04 * e.p, fin = cam(ctx, z, mixn(1110, 960, fuera), mixn(585, 540, fuera));
  recamara(ctx, T, 0.95, 0, 0.25 + 0.5 * fuera); fin();
  // lupa 1: la luz del hongo por dentro (hifas)
  const l1 = en(e, 1, 1) * (1 - fuera); if (l1 > 0) { const x = 520, y = 470, r = 250; guia(ctx, 880, 540, x + r * 0.8, y + r * 0.3, l1, LUZC.pan); ctx.save(); ctx.globalAlpha = l1; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = '#040806'; ctx.fill(); ctx.save(); ctx.clip(); ctx.translate(x, y); pintaRed(ctx, red('cie', { seed: 91, radio: 260, brotes: 8, max: 7000 }), eo(e.tl, e.L(1) ?? 3, (e.L(1) ?? 3) + 5), LUZC.pan, {}); ctx.restore(); ctx.strokeStyle = 'rgba(220,235,255,.8)'; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); chip(ctx, 'UNA REACCIÓN DE HACE MILLONES DE AÑOS', x, y + r + 46, { c: LUZC.pan, al: 'center', a: l1 }); }
  // lupa 2: las bacterias que se prenden juntas
  const l2 = en(e, 2, 1) * (1 - fuera); if (l2 > 0) { const x = 1500, y = 440, r = 250, t4 = e.L(4) ?? 14.4, tq = (e.L(5) ?? 18) + 1.6, n = 4 + 150 * Math.pow(ss(e.tl, t4, tq), 2), pr2 = ss(e.tl, tq, tq + 0.8);
    ctx.save(); ctx.globalAlpha = l2; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = '#03090d'; ctx.fill(); ctx.save(); ctx.clip(); enjambre(ctx, T, n, 0.05 + 0.95 * pr2, ss(e.tl, t4, tq), { x: x - r, y: y - r, w: r * 2, h: r * 2, len: 24, seed: 31 }); ctx.restore(); ctx.strokeStyle = 'rgba(220,235,255,.8)'; ctx.lineWidth = 5; ctx.stroke(); ctx.restore(); halo(ctx, x, y, 420, LUZC.bact, 0.3 * pr2 * l2);
    chip(ctx, 'UNA DECISIÓN EN EQUIPO', x, y + r + 46, { c: LUZC.bact, al: 'center', a: l2 * en(e, 3, 0.8) }); }
};
