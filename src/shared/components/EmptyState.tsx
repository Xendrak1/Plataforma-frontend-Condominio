// Componente simple para estados vacíos.
export function EmptyState({ title, description }: { title: string; description?: string }) {
	return (
		<div style={{ padding: 24, textAlign: 'center', color: '#666' }}>
			<div style={{ fontSize: 32, marginBottom: 8 }}>🗂️</div>
			<div style={{ fontWeight: 600 }}>{title}</div>
			{description ? <div style={{ fontSize: 14 }}>{description}</div> : null}
		</div>
	)
}
