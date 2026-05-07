// ═══════════════════════════════════════════════════════════════
//  BANCO DE PREGUNTAS
// ═══════════════════════════════════════════════════════════════
const PREGUNTAS = {
  mat: {
    "Fracciones": [
      {q:"¿Cuánto es ½ + ¼?", opts:["2/4","3/4","1/2","1/6"], a:1, tipo:"mc"},
      {q:"¿Cuánto es ¾ − ½?", opts:["1/4","1/2","2/4","1/8"], a:0, tipo:"mc"},
      {q:"¿Cuánto es ⅔ × ¾?", opts:["5/7","1/2","6/12","1/6"], a:1, tipo:"mc"},
      {q:"¿Cuánto es ½ ÷ ¼?", opts:["1/8","2","1/4","4"], a:1, tipo:"mc"},
      {q:"¿Qué fracción es equivalente a 4/8?", opts:["1/4","3/4","1/2","2/3"], a:2, tipo:"mc"},
      {q:"¿Cuál es la fracción irreducible de 6/9?", opts:["3/4","2/3","1/3","6/9"], a:1, tipo:"mc"},
      {q:"5/10 = 1/2", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¾ > ⅔", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"Completá: ¼ + ___ = ½", opts:["1/4","1/2","3/4","1/8"], a:0, tipo:"mc"},
      {q:"¿Cuántos cuartos tiene un entero?", opts:["2","3","4","8"], a:2, tipo:"mc"},
      {q:"½ de 20 es ___", opts:["5","8","10","15"], a:2, tipo:"mc"},
      {q:"¿Cuánto es ⅓ + ⅓?", opts:["1/3","2/3","2/9","1/6"], a:1, tipo:"mc"},
      {q:"¿Cuál es el numerador de 5/8?", opts:["8","5","3","13"], a:1, tipo:"mc"},
      {q:"¼ de 40 es ___", opts:["4","8","10","20"], a:2, tipo:"mc"},
      {q:"Ordenar de menor a mayor: ½, ¼, ¾", opts:["¼ ½ ¾","½ ¼ ¾","¾ ½ ¼","¼ ¾ ½"], a:0, tipo:"mc"},
    ],
    "Decimales": [
      {q:"¿Cuánto es 0,5 + 0,3?", opts:["0,9","0,8","1,0","0,53"], a:1, tipo:"mc"},
      {q:"¿Cuánto es 1,2 × 3?", opts:["3,2","3,6","4,2","2,6"], a:1, tipo:"mc"},
      {q:"¿Cuánto es 4,8 ÷ 2?", opts:["2,4","2,8","3,4","1,6"], a:0, tipo:"mc"},
      {q:"0,75 = 3/4", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"0,1 > 0,09", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Cuánto es 2,5 − 1,3?", opts:["1,2","1,3","0,2","1,8"], a:0, tipo:"mc"},
      {q:"¿Qué decimal es ½?", opts:["0,25","0,5","0,75","0,2"], a:1, tipo:"mc"},
      {q:"¿Qué decimal es ¼?", opts:["0,5","0,4","0,25","0,75"], a:2, tipo:"mc"},
      {q:"3,14 redondeado al entero más próximo es ___", opts:["3","4","2","3,1"], a:0, tipo:"mc"},
      {q:"¿Cuántos décimos tiene 1?", opts:["1","100","10","1000"], a:2, tipo:"mc"},
    ],
    "Porcentajes": [
      {q:"¿Cuánto es el 10% de 200?", opts:["10","20","100","200"], a:1, tipo:"mc"},
      {q:"¿Cuánto es el 50% de 80?", opts:["8","20","40","50"], a:2, tipo:"mc"},
      {q:"¿Cuánto es el 25% de 100?", opts:["75","25","50","10"], a:1, tipo:"mc"},
      {q:"¿Cuánto es el 100% de 35?", opts:["1","35","3,5","350"], a:1, tipo:"mc"},
      {q:"50% es lo mismo que ½", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"25% = 1/4", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Cuánto es el 20% de 50?", opts:["5","20","10","15"], a:2, tipo:"mc"},
      {q:"¿Cuánto es el 75% de 120?", opts:["75","80","90","100"], a:2, tipo:"mc"},
      {q:"Si hay 10% de descuento en $500, ¿cuánto pagás?", opts:["$50","$450","$400","$490"], a:1, tipo:"mc"},
      {q:"¿Qué porcentaje es 30 de 100?", opts:["3%","30%","300%","0,3%"], a:1, tipo:"mc"},
    ],
    "Divisibilidad": [
      {q:"¿24 es divisible por 6?", opts:["Sí","No"], a:0, tipo:"tf"},
      {q:"¿15 es divisible por 4?", opts:["Sí","No"], a:1, tipo:"tf"},
      {q:"¿Cuáles son los divisores de 12?", opts:["1,2,3,4,6,12","1,2,4,12","1,3,4,12","2,3,6,12"], a:0, tipo:"mc"},
      {q:"¿9 es múltiplo de 3?", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Cuál es el MCD de 12 y 8?", opts:["2","4","6","8"], a:1, tipo:"mc"},
      {q:"¿Cuál es el MCM de 4 y 6?", opts:["12","8","24","6"], a:0, tipo:"mc"},
      {q:"Todo número par es divisible por ___", opts:["3","2","5","10"], a:1, tipo:"mc"},
      {q:"¿36 es divisible por 9?", opts:["Sí","No"], a:0, tipo:"tf"},
      {q:"¿Cuál es un número primo?", opts:["9","15","17","21"], a:2, tipo:"mc"},
      {q:"Los múltiplos de 5 terminan en ___", opts:["1 o 9","2 o 4","0 o 5","3 o 7"], a:2, tipo:"mc"},
    ],
    "Área y perímetro": [
      {q:"¿Cuál es la fórmula del área del rectángulo?", opts:["b×h","2×(b+h)","b+h","π×r²"], a:0, tipo:"mc"},
      {q:"¿Cuál es el perímetro de un cuadrado de lado 5?", opts:["10","20","25","15"], a:1, tipo:"mc"},
      {q:"¿Cuál es el área de un triángulo de b=6 y h=4?", opts:["24","10","12","18"], a:2, tipo:"mc"},
      {q:"El perímetro es la suma de todos los lados", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Cuál es el área de un cuadrado de lado 7?", opts:["14","28","49","21"], a:2, tipo:"mc"},
      {q:"¿Cuál es el área de un rectángulo de 3×8?", opts:["22","24","11","18"], a:1, tipo:"mc"},
      {q:"¿Cuántos cm² tiene un cuadrado de 10cm de lado?", opts:["40","100","20","200"], a:1, tipo:"mc"},
      {q:"El área se mide en unidades ___", opts:["lineales","cuadradas","cúbicas","decimales"], a:1, tipo:"mc"},
    ],
    "Álgebra Básica": [
      {q:"Si x + 3 = 7, entonces x = ___", opts:["3","4","10","7"], a:1, tipo:"mc"},
      {q:"Si 2x = 10, entonces x = ___", opts:["5","8","20","2"], a:0, tipo:"mc"},
      {q:"Si x − 4 = 6, entonces x = ___", opts:["2","10","4","6"], a:1, tipo:"mc"},
      {q:"¿Cuál es el valor de 3x cuando x=4?", opts:["7","43","12","34"], a:2, tipo:"mc"},
      {q:"Si 5x = 25, entonces x = ___", opts:["125","30","5","20"], a:2, tipo:"mc"},
      {q:"Una ecuación tiene al menos una incógnita", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Qué significa la letra x en una ecuación?", opts:["una suma","un número desconocido","el resultado","un divisor"], a:1, tipo:"mc"},
      {q:"Si x/2 = 4, entonces x = ___", opts:["2","6","8","4"], a:2, tipo:"mc"},
    ],
  },
  len: {
    "Comprensión Lectora": [
      {q:"La idea principal de un texto es ___", opts:["el título","el tema central que trata el texto","la conclusión del autor","el primer párrafo siempre"], a:1, tipo:"mc"},
      {q:"Una inferencia es ___", opts:["lo que dice el texto literalmente","una conclusión sacada de pistas del texto","el resumen del texto","el punto de vista del autor"], a:1, tipo:"mc"},
      {q:"Un sinónimo tiene el mismo significado que otra palabra", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Qué es un párrafo?", opts:["una oración sola","un conjunto de oraciones sobre una misma idea","el título del texto","una sola palabra"], a:1, tipo:"mc"},
      {q:"Un antónimo tiene significado ___", opts:["igual","parecido","contrario","sin relación"], a:2, tipo:"mc"},
      {q:"El propósito de un texto informativo es ___", opts:["entretener","persuadir","informar sobre algo real","inventar historias"], a:2, tipo:"mc"},
      {q:"Leer entre líneas significa ___", opts:["leer muy despacio","captar lo que no está dicho explícitamente","subrayar líneas alternas","leer dos veces"], a:1, tipo:"mc"},
      {q:"El contexto ayuda a entender el significado de palabras desconocidas", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
    ],
    "Gramática": [
      {q:"¿Cuál es el sujeto de 'Los niños juegan en el parque'?", opts:["juegan","en el parque","los niños","el parque"], a:2, tipo:"mc"},
      {q:"El sustantivo nombra ___", opts:["acciones","personas, animales o cosas","cualidades","lugares solo"], a:1, tipo:"mc"},
      {q:"¿Cuál es el verbo en 'María canta canciones lindas'?", opts:["María","canta","canciones","lindas"], a:1, tipo:"mc"},
      {q:"Un adjetivo califica o determina a un sustantivo", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Cuál es el adjetivo en 'El cielo azul'?", opts:["El","cielo","azul","ninguno"], a:2, tipo:"mc"},
      {q:"El tiempo pasado del verbo 'correr' es ___", opts:["corrió","corre","correrá","correría"], a:0, tipo:"mc"},
      {q:"¿Qué tipo de oración es 'Cerrá la puerta'?", opts:["declarativa","interrogativa","imperativa","exclamativa"], a:2, tipo:"mc"},
      {q:"El plural de 'el árbol' es ___", opts:["los árbol","los árboles","las árboles","el árboles"], a:1, tipo:"mc"},
      {q:"¿Cuántos géneros gramaticales hay en español?", opts:["1","3","2","4"], a:2, tipo:"mc"},
      {q:"Los pronombres reemplazan a los sustantivos", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
    ],
    "Ortografía": [
      {q:"¿Cómo se escribe correctamente?", opts:["havía","havia","había","abia"], a:2, tipo:"mc"},
      {q:"¿Cuál lleva tilde?", opts:["mesa","silla","árbol","libro"], a:2, tipo:"mc"},
      {q:"Las palabras agudas llevan tilde cuando terminan en ___", opts:["cualquier consonante","n, s o vocal","solo vocal","b o d"], a:1, tipo:"mc"},
      {q:"'Tambien' se escribe correctamente como ___", opts:["También","Tambien","Tanbién","Tambíen"], a:0, tipo:"mc"},
      {q:"Los verbos en pasado como 'vivió' llevan tilde", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"Las palabras esdrújulas siempre llevan tilde", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Cómo se escribe?", opts:["Vino de viaje","Bino de biaje","Vino de biaje","Bino de viaje"], a:0, tipo:"mc"},
      {q:"¿Cuál NO lleva tilde?", opts:["café","examen","mamá","canción"], a:1, tipo:"mc"},
    ],
    "Literatura": [
      {q:"Rodolfo Walsh fue un escritor ___", opts:["mexicano","argentino","colombiano","español"], a:1, tipo:"mc"},
      {q:"Un limerick es ___", opts:["un cuento largo","una poesía humorística de 5 versos","un texto informativo","un tipo de novela"], a:1, tipo:"mc"},
      {q:"Alfonsina Storni fue una gran poeta ___", opts:["brasileña","mexicana","argentina","chilena"], a:2, tipo:"mc"},
      {q:"Un cuento tiene: inicio, nudo y ___", opts:["título","desenlace","prólogo","capítulo"], a:1, tipo:"mc"},
      {q:"El narrador en 1° persona dice 'yo'", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Quién escribió 'El aleph'?", opts:["Cortázar","García Márquez","Borges","Quiroga"], a:2, tipo:"mc"},
      {q:"La rima es la repetición de sonidos al final de los versos", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"Julio Cortázar escribió ___", opts:["Cien años de soledad","Casa tomada","El túnel","El señor presidente"], a:1, tipo:"mc"},
      {q:"¿Qué es una metáfora?", opts:["comparación directa con 'como'","comparación sin 'como' que identifica dos cosas","descripción de un lugar","un tipo de rima"], a:1, tipo:"mc"},
      {q:"El cuento fantástico incluye elementos ___", opts:["solo reales","solo imaginarios","reales mezclados con inexplicables","históricos"], a:2, tipo:"mc"},
    ],
  },
  nat: {
    "Materia y Transformaciones": [
      {q:"¿Cuáles son los tres estados de la materia?", opts:["sólido, líquido, gaseoso","sólido, líquido, plasma","duro, blando, líquido","frío, caliente, tibio"], a:0, tipo:"mc"},
      {q:"El agua al congelarse pasa de líquido a ___", opts:["gas","plasma","sólido","vapor"], a:2, tipo:"mc"},
      {q:"¿Qué es un cambio físico?", opts:["cambia la composición","no cambia la composición","crea nueva sustancia","desaparece la materia"], a:1, tipo:"mc"},
      {q:"Quemar papel es un cambio ___", opts:["físico","químico","de estado","reversible"], a:1, tipo:"mc"},
      {q:"El agua pura es una sustancia", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"Mezclar sal con agua es una mezcla ___", opts:["heterogénea","homogénea","química","imposible"], a:1, tipo:"mc"},
      {q:"¿Qué propiedad mide la balanza?", opts:["volumen","temperatura","masa","densidad"], a:2, tipo:"mc"},
      {q:"¿Cómo se llama el cambio de sólido a líquido?", opts:["evaporación","condensación","fusión","solidificación"], a:2, tipo:"mc"},
      {q:"La densidad es ___", opts:["masa × volumen","masa / volumen","volumen / masa","masa + volumen"], a:1, tipo:"mc"},
      {q:"Todos los cambios de estado son reversibles", opts:["Verdadero","Falso"], a:1, tipo:"tf"},
    ],
    "Seres Vivos": [
      {q:"La unidad básica de los seres vivos es ___", opts:["el átomo","la célula","el tejido","el órgano"], a:1, tipo:"mc"},
      {q:"¿Qué hace la fotosíntesis?", opts:["produce CO₂","transforma luz en alimento","digiere los nutrientes","reproduce la planta"], a:1, tipo:"mc"},
      {q:"Los hongos son ___", opts:["plantas","animales","un reino propio","bacterias"], a:2, tipo:"mc"},
      {q:"Los seres vivos necesitan energía para vivir", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Qué son los ecosistemas?", opts:["solo animales","solo plantas","seres vivos + ambiente que interactúan","montañas y ríos"], a:2, tipo:"mc"},
      {q:"La cadena alimentaria empieza con los ___", opts:["carnívoros","descomponedores","productores (plantas)","herbívoros"], a:2, tipo:"mc"},
      {q:"El corazón es un órgano del sistema ___", opts:["digestivo","respiratorio","circulatorio","nervioso"], a:2, tipo:"mc"},
      {q:"Las bacterias son seres vivos unicelulares", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Qué hace el sistema digestivo?", opts:["transporta oxígeno","procesa los alimentos","controla el cuerpo","filtra la sangre"], a:1, tipo:"mc"},
      {q:"La mitosis produce células ___", opts:["distintas","idénticas","con la mitad de cromosomas","sin núcleo"], a:1, tipo:"mc"},
    ],
    "Sistema Solar": [
      {q:"¿Cuántos planetas tiene el sistema solar?", opts:["7","8","9","10"], a:1, tipo:"mc"},
      {q:"¿Cuál es el planeta más grande?", opts:["Saturno","Tierra","Júpiter","Neptuno"], a:2, tipo:"mc"},
      {q:"¿Qué estrella está en el centro de nuestro sistema solar?", opts:["Luna","Sirio","El Sol","Marte"], a:2, tipo:"mc"},
      {q:"La Tierra tarda 365 días en girar alrededor del Sol", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Cuánto tarda la Tierra en girar sobre su eje?", opts:["1 año","1 mes","24 horas","12 horas"], a:2, tipo:"mc"},
      {q:"¿Cuál es el planeta más cercano al Sol?", opts:["Venus","Tierra","Marte","Mercurio"], a:3, tipo:"mc"},
      {q:"La Luna es un satélite natural de la Tierra", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"Las estaciones del año se deben a ___", opts:["la distancia al Sol","la inclinación del eje terrestre","la rotación","el tamaño de la Tierra"], a:1, tipo:"mc"},
      {q:"¿Qué planeta tiene anillos muy visibles?", opts:["Júpiter","Urano","Saturno","Marte"], a:2, tipo:"mc"},
      {q:"El movimiento de rotación genera ___", opts:["las estaciones","el día y la noche","los años","los eclipses"], a:1, tipo:"mc"},
    ],
    "Tierra y Universo": [
      {q:"¿Cuántos planetas tiene el sistema solar?", opts:["7","8","9","10"], a:1, tipo:"mc"},
      {q:"La Tierra tarda 365 días en girar alrededor del Sol", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Cuánto tarda la Tierra en girar sobre su eje?", opts:["1 año","1 mes","24 horas","12 horas"], a:2, tipo:"mc"},
      {q:"Las estaciones del año se deben a ___", opts:["la distancia al Sol","la inclinación del eje terrestre","la rotación","el tamaño de la Tierra"], a:1, tipo:"mc"},
      {q:"El movimiento de rotación genera ___", opts:["las estaciones","el día y la noche","los años","los eclipses"], a:1, tipo:"mc"},
      {q:"La Luna es un satélite natural de la Tierra", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Qué es un eclipse solar?", opts:["la Tierra tapa al Sol","la Luna tapa al Sol","el Sol tapa a la Luna","la Tierra tapa a la Luna"], a:1, tipo:"mc"},
      {q:"¿Cuál es el planeta más cercano al Sol?", opts:["Venus","Tierra","Marte","Mercurio"], a:3, tipo:"mc"},
    ],
  },
  soc: {
    "Historia Argentina": [
      {q:"¿En qué año volvió la democracia en Argentina?", opts:["1976","1980","1983","1989"], a:2, tipo:"mc"},
      {q:"El último golpe de Estado en Argentina fue en ___", opts:["1966","1976","1983","1955"], a:1, tipo:"mc"},
      {q:"¿Quién fue el primer presidente de la democracia en 1983?", opts:["Menem","Perón","Alfonsín","Videla"], a:2, tipo:"mc"},
      {q:"La dictadura de 1976-1983 se llamó ___", opts:["Revolución Libertadora","Proceso de Reorganización Nacional","Revolución Argentina","Primavera democrática"], a:1, tipo:"mc"},
      {q:"Los derechos humanos son derechos que tienen todas las personas", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"Las Madres de Plaza de Mayo lucharon por ___", opts:["el derecho al voto","la aparición de sus hijos desaparecidos","la reforma económica","el acceso a la educación"], a:1, tipo:"mc"},
      {q:"¿En qué año ocurrió el golpe de Estado que inició la última dictadura?", opts:["1973","1975","1976","1980"], a:2, tipo:"mc"},
      {q:"Argentina recuperó la democracia con el presidente Alfonsín", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Qué es la soberanía popular?", opts:["el poder de los militares","el poder del pueblo para elegir sus gobernantes","el poder de un solo partido","el poder económico"], a:1, tipo:"mc"},
      {q:"La Constitución Nacional argentina está vigente desde ___", opts:["1816","1853","1976","1983"], a:1, tipo:"mc"},
    ],
    "Geografía Argentina": [
      {q:"¿Cuántas provincias tiene Argentina?", opts:["20","22","23","24"], a:3, tipo:"mc"},
      {q:"¿Cuál es la capital de Argentina?", opts:["Córdoba","Rosario","Buenos Aires","Mendoza"], a:2, tipo:"mc"},
      {q:"¿Cuál es la región más árida de Argentina?", opts:["Pampa","Patagonia","Monte y Puna","Litoral"], a:2, tipo:"mc"},
      {q:"¿Cuál es el río más largo de Argentina?", opts:["Paraná","Uruguay","Colorado","Negro"], a:0, tipo:"mc"},
      {q:"La Patagonia se encuentra en el sur de Argentina", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Qué océano baña las costas argentinas?", opts:["Pacífico","Índico","Atlántico","Ártico"], a:2, tipo:"mc"},
      {q:"¿Cuál es la provincia más grande de Argentina?", opts:["Buenos Aires","Salta","Córdoba","Santa Cruz"], a:3, tipo:"mc"},
      {q:"Los Andes separan Argentina de ___", opts:["Brasil","Uruguay","Chile","Bolivia"], a:2, tipo:"mc"},
      {q:"¿Cuál es el punto más alto de Argentina?", opts:["Aconcagua","Ojos del Salado","Mercedario","Tupungato"], a:0, tipo:"mc"},
      {q:"La región del Litoral está surcada por grandes ___", opts:["montañas","desiertos","ríos","glaciares"], a:2, tipo:"mc"},
    ],
    "Ciudadanía": [
      {q:"¿Cuántos poderes tiene el Estado argentino?", opts:["2","3","4","5"], a:1, tipo:"mc"},
      {q:"¿Cuál es la función del Poder Judicial?", opts:["crear leyes","aplicar e interpretar las leyes","gobernar el país","administrar el presupuesto"], a:1, tipo:"mc"},
      {q:"La Constitución Nacional es la ley más importante del país", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿A partir de qué edad se puede votar en Argentina?", opts:["14 años","16 años","18 años","21 años"], a:1, tipo:"mc"},
      {q:"El Poder Legislativo está formado por ___", opts:["el Presidente y ministros","la Corte Suprema","el Congreso (Senado + Cámara de Diputados)","los gobernadores"], a:2, tipo:"mc"},
      {q:"¿Qué son los Derechos del Niño?", opts:["derechos solo para adultos","derechos especiales para proteger a los menores","reglas del colegio","leyes económicas"], a:1, tipo:"mc"},
      {q:"El voto es secreto y obligatorio en Argentina", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Quién encabeza el Poder Ejecutivo nacional?", opts:["El gobernador","El Presidente","El juez","El senador"], a:1, tipo:"mc"},
      {q:"La democracia permite la participación ciudadana", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Cuántos artículos tiene la Constitución Nacional de 1853?", opts:["50","80","129","200"], a:2, tipo:"mc"},
    ],
  },
};

// ═══════════════════════════════════════════════════════════════
//  BANCO EXTENDIDO — ejercicios de comprensión y formulación
//  Tipos nuevos:
//   'texto-roto'  → texto con [BLANK] para rellenar arrastrando
//   'traducir'    → frase vaga → elegir versión técnica correcta
//   'detective'   → leer un fragmento real + 3 preguntas
//   'ordenar'     → oraciones desordenadas para reordenar
// ═══════════════════════════════════════════════════════════════
const BANCO_EXT = {

  nat: {
    "Materia y Transformaciones": [
      // ── TEXTO ROTO ──────────────────────────────────────────
      {
        tipo: "texto-roto",
        texto: "Todos los materiales están formados por [BLANK] microscópicas. En el estado sólido esas partículas están muy [BLANK] entre sí. Al calentarse, las partículas se [BLANK] y el material puede pasar al estado líquido.",
        blancos: ["partículas","juntas","separan"],
        opciones: ["partículas","juntas","separan","mezclas","lejos","unen","átomos","ordenadas"],
        q: "Completá el texto sobre el modelo de partículas"
      },
      {
        tipo: "texto-roto",
        texto: "El cambio de sólido a líquido se llama [BLANK]. El cambio de líquido a gaseoso se llama [BLANK]. Ambos cambios son [BLANK] porque el material puede volver a su estado original.",
        blancos: ["fusión","vaporización","reversibles"],
        opciones: ["fusión","vaporización","reversibles","condensación","solidificación","irreversibles","evaporación","permanentes"],
        q: "Completá los nombres de los cambios de estado"
      },
      // ── TRADUCIR ────────────────────────────────────────────
      {
        tipo: "traducir",
        vaga: "El agua tiene tres cosas distintas según la temperatura.",
        opciones: [
          "El agua tiene tres estados de agregación que dependen de la temperatura.",
          "El agua cambia mucho cuando hace frío o calor.",
          "La temperatura hace que el agua se ponga de tres formas diferentes."
        ],
        a: 0,
        q: "¿Cuál de estas versiones expresa la idea de forma técnica y precisa?"
      },
      {
        tipo: "traducir",
        vaga: "Las cositas chiquitas del material se juntan más o menos según cómo esté.",
        opciones: [
          "Los materiales se ven distintos dependiendo de su forma.",
          "Las partículas que forman un material varían su distancia y orden según el estado de agregación.",
          "Las cosas pequeñas de los materiales se mueven más cuando hace calor."
        ],
        a: 1,
        q: "¿Cuál expresa la idea correctamente con vocabulario técnico?"
      },
      // ── DETECTIVE ───────────────────────────────────────────
      {
        tipo: "detective",
        texto: "Un átomo está constituido por subpartículas: el núcleo atómico y los electrones que giran a su alrededor. Los átomos se asocian formando moléculas. Una molécula de agua está formada por un átomo de oxígeno y dos átomos de hidrógeno, lo que se escribe H₂O. Si se 'rompe' esa unión, deja de ser agua y pasa a ser oxígeno e hidrógeno por separado.",
        preguntas: [
          {q: "¿Qué es una molécula?", opts: ["Un átomo muy grande","Una asociación de átomos","Un tipo de electrón","Una partícula sólida"], a: 1},
          {q: "¿Por qué el agua se escribe H₂O?", opts: ["Porque tiene 2 moléculas","Porque el 2 indica electrones","Porque tiene 2 átomos de hidrógeno y 1 de oxígeno","Porque es la segunda fórmula"], a: 2},
          {q: "Si se separan los átomos de H₂O, ¿qué obtenemos?", opts: ["Agua oxigenada","Hidrógeno y oxígeno por separado","Dos moléculas de agua","Un nuevo tipo de átomo"], a: 1}
        ]
      },
      {
        tipo: "detective",
        texto: "Los estados de agregación se explican por el modelo de partículas. En el estado sólido las partículas vibran pero no cambian de lugar. En el estado líquido se mueven con más libertad. En el estado gaseoso se separan totalmente y se mueven sin restricciones. La temperatura mide justamente esa agitación de las partículas.",
        preguntas: [
          {q: "¿Por qué las partículas en estado gaseoso se 'escapan'?", opts: ["Porque pesan menos","Porque no tienen fuerzas de atracción que las retengan","Porque la temperatura baja","Porque son más grandes"], a: 1},
          {q: "¿Qué mide la temperatura según el texto?", opts: ["El tamaño de las partículas","El peso del material","La agitación de las partículas","La cantidad de átomos"], a: 2},
          {q: "¿Qué tienen en común los tres estados?", opts: ["Las partículas se mueven igual en todos","Todos están formados por las mismas partículas del material","En todos las partículas están juntas","En todos las partículas están separadas"], a: 1}
        ]
      },
    ],
    "Sistema Solar": [
      {
        tipo: "texto-roto",
        texto: "La Tierra realiza dos movimientos: el de [BLANK], que dura 24 horas y genera el día y la noche; y el de [BLANK], que dura 365 días y genera las estaciones del año.",
        blancos: ["rotación","traslación"],
        opciones: ["rotación","traslación","revolución","giro","órbita","ciclo"],
        q: "Completá sobre los movimientos de la Tierra"
      },
      {
        tipo: "traducir",
        vaga: "La Tierra da vueltas alrededor del Sol y eso hace que tengamos las épocas del año.",
        opciones: [
          "La Tierra orbita alrededor del Sol en movimiento de traslación, lo que origina las estaciones del año.",
          "El Sol gira alrededor de la Tierra y eso produce las estaciones.",
          "La Tierra gira y por eso hay verano e invierno."
        ],
        a: 0,
        q: "¿Cuál expresa la idea con vocabulario técnico correcto?"
      },
    ],
  },

  soc: {
    "Historia Argentina": [
      {
        tipo: "detective",
        texto: "La Ley Sáenz Peña, sancionada en 1912, estableció que el voto debía ser secreto y obligatorio. El carácter secreto del sufragio tendía a evitar el fraude electoral, que era una práctica muy extendida. El carácter obligatorio apuntaba a aumentar el número de votantes. Sin embargo, quedaban excluidos de votar: las mujeres, los extranjeros, los presos y los militares, entre otros.",
        preguntas: [
          {q: "¿Por qué el voto secreto era importante en 1912?", opts: ["Para que nadie supiera quién ganaba","Para evitar el fraude electoral","Para que votara menos gente","Para proteger a los militares"], a: 1},
          {q: "¿Qué significa que el voto sea 'obligatorio'?", opts: ["Que solo votan los que quieren","Que todos los ciudadanos deben votar","Que se vota todos los días","Que el gobierno elige por vos"], a: 1},
          {q: "¿Por qué la ley fue considerada incompleta?", opts: ["Porque solo duró un año","Porque excluía a muchos grupos, como las mujeres y extranjeros","Porque solo servía en Buenos Aires","Porque no la firmó el presidente"], a: 1}
        ]
      },
      {
        tipo: "texto-roto",
        texto: "La Argentina se organizó como país [BLANK] hacia la segunda mitad del siglo XIX. Los límites con los países vecinos se establecieron a través de [BLANK] o conflictos armados. La 'Conquista del Desierto' fue un avance del Estado sobre territorios de los [BLANK].",
        blancos: ["independiente","negociaciones","pueblos originarios"],
        opciones: ["independiente","negociaciones","pueblos originarios","colonial","guerras","inmigrantes","soberano","tratados","militares"],
        q: "Completá sobre la formación del territorio argentino"
      },
      {
        tipo: "traducir",
        vaga: "En esa época los que tenían el poder hacían trampa para ganar las elecciones.",
        opciones: [
          "Los grupos dominantes practicaban el fraude electoral para mantenerse en el poder.",
          "Los políticos de antes eran muy malos y hacían lo que querían.",
          "En esa época todo el mundo hacía cosas malas en las elecciones."
        ],
        a: 0,
        q: "¿Cuál expresa la idea de forma técnica y precisa?"
      },
    ],
    "Geografía Argentina": [
      {
        tipo: "texto-roto",
        texto: "Un [BLANK] es un ámbito de la superficie terrestre claramente delimitado. El [BLANK] es una línea que separa dos territorios. La [BLANK] es el espacio donde se encuentran físicamente quienes habitan esos territorios.",
        blancos: ["territorio","límite","frontera"],
        opciones: ["territorio","límite","frontera","país","borde","ciudad","mapa","zona","región"],
        q: "Completá las definiciones geográficas"
      },
      {
        tipo: "traducir",
        vaga: "Argentina tiene muchas partes con diferentes cosas naturales.",
        opciones: [
          "Argentina posee diversas regiones naturales con características geográficas y climáticas distintas.",
          "En Argentina hay muchos lugares con naturaleza diferente.",
          "Argentina tiene partes donde la naturaleza es distinta en cada zona."
        ],
        a: 0,
        q: "¿Cuál es la versión técnicamente correcta?"
      },
    ],
  },

  len: {
    "Comprensión Lectora": [
      {
        tipo: "detective",
        texto: "En las colonias agrícolas de Santa Fe, las máquinas agrícolas reemplazaron a los viejos métodos de cultivo. Un estanciero comentó en 1911: 'Hace 30 años apenas se conocían las máquinas en el interior. Se segaba con hoz y se trillaba con caballos. Hoy, por todas partes, solo veo las máquinas más perfectas que nos envían los Estados Unidos'.",
        preguntas: [
          {q: "¿Qué cambio describe el estanciero?", opts: ["El cambio de idioma en las colonias","La modernización de las herramientas de cultivo","La llegada de nuevos trabajadores","El cambio de dueños de las tierras"], a: 1},
          {q: "¿Por qué el estanciero menciona que antes se usaban caballos para trillar?", opts: ["Para demostrar que los caballos eran mejores","Para mostrar el contraste entre el pasado y el presente","Porque los caballos eran más rápidos","Para criticar las nuevas máquinas"], a: 1},
          {q: "¿Qué podés deducir sobre la actitud del estanciero hacia las máquinas?", opts: ["Las rechaza porque destruyen el trabajo","Las acepta y valora positivamente","Es indiferente a los cambios","Las teme porque son extranjeras"], a: 1}
        ]
      },
      {
        tipo: "texto-roto",
        texto: "La idea [BLANK] de un texto es el tema central que desarrolla. Los detalles [BLANK] la idea principal. Cuando leemos un texto debemos distinguir entre lo que está dicho [BLANK] y lo que debemos [BLANK].",
        blancos: ["principal","apoyan","explícitamente","inferir"],
        opciones: ["principal","apoyan","explícitamente","inferir","secundaria","explican","claramente","copiar","central","ilustran","literalmente","deducir"],
        q: "Completá sobre cómo leer un texto"
      },
      {
        tipo: "traducir",
        vaga: "El texto habla de algo importante y hay que entender de qué se trata eso.",
        opciones: [
          "El texto desarrolla una idea principal que el lector debe identificar.",
          "El texto tiene una cosa importante y hay que ver qué es.",
          "Lo que dice el texto es importante y difícil de entender."
        ],
        a: 0,
        q: "¿Cuál expresa la idea de forma precisa?"
      },
    ],
    "Literatura": [
      {
        tipo: "texto-roto",
        texto: "Un cuento tiene tres partes: el [BLANK], donde se presentan los personajes y el ambiente; el [BLANK], donde aparece el conflicto; y el [BLANK], donde el conflicto se resuelve.",
        blancos: ["inicio","nudo","desenlace"],
        opciones: ["inicio","nudo","desenlace","principio","problema","final","prólogo","clímax","epílogo"],
        q: "Completá la estructura del cuento"
      },
      {
        tipo: "traducir",
        vaga: "El personaje del cuento hace cosas raras porque le pasan cosas que no son normales.",
        opciones: [
          "El protagonista reacciona de forma inusual ante situaciones fantásticas o sobrenaturales.",
          "El personaje actúa raro porque le pasan cosas extrañas.",
          "El personaje del cuento no se comporta bien porque le ocurren cosas."
        ],
        a: 0,
        q: "¿Cuál describe la situación con vocabulario literario correcto?"
      },
    ],
  },

  mat: {
    "Fracciones": [
      {
        tipo: "texto-roto",
        texto: "Una fracción tiene dos partes: el [BLANK], que indica cuántas partes se toman; y el [BLANK], que indica en cuántas partes iguales se divide el entero. Dos fracciones son [BLANK] cuando representan la misma cantidad.",
        blancos: ["numerador","denominador","equivalentes"],
        opciones: ["numerador","denominador","equivalentes","dividendo","divisor","iguales","factor","resultado","semejantes"],
        q: "Completá sobre las partes de una fracción"
      },
      {
        tipo: "traducir",
        vaga: "La mitad de algo es cuando lo partís en dos partes iguales y agarrás una.",
        opciones: [
          "La fracción ½ representa una de las dos partes iguales en que se divide un entero.",
          "La mitad es cuando dividís algo en dos y tomás una parte.",
          "½ es la mitad de cualquier número entero."
        ],
        a: 0,
        q: "¿Cuál define la fracción ½ de forma técnica y precisa?"
      },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════
//  HECHOS EXTRAIDOS DE ARCHIVOS SCRAPEADOS
//  Fuentes base:
//  - contenido/general/cuadernillos/MEN_Reencuentros_6to.txt
//  - contenido/general/cuadernillos/Corrientes_6to_Matematica.txt
// ═══════════════════════════════════════════════════════════════
const SCRAP_FACTS = {
  nat: {
    'Materia y Transformaciones': [
      {
        stem: 'En el modelo de partículas, ¿qué diferencia a un material de otro?',
        correcta: 'La cantidad y el tipo de partículas que lo componen.',
        distractores: ['Solo el color visible.', 'Únicamente su temperatura inicial.', 'Solo la dureza del material.']
      },
      {
        stem: '¿Qué describe el punto de fusión de un material?',
        correcta: 'La temperatura en la que pasa de sólido a líquido.',
        distractores: ['La temperatura en la que pasa de gas a líquido.', 'La cantidad de calor total del objeto.', 'La masa mínima para fundirse.']
      },
      {
        stem: 'En estado gaseoso, las partículas se caracterizan por...',
        correcta: 'Estar muy separadas y moverse sin restricciones.',
        distractores: ['Estar totalmente quietas.', 'Formar estructuras rígidas fijas.', 'No tener movimiento interno.']
      }
    ],
    'Sistema Solar': [
      {
        stem: '¿Qué movimiento de la Tierra explica día y noche?',
        correcta: 'La rotación sobre su eje.',
        distractores: ['La traslación alrededor del Sol.', 'La precesión equinoccial.', 'La inclinación orbital anual.']
      },
      {
        stem: '¿Qué movimiento terrestre se vincula con el ciclo anual?',
        correcta: 'La traslación alrededor del Sol.',
        distractores: ['La rotación diaria.', 'La libración lunar.', 'La refracción atmosférica.']
      }
    ],
    'Seres Vivos': [
      {
        stem: '¿Cuál es la unidad básica de organización de los seres vivos?',
        correcta: 'La célula.',
        distractores: ['El tejido.', 'La molécula de agua.', 'El átomo de carbono.']
      },
      {
        stem: 'En una cadena alimentaria escolar, las plantas funcionan como...',
        correcta: 'Productores de materia orgánica.',
        distractores: ['Consumidores secundarios.', 'Descomponedores exclusivos.', 'Depredadores tope.']
      }
    ],
    'Tierra y Universo': [
      {
        stem: '¿Qué causa principal explica las estaciones del año?',
        correcta: 'La inclinación del eje terrestre junto con la traslación.',
        distractores: ['Solo la distancia variable al Sol.', 'La velocidad del viento solar.', 'La cantidad de continentes iluminados.']
      }
    ]
  },
  soc: {
    'Historia Argentina': [
      {
        stem: 'Según el material de estudio, el modelo agroexportador se basó en...',
        correcta: 'Exportación de materias primas y alimentos al mercado mundial.',
        distractores: ['Industrialización pesada orientada al mercado interno.', 'Producción exclusiva de bienes tecnológicos.', 'Autosuficiencia cerrada sin comercio exterior.']
      },
      {
        stem: '¿Qué buscaba resolver el voto secreto en la Ley Sáenz Peña?',
        correcta: 'Reducir el fraude y la presión sobre votantes.',
        distractores: ['Eliminar por completo las elecciones.', 'Quitar representación parlamentaria.', 'Aumentar el voto cantado.']
      },
      {
        stem: 'En la conformación territorial argentina del siglo XIX, se destaca...',
        correcta: 'El avance estatal sobre territorios de pueblos originarios.',
        distractores: ['La desaparición total de las fronteras.', 'La autonomía plena de todas las comunidades originarias.', 'La unificación inmediata sin conflictos.']
      }
    ],
    'Geografía Argentina': [
      {
        stem: '¿Qué define mejor un límite internacional?',
        correcta: 'Una línea de separación entre territorios estatales.',
        distractores: ['Una zona climática compartida.', 'Una región económica urbana.', 'Una frontera cultural sin base espacial.']
      },
      {
        stem: '¿Cómo se diferencia frontera de límite?',
        correcta: 'La frontera es espacio de contacto; el límite es línea de separación.',
        distractores: ['Son sinónimos exactos en geografía política.', 'El límite es más ancho que la frontera.', 'La frontera solo existe en mapas antiguos.']
      }
    ],
    'Ciudadanía': [
      {
        stem: 'En un sistema republicano, la división de poderes busca...',
        correcta: 'Evitar concentración de poder y equilibrar funciones del Estado.',
        distractores: ['Eliminar al Poder Judicial.', 'Concentrar todas las decisiones en el Ejecutivo.', 'Reemplazar la Constitución por decretos.']
      }
    ]
  },
  len: {
    'Comprensión Lectora': [
      {
        stem: '¿Qué estrategia permite captar información no explícita de un texto?',
        correcta: 'Realizar inferencias con pistas textuales.',
        distractores: ['Copiar literalmente el primer párrafo.', 'Subrayar solo palabras desconocidas.', 'Ignorar conectores y relaciones lógicas.']
      },
      {
        stem: 'En análisis textual, la idea principal es...',
        correcta: 'El eje semántico central que organiza la información.',
        distractores: ['La oración más larga del texto.', 'El último adjetivo del cierre.', 'Una frase aislada sin relación global.']
      }
    ],
    'Gramática': [
      {
        stem: 'En la oración simple, el verbo conjugado cumple función de...',
        correcta: 'Núcleo del predicado verbal.',
        distractores: ['Núcleo del sujeto tácito.', 'Complemento directo obligatorio.', 'Modificador indirecto temporal.']
      }
    ],
    'Ortografía': [
      {
        stem: '¿Qué criterio rige tildación en palabras esdrújulas?',
        correcta: 'Siempre llevan tilde.',
        distractores: ['Solo si terminan en n o s.', 'Nunca llevan tilde.', 'Solo si son verbos en pasado.']
      }
    ],
    'Literatura': [
      {
        stem: 'En la estructura clásica del cuento, el nudo corresponde a...',
        correcta: 'La aparición y desarrollo del conflicto narrativo.',
        distractores: ['La lista de personajes secundarios.', 'La moraleja final explícita.', 'El prólogo editorial de la obra.']
      }
    ]
  },
  mat: {
    'Fracciones': [
      {
        stem: 'En una fracción, el denominador representa...',
        correcta: 'El total de partes iguales en que se divide el entero.',
        distractores: ['La parte tomada de forma exclusiva.', 'El resultado decimal final.', 'La unidad de medida del problema.']
      },
      {
        stem: 'Fracciones equivalentes son aquellas que...',
        correcta: 'Representan la misma cantidad con distinta escritura.',
        distractores: ['Tienen igual denominador siempre.', 'Siempre son números enteros.', 'No pueden simplificarse.']
      }
    ],
    'Decimales': [
      {
        stem: 'En notación decimal, 0,25 equivale a...',
        correcta: 'Veinticinco centésimos.',
        distractores: ['Dos enteros y cinco décimos.', 'Veinticinco milésimos.', 'Dos décimos y cinco centésimos.']
      }
    ],
    'Porcentajes': [
      {
        stem: 'Un porcentaje expresa una relación...',
        correcta: 'Sobre una base de cien partes.',
        distractores: ['Sobre una base de diez partes.', 'Solo sobre cantidades mayores a mil.', 'Exclusiva de números enteros pares.']
      }
    ],
    'Divisibilidad': [
      {
        stem: 'Un número es divisible por 2 cuando...',
        correcta: 'Termina en cifra par.',
        distractores: ['La suma de cifras es múltiplo de 3.', 'Termina en 0 o 5.', 'Siempre tiene dos dígitos.']
      }
    ],
    'Área y perímetro': [
      {
        stem: 'El perímetro de una figura plana es...',
        correcta: 'La suma de longitudes de su contorno.',
        distractores: ['La cantidad total de superficie cubierta.', 'El volumen interno de la figura.', 'La diagonal principal del polígono.']
      }
    ],
    'Álgebra Básica': [
      {
        stem: 'En una ecuación, la incógnita representa...',
        correcta: 'Un valor desconocido que debe determinarse.',
        distractores: ['Un resultado ya fijo e invariable.', 'Un error de cálculo deliberado.', 'Un número que no puede existir.']
      }
    ]
  }
};
