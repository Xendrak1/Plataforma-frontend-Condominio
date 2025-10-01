import { api } from './api'

export interface DashboardData {
  residentes: {
    total: number
  }
  viviendas: {
    total: number
  }
  parqueos: {
    total: number
    ocupados: number
    disponibles: number
  }
  expensas: {
    total: number
    pendientes: number
  }
  multas: {
    total: number
    pendientes: number
  }
}

export async function fetchDashboardData(): Promise<DashboardData> {
  const { data } = await api.get('/dashboard')
  return data
}
