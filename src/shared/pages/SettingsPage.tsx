import React, { useState } from 'react'
import { Icon } from '../components/icons'

export function SettingsPage() {
  const [settings, setSettings] = useState({
    nombreCondominio: 'Condominio Residencial',
    direccion: 'Av. Principal #123, Ciudad',
    telefono: '+591 4 123-4567',
    email: 'admin@condominio.com',
    moneda: 'Bs',
    zonaHoraria: 'America/La_Paz',
    notificacionesEmail: true,
    notificacionesSMS: false,
    mantenimientoProgramado: true,
    reservasAutomaticas: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // Aquí se implementaría la lógica para guardar en el backend
    alert('Configuración guardada exitosamente')
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header elegante */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '300', 
          color: '#1a1a1a', 
          margin: '0 0 0.5rem 0',
          letterSpacing: '-0.02em'
        }}>
          Configuración
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#666', 
          margin: '0',
          fontWeight: '400'
        }}>
          Parámetros generales del sistema
        </p>
      </div>

      {/* Información del Condominio */}
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '12px', 
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Icon.Home />
          Información del Condominio
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Nombre del Condominio
            </label>
            <input
              type="text"
              value={settings.nombreCondominio}
              onChange={(e) => handleInputChange('nombreCondominio', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Dirección
            </label>
            <input
              type="text"
              value={settings.direccion}
              onChange={(e) => handleInputChange('direccion', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Teléfono
            </label>
            <input
              type="text"
              value={settings.telefono}
              onChange={(e) => handleInputChange('telefono', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Email
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>
      </div>

      {/* Configuración del Sistema */}
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '12px', 
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Icon.AlertTriangle />
          Configuración del Sistema
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Moneda
            </label>
            <select
              value={settings.moneda}
              onChange={(e) => handleInputChange('moneda', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                background: 'white'
              }}
            >
              <option value="Bs">Bolivianos (Bs)</option>
              <option value="USD">Dólares (USD)</option>
              <option value="EUR">Euros (EUR)</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
              Zona Horaria
            </label>
            <select
              value={settings.zonaHoraria}
              onChange={(e) => handleInputChange('zonaHoraria', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                background: 'white'
              }}
            >
              <option value="America/La_Paz">La Paz (GMT-4)</option>
              <option value="America/Santa_Cruz">Santa Cruz (GMT-4)</option>
              <option value="America/Cochabamba">Cochabamba (GMT-4)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notificaciones */}
      <div style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '12px', 
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Icon.AlertTriangle />
          Notificaciones
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notificacionesEmail}
              onChange={(e) => handleInputChange('notificacionesEmail', e.target.checked)}
              style={{ width: '1.25rem', height: '1.25rem' }}
            />
            <span style={{ fontWeight: '500', color: '#374151' }}>
              Notificaciones por Email
            </span>
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notificacionesSMS}
              onChange={(e) => handleInputChange('notificacionesSMS', e.target.checked)}
              style={{ width: '1.25rem', height: '1.25rem' }}
            />
            <span style={{ fontWeight: '500', color: '#374151' }}>
              Notificaciones por SMS
            </span>
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.mantenimientoProgramado}
              onChange={(e) => handleInputChange('mantenimientoProgramado', e.target.checked)}
              style={{ width: '1.25rem', height: '1.25rem' }}
            />
            <span style={{ fontWeight: '500', color: '#374151' }}>
              Recordatorios de Mantenimiento
            </span>
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.reservasAutomaticas}
              onChange={(e) => handleInputChange('reservasAutomaticas', e.target.checked)}
              style={{ width: '1.25rem', height: '1.25rem' }}
            />
            <span style={{ fontWeight: '500', color: '#374151' }}>
              Reservas Automáticas
            </span>
          </label>
        </div>
      </div>

      {/* Botón de Guardar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleSave}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '0.75rem 2rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.15s ease',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2563eb'
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#3b82f6'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          Guardar Configuración
        </button>
      </div>
    </div>
  )
}


