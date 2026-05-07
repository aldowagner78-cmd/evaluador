// ═══════════════════════════════════════════════════════════════
//  MAPAS Y EJERCICIOS GEOGRÁFICOS INTERACTIVOS
// ═══════════════════════════════════════════════════════════════
const MAPAS = {
  argentina_provincias: {
    titulo: "Provincias de Argentina",
    img: "contenido/ciencias_sociales/mapas/Mapa_provincial_de_Argentina_(sin_etiquetas).png",
    descripcion: "Mapa político de Argentina con sus 23 provincias + CABA",
    preguntas: [
      "¿Cuántas provincias tiene Argentina además de CABA?",
      "Nombrá las 5 provincias de la Patagonia",
      "Nombrá las provincias del NOA",
      "¿Qué provincias forman Cuyo?"
    ]
  },
  argentina_regiones: {
    titulo: "Regiones de Argentina",
    img: "contenido/ciencias_sociales/mapas/Argentina_regions_map.png",
    descripcion: "Las 6 regiones geográficas argentinas",
    preguntas: [
      "Identificá la región pampeana",
      "¿Qué provincias están en el NEA?",
      "¿Qué clima predomina en la Patagonia?",
      "¿Cuál es la región más urbanizada?"
    ]
  },
  argentina_blank: {
    titulo: "Mapa Mudo de Argentina",
    img: "contenido/ciencias_sociales/mapas/Argentina_Blank_Map.svg",
    descripcion: "Mapa en blanco para identificar provincias",
    preguntas: [
      "¿Dónde queda Santa Fe?",
      "¿Dónde queda Tierra del Fuego?",
      "¿Cuáles son las provincias mediterráneas?",
      "¿Cuál es la provincia más al norte?"
    ]
  },
  planisferio: {
    titulo: "Planisferio Mundial",
    img: "contenido/ciencias_sociales/mapas/Planisferio_blank.svg",
    descripcion: "Mapa mudo del mundo",
    preguntas: [
      "Localizá los 6 continentes",
      "¿Dónde está el Ecuador?",
      "¿Dónde está el Trópico de Capricornio?",
      "Localizá los océanos Pacífico y Atlántico"
    ]
  },
  planisferio_paises: {
    titulo: "Países del Mundo",
    img: "contenido/ciencias_sociales/mapas/Planisferio_paises.svg",
    descripcion: "Mapa mundial con países",
    preguntas: [
      "Localizá Argentina en Sudamérica",
      "¿Cuáles son los 5 países más grandes del mundo?",
      "Encontrá Australia",
      "¿Qué países comparten frontera con Argentina?"
    ]
  },
  africa: {
    titulo: "Continente Africano",
    img: "contenido/ciencias_sociales/mapas/Africa_blank.svg",
    descripcion: "África: el segundo continente más grande",
    preguntas: [
      "¿Dónde está Egipto?",
      "Localizá el desierto del Sahara",
      "¿Dónde está Sudáfrica?",
      "¿Qué océanos rodean a África?"
    ]
  },
  america: {
    titulo: "Continente Americano",
    img: "contenido/ciencias_sociales/mapas/America_blank.svg",
    descripcion: "América: desde Alaska hasta Tierra del Fuego",
    preguntas: [
      "¿Cuántas Américas se distinguen geográficamente?",
      "Diferencia entre América Anglosajona y Latina",
      "¿Dónde está el istmo de Panamá?",
      "¿Qué países componen Centroamérica?"
    ]
  },
  europa: {
    titulo: "Continente Europeo",
    img: "contenido/ciencias_sociales/mapas/Europa_blank.svg",
    descripcion: "Europa: el segundo continente más pequeño",
    preguntas: [
      "¿Dónde está España?",
      "¿Cuál es la cordillera que separa Europa de Asia?",
      "¿Qué países forman la península ibérica?",
      "Localizá el Mediterráneo"
    ]
  },
  asia: {
    titulo: "Continente Asiático",
    img: "contenido/ciencias_sociales/mapas/Asia_blank.png",
    descripcion: "Asia: el continente más grande y poblado",
    preguntas: [
      "¿Cuáles son los países más poblados de Asia?",
      "¿Dónde está el Himalaya?",
      "¿Qué océano baña la costa este de Asia?",
      "Localizá Japón y China"
    ]
  },
  oceania: {
    titulo: "Continente de Oceanía",
    img: "contenido/ciencias_sociales/mapas/Oceania_blank.svg",
    descripcion: "Oceanía: el continente más pequeño",
    preguntas: [
      "¿Cuál es el país más grande de Oceanía?",
      "¿Dónde está Nueva Zelanda?",
      "¿Qué océano rodea Oceanía?",
      "Diferencia entre Polinesia, Melanesia y Micronesia"
    ]
  },
  santafe_provincia: {
    titulo: "Provincia de Santa Fe",
    img: "contenido/ciencias_sociales/mapas/SantaFe_provincia.svg",
    descripcion: "Santa Fe: provincia del centro-este argentino",
    preguntas: [
      "¿Cuál es la capital de Santa Fe?",
      "¿Qué provincias limitan con Santa Fe?",
      "¿Qué río pasa por la costa este?",
      "¿Cuál es la ciudad más poblada?"
    ]
  },
  santafe_departamentos: {
    titulo: "Departamentos de Santa Fe",
    img: "contenido/ciencias_sociales/mapas/SantaFe_departamentos.png",
    descripcion: "Los 19 departamentos de la provincia de Santa Fe",
    preguntas: [
      "¿En qué departamento está la ciudad de Santa Fe?",
      "¿En qué departamento está Rosario?",
      "¿Cuál es el departamento más al norte?",
      "Identificá el departamento Castellanos"
    ]
  },
  santafe_topografico: {
    titulo: "Santa Fe Topográfico",
    img: "contenido/ciencias_sociales/mapas/SantaFe_topografico.png",
    descripcion: "Relieve y ríos de Santa Fe",
    preguntas: [
      "¿Qué relieve predomina en Santa Fe?",
      "¿Cuáles son los ríos principales?",
      "¿Qué es la cuña boscosa?",
      "¿Dónde están las lagunas más importantes?"
    ]
  }
};

