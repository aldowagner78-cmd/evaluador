// ═══════════════════════════════════════════════════════════════
//  TEMPLATE: EJERCICIO DE MAPA — autoevaluación geográfica
// ═══════════════════════════════════════════════════════════════
function tplMapa(opts) {
  const { mapKey, titulo = "Ejercicio Geográfico", preguntas = [], mapImg = null, actividad = null } = opts;
  const mapa = (typeof MAPAS !== 'undefined') ? MAPAS[mapKey] : null;
  if (!mapa) return `<p>Mapa no encontrado: ${mapKey}</p>`;
  const imgSrc = mapImg || mapa.img;
  const dndTitle = actividad?.titulo || "Desafío drag and drop";

  function esc(txt) {
    return String(txt)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  const qs = preguntas.map((p, i) => {
    const optsHtml = p.opts.map((op, j) =>
      `<label class="opt"><input type="radio" name="mq${i}" value="${j}"><span>${esc(op)}</span></label>`
    ).join('');
    return `
    <div class="quiz-item" data-q="${i}" data-a="${p.a}" style="animation-delay:${(i + 2) * 60}ms">
      <div class="qtext">${i+1}. ${esc(p.q)}</div>
      <div class="opts">${optsHtml}</div>
      <div class="feedback"></div>
    </div>`;
  }).join('');

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${titulo}</title>
<style>
:root { --bg:#0d1117; --card:#161b22; --txt:#e6edf3; --acc:#58a6ff; --ok:#3fb950; --err:#f85149; --bord:#30363d; --gold:#fbbf24; }
* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; background: radial-gradient(circle at 10% -5%, #1b2a4a 0%, #0d1117 45%), var(--bg); color: var(--txt); }
h1 { color: var(--acc); margin-bottom: 8px; animation: rise .45s ease both; }
.descr { color: #8b949e; margin-bottom: 16px; animation: rise .45s ease both .08s; }
.map-wrap { background: var(--card); border: 1px solid var(--bord); border-radius: 12px; padding: 16px; margin-bottom: 18px; text-align: center; animation: rise .45s ease both .12s; }
.map-wrap img { max-width: 100%; max-height: 500px; border-radius: 8px; background: #fff; box-shadow: 0 12px 25px rgba(0, 0, 0, .35); }
.zoom-hint { font-size: 12px; color: #8b949e; margin-top: 8px; }
.dnd-block { background: linear-gradient(180deg, #161b22, #121821); border: 1px solid var(--bord); border-radius: 12px; padding: 14px; margin-bottom: 16px; animation: rise .45s ease both .16s; }
.dnd-title { font-weight: 800; color: #c9d1d9; margin-bottom: 10px; }
.dnd-layout { display: grid; grid-template-columns: 1.25fr .85fr; gap: 12px; }
.stage { position: relative; border: 1px solid var(--bord); border-radius: 10px; background: #0f141b; overflow: hidden; min-height: 280px; }
.stage img { width: 100%; height: auto; display: block; }
.targets { position: absolute; inset: 0; }
.target {
  position: absolute;
  transform: translate(-50%, -50%);
  width: min(24vw, 130px);
  min-height: 34px;
  border: 2px dashed rgba(88,166,255,.55);
  border-radius: 8px;
  background: rgba(13,17,23,.62);
  color: #8b949e;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4px;
}
.target.filled { border-style: solid; color: #e6edf3; }
.target.over { border-color: var(--acc); background: rgba(88,166,255,.22); transform: translate(-50%,-50%) scale(1.08); }
.target.correct { border-color: var(--ok); background: rgba(63,185,80,.16); animation: drop-ok .4s ease; }
.target.wrong { border-color: var(--err); background: rgba(248,81,73,.16); }
@keyframes drop-ok { 0%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.15)} 100%{transform:translate(-50%,-50%) scale(1)} }
.tray { border: 1px solid var(--bord); border-radius: 10px; background: #0f141b; padding: 10px; display: flex; flex-wrap: wrap; gap: 8px; align-content: flex-start; min-height: 160px; }
.piece {
  padding: 8px 10px;
  border: 1px solid var(--acc);
  border-radius: 999px;
  background: #17253a;
  color: #dbeafe;
  font-size: 13px;
  font-weight: 700;
  cursor: grab;
  user-select: none;
}
.piece:active { cursor: grabbing; }
.piece.done { opacity: .45; text-decoration: line-through; pointer-events: none; }
.dnd-actions { margin-top: 10px; display: flex; gap: 8px; flex-wrap: wrap; }
.dnd-feedback { margin-top: 8px; min-height: 22px; font-weight: 700; }
.hidden { display: none; }
.quiz-item { background: var(--card); border: 1px solid var(--bord); border-radius: 12px; padding: 18px; margin-bottom: 14px; animation: rise .4s ease both; }
.qtext { font-weight: 600; margin-bottom: 12px; font-size: 16px; }
.opts { display: flex; flex-direction: column; gap: 8px; }
.opt { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 1px solid var(--bord); border-radius: 8px; cursor: pointer; transition: .15s; }
.opt:hover { border-color: var(--acc); background: #1c2128; }
.opt input { accent-color: var(--acc); }
.feedback { margin-top: 12px; font-weight: 600; min-height: 20px; }
.ok { color: var(--ok); } .err { color: var(--err); }
.btn { background: var(--acc); color: #0d1117; border: 0; border-radius: 8px; padding: 12px 24px; font-weight: 700; cursor: pointer; font-size: 16px; margin-right: 8px; }
.btn:hover { filter: brightness(1.1); }
.score { background: var(--card); border: 2px solid var(--acc); border-radius: 12px; padding: 20px; margin-top: 20px; text-align: center; font-size: 18px; }
.locked { pointer-events: none; opacity: .85; }
@keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@media (max-width: 900px) {
  .dnd-layout { grid-template-columns: 1fr; }
  .target { width: min(38vw, 170px); font-size: 11px; }
}
</style></head>
<body>
<h1>🗺️ ${titulo}</h1>
<div class="descr">${mapa.descripcion}</div>
<div class="map-wrap">
  <img src="${imgSrc}" alt="${mapa.titulo}" onclick="this.requestFullscreen?.()">
  <div class="zoom-hint">💡 Hacé clic en el mapa para verlo en grande</div>
</div>

<div id="dndBlock" class="dnd-block ${actividad ? '' : 'hidden'}">
  <div class="dnd-title">🧩 ${esc(dndTitle)}</div>
  <div class="dnd-layout">
    <div class="stage" id="stage">
      <img src="${imgSrc}" alt="${mapa.titulo}">
      <div class="targets" id="targets"></div>
    </div>
    <div class="tray" id="tray"></div>
  </div>
  <div class="dnd-actions">
    <button class="btn" id="check-dnd" type="button">Validar Rompecabezas</button>
    <button class="btn" id="reset-dnd" type="button" style="background:#21262d;color:var(--txt);">Reiniciar Rompecabezas</button>
  </div>
  <div id="dnd-feedback" class="dnd-feedback"></div>
</div>

<div id="quiz">${qs}</div>
<div style="margin-top:20px;">
  <button class="btn" id="check">Corregir</button>
  <button class="btn" id="reset" style="background:#21262d;color:var(--txt);">Reiniciar</button>
</div>
<div id="score"></div>
<script>
const ACT = ${JSON.stringify(actividad || null)};
let __mapAC = null;
function __ac(){ if(!__mapAC) __mapAC = new (window.AudioContext||window.webkitAudioContext)(); return __mapAC; }
function sndDrop(){
  try{
    const ctx=__ac(),o=ctx.createOscillator(),g=ctx.createGain();
    o.connect(g);g.connect(ctx.destination);
    o.frequency.setValueAtTime(620,ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(380,ctx.currentTime+.12);
    g.gain.setValueAtTime(.18,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.18);
    o.start();o.stop(ctx.currentTime+.18);
  }catch(e){}
}
function sndWin(){
  try{
    const ctx=__ac();
    [523,659,784,1047].forEach((f,i)=>{
      const o=ctx.createOscillator(),g=ctx.createGain();
      o.connect(g);g.connect(ctx.destination);
      o.frequency.value=f;
      g.gain.setValueAtTime(.18,ctx.currentTime+i*.09);
      g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+i*.09+.32);
      o.start(ctx.currentTime+i*.09);o.stop(ctx.currentTime+i*.09+.32);
    });
  }catch(e){}
}
function launchMapConfetti(){
  let cv = document.getElementById('map-confetti');
  if(!cv){ cv = document.createElement('canvas'); cv.id='map-confetti'; cv.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:9999'; document.body.appendChild(cv); }
  cv.width=window.innerWidth;cv.height=window.innerHeight;
  const ctx=cv.getContext('2d');
  const cols=['#fbbf24','#3fb950','#58a6ff','#f471b5','#a78bfa'];
  const ps=Array.from({length:160},()=>({x:Math.random()*cv.width,y:-20,vx:(Math.random()-0.5)*4,vy:Math.random()*3+2,s:Math.random()*8+4,r:Math.random()*Math.PI*2,vr:(Math.random()-0.5)*0.2,c:cols[Math.floor(Math.random()*cols.length)]}));
  let frames=0;
  (function loop(){frames++;ctx.clearRect(0,0,cv.width,cv.height);ps.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.05;p.r+=p.vr;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*0.5);ctx.restore();});if(frames<260)requestAnimationFrame(loop);else ctx.clearRect(0,0,cv.width,cv.height);})();
}

function mezclar(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function crearPieza(label, index) {
  const piece = document.createElement('div');
  piece.className = 'piece';
  piece.draggable = true;
  piece.dataset.label = label;
  piece.id = 'piece-' + index;
  piece.textContent = label;
  piece.addEventListener('dragstart', ev => {
    ev.dataTransfer.setData('text/plain', piece.id);
  });
  return piece;
}

function initDnd() {
  if (!ACT || !Array.isArray(ACT.piezas)) return;
  const tray = document.getElementById('tray');
  const targets = document.getElementById('targets');
  tray.innerHTML = '';
  targets.innerHTML = '';

  mezclar(ACT.piezas).forEach((p, idx) => tray.appendChild(crearPieza(p.label, idx)));

  ACT.piezas.forEach((p, idx) => {
    const t = document.createElement('div');
    t.className = 'target';
    t.id = 'target-' + idx;
    t.dataset.expected = p.label;
    t.textContent = 'Soltá aquí';
    t.style.left = p.x + '%';
    t.style.top = p.y + '%';

    t.addEventListener('dragover', ev => { ev.preventDefault(); t.classList.add('over'); });
    t.addEventListener('dragleave', () => t.classList.remove('over'));
    t.addEventListener('drop', ev => {
      ev.preventDefault();
      t.classList.remove('over');
      const id = ev.dataTransfer.getData('text/plain');
      const piece = document.getElementById(id);
      if (!piece || piece.classList.contains('done')) return;
      if (t.dataset.value) return;

      t.dataset.value = piece.dataset.label;
      t.textContent = piece.dataset.label;
      t.classList.add('filled');
      piece.classList.add('done');
      piece.remove();
      t.classList.remove('correct', 'wrong');
      document.getElementById('dnd-feedback').textContent = '';
      sndDrop();
      // mini animación al asentar
      t.animate([{transform:'scale(1.18)'},{transform:'scale(1)'}],{duration:280,easing:'cubic-bezier(.34,1.56,.64,1)'});
    });
    targets.appendChild(t);
  });
}

function evaluarDnd() {
  if (!ACT || !Array.isArray(ACT.piezas)) return { ok: 0, total: 0, pct: 0 };
  const all = [...document.querySelectorAll('.target')];
  let ok = 0;
  all.forEach(t => {
    const isOk = t.dataset.value && t.dataset.value === t.dataset.expected;
    t.classList.toggle('correct', !!isOk);
    t.classList.toggle('wrong', !!t.dataset.value && !isOk);
    if (isOk) ok++;
  });
  const total = all.length;
  const pct = total ? Math.round((ok * 100) / total) : 0;
  const fb = document.getElementById('dnd-feedback');
  fb.className = 'dnd-feedback ' + (pct >= 70 ? 'ok' : 'err');
  fb.textContent = 'Rompecabezas: ' + ok + '/' + total + ' (' + pct + '%)';
  return { ok, total, pct };
}

function resetDnd() {
  initDnd();
  document.getElementById('dnd-feedback').textContent = '';
}

document.getElementById('check-dnd')?.addEventListener('click', evaluarDnd);
document.getElementById('reset-dnd')?.addEventListener('click', resetDnd);
initDnd();

document.getElementById('check').addEventListener('click', () => {
  let ok = 0, total = 0;
  document.querySelectorAll('.quiz-item').forEach(item => {
    total++;
    const a = parseInt(item.dataset.a);
    const sel = item.querySelector('input:checked');
    const fb = item.querySelector('.feedback');
    if (!sel) { fb.textContent = '⚠️ Sin responder'; fb.className = 'feedback err'; return; }
    const v = parseInt(sel.value);
    if (v === a) {
      fb.textContent = '✓ ¡Correcto!'; fb.className = 'feedback ok'; ok++;
    } else {
      const correct = item.querySelectorAll('.opt')[a].textContent.trim();
      fb.textContent = '✗ Correcto: ' + correct; fb.className = 'feedback err';
    }
    item.classList.add('locked');
  });

  const dnd = evaluarDnd();
  ok += dnd.ok;
  total += dnd.total;

  const pct = Math.round(100 * ok / total);
  let msg = pct === 100 ? '🏆 ¡PERFECTO!' : pct >= 70 ? '👏 ¡Muy bien!' : pct >= 50 ? '💪 Bien, podés mejorar' : '📚 Repasá el mapa y volvé a intentarlo';
  document.getElementById('score').innerHTML = '<div class="score"><strong>' + msg + '</strong><br>' + ok + ' / ' + total + ' (' + pct + '%)</div>';
  if(pct===100){ sndWin(); launchMapConfetti(); }
  // Guardar racha en localStorage padre si existe (postMessage al opener)
  try {
    if (window.opener) window.opener.postMessage({ type: 'fab_score', ok, total, pct, mat: 'soc', tema: '${mapKey}' }, '*');
  } catch(e) {}
});
document.getElementById('reset').addEventListener('click', () => {
  document.querySelectorAll('input:checked').forEach(i => i.checked = false);
  document.querySelectorAll('.feedback').forEach(f => { f.textContent = ''; f.className = 'feedback'; });
  document.querySelectorAll('.quiz-item').forEach(q => q.classList.remove('locked'));
  resetDnd();
  document.getElementById('score').innerHTML = '';
});
</script>
</body></html>`;
}
