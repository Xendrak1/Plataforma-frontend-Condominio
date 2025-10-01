// Configuración básica de la aplicación para evitar hardcodear textos.
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Condominio KE',
  city: import.meta.env.VITE_APP_CITY || 'Santa Cruz - Bolivia',
  // En producción, usar la URL del backend en Azure
  apiUrl: import.meta.env.VITE_API_URL || 
          (import.meta.env.MODE === 'production' 
            ? 'https://contabilidadwebapp-backend-dnhmfyfda0ehb9f7.brazilsouth-01.azurewebsites.net/api'
            : 'http://localhost:8000/api'),
}


