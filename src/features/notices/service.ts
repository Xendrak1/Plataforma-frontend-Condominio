import { api } from '../../services/api'

export interface Notice {
  id: number
  titulo: string
  cuerpo?: string
  fecha_publicacion?: string
  publico?: string
}

export async function fetchNotices(): Promise<Notice[]> {
  const { data } = await api.get('/comunicados')
  return data
}

export async function createNotice(notice: Omit<Notice, 'id'>): Promise<Notice> {
  const { data } = await api.post('/comunicados/crear/', notice)
  return data
}

export async function updateNotice(id: number, notice: Partial<Notice>): Promise<Notice> {
  const { data } = await api.put(`/comunicados/${id}/modificar/`, notice)
  return data
}

export async function deleteNotice(id: number): Promise<void> {
  await api.delete(`/comunicados/${id}/eliminar/`)
}

export async function getNotice(id: number): Promise<Notice> {
  const { data } = await api.get(`/comunicados/${id}/`)
  return data
}
