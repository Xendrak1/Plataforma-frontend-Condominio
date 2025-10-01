import { api } from '../../services/api'
import type { Home } from './hooks'

export async function fetchHomes(): Promise<Home[]> {
  const { data } = await api.get('/viviendas')
  return data
}

export async function createHome(home: Omit<Home, 'id'>): Promise<Home> {
  const { data } = await api.post('/viviendas/crear/', home)
  return data
}

export async function updateHome(id: number, home: Partial<Home>): Promise<Home> {
  const { data } = await api.put(`/viviendas/${id}/modificar/`, home)
  return data
}

export async function deleteHome(id: number): Promise<void> {
  await api.delete(`/viviendas/${id}/eliminar/`)
}

export async function getHome(id: number): Promise<Home> {
  const { data } = await api.get(`/viviendas/${id}/`)
  return data
}


