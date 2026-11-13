// cine-luz-b.jsx — Documental 003 (contaminantes del cultivo de hongos), capítulos 5 a 8.
// Usa las piezas de cine-luz-a.jsx (window.K3). Cada escena: LUZ.id = (ctx, e) => …
const { TAU, cl, pr, ss, eo, mixn, rng, rgba, LUZC, halo, noche, polvo, cam, oscurece, txt, rico, chip, rotulo, guia, titulo, sello, tache, flecha,
  red, pintaRed, petri, frasco, bacteria, termometro } = window.LZK;
const { en, esquema, CO, micelio, polvoMoho, algodon, tubo, aspergilo, esporangio, bacilo, acaro, mosca, larva, nematodo, ostra, champi, frascoGrano, bolsa, olla, gota, duelo, emblema, sombrero } = window.K3;
const LUZ = window.LUZ;
// mixc propio: regresa #rrggbb (el del kit regresa rgb(), que no se puede volver a mezclar ni pasar a rgba()).
const mixc = (a, b, t) => { const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16), k = t < 0 ? 0 : t > 1 ? 1 : t, m = (s) => Math.round(((A >> s) & 255) + (((B >> s) & 255) - ((A >> s) & 255)) * k); return '#' + ((1 << 24) | (m(16) << 16) | (m(8) << 8) | m(0)).toString(16).slice(1); };

