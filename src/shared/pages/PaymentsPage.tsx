// Pagos: registro de pagos por expensas, multas, etc.
import { useState } from 'react'
import { usePayments } from '../../features/payments/hooks'
import { Table, type TableColumn } from '../components/Table'
import { Loader } from '../components/Loader'
import { Note } from '../components/Note'
import { useTableFilter } from '../hooks/useTableFilter'
import { Icon } from '../components/icons'
import { CreatePaymentModal } from '../components/CreatePaymentModal'

type Row = {
  id: number
  vivienda_id: number
  codigo_vivienda: string
  persona_id: number
  persona_nombre: string
  concepto: string
  monto: number
  fecha?: string
  metodo: string
  estado: string
}

export function PaymentsPage() {
  const { data = [], isLoading } = usePayments()
  const { term, setTerm, filteredData } = useTableFilter(data, ['codigo_vivienda', 'persona_nombre', 'concepto', 'metodo', 'estado'])
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  
  const columns: TableColumn<Row>[] = [
    { header: 'Vivienda', accessor: r => r.codigo_vivienda },
    { header: 'Persona', accessor: r => r.persona_nombre },
    { header: 'Concepto', accessor: r => r.concepto },
    { header: 'Monto (Bs)', accessor: r => r.monto.toFixed(2) },
    { header: 'Método', accessor: r => r.metodo },
    { header: 'Estado', accessor: r => r.estado },
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
          Pagos
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
            Pagos
          </h1>
          <button style={{
            background: '#22c55e',
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
            e.currentTarget.style.background = '#16a34a'
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#22c55e'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <Icon.Plus />
            Nuevo Pago
          </button>
        </div>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#666', 
          margin: '0',
          fontWeight: '400'
        }}>
          Registro de pagos por expensas, multas y otros conceptos
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
          placeholder="Buscar pagos..."
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
        <Table<Row> columns={columns} data={filteredData} />
      </div>

      {/* Modal de creación */}
      <CreatePaymentModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}


