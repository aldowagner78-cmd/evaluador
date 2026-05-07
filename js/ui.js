// ═══════════════════════════════════════════════════════════════
//  FUSIÓN DE BANCOS (PREGUNTAS_EXTRA, BANCO_EXT_EXTRA, LECCIONES_EXTRA)
//  Se ejecuta al cargar este script (después de los demás data-*.js)
// ═══════════════════════════════════════════════════════════════
(function fusionarBancos() {
  function deepMerge(dst, src) {
    if (!src) return;
    for (const mat of Object.keys(src)) {
      if (!dst[mat]) dst[mat] = {};
      for (const tema of Object.keys(src[mat])) {
        if (Array.isArray(src[mat][tema])) {
          dst[mat][tema] = [...(dst[mat][tema] || []), ...src[mat][tema]];
        } else if (typeof src[mat][tema] === 'object') {
          dst[mat][tema] = src[mat][tema]; // lecciones reemplazan
        }
      }
    }
  }
  if (typeof PREGUNTAS_EXTRA !== 'undefined' && typeof PREGUNTAS !== 'undefined') deepMerge(PREGUNTAS, PREGUNTAS_EXTRA);
  if (typeof BANCO_EXT_EXTRA !== 'undefined' && typeof BANCO_EXT !== 'undefined') deepMerge(BANCO_EXT, BANCO_EXT_EXTRA);
  if (typeof LECCIONES_EXTRA !== 'undefined' && typeof LECCIONES !== 'undefined') deepMerge(LECCIONES, LECCIONES_EXTRA);
  // Anexar preguntas con mapas al banco soc
  if (typeof PREGUNTAS_MAPAS !== 'undefined' && typeof PREGUNTAS !== 'undefined') {
    PREGUNTAS.soc = PREGUNTAS.soc || {};
    PREGUNTAS.soc["Mapas y Localización"] = PREGUNTAS_MAPAS.map(p => ({ q: p.q, opts: p.opts, a: p.a, tipo: p.tipo }));
  }
})();

// ═══════════════════════════════════════════════════════════════
//  ESTADO GLOBAL
// ═══════════════════════════════════════════════════════════════
let selectedMateria = 'mat';
let selectedTema    = 'Fracciones';
let selectedDiff    = 'easy';
let generatedHistory = JSON.parse(localStorage.getItem('fab_historial') || '[]');

const colorByMat = {mat:'var(--cyan)', len:'var(--magenta)', nat:'var(--green)', soc:'var(--yellow)'};

// ─── Accordion ───────────────────────────────────────────────
function toggleSubject(header) {
  header.parentElement.classList.toggle('open');
}

// ─── Selección de tema ───────────────────────────────────────
function selectTopic(el, materia, tema) {
  document.querySelectorAll('.topic').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  selectedMateria = materia;
  selectedTema    = tema;
  // breadcrumb
  const icons = {mat:'🔢 Matemática', len:'📖 Lengua', nat:'🔬 Cs. Naturales', soc:'🌎 Cs. Sociales'};
  const colors = {mat:'bc-mat', len:'bc-len', nat:'bc-nat', soc:'bc-soc'};
  document.querySelector('.breadcrumb').innerHTML =
    `<span class="${colors[materia]}">${icons[materia]}</span>
     <span class="bc-sep">›</span>
     <span class="bc-topic">${tema}</span>`;
  // nombre de archivo sugerido
  const slug = tema.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/ /g,'_');
  document.querySelector('.filename-input').value = `${materia}_${slug}.html`;
  updatePreview();
}

