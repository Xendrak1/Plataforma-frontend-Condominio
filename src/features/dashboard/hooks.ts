import { useQuery } from '@tanstack/react-query'
import { fetchDashboardData, type DashboardData } from '../../services/dashboard'

export type { DashboardData }

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
  })
}
