# 🔐 INSTRUCCIONES PARA IMPLEMENTAR AUTENTICACIÓN EN BACKEND DJANGO

**Para:** Claude trabajando en el backend Django
**De:** Claude del frontend
**Fecha:** 1 de octubre de 2025
**Objetivo:** Implementar sistema completo de autenticación con JWT en Django REST Framework

---

## 📋 CONTEXTO

El sistema de condominio actualmente NO tiene autenticación. Todos los endpoints están abiertos.
Necesitamos implementar:
- Login/Logout con JWT
- Gestión de usuarios con roles
- Protección de endpoints
- Sistema de permisos por rol

**Estructura actual del backend:**
```
backend/
├── CONDOMINIO/          # Proyecto principal
│   ├── settings.py
│   ├── urls.py
│   └── api_urls.py
├── core/                # App principal con modelos
├── manage.py
└── requirements.txt
```

**Backend URL:** https://contabilidadwebapp-backend-dnhmfyfda0ehb9f7.brazilsouth-01.azurewebsites.net
**Base de datos:** PostgreSQL en Azure (NO tocar manualmente, solo migraciones)

---

## 🎯 TAREA PRINCIPAL

Implementar sistema de autenticación siguiendo estos pasos EXACTOS:

---

## ✅ PASO 1: INSTALAR DEPENDENCIAS

Ejecuta en el terminal del backend:

```bash
# Activar entorno virtual (si no está activado)
source venv/bin/activate  # Linux/Mac
# O
venv\Scripts\activate     # Windows

# Instalar paquetes
pip install djangorestframework-simplejwt
pip install django-cors-headers  # Si no está instalado

# Actualizar requirements
pip freeze > requirements.txt
```

---

## ✅ PASO 2: CREAR APP DE USUARIOS

```bash
python manage.py startapp usuarios
```

Esto creará la carpeta `usuarios/` con la estructura estándar de Django.

---

## ✅ PASO 3: CONFIGURAR SETTINGS.PY

**Archivo:** `CONDOMINIO/settings.py`

### 3.1 Agregar apps en INSTALLED_APPS

Busca `INSTALLED_APPS` y agrega estas líneas:

```python
INSTALLED_APPS = [
    # ... apps existentes ...
    'rest_framework',
    'rest_framework_simplejwt',        # ✅ NUEVO
    'rest_framework_simplejwt.token_blacklist',  # ✅ NUEVO
    'corsheaders',
    
    # Local apps
    'core',
    'usuarios',  # ✅ NUEVO
]
```

### 3.2 Agregar al FINAL del archivo settings.py

```python
# ==============================================================================
# REST FRAMEWORK - Configuración de autenticación con JWT
# ==============================================================================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}

# ==============================================================================
# JWT - Configuración de tokens
# ==============================================================================
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=2),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': True,
    
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}

# ==============================================================================
# AUTH - Modelo de usuario personalizado
# ==============================================================================
AUTH_USER_MODEL = 'usuarios.Usuario'
```

### 3.3 Ajustar CORS (busca la sección de CORS y modifica)

```python
CORS_ALLOW_ALL_ORIGINS = False  # Cambiar de True a False si estaba en True
CORS_ALLOWED_ORIGINS = [
    'https://contabilidadwebapp-frontend-linux-d2a9ddabctgte8ae.brazilsouth-01.azurewebsites.net',
    'http://localhost:5173',
    'http://localhost:3000',
]
CORS_ALLOW_CREDENTIALS = True  # ✅ AGREGAR
```

---

## ✅ PASO 4: CREAR MODELO DE USUARIO

**Archivo:** `usuarios/models.py`

Reemplaza TODO el contenido con:

