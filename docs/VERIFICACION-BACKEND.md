# ✅ VERIFICACIÓN DE ENDPOINTS DEL BACKEND

## 📋 Endpoints que el Frontend Necesita

### 🔐 Autenticación (Ya implementados según instrucciones)

✅ **POST /api/auth/login/**
- Body: `{ username, password }`
- Respuesta: `{ access, refresh, user: {...} }`

✅ **POST /api/auth/logout/**
- Headers: `Authorization: Bearer {token}`
- Body: `{ refresh_token }`
- Respuesta: `{ detail: "Logged out successfully" }`

✅ **GET /api/auth/me/**
- Headers: `Authorization: Bearer {token}`
- Respuesta: `{ id, username, email, first_name, last_name, rol, telefono, activo, nombre_completo }`

✅ **POST /api/auth/change-password/**
- Headers: `Authorization: Bearer {token}`
- Body: `{ old_password, new_password, new_password2 }`
- Respuesta: `{ detail: "Password changed successfully" }`

✅ **POST /api/auth/token/refresh/**
- Body: `{ refresh }`
- Respuesta: `{ access, refresh }`

---

### 👥 Gestión de Usuarios (Ya implementados según instrucciones)

✅ **GET /api/usuarios/**
- Headers: `Authorization: Bearer {token}`
- Permisos: Solo ADMIN o SUPER_ADMIN
- Respuesta: `[{ id, username, email, ... }, ...]`

✅ **POST /api/usuarios/**
- Headers: `Authorization: Bearer {token}`
- Permisos: Solo ADMIN o SUPER_ADMIN
- Body: `{ username, email, password, password2, first_name, last_name, rol, telefono }`
- Respuesta: `{ id, username, email, ... }`

✅ **GET /api/usuarios/{id}/**
- Headers: `Authorization: Bearer {token}`
- Permisos: Solo ADMIN o SUPER_ADMIN
- Respuesta: `{ id, username, email, ... }`

✅ **PUT /api/usuarios/{id}/**
- Headers: `Authorization: Bearer {token}`
- Permisos: Solo ADMIN o SUPER_ADMIN
- Body: `{ username, email, first_name, last_name, rol, telefono }` (sin password)
- Respuesta: `{ id, username, email, ... }`

✅ **DELETE /api/usuarios/{id}/**
- Headers: `Authorization: Bearer {token}`
- Permisos: Solo ADMIN o SUPER_ADMIN
- Respuesta: 204 No Content

✅ **PUT /api/usuarios/{id}/cambiar-rol/**
- Headers: `Authorization: Bearer {token}`
- Permisos: Solo SUPER_ADMIN
- Body: `{ rol: "ADMIN" | "CONTADOR" | ... }`
- Respuesta: `{ id, username, email, rol, ... }`

✅ **PATCH /api/usuarios/{id}/**
- Headers: `Authorization: Bearer {token}`
- Permisos: Solo ADMIN o SUPER_ADMIN
- Body: `{ activo: true | false }`
- Respuesta: `{ id, username, email, activo, ... }`

---

## 🔍 VERIFICACIÓN NECESARIA

### ✅ Lo que el backend Claude YA implementó (según instrucciones):

1. ✅ JWT con djangorestframework-simplejwt
2. ✅ Modelo Usuario con campos:
   - username, email, password (hasheado)
   - first_name, last_name
   - rol (SUPER_ADMIN, ADMIN, CONTADOR, GUARDIA, RESIDENTE)
   - telefono
   - activo (boolean)
   - fecha_creacion, ultima_actualizacion
3. ✅ Propiedad `nombre_completo` en el modelo
4. ✅ Todos los endpoints de autenticación
5. ✅ Todos los endpoints de gestión de usuarios
6. ✅ ViewSet para usuarios con permisos
7. ✅ CORS configurado con URL del frontend
8. ✅ Usuario admin creado (admin/admin123)

---

## ⚠️ COSAS A VERIFICAR EN EL BACKEND

### 1. Verificar que el endpoint PATCH existe

El frontend usa:
```typescript
async toggleActivo(id: number, activo: boolean): Promise<User> {
  const { data } = await api.patch(`/usuarios/${id}/`, { activo })
  return data
}
```

**Verificar:**
- El ViewSet de usuarios debe permitir `partial_update` (PATCH)
- Debe aceptar `{ activo: true/false }` en el body
- Debe actualizar solo el campo activo

Si no existe, agregar en `usuarios/views.py`:
```python
def partial_update(self, request, *args, **kwargs):
    """Actualización parcial - usado para toggle activo/inactivo"""
    instance = self.get_object()
    
    # Solo permitir actualizar el campo 'activo'
    if 'activo' in request.data:
        instance.activo = request.data['activo']
        instance.save()
        
    serializer = self.get_serializer(instance)
    return Response(serializer.data)
```

---

### 2. Verificar que el endpoint PUT /usuarios/{id}/cambiar-rol/ existe

El frontend usa:
```typescript
async cambiarRol(id: number, rol: string): Promise<User> {
  const { data } = await api.put(`/usuarios/${id}/cambiar-rol/`, { rol })
  return data
}
```

**Verificar:**
- Existe una acción personalizada `cambiar_rol` en el ViewSet
- Solo SUPER_ADMIN puede usarla
- Acepta `{ rol: "ADMIN" }` en el body

Si no existe, agregar en `usuarios/views.py`:
```python
@action(detail=True, methods=['put'], permission_classes=[IsSuperAdmin])
def cambiar_rol(self, request, pk=None):
    """Cambiar rol de un usuario - Solo SUPER_ADMIN"""
    usuario = self.get_object()
    nuevo_rol = request.data.get('rol')
    
    if nuevo_rol not in dict(Usuario.ROL_CHOICES):
        return Response(
            {'error': 'Rol inválido'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    usuario.rol = nuevo_rol
    usuario.save()
    
    serializer = self.get_serializer(usuario)
    return Response(serializer.data)
```

---

### 3. Verificar CORS

El backend debe tener en `settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    'https://contabilidadwebapp-frontendlinux-fpbdc9h0byguh5dk.brazilsouth-01.azurewebsites.net',
]

CORS_ALLOW_CREDENTIALS = True
```

---

### 4. Verificar Serializer de Usuario

El serializer debe incluir `nombre_completo` como read-only field:
```python
class UsuarioSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.CharField(read_only=True)
    
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                  'nombre_completo', 'rol', 'telefono', 'activo', 
                  'fecha_creacion', 'ultima_actualizacion']
        read_only_fields = ['id', 'nombre_completo', 'fecha_creacion', 'ultima_actualizacion']
```

---

### 5. Verificar CreateUsuarioSerializer

Debe aceptar password y password2 para creación:
```python
class CreateUsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True)
    
    class Meta:
        model = Usuario
        fields = ['username', 'email', 'password', 'password2', 
                  'first_name', 'last_name', 'rol', 'telefono']
    
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        return data
    
    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        usuario = Usuario(**validated_data)
        usuario.set_password(password)
        usuario.save()
        return usuario
```

---

### 6. Verificar UpdateUsuarioSerializer

Debe permitir actualizar sin contraseña:
```python
class UpdateUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['username', 'email', 'first_name', 'last_name', 
                  'rol', 'telefono']
```

---

## 🎯 RESUMEN

### ✅ Backend Ya Tiene (según instrucciones):
- JWT configurado
- Modelo Usuario completo
- Endpoints de autenticación (login, logout, me, change-password, refresh)
- ViewSet de usuarios con permisos
- CORS configurado

### ⚠️ Backend Debe Verificar:
1. Que el endpoint **PATCH /api/usuarios/{id}/** funcione para toggle activo
2. Que el endpoint **PUT /api/usuarios/{id}/cambiar-rol/** exista y funcione
3. Que el serializer incluya `nombre_completo`
4. Que CreateUsuarioSerializer acepte password/password2
5. Que UpdateUsuarioSerializer NO requiera password

---

## 🧪 CÓMO PROBAR

### Test 1: Autenticación
```bash
# Login
curl -X POST https://backend-url/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Debe retornar: { access, refresh, user: {...} }
```

### Test 2: Listar Usuarios
```bash
curl -X GET https://backend-url/api/usuarios/ \
  -H "Authorization: Bearer {access_token}"

# Debe retornar: [{ id, username, email, ... }]
```

### Test 3: Crear Usuario
```bash
curl -X POST https://backend-url/api/usuarios/ \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test",
    "email": "test@test.com",
    "password": "12345678",
    "password2": "12345678",
    "first_name": "Test",
    "last_name": "User",
    "rol": "RESIDENTE",
    "telefono": "123456789"
  }'

# Debe retornar: { id, username, email, ... }
```

### Test 4: Toggle Activo
```bash
curl -X PATCH https://backend-url/api/usuarios/2/ \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json" \
  -d '{"activo": false}'

# Debe retornar: { id, username, activo: false, ... }
```

### Test 5: Cambiar Rol
```bash
curl -X PUT https://backend-url/api/usuarios/2/cambiar-rol/ \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json" \
  -d '{"rol": "ADMIN"}'

# Debe retornar: { id, username, rol: "ADMIN", ... }
```

---

## 📝 CONCLUSIÓN

**¿Hay que decirle algo al backend?**

**SÍ, pero solo para VERIFICAR** que estos 2 endpoints funcionan correctamente:

1. ✅ **PATCH /api/usuarios/{id}/** - Para toggle activo/inactivo
2. ✅ **PUT /api/usuarios/{id}/cambiar-rol/** - Para cambiar rol de usuario

Si esos 2 endpoints YA están implementados según las instrucciones que le diste, entonces **NO hay que decirle NADA más al backend**. Todo lo demás ya debería estar listo.

**Puedes pedirle al backend Claude que:**
1. Verifique que esos 2 endpoints existen y funcionan
2. Pruebe crear un usuario desde Postman/curl
3. Pruebe hacer PATCH para cambiar activo
4. Pruebe hacer PUT para cambiar rol
5. Te confirme que todo funciona

Si algo falta, usa las instrucciones de código de arriba para que lo implemente.
