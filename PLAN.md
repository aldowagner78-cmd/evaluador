# 📚 Plan de Trabajo — Manual Interactivo 6° Grado

## Objetivo final

Generador de **un único HTML por tema** que el niño abre en cualquier dispositivo y contiene:

- **Fase 1 — Lección interactiva** completa como capítulo de libro digital
- **Fase 2 — Evaluación gamificada** que se desbloquea al completar la lección

---

## Arquitectura del HTML generado (para el niño)

```
[FASE 1: LECCIÓN]
  ├── Pantalla intro: título, objetivo, icono animado, botón Empezar
  ├── Sección 1
  │     ├── Texto explicativo rico
  │     ├── Visualización SVG/Canvas animada específica del concepto
  │     ├── Palabras clave como links → panel lateral con más info + Ollama
  │     ├── TTS (lectura en voz alta, nativo del navegador)
  │     └── Pregunta de comprensión (debe responderla para avanzar)
  ├── Sección 2 ... N (igual estructura)
  └── Pantalla cierre con resumen y "¡Evaluación desbloqueada!"

[FASE 2: EVALUACIÓN GAMIFICADA]
  ├── Intro con instrucciones
  ├── Preguntas con: vidas, racha, puntaje, timer, atajos 1-4
  ├── Feedback inmediato: pulse-ok, shake, sonidos, mascota
  ├── Confetti al ≥90%
  ├── Pantalla resultado + revisar errores
  └── postMessage al opener (si abre desde generador)
```

---

## Visualizaciones SVG/Canvas por materia

| Materia    | Tema                 | Visualización                                                  |
| ---------- | -------------------- | -------------------------------------------------------------- |
| Naturales  | Materia y partículas | Moléculas animadas moviéndose + cambios de estado interactivos |
| Naturales  | Cuerpo humano        | Silueta con órganos clickables → animación del órgano          |
| Naturales  | Sistema solar        | Planetas orbitando con velocidades reales a escala             |
| Sociales   | Historia Argentina   | Línea de tiempo horizontal arrastrable                         |
| Sociales   | Provincias           | Mapa SVG inline con paths por provincia, clickable             |
| Matemática | Fracciones           | Rectángulo/círculo que se divide visualmente                   |
| Matemática | Geometría            | Figuras con ángulos y áreas calculadas en tiempo real          |
| Lengua     | Estructura del texto | Diagrama jerárquico animado                                    |

---

## Integración Ollama (en el HTML del niño)

- El generador tiene campo "IP de Ollama" (default: `localhost:11434`)
- Se embebe en el HTML generado
- Cuando el niño hace clic en una palabra clave o en "Explicame más":
  1. Se conecta a `http://<ip_ollama>:11434/api/generate`
  2. Muestra respuesta en streaming en panel lateral animado
  3. Si no responde (sin Ollama) → usa contenido offline preescrito, sin error visible
- **Recomendación de instalación**: instalar Ollama en la PC del padre (misma red WiFi), el niño accede por IP local (ej: `192.168.1.X:11434`). Modelo sugerido: `llama3.2:3b` (rápido, 2GB)

---

## Banco de lecciones a ampliar (`data-lecciones.js`)

### Bloque 1: Ciencias Naturales

- [x] Materia y Transformaciones _(ampliar a 8 secciones)_
- [ ] El Cuerpo Humano — sistemas: digestivo, circulatorio, nervioso
- [ ] Ecosistemas y Cadenas Alimentarias
- [ ] Electricidad y Magnetismo
- [ ] La Célula

### Bloque 2: Ciencias Sociales

- [x] Historia Argentina 1870-1916 _(ampliar)_
- [ ] Geografía de Argentina — regiones naturales
- [ ] Las Provincias Argentinas
- [ ] América Latina — países y capitales
- [ ] Derechos y Ciudadanía

### Bloque 3: Matemática

