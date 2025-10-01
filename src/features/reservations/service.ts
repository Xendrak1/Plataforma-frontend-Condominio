import { api } from '../../services/api'

export interface Reservation {
  id: number
  codigo: string
  area_id: number
  area_nombre: string
  vivienda_id: number
  codigo_vivienda: string
  persona_id: number
  persona_nombre: string
  fecha?: string
  hora_inicio: string
  hora_fin: string
  estado?: string
}

export async function fetchReservations(): Promise<Reservation[]> {
  const { data } = await api.get('/reservas')
  return data
}

export async function createReservation(reservation: Omit<Reservation, 'id'>): Promise<Reservation> {
  const { data } = await api.post('/reservas/crear/', reservation)
  return data
}

export async function updateReservation(id: number, reservation: Partial<Reservation>): Promise<Reservation> {
  const { data } = await api.put(`/reservas/${id}/modificar/`, reservation)
  return data
}

export async function deleteReservation(id: number): Promise<void> {
  await api.delete(`/reservas/${id}/eliminar/`)
}

export async function getReservation(id: number): Promise<Reservation> {
  const { data } = await api.get(`/reservas/${id}/`)
  return data
}
