# Documental 005 · Esterilización del sustrato (16:9, 100 % ilustrado)

«¿Por qué NO basta con 15 minutos? La esterilización del sustrato, por dentro». Versión expositiva, sin voz (subtítulos y música), hecha con el kit **cine de luz** (`video/cine-luz.jsx`): cada escena es un lienzo dibujado en función del tiempo.

| Archivo | Qué es |
|---|---|
| `guion_final.md` | El guion expositivo y la tabla de apariciones de Robert (se genera desde `video/escenas.js`). |
| `CAMBIOS.md` | Qué se quitó o reescribió respecto al guion original y qué falta decidir. |
| `fuentes.md`, `verificacion.md` | Fuentes (misma numeración del original), cálculos propios y verificación dato por dato. |
| `publicacion.md` | Título y descripción de YouTube (borrador). |
| `original/` | Guion, fuentes, verificación, notas visuales y preguntas del guion original. |
| `video/escenas.js` | Capítulos, frases y escena de cada frase (`v: { tipo: 'lienzo', id }`). |
| `video/cine-luz-a.jsx` | Piezas compartidas (olla de presión con vista de rayos X, mapa de calor por conducción, bolsa, frasco de grano, endospora en corte, bacilo, gráficas, manómetro) y capítulos 0 a 3. |
| `video/cine-luz-b.jsx` | Capítulos 4 a 8 (aire, altitud, grano, tesis, pasteurizar, tiempos, errores y cierre). |
| `video/tiempos.mjs` | Imprime la línea de tiempo: en qué segundo empieza cada escena. |
| `video/musica_doc.py` | Genera la música (`video/voz/mezcla.m4a`): un acorde por capítulo y una campana por frase. |

Son 40 escenas de lienzo en 9 capítulos, más la tarjeta de marca. Abre y cierra con la misma olla (`escenaOlla`): al inicio el centro de la bolsa está frío y su reloj no corre; al final el centro llega a 121 °C y el reloj empieza a contar.

El mapa de calor no es decorativo: `ganado(rr, Fo)` es la solución de conducción en un cilindro largo y con ella se dibujan los cortes y las curvas del capítulo 3 (cálculo C2 de `fuentes.md`).

## Comandos (desde `motor/`)
- Hoja de cuadros: `NAVEGADOR=chrome node preview.mjs ../largos/doc-005-esterilizacion "Documental 005.dc.html" hoja.png 5,60,120 --horizontal`
  (si el primer tiempo pasa de 280 s, pon antes un tiempo chico).
- Un tramo: `node render.mjs ../largos/doc-005-esterilizacion "Documental 005.dc.html" tramo.mp4 --horizontal --fps 24 --desde 0 --hasta 31`
- Completo en la nube: cada push a la rama `largo-render/doc-005-esterilizacion` que toque `largos/` lanza `render-largo.yml` y deja el MP4 en Releases.
- Regenerar el guion: ver el encabezado de `guion_final.md` (sale de `video/escenas.js`).
