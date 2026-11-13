# Documental 001 · Bioluminiscentes (16:9, 100 % ilustrado)

Hecho con el motor de largos más el kit nuevo **cine de luz** (`video/cine-luz.jsx`): cada escena es un lienzo (canvas) dibujado en función del tiempo, con luz aditiva, hifas que crecen, enjambres de bacterias y cámara lenta.

| Archivo | Qué es |
|---|---|
| `guion_final.md` | El guion expositivo (se genera desde `video/escenas.js`). |
| `CAMBIOS.md` | Qué se quitó o reescribió respecto al guion original y qué falta decidir. |
| `fuentes.md`, `verificacion.md`, `notas_visuales.md` | Los del guion original (misma numeración de fuentes). |
| `video/escenas.js` | Capítulos → frases → escena (`v: { tipo: 'lienzo', id }`). |
| `video/cine-luz.jsx` | El kit: luz, texto, hifas, hongos, vidrio, bacterias, calamar, algas, petunia, luciérnaga, objetos. |
| `video/cine-luz-a.jsx`, `cine-luz-b.jsx` | Las 38 escenas (abre y cierra con `cinco`) (`window.LUZ.<id>`). |
| `video/tiempos.mjs` | Imprime la línea de tiempo: en qué segundo empieza cada escena. |
| `video/musica_doc.py` | Genera la música (`video/voz/mezcla.m4a`): un acorde por capítulo y una campana por frase. |

## Comandos (desde `motor/`)
- Hoja de cuadros: `NAVEGADOR=chrome node preview.mjs ../largos/doc-001-bioluminiscentes "Documental 001.dc.html" hoja.png 5,60,120 --horizontal`
  (si el primer tiempo pasa de 280 s, pon antes un tiempo chico: el primer salto a otra "Parte" a veces no entra).
- Un tramo: `node render.mjs ../largos/doc-001-bioluminiscentes "Documental 001.dc.html" tramo.mp4 --horizontal --fps 24 --desde 0 --hasta 27`
- Completo en la nube: cada push a esta rama que toque `largos/` lanza `render-largo.yml` y deja el MP4 en Releases → «Largo · largo-render/doc-001-bioluminiscentes».

## Para agregar una escena
1. En `escenas.js`: `{ t: 'frase…', v: L('mi_escena') }` (las frases siguientes sin `v` continúan la misma escena).
2. En `cine-luz-a.jsx` o `-b.jsx`: `LUZ.mi_escena = (ctx, e) => { … }`. `e.tl` = segundos dentro de la escena; `e.L(i)` = cuándo empieza la frase `i`.
