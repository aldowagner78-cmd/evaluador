# 🤖 Guía Ollama — PC Intel i5 / 12GB RAM / Sin GPU dedicada

## ¿Qué es Ollama?

Corre modelos de IA **completamente local**, sin internet, gratis, privado.
Tu HTML le pregunta cosas → Ollama responde desde tu propia PC.

---

## ✅ Tu hardware — qué podés correr

| Componente | Tu PC                          | Requerimiento mínimo             |
| ---------- | ------------------------------ | -------------------------------- |
| CPU        | Intel Core i5                  | ✅ Suficiente                    |
| RAM        | 12 GB                          | ✅ Suficiente para modelos 3B-7B |
| GPU        | Sin dedicada (Intel integrada) | ⚠️ Todo corre en CPU (más lento) |
| Disco      | 1.5 TB                         | ✅ Sobra espacio                 |

**Expectativa realista**: con CPU sola, velocidad de respuesta ~10-30 tokens/segundo. Para explicaciones educativas cortas es perfectamente usable.

---

## 📦 Modelos recomendados (ordenados por eficiencia)

### 🏆 MEJOR OPCIÓN para tu PC

| Modelo             | Tamaño | RAM usada | Velocidad     | Calidad            | Comando                      |
| ------------------ | ------ | --------- | ------------- | ------------------ | ---------------------------- |
| **qwen2.5:3b**     | 1.9 GB | ~4 GB     | ⚡⚡⚡ Rápido | ⭐⭐⭐⭐ Muy buena | `ollama pull qwen2.5:3b`     |
| **llama3.2:3b**    | 2.0 GB | ~4 GB     | ⚡⚡⚡ Rápido | ⭐⭐⭐⭐ Muy buena | `ollama pull llama3.2:3b`    |
| **gemma3:4b**      | 2.5 GB | ~5 GB     | ⚡⚡ Bueno    | ⭐⭐⭐⭐ Muy buena | `ollama pull gemma3:4b`      |
| **phi4-mini:3.8b** | 2.5 GB | ~5 GB     | ⚡⚡ Bueno    | ⭐⭐⭐⭐ Muy buena | `ollama pull phi4-mini:3.8b` |

### 🇨🇳 Modelos chinos (excelentes, muy eficientes)

| Modelo               | Tamaño | Notas                                                 | Comando                        |
| -------------------- | ------ | ----------------------------------------------------- | ------------------------------ |
| **qwen2.5:3b**       | 1.9 GB | De Alibaba, top en razonamiento, excelente en español | `ollama pull qwen2.5:3b`       |
| **qwen2.5:7b**       | 4.7 GB | Versión más potente, corre si tenés RAM libre         | `ollama pull qwen2.5:7b`       |
| **deepseek-r1:1.5b** | 1.1 GB | De DeepSeek, ultra liviano, muy rápido                | `ollama pull deepseek-r1:1.5b` |
| **deepseek-r1:7b**   | 4.7 GB | Con razonamiento paso a paso                          | `ollama pull deepseek-r1:7b`   |

### ❌ NO instalar en tu PC (demasiado grandes)

- llama3:70b, mixtral:8x7b, deepseek-r1:32b → necesitan 32-64 GB RAM

---

## 🚀 Instalación paso a paso

### Windows

```
1. Ir a: https://ollama.com/download
2. Descargar "Download for Windows"
3. Ejecutar el instalador (OllamaSetup.exe)
4. Abrir PowerShell o CMD
5. Verificar: ollama --version
```

### Linux (Ubuntu/Debian)

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama --version
```

### macOS

```bash
# Opción A: desde el sitio
# Ir a https://ollama.com/download → descargar .dmg

# Opción B: con Homebrew
brew install ollama
```

---

## 📥 Instalar modelos

```bash
# El que más recomiendo para este proyecto (bueno, liviano, español):
ollama pull qwen2.5:3b

# Alternativa rápida ultra liviana:
ollama pull deepseek-r1:1.5b

# Si querés más calidad y tenés RAM disponible:
ollama pull llama3.2:3b

# Ver modelos instalados:
ollama list

