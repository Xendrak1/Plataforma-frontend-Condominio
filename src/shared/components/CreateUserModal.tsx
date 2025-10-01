import { useState, type FormEvent } from 'react'
import type { User, CreateUserData, UserRole } from '../../types/auth'

interface CreateUserModalProps {
  user?: User | null
  onClose: () => void
  onSubmit: (data: CreateUserData | Partial<User>) => void | Promise<void>
  isLoading?: boolean
}

const ROLES: { value: UserRole; label: string }[] = [
  { value: 'SUPER_ADMIN', label: 'Super Administrador' },
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'CONTADOR', label: 'Contador' },
  { value: 'GUARDIA', label: 'Guardia de Seguridad' },
  { value: 'RESIDENTE', label: 'Residente' },
]

export function CreateUserModal({ user, onClose, onSubmit, isLoading }: CreateUserModalProps) {
  const isEdit = !!user
  
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    password2: '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    rol: user?.rol || 'RESIDENTE' as UserRole,
    telefono: user?.telefono || '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validaciones
    const newErrors: Record<string, string> = {}

    if (!formData.username.trim()) {
      newErrors.username = 'El usuario es requerido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!isEdit) {
      if (!formData.password) {
        newErrors.password = 'La contraseña es requerida'
      } else if (formData.password.length < 8) {
        newErrors.password = 'La contraseña debe tener al menos 8 caracteres'
      }

      if (formData.password !== formData.password2) {
        newErrors.password2 = 'Las contraseñas no coinciden'
      }
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'El nombre es requerido'
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'El apellido es requerido'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Enviar datos
    if (isEdit) {
      // En edición, no enviamos password si está vacío
      const updateData: Partial<User> = {
        username: formData.username,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        rol: formData.rol,
        telefono: formData.telefono,
      }
      onSubmit(updateData)
    } else {
      onSubmit(formData as CreateUserData)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#111827',
            margin: 0,
          }}>
            {isEdit ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '0.25rem',
            }}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            {/* Username */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}>
                Usuario *
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.username ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                }}
              />
              {errors.username && (
                <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {errors.username}
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
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.email ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                }}
              />
              {errors.email && (
                <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {errors.email}
                </span>
              )}
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
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.first_name ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '0.875rem',
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
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.last_name ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                }}
              />
              {errors.last_name && (
                <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  {errors.last_name}
                </span>
              )}
            </div>

            {/* Rol */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}>
                Rol *
              </label>
              <select
                value={formData.rol}
                onChange={(e) => setFormData({ ...formData, rol: e.target.value as UserRole })}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                }}
              >
                {ROLES.map((rol) => (
                  <option key={rol.value} value={rol.value}>
                    {rol.label}
                  </option>
                ))}
              </select>
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
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                }}
              />
            </div>

            {/* Password (solo en creación) */}
            {!isEdit && (
              <>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem',
                  }}>
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${errors.password ? '#dc2626' : '#d1d5db'}`,
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                    }}
                  />
                  {errors.password && (
                    <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      {errors.password}
                    </span>
                  )}
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '0.5rem',
                  }}>
                    Confirmar Contraseña *
                  </label>
                  <input
                    type="password"
                    value={formData.password2}
                    onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: `1px solid ${errors.password2 ? '#dc2626' : '#d1d5db'}`,
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                    }}
                  />
                  {errors.password2 && (
                    <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                      {errors.password2}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Buttons */}
          <div style={{
            marginTop: '2rem',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
          }}>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
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
              disabled={isLoading}
              style={{
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '8px',
                background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear Usuario'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
