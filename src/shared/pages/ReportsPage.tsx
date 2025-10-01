import { useState } from 'react'
import { useGeneralSummary, useExpensesReport, useVisitsReport } from '../../features/reports/hooks'
import { Loader } from '../components/Loader'
import { Note } from '../components/Note'
import { Icon } from '../components/icons'
import { SimpleChart } from '../components/SimpleChart'

export function ReportsPage() {
  const [activeTab, setActiveTab] = useState('resumen')
  const [filters, setFilters] = useState({
    mes: '',
    año: new Date().getFullYear().toString(),
    fecha_inicio: '',
    fecha_fin: ''
  })

  const { data: generalData, isLoading: generalLoading } = useGeneralSummary()
  const { data: expensesData, isLoading: expensesLoading } = useExpensesReport({
    mes: filters.mes || undefined,
    año: filters.año || undefined
  })
  const { data: visitsData, isLoading: visitsLoading } = useVisitsReport({
    fecha_inicio: filters.fecha_inicio || undefined,
    fecha_fin: filters.fecha_fin || undefined
  })

  const tabs = [
    { id: 'resumen', label: 'Resumen General', icon: <Icon.Users /> },
    { id: 'expensas', label: 'Expensas', icon: <Icon.DollarSign /> },
    { id: 'visitas', label: 'Visitas', icon: <Icon.Calendar /> }
  ]

  const renderResumenGeneral = () => {
    if (generalLoading) return <Loader />
    if (!generalData) return <Note>Error al cargar el resumen general</Note>

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Estadísticas Generales */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
            Estadísticas Generales
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Residentes:</span>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>{generalData.resumen_general.residentes}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Viviendas:</span>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>{generalData.resumen_general.viviendas}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Vehículos:</span>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>{generalData.resumen_general.vehiculos}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Mascotas:</span>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>{generalData.resumen_general.mascotas}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Visitas este mes:</span>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>{generalData.resumen_general.visitas_mes_actual}</span>
            </div>
          </div>
        </div>

        {/* Parqueos */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
            Ocupación de Parqueos
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Total:</span>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>{generalData.resumen_general.parqueos.total}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Ocupados:</span>
              <span style={{ fontWeight: '600', color: '#dc2626' }}>{generalData.resumen_general.parqueos.ocupados}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Disponibles:</span>
              <span style={{ fontWeight: '600', color: '#16a34a' }}>{generalData.resumen_general.parqueos.disponibles}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Ocupación:</span>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>{generalData.resumen_general.parqueos.porcentaje_ocupacion}%</span>
            </div>
          </div>
        </div>

        {/* Expensas */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
            Estado de Expensas
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Total:</span>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>{generalData.expensas.total}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Pagadas:</span>
              <span style={{ fontWeight: '600', color: '#16a34a' }}>{generalData.expensas.pagadas}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>Pendientes:</span>
              <span style={{ fontWeight: '600', color: '#dc2626' }}>{generalData.expensas.pendientes}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#6b7280' }}>% Pago:</span>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>{generalData.expensas.porcentaje_pago}%</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderExpensas = () => {
    if (expensesLoading) return <Loader />
    if (!expensesData) return <Note>Error al cargar el reporte de expensas</Note>

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
            Resumen de Expensas
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>
                ${expensesData.resumen.total_monto.toLocaleString()}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Total</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f0fdf4', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#16a34a' }}>
                ${expensesData.resumen.monto_pagado.toLocaleString()}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Pagado</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#fef2f2', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#dc2626' }}>
                ${expensesData.resumen.monto_pendiente.toLocaleString()}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Pendiente</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f0f9ff', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#2563eb' }}>
                {expensesData.resumen.porcentaje_pago}%
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>% Pago</div>
            </div>
          </div>
        </div>

        {Object.keys(expensesData.por_vivienda).length > 0 && (
          <SimpleChart
            data={Object.entries(expensesData.por_vivienda).map(([vivienda, data]) => ({
              label: `Vivienda ${vivienda}`,
              value: data.total,
              color: '#3b82f6'
            }))}
            title="Expensas por Vivienda"
          />
        )}
      </div>
    )
  }

  const renderVisitas = () => {
    if (visitsLoading) return <Loader />
    if (!visitsData) return <Note>Error al cargar el reporte de visitas</Note>

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
            Resumen de Visitas
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>
                {visitsData.resumen.total_visitas}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Total Visitas</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#fef3c7', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#d97706' }}>
                {visitsData.resumen.visitas_activas}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Activas</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f0fdf4', borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#16a34a' }}>
                {visitsData.resumen.visitas_completadas}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Completadas</div>
            </div>
          </div>
        </div>

        {Object.keys(visitsData.por_vivienda).length > 0 && (
          <SimpleChart
            data={Object.entries(visitsData.por_vivienda).map(([vivienda, count]) => ({
              label: `Vivienda ${vivienda}`,
              value: count,
              color: '#8b5cf6'
            }))}
            title="Visitas por Vivienda"
          />
        )}
      </div>
    )
  }


  return (
    <section>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h1>Reportes y Análisis</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <select
            value={filters.año}
            onChange={(e) => setFilters({ ...filters, año: e.target.value })}
            style={{
              padding: '0.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.875rem'
            }}
          >
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
          <select
            value={filters.mes}
            onChange={(e) => setFilters({ ...filters, mes: e.target.value })}
            style={{
              padding: '0.5rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '0.875rem'
            }}
          >
            <option value="">Todos los meses</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>
      </div>

      <Note>
        Análisis detallado y reportes del condominio con métricas en tiempo real.
      </Note>

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '2rem',
        borderBottom: '1px solid #e5e7eb'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              background: activeTab === tab.id ? '#3b82f6' : 'transparent',
              color: activeTab === tab.id ? 'white' : '#6b7280',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido de tabs */}
      {activeTab === 'resumen' && renderResumenGeneral()}
      {activeTab === 'expensas' && renderExpensas()}
      {activeTab === 'visitas' && renderVisitas()}
    </section>
  )
}