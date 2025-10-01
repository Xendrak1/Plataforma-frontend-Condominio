import { useState } from 'react'
import { useVehicles } from '../../features/vehicles/hooks'
import { Table } from '../components/Table'
import type { TableColumn } from '../components/Table'
import { Loader } from '../components/Loader'
import { Note } from '../components/Note'
import { Icon } from '../components/icons'
import { useTableFilter } from '../hooks/useTableFilter'
import { CreateVehicleModal } from '../components/CreateVehicleModal'

type Row = {
  id: number
  persona_nombre: string
  codigo_vivienda: string
  tipo_nombre: string
  placa: string
  modelo?: string
  color?: string
}

export function VehiclesPage() {
  const { data = [], isLoading } = useVehicles()
  const { term, setTerm, filteredData } = useTableFilter(data, ['persona_nombre', 'codigo_vivienda', 'placa', 'tipo_nombre'])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const columns: TableColumn<Row>[] = [
    { header: 'Propietario', accessor: r => r.persona_nombre },
    { header: 'Vivienda', accessor: r => r.codigo_vivienda },
    { header: 'Tipo', accessor: r => r.tipo_nombre },
    { header: 'Placa', accessor: r => r.placa },
    { header: 'Modelo', accessor: r => r.modelo || '-' },
    { header: 'Color', accessor: r => r.color || '-' },
  ]


  if (isLoading) {
    return (
      <section>
        <h1>Vehículos</h1>
        <Loader />
      </section>
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
        <h1>Vehículos</h1>
        <button style={{
          background: '#3b82f6',
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
          e.currentTarget.style.background = '#2563eb'
          e.currentTarget.style.transform = 'translateY(-1px)'
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#3b82f6'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <Icon.Plus />
          Nuevo Vehículo
        </button>
      </div>

      <Note>
        Gestión de vehículos registrados en el condominio.
      </Note>

      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Buscar vehículos..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem'
          }}
        />
      </div>

      <Table
        data={filteredData}
        columns={columns}
        emptyMessage="No se encontraron vehículos"
      />

      {/* Modal de creación */}
      <CreateVehicleModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </section>
  )
}
