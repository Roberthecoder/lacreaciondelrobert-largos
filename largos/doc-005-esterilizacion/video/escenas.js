// escenas.js — Documental 005 · ¿Por qué NO basta con 15 minutos? La esterilización del sustrato, por dentro.
// Versión 2 (13 nov 2026, revisión de Robert): solo datos de artículos arbitrados, sin frases repetidas, con frascos además de bolsas,
// y con la tesis al frente: 15 min a 121 °C no alcanzan para inóculo ni sustrato; por qué los frascos van de 60 a 90 min y las bolsas de 2 a 2.5 h.
// Cada capítulo: { num, titulo, sub?, tarjeta?, lineas: [{ t: texto del subtítulo (igual a guion_final.md), v?: visual, robert?: [pose, lado] }] }
// Una línea sin "v" continúa el visual anterior. v: { tipo: 'lienzo', id } dibuja window.LUZ[id] (cine-luz-a.jsx, -b.jsx y -c.jsx).
window.CAPS = (() => {
const L = (id) => ({ tipo: 'lienzo', id });
return [
  { num: 0, titulo: 'Gancho', tarjeta: false, lineas: [
    { t: 'Esta olla ya marca 121 grados Celsius: el centro de la bolsa que lleva adentro, todavía no.', v: L('olla2'), robert: ['avatar_11_sorprendido', 'arriba-der'] },
    { t: '15 minutos a 121 °C es la receta clásica de los laboratorios.' },
    { t: 'En el cultivo de hongos casi nunca alcanza: a los frascos de grano se les suele dar de 60 a 90 minutos, y a las bolsas de sustrato, de 2 a 2.5 horas.' },
    { t: 'Casi toda esa diferencia es lo que tarda el calor en llegar al centro.' },
  ] },

  { num: 1, titulo: 'Los 15 minutos', sub: 'De dónde sale la receta', lineas: [
    { t: 'Los 15 minutos son el tiempo que el material debe pasar a 121 °C, en contacto con vapor.', v: L('receta') },
    { t: 'Están pensados para las endosporas bacterianas, de lo más resistente al calor que se conoce.' },
    { t: 'Esa resistencia se mide con el valor D: el tiempo que tarda el calor en matar al 90 por ciento de las esporas.', v: L('valord') },
    { t: 'En las esporas de prueba de Geobacillus stearothermophilus que usó la Agencia de Protección Ambiental de Estados Unidos (EPA), el valor D a 121 °C fue de 1.5 minutos.' },
    { t: 'En 15 minutos caben diez de esos pasos: de un millón de esporas, la probabilidad de que sobreviva una baja a una en diez mil.', d: 9.5, robert: ['avatar_13_senalando_arriba', 'abajo-der'] },
    { t: 'La receta tiene una condición que casi nadie lee: habla del material, no de la olla.', v: L('material') },
  ] },

  { num: 2, titulo: 'El reloj del centro', sub: 'Lo que se ha medido', lineas: [
    { t: 'Los 15 minutos empiezan a contar cuando el punto más frío de la carga llega a 121 °C.', v: L('relojes') },
    { t: 'No cuando prendes la estufa, ni cuando el manómetro marca la presión.' },
    { t: 'En 1993, un estudio midió ese retraso en 276 bolsas de residuos de laboratorio, llenas a la mitad.', v: L('ozanne') },
    { t: 'Con el autoclave a 121 °C, el centro de la carga tardó en promedio 46 minutos en alcanzar esa temperatura.' },
    { t: 'Con doble bolsa tardó 60. Con la bolsa dentro de un contenedor vertical, 82.' },
    { t: 'Con cortes en la bolsa para que entrara el vapor, 37.' },
    { t: 'En 1982, otro estudio probó cargas de 2.3, 4.5 y 6.8 kilos, con esporas de prueba adentro.', v: L('rutala') },
    { t: 'Con las de 4.5 y 6.8 kilos, lo único que aseguró matar las esporas fue un contenedor de acero inoxidable y 90 minutos de ciclo.' },
    { t: 'Las cargas chicas se calentaron mejor que las grandes, y el acero, mejor que el plástico.' },
    { t: 'En 2005, la EPA metió a un autoclave comercial bolsas con tablaroca, plafones y alfombra.', v: L('epa') },
    { t: 'Dentro del material escondió 24 termopares, que son termómetros de cable, y tiras con un millón de esporas cada una.' },
    { t: 'La cámara trabajaba a unos 135 °C, y su sensor llegó rápido.', v: L('curvas') },
    { t: 'Muchos termopares dentro del material nunca llegaron a 121 °C.' },
    { t: 'Ni en dos horas.', d: 3, robert: ['avatar_10_serio_molesto', 'abajo-der'] },
    { t: '¿Y las esporas?', v: L('tiras'), d: 2.4 },
    { t: 'Donde el material sí pasó 15 minutos a 121 °C, no creció nada.' },
    { t: 'En la mayoría de los puntos que no llegaron, sí crecieron.' },
  ] },

  { num: 3, titulo: 'El calor lento', sub: 'Tubo, frasco y bolsa', lineas: [
    { t: '¿Por qué tarda tanto el centro? Los autores del estudio de la EPA propusieron una explicación.', v: L('poros'), robert: ['avatar_06_pensativo_menton', 'arriba-der'] },
    { t: 'Cuando el vapor toca el material frío, se condensa y llena los poros de agua.' },
    { t: 'Con los poros llenos, plantean, el calor entra casi solo por conducción: de partícula en partícula.' },
    { t: 'Una simulación deja comparar recipientes. Supone lo peor: que el calor avanza solo por conducción, a la velocidad con que lo hace en el agua.', v: L('simula'), robert: ['avatar_13_senalando_arriba', 'abajo-der'] },
    { t: 'Así, el centro de un tubo de ensayo de 1.5 centímetros de ancho alcanza al vapor en unos 6 minutos.' },
    { t: 'El de un frasco de 8 centímetros, en unas 2 horas y 40 minutos. El de una bolsa de 12, en unas 6 horas.', d: 10 },
    { t: 'El tiempo crece con el cuadrado del ancho: la bolsa es una vez y media más ancha que el frasco, y tarda más del doble.' },
    { t: 'En cargas reales algo de vapor sí se cuela, y los tiempos medidos son menores. El orden no cambia: primero el tubo, luego el frasco, al final la bolsa.' },
    { t: 'Al punto que más tarda en calentarse se le llama punto frío.', v: L('puntofrio') },
    { t: 'En un recipiente que se calienta desde afuera, queda hacia el centro.' },
  ] },

  { num: 4, titulo: 'Aire y altitud', sub: 'Lo que le resta grados a la olla', lineas: [
    { t: 'El segundo obstáculo es el aire que se queda atrapado.', v: L('aire2') },
    { t: 'Para esterilizar con vapor, todo el aire tiene que salir: donde queda aire, el vapor no toca el material, y esa zona se calienta menos.', d: 8 },
    { t: 'En una olla, eso se consigue dejando salir vapor antes de cerrar la válvula o de poner la pesa.', v: L('purga2'), d: 7.5 },
    { t: 'La altitud también resta.', v: L('altitud2'), d: 2.6 },
    { t: 'La pesa agrega 15 libras por pulgada cuadrada (psi) sobre la presión del aire de afuera.' },
    { t: 'A 1,500 metros de altitud el aire de afuera empuja menos, y la misma pesa deja el vapor en unos 118 °C en lugar de 121.', d: 8, robert: ['avatar_04_bajando_lentes', 'abajo-der'] },
    { t: 'Para las esporas, esos 3 grados pesan: a 118 °C hace falta casi el doble de tiempo para lograr lo mismo, y con algunas cepas, el triple.', v: L('letal2'), d: 9 },
    { t: 'Entre más alto vives, más tiempo necesita tu ciclo, o más presión si tu olla la permite.', robert: ['avatar_02_apuntando_camara', 'abajo-der'] },
    { t: 'Y no todas las ollas llegan. En 2018 se probaron cuatro marcas de ollas eléctricas de presión.', v: L('ollas') },
    { t: 'Todas esterilizaron medios de cultivo e instrumentos, pero solo una logró matar las esporas de prueba.', d: 8 },
  ] },

  { num: 5, titulo: 'El grano', sub: 'El caso más difícil', lineas: [
    { t: 'El caso más duro es el inóculo de grano, lo que muchos cultivadores llaman semilla.', v: L('grano') },
    { t: 'El grano puede traer de origen endosporas de bacterias del género Bacillus.' },
    { t: 'Una endospora es una bacteria en reposo, envuelta en varias capas protectoras.', v: L('endospora') },
    { t: 'Su núcleo puede tener apenas una cuarta parte de agua.' },
    { t: 'Entre menos agua tiene ese núcleo, más resiste el calor húmedo.' },
    { t: 'Puede pasar cientos de años en reposo y germinar en minutos cuando encuentra alimento.', v: L('germina') },
    { t: 'En 2020, un centro de investigación de hongos de la India puso a prueba los ciclos cortos con inóculo de grano.', v: L('gupta') },
    { t: 'Con un solo ciclo de 20 minutos a 15 psi, los síntomas de contaminación por bacterias bajaron apenas 23 por ciento frente al grano sin tratar.', d: 9, robert: ['avatar_10_serio_molesto', 'arriba-der'] },
    { t: 'Hicieron falta tres ciclos, con un día de espera entre uno y otro, para bajarlos casi 99 por ciento.', d: 8 },
    { t: 'La bacteria que aislaron del inóculo contaminado fue Bacillus.' },
  ] },

  { num: 6, titulo: '¿Cuántos minutos?', sub: 'La cuenta completa', lineas: [
    { t: 'Con todo esto, el tiempo de un ciclo se entiende como una suma.', v: L('cuenta') },
    { t: 'Primero, lo que tarda el centro en llegar a 121 °C: en las bolsas medidas, de 37 a 82 minutos.' },
    { t: 'Después, los 15 minutos de la receta, ya con el centro caliente.' },
    { t: 'Y un margen: por la altitud, por el aire que no salió del todo y por un grano que llega cargado de esporas.' },
    { t: 'Por eso a los frascos de grano se les suele dar de 60 a 90 minutos.' },
    { t: 'Y a las bolsas, que son más anchas, de 2 a 2.5 horas.' },
    { t: 'Los artículos de cultivo reportan cifras del mismo orden: de 90 a 120 minutos para el grano y de 90 a 160 para bolsas de sustrato.', d: 9 },
    { t: '¿Cómo saber si tu ciclo alcanzó? Mucha gente se guía solo por la cinta testigo.', v: L('cinta'), robert: ['avatar_06_pensativo_menton', 'arriba-der'] },
    { t: 'La cinta cambia de color cuando recibe vapor caliente. Avisa que el paquete pasó por el proceso, y nada más.', d: 8 },
    { t: 'No mide si el centro cumplió su tiempo. En 1979 se compararon 21 indicadores químicos contra esporas de prueba, y solo 2 siguieron bien la combinación de tiempo y temperatura.', d: 11 },
    { t: 'La prueba directa es el indicador biológico: esporas de Geobacillus stearothermophilus, una bacteria que crece en caliente.', d: 8.5 },
    { t: 'Así se valida un ciclo.', v: L('validar'), d: 2.8 },
    { t: 'El indicador se coloca en el centro de la carga, se corre el ciclo y después se incuba.', d: 8 },
    { t: 'Si las esporas no crecen, el ciclo sirve para esa carga.' },
    { t: 'Si crecen, el ciclo se alarga y la prueba se repite.' },
    { t: 'La EPA midió algo más: las cargas apretadas se esterilizaron peor que las sueltas.', v: L('carga') },
  ] },

  { num: 7, titulo: 'En el centro', sub: '15 minutos a 121 °C', lineas: [
    { t: 'Regresa a la olla del principio.', v: L('cierre2'), d: 3 },
    { t: 'Por fuera se ve igual: la pesa se mueve y el manómetro marca.' },
    { t: 'Adentro, el calor avanza de la orilla al centro, donde unas endosporas siguen en reposo.', d: 6.5 },
    { t: 'Los 15 minutos de la receta empiezan aquí: cuando el centro del frasco o de la bolsa, por fin, llega a 121 °C.', d: 9 },
    { t: 'Soy Robert, y esto es La Creación del Robert.', v: { tipo: 'marca', sub: '¿Cuánto tiempo le das tú a tus bolsas y a tus frascos?' }, d: 3.6, robert: ['avatar_02_apuntando_camara', 'abajo-izq'] },
    { t: 'Y tú, ¿cuánto tiempo le das a tus bolsas y a tus frascos, y desde cuándo lo cuentas?', d: 5.5 },
  ] },
];
})();
