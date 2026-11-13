# Verificación de hechos · Doc 001 · Esterilización del sustrato

- **Verificador:** subagente independiente (no escribió el guion), 7 nov 2026.
- **Revisado:** `guion_final.md`, `notas_visuales.md`, `fuentes.md`, `preguntas.md`.
- **Fuentes abiertas de verdad** (texto completo descargado, no el resumen del buscador): Lemieux et al. 2006 (PMC), guía UBC/STERIS (PDF), George et al. 2024 (PMC), Jimenez et al. 2024 (PMC), Setlow & Christie 2021 (Europe PMC), NCHFP/UGA C1344-02 (PDF), NIST WebBook (tablas de saturación e isobara del agua), Wikipedia es/en (altitud de Guadalajara; tabla de difusividad), USDA Forest Products Lab, *Wood Handbook* cap. 4 (2010), Penn State Spawn Lab, Penn State Extension (*Agaricus*), Bréant 2025 (tesis, PDF), Grimm et al. 2024 (PDF), Priorclave 2023, CDC «Steam Sterilization» (Guideline 2008, pág. act. 28 nov 2023), Rodrigo et al. 2021 (*Foods*, PMC7913059), «Germination and Heat Resistance of Parageobacillus and Geobacillus spp. Spores» 2025 (PMC12191528, valores z).
- **No se pudo abrir:** las páginas de la CDC sobre «orden de resistencia de los microbios» (priones vs esporas): el sitio devolvió páginas vacías. Por eso el superlativo de la fila 2 queda ⚠️.

## Cálculos rehechos

### A. Olla con pesa de 15 lb en Guadalajara
- **Altitud:** Wikipedia es «Altitud • Media 1536 m s. n. m.» y «altitud promedio de 1570 m s. n. m.»; Wikipedia en «Elevation 1,566 m». → «unos mil quinientos metros» ✅.
- **Presión atmosférica** (atmósfera estándar ISA, p = 101.325·(1 − 2.25577×10⁻⁵·h)^5.25588): 1,536 m → 84.2 kPa; 1,566 m → 83.9 kPa; 1,570 m → 83.8 kPa.
- **Pesa:** 15 psi = 15 × 6.894757 = 103.4 kPa manométricos (la pesa equilibra la diferencia entre adentro y afuera; NCHFP: «Internal canner pressures (and therefore temperatures) are lower at higher elevations»).
- **Presión absoluta:** 84.2 + 103.4 ≈ 187.6 kPa (de 187.3 a 188.0 según altitud).
- **Temperatura de saturación** (NIST WebBook, agua, saturación por presión, consultado 7 nov 2026): «118.18 °C · 0.18750 MPa»; «117.76 °C · 0.18500 MPa»; «120.99 °C · 0.20500 MPa». Con la ecuación IAPWS‑IF97 de la región 4: 118.15–118.26 °C. A nivel del mar (101.3 + 103.4 = 204.7 kPa): 120.95 °C.
- **Resultado:** Guadalajara ≈ **118.2 °C** (no 121). Si la presión real del día es algo mayor (≈ 85 kPa), 118.3 °C. El guion («unos ciento dieciocho grados») ✅.

### B. Letalidad a 118 °C frente a 121 °C
- L = 10^((T − 121.1)/z).
- z deducido del lote EPA (F1: «D 121 value … 1.5 min; D 132.2 value, 0.14 min»): z = (132.2 − 121)/log₁₀(1.5/0.14) = **10.9 °C**. Es razonable: la convención de F0 usa z = 10 °C. En la literatura, el z de *G. stearothermophilus* varía con la cepa y la forma de esporular: el artículo de 2025 PMC12191528, tabla 2, ATCC 12980: z = 5.07 a 8.47 °C.
- A 118.2 °C: z = 10.9 → L = 0.54; z = 10 → 0.51; z = 7 → 0.39 (todo relativo a 121.1 °C).
- **Resultado:** con las esporas «de antes» (lote EPA), 1 min a 118 °C ≈ 0.5 min a 121 °C ✅. Con cepas de z más bajo sería todavía peor (≈ 0.4). El guion dice «haciendo la cuenta con las esporas de antes», así que está bien acotado.

### C. Conducción: tubo de 1.5 cm vs bolsa de 10 cm
- **Difusividad del agua** (NIST WebBook, isobara, α = k/(ρ·cp)): a 25 °C, 0.1 MPa: k = 0.60652 W/m·K, ρ = 997.05 kg/m³, cp = 4.1813 kJ/kg·K → **α = 0.1455 mm²/s**. A 20 °C: 0.1432 mm²/s. A 70 °C: 0.161; a 120 °C: 0.171. → El 0.143 de Wikipedia corresponde a **20 °C**, no a 25 °C.
- **Tiempo característico R²/α** (R = radio o medio grosor): tubo R = 0.75 cm → 6.4 min (α 25 °C) / 5.8 min (α 70 °C); bolsa R = 5 cm → 4.8 h / 4.3 h. Razón (5/0.75)² = **44** («más de cuarenta veces» ✅).
- **Pero R²/α no es «lo que tarda»**. Solución de Fourier (serie completa, centro, superficie a temperatura fija; θ = fracción del salto que falta):

| Forma | 63 % del salto (θ = 0.37) | 95 % (θ = 0.05) | 99 % (θ = 0.01, ≈ 1 °C de la orilla) |
|---|---|---|---|
| Cilindro largo | Fo = 0.25 | **Fo = 0.60** | Fo = 0.88 |
| Placa (grosor 2R) | Fo = 0.50 | Fo = 1.31 | Fo = 1.96 |
| Esfera | Fo = 0.17 | Fo = 0.37 | Fo = 0.54 |

  (Fo = α·t/R². El «0.4·R²/α» corresponde a una **esfera**, no a un cilindro; para un cilindro el 95 % es 0.6·R²/α.)
- **Tubo** (cilindro, R = 0.75 cm, α = 0.146–0.161): 95 % en **3.5–3.9 min**; 99 % en 5.1–5.6 min.
- **Bolsa de 10 cm** como cilindro (R = 5 cm): 95 % en **2.6–2.9 h**; 99 % en 3.8–4.2 h. Como placa de 10 cm de grosor (peor caso): 95 % en 5.6–6.3 h. Una bolsa real (bloque finito) queda entre las dos.
- **Conclusión:** la escala (×44, «al cuadrado») es correcta, pero «unos siete minutos» y «cerca de cinco horas» son el tiempo característico R²/α con α a 20 °C, que el espectador va a oír como «lo que tarda el centro». Mejor decir cifras de «casi llegar» (ver corrección 23).

