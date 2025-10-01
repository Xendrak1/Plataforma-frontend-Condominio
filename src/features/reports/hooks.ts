import { useQuery } from '@tanstack/react-query'
import { 
  fetchGeneralSummary,
  fetchExpensesReport,
  fetchVisitsReport,
  fetchVehiclesReport,
  fetchParkingOccupancyReport,
  fetchMonthlyStats,
  type GeneralSummary,
  type ExpensesReport,
  type VisitsReport,
  type VehiclesReport,
  type ParkingOccupancyReport,
  type MonthlyStats
} from './service'

export function useGeneralSummary() {
  return useQuery<GeneralSummary, Error>({
    queryKey: ['general-summary'],
    queryFn: fetchGeneralSummary,
  })
}

export function useExpensesReport(params?: {
  mes?: string
  año?: string
  estado?: string
}) {
  return useQuery<ExpensesReport, Error>({
    queryKey: ['expenses-report', params],
    queryFn: () => fetchExpensesReport(params),
  })
}

export function useVisitsReport(params?: {
  fecha_inicio?: string
  fecha_fin?: string
}) {
  return useQuery<VisitsReport, Error>({
    queryKey: ['visits-report', params],
    queryFn: () => fetchVisitsReport(params),
  })
}

export function useVehiclesReport() {
  return useQuery<VehiclesReport, Error>({
    queryKey: ['vehicles-report'],
    queryFn: fetchVehiclesReport,
  })
}

export function useParkingOccupancyReport() {
  return useQuery<ParkingOccupancyReport, Error>({
    queryKey: ['parking-occupancy-report'],
    queryFn: fetchParkingOccupancyReport,
  })
}

export function useMonthlyStats(params?: {
  año?: number
  mes?: number
}) {
  return useQuery<MonthlyStats, Error>({
    queryKey: ['monthly-stats', params],
    queryFn: () => fetchMonthlyStats(params),
  })
}
