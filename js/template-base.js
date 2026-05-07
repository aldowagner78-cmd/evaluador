// ═══════════════════════════════════════════════════════════════
//  PALETAS Y HEADER COMUNES PARA LECCIONES
// ═══════════════════════════════════════════════════════════════
function colorMateria(materia) {
  return ({mat:'#1A6DB5', len:'#B0266A', nat:'#1E7A4A', soc:'#9A6C0A'})[materia] || '#1A6DB5';
}
function iconoMateria(materia) {
  return ({mat:'🔢', len:'📖', nat:'🔬', soc:'🌎'})[materia] || '📚';
}

const cssBaseLeccion = (color) => `
*{box-sizing:border-box;margin:0;padding:0}
:root{--primary:${color};--bg:#F0F4F8;--bg2:#E6EBF2;--bg3:#DAE1EC;--border:#C0CCDB;--text:#2C3E50;--dim:#7F8C9A;--green:#1E7A4A;--red:#C0392B;--yellow:#9A6C0A}
body{background:var(--bg);color:var(--text);font-family:'Exo 2',sans-serif;line-height:1.6;min-height:100vh}
h1{font-family:'Orbitron',sans-serif;color:var(--primary)}
h2{font-family:'Orbitron',sans-serif;color:var(--primary);font-size:1.2rem;margin-bottom:8px}
.btn{padding:10px 20px;border:none;border-radius:8px;font-family:'Orbitron',sans-serif;font-weight:700;font-size:.85rem;letter-spacing:1.5px;cursor:pointer;transition:all .2s}
.btn-primary{background:var(--primary);color:#fff}
.btn-primary:hover{opacity:.9;transform:translateY(-1px)}
.btn-ghost{background:transparent;border:1px solid var(--border);color:var(--text)}
.btn-ghost:hover{border-color:var(--primary);color:var(--primary)}
.tts-btn{background:var(--bg2);border:1px solid var(--border);border-radius:50%;width:36px;height:36px;cursor:pointer;font-size:1rem;transition:all .15s}
.tts-btn:hover{border-color:var(--primary);transform:scale(1.1)}
.tts-btn.speaking{background:var(--primary);color:#fff;animation:pulse 1s infinite}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
`;