## Tabla de afirmaciones (guion)

| # | Afirmación | Veredicto | Fuente | Frase textual | Año |
|---|---|---|---|---|---|
| 1 | «15 min a 121 °C» es la receta clásica y cuenta con el **material** a esa temperatura | ✅ | Lemieux et al., AEM 72:7687, https://pmc.ncbi.nlm.nih.gov/articles/PMC1694242/ | «Previously published data indicate that holding material for 15 min at 250°F is required to ensure moist heat sterilization» | 2006 |
| 2 | «Se calcularon contra los enemigos más duros que existen: las esporas bacterianas» | ⚠️ | Setlow & Christie 2021, PMC8342367 (resistencia); el origen exacto de los 15 min y el superlativo no se pudieron verificar (en la jerarquía usual los priones son más resistentes que las esporas; no pude abrir la página de la CDC) | «Spores … are dormant and extremely resistant to all manner of killing regimens» | 2021 |
| 3 | Para comprobar un autoclave se usan esporas de *Geobacillus stearothermophilus*; «bacteria que ama el calor» | ✅ | George et al. 2024, *Ann Surg Open*, PMC11175864; CDC Steam Sterilization (2008, pág. 2023) | «an indicator containing spores of the thermophile, Geobacillus stearothermophilus is used to confirm sufficient autoclave sterilization» | 2024 |
| 4 | Valor D = tiempo para matar al 90 % | ✅ | Jimenez et al. 2024, *Food Sci Nutr*, PMC10916645 | «The D‐value is the duration of heat treatment at a specific temperature necessary to kill 90% of the microbial population.» | 2024 |
| 5 | En ese lote D₁₂₁ = 1.5 min (cada 1.5 min sobrevive 1 de cada 10) | ✅ | Lemieux et al. 2006; CDC | F1: «D 121 value [i.e., the time it takes for a 1-log kill at 121°C], 1.5 min». CDC: «D 121C -values for Geobacillus stearothermophilus used to monitor the steam sterilization process range from 1 to 2 minutes.» | 2005 (lote); 2006 (publicación) |
| 6 | El experimento/lote de la EPA fue «en 2006» (se repite en caps. 01, 02, 03 y 07) | ⚠️ | Lemieux et al. 2006 | «The Environmental Protection Agency conducted the tests on 4 to 6 March 2005 at the Healthcare Environmental, Inc., facility located in Oneonta, NY» · «Received 2005 Oct 31 … Issue date 2006 Dec» | pruebas 2005; artículo 2006 |
| 7 | 15 min = 10 reducciones; de 10⁶ queda 1 tras 6; tras 10, probabilidad 1 en 10,000 | ✅ | Cálculo con F1 y F4: 15/1.5 = 10; 10⁶·10⁻⁶ = 1; 10⁶·10⁻¹⁰ = 10⁻⁴ | — | — |
| 8 | En hospitales lo típico es 1 en un millón; se llama nivel de garantía de esterilidad | ✅ | George et al. 2024 | «Sterility assurance levels represent the probability of finding a single microbe on an instrument after it has been sterilized and levels of 10 −6 are typical.» | 2024 |
| 9 | Tabla de un fabricante (STERIS) usada por UBC: 75 ml → 25 min; 1 L → 45; 2 L → 55 | ✅ | UBC «Autoclave: Good Practice Guide», Table 2 (PDF creado 2020, publicado 2021) | «Table 2: STERIS Liquid Cycle recommendations … 75 25 … 1000 45 … 2000 55» | 2020–2021 |
| 10 | Los tiempos ya incluyen el calentamiento | ✅ | UBC | «Listed times include the combined time required to reach 121 ̊C and the time required to achieve sterilization at 121 ̊C.» | 2020–2021 |
| 11 | La EPA metió a un autoclave comercial bolsas con tablaroca, plafones y alfombra | ✅ | Lemieux et al. 2006 | «The test team created simulated BDR from wallboard, ceiling tiles, carpet, and upholstered furniture» | 2005/2006 |
| 12 | 24 termopares y tiras con un millón de esporas | ✅ | Lemieux et al. 2006 | «For each test run, 24 thermocouples were embedded in the BDR material» · «Each BI strip contained 10 6 spores» | 2005/2006 |
| 13 | El sensor de la cámara llegó rápido; muchos termopares nunca llegaron a 121 °C, ni en dos horas | ✅ | Lemieux et al. 2006 | «although the temperature of the control thermocouple rapidly approached the autoclave operating temperature, the temperature of many of the thermocouples never reached the target temperature, 250°F.» · «Runs 1, 2, and 3 were terminated at 120 min, before all the thermocouples reached the target temperature.» (Nota: la cámara operaba a 275 °F ≈ 135 °C, 31.5 psi: el punto queda aún más fuerte.) | 2005/2006 |
| 14 | Donde hubo 15 min a 121 °C no creció nada; «donde no llegó… sí crecieron» | ⚠️ (imprecisa: «la mayoría») | Lemieux et al. 2006 | «…there was no growth on the corresponding BI strips, while the data for **most** of the sample locations that did not meet these time and temperature targets showed that there was growth.» | 2005/2006 |
| 15 | Adentro de un bloque húmedo «el calor no viaja con el vapor: viaja por conducción» | ⚠️ (absoluta; la fuente dice «mostly», y el propio guion luego dice que algo de vapor se cuela) | Lemieux et al. 2006 | «heat was transferred to the interior of the material mostly through conduction, which was slow» | 2006 |
| 16 | Agua a 25 °C: α = 0.143 mm²/s | ⚠️ | NIST WebBook (cálculo C); Wikipedia «Thermal diffusivity» | NIST a 25 °C → 0.1455 mm²/s; 0.143 es el valor a 20 °C (NIST: 0.1432). Wikipedia: «Water at 25 °C 0.143» (no coincide con NIST) | 2026 (consulta) |
| 17 | El agua tiene «una de las [difusividades] más bajas que conoces» | ⚠️ (exagerada: plásticos, hule y madera tienen igual o menos) | Wikipedia «Thermal diffusivity» | «PP (polypropylene) at 25 °C 0.096» · «Rubber 0.089–0.13» · «Wood (yellow pine) 0.082» | 2026 |
| 18 | Aluminio 97 mm²/s; «casi setecientas veces» más que el agua | ✅ | Wikipedia «Thermal diffusivity» (concuerda con k = 237 W/m·K, ρ = 2,702 kg/m³, cp = 903 J/kg·K → 97.1) | «Aluminium 97» · 97/0.143 = 678; 97/0.1455 = 667 | 2026 |
| 19 | «La madera deja pasar el calor todavía más lento que el agua» | ⚠️ (fuentes en conflicto) | USDA FPL, *Wood Handbook* cap. 4, https://research.fs.usda.gov/download/treesearch/37428.pdf ; Wikipedia | Wood Handbook: «A typical value for wood is 1.6 × 10–7 m2 s–1» (= 0.16 mm²/s, **más** que el agua, 0.146). Wikipedia: «Wood (yellow pine) 0.082» | 2010; 2026 |
| 20 | El tiempo crece con el tamaño al cuadrado; doble grosor → ×4 | ✅ | Ecuación del calor (Fo = αt/R²); cálculo C | — | — |
| 21 | Tubo de 1.5 cm ≈ 7 min; bolsa de 10 cm ≈ 5 h | ⚠️ | Cálculo C (NIST + Fourier) | 7 min y 5 h son R²/α con α a 20 °C. Centro al 95 %: tubo 3.5–3.9 min; bolsa‑cilindro 2.6–2.9 h (placa 5.6–6.3 h); al 99 %: 5–6 min y ≈ 4 h | — |
| 22 | «Más de cuarenta veces más, solo por el tamaño» | ✅ | Cálculo C: (5/0.75)² = 44 | — | — |
| 23 | Cuenta de peor caso; en la bolsa real algo de vapor se cuela y ayuda | ✅ (es la advertencia correcta) | Lemieux et al. 2006 («mostly through conduction») | — | 2006 |
| 24 | Hipótesis de los autores: el vapor se condensa en los poros fríos y después el calor entra casi solo por conducción | ✅ (dicho como «creen ellos») | Lemieux et al. 2006 | «We believe that when the cold, porous BDR material was exposed to the steam during the first cycle, condensate formed in the pores, limiting steam penetration…» | 2006 |
| 25 | «Punto frío» = el que tarda más en calentarse; en una bolsa casi siempre está en el centro | ✅ | Jimenez et al. 2024; Priorclave 2023 | F4: «heat penetration refers to the alteration in the supply of heat from the product area to its coldest point» · Priorclave: «making sure to have one at the center of the load's mass» | 2024; 2023 |
| 26 | Aire atrapado: el manómetro marca bien pero la temperatura es menor y el proceso queda corto; «el Departamento de Agricultura lo dice» | ⚠️ menor (la frase es de la guía de UGA/NCHFP; la recomendación sí se atribuye al USDA) | NCHFP/UGA Circular 1344‑02 (jun 2025) | «Any air trapped in the closed canner during the process will lower the temperature obtained for a given pressure (for example, 10 or 15 lb pressure) and will result in underprocessing. To be safe, the USDA recommends that all pressure canners be vented 10 min before they are pressurized.» | 2025 |
| 27 | Ventilar sin la pesa 10 min seguidos antes de presurizar | ✅ | NCHFP/UGA 2025 | «When a visible funnel shape of steam is continuously escaping the canner, set a timer for 10 min. After 10 min of continuous steam, you can … place the counterweight or weighted gauge over the vent pipe» | 2025 |
| 28 | La pesa marca 15 lb por encima del aire de afuera; arriba el aire empuja menos | ✅ | NCHFP/UGA 2025 + física (cálculo A) | «Internal canner pressures (and therefore temperatures) are lower at higher elevations.» | 2025 |
| 29 | Guadalajara a unos 1,500 m | ✅ | Wikipedia es/en | «Altitud • Media 1536 m s. n. m.» · «Elevation 1,566 m» | 2026 |
| 30 | Con 15 lb en Guadalajara la olla queda en ~118 °C | ✅ | Cálculo A con NIST WebBook | «118.18 [°C] 0.18750 [MPa]» | 2026 (consulta) |
| 31 | A 118 °C, 1 min mata como ½ min a 121 °C (con las esporas de antes) | ✅ | Cálculo B (z = 10.9 °C del lote F1 → 0.54; z = 10 → 0.51) | — | — |
| 32 | Las guías de enlatado piden subir la presión en altura | ✅ | NCHFP/UGA 2025 | «Canners must be operated at increased pressures as the elevation increases.» | 2025 |
| 33 | «Hice la cuenta con las tablas de vapor» (Robert en primera persona) | ⚠️ preguntar a Robert | — | La cuenta la hizo quien escribió el guion, no Robert; no está en `datos.md` | — |
| 34 | «los que vivimos en Guadalajara» | ⚠️ preguntar a Robert (PREGUNTA 7) | `datos.md` | Solo ✅ «Ing. en Biotecnología, Tec GDL»; no dice dónde vive | — |
| 35 | [PREGUNTA 3] «uso la pesa de 15 lb y le dejo salir el vapor» | ⚠️ preguntar a Robert | `datos.md` | Solo ✅ «Una olla de presión fue su autoclave» | — |
| 36 | Título del cap. 05 «Por qué el grano es **lo más** difícil» | ⚠️ (superlativo sin fuente; Priorclave da más tiempo a bolsas grandes de aserrín, >2.5 h, que a frascos de grano, 45 min–2 h) | Priorclave 2023 | «That same sawdust in blocks or large bags could take more than 2.5 hours … Jars of grain spawn can likewise sterilize in forty-five minutes to two hours» | 2023 |
| 37 | La semilla de hongo es grano colonizado | ✅ | Penn State Spawn Lab | «This grain/mycelium mixture is called spawn» | vigente 2026 |
| 38 | El grano puede traer de origen esporas de *Bacillus* | ✅ | Rodrigo et al. 2021, *Foods* 10:302, PMC7913059; Bréant 2025 (indicio) | «Rice, as a consequence of their cultivation, harvesting, and handling, is often contaminated with spores of Bacillus cereus, a ubiquitous microorganism found mainly in the soil.» | 2021 |
| 39 | Las esporas aguantan mucho en el ambiente y contaminan fácilmente los alimentos | ✅ | Setlow & Christie 2021 | «can survive for long periods in the environment … As a consequence, these species can readily contaminate foods» | 2021 |
| 40 | Son bacterias dormidas, metidas en una armadura | ✅ (metáfora de «dormant» + capas de cubierta) | Setlow & Christie 2021 | «Spores … are dormant and extremely resistant» | 2021 |
| 41 | «Por dentro casi no tienen agua: su centro puede ser apenas una cuarta parte agua» | ⚠️ menor («casi no tienen» exagera; 25 % es el mínimo, «as low as») | Setlow & Christie 2021 | «A major feature of the spore core is its very low water content … this can be as low as ~ 25% of wet weight.» | 2021 |
| 42 | Menos agua en el centro → más resistencia al calor húmedo | ✅ | Setlow & Christie 2021 | «there is a good inverse relationship between spores' core water content and wet heat resistance» | 2021 |
| 43 | Cientos de años dormidas; despiertan en minutos | ✅ | Setlow & Christie 2021 | «can survive in this state for many 100 s of years, given the proper environment spores can return to life in the process of germination within minutes» | 2021 |
| 44 | Revisión 2021: algunas cepas de *Bacillus* aguantan las temperaturas normales de procesamiento | ✅ | Setlow & Christie 2021 | «spores of some Bacillus strains that can resist normal food processing temperatures used for wet heat» | 2021 |
| 45 | Penn State: matraz chico de centeno 35 min a 121 °C; de 1 L, 45 min | ✅ | Penn State Mushroom Spawn Lab | «Rye Grain Spawn 250 ml Flasks … Autoclave 35 minutes at 121°C - Fast Exhaust» · «1000 ml Flasks … Autoclave 45 minutes at 121°C» | vigente 2026 |
| 46 | En bolsas más grandes el tiempo se va a horas | ✅ | Bréant 2025 (bolsas de 1 L de grano seco: 2.5 h a 121.4 °C); Priorclave 2023 | Bréant tabla 1: «ster. Temp1 (°C) 121.4 … Ster. Time1 (h) 2.5» | 2025 |
| 47 | Tesis 2025 en Finlandia con bolsas de grano de centeno; pocas bolsas | ✅ | Bréant 2025, Häme UAS, https://urn.fi/URN:NBN:fi:amk-2025060520714 | «Each batch is prepared from 1 litre or 0.785kg of dry organic rye grain» · tabla 1 «#bags 5 5 10 10 10» | 2025 |
| 48 | «Un grupo de bolsas se quedó cinco horas a casi cien grados… para la séptima semana todas olían a *Bacillus*» | ⚠️ (omite que esas bolsas se **contaminaron a propósito** y que el ciclo falló) | Bréant 2025 | Tabla 1: serie C «inoculation(Y/N) … Y» · «The soak water was inoculated … The goal is to ensure a high and uniform level of contamination» · «Cycle started @105°C … opened at t+40min … temperature dropped to 79.5°C, followed by 4h @ 99.5°C» · «Series C was the worst of all, starting on week 4 and being 100% contaminated by week 7» | 2025 |
| 49 | Aun con 2.5 h a 121 °C algunas bolsas se contaminaron | ✅ | Bréant 2025 | «Bacillus can indeed survive the 2h30 treatment, as confirmed by series Co and B.» (Co: 1 de 5 bolsas, sin inocular, semana 15; B: 4 de 10, inoculadas) | 2025 |
| 50 | El trabajo sugiere que la bacteria ya venía en el grano | ✅ | Bréant 2025 | «It would seem that raw material is the source of Bacillus contamination since it is present in the uncontaminated raw material» | 2025 |
| 51 | «Yo una vez tuve un frasco con miles de millones de esporas que no eran las que quería» | ✅ | `datos.md` | «✅ Un frasco suyo tenía miles de millones de esporas que no eran las que quería» | — |
| 52 | [PREGUNTA 4] «casi siempre es con bacterias, olor agrio» | ⚠️ preguntar a Robert | — | No está en `datos.md` | — |
| 53 | Pasteurizar baja el número; esterilizar busca que no quede nada vivo | ✅ | Priorclave 2023; Grimm et al. 2024 | «Pasteurization does not remove, kill, or deactivate all fungi, bacteria…» · «Sterilization aims for complete, reliable destruction of all microorganisms and spores» | 2023 |
| 54 | Para *Pleurotus ostreatus* sobre paja sin suplemento, pasteurizar puede funcionar muy bien | ✅ | Grimm et al. 2024 (JMBFS 13(5):e10428); Priorclave | Priorclave: «It is only effective in less-dense, less biologically active substrates (e.g., non-supplemented straw).» | 2024; 2023 |
| 55 | Estudio alemán 2024: autoclave hasta +50 % de cosecha en peso seco; pasteurización también buenas cosechas y pocas plagas | ✅ | Grimm, Sonntag y Rahmann 2024 (Thünen Institute), https://edepot.wur.nl/657532 | «sterilizing mushroom substrates through autoclaving can significantly increase the dry yields, up to 50% compared to pasteurization methods. However, pasteurization methods also achieved excellent results compared to untreated substrates, with good harvests and low pest occurrence.» | 2024 |
| 56 | Champiñón en composta pasteurizada a 60 °C por lo menos 2 h | ✅ | Penn State Extension (act. 20 may 2024) | «air and composted substrate temperatures should be raised together to 140ºF (60ºC) for at least 2 hours» | 2024 |
| 57 | Se esteriliza cuando el sustrato es rico (aserrín con salvado, grano) | ✅ | Priorclave 2023 | «if you're working with moist, dense, nutrient-rich, highly supplemented substrates like manure, whole grains, soy hulls, and "master's mix"… you're going to need [sterilization]» | 2023 |
| 58 | Fabricante: poco aserrín < 20 min; bolsas grandes > 2.5 h; frascos de grano 45 min–2 h | ✅ | Priorclave 2023 | «you can sterilize small volumes of hardwood sawdust in less than twenty minutes. That same sawdust in blocks or large bags could take more than 2.5 hours … Jars of grain spawn can likewise sterilize in forty-five minutes to two hours» | 2023 |
| 59 | Validación: indicador con esporas en el centro, incubar; si crece, alargar y repetir | ✅ | Priorclave 2023 | «Embed biological indicators (BIs) in the load, making sure to have one at the center of the load's mass» · «process it twice as long» | 2023 |
| 60 | [PREGUNTA 5] tiempo de Robert en su olla | ⚠️ preguntar a Robert | — | — | — |
| 61 | [PREGUNTA 6] cepario del Carrillo Biorefinery Lab (Tec) ✅; «usamos un autoclave de verdad, y aun así…» | ⚠️ preguntar a Robert (lo del autoclave) | `datos.md` | «✅ Cuida el cepario del Carrillo Biorefinery Lab, en el Tec de Monterrey.» | — |
| 62 | «Los errores **más comunes**, entonces, son tres» | ⚠️ (superlativo sin fuente; los tres errores sí tienen respaldo: F6, F1) | — | — | — |
| 63 | Cargas apretadas se esterilizan peor que las sueltas | ✅ | Lemieux et al. 2006 | «Clearly, high-density packing reduced the effectiveness of the autoclaving.» · «The most effective spore destruction was obtained with a loose packing arrangement» | 2006 |
| 64 | «el sustrato y la semilla de hongo se esterilizan **horas**, no minutos» | ⚠️ (generaliza: Penn State hace matraces de grano en 35–45 min; Priorclave, frascos 45 min–2 h) | Penn State; Priorclave | ver filas 45 y 58 | 2023–2026 |
| 65 | Despedida «Que tengas un magnífico día, una magnífica semana» | ✅ | `datos.md` | «("Que tengas un magnífico día, una magnífica semana…": ✅ ya la usa)» | — |
| 66 | La «olla del principio» es la de Robert (olla de presión como autoclave) | ✅ | `datos.md` | «✅ Una olla de presión fue su autoclave» | — |

