// Configuración básica de la aplicación para evitar hardcodear textos.
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Condominio KE',
  city: import.meta.env.VITE_APP_CITY || 'Santa Cruz - Bolivia',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
}


