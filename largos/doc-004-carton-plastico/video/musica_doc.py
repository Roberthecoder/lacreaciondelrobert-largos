# musica_doc.py — cama musical del documental (sin voz). Todo sale de los datos del guion:
# cada capítulo tiene su acorde (tónica distinta) y cada frase del guion suena como una nota de campana en el
# segundo exacto en que aparece su subtítulo. Nada grabado ni de catálogo.
# Uso: python3 musica_doc.py   →  voz/mezcla.m4a  (necesita numpy y ffmpeg; lee los tiempos con tiempos.mjs)
import json, subprocess, os, wave
import numpy as np
AQUI = os.path.dirname(os.path.abspath(__file__))
tl = json.loads(subprocess.check_output(['node', os.path.join(AQUI, 'tiempos.mjs'), '--json']))
SR = 44100; N = int(tl['total'] * SR); t = np.arange(N) / SR
L = np.zeros(N); R = np.zeros(N)
# capítulos: del inicio de cada tarjeta al de la siguiente
cortes = [0.0] + [b['at'] for b in tl['bloques'] if b['id'].startswith('TARJETA')] + [tl['total']]
RAICES = [110.0, 87.31, 130.81, 98.0, 146.83, 110.0, 82.41, 130.81, 110.0]
rng = np.random.default_rng(7)
for i in range(len(cortes) - 1):
    a, b = cortes[i], cortes[i + 1]; f0 = RAICES[i % len(RAICES)]
    env = np.clip((t - a + 1.5) / 3, 0, 1) * np.clip((b + 1.5 - t) / 3, 0, 1); env = env * env * (3 - 2 * env)
    for mult, g in [(1, .30), (1.5, .16), (2, .13), (3, .05), (2.4 if i % 2 else 2.5, .05)]:
        for det, pan in [(-0.35, .3), (0.31, .7)]:
            lfo = 0.75 + 0.25 * np.sin(2 * np.pi * (0.05 + 0.03 * rng.random()) * t + rng.random() * 6)
            s = np.sin(2 * np.pi * (f0 * mult + det) * t + rng.random() * 6) * g * lfo * env
            L += s * (1 - pan); R += s * pan
# campanas: una por frase
PENTA = [0, 3, 5, 7, 10, 12, 15, 17]; k = 0
for b in tl['bloques']:
    if b['id'].startswith('TARJETA'): continue
    ci = max(i for i in range(len(cortes) - 1) if b['at'] >= cortes[i] - 1e-6); f0 = RAICES[ci % len(RAICES)] * 4
    for j, off in enumerate(b['ls']):
        at = b['at'] + off; n0 = int(at * SR); n1 = min(N, n0 + int(2.6 * SR)); tt = np.arange(n1 - n0) / SR
        f = f0 * 2 ** (PENTA[(k * 3 + j * 2) % len(PENTA)] / 12)
        s = (np.sin(2 * np.pi * f * tt) + 0.35 * np.sin(2 * np.pi * f * 2.01 * tt) * np.exp(-tt * 4)) * np.exp(-tt * 2.1) * np.clip(tt / 0.01, 0, 1) * (0.085 if j else 0.12)
        pan = 0.3 + 0.4 * ((k + j) % 2); L[n0:n1] += s * (1 - pan); R[n0:n1] += s * pan
    k += 1
fade = np.clip(t / 2, 0, 1) * np.clip((tl['total'] - t) / 3, 0, 1)
M = np.stack([L, R], 1) * fade[:, None]; M = M / np.abs(M).max() * 0.6
os.makedirs(os.path.join(AQUI, 'voz'), exist_ok=True); wav = os.path.join(AQUI, 'voz', '_musica.wav')
with wave.open(wav, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((M * 32767).astype('<i2').tobytes())
subprocess.check_call(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-c:a', 'aac', '-b:a', '160k', os.path.join(AQUI, 'voz', 'mezcla.m4a')]); os.remove(wav)
print('Listo: voz/mezcla.m4a ·', round(tl['total'], 1), 's')
