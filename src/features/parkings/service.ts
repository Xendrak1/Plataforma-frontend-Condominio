import { api } from '../../services/api'

export interface Parking {
  id: number
  codigo: string
  ocupado: boolean
}

export async function fetchParkings(): Promise<Parking[]> {
  const { data } = await api.get('/parqueos')
  return data
}

export async function createParking(parking: Omit<Parking, 'id'>): Promise<Parking> {
  const { data } = await api.post('/parqueos/crear/', parking)
  return data
}

export async function updateParking(id: number, parking: Partial<Parking>): Promise<Parking> {
  const { data } = await api.put(`/parqueos/${id}/modificar/`, parking)
  return data
}

export async function deleteParking(id: number): Promise<void> {
  await api.delete(`/parqueos/${id}/eliminar/`)
}

export async function getParking(id: number): Promise<Parking> {
  const { data } = await api.get(`/parqueos/${id}/`)
  return data
}
