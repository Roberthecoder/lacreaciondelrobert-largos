// escenas.js — Documental 007 · ¿Los organismos come plástico son una estafa?
// Expositivo, 100 % ilustrado, sin voz por ahora (13 nov 2026). Solo datos de artículos arbitrados (ver ../fuentes.md y ../verificacion.md).
// Cada capítulo: { num, titulo, sub?, tarjeta?, lineas: [{ t: texto del subtítulo, v?: visual, robert?: [pose, lado] }] }
window.CAPS = (() => {
const L = (id) => ({ tipo: 'lienzo', id });
return [
  { num: 0, titulo: 'Gancho', tarjeta: false, lineas: [
    { t: 'Este hoyo no es plástico digerido: es plástico mordido.', v: L('hoyo'), d: 6.5, robert: ['avatar_11_sorprendido', 'arriba-der'] },
    { t: 'En 2017, la noticia de una oruga que se come las bolsas dio la vuelta al mundo.' },
    { t: 'Desde entonces, cada tanto aparece un nuevo organismo come plástico: gusanos, bacterias, hongos.', d: 7 },
    { t: 'La pregunta de este video: ¿de verdad se lo comen, o nos vendieron una promesa que no cuadra?', d: 7.5 },
  ] },

  { num: 1, titulo: 'La oruga', sub: 'El caso que empezó todo', lineas: [
    { t: 'La oruga es la larva de la polilla de la cera, Galleria mellonella.', v: L('oruga'), d: 6 },
    { t: 'El estudio original reportó que una pasta de orugas molidas, untada sobre polietileno, lo convertía en etilenglicol.', d: 9 },
    { t: 'Meses después, químicos de la Universidad de Maguncia, en Alemania, revisaron esos datos.', v: L('espectro'), robert: ['avatar_06_pensativo_menton', 'arriba-der'] },
    { t: 'Untaron polietileno con yema de huevo y con carne de cerdo molida, y obtuvieron señales muy parecidas.', d: 8.5 },
    { t: 'Su conclusión: faltaba la prueba de que el plástico se hubiera degradado. Lo medido podían ser restos de la propia oruga.', d: 9 },
    { t: 'Morder y moler no es digerir: si el plástico sale en pedacitos, sigue siendo plástico.', d: 7 },
  ] },

  { num: 2, titulo: '¿Qué cuenta como comer?', sub: 'Cuatro pasos', lineas: [
    { t: 'Para decir que un organismo degrada un plástico hay cuatro pasos: deteriorarlo, fragmentarlo, asimilarlo y mineralizarlo.', v: L('etapas'), d: 9 },
    { t: 'Mineralizar es el que cuenta: el carbono del plástico termina convertido en dióxido de carbono, agua y biomasa.', d: 8 },
    { t: 'Muchos estudios solo miden que la muestra perdió peso o que su superficie cambió.' },
    { t: 'Y ese peso perdido puede venir de los aditivos del plástico, no del polímero.' },
    { t: 'Un dato de escala: en un estudio clásico, el polietileno perdió 0.2 por ciento de su peso en 10 años.', d: 8, robert: ['avatar_10_serio_molesto', 'abajo-der'] },
  ] },

  { num: 3, titulo: 'El gusano de la harina', sub: 'El mejor caso entre los insectos', lineas: [
    { t: 'El mejor caso entre los insectos es el gusano de la harina, la larva del escarabajo Tenebrio molitor.', v: L('tenebrio'), d: 7.5 },
    { t: 'En 2015, con unicel marcado con carbono 13, se demostró que sí lo mineraliza: 47.7 por ciento del carbono ingerido salió como dióxido de carbono en 16 días.', d: 11, robert: ['avatar_13_senalando_arriba', 'arriba-centro'] },
    { t: 'Casi toda la otra mitad, 49.2 por ciento, salió en el excremento.', d: 6 },
    { t: 'Ahora la cuenta. Cien gusanos comieron entre 34 y 39 miligramos de unicel al día.', v: L('cuenta'), d: 7 },
    { t: 'Para comerse un kilo de unicel en un día harían falta unos 2.7 millones de gusanos.', d: 7 },
    { t: 'Y el mundo produce entre 350 y 400 millones de toneladas de plástico al año.', d: 7, robert: ['avatar_04_bajando_lentes', 'abajo-der'] },
  ] },

  { num: 4, titulo: 'La bacteria', sub: 'El caso más sólido', lineas: [
    { t: 'En 2016 llegó el caso más sólido: Ideonella sakaiensis, una bacteria que usa el PET (tereftalato de polietileno) como su principal fuente de carbono y energía.', v: L('ideonella'), d: 11 },
    { t: 'Produce dos enzimas que cortan el PET en sus piezas: ácido tereftálico y etilenglicol.', d: 8 },
    { t: 'El detalle: estas enzimas atacan bien el PET amorfo. Con el PET más cristalino, el de los productos comerciales, su efecto es limitado.', d: 10 },
    { t: 'Y aun las mejores enzimas conocidas para PET trabajan a velocidad moderada.', d: 6 },
  ] },

  { num: 5, titulo: 'Lo que sí funciona', sub: 'La enzima sin el organismo', lineas: [
    { t: 'Lo que sí avanzó fue otra cosa: sacar la enzima y meterla a un reactor.', v: L('reactor'), d: 6.5 },
    { t: 'En 2020, un equipo francés rediseñó una enzima encontrada en composta y logró despolimerizar 90 por ciento del PET en 10 horas.', d: 9.5, robert: ['avatar_11_sorprendido', 'arriba-der'] },
    { t: 'Con condiciones: PET pretratado para volverlo amorfo, y 3 miligramos de enzima por cada gramo de plástico.', d: 8 },
    { t: 'Con los monómeros recuperados volvieron a fabricar botellas.', d: 5.5 },
    { t: 'Eso es reciclaje industrial con enzimas. No es un organismo comiéndose la basura en un tiradero o en el mar.', d: 8 },
  ] },

  { num: 6, titulo: 'Los que nadie se come', sub: 'Más de 80 por ciento del plástico', lineas: [
    { t: 'Y el PET es la excepción.', v: L('pastel'), d: 3 },
    { t: 'Para el polietileno, el polipropileno, el poliestireno, el PVC (policloruro de vinilo) y el nailon, una revisión de 2019 no encontró ninguna enzima definida que actúe sobre el polímero.', d: 12 },
    { t: 'Juntos, esos plásticos son más de 80 por ciento de la producción anual.', d: 6.5 },
    { t: 'Otra revisión, de 2021, contó más de 400 especies de microbios señaladas como degradadoras de plástico, y concluyó que para los polímeros más comunes la evidencia es escasa, lenta o disputada.', v: L('especies'), d: 12 },
    { t: 'La razón está en la química: cadenas larguísimas de carbono unido a carbono, y una superficie que repele el agua, difícil de atacar para una enzima.', v: L('cadenaCC'), d: 10 },
    { t: 'Además, estos plásticos existen desde hace pocas décadas: la naturaleza casi no ha tenido tiempo de desarrollar enzimas para ellos.', d: 8.5 },
  ] },

  { num: 7, titulo: 'Entonces, ¿estafa?', lineas: [
    { t: 'Entonces, ¿son una estafa? Los estudios son reales, y algunos organismos sí rompen algunos plásticos.', v: L('veredicto'), d: 8, robert: ['avatar_07_pensativo_puno', 'arriba-der'] },
    { t: 'Lo que no cuadra es la promesa: que basta soltar gusanos o bacterias para que el plástico desaparezca.', d: 8 },
    { t: 'Tres preguntas para la próxima noticia.', v: L('preguntas'), d: 3.5 },
    { t: '¿Midieron dióxido de carbono que salió del plástico, o solo peso perdido?', d: 6 },
    { t: '¿Qué plástico era, y en qué forma: polvo amorfo o una botella real?', d: 6 },
    { t: '¿A qué velocidad, y comparada con cuánto plástico producimos?', d: 6 },
    { t: 'Regresa al hoyo de la bolsa.', v: L('cierre'), d: 3 },
    { t: 'El plástico que falta ahí no desapareció: hasta que alguien demuestre lo contrario, solo cambió de tamaño.', d: 9 },
    { t: 'Soy Robert, y esto es La Creación del Robert.', v: { tipo: 'marca', sub: '¿Cuál fue la última noticia de un come plástico que te creíste?' }, d: 3.6, robert: ['avatar_02_apuntando_camara', 'arriba-der'] },
    { t: 'Y tú, ¿cuál fue la última noticia de un organismo come plástico que te creíste?', d: 5.5 },
  ] },
];
})();
