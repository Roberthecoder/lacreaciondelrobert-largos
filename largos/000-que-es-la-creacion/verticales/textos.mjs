// textos.mjs — escribe publicacion.md con los textos de los 13 shots verticales (TikTok, Instagram, YouTube Shorts, Facebook).
// El mini artículo de cada shot es su propio guion (lo mismo que dice la voz). Uso: node textos.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
globalThis.window = {};
new Function(fs.readFileSync(path.join(AQUI, '../video/escenas.js'), 'utf8'))();
const lineas = window.CAPS.flatMap((c) => c.lineas.map((l) => l.t.trim()));
const cortes = JSON.parse(fs.readFileSync(path.join(AQUI, 'cortes.json'), 'utf8'));

// Por shot: gancho (primera línea), título corto de YouTube, pregunta y hashtags del tema.
const EXTRA = [
  { yt: 'Todo empezó con un frijol en un frasco 🌱', q: '¿Cuál fue tu "experimento del frijolito", eso que te hizo amar la ciencia?', h: '#Biotecnologia #Plantas #Ciencia' },
  { yt: 'Mi primer negocio: vender plantas de niño 🪴', q: '¿Cuál fue tu primer negocio (o tu primer intento)?', h: '#Emprendimiento #Plantas #Jitomate' },
  { yt: 'Este canal existe desde 2015 📺', q: '¿Qué fue lo primero que subiste a internet?', h: '#Ciencia #YouTube #Olimpiadas' },
  { yt: 'Cazaba monedas de plata… con un imán 🪙', q: '¿Tú coleccionabas algo de niño?', h: '#Numismatica #Ciencia #Tianguis' },
  { yt: '"Emprendedor, matemático… y sólo tiene 11 años" 📰', q: '¿Qué titular te habrían puesto a ti a los 11 años?', h: '#Emprendimiento #Matematicas #Ciencia' },
  { yt: 'El hongo que no quiso crecer 🍄', q: '¿Alguna vez algo te salió mal… y por eso te apasionó más?', h: '#FungiMati #Hongos #Micologia' },
  { yt: 'No soy el más brillante en matemáticas 🧮', q: '¿Para ti las matemáticas son un medio o un fin?', h: '#Matematicas #Olimpiadas #Ciencia' },
  { yt: 'Mi recámara olía a paleta de cereza 🧫', q: '¿Cuál ha sido tu experimento casero más raro?', h: '#FungiMati #Microbiologia #Hongos' },
  { yt: 'Hongos que crecen sobre basura ♻️🍄', q: '¿Qué residuo de tu casa crees que podría servir para cultivar hongos?', h: '#FungiMati #Hongos #CienciaAmbiental' },
  { yt: 'No tenían ni 5 pesos para entrar a un baño 🚻', q: '¿Qué problema de tu ciudad te gustaría resolver con ciencia?', h: '#CienciaAmbiental #Innovacion #BañoSeco' },
  { yt: 'Un hongo y una bacteria brillando junto a mi cama ✨', q: '¿Tendrías un hongo que brilla en tu cuarto?', h: '#Bioluminiscencia #Hongos #Microbiologia' },
  { yt: 'Fungi Mati ganó 5,000 dólares 🍄💵', q: '¿Qué harías tú con un premio así para tu proyecto?', h: '#FungiMati #Emprendimiento #Hongos' },
  { yt: '¿Qué es La Creación del Robert? 🌱', q: '¿De qué tema te gustaría que hiciera el próximo video?', h: '#Ciencia #Biotecnologia #Divulgacion' },
];
const CIENT = /(Pleurotus djamor|Panellus stipticus|Aliivibrio fischeri|Trichoderma)/g;
const bloque = (t) => '```text\n' + t.trim() + '\n```\n';
let md = `# Publicación · Shots verticales del largo #00

13 shots verticales (1080×1920, 66–72 s) hechos con fragmentos del documental «¿Qué es La Creación del Robert?»,
con la misma voz y la misma música. Los videos están en Releases → «Verticales · shots-largo/largo00» (vertical_01.mp4 … vertical_13.mp4).
Son solo versión narrada (vienen del largo; no hay versión sin voz).

**En todas las redes:** marcar "contenido generado o alterado con IA" (la narración es la voz de Robert clonada con IA).
**Comentario fijado (igual en todas):** el enlace al video completo en YouTube cuando ya esté público.

Orden sugerido para publicar: del 01 al 13, uno por día (cuentan la historia en orden, pero cada uno se entiende solo).

`;
cortes.forEach((c, i) => {
  const e = EXTRA[i], n = String(i + 1).padStart(2, '0');
  const guion = lineas.slice(c.lineas[0], c.lineas[1] + 1).join(' ').replace(/\s+/g, ' ');
  const corto = guion.length > 900 ? guion.slice(0, guion.lastIndexOf('. ', 900) + 1) : guion;
  const gancho = c.titulo;
  const firma = 'Soy Robert, de La Creación del Robert 🌱';
  const tags = `#LaCreacionDelRobert ${e.h}`;
  md += `---\n\n## ${n} · ${gancho}\n\n`;
  md += `### TikTok\n` + bloque(`${gancho}\n\n${guion}\n\nEs parte de mi historia (${n}/13). La historia completa está en mi canal de YouTube: «¿Qué es La Creación del Robert?». Las ilustraciones son esquemáticas; las fotos son reales.\n\n${e.q} 👇\n\n${firma}\n${tags}`) + '\n';
  md += `### Instagram Reels\n` + bloque(`${gancho}\n\n${corto}\n\nParte ${n}/13 de mi historia. Video completo en mi canal de YouTube (enlace en el perfil).\n\n${e.q} 👇\n\n${firma}\n${tags}`) + '\n';
  md += `### YouTube Shorts\nTítulo:\n` + bloque(e.yt) + `Descripción:\n` + bloque(`${gancho}\n\n${guion}\n\nParte ${n}/13 de mi historia. Mira el documental completo en el canal: «¿Qué es La Creación del Robert?».\nLas ilustraciones son esquemáticas; las fotos son reales. Narración con mi voz clonada con IA.\n\n${e.q} 👇\n\n${firma}\n#Shorts #LaCreacionDelRobert ${e.h.split(' ')[0]}`) + '\n';
  md += `### Facebook Reels\n` + bloque(`${gancho}\n\n${corto.split('. ').slice(0, 3).join('. ').replace(/\.?$/, '.')}\n\n${e.q} 👇\n${firma}\n#LaCreacionDelRobert ${e.h.split(' ')[0]}`) + '\n';
});
fs.writeFileSync(path.join(AQUI, 'publicacion.md'), md.replace(CIENT, '$1'));
console.log('publicacion.md · ' + md.length + ' caracteres');
