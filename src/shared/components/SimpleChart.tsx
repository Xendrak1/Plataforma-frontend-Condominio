interface SimpleChartProps {
  data: { label: string; value: number; color?: string }[]
  title: string
}

export function SimpleChart({ data, title }: SimpleChartProps) {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <div style={{
      background: 'white',
      padding: '2rem',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <h4 style={{ 
        margin: '0 0 1.5rem 0', 
        fontSize: '1.125rem',
        fontWeight: '500',
        color: '#1f2937' 
      }}>
        {title}
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {data.map((item, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            padding: '0.75rem',
            borderRadius: '8px',
            background: '#f9fafb'
          }}>
            <div style={{
              width: '16px',
              height: '16px',
              borderRadius: '4px',
              background: item.color || '#6b7280',
              flexShrink: 0
            }} />
            <div style={{ 
              flex: 1, 
              fontSize: '0.875rem', 
              fontWeight: '500',
              color: '#374151' 
            }}>
              {item.label}
            </div>
            <div style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              color: '#1f2937',
              minWidth: '2rem',
              textAlign: 'right'
            }}>
              {item.value}
            </div>
            <div style={{
              width: '80px',
              height: '6px',
              background: '#e5e7eb',
              borderRadius: '3px',
              overflow: 'hidden',
              flexShrink: 0
            }}>
              <div style={{
                width: `${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%`,
                height: '100%',
                background: item.color || '#6b7280',
                transition: 'width 0.3s ease',
                borderRadius: '3px'
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
