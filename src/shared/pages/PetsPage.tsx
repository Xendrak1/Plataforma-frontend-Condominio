import { useState } from 'react'
import { usePets } from '../../features/pets/hooks'
import { Table } from '../components/Table'
import type { TableColumn } from '../components/Table'
import { Loader } from '../components/Loader'
import { Note } from '../components/Note'
import { Icon } from '../components/icons'
import { useTableFilter } from '../hooks/useTableFilter'
import { CreatePetModal } from '../components/CreatePetModal'

type Row = {
  id: number
  nombre: string
  tipo: string
  raza?: string
  edad?: number
  propietario_nombre: string
  codigo_vivienda: string
}

export function PetsPage() {
  const { data = [], isLoading } = usePets()
  const { term, setTerm, filteredData } = useTableFilter(data, ['nombre', 'tipo', 'raza', 'propietario_nombre', 'codigo_vivienda'])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const columns: TableColumn<Row>[] = [
    { header: 'Nombre', accessor: r => r.nombre },
    { header: 'Tipo', accessor: r => r.tipo },
    { header: 'Raza', accessor: r => r.raza || '-' },
    { header: 'Edad', accessor: r => r.edad ? `${r.edad} años` : '-' },
    { header: 'Propietario', accessor: r => r.propietario_nombre },
    { header: 'Vivienda', accessor: r => r.codigo_vivienda },
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
          Mascotas
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
            Mascotas
          </h1>
          <button style={{
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
          onClick={() => setIsCreateModalOpen(true)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#d97706'
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f59e0b'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <Icon.Plus />
            Nueva Mascota
          </button>
        </div>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#666', 
          margin: '0',
          fontWeight: '400'
        }}>
          Gestión de mascotas registradas en el condominio
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
          placeholder="Buscar mascotas..."
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
          emptyMessage="No se encontraron mascotas"
        />
      </div>

      {/* Modal de creación */}
      <CreatePetModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}
