// Nota breve para explicar propósito en defensa.
export function Note({ children, type = 'info' }: { children: React.ReactNode; type?: 'info' | 'error' | 'warning' | 'success' }) {
  const backgrounds = {
    info: '#f7f7f7',
    error: '#fee',
    warning: '#fef3cd',
    success: '#d4edda'
  };
  
  const borders = {
    info: '#eee',
    error: '#fcc',
    warning: '#ffc107',
    success: '#c3e6cb'
  };
  
  return (
    <div style={{ background: backgrounds[type], border: `1px solid ${borders[type]}`, padding: 12, borderRadius: 6, fontSize: 14 }}>
      {children}
    </div>
  )
}


