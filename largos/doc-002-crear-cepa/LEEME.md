# Documental 002 · ¿Cómo se crea una cepa de un hongo? (16:9, 100 % ilustrado)

Hecho con el motor de largos y el kit **cine de luz** (`video/cine-luz.jsx`): cada escena es un lienzo dibujado en función del tiempo. Sin voz por ahora: cada frase es un subtítulo y la música sale del guion.

| Archivo | Qué es |
|---|---|
| `guion_final.md` | El guion expositivo (se genera desde `video/escenas.js`), con la tabla «Robert en pantalla». |
| `CAMBIOS.md` | Qué se quitó o reescribió respecto al guion original y qué falta decidir. |
| `fuentes.md`, `verificacion.md` | Fuentes F1 a F27 y la verificación dato por dato. |
| `publicacion.md` | Título y descripción de YouTube (borrador). |
| `original/` | Guion, fuentes, verificación, notas visuales y preguntas del guion original. |
| `video/escenas.js` | Capítulos → frases → escena (`v: { tipo: 'lienzo', id }`). |
| `video/cine-luz.jsx` | El kit: luz, texto, redes de hifas, vidrio. |
| `video/cine-luz-a.jsx` | Piezas compartidas del 002 (núcleo, hifa, fíbula, placa, colonia rizomórfica o algodonosa, seta en abanico, bolsa de inóculo, basidio, tubo, lupa) y capítulos 0 a 4. |
| `video/cine-luz-b.jsx` | Capítulos 5 a 9 (dicarión, fíbula paso a paso, Buller, cruza, Oaxaca, champiñón, CRISPR, cierre). |
| `video/doc-largo.jsx` | Motor; ahí están `CIENTIFICOS` (cursivas en subtítulos) y `PALETA` (acento por capítulo). |
| `video/tiempos.mjs` | Imprime en qué segundo empieza cada escena. |
| `video/musica_doc.py` | Genera `video/voz/mezcla.m4a`: un acorde por capítulo y una campana por frase. |

Colores fijos: núcleo de un padre en azul, del otro en dorado, un tercero en verde; micelio en blanco hueso; seta rosa en rosa.

## Comandos (desde `motor/`)
- Hoja de cuadros: `NAVEGADOR=chrome node preview.mjs ../largos/doc-002-crear-cepa "Documental 002.dc.html" hoja.png 5,60,120 --horizontal`
  (si el primer tiempo pasa de 280 s, pon antes un tiempo chico).
- Un tramo: `node render.mjs ../largos/doc-002-crear-cepa "Documental 002.dc.html" tramo.mp4 --horizontal --fps 24 --desde 350 --hasta 381`
- Completo en la nube: cada push a `largo-render/doc-002-crear-cepa` que toque `largos/` lanza `render-largo.yml` y deja el MP4 en Releases.

## Para cambiar una frase o una escena
1. Frase: editar `video/escenas.js` y volver a correr `python3 video/musica_doc.py` (los tiempos cambian).
2. Escena: `LUZ.<id> = (ctx, e) => { … }` en `cine-luz-a.jsx` o `-b.jsx`. `e.tl` = segundos dentro de la escena; `e.L(i)` = cuándo empieza la frase `i`.