## Tabla de lo que se dibuja (`notas_visuales.md`)

| # | Elemento en pantalla | Veredicto | Fuente / comentario |
|---|---|---|---|
| V1 | Curva de muerte log 10⁶ → 10⁻⁴ en 15 min, escalones de 1.5 min; marca «1 sobreviviente» en el paso 6 y línea «10⁻⁶ = hospitales» | ✅ | F1, F3, cálculo fila 7. La línea 10⁻⁶ debe ser una línea de referencia horizontal (en esa curva se alcanzaría a los 18 min), no un punto a los 15 min. |
| V2 | Barras STERIS/UBC: 75 ml 25, 250 ml 30, 500 ml 40, 1 L 45, 1.5 L 50, 2 L 55 | ✅ | UBC tabla 2 (todas las cifras coinciden). |
| V3 | Gráfica «esquema basado en Lemieux 2006»: la cámara sube rápido a… | ⚠️ | En el estudio la cámara operaba a **275 °F ≈ 135 °C** (31.5 psi), no a 121 °C: «Autoclave cycles consisting of 120 min at 31.5 lb/in 2 and 275°F». Dibujar la línea de la cámara en ~135 °C y la meta de 121 °C como línea punteada aparte. Las «24 cables saliendo por una brida» son esquemáticos (el artículo no describe la brida): rotular «esquema». |
| V4 | Comparador: aluminio 97, agua 0.143, madera 0.082 | ⚠️ | Agua a 25 °C = 0.146 (NIST) → usar «agua ≈ 0.14». Madera: quitar la barra o poner «madera ≈ 0.08–0.16 (según tipo y humedad)», porque el *Wood Handbook* da 0.16. |
| V5 | Isotermas: tubo ≈ 7 min, bolsa ≈ 5 h; fórmula t ≈ L²/α y «doble grosor → ×4» | ⚠️ | Cambiar relojes a los de la corrección 21 (tubo ≈ 4–6 min; bolsa ≈ 3–4 h, cilindro de 10 cm). Fórmula: escribir «t ∝ R²/α» (R = radio), no L². «×4» ✅. |
| V6 | Mapa con Guadalajara «≈ 1,540 m»; dos ollas 121 °C vs ≈ 118 °C «cálculo con tablas de vapor NIST»; reloj 1 min a 118 = ½ min a 121 | ✅ | Cálculos A y B; Wikipedia (1,536–1,570 m). El mapa debe ser el de México real con solo Guadalajara marcada (como dice la nota). |
| V7 | Corte de endospora: núcleo «25 % agua», corteza, cubierta | ⚠️ menor | Rotular «núcleo: tan poco como ~25 % de agua» (F9: «as low as ~25%»). Capas (núcleo, corteza, cubierta) ✅ F9. |
| V8 | Matraces Penn State: 250 ml → 35 min; 1 L → 45 min | ✅ | Penn State. Dibujar el matraz de 250 ml con solo 50 ml de grano seco y el de 1 L con 250 ml (no llenos). |
| V9 | Tesis finlandesa: grupo «5 h a 99.5 °C» todo contaminado a la semana 7; grupo «2.5 h a 121 °C» con 1 de 5 contaminada | ⚠️ | Rotular: serie C «contaminada a propósito; ciclo con falla (105 → 79.5 → 4 h a 99.5 °C)»; el «1 de 5» es el **control sin contaminar a propósito** (Co). Si se dibuja la serie B (2.5 h, inoculada): 4 de 10 (20 % sem. 9 + 20 % sem. 15). Co+ (2.5 h, inoculada): 0 de 5. Mantener «tesis, pocas bolsas: pista, no ley». |
| V10 | Termómetros: pasteurizar 60–100 °C; esterilizar 121 °C | ✅ | Priorclave: «between 150 and 180 degrees Fahrenheit» (65–82 °C); Penn State: 60 °C; Bréant: 99.5 °C. |
| V11 | Ampolleta de indicador biológico: morado = sin crecimiento, amarillo = con crecimiento | ⚠️ | No verificado en una fuente abierta (Priorclave solo dice «change color/turbidity»). Usar la ficha del indicador real que se muestre, o rotular «cambia de color si crece». |
| V12 | Barras de Grimm et al. 2024 «hasta +50 % peso seco» | ✅ | Solo lo del resumen; no inventar valores por tratamiento. |
| V13 | Poro lleno de condensado, rótulo «hipótesis de los autores (2006)» | ✅ | F1, fila 24. |
| V14 | Tira con esporas de *G. stearothermophilus* (bastoncitos con espora, esquemático) | ✅ | Es un bacilo esporulado (F3: «spore-producing aerobe»); rotular «esquemático». |
| V15 | Tres errores con íconos (reloj desde que se prende la estufa, aire, olla apretada vs bolsas sueltas) | ✅ | F1 (carga suelta), F6 (aire), UBC/F1 (tiempo en el material). |

