// musica_largo.mjs — la "musiquita" del largo, con el MISMO sintetizador de los shots (audio-kit.mjs):
// cama grave continua + notas de la escala pentatónica que suenan cuando pasa algo en pantalla + efectos
// (golpes, tics, gotitas, brillos). Nada grabado ni de catálogo. Lo llama tiempos_voz.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mezcla } from './audio-kit.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));

// bloques = [{ at, dur, tipo, id, cap }] en segundos reales (ya con la voz)
export function generarMusica(bloques, total, salida) {
  // audio-kit lee las escenas de un html: le damos uno mínimo con una sola escena del largo total
  const tmp = path.join(DIR, 'voz', '_escenas_musica.html');
  fs.writeFileSync(tmp, `window.OM_SCENES = '${JSON.stringify([{ name: 'Todo', dur: total }])}';`);
  const m = mezcla(path.join(DIR, 'voz'), '_escenas_musica.html', 11);
  fs.unlinkSync(tmp);
  const ESC = m.ESC; // la menor pentatónica (57…91)

  // armonía por capítulo: cada capítulo con su acorde de fondo (La m · Fa · Do · Sol · Re m …)
  const ACORDES = [[45, 52, 57], [41, 48, 53], [48, 55, 60], [43, 50, 55], [50, 57, 62], [45, 52, 57], [41, 48, 53], [43, 50, 55], [48, 55, 60], [45, 52, 57]];
  const caps = [];
  bloques.forEach((b) => { const c = caps[b.cap] || (caps[b.cap] = { t0: b.at, t1: b.at + b.dur }); c.t1 = Math.max(c.t1, b.at + b.dur); });
  caps.forEach((c, i) => { if (c) m.pad(Math.max(0, c.t0 - 0.6), Math.min(total, c.t1 + 0.6), 0.05, ACORDES[i % ACORDES.length]); });

  // un arpegio suave y continuo (la "musiquita"): cada capítulo con su propio motivo sobre su acorde
  caps.forEach((c, i) => {
    if (!c) return;
    const raiz = ACORDES[i % ACORDES.length][2] + 12;           // una octava arriba del acorde
    const motivo = [0, 7, 12, 7, 3, 7, 10, 7].map((s) => raiz + s);
    const paso = 0.62 + (i % 3) * 0.06;
    let k = 0;
    for (let t = c.t0 + 0.3; t < c.t1 - 0.4; t += paso, k++) m.nota(t, motivo[k % motivo.length], 0.022 + 0.008 * ((k % 4) === 0), 1.1);
  });

  // lo que pasa en pantalla
  let melo = 0;
  bloques.forEach((b) => {
    const t = b.at;
    if (b.tipo === 'capitulo') {                                   // tarjeta de capítulo
      m.golpe(t + 0.05, 0.32, 70); m.sube(t, 1.2, 52, 64, 0.04);
      [57, 64, 69].forEach((n, j) => m.nota(t + 0.4 + j * 0.12, n + 12, 0.05, 1.6));
      return;
    }
    if (t > 0.5) m.whoosh(t - 0.25, 0.55, 0.06);                  // el cruce entre escenas
    m.nota(t + 0.1, ESC[(melo++ * 3) % 9 + 3], 0.05, 0.9);          // cada escena nueva, una nota
    if (b.tipo === 'foto' || b.tipo === 'fotos') {                  // fotos que entran: clic de cámara
      const n = b.n || 1; for (let j = 0; j < n; j++) m.tic(t + 0.15 + j * 0.45, 0.14, 2600);
    }
    if (b.tipo === 'numero') for (let j = 0; j < 12; j++) m.tic(t + 0.3 + j * 0.12, 0.08, 1800 + j * 60); // el contador
    if (b.tipo === 'logo' || b.tipo === 'marca') { [69, 72, 76].forEach((n, j) => m.nota(t + 0.2 + j * 0.1, n, 0.045, 1.4)); m.metal(t + 0.25, 0.08, 1300); }
    if (b.tipo === 'iconos') for (let j = 0; j < 8; j++) m.nota(t + 0.4 + j * 0.9, ESC[(j * 2) % 10 + 2], 0.04, 0.5);
    if (b.tipo === 'texto') m.sube(t + 0.1, 1.0, 57, 64, 0.025);
    const id = b.id || '';
    if (/medalla|plata|bronce|torre_sej|reconocimientos|monedas/.test(id)) m.metal(t + b.dur * 0.35, 0.12, 900);   // brillo de medalla/moneda
    if (/seta|champinon|kits|granjita|fungimati|aserrin|cafe|brillan|pda|frijolito|plantulas|mesa_jitomates/.test(id)) {
      m.sube(t + b.dur * 0.3, 2.0, 57, 69, 0.03);                                       // algo que crece
      for (let j = 0; j < 5; j++) m.nota(t + b.dur * 0.3 + 0.4 * j, ESC[j + 4], 0.03, 0.7);
    }
    if (/gelatina|bagazo|agar|papaya|cubeta/.test(id)) for (let j = 0; j < 4; j++) m.gota(t + 0.6 + j * 0.5, 0.12, 800 + j * 60); // líquidos
    if (/periodico|tablet|curso/.test(id)) for (let j = 0; j < 6; j++) m.tic(t + 0.4 + j * 0.15, 0.08, 2200);            // teclas / papel
    if (/medio_fin/.test(id)) for (let j = 0; j < 7; j++) m.nota(t + b.dur * 0.1 + j * (b.dur * 0.72 / 6.6), ESC[j + 2], 0.05, 0.5); // cada salto, una nota
    if (/monterrey/.test(id)) m.sube(t + b.dur * 0.1, b.dur * 0.6, 52, 69, 0.03);           // el viaje
  });
  // final: acorde que se queda
  m.nota(total - 7, 57, 0.06, 6); m.nota(total - 7, 64, 0.05, 6); m.nota(total - 7, 69, 0.045, 6);
  m.guardar(path.relative(path.join(DIR, 'voz'), salida), 1);
}
