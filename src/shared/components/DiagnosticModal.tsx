import { useState } from 'react'
import { api } from '../../services/api'

interface DiagnosticModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DiagnosticModal({ isOpen, onClose }: DiagnosticModalProps) {
  const [results, setResults] = useState<Record<string, any>>({})
  const [isRunning, setIsRunning] = useState(false)

  const endpoints = [
    { name: 'Residentes', url: '/residentes', method: 'GET' },
    { name: 'Vehículos', url: '/vehiculos', method: 'GET' },
    { name: 'Mascotas', url: '/mascotas', method: 'GET' },
    { name: 'Comunicados', url: '/comunicados', method: 'GET' },
    { name: 'Expensas', url: '/expensas', method: 'GET' },
    { name: 'Multas', url: '/multas', method: 'GET' },
    { name: 'Reservas', url: '/reservas', method: 'GET' },
    { name: 'Áreas', url: '/areas', method: 'GET' },
    { name: 'Pagos', url: '/pagos', method: 'GET' },
  ]

  const runDiagnostic = async () => {
    setIsRunning(true)
    const newResults: Record<string, any> = {}

    for (const endpoint of endpoints) {
      try {
        const startTime = Date.now()
        const response = await api.get(endpoint.url)
        const endTime = Date.now()
        
        newResults[endpoint.name] = {
          status: 'success',
          statusCode: response.status,
          responseTime: `${endTime - startTime}ms`,
          dataCount: Array.isArray(response.data) ? response.data.length : 'N/A',
          message: '✅ Funcionando correctamente'
        }
      } catch (error: any) {
        newResults[endpoint.name] = {
          status: 'error',
          statusCode: error.response?.status || 'N/A',
          message: `❌ Error: ${error.response?.data?.error || error.message}`,
          details: error.response?.data || error.message
        }
      }
    }

    setResults(newResults)
    setIsRunning(false)
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '2rem',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0
          }}>
            🔍 Diagnóstico del Sistema
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6'
              e.currentTarget.style.color = '#374151'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none'
              e.currentTarget.style.color = '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        {/* Diagnostic Button */}
        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={runDiagnostic}
            disabled={isRunning}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '8px',
              background: isRunning ? '#9ca3af' : '#3b82f6',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              if (!isRunning) {
                e.currentTarget.style.background = '#2563eb'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isRunning) {
                e.currentTarget.style.background = '#3b82f6'
                e.currentTarget.style.transform = 'translateY(0)'
              }
            }}
          >
            {isRunning ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Ejecutando diagnóstico...
              </>
            ) : (
              '🚀 Ejecutar Diagnóstico'
            )}
          </button>
        </div>

        {/* Results */}
        {Object.keys(results).length > 0 && (
          <div style={{
            background: '#f8fafc',
            borderRadius: '8px',
            padding: '1.5rem',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 1rem 0'
            }}>
              📊 Resultados del Diagnóstico
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Object.entries(results).map(([name, result]) => (
                <div
                  key={name}
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    border: `1px solid ${result.status === 'success' ? '#d1fae5' : '#fecaca'}`,
                    background: result.status === 'success' ? '#f0fdf4' : '#fef2f2'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#374151'
                    }}>
                      {name}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      color: result.status === 'success' ? '#059669' : '#dc2626',
                      fontWeight: '500'
                    }}>
                      {result.status === 'success' ? '✅ OK' : '❌ ERROR'}
                    </span>
                  </div>
                  
                  <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                    <div>Estado: {result.statusCode}</div>
                    {result.responseTime && <div>Tiempo: {result.responseTime}</div>}
                    {result.dataCount && <div>Datos: {result.dataCount} registros</div>}
                    <div style={{ marginTop: '0.5rem', color: result.status === 'success' ? '#059669' : '#dc2626' }}>
                      {result.message}
                    </div>
                    {result.details && (
                      <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: '#9ca3af' }}>
                        Detalles: {JSON.stringify(result.details)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              background: 'white',
              color: '#374151',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f9fafb'
              e.currentTarget.style.borderColor = '#9ca3af'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.borderColor = '#d1d5db'
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
