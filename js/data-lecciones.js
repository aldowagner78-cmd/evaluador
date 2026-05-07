// ═══════════════════════════════════════════════════════════════
//  BANCO DE LECCIONES — contenido real (cuadernillo MEN 6° grado)
// ═══════════════════════════════════════════════════════════════
const LECCIONES = {
  nat: {
    "Materia y Transformaciones": {
      titulo: "El Mundo de las Partículas",
      objetivo: "Entender cómo está formada la materia y por qué cambia de estado.",
      secciones: [
        {
          titulo: "¿De qué está hecho todo?",
          texto: "Todos los materiales del universo, naturales o artificiales, están formados por partículas microscópicas unidas entre sí. Lo que diferencia a un material de otro es la cantidad y el tipo de partículas que lo componen.",
          analogia: "Funciona como el abecedario: con 27 letras se forman miles de palabras distintas. Con pocas partículas se forman todos los materiales que conocemos.",
          clave: "Todo está hecho de partículas",
          check: { q: "¿Qué diferencia un material de otro?", opts: ["Su color y forma","La cantidad y tipo de partículas que lo componen","La temperatura"], a: 1 }
        },
        {
          titulo: "Los tres estados de la materia",
          texto: "Las partículas pueden estar más o menos juntas según la temperatura. Esto define los tres estados de agregación: sólido (partículas muy juntas y ordenadas), líquido (separadas y desordenadas) y gaseoso (muy separadas, en total desorden).",
          analogia: "Como cuando estás en el aula formando fila (sólido), en el recreo en grupo (líquido) o corriendo libres en el patio (gas).",
          clave: "Sólido / Líquido / Gas",
          check: { q: "En el estado gaseoso las partículas...", opts: ["Están totalmente quietas","Vibran sin moverse","Se mueven con total libertad"], a: 2 }
        },
        {
          titulo: "Cambios de estado",
          texto: "Los cambios de estado son reversibles. La fusión es el paso de sólido a líquido. La vaporización, de líquido a gas. La condensación, de gas a líquido. La solidificación, de líquido a sólido. Todo depende de la temperatura.",
          analogia: "El hielo se derrite (fusión), el agua hierve (vaporización), el vapor del baño empaña el espejo (condensación), y el agua se congela (solidificación).",
          clave: "Fusión · Vaporización · Condensación · Solidificación",
          check: { q: "El paso de líquido a gas se llama:", opts: ["Fusión","Vaporización","Condensación"], a: 1 }
        },
        {
          titulo: "Átomos y moléculas",
          texto: "Las partículas más pequeñas son los átomos. Cuando varios átomos se unen forman moléculas. El agua (H₂O) es una molécula con 2 átomos de hidrógeno y 1 de oxígeno. Existen 98 átomos diferentes en la naturaleza, y sus combinaciones generan millones de moléculas distintas.",
          analogia: "Los átomos son como las letras y las moléculas como las palabras. H₂O es la 'palabra' agua.",
          clave: "Átomo → Molécula",
          check: { q: "¿Qué es H₂O?", opts: ["Un átomo grande","Una molécula con 2 átomos de hidrógeno y 1 de oxígeno","El símbolo del oxígeno"], a: 1 }
        }
      ],
      cierre: "Ahora podés explicar por qué el hielo se derrite, por qué hierve el agua y de qué está hecho todo lo que te rodea."
    }
  },
  soc: {
    "Historia Argentina": {
      titulo: "La Construcción de la Argentina",
      objetivo: "Comprender cómo se formó el país entre 1870 y 1916.",
      secciones: [
        {
          titulo: "¿Qué es un territorio?",
          texto: "Un territorio es un ámbito de la superficie terrestre claramente delimitado. Los límites son líneas que separan territorios, y las fronteras son los espacios donde se encuentran físicamente quienes habitan a uno y otro lado. Todos son construcciones sociales.",
          analogia: "Una cancha de fútbol tiene líneas (límites) y un círculo central donde se cruzan los equipos (frontera).",
          clave: "Territorio · Límite · Frontera",
          check: { q: "Un límite es:", opts: ["Una línea que separa dos territorios","Un país pequeño","Una guerra"], a: 0 }
        },
        {
          titulo: "Modelo agroexportador",
          texto: "Entre 1870 y 1916, Argentina se insertó en el mercado mundial como productor de alimentos y materias primas. Las máquinas reemplazaron los métodos antiguos. El Estado promovió la inmigración y la inversión extranjera (ferrocarriles).",
          analogia: "Como una fábrica gigante: el campo argentino producía para venderle al mundo, sobre todo a Europa.",
          clave: "Agroexportación + Inmigración + Ferrocarril",
          check: { q: "¿Qué exportaba principalmente Argentina en esa época?", opts: ["Tecnología y autos","Alimentos y materias primas","Petróleo"], a: 1 }
        },
        {
          titulo: "El conflicto social",
          texto: "Las trabajadoras y los trabajadores tenían salarios bajos y jornadas largas. Surgieron el movimiento anarquista y el Partido Socialista. Cuestionaban a los patrones (dueños de fábricas) que explotaban a los obreros. Hubo huelgas y protestas.",
          analogia: "Cuando muchos no están conformes y se organizan para reclamar, igual que cuando un grupo del aula pide algo en conjunto al maestro.",
          clave: "Anarquismo · Socialismo · Huelgas",
          check: { q: "¿Qué pedían los trabajadores?", opts: ["Mejores condiciones laborales y salarios","Vacaciones más cortas","Trabajar más horas"], a: 0 }
        },
        {
          titulo: "Ley Sáenz Peña (1912)",
          texto: "Estableció el voto secreto, obligatorio y universal masculino. El secreto evitaba el fraude electoral. La obligatoriedad aumentaba la participación. Pero quedaban excluidas las mujeres, los extranjeros y otros grupos. Permitió que la UCR llegara al poder en 1916.",
          analogia: "Antes el voto era 'cantado' y los caudillos sabían quién votaba qué. Con el voto secreto, nadie podía controlarte.",
          clave: "Voto Secreto · Obligatorio · Universal (limitado)",
          check: { q: "¿Por qué era importante el voto secreto?", opts: ["Para que nadie supiera el resultado","Para evitar el fraude electoral","Para que vote menos gente"], a: 1 }
        }
      ],
      cierre: "La Argentina moderna se construyó con conflictos: el modelo agroexportador, la lucha obrera y la ampliación democrática."
    }
  },
  len: {
    "Comprensión Lectora": {
      titulo: "Cómo Entender un Texto",
      objetivo: "Aprender a identificar la idea principal, los detalles y a inferir información.",
      secciones: [
        {
          titulo: "La idea principal",
          texto: "Cada texto desarrolla una idea principal: el tema central que el autor quiere comunicar. Los detalles secundarios sostienen, explican o ejemplifican esa idea. Identificar la idea principal es el primer paso para comprender.",
          analogia: "Como en una pizza: la idea principal es la masa, los detalles son los ingredientes que le dan sabor.",
          clave: "Idea principal = tema central",
          check: { q: "Los detalles secundarios sirven para:", opts: ["Reemplazar la idea principal","Sostener y explicar la idea principal","Confundir al lector"], a: 1 }
        },
        {
          titulo: "Información explícita vs implícita",
          texto: "Lo explícito está escrito de forma directa: lo leemos tal cual. Lo implícito hay que deducirlo: el autor da pistas pero no lo dice con todas las letras. Inferir es 'leer entre líneas'.",
          analogia: "Si alguien dice 'tengo frío', es explícito. Si tiembla y se abraza, es implícito que tiene frío.",
          clave: "Explícito (dicho) · Implícito (inferido)",
          check: { q: "Inferir significa:", opts: ["Copiar el texto","Deducir lo que no está dicho directamente","Inventar"], a: 1 }
        },
        {
          titulo: "Vocabulario preciso",
          texto: "Para expresar ideas con claridad necesitamos palabras específicas. Decir 'el coso de la célula que manda' es vago. Decir 'el núcleo de la célula' es preciso. El vocabulario técnico es una herramienta de pensamiento.",
          analogia: "Como una caja de herramientas: cada problema tiene su herramienta exacta. No usás un martillo para atornillar.",
          clave: "Palabras técnicas = pensamiento claro",
          check: { q: "¿Por qué importa usar vocabulario técnico?", opts: ["Para sonar inteligente","Para expresar ideas con claridad y precisión","Para complicarlo todo"], a: 1 }
        }
      ],
      cierre: "Comprender un texto es identificar su idea principal, distinguir lo dicho de lo inferido, y usar vocabulario preciso para expresarlo."
    }
  },
  mat: {
    "Fracciones": {
      titulo: "Las Fracciones",
      objetivo: "Entender qué es una fracción y cómo trabajamos con ellas.",
      secciones: [
        {
          titulo: "¿Qué es una fracción?",
          texto: "Una fracción representa una parte de un entero dividido en partes iguales. Tiene dos números: el numerador (arriba) indica cuántas partes tomamos, y el denominador (abajo) indica en cuántas partes se dividió el entero.",
          analogia: "Si una pizza se corta en 8 trozos iguales y comés 3, comiste 3/8 de la pizza.",
          clave: "Numerador / Denominador",
          check: { q: "En la fracción 3/8, ¿qué representa el 8?", opts: ["Las partes que tomamos","En cuántas partes se dividió el entero","El resultado"], a: 1 }
        },
        {
          titulo: "Fracciones equivalentes",
          texto: "Dos fracciones son equivalentes si representan la misma cantidad. Por ejemplo, 1/2 = 2/4 = 4/8. Se obtienen multiplicando o dividiendo numerador y denominador por el mismo número.",
          analogia: "Cortar una pizza en 2 y comer 1 es lo mismo que cortarla en 8 y comer 4: comiste la mitad de las dos formas.",
          clave: "Misma cantidad, distintos números",
          check: { q: "1/2 es equivalente a:", opts: ["1/4","2/4","2/8"], a: 1 }
        },
        {
          titulo: "Suma de fracciones",
          texto: "Para sumar fracciones con el mismo denominador, sumamos los numeradores y mantenemos el denominador. Si tienen denominadores distintos, primero las hacemos equivalentes con el mismo denominador.",
          analogia: "1/4 + 2/4 es como tener 1 trozo + 2 trozos del mismo tamaño = 3 trozos.",
          clave: "Mismo denominador → sumar numeradores",
          check: { q: "1/5 + 2/5 = ?", opts: ["3/10","3/5","2/5"], a: 1 }
        }
      ],
      cierre: "Las fracciones son herramientas para representar partes de un todo, fundamentales en la vida diaria y la matemática."
    }
  }
};
