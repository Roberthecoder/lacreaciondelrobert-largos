# Documental 006 · ¿Hay algo que no se pueda comer un hongo? (16:9, 100 % ilustrado)

Versión expositiva, sin voz (subtítulos y música), de 12.6 minutos. Hecho con el motor de largos y el kit **cine de luz** (`video/cine-luz.jsx`): cada escena es un lienzo (canvas) dibujado en función del tiempo.

| Archivo | Qué es |
|---|---|
| `guion_final.md` | El guion expositivo (se genera desde `video/escenas.js`), con la tabla de apariciones de Robert. |
| `CAMBIOS.md` | Qué se quitó o reescribió respecto al guion original y los pendientes para Robert. |
| `fuentes.md`, `verificacion.md` | Fuentes (F1 a F31) y la verificación dato por dato con cita corta. |
| `publicacion.md` | Borrador de título y descripción para YouTube. |
| `original/` | El expediente del guion original (antes doc-003): guion, fuentes, verificación, notas visuales y preguntas. |
| `video/escenas.js` | Capítulos → frases → escena (`v: { tipo: 'lienzo', id }`). |
| `video/cine-luz.jsx` | El kit: luz, texto, hifas (`red/pintaRed`), vidrio, veredicto. |
| `video/cine-luz-a.jsx` | Piezas propias de este documental (la mesa y sus ocho objetos, `hifaTubo`, `enzima`, `chispa` de radical libre, `malla` de lignina, `fibra` de celulosa, `cadena` de carbonos, `ficha` de estudio, `seta` *Pleurotus*) y las escenas de los capítulos 0 a 4. |
| `video/cine-luz-b.jsx` | Escenas de los capítulos 5 a 9. |
| `video/doc-largo.jsx` | Motor; aquí están `PALETA` (color por capítulo) y `CIENTIFICOS` (nombres en cursiva en los subtítulos). |
| `video/tiempos.mjs` | Imprime la línea de tiempo: en qué segundo empieza cada escena. |
| `video/musica_doc.py` | Genera la música (`video/voz/mezcla.m4a`): un acorde por capítulo y una campana por frase. |

## Código de color de los dibujos
Hifa en crema, enzimas en amarillo (comecocos), radicales libres como chispas naranjas, lignina en café, celulosa en verde claro, flúor en verde agua. Los tres veredictos: verde (se lo comen), amarillo (crecen encima y lo atacan), rojo (sin pruebas).

## Comandos (desde `motor/`)
- Hoja de cuadros: `NAVEGADOR=chrome node preview.mjs ../largos/doc-006-hongo-no-come "Documental 006.dc.html" hoja.png 5,60,120 --horizontal`
  (si el primer tiempo pasa de 280 s, pon antes un tiempo chico).
- Un tramo: `node render.mjs ../largos/doc-006-hongo-no-come "Documental 006.dc.html" tramo.mp4 --horizontal --fps 24 --desde 0 --hasta 27`
- Completo en la nube: cada push a la rama `largo-render/doc-006-hongo-no-come` que toque `largos/` lanza `render-largo.yml` y deja el MP4 en Releases.
- Si editas `escenas.js`, hay que volver a generar `guion_final.md` (una frase por renglón, mismas duraciones que `tiempos.mjs`) y la música.

## Para agregar una escena
1. En `escenas.js`: `{ t: 'frase…', v: L('mi_escena') }` (las frases siguientes sin `v` continúan la misma escena).
2. En `cine-luz-a.jsx` o `-b.jsx`: `LUZ.mi_escena = (ctx, e) => { … }`. `e.tl` = segundos dentro de la escena; `e.L(i)` = cuándo empieza la frase `i`.
