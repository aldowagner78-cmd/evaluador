// ═══════════════════════════════════════════════════════════════
//  CONSTRUIR HTML STANDALONE DEL APP — Autoevaluación
//  v2: confetti, racha, atajos teclado 1-4, animaciones, revisión.
// ═══════════════════════════════════════════════════════════════
function generarHTMLApp({titulo, materia, preguntas, lives, timeVal, diff, opts, filename}) {
  const colores = {mat:'#1A6DB5', len:'#B0266A', nat:'#1E7A4A', soc:'#9A6C0A'};
  const COLOR   = colores[materia] || '#1A6DB5';
  const TOTAL   = preguntas.length;
  const STARS   = diff === 'easy' ? 5 : diff === 'hard' ? 20 : 10;
  const matIcon = {mat:'🔢', len:'📖', nat:'🔬', soc:'🌎'}[materia] || '📚';
  const preguntasJSON = JSON.stringify(preguntas);

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${titulo} — 6° Grado</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Exo+2:wght@400;600&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--primary:${COLOR};--bg:#F0F4F8;--bg2:#E6EBF2;--bg3:#DAE1EC;--border:#C0CCDB;--text:#2C3E50;--dim:#7F8C9A;--green:#1E7A4A;--red:#C0392B;--yellow:#9A6C0A}
body{background:radial-gradient(circle at 18% -10%, ${COLOR}22 0%, var(--bg) 45%);color:var(--text);font-family:'Exo 2',sans-serif;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;overflow-x:hidden}
.screen{display:none;width:100%;max-width:640px;animation:fi .35s ease}
.screen.active{display:flex;flex-direction:column;gap:14px}
@keyframes fi{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
h1{font-family:'Orbitron',sans-serif;font-size:1.55rem;color:var(--primary);text-align:center;letter-spacing:1px}
h2{font-family:'Orbitron',sans-serif;font-size:1rem;color:var(--primary)}
.card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:22px;box-shadow:0 4px 18px rgba(0,0,0,0.07)}
.btn{width:100%;padding:14px;border:none;border-radius:10px;font-family:'Orbitron',sans-serif;font-weight:700;font-size:.9rem;letter-spacing:2px;cursor:pointer;transition:all .18s}
.btn-primary{background:var(--primary);color:#fff;box-shadow:0 4px 14px ${COLOR}55}
.btn-primary:hover{filter:brightness(1.06);transform:translateY(-1px)}
.btn-ghost{background:#fff;color:var(--text);border:1px solid var(--border)}
.btn-ghost:hover{border-color:var(--primary);color:var(--primary)}
.btn-opt{background:#fff;color:var(--text);border:2px solid var(--border);border-radius:10px;padding:13px 16px;text-align:left;cursor:pointer;font-family:'Exo 2',sans-serif;font-size:.96rem;transition:all .18s;width:100%;margin-bottom:8px;display:flex;align-items:center;gap:10px;animation:opt-in .35s ease backwards}
.btn-opt .kbd{flex:0 0 28px;height:28px;border-radius:6px;background:var(--bg2);border:1px solid var(--border);font-family:'JetBrains Mono',monospace;font-size:.78rem;display:flex;align-items:center;justify-content:center;color:var(--dim);font-weight:700}
.btn-opt:hover{border-color:var(--primary);color:var(--primary);transform:translateX(4px)}
.btn-opt.correct{border-color:var(--green)!important;background:rgba(30,122,74,.10)!important;color:var(--green)!important;pointer-events:none;animation:pulse-ok .55s ease}
.btn-opt.wrong{border-color:var(--red)!important;background:rgba(192,57,43,.10)!important;color:var(--red)!important;pointer-events:none;animation:shake .45s ease}
@keyframes pulse-ok{0%{transform:scale(1)}40%{transform:scale(1.04)}100%{transform:scale(1)}}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
@keyframes opt-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
#q-text{white-space:pre-line}
.hud{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;background:#fff;border:1px solid var(--border);border-radius:10px;font-family:'JetBrains Mono',monospace;font-size:.95rem;flex-wrap:wrap;gap:6px}
.hud > span{display:inline-flex;align-items:center;gap:4px}
.tbar{height:8px;border-radius:4px;background:var(--border);overflow:hidden}
.tfill{height:100%;background:linear-gradient(90deg,var(--primary),${COLOR}cc);transition:width 1s linear;border-radius:4px}
.fb{text-align:center;padding:12px;border-radius:10px;font-weight:700;animation:fi .3s ease}
.fb.ok{background:rgba(30,122,74,.14);color:var(--green);border:1px solid rgba(30,122,74,.2)}
.fb.fail{background:rgba(192,57,43,.14);color:var(--red);border:1px solid rgba(192,57,43,.2)}
.mascot{text-align:center;font-size:3.2rem}
.mascot.b{animation:bnc .4s}
@keyframes bnc{0%,100%{transform:scale(1)}50%{transform:scale(1.25)}}
.stat-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:.92rem}
.streak{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#111;padding:3px 10px;border-radius:999px;font-weight:900;font-size:.78rem}
.review-item{background:#fff;border:1px solid var(--border);border-radius:10px;padding:12px 14px;margin-bottom:10px;text-align:left}
.review-item .rq{font-weight:600;margin-bottom:6px}
.review-item .ra{color:var(--green);font-size:.86rem}
.review-item .rw{color:var(--red);font-size:.86rem;text-decoration:line-through;margin-right:8px}
canvas#confetti{position:fixed;inset:0;pointer-events:none;z-index:9}
@media (max-width: 480px){
  body{padding:12px}
  h1{font-size:1.25rem}
  .btn-opt{padding:11px 12px;font-size:.92rem}
  .hud{font-size:.85rem;padding:8px 10px}
}
</style>
</head>
<body>

<canvas id="confetti"></canvas>

<div class="screen active" id="s-intro">
  <div class="card" style="text-align:center;padding:36px 24px">
    <div style="font-size:3rem;margin-bottom:12px">${matIcon}</div>
    <h1>${titulo}</h1>
    <p style="margin-top:10px;color:var(--dim)">Autoevaluación · 6° Grado</p>
    <p style="margin-top:6px;font-size:.82rem;color:var(--dim)">${TOTAL} preguntas · ${lives} vida${lives>1?'s':''} · ${timeVal}s c/u · Dificultad: ${diff==='easy'?'Fácil':diff==='hard'?'Difícil':'Normal'}</p>
    <p style="margin-top:14px;font-size:.78rem;color:var(--dim)">Tip: usá las teclas <b>1·2·3·4</b> para responder más rápido</p>
  </div>
  ${opts.mascota?'<div class="mascot">🤖</div>':''}
  <button class="btn btn-primary" onclick="startGame()">⚡ EMPEZAR</button>
</div>

<div class="screen" id="s-game">
  <div class="hud">
    <span id="h-lives">${'❤️'.repeat(lives)}</span>
    ${opts.estrellas?'<span id="h-stars" style="color:var(--yellow)">⭐ 0</span>':''}
    <span id="h-streak" class="streak" style="display:none">🔥 0</span>
    <span id="h-prog">1/${TOTAL}</span>
  </div>
  <div class="tbar"><div class="tfill" id="tfill"></div></div>
  ${opts.mascota?'<div class="mascot" id="mascot">🤖</div>':''}
  <div class="card">
    <p style="font-size:.73rem;color:var(--dim);margin-bottom:10px" id="q-num">Pregunta 1 de ${TOTAL}</p>
    <h2 id="q-text" style="font-size:1.05rem;line-height:1.55;font-family:'Exo 2',sans-serif;font-weight:600">…</h2>
  </div>
  <div id="opts"></div>
  <div class="fb" id="fb" style="display:none"></div>
</div>

<div class="screen" id="s-result">
  <div class="card" style="text-align:center;padding:30px">
    <div id="r-medal" style="font-size:4rem"></div>
    <h1 id="r-title" style="margin-top:12px"></h1>
    <p id="r-sub" style="color:var(--dim);margin-top:8px"></p>
  </div>
  <div class="card" id="r-stats"></div>
  <div id="r-review"></div>
  <button class="btn btn-primary" onclick="startGame()">🔄 JUGAR DE NUEVO</button>
  <button class="btn btn-ghost" onclick="toggleReview()" id="btn-review" style="display:none">📑 Revisar errores</button>
</div>

<script>
const QS=${preguntasJSON};
const C={lives:${lives},time:${timeVal},total:${TOTAL},stars:${STARS},
  snd:${opts.sonido},msc:${opts.mascota},str:${opts.estrellas},sav:${opts.guardar},voz:${opts.voz}};
let S={};let ti=null;let ac=null;

function ac_ctx(){if(!ac)ac=new(window.AudioContext||window.webkitAudioContext)();return ac;}
function snd(t){
  if(!C.snd)return;
  try{
    const ctx=ac_ctx(),o=ctx.createOscillator(),g=ctx.createGain();
    o.connect(g);g.connect(ctx.destination);
    if(t==='ok'){
      o.frequency.setValueAtTime(523,ctx.currentTime);
      o.frequency.setValueAtTime(659,ctx.currentTime+.1);
      o.frequency.setValueAtTime(784,ctx.currentTime+.2);
      g.gain.setValueAtTime(.28,ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.5);
      o.start();o.stop(ctx.currentTime+.5);
    }else if(t==='fail'){
      o.frequency.setValueAtTime(220,ctx.currentTime);
      o.frequency.setValueAtTime(170,ctx.currentTime+.15);
      g.gain.setValueAtTime(.28,ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.4);
      o.start();o.stop(ctx.currentTime+.4);
    }else if(t==='win'){
      [523,587,659,784,988,1047].forEach((f,i)=>{
        const o2=ctx.createOscillator(),g2=ctx.createGain();
        o2.connect(g2);g2.connect(ctx.destination);
        o2.frequency.value=f;
        g2.gain.setValueAtTime(.18,ctx.currentTime+i*.09);
        g2.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+i*.09+.32);
        o2.start(ctx.currentTime+i*.09);o2.stop(ctx.currentTime+i*.09+.32);
      });
    }else if(t==='streak'){
      o.frequency.setValueAtTime(880,ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(1760,ctx.currentTime+.18);
      g.gain.setValueAtTime(.22,ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.25);
      o.start();o.stop(ctx.currentTime+.25);
    }
  }catch(e){}
}
function speak(t){
  if(!C.voz||!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(t);
  u.lang='es-AR';u.rate=.95;
  window.speechSynthesis.speak(u);
}
function mascot(e){
  if(!C.msc)return;
  const m=document.getElementById('mascot');if(!m)return;
  const f={n:'🤖',ok:'😄',fail:'😢',win:'🤩',think:'🤔',fire:'🔥'};
  m.textContent=f[e]||'🤖';
  m.classList.remove('b');void m.offsetWidth;m.classList.add('b');
}
function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function startGame(){
  S={idx:0,lives:C.lives,stars:0,correct:0,wrong:0,done:false,streak:0,bestStreak:0,errors:[]};
  document.getElementById('btn-review').style.display='none';
  document.getElementById('r-review').innerHTML='';
  show('s-game');renderQ();
}
function renderQ(){
  if(S.idx>=QS.length||S.lives<=0){endGame();return;}
  S.done=false;
  const q=QS[S.idx];
  document.getElementById('q-num').textContent='Pregunta '+(S.idx+1)+' de '+C.total;
  document.getElementById('q-text').innerText=q.q;
  document.getElementById('h-prog').textContent=(S.idx+1)+'/'+C.total;
  updLives();updStreak();
  if(C.str)document.getElementById('h-stars').textContent='⭐ '+S.stars;
  const oc=document.getElementById('opts');oc.innerHTML='';
  q.opts.forEach((o,i)=>{
    const b=document.createElement('button');
    b.className='btn-opt';
    b.style.animationDelay=(i*60)+'ms';
    b.innerHTML='<span class="kbd">'+(i+1)+'</span><span>'+o+'</span>';
    b.onclick=()=>check(i,b,q);
    b.dataset.i=i;
    oc.appendChild(b);
  });
  document.getElementById('fb').style.display='none';
  mascot('think');
  if(C.voz)speak(q.q);
  startTimer();
}
function startTimer(){
  clearInterval(ti);
  const f=document.getElementById('tfill');
  f.style.transition='none';f.style.width='100%';
  let el=0;
  setTimeout(()=>{f.style.transition='width '+C.time+'s linear';f.style.width='0%';},50);
  ti=setInterval(()=>{el++;if(el>=C.time){clearInterval(ti);if(!S.done)timeout();}},1000);
}
function timeout(){
  S.done=true;S.lives--;S.wrong++;S.streak=0;
  snd('fail');mascot('fail');
  const q=QS[S.idx];markOk(q.a);
  fb(false,'⏱ ¡Tiempo! Era: '+q.opts[q.a]);
  S.errors.push({q:q.q,opts:q.opts,correct:q.a,chosen:-1});
  updLives();updStreak();next();
}
function check(i,btn,q){
  if(S.done)return;S.done=true;clearInterval(ti);
  if(i===q.a){
    S.correct++;
    let bonus=C.stars;
    S.streak++;
    if(S.streak>=3){bonus+=Math.min(15, (S.streak-2)*5);}
    if(S.streak>S.bestStreak)S.bestStreak=S.streak;
    S.stars+=bonus;
    snd(S.streak>=3?'streak':'ok');
    mascot(S.streak>=3?'fire':'ok');
    btn.classList.add('correct');
    fb(true,'✅ ¡Correcto! +'+bonus+' ⭐'+(S.streak>=3?' · 🔥 Racha x'+S.streak:''));
  }else{
    S.lives--;S.wrong++;S.streak=0;snd('fail');mascot('fail');
    btn.classList.add('wrong');markOk(q.a);
    fb(false,'❌ Era: '+q.opts[q.a]);updLives();
    S.errors.push({q:q.q,opts:q.opts,correct:q.a,chosen:i});
  }
  if(C.str)document.getElementById('h-stars').textContent='⭐ '+S.stars;
  updStreak();
  next();
}
function markOk(i){
  const bs=document.querySelectorAll('#opts .btn-opt');
  if(bs[i])bs[i].classList.add('correct');
}
function fb(ok,msg){
  const el=document.getElementById('fb');
  el.textContent=msg;el.className='fb '+(ok?'ok':'fail');el.style.display='block';
}
function updLives(){
  const hl=document.getElementById('h-lives');
  if(hl)hl.textContent='❤️'.repeat(Math.max(0,S.lives))+(S.lives<=0?' 💀':'');
}
function updStreak(){
  const hs=document.getElementById('h-streak');
  if(!hs)return;
  if(S.streak>=2){hs.style.display='inline-flex';hs.textContent='🔥 '+S.streak;}
  else{hs.style.display='none';}
}
function next(){setTimeout(()=>{if(S.lives<=0){endGame();return;}S.idx++;renderQ();},1500);}
function endGame(){
  clearInterval(ti);
  if(window.speechSynthesis)window.speechSynthesis.cancel();
  const pct=Math.round(S.correct/C.total*100);
  let med='📚',ttl='¡Seguí practicando!';
  if(pct>=90){med='🥇';ttl='¡Excelente!';snd('win');launchConfetti();}
  else if(pct>=70){med='🥈';ttl='¡Muy bien!';}
  else if(pct>=50){med='🥉';ttl='¡Aprobado!';}
  document.getElementById('r-medal').textContent=med;
  document.getElementById('r-title').textContent=ttl;
  document.getElementById('r-sub').textContent=pct+'% correctas';
  document.getElementById('r-stats').innerHTML=
    '<div class="stat-row"><span>Correctas</span><span style="color:var(--green);font-weight:700">'+S.correct+' / '+C.total+'</span></div>'+
    '<div class="stat-row"><span>Incorrectas</span><span style="color:var(--red);font-weight:700">'+S.wrong+'</span></div>'+
    '<div class="stat-row"><span>Mejor racha</span><span>🔥 '+S.bestStreak+'</span></div>'+
    (C.str?'<div class="stat-row"><span>Estrellas</span><span style="color:var(--yellow)">'+S.stars+' ⭐</span></div>':'')+
    '<div class="stat-row" style="border:none"><span>Vidas restantes</span><span>'+'❤️'.repeat(Math.max(0,S.lives))+'</span></div>';
  if(S.errors.length>0){
    document.getElementById('btn-review').style.display='block';
  }
  // Comunicar al opener (panel de gamificación)
  try{
    if(window.opener&&!window.opener.closed){
      window.opener.postMessage({type:'fab_score',ok:S.correct,total:C.total,pct,mat:'${materia}',tema:'${titulo}'},'*');
    }
  }catch(e){}
  if(C.sav){
    const k='fab_${filename}';
    const p=JSON.parse(localStorage.getItem(k)||'[]');
    p.push({pct,stars:S.stars,fecha:new Date().toLocaleDateString('es-AR')});
    localStorage.setItem(k,JSON.stringify(p.slice(-5)));
  }
  show('s-result');
}
function toggleReview(){
  const r=document.getElementById('r-review');
  if(r.innerHTML){r.innerHTML='';return;}
  r.innerHTML=S.errors.map((e,i)=>{
    const correctText=e.opts[e.correct];
    const chosen=e.chosen>=0?'<span class="rw">Tu respuesta: '+e.opts[e.chosen]+'</span>':'<span class="rw">Sin responder</span>';
    return '<div class="review-item"><div class="rq">'+(i+1)+'. '+e.q+'</div>'+chosen+'<span class="ra">✓ Correcta: '+correctText+'</span></div>';
  }).join('');
}
function launchConfetti(){
  const cv=document.getElementById('confetti');
  cv.width=window.innerWidth;cv.height=window.innerHeight;
  const ctx=cv.getContext('2d');
  const cols=['#fbbf24','#3fb950','#58a6ff','#f471b5','#f59e0b','#a78bfa'];
  const ps=Array.from({length:160},()=>({
    x:Math.random()*cv.width,y:-20-Math.random()*cv.height*0.5,
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
    if(frames<260)requestAnimationFrame(loop);
    else ctx.clearRect(0,0,cv.width,cv.height);
  })();
}
document.addEventListener('keydown',e=>{
  const active=document.querySelector('.screen.active')?.id;
  if(active==='s-game' && !S.done){
    const n=parseInt(e.key);
    if(n>=1&&n<=4){
      const b=document.querySelector('#opts .btn-opt[data-i="'+(n-1)+'"]');
      if(b)b.click();
    }
  }else if(active==='s-intro' && (e.key==='Enter'||e.key===' ')){
    startGame();
  }else if(active==='s-result' && (e.key==='Enter'||e.key===' ')){
    startGame();
  }
});
window.addEventListener('resize',()=>{
  const cv=document.getElementById('confetti');
  cv.width=window.innerWidth;cv.height=window.innerHeight;
});
<\/script>
</body>
</html>`;
}
