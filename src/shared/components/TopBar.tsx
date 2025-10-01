import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { APP_CONFIG } from '../../config/app'

// Barra superior con información del usuario y logout
export function TopBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (loggingOut) return
    
    setLoggingOut(true)
    try {
      await logout()
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      setLoggingOut(false)
    }
  }

  const getRolLabel = (rol: string) => {
    const roles: Record<string, string> = {
      SUPER_ADMIN: 'Super Admin',
      ADMIN: 'Administrador',
      CONTADOR: 'Contador',
      GUARDIA: 'Guardia',
      RESIDENTE: 'Residente'
    }
    return roles[rol] || rol
  }

  const getRolColor = (rol: string) => {
    const colors: Record<string, string> = {
      SUPER_ADMIN: '#9333ea',
      ADMIN: '#dc2626',
      CONTADOR: '#0891b2',
      GUARDIA: '#ca8a04',
      RESIDENTE: '#059669'
    }
    return colors[rol] || '#6b7280'
  }

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem',
      padding: '1rem 1.5rem',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    }}>
      <div>
        <div style={{ fontWeight: '600', fontSize: '1.125rem', color: '#1f2937' }}>
          {APP_CONFIG.name}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '2px' }}>
          {APP_CONFIG.city}
        </div>
      </div>

      {user && (
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.5rem 1rem',
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6'
              e.currentTarget.style.borderColor = '#d1d5db'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f9fafb'
              e.currentTarget.style.borderColor = '#e5e7eb'
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.875rem',
            }}>
              {user.first_name?.[0] || user.username[0].toUpperCase()}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: '600', fontSize: '0.875rem', color: '#111827' }}>
                {user.nombre_completo || user.username}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: getRolColor(user.rol),
                fontWeight: '500'
              }}>
                {getRolLabel(user.rol)}
              </div>
            </div>
            <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>▼</span>
          </button>

          {showMenu && (
            <>
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 10,
                }}
                onClick={() => setShowMenu(false)}
              />
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 0.5rem)',
                right: 0,
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                minWidth: '200px',
                zIndex: 20,
              }}>
                <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827' }}>
                    {user.email}
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    setShowMenu(false)
                    navigate('/perfil')
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: '#374151',
                    fontWeight: '500',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f9fafb'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  👤 Mi Perfil
                </button>

                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: loggingOut ? 'not-allowed' : 'pointer',
                    fontSize: '0.875rem',
                    color: loggingOut ? '#9ca3af' : '#dc2626',
                    fontWeight: '500',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!loggingOut) {
                      e.currentTarget.style.background = '#fef2f2'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {loggingOut ? 'Cerrando sesión...' : '🚪 Cerrar Sesión'}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  )
}


