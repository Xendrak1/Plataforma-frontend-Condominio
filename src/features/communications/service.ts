import { api } from '../../services/api'

export type Communication = {
  id: number
  titulo: string
  cuerpo?: string
  fecha_publicacion?: string
  publico: string
  total_lecturas: number
  lecturas?: {
    persona_id: number
    persona_nombre: string
    leido_en?: string
  }[]
}

export async function fetchCommunications(): Promise<Communication[]> {
  const { data } = await api.get('/comunicados')
  return data
}

export async function createCommunication(communication: Omit<Communication, 'id' | 'total_lecturas' | 'lecturas'>): Promise<Communication> {
  const { data } = await api.post('/comunicados/crear/', communication)
  return data
}

export async function updateCommunication(id: number, communication: Partial<Communication>): Promise<Communication> {
  const { data } = await api.put(`/comunicados/${id}/modificar/`, communication)
  return data
}

export async function deleteCommunication(id: number): Promise<void> {
  await api.delete(`/comunicados/${id}/eliminar/`)
}

export async function getCommunication(id: number): Promise<Communication> {
  const { data } = await api.get(`/comunicados/${id}/`)
  return data
}

export async function markCommunicationAsRead(id: number, personaId: number): Promise<{ message: string; leido_en: string }> {
  const { data } = await api.post(`/comunicados/${id}/marcar-leido/`, { persona_id: personaId })
  return data
}