## Correcciones propuestas (texto exacto)

- **2 (cap. 01):** «Y se calcularon contra los enemigos más duros que existen: las esporas bacterianas.» → **«Y están pensados para acabar con uno de los enemigos más duros que hay: las esporas de bacterias.»**
- **6 (fechas EPA):**
  - cap. 01: «En un lote de esas esporas que usó la Agencia de Protección Ambiental de Estados Unidos en 2006, a ciento veintiún grados, D era de minuto y medio.» → **«En un lote de esas esporas que usó la Agencia de Protección Ambiental de Estados Unidos en 2005, a ciento veintiún grados, D era de minuto y medio.»**
  - cap. 02: «En 2006, la Agencia de Protección Ambiental de Estados Unidos metió a un autoclave comercial…» → **«En 2005, la Agencia de Protección Ambiental de Estados Unidos metió a un autoclave comercial…»** (y en `fuentes.md`/en pantalla: «estudio publicado en 2006»).
  - cap. 03: «Pero los autores del estudio de 2006 propusieron algo clave.» → se puede quedar (el artículo es de 2006).
  - cap. 07: «Ese último también lo vio la agencia en 2006: …» → **«Ese último también lo vio la agencia en su experimento: las cargas apretadas se esterilizaban peor que las sueltas.»**
