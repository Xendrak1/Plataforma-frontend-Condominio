import { api } from '../../services/api'

export interface Visitor {
  id: number
  nombres: string
  apellidos?: string
  num_doc?: string
  foto_url?: string
}

export async function fetchVisitors(): Promise<Visitor[]> {
  const { data } = await api.get('/visitantes')
  return data
}

export async function createVisitor(visitor: Omit<Visitor, 'id'>): Promise<Visitor> {
  const { data } = await api.post('/visitantes/crear/', visitor)
  return data
}

export async function updateVisitor(id: number, visitor: Partial<Visitor>): Promise<Visitor> {
  const { data } = await api.put(`/visitantes/${id}/modificar/`, visitor)
  return data
}

export async function deleteVisitor(id: number): Promise<void> {
  await api.delete(`/visitantes/${id}/eliminar/`)
}

export async function getVisitor(id: number): Promise<Visitor> {
  const { data } = await api.get(`/visitantes/${id}/`)
  return data
}
