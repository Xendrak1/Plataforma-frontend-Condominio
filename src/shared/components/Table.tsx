import React from 'react'

export type TableColumn<T> = {
	header: string
	accessor: (row: T) => React.ReactNode
}

// Tabla sencilla y reusable: recibe columnas y datos.
export function Table<T>({ 
	columns, 
	data, 
	emptyMessage = "Sin datos para mostrar" 
}: { 
	columns: TableColumn<T>[]; 
	data: T[];
	emptyMessage?: string;
}) {
	if (!data || data.length === 0) {
		return (
			<div style={{ padding: 12, color: '#6b7280', fontSize: 14 }}>
				{emptyMessage}
			</div>
		)
	}

	return (
		<table style={{ 
			width: '100%', 
			borderCollapse: 'collapse', 
			background: '#ffffff', 
			color: '#111827',
			fontSize: '0.875rem'
		}}>
			<thead>
				<tr>
					{columns.map((col, idx) => (
						<th key={idx} style={{ 
							textAlign: 'left', 
							padding: '1rem 1.5rem', 
							borderBottom: '1px solid #e5e7eb', 
							background: '#f8fafc',
							fontWeight: '600',
							fontSize: '0.75rem',
							textTransform: 'uppercase',
							letterSpacing: '0.05em',
							color: '#64748b'
						}}>
							{col.header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((row, rIdx) => (
					<tr key={rIdx} style={{
						borderBottom: '1px solid #f1f5f9',
						transition: 'background-color 0.15s ease'
					}} onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = '#f8fafc'
					}} onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = 'transparent'
					}}>
						{columns.map((col, cIdx) => (
							<td key={cIdx} style={{ 
								padding: '1rem 1.5rem', 
								borderBottom: '1px solid #f1f5f9',
								color: '#334155',
								fontWeight: '500'
							}}>
								{col.accessor(row)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
