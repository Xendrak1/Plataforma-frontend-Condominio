// Parqueos: asignación y estado (ocupado/libre).
import { useState } from 'react'
import { useParkings } from '../../features/parkings/hooks'
import { Table, type TableColumn } from '../components/Table'
import { Loader } from '../components/Loader'
import { Note } from '../components/Note'
import { TableFilter } from '../components/TableFilter'
import { useTableFilter } from '../hooks/useTableFilter'
import { Icon } from '../components/icons'
import { CreateParkingModal } from '../components/CreateParkingModal'

type Row = {
	id: number
	codigo: string
	ocupado: boolean
	vivienda?: string
}

export function ParkingPage() {
	const { data = [], isLoading } = useParkings()
	const { term, setTerm, filteredData } = useTableFilter(data, ['codigo', 'vivienda'])
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
	
	const columns: TableColumn<Row>[] = [
		{ header: 'Código', accessor: r => r.codigo },
		{ header: 'Ocupado', accessor: r => (r.ocupado ? 'Sí' : 'No') },
		{ header: 'Vivienda', accessor: r => r.vivienda || '-' },
	]

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
                        Parqueos
                    </h1>
                    <button style={{
                        background: '#06b6d4',
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
                        e.currentTarget.style.background = '#0891b2'
                        e.currentTarget.style.transform = 'translateY(-1px)'
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#06b6d4'
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }}>
                        <Icon.Plus />
                        Nuevo Parqueo
                    </button>
                </div>
                <p style={{ 
                    fontSize: '1.1rem', 
                    color: '#666', 
                    margin: '0',
                    fontWeight: '400'
                }}>
                    Gestión de parqueos y asignaciones
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
                <TableFilter placeholder="Buscar por código, vivienda o estado" onChange={setTerm} />
            </div>

            {/* Tabla con diseño mejorado */}
            <div style={{ 
                background: 'white', 
                borderRadius: '12px', 
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
            }}>
                {isLoading ? <Loader /> : <Table<Row> columns={columns} data={filteredData} />}
            </div>

            {/* Modal de creación */}
            <CreateParkingModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    )
}


