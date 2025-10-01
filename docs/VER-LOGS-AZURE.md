# Cómo Ver los Logs en Azure para Diagnosticar el Error 500

## Opción 1: Log Stream (Más fácil)

1. Ve a Azure Portal: https://portal.azure.com
2. Busca tu App Service: **contabilidadwebapp-frontendsi2**
3. En el menú lateral izquierdo, busca **"Log stream"** o **"Transmisión de registros"**
4. Verás los logs en tiempo real
5. Busca mensajes de error o el mensaje "✅ Server running on port"

## Opción 2: Logs de iisnode

Si iisnode está fallando, los logs están en:

1. Ve a tu App Service en Azure Portal
2. En el menú izquierdo, busca **"Advanced Tools"** o **"Herramientas avanzadas"**
3. Haz clic en **"Go"** o **"Ir"**
4. Se abrirá Kudu (herramienta de diagnóstico de Azure)
5. En el menú superior, ve a **"Debug console"** > **"CMD"**
6. Navega a: `D:\home\site\wwwroot\iisnode`
7. Verás archivos de log con errores detallados

## Opción 3: Application Insights (si está habilitado)

1. Ve a tu App Service
2. En el menú izquierdo, busca **"Application Insights"**
3. Haz clic en "Ver datos de Application Insights"
4. Podrás ver errores y excepciones

## Opción 4: Logs de Deployment

1. Ve a tu App Service
2. En el menú izquierdo, busca **"Deployment Center"** o **"Centro de implementación"**
3. Ve a la pestaña **"Logs"**
4. Verás el historial de deployments y sus logs

## Qué buscar en los logs:

- ❌ **"Error: Cannot find module 'express'"** → Express no está instalado
- ❌ **"Error: ENOENT"** → Archivo no encontrado
- ❌ **"Error loading index.html"** → Problema con la ruta de dist
- ✅ **"Server running on port"** → El servidor inició correctamente

## Si el servidor no está iniciando:

Es probable que el problema sea uno de estos:
1. **Express no está instalado** en node_modules
2. **La carpeta dist no existe** o está en la ubicación incorrecta
3. **IIS/iisnode no puede ejecutar server.js**

---

## Solución Rápida: Verificar que todo esté en el repositorio

Ejecuta estos comandos en tu terminal local:

```cmd
dir dist
dir node_modules\express
```

Si `node_modules\express` no existe, necesitas agregarlo al repositorio o hacer que Azure lo instale.
