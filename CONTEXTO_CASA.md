# 🏠 CONTEXTO COMPLETO — Para continuar en casa (Windows)

> **Para Copilot**: Este archivo es el contexto completo del proyecto.
> Leé TODO este archivo antes de hacer cualquier cosa.
> Al final encontrás los pasos exactos y el orden en que debés actuar.

---

## 🎯 OBJETIVO DEL PROYECTO

Crear un **generador de materiales educativos interactivos** para un niño de 6° grado.
El generador (que ya existe) produce archivos HTML que el niño abre en su PC/tablet.

**Lo que el niño recibe: UN SOLO archivo HTML** con dos fases:

### FASE 1 — Lección interactiva (como un capítulo de libro digital)

- Texto explicativo rico, no slides simples
- **Visualizaciones SVG/Canvas animadas** específicas del concepto:
  - Naturales: moléculas moviéndose, cambios de estado, órganos clickables
  - Sociales: línea de tiempo arrastrable, mapa SVG con provincias
  - Matemática: fracciones visuales, geometría dinámica
  - Lengua: esquemas de texto animados
- **Palabras clave clickables** → abren panel lateral con más info
- Botón "Explicame más" → consulta a Ollama (IA local) y muestra respuesta animada
- TTS (lectura en voz alta, nativo del navegador, sin dependencias)
- El niño debe **responder una pregunta de comprensión** al final de cada sección para avanzar

### FASE 2 — Evaluación gamificada (se desbloquea al completar la lección)

- Quiz con: vidas ❤️, racha 🔥, puntaje ⭐, timer, atajos teclado 1-4
- Feedback inmediato: animaciones pulse-ok, shake, sonidos Web Audio API
- Mascota animada con emojis según resultado
- Confetti Canvas al ≥90%
- Pantalla de resultados con medalla + revisar errores
- Todo en el mismo archivo, sin dependencias externas

---

## 🗂️ ARCHIVOS A LEER (en este orden)

**Paso 1 — Entender el objetivo y el plan:**

```
PLAN.md                    ← Plan de trabajo completo con todos los sprints
CONTEXTO_CASA.md           ← Este archivo
```

**Paso 2 — Entender el estado actual del código:**

```
js/template-base.js        ← Funciones base: cssBaseLeccion(color), colorMateria(), iconoMateria()
js/data-lecciones.js       ← Banco de lecciones actual (incompleto, hay que ampliar)
js/template-slides.js      ← Template actual de lección (MUY BÁSICO, reemplazar)
js/template-quiz.js        ← Quiz gamificado v2 (ya mejorado, sirve como referencia)
js/ui.js                   ← Orquestador: generarLeccion(), generarMapa(), routing
generador_ui.html          ← Interfaz del generador (no tocar salvo agregar opciones)
```

**Paso 3 — Ver lo que ya se construyó en la sesión anterior:**

```
js/template-flashcards.js  ← Flashcards 3D flip (ya creado)
js/template-memorice.js    ← Memory match (ya creado)
js/template-mapa.js        ← Mapa drag-and-drop (ya mejorado)
js/ollama.js               ← Integración Ollama actual (hay que mejorar)
```

---

## 📊 ESTADO ACTUAL — Qué funciona, qué falta

### ✅ Ya construido y funcionando

- `generador_ui.html` — interfaz con sidebar, tabs Lección / Quiz / Mapas
- `template-quiz.js` v2 — quiz gamificado completo (confetti, racha, atajos 1-4, revisar errores)
- `template-slides.js` — lección básica en slides (POBRE, necesita reemplazo)
- `template-resumen.js` — resumen visual en tarjetas (básico)
- `template-infografia.js` — infografía SVG radial (básica)
- `template-animacion.js` — animación secuencial (básica)
- `template-flashcards.js` — tarjetas 3D flip (nuevo, funciona)
- `template-memorice.js` — memory match concepto-ejemplo (nuevo, funciona)
- `template-mapa.js` — mapa DnD con confetti, sonido drop, highlight (mejorado)
- `data-lecciones.js` — 4 lecciones básicas (1 por materia, pocas secciones)
- `gamificacion.js` — XP, medallas, historial en localStorage
- `ollama.js` — integración básica (solo para el generador, no para el HTML del niño)

### ❌ Pendiente (PRIORIDAD)

1. **`template-leccion-completa.js`** — EL TEMPLATE PRINCIPAL que falta crear
   - Todo-en-uno: Fase 1 lección + Fase 2 evaluación
   - Visualizaciones SVG/Canvas animadas por tipo de concepto
   - Ollama integrado DENTRO del HTML generado (el niño lo usa, no el generador)
   - TTS con botón de voz por sección
   - Preguntas de comprensión bloqueantes (debe responder para avanzar)
