## Frontend Condominio KE (Santa Cruz, Bolivia)

Objetivo: Interfaz web simple y clara para gestionar un único condominio.

Tecnologías:
- React + TypeScript + Vite
- React Router (rutas)
- React Query (estado del servidor)
- Axios (HTTP)

Estructura (resumen):
- `src/router.tsx`: define las rutas principales.
- `src/shared/layouts/AppLayout.tsx`: layout con menú lateral y contenido.
- `src/shared/pages/*`: páginas vacías con notas de propósito.
- `src/services/api.ts`: cliente HTTP y helper de errores.

Cómo correr:
1. `npm install`
2. `npm run dev`

Configurar backend:
- Variable `VITE_API_URL` en `.env` (opcional). Por defecto `http://localhost:8000/api`.

Notas de defensa:
- Mantuvimos un layout minimalista para facilitar navegación y explicación.
- Cada página tiene un texto indicando su objetivo pendiente de conectar a Django.
- React Query quedó listo para integrar llamadas reales cuando el backend esté.

### Variables de entorno (frontend)
- `VITE_API_URL`: URL base del backend Django (ej: `http://localhost:8000/api`).
- `VITE_APP_NAME`: Nombre del condominio (ej: `Condominio KE`).
- `VITE_APP_CITY`: Ciudad (ej: `Santa Cruz - Bolivia`).

Crea un archivo `.env` en la raíz con:
```
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Condominio KE
VITE_APP_CITY=Santa Cruz - Bolivia
```

### Pasar de datos mock a API real
1) En `src/features/residents/service.ts` y `src/features/homes/service.ts` descomenta las funciones `fetch*` y ajusta los endpoints.
2) En los hooks (`src/features/*/hooks.ts`) cambia el `queryFn` para usar el `service` real:
```ts
// Ejemplo:
import { fetchResidents } from './service'
return useQuery({ queryKey: ['residents'], queryFn: fetchResidents })
```
3) Verifica que `VITE_API_URL` apunte al backend en ejecución.
