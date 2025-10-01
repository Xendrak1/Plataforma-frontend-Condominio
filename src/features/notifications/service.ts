import { api } from '../../services/api'

export type Notification = {
  id: number
  titulo: string
  mensaje: string
  tipo: string
  prioridad: 'BAJA' | 'MEDIA' | 'ALTA'
  leida: boolean
  fecha_creacion: string
  fecha_lectura?: string
}

export type Alert = {
  tipo: string
  titulo: string
  mensaje: string
  prioridad: 'BAJA' | 'MEDIA' | 'ALTA'
  cantidad?: number
  porcentaje?: number
}

export type AlertsResponse = {
  alertas: Alert[]
  total_alertas: number
  fecha_generacion: string
}

export async function fetchNotifications(params?: {
  tipo?: string
  leida?: boolean
  fecha_desde?: string
}): Promise<Notification[]> {
  const { data } = await api.get('/notificaciones/', { params })
  return data
}

export async function createNotification(notification: {
  titulo: string
  mensaje: string
  tipo: string
  prioridad?: 'BAJA' | 'MEDIA' | 'ALTA'
}): Promise<Notification> {
  const { data } = await api.post('/notificaciones/crear/', notification)
  return data
}

export async function markNotificationAsRead(id: number): Promise<Notification> {
  const { data } = await api.post(`/notificaciones/${id}/marcar-leida/`)
  return data
}

export async function fetchAlerts(): Promise<AlertsResponse> {
  const { data } = await api.get('/notificaciones/alertas/')
  return data
}