// Preguntas tipo cuestionario sobre mapas (sin imagen interactiva,
// pero referenciando el mapa para que el alumno lo consulte)
const PREGUNTAS_MAPAS = [
  {
    mapa: "argentina_provincias",
    q: "¿Cuál es la provincia ubicada en el extremo sur del territorio argentino continental?",
    opts: ["Tierra del Fuego (es insular)","Santa Cruz","Chubut","La Pampa"],
    a: 1, tipo: "mc"
  },
  {
    mapa: "argentina_provincias",
    q: "¿Qué provincia tiene forma alargada y limita con Bolivia, Paraguay y Brasil?",
    opts: ["Salta","Chaco","Formosa","Misiones"],
    a: 2, tipo: "mc"
  },
  {
    mapa: "argentina_provincias",
    q: "Misiones tiene forma de... ",
    opts: ["estrella","triángulo","'dedo' que entra entre Brasil y Paraguay","cuadrado"],
    a: 2, tipo: "mc"
  },
  {
    mapa: "argentina_provincias",
    q: "Santa Fe está al ___ de Córdoba",
    opts: ["norte","sur","este","oeste"],
    a: 2, tipo: "mc"
  },
  {
    mapa: "planisferio",
    q: "Si vas hacia el oeste desde Argentina cruzando el océano, llegás a ___",
    opts: ["África","Oceanía","Asia","Europa"],
    a: 1, tipo: "mc"
  },
  {
    mapa: "planisferio",
    q: "Argentina está en el hemisferio ___",
    opts: ["norte","sur","este","oeste"],
    a: 1, tipo: "mc"
  },
  {
    mapa: "planisferio_paises",
    q: "El país más grande del mundo en superficie es ___",
    opts: ["China","Estados Unidos","Rusia","Canadá"],
    a: 2, tipo: "mc"
  },
  {
    mapa: "africa",
    q: "El río Nilo atraviesa principalmente ___",
    opts: ["Sudáfrica","Egipto y Sudán","Marruecos","Nigeria"],
    a: 1, tipo: "mc"
  },
  {
    mapa: "argentina_regiones",
    q: "La región más densamente poblada de Argentina es ___",
    opts: ["Patagonia","NOA","Pampeana","Cuyo"],
    a: 2, tipo: "mc"
  },
  {
    mapa: "argentina_regiones",
    q: "El clima cálido y húmedo es propio de ___",
    opts: ["Patagonia","NEA (Mesopotamia y Chaco)","Cuyo","Andes"],
    a: 1, tipo: "mc"
  },
  // ── AMÉRICA ──
  { mapa: "america", q: "El canal artificial que une el Pacífico y el Atlántico está en ___",
    opts: ["México","Panamá","Colombia","Costa Rica"], a: 1, tipo: "mc" },
  { mapa: "america", q: "El país más grande de América en superficie es ___",
    opts: ["EE.UU.","Brasil","Canadá","Argentina"], a: 2, tipo: "mc" },
  { mapa: "america", q: "Centroamérica y el Caribe pertenecen a América ___",
    opts: ["Anglosajona","Latina","Andina","del Sur"], a: 1, tipo: "mc" },
  // ── EUROPA ──
  { mapa: "europa", q: "Los Urales separan Europa de ___",
    opts: ["África","Asia","América","Oceanía"], a: 1, tipo: "mc" },
  { mapa: "europa", q: "España y Portugal forman la península ___",
    opts: ["Itálica","Ibérica","Balcánica","Escandinava"], a: 1, tipo: "mc" },
  { mapa: "europa", q: "Italia tiene forma de ___",
    opts: ["estrella","bota","triángulo","círculo"], a: 1, tipo: "mc" },
  // ── ASIA ──
  { mapa: "asia", q: "El país más poblado de Asia es ___",
    opts: ["Japón","India","China","Indonesia"], a: 2, tipo: "mc" },
  { mapa: "asia", q: "El Monte Everest está en la cordillera del ___",
    opts: ["Atlas","Andes","Himalaya","Cáucaso"], a: 2, tipo: "mc" },
  { mapa: "asia", q: "Japón es un país ___",
    opts: ["continental","insular (archipiélago)","sin salida al mar","desértico"], a: 1, tipo: "mc" },
  // ── OCEANÍA ──
  { mapa: "oceania", q: "El país más grande de Oceanía es ___",
    opts: ["Nueva Zelanda","Australia","Fiji","Papúa Nueva Guinea"], a: 1, tipo: "mc" },
  { mapa: "oceania", q: "Oceanía está rodeada principalmente por el océano ___",
    opts: ["Atlántico","Índico","Pacífico","Ártico"], a: 2, tipo: "mc" },
  // ── SANTA FE ──
  { mapa: "santafe_provincia", q: "La capital de la provincia de Santa Fe es ___",
    opts: ["Rosario","Santa Fe","Rafaela","Venado Tuerto"], a: 1, tipo: "mc" },
  { mapa: "santafe_provincia", q: "El río que limita Santa Fe al este es el ___",
    opts: ["Paraná","Uruguay","Salado","Carcarañá"], a: 0, tipo: "mc" },
  { mapa: "santafe_provincia", q: "La ciudad más poblada de Santa Fe es ___",
    opts: ["Santa Fe","Rosario","Rafaela","Reconquista"], a: 1, tipo: "mc" },
  { mapa: "santafe_departamentos", q: "Rosario está en el departamento ___",
    opts: ["Rosario","La Capital","Caseros","San Lorenzo"], a: 0, tipo: "mc" },
  { mapa: "santafe_departamentos", q: "La ciudad de Santa Fe está en el departamento ___",
    opts: ["Las Colonias","La Capital","Garay","San Justo"], a: 1, tipo: "mc" },
  { mapa: "santafe_topografico", q: "El relieve predominante de Santa Fe es ___",
    opts: ["montañoso","llano (llanura pampeana y chaqueña)","mesetario","selvático"], a: 1, tipo: "mc" }
];

