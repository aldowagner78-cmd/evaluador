// ═══════════════════════════════════════════════════════════════
//  EXPANSIÓN MASIVA DE CONTENIDO — 6to grado
//  Se mergea con PREGUNTAS y BANCO_EXT al cargar (ver ui.js)
//  Fuentes: PDFs scrapeados + corpus literario argentino + Santa Fe
// ═══════════════════════════════════════════════════════════════

// ──────────────────────────────────────────────────────────────
//  PREGUNTAS_EXTRA — agregadas al banco principal por tema
// ──────────────────────────────────────────────────────────────
const PREGUNTAS_EXTRA = {
  mat: {
    "Fracciones": [
      {q:"¿Cuánto es 2/3 + 1/6?", opts:["3/9","5/6","3/6","1/2"], a:1, tipo:"mc"},
      {q:"¿Cuánto es 7/8 − 1/4?", opts:["6/8","5/8","6/4","3/4"], a:1, tipo:"mc"},
      {q:"¿Cuánto es 3/5 × 10?", opts:["6","5","3","30/5"], a:0, tipo:"mc"},
      {q:"¿Cuánto es 9/10 ÷ 3?", opts:["3/10","27/10","6/10","9/30"], a:0, tipo:"mc"},
      {q:"Si comí 3/8 de pizza y mi hermano 2/8, ¿cuánto comimos juntos?", opts:["5/16","5/8","6/8","1/8"], a:1, tipo:"mc"},
      {q:"Simplificá 12/18", opts:["6/9","2/3","3/4","12/18"], a:1, tipo:"mc"},
      {q:"¿Qué fracción es mayor: 5/8 o 3/4?", opts:["5/8","3/4","Son iguales","No se puede comparar"], a:1, tipo:"mc"},
      {q:"Convertí 7/4 a número mixto", opts:["1 ¾","2 ¼","1 ¼","3 ¾"], a:0, tipo:"mc"},
      {q:"Convertí 2 ⅗ a fracción impropia", opts:["7/5","13/5","12/5","2/5"], a:1, tipo:"mc"},
      {q:"¿Cuánto es 5/6 de 24?", opts:["20","18","12","30"], a:0, tipo:"mc"},
      {q:"En una fracción propia el numerador es ___ que el denominador", opts:["mayor","igual","menor","cualquiera"], a:2, tipo:"mc"},
      {q:"¿Cuál es la fracción inversa de 3/7?", opts:["7/3","-3/7","3/-7","6/14"], a:0, tipo:"mc"},
    ],
    "Decimales": [
      {q:"¿Cuánto es 3,7 + 2,45?", opts:["6,15","5,12","6,12","5,15"], a:0, tipo:"mc"},
      {q:"¿Cuánto es 8 − 0,75?", opts:["7,25","8,75","7,75","7,15"], a:0, tipo:"mc"},
      {q:"¿Cuánto es 0,4 × 0,5?", opts:["0,9","2,0","0,2","0,02"], a:2, tipo:"mc"},
      {q:"¿Cuánto es 6,3 ÷ 0,3?", opts:["21","2,1","210","6"], a:0, tipo:"mc"},
      {q:"Ordená de menor a mayor: 0,5 — 0,55 — 0,505", opts:["0,5 < 0,505 < 0,55","0,505 < 0,5 < 0,55","0,55 < 0,5 < 0,505","0,5 < 0,55 < 0,505"], a:0, tipo:"mc"},
      {q:"¿Qué decimal corresponde a 7/10?", opts:["0,07","0,7","7,10","0,710"], a:1, tipo:"mc"},
      {q:"¿Qué fracción corresponde a 0,125?", opts:["1/8","1/4","125/100","1/5"], a:0, tipo:"mc"},
      {q:"3,14159 redondeado a centésimos es ___", opts:["3,14","3,1","3,15","3,141"], a:0, tipo:"mc"},
      {q:"¿Cuántos centésimos tiene 0,07?", opts:["7","70","0,7","0,07"], a:0, tipo:"mc"},
      {q:"0,9 = 9/10", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
    ],
    "Porcentajes": [
      {q:"En una remera de $800 te hacen 15% de descuento. ¿Cuánto pagás?", opts:["$680","$720","$785","$640"], a:0, tipo:"mc"},
      {q:"Si 30 alumnos son el 60% del curso, ¿cuántos alumnos hay en total?", opts:["50","45","60","36"], a:0, tipo:"mc"},
      {q:"¿Qué porcentaje es 24 de 80?", opts:["24%","30%","40%","12%"], a:1, tipo:"mc"},
      {q:"Aumento del 20% sobre $500: precio final = ___", opts:["$520","$600","$580","$700"], a:1, tipo:"mc"},
      {q:"75% es lo mismo que 3/4", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"¿Cuánto es el 5% de 2000?", opts:["100","50","200","500"], a:0, tipo:"mc"},
      {q:"Si 80% de 200 = X, entonces X vale ___", opts:["120","160","100","180"], a:1, tipo:"mc"},
    ],
    "Divisibilidad": [
      {q:"¿Cuál es el MCD de 18 y 24?", opts:["3","6","12","2"], a:1, tipo:"mc"},
      {q:"¿Cuál es el MCM de 6 y 8?", opts:["14","48","24","16"], a:2, tipo:"mc"},
      {q:"¿Cuál de estos es primo: 21, 27, 29, 33?", opts:["21","27","29","33"], a:2, tipo:"mc"},
      {q:"Un número divisible por 3 cumple: la suma de sus dígitos es múltiplo de ___", opts:["2","3","5","9"], a:1, tipo:"mc"},
      {q:"¿Es 144 divisible por 4?", opts:["Sí","No"], a:0, tipo:"tf"},
      {q:"Un número es divisible por 5 si termina en ___", opts:["1 o 9","2 o 4","0 o 5","cualquier dígito"], a:2, tipo:"mc"},
      {q:"¿Cuáles son los primeros 4 múltiplos de 7?", opts:["7,14,21,28","1,7,14,21","7,17,27,37","14,21,28,35"], a:0, tipo:"mc"},
    ],
    "Área y perímetro": [
      {q:"Área de un rombo con diagonales 6 y 8 = ___", opts:["48","24","14","28"], a:1, tipo:"mc"},
      {q:"Área del círculo de radio 5 (π≈3,14)", opts:["31,4","78,5","15,7","100"], a:1, tipo:"mc"},
      {q:"Circunferencia del círculo de radio 7 (π≈3,14)", opts:["21,98","43,96","49","14"], a:1, tipo:"mc"},
      {q:"Perímetro de triángulo equilátero de lado 9 = ___", opts:["27","18","81","9"], a:0, tipo:"mc"},
      {q:"Área del paralelogramo de base 10 y altura 4", opts:["14","20","40","100"], a:2, tipo:"mc"},
      {q:"Volumen de un cubo de arista 3", opts:["9","27","6","81"], a:1, tipo:"mc"},
    ],
    "Álgebra Básica": [
      {q:"Si 3x + 5 = 20, x = ___", opts:["5","15","3","7"], a:0, tipo:"mc"},
      {q:"Si 2x − 7 = 11, x = ___", opts:["2","9","18","4"], a:1, tipo:"mc"},
      {q:"Si x/3 + 4 = 10, x = ___", opts:["6","2","18","42"], a:2, tipo:"mc"},
      {q:"Evaluá 2a + 3b cuando a=4, b=5", opts:["23","17","26","35"], a:0, tipo:"mc"},
      {q:"Si 4(x − 2) = 12, x = ___", opts:["1","5","3","8"], a:1, tipo:"mc"},
      {q:"Resolvé: 2³ + 3²", opts:["13","17","11","15"], a:1, tipo:"mc"},
      {q:"Resolvé: 5² − 3²", opts:["16","4","8","2"], a:0, tipo:"mc"},
    ],
    "Potencias y Raíces": [
      {q:"¿Cuánto es 2⁵?", opts:["10","16","32","25"], a:2, tipo:"mc"},
      {q:"¿Cuánto es 10³?", opts:["30","100","1000","10000"], a:2, tipo:"mc"},
      {q:"√81 = ___", opts:["9","8","7","81"], a:0, tipo:"mc"},
      {q:"√144 = ___", opts:["12","14","11","13"], a:0, tipo:"mc"},
      {q:"3² × 3³ = 3 a la ___", opts:["6","5","9","8"], a:1, tipo:"mc"},
      {q:"5⁰ = ___", opts:["0","1","5","-5"], a:1, tipo:"mc"},
      {q:"¿Cuánto es 4³?", opts:["12","64","16","81"], a:1, tipo:"mc"},
      {q:"√25 + √16 = ___", opts:["9","41","20","5"], a:0, tipo:"mc"},
    ],
    "Razones y Proporciones": [
      {q:"Si 4 cuadernos cuestan $1200, ¿cuánto cuestan 7?", opts:["$2100","$1900","$2400","$1800"], a:0, tipo:"mc"},
      {q:"3 obreros tardan 12 días. ¿Cuántos días tardarán 6 obreros?", opts:["24","6","8","4"], a:1, tipo:"mc"},
      {q:"En un mapa 1cm = 5km. Si A y B están a 8cm, ¿cuántos km hay?", opts:["13","30","40","45"], a:2, tipo:"mc"},
      {q:"Razón de 15 a 25 simplificada", opts:["3:5","2:3","1:2","5:3"], a:0, tipo:"mc"},
      {q:"Si 2:3 = x:12, x = ___", opts:["6","8","4","9"], a:1, tipo:"mc"},
      {q:"Una receta para 4 personas usa 200g de harina. ¿Para 10?", opts:["400g","450g","500g","600g"], a:2, tipo:"mc"},
    ],
    "Geometría": [
      {q:"¿Cuántos lados tiene un hexágono?", opts:["5","6","7","8"], a:1, tipo:"mc"},
      {q:"Suma de ángulos interiores de un triángulo = ___°", opts:["90","180","270","360"], a:1, tipo:"mc"},
      {q:"Suma de ángulos interiores de un cuadrilátero = ___°", opts:["180","270","360","540"], a:2, tipo:"mc"},
      {q:"Un ángulo recto mide ___°", opts:["45","60","90","180"], a:2, tipo:"mc"},
      {q:"Dos rectas que nunca se cortan son ___", opts:["perpendiculares","paralelas","secantes","oblicuas"], a:1, tipo:"mc"},
      {q:"Un triángulo con tres lados iguales es ___", opts:["isósceles","escaleno","equilátero","rectángulo"], a:2, tipo:"mc"},
      {q:"Un polígono de 8 lados se llama ___", opts:["heptágono","octógono","nonágono","decágono"], a:1, tipo:"mc"},
      {q:"El radio de una circunferencia es la mitad del ___", opts:["diámetro","perímetro","área","arco"], a:0, tipo:"mc"},
    ],
    "Estadística": [
      {q:"La media de 4, 6, 8, 10 = ___", opts:["6","7","8","28"], a:1, tipo:"mc"},
      {q:"La mediana de 3, 5, 7, 9, 11 = ___", opts:["5","7","9","35"], a:1, tipo:"mc"},
      {q:"La moda en 2, 3, 3, 5, 7, 3 = ___", opts:["2","3","5","7"], a:1, tipo:"mc"},
      {q:"Probabilidad de sacar cara al tirar una moneda = ___", opts:["1/4","1/2","1","0"], a:1, tipo:"mc"},
      {q:"Probabilidad de sacar 6 con un dado = ___", opts:["1/3","1/6","6/6","1/2"], a:1, tipo:"mc"},
      {q:"En un gráfico de barras, las barras representan ___", opts:["la temperatura","las cantidades por categoría","el tiempo","los porcentajes solo"], a:1, tipo:"mc"},
    ],
  },
  len: {
    "Comprensión Lectora": [
      {q:"En 'leyó atentamente el cartel', ¿qué función tiene 'atentamente'?", opts:["sustantivo","adjetivo","adverbio","verbo"], a:2, tipo:"mc"},
      {q:"Si un texto explica cómo armar algo paso a paso es un texto ___", opts:["narrativo","instructivo","argumentativo","poético"], a:1, tipo:"mc"},
      {q:"Si un texto cuenta una historia con personajes es ___", opts:["informativo","narrativo","instructivo","descriptivo"], a:1, tipo:"mc"},
      {q:"Un texto que defiende una opinión es ___", opts:["narrativo","descriptivo","argumentativo","instructivo"], a:2, tipo:"mc"},
      {q:"El conector 'sin embargo' indica ___", opts:["causa","oposición","tiempo","finalidad"], a:1, tipo:"mc"},
      {q:"El conector 'porque' indica ___", opts:["oposición","causa","consecuencia","tiempo"], a:1, tipo:"mc"},
      {q:"Resumir un texto es ___", opts:["copiarlo entero","elegir lo más importante con propias palabras","cambiar el orden","traducirlo"], a:1, tipo:"mc"},
      {q:"Releer un texto sirve para ___", opts:["perder tiempo","comprender mejor lo que no entendí","no aprender nada","memorizarlo entero"], a:1, tipo:"mc"},
    ],
    "Gramática": [
      {q:"¿Cuál es un pronombre personal?", opts:["mesa","yo","correr","azul"], a:1, tipo:"mc"},
      {q:"En 'Lo vi ayer', el 'lo' es ___", opts:["sustantivo","pronombre","verbo","adjetivo"], a:1, tipo:"mc"},
      {q:"El predicado de 'Mi perro corre rápido' es ___", opts:["mi perro","corre rápido","corre","rápido"], a:1, tipo:"mc"},
      {q:"¿Qué tiempo verbal es 'caminé'?", opts:["presente","pasado (pretérito)","futuro","condicional"], a:1, tipo:"mc"},
      {q:"¿Qué tiempo es 'cantaré'?", opts:["presente","pasado","futuro","condicional"], a:2, tipo:"mc"},
      {q:"Las palabras como 'rápidamente' se llaman ___", opts:["sustantivos","adjetivos","verbos","adverbios"], a:3, tipo:"mc"},
      {q:"El plural de 'lápiz' es ___", opts:["lápizes","lapizes","lápices","lapices"], a:2, tipo:"mc"},
      {q:"El femenino de 'el actor' es ___", opts:["la actor","la actora","la actriz","el actriz"], a:2, tipo:"mc"},
      {q:"En 'la casa grande', 'grande' es ___", opts:["sustantivo","verbo","adjetivo","adverbio"], a:2, tipo:"mc"},
      {q:"¿Cuál es una conjunción?", opts:["pero","corre","feliz","casa"], a:0, tipo:"mc"},
    ],
    "Ortografía": [
      {q:"¿Cómo se escribe correctamente?", opts:["Hubo","Ubo","Hubó","Huvo"], a:0, tipo:"mc"},
      {q:"¿Cómo se escribe?", opts:["Echo de menos","Hecho de menos","Eecho de menos","Echó de menos"], a:0, tipo:"mc"},
      {q:"'Ahí' (lugar) lleva tilde", opts:["Verdadero","Falso"], a:0, tipo:"tf"},
      {q:"'Ay' (exclamación) lleva tilde", opts:["Verdadero","Falso"], a:1, tipo:"tf"},
      {q:"¿Cuál se escribe con B?", opts:["Vurro","Burro","Búrro","Vúrro"], a:1, tipo:"mc"},
      {q:"¿Cuál se escribe con V?", opts:["Berde","Verde","Vbrde","Berdé"], a:1, tipo:"mc"},
      {q:"Las palabras graves llevan tilde cuando NO terminan en ___", opts:["a, e, i, o, u","n o s","vocal, n o s","consonante"], a:2, tipo:"mc"},
      {q:"'Médico' es palabra ___", opts:["aguda","grave","esdrújula","sobreesdrújula"], a:2, tipo:"mc"},
      {q:"'Cantar' es palabra ___", opts:["aguda","grave","esdrújula","sobreesdrújula"], a:0, tipo:"mc"},
      {q:"'Casa' es palabra ___", opts:["aguda","grave","esdrújula","sobreesdrújula"], a:1, tipo:"mc"},
      {q:"¿Tilde diacrítica? 'Solo' (solamente) vs 'sólo' — la RAE recomienda ___", opts:["nunca tildarlo","siempre tildarlo","tildarlo si hay ambigüedad","tildarlo si está al final"], a:0, tipo:"mc"},
      {q:"'Tú' (pronombre) vs 'tu' (posesivo): el pronombre lleva ___", opts:["sin tilde","con tilde","con diéresis","con coma"], a:1, tipo:"mc"},
    ],
    "Literatura": [
      {q:"María Elena Walsh escribió 'Zoo Loco', un libro de ___", opts:["cuentos","novelas","limericks","ensayos"], a:2, tipo:"mc"},
      {q:"Un limerick tiene ___ versos", opts:["3","4","5","8"], a:2, tipo:"mc"},
      {q:"En 'Casa tomada' de Cortázar, los hermanos pierden la casa porque ___", opts:["la venden","aparece algo extraño que los va expulsando","se incendia","se mudan al extranjero"], a:1, tipo:"mc"},
      {q:"En 'Continuidad de los parques' de Cortázar, el lector ___", opts:["lee un cuento policial","es la víctima del cuento que está leyendo","resuelve un crimen","gana un viaje"], a:1, tipo:"mc"},
      {q:"'A la deriva' de Quiroga trata sobre un hombre que ___", opts:["pierde un partido","es mordido por una serpiente venenosa","se enamora","viaja a Europa"], a:1, tipo:"mc"},
      {q:"En 'El almohadón de plumas' de Quiroga, lo que enferma a la protagonista es ___", opts:["un virus","un parásito oculto en su almohada","la tristeza","el cansancio"], a:1, tipo:"mc"},
      {q:"Alfonsina Storni escribió poemas sobre ___", opts:["solo paisajes","la condición femenina y el amor","matemática","biología"], a:1, tipo:"mc"},
      {q:"Borges es famoso por ___", opts:["solo novelas largas","cuentos breves y laberínticos","poesía épica","obras de teatro"], a:1, tipo:"mc"},
      {q:"En un cuento, el protagonista es ___", opts:["un personaje secundario","el personaje principal","el narrador siempre","el villano"], a:1, tipo:"mc"},
      {q:"Una metáfora es ___", opts:["una comparación con 'como'","identificar una cosa con otra sin 'como'","un sinónimo","un sustantivo abstracto"], a:1, tipo:"mc"},
      {q:"Una hipérbole es ___", opts:["una exageración","una pregunta retórica","una descripción real","una rima asonante"], a:0, tipo:"mc"},
      {q:"Una personificación da características humanas a ___", opts:["personas","objetos o animales","números","emociones"], a:1, tipo:"mc"},
      {q:"Un cuento fantástico se distingue por ___", opts:["ser realista","incluir elementos sobrenaturales inexplicables","ser muy largo","tener muchos personajes"], a:1, tipo:"mc"},
      {q:"La rima asonante coincide en ___", opts:["consonantes y vocales","solo vocales finales","solo consonantes","el ritmo"], a:1, tipo:"mc"},
      {q:"María Elena Walsh también escribió 'Dailan Kifki', una ___", opts:["poesía","novela infantil sobre un elefante","obra de teatro","biografía"], a:1, tipo:"mc"},
    ],
  },
  nat: {
    "Materia y Transformaciones": [
      {q:"¿Qué pasa con el volumen del agua al congelarse?", opts:["disminuye","aumenta","se mantiene igual","desaparece"], a:1, tipo:"mc"},
      {q:"La sublimación es el paso de ___", opts:["sólido a líquido","sólido a gas directamente","gas a líquido","líquido a gas"], a:1, tipo:"mc"},
      {q:"Una solución es una mezcla ___", opts:["heterogénea","homogénea","química","sólida"], a:1, tipo:"mc"},
      {q:"El aire es una mezcla principalmente de ___", opts:["oxígeno e hidrógeno","nitrógeno y oxígeno","CO₂ y argón","vapor de agua"], a:1, tipo:"mc"},
      {q:"¿Qué método separa arena del agua?", opts:["destilación","filtración","evaporación","tamizado"], a:1, tipo:"mc"},
      {q:"¿Qué método separa sal del agua?", opts:["filtración","evaporación","tamizado","decantación"], a:1, tipo:"mc"},
      {q:"Un cambio químico produce ___", opts:["la misma sustancia","una nueva sustancia","calor sólo","frío"], a:1, tipo:"mc"},
      {q:"La oxidación del hierro es un cambio ___", opts:["físico","químico","mecánico","de estado"], a:1, tipo:"mc"},
    ],
    "Seres Vivos": [
      {q:"¿Cuál es el órgano principal del sistema nervioso?", opts:["corazón","cerebro","hígado","pulmón"], a:1, tipo:"mc"},
      {q:"Los pulmones pertenecen al sistema ___", opts:["digestivo","circulatorio","respiratorio","excretor"], a:2, tipo:"mc"},
      {q:"La sangre transporta ___", opts:["solo agua","oxígeno y nutrientes","aire","comida sólida"], a:1, tipo:"mc"},
      {q:"Las plantas hacen fotosíntesis para ___", opts:["respirar","fabricar su alimento","reproducirse","crecer raíces"], a:1, tipo:"mc"},
      {q:"Los herbívoros se alimentan de ___", opts:["carne","plantas","insectos","minerales"], a:1, tipo:"mc"},
      {q:"Los carnívoros comen ___", opts:["plantas","carne","frutos","raíces"], a:1, tipo:"mc"},
      {q:"Los omnívoros comen ___", opts:["solo plantas","solo carne","plantas y carne","minerales"], a:2, tipo:"mc"},
      {q:"La célula vegetal tiene una estructura que la animal NO: la ___", opts:["membrana","pared celular","mitocondria","núcleo"], a:1, tipo:"mc"},
      {q:"Los descomponedores son ___", opts:["productores","carnívoros","hongos y bacterias","plantas"], a:2, tipo:"mc"},
      {q:"La biodiversidad se refiere a ___", opts:["la cantidad total de plantas","la variedad de seres vivos en un ecosistema","el clima","los minerales"], a:1, tipo:"mc"},
    ],
    "Sistema Solar": [
      {q:"Los planetas rocosos son ___", opts:["Mercurio, Venus, Tierra, Marte","Júpiter y Saturno","Urano y Neptuno","todos los planetas"], a:0, tipo:"mc"},
      {q:"Los planetas gaseosos son ___", opts:["Mercurio y Venus","Tierra y Marte","Júpiter, Saturno, Urano y Neptuno","ninguno"], a:2, tipo:"mc"},
      {q:"Plutón hoy se considera un ___", opts:["planeta","planeta enano","satélite","asteroide gigante"], a:1, tipo:"mc"},
      {q:"La Vía Láctea es ___", opts:["un planeta","un cometa","una galaxia","una constelación"], a:2, tipo:"mc"},
      {q:"La luz del Sol tarda en llegar a la Tierra unos ___", opts:["segundos","8 minutos","1 hora","1 día"], a:1, tipo:"mc"},
      {q:"Los cometas tienen una cola que apunta ___", opts:["al Sol","en sentido opuesto al Sol","a la Tierra","abajo"], a:1, tipo:"mc"},
      {q:"Una constelación es ___", opts:["una estrella sola","un grupo de estrellas que forman figuras","un planeta","una galaxia"], a:1, tipo:"mc"},
      {q:"La gravedad de un planeta depende de su ___", opts:["color","temperatura","masa","número de lunas"], a:2, tipo:"mc"},
    ],
    "Cuerpo Humano": [
      {q:"El esqueleto humano adulto tiene aproximadamente ___ huesos", opts:["100","206","300","500"], a:1, tipo:"mc"},
      {q:"El músculo más fuerte del cuerpo es ___", opts:["el bíceps","el corazón","el masetero (mandíbula)","el cuádriceps"], a:2, tipo:"mc"},
      {q:"El órgano más grande del cuerpo es ___", opts:["el hígado","los pulmones","la piel","el intestino"], a:2, tipo:"mc"},
      {q:"Los glóbulos rojos transportan ___", opts:["oxígeno","azúcar","agua","gérmenes"], a:0, tipo:"mc"},
      {q:"Los glóbulos blancos sirven para ___", opts:["transportar oxígeno","defender contra infecciones","hacer crecer huesos","digerir comida"], a:1, tipo:"mc"},
      {q:"El estómago digiere los alimentos con ___", opts:["agua","jugos gástricos","saliva","sangre"], a:1, tipo:"mc"},
      {q:"Los riñones filtran ___", opts:["el aire","la sangre","la comida","los huesos"], a:1, tipo:"mc"},
      {q:"El corazón humano tiene ___ cavidades", opts:["2","3","4","5"], a:2, tipo:"mc"},
    ],
    "Energía y Fuerzas": [
      {q:"La energía del Sol es ___", opts:["química","solar","nuclear","térmica solar"], a:3, tipo:"mc"},
      {q:"Una fuente de energía renovable es ___", opts:["el petróleo","el carbón","el viento","el gas natural"], a:2, tipo:"mc"},
      {q:"Los paneles solares transforman energía solar en ___", opts:["mecánica","eléctrica","térmica solamente","química"], a:1, tipo:"mc"},
      {q:"La fuerza de gravedad nos atrae hacia ___", opts:["el Sol","el centro de la Tierra","la Luna","el espacio"], a:1, tipo:"mc"},
      {q:"Una palanca sirve para ___", opts:["calentar","reducir el esfuerzo necesario","cortar","medir"], a:1, tipo:"mc"},
      {q:"La unidad de fuerza es el ___", opts:["metro","newton","gramo","julio"], a:1, tipo:"mc"},
      {q:"La energía no se crea ni se destruye, solo se ___", opts:["pierde","transforma","copia","desaparece"], a:1, tipo:"mc"},
    ],
  },
  soc: {
    "Historia Argentina": [
      {q:"La Revolución de Mayo ocurrió en ___", opts:["1810","1816","1853","1900"], a:0, tipo:"mc"},
      {q:"La Independencia de Argentina se declaró en ___", opts:["1810","1816","1853","1880"], a:1, tipo:"mc"},
      {q:"José de San Martín cruzó los Andes para liberar ___", opts:["Brasil","Chile y Perú","Bolivia","Uruguay"], a:1, tipo:"mc"},
      {q:"Manuel Belgrano creó ___", opts:["la Constitución","la Bandera","el Himno","el Escudo"], a:1, tipo:"mc"},
      {q:"El Himno Nacional fue escrito por ___", opts:["Belgrano","Vicente López y Planes","San Martín","Sarmiento"], a:1, tipo:"mc"},
      {q:"Sarmiento es conocido por su trabajo en ___", opts:["la guerra","la educación pública","la economía","el ferrocarril"], a:1, tipo:"mc"},
      {q:"La 'Ley 1420' de 1884 estableció ___", opts:["el voto femenino","la educación primaria gratuita, laica y obligatoria","la independencia","la Constitución"], a:1, tipo:"mc"},
      {q:"El voto femenino se obtuvo en Argentina en ___", opts:["1912","1947","1916","1983"], a:1, tipo:"mc"},
      {q:"Eva Perón impulsó ___", opts:["el sufragio masculino","el voto femenino","la dictadura","la inmigración"], a:1, tipo:"mc"},
      {q:"Los pueblos originarios pampeanos eran ___", opts:["mapuches y tehuelches","incas","aztecas","mayas"], a:0, tipo:"mc"},
      {q:"Los wichí y qom habitan principalmente en ___", opts:["la Patagonia","el Gran Chaco","la Pampa","Cuyo"], a:1, tipo:"mc"},
    ],
    "Geografía Argentina": [
      {q:"La capital de la provincia de Santa Fe es ___", opts:["Rosario","Santa Fe de la Vera Cruz","Rafaela","Venado Tuerto"], a:1, tipo:"mc"},
      {q:"Santa Fe limita al este con ___", opts:["Córdoba","Entre Ríos (separados por el río Paraná)","Chaco","Buenos Aires"], a:1, tipo:"mc"},
      {q:"El río más importante que atraviesa Santa Fe es el ___", opts:["Uruguay","Paraná","Salado","Pilcomayo"], a:1, tipo:"mc"},
      {q:"Rosario es la ciudad más poblada de la provincia de ___", opts:["Buenos Aires","Córdoba","Santa Fe","Entre Ríos"], a:2, tipo:"mc"},
      {q:"La provincia de Santa Fe está dividida en ___ departamentos", opts:["10","19","23","30"], a:1, tipo:"mc"},
      {q:"La región pampeana incluye Buenos Aires, Córdoba, Santa Fe, Entre Ríos y ___", opts:["La Pampa","Mendoza","Tucumán","Salta"], a:0, tipo:"mc"},
      {q:"La región del NOA incluye ___", opts:["Salta, Jujuy, Tucumán, Catamarca, La Rioja","Misiones y Corrientes","Buenos Aires solamente","Patagonia"], a:0, tipo:"mc"},
      {q:"La región del NEA incluye ___", opts:["Mendoza y San Juan","Misiones, Corrientes, Chaco, Formosa","La Pampa","Tierra del Fuego"], a:1, tipo:"mc"},
      {q:"Cuyo está formada por ___", opts:["Mendoza, San Juan, San Luis","La Pampa y Buenos Aires","Salta y Jujuy","Río Negro"], a:0, tipo:"mc"},
      {q:"La Patagonia incluye ___", opts:["Chaco y Formosa","Río Negro, Neuquén, Chubut, Santa Cruz, Tierra del Fuego","Salta","Buenos Aires"], a:1, tipo:"mc"},
      {q:"El Glaciar Perito Moreno está en la provincia de ___", opts:["Chubut","Santa Cruz","Río Negro","Tierra del Fuego"], a:1, tipo:"mc"},
      {q:"Las Cataratas del Iguazú están en la provincia de ___", opts:["Corrientes","Chaco","Misiones","Formosa"], a:2, tipo:"mc"},
    ],
    "Geografía Mundial": [
      {q:"¿Cuántos continentes hay según el modelo tradicional?", opts:["4","5","6","7"], a:2, tipo:"mc"},
      {q:"El continente más grande es ___", opts:["África","América","Asia","Europa"], a:2, tipo:"mc"},
      {q:"El continente más pequeño es ___", opts:["Europa","Oceanía","Antártida","África"], a:1, tipo:"mc"},
      {q:"El océano más grande es el ___", opts:["Atlántico","Pacífico","Índico","Ártico"], a:1, tipo:"mc"},
      {q:"La capital de Brasil es ___", opts:["Río de Janeiro","São Paulo","Brasilia","Salvador"], a:2, tipo:"mc"},
      {q:"La capital de Chile es ___", opts:["Valparaíso","Concepción","Santiago","Iquique"], a:2, tipo:"mc"},
      {q:"La capital de Uruguay es ___", opts:["Punta del Este","Montevideo","Colonia","Salto"], a:1, tipo:"mc"},
      {q:"La capital de Bolivia es ___", opts:["La Paz (sede de gobierno)","Sucre","Santa Cruz","Cochabamba"], a:0, tipo:"mc"},
      {q:"La capital de Paraguay es ___", opts:["Asunción","Encarnación","Ciudad del Este","Pilar"], a:0, tipo:"mc"},
      {q:"La capital de Perú es ___", opts:["Cusco","Arequipa","Lima","Trujillo"], a:2, tipo:"mc"},
      {q:"La capital de México es ___", opts:["Guadalajara","Monterrey","Ciudad de México","Cancún"], a:2, tipo:"mc"},
      {q:"La capital de Estados Unidos es ___", opts:["Nueva York","Washington D.C.","Los Ángeles","Chicago"], a:1, tipo:"mc"},
      {q:"La capital de Francia es ___", opts:["Lyon","París","Marsella","Niza"], a:1, tipo:"mc"},
      {q:"La capital de España es ___", opts:["Barcelona","Madrid","Sevilla","Valencia"], a:1, tipo:"mc"},
      {q:"La capital de Italia es ___", opts:["Milán","Roma","Venecia","Florencia"], a:1, tipo:"mc"},
      {q:"La capital de Alemania es ___", opts:["Múnich","Berlín","Hamburgo","Frankfurt"], a:1, tipo:"mc"},
      {q:"La capital de Reino Unido es ___", opts:["Liverpool","Manchester","Londres","Edimburgo"], a:2, tipo:"mc"},
      {q:"La capital de Japón es ___", opts:["Osaka","Kioto","Tokio","Yokohama"], a:2, tipo:"mc"},
      {q:"La capital de China es ___", opts:["Shanghái","Pekín (Beijing)","Hong Kong","Cantón"], a:1, tipo:"mc"},
      {q:"La capital de Egipto es ___", opts:["Alejandría","El Cairo","Luxor","Asuán"], a:1, tipo:"mc"},
      {q:"El río más largo del mundo es ___", opts:["Amazonas","Nilo","Yangtsé","Mississippi"], a:1, tipo:"mc"},
      {q:"El río Amazonas atraviesa principalmente ___", opts:["Argentina","Brasil","Colombia","Venezuela"], a:1, tipo:"mc"},
      {q:"El monte más alto del mundo es ___", opts:["Aconcagua","Everest","K2","Kilimanjaro"], a:1, tipo:"mc"},
      {q:"El Everest está en la cordillera del ___", opts:["Andes","Himalaya","Atlas","Rocosas"], a:1, tipo:"mc"},
      {q:"El desierto del Sahara está en ___", opts:["Asia","América","África","Oceanía"], a:2, tipo:"mc"},
      {q:"Australia es a la vez país y ___", opts:["isla","continente","archipiélago","península"], a:1, tipo:"mc"},
      {q:"La Antártida es famosa por su ___", opts:["selva","desierto cálido","hielo permanente","grandes ciudades"], a:2, tipo:"mc"},
      {q:"El Ecuador divide la Tierra en hemisferios ___", opts:["Norte y Sur","Este y Oeste","Frío y Cálido","Antiguo y Nuevo"], a:0, tipo:"mc"},
      {q:"El Meridiano de Greenwich divide la Tierra en hemisferios ___", opts:["Norte y Sur","Este y Oeste","Tropical y Polar","Diurno y Nocturno"], a:1, tipo:"mc"},
      {q:"Los trópicos son ___", opts:["Cáncer y Capricornio","Norte y Sur","Polar y Tropical","Ártico y Antártico"], a:0, tipo:"mc"},
    ],
    "Santa Fe Provincia": [
      {q:"La capital de la provincia de Santa Fe es la ciudad de ___", opts:["Rosario","Santa Fe de la Vera Cruz","Rafaela","Reconquista"], a:1, tipo:"mc"},
      {q:"Santa Fe fue fundada por Juan de Garay en ___", opts:["1573","1810","1853","1900"], a:0, tipo:"mc"},
      {q:"Rosario fue la ciudad donde Belgrano izó por primera vez la ___", opts:["bandera de los Andes","bandera nacional argentina","bandera de Cuyo","bandera de Mayo"], a:1, tipo:"mc"},
      {q:"El Monumento a la Bandera está en ___", opts:["Santa Fe ciudad","Rosario","Rafaela","Esperanza"], a:1, tipo:"mc"},
      {q:"La provincia de Santa Fe limita al norte con ___", opts:["Córdoba","Chaco","Buenos Aires","Corrientes"], a:1, tipo:"mc"},
      {q:"Santa Fe limita al sur con la provincia de ___", opts:["Córdoba","Buenos Aires","Entre Ríos","Chaco"], a:1, tipo:"mc"},
      {q:"Santa Fe limita al oeste con ___", opts:["Buenos Aires","Córdoba y Santiago del Estero","Entre Ríos","Chaco"], a:1, tipo:"mc"},
      {q:"Las principales actividades económicas de Santa Fe son ___", opts:["minería y turismo","agro (soja, trigo, maíz) y ganadería","pesca marítima","petróleo"], a:1, tipo:"mc"},
      {q:"El puerto más importante de Santa Fe está en ___", opts:["Santa Fe ciudad","Rosario","Esperanza","Reconquista"], a:1, tipo:"mc"},
      {q:"Esperanza, en Santa Fe, fue la primera colonia agrícola organizada en ___", opts:["1810","1856","1900","1950"], a:1, tipo:"mc"},
      {q:"El río Salado atraviesa el norte de la provincia de ___", opts:["Santa Fe","Buenos Aires","Mendoza","Chubut"], a:0, tipo:"mc"},
      {q:"La Laguna Setúbal está en ___", opts:["Rosario","Santa Fe ciudad","Rafaela","Cayastá"], a:1, tipo:"mc"},
      {q:"El Túnel Subfluvial conecta Santa Fe con ___", opts:["Entre Ríos (Paraná)","Córdoba","Buenos Aires","Chaco"], a:0, tipo:"mc"},
      {q:"En la provincia de Santa Fe se cultiva mucho ___", opts:["café","soja, trigo y maíz","cacao","banana"], a:1, tipo:"mc"},
    ],
    "Ciudadanía": [
      {q:"Los Derechos del Niño fueron reconocidos por la ONU en ___", opts:["1969","1989","2000","1948"], a:1, tipo:"mc"},
      {q:"La democracia significa 'gobierno del ___'", opts:["rey","pueblo","ejército","partido único"], a:1, tipo:"mc"},
      {q:"En una república, los gobernantes son elegidos por ___", opts:["el ejército","el pueblo mediante el voto","el partido del rey","los empresarios"], a:1, tipo:"mc"},
      {q:"La Constitución Nacional argentina se reformó por última vez en ___", opts:["1853","1949","1994","2000"], a:2, tipo:"mc"},
      {q:"Las leyes son creadas por el Poder ___", opts:["Ejecutivo","Legislativo","Judicial","Militar"], a:1, tipo:"mc"},
      {q:"La Cámara de Diputados representa ___", opts:["a los gobernadores","al pueblo","a las provincias","al presidente"], a:1, tipo:"mc"},
      {q:"El Senado representa ___", opts:["al pueblo","a las provincias (3 por cada una)","a los empresarios","al presidente"], a:1, tipo:"mc"},
      {q:"El presidente argentino dura ___ años en su cargo", opts:["2","4","6","8"], a:1, tipo:"mc"},
      {q:"Un derecho del niño es ___", opts:["trabajar a tiempo completo","la educación gratuita","pagar impuestos","conducir un auto"], a:1, tipo:"mc"},
      {q:"La ONU significa ___", opts:["Organización Nacional de Uruguay","Organización de Naciones Unidas","Oficina Nacional Única","Organismo de Negocios Universal"], a:1, tipo:"mc"},
    ],
  }
};

// ──────────────────────────────────────────────────────────────
//  BANCO_EXT_EXTRA — fragmentos detective + textos rotos extra
// ──────────────────────────────────────────────────────────────
const BANCO_EXT_EXTRA = {
  len: {
    "Literatura": [
      {
        tipo: "detective",
        texto: "Nos gustaba la casa porque aparte de espaciosa y antigua, guardaba los recuerdos de nuestros bisabuelos, el abuelo paterno, nuestros padres y toda la infancia. Nos habituamos Irene y yo a persistir solos en ella, lo que era una locura pues en esa casa podían vivir ocho personas sin estorbarse. Hacíamos la limpieza por la mañana, levantándonos a las siete, y a eso de las once yo le dejaba a Irene las últimas habitaciones por repasar y me iba a la cocina.",
        preguntas: [
          {q: "¿Qué relación tienen los protagonistas con la casa?", opts: ["La acaban de comprar","Es una casa familiar con muchos recuerdos","Es alquilada","Es de unos amigos"], a: 1},
          {q: "¿Cuántas personas viven en la casa?", opts: ["Ocho","Solo Irene y el narrador","Toda la familia","No se sabe"], a: 1},
          {q: "¿A qué autor pertenece este fragmento?", opts: ["Borges","Cortázar (Casa tomada)","Quiroga","Walsh"], a: 1}
        ]
      },
      {
        tipo: "detective",
        texto: "El hombre pisó algo blanduzco, y en seguida sintió la mordedura en el pie. Saltó adelante, y al volverse con un juramento vio una yararacusú que arrollada sobre sí misma esperaba otro ataque. El hombre echó una veloz ojeada a su pie, donde dos gotitas de sangre engrosaban dificultosamente, y sacó el machete de la cintura.",
        preguntas: [
          {q: "¿Qué le pasa al protagonista?", opts: ["Pierde un machete","Es mordido por una serpiente venenosa","Se cae al río","Se cae de un caballo"], a: 1},
          {q: "¿Cómo reacciona ante la mordedura?", opts: ["Se desmaya","Llora","Saca su machete","Pide ayuda"], a: 2},
          {q: "Este fragmento pertenece a 'A la deriva' de ___", opts: ["Cortázar","Horacio Quiroga","Borges","Roberto Arlt"], a: 1}
        ]
      },
      {
        tipo: "detective",
        texto: "Había empezado a leer la novela unos días antes. La abandonó por negocios urgentes, volvió a abrirla cuando regresaba en tren a la finca; se dejaba interesar lentamente por la trama, por el dibujo de los personajes. Esa tarde, después de escribir una carta a su apoderado y discutir con el mayordomo una cuestión de aparcerías, volvió al libro en la tranquilidad del estudio que miraba hacia el parque de los robles.",
        preguntas: [
          {q: "¿Qué hace el protagonista?", opts: ["Escribe una novela","Lee una novela","Va a un parque","Compra una casa"], a: 1},
          {q: "¿Dónde retoma la lectura?", opts: ["En el tren","En la cocina","En el estudio que mira al parque","En el dormitorio"], a: 2},
          {q: "Este es el inicio de 'Continuidad de los parques' de ___", opts: ["Quiroga","Borges","Cortázar","Walsh"], a: 2}
        ]
      },
      {
        tipo: "detective",
        texto: "Su luna de miel fue un largo escalofrío. Rubia, angelical y tímida, el carácter duro de su marido heló sus soñadas niñerías de novia. Lo quería mucho, sin embargo, a veces con un ligero estremecimiento cuando volviendo de noche juntos por la calle, echaba una furtiva mirada a la alta estatura de Jordán, mudo desde hacía una hora.",
        preguntas: [
          {q: "¿Cómo es la relación entre los recién casados?", opts: ["Llena de risas","Tensa: ella lo teme un poco","Aburrida pero tranquila","Siempre alegre"], a: 1},
          {q: "¿Cómo se llama el marido?", opts: ["Roberto","Jordán","Pablo","No se nombra"], a: 1},
          {q: "¿De qué cuento de Quiroga es este fragmento?", opts: ["A la deriva","El almohadón de plumas","Anaconda","La gallina degollada"], a: 1}
        ]
      },
      {
        tipo: "detective",
        texto: "Dicen que un Hipopótamo / tan glotón / se zampó dos elefantes / y un camión. / Después, dijo arrepentido: / ¡Qué he comido! / Si yo a un sándwich de queso / soy adicto.",
        preguntas: [
          {q: "Este texto es un ___", opts: ["soneto","limerick","cuento","ensayo"], a: 1},
          {q: "¿De qué libro de María Elena Walsh es?", opts: ["Manuelita","Zoo Loco","Dailan Kifki","Canciones para mirar"], a: 1},
          {q: "¿De qué se arrepiente el hipopótamo?", opts: ["De comer poco","De haberse comido elefantes y un camión","De pelearse con otro animal","De viajar"], a: 1}
        ]
      },
      {
        tipo: "detective",
        texto: "Tú me quieres blanca, / me quieres de espumas, / me quieres de nácar. / Que sea azucena / sobre todas, casta. / De perfume tenue. / Corola cerrada.",
        preguntas: [
          {q: "El poema critica el ___", opts: ["amor verdadero","modelo de mujer 'pura' que el hombre exige","el matrimonio","la naturaleza"], a: 1},
          {q: "¿Qué imagen usa para describir lo que él pide?", opts: ["volcán","azucena, espumas, nácar","tormenta","mar"], a: 1},
          {q: "Es un poema de ___", opts: ["Borges","Alfonsina Storni","Walsh","Pizarnik"], a: 1}
        ]
      },
      {
        tipo: "texto-roto",
        texto: "En la estructura del cuento, el [BLANK] presenta personajes y ambiente. El [BLANK] introduce el conflicto que rompe el equilibrio inicial. El [BLANK] resuelve ese conflicto. Para que un cuento funcione, esos tres momentos deben estar [BLANK].",
        blancos: ["inicio","nudo","desenlace","conectados"],
        opciones: ["inicio","nudo","desenlace","conectados","prólogo","clímax","epílogo","sueltos","relacionados","aislados"],
        q: "Completá la estructura narrativa"
      },
    ],
    "Comprensión Lectora": [
      {
        tipo: "detective",
        texto: "El acuerdo San Nicolás de los Arroyos (1852) sentó las bases para la organización nacional argentina. Se reunieron los gobernadores de las provincias para fijar las pautas de convocar un Congreso Constituyente. Buenos Aires se opuso a varios puntos, lo que generó tensiones que duraron casi una década más, hasta la unificación definitiva en 1862 con la presidencia de Mitre.",
        preguntas: [
          {q: "¿Para qué sirvió el acuerdo de San Nicolás?", opts: ["Declarar la independencia","Sentar bases para la organización nacional","Elegir un rey","Fundar Buenos Aires"], a: 1},
          {q: "¿Quién se opuso a varios puntos del acuerdo?", opts: ["Tucumán","Santa Fe","Buenos Aires","Córdoba"], a: 2},
          {q: "¿Cuándo se logró la unificación definitiva?", opts: ["1810","1853","1862","1900"], a: 2}
        ]
      },
      {
        tipo: "texto-roto",
        texto: "Cuando leemos un texto debemos identificar la idea [BLANK], los detalles que la [BLANK] y los conectores que muestran las [BLANK] entre las ideas. Releer es la mejor estrategia para no perder información [BLANK].",
        blancos: ["principal","apoyan","relaciones","clave"],
        opciones: ["principal","apoyan","relaciones","clave","secundaria","contradicen","contradicciones","irrelevante","central","explican","oposiciones","crucial"],
        q: "Completá sobre estrategias lectoras"
      }
    ],
    "Gramática": [
      {
        tipo: "texto-roto",
        texto: "El [BLANK] indica la persona, animal o cosa que realiza la acción. El [BLANK] expresa lo que se dice del sujeto. El núcleo del predicado es siempre un [BLANK] conjugado.",
        blancos: ["sujeto","predicado","verbo"],
        opciones: ["sujeto","predicado","verbo","objeto","complemento","sustantivo","adjetivo","adverbio"],
        q: "Completá sobre estructura oracional"
      },
      {
        tipo: "traducir",
        vaga: "Las palabras esas que dicen algo del nombre se llaman 'que dice cómo es'.",
        opciones: [
          "Los adjetivos calificativos modifican al sustantivo expresando una cualidad o característica.",
          "Las palabras que describen son las que ponen al lado.",
          "Lo que dice algo del nombre es la palabra que lo acompaña."
        ],
        a: 0,
        q: "¿Cuál es la formulación gramatical correcta?"
      }
    ]
  },
  soc: {
    "Geografía Mundial": [
      {
        tipo: "texto-roto",
        texto: "El planeta se divide en [BLANK] continentes en el modelo más usado en Argentina. Los océanos son cuerpos de agua que separan continentes; el más grande es el [BLANK]. La línea imaginaria que divide la Tierra en hemisferios norte y sur se llama [BLANK].",
        blancos: ["seis","Pacífico","Ecuador"],
        opciones: ["seis","Pacífico","Ecuador","cinco","Atlántico","Meridiano","siete","Índico","Trópico"],
        q: "Completá sobre geografía mundial"
      },
      {
        tipo: "detective",
        texto: "El Río Amazonas es el más caudaloso del mundo y atraviesa principalmente Brasil, aunque nace en los Andes peruanos. Su cuenca es la más grande del planeta y alberga la selva tropical más extensa: la Amazonia. Esta selva es esencial para regular el clima global y proteger la biodiversidad terrestre.",
        preguntas: [
          {q: "¿Dónde nace el Amazonas?", opts: ["En Brasil","En los Andes peruanos","En Colombia","En el Atlántico"], a: 1},
          {q: "¿Por qué la Amazonia es importante?", opts: ["Solo por su tamaño","Regula el clima global y protege biodiversidad","Por sus ciudades","Por su minería"], a: 1},
          {q: "¿Qué tipo de ecosistema predomina?", opts: ["desierto","selva tropical","tundra","sabana"], a: 1}
        ]
      },
      {
        tipo: "detective",
        texto: "La Antártida es el continente más frío y seco del planeta. Está cubierto en un 98% por hielo y casi no hay habitantes permanentes, salvo bases científicas de varios países. Argentina mantiene varias bases antárticas, entre ellas Esperanza y Marambio. Por el Tratado Antártico de 1959, ningún país puede reclamar soberanía sobre el continente.",
        preguntas: [
          {q: "¿Qué porcentaje de la Antártida está cubierto por hielo?", opts: ["50%","75%","98%","100%"], a: 2},
          {q: "¿Qué función tienen las bases antárticas?", opts: ["Turismo masivo","Investigación científica","Explotación minera","Vivienda permanente"], a: 1},
          {q: "¿Qué establece el Tratado Antártico de 1959?", opts: ["Que es propiedad de EEUU","Que ningún país puede reclamar soberanía","Que pueden vivir 1 millón de personas","Que se puede extraer petróleo libremente"], a: 1}
        ]
      }
    ],
    "Santa Fe Provincia": [
      {
        tipo: "detective",
        texto: "La ciudad de Santa Fe de la Vera Cruz fue fundada en 1573 por Juan de Garay sobre la barranca del río Quiloazas (hoy San Javier). Por inundaciones, en 1660 fue trasladada al sitio actual. Es capital de la provincia y sede de la histórica reforma constitucional de 1994. La ciudad está rodeada de lagunas y se conecta con Paraná (Entre Ríos) por el Túnel Subfluvial.",
        preguntas: [
          {q: "¿En qué año se fundó Santa Fe?", opts: ["1536","1573","1660","1810"], a: 1},
          {q: "¿Por qué se trasladó la ciudad en 1660?", opts: ["Por una guerra","Por inundaciones del río","Por orden del rey","Por terremotos"], a: 1},
          {q: "¿Qué evento histórico de 1994 ocurrió allí?", opts: ["Una batalla","La reforma constitucional","La fundación de Rosario","Un congreso económico"], a: 1}
        ]
      },
      {
        tipo: "texto-roto",
        texto: "La provincia de Santa Fe limita al norte con [BLANK], al este con [BLANK] (separadas por el río Paraná), al sur con [BLANK] y al oeste con [BLANK].",
        blancos: ["Chaco","Entre Ríos","Buenos Aires","Córdoba y Santiago del Estero"],
        opciones: ["Chaco","Entre Ríos","Buenos Aires","Córdoba y Santiago del Estero","Misiones","Mendoza","La Pampa","Tucumán"],
        q: "Completá sobre los límites de Santa Fe"
      }
    ],
    "Historia Argentina": [
      {
        tipo: "detective",
        texto: "La inmigración masiva de europeos hacia Argentina entre 1880 y 1930 transformó profundamente el país. Llegaron principalmente italianos y españoles, pero también franceses, alemanes, polacos, sirio-libaneses y judíos. Se establecieron sobre todo en Buenos Aires, Santa Fe, Córdoba y Entre Ríos. Su llegada modificó la cultura, el idioma (con el lunfardo), la gastronomía y la economía argentina.",
        preguntas: [
          {q: "¿Cuál fue la nacionalidad mayoritaria de los inmigrantes?", opts: ["alemanes","italianos y españoles","ingleses","chinos"], a: 1},
          {q: "¿Qué impacto cultural mencionan?", opts: ["Música únicamente","Cultura, idioma, gastronomía y economía","Solo cocina","Solo arquitectura"], a: 1},
          {q: "¿En qué provincias se establecieron principalmente?", opts: ["Patagonia","Buenos Aires, Santa Fe, Córdoba, Entre Ríos","Salta y Jujuy","Solo Buenos Aires"], a: 1}
        ]
      }
    ]
  },
  nat: {
    "Cuerpo Humano": [
      {
        tipo: "texto-roto",
        texto: "El sistema [BLANK] transporta oxígeno y nutrientes a todas las células mediante la sangre. Su órgano central es el [BLANK]. Los [BLANK] llevan sangre del corazón al cuerpo, y las [BLANK] traen la sangre de regreso al corazón.",
        blancos: ["circulatorio","corazón","arterias","venas"],
        opciones: ["circulatorio","corazón","arterias","venas","digestivo","pulmón","capilares","huesos","respiratorio"],
        q: "Completá sobre el sistema circulatorio"
      },
      {
        tipo: "detective",
        texto: "El sistema digestivo procesa los alimentos para extraer los nutrientes necesarios. Comienza en la boca, donde la saliva inicia la digestión. Sigue por el esófago hasta el estómago, donde los jugos gástricos descomponen la comida. Luego pasa al intestino delgado, donde se absorben los nutrientes, y finalmente al intestino grueso, donde se forma el residuo que será eliminado.",
        preguntas: [
          {q: "¿Dónde empieza la digestión?", opts: ["En el estómago","En la boca","En el intestino","En el hígado"], a: 1},
          {q: "¿Cuál es la función principal del intestino delgado?", opts: ["Digerir grasas","Absorber los nutrientes","Eliminar residuos","Producir sangre"], a: 1},
          {q: "¿Qué sustancia descompone la comida en el estómago?", opts: ["Saliva","Jugos gástricos","Sangre","Aire"], a: 1}
        ]
      }
    ],
    "Energía y Fuerzas": [
      {
        tipo: "detective",
        texto: "Las energías renovables son aquellas cuyo uso no agota la fuente original: el sol, el viento, el agua, la biomasa y la geotermia. En cambio, las energías no renovables (petróleo, carbón, gas natural) se agotan con el uso y generan contaminación. Argentina tiene un gran potencial en energía solar (NOA), eólica (Patagonia) e hidroeléctrica (presas de Yacyretá y Salto Grande).",
        preguntas: [
          {q: "¿Qué caracteriza a una energía renovable?", opts: ["Es muy cara","Su fuente no se agota con el uso","Solo se usa en Argentina","Es contaminante"], a: 1},
          {q: "¿En qué región argentina hay más potencial eólico?", opts: ["NOA","Pampa","Patagonia","Cuyo"], a: 2},
          {q: "¿Qué tipo de energía es Yacyretá?", opts: ["solar","eólica","hidroeléctrica","nuclear"], a: 2}
        ]
      }
    ]
  },
  mat: {
    "Geometría": [
      {
        tipo: "texto-roto",
        texto: "Un polígono regular tiene todos sus lados [BLANK] y todos sus ángulos [BLANK]. El cuadrado, por ejemplo, es un polígono regular con [BLANK] lados iguales y [BLANK] ángulos rectos.",
        blancos: ["iguales","iguales","cuatro","cuatro"],
        opciones: ["iguales","iguales","cuatro","cuatro","distintos","tres","cinco","oblicuos","desiguales"],
        q: "Completá sobre polígonos regulares"
      }
    ],
    "Estadística": [
      {
        tipo: "detective",
        texto: "En estadística, la media (promedio) se calcula sumando todos los valores y dividiendo por la cantidad. La mediana es el valor central cuando los datos están ordenados. La moda es el valor que más se repite. Cada una nos da información distinta sobre los datos: la media puede verse afectada por valores extremos, la mediana no.",
        preguntas: [
          {q: "¿Qué es la mediana?", opts: ["El promedio","El valor central de los datos ordenados","El más repetido","El más alto"], a: 1},
          {q: "¿Cuál NO se ve afectada por valores extremos?", opts: ["la media","la mediana","ambas","ninguna"], a: 1},
          {q: "¿Qué es la moda?", opts: ["El promedio","El valor central","El valor que más se repite","El valor más alto"], a: 2}
        ]
      }
    ]
  }
};

// ──────────────────────────────────────────────────────────────
//  LECCIONES_EXTRA — nuevas lecciones por materia/tema
// ──────────────────────────────────────────────────────────────
const LECCIONES_EXTRA = {
  soc: {
    "Geografía Mundial": {
      titulo: "Continentes, Océanos y Países",
      objetivo: "Conocer la organización política y física del planeta.",
      secciones: [
        {
          titulo: "Los seis continentes",
          texto: "El planeta Tierra se divide tradicionalmente en seis continentes: África, América, Antártida, Asia, Europa y Oceanía. Asia es el más grande y poblado; Oceanía y Antártida son los más pequeños. Cada continente tiene su propia geografía, climas y diversidad cultural.",
          analogia: "Como las regiones de un país enorme: cada una con su personalidad, paisajes y costumbres.",
          clave: "6 continentes · cada uno único",
          check: { q: "¿Cuál es el continente más grande?", opts:["América","Asia","África","Europa"], a: 1 }
        },
        {
          titulo: "Los océanos",
          texto: "Cinco grandes océanos cubren el 71% del planeta: Pacífico (el más grande), Atlántico, Índico, Antártico (Glacial Antártico) y Ártico (Glacial Ártico). Los océanos regulan el clima, dan oxígeno y son hogar de millones de especies.",
          analogia: "Como un sistema circulatorio del planeta: las corrientes oceánicas son las venas que distribuyen calor y vida.",
          clave: "Pacífico > Atlántico > Índico > Antártico > Ártico",
          check: { q: "¿Cuál océano es el más grande?", opts:["Atlántico","Índico","Pacífico","Ártico"], a: 2 }
        },
        {
          titulo: "Líneas imaginarias",
          texto: "El Ecuador divide la Tierra en hemisferios Norte y Sur. El Meridiano de Greenwich (0°) la divide en Este y Oeste. Los Trópicos de Cáncer (Norte) y Capricornio (Sur) marcan los límites de la zona cálida tropical. Los Círculos Polares Ártico y Antártico marcan el inicio de las zonas polares.",
          analogia: "Como una grilla imaginaria sobre una pelota: te permite ubicar cualquier punto con coordenadas (latitud, longitud).",
          clave: "Ecuador · Greenwich · Trópicos · Polares",
          check: { q: "¿Qué divide al mundo en Este y Oeste?", opts:["Ecuador","Trópico de Cáncer","Meridiano de Greenwich","Polar Ártico"], a: 2 }
        },
        {
          titulo: "Países y capitales",
          texto: "En el mundo hay alrededor de 195 países reconocidos. Argentina limita con 5 países: Chile, Bolivia, Paraguay, Brasil y Uruguay. Las capitales de nuestros vecinos son: Santiago (Chile), La Paz/Sucre (Bolivia), Asunción (Paraguay), Brasilia (Brasil) y Montevideo (Uruguay).",
          analogia: "Como una gran familia: cada país es un primo con su propia casa (capital), idioma y costumbres.",
          clave: "Vecinos: Chile · Bolivia · Paraguay · Brasil · Uruguay",
          check: { q: "¿Cuál es la capital de Brasil?", opts:["Río de Janeiro","São Paulo","Brasilia","Salvador"], a: 2 }
        }
      ],
      cierre: "Conocer la geografía mundial te permite ubicarte en el planeta y entender cómo se conectan todos los pueblos."
    },
    "Santa Fe Provincia": {
      titulo: "La Provincia de Santa Fe",
      objetivo: "Conocer la geografía, historia y economía de Santa Fe.",
      secciones: [
        {
          titulo: "Ubicación y límites",
          texto: "La provincia de Santa Fe está en la región centro-este de Argentina, en la llanura pampeana. Limita al norte con Chaco, al este con Corrientes y Entre Ríos (separada por el río Paraná), al sur con Buenos Aires y al oeste con Córdoba y Santiago del Estero. Tiene una extensión de unos 133.000 km² y se divide en 19 departamentos.",
          analogia: "Imaginala como un libro alargado, con el río Paraná pegado a la tapa derecha.",
          clave: "Centro-este de Argentina · 19 departamentos",
          check: { q: "¿Con qué provincia limita Santa Fe al este (separadas por el río Paraná)?", opts:["Córdoba","Buenos Aires","Entre Ríos","Chaco"], a: 2 }
        },
        {
          titulo: "Las dos grandes ciudades",
          texto: "Santa Fe de la Vera Cruz, capital de la provincia, fue fundada por Juan de Garay en 1573. Allí se reformó la Constitución Nacional en 1994. Rosario, la ciudad más poblada, es famosa porque allí Manuel Belgrano izó por primera vez la Bandera argentina en 1812. El Monumento Nacional a la Bandera se encuentra en Rosario.",
          analogia: "Santa Fe es la 'capital política' (gobierno) y Rosario la 'capital económica' (puerto, comercio).",
          clave: "Santa Fe (capital) · Rosario (más poblada)",
          check: { q: "¿Dónde izó Belgrano la bandera por primera vez?", opts:["Santa Fe ciudad","Rosario","Esperanza","Rafaela"], a: 1 }
        },
        {
          titulo: "Economía santafesina",
          texto: "Santa Fe es una de las provincias más productivas del país. La actividad principal es el agro: soja, trigo, maíz, girasol y ganadería. Tiene una potente industria aceitera y exporta por el puerto de Rosario, uno de los más grandes de Argentina. También se destacan la lechería en el centro-oeste y los pueblos colonos como Esperanza (1856), la primera colonia agrícola organizada del país.",
          analogia: "Como un gran granero argentino: lo que se cosecha en Santa Fe alimenta al país y al mundo.",
          clave: "Agro + Industria aceitera + Puerto Rosario",
          check: { q: "¿Cuál es la actividad económica principal de Santa Fe?", opts:["minería","el agro (soja, trigo, maíz)","pesca marítima","turismo invernal"], a: 1 }
        },
        {
          titulo: "Ríos y paisajes",
          texto: "El río Paraná es la columna vertebral de la provincia: bordea todo su límite oriental y forma un sistema de islas, esteros y lagunas (como la Setúbal frente a Santa Fe ciudad). En el norte corre el río Salado. La provincia es plana, con llanura pampeana al sur y monte chaqueño al norte. El Túnel Subfluvial conecta Santa Fe con Paraná (Entre Ríos) por debajo del Paraná.",
          analogia: "El Paraná es como una autopista de agua que llevaba todo en lancha antes de los caminos.",
          clave: "Paraná · Salado · Túnel Subfluvial",
          check: { q: "¿Qué obra conecta Santa Fe con Paraná (Entre Ríos)?", opts:["Un puente","El Túnel Subfluvial","Una balsa","Una autopista"], a: 1 }
        }
      ],
      cierre: "Santa Fe combina historia (cuna de la bandera y la Constitución), agro potente y un río legendario: el Paraná."
    }
  },
  len: {
    "Literatura Argentina": {
      titulo: "Grandes Escritores Argentinos",
      objetivo: "Conocer obras y autores fundamentales de la literatura argentina del siglo XX.",
      secciones: [
        {
          titulo: "Julio Cortázar y lo fantástico",
          texto: "Julio Cortázar (1914-1984) escribió cuentos donde lo cotidiano se quiebra con lo fantástico. En 'Casa tomada' dos hermanos pierden la casa familiar ante una presencia que no se nombra. En 'Continuidad de los parques' un lector descubre que él mismo es la víctima del cuento que está leyendo. Cortázar mezcla lo real con lo extraño para hacernos pensar.",
          analogia: "Como una foto normal donde, si la mirás bien, hay algo que está mal: pero ese 'algo' nunca se aclara del todo.",
          clave: "Lo fantástico irrumpe en lo cotidiano",
          check: { q: "¿Qué cuento de Cortázar trata sobre dos hermanos que pierden su casa?", opts:["A la deriva","Continuidad de los parques","Casa tomada","El sur"], a: 2 }
        },
        {
          titulo: "Horacio Quiroga y la naturaleza salvaje",
          texto: "Horacio Quiroga (1878-1937) ambientó muchos cuentos en la selva de Misiones. Sus 'Decálogo del perfecto cuentista' marcó a generaciones. En 'A la deriva', un hombre mordido por una yararacusú lucha por sobrevivir río abajo. En 'El almohadón de plumas', una joven enferma misteriosamente: la causa está dentro del almohadón. Su mundo es violento y la naturaleza, despiadada.",
          analogia: "Como una película de supervivencia: el peligro siempre está cerca y la naturaleza no perdona.",
          clave: "Selva · supervivencia · final inesperado",
          check: { q: "En 'A la deriva', el protagonista es atacado por...", opts:["un jaguar","una serpiente venenosa","un río crecido","un hombre"], a: 1 }
        },
        {
          titulo: "Jorge Luis Borges y los laberintos",
          texto: "Borges (1899-1986) escribió cuentos breves y filosóficos sobre el tiempo, el infinito, los laberintos, los libros y la identidad. En 'El Aleph' se ve un punto que contiene todos los puntos del universo. En 'Funes el memorioso' un joven recuerda absolutamente todo, y eso lo enloquece. Borges juega con la idea de que la realidad puede ser un sueño o un laberinto.",
          analogia: "Como mirar un espejo frente a otro: ves infinitas copias y nunca llegás al final.",
          clave: "Tiempo · infinito · laberintos",
          check: { q: "Borges escribía sobretodo...", opts:["novelas largas","cuentos breves y filosóficos","obras de teatro","poemas épicos"], a: 1 }
        },
        {
          titulo: "Alfonsina Storni y la voz femenina",
          texto: "Alfonsina Storni (1892-1938) fue una poeta que cuestionó el lugar asignado a las mujeres. En 'Tú me quieres blanca' rechaza el ideal de mujer pura que el hombre exige; en 'Hombre pequeñito' pide la libertad de salir de la jaula. Su poesía es directa, valiente y sigue muy actual.",
          analogia: "Como una carta abierta: dice las cosas con honestidad y desafía al lector.",
          clave: "Voz feminista · valentía · libertad",
          check: { q: "¿Qué critica el poema 'Tú me quieres blanca'?", opts:["el matrimonio en general","el modelo de mujer 'pura' que el hombre exige","la lluvia","los hijos"], a: 1 }
        },
        {
          titulo: "María Elena Walsh y la poesía para todos",
          texto: "María Elena Walsh (1930-2011) escribió poesía, canciones y novelas para chicos (y grandes). 'Zoo Loco' es un libro de 40 limericks (poemas humorísticos de 5 versos) sobre animales disparatados. 'Manuelita' la tortuga, 'Dailan Kifki' el elefante: sus personajes están en la memoria de varias generaciones. También escribió canciones y obras políticas.",
          analogia: "Como un baúl mágico: cada vez que lo abrís encontrás una rima nueva, una canción o un personaje absurdo.",
          clave: "Limericks · canciones · imaginación",
          check: { q: "'Zoo Loco' es un libro de...", opts:["cuentos largos","novelas","limericks","ensayos"], a: 2 }
        }
      ],
      cierre: "La literatura argentina te ofrece desde laberintos filosóficos (Borges) hasta animales que comen camiones (Walsh): hay algo para cada lector."
    }
  },
  mat: {
    "Geometría": {
      titulo: "Figuras y Cuerpos",
      objetivo: "Reconocer figuras planas y cuerpos geométricos.",
      secciones: [
        {
          titulo: "Polígonos",
          texto: "Un polígono es una figura plana cerrada formada por segmentos. Según la cantidad de lados se llaman: triángulo (3), cuadrilátero (4), pentágono (5), hexágono (6), heptágono (7), octógono (8). Si tiene todos los lados y ángulos iguales, es regular.",
          analogia: "Como dibujar formas conectando puntos: cada nuevo punto agrega un lado.",
          clave: "Lados → nombre · iguales = regular",
          check: { q: "¿Cómo se llama un polígono de 6 lados?", opts:["pentágono","hexágono","heptágono","octógono"], a: 1 }
        },
        {
          titulo: "Triángulos",
          texto: "Los triángulos se clasifican por sus lados (equilátero: 3 iguales; isósceles: 2 iguales; escaleno: todos distintos) y por sus ángulos (acutángulo: todos < 90°; rectángulo: uno de 90°; obtusángulo: uno > 90°). La suma de los ángulos siempre da 180°.",
          analogia: "Como un trípode: tres puntos siempre forman una superficie estable.",
          clave: "Por lados y por ángulos · suma = 180°",
          check: { q: "¿Cuánto suman los ángulos de cualquier triángulo?", opts:["90°","180°","270°","360°"], a: 1 }
        },
        {
          titulo: "Cuerpos geométricos",
          texto: "Los cuerpos tienen tres dimensiones (largo, ancho, alto). Los poliedros tienen caras planas (cubo, prisma, pirámide). Los redondos tienen al menos una cara curva (cilindro, cono, esfera). Cada cuerpo tiene caras, aristas y vértices.",
          analogia: "Una caja de zapatos es un prisma; una pelota es una esfera; un cono de helado es un cono.",
          clave: "Caras · Aristas · Vértices",
          check: { q: "Una pelota es un...", opts:["prisma","cubo","esfera","cono"], a: 2 }
        },
        {
          titulo: "Área y perímetro",
          texto: "El perímetro es la suma de las longitudes del contorno. El área es la medida de la superficie. Algunas fórmulas: cuadrado: P=4·L, A=L²; rectángulo: P=2(b+h), A=b·h; triángulo: A=(b·h)/2; círculo: P=2·π·r, A=π·r².",
          analogia: "Perímetro: como caminar alrededor del jardín. Área: como pintar todo el pasto del jardín.",
          clave: "Perímetro = contorno · Área = superficie",
          check: { q: "Área del rectángulo = ___", opts:["base + altura","base × altura","2 × (base + altura)","base × altura / 2"], a: 1 }
        }
      ],
      cierre: "Conocer figuras y cuerpos te ayuda a entender el espacio que te rodea: desde una hoja hasta un edificio."
    }
  },
  nat: {
    "Cuerpo Humano": {
      titulo: "Sistemas del Cuerpo",
      objetivo: "Comprender cómo funcionan los principales sistemas que mantienen vivo el cuerpo.",
      secciones: [
        {
          titulo: "Sistema circulatorio",
          texto: "El corazón bombea sangre por todo el cuerpo. Las arterias llevan sangre rica en oxígeno desde el corazón a los órganos; las venas la devuelven con CO₂. Los capilares son los vasos más pequeños: en ellos se intercambian oxígeno y nutrientes con cada célula.",
          analogia: "Como el sistema de cañerías de una ciudad: el corazón es la bomba, las arterias autopistas, las venas las calles de regreso.",
          clave: "Corazón → arterias → capilares → venas",
          check: { q: "¿Qué llevan las arterias?", opts:["sangre con CO₂","sangre con oxígeno","aire","comida"], a: 1 }
        },
        {
          titulo: "Sistema respiratorio",
          texto: "Los pulmones toman oxígeno del aire y eliminan dióxido de carbono. El aire entra por la nariz/boca, baja por la tráquea y se distribuye en los bronquios y alvéolos pulmonares. Allí ocurre el intercambio gaseoso con la sangre.",
          analogia: "Como un fuelle: los pulmones se inflan al inspirar y se desinflan al espirar.",
          clave: "Nariz → tráquea → bronquios → alvéolos",
          check: { q: "¿Dónde ocurre el intercambio gaseoso?", opts:["en la nariz","en la tráquea","en los alvéolos","en el corazón"], a: 2 }
        },
        {
          titulo: "Sistema digestivo",
          texto: "Procesa los alimentos. Boca (saliva) → esófago → estómago (jugos gástricos) → intestino delgado (absorción) → intestino grueso (residuos). El hígado y el páncreas ayudan produciendo sustancias para digerir grasas y azúcares.",
          analogia: "Como una fábrica: la materia prima (comida) entra, se procesa y sale lo aprovechable (nutrientes) y lo desechable (residuos).",
          clave: "Boca → estómago → intestinos",
          check: { q: "¿Dónde se absorben los nutrientes?", opts:["en la boca","en el estómago","en el intestino delgado","en el grueso"], a: 2 }
        },
        {
          titulo: "Sistema nervioso",
          texto: "Es el centro de control. El cerebro y la médula espinal forman el sistema nervioso central. Los nervios llevan señales eléctricas a todo el cuerpo. Permite pensar, sentir, mover y reaccionar al ambiente.",
          analogia: "Como Internet del cuerpo: cada nervio es un cable que conecta cerebro y órganos en milisegundos.",
          clave: "Cerebro · Médula · Nervios",
          check: { q: "¿Qué forma el sistema nervioso central?", opts:["solo el cerebro","cerebro y médula espinal","corazón y pulmones","todos los nervios del brazo"], a: 1 }
        },
        {
          titulo: "Cuidar el cuerpo",
          texto: "La alimentación variada, el ejercicio diario, dormir 8-10 horas y la higiene son las cuatro claves para que todos los sistemas funcionen bien. Las vacunas protegen del sistema inmune contra enfermedades. Evitar tabaco, alcohol y drogas es esencial en la adolescencia.",
          analogia: "Tu cuerpo es como un auto: si lo cuidás (combustible bueno, mantenimiento, descanso) dura toda la vida.",
          clave: "Comida · Ejercicio · Descanso · Higiene",
          check: { q: "¿Cuántas horas se recomienda dormir a tu edad?", opts:["4-5","6-7","8-10","12-15"], a: 2 }
        }
      ],
      cierre: "Tu cuerpo es una máquina increíble. Conocerlo es el primer paso para cuidarlo."
    }
  }
};
