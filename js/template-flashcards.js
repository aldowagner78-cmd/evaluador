// ═══════════════════════════════════════════════════════════════
//  TEMPLATE 5: FLASHCARDS — Tarjetas 3D con flip, modo estudio
// ═══════════════════════════════════════════════════════════════
function generarFlashcards(L, mat, opts) {
  const COLOR = colorMateria(mat);
  const ICON  = iconoMateria(mat);
  // Construir las cartas a partir de la lección: clave → texto, titulo → analogía
  const cards = (L.secciones || []).map((s, i) => ({
    front: s.titulo,
    back: s.texto + (s.clave ? '\n\n🔑 ' + s.clave : ''),
    hint: s.analogia ? '💡 ' + s.analogia : ''
  }));
  const dataJSON = JSON.stringify({titulo: L.titulo, objetivo: L.objetivo, cierre: L.cierre, cards});

  return `<!DOCTYPE html>
<html lang="es"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${L.titulo} — Flashcards</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Exo+2:wght@400;600&display=swap" rel="stylesheet">
<style>${cssBaseLeccion(COLOR)}
body{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:24px;min-height:100vh;background:radial-gradient(circle at 20% -10%, ${COLOR}22 0%, var(--bg) 50%)}
.fc-header{text-align:center;margin-bottom:18px;animation:fade .4s}
.fc-header h1{font-size:1.6rem}
.fc-header p{color:var(--dim);font-size:.9rem;margin-top:4px}
.fc-stage{perspective:1400px;width:100%;max-width:560px;height:340px;margin:14px 0}
.fc-card{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .55s cubic-bezier(.45,.05,.2,1.1);cursor:pointer}
.fc-card.flipped{transform:rotateY(180deg)}
.fc-face{position:absolute;inset:0;backface-visibility:hidden;border-radius:18px;padding:30px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;border:1px solid var(--border);box-shadow:0 12px 32px rgba(0,0,0,.12)}
.fc-front{background:linear-gradient(135deg,var(--primary),${COLOR}aa);color:#fff}
.fc-front h2{color:#fff;font-size:1.5rem;line-height:1.25;font-family:'Orbitron',sans-serif;letter-spacing:1px}
.fc-front .fc-hint{margin-top:18px;font-size:.85rem;opacity:.9;font-style:italic;max-width:90%}
.fc-front .fc-num{position:absolute;top:14px;right:18px;font-family:'JetBrains Mono',monospace;font-size:.85rem;opacity:.85}
.fc-front .fc-flip-hint{position:absolute;bottom:14px;font-size:.78rem;opacity:.85;letter-spacing:2px}
.fc-back{background:#fff;color:var(--text);transform:rotateY(180deg);overflow:auto}
.fc-back-text{font-size:1.02rem;line-height:1.55;white-space:pre-line}
.fc-controls{display:flex;align-items:center;gap:14px;margin-top:18px;flex-wrap:wrap;justify-content:center}
.fc-controls .btn{min-width:120px;padding:11px 18px}
.fc-progress{display:flex;gap:6px;margin:8px 0 4px;flex-wrap:wrap;justify-content:center;max-width:520px}
.fc-dot{width:14px;height:14px;border-radius:50%;background:var(--border);transition:all .25s}
.fc-dot.viewed{background:${COLOR}88}
.fc-dot.know{background:var(--green)}
.fc-dot.again{background:var(--yellow)}
.fc-dot.current{transform:scale(1.4);box-shadow:0 0 0 3px ${COLOR}33}
.fc-stats{display:flex;gap:16px;margin-top:6px;font-family:'JetBrains Mono',monospace;font-size:.85rem;color:var(--dim);flex-wrap:wrap;justify-content:center}
.fc-stats span b{color:var(--text)}
.fc-final{text-align:center;padding:30px;background:#fff;border-radius:18px;box-shadow:0 8px 28px rgba(0,0,0,.08);max-width:520px;margin-top:20px;animation:fade .5s}
.fc-final h2{font-size:1.6rem;margin-bottom:8px}
.fc-final .fc-bigicon{font-size:3.5rem;margin-bottom:10px}
.fc-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)}
.fc-row:last-child{border:none}
@keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media (max-width:560px){.fc-stage{height:280px}.fc-front h2{font-size:1.2rem}.fc-back-text{font-size:.95rem}}
</style></head><body>

<div class="fc-header">
  <div style="font-size:2.3rem">${ICON}</div>
  <h1>${L.titulo}</h1>
  <p>${L.objetivo}</p>
</div>

<div class="fc-progress" id="dots"></div>
<div class="fc-stats">
  <span>📖 Vistas: <b id="stat-viewed">0</b></span>
  <span>✅ Ya sé: <b id="stat-know">0</b></span>
  <span>🔁 Repasar: <b id="stat-again">0</b></span>
</div>

<div id="stage-wrap">
  <div class="fc-stage">
    <div class="fc-card" id="card" onclick="flip()">
      <div class="fc-face fc-front">
        <span class="fc-num" id="num"></span>
        <h2 id="front-title">…</h2>
        <p class="fc-hint" id="front-hint"></p>
        <p class="fc-flip-hint">↻ Tocá o presioná ESPACIO</p>
      </div>
      <div class="fc-face fc-back">
        <div class="fc-back-text" id="back-text">…</div>
      </div>
    </div>
  </div>

  <div class="fc-controls">
    <button class="btn btn-ghost" onclick="prev()">‹ Anterior</button>
    <button class="btn btn-primary" id="btn-again" onclick="mark('again')">🔁 Repasar</button>
    <button class="btn btn-primary" id="btn-know" onclick="mark('know')" style="background:var(--green)">✅ Ya sé</button>
    <button class="btn btn-ghost" onclick="next()">Siguiente ›</button>
  </div>
  <div class="fc-controls" style="margin-top:8px">
    <button class="btn btn-ghost" onclick="shuffle()">🔀 Mezclar</button>
    <button class="btn btn-ghost" onclick="reset()">↺ Reiniciar</button>
  </div>
</div>

<div id="final" style="display:none"></div>

<script>
const D = ${dataJSON};
let order = D.cards.map((_,i)=>i);
let idx = 0;
let flipped = false;
const status = new Map(); // i -> 'know' | 'again'

function render(){
  const ci = order[idx];
  const c = D.cards[ci];
  document.getElementById('num').textContent = (idx+1)+' / '+order.length;
  document.getElementById('front-title').textContent = c.front;
  document.getElementById('front-hint').textContent = c.hint || '';
  document.getElementById('back-text').textContent = c.back;
  flipped = false;
  document.getElementById('card').classList.remove('flipped');
  renderDots();
  renderStats();
  document.getElementById('final').style.display = 'none';
  document.getElementById('stage-wrap').style.display = '';
}

function renderDots(){
  const el = document.getElementById('dots');
  el.innerHTML = '';
  order.forEach((ci,i)=>{
    const d = document.createElement('div');
    d.className = 'fc-dot';
    if(i===idx) d.classList.add('current');
    if(status.get(ci)==='know') d.classList.add('know');
    else if(status.get(ci)==='again') d.classList.add('again');
    else if(i<idx) d.classList.add('viewed');
    d.onclick = ()=>{ idx=i; render(); };
    el.appendChild(d);
  });
}
function renderStats(){
  let viewed = idx + (flipped?1:0);
  let know=0, again=0;
  status.forEach(v=>{ if(v==='know') know++; else if(v==='again') again++; });
  document.getElementById('stat-viewed').textContent = Math.max(viewed, know+again);
  document.getElementById('stat-know').textContent = know;
  document.getElementById('stat-again').textContent = again;
}
function flip(){
  flipped = !flipped;
  document.getElementById('card').classList.toggle('flipped');
  renderStats();
}
function next(){ if(idx<order.length-1){idx++; render();} else final(); }
function prev(){ if(idx>0){idx--; render();} }
function mark(kind){
  const ci = order[idx];
  status.set(ci, kind);
  if(idx<order.length-1){idx++; render();} else final();
}
function shuffle(){
  order = [...order].sort(()=>Math.random()-0.5);
  idx = 0;
  render();
}
function reset(){
  order = D.cards.map((_,i)=>i);
  idx = 0; status.clear();
  render();
}
function final(){
  document.getElementById('stage-wrap').style.display = 'none';
  let know=0, again=0;
  status.forEach(v=>{ if(v==='know') know++; else if(v==='again') again++; });
  const total = D.cards.length;
  const pct = total>0 ? Math.round(know*100/total) : 0;
  let medal = pct>=90 ? '🏆' : pct>=70 ? '🥇' : pct>=50 ? '🥈' : '📚';
  const f = document.getElementById('final');
  f.innerHTML = '<div class="fc-final">'+
    '<div class="fc-bigicon">'+medal+'</div>'+
    '<h2>¡Sesión terminada!</h2>'+
    '<p style="color:var(--dim)">'+(D.cierre||'Excelente trabajo')+'</p>'+
    '<div style="margin-top:14px">'+
      '<div class="fc-row"><span>Tarjetas estudiadas</span><b>'+total+'</b></div>'+
      '<div class="fc-row"><span>✅ Ya sé</span><b>'+know+' ('+pct+'%)</b></div>'+
      '<div class="fc-row"><span>🔁 A repasar</span><b>'+again+'</b></div>'+
    '</div>'+
    '<div style="display:flex;gap:10px;margin-top:18px;justify-content:center;flex-wrap:wrap">'+
      '<button class="btn btn-primary" onclick="reviewOnlyAgain()">🔁 Practicar las que repaso</button>'+
      '<button class="btn btn-ghost" onclick="reset()">↺ Empezar de nuevo</button>'+
    '</div></div>';
  f.style.display = 'block';
  // postMessage al opener
  try{
    if(window.opener&&!window.opener.closed){
      window.opener.postMessage({type:'fab_score',ok:know,total,pct,mat:'${mat}',tema:'${L.titulo}'},'*');
    }
  }catch(e){}
}
function reviewOnlyAgain(){
  const again = [...status.entries()].filter(([_,v])=>v==='again').map(([k])=>k);
  if(again.length===0){alert('No marcaste ninguna como "repasar". ¡Bien hecho!');return;}
  order = again;
  idx = 0;
  status.clear();
  render();
}
document.addEventListener('keydown', e=>{
  if(document.getElementById('final').style.display==='block') return;
  if(e.key===' '||e.key==='Enter'){e.preventDefault();flip();}
  else if(e.key==='ArrowRight') next();
  else if(e.key==='ArrowLeft') prev();
  else if(e.key==='1') mark('again');
  else if(e.key==='2') mark('know');
});
render();
</script></body></html>`;
}
