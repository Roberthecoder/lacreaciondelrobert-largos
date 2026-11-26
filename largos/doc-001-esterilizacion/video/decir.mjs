// decir.mjs — texto que se le manda a la voz: el subtítulo (l.t) con lo que una persona diría en voz alta.
// Si una línea trae "voz", se usa tal cual. Los subtítulos en pantalla no cambian.
const MEDIOS = [['minutos', 'minuto', 'un'], ['horas', 'hora', 'una'], ['centímetros', 'centímetro', 'un'], ['veces', 'vez', 'una']];
export function decir(l) {
  if (l.voz) return l.voz.trim();
  let s = l.t.trim();
  s = s.replace(/(\d),(\d{3})/g, '$1$2');                                   // 1,500 → 1500
  s = s.replace(/\bde 2 a 2\.5 horas\b/g, 'de dos a dos horas y media').replace(/\b2\.5 horas\b/g, 'dos horas y media').replace(/\b1\.5 minutos\b/g, 'un minuto y medio').replace(/\b1\.5 centímetros\b/g, 'un centímetro y medio');
  s = s.replace(/(\d+)\.(\d+)/g, '$1 punto $2');                             // 47.7 → 47 punto 7
  s = s.replace(/\s*°C/g, ' grados Celsius');
  s = s.replace(/ \(([^)]+)\)([,.:;]?)/g, (m, x, p) => `, ${x}${p || ','}`); // (psi) → , psi,
  s = s.replace(/,([.:;])/g, '$1').replace(/,,/g, ',').replace(/\s+/g, ' ');
  return s.trim();
}
