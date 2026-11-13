# Documental 003 · Contaminantes del cultivo de hongos (16:9, 100 % ilustrado)

Título propuesto: "Eso verde no es tu hongo: los contaminantes del cultivo de hongos". Dura 11 minutos y medio, sin voz (subtítulos y música). Hecho con el motor de largos y el kit cine de luz (`video/cine-luz.jsx`).

| Archivo | Qué es |
|---|---|
| `guion_final.md` | El guion (se genera desde `video/escenas.js`) y la tabla de apariciones de Robert. |
| `CAMBIOS.md` | Lo que Robert debe confirmar con su experiencia. Este guion no lo ha revisado nadie. |
| `fuentes.md`, `verificacion.md` | Fuentes (F1 a F20) y cada dato con su cita textual. |
| `publicacion.md` | Título y descripción para YouTube (borrador). |
| `video/escenas.js` | Capítulos, frases y escenas. |
| `video/cine-luz-a.jsx` | Piezas nuevas (`window.K3`: conidióforos de *Trichoderma*, *Penicillium* y *Aspergillus*, esporangio, bacilo con endospora, ácaro, mosca, larva, nematodo, seta, frasco de grano, bolsa, olla, duelo en caja de Petri) y escenas de los capítulos 0 a 4. |
| `video/cine-luz-b.jsx` | Escenas de los capítulos 5 a 8. |
| `video/doc-largo.jsx` | Motor. Aquí están la lista de nombres científicos en cursiva y el color de cada capítulo. |
| `video/tiempos.mjs` | Imprime en qué segundo empieza cada escena. |
| `video/musica_doc.py` | Genera `video/voz/mezcla.m4a` (un acorde por capítulo, una campana por frase). |

## Comandos (desde `motor/`)
- Hoja de cuadros: `NAVEGADOR=chrome node preview.mjs ../largos/doc-003-contaminantes "Documental 003.dc.html" hoja.png 5,60,120 --horizontal`
  (si el primer tiempo pasa de 280 s, pon antes un tiempo chico).
- Un tramo: `node render.mjs ../largos/doc-003-contaminantes "Documental 003.dc.html" tramo.mp4 --horizontal --fps 24 --desde 0 --hasta 27`
- Completo en la nube: cada push a la rama `largo-render/doc-003-contaminantes` lanza `render-largo.yml` y deja el MP4 en Releases.
- Regenerar el guion en texto: se hizo con un script temporal que recorre `escenas.js`; si cambias frases, vuelve a generarlo o edita `guion_final.md` a mano.

## Para agregar o cambiar una escena
1. En `escenas.js`: `{ t: 'frase…', v: L('mi_escena') }` (las frases siguientes sin `v` continúan la misma escena).
2. En `cine-luz-a.jsx` o `-b.jsx`: `LUZ.mi_escena = (ctx, e) => { … }`. `e.tl` son los segundos dentro de la escena; `e.L(i)` es cuándo empieza la frase `i`.
3. Ojo: en estos dos archivos `mixc` regresa un color `#rrggbb` (el del kit regresa `rgb()` y no se puede volver a mezclar).
