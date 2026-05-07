// ═══════════════════════════════════════════════════════════════
//  TEMPLATE 1: SLIDES INTERACTIVOS
// ═══════════════════════════════════════════════════════════════
function generarSlides(L, mat, opts) {
  const COLOR = colorMateria(mat);
  const ICON  = iconoMateria(mat);
  const slidesData = JSON.stringify({L, opts});

  return `<!DOCTYPE html>
<html lang="es"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${L.titulo} — 6° Grado</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Exo+2:wght@400;600&display=swap" rel="stylesheet">
<style>${cssBaseLeccion(COLOR)}
body{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;overflow:hidden}
.slide-wrap{width:100%;max-width:780px;position:relative}
.slide{display:none;background:#fff;border:1px solid var(--border);border-radius:18px;padding:50px 44px;box-shadow:0 8px 32px rgba(0,0,0,.08);min-height:480px;animation:slideIn .5s ease}
.slide.active{display:flex;flex-direction:column;gap:18px}
@keyframes slideIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:none}}
.slide-num{font-family:'Orbitron',sans-serif;font-size:.75rem;color:var(--dim);letter-spacing:3px}
.slide h1{font-size:2rem;line-height:1.2}
.slide h2{font-size:1.4rem}
.slide-text{font-size:1.05rem;color:var(--text)}
.analogia{background:linear-gradient(135deg,${COLOR}15,${COLOR}05);border-left:4px solid var(--primary);padding:16px 20px;border-radius:8px;font-style:italic;color:var(--text);margin-top:8px}
.clave{background:var(--primary);color:#fff;padding:12px 18px;border-radius:8px;font-family:'Orbitron',sans-serif;font-size:.9rem;text-align:center;letter-spacing:2px;margin-top:auto}
.check-box{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:18px;margin-top:14px}
.check-q{font-weight:600;margin-bottom:10px}
.check-opt{display:block;width:100%;text-align:left;padding:10px 14px;margin-bottom:6px;background:#fff;border:2px solid var(--border);border-radius:6px;cursor:pointer;font-family:inherit;font-size:.95rem;transition:all .15s}
.check-opt:hover{border-color:var(--primary)}
.check-opt.ok{border-color:var(--green);background:#1E7A4A15;color:var(--green)}
.check-opt.bad{border-color:var(--red);background:#C0392B15;color:var(--red)}
.check-fb{margin-top:8px;padding:8px;border-radius:6px;font-weight:600;font-size:.9rem;display:none}
.check-fb.show{display:block}
.nav{display:flex;justify-content:space-between;align-items:center;margin-top:24px;width:100%;max-width:780px}
.dots{display:flex;gap:8px}
.dot{width:10px;height:10px;border-radius:50%;background:var(--border);cursor:pointer;transition:all .2s}
.dot.active{background:var(--primary);transform:scale(1.4)}
.tts-row{display:flex;gap:8px;align-items:center}
.intro,.cierre{background:linear-gradient(135deg,var(--primary),${COLOR}aa);color:#fff;text-align:center}
.intro h1,.cierre h1{color:#fff}
.intro .objetivo,.cierre p{font-size:1.1rem;opacity:.95;margin-top:14px}
</style></head><body>

<div class="slide-wrap" id="slides"></div>
<div class="nav">
  <button class="btn btn-ghost" onclick="prev()">‹ Anterior</button>
  <div class="dots" id="dots"></div>
  <button class="btn btn-primary" onclick="next()">Siguiente ›</button>
</div>

<script>
const D = ${slidesData};
const N = 1 + D.L.secciones.length + 1; // intro + secciones + cierre
let idx = 0;

function buildSlide(i){
  const w = document.getElementById('slides');
  if(i===0){
    return '<div class="slide intro active"><div style="font-size:4rem">${ICON}</div><h1>'+D.L.titulo+'</h1><p class="objetivo">'+D.L.objetivo+'</p><p style="margin-top:auto;font-size:.85rem;opacity:.8">Usá las flechas para avanzar</p></div>';
  }
  if(i===N-1){
    return '<div class="slide cierre active"><h1>🎓 ¡Lo lograste!</h1><p>'+D.L.cierre+'</p><div style="font-size:3rem;margin-top:20px">⭐⭐⭐</div></div>';
  }
  const s = D.L.secciones[i-1];
  let txt = '<div class="slide active"><div class="slide-num">'+(i)+' / '+(N-2)+'</div>'+
    '<h2>'+s.titulo+'</h2>'+
    '<div class="slide-text">'+s.texto+'</div>'+
    '<div class="analogia">💡 '+s.analogia+'</div>';
  if(D.opts.check && s.check){
    txt += '<div class="check-box"><div class="check-q">🤔 '+s.check.q+'</div>';
    s.check.opts.forEach((o,j)=>{
      txt += '<button class="check-opt" data-i="'+j+'" data-a="'+s.check.a+'" onclick="checkAns(this)">'+(String.fromCharCode(97+j))+') '+o+'</button>';
    });
    txt += '<div class="check-fb" id="cfb-'+i+'"></div></div>';
  }
  txt += '<div class="clave">🔑 '+s.clave+'</div></div>';
  return txt;
}

function render(){
  const w = document.getElementById('slides');
  w.innerHTML = buildSlide(idx);
  const dotsEl = document.getElementById('dots');
  dotsEl.innerHTML = '';
  for(let i=0;i<N;i++){
    const d = document.createElement('div');
    d.className = 'dot' + (i===idx?' active':'');
    d.onclick = () => { idx=i; render(); };
    dotsEl.appendChild(d);
  }
}

function next(){ if(idx<N-1){idx++;render();} }
function prev(){ if(idx>0){idx--;render();} }

function checkAns(b){
  const i = +b.dataset.i, a = +b.dataset.a;
  const all = b.parentElement.querySelectorAll('.check-opt');
  all.forEach(x => x.style.pointerEvents='none');
  if(i===a){ b.classList.add('ok'); }
  else { b.classList.add('bad'); all[a].classList.add('ok'); }
  const fb = b.parentElement.querySelector('.check-fb');
  fb.textContent = (i===a) ? '✅ ¡Correcto!' : '❌ La correcta era: '+all[a].textContent;
  fb.style.background = (i===a) ? '#1E7A4A22' : '#C0392B22';
  fb.style.color = (i===a) ? '#1E7A4A' : '#C0392B';
  fb.classList.add('show');
}

document.addEventListener('keydown', e => {
  if(e.key==='ArrowRight') next();
  if(e.key==='ArrowLeft')  prev();
});

render();
</script></body></html>`;
}