- **14 (cap. 02):** «Donde no llegó… sí crecieron.» → **«Y en casi todos los puntos donde no llegó… sí crecieron.»**
- **15 (cap. 03):** «el calor no viaja con el vapor: viaja por conducción, de partícula en partícula…» → **«el calor casi no viaja con el vapor: viaja sobre todo por conducción, de partícula en partícula, como un chisme que se pasa de mano en mano.»**
- **16 y 17 (cap. 03):** «El agua, a veinticinco grados, tiene una de las más bajas que conoces: cero punto ciento cuarenta y tres milímetros cuadrados por segundo.» → **«El agua tiene una muy baja: unos cero punto catorce milímetros cuadrados por segundo.»** (con «casi setecientas veces» el aluminio sigue bien: 97/0.146 = 667).
- **19 (cap. 03):** «Y tu sustrato es agua mezclada con aserrín, y la madera deja pasar el calor todavía más lento que el agua.» → **«Y tu sustrato es agua mezclada con aserrín, y la madera mueve el calor más o menos igual de lento que el agua.»**
- **21 (cap. 03):** «Un tubo de ensayo de un centímetro y medio de ancho: unos siete minutos de tiempo característico. / Una bolsa de diez centímetros de grosor: cerca de cinco horas.» → **«Si el calor solo avanzara por conducción, el centro de un tubo de ensayo de un centímetro y medio de ancho llegaría casi a la temperatura de afuera en unos cinco minutos. / El centro de una bolsa de diez centímetros de ancho, en unas cuatro horas.»** (Cálculo C, cilindro, centro a 1 °C de la orilla: 5.1–5.6 min y 3.8–4.2 h; la razón sigue siendo ×44, así que «más de cuarenta veces» se queda.)
- **26 (cap. 04):** «El Departamento de Agricultura de Estados Unidos lo dice clarito: …» → **«Las guías de enlatado que siguen al Departamento de Agricultura de Estados Unidos lo dicen clarito: el aire atrapado baja la temperatura y deja el proceso corto.»**
- **33 (cap. 04):** «Hice la cuenta con las tablas de vapor: …» → **«Si haces la cuenta con las tablas de vapor, eso deja la olla en unos ciento dieciocho grados, no ciento veintiuno.»** (o que Robert confirme que él la hizo).
- **34 (cap. 04):** «a los que vivimos en Guadalajara» → solo si Robert lo confirma (PREGUNTA 7); si no: **«a los que esterilizamos en Guadalajara»** o **«aquí en Guadalajara, donde estudio»** (Tec GDL ✅).
- **35, 52, 60, 61 ([PREGUNTA 3, 4, 5, 6]):** quitar si Robert no responde; si responde, se anotan como «✅ confirmado por Robert, <fecha>». En la 61, «Cuido el cepario del Carrillo Biorefinery Lab, del Tec de Monterrey» ✅ puede quedarse sola.
- **36 (título cap. 05):** «Por qué el grano es lo más difícil» → **«Por qué el grano es tan difícil»**; y «Ahora sí, el jefe final: la semilla de hongo, que es grano.» → **«Ahora, uno de los jefes más duros: la semilla de hongo, que es grano.»**
- **41 (cap. 05):** «Por dentro casi no tienen agua: su centro puede ser apenas una cuarta parte agua.» → **«Por dentro tienen muy poca agua: su centro puede ser apenas una cuarta parte agua.»**
- **48 (cap. 05):** «Un grupo de bolsas se quedó cinco horas a casi cien grados, que es pasteurizar, no esterilizar. / Para la séptima semana, todas olían a *Bacillus*.» → **«A un grupo de bolsas le pusieron bacterias a propósito y las dejaron unas cuatro horas a casi cien grados, que es pasteurizar, no esterilizar. / Para la séptima semana, todas olían a *Bacillus*.»**
- **62 (cap. 07):** «Los errores más comunes, entonces, son tres.» → **«Hay tres errores muy fáciles de cometer.»**
- **64 (cap. 00):** «Hoy te voy a contar por qué el sustrato y la semilla de hongo se esterilizan horas, no minutos.» → **«Hoy te voy a contar por qué el sustrato y la semilla de hongo necesitan mucho más que quince minutos… y a veces, horas.»**
- **Visuales V3, V4, V5, V7, V9, V11:** aplicar lo indicado en la tabla de lo que se dibuja.
- **`fuentes.md`:** corregir fila 16 (usar α del NIST a 25 °C = 0.1455 y el factor de cilindro 0.6 para 95 % / 0.88 para 99 %; 0.4 es de esfera) y fila 13 (0.143 es a 20 °C). Agregar CDC (D₁₂₁ de 1 a 2 min), Rodrigo et al. 2021 (esporas de *Bacillus* en grano), *Wood Handbook* 2010 y PMC12191528 (2025, valores z).

