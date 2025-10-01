## Variables de entorno del frontend

Usamos variables prefijadas con `VITE_`.

Recomendado `.env` en la raíz:
```
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Condominio KE
VITE_APP_CITY=Santa Cruz - Bolivia
```

Notas:
- `VITE_API_URL` se usa en `src/services/api.ts` como `baseURL`.
- `VITE_APP_NAME` y `VITE_APP_CITY` se usan en `src/config/app.ts` para evitar hardcodear textos en el layout.

