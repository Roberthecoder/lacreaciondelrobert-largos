// musica_luminosa.mjs — música de fondo de los documentales: la «cama luminosa» del manual maestro de shots
// (22 nov 2026: do mayor, 100 BPM, registro medio-agudo; nunca una cama grave ni un zumbido fijo). Copia de motor/kit/cama-luminosa.mjs.
import fs from 'node:fs';
import { camaLuminosa } from './cama-luminosa.mjs';
const SR = 48000;
// Los documentales duran varios minutos: la cama se compone por tramos de ~64 s con semilla distinta y un respiro entre tramos,
// para que no sea un solo tema repetido diez minutos.
export function generarMusica(bloques, total, salida) {
  const N = Math.ceil((total + 0.5) * SR), mus = new Float32Array(N);
  const cortes = [0]; (bloques || []).filter((b) => b.tipo === 'capitulo').forEach((b) => { if (b.at - cortes[cortes.length - 1] > 40) cortes.push(b.at); }); cortes.push(total);
  for (let k = 0; k < cortes.length - 1; k++) camaLuminosa(mus, SR, Math.floor(cortes[k] * SR), Math.min(N, Math.floor((cortes[k + 1] + 1.2) * SR)), { g: 0.05, semilla: 11 + k * 7 });
  let pico = 0; for (let i = 0; i < N; i++) pico = Math.max(pico, Math.abs(mus[i])); const g = pico > 0 ? 0.7 / pico : 1;
  const buf = Buffer.alloc(44 + N * 4); buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
  for (let i = 0; i < N; i++) { const v = Math.max(-1, Math.min(1, mus[i] * g)) * 32767 | 0; buf.writeInt16LE(v, 44 + i * 4); buf.writeInt16LE(v, 46 + i * 4); }
  fs.writeFileSync(salida, buf);
}
