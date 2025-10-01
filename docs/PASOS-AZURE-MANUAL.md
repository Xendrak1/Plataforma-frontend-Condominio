# Pasos para Configurar Azure App Service

## 1. Ir al Azure Portal
👉 https://portal.azure.com

## 2. Buscar tu App Service
- En la barra de búsqueda, escribe: **contabilidadwebapp-frontendsi2**
- Haz clic en el recurso

## 3. Configurar Variables de Entorno

### A. En el menú lateral izquierdo:
- Ve a **"Configuration"** (Configuración)
- Ve a la pestaña **"Application settings"**

### B. Agregar estas variables (haz clic en "+ New application setting"):

**Variable 1:**
- Name: `VITE_API_URL`
- Value: `https://contabilidadwebapp-backend-dnhmfyfda0ehb9f7.brazilsouth-01.azurewebsites.net/api`

**Variable 2:**
- Name: `NODE_ENV`
- Value: `production`

**Variable 3:**
- Name: `PORT`
- Value: `8080`

**Variable 4:**
- Name: `WEBSITE_NODE_DEFAULT_VERSION`
- Value: `~22`

### C. Haz clic en **"Save"** (Guardar) arriba

## 4. Configurar Startup Command

### A. En la misma página de Configuration:
- Mantente en la pestaña **"Configuración general"** (General settings)
- **BAJA CON EL SCROLL** hasta encontrar la sección "Configuración de la pila" o "Stack settings"
- Busca el campo **"Comando de inicio"** o **"Startup Command"** (puede estar más abajo)
- Si NO aparece el campo, entonces:
  
### B. ALTERNATIVA - Usar el package.json (MÁS FÁCIL):
- No necesitas configurar nada aquí
- Azure automáticamente ejecutará `npm start` del package.json
- Ya lo tenemos configurado correctamente

### C. Haz clic en **"Save"** (Guardar) arriba

## 5. Reiniciar el App Service

### A. En el menú lateral izquierdo:
- Ve a **"Overview"** (Información general)
- Haz clic en **"Restart"** (Reiniciar) en la barra superior

### B. Espera 2-3 minutos

## 6. Verificar que funcione

Abre tu navegador y ve a:
👉 https://contabilidadwebapp-frontendsi2.azurewebsites.net

Si ves un error 503, espera un poco más y refresca la página.

## 7. Ver los Logs (si hay problemas)

### A. En el menú lateral izquierdo:
- Ve a **"Log stream"** (Transmisión de registros)
- Podrás ver los logs del servidor en tiempo real
- Busca el mensaje: "✅ Server running on port 8080"

---

## ⚠️ IMPORTANTE: Configurar CORS en el Backend

El backend también necesita permitir requests desde el frontend.

1. Ve al App Service del backend: **contabilidadwebapp-backend-dnhmfyfda0ehb9f7**
2. Agrega esta URL a las CORS permitidas:
   - `https://contabilidadwebapp-frontendsi2.azurewebsites.net`