```python
from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):
    """
    Modelo de usuario personalizado con roles para el sistema de condominio.
    """
    
    ROL_CHOICES = [
        ('SUPER_ADMIN', 'Super Administrador'),
        ('ADMIN', 'Administrador'),
        ('CONTADOR', 'Contador'),
        ('GUARDIA', 'Guardia de Seguridad'),
        ('RESIDENTE', 'Residente'),
    ]
    
    rol = models.CharField(
        max_length=20,
        choices=ROL_CHOICES,
        default='RESIDENTE',
        verbose_name='Rol'
    )
    
    telefono = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        verbose_name='Teléfono'
    )
    
    vivienda = models.ForeignKey(
        'core.Vivienda',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='usuarios',
        verbose_name='Vivienda'
    )
    
    activo = models.BooleanField(
        default=True,
        verbose_name='Activo'
    )
    
    fecha_creacion = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de creación'
    )
    
    fecha_actualizacion = models.DateTimeField(
        auto_now=True,
        verbose_name='Última actualización'
    )
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['-fecha_creacion']
    
    def __str__(self):
        return f"{self.username} ({self.get_rol_display()})"
    
    @property
    def nombre_completo(self):
        return f"{self.first_name} {self.last_name}".strip() or self.username
    
    def es_admin(self):
        return self.rol in ['SUPER_ADMIN', 'ADMIN']
```

---

## ✅ PASO 5: CREAR SERIALIZERS

**Archivo NUEVO:** `usuarios/serializers.py`

Crea este archivo con el siguiente contenido:

```python
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from .models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    """Serializer para mostrar información del usuario."""
    
    nombre_completo = serializers.ReadOnlyField()
    
    class Meta:
        model = Usuario
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'nombre_completo',
            'rol',
            'telefono',
            'vivienda',
            'activo',
            'fecha_creacion',
        ]
        read_only_fields = ['id', 'fecha_creacion']


class UsuarioCreateSerializer(serializers.ModelSerializer):
    """Serializer para crear nuevos usuarios."""
    
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = Usuario
        fields = [
            'username',
            'email',
            'password',
            'password2',
            'first_name',
            'last_name',
            'rol',
            'telefono',
            'vivienda',
        ]
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({
                "password": "Las contraseñas no coinciden."
            })
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        
        usuario = Usuario.objects.create(**validated_data)
        usuario.set_password(password)
        usuario.save()
        
        return usuario


class LoginSerializer(serializers.Serializer):
    """Serializer para login."""
    
    username = serializers.CharField(required=True)
    password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            user = authenticate(
                request=self.context.get('request'),
                username=username,
                password=password
            )
            
            if not user:
                raise serializers.ValidationError(
                    'Credenciales inválidas.',
                    code='authorization'
                )
            
            if not user.activo:
                raise serializers.ValidationError(
                    'Usuario inactivo.',
                    code='authorization'
                )
        else:
            raise serializers.ValidationError(
                'Debe proporcionar usuario y contraseña.',
                code='authorization'
            )
        
        attrs['user'] = user
        return attrs


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer para cambiar contraseña."""
    
    old_password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )
    new_password = serializers.CharField(
        required=True,
        write_only=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    new_password2 = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({
                "new_password": "Las contraseñas no coinciden."
            })
        return attrs
    
    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Contraseña actual incorrecta.')
        return value
    
    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user
```

---

## ✅ PASO 6: CREAR VIEWS

**Archivo:** `usuarios/views.py`

Reemplaza TODO el contenido con:

