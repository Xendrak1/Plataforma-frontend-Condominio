import { Link, NavLink, Outlet } from 'react-router-dom'
import { APP_CONFIG } from '../../config/app'
import { NAV_ITEMS } from '../../config/nav'
import './sidebar.css'

// Layout simple con cabecera, navegación lateral mínima y contenido.
// Mantiene el diseño claro y fácil de defender en presentación.
export function AppLayout() {
  return (
    <div>
      <aside className="sidebar">
        <div className="brand">
          <Link to="/" style={{ fontWeight: 700, textDecoration: 'none', color: '#fff' }}>
            {APP_CONFIG.name}
          </Link>
          <div className="brandSubtitle">{APP_CONFIG.city}</div>
        </div>
        <nav className="menu">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => (isActive ? 'navLink navLinkActive' : 'navLink')}
            >
              <span className="navLabel">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="content">
        <header style={{
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div>
            <h1 style={{ margin: '0', fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
              Sistema de Condominio
            </h1>
            <p style={{ margin: '0', fontSize: '0.875rem', color: '#6b7280' }}>
              Gestión integral del condominio
            </p>
          </div>
        </header>
        <div style={{ padding: '2rem' }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}


