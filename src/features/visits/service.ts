import { api } from '../../services/api'

export type Visitor = {
  id: number
  nombres: string
  apellidos?: string
  num_doc?: string
  foto_url?: string
  ultima_visita?: string
  estado_visita: string
}

export type Visit = {
  id: number
  visitante_id: number
  visitante_nombre: string
  vivienda_destino_id: number
  codigo_vivienda: string
  entrada: string
  salida?: string
  medio?: string
  estado: string
}

export async function fetchVisitors(): Promise<Visitor[]> {
  const { data } = await api.get('/visitantes')
  return data
}

export async function createVisitor(visitor: Omit<Visitor, 'id' | 'ultima_visita' | 'estado_visita'>): Promise<Visitor> {
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

// Servicios para visitas
export async function fetchVisits(): Promise<Visit[]> {
  const { data } = await api.get('/visitas')
  return data
}

export async function registerEntry(visitData: {
  visitante_id: number
  vivienda_destino_id: number
  medio?: string
}): Promise<Visit> {
  const { data } = await api.post('/visitas/registrar-entrada/', visitData)
  return data
}

export async function registerExit(visitId: number): Promise<Visit> {
  const { data } = await api.post(`/visitas/${visitId}/registrar-salida/`)
  return data
}