## Resumen
- Afirmaciones del guion: 66 → ✅ 46 · ❌ 0 · ⚠️ 20 (de ellas 6 son «preguntar a Robert»).
- Lo que se dibuja: 15 → ✅ 9 · ⚠️ 6.
- Lo más importante: fecha del experimento de la EPA (2005, no 2006); el grupo de la tesis que «olía a *Bacillus*» estaba contaminado a propósito y tuvo falla de ciclo; cifras del tubo y la bolsa (7 min / 5 h son R²/α, no lo que tarda); difusividad del agua a 25 °C y la madera; la gráfica EPA debe mostrar la cámara a ~135 °C; «Hice la cuenta» y «vivimos en Guadalajara» en boca de Robert.


## Re-verificación de correcciones

Segunda pasada del mismo verificador, el 7 nov 2026. Comparé `guion_v1.md` con `guion_final.md` renglón por renglón y revisé también lo que cambió en `notas_visuales.md` y en `fuentes.md`. Las frases textuales vuelven a salir de los textos completos que ya había descargado: Lemieux et al. 2006 (PMC), la tesis de Bréant 2025 (PDF), NCHFP/UGA 2025 (PDF), NIST WebBook, Setlow & Christie 2021 y `datos.md`. Los tiempos de conducción salen del cálculo C de arriba.

