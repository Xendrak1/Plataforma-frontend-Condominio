import { useState } from 'react'
import { useNotifications, useMarkNotificationAsRead, useAlerts } from '../../features/notifications/hooks'
import { Icon } from './icons'

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: notifications = [], isLoading } = useNotifications()
  const { data: alerts } = useAlerts()
  const markAsRead = useMarkNotificationAsRead()

  const unreadCount = notifications.filter(n => !n.leida).length
  const totalAlerts = alerts?.total_alertas || 0

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead.mutateAsync(id)
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const getPriorityColor = (prioridad: string) => {
    switch (prioridad) {
      case 'ALTA': return '#dc2626'
      case 'MEDIA': return '#d97706'
      case 'BAJA': return '#16a34a'
      default: return '#6b7280'
    }
  }

  const getPriorityIcon = (prioridad: string) => {
    switch (prioridad) {
      case 'ALTA': return '🔴'
      case 'MEDIA': return '🟡'
      case 'BAJA': return '🟢'
      default: return '🔵'
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Botón de notificaciones */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280',
          transition: 'all 0.2s ease'
        }}
      >
        <Icon.AlertTriangle />
        {(unreadCount > 0 || totalAlerts > 0) && (
          <div style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            background: '#dc2626',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: '600'
          }}>
            {unreadCount + totalAlerts}
          </div>
        )}
      </button>

      {/* Panel de notificaciones */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          width: '400px',
          maxHeight: '500px',
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem',
            borderBottom: '1px solid #e5e7eb',
            background: '#f9fafb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: '0', fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>
              Notificaciones
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6b7280',
                fontSize: '1.25rem'
              }}
            >
              ×
            </button>
          </div>

          {/* Contenido */}
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {isLoading ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                Cargando notificaciones...
              </div>
            ) : notifications.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                No hay notificaciones
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  style={{
                    padding: '1rem',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: notification.leida ? 'default' : 'pointer',
                    background: notification.leida ? 'white' : '#fef3c7',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => !notification.leida && handleMarkAsRead(notification.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ fontSize: '1.25rem', marginTop: '0.25rem' }}>
                      {getPriorityIcon(notification.prioridad)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.5rem'
                      }}>
                        <h4 style={{
                          margin: '0',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          {notification.titulo}
                        </h4>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#6b7280',
                          whiteSpace: 'nowrap',
                          marginLeft: '0.5rem'
                        }}>
                          {new Date(notification.fecha_creacion).toLocaleDateString()}
                        </div>
                      </div>
                      <p style={{
                        margin: '0',
                        fontSize: '0.875rem',
                        color: '#4b5563',
                        lineHeight: '1.4'
                      }}>
                        {notification.mensaje}
                      </p>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '0.5rem'
                      }}>
                        <span style={{
                          fontSize: '0.75rem',
                          color: getPriorityColor(notification.prioridad),
                          fontWeight: '500'
                        }}>
                          {notification.prioridad}
                        </span>
                        {!notification.leida && (
                          <span style={{
                            fontSize: '0.75rem',
                            color: '#dc2626',
                            fontWeight: '500'
                          }}>
                            Nuevo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div style={{
              padding: '1rem',
              borderTop: '1px solid #e5e7eb',
              background: '#f9fafb',
              textAlign: 'center'
            }}>
              <button
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
                onClick={() => {
                  // Marcar todas como leídas
                  notifications.forEach(notification => {
                    if (!notification.leida) {
                      handleMarkAsRead(notification.id)
                    }
                  })
                }}
              >
                Marcar todas como leídas
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