// Actividades drag-and-drop sobre el mapa (etiquetas tipo rompecabezas)
// x/y están en porcentaje del contenedor del mapa.
const MAPA_DND = {
  argentina_provincias: {
    titulo: "Ubicá provincias clave en el mapa",
    piezas: [
      { label: "Jujuy", x: 36, y: 18 },
      { label: "Mendoza", x: 34, y: 47 },
      { label: "Buenos Aires", x: 57, y: 63 },
      { label: "Santa Fe", x: 54, y: 53 },
      { label: "Chubut", x: 42, y: 75 },
      { label: "Tierra del Fuego", x: 48, y: 92 }
    ]
  },
  planisferio_paises: {
    titulo: "Arrastrá países al lugar correcto",
    piezas: [
      { label: "Canadá", x: 23, y: 24 },
      { label: "Estados Unidos", x: 24, y: 33 },
      { label: "Brasil", x: 35, y: 58 },
      { label: "Argentina", x: 33, y: 76 },
      { label: "España", x: 49, y: 35 },
      { label: "China", x: 72, y: 42 },
      { label: "Australia", x: 80, y: 75 }
    ]
  },
  america: {
    titulo: "Identificá zonas de América",
    piezas: [
      { label: "Alaska", x: 18, y: 18 },
      { label: "México", x: 28, y: 39 },
      { label: "Caribe", x: 37, y: 45 },
      { label: "Brasil", x: 43, y: 60 },
      { label: "Chile", x: 35, y: 73 },
      { label: "Argentina", x: 41, y: 79 }
    ]
  },
  santafe_provincia: {
    titulo: "Marcá puntos clave de Santa Fe",
    piezas: [
      { label: "Reconquista", x: 52, y: 20 },
      { label: "Rafaela", x: 43, y: 45 },
      { label: "Ciudad de Santa Fe", x: 52, y: 47 },
      { label: "Rosario", x: 55, y: 70 },
      { label: "Venado Tuerto", x: 43, y: 84 }
    ]
  },
  santafe_departamentos: {
    titulo: "Ubicá departamentos santafesinos",
    piezas: [
      { label: "General Obligado", x: 53, y: 16 },
      { label: "San Cristóbal", x: 41, y: 32 },
      { label: "La Capital", x: 53, y: 49 },
      { label: "San Lorenzo", x: 55, y: 65 },
      { label: "Rosario", x: 54, y: 71 }
    ]
  }
};