| # | Renglón corregido (guion) | Veredicto | Fuente | Frase textual / cálculo | Año |
|---|---|---|---|---|---|
| R1 | «Es la receta clásica de los laboratorios.» | ✅ | Lemieux et al. 2006, PMC1694242 | «Previously published data indicate that holding material for 15 min at 250°F is required to ensure moist heat sterilization» | 2006 |
| R2 | «…necesitan mucho más que quince minutos… y a veces, horas.» | ✅ | Penn State Spawn Lab; Priorclave 2023; Bréant 2025 | Penn State: «Autoclave 35 minutes at 121°C» / «45 minutes». Priorclave: «could take more than 2.5 hours». Bréant: «Ster. Time1 (h) 2.5» | 2023–2026 |
| R3 | «…uno de los enemigos más duros que hay: las esporas de bacterias.» | ✅ | Setlow & Christie 2021, PMC8342367 | «Spores of many species of the orders Bacillales and Clostridiales are dormant and extremely resistant to all manner of killing regimens» | 2021 |
| R4 | Lote de la EPA «en 2005»; «En 2005, la EPA metió a un autoclave comercial…» | ✅ | Lemieux et al. 2006 | «The Environmental Protection Agency conducted the tests on 4 to 6 March 2005» | 2005 (pruebas) |
| R5 | «La cámara iba todavía más caliente, a unos ciento treinta y cinco grados, y su sensor llegó rapidísimo.» | ✅ | Lemieux et al. 2006 | «The nominal operating conditions during the cycles are 31.5 lb/in 2 and 275°F.» (275 °F = 135.0 °C) · «the temperature of the control thermocouple rapidly approached the autoclave operating temperature». (La prueba 4 fue a 292 °F, pero las corridas 1–3, las que se cortaron a los 120 min, fueron con las condiciones nominales.) | 2005/2006 |
| R6 | «Y en casi todos los puntos donde no llegó… sí crecieron.» | ✅ | Lemieux et al. 2006 | «…while the data for most of the sample locations that did not meet these time and temperature targets showed that there was growth.» | 2005/2006 |
| R7 | «O sea, la receta funciona; lo difícil es que se cumpla en el centro.» | ✅ | Lemieux et al. 2006 | «heating the BDR to 250°F for 15 min at the sampling locations resulted in no viable spores» | 2006 |
| R8 | «el calor casi no viaja con el vapor: viaja sobre todo por conducción…» | ✅ | Lemieux et al. 2006 | «heat was transferred to the interior of the material mostly through conduction, which was slow, and the steam could not penetrate very well into the material» | 2006 |
| R9 | «El agua tiene una muy baja: unos cero punto catorce milímetros cuadrados por segundo.» (y aluminio «casi setecientas veces») | ✅ | NIST WebBook (isobara del agua; α = k/(ρ·cp)) | 25 °C: 0.1455 mm²/s; 20 °C: 0.1432 mm²/s → «unos 0.14» ✅. 97/0.1455 = 667 → «casi setecientas» ✅ | 2026 (consulta) |
| R10 | Se quitó «la madera deja pasar el calor más lento que el agua» | ✅ (quitada) | — | — | — |
| R11 | «Si el calor solo avanzara por conducción, el centro de un tubo de 1.5 cm de ancho llegaría casi a la temperatura de afuera en unos cinco minutos.» | ✅ | Cálculo C (serie de Fourier, cilindro, NIST) | Al 99 % del salto (≈ 1 °C de la orilla), Fo = 0.878; R = 0.75 cm, α = 0.146–0.161 mm²/s → **5.1–5.6 min** | — |
| R12 | «El centro de una bolsa de diez centímetros de ancho, en unas cuatro horas.» | ✅ | Cálculo C | Cilindro, R = 5 cm, Fo = 0.878 → **3.8–4.2 h**. Es una estimación de peor caso (solo conducción), y el guion lo dice así. | — |
| R13 | «Más de cuarenta veces más, solo por el tamaño.» (sin cambios, pero ahora junto a 5 min / 4 h) | ✅ | Cálculo C | (5/0.75)² = 44.4. Con las cifras redondeadas, 240/5 = 48. Las dos dan «más de cuarenta» | — |
| R14 | «Ojo, ese es el peor caso.» / «los autores del estudio de la agencia propusieron…» | ✅ | Lemieux et al. 2006 | «We believe that when the cold, porous BDR material was exposed to the steam…» | 2006 |
| R15 | «Las guías de enlatado que siguen al Departamento de Agricultura de Estados Unidos lo dicen clarito: el aire atrapado baja la temperatura y deja el proceso corto.» | ✅ | NCHFP/UGA Circular 1344‑02 | «Any air trapped in the closed canner during the process will lower the temperature obtained for a given pressure … and will result in underprocessing. To be safe, the USDA recommends that all pressure canners be vented 10 min before they are pressurized.» | 2025 |
| R16 | «…nos pega directo aquí en Guadalajara, donde estudio.» | ✅ | `series/shot-robert/datos.md` | «✅ Universidad: Ing. en Biotecnología, Tec GDL, 5.º semestre (oct 2026)» | 2026 |
| R17 | «Si haces la cuenta con las tablas de vapor, eso deja la olla en unos ciento dieciocho grados…» | ✅ | Cálculo A (NIST) | «118.18 [°C] 0.18750 [MPa]» | 2026 (consulta) |
| R18 | Título «Por qué el grano es tan difícil»; «Ahora, uno de los jefes más duros: la semilla de hongo, que es grano.» | ✅ (ya no hay superlativo absoluto) | Priorclave 2023; Penn State | Priorclave: «whole grains … you're going to need [sterilization]»; Penn State: «This grain/mycelium mixture is called spawn» | 2023–2026 |
| R19 | «Por dentro tienen muy poca agua: su centro puede ser apenas una cuarta parte agua.» | ✅ | Setlow & Christie 2021 | «its very low water content … this can be as low as ~ 25% of wet weight» | 2021 |
| R20 | «A un grupo de bolsas le pusieron bacterias a propósito y las dejaron unas cuatro horas a casi cien grados, que es pasteurizar, no esterilizar.» | ✅ | Bréant 2025, tabla 1 y §3.2–3.4 | Serie C «inoculation(Y/N) … Y» · «The soak water was inoculated at a rate of 1cl of inoculum per bag» · «followed by 4h @ 99.5°C without further interruptions». (El inóculo era una mezcla de grano con *Bacillus* y moho *Trichoderma*; decir «bacterias» no es falso.) | 2025 |
| R21 | «Ese ciclo además tuvo una falla y llegó a bajar a unos ochenta grados.» | ✅ | Bréant 2025 | «Due to the technical issue the tank had to be bled and opened at t+40min for a few minutes and temperature dropped to 79.5°C» | 2025 |
| R22 | «Para la séptima semana, todas olían a *Bacillus*.» | ✅ | Bréant 2025, §4.2 «Bacillus, olfactive test» | «Series C was the worst of all, starting on week 4 and being 100% contaminated by week 7» | 2025 |
| R23 | «Con dos horas y media a 121 °C, en cambio, les fue mucho mejor, aunque no perfecto.» | ✅ | Bréant 2025 | «Bacillus can indeed survive the 2h30 treatment, as confirmed by series Co and B.» | 2025 |
| R24 | «En las bolsas sin bacterias agregadas, se contaminó una de cinco.» | ✅ | Bréant 2025 | Co: inoculación «N», «#bags 5»; «The control developed 20% contamination at week 15» = 1 de 5. (En la prueba visual de *Trichoderma*, solo la serie A tuvo contaminación, así que Co no tiene otra contaminación escondida.) | 2025 |
| R25 | «En las que sí tenían, ninguna de cinco en un grupo, y cuatro de diez en otro que reposó un día antes.» | ✅ | Bréant 2025 | Co+: «the contaminated control did not show any contamination for the duration of the experiment» (5 bolsas). B: «Pre-rest (h) … 25», «#bags 10», «20% contamination at week 9 and an additional 20% at week 15» = 4 de 10 | 2025 |
| R26 | «Es un experimento chiquito, de pocas bolsas, así que tómalo como un indicio, no como prueba.» | ✅ | Bréant 2025 | «It would have been interesting to run larger series but not practically feasible.» | 2025 |
| R27 | Se quitaron «el champiñón … composta a 60 °C ≥ 2 h» y «Si crecen, alargan el tiempo y vuelven a probar» | ✅ (quitadas; las dos ya eran ✅) | — | — | — |
| R28 | «Hay tres errores muy fáciles de cometer.» | ✅ | Lemieux et al. 2006; NCHFP 2025; UBC | Ya no es un superlativo. Los tres errores tienen respaldo (filas 10, 26–27 y 63) | 2006–2025 |
| R29 | «Ese último también lo vio la agencia en su experimento: las cargas apretadas…» | ✅ | Lemieux et al. 2006 | «Clearly, high-density packing reduced the effectiveness of the autoclaving.» | 2006 |

