import { useState } from 'react'
import { useVisitors } from '../../features/visits/hooks'
import { Table } from '../components/Table'
import type { TableColumn } from '../components/Table'
import { Loader } from '../components/Loader'
import { Note } from '../components/Note'
import { Icon } from '../components/icons'
import { useTableFilter } from '../hooks/useTableFilter'
import { CreateVisitorModal } from '../components/CreateVisitorModal'

type Row = {
  id: number
  nombres: string
  apellidos?: string
  num_doc?: string
  ultima_visita?: string
  estado_visita: string
}

export function VisitorsPage() {
  const { data = [], isLoading } = useVisitors()
  const { term, setTerm, filteredData } = useTableFilter(data, ['nombres', 'apellidos', 'num_doc'])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const columns: TableColumn<Row>[] = [
    { header: 'Nombre', accessor: r => `${r.nombres} ${r.apellidos || ''}`.trim() },
    { header: 'Documento', accessor: r => r.num_doc || '-' },
    { header: 'Última Visita', accessor: r => r.ultima_visita ? new Date(r.ultima_visita).toLocaleString() : '-' },
    { header: 'Estado', accessor: r => r.estado_visita },
  ]

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '300', 
          color: '#1a1a1a', 
          margin: '0 0 0.5rem 0',
          letterSpacing: '-0.02em'
        }}>
          Visitantes
        </h1>
        <Loader />
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header elegante */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '300', 
            color: '#1a1a1a', 
            margin: '0',
            letterSpacing: '-0.02em'
          }}>
            Visitantes
          </h1>
          <button style={{
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
          onClick={() => setIsCreateModalOpen(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#7c3aed'
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#8b5cf6'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <Icon.Plus />
            Nuevo Visitante
          </button>
        </div>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#666', 
          margin: '0',
          fontWeight: '400'
        }}>
          Gestión de visitantes registrados en el condominio
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <div style={{ 
        background: 'white', 
        padding: '1.5rem', 
        borderRadius: '12px', 
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <input
          type="text"
          placeholder="Buscar visitantes..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '0.875rem',
            transition: 'all 0.15s ease',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#3b82f6'
            e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#d1d5db'
            e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}
        />
      </div>

      {/* Tabla con diseño mejorado */}
      <div style={{ 
        background: 'white', 
        borderRadius: '12px', 
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <Table
          data={filteredData}
          columns={columns}
          emptyMessage="No se encontraron visitantes"
        />
      </div>

      {/* Modal de creación */}
      <CreateVisitorModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}