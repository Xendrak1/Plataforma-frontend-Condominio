import type { NavItem } from '../types/nav'

// Menú principal. Mantener orden y textos claros para defensa.
export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/' },
  { label: 'Residentes', path: '/residentes' },
  { label: 'Viviendas', path: '/viviendas' },
  { label: 'Parqueos', path: '/parqueos' },
  { label: 'Visitantes', path: '/visitantes' },
  { label: 'Control de Visitas', path: '/visitas' },
  { label: 'Mascotas', path: '/mascotas' },
  // { label: 'Asignaciones de Parqueos', path: '/asignaciones-parqueo' },  // DESHABILITADO
  { label: 'Reservas', path: '/reservas' },
  { label: 'Áreas comunes', path: '/areas' },
  { label: 'Expensas', path: '/expensas' },
  { label: 'Pagos', path: '/pagos' },
  { label: 'Multas', path: '/multas' },
  { label: 'Comunicados', path: '/comunicados' },
  { label: 'Vehículos', path: '/vehiculos' },
  { label: 'Tipos de Vehículo', path: '/tipos-vehiculo' },
  { label: 'Reportes', path: '/reportes' },
  { label: 'Usuarios', path: '/usuarios' },
  { label: 'Configuración', path: '/configuracion' },
]


