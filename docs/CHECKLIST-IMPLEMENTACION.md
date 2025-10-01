# ✅ CHECKLIST: Implementación de Autenticación

## 📋 Para Eduardo - Qué hacer

### PASO 1: Dar instrucciones al Claude del Backend
- [ ] Abrir el backend en otra ventana de VS Code
- [ ] Iniciar chat con Claude en el backend
- [ ] Copiar y pegar el contenido de `PROMPT-PARA-CLAUDE-BACKEND.txt`
- [ ] Esperar a que Claude del backend confirme que entendió

### PASO 2: Monitorear el progreso del backend
Claude del backend debería completar estos pasos:

- [ ] ✅ Instalar djangorestframework-simplejwt
- [ ] ✅ Crear app `usuarios`
- [ ] ✅ Modificar `settings.py` (agregar JWT config)
- [ ] ✅ Crear `usuarios/models.py` (Modelo Usuario)
- [ ] ✅ Crear `usuarios/serializers.py`
- [ ] ✅ Crear `usuarios/views.py`
- [ ] ✅ Crear `usuarios/urls.py`
- [ ] ✅ Modificar `api_urls.py`
- [ ] ✅ Ejecutar migraciones
- [ ] ✅ Crear superusuario
- [ ] ✅ Probar login con curl
- [ ] ✅ Hacer commit y push

### PASO 3: Verificar que el backend funcione

Una vez que Claude del backend termine, prueba:

```bash
# Probar login
curl -X POST https://contabilidadwebapp-backend-dnhmfyfda0ehb9f7.brazilsouth-01.azurewebsites.net/api/auth/login/ ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"password\":\"PASSWORD_QUE_CONFIGURASTE\"}"
```

**Respuesta esperada:**
```json
{
  "message": "Login exitoso",
  "access": "eyJ0eXAi...",
  "refresh": "eyJ0eXAi...",
  "user": {
    "id": 1,
    "username": "admin",
    "rol": "SUPER_ADMIN"
  }
}
```

- [ ] ✅ Login funciona y retorna token
- [ ] ✅ Endpoint /auth/me/ funciona con el token

### PASO 4: Implementar Frontend (yo me encargo)

Una vez que el backend esté listo, yo (Claude del frontend) voy a:

- [ ] Crear páginas de login
- [ ] Configurar AuthContext
- [ ] Configurar interceptors de axios
- [ ] Proteger rutas con PrivateRoute
- [ ] Agregar logout al TopBar
- [ ] Crear página de gestión de usuarios

### PASO 5: Probar todo integrado

- [ ] Login desde el frontend web
- [ ] Ver que el dashboard carga datos
- [ ] Logout funcional
- [ ] Rutas protegidas funcionan

---

## 📄 Documentos Creados

He creado estos documentos en `Frontend/docs/`:

1. **INSTRUCCIONES-PARA-BACKEND.md** (13 pasos detallados con código)
   - Guía completa para Claude del backend
   - Todo el código listo para copiar/pegar
   - Troubleshooting incluido

2. **PROMPT-PARA-CLAUDE-BACKEND.txt** (prompt inicial)
   - Texto para copiar y pegar al otro Claude
   - Explica el contexto y la tarea

3. **GUIA-BACKEND-AUTENTICACION.md** (guía de 11 pasos)
   - Guía alternativa más detallada
   - Script batch incluido

4. **PLAN-AUTENTICACION.md** (plan completo)
   - Análisis de lo que falta
   - Plan de backend Y frontend

5. **ANALISIS-FUNCIONALIDADES.md** (análisis general)
   - Estado actual del sistema
   - Funcionalidades faltantes

---

## 🎯 Siguiente Acción INMEDIATA

**¿Qué hacer AHORA?**

1. Abre VS Code en la carpeta del backend
2. Inicia un chat con Claude
3. Copia y pega el contenido de: `Frontend/docs/PROMPT-PARA-CLAUDE-BACKEND.txt`
4. Espera a que Claude del backend confirme
5. Monitorea el progreso
6. Prueba que funcione
7. Avísame cuando esté listo para implementar el frontend

---

## 💡 Tips

- **No cierres** el chat con el Claude del backend hasta que termine todo
- **Guarda** el usuario y contraseña del superusuario que crees
- **Prueba** cada endpoint después de deployar
- Si algo falla, el Claude del backend tiene troubleshooting en el documento

---

## ❓ FAQ

**P: ¿Cuánto tiempo tomará?**
R: Si Claude del backend sigue las instrucciones, 15-30 minutos.

**P: ¿Qué pasa con la base de datos?**
R: Django maneja todo con migraciones, no hay que tocar nada manual.

**P: ¿Y si hay errores?**
R: Claude del backend tiene sección de troubleshooting en el documento.

**P: ¿Puedo hacer cambios después?**
R: Sí, todo es modificable. Esto es solo la base.

---

## 🚀 Estado Actual

- ✅ Frontend funcionando en Azure
- ✅ Backend funcionando en Azure
- ✅ CORS configurado
- ✅ Base de datos conectada
- ❌ Falta autenticación (esto es lo que vamos a hacer)

---

¡Avísame cuando el Claude del backend termine y probemos juntos! 🎉
