// ═══════════════════════════════════════════════════════════════
//  TEMPLATE 4: ANIMACIÓN SECUENCIAL
// ═══════════════════════════════════════════════════════════════
function generarAnimacion(L, mat, opts) {
  const COLOR = colorMateria(mat);
  const ICON  = iconoMateria(mat);
  const data = JSON.stringify(L);

  return `<!DOCTYPE html>
<html lang="es"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${L.titulo} — Animación</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Exo+2:wght@400;600&display=swap" rel="stylesheet">
<style>${cssBaseLeccion(COLOR)}
body{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;min-height:100vh;overflow-x:hidden}
.escena{width:100%;max-width:720px;min-height:520px;background:#fff;border:1px solid var(--border);border-radius:20px;padding:40px;box-shadow:0 8px 32px rgba(0,0,0,.08);position:relative;overflow:hidden}
.elemento{opacity:0;transform:translateY(30px);transition:all .8s ease}
.elemento.show{opacity:1;transform:none}
.titulo-anim{font-family:'Orbitron',sans-serif;color:var(--primary);font-size:1.8rem;margin-bottom:16px;text-align:center}
.texto-anim{font-size:1.1rem;line-height:1.7;margin-bottom:20px;color:var(--text)}
.analogia-anim{background:linear-gradient(135deg,${COLOR}15,${COLOR}03);border-left:5px solid var(--primary);padding:20px 24px;border-radius:10px;font-style:italic;font-size:1rem;margin-bottom:20px}
.clave-anim{background:var(--primary);color:#fff;padding:14px 20px;border-radius:10px;font-family:'Orbitron',sans-serif;text-align:center;letter-spacing:2px;font-size:.95rem}
.particulas{position:absolute;top:0;left:0;right:0;bottom:0;pointer-events:none;overflow:hidden}
.p{position:absolute;width:8px;height:8px;border-radius:50%;background:var(--primary);opacity:0;animation:flotar 4s ease-in-out infinite}
@keyframes flotar{0%{opacity:0;transform:translateY(0) scale(.5)}50%{opacity:.4}100%{opacity:0;transform:translateY(-200px) scale(1.5)}}
.controles{margin-top:24px;display:flex;gap:12px;align-items:center;justify-content:center}
.progreso{display:flex;gap:6px;margin:0 10px}
.p-dot{width:30px;height:6px;border-radius:3px;background:var(--border);transition:all .3s}
.p-dot.done{background:var(--primary)}
.intro-screen{text-align:center}
.intro-screen .icon-big{font-size:5rem;margin-bottom:20px;animation:bounce 2s ease infinite}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}}
.btn-play{background:var(--primary);color:#fff;border:none;padding:16px 36px;border-radius:30px;font-family:'Orbitron',sans-serif;font-size:1rem;font-weight:700;cursor:pointer;box-shadow:0 4px 14px ${COLOR}66;transition:all .2s}
.btn-play:hover{transform:scale(1.05);box-shadow:0 6px 20px ${COLOR}88}
</style></head><body>

<div class="escena" id="escena">
  <div class="particulas" id="particulas"></div>
  <div id="contenido"></div>
</div>
<div class="controles">
  <button class="btn btn-ghost" id="btn-prev" onclick="anim(-1)">‹</button>
  <div class="progreso" id="progreso"></div>
  <button class="btn btn-primary" id="btn-next" onclick="anim(1)">›</button>
</div>

<script>
const L = ${data};
const SECS = [{intro:true}, ...L.secciones, {cierre:true}];
let idx = 0;

// Generar partículas decorativas
const particles = document.getElementById('particulas');
for(let i=0;i<8;i++){
  const p = document.createElement('div');
  p.className='p';
  p.style.left=(Math.random()*100)+'%';
  p.style.bottom=(Math.random()*30)+'%';
  p.style.animationDelay=(Math.random()*4)+'s';
  particles.appendChild(p);
}

function render(){
  const c = document.getElementById('contenido');
  c.innerHTML='';
  c.style.opacity='0';
  setTimeout(()=>{
    let h='';
    if(SECS[idx].intro){
      h = '<div class="intro-screen"><div class="icon-big">${ICON}</div>'+
        '<h1 class="titulo-anim elemento">'+L.titulo+'</h1>'+
        '<p class="texto-anim elemento" style="text-align:center">'+L.objetivo+'</p>'+
        '<button class="btn-play elemento" onclick="anim(1)">▶ EMPEZAR</button></div>';
    } else if(SECS[idx].cierre){
      h = '<div class="intro-screen"><div class="icon-big">🎓</div>'+
        '<h1 class="titulo-anim elemento">¡Aprendiste!</h1>'+
        '<p class="texto-anim elemento" style="text-align:center">'+L.cierre+'</p>'+
        '<div class="clave-anim elemento">⭐ ⭐ ⭐</div></div>';
    } else {
      const s = SECS[idx];
      h = '<h2 class="titulo-anim elemento">'+s.titulo+'</h2>'+
        '<p class="texto-anim elemento">'+s.texto+'</p>'+
        '<div class="analogia-anim elemento">💡 '+s.analogia+'</div>'+
        '<div class="clave-anim elemento">🔑 '+s.clave+'</div>';
    }
    c.innerHTML=h;
    c.style.opacity='1';
    setTimeout(()=>{
      const els = c.querySelectorAll('.elemento');
      els.forEach((el,i)=>setTimeout(()=>el.classList.add('show'), i*250));
    }, 50);
    renderProgreso();
  },200);
}

function renderProgreso(){
  const p = document.getElementById('progreso');
  p.innerHTML='';
  for(let i=0;i<SECS.length;i++){
    const d = document.createElement('div');
    d.className='p-dot' + (i<=idx?' done':'');
    p.appendChild(d);
  }
  document.getElementById('btn-prev').disabled = idx===0;
  document.getElementById('btn-next').disabled = idx===SECS.length-1;
}

function anim(dir){
  const ni = idx + dir;
  if(ni<0||ni>=SECS.length) return;
  idx = ni;
  render();
}

document.addEventListener('keydown', e => {
  if(e.key==='ArrowRight') anim(1);
  if(e.key==='ArrowLeft')  anim(-1);
});

render();
</script></body></html>`;
}
