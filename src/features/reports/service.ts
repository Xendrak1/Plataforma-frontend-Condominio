import { api } from '../../services/api'

export type GeneralSummary = {
  resumen_general: {
    residentes: number
    viviendas: number
    parqueos: {
      total: number
      ocupados: number
      disponibles: number
      porcentaje_ocupacion: number
    }
    vehiculos: number
    mascotas: number
    visitantes: number
    visitas_mes_actual: number
  }
  expensas: {
    total: number
    pendientes: number
    pagadas: number
    porcentaje_pago: number
  }
  multas: {
    total: number
    pendientes: number
    pagadas: number
    porcentaje_pago: number
  }
}

export type ExpensesReport = {
  resumen: {
    total_monto: number
    monto_pagado: number
    monto_pendiente: number
    porcentaje_pago: number
  }
  por_vivienda: Record<string, {
    total: number
    pagado: number
    pendiente: number
  }>
  filtros_aplicados: {
    mes?: string
    año?: string
    estado?: string
  }
}

export type VisitsReport = {
  resumen: {
    total_visitas: number
    visitas_activas: number
    visitas_completadas: number
  }
  por_vivienda: Record<string, number>
  visitantes_frecuentes: Record<string, number>
  filtros_aplicados: {
    fecha_inicio?: string
    fecha_fin?: string
  }
}

export type VehiclesReport = {
  resumen: {
    total_vehiculos: number
    con_parqueo: number
    sin_parqueo: number
    porcentaje_asignacion: number
  }
  por_tipo: Record<string, number>
  asignaciones_por_piso: Record<string, number>
}

export type ParkingOccupancyReport = {
  resumen: {
    total_parqueos: number
    ocupados: number
    disponibles: number
    porcentaje_ocupacion: number
  }
  por_piso: Record<string, {
    total: number
    ocupados: number
    disponibles: number
    porcentaje_ocupacion: number
  }>
}

export type MonthlyStats = {
  periodo: {
    año: number
    mes: number
    nombre_mes: string
  }
  estadisticas: {
    visitas: {
      actual: number
      anterior: number
      variacion: number
      porcentaje_variacion: number
    }
    expensas: {
      total: number
      monto_total: number
      pagadas: number
      pendientes: number
    }
    multas: {
      total: number
      monto_total: number
      pagadas: number
      pendientes: number
    }
  }
}

export async function fetchGeneralSummary(): Promise<GeneralSummary> {
  const { data } = await api.get('/reportes/resumen-general/')
  return data
}

export async function fetchExpensesReport(params?: {
  mes?: string
  año?: string
  estado?: string
}): Promise<ExpensesReport> {
  const { data } = await api.get('/reportes/expensas/', { params })
  return data
}

export async function fetchVisitsReport(params?: {
  fecha_inicio?: string
  fecha_fin?: string
}): Promise<VisitsReport> {
  const { data } = await api.get('/reportes/visitas/', { params })
  return data
}

export async function fetchVehiclesReport(): Promise<VehiclesReport> {
  const { data } = await api.get('/reportes/vehiculos/')
  return data
}

export async function fetchParkingOccupancyReport(): Promise<ParkingOccupancyReport> {
  const { data } = await api.get('/reportes/ocupacion-parqueos/')
  return data
}

export async function fetchMonthlyStats(params?: {
  año?: number
  mes?: number
}): Promise<MonthlyStats> {
  const { data } = await api.get('/reportes/estadisticas-mensuales/', { params })
  return data
}
