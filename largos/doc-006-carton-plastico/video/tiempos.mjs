// tiempos.mjs — imprime la línea de tiempo (misma cuenta que doc-largo.jsx): cada escena con su segundo de inicio y duración.
// Uso: node tiempos.mjs [--json]
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const AQUI = path.dirname(fileURLToPath(import.meta.url));
globalThis.window = {}; new Function(fs.readFileSync(path.join(AQUI, 'escenas.js'), 'utf8'))();
let t = 0; const B = []; let pal = 0, car = 0;
for (const c of window.CAPS) { if (c.tarjeta !== false) { B.push({ id: 'TARJETA ' + c.num, at: t, dur: 3.2, ls: [0] }); t += 3.2; }
  for (const l of c.lineas) { const d = l.d || Math.max(2.2, l.t.length / 15 + 0.45); pal += l.t.split(/\s+/).length; car += l.t.length;
    if (l.v) B.push({ id: l.v.id || l.v.tipo, at: t, dur: d, ls: [0] }); else { const u = B[B.length - 1]; u.ls.push(+(t - u.at).toFixed(2)); u.dur += d; } t += d; } }
t += 1;
if (process.argv.includes('--json')) console.log(JSON.stringify({ total: t, bloques: B }));
else { for (const b of B) console.log(b.at.toFixed(1).padStart(7), b.dur.toFixed(1).padStart(6), ' ', b.id.padEnd(14), b.ls.join(' ')); console.log(`Total ${t.toFixed(1)} s = ${(t / 60).toFixed(1)} min · ${pal} palabras · ${car} caracteres`); }
