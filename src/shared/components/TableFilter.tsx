import { useState, useEffect } from 'react'

// Filtro de texto reutilizable para tablas. Emite el término con debounce simple.
export function TableFilter({ placeholder = 'Buscar...', onChange }: { placeholder?: string; onChange: (value: string) => void }) {
	const [value, setValue] = useState('')

	useEffect(() => {
		const t = setTimeout(() => onChange(value.trim()), 200)
		return () => clearTimeout(t)
	}, [value, onChange])

	return (
		<div style={{ margin: '0' }}>
			<input
				type="text"
				value={value}
				placeholder={placeholder}
				onChange={(e) => setValue(e.target.value)}
				style={{
					width: '100%',
					padding: '0.75rem 1rem',
					border: '1px solid #d1d5db',
					borderRadius: '8px',
					background: '#ffffff',
					color: '#374151',
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
	)
}
