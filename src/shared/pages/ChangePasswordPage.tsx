import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/auth'
import { Loader } from '../components/Loader'

export function ChangePasswordPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    new_password2: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSuccess(false)

    // Validaciones
    const newErrors: Record<string, string> = {}

    if (!formData.old_password) {
      newErrors.old_password = 'La contraseña actual es requerida'
    }

    if (!formData.new_password) {
      newErrors.new_password = 'La nueva contraseña es requerida'
    } else if (formData.new_password.length < 8) {
      newErrors.new_password = 'La contraseña debe tener al menos 8 caracteres'
    }

    if (formData.new_password !== formData.new_password2) {
      newErrors.new_password2 = 'Las contraseñas no coinciden'
    }

    if (formData.old_password === formData.new_password) {
      newErrors.new_password = 'La nueva contraseña debe ser diferente a la actual'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
      await authService.changePassword({
        old_password: formData.old_password,
        new_password: formData.new_password,
        new_password2: formData.new_password2,
      })
      
      setSuccess(true)
      setFormData({
        old_password: '',
        new_password: '',
        new_password2: '',
      })

      // Redirigir al perfil después de 2 segundos
      setTimeout(() => {
        navigate('/perfil')
      }, 2000)
    } catch (error) {
      console.error('Error al cambiar contraseña:', error)
      const err = error as { response?: { status?: number, data?: { old_password?: string[], new_password?: string[], detail?: string } } }
      
      if (err.response?.status === 400) {
        const data = err.response.data
        if (data?.old_password) {
          setErrors({ old_password: data.old_password[0] })
        } else if (data?.new_password) {
          setErrors({ new_password: data.new_password[0] })
        } else if (data?.detail) {
          setErrors({ general: data.detail })
        } else {
          setErrors({ general: 'Error al cambiar la contraseña' })
        }
      } else {
        setErrors({ general: 'Error al conectar con el servidor' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', margin: 0 }}>
          Cambiar Contraseña
        </h1>
        <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
          Actualiza tu contraseña de acceso al sistema
        </p>
      </div>

      {/* Card */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
      }}>
        {/* Mensaje de éxito */}
        {success && (
          <div style={{
            padding: '1rem',
            background: '#dcfce7',
            border: '1px solid #16a34a',
            borderRadius: '8px',
            color: '#16a34a',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ fontSize: '1.25rem' }}>✓</span>
            <div>
              <strong>Contraseña cambiada exitosamente</strong>
              <p style={{ fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>
                Serás redirigido a tu perfil en unos segundos...
              </p>
            </div>
          </div>
        )}

        {/* Error general */}
        {errors.general && (
          <div style={{
            padding: '1rem',
            background: '#fee2e2',
            border: '1px solid #dc2626',
            borderRadius: '8px',
            color: '#dc2626',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ fontSize: '1.25rem' }}>⚠</span>
            <span>{errors.general}</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Contraseña Actual */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}>
                Contraseña Actual *
              </label>
              <input
                type="password"
                value={formData.old_password}
                onChange={(e) => setFormData({ ...formData, old_password: e.target.value })}
                disabled={isLoading}
                placeholder="Ingresa tu contraseña actual"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.old_password ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                }}
              />
              {errors.old_password && (
                <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
                  {errors.old_password}
                </span>
              )}
            </div>

            {/* Nueva Contraseña */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}>
                Nueva Contraseña *
              </label>
              <input
                type="password"
                value={formData.new_password}
                onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                disabled={isLoading}
                placeholder="Mínimo 8 caracteres"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.new_password ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                }}
              />
              {errors.new_password && (
                <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
                  {errors.new_password}
                </span>
              )}
              <span style={{ color: '#6b7280', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
                La contraseña debe tener al menos 8 caracteres
              </span>
            </div>

            {/* Confirmar Nueva Contraseña */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem',
              }}>
                Confirmar Nueva Contraseña *
              </label>
              <input
                type="password"
                value={formData.new_password2}
                onChange={(e) => setFormData({ ...formData, new_password2: e.target.value })}
                disabled={isLoading}
                placeholder="Repite la nueva contraseña"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `1px solid ${errors.new_password2 ? '#dc2626' : '#d1d5db'}`,
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                }}
              />
              {errors.new_password2 && (
                <span style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
                  {errors.new_password2}
                </span>
              )}
            </div>
          </div>

          {/* Botones */}
          <div style={{
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end',
          }}>
            <button
              type="button"
              onClick={() => navigate('/perfil')}
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
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              {isLoading && <Loader />}
              {isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}
            </button>
          </div>
        </form>

        {/* Nota de seguridad */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: '#f3f4f6',
          borderRadius: '8px',
          borderLeft: '4px solid #3b82f6',
        }}>
          <p style={{ fontSize: '0.875rem', color: '#374151', margin: 0 }}>
            <strong>Nota de seguridad:</strong> Tu contraseña debe ser única y no compartirla con nadie. 
            Después de cambiarla, tu sesión actual permanecerá activa.
          </p>
        </div>
      </div>
    </div>
  )
}
