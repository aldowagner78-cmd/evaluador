// ═══════════════════════════════════════════════════════════════
//  TEMPLATE: LECCIÓN COMPLETA
//  Fase 1: lección interactiva con SVG + TTS + Ollama + check
//  Fase 2: evaluación gamificada (quiz embebido)
//  v1.0 — standalone HTML, sin dependencias externas
// ═══════════════════════════════════════════════════════════════

function generarLeccionCompleta(L, mat, opts) {
  opts = opts || {};
  const COLOR  = colorMateria(mat);
  const ICON   = iconoMateria(mat);
  const OIP    = (opts.ollamaIP    || 'localhost:11434').replace(/https?:\/\//,'');
  const OMDL   = opts.ollamaModel || 'deepseek-r1:1.5b';
  const N      = L.secciones.length;
  const HAS_Q  = Array.isArray(opts.preguntas) && opts.preguntas.length >= 3;
  const TOTAL  = HAS_Q ? opts.preguntas.length : 0;
  const LIVES  = opts.lives  || 3;
  const TQUIZ  = opts.timeQuiz || 30;
  const MAT_LABEL = {mat:'Matemática',len:'Lengua',nat:'Ciencias Naturales',soc:'Ciencias Sociales'}[mat] || mat;

  // Sanitizar datos para embeber en HTML
  const LDATA = JSON.stringify(L)
    .replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
  const QDATA = JSON.stringify(opts.preguntas || [])
    .replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');

  /* ── SVG: constelación de conceptos ── */
  function buildViz(sec, idx) {
    const raw = sec.clave.split(/[\u00b7\/\+\u2192\u00d7·×→]/).map(function(s){return s.trim();}).filter(function(s){return s.length > 0;}).slice(0,5);
    const positions = {
      1:[[200,135]],
      2:[[130,135],[270,135]],
      3:[[200,72],[118,188],[282,188]],
      4:[[200,62],[282,148],[200,220],[118,148]],
      5:[[200,55],[290,115],[255,205],[145,205],[110,115]]
    };
    const pts = positions[raw.length] || positions[3];
    var lines = '', nodes = '';

    // Líneas animadas entre todos los pares
    for (var i=0; i<pts.length; i++) {
      for (var j=i+1; j<pts.length; j++) {
        var dur = (1.4 + i*0.5).toFixed(1);
        lines += '<line x1="'+pts[i][0]+'" y1="'+pts[i][1]+'" x2="'+pts[j][0]+'" y2="'+pts[j][1]+'" stroke="'+COLOR+'" stroke-width="1.3" stroke-dasharray="5 4" opacity="0.4">' +
          '<animate attributeName="stroke-dashoffset" from="9" to="0" dur="'+dur+'s" repeatCount="indefinite"/>' +
          '</line>';
      }
    }

    // Nodos: círculo + texto
    raw.forEach(function(w, i) {
      var x = pts[i][0], y = pts[i][1], r = 31;
      var fs  = w.length > 14 ? 7.5 : w.length > 10 ? 8.5 : 9.5;
      var lbl = w.length > 17 ? w.slice(0,16)+'…' : w;
      var opDelay = (i * 0.25).toFixed(2);
      var pDur    = (2.8 + i * 0.7).toFixed(1);
      nodes += '<g>' +
        '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+COLOR+'" opacity="0.14">' +
          '<animate attributeName="opacity" values="0.14;0.26;0.14" dur="'+pDur+'s" repeatCount="indefinite" begin="'+opDelay+'s"/>' +
        '</circle>' +
        '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="none" stroke="'+COLOR+'" stroke-width="1.6"/>' +
        '<text x="'+x+'" y="'+y+'" text-anchor="middle" dominant-baseline="middle" fill="'+COLOR+'" font-size="'+fs+'" font-weight="700" font-family="Exo 2,sans-serif">'+lbl+'</text>' +
        '</g>';
    });

    return '<svg viewBox="0 0 400 270" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-height:220px;display:block;margin:0 auto">' +
      '<defs><radialGradient id="rg'+idx+'" cx="50%" cy="50%" r="60%">' +
        '<stop offset="0%" stop-color="'+COLOR+'" stop-opacity="0.13"/>' +
        '<stop offset="100%" stop-color="'+COLOR+'" stop-opacity="0"/>' +
      '</radialGradient></defs>' +
      '<ellipse cx="200" cy="135" rx="160" ry="125" fill="url(#rg'+idx+')"/>' +
      lines + nodes +
    '</svg>';
  }

  /* ── Secciones HTML ── */
  var htmlSections = '';
  for (var si = 0; si < L.secciones.length; si++) {
    var sec = L.secciones[si];
    var viz = buildViz(sec, si);
    var kws = sec.clave.split(/[\u00b7\/\+\u2192\u00d7·×→]/).map(function(s){return s.trim();}).filter(function(s){return s.length > 0;});
    var kwBadges = kws.map(function(k) {
      var safe = k.replace(/'/g,'&#39;').replace(/"/g,'&quot;');
      return '<button class="kw-badge" onclick="askOllama(\'' + safe + '\')">' + safe + '</button>';
    }).join('');
    var checkOpts = '';
    for (var ci = 0; ci < sec.check.opts.length; ci++) {
      var letter = String.fromCharCode(97 + ci);
      checkOpts += '<button class="check-opt" data-j="'+ci+'" data-a="'+sec.check.a+'" onclick="doCheck(this,'+si+')">'+letter+') '+sec.check.opts[ci]+'</button>';
    }
    htmlSections += '<div class="sec-screen" id="sec-'+si+'">' +
      '<div class="lec-content">' +
        '<p class="sec-num">Sección '+(si+1)+' de '+N+'</p>' +
        '<h2 class="sec-title">'+sec.titulo+'</h2>' +
        '<div class="viz-wrap">'+viz+'</div>' +
        '<p class="sec-text">'+sec.texto+'</p>' +
        '<div class="analogia-card">'+sec.analogia+'</div>' +
        '<div class="keywords-row">'+kwBadges+'</div>' +
        '<div class="check-wrap" id="chk-'+si+'">' +
          '<p class="check-label">🤔 Verificá tu comprensión</p>' +
          '<p class="check-q">'+sec.check.q+'</p>' +
          '<div class="check-opts" id="chopts-'+si+'">'+checkOpts+'</div>' +
          '<div class="check-fb" id="chkfb-'+si+'"></div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  /* ── CSS ── */
  var CSS = cssBaseLeccion(COLOR) + '\n' +
':root{--primary:'+COLOR+'}' +
'body{padding:0;min-height:100vh;background:#F0F4F8;overflow-x:hidden}' +
/* Screens */
'.screen{display:none;width:100%;min-height:100vh;flex-direction:column}' +
'.screen.active{display:flex}' +
/* Intro */
'#s-intro{align-items:center;justify-content:center;background:linear-gradient(160deg,'+COLOR+'22 0%,#F0F4F8 55%);padding:40px 20px;text-align:center}' +
'.intro-mat{font-family:\'Orbitron\',sans-serif;font-size:.7rem;color:var(--primary);letter-spacing:3px;text-transform:uppercase;margin-bottom:16px;opacity:.8}' +
'.intro-icon{font-size:5rem;animation:flt 3s ease-in-out infinite;display:block;margin-bottom:16px}' +
'@keyframes flt{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}' +
'.intro-title{font-family:\'Orbitron\',sans-serif;font-size:1.75rem;color:#1a202c;margin-bottom:12px;line-height:1.25;max-width:520px}' +
'.intro-obj{font-size:1rem;color:#4A5568;max-width:500px;margin:0 auto 28px;line-height:1.65}' +
'.intro-meta{margin-top:14px;font-size:.78rem;color:#718096;opacity:.8}' +
/* Lesson header */
'.lec-header{background:#fff;border-bottom:2px solid '+COLOR+'30;padding:12px 18px;display:flex;align-items:center;gap:10px;position:sticky;top:0;z-index:20;box-shadow:0 2px 10px rgba(0,0,0,.07)}' +
'.lh-icon{font-size:1.5rem}' +
'.lh-title{font-family:\'Orbitron\',sans-serif;font-size:.8rem;color:var(--primary);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
'.lh-tts{background:none;border:none;font-size:1.25rem;cursor:pointer;opacity:.65;transition:all .2s;padding:4px 6px;border-radius:50%}' +
'.lh-tts:hover{opacity:1;background:'+COLOR+'18}' +
'.lh-tts.active{opacity:1;background:'+COLOR+'25;animation:pulse .9s infinite}' +
'.progress-bar{height:4px;background:'+COLOR+'28}' +
'.progress-fill{height:100%;background:'+COLOR+';transition:width .6s cubic-bezier(.4,0,.2,1)}' +
/* Sections */
'.sec-screen{display:none}' +
'.lec-content{flex:1;padding:18px;max-width:740px;margin:0 auto;width:100%}' +
'.sec-num{font-family:\'Orbitron\',sans-serif;font-size:.68rem;color:var(--primary);letter-spacing:3px;text-transform:uppercase;margin-bottom:8px;opacity:.7}' +
'.sec-title{font-family:\'Orbitron\',sans-serif;font-size:1.2rem;color:#1a202c;margin-bottom:16px;line-height:1.3}' +
'.viz-wrap{background:#fff;border-radius:16px;border:1px solid '+COLOR+'28;padding:14px;margin-bottom:18px;box-shadow:0 2px 10px rgba(0,0,0,.04);overflow:hidden}' +
'.sec-text{font-size:1rem;line-height:1.78;color:#2D3748;margin-bottom:14px}' +
'.analogia-card{background:linear-gradient(135deg,'+COLOR+'14,'+COLOR+'05);border-left:4px solid var(--primary);padding:13px 17px;border-radius:0 12px 12px 0;margin-bottom:16px;font-style:italic;color:#4A5568;font-size:.95rem;line-height:1.65}' +
'.analogia-card::before{content:\'💡 \';font-style:normal}' +
/* Keywords */
'.keywords-row{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px}' +
'.kw-badge{padding:6px 14px;border-radius:999px;border:2px solid var(--primary);color:var(--primary);font-size:.8rem;font-weight:700;cursor:pointer;background:#fff;transition:all .18s;letter-spacing:.4px;font-family:\'Exo 2\',sans-serif}' +
'.kw-badge:hover{background:var(--primary);color:#fff;transform:translateY(-2px);box-shadow:0 4px 14px '+COLOR+'45}' +
/* Check */
'.check-wrap{background:#fff;border:1px solid '+COLOR+'28;border-radius:16px;padding:18px;margin-bottom:16px;box-shadow:0 2px 10px rgba(0,0,0,.04)}' +
'.check-label{font-size:.68rem;font-family:\'Orbitron\',sans-serif;letter-spacing:2px;color:var(--primary);text-transform:uppercase;margin-bottom:8px;opacity:.7}' +
'.check-q{font-size:.98rem;font-weight:600;color:#1a202c;margin-bottom:12px;line-height:1.5}' +
'.check-opt{display:block;width:100%;text-align:left;padding:11px 15px;margin-bottom:7px;background:#F7FAFC;border:2px solid #E2E8F0;border-radius:10px;cursor:pointer;font-family:\'Exo 2\',sans-serif;font-size:.93rem;transition:all .16s;color:#2D3748}' +
'.check-opt:hover:not(:disabled){border-color:var(--primary);color:var(--primary)}' +
'.check-opt.ok{border-color:#1E7A4A!important;background:#f0fff4!important;color:#1E7A4A!important;pointer-events:none;animation:pulse-ok .5s ease}' +
'.check-opt.bad{border-color:#C0392B!important;background:#fff5f5!important;color:#C0392B!important;animation:shk .4s ease}' +
'.check-opt.hint{border-color:#D4A017!important;background:#fffbeb!important;color:#92620a!important}' +
'@keyframes pulse-ok{0%{transform:scale(1)}40%{transform:scale(1.02)}100%{transform:scale(1)}}' +
'@keyframes shk{0%,100%{transform:translateX(0)}20%{transform:translateX(-5px)}40%{transform:translateX(5px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}' +
'.check-fb{padding:10px 14px;border-radius:8px;font-weight:600;font-size:.88rem;margin-top:8px;display:none}' +
'.check-fb.show{display:block}' +
'.check-fb.ok{background:#f0fff4;color:#1E7A4A;border:1px solid #9ae6b4}' +
'.check-fb.fail{background:#fff5f5;color:#C0392B;border:1px solid #feb2b2}' +
/* Nav */
'.lec-nav{padding:14px 18px;display:flex;justify-content:space-between;align-items:center;background:#fff;border-top:1px solid #E2E8F0;position:sticky;bottom:0;z-index:20}' +
'.btn-nav{padding:11px 22px;border:none;border-radius:10px;font-family:\'Orbitron\',sans-serif;font-weight:700;font-size:.78rem;letter-spacing:1.5px;cursor:pointer;transition:all .18s}' +
'.btn-ghost{background:transparent;border:1px solid #E2E8F0;color:#4A5568}' +
'.btn-ghost:hover{border-color:var(--primary);color:var(--primary)}' +
'.btn-primary{background:var(--primary);color:#fff;box-shadow:0 4px 12px '+COLOR+'40}' +
'.btn-primary:hover{filter:brightness(1.08);transform:translateY(-1px)}' +
'.btn-primary:disabled{opacity:.35;cursor:not-allowed;transform:none;box-shadow:none}' +
/* Ollama panel */
'#ollama-panel{position:fixed;top:0;right:-420px;width:min(390px,100vw);height:100vh;background:#fff;box-shadow:-6px 0 28px rgba(0,0,0,.13);transition:right .32s cubic-bezier(.4,0,.2,1);z-index:80;display:flex;flex-direction:column;border-left:3px solid var(--primary)}' +
'#ollama-panel.open{right:0}' +
'.op-header{padding:16px 18px;border-bottom:1px solid #E2E8F0;display:flex;align-items:center;gap:10px;background:'+COLOR+'0a}' +
'.op-kw{font-family:\'Orbitron\',sans-serif;font-size:.85rem;color:var(--primary);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
'.op-close{background:none;border:none;font-size:1.3rem;cursor:pointer;color:#4A5568;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background .15s}' +
'.op-close:hover{background:#f7f7f7}' +
'.op-body{flex:1;overflow-y:auto;padding:18px}' +
'.op-loading{display:flex;gap:8px;align-items:center;color:var(--primary);font-size:.9rem;margin-bottom:4px}' +
'.op-dot{width:8px;height:8px;border-radius:50%;background:var(--primary);animation:blink 1.2s infinite}' +
'.op-dot:nth-child(2){animation-delay:.2s}' +
'.op-dot:nth-child(3){animation-delay:.4s}' +
'@keyframes blink{0%,80%,100%{opacity:.2}40%{opacity:1}}' +
'.op-text{font-size:.94rem;line-height:1.72;color:#2D3748;white-space:pre-wrap}' +
'.op-offline{background:#fff8e1;border:1px solid #ffe082;border-radius:10px;padding:14px;font-size:.88rem;color:#7a5c00;line-height:1.6}' +
/* Cierre */
'#s-cierre{align-items:center;justify-content:center;text-align:center;padding:40px 20px;background:linear-gradient(160deg,'+COLOR+'20 0%,#F0F4F8 55%)}' +
'.cierre-icon{font-size:4rem;margin-bottom:14px;animation:flt 3s ease-in-out infinite}' +
'.cierre-title{font-family:\'Orbitron\',sans-serif;font-size:1.55rem;color:var(--primary);margin-bottom:14px}' +
'.cierre-text{font-size:.98rem;color:#4A5568;max-width:480px;margin:0 auto 24px;line-height:1.7}' +
'.cierre-badges{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:28px}' +
'.cierre-badge{padding:5px 14px;background:'+COLOR+'18;border:1px solid '+COLOR+'44;border-radius:999px;font-size:.8rem;color:var(--primary);font-weight:600}' +
/* Quiz wrapper */
'#s-quiz{background:radial-gradient(circle at 18% -10%,'+COLOR+'22 0%,#F0F4F8 45%);padding:18px;align-items:center;justify-content:flex-start}' +
'.qs{display:none;width:100%;max-width:640px;animation:fi .33s ease}' +
'.qs.active{display:flex;flex-direction:column;gap:13px}' +
'@keyframes fi{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}' +
'.qcard{background:#fff;border:1px solid #C0CCDB;border-radius:14px;padding:20px;box-shadow:0 4px 16px rgba(0,0,0,.07)}' +
'.qbtn{width:100%;padding:13px;border:none;border-radius:10px;font-family:\'Orbitron\',sans-serif;font-weight:700;font-size:.87rem;letter-spacing:2px;cursor:pointer;transition:all .18s}' +
'.qbtn-p{background:var(--primary);color:#fff;box-shadow:0 4px 14px '+COLOR+'55}' +
'.qbtn-p:hover{filter:brightness(1.06);transform:translateY(-1px)}' +
'.qbtn-g{background:#fff;color:#2C3E50;border:1px solid #C0CCDB;margin-top:4px}' +
'.qbtn-g:hover{border-color:var(--primary);color:var(--primary)}' +
'.qhud{display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:#fff;border:1px solid #C0CCDB;border-radius:10px;font-family:monospace;font-size:.93rem;flex-wrap:wrap;gap:6px}' +
'.qtbar{height:8px;border-radius:4px;background:#C0CCDB;overflow:hidden}' +
'.qtfill{height:100%;background:linear-gradient(90deg,var(--primary),'+COLOR+'bb);transition:width 1s linear;border-radius:4px}' +
'.streak-bdg{background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#111;padding:3px 10px;border-radius:999px;font-weight:900;font-size:.76rem;display:none}' +
'.qopt{background:#fff;color:#2C3E50;border:2px solid #C0CCDB;border-radius:10px;padding:12px 15px;text-align:left;cursor:pointer;font-family:\'Exo 2\',sans-serif;font-size:.94rem;transition:all .16s;width:100%;margin-bottom:7px;display:flex;align-items:center;gap:10px;animation:opt-in .32s ease backwards}' +
'.qopt .kbd{flex:0 0 26px;height:26px;border-radius:6px;background:#E6EBF2;border:1px solid #C0CCDB;font-family:monospace;font-size:.76rem;display:flex;align-items:center;justify-content:center;color:#7F8C9A;font-weight:700}' +
'.qopt:hover{border-color:var(--primary);color:var(--primary);transform:translateX(3px)}' +
'.qopt.correct{border-color:#1E7A4A!important;background:rgba(30,122,74,.10)!important;color:#1E7A4A!important;pointer-events:none;animation:pulse-ok .5s ease}' +
'.qopt.wrong{border-color:#C0392B!important;background:rgba(192,57,43,.10)!important;color:#C0392B!important;pointer-events:none;animation:shk .45s ease}' +
'@keyframes opt-in{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}' +
'.qfb{text-align:center;padding:12px;border-radius:10px;font-weight:700;animation:fi .3s ease;display:none}' +
'.qfb.ok{background:rgba(30,122,74,.13);color:#1E7A4A;border:1px solid rgba(30,122,74,.2)}' +
'.qfb.fail{background:rgba(192,57,43,.13);color:#C0392B;border:1px solid rgba(192,57,43,.2)}' +
'.stat-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #E2E8F0;font-size:.9rem}' +
'.rev-item{background:#fff;border:1px solid #C0CCDB;border-radius:10px;padding:12px 14px;margin-bottom:8px}' +
'canvas#cf{position:fixed;inset:0;pointer-events:none;z-index:99}' +
'@media(max-width:500px){' +
'.intro-title{font-size:1.3rem}' +
'.sec-title{font-size:1rem}' +
'.lec-content{padding:12px}' +
'#s-quiz{padding:10px}' +
'.qcard{padding:14px}' +
'}';

  /* ── HTML COMPLETO ── */
  var quizIntroHTML = HAS_Q
    ? '<div class="qs active" id="qs-intro">' +
        '<div class="qcard" style="text-align:center;padding:30px 20px">' +
          '<div style="font-size:3rem;margin-bottom:12px">⚡</div>' +
          '<h1 style="font-family:\'Orbitron\',sans-serif;font-size:1.35rem;color:var(--primary)">'+L.titulo+'</h1>' +
          '<p style="margin-top:8px;color:#7F8C9A">Evaluación · 6° Grado</p>' +
          '<p style="margin-top:6px;font-size:.8rem;color:#7F8C9A">'+TOTAL+' preguntas · '+LIVES+' vidas · '+TQUIZ+'s c/u</p>' +
          '<p style="margin-top:12px;font-size:.77rem;color:#7F8C9A">Teclas <b>1·2·3·4</b> para responder rápido</p>' +
        '</div>' +
        '<button class="qbtn qbtn-p" onclick="qStart()">⚡ EMPEZAR EVALUACIÓN</button>' +
        '<button class="qbtn qbtn-g" onclick="goIntro()">← Volver al inicio</button>' +
      '</div>' +
      '<div class="qs" id="qs-game">' +
        '<div class="qhud">' +
          '<span id="qh-lives">❤️❤️❤️</span>' +
          '<span class="streak-bdg" id="qh-streak">🔥 0</span>' +
          '<span id="qh-stars" style="color:#9A6C0A">⭐ 0</span>' +
          '<span id="qh-prog">1/'+TOTAL+'</span>' +
        '</div>' +
        '<div class="qtbar"><div class="qtfill" id="qtfill"></div></div>' +
        '<div class="qcard">' +
          '<p style="font-size:.72rem;color:#7F8C9A;margin-bottom:8px" id="qnum">Pregunta 1 de '+TOTAL+'</p>' +
          '<h2 id="qtext" style="font-size:1.03rem;line-height:1.55;font-family:\'Exo 2\',sans-serif;font-weight:600">…</h2>' +
        '</div>' +
        '<div id="qopts"></div>' +
        '<div class="qfb" id="qfb"></div>' +
      '</div>' +
      '<div class="qs" id="qs-result">' +
        '<div class="qcard" style="text-align:center;padding:28px">' +
          '<div id="qr-medal" style="font-size:4rem"></div>' +
          '<h1 id="qr-title" style="font-family:\'Orbitron\',sans-serif;font-size:1.3rem;color:var(--primary);margin-top:10px"></h1>' +
          '<p id="qr-sub" style="color:#7F8C9A;margin-top:6px"></p>' +
        '</div>' +
        '<div class="qcard" id="qr-stats"></div>' +
        '<div id="qr-review"></div>' +
        '<button class="qbtn qbtn-p" onclick="qStart()">🔄 REPETIR</button>' +
        '<button class="qbtn qbtn-g" id="qbtn-rev" style="display:none" onclick="toggleRev()">📑 Revisar errores</button>' +
        '<button class="qbtn qbtn-g" onclick="goIntro()">🏠 Inicio</button>' +
      '</div>'
    : '';

  var cierre_btn = HAS_Q
    ? '<button class="btn btn-primary" style="font-size:.95rem;padding:13px 32px;letter-spacing:2px" onclick="startQuiz()">⚡ IR A LA EVALUACIÓN</button>'
    : '<button class="btn btn-primary" style="font-size:.95rem;padding:13px 32px;letter-spacing:2px" onclick="goIntro()">🔄 VOLVER AL INICIO</button>';

  return '<!DOCTYPE html>\n<html lang="es">\n<head>' +
'<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
'<title>'+L.titulo+' — 6° Grado</title>' +
'<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Exo+2:wght@400;600&display=swap" rel="stylesheet">' +
'<style>'+CSS+'</style>' +
'</head><body>' +

'<canvas id="cf"></canvas>' +

'<!-- PANEL OLLAMA -->' +
'<div id="ollama-panel">' +
  '<div class="op-header">' +
    '<span class="op-kw" id="op-kw">…</span>' +
    '<button class="op-close" onclick="closePanel()" title="Cerrar">✕</button>' +
  '</div>' +
  '<div class="op-body"><div id="op-body"></div></div>' +
'</div>' +

'<!-- INTRO -->' +
'<div class="screen active" id="s-intro">' +
  '<div class="intro-mat">'+ICON+' '+MAT_LABEL+' · 6° Grado</div>' +
  '<span class="intro-icon">'+ICON+'</span>' +
  '<h1 class="intro-title">'+L.titulo+'</h1>' +
  '<p class="intro-obj">'+L.objetivo+'</p>' +
  '<button class="btn btn-primary" style="font-size:.95rem;padding:13px 34px;letter-spacing:2px" onclick="startLeccion()">▶ EMPEZAR LECCIÓN</button>' +
  '<p class="intro-meta">'+N+' secciones · verificación de comprensión'+(HAS_Q?' · evaluación gamificada':'')+'</p>' +
'</div>' +

'<!-- LECCIÓN -->' +
'<div class="screen" id="s-leccion">' +
  '<div class="lec-header">' +
    '<span class="lh-icon">'+ICON+'</span>' +
    '<span class="lh-title" id="lh-title">'+L.titulo+'</span>' +
    '<button class="lh-tts" id="tts-btn" onclick="toggleTTS()" title="Leer en voz alta">🔊</button>' +
  '</div>' +
  '<div class="progress-bar"><div class="progress-fill" id="prog-fill" style="width:0%"></div></div>' +
  htmlSections +
  '<div class="lec-nav">' +
    '<button class="btn-nav btn-ghost" id="btn-prev" onclick="prevSec()" style="display:none">‹ Anterior</button>' +
    '<div style="flex:1"></div>' +
    '<button class="btn-nav btn-primary" id="btn-next" onclick="nextSec()" disabled>Siguiente ›</button>' +
  '</div>' +
'</div>' +

'<!-- CIERRE -->' +
'<div class="screen" id="s-cierre">' +
  '<div class="cierre-icon">🎓</div>' +
  '<h1 class="cierre-title">¡Lección completada!</h1>' +
  '<p class="cierre-text">'+L.cierre+'</p>' +
  '<div class="cierre-badges" id="cierre-badges"></div>' +
  cierre_btn +
'</div>' +

'<!-- QUIZ -->' +
(HAS_Q ? '<div class="screen" id="s-quiz">'+quizIntroHTML+'</div>' : '') +

'<script>\n' +
'var LDATA='+LDATA+';\n' +
'var QData='+QDATA+';\n' +
'var CFG={color:"'+COLOR+'",ip:"'+OIP+'",mdl:"'+OMDL+'",N:'+N+',hasQuiz:'+HAS_Q+',lives:'+LIVES+',time:'+TQUIZ+',total:'+TOTAL+',mat:"'+mat+'"};\n' +
'\n' +
'/* ── STATE ── */\n' +
'var LS={idx:0,checks:{}};\n' +
'var QS={};\n' +
'var ttsOn=false;\n' +
'var ttsU=null;\n' +
'var timerInt=null;\n' +
'var acCtx=null;\n' +
'var chkAttempts={};\n' +
'\n' +
'/* ── SCREENS ── */\n' +
'function show(id){\n' +
'  ["s-intro","s-leccion","s-cierre","s-quiz"].forEach(function(s){\n' +
'    var el=document.getElementById(s);if(!el)return;\n' +
'    if(s===id){el.classList.add("active");}else{el.classList.remove("active");}\n' +
'  });\n' +
'  window.scrollTo(0,0);\n' +
'}\n' +
'\n' +
'function qShow(id){\n' +
'  document.querySelectorAll(".qs").forEach(function(s){s.classList.remove("active");});\n' +
'  var el=document.getElementById(id);if(el)el.classList.add("active");\n' +
'}\n' +
'\n' +
'/* ── LESSON ── */\n' +
'function startLeccion(){\n' +
'  show("s-leccion");\n' +
'  renderSec(0);\n' +
'}\n' +
'\n' +
'function goIntro(){\n' +
'  stopTTS();\n' +
'  show("s-intro");\n' +
'}\n' +
'\n' +
'function renderSec(i){\n' +
'  document.querySelectorAll(".sec-screen").forEach(function(s){s.style.display="none";});\n' +
'  var sec=document.getElementById("sec-"+i);\n' +
'  if(!sec)return;\n' +
'  sec.style.display="block";\n' +
'  LS.idx=i;\n' +
'  var pct=Math.round((i/CFG.N)*100);\n' +
'  document.getElementById("prog-fill").style.width=pct+"%";\n' +
'  document.getElementById("lh-title").textContent=LDATA.secciones[i].titulo;\n' +
'  document.getElementById("btn-prev").style.display=i>0?"block":"none";\n' +
'  var btnNext=document.getElementById("btn-next");\n' +
'  btnNext.textContent=i===CFG.N-1?"Finalizar ›":"Siguiente ›";\n' +
'  btnNext.disabled=!LS.checks[i];\n' +
'  stopTTS();\n' +
'  window.scrollTo(0,0);\n' +
'}\n' +
'\n' +
'function nextSec(){\n' +
'  if(!LS.checks[LS.idx])return;\n' +
'  stopTTS();\n' +
'  if(LS.idx<CFG.N-1){renderSec(LS.idx+1);}\n' +
'  else{finishLeccion();}\n' +
'}\n' +
'\n' +
'function prevSec(){\n' +
'  stopTTS();\n' +
'  if(LS.idx>0)renderSec(LS.idx-1);\n' +
'}\n' +
'\n' +
'function finishLeccion(){\n' +
'  stopTTS();\n' +
'  var seen={};\n' +
'  var badges=[];\n' +
'  LDATA.secciones.forEach(function(s){\n' +
'    s.clave.split(/[\\u00b7\\/\\+\\u2192·×→]/).forEach(function(k){\n' +
'      var t=k.trim();\n' +
'      if(t&&!seen[t]){seen[t]=1;badges.push(t);}\n' +
'    });\n' +
'  });\n' +
'  var bc=document.getElementById("cierre-badges");\n' +
'  bc.innerHTML=badges.slice(0,10).map(function(b){\n' +
'    return \'<span class="cierre-badge">\'+b+\'</span>\';\n' +
'  }).join("");\n' +
'  show("s-cierre");\n' +
'  launchConfetti();\n' +
'}\n' +
'\n' +
'/* ── CHECK ── */\n' +
'function doCheck(btn,secIdx){\n' +
'  var j=parseInt(btn.dataset.j);\n' +
'  var a=parseInt(btn.dataset.a);\n' +
'  var fb=document.getElementById("chkfb-"+secIdx);\n' +
'  var opts=document.getElementById("chopts-"+secIdx).querySelectorAll(".check-opt");\n' +
'  if(!chkAttempts[secIdx])chkAttempts[secIdx]=0;\n' +
'  if(j===a){\n' +
'    opts.forEach(function(o){o.disabled=true;});\n' +
'    btn.classList.add("ok");\n' +
'    fb.textContent="✅ ¡Correcto! Podés avanzar.";\n' +
'    fb.className="check-fb show ok";\n' +
'    LS.checks[secIdx]=true;\n' +
'    document.getElementById("btn-next").disabled=false;\n' +
'    snd("ok");\n' +
'  }else{\n' +
'    chkAttempts[secIdx]++;\n' +
'    btn.classList.add("bad");\n' +
'    setTimeout(function(){btn.classList.remove("bad");},550);\n' +
'    if(chkAttempts[secIdx]>=2){\n' +
'      opts[a].classList.add("hint");\n' +
'      fb.textContent="💡 La respuesta correcta está resaltada. Hacé clic para continuar.";\n' +
'      fb.className="check-fb show fail";\n' +
'    }else{\n' +
'      fb.textContent="❌ No es esa, intentá de nuevo.";\n' +
'      fb.className="check-fb show fail";\n' +
'      snd("fail");\n' +
'    }\n' +
'  }\n' +
'}\n' +
'\n' +
'/* ── TTS ── */\n' +
'function toggleTTS(){\n' +
'  if(ttsOn){stopTTS();return;}\n' +
'  var sec=LDATA.secciones[LS.idx];\n' +
'  if(!sec)return;\n' +
'  speakText(sec.titulo+". "+sec.texto+" "+sec.analogia);\n' +
'}\n' +
'\n' +
'function speakText(text){\n' +
'  if(!window.speechSynthesis)return;\n' +
'  stopTTS();\n' +
'  ttsU=new SpeechSynthesisUtterance(text);\n' +
'  ttsU.lang="es-AR";\n' +
'  ttsU.rate=0.92;\n' +
'  ttsU.onstart=function(){ttsOn=true;updTTS();};\n' +
'  ttsU.onend=function(){ttsOn=false;updTTS();};\n' +
'  ttsU.onerror=function(){ttsOn=false;updTTS();};\n' +
'  window.speechSynthesis.speak(ttsU);\n' +
'}\n' +
'\n' +
'function stopTTS(){\n' +
'  if(window.speechSynthesis)window.speechSynthesis.cancel();\n' +
'  ttsOn=false;\n' +
'  updTTS();\n' +
'}\n' +
'\n' +
'function updTTS(){\n' +
'  var btn=document.getElementById("tts-btn");\n' +
'  if(!btn)return;\n' +
'  btn.textContent=ttsOn?"🔇":"🔊";\n' +
'  btn.style.opacity=ttsOn?"1":"0.65";\n' +
'  if(ttsOn)btn.classList.add("active");else btn.classList.remove("active");\n' +
'}\n' +
'\n' +
'/* ── OLLAMA ── */\n' +
'function askOllama(keyword){\n' +
'  var panel=document.getElementById("ollama-panel");\n' +
'  document.getElementById("op-kw").textContent=keyword;\n' +
'  var body=document.getElementById("op-body");\n' +
'  body.innerHTML=\'<div class="op-loading"><div class="op-dot"></div><div class="op-dot"></div><div class="op-dot"></div><span style="margin-left:6px;font-size:.88rem">Pensando…</span></div>\';\n' +
'  panel.classList.add("open");\n' +
'  var sec=LDATA.secciones[LS.idx];\n' +
'  var tema=sec?sec.titulo:"";\n' +
'  var prompt="Sos un maestro de 6 grado argentino. El alumno estudia el tema \\""+tema+"\\" y quiere saber sobre \\""+keyword+"\\". Explicale en 3-4 oraciones simples con un ejemplo de la vida cotidiana. Usá español rioplatense, hablale de vos. Sé claro y breve.";\n' +
'  streamOllama(prompt,body,sec);\n' +
'}\n' +
'\n' +
'function streamOllama(prompt,container,sec){\n' +
'  fetch("http://"+CFG.ip+"/api/generate",{\n' +
'    method:"POST",\n' +
'    headers:{"Content-Type":"application/json"},\n' +
'    body:JSON.stringify({model:CFG.mdl,prompt:prompt,stream:true}),\n' +
'    signal:AbortSignal.timeout(14000)\n' +
'  }).then(function(res){\n' +
'    if(!res.ok)throw new Error("HTTP "+res.status);\n' +
'    container.innerHTML=\'<span class="op-text" id="op-stream"></span>\';\n' +
'    var el=document.getElementById("op-stream");\n' +
'    var reader=res.body.getReader();\n' +
'    var dec=new TextDecoder();\n' +
'    function pump(){\n' +
'      return reader.read().then(function(r){\n' +
'        if(r.done)return;\n' +
'        var chunk=dec.decode(r.value);\n' +
'        chunk.split("\\n").forEach(function(line){\n' +
'          if(!line.trim())return;\n' +
'          try{var d=JSON.parse(line);if(d.response){el.textContent+=d.response;container.parentElement.scrollTop=9999;}}catch(e){}\n' +
'        });\n' +
'        return pump();\n' +
'      });\n' +
'    }\n' +
'    pump().catch(function(){});\n' +
'  }).catch(function(){\n' +
'    var fallback=sec?sec.texto.substring(0,220)+"…":"";\n' +
'    container.innerHTML=\'<div class="op-offline">⚠️ <b>Ollama no disponible.</b> Instalá <code>ollama</code> con el modelo <code>\'+CFG.mdl+\'</code> para obtener explicaciones con IA.<br><br>\'+(fallback?\'<b>Del contenido:</b><br>\'+fallback:"")+\'</div>\';\n' +
'  });\n' +
'}\n' +
'\n' +
'function closePanel(){\n' +
'  document.getElementById("ollama-panel").classList.remove("open");\n' +
'}\n' +
'\n' +
'/* ── QUIZ ── */\n' +
'function startQuiz(){\n' +
'  show("s-quiz");\n' +
'  qShow("qs-intro");\n' +
'}\n' +
'\n' +
'function qStart(){\n' +
'  QS={idx:0,lives:CFG.lives,stars:0,correct:0,wrong:0,done:false,streak:0,best:0,errors:[]};\n' +
'  document.getElementById("qbtn-rev").style.display="none";\n' +
'  document.getElementById("qr-review").innerHTML="";\n' +
'  qShow("qs-game");\n' +
'  qRender();\n' +
'}\n' +
'\n' +
'function qRender(){\n' +
'  if(QS.idx>=QData.length||QS.lives<=0){qEnd();return;}\n' +
'  QS.done=false;\n' +
'  var q=QData[QS.idx];\n' +
'  document.getElementById("qnum").textContent="Pregunta "+(QS.idx+1)+" de "+CFG.total;\n' +
'  document.getElementById("qtext").innerText=q.q;\n' +
'  document.getElementById("qh-prog").textContent=(QS.idx+1)+"/"+CFG.total;\n' +
'  updLives();updStreak();\n' +
'  document.getElementById("qh-stars").textContent="⭐ "+QS.stars;\n' +
'  var oc=document.getElementById("qopts");oc.innerHTML="";\n' +
'  q.opts.forEach(function(o,i){\n' +
'    var b=document.createElement("button");\n' +
'    b.className="qopt";\n' +
'    b.style.animationDelay=(i*55)+"ms";\n' +
'    b.innerHTML=\'<span class="kbd">\'+( i+1)+\'</span><span>\'+o+\'</span>\';\n' +
'    b.dataset.i=i;\n' +
'    b.onclick=function(){qCheck(i,b,q);};\n' +
'    oc.appendChild(b);\n' +
'  });\n' +
'  document.getElementById("qfb").style.display="none";\n' +
'  qTimer();\n' +
'}\n' +
'\n' +
'function qTimer(){\n' +
'  clearInterval(timerInt);\n' +
'  var f=document.getElementById("qtfill");\n' +
'  f.style.transition="none";f.style.width="100%";\n' +
'  var el=0;\n' +
'  setTimeout(function(){f.style.transition="width "+CFG.time+"s linear";f.style.width="0%";},50);\n' +
'  timerInt=setInterval(function(){\n' +
'    el++;if(el>=CFG.time&&!QS.done)qTimeout();\n' +
'  },1000);\n' +
'}\n' +
'\n' +
'function qTimeout(){\n' +
'  clearInterval(timerInt);\n' +
'  QS.done=true;QS.lives--;QS.wrong++;QS.streak=0;\n' +
'  snd("fail");\n' +
'  var q=QData[QS.idx];\n' +
'  var bs=document.querySelectorAll("#qopts .qopt");\n' +
'  if(bs[q.a])bs[q.a].classList.add("correct");\n' +
'  qFb(false,"⏱ ¡Tiempo! Era: "+q.opts[q.a]);\n' +
'  QS.errors.push({q:q.q,opts:q.opts,correct:q.a,chosen:-1});\n' +
'  updLives();updStreak();\n' +
'  setTimeout(function(){if(QS.lives<=0){qEnd();return;}QS.idx++;qRender();},1500);\n' +
'}\n' +
'\n' +
'function qCheck(i,btn,q){\n' +
'  if(QS.done)return;QS.done=true;clearInterval(timerInt);\n' +
'  if(i===q.a){\n' +
'    QS.correct++;QS.streak++;\n' +
'    var bonus=10+(QS.streak>=3?Math.min(15,(QS.streak-2)*5):0);\n' +
'    if(QS.streak>QS.best)QS.best=QS.streak;\n' +
'    QS.stars+=bonus;\n' +
'    btn.classList.add("correct");\n' +
'    snd(QS.streak>=3?"streak":"ok");\n' +
'    qFb(true,"✅ ¡Correcto! +"+bonus+" ⭐"+(QS.streak>=3?" · 🔥 Racha x"+QS.streak:""));\n' +
'  }else{\n' +
'    QS.lives--;QS.wrong++;QS.streak=0;\n' +
'    btn.classList.add("wrong");\n' +
'    var bs=document.querySelectorAll("#qopts .qopt");\n' +
'    if(bs[q.a])bs[q.a].classList.add("correct");\n' +
'    snd("fail");\n' +
'    qFb(false,"❌ Era: "+q.opts[q.a]);\n' +
'    QS.errors.push({q:q.q,opts:q.opts,correct:q.a,chosen:i});\n' +
'  }\n' +
'  updLives();updStreak();\n' +
'  document.getElementById("qh-stars").textContent="⭐ "+QS.stars;\n' +
'  setTimeout(function(){if(QS.lives<=0){qEnd();return;}QS.idx++;qRender();},1500);\n' +
'}\n' +
'\n' +
'function qFb(ok,msg){\n' +
'  var el=document.getElementById("qfb");\n' +
'  el.textContent=msg;el.className="qfb "+(ok?"ok":"fail");el.style.display="block";\n' +
'}\n' +
'\n' +
'function updLives(){\n' +
'  var el=document.getElementById("qh-lives");\n' +
'  if(el)el.textContent="❤️".repeat(Math.max(0,QS.lives))+(QS.lives<=0?" 💀":"");\n' +
'}\n' +
'\n' +
'function updStreak(){\n' +
'  var el=document.getElementById("qh-streak");\n' +
'  if(!el)return;\n' +
'  if(QS.streak>=2){el.style.display="inline-flex";el.textContent="🔥 "+QS.streak;}\n' +
'  else{el.style.display="none";}\n' +
'}\n' +
'\n' +
'function qEnd(){\n' +
'  clearInterval(timerInt);\n' +
'  var pct=Math.round(QS.correct/CFG.total*100);\n' +
'  var med="📚",ttl="¡Seguí practicando!";\n' +
'  if(pct>=90){med="🥇";ttl="¡Excelente!";snd("win");launchConfetti();}\n' +
'  else if(pct>=70){med="🥈";ttl="¡Muy bien!";}\n' +
'  else if(pct>=50){med="🥉";ttl="¡Aprobado!";}\n' +
'  document.getElementById("qr-medal").textContent=med;\n' +
'  document.getElementById("qr-title").textContent=ttl;\n' +
'  document.getElementById("qr-sub").textContent=pct+"% correctas";\n' +
'  document.getElementById("qr-stats").innerHTML=\n' +
'    \'<div class="stat-row"><span>Correctas</span><span style="color:#1E7A4A;font-weight:700">\'+QS.correct+\' / \'+CFG.total+\'</span></div>\'+\n' +
'    \'<div class="stat-row"><span>Incorrectas</span><span style="color:#C0392B;font-weight:700">\'+QS.wrong+\'</span></div>\'+\n' +
'    \'<div class="stat-row"><span>Mejor racha</span><span>🔥 \'+QS.best+\'</span></div>\'+\n' +
'    \'<div class="stat-row"><span>Estrellas</span><span style="color:#9A6C0A">⭐ \'+QS.stars+\'</span></div>\'+\n' +
'    \'<div class="stat-row" style="border:none"><span>Vidas restantes</span><span>\'+"❤️".repeat(Math.max(0,QS.lives))+\'</span></div>\';\n' +
'  if(QS.errors.length>0)document.getElementById("qbtn-rev").style.display="block";\n' +
'  try{\n' +
'    if(window.opener&&!window.opener.closed)window.opener.postMessage({type:"fab_score",ok:QS.correct,total:CFG.total,pct:pct,mat:CFG.mat},"*");\n' +
'  }catch(e){}\n' +
'  qShow("qs-result");\n' +
'}\n' +
'\n' +
'function toggleRev(){\n' +
'  var r=document.getElementById("qr-review");\n' +
'  if(r.innerHTML){r.innerHTML="";return;}\n' +
'  r.innerHTML=QS.errors.map(function(e,i){\n' +
'    var correct=e.opts[e.correct];\n' +
'    var chosen=e.chosen>=0?\'<span style="color:#C0392B;text-decoration:line-through">Tu respuesta: \'+e.opts[e.chosen]+\'</span>\':\'\u2014\';\n' +
'    return \'<div class="rev-item"><div style="font-weight:600;margin-bottom:6px">\'+(i+1)+\'. \'+e.q+\'</div>\'+chosen+\'<div style="color:#1E7A4A;font-size:.86rem;margin-top:4px">✓ \'+correct+\'</div></div>\';\n' +
'  }).join("");\n' +
'}\n' +
'\n' +
'/* ── SOUND ── */\n' +
'function snd(t){\n' +
'  try{\n' +
'    if(!acCtx)acCtx=new(window.AudioContext||window.webkitAudioContext)();\n' +
'    var o=acCtx.createOscillator(),g=acCtx.createGain();\n' +
'    o.connect(g);g.connect(acCtx.destination);\n' +
'    if(t==="ok"){\n' +
'      o.frequency.setValueAtTime(523,acCtx.currentTime);\n' +
'      o.frequency.setValueAtTime(659,acCtx.currentTime+.1);\n' +
'      o.frequency.setValueAtTime(784,acCtx.currentTime+.2);\n' +
'      g.gain.setValueAtTime(.24,acCtx.currentTime);\n' +
'      g.gain.exponentialRampToValueAtTime(.001,acCtx.currentTime+.5);\n' +
'      o.start();o.stop(acCtx.currentTime+.5);\n' +
'    }else if(t==="fail"){\n' +
'      o.frequency.setValueAtTime(220,acCtx.currentTime);\n' +
'      o.frequency.setValueAtTime(170,acCtx.currentTime+.15);\n' +
'      g.gain.setValueAtTime(.24,acCtx.currentTime);\n' +
'      g.gain.exponentialRampToValueAtTime(.001,acCtx.currentTime+.4);\n' +
'      o.start();o.stop(acCtx.currentTime+.4);\n' +
'    }else if(t==="win"){\n' +
'      [523,587,659,784,988,1047].forEach(function(f,i){\n' +
'        var o2=acCtx.createOscillator(),g2=acCtx.createGain();\n' +
'        o2.connect(g2);g2.connect(acCtx.destination);\n' +
'        o2.frequency.value=f;\n' +
'        g2.gain.setValueAtTime(.16,acCtx.currentTime+i*.09);\n' +
'        g2.gain.exponentialRampToValueAtTime(.001,acCtx.currentTime+i*.09+.3);\n' +
'        o2.start(acCtx.currentTime+i*.09);o2.stop(acCtx.currentTime+i*.09+.3);\n' +
'      });\n' +
'    }else if(t==="streak"){\n' +
'      o.frequency.setValueAtTime(880,acCtx.currentTime);\n' +
'      o.frequency.exponentialRampToValueAtTime(1760,acCtx.currentTime+.18);\n' +
'      g.gain.setValueAtTime(.2,acCtx.currentTime);\n' +
'      g.gain.exponentialRampToValueAtTime(.001,acCtx.currentTime+.25);\n' +
'      o.start();o.stop(acCtx.currentTime+.25);\n' +
'    }\n' +
'  }catch(e){}\n' +
'}\n' +
'\n' +
'/* ── CONFETTI ── */\n' +
'function launchConfetti(){\n' +
'  var cv=document.getElementById("cf");\n' +
'  cv.width=window.innerWidth;cv.height=window.innerHeight;\n' +
'  var ctx=cv.getContext("2d");\n' +
'  var cols=["#fbbf24","#3fb950","#58a6ff","#f471b5","#f59e0b","#a78bfa"];\n' +
'  var ps=Array.from({length:150},function(){\n' +
'    return{x:Math.random()*cv.width,y:-20-Math.random()*cv.height*0.5,\n' +
'      vx:(Math.random()-0.5)*4,vy:Math.random()*3+2,\n' +
'      s:Math.random()*8+4,r:Math.random()*Math.PI*2,vr:(Math.random()-0.5)*0.2,\n' +
'      c:cols[Math.floor(Math.random()*cols.length)]};\n' +
'  });\n' +
'  var frames=0;\n' +
'  (function loop(){\n' +
'    frames++;\n' +
'    ctx.clearRect(0,0,cv.width,cv.height);\n' +
'    ps.forEach(function(p){\n' +
'      p.x+=p.vx;p.y+=p.vy;p.vy+=0.05;p.r+=p.vr;\n' +
'      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);\n' +
'      ctx.fillStyle=p.c;ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*0.5);\n' +
'      ctx.restore();\n' +
'    });\n' +
'    if(frames<260)requestAnimationFrame(loop);\n' +
'    else ctx.clearRect(0,0,cv.width,cv.height);\n' +
'  })();\n' +
'}\n' +
'\n' +
'/* ── KEYBOARD ── */\n' +
'document.addEventListener("keydown",function(e){\n' +
'  var qActive=document.getElementById("s-quiz")&&document.getElementById("s-quiz").classList.contains("active");\n' +
'  var qs=document.querySelector(".qs.active");\n' +
'  if(qActive&&qs&&qs.id==="qs-game"&&!QS.done){\n' +
'    var n=parseInt(e.key);\n' +
'    if(n>=1&&n<=4){\n' +
'      var bs=document.querySelectorAll("#qopts .qopt");\n' +
'      if(bs[n-1])bs[n-1].click();\n' +
'    }\n' +
'  }\n' +
'  if(e.key==="Escape")closePanel();\n' +
'});\n' +
'window.addEventListener("resize",function(){\n' +
'  var cv=document.getElementById("cf");\n' +
'  if(cv){cv.width=window.innerWidth;cv.height=window.innerHeight;}\n' +
'});\n' +
'<\/script>' +
'\n</body>\n</html>';
}
