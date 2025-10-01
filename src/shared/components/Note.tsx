// Nota breve para explicar propósito en defensa.
export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#f7f7f7', border: '1px solid #eee', padding: 12, borderRadius: 6, fontSize: 14 }}>
      {children}
    </div>
  )
}


