import { useState, type FormEvent } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useUpdateUsuario } from '../../features/users/hooks'
import { Loader } from '../components/Loader'
import { useNavigate } from 'react-router-dom'

const ROLE_COLORS: Record<string, string> = {
  SUPER_ADMIN: '#9333ea',
  ADMIN: '#dc2626',
  CONTADOR: '#06b6d4',
  GUARDIA: '#eab308',
  RESIDENTE: '#16a34a',
}

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: 'Super Administrador',
  ADMIN: 'Administrador',
  CONTADOR: 'Contador',
  GUARDIA: 'Guardia de Seguridad',
  RESIDENTE: 'Residente',
}

export function UserProfilePage() {
  const { user, refreshUser } = useAuth()
  const navigate = useNavigate()
  const updateMutation = useUpdateUsuario()

  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) return

    setErrors({})

    // Validaciones
    const newErrors: Record<string, string> = {}

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'El nombre es requerido'
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'El apellido es requerido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      await updateMutation.mutateAsync({
        id: user.id,
        data: formData,
      })
      await refreshUser()
      setIsEditing(false)
      alert('Perfil actualizado exitosamente')
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
      alert('Error al actualizar perfil')
    }
  }

  const handleCancel = () => {
    setFormData({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      email: user?.email || '',
      telefono: user?.telefono || '',
    })
    setIsEditing(false)
    setErrors({})
  }

  if (!user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Loader />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', margin: 0 }}>
          Mi Perfil
        </h1>
        <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
          Gestiona tu información personal y configuración de cuenta
        </p>
      </div>

      {/* Card Principal */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}>
        {/* Avatar y Info Básica */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2rem',
          color: 'white',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              fontWeight: '700',
              border: '4px solid rgba(255, 255, 255, 0.3)',
            }}>
              {user.nombre_completo.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '700', margin: 0 }}>
                {user.nombre_completo}
              </h2>
              <p style={{ fontSize: '1rem', opacity: 0.9, margin: '0.5rem 0' }}>
                @{user.username}
              </p>
              <span style={{
                display: 'inline-block',
                padding: '0.375rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}>
                {ROLE_LABELS[user.rol]}
              </span>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {/* Username (read-only) */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}>
                Usuario
              </label>
              <input
                type="text"
                value={user.username}
                disabled
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  backgroundColor: '#f9fafb',
                  color: '#6b7280',
                  cursor: 'not-allowed',
                }}
              />
              <span style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                El usuario no se puede cambiar
              </span>
            </div>

            {/* First Name */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}>
                Nombre *
              </label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                disabled={!isEditing || updateMutation.isPending}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.first_name ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  backgroundColor: isEditing ? 'white' : '#f9fafb',
                }}
              />
              {errors.first_name && (
                <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {errors.first_name}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}>
                Apellido *
              </label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                disabled={!isEditing || updateMutation.isPending}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.last_name ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  backgroundColor: isEditing ? 'white' : '#f9fafb',
                }}
              />
              {errors.last_name && (
                <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {errors.last_name}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}>
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing || updateMutation.isPending}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.email ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  backgroundColor: isEditing ? 'white' : '#f9fafb',
                }}
              />
              {errors.email && (
                <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}>
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                disabled={!isEditing || updateMutation.isPending}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  backgroundColor: isEditing ? 'white' : '#f9fafb',
                }}
              />
            </div>

            {/* Rol (read-only) */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}>
                Rol
              </label>
              <div style={{
                padding: '0.75rem',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#f9fafb',
              }}>
                <span style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  backgroundColor: `${ROLE_COLORS[user.rol]}20`,
                  color: ROLE_COLORS[user.rol],
                }}>
                  {ROLE_LABELS[user.rol]}
                </span>
              </div>
              <span style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                Solo un administrador puede cambiar tu rol
              </span>
            </div>
          </div>

          {/* Botones */}
          <div style={{
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'space-between',
          }}>
            <button
              type="button"
              onClick={() => navigate('/cambiar-contrasena')}
              style={{
                padding: '0.75rem 1.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                background: 'white',
                color: '#374151',
                fontWeight: '500',
                cursor: 'pointer',
              }}
            >
              🔒 Cambiar Contraseña
            </button>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={updateMutation.isPending}
                    style={{
                      padding: '0.75rem 1.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      background: 'white',
                      color: '#374151',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={updateMutation.isPending}
                    style={{
                      padding: '0.75rem 1.5rem',
                      border: 'none',
                      borderRadius: '8px',
                      background: updateMutation.isPending ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontWeight: '600',
                      cursor: updateMutation.isPending ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {updateMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  ✏️ Editar Perfil
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
