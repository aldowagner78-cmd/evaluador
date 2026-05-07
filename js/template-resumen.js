// ═══════════════════════════════════════════════════════════════
//  TEMPLATE 2: RESUMEN VISUAL
// ═══════════════════════════════════════════════════════════════
function generarResumen(L, mat, opts) {
  const COLOR = colorMateria(mat);
  const ICON  = iconoMateria(mat);
  const cards = L.secciones.map((s,i) => `
    <div class="card-resumen" style="animation-delay:${i*0.1}s">
      <div class="card-num">${i+1}</div>
      <h3>${s.titulo}</h3>
      <p class="card-text">${s.texto}</p>
      <div class="card-analogia">💡 ${s.analogia}</div>
      <div class="card-clave">${s.clave}</div>
    </div>`).join('');

  return `<!DOCTYPE html>
<html lang="es"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${L.titulo} — Resumen</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Exo+2:wght@400;600&display=swap" rel="stylesheet">
<style>${cssBaseLeccion(COLOR)}
body{padding:30px 20px}
.container{max-width:1100px;margin:0 auto}
.header-r{text-align:center;padding:40px 20px;background:linear-gradient(135deg,var(--primary),${COLOR}aa);color:#fff;border-radius:18px;margin-bottom:30px}
.header-r h1{color:#fff;font-size:2.4rem;margin-bottom:10px}
.header-r p{font-size:1.1rem;opacity:.95}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px}
.card-resumen{background:#fff;border:1px solid var(--border);border-radius:14px;padding:24px;box-shadow:0 2px 12px rgba(0,0,0,.05);position:relative;overflow:hidden;animation:fadeUp .6s ease backwards}
.card-resumen::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--primary)}
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
.card-num{position:absolute;top:14px;right:18px;font-family:'JetBrains Mono',monospace;font-size:2rem;font-weight:900;color:var(--primary);opacity:.18}
.card-resumen h3{font-family:'Orbitron',sans-serif;color:var(--primary);font-size:1.05rem;margin-bottom:10px}
.card-text{font-size:.95rem;color:var(--text);margin-bottom:12px}
.card-analogia{background:${COLOR}10;border-left:3px solid var(--primary);padding:10px 14px;border-radius:6px;font-size:.88rem;font-style:italic;margin-bottom:12px}
.card-clave{display:inline-block;background:var(--primary);color:#fff;padding:6px 12px;border-radius:6px;font-family:'Orbitron',sans-serif;font-size:.7rem;letter-spacing:1.5px}
.cierre-r{text-align:center;margin-top:30px;padding:30px;background:var(--bg2);border-radius:14px}
.cierre-r p{font-size:1.05rem;color:var(--text)}
.btn-print{position:fixed;bottom:20px;right:20px;border-radius:50%;width:54px;height:54px;background:var(--primary);color:#fff;border:none;cursor:pointer;font-size:1.4rem;box-shadow:0 4px 14px rgba(0,0,0,.2)}
@media print{.btn-print{display:none}.card-resumen{break-inside:avoid;page-break-inside:avoid}}
</style></head><body>

<div class="container">
  <div class="header-r">
    <div style="font-size:3.5rem;margin-bottom:8px">${ICON}</div>
    <h1>${L.titulo}</h1>
    <p>${L.objetivo}</p>
  </div>
  <div class="grid">${cards}</div>
  <div class="cierre-r"><p>🎯 ${L.cierre}</p></div>
</div>
<button class="btn-print" onclick="window.print()" title="Imprimir / Guardar PDF">🖨️</button>

</body></html>`;
}
