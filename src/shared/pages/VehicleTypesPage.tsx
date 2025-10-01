import { useState } from 'react'
import { useVehicleTypes } from '../../features/vehicles/hooks'
import { Table } from '../components/Table'
import type { TableColumn } from '../components/Table'
import { Loader } from '../components/Loader'
import { Note } from '../components/Note'
import { Icon } from '../components/icons'
import { CreateVehicleTypeModal } from '../components/CreateVehicleTypeModal'

type Row = {
  id: number
  nombre: string
}

export function VehicleTypesPage() {
  const { data = [], isLoading } = useVehicleTypes()
  const [term, setTerm] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const columns: TableColumn<Row>[] = [
    { header: 'Tipo de Vehículo', accessor: r => r.nombre },
  ]

  const filteredData = data.filter(type =>
    type.nombre.toLowerCase().includes(term.toLowerCase())
  )

  if (isLoading) {
    return (
      <section>
        <h1>Tipos de Vehículo</h1>
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
        <h1>Tipos de Vehículo</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          style={{
            background: '#f59e0b',
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
            e.currentTarget.style.background = '#d97706'
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f59e0b'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Icon.Plus />
          Nuevo Tipo
        </button>
      </div>

      <Note>
        Gestión de tipos de vehículo disponibles en el sistema.
      </Note>

      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Buscar tipos de vehículo..."
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
        emptyMessage="No se encontraron tipos de vehículo"
      />

      {/* Modal de creación */}
      <CreateVehicleTypeModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </section>
  )
}
