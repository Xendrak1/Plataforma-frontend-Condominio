import { api } from '../../services/api'

export interface Area {
  id: number
  nombre: string
  requiere_pago: boolean
  tarifa?: number
  reglas?: string
}

export async function fetchAreas(): Promise<Area[]> {
  const { data } = await api.get('/areas')
  return data
}

export async function createArea(area: Omit<Area, 'id'>): Promise<Area> {
  const { data } = await api.post('/areas/crear/', area)
  return data
}

export async function updateArea(id: number, area: Partial<Area>): Promise<Area> {
  const { data } = await api.put(`/areas/${id}/modificar/`, area)
  return data
}

export async function deleteArea(id: number): Promise<void> {
  await api.delete(`/areas/${id}/eliminar/`)
}

export async function getArea(id: number): Promise<Area> {
  const { data } = await api.get(`/areas/${id}/`)
  return data
}
