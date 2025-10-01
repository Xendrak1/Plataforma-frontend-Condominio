import { api } from '../../services/api'

export interface Fine {
  id: number
  codigo: string
  vivienda_id: number
  codigo_vivienda: string
  persona_id: number
  persona_nombre: string
  tipo_infraccion_id: number
  tipo_infraccion_descripcion: string
  fecha?: string
  monto?: number
  estado?: string
}

export async function fetchFines(): Promise<Fine[]> {
  const { data } = await api.get('/multas')
  return data
}

export async function createFine(fine: Omit<Fine, 'id'>): Promise<Fine> {
  const { data } = await api.post('/multas/crear/', fine)
  return data
}

export async function updateFine(id: number, fine: Partial<Fine>): Promise<Fine> {
  const { data } = await api.put(`/multas/${id}/modificar/`, fine)
  return data
}

export async function deleteFine(id: number): Promise<void> {
  await api.delete(`/multas/${id}/eliminar/`)
}

export async function getFine(id: number): Promise<Fine> {
  const { data } = await api.get(`/multas/${id}/`)
  return data
}
