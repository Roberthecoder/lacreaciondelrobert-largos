# Documental 004 · ¿La estafa del cartón? Papel contra plástico, con datos (16:9, 100 % ilustrado)

Sin voz por ahora: cada frase es un subtítulo y la música sale de los datos del guion. Dura unos 11.9 minutos, en 10 capítulos (del 0 al 9) y 39 escenas de lienzo más la tarjeta de marca.

| Archivo | Qué es |
|---|---|
| `guion_final.md` | El guion expositivo (se genera desde `video/escenas.js`). |
| `CAMBIOS.md` | Qué se quitó o reescribió respecto al guion original y qué falta decidir. |
| `fuentes.md`, `verificacion.md` | Fuentes (misma numeración que el original) y revisión dato por dato. |
| `publicacion.md` | Título y descripción de YouTube (borrador). |
| `original/` | Guion, fuentes, verificación, notas visuales y preguntas del guion original, sin tocar. |
| `video/escenas.js` | Capítulos → frases → escena (`v: { tipo: 'lienzo', id }`). |
| `video/cine-luz.jsx` | El kit. Al final tiene lo nuevo de este documental: fondos de color de la marca (`fondoColor`, `franja`), gráficas (`barra`, `barraH`, `balanza`, `panel`, `fuenteDato`) y dibujos (`bolsaPapel`, `bolsaPlastico`, `cajaCarton`, `arbol`, `fabrica`, `camion`, `pozo`, `mar`, `rellenoSanitario`, `vaso`, `popote`, `casa`, `bote`). |
| `video/cine-luz-a.jsx`, `cine-luz-b.jsx` | Las escenas (`window.LUZ.<id>`). En `-a` está la báscula de 15 platos (`bascula15`), que regresa en varios capítulos. |
| `video/doc-largo.jsx` | Motor. Aquí están la paleta de las tarjetas de capítulo y el tamaño del título de la tarjeta (se encoge si el título es largo). |
| `video/tiempos.mjs` | Imprime la línea de tiempo: en qué segundo empieza cada escena. |
| `video/musica_doc.py` | Genera la música (`video/voz/mezcla.m4a`): un acorde por capítulo y una campana por frase. |

## Reglas de este documental
- Cada cifra en pantalla lleva unidad, año y estudio. El estudio va abajo en una ficha «FUENTE · …» (`fuenteDato`).
- Lo que las fuentes dan como rango o como «depende» se rotula así. Las gráficas sin cifra (dirección, esquema) lo dicen.
- Escenas a escala humana: fondo de color de la marca, un color por capítulo. Solo el corte del vaso y el relleno sanitario van en oscuro.
- Robert en pantalla (9 apariciones): 0 s, 101 s, 151 s, 261 s, 348 s, 413 s, 530 s, 622 s y 703 s.

## Comandos (desde `motor/`)
- Hoja de cuadros: `NAVEGADOR=chrome node preview.mjs ../largos/doc-004-carton-plastico "Documental 004.dc.html" hoja.png 5,60,120 --horizontal`
  (si el primer tiempo pasa de 280 s, pon antes un tiempo chico).
- Un tramo: `node render.mjs ../largos/doc-004-carton-plastico "Documental 004.dc.html" tramo.mp4 --horizontal --fps 24 --desde 0 --hasta 27`
- Completo en la nube: cada push a la rama `largo-render/doc-004-carton-plastico` que toque `largos/` lanza `render-largo.yml` y deja el MP4 en Releases.
- Regenerar el guion en texto: ver el encabezado de `guion_final.md` (sale de `video/escenas.js`).

## Para agregar una escena
1. En `escenas.js`: `{ t: 'frase…', v: L('mi_escena') }` (las frases siguientes sin `v` continúan la misma escena).
2. En `cine-luz-a.jsx` o `-b.jsx`: `LUZ.mi_escena = E('menta', (ctx, e) => { … })`. `e.tl` = segundos dentro de la escena; `e.L(i)` = cuándo empieza la frase `i`.
