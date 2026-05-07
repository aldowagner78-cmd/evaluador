// ═══════════════════════════════════════════════════════════════
//  GAMIFICACIÓN: rachas, medallas, niveles, XP
// ═══════════════════════════════════════════════════════════════
const GAMIF_KEY = 'fab_gamif_v1';

function gamifLoad() {
  try {
    return JSON.parse(localStorage.getItem(GAMIF_KEY)) || {
      xp: 0, level: 1, streak: 0, lastDay: null,
      generated: 0, perfect: 0, totalQ: 0, totalOk: 0,
      medals: []
    };
  } catch { return { xp:0, level:1, streak:0, lastDay:null, generated:0, perfect:0, totalQ:0, totalOk:0, medals:[] }; }
}

function gamifSave(g) {
  try { localStorage.setItem(GAMIF_KEY, JSON.stringify(g)); } catch {}
}

function gamifLevel(xp) {
  // 100 xp = nivel 2, luego 150, 200, 250… (progresión gentil)
  let lvl = 1, need = 100, total = 0;
  while (xp >= total + need) { total += need; lvl++; need = 100 + (lvl-1)*50; }
  return { level: lvl, xpThisLevel: xp - total, xpNext: need };
}

function gamifTodayKey() {
  const d = new Date();
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}

// Llamar al generar autoevaluación
function gamifOnGenerate(materia, tema) {
  const g = gamifLoad();
  g.generated += 1;
  g.xp += 10;
  // Racha diaria
  const today = gamifTodayKey();
  if (g.lastDay !== today) {
    const yd = new Date(); yd.setDate(yd.getDate()-1);
    const ydk = yd.getFullYear()+'-'+String(yd.getMonth()+1).padStart(2,'0')+'-'+String(yd.getDate()).padStart(2,'0');
    g.streak = (g.lastDay === ydk) ? g.streak + 1 : 1;
    g.lastDay = today;
    g.xp += 5; // bonus diario
  }
  gamifCheckMedals(g);
  gamifSave(g);
  return g;
}

// Llamar cuando un quiz reporta resultados (postMessage)
function gamifOnScore(ok, total, pct) {
  const g = gamifLoad();
  g.totalOk += ok;
  g.totalQ += total;
  g.xp += ok * 5;
  if (pct === 100) { g.perfect += 1; g.xp += 25; }
  gamifCheckMedals(g);
  gamifSave(g);
  gamifRender();
  return g;
}

const MEDALS_DEF = [
  { id: 'first_gen',     name: '🎯 Primer paso',          when: g => g.generated >= 1 },
  { id: 'gen_10',        name: '⚡ Productivo',           when: g => g.generated >= 10 },
  { id: 'gen_50',        name: '🚀 Imparable',            when: g => g.generated >= 50 },
  { id: 'gen_100',       name: '💯 Centurión',            when: g => g.generated >= 100 },
  { id: 'first_perfect', name: '⭐ Primera estrella',     when: g => g.perfect >= 1 },
  { id: 'perfect_10',    name: '🏆 Constelación',         when: g => g.perfect >= 10 },
  { id: 'streak_3',      name: '🔥 Racha de 3',           when: g => g.streak >= 3 },
  { id: 'streak_7',      name: '🔥🔥 Semana entera',       when: g => g.streak >= 7 },
  { id: 'streak_30',     name: '🌟 Mes completo',         when: g => g.streak >= 30 },
  { id: 'lvl_5',         name: '📚 Aprendiz avanzado',    when: g => gamifLevel(g.xp).level >= 5 },
  { id: 'lvl_10',        name: '🎓 Estudiante experto',   when: g => gamifLevel(g.xp).level >= 10 },
  { id: 'q100',          name: '💪 100 respuestas',       when: g => g.totalQ >= 100 },
];

function gamifCheckMedals(g) {
  const newOnes = [];
  for (const m of MEDALS_DEF) {
    if (!g.medals.includes(m.id) && m.when(g)) {
      g.medals.push(m.id);
      newOnes.push(m);
    }
  }
  if (newOnes.length) {
    setTimeout(() => {
      newOnes.forEach(m => gamifToast('¡Medalla desbloqueada! ' + m.name));
    }, 200);
  }
}

function gamifToast(msg) {
  let t = document.getElementById('gamifToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'gamifToast';
    t.style.cssText = 'position:fixed;top:20px;right:20px;background:linear-gradient(135deg,#fbbf24,#f59e0b);color:#111;padding:14px 18px;border-radius:12px;font-weight:700;z-index:99999;box-shadow:0 6px 22px rgba(245,158,11,0.45);transform:translateX(120%);transition:.4s;max-width:320px;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.transform = 'translateX(0)';
  clearTimeout(window._gamifTo);
  window._gamifTo = setTimeout(() => { t.style.transform = 'translateX(120%)'; }, 3500);
}

function gamifRender() {
  const el = document.getElementById('gamifPanel');
  if (!el) return;
  const g = gamifLoad();
  const lvl = gamifLevel(g.xp);
  const pctXp = Math.round(100 * lvl.xpThisLevel / lvl.xpNext);
  const acc = g.totalQ ? Math.round(100 * g.totalOk / g.totalQ) : 0;
  el.innerHTML = `
    <div class="gamif-grid">
      <div class="gamif-stat">
        <div class="gamif-big">⭐ ${lvl.level}</div>
        <div class="gamif-lbl">Nivel</div>
        <div class="gamif-bar"><div class="gamif-bar-fill" style="width:${pctXp}%"></div></div>
        <div class="gamif-tiny">${lvl.xpThisLevel} / ${lvl.xpNext} XP</div>
      </div>
      <div class="gamif-stat">
        <div class="gamif-big">🔥 ${g.streak}</div>
        <div class="gamif-lbl">Racha días</div>
      </div>
      <div class="gamif-stat">
        <div class="gamif-big">📝 ${g.generated}</div>
        <div class="gamif-lbl">Generadas</div>
      </div>
      <div class="gamif-stat">
        <div class="gamif-big">⭐ ${g.perfect}</div>
        <div class="gamif-lbl">Perfectas</div>
      </div>
      <div class="gamif-stat">
        <div class="gamif-big">🎯 ${acc}%</div>
        <div class="gamif-lbl">Acierto (${g.totalOk}/${g.totalQ})</div>
      </div>
    </div>
    <div class="gamif-medals">
      <div class="gamif-medals-title">🏅 Medallas (${g.medals.length}/${MEDALS_DEF.length})</div>
      <div class="gamif-medals-list">
        ${MEDALS_DEF.map(m => {
          const got = g.medals.includes(m.id);
          return `<span class="gamif-medal${got ? ' got' : ''}" title="${m.name}">${got ? m.name : '🔒 ' + m.name.replace(/^[^\\s]+\\s/,'???')}</span>`;
        }).join('')}
      </div>
    </div>
  `;
}

// Recibir scores de quizzes hijos vía postMessage
window.addEventListener('message', e => {
  if (e?.data?.type === 'fab_score') {
    gamifOnScore(e.data.ok, e.data.total, e.data.pct);
  }
});
