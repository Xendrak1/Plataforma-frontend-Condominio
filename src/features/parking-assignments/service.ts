import { api } from '../../services/api'

export type ParkingAssignment = {
  id: number
  vehiculo_id: number
  vehiculo_placa: string
  vehiculo_modelo?: string
  vehiculo_color?: string
  propietario_nombre: string
  vivienda_codigo: string
  parqueo_id: number
  parqueo_numero: string
  parqueo_piso: number
  fecha_asignacion?: string
  activa: boolean
}

export type AvailableParking = {
  id: number
  numero: string
  piso: number
  tipo: string
}

export async function fetchParkingAssignments(): Promise<ParkingAssignment[]> {
  const { data } = await api.get('/asignaciones-parqueo')
  return data
}

export async function createParkingAssignment(assignment: {
  vehiculo_id: number
  parqueo_id: number
}): Promise<ParkingAssignment> {
  const { data } = await api.post('/asignaciones-parqueo/crear/', assignment)
  return data
}

export async function updateParkingAssignment(id: number, assignment: Partial<ParkingAssignment>): Promise<ParkingAssignment> {
  const { data } = await api.put(`/asignaciones-parqueo/${id}/modificar/`, assignment)
  return data
}

export async function deleteParkingAssignment(id: number): Promise<void> {
  await api.delete(`/asignaciones-parqueo/${id}/eliminar/`)
}

export async function getParkingAssignment(id: number): Promise<ParkingAssignment> {
  const { data } = await api.get(`/asignaciones-parqueo/${id}/`)
  return data
}

export async function fetchAvailableParkings(): Promise<AvailableParking[]> {
  const { data } = await api.get('/parqueos/disponibles/')
  return data
}