2. **Ampliar `data-lecciones.js`** — Mínimo 3 temas por materia con contenido rico
3. **Fix mapas** — SVG inline con paths reales de provincias (las imágenes no escalan)

---

## 🏗️ ARQUITECTURA DE `template-leccion-completa.js`

```javascript
function generarLeccionCompleta(L, mat, opts) {
  // L = objeto lección de data-lecciones.js
  // mat = 'nat'|'len'|'mat'|'soc'
  // opts = { ollamaIP, tts, ... }
  // Retorna HTML completo con:
  // - Variables CSS con el color de la materia
  // - Estado: { fase:'leccion'|'evaluacion', secIdx, completadas[], ... }
  // - FASE 1: secciones navegables con SVG + check bloqueante
  // - FASE 2: quiz gamificado (copiar lógica de template-quiz.js)
  // - Transición con animación entre fases
}
```

### Estructura del HTML generado:

```
<body>
  <div id="app">
    <!-- FASE 1: LECCIÓN -->
    <section id="leccion">
      <header>  título, progreso, TTS global  </header>
      <div id="sec-content">
        <!-- por sección: -->
        <h2> título sección </h2>
        <div class="vis-wrap"> ← SVG/Canvas animado específico del tema </div>
        <div class="texto"> contenido explicativo </div>
        <div class="analogia"> analogía </div>
        <div class="clave"> palabra clave </div>
        <div class="check-bloqueante"> pregunta → debe responder para avanzar </div>
      </div>
      <nav>  anterior / siguiente  </nav>
    </section>

    <!-- PANEL LATERAL OLLAMA (hidden por defecto) -->
    <aside id="panel-ollama"> respuesta streaming animada </aside>

    <!-- TRANSICIÓN -->
    <div id="unlock-screen"> 🎉 ¡Lección completada! → Desbloquear evaluación </div>

    <!-- FASE 2: EVALUACIÓN -->
    <section id="evaluacion" hidden>
      <!-- quiz gamificado completo -->
    </section>
  </div>
</body>
```

---

## 🤖 CONFIGURACIÓN OLLAMA (Windows — hacer primero)

**El archivo `GUIA_OLLAMA.md` tiene todos los detalles.**

Resumen para Windows:

```powershell
# 1. Descargar instalador desde: https://ollama.com/download
# 2. Ejecutar OllamaSetup.exe
# 3. Abrir PowerShell y correr:
ollama pull qwen2.5:3b

# 4. Configurar para red local:
# Panel de control → Sistema → Variables de entorno → Nueva variable de sistema:
# Nombre: OLLAMA_HOST
# Valor: 0.0.0.0:11434

# 5. Ver tu IP local:
ipconfig
# Buscar "Dirección IPv4": 192.168.X.X
```

**Prompt para que Copilot haga todo esto automáticamente en Windows:**

> Estoy en Windows. Instalá Ollama automáticamente si no está: descargá el instalador con PowerShell, ejecutalo silenciosamente, bajá el modelo `qwen2.5:3b`, configurá la variable de entorno `OLLAMA_HOST=0.0.0.0:11434` en el sistema, detectá mi IP local en la red, y guardá esa IP en el archivo `js/ollama.js` como valor por defecto. Al final verificá que Ollama responde en `localhost:11434/api/tags`.

---

## 📋 ORDEN DE TRABAJO EN CASA

### Paso 1 — Setup (5 minutos)

```bash
# En PowerShell o CMD:
git clone https://github.com/aldowagner78-cmd/evaluador.git
cd evaluador
# Abrir en VS Code:
code .
```

### Paso 2 — Instalar Ollama (si no está)

Pegar el prompt de arriba en Copilot. Decirle que lo haga solo.

### Paso 3 — Levantar el servidor local

```bash
python -m http.server 8000
# Abrir: http://localhost:8000/generador_ui.html
```

### Paso 4 — Continuar el desarrollo

Pegar el siguiente prompt en Copilot:

---

## 💬 PROMPT EXACTO PARA CONTINUAR (pegar en Copilot)

