# Configuración de Variables de Entorno en Azure

## Variables que debes configurar en Azure App Service:

1. Ve a: https://portal.azure.com
2. Busca tu App Service: `contabilidadwebapp-frontendsi2`
3. Ve a: **Configuration** > **Application settings**
4. Agrega las siguientes variables:

### Variables de Entorno:

```
VITE_APP_NAME=Condominio KE
VITE_APP_CITY=Santa Cruz - Bolivia
VITE_API_URL=https://contabilidadwebapp-backend-dnhmfyfda0ehb9f7.brazilsouth-01.azurewebsites.net/api
NODE_ENV=production
PORT=8080
```

## Startup Command:

En la sección **Configuration** > **General settings**:

- **Startup Command**: `node server.mjs`

## CORS en el Backend:

Asegúrate de que el backend tenga configurado CORS para aceptar requests desde:
- `https://contabilidadwebapp-frontendsi2.azurewebsites.net`

## Después de configurar:

1. Guarda los cambios
2. Reinicia el App Service
3. Espera 2-3 minutos
4. Prueba nuevamente la URL
