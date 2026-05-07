// ═══════════════════════════════════════════════════════════════
//  TEMPLATE 3: INFOGRAFÍA SVG
// ═══════════════════════════════════════════════════════════════
function generarInfografia(L, mat, opts) {
  const COLOR = colorMateria(mat);
  const ICON  = iconoMateria(mat);
  const conceptos = L.secciones.map((s,i) => {
    const angle = (i / L.secciones.length) * 2 * Math.PI - Math.PI/2;
    const r = 230;
    const cx = 380 + r * Math.cos(angle);
    const cy = 380 + r * Math.sin(angle);
    return { ...s, cx, cy, i };
  });

  const nodes = conceptos.map(c => `
    <g class="node" style="animation-delay:${c.i*0.15}s">
      <line x1="380" y1="380" x2="${c.cx}" y2="${c.cy}" stroke="${COLOR}" stroke-width="2" stroke-dasharray="4,4" opacity=".5"/>
      <circle cx="${c.cx}" cy="${c.cy}" r="68" fill="#fff" stroke="${COLOR}" stroke-width="3"/>
      <text x="${c.cx}" y="${c.cy-12}" text-anchor="middle" font-family="Orbitron" font-size="14" font-weight="700" fill="${COLOR}">${c.i+1}</text>
      <foreignObject x="${c.cx-58}" y="${c.cy-2}" width="116" height="60">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:'Exo 2';font-size:11px;text-align:center;color:#2C3E50;line-height:1.25;font-weight:600">${c.titulo}</div>
      </foreignObject>
    </g>`).join('');

  const detalles = L.secciones.map((s,i) => `
    <div class="detalle">
      <div class="det-num" style="background:${COLOR}">${i+1}</div>
      <div class="det-content">
        <h3>${s.titulo}</h3>
        <p>${s.texto}</p>
        <div class="det-clave">🔑 ${s.clave}</div>
      </div>
    </div>`).join('');

  return `<!DOCTYPE html>
<html lang="es"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${L.titulo} — Infografía</title>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Exo+2:wght@400;600&display=swap" rel="stylesheet">
<style>${cssBaseLeccion(COLOR)}
body{padding:20px}
.wrap{max-width:900px;margin:0 auto}
.cabezal{text-align:center;padding:30px 20px;background:linear-gradient(135deg,var(--primary),${COLOR}99);color:#fff;border-radius:18px 18px 0 0}
.cabezal h1{color:#fff;font-size:2rem}
.svg-wrap{background:#fff;padding:20px;border-left:1px solid var(--border);border-right:1px solid var(--border);text-align:center}
svg{max-width:100%;height:auto}
.center-circle{fill:${COLOR}}
.node{animation:popIn .5s ease backwards}
@keyframes popIn{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}
.detalles{background:#fff;padding:30px;border:1px solid var(--border);border-top:none;border-radius:0 0 18px 18px}
.detalle{display:flex;gap:18px;padding:18px 0;border-bottom:1px dashed var(--border)}
.detalle:last-child{border:none}
.det-num{flex-shrink:0;width:44px;height:44px;border-radius:50%;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Orbitron',sans-serif;font-weight:700;font-size:1.1rem}
.det-content h3{font-family:'Orbitron',sans-serif;color:var(--primary);font-size:1rem;margin-bottom:6px}
.det-content p{font-size:.94rem;margin-bottom:8px}
.det-clave{display:inline-block;background:${COLOR}15;color:var(--primary);padding:4px 10px;border-radius:5px;font-size:.78rem;font-family:'JetBrains Mono',monospace}
@media print{body{background:#fff}}
</style></head><body>

<div class="wrap">
  <div class="cabezal">
    <div style="font-size:3rem">${ICON}</div>
    <h1>${L.titulo}</h1>
    <p>${L.objetivo}</p>
  </div>
  <div class="svg-wrap">
    <svg viewBox="0 0 760 760" xmlns="http://www.w3.org/2000/svg">
      <circle class="center-circle" cx="380" cy="380" r="90"/>
      <text x="380" y="372" text-anchor="middle" font-family="Orbitron" font-size="42" fill="#fff">${ICON}</text>
      <text x="380" y="402" text-anchor="middle" font-family="Orbitron" font-size="13" font-weight="700" fill="#fff">${L.titulo.length>20?L.titulo.substring(0,18)+'…':L.titulo}</text>
      ${nodes}
    </svg>
  </div>
  <div class="detalles">
    <h2 style="margin-bottom:14px">📋 Detalle de cada concepto</h2>
    ${detalles}
    <div style="margin-top:18px;padding:16px;background:var(--bg2);border-radius:10px;text-align:center;font-style:italic">🎯 ${L.cierre}</div>
  </div>
</div>

</body></html>`;
}
