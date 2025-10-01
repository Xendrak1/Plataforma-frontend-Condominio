import { useState } from 'react'
import { useParkingAssignments } from '../../features/parking-assignments/hooks'
import { Table } from '../components/Table'
import type { TableColumn } from '../components/Table'
import { Loader } from '../components/Loader'
import { Note } from '../components/Note'
import { Icon } from '../components/icons'

type Row = {
  id: number
  vehiculo_placa: string
  vehiculo_modelo?: string
  vehiculo_color?: string
  propietario_nombre: string
  vivienda_codigo: string
  parqueo_numero: string
  parqueo_piso: number
  fecha_asignacion?: string
  activa: boolean
}

export function ParkingAssignmentsPage() {
  const { data = [], isLoading } = useParkingAssignments()
  const [term, setTerm] = useState('')

  const columns: TableColumn<Row>[] = [
    { header: 'Vehículo', accessor: r => `${r.vehiculo_placa} ${r.vehiculo_modelo ? `(${r.vehiculo_modelo})` : ''}` },
    { header: 'Propietario', accessor: r => r.propietario_nombre },
    { header: 'Vivienda', accessor: r => r.vivienda_codigo },
    { header: 'Parqueo', accessor: r => `P${r.parqueo_piso}-${r.parqueo_numero}` },
    { header: 'Fecha Asignación', accessor: r => r.fecha_asignacion ? new Date(r.fecha_asignacion).toLocaleDateString() : '-' },
    { header: 'Estado', accessor: r => r.activa ? 'Activa' : 'Inactiva' },
  ]

  const filteredData = data.filter(assignment =>
    assignment.vehiculo_placa.toLowerCase().includes(term.toLowerCase()) ||
    assignment.propietario_nombre.toLowerCase().includes(term.toLowerCase()) ||
    assignment.vivienda_codigo.toLowerCase().includes(term.toLowerCase()) ||
    assignment.parqueo_numero.toLowerCase().includes(term.toLowerCase())
  )

  if (isLoading) {
    return (
      <section>
        <h1>Asignaciones de Parqueos</h1>
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
        <h1>Asignaciones de Parqueos</h1>
        <button style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Icon.Plus />
          Nueva Asignación
        </button>
      </div>

      <Note>
        Gestión de asignaciones de parqueos a vehículos del condominio.
      </Note>

      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="Buscar asignaciones..."
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
        emptyMessage="No se encontraron asignaciones"
      />
    </section>
  )
}
