# 🔐 Guía Completa: Implementar Autenticación en Backend Django

## 📋 Índice
1. [Instalación de Dependencias](#paso-1)
2. [Crear App de Usuarios](#paso-2)
3. [Configurar JWT en Settings](#paso-3)
4. [Crear Modelo de Usuario](#paso-4)
5. [Crear Serializers](#paso-5)
6. [Crear Views](#paso-6)
7. [Configurar URLs](#paso-7)
8. [Migrar Base de Datos](#paso-8)
9. [Proteger Endpoints Existentes](#paso-9)
10. [Crear Usuario Admin](#paso-10)
11. [Probar Todo](#paso-11)

---

## <a name="paso-1"></a>📦 PASO 1: Instalar Dependencias

### 1.1 Abrir terminal en el backend
```bash
cd c:\Users\eduardo\Downloads\CondominioULT\CONDOMINIO\backend
```

### 1.2 Activar entorno virtual
```bash
# Si usas el venv que está en CONDOMINIO:
cd ..
venv\Scripts\activate

# Volver al backend:
cd backend
```

### 1.3 Instalar paquetes necesarios
```bash
pip install djangorestframework-simplejwt
pip install django-cors-headers
```

### 1.4 Actualizar requirements.txt
```bash
pip freeze > requirements.txt
```

---

## <a name="paso-2"></a>📁 PASO 2: Crear App de Usuarios

### 2.1 Crear la app
```bash
python manage.py startapp usuarios
```

Esto creará la carpeta `usuarios/` con esta estructura:
```
usuarios/
├── migrations/
├── __init__.py
├── admin.py
├── apps.py
├── models.py
├── tests.py
└── views.py
```

---

## <a name="paso-3"></a>⚙️ PASO 3: Configurar Settings.py

**Archivo:** `CONDOMINIO/settings.py`

### 3.1 Agregar apps en INSTALLED_APPS

Busca la sección `INSTALLED_APPS` y agrega:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party apps
    'rest_framework',
    'rest_framework_simplejwt',  # ✅ AGREGAR ESTA LÍNEA
    'corsheaders',
    
    # Local apps
    'core',
    'usuarios',  # ✅ AGREGAR ESTA LÍNEA
]
```

### 3.2 Configurar REST Framework con JWT

Agrega al FINAL del archivo `settings.py`:

```python
# ==============================================================================
# REST FRAMEWORK - Configuración de autenticación con JWT
# ==============================================================================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',  # Por defecto todo protegido
    ],
}

# ==============================================================================
# JWT - Configuración de tokens
# ==============================================================================
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),      # Token expira en 1 hora
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),      # Refresh token expira en 7 días
    'ROTATE_REFRESH_TOKENS': True,                    # Genera nuevo refresh token
    'BLACKLIST_AFTER_ROTATION': True,                 # Invalida el anterior
    'UPDATE_LAST_LOGIN': True,                        # Actualiza last_login
    
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
}

# ==============================================================================
# AUTH - Modelo de usuario personalizado
# ==============================================================================
AUTH_USER_MODEL = 'usuarios.Usuario'  # ✅ Usar modelo personalizado
```

### 3.3 Ajustar CORS para permitir credenciales

Busca la configuración de CORS y modifica:

```python
# CORS Configuration
CORS_ALLOW_ALL_ORIGINS = False  # ✅ Cambiar de True a False
CORS_ALLOWED_ORIGINS = [
    'https://contabilidadwebapp-frontend-linux-d2a9ddabctgte8ae.brazilsouth-01.azurewebsites.net',
    'http://localhost:5173',  # Para desarrollo local
    'http://localhost:3000',
]
CORS_ALLOW_CREDENTIALS = True  # ✅ AGREGAR ESTA LÍNEA
```

---

## <a name="paso-4"></a>👤 PASO 4: Crear Modelo de Usuario Personalizado

**Archivo:** `usuarios/models.py`

**REEMPLAZA TODO el contenido** con:

```python
from django.contrib.auth.models import AbstractUser
from django.db import models


class Usuario(AbstractUser):
    """
    Modelo de usuario personalizado con roles para el sistema de condominio.
    
    Roles disponibles:
    - SUPER_ADMIN: Acceso total al sistema
    - ADMIN: Administrador del condominio
    - CONTADOR: Acceso a finanzas (expensas, pagos, multas)
    - GUARDIA: Acceso a control de visitas
    - RESIDENTE: Usuario final (app móvil)
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
    
    # Relación opcional con vivienda (solo para residentes)
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
        """Retorna el nombre completo del usuario."""
        return f"{self.first_name} {self.last_name}".strip() or self.username
    
    def es_admin(self):
        """Verifica si el usuario es administrador."""
        return self.rol in ['SUPER_ADMIN', 'ADMIN']
    
    def es_residente(self):
        """Verifica si el usuario es residente."""
        return self.rol == 'RESIDENTE'
```

---

## <a name="paso-5"></a>📄 PASO 5: Crear Serializers

**Archivo NUEVO:** `usuarios/serializers.py`

Crea este archivo y agrega:

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
            'is_active',
            'is_staff',
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
        style={'input_type': 'password'},
        label='Confirmar contraseña'
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
        """Validar que las contraseñas coincidan."""
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({
                "password": "Las contraseñas no coinciden."
            })
        return attrs
    
    def create(self, validated_data):
        """Crear usuario con contraseña encriptada."""
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
        """Validar credenciales."""
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
                    'Credenciales inválidas. Verifica tu usuario y contraseña.',
                    code='authorization'
                )
            
            if not user.activo:
                raise serializers.ValidationError(
                    'Usuario inactivo. Contacta al administrador.',
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
        style={'input_type': 'password'},
        label='Contraseña actual'
    )
    new_password = serializers.CharField(
        required=True,
        write_only=True,
        validators=[validate_password],
        style={'input_type': 'password'},
        label='Nueva contraseña'
    )
    new_password2 = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'},
        label='Confirmar nueva contraseña'
    )
    
    def validate(self, attrs):
        """Validar que las nuevas contraseñas coincidan."""
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({
                "new_password": "Las contraseñas no coinciden."
            })
        return attrs
    
    def validate_old_password(self, value):
        """Validar que la contraseña actual sea correcta."""
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Contraseña actual incorrecta.')
        return value
    
    def save(self, **kwargs):
        """Guardar la nueva contraseña."""
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user
```

---

## <a name="paso-6"></a>🎯 PASO 6: Crear Views

**Archivo:** `usuarios/views.py`

**REEMPLAZA TODO el contenido** con:

```python
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import logout

from .models import Usuario
from .serializers import (
    UsuarioSerializer,
    UsuarioCreateSerializer,
    LoginSerializer,
    ChangePasswordSerializer
)


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Serializer personalizado para incluir datos del usuario en el token."""
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Agregar información personalizada al token
        token['username'] = user.username
        token['email'] = user.email
        token['rol'] = user.rol
        token['nombre_completo'] = user.nombre_completo
        
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Agregar información del usuario a la respuesta
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'nombre_completo': self.user.nombre_completo,
            'rol': self.user.rol,
            'vivienda': self.user.vivienda_id,
        }
        
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    """Vista personalizada para login con JWT."""
    serializer_class = CustomTokenObtainPairSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Vista de login que retorna tokens JWT.
    
    POST /api/auth/login/
    {
        "username": "admin",
        "password": "password123"
    }
    """
    serializer = LoginSerializer(data=request.data, context={'request': request})
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        # Generar tokens
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
    """
    Vista de logout que invalida el refresh token.
    
    POST /api/auth/logout/
    {
        "refresh": "refresh_token_here"
    }
    """
    try:
        refresh_token = request.data.get('refresh')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        
        logout(request)
        return Response({
            'message': 'Logout exitoso'
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'error': 'Token inválido o ya expirado'
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me_view(request):
    """
    Obtiene la información del usuario autenticado.
    
    GET /api/auth/me/
    """
    serializer = UsuarioSerializer(request.user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password_view(request):
    """
    Cambia la contraseña del usuario autenticado.
    
    POST /api/auth/change-password/
    {
        "old_password": "password123",
        "new_password": "newpassword456",
        "new_password2": "newpassword456"
    }
    """
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
    """
    ViewSet para CRUD de usuarios (solo administradores).
    
    GET    /api/usuarios/                    - Listar usuarios
    POST   /api/usuarios/crear/              - Crear usuario
    GET    /api/usuarios/{id}/               - Ver usuario
    PUT    /api/usuarios/{id}/modificar/     - Actualizar usuario
    DELETE /api/usuarios/{id}/eliminar/      - Eliminar usuario
    """
    
    queryset = Usuario.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UsuarioCreateSerializer
        return UsuarioSerializer
    
    @action(detail=False, methods=['get'])
    def listar(self, request):
        """Lista todos los usuarios."""
        usuarios = self.get_queryset()
        serializer = self.get_serializer(usuarios, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], url_path='crear')
    def crear(self, request):
        """Crea un nuevo usuario."""
        serializer = UsuarioCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
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

## <a name="paso-7"></a>🔗 PASO 7: Configurar URLs

### 7.1 Crear URLs de la app usuarios

**Archivo NUEVO:** `usuarios/urls.py`

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
    CustomTokenObtainPairView,
)

# Router para ViewSet
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')

urlpatterns = [
    # Autenticación
    path('auth/login/', login_view, name='login'),
    path('auth/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', logout_view, name='logout'),
    path('auth/me/', me_view, name='me'),
    path('auth/change-password/', change_password_view, name='change_password'),
    
    # CRUD de usuarios (ViewSet)
    path('', include(router.urls)),
]
```

### 7.2 Incluir URLs en api_urls.py principal

**Archivo:** `CONDOMINIO/api_urls.py`

Agrega esta línea en la sección de `urlpatterns`:

```python
from django.urls import path, include

urlpatterns = [
    # ... otros paths existentes ...
    
    # Usuarios y autenticación
    path('', include('usuarios.urls')),  # ✅ AGREGAR ESTA LÍNEA
]
```

---

## <a name="paso-8"></a>🗄️ PASO 8: Migrar Base de Datos

### 8.1 Crear migraciones
```bash
python manage.py makemigrations usuarios
```

Deberías ver:
```
Migrations for 'usuarios':
  usuarios/migrations/0001_initial.py
    - Create model Usuario
```

### 8.2 Aplicar migraciones
```bash
python manage.py migrate
```

Deberías ver muchas líneas, incluyendo:
```
Applying usuarios.0001_initial... OK
```

---

## <a name="paso-9"></a>🔒 PASO 9: Proteger Endpoints Existentes (OPCIONAL)

Si quieres que algunos endpoints NO requieran autenticación (como dashboard público), puedes agregar esto en las vistas:

**Ejemplo:** `core/views.py`

```python
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

@permission_classes([AllowAny])  # Permite acceso sin auth
def dashboard_view(request):
    # ...
```

---

## <a name="paso-10"></a>👨‍💼 PASO 10: Crear Usuario Administrador

### 10.1 Crear superusuario desde terminal
```bash
python manage.py createsuperuser
```

Te pedirá:
```
Username: admin
Email: admin@condominio.com
Password: ********
Password (again): ********
```

### 10.2 Configurar el rol del superusuario

Abre el shell de Django:
```bash
python manage.py shell
```

Ejecuta:
```python
from usuarios.models import Usuario

# Obtener el usuario admin
admin = Usuario.objects.get(username='admin')

# Configurar como SUPER_ADMIN
admin.rol = 'SUPER_ADMIN'
admin.first_name = 'Administrador'
admin.last_name = 'Sistema'
admin.save()

print(f"Usuario {admin.username} configurado como {admin.get_rol_display()}")

# Salir
exit()
```

---

## <a name="paso-11"></a>✅ PASO 11: Probar Todo

### 11.1 Iniciar servidor de desarrollo
```bash
python manage.py runserver
```

### 11.2 Probar login

Abre otro terminal y ejecuta:

```bash
curl -X POST http://localhost:8000/api/auth/login/ ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"password\":\"tu_password_aqui\"}"
```

Deberías recibir:
```json
{
  "message": "Login exitoso",
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@condominio.com",
    "nombre_completo": "Administrador Sistema",
    "rol": "SUPER_ADMIN",
    "vivienda": null
  }
}
```

### 11.3 Probar endpoint protegido

Copia el `access` token de la respuesta anterior y prueba:

```bash
curl -X GET http://localhost:8000/api/auth/me/ ^
  -H "Authorization: Bearer TU_ACCESS_TOKEN_AQUI"
```

---

## 🎉 SIGUIENTE PASO

Una vez que TODO esto funcione:

1. **Commit y push al repositorio**
2. **Deploy a Azure** (el App Service detectará los cambios automáticamente)
3. **Implementar el frontend** con las páginas de login

---

## 📝 Resumen de Archivos Modificados/Creados

### Archivos NUEVOS:
- ✅ `usuarios/` (toda la app)
- ✅ `usuarios/serializers.py`
- ✅ `usuarios/urls.py`

### Archivos MODIFICADOS:
- ✅ `CONDOMINIO/settings.py`
- ✅ `CONDOMINIO/api_urls.py`
- ✅ `requirements.txt`

### Comandos ejecutados:
- ✅ `pip install djangorestframework-simplejwt`
- ✅ `python manage.py startapp usuarios`
- ✅ `python manage.py makemigrations`
- ✅ `python manage.py migrate`
- ✅ `python manage.py createsuperuser`

---

## ❓ ¿Preguntas?

Si algo no funciona, avísame y te ayudo a debuggear.

