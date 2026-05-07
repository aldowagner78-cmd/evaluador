#!/usr/bin/env bash
# Levanta el generador en localhost y lo abre en el navegador.
set -e
cd "$(dirname "$0")"

PORT=8000
URL="http://localhost:${PORT}/generador_ui.html"

# Si el puerto está ocupado, probar siguientes
while lsof -i:${PORT} >/dev/null 2>&1; do
  PORT=$((PORT+1))
  URL="http://localhost:${PORT}/generador_ui.html"
done

echo "▶ Generador disponible en: ${URL}"
echo "  (Ctrl+C para detener)"

# Abrir navegador en segundo plano
( sleep 1 && xdg-open "${URL}" >/dev/null 2>&1 ) &

# Servir
exec python3 -m http.server ${PORT}