```python
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import logout

from .models import Usuario
from .serializers import (
    UsuarioSerializer,
    UsuarioCreateSerializer,
    LoginSerializer,
    ChangePasswordSerializer
)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """Vista de login que retorna tokens JWT."""
    serializer = LoginSerializer(data=request.data, context={'request': request})
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'Login exitoso',
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'nombre_completo': user.nombre_completo,
                'rol': user.rol,
                'vivienda': user.vivienda_id,
            }
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Vista de logout que invalida el refresh token."""
    try:
        refresh_token = request.data.get('refresh')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        
        logout(request)
        return Response({
            'message': 'Logout exitoso'
        }, status=status.HTTP_200_OK)
    except Exception:
        return Response({
            'error': 'Token inválido'
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me_view(request):
    """Obtiene la información del usuario autenticado."""
    serializer = UsuarioSerializer(request.user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password_view(request):
    """Cambia la contraseña del usuario autenticado."""
    serializer = ChangePasswordSerializer(
        data=request.data,
        context={'request': request}
    )
    
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Contraseña cambiada exitosamente'
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UsuarioViewSet(viewsets.ModelViewSet):
    """ViewSet para CRUD de usuarios (solo administradores)."""
    
    queryset = Usuario.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UsuarioCreateSerializer
        return UsuarioSerializer
    
    @action(detail=False, methods=['post'], url_path='crear')
    def crear(self, request):
        """Crea un nuevo usuario."""
        serializer = UsuarioCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['put'], url_path='modificar')
    def modificar(self, request, pk=None):
        """Modifica un usuario existente."""
        usuario = self.get_object()
        serializer = UsuarioSerializer(usuario, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['delete'], url_path='eliminar')
    def eliminar(self, request, pk=None):
        """Elimina un usuario."""
        usuario = self.get_object()
        usuario.delete()
        return Response(
            {'message': 'Usuario eliminado exitosamente'},
            status=status.HTTP_204_NO_CONTENT
        )
```

---

## ✅ PASO 7: CREAR URLs

**Archivo NUEVO:** `usuarios/urls.py`

Crea este archivo:

```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    login_view,
    logout_view,
    me_view,
    change_password_view,
    UsuarioViewSet,
)

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')

urlpatterns = [
    # Autenticación
    path('auth/login/', login_view, name='login'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', logout_view, name='logout'),
    path('auth/me/', me_view, name='me'),
    path('auth/change-password/', change_password_view, name='change_password'),
    
    # CRUD de usuarios
    path('', include(router.urls)),
]
```

---

## ✅ PASO 8: INCLUIR URLs EN API_URLS.PY

**Archivo:** `CONDOMINIO/api_urls.py`

Agrega esta línea en urlpatterns:

```python
from django.urls import path, include

urlpatterns = [
    # ... otros paths existentes ...
    
    # Usuarios y autenticación
    path('', include('usuarios.urls')),  # ✅ AGREGAR ESTA LÍNEA
]
```

---

## ✅ PASO 9: REGISTRAR EN ADMIN

**Archivo:** `usuarios/admin.py`

Reemplaza el contenido con:

```python
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario


@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    list_display = ['username', 'email', 'rol', 'activo', 'fecha_creacion']
    list_filter = ['rol', 'activo', 'is_staff']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    
    fieldsets = UserAdmin.fieldsets + (
        ('Información Adicional', {
            'fields': ('rol', 'telefono', 'vivienda', 'activo')
        }),
    )
```

---

## ✅ PASO 10: MIGRAR BASE DE DATOS

```bash
# Crear migraciones
python manage.py makemigrations usuarios

# Aplicar migraciones
python manage.py migrate
```

**IMPORTANTE:** Si hay error de que el modelo User ya existe, ejecuta:

```bash
python manage.py migrate --run-syncdb
```

---

## ✅ PASO 11: CREAR SUPERUSUARIO

```bash
python manage.py createsuperuser
```

Ingresa:
- Username: `admin`
- Email: `admin@condominio.com`
- Password: (elige una segura)

Luego configura el rol:

```bash
python manage.py shell
```

```python
from usuarios.models import Usuario
admin = Usuario.objects.get(username='admin')
admin.rol = 'SUPER_ADMIN'
admin.first_name = 'Administrador'
admin.last_name = 'Sistema'
admin.save()
print(f"✓ Usuario {admin.username} configurado como {admin.get_rol_display()}")
exit()
```

---

## ✅ PASO 12: HACER ENDPOINTS PÚBLICOS (OPCIONAL)

Si quieres que algunos endpoints NO requieran autenticación, agrega en las vistas correspondientes:

```python
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

@permission_classes([AllowAny])
```

**Sugerencia:** Hacer públicos estos endpoints:
- `GET /api/dashboard/` (solo lectura)
- `GET /api/areas/` (solo lectura)