### Lo que se dibuja (`notas_visuales.md`, corregido)

| # | Elemento | Veredicto | Comentario |
|---|---|---|---|
| RV1 | Curva de muerte con «pruebas 2005, publicado 2006» | ✅ | F1 |
| RV2 | Gráfica EPA: cámara a ~135 °C (275 °F), meta de 121 °C punteada, ✗ en «la mayoría» de los puntos que no llegaron | ✅ | F1 («nominal operating conditions … 275°F»; «most of the sample locations») |
| RV3 | Difusividad: aluminio 97 vs agua ≈ 0.14 (NIST 0.146 a 25 °C), sin barra de madera | ✅ | NIST; Wikipedia |
| RV4 | Isotermas: tubo ≈ 5 min, bolsa ≈ 4 h (≈ 1 °C), marca opcional al 95 % (3.5–3.9 min / 2.6–2.9 h), t ∝ R²/α, ×4, ×44 | ✅ | Cálculo C |
| RV5 | Reloj «1 min a 118 °C ≈ ½ min a 121 °C (lote EPA; otras cepas, aún menos)» | ✅ | Cálculo B; PMC12191528 (z = 5.07–8.47 °C → letalidad 0.39 o menos) |
| RV6 | Espora: «núcleo: tan poco como ~25 % de agua» | ✅ | F9 |
| RV7 | Tesis: C 10/10 a la semana 7 (bacterias agregadas, falla 105 → 79.5 → 4 h a 99.5 °C); Co 1/5; Co+ 0/5; B 4/10 (reposo de 25 h); A omitida o aparte; «indicio, no prueba» | ✅ | F11, tabla 1 y §4.1–4.2 |
| RV8 | Indicador biológico: «cambia de color o se enturbia si crece», sin inventar colores | ✅ | Priorclave: «If the BIs show no activity (i.e., they don't change color/turbidity after 48 hours of incubation)» |
| RV9 | «3 errores muy fáciles de cometer» | ✅ | Ver R28 |

### Resultado de la re-verificación
- Los 29 renglones corregidos del guion y los 9 elementos corregidos del dibujo quedan ✅. Ninguna afirmación científica, cifra o institución queda en ⚠️ o ❌.
- Solo faltan datos personales que nada más Robert puede confirmar. Esos renglones se quitan si él no los confirma:
  - **[PREGUNTA 3]** «Yo, con mi olla, uso la pesa de quince libras y le dejo salir el vapor antes de cerrarla.»
  - **[PREGUNTA 4]** «Y si mi semilla se contamina, casi siempre es con bacterias, ese olor agrio de grano mojado.»
  - **[PREGUNTA 5]** «En mi olla, una bolsa de sustrato se queda tanto tiempo…» (falta el número).
  - **[PREGUNTA 6]** «…usamos un autoclave de verdad, y aun así…». Que cuida el cepario del Carrillo Biorefinery Lab ya es ✅ en `datos.md`. Lo pendiente es lo del autoclave y el permiso para nombrar y grabar el laboratorio.
  - También quedan en `preguntas.md` las preguntas 1, 2 y 7–12 (equipo, medición propia, sustratos, título, duración). No afectan el texto actual, salvo que Robert agregue algo; si lo hace, se verifica.

VEREDICTO: APROBADO SALVO PREGUNTAS A ROBERT — pendientes: [PREGUNTA 3], [PREGUNTA 4], [PREGUNTA 5], [PREGUNTA 6]
