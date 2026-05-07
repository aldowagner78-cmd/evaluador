// ═══════════════════════════════════════════════════════════════
//  TEMPLATE 6: MEMORICE — Memory match: concepto ↔ ejemplo
// ═══════════════════════════════════════════════════════════════
function generarMemorice(L, mat, opts) {
  const COLOR = colorMateria(mat);
  const ICON  = iconoMateria(mat);
  // Construir pares: cada sección genera un par (titulo, analogia)
  const pairs = (L.secciones || [])
    .filter(s => s.titulo && s.analogia)
    .slice(0, 8)
    .map((s, i) => ({
      id: i,
      a: { kind: 'concepto', text: s.titulo },
      b: { kind: 'ejemplo',  text: s.analogia.length > 90 ? s.analogia.slice(0, 87) + '…' : s.analogia }
    }));
  const dataJSON = JSON.stringify({titulo: L.titulo, objetivo: L.objetivo, cierre: L.cierre, pairs});

  return `<!DOCTYPE html>
<html lang="es"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${L.titulo} — Memorice</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Exo+2:wght@400;600&display=swap" rel="stylesheet">
<style>${cssBaseLeccion(COLOR)}
body{padding:24px;min-height:100vh;background:radial-gradient(circle at 20% -10%, ${COLOR}22 0%, var(--bg) 50%);display:flex;flex-direction:column;align-items:center}
.mm-header{text-align:center;margin-bottom:14px}
.mm-header h1{font-size:1.6rem}
.mm-header p{color:var(--dim);margin-top:4px}
.mm-hud{display:flex;gap:18px;margin-bottom:14px;background:#fff;border:1px solid var(--border);border-radius:12px;padding:10px 18px;font-family:'JetBrains Mono',monospace}
.mm-hud span b{color:var(--primary)}
.mm-board{display:grid;grid-template-columns:repeat(4,minmax(120px,1fr));gap:12px;width:100%;max-width:760px}
.mm-card{aspect-ratio:3/4;perspective:1000px;cursor:pointer}
.mm-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .5s cubic-bezier(.45,.05,.2,1.1)}
.mm-card.flip .mm-inner{transform:rotateY(180deg)}
.mm-card.matched .mm-inner{transform:rotateY(180deg)}
.mm-face{position:absolute;inset:0;backface-visibility:hidden;border-radius:14px;display:flex;align-items:center;justify-content:center;padding:8px;text-align:center;font-size:.85rem;font-weight:600;border:1px solid var(--border);overflow:hidden}
.mm-front{background:linear-gradient(135deg,var(--primary),${COLOR}aa);color:#fff;font-size:1.8rem;font-family:'Orbitron',sans-serif}
.mm-back{background:#fff;color:var(--text);transform:rotateY(180deg);font-family:'Exo 2',sans-serif;line-height:1.25}
.mm-back .mm-tag{position:absolute;top:6px;left:6px;font-size:.6rem;background:${COLOR}22;color:var(--primary);padding:2px 6px;border-radius:6px;font-weight:700;letter-spacing:1px}
.mm-card.matched .mm-back{border-color:var(--green);box-shadow:0 0 0 2px var(--green)33;background:#1E7A4A0d}
.mm-card.wrong .mm-back{animation:wrongShake .4s}
@keyframes wrongShake{0%,100%{transform:rotateY(180deg) translateX(0)}25%{transform:rotateY(180deg) translateX(-6px)}75%{transform:rotateY(180deg) translateX(6px)}}
.mm-actions{display:flex;gap:10px;margin-top:18px;flex-wrap:wrap;justify-content:center}
.mm-final{text-align:center;padding:28px;background:#fff;border:1px solid var(--border);border-radius:16px;margin-top:20px;animation:popIn .5s}
.mm-final h2{font-size:1.6rem;margin-bottom:6px}
.mm-final .icon{font-size:3.6rem;margin-bottom:10px}
@keyframes popIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:scale(1)}}
canvas#mm-confetti{position:fixed;inset:0;pointer-events:none;z-index:8}
@media (max-width:560px){.mm-board{grid-template-columns:repeat(3,1fr)}.mm-front{font-size:1.4rem}.mm-back{font-size:.78rem}}
</style></head><body>

<canvas id="mm-confetti"></canvas>

<div class="mm-header">
  <div style="font-size:2.3rem">${ICON}</div>
  <h1>🧠 Memorice — ${L.titulo}</h1>
  <p>Encontrá las parejas: concepto + ejemplo</p>
</div>

<div class="mm-hud">
  <span>⏱ <b id="hud-time">0s</b></span>
  <span>🎯 <b id="hud-pairs">0</b>/<b id="hud-total">0</b></span>
  <span>🔁 <b id="hud-moves">0</b></span>
</div>

<div class="mm-board" id="board"></div>

<div class="mm-actions">
  <button class="btn btn-primary" onclick="reset()">🔄 Reiniciar</button>
  <button class="btn btn-ghost" onclick="peek()">👀 Ver 2s</button>
</div>

<div id="final"></div>

<script>
const D = ${dataJSON};
let cards = [];
let opened = [];
let moves = 0;
let matched = 0;
let totalPairs = D.pairs.length;
let startTime = 0, timer = null;
let lock = false;

function build(){
  cards = [];
  D.pairs.forEach(p=>{
    cards.push({pid:p.id, kind:'a', text:p.a.text, tag:'concepto'});
    cards.push({pid:p.id, kind:'b', text:p.b.text, tag:'ejemplo'});
  });
  cards = cards.sort(()=>Math.random()-0.5);
}

function render(){
  const b = document.getElementById('board');
  b.innerHTML = '';
  document.getElementById('hud-total').textContent = totalPairs;
  document.getElementById('hud-pairs').textContent = matched;
  document.getElementById('hud-moves').textContent = moves;
  cards.forEach((c,i)=>{
    const card = document.createElement('div');
    card.className = 'mm-card';
    card.dataset.idx = i;
    card.innerHTML = '<div class="mm-inner">'+
      '<div class="mm-face mm-front">?</div>'+
      '<div class="mm-face mm-back"><span class="mm-tag">'+c.tag+'</span><div>'+c.text+'</div></div>'+
    '</div>';
    card.addEventListener('click', ()=>open(i, card));
    b.appendChild(card);
  });
  document.getElementById('final').innerHTML = '';
}

function open(i, el){
  if(lock) return;
  if(el.classList.contains('flip')||el.classList.contains('matched')) return;
  el.classList.add('flip');
  opened.push({i, el});
  if(opened.length===2){
    moves++;
    document.getElementById('hud-moves').textContent = moves;
    const [x, y] = opened;
    if(cards[x.i].pid === cards[y.i].pid && cards[x.i].kind !== cards[y.i].kind){
      x.el.classList.add('matched');
      y.el.classList.add('matched');
      matched++;
      document.getElementById('hud-pairs').textContent = matched;
      opened = [];
      if(matched===totalPairs) win();
    }else{
      lock = true;
      x.el.classList.add('wrong');
      y.el.classList.add('wrong');
      setTimeout(()=>{
        x.el.classList.remove('flip','wrong');
        y.el.classList.remove('flip','wrong');
        opened = [];
        lock = false;
      }, 850);
    }
  }
}

function startTimer(){
  startTime = Date.now();
  clearInterval(timer);
  timer = setInterval(()=>{
    const s = Math.round((Date.now()-startTime)/1000);
    document.getElementById('hud-time').textContent = s+'s';
  }, 250);
}

function reset(){
  opened = []; moves = 0; matched = 0; lock = false;
  build(); render(); startTimer();
}

function peek(){
  const cs = document.querySelectorAll('.mm-card');
  cs.forEach(c=>c.classList.add('flip'));
  lock = true;
  setTimeout(()=>{
    cs.forEach(c=>{ if(!c.classList.contains('matched')) c.classList.remove('flip'); });
    lock = false;
  }, 2000);
}

function win(){
  clearInterval(timer);
  const totalSec = Math.round((Date.now()-startTime)/1000);
  // puntaje: 100 si moves <= totalPairs*1.5, ajusta según extra
  const ideal = totalPairs * 2;
  const efficiency = Math.max(0, Math.min(100, Math.round((ideal*100)/Math.max(moves, ideal))));
  const f = document.getElementById('final');
  let medal = efficiency>=85?'🥇':efficiency>=65?'🥈':efficiency>=45?'🥉':'📚';
  f.innerHTML = '<div class="mm-final">'+
    '<div class="icon">'+medal+'</div>'+
    '<h2>¡Lo lograste!</h2>'+
    '<p style="color:var(--dim);margin:6px 0">'+(D.cierre||'Excelente memoria')+'</p>'+
    '<div style="margin:14px 0;font-family:\\'JetBrains Mono\\',monospace">'+
      '<div>⏱ Tiempo: <b>'+totalSec+'s</b></div>'+
      '<div>🔁 Movimientos: <b>'+moves+'</b> (ideal '+ideal+')</div>'+
      '<div>📊 Eficiencia: <b>'+efficiency+'%</b></div>'+
    '</div>'+
    '<button class="btn btn-primary" onclick="reset()">🔄 Jugar de nuevo</button>'+
  '</div>';
  if(efficiency>=70) launchConfetti();
  // postMessage
  try{
    if(window.opener&&!window.opener.closed){
      window.opener.postMessage({type:'fab_score',ok:totalPairs,total:totalPairs,pct:efficiency,mat:'${mat}',tema:'${L.titulo}'},'*');
    }
  }catch(e){}
}

function launchConfetti(){
  const cv=document.getElementById('mm-confetti');
  cv.width=window.innerWidth;cv.height=window.innerHeight;
  const ctx=cv.getContext('2d');
  const cols=['#fbbf24','#3fb950','#58a6ff','#f471b5','#a78bfa'];
  const ps=Array.from({length:140},()=>({
    x:Math.random()*cv.width,y:-20,
    vx:(Math.random()-0.5)*4,vy:Math.random()*3+2,
    s:Math.random()*8+4,r:Math.random()*Math.PI*2,vr:(Math.random()-0.5)*0.2,
    c:cols[Math.floor(Math.random()*cols.length)]
  }));
  let frames=0;
  (function loop(){
    frames++;
    ctx.clearRect(0,0,cv.width,cv.height);
    ps.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.vy+=0.05;p.r+=p.vr;
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);
      ctx.fillStyle=p.c;ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*0.5);
      ctx.restore();
    });
    if(frames<240)requestAnimationFrame(loop);
  })();
}

if(totalPairs<3){
  document.body.innerHTML='<div style="padding:30px;text-align:center"><h2>⚠️ Memorice no disponible</h2><p style="margin-top:12px;color:var(--dim)">Esta lección no tiene suficientes secciones (mínimo 3) para generar un memorice. Probá con otra lección.</p></div>';
}else{
  reset();
}
</script></body></html>`;
}