```
Soy el dueño del proyecto "Manual Interactivo 6° Grado".

ANTES DE HACER NADA, leé estos archivos en orden:
1. CONTEXTO_CASA.md (este archivo — ya lo estás leyendo)
2. PLAN.md
3. js/template-base.js
4. js/data-lecciones.js
5. js/template-quiz.js (para entender el estilo del quiz gamificado)
6. js/template-slides.js (para ver qué tan básico es lo actual)
7. js/ollama.js

Cuando hayas leído todo, confirmame que entendiste y decime:
- Qué encontraste en cada archivo
- Cuál es la IP de Ollama que tengo configurada
- Cuál es el plan de SPRINT 1

Luego empezamos con la tarea: crear js/template-leccion-completa.js
```

---

## 🔑 DECISIONES DE DISEÑO TOMADAS (no cambiar)

| Decisión                          | Motivo                                                                     |
| --------------------------------- | -------------------------------------------------------------------------- |
| HTML standalone sin servidor      | El niño abre el archivo directamente, sin necesitar Python corriendo       |
| Ollama por IP configurable        | El padre tiene Ollama en su PC, el niño se conecta por WiFi local          |
| Sin frameworks (React, Vue, etc.) | Máxima compatibilidad, sin build step, funciona offline                    |
| Fuentes de Google Fonts           | Internet disponible en uso normal; fallback CSS si offline                 |
| Web Audio API para sonidos        | Sin archivos MP3 externos, todo embebido en el JS                          |
| Canvas para confetti              | Sin librerías externas                                                     |
| postMessage al opener             | Para que el generador reciba puntajes si el HTML se abre desde él          |
| Fase 1 → Fase 2 bloqueante        | El niño DEBE leer y responder preguntas de comprensión para llegar al quiz |

---

## 📁 ESTRUCTURA DE CARPETAS

```
evaluador/
├── generador_ui.html          ← Interfaz del generador (lo usa el padre)
├── PLAN.md                    ← Plan de trabajo con todos los sprints
├── CONTEXTO_CASA.md           ← Este archivo
├── GUIA_OLLAMA.md             ← Guía de instalación Ollama
├── start.sh                   ← Script para levantar servidor en Linux
├── css/
│   └── styles.css             ← Estilos del generador
├── js/
│   ├── template-base.js       ← Funciones CSS base compartidas ← LEER PRIMERO
│   ├── template-quiz.js       ← Quiz gamificado v2 ← REFERENCIA PRINCIPAL
│   ├── template-slides.js     ← Lección básica (reemplazar con leccion-completa)
│   ├── template-resumen.js    ← Resumen visual
│   ├── template-infografia.js ← Infografía SVG
│   ├── template-animacion.js  ← Animación secuencial
│   ├── template-flashcards.js ← Flashcards 3D (nuevo)
│   ├── template-memorice.js   ← Memory match (nuevo)
│   ├── template-mapa.js       ← Mapa DnD con confetti
│   ├── data-lecciones.js      ← Banco de lecciones (ampliar)
│   ├── data-preguntas.js      ← Banco de preguntas para quiz
│   ├── data-mapas.js          ← 14 mapas + 5 actividades DnD
│   ├── gamificacion.js        ← XP, medallas, historial
│   ├── ollama.js              ← Integración Ollama (mejorar)
│   ├── app.js                 ← Inicialización de la app
│   └── ui.js                  ← Orquestador principal ← LEER ANTES DE MODIFICAR
└── contenido/
    └── _extracted/            ← PDFs extraídos como texto (fuente del contenido)
```

---

## ⚠️ COSAS QUE NO TOCAR

- `generador_ui.html` — solo agregar fmt-cards o scripts al final, no restructurar
- `js/gamificacion.js` — funciona bien, no modificar
- `js/app.js` — inicialización delicada, no modificar
- `js/data-preguntas.js` — banco grande, solo agregar al final
- Los archivos en `contenido/_extracted/` — solo lectura, son fuente de datos

---

## 🚀 PRÓXIMAS FEATURES (después de SPRINT 1)

Ver `PLAN.md` para el detalle completo. En resumen:

**SPRINT 2** — Visualizaciones SVG por materia:

- Moléculas animadas para Naturales
- Línea de tiempo para Sociales
- Fracciones visuales para Matemática

**SPRINT 3** — Juegos nuevos:

- Unir con flechas (concepto ↔ definición)
- Completar texto (fill-in-the-blank)
- Ordenar cronológicamente

**SPRINT 4** — Fix mapas SVG inline (provincias con paths reales)

---

> **Recordá**: El generador (`generador_ui.html`) es solo la herramienta del padre.
> Lo importante es la CALIDAD del HTML que recibe el niño.
> Objetivo: que un chico de 6° grado pueda aprender y evaluarse solo,
> con una experiencia tan buena como una app educativa real.
