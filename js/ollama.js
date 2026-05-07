// ═══════════════════════════════════════════════════════════════
//  OLLAMA — detección + consulta + enriquecimiento
// ═══════════════════════════════════════════════════════════════
async function detectOllama() {
  const dot = document.getElementById('ai-dot');
  const txt = document.getElementById('ai-status-text');
  const sel = document.getElementById('ai-model-sel');
  try {
    const r = await fetch('http://localhost:11434/api/tags', { signal: AbortSignal.timeout(2000) });
    if (!r.ok) throw new Error('no ok');
    const data = await r.json();
    aiAvailable = true;
    aiModels = (data.models || []).map(m => m.name);
    dot.classList.add('online'); dot.classList.remove('offline');
    if (aiModels.length > 0) {
      txt.innerHTML = '✅ Ollama activo · <span style="color:var(--green)">' + aiModels.length + ' modelo' + (aiModels.length>1?'s':'') + '</span>';
      sel.innerHTML = aiModels.map(m => '<option value="'+m+'">'+m+'</option>').join('');
    } else {
      txt.innerHTML = '⚠️ Ollama corriendo pero <span style="color:var(--yellow)">sin modelos</span>. Ejecutá: <code>ollama pull llama3.2:3b</code>';
    }
  } catch (e) {
    aiAvailable = false;
    dot.classList.add('offline'); dot.classList.remove('online');
    txt.innerHTML = '⚪ Ollama offline (opcional)';
  }
}

async function consultarOllama(prompt, modelo) {
  const r = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ model: modelo, prompt, stream: false })
  });
  const data = await r.json();
  return data.response || '';
}

async function enriquecerConIA(leccion, modelo) {
  // Pide a la IA que reformule analogías para hacerlas más cercanas a un niño de 11 años
  const out = JSON.parse(JSON.stringify(leccion));
  for (const sec of out.secciones) {
    const prompt = `Sos un maestro de 6° grado argentino. Reescribí esta analogía en 1-2 oraciones cortas, simples, que un chico de 11 años entendería. Usá español rioplatense. Devolvé SOLO la analogía, sin introducción.

Concepto: ${sec.titulo}
Analogía actual: ${sec.analogia}

Nueva analogía:`;
    try {
      const nueva = await consultarOllama(prompt, modelo);
      const limpia = nueva.trim().replace(/^["']|["']$/g, '').split('\n')[0];
      if (limpia.length > 10 && limpia.length < 300) sec.analogia = limpia;
    } catch (e) { /* sigue con la original */ }
  }
  return out;
}