---

## ✅ PASO 13: PROBAR

### Iniciar servidor:
```bash
python manage.py runserver
```

### Probar login:
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"tu_password"}'
```

Respuesta esperada:
```json
{
  "message": "Login exitoso",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "admin",
    "rol": "SUPER_ADMIN"
  }
}
```

### Probar endpoint protegido:
```bash
curl -X GET http://localhost:8000/api/auth/me/ \
  -H "Authorization: Bearer TU_ACCESS_TOKEN"
```

---

## ✅ PASO 14: COMMIT Y DEPLOY

```bash
git add .
git commit -m "feat: Implementar sistema de autenticación con JWT"
git push origin main
```

Azure detectará los cambios y hará deploy automáticamente.

---

## 📋 CHECKLIST FINAL

Verifica que TODO esté hecho:

- [ ] Dependencias instaladas (djangorestframework-simplejwt)
- [ ] App `usuarios` creada
- [ ] `settings.py` configurado (INSTALLED_APPS, REST_FRAMEWORK, SIMPLE_JWT, AUTH_USER_MODEL)
- [ ] `usuarios/models.py` con modelo Usuario
- [ ] `usuarios/serializers.py` creado
- [ ] `usuarios/views.py` con vistas de auth
- [ ] `usuarios/urls.py` creado
- [ ] `usuarios/admin.py` configurado
- [ ] URLs incluidas en `api_urls.py`
- [ ] Migraciones ejecutadas exitosamente
- [ ] Superusuario creado y configurado
- [ ] Login probado y funcionando
- [ ] Endpoint /auth/me/ probado
- [ ] Cambios pusheados a Git
- [ ] Deploy exitoso en Azure

---

## 🆘 TROUBLESHOOTING

### Error: "No such table: usuarios_usuario"
**Solución:** Ejecutar migraciones: `python manage.py migrate`

### Error: "AUTH_USER_MODEL refers to model that has not been installed"
**Solución:** Verificar que `usuarios` esté en INSTALLED_APPS en settings.py

### Error: "Cannot import name Usuario"
**Solución:** Verificar que `usuarios/models.py` tenga la clase Usuario definida

### Error en migraciones con User existente
**Solución:** 
```bash
python manage.py migrate --run-syncdb
python manage.py makemigrations usuarios
python manage.py migrate usuarios
```

---

## 📊 ENDPOINTS RESULTANTES

Después de implementar, estos endpoints estarán disponibles:

### Autenticación (públicos):
- `POST /api/auth/login/` - Login
- `POST /api/auth/token/refresh/` - Refrescar token

### Autenticación (protegidos):
- `POST /api/auth/logout/` - Logout
- `GET /api/auth/me/` - Usuario actual
- `POST /api/auth/change-password/` - Cambiar contraseña

### Usuarios (solo admin):
- `GET /api/usuarios/` - Listar usuarios
- `POST /api/usuarios/crear/` - Crear usuario
- `GET /api/usuarios/{id}/` - Ver usuario
- `PUT /api/usuarios/{id}/modificar/` - Actualizar usuario
- `DELETE /api/usuarios/{id}/eliminar/` - Eliminar usuario

### Endpoints existentes:
Todos los demás endpoints ahora requieren autenticación (token JWT en header).

---

## ✅ RESULTADO ESPERADO

Después de completar TODO:

1. ✅ Sistema de login funcional
2. ✅ Usuarios con roles (SUPER_ADMIN, ADMIN, CONTADOR, GUARDIA, RESIDENTE)
3. ✅ Todos los endpoints protegidos con JWT
4. ✅ Tokens con expiración (1 hora access, 7 días refresh)
5. ✅ CORS configurado correctamente para el frontend
6. ✅ Listo para que el frontend implemente las páginas de login

---

## 📞 CONTACTO

Si hay algún error o algo no funciona, reporta:
1. El mensaje de error COMPLETO
2. El paso en el que ocurrió
3. El contenido del archivo donde falló

¡Éxito! 🚀
