## Notas rápidas de arquitectura (Frontend)

- App con React + Vite + TS, enfocada a un solo condominio (SCZ, Bolivia).
- Rutas en `src/router.tsx`, Layout en `src/shared/layouts/AppLayout.tsx`.
- Estados de servidor con React Query. Servicios HTTP vía `src/services/api.ts`.
- Páginas por módulo en `src/shared/pages/*`, datos mock y notas de propósito.
- Config de textos en `src/config/app.ts` y navegación en `src/config/nav.ts`.

### Cómo conectar a Django
1. Ajusta `VITE_API_URL` en `.env`.
2. Descomenta funciones en `src/features/*/service.ts` y cambia `queryFn` de los hooks para usar esas funciones.
3. Maneja estados (loading/error) ya preparados en las páginas con `Loader` y `Note`.