/* ====== 05 · Los que caminan y vuelan ====== */
LUZ.acaros = (ctx, e) => {
  noche(ctx, '#0b0907', '#15100b'); const T = e.T, a1 = en(e, 1, 0.8), a2 = en(e, 2, 0.9);
  // entra caminando; luego se queda al centro para contarle las patas
  const u = eo(e.tl, 0.2, 4.5), x = mixn(-260, 600, u), camina = e.tl < 4.6 ? T : T * 0.25;
  acaro(ctx, x, 590 + Math.sin(T * 3) * 4 * (1 - u), 2.6, 0, camina, '#d8b58c', a1);
  const uf = eo(e.tl, 1, 4.5); ctx.save(); ctx.globalAlpha = 1 - en(e, 1, 0.8); mosca(ctx, mixn(2100, 1300, uf), 300 + Math.sin(T * 4) * 20, 2.4, 'sci', T, -1, 1); ctx.restore();
  rotulo(ctx, 130, 250, 'Ácaros', 'ARÁCNIDOS · OCHO PATAS DE ADULTOS', a1, { c: '#e0b08a' });
  if (a2 > 0) { ctx.save(); ctx.globalAlpha = a2; ctx.fillStyle = '#0a0d12'; ctx.strokeStyle = 'rgba(200,220,245,.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1400, 500, 290, 0, TAU); ctx.fill(); ctx.stroke(); ctx.clip();
    const come = en(e, 3, 5); micelio(ctx, 'acM', 1400, 500, 1, CO.mic, { seed: 61, radio: 280, max: 5000, a: 0.9 - 0.5 * come });
    const R = rng(5); for (let i = 0; i < 9; i++) { const an = R() * TAU + T * 0.12 * (i % 2 ? 1 : -1), d = 60 + R() * 190; const px = 1400 + Math.cos(an) * d, py = 500 + Math.sin(an) * d; if (come > 0) { ctx.fillStyle = `rgba(10,13,18,${0.8 * come})`; ctx.beginPath(); ctx.arc(px, py, 46, 0, TAU); ctx.fill(); } acaro(ctx, px, py, 0.36, an + Math.PI / 2, T, '#e9dcc0'); }
    ctx.restore();
    chip(ctx, 'TARSONÉMIDOS: NO SE VEN A SIMPLE VISTA', 1400, 160, { al: 'center', a: a2, s: 20, c: '#e9dcc0' }); chip(ctx, 'COMEN MICELIO Y HONGOS', 1400, 840, { al: 'center', a: en(e, 3, 0.8), s: 22, c: LUZC.rojo }); }
  esquema(ctx, a1);
};
LUZ.pimienta = (ctx, e) => {
  noche(ctx, '#0a0807', '#140e0b'); const T = e.T, a1 = en(e, 1, 0.9), a2 = en(e, 2, 0.9);
  ctx.fillStyle = '#2a1e14'; ctx.beginPath(); ctx.roundRect(100, 560, 860, 320, 20); ctx.fill();
  polvoMoho(ctx, 520, 690, 190, CO.tri, 1.2, 7, 900); algodon(ctx, 520, 690, 230, '#ffffff', 1, 3, 0.6, 30);
  const R = rng(9); for (let i = 0; i < 44; i++) { const an = R() * TAU + T * (0.1 + R() * 0.2) * (i % 2 ? 1 : -1), d = 30 + R() * 170, sale = a2 * R() * 520; const px = 520 + Math.cos(an) * (d + sale), py = 690 + Math.sin(an) * (d * 0.6 + sale * 0.25); if (py > 870 || px < 110) continue; acaro(ctx, px, py, 0.2, an + Math.PI / 2, T, '#b8452e'); if (a2 > 0 && i % 3 === 0) polvoMoho(ctx, px, py, 26, CO.tri, a2, i, 26, a2); }
  rotulo(ctx, 130, 280, 'Ácaros «pimienta roja»', 'COMEN MOHO: *Trichoderma* Y *Penicillium*', ss(e.tl, 0.3, 1.1), { c: '#e0704a', s: 44 });
  if (a1 > 0) { ctx.save(); ctx.globalAlpha = a1; sombrero(ctx, 1420, 520, 0.72, 0, 0); ctx.restore(); const R2 = rng(4); for (let i = 0; i < 260; i++) { const an = R2() * TAU + Math.sin(T * 0.6 + i) * 0.2, d = Math.sqrt(R2()) * 170 + Math.sin(T * 1.3 + i * 2) * 8; ctx.fillStyle = `rgba(${150 + R2() * 50},${60 + R2() * 30},40,${a1})`; ctx.beginPath(); ctx.arc(1420 + Math.cos(an) * d + 20 * Math.sin(T * 0.4), 510 + Math.sin(an) * d * 0.8, 2.6, 0, TAU); ctx.fill(); }
    chip(ctx, 'POLVITO CAFÉ ROJIZO QUE SE MUEVE', 1420, 800, { al: 'center', a: a1, s: 20, c: '#e0704a' }); }
  chip(ctx, 'SEÑAL DE MOHO · Y LO REPARTEN', 520, 500, { al: 'center', a: a2, s: 22, c: CO.tri });
};
LUZ.aventon = (ctx, e) => {
  noche(ctx, '#080a0d', '#0e1218'); const T = e.T, n = Math.round(20 * ss(e.tl, e.L(1), e.L(1) + 2.6));
  const fx = 640 + Math.sin(T * 0.9) * 30, fy = 470 + Math.sin(T * 2.2) * 16; mosca(ctx, fx, fy, 5.2, 'sci', T, 1, 1);
  const R = rng(3); for (let i = 0; i < 20; i++) { const px = fx - 360 + R() * 440, py = fy - 30 + R() * 90, r = R() * 6; if (i >= n) continue; acaro(ctx, px, py, 0.26, r, T * 0.2, '#e0b08a'); }
  txt(ctx, 'DE AVENTÓN', 130, 250, { s: 26, f: 'mono', w: 700, ls: 8, c: LUZC.oro, a: ss(e.tl, 0.3, 1) });
  txt(ctx, String(n), 1260, 720, { s: 260, f: 'serif', w: 500, al: 'center', a: en(e, 1, 0.5) }); txt(ctx, 'ÁCAROS EN UNA SOLA MOSCA (HASTA)', 1260, 790, { s: 22, f: 'mono', w: 700, ls: 4, al: 'center', c: '#e0b08a', a: en(e, 1, 0.5) });
  esquema(ctx);
};
LUZ.moscas = (ctx, e) => {
  noche(ctx, '#080a0d', '#0e1218'); const T = e.T, a0 = ss(e.tl, 0.2, 1), a1 = en(e, 1, 0.9), u = eo(e.tl, e.L(1) + 0.5, e.L(1) + 4.5);
  ctx.save(); ctx.globalAlpha = a0; mosca(ctx, 500, 400, 3.6, 'sci', T, 1, 0); ctx.restore(); rotulo(ctx, 230, 640, 'Esciáridos', 'FAMILIA SCIARIDAE · *Lycoriella*', a0, { c: '#aab3c8' });
  // micelio que huele: atrae a la hembra del fórido
  if (a1 > 0) { ctx.save(); ctx.globalAlpha = a1; bolsa(ctx, 1690, 880, 250, 300, { color: '#b89a4a', mic: 0.9, seed: 4 }); ctx.restore(); ctx.save(); ctx.strokeStyle = 'rgba(240,235,200,.5)'; ctx.lineWidth = 4; ctx.lineCap = 'round'; for (let i = 0; i < 4; i++) { const q0 = (T * 0.3 + i / 4) % 1; ctx.globalAlpha = a1 * Math.sin(q0 * Math.PI); ctx.beginPath(); for (let k = 0; k <= 16; k++) { const q = k / 16, px = 1640 - q0 * 300 + Math.sin(q * 6 + T * 2 + i) * 14 - i * 16, py = 600 - q * 60 - q0 * 120; k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); } ctx.restore(); }
  ctx.save(); ctx.globalAlpha = a0; mosca(ctx, mixn(1240, 1360, u), mixn(380, 420, u) + Math.sin(T * 3) * 6 * u, 3.6, 'for', T, 1, u > 0.02 && u < 0.98 ? 1 : 0); ctx.restore(); rotulo(ctx, 960, 640, 'Fóridos', 'PHORIDAE · *Megaselia halterata*', a0, { c: '#aab3c8' });
  chip(ctx, 'OLOR DEL MICELIO CRECIENDO', 1180, 800, { al: 'center', a: a1, s: 20, c: CO.mic }); esquema(ctx);
};
LUZ.larvas = (ctx, e) => {
  noche(ctx, '#090806', '#130f0a'); const T = e.T, come = ss(e.tl, 0.5, 5), tun = ss(e.tl, 2.6, 5.4), a1 = en(e, 1, 0.9);
  ctx.fillStyle = '#2a1e14'; ctx.fillRect(0, 640, 1920, 260);
  micelio(ctx, 'laM', 760, 700, 1, CO.mic, { seed: 71, max: 7000, a: 0.85, brotes: 14, acepta: (x, y) => Math.abs(x) < 720 && y > -40 && y < 180 });
  // champiñón en corte, con túneles
  ctx.save(); ctx.translate(760, 660); ctx.fillStyle = '#e9e0cc'; ctx.beginPath(); ctx.roundRect(-70, -260, 140, 290, 30); ctx.fill(); ctx.fillStyle = '#f2ead8'; ctx.beginPath(); ctx.moveTo(-250, -240); ctx.bezierCurveTo(-270, -480, 270, -480, 250, -240); ctx.quadraticCurveTo(0, -270, -250, -240); ctx.fill();
  ctx.strokeStyle = '#5a3a22'; ctx.lineWidth = 15; ctx.lineCap = 'round'; ctx.beginPath(); for (let i = 0; i <= 30 * tun; i++) { const q = i / 30, px = -30 + Math.sin(q * 9) * 26, py = 20 - q * 300; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore();
  // larvas comiendo micelio (huecos) y una subiendo por el pie
  const R = rng(6); for (let i = 0; i < 5; i++) { const px = 160 + i * 300 + Math.sin(T * 0.5 + i) * 40, py = 740 + (i % 2) * 60; ctx.fillStyle = `rgba(42,30,20,${0.85 * come})`; ctx.beginPath(); ctx.ellipse(px - 60, py, 120, 44, 0, 0, TAU); ctx.fill(); larva(ctx, px, py, 0.9, (i % 2 ? Math.PI : 0) + Math.sin(T + i) * 0.1, T + i, i % 2 === 0); }
  larva(ctx, 760 - 30 + Math.sin(tun * 9) * 26, 680 - tun * 300, 0.7, -Math.PI / 2, T, false, cl(tun * 4));
  chip(ctx, 'LARVAS: COMEN MICELIO', 1250, 560, { a: ss(e.tl, 0.8, 1.6), s: 22, c: CO.mic }); chip(ctx, 'TÚNELES EN EL PIE', 1250, 330, { a: ss(e.tl, 3, 3.8), s: 22, c: '#c9a070' }); guia(ctx, 760, 500, 1240, 330, ss(e.tl, 3, 3.8));
  if (a1 > 0) { const u = eo(e.tl, e.L(1), e.L(1) + 5); [[CO.tri, 'ESPORAS DE MOHO'], [CO.bac, 'BACTERIAS'], ['#e0704a', 'ÁCAROS']].forEach(([c, s], i) => { const px = mixn(1000, 1500, u) + i * 110, py = 200 + i * 70 + Math.sin(T * 3 + i) * 10; ctx.save(); ctx.globalAlpha = a1; mosca(ctx, px, py, 1.5, i % 2 ? 'for' : 'sci', T, 1, 1); ctx.restore(); for (let k = 0; k < 4; k++) halo(ctx, px - 30 - k * 12, py + 14 + Math.sin(k * 2) * 6, 7, c, a1); });
    ['ESPORAS DE MOHO', 'BACTERIAS', 'ÁCAROS'].forEach((s, i) => chip(ctx, s, 1180 + i * (i === 1 ? 330 : 260), 130, { a: en(e, 1, 0.5, 0.5 + i * 1), s: 18, c: [CO.tri, CO.bac, '#e0704a'][i] })); }
  esquema(ctx);
};
LUZ.malla = (ctx, e) => {
  noche(ctx, '#080a0d', '#0e1218'); const T = e.T;
  bolsa(ctx, 420, 820, 300, 420, { color: '#b89a4a', mic: 0.9, seed: 3 }); ostra(ctx, 540, 600, 0.8, 0, 2); halo(ctx, 420, 600, 500, '#ffe9b0', 0.1);
  ctx.save(); ctx.strokeStyle = 'rgba(190,205,230,.5)'; ctx.lineWidth = 1.5; ctx.beginPath(); for (let y = 130; y <= 880; y += 16) { ctx.moveTo(940, y); ctx.lineTo(1000, y); } for (let x = 940; x <= 1000; x += 12) { ctx.moveTo(x, 130); ctx.lineTo(x, 880); } ctx.stroke(); ctx.strokeStyle = '#8f98aa'; ctx.lineWidth = 6; ctx.strokeRect(940, 130, 60, 750); ctx.restore();
  const R = rng(8); for (let i = 0; i < 6; i++) { const y0 = 220 + R() * 520, ph = R() * 6, u = Math.abs(Math.sin(T * 0.9 + ph)); mosca(ctx, 1040 + u * 420 + i * 30, y0 + Math.sin(T * 3 + ph) * 26, 1.7, i % 2 ? 'for' : 'sci', T, -1, 1); }
  chip(ctx, 'EXCLUSIÓN: MALLAS E HIGIENE', 1440, 160, { al: 'center', a: ss(e.tl, 0.4, 1.1), s: 22 });
};
LUZ.nematodo = (ctx, e) => {
  noche(ctx, '#05090c', '#0a1216'); const T = e.T, a1 = en(e, 1, 0.9), a2 = en(e, 2, 0.8), a3 = en(e, 3, 0.9);
  micelio(ctx, 'neM', 520, 520, 1, CO.mic, { seed: 81, radio: 420, max: 6000, a: 0.5 * (1 - 0.6 * a3) });
  const u = eo(e.tl, 0, 5); nematodo(ctx, mixn(-100, 720, u), 520 + Math.sin(T) * 20, 1, 0.05 * Math.sin(T * 0.7), T, 0, 1 - 0.75 * a3);
  rotulo(ctx, 130, 250, 'Nematodos', 'GUSANOS MICROSCÓPICOS', ss(e.tl, 0.4, 1.2), { c: '#bfe0d0' });
  if (a1 > 0) { ctx.save(); ctx.globalAlpha = a1 * (1 - a3); ctx.fillStyle = '#080d12'; ctx.strokeStyle = 'rgba(200,220,245,.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(1400, 470, 280, 0, TAU); ctx.fill(); ctx.stroke(); ctx.clip();
    const pica = 0.5 + 0.5 * Math.sin(T * 3), vac = ss(e.tl, e.L(1) + 2, e.L(1) + 6);
    tubo(ctx, [[1560, 180], [1540, 470], [1580, 760]], 90, CO.mic, 1, '#0b1118'); ctx.fillStyle = rgba('#f2e8b0', 0.3 * (1 - vac)); ctx.fillRect(1500, 190, 90, 560);
    ctx.save(); ctx.translate(1400, 470); ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(190,215,235,.9)'; ctx.lineWidth = 150; ctx.beginPath(); ctx.moveTo(-400, 30); ctx.lineTo(20, 0); ctx.stroke(); ctx.strokeStyle = '#111a26'; ctx.lineWidth = 138; ctx.stroke();
    ctx.strokeStyle = '#ffe9a8'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(-90, 4); ctx.lineTo(60 + 90 * pica, 0); ctx.stroke(); ctx.fillStyle = '#ffe9a8'; ctx.beginPath(); ctx.arc(-90, 4, 14, 0, TAU); ctx.fill(); ctx.strokeStyle = 'rgba(160,190,170,.5)'; ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(-400, 30); ctx.lineTo(-110, 6); ctx.stroke(); ctx.restore();
    for (let i = 0; i < 6; i++) { const q = (T * 0.6 + i / 6) % 1; halo(ctx, mixn(1530, 1320, q), 470 + Math.sin(i * 2) * 8, 9, '#f2e8b0', a1 * (1 - q)); }
    ctx.restore(); chip(ctx, 'ESTILETE: AGUJA QUE PERFORA LA HIFA', 1400, 800, { al: 'center', a: a1 * (1 - a3), s: 20, c: '#ffe9a8' }); }
  if (a2 > 0) { chip(ctx, 'NO SE ERRADICAN SIN ELIMINAR TODO EL CULTIVO', 130, 760, { a: a2 * (1 - a3), s: 20, c: LUZC.rojo }); chip(ctx, 'BELLETTINI Y COLS., 2018', 130, 820, { a: a2 * (1 - a3), s: 16, c: '#8fa0bd' }); }
  if (a3 > 0) { const k = ss(e.tl, e.L(3) + 1.5, e.L(3) + 4.5); termometro(ctx, 1500, 700, 380, 0.2 + 0.4 * ss(e.tl, e.L(3), e.L(3) + 2.5), '#ff7a3a', a3); txt(ctx, '60 °C', 1560, 480, { s: 90, f: 'serif', w: 500, a: a3 });
    ctx.save(); ctx.globalAlpha = a3 * (1 - 0.75 * k); nematodo(ctx, 760, 360, 0.5, 0.1, T * (1 - k)); larva(ctx, 620, 520, 1.2, 0.2, T * (1 - k), true); acaro(ctx, 640, 680, 1, 0.3, T * (1 - k), '#d8b58c'); ctx.restore(); [360, 520, 680].forEach((y, i) => tache(ctx, 640, y, 70, cl(k * 3 - i), LUZC.rojo));
    titulo(ctx, 'Pasteurización bien hecha', 1000, 250, a3, { s: 64 }); }
  esquema(ctx);
};

/* ====== 06 · Los más raros ====== */
LUZ.virus = (ctx, e) => {
  noche(ctx, '#0a080b', '#140e14'); const T = e.T, a2 = en(e, 2, 1), pel = ss(e.tl, e.L(2), e.L(2) + 3.5), baq = ss(e.tl, e.L(3), e.L(3) + 2.5);
  for (let i = 0; i < 2; i++) { const a = ss(e.tl, 0.2 + i * 0.6, 0.9 + i * 0.6) * (1 - en(e, 1, 0.6)); txt(ctx, '?', 760 + i * 400, 520, { s: 300, f: 'serif', w: 500, al: 'center', c: ['#ff8fb0', CO.mixo][i], a }); }
  const cama = en(e, 1, 0.9); ctx.save(); ctx.globalAlpha = cama; ctx.fillStyle = '#241812'; ctx.beginPath(); ctx.roundRect(120, 660, 1400, 200, 18); ctx.fill(); ctx.fillStyle = '#3a2a1e'; ctx.fillRect(120, 660, 1400, 26);
  const R = rng(14); for (let i = 0; i < 40; i++) { const px = 170 + (i / 40) * 1300 + R() * 20, s = 0.8 + R() * 0.5, enPel = Math.abs(px - 820) < 300, k = R(); if (enPel) { const queda = k < 0.3; if (!queda) { champi(ctx, px, 672, s, 1, 1, 1 - pel); continue; } champi(ctx, px, 672, s * mixn(1, 0.9, baq), mixn(1, 2.6, baq), mixn(1, 0.5, baq), 1, 0.2 * baq); } else champi(ctx, px, 672, s, 1, 1); }
  ctx.restore();
  if (cama > 0) for (let i = 0; i < 3; i++) emblema(ctx, 'virus', 300 + i * 90, 400 + Math.sin(T + i) * 10, 0.25 * cama, T);
  rotulo(ctx, 130, 280, 'Virus La France', 'ENFERMEDAD VIRAL DEL CHAMPIÑÓN', en(e, 1, 0.8, 0.5), { c: '#ff8fb0', s: 44 });
  guia(ctx, 820, 640, 820, 470, pel, '#ff8fb0'); chip(ctx, 'ZONAS PELADAS', 820, 440, { al: 'center', a: pel, s: 22, c: '#ff8fb0' }); chip(ctx, '«BAQUETAS»: PIE LARGO, SOMBRERO CHICO', 1120, 360, { al: 'center', a: baq, s: 20, c: LUZC.oro });
};
LUZ.virus_hifas = (ctx, e) => {
  noche(ctx, '#0a080b', '#140e14'); const T = e.T, a1 = en(e, 1, 1), fus = ss(e.tl, e.L(1) + 2, e.L(1) + 4.5), pasa = ss(e.tl, e.L(1) + 4, e.L(2)), a2 = en(e, 2, 0.9), a3 = en(e, 3, 0.9);
  const vir = (px, py, a) => { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#ff8fb0'; ctx.beginPath(); for (let i = 0; i <= 6; i++) { const an = i / 6 * TAU; i ? ctx.lineTo(px + Math.cos(an) * 8, py + Math.sin(an) * 8) : ctx.moveTo(px + 8, py); } ctx.fill(); ctx.restore(); };
  // espora y micelio con partículas virales
  const a0 = ss(e.tl, 0.2, 1) * (1 - a1); if (a0 > 0) { ctx.save(); ctx.globalAlpha = a0; ctx.fillStyle = '#2a1e22'; ctx.strokeStyle = '#c9a0a8'; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(520, 480, 190, 130, -0.2, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); tubo(ctx, [[900, 620], [1200, 500], [1700, 520]], 80, CO.mic, a0); const R = rng(4); for (let i = 0; i < 14; i++) { vir(420 + R() * 200, 420 + R() * 120, a0); vir(960 + R() * 680, 500 + R() * 60 + (R() < 0 ? 0 : 0), a0); }
    chip(ctx, 'EN LAS ESPORAS', 520, 700, { al: 'center', a: a0, s: 22, c: '#ff8fb0' }); chip(ctx, 'EN EL MICELIO', 1300, 700, { al: 'center', a: a0, s: 22, c: '#ff8fb0' }); }
  if (a1 > 0) { const xL = mixn(300, 900, eo(e.tl, e.L(1), e.L(1) + 2.5)), xR = mixn(1620, 1020, eo(e.tl, e.L(1), e.L(1) + 2.5));
    tubo(ctx, [[60, 420], [400, 440], [xL, 470]], 84, '#f0c8d0', a1); tubo(ctx, [[1860, 560], [1500, 540], [xR, 500]], 84, CO.mic, a1);
    if (fus > 0) tubo(ctx, [[xL - 10, 470], [mixn(xL, xR, fus), mixn(470, 500, fus)]], 60, mixc('#f0c8d0', CO.mic, 0.5), a1);
    const R = rng(11); for (let i = 0; i < 26; i++) { const u0 = R(), cruza = i % 2 === 0 ? pasa * (0.3 + R() * 0.7) : 0, px = mixn(100 + u0 * 760, 1100 + u0 * 650, cruza), py = mixn(440 + u0 * 30, 520 + u0 * 30, cruza) + (R() - 0.5) * 40 + Math.sin(T * 2 + i) * 4; vir(px, py, a1); }
    rotulo(ctx, 130, 270, 'Virus X del champiñón', 'CONTAGIO POR FUSIÓN DE HIFAS (ANASTOMOSIS)', a1 * (1 - a2), { c: '#ff8fb0', s: 44 });
    txt(ctx, 'ENFERMA', 300, 370, { s: 20, f: 'mono', w: 700, ls: 5, c: '#f0c8d0', a: a1 }); txt(ctx, 'SANA', 1560, 640, { s: 20, f: 'mono', w: 700, ls: 5, c: CO.mic, a: a1 * (1 - pasa) }); }
  if (a2 > 0) { ctx.save(); ctx.globalAlpha = a2; ostra(ctx, 1560, 860, 1, 0, 2); ostra(ctx, 1700, 860, 0.7, 0, 4); ctx.restore(); rotulo(ctx, 130, 270, 'Virus esférico de la seta ostra', 'OMSV, POR SUS SIGLAS EN INGLÉS', a2, { c: '#ff8fb0', s: 44 }); }
  ['MICELIO SANO', 'VAPOR ENTRE COSECHAS'].forEach((s, i) => chip(ctx, s, 130 + i * 330, 760, { a: en(e, 3, 0.6, 0.5 + i * 1.6), s: 22 }));
  esquema(ctx);
};
LUZ.mixo = (ctx, e) => {
  noche(ctx, '#0a0906', '#14110a'); const T = e.T, g = ss(e.tl, 0.3, e.L(3)), muere = en(e, 3, 4), puls = 0.85 + 0.15 * Math.sin(T * 2.4);
  // bloque de shiitake dentro de su bolsa
  bolsa(ctx, 700, 860, 760, 720, { color: mixc('#7a5632', '#4a3320', muere), mic: 0.75 * (1 - 0.8 * muere), seed: 9 });
  ctx.save(); ctx.beginPath(); ctx.roundRect(320, 344, 760, 516, 18); ctx.clip();
  micelio(ctx, 'mxM', 700, 600, 1, mixc(CO.mic, '#8a6a44', muere), { seed: 91, max: 6000, a: 0.7 * (1 - 0.6 * muere), acepta: (x, y) => Math.abs(x) < 380 && Math.abs(y) < 260 });
  // plasmodio: abanico de venas amarillas que avanza
  ctx.save(); ctx.translate(330, 850); const segs = red('mxP', { seed: 93, max: 9000, brotes: 12, ang0: -0.6, abre: 1.5, rama: 0.14, paso: 8, acepta: (x, y) => x > -10 && x < 760 && y < 10 && y > -510 }); ctx.scale(2, 2); pintaRed(ctx, segs, g, CO.mixo, { a: puls, esc: 1.2 }); ctx.restore();
  algodon(ctx, 330 + 380 * g, 850 - 260 * g, 120 + 300 * g, CO.mixo, 1, 5, 0.8 * puls, 40);
  // bacterias que caza
  const a1 = en(e, 1, 0.8); if (a1 > 0) { const R = rng(3); for (let i = 0; i < 16; i++) { const px = 420 + R() * 600, py = 400 + R() * 400, comido = cl((g * 1.25 - Math.hypot(px - 330, py - 850) / 900) * 6); ctx.save(); ctx.globalAlpha = a1 * (1 - comido); bacteria(ctx, px, py, 26, R() * 3, 0.5, CO.bac); ctx.restore(); } }
  ctx.restore();
  rotulo(ctx, 1180, 290, 'Mixomicetos', 'MOHOS MUCILAGINOSOS · PROTISTAS, NO HONGOS', ss(e.tl, 0.4, 1.2), { c: CO.mixo, s: 46 });
  chip(ctx, 'CAZAN BACTERIAS Y OTROS MICROBIOS', 1180, 430, { a: a1, s: 20, c: CO.bac }); chip(ctx, 'PLASMODIO AMARILLO BRILLANTE (SHIITAKE)', 1180, 500, { a: en(e, 2, 0.8), s: 20, c: CO.mixo }); chip(ctx, 'MICELIO: CAFÉ, RALO… Y MUERE', 1180, 570, { a: en(e, 3, 0.8), s: 20, c: '#c9a070' });
};
// Seta de chopo (Cyclocybe aegerita): pie largo y claro, sombrero café convexo.
function chopo(ctx, x, y, s, inc = 0, manch = 0, seed = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(inc); ctx.scale(s, s); ctx.strokeStyle = '#e6dcc6'; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(12, -110, 0, -230); ctx.stroke();
  ctx.fillStyle = '#9a6a3c'; ctx.beginPath(); ctx.moveTo(-74, -226); ctx.bezierCurveTo(-70, -300, 70, -300, 74, -226); ctx.quadraticCurveTo(0, -210, -74, -226); ctx.fill(); ctx.save(); ctx.clip(); const R = rng(seed);
  for (let i = 0; i < 14; i++) { const px = (R() - 0.5) * 130, py = -230 - R() * 56, r = (5 + R() * 9) * cl(manch * 2 - R()); if (r <= 0) continue; ctx.fillStyle = 'rgba(70,72,80,.9)'; ctx.beginPath(); ctx.arc(px, py, r, 0, TAU); ctx.fill(); } ctx.restore(); ctx.restore();
}
LUZ.physarum = (ctx, e) => {
  noche(ctx, '#090a0b', '#101214'); const T = e.T, m = ss(e.tl, 1.5, e.L(1) + 1), R = rng(5);
  bolsa(ctx, 640, 870, 760, 360, { color: '#8a6a3a', mic: 0.7, seed: 12 });
  for (let i = 0; i < 9; i++) chopo(ctx, 360 + i * 70, 640 + Math.abs(i - 4) * 5, 0.9 + 0.3 * Math.sin(i * 2.1), (i - 4) * 0.09, m, i + 2);
  // esporocarpos grises sobre el sustrato
  for (let i = 0; i < 70; i++) { const px = 290 + R() * 700, py = 650 + R() * 200, k = cl(m * 2 - R()); if (k <= 0) continue; ctx.strokeStyle = 'rgba(200,200,205,.7)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py - 12 * k); ctx.stroke(); ctx.fillStyle = '#8f9299'; ctx.beginPath(); ctx.ellipse(px, py - 14 * k, 6 * k, 4.5 * k, 0, 0, TAU); ctx.fill(); }
  rotulo(ctx, 1140, 290, '*Physarum compressum*', 'EN SETA DE CHOPO', ss(e.tl, 0.4, 1.2), { c: '#c9ccd4', s: 44 }); chip(ctx, 'CASTILLA-LA MANCHA, ESPAÑA · 2008', 1140, 400, { a: ss(e.tl, 2.2, 3), s: 20 });
  sello(ctx, 'INVENDIBLES', 1420, 560, en(e, 1, 0.5, 1), LUZC.rojo, -0.07, 52);
  const a2 = en(e, 2, 0.8); for (let i = 0; i < 8; i++) gota(ctx, 1160 + i * 80, 700 + ((T * 60 + i * 37) % 90), 10, a2); chip(ctx, 'MUCHA HUMEDAD', 1140, 830, { a: a2, s: 20, c: '#7fc0ff' }); chip(ctx, 'MATERIA VEGETAL MUERTA', 1440, 830, { a: en(e, 2, 0.8, 1.6), s: 20, c: '#c9a070' });
  esquema(ctx);
};

/* ====== 07 · Las tres defensas ====== */
function medalla(ctx, x, y, n, s, a, c) { if (a <= 0) return; halo(ctx, x, y, 240, c, 0.2 * a); ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = c; ctx.lineWidth = 4; ctx.fillStyle = 'rgba(8,10,16,.7)'; ctx.beginPath(); ctx.arc(x, y + (1 - a) * 30, 130, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore(); txt(ctx, String(n), x, y + 56 + (1 - a) * 30, { s: 170, f: 'serif', w: 500, al: 'center', a, c }); s.split('\n').forEach((l, i) => txt(ctx, l, x, y + 200 + i * 34, { s: 24, f: 'mono', w: 700, ls: 4, al: 'center', a, c: LUZC.blanco })); }
LUZ.defensas = (ctx, e) => {
  noche(ctx, '#06080c', '#0b1018'); const T = e.T, a1 = en(e, 1, 0.8);
  ['moho', 'bact', 'acaro', 'mosca', 'nema', 'virus'].forEach((k, i) => { const an = i / 6 * TAU + T * 0.08; ctx.save(); ctx.globalAlpha = 0.55 * ss(e.tl, 0.1 + i * 0.25, 0.9 + i * 0.25) * (1 - 0.6 * a1); emblema(ctx, k, 760 + Math.cos(an) * 560, 470 + Math.sin(an) * 300, 0.6, T); ctx.restore(); });
  [['TÉCNICA\nESTÉRIL', '#7fc0ff'], ['PASTEURIZACIÓN', LUZC.oro], ['ESTERILIZACIÓN', '#ff8a5a']].forEach(([s, c], i) => medalla(ctx, 340 + i * 440, 400, i + 1, s, en(e, 1, 0.7, i * 0.9), c));
};
LUZ.hepa = (ctx, e) => {
  noche(ctx, '#05080d', '#091220'); const T = e.T, a2 = en(e, 2, 0.9), a3 = en(e, 3, 0.8);
  // mesa de trabajo y filtro (panel plisado)
  ctx.fillStyle = '#131a26'; ctx.fillRect(560, 760, 1300, 26); ctx.strokeStyle = 'rgba(200,220,245,.35)'; ctx.lineWidth = 4; ctx.strokeRect(560, 240, 1300, 520);
  ctx.fillStyle = '#e9eef5'; ctx.fillRect(520, 240, 60, 520); ctx.strokeStyle = '#8f98aa'; ctx.lineWidth = 2; ctx.beginPath(); for (let y = 240; y < 760; y += 14) { ctx.moveTo(520, y); ctx.lineTo(580, y + 7); ctx.lineTo(520, y + 14); } ctx.stroke();
  txt(ctx, 'FILTRO HEPA', 550, 210, { s: 22, f: 'mono', w: 700, ls: 5, al: 'center', c: '#7fc0ff', a: ss(e.tl, 0.4, 1.1) });
  // aire sucio que llega (izquierda) y aire limpio que sale en láminas
  const R = rng(4), cols = [CO.tri, CO.pen, CO.neu, CO.asp, '#c9b8a0', CO.bac]; for (let i = 0; i < 60; i++) { const y = 260 + R() * 480, u = ((T * 0.25 + R()) % 1), px = mixn(60, 516, Math.min(1, u * 1.25)), pegada = u > 0.8; halo(ctx, px, y + (pegada ? 0 : Math.sin(T * 2 + i) * 10), 13 + R() * 9, cols[i % 6], pegada ? 0.9 * (1 - (u - 0.8) * 3) : 0.85); }
  ctx.save(); ctx.strokeStyle = 'rgba(140,200,255,.4)'; ctx.lineWidth = 3; ctx.lineCap = 'round'; for (let i = 0; i < 9; i++) { const y = 280 + i * 54, u = (T * 0.4 + i * 0.13) % 1; ctx.setLineDash([60, 50]); ctx.lineDashOffset = -u * 110; ctx.beginPath(); ctx.moveTo(600, y); ctx.lineTo(1840, y); ctx.stroke(); } ctx.restore();
  ctx.save(); ctx.translate(1180, 730); ctx.scale(1, 0.3); petri(ctx, 0, 0, 180); ctx.restore(); ctx.save(); ctx.translate(1180, 730); ctx.scale(1, 0.3); pintaRed(ctx, red('hpM', { seed: 6, radio: 160, max: 3000 }), 0.3 + 0.7 * e.p, CO.mic, {}); ctx.restore();
  chip(ctx, 'AIRE LIMPIO', 1500, 300, { al: 'center', a: en(e, 1, 0.8), s: 22, c: '#7fc0ff' });
  if (a2 > 0) { oscurece(ctx, 0.4 * a2 * (1 - a3)); txt(ctx, '99.97 %', 1240, 520, { s: 190, f: 'serif', w: 500, al: 'center', a: a2 * (1 - a3) }); txt(ctx, 'DE LAS PARTÍCULAS DE 0.3 MICRAS (µm), COMO MÍNIMO', 1240, 590, { s: 22, f: 'mono', w: 700, ls: 4, al: 'center', c: '#7fc0ff', a: a2 * (1 - a3) }); txt(ctx, 'HEPA: HIGH EFFICIENCY PARTICULATE AIR', 1240, 640, { s: 18, f: 'mono', w: 700, ls: 4, al: 'center', c: '#8fa0bd', a: a2 * (1 - a3) }); }
  ['POLVO', 'MOHO', 'BACTERIAS'].forEach((s, i) => chip(ctx, s, 280, 380 + i * 110, { al: 'center', a: en(e, 3, 0.5, i * 0.6), s: 24, c: cols[[4, 0, 5][i]] }));
};
LUZ.pasteur = (ctx, e) => {
  noche(ctx, '#0b0806', '#16100a'); const T = e.T, cal = ss(e.tl, e.L(1), e.L(1) + 3), mata = ss(e.tl, e.L(3), e.L(3) + 4), pasa = en(e, 4, 2.5);
  // composta en su cajón
  ctx.fillStyle = '#3a2816'; ctx.beginPath(); ctx.roundRect(140, 380, 1040, 460, 20); ctx.fill(); const Rp = rng(2); for (let i = 0; i < 240; i++) { ctx.fillStyle = `rgba(${200 + Rp() * 40},${170 + Rp() * 30},90,${0.12 + Rp() * 0.14})`; ctx.save(); ctx.translate(160 + Rp() * 1000, 400 + Rp() * 420); ctx.rotate(Rp() * 3); ctx.fillRect(-16, -2, 32 + Rp() * 20, 4); ctx.restore(); }
  halo(ctx, 660, 620, 800, '#ff7a2a', 0.22 * cal + 0.2 * pasa);
  // malos (se van) y buenos (se quedan… salvo que te pases)
  const malos = [[300, 520, 'larva'], [520, 700, 'nema'], [760, 500, 'moho'], [980, 690, 'bact'], [420, 760, 'acaro']];
  malos.forEach(([x, y, k], i) => { const m = cl(mata * 5 - i); ctx.save(); ctx.globalAlpha = 1 - 0.8 * m; if (k === 'larva') larva(ctx, x, y, 0.9, 0.2, T * (1 - m), true); else if (k === 'nema') nematodo(ctx, x + 100, y, 0.4, 0, T * (1 - m)); else if (k === 'moho') polvoMoho(ctx, x, y, 60, CO.tri, 1.2, 3, 200); else if (k === 'bact') { for (let j = 0; j < 5; j++) bacteria(ctx, x + j * 26 - 50, y + Math.sin(j * 2) * 20, 30, j, 0, '#ff6a5a'); } else acaro(ctx, x, y, 0.8, 0.4, T * (1 - m), '#d8b58c'); ctx.restore(); tache(ctx, x, y, 56, m, LUZC.rojo); });
  const Rb = rng(7); for (let i = 0; i < 40; i++) { const x = 200 + Rb() * 920, y = 430 + Rb() * 380, viv = 1 - cl(pasa * 1.6 - Rb() * 0.6); halo(ctx, x + Math.sin(T + i) * 5, y + Math.cos(T * 0.8 + i) * 5, 13, '#7fd8ff', 0.85 * viv); }
  termometro(ctx, 1380, 780, 440, 0.25 + 0.3 * cal + 0.35 * pasa, mixc('#ffb05a', '#ff3a2a', pasa), ss(e.tl, 0.5, 1.2)); txt(ctx, Math.round(25 + 35 * cal + 14 * pasa) + ' °C', 1450, 470, { s: 110, f: 'serif', w: 500, a: en(e, 1), c: pasa > 0.3 ? LUZC.rojo : LUZC.blanco });
  chip(ctx, '60 °C (140 °F) · UNAS 4 HORAS', 1450, 560, { a: en(e, 1, 0.7, 1), s: 20 }); chip(ctx, 'COMPOSTA DE CHAMPIÑÓN', 1450, 620, { a: en(e, 1, 0.7, 1.6), s: 18, c: '#8fa0bd' });
  rotulo(ctx, 150, 280, 'Pasteurización', 'MATANZA SELECTIVA', ss(e.tl, 0.3, 1.1), { c: LUZC.oro });
  chip(ctx, 'MICROBIOS BUENOS: SE QUEDAN', 700, 310, { a: en(e, 2, 0.8) * (1 - pasa), s: 20, c: '#7fd8ff' }); chip(ctx, 'SI TE PASAS: MUEREN TAMBIÉN', 700, 310, { a: pasa, s: 20, c: LUZC.rojo });
  esquema(ctx);
};
LUZ.esteril = (ctx, e) => {
  noche(ctx, '#0b0808', '#160e0c'); const T = e.T, v = ss(e.tl, 0.4, 2.4), a1 = en(e, 1, 0.9), a2 = en(e, 2, 0.9), coag = ss(e.tl, e.L(1) + 1.5, e.L(1) + 5);
  ctx.save(); ctx.globalAlpha = 1 - 0.8 * a2; olla(ctx, 420, 850, 1.2, v, T, v * 0.8); halo(ctx, 420, 880, 300, '#ff7a2a', 0.5); ctx.restore();
  txt(ctx, '121 °C', 820, 330, { s: 150, f: 'serif', w: 500, a: a1 * (1 - a2) }); txt(ctx, 'VAPOR A PRESIÓN', 826, 384, { s: 22, f: 'mono', w: 700, ls: 6, c: '#ff8a5a', a: a1 * (1 - a2) });
  // proteínas que se coagulan (esquema): hilos plegados que se vuelven nudos
  if (a1 > 0) { const R = rng(8); for (let i = 0; i < 5; i++) { const px = 880 + i * 190, py = 620 + Math.sin(i * 2) * 40; ctx.save(); ctx.globalAlpha = a1 * (1 - a2); ctx.strokeStyle = mixc('#7fd8ff', '#c9c0b0', coag); ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); for (let k = 0; k <= 40; k++) { const q = k / 40, ord = [Math.cos(q * TAU * 2) * 50 * (0.5 + q * 0.5), Math.sin(q * TAU * 3) * 50], des = [(R() - 0.5) * 60, (R() - 0.5) * 60], x = px + mixn(ord[0], des[0], coag), y = py + mixn(ord[1], des[1], coag); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore(); }
    chip(ctx, 'EL CALOR HÚMEDO COAGULA LAS PROTEÍNAS', 1250, 800, { al: 'center', a: a1 * (1 - a2), s: 20, c: '#ff8a5a' }); }
  if (a2 > 0) { const k = ss(e.tl, e.L(2) + 0.8, e.L(2) + 3.5); ctx.save(); ctx.globalAlpha = a2; ctx.fillStyle = LUZC.oro; ctx.fillRect(760, 780 - 280, 180, 280); ctx.fillStyle = '#ff8a5a'; ctx.fillRect(1100, 780 - 280 * (1 + 0.5 * k), 180, 280 * (1 + 0.5 * k)); ctx.strokeStyle = 'rgba(220,230,250,.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(700, 780); ctx.lineTo(1340, 780); ctx.stroke(); ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(700, 500); ctx.lineTo(1340, 500); ctx.stroke(); ctx.restore();
    txt(ctx, 'PASTEURIZADO', 850, 826, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: LUZC.oro, a: a2 }); txt(ctx, 'AUTOCLAVE', 1190, 826, { s: 20, f: 'mono', w: 700, ls: 3, al: 'center', c: '#ff8a5a', a: a2 });
    txt(ctx, 'hasta +50 %', 1400, 420, { s: 90, f: 'serif', w: 500, a: k }); chip(ctx, 'COSECHA EN PESO SECO · SETAS', 1400, 490, { a: k, s: 18, c: '#ff8a5a' }); chip(ctx, 'GRIMM, SONNTAG Y RAHMANN, 2024', 1400, 550, { a: k, s: 16, c: '#8fa0bd' });
    rotulo(ctx, 150, 280, 'Esterilización', 'UN ESTUDIO DE 2024', a2, { c: '#ff8a5a' }); }
  else rotulo(ctx, 150, 280, 'Esterilización', 'MATA TODO, ENDOSPORAS INCLUIDAS', ss(e.tl, 0.3, 1.1), { c: '#ff8a5a' });
  esquema(ctx);
};
LUZ.primero = (ctx, e) => {
  noche(ctx, '#06090b', '#0b1214'); const T = e.T, cae = ss(e.tl, 0.8, 2.6), g = ss(e.tl, 2.6, e.L(1)), a1 = en(e, 1, 0.9);
  ctx.save(); ctx.globalAlpha = 1 - 0.75 * a1; frascoGrano(ctx, 560, 850, 440, 600, { seed: 31, tapa: false, verde: g * 1.25 });
  halo(ctx, 560, mixn(100, 520, cae), 16, CO.tri, cae < 1 ? 1 : 0); ctx.save(); ctx.beginPath(); ctx.roundRect(345, 340, 430, 505, 30); ctx.clip(); micelio(ctx, 'prT', 560, 520, g, CO.tri, { seed: 37, max: 7000, brotes: 12, acepta: (x, y) => Math.abs(x) < 215 && y > -180 && y < 325 }); ctx.restore(); ctx.restore();
  rotulo(ctx, 960, 300, 'Sustrato estéril', 'NADIE QUE LE ESTORBE A LA PRIMERA ESPORA', ss(e.tl, 0.4, 1.2) * (1 - a1), { c: CO.tri, s: 44 });
  chip(ctx, 'UNA ESPORA', 720, 200, { a: ss(e.tl, 0.9, 1.5) * (1 - cae) , s: 20, c: CO.tri });
  if (a1 > 0) { titulo(ctx, 'Ninguna es infalible', 1250, 400, a1, { s: 84 }); chip(ctx, 'MOHO VERDE', 1090, 520, { al: 'center', a: en(e, 1, 0.6, 1.5), s: 24, c: CO.tri }); chip(ctx, 'MOSCAS', 1410, 520, { al: 'center', a: en(e, 1, 0.6, 2.6), s: 24, c: '#aab3c8' }); ctx.save(); ctx.globalAlpha = en(e, 1, 0.6, 2.6); for (let i = 0; i < 4; i++) mosca(ctx, 1030 + i * 150 + Math.sin(T + i) * 30, 680 + Math.sin(T * 2 + i * 2) * 30, 1.6, i % 2 ? 'for' : 'sci', T, i % 2 ? 1 : -1, 1); ctx.restore(); }
};

/* ====== 08 · Cuando te pase ====== */
LUZ.reglas = (ctx, e) => {
  noche(ctx, '#07090c', '#0c1118'); const T = e.T;
  const C = [['SALE CERRADO', 'NO SE ABRE EN EL CUARTO\nDE CULTIVO NI EN CASA', LUZC.oro], ['NO SE HUELE', 'NI SE SACUDE', '#ff8a5a'], ['NO SE COME', 'NADA CONTAMINADO', LUZC.rojo]];
  txt(ctx, 'TRES REGLAS', 130, 200, { s: 26, f: 'mono', w: 700, ls: 10, c: LUZC.oro, a: ss(e.tl, 0.3, 1) });
  C.forEach(([t, s, c], i) => { const a = en(e, i + 1, 0.8), x = 330 + i * 470, y = 250 + (1 - a) * 30; if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(10,13,20,.8)'; ctx.strokeStyle = rgba(c, 0.8); ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x - 200, y, 400, 600, 24); ctx.fill(); ctx.stroke();
    if (i === 0) { bolsa(ctx, x, y + 330, 180, 240, { color: '#b89a4a', mic: 0.7, seed: 4 }); polvoMoho(ctx, x, y + 240, 50, CO.tri, 1.2, 6, 160); ctx.strokeStyle = c; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 46, y + 94); ctx.lineTo(x + 46, y + 94); ctx.stroke(); }
    else if (i === 1) { frascoGrano(ctx, x, y + 330, 150, 210, { mic: 0.8, verde: 0.9, seed: 8, tapa: false }); for (let k = 0; k < 10; k++) { const u = (T * 0.4 + k / 10) % 1; halo(ctx, x + Math.sin(k * 2.4) * 60 * u, y + 110 - u * 70, 7, CO.tri, a * (1 - u)); } tache(ctx, x, y + 200, 120, cl((e.tl - e.L(2) - 1) / 0.8), c); }
    else { ctx.save(); ctx.translate(x, y + 320); ostra(ctx, 0, 0, 0.95, 0.3, 2); ctx.restore(); polvoMoho(ctx, x + 40, y + 190, 46, CO.tri, 1.2, 9, 130); tache(ctx, x, y + 210, 120, cl((e.tl - e.L(3) - 1) / 0.8), c); }
    ctx.restore(); txt(ctx, String(i + 1), x - 170, y + 70, { s: 64, f: 'serif', w: 500, a, c }); txt(ctx, t, x, y + 440, { s: 34, f: 'serif', w: 500, al: 'center', a }); s.split('\n').forEach((l, k) => txt(ctx, l, x, y + 490 + k * 30, { s: 18, f: 'mono', w: 700, ls: 2, al: 'center', a, c })); });
};
LUZ.guia = (ctx, e) => {
  noche(ctx, '#06090c', '#0b1016'); const T = e.T;
  ['COLOR', 'TEXTURA', 'OLOR'].forEach((s, i) => chip(ctx, s, 700 + i * 260, 190, { al: 'center', a: ss(e.tl, 0.5 + i * 1.2, 1.2 + i * 1.2), s: 26 }));
  const G = [['*Trichoderma*', 'VERDE QUE EMPEZÓ BLANCO', CO.tri], ['*Penicillium*', 'AZULADO Y POLVOSO', CO.pen], ['*Neurospora*', 'ROSA Y VELOZ', CO.neu], ['*Mucor* · *Rhizopus*', 'ALFILERES NEGROS', CO.muc], ['*Bacillus*', 'GRANO MOJADO Y AGRIO', CO.bac]];
  const dl = e.L(1) == null ? 99 : e.L(1), paso = (e.dur - dl - 0.6) / 5;
  G.forEach(([n, s, c], i) => { const x = 220 + i * 370, y = 480, a = ss(e.tl, 0.4 + i * 0.5, 1.2 + i * 0.5), nom = ss(e.tl, dl + i * paso, dl + i * paso + 0.6); ctx.save(); ctx.globalAlpha = a;
    if (i === 0) { algodon(ctx, x, y, 110, '#ffffff', 1, 2, 1, 26); polvoMoho(ctx, x, y, 80, c, 1.2, 3, 300); petri(ctx, x, y, 140); }
    else if (i === 1) { algodon(ctx, x, y, 110, '#ffffff', 1, 5, 0.8, 20); polvoMoho(ctx, x, y, 95, c, 1.2, 4, 380); petri(ctx, x, y, 140); }
    else if (i === 2) { micelio(ctx, 'guN', x, y, 1, c, { seed: 3, radio: 128, max: 2500, brotes: 12 }); polvoMoho(ctx, x, y, 120, '#ff9a70', 1.2, 5, 300, 0.7); petri(ctx, x, y, 140); }
    else if (i === 3) { for (let k = 0; k < 9; k++) esporangio(ctx, x - 100 + k * 25, y + 120, 0.8, 1, { h: 150 + Math.sin(k * 2) * 50, r: 15, inc: (k - 4) * 0.05 }); }
    else frascoGrano(ctx, x, y + 150, 190, 280, { mic: 0.6, humedo: 1, seed: 21 });
    ctx.restore(); rico(ctx, n, x, 720, { s: 34, f: 'sans', w: 500, al: 'center', a: nom }); txt(ctx, s, x, 764, { s: 16, f: 'mono', w: 700, ls: 2, al: 'center', c, a: nom }); });
};
LUZ.cierre = (ctx, e) => {
  noche(ctx, '#05080d', '#0a1016'); polvo(ctx, 18, 5, e.T, '#7f95c0', 0.25);
  // la misma caja del inicio; ahora el verde retrocede y el micelio blanco llega primero a toda la caja
  const retro = ss(e.tl, e.L(1), e.L(2) + 1), gana = ss(e.tl, e.L(1) + 1, e.dur - 0.5);
  const fin = cam(ctx, 1.08 - 0.06 * e.p, 800 + 160 * e.p, 470);
  duelo(ctx, 800, 470, 360, 0.8 + 0.2 * gana, 0.72 * (1 - retro), CO.tri, { aP: 1 - retro });
  if (gana > 0) { ctx.save(); ctx.translate(800, 470); pintaRed(ctx, red('ciM', { seed: 53, radio: 336, max: 9000, brotes: 12 }), gana, CO.mic, { a: 0.9 }); ctx.restore(); halo(ctx, 800, 470, 520, '#fff6dc', 0.22 * gana); petri(ctx, 800, 470, 360); }
  fin();
  rotulo(ctx, 1300, 420, 'Que el primero sea el tuyo', null, en(e, 2, 0.9, 0.3), { c: CO.mic, s: 40 });
};
