// musica_sin_voz.mjs — pista de la versión sin voz: «cama luminosa» del manual maestro de shots, a −11 LUFS, sin nada debajo de 90 Hz.
// Uso: node video/musica_sin_voz.mjs   (necesita ffmpeg) → video/voz/mezcla.m4a
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync, spawnSync } from 'node:child_process'; import { fileURLToPath } from 'node:url';
import { generarMusica } from './musica_luminosa.mjs';
const DIR = path.dirname(fileURLToPath(import.meta.url)), VOZ = path.join(DIR, 'voz'); fs.mkdirSync(VOZ, { recursive: true });
const MZ = JSON.parse(fs.readFileSync(path.join(DIR, 'mezcla.json'), 'utf8'));
const tl = JSON.parse(execFileSync('node', [path.join(DIR, 'tiempos.mjs'), '--json']).toString());
const bloques = tl.bloques.map((b) => ({ at: b.at, dur: b.dur, tipo: String(b.id).startsWith('TARJETA') ? 'capitulo' : 'lienzo' }));
const wav = path.join(VOZ, 'musica.wav'); generarMusica(bloques, tl.total, wav);
const medir = (af) => { const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', wav, '-af', `${af}ebur128`, '-f', 'null', '-'], { encoding: 'utf8' }); const m = [...(r.stderr || '').matchAll(/I:\s+(-?[\d.]+) LUFS/g)].at(-1); return m ? +m[1] : -23; };
const base = 'highpass=f=90:p=2,'; const g = MZ.final_lufs_sin_voz - medir(base);
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', wav, '-af', `${base}volume=${g.toFixed(2)}dB,alimiter=limit=0.84:attack=3:release=80:asc=1:level=false,afade=t=in:d=1.5,afade=t=out:st=${(tl.total - 3).toFixed(2)}:d=3`, '-c:a', 'aac', '-b:a', '192k', path.join(VOZ, 'mezcla.m4a')]);
fs.rmSync(wav); console.log(`Listo: voz/mezcla.m4a · ${tl.total.toFixed(1)} s · música luminosa a ${MZ.final_lufs_sin_voz} LUFS`);
