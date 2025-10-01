// Indicador de carga simple y reutilizable.
export function Loader({ label = 'Cargando...' }: { label?: string }) {
  return (
    <div style={{ padding: 12, color: '#666', fontSize: 14 }}>{label}</div>
  )
}