// ─── Tipo de ejercicio ────────────────────────────────────────
function selectType(card) {
  document.querySelectorAll('.type-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
}

// ─── Dificultad ───────────────────────────────────────────────
function setDiff(btn, level) {
  document.querySelectorAll('.diff-btn').forEach(b =>
    b.classList.remove('active-easy','active-medium','active-hard'));
  btn.classList.add('active-' + level);
  selectedDiff = level;
}

// ─── Preview ──────────────────────────────────────────────────
function updatePreview() {
  const banco = PREGUNTAS[selectedMateria]?.[selectedTema];
  if (!banco || banco.length === 0) return;
  const q = banco[0];
  document.querySelector('.preview-title').textContent = selectedTema.toUpperCase();
  document.querySelector('.preview-q').innerHTML =
    `<div class="q-text">${q.q}</div>` +
    q.opts.map((o,i) =>
      `<div class="preview-option${i===q.a?' correct':''}">${String.fromCharCode(97+i)}) ${o}${i===q.a?' ✓':''}</div>`
    ).join('');
}

// ─── Historial ────────────────────────────────────────────────
function renderHistory() {
  const container = document.getElementById('history-container');
  if (!container) return;
  container.innerHTML = '';
  const items = [...generatedHistory].reverse().slice(0, 10);
  if (items.length === 0) {
    container.innerHTML = '<div style="color:var(--dim);font-size:0.75rem;padding:10px 0">No hay apps generadas aún</div>';
    return;
  }
  items.forEach(item => {
    const d = document.createElement('div');
    d.className = 'history-item';
    let meta = '';
    if (item.tipo && item.tipo.startsWith('leccion-')) {
      meta = '📚 ' + item.tipo.replace('leccion-','') + ' · ' + item.fecha;
    } else if (item.tipo === 'mapa') {
      meta = '🗺️ mapa · ' + item.fecha;
    } else {
      meta = (item.nq || '?') + ' pregs · ' + (item.diff || '-') + ' · ' + item.fecha;
    }
    d.innerHTML = `
      <div class="history-dot" style="background:${colorByMat[item.mat]||'var(--cyan)'}"></div>
      <div class="history-info">
        <div class="history-name">${item.filename}</div>
        <div class="history-meta">${meta}</div>
      </div>
      <span class="history-open">generado ✓</span>`;
    container.appendChild(d);
  });
}

// ═══════════════════════════════════════════════════════════════
//  NORMALIZAR — convierte tipos especiales a mc compatible
// ═══════════════════════════════════════════════════════════════
function normalizarPreguntas(lista) {
  const out = [];
  for (const p of lista) {
    const tipo = p.tipo || 'mc';

    // Tipos estándar: pasan directo
    if (tipo === 'mc' || tipo === 'tf') {
      out.push(p);

    // traducir: usa 'opciones' en vez de 'opts' — renombrar
    } else if (tipo === 'traducir') {
      out.push({ q: p.q, opts: p.opciones || p.opts, a: p.a, tipo: 'mc' });

    // texto-roto: un blank → una pregunta mc con contexto
    } else if (tipo === 'texto-roto') {
      const partes = p.texto.split('[BLANK]');
      p.blancos.forEach((correcto, i) => {
        const antes   = (partes[i]   || '').trim().split(' ').slice(-6).join(' ');
        const despues = (partes[i+1] || '').trim().split(' ').slice(0, 6).join(' ');
        const ctx     = ('…' + antes + ' _____ ' + despues + '…').trim();
        const incorrectas = (p.opciones || []).filter(o => o !== correcto)
          .sort(() => Math.random() - 0.5).slice(0, 3);
        const optsArr = [correcto, ...incorrectas].sort(() => Math.random() - 0.5);
        const a = optsArr.indexOf(correcto);
        out.push({ q: p.q + '\n' + ctx, opts: optsArr, a, tipo: 'mc' });
      });

    // detective: texto + 3 sub-preguntas → 3 ítems mc con texto incluido
    } else if (tipo === 'detective') {
      const frag = p.texto.length > 200 ? p.texto.substring(0, 197) + '…' : p.texto;
      for (const sq of p.preguntas) {
        out.push({
          q: '📄 Leé:\n«' + frag + '»\n\n➤ ' + sq.q,
          opts: sq.opts,
          a:    sq.a,
          tipo: 'mc'
        });
      }
    }
  }
  return out;
}

// ═══════════════════════════════════════════════════════════════
//  ORIGINALIDAD Y NO REPETICIÓN
// ═══════════════════════════════════════════════════════════════
const USED_KEY_PREFIX = 'fab_used_q_v2:';

function mezclar(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function firmaPregunta(p) {
  return JSON.stringify({ q: p.q, opts: p.opts, a: p.a, tipo: p.tipo || 'mc' });
}

function variacionesTexto(baseQ) {
  const prefijos = [
    'Resolvé y elegí la opción correcta:\n',
    'Leé con atención y respondé:\n',
    'Desafío rápido:\n',
    'Aplicá el concepto y marcá la respuesta:\n'
  ];
  return mezclar(prefijos).slice(0, 2).map(pref => ({ ...baseQ, q: pref + baseQ.q }));
}

function reordenarOpciones(q) {
  if (!Array.isArray(q.opts) || q.opts.length < 2) return [q];
  const out = [];
  for (let i = 0; i < 2; i++) {
    const correcta = q.opts[q.a];
    const opts = mezclar(q.opts);
    out.push({ ...q, opts, a: opts.indexOf(correcta) });
  }
  return out;
}

function generarProceduralesMat(tema, cantidad) {
  const out = [];
  const n = Math.max(0, cantidad | 0);

  if (tema === 'Fracciones') {
    for (let i = 0; i < n; i++) {
      const d = [2, 3, 4, 5, 6, 8][Math.floor(Math.random() * 6)];
      const a = Math.floor(Math.random() * (d - 1)) + 1;
      const b = Math.floor(Math.random() * (d - 1)) + 1;
      const suma = a + b;
      const correcta = `${suma}/${d}`;
      const distractores = new Set([`${Math.max(1, suma - 1)}/${d}`, `${suma}/${Math.max(2, d - 1)}`, `${Math.min(d, suma + 1)}/${d}`]);
      const opts = mezclar([correcta, ...[...distractores].slice(0, 3)]);
      out.push({ q: `¿Cuánto es ${a}/${d} + ${b}/${d}?`, opts, a: opts.indexOf(correcta), tipo: 'mc' });
    }
  }

  if (tema === 'Decimales') {
    for (let i = 0; i < n; i++) {
      const x = (Math.floor(Math.random() * 90) + 10) / 10;
      const y = (Math.floor(Math.random() * 90) + 10) / 10;
      const op = Math.random() < 0.5 ? '+' : '-';
      const z = op === '+' ? (x + y) : (x - y);
      const correcta = z.toFixed(1).replace('.', ',');
      const d1 = (z + 1).toFixed(1).replace('.', ',');
      const d2 = (z - 1).toFixed(1).replace('.', ',');
      const d3 = (z + 0.2).toFixed(1).replace('.', ',');
      const opts = mezclar([correcta, d1, d2, d3]);
      out.push({ q: `¿Cuánto es ${x.toFixed(1).replace('.', ',')} ${op} ${y.toFixed(1).replace('.', ',')}?`, opts, a: opts.indexOf(correcta), tipo: 'mc' });
    }
  }

  if (tema === 'Porcentajes') {
    for (let i = 0; i < n; i++) {
      const base = [100, 120, 150, 200, 250, 300][Math.floor(Math.random() * 6)];
      const pct = [10, 20, 25, 30, 40, 50, 75][Math.floor(Math.random() * 7)];
      const correctaNum = (base * pct) / 100;
      const correcta = `${correctaNum}`;
      const opts = mezclar([correcta, `${correctaNum + 10}`, `${Math.max(1, correctaNum - 10)}`, `${Math.round(base / 10)}`]);
      out.push({ q: `¿Cuánto es el ${pct}% de ${base}?`, opts, a: opts.indexOf(correcta), tipo: 'mc' });
    }
  }

  return out;
}

function generarDesdeFacts(materia, tema, cantidad) {
  const facts = SCRAP_FACTS?.[materia]?.[tema] || [];
  if (!facts.length) return [];
  const stems = [
    'Según los materiales trabajados, ¿cuál afirmación es correcta?',
    'Seleccioná la opción precisa según el contenido de estudio.',
    'A partir de la fuente estudiada, elegí la respuesta correcta.'
  ];
  const pool = [];
  facts.forEach(f => {
    for (let i = 0; i < 3; i++) {
      const opts = mezclar([f.correcta, ...f.distractores.slice(0, 3)]);
      pool.push({ q: `${stems[i]}\n\n${f.stem}`, opts, a: opts.indexOf(f.correcta), tipo: 'mc' });
    }
  });
  return mezclar(pool).slice(0, Math.max(0, cantidad | 0));
}

function construirPoolOriginal(materia, tema, normalizadas, objetivo) {
  const base = [...normalizadas];
  const variaciones = [];

  normalizadas.forEach(q => {
    variaciones.push(...variacionesTexto(q));
    variaciones.push(...reordenarOpciones(q));
  });

  const extrasFacts = generarDesdeFacts(materia, tema, objetivo * 2);
  const extrasMat = materia === 'mat' ? generarProceduralesMat(tema, objetivo * 2) : [];

  const combinado = [...base, ...variaciones, ...extrasFacts, ...extrasMat];
  const map = new Map();
  combinado.forEach(q => {
    if (!q || !q.q || !Array.isArray(q.opts) || q.a == null) return;
    map.set(firmaPregunta(q), q);
  });
  return [...map.values()];
}

function seleccionarSinRepetir(pool, cantidad, materia, tema) {
  const key = `${USED_KEY_PREFIX}${materia}:${tema}`;
  const usados = new Set(JSON.parse(localStorage.getItem(key) || '[]'));

  let disponibles = pool.filter(q => !usados.has(firmaPregunta(q)));
  if (disponibles.length < cantidad) {
    usados.clear();
    disponibles = [...pool];
  }

  const seleccion = mezclar(disponibles).slice(0, cantidad);
  seleccion.forEach(q => usados.add(firmaPregunta(q)));
  localStorage.setItem(key, JSON.stringify([...usados].slice(-2500)));
  return seleccion;
}

// ═══════════════════════════════════════════════════════════════
//  GENERAR APP — función principal
// ═══════════════════════════════════════════════════════════════
function animateGenerate(btn) {
  const filename = (document.querySelector('.filename-input').value.trim() || 'autoevaluacion') + '';
  const finalFile = filename.endsWith('.html') ? filename : filename + '.html';
  const nq        = parseInt(document.getElementById('q-val').textContent);
  const lives     = parseInt(document.getElementById('lives-val').textContent.replace(/\D/g,''));
  const timeVal   = parseInt(document.getElementById('time-val').textContent.replace(/\D/g,''));

  const toggles = document.querySelectorAll('.toggle');
  const opts = {
    estrellas : toggles[0].classList.contains('on'),
    mascota   : toggles[1].classList.contains('on'),
    sonido    : toggles[2].classList.contains('on'),
    resultados: toggles[3].classList.contains('on'),
    guardar   : toggles[4].classList.contains('on'),
    voz       : toggles[5].classList.contains('on'),
  };

  const banco = PREGUNTAS[selectedMateria]?.[selectedTema] || [];
  const bancoExt = BANCO_EXT[selectedMateria]?.[selectedTema] || [];
  const bancoCombinado = [...banco, ...bancoExt];
  if (bancoCombinado.length === 0) {
    alert('No hay preguntas para ese tema todavía.');
    return;
  }

  // Normalizar y ampliar para lograr variaciones reales y evitar repetición.
  const raw         = mezclar(bancoCombinado);
  const normalizado = normalizarPreguntas(raw);
  const pool        = construirPoolOriginal(selectedMateria, selectedTema, normalizado, nq);
  const mezclado    = seleccionarSinRepetir(pool, nq, selectedMateria, selectedTema);

  if (mezclado.length < nq) {
    alert('No hay preguntas normalizables para ese tema.');
    return;
  }

  const html = generarHTMLApp({
    titulo: selectedTema, materia: selectedMateria,
    preguntas: mezclado, lives, timeVal,
    diff: selectedDiff, opts, filename: finalFile
  });

  // descargar
  const blob = new Blob([html], {type:'text/html;charset=utf-8'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = finalFile; a.click();
  URL.revokeObjectURL(url);

  // historial
  const ahora = new Date();
  const fecha = `${ahora.getHours().toString().padStart(2,'0')}:${ahora.getMinutes().toString().padStart(2,'0')}`;
  generatedHistory.push({filename: finalFile, mat: selectedMateria, nq: mezclado.length, diff: selectedDiff, fecha});
  localStorage.setItem('fab_historial', JSON.stringify(generatedHistory));

  // gamificación
  if (typeof gamifOnGenerate === 'function') { gamifOnGenerate(selectedMateria, selectedTema); gamifRender(); }

  // animación botón
  const original = btn.innerHTML;
  btn.innerHTML = '⚙️ GENERANDO...';
  btn.style.background = 'linear-gradient(135deg, #1E7A4A 0%, #145230 100%)';
  btn.style.boxShadow  = '0 4px 18px rgba(30,122,74,0.45)';
  setTimeout(() => {
    btn.innerHTML = `✅ DESCARGADO — ${finalFile}`;
    renderHistory();
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.style.boxShadow  = '';
    }, 3000);
  }, 700);
}


// ═══════════════════════════════════════════════════════════════
//  ESTADO Y UI DE LECCIONES
// ═══════════════════════════════════════════════════════════════
let selectedFmt = 'slides';
let aiEnabled   = false;
let aiAvailable = false;
let aiModels    = [];

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.toggle('active', p.id === 'pane-' + tab));
}

