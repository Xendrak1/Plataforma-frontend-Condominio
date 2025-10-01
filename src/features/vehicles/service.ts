import { api } from '../../services/api'

export type Vehicle = {
  id: number
  persona_id: number
  persona_nombre: string
  vivienda_id: number
  codigo_vivienda: string
  tipo_id: number
  tipo_nombre: string
  placa: string
  modelo?: string
  color?: string
}

export type VehicleType = {
  id: number
  nombre: string
}

export async function fetchVehicles(): Promise<Vehicle[]> {
  const { data } = await api.get('/vehiculos')
  return data
}

export async function createVehicle(vehicle: Omit<Vehicle, 'id' | 'persona_nombre' | 'codigo_vivienda' | 'tipo_nombre'>): Promise<Vehicle> {
  const { data } = await api.post('/vehiculos/crear/', vehicle)
  return data
}

export async function updateVehicle(id: number, vehicle: Partial<Vehicle>): Promise<Vehicle> {
  const { data } = await api.put(`/vehiculos/${id}/modificar/`, vehicle)
  return data
}

export async function deleteVehicle(id: number): Promise<void> {
  await api.delete(`/vehiculos/${id}/eliminar/`)
}

export async function getVehicle(id: number): Promise<Vehicle> {
  const { data } = await api.get(`/vehiculos/${id}/`)
  return data
}

// Servicios para tipos de vehículo
export async function fetchVehicleTypes(): Promise<VehicleType[]> {
  const { data } = await api.get('/tipos-vehiculo')
  return data
}

export async function createVehicleType(vehicleType: Omit<VehicleType, 'id'>): Promise<VehicleType> {
  const { data } = await api.post('/tipos-vehiculo/crear/', vehicleType)
  return data
}

export async function updateVehicleType(id: number, vehicleType: Partial<VehicleType>): Promise<VehicleType> {
  const { data } = await api.put(`/tipos-vehiculo/${id}/modificar/`, vehicleType)
  return data
}

export async function deleteVehicleType(id: number): Promise<void> {
  await api.delete(`/tipos-vehiculo/${id}/eliminar/`)
}

export async function getVehicleType(id: number): Promise<VehicleType> {
  const { data } = await api.get(`/tipos-vehiculo/${id}/`)
  return data
}