- [ ] Fracciones y Números Mixtos
- [ ] Decimales — operaciones
- [ ] Geometría — perímetro, área, volumen
- [ ] Proporcionalidad
- [ ] Estadística básica — gráficos

### Bloque 4: Lengua

- [x] Comprensión Lectora _(ampliar)_
- [ ] Tipos de Texto — narrativo, expositivo, argumentativo
- [ ] Gramática — sujeto, predicado, verbo
- [ ] Ortografía — reglas claves
- [ ] Producción Escrita — planificación y coherencia

---

## Fix: Mapa SVG inline (reemplaza imagen+labels)

**Problema actual**: imagen PNG + divs flotantes → labels fuera de lugar, scroll, no responsive  
**Solución**: SVG con paths reales de cada provincia + labels centrados dentro del path  
**Resultado**: responsive, sin scroll, clickable, funciona en todos los dispositivos

---

## Juegos interactivos a construir/corregir

| Juego                                    | Estado    | Acción                           |
| ---------------------------------------- | --------- | -------------------------------- |
| Drag & Drop provincias sobre mapa SVG    | Buggy     | Refactor completo con SVG inline |
| Unir con flechas (concepto ↔ definición) | No existe | Crear `template-flechas.js`      |
| Señalar puntos en imagen/mapa            | No existe | Crear `template-hotspot.js`      |
| Ordenar cronológicamente (drag)          | No existe | Crear `template-cronologia.js`   |
| Completar texto (fill-in-the-blank)      | No existe | Crear `template-cloze.js`        |
| Flashcards 3D                            | ✅ Creado | Validar                          |
| Memorice (memory match)                  | ✅ Creado | Validar                          |

---

## Tareas ordenadas por prioridad

### SPRINT 1 — Fundación (hacer primero)

1. **Crear `template-leccion-completa.js`** — el template todo-en-uno principal
   - Estructura fase 1 (lección) + fase 2 (evaluación)
   - Visualización genérica animada base
   - Integración Ollama inline
   - TTS nativo
   - Responsive móvil/tablet/desktop
2. **Ampliar `data-lecciones.js`** — contenido rico para los 4 bloques (al menos 3 temas por materia)
3. **Fix Ollama en `ollama.js`** — que funcione por IP configurable

### SPRINT 2 — Visualizaciones

4. SVG Moléculas animadas (Naturales)
5. SVG Línea de tiempo (Sociales)
6. SVG Fracciones visuales (Matemática)
7. SVG Mapa Argentina provinces con paths reales

### SPRINT 3 — Juegos y actividades

8. Mapa SVG drag-and-drop reescrito
9. `template-flechas.js` (unir con flechas)
10. `template-cloze.js` (completar texto)
11. `template-cronologia.js` (ordenar cronológicamente)

### SPRINT 4 — Pulido

12. Responsive audit en tablet/celular
13. Offline fallback para todas las fuentes externas
14. Validación E2E de cada template generado

---

## Setup Ollama recomendado

```bash
# En tu PC personal (la del padre):
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3.2:3b   # modelo liviano, rápido, 2GB

# Para que el niño pueda conectarse por red:
OLLAMA_HOST=0.0.0.0:11434 ollama serve

# En el generador, poner la IP local de la PC del padre:
# Ejemplo: 192.168.1.15:11434
```

---

## Para continuar desde otra PC

```bash
git clone https://github.com/aldowagner78-cmd/evaluador.git
cd evaluador
python3 -m http.server 8000
# Abrir http://localhost:8000/generador_ui.html
```

### Prompt para continuar con Copilot:

> Continuamos el proyecto "Manual Interactivo 6° Grado". El plan está en PLAN.md. El sprint pendiente es SPRINT 1: crear template-leccion-completa.js con lección interactiva todo-en-uno (fase 1 lección + fase 2 evaluación), visualizaciones SVG animadas, integración Ollama por IP configurable y TTS nativo. Leer PLAN.md, data-lecciones.js y template-base.js antes de empezar.