function selectFmt(card) {
  document.querySelectorAll('.fmt-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  selectedFmt = card.dataset.fmt;
}

function toggleAI(el) {
  if (!aiAvailable) {
    alert('Ollama no está corriendo. Para activar la IA local:\n\n1. Instalá Ollama desde https://ollama.com\n2. Abrí una terminal y ejecutá: ollama serve\n3. Descargá un modelo: ollama pull llama3.2:3b\n4. Recargá esta página');
    return;
  }
  aiEnabled = !aiEnabled;
  el.classList.toggle('on', aiEnabled);
  document.getElementById('ai-models').classList.toggle('show', aiEnabled);
}


// ═══════════════════════════════════════════════════════════════
//  GENERAR LECCIÓN — punto de entrada
// ═══════════════════════════════════════════════════════════════
async function generarLeccion(btn) {
  const filename = (document.querySelector('.filename-input-leccion').value.trim() || 'leccion') + '';
  const finalFile = filename.endsWith('.html') ? filename : filename + '.html';
  const opts = {
    tts:   document.getElementById('l-tts').classList.contains('on'),
    anim:  document.getElementById('l-anim').classList.contains('on'),
    check: document.getElementById('l-check').classList.contains('on'),
  };

  let leccion = LECCIONES[selectedMateria]?.[selectedTema];
  if (!leccion) {
    alert('No hay contenido de lección para ese tema todavía.\n\nTemas disponibles:\n' +
      Object.entries(LECCIONES).flatMap(([m,t]) => Object.keys(t).map(k => '· '+m+': '+k)).join('\n'));
    return;
  }

  const original = btn.innerHTML;

  // Si IA está activada, enriquecer la lección
  if (aiEnabled && aiAvailable) {
    btn.innerHTML = '🧠 IA generando contenido…';
    try {
      const modelo = document.getElementById('ai-model-sel').value;
      leccion = await enriquecerConIA(leccion, modelo);
    } catch (e) {
      console.warn('IA falló, usando contenido base:', e);
    }
  }

  let html = '';
  if (selectedFmt === 'slides')          html = generarSlides(leccion, selectedMateria, opts);
  else if (selectedFmt === 'resumen')    html = generarResumen(leccion, selectedMateria, opts);
  else if (selectedFmt === 'infografia') html = generarInfografia(leccion, selectedMateria, opts);
  else if (selectedFmt === 'animacion')  html = generarAnimacion(leccion, selectedMateria, opts);
  else if (selectedFmt === 'flashcards') html = generarFlashcards(leccion, selectedMateria, opts);
  else if (selectedFmt === 'memorice')   html = generarMemorice(leccion, selectedMateria, opts);

  // descargar
  const blob = new Blob([html], {type:'text/html;charset=utf-8'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = finalFile; a.click();
  URL.revokeObjectURL(url);

  // historial
  const ahora = new Date();
  const fecha = `${ahora.getHours().toString().padStart(2,'0')}:${ahora.getMinutes().toString().padStart(2,'0')}`;
  generatedHistory.push({filename: finalFile, mat: selectedMateria, tipo:'leccion-'+selectedFmt, fecha});
  localStorage.setItem('fab_historial', JSON.stringify(generatedHistory));

  // gamificación
  if (typeof gamifOnGenerate === 'function') { gamifOnGenerate(selectedMateria, selectedTema); gamifRender(); }

  btn.innerHTML = `✅ DESCARGADO — ${finalFile}`;
  setTimeout(() => { btn.innerHTML = original; renderHistory(); }, 2500);
}

// ═══════════════════════════════════════════════════════════════
//  GENERAR EJERCICIO DE MAPA
// ═══════════════════════════════════════════════════════════════
async function mapImgToDataUrl(path) {
  const res = await fetch(path, { cache: 'no-store' });
  if (!res.ok) throw new Error('No se pudo cargar el mapa: ' + path);
  const blob = await res.blob();
  return await new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = () => reject(new Error('No se pudo convertir mapa a data URL'));
    fr.readAsDataURL(blob);
  });
}

async function generarMapa(btn, mapKey) {
  if (typeof MAPAS === 'undefined' || !MAPAS[mapKey]) {
    alert('Mapa no disponible: ' + mapKey);
    return;
  }
  // Filtrar preguntas asociadas a este mapa
  const preguntas = (typeof PREGUNTAS_MAPAS !== 'undefined' ? PREGUNTAS_MAPAS : []).filter(p => p.mapa === mapKey);
  if (preguntas.length === 0) {
    alert('Este mapa todavía no tiene preguntas asociadas.');
    return;
  }

  let mapImg = MAPAS[mapKey].img;
  if (btn) {
    btn.disabled = true;
    btn.dataset.ogLabel = btn.dataset.ogLabel || btn.innerHTML;
    btn.innerHTML = '⏳ Preparando mapa...';
  }

  try {
    mapImg = await mapImgToDataUrl(MAPAS[mapKey].img);
  } catch (e) {
    // Fallback: URL absoluta al servidor actual si falla la incrustación.
    mapImg = new URL(MAPAS[mapKey].img, window.location.href).href;
  }

  const actividad = (typeof MAPA_DND !== 'undefined' && MAPA_DND[mapKey]) ? MAPA_DND[mapKey] : null;
  const html = tplMapa({ mapKey, titulo: MAPAS[mapKey].titulo, preguntas, mapImg, actividad });
  const filename = 'mapa_' + mapKey + '.html';
  const blob = new Blob([html], {type:'text/html;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);

  const ahora = new Date();
  const fecha = `${ahora.getHours().toString().padStart(2,'0')}:${ahora.getMinutes().toString().padStart(2,'0')}`;
  generatedHistory.push({filename, mat:'soc', tipo:'mapa', fecha});
  localStorage.setItem('fab_historial', JSON.stringify(generatedHistory));
  if (typeof gamifOnGenerate === 'function') { gamifOnGenerate('soc', mapKey); gamifRender(); }
  if (btn) {
    const og = btn.dataset.ogLabel || btn.innerHTML;
    btn.innerHTML = '✅ ' + filename;
    setTimeout(() => { btn.disabled = false; btn.innerHTML = og; renderHistory(); }, 2500);
  }
}