# Ver cuánto RAM usa mientras corre:
ollama ps
```

---

## 🌐 Configurar para que el niño lo use desde OTRA PC

Por defecto Ollama solo acepta conexiones de `localhost`.
Para que el HTML del niño (en otra máquina) lo use, hay que exponerlo en la red:

### Windows — variable de entorno

```
1. Buscar "Variables de entorno" en el menú inicio
2. En Variables del sistema → Nueva:
   Nombre:  OLLAMA_HOST
   Valor:   0.0.0.0:11434
3. Reiniciar Ollama
```

### Linux

```bash
# Editar el servicio:
sudo systemctl edit ollama

# Agregar estas líneas:
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"

# Reiniciar:
sudo systemctl restart ollama
```

### Encontrar tu IP local (para poner en el generador)

```bash
# Linux/Mac:
ip a | grep "inet " | grep -v "127.0.0"

# Windows (PowerShell):
ipconfig | findstr "IPv4"
# Buscar algo como: 192.168.1.XX
```

Una vez que tengas la IP, en el generador de lecciones ponés esa IP en el campo "IP de Ollama":

```
192.168.1.15:11434
```

(reemplazá con tu IP real)

---

## ⚡ Guía rápida de uso

```bash
# Iniciar Ollama (si no arranca automáticamente):
ollama serve

# Chatear en la terminal (para probar):
ollama run qwen2.5:3b
>>> Explicá qué son los estados de la materia para un niño de 6to grado
>>> /bye    (para salir)

# Consulta rápida sin chat interactivo:
echo "¿Qué es la fotosíntesis? Explicá en 3 oraciones simples" | ollama run qwen2.5:3b

# Ver modelos disponibles online:
# https://ollama.com/library

# Eliminar un modelo que no usás:
ollama rm nombre-del-modelo

# Ver cuánto espacio usan:
ollama list
```

---

## 🔌 Cómo lo usa el generador de lecciones

El generador embebe la IP de Ollama **dentro del HTML** que se descarga.
Cuando el niño hace clic en una palabra clave o en "Explicame más":

```
[HTML del niño] → pregunta a → [Ollama en tu PC] → responde → [panel animado en el HTML]
```

Si Ollama no está corriendo o no hay red:
→ El HTML usa automáticamente el contenido offline preescrito (funciona igual, pero sin expansión IA)

---

## 📋 Checklist de instalación

```
[ ] 1. Descargar e instalar Ollama desde ollama.com/download
[ ] 2. Abrir terminal/CMD y correr: ollama pull qwen2.5:3b
[ ] 3. Probar: ollama run qwen2.5:3b → escribir algo → /bye
[ ] 4. Si querés usarlo desde otra PC: configurar OLLAMA_HOST=0.0.0.0:11434
[ ] 5. Anotar tu IP local (192.168.1.XX)
[ ] 6. Abrir el generador → configurar la IP de Ollama
[ ] 7. Generar una lección y probar el botón "Explicame más"
```

---

## 🆚 Comparativa rápida: ¿cuál elegir?

| Si querés...                  | Usá                            |
| ----------------------------- | ------------------------------ |
| Lo más rápido posible         | `deepseek-r1:1.5b`             |
| Mejor calidad en español      | `qwen2.5:3b` ← **recomendado** |
| Balanceo calidad/velocidad    | `llama3.2:3b`                  |
| Máxima calidad (si tenés RAM) | `qwen2.5:7b` o `gemma3:4b`     |

---

## ❓ Problemas comunes

**"ollama: command not found"**
→ Cerrar y volver a abrir la terminal después de instalar

**Responde muy lento**
→ Normal sin GPU. Probá con `deepseek-r1:1.5b` que es más liviano

**"connection refused" desde el HTML del niño**
→ Fijate que OLLAMA_HOST esté configurado en 0.0.0.0:11434 y que el firewall no bloquee el puerto 11434

**El modelo no responde en español**
→ El prompt del generador ya incluye "respondé en español", pero podés forzarlo:
`ollama run qwen2.5:3b --system "Siempre respondé en español argentino, de forma simple y clara"`
