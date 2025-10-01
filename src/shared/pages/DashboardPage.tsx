// Dashboard con estadísticas del condominio
import { useState } from 'react'
import { useDashboard } from '../../features/dashboard/hooks'
import { Loader } from '../components/Loader'
import { Note } from '../components/Note'
import { SimpleChart } from '../components/SimpleChart'
import { Icon } from '../components/icons'
import { useNavigate } from 'react-router-dom'
import { DiagnosticModal } from '../components/DiagnosticModal'

export function DashboardPage() {
  const { data, isLoading, error } = useDashboard()
  const navigate = useNavigate()
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false)

  if (isLoading) {
    return (
      <section>
        <h1>Dashboard</h1>
        <Loader />
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h1>Dashboard</h1>
        <Note type="error">
          Error al cargar las estadísticas del dashboard.
        </Note>
      </section>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '300', 
          color: '#1a1a1a', 
          margin: '0 0 0.5rem 0',
          letterSpacing: '-0.02em'
        }}>
          Dashboard
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#666', 
          margin: '0',
          fontWeight: '400'
        }}>
          Resumen general del condominio con estadísticas en tiempo real
        </p>
      </div>
      
      {/* Estadísticas principales */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '2rem', 
        marginBottom: '3rem'
      }}>
        {/* Residentes */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              background: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '1rem'
            }}>
              <Icon.Users />
            </div>
            <div>
              <h3 style={{ margin: '0', fontSize: '1rem', fontWeight: '500', color: '#6b7280' }}>
                Residentes
              </h3>
              <p style={{ margin: '0', fontSize: '0.875rem', color: '#9ca3af' }}>
                Total activos
              </p>
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
            {data?.residentes?.total || 0}
          </div>
        </div>

        {/* Viviendas */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              background: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '1rem'
            }}>
              <Icon.Home />
            </div>
            <div>
              <h3 style={{ margin: '0', fontSize: '1rem', fontWeight: '500', color: '#6b7280' }}>
                Viviendas
              </h3>
              <p style={{ margin: '0', fontSize: '0.875rem', color: '#9ca3af' }}>
                Unidades activas
              </p>
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
            {data?.viviendas?.total || 0}
          </div>
        </div>

        {/* Parqueos */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              background: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '1rem'
            }}>
              <Icon.Car />
            </div>
            <div>
              <h3 style={{ margin: '0', fontSize: '1rem', fontWeight: '500', color: '#6b7280' }}>
                Parqueos
              </h3>
              <p style={{ margin: '0', fontSize: '0.875rem', color: '#9ca3af' }}>
                Ocupación actual
              </p>
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
            {data?.parqueos?.ocupados || 0} / {data?.parqueos?.total || 0}
          </div>
          <div style={{ 
            fontSize: '0.875rem', 
            color: data?.parqueos?.disponibles === 0 ? '#dc2626' : '#059669',
            fontWeight: '500'
          }}>
            {data?.parqueos?.disponibles || 0} disponibles
          </div>
        </div>

        {/* Expensas */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              background: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '1rem'
            }}>
              <Icon.DollarSign />
            </div>
            <div>
              <h3 style={{ margin: '0', fontSize: '1rem', fontWeight: '500', color: '#6b7280' }}>
                Expensas
              </h3>
              <p style={{ margin: '0', fontSize: '0.875rem', color: '#9ca3af' }}>
                Estado de pagos
              </p>
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
            {data?.expensas?.total || 0}
          </div>
          <div style={{ 
            fontSize: '0.875rem', 
            color: data?.expensas?.pendientes > 0 ? '#dc2626' : '#059669',
            fontWeight: '500'
          }}>
            {data?.expensas?.pendientes || 0} pendientes
          </div>
        </div>

        {/* Multas */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              background: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '1rem'
            }}>
              <Icon.AlertTriangle />
            </div>
            <div>
              <h3 style={{ margin: '0', fontSize: '1rem', fontWeight: '500', color: '#6b7280' }}>
                Multas
              </h3>
              <p style={{ margin: '0', fontSize: '0.875rem', color: '#9ca3af' }}>
                Infracciones registradas
              </p>
            </div>
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
            {data?.multas?.total || 0}
          </div>
          <div style={{ 
            fontSize: '0.875rem', 
            color: data?.multas?.pendientes > 0 ? '#dc2626' : '#059669',
            fontWeight: '500'
          }}>
            {data?.multas?.pendientes || 0} pendientes
          </div>
        </div>

              {/* Vehículos */}
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem'
                  }}>
                    <Icon.Car />
                  </div>
                  <div>
                    <h3 style={{ margin: '0', fontSize: '1rem', fontWeight: '500', color: '#6b7280' }}>
                      Vehículos
                    </h3>
                    <p style={{ margin: '0', fontSize: '0.875rem', color: '#9ca3af' }}>
                      Registrados en el sistema
                    </p>
                  </div>
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                  {data?.vehiculos?.total || 0}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  {data?.vehiculos?.tipos || 0} tipos disponibles
                </div>
              </div>

              {/* Mascotas */}
              <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 style={{ margin: '0', fontSize: '1rem', fontWeight: '500', color: '#6b7280' }}>
                      Mascotas
                    </h3>
                    <p style={{ margin: '0', fontSize: '0.875rem', color: '#9ca3af' }}>
                      Registradas en el condominio
                    </p>
                  </div>
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                  {data?.mascotas?.total || 0}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '500'
                }}>
                  Mascotas registradas
                </div>
              </div>
      </div>

      {/* Gráficos */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '500', 
          color: '#1f2937', 
          marginBottom: '1.5rem' 
        }}>
          Análisis Visual
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '2rem' 
        }}>
          <SimpleChart
            title="Estado de Parqueos"
            data={[
              { label: 'Ocupados', value: data?.parqueos?.ocupados || 0, color: '#dc2626' },
              { label: 'Disponibles', value: data?.parqueos?.disponibles || 0, color: '#059669' }
            ]}
          />
          <SimpleChart
            title="Estado de Pagos"
            data={[
              { label: 'Expensas Pendientes', value: data?.expensas?.pendientes || 0, color: '#d97706' },
              { label: 'Multas Pendientes', value: data?.multas?.pendientes || 0, color: '#dc2626' }
            ]}
          />
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '500', 
          color: '#1f2937', 
          marginBottom: '1.5rem' 
        }}>
          Acciones Rápidas
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem' 
        }}>
          <button 
            onClick={() => navigate('/residentes')}
            style={{
              background: 'white',
              color: '#374151',
              border: '1px solid #e5e7eb',
              padding: '1.5rem',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f9fafb'
              e.currentTarget.style.borderColor = '#d1d5db'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.borderColor = '#e5e7eb'
            }}
          >
            <Icon.Plus />
            Nuevo Residente
          </button>
          <button 
            onClick={() => navigate('/viviendas')}
            style={{
              background: 'white',
              color: '#374151',
              border: '1px solid #e5e7eb',
              padding: '1.5rem',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f9fafb'
              e.currentTarget.style.borderColor = '#d1d5db'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.borderColor = '#e5e7eb'
            }}
          >
            <Icon.Home />
            Nueva Vivienda
          </button>
          <button 
            onClick={() => navigate('/reservas')}
            style={{
              background: 'white',
              color: '#374151',
              border: '1px solid #e5e7eb',
              padding: '1.5rem',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f9fafb'
              e.currentTarget.style.borderColor = '#d1d5db'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.borderColor = '#e5e7eb'
            }}
          >
            <Icon.Calendar />
            Nueva Reserva
          </button>
          <button 
            onClick={() => navigate('/expensas')}
            style={{
              background: 'white',
              color: '#374151',
              border: '1px solid #e5e7eb',
              padding: '1.5rem',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f9fafb'
              e.currentTarget.style.borderColor = '#d1d5db'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.borderColor = '#e5e7eb'
            }}
          >
            <Icon.FileText />
            Generar Expensa
          </button>
        </div>

        {/* Botón de Diagnóstico */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <button
            onClick={() => setIsDiagnosticOpen(true)}
            style={{
              background: '#8b5cf6',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#7c3aed'
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#8b5cf6'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}
          >
            🔍 Diagnóstico del Sistema
          </button>
        </div>
      </div>

      {/* Modal de Diagnóstico */}
      <DiagnosticModal 
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
      />
    </div>
  )
}


