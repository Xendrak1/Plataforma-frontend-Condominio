import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './shared/layouts/AppLayout'
import { LoginPage } from './shared/pages/LoginPage'
import { DashboardPage } from './shared/pages/DashboardPage'
import { ResidentsPage } from './shared/pages/ResidentsPage'
import { HomesPage } from './shared/pages/HomesPage'
import { ParkingPage } from './shared/pages/ParkingPage'
import { VisitorsPage } from './shared/pages/VisitorsPage'
import { VisitsPage } from './shared/pages/VisitsPage'
import { PetsPage } from './shared/pages/PetsPage'
import { ParkingAssignmentsPage } from './shared/pages/ParkingAssignmentsPage'
import { ReservationsPage } from './shared/pages/ReservationsPage'
import { AreasPage } from './shared/pages/AreasPage'
import { ExpensesPage } from './shared/pages/ExpensesPage'
import { PaymentsPage } from './shared/pages/PaymentsPage'
import { FinesPage } from './shared/pages/FinesPage'
import { CommunicationsPage } from './shared/pages/CommunicationsPage'
import { VehiclesPage } from './shared/pages/VehiclesPage'
import { VehicleTypesPage } from './shared/pages/VehicleTypesPage'
import { ReportsPage } from './shared/pages/ReportsPage'
import { SettingsPage } from './shared/pages/SettingsPage'
import { UsersPage } from './shared/pages/UsersPage'
import { UserProfilePage } from './shared/pages/UserProfilePage'
import { ChangePasswordPage } from './shared/pages/ChangePasswordPage'
import { NotFoundPage } from './shared/pages/NotFoundPage'
import { PrivateRoute } from './shared/components/PrivateRoute'

// Definimos las rutas principales del sistema, enfocadas a un solo condominio.
export const router = createBrowserRouter([
  // Ruta pública de login
  {
    path: '/login',
    element: <LoginPage />,
  },
  // Rutas protegidas (requieren autenticación)
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <AppLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'residentes', element: <ResidentsPage /> },
          { path: 'viviendas', element: <HomesPage /> },
          { path: 'parqueos', element: <ParkingPage /> },
          { path: 'visitantes', element: <VisitorsPage /> },
          { path: 'visitas', element: <VisitsPage /> },
          { path: 'mascotas', element: <PetsPage /> },
          { path: 'asignaciones-parqueo', element: <ParkingAssignmentsPage /> },
          { path: 'reservas', element: <ReservationsPage /> },
          { path: 'areas', element: <AreasPage /> },
          { path: 'expensas', element: <ExpensesPage /> },
          { path: 'pagos', element: <PaymentsPage /> },
          { path: 'multas', element: <FinesPage /> },
          { path: 'comunicados', element: <CommunicationsPage /> },
          { path: 'vehiculos', element: <VehiclesPage /> },
          { path: 'tipos-vehiculo', element: <VehicleTypesPage /> },
          { path: 'reportes', element: <ReportsPage /> },
          { path: 'usuarios', element: <UsersPage /> },
          { path: 'perfil', element: <UserProfilePage /> },
          { path: 'cambiar-contrasena', element: <ChangePasswordPage /> },
          { path: 'configuracion', element: <SettingsPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
])


