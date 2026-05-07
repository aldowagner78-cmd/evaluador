// ═══════════════════════════════════════════════════════════════
//  INICIALIZACIÓN
// ═══════════════════════════════════════════════════════════════
function toggleTheme(btn) {
  const html = document.documentElement;
  const dark = html.getAttribute('data-theme') === 'dark';
  if (dark) {
    html.removeAttribute('data-theme');
    btn.querySelector('.th-icon').textContent  = '🌙';
    btn.querySelector('.th-label').textContent = 'Modo Oscuro';
    localStorage.setItem('fab_theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    btn.querySelector('.th-icon').textContent  = '☀️';
    btn.querySelector('.th-label').textContent = 'Modo Claro';
    localStorage.setItem('fab_theme', 'dark');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Restaurar tema guardado
  const savedTheme = localStorage.getItem('fab_theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    const btn = document.querySelector('.btn-theme');
    if (btn) {
      btn.querySelector('.th-icon').textContent  = '☀️';
      btn.querySelector('.th-label').textContent = 'Modo Claro';
    }
  }
  if (!document.getElementById('history-container')) {
    const div = document.createElement('div');
    div.id = 'history-container';
    document.querySelector('.panel-right').appendChild(div);
  }

  if (typeof detectOllama === 'function') {
    detectOllama();
  }

  if (typeof gamifRender === 'function') {
    gamifRender();
  }

  renderHistory();
  updatePreview();
});
