import { api } from '../../services/api'
import type { Resident } from './hooks'

export async function fetchResidents(): Promise<Resident[]> {
  const { data } = await api.get('/residentes')
  return data
}

export async function createResident(resident: Omit<Resident, 'id'>): Promise<Resident> {
  const { data } = await api.post('/residentes/crear/', resident)
  return data
}

export async function updateResident(id: number, resident: Partial<Resident>): Promise<Resident> {
  const { data } = await api.put(`/residentes/${id}/modificar/`, resident)
  return data
}

export async function deleteResident(id: number): Promise<void> {
  await api.delete(`/residentes/${id}/eliminar/`)
}

export async function getResident(id: number): Promise<Resident> {
  const { data } = await api.get(`/residentes/${id}/`)
  return data
}


