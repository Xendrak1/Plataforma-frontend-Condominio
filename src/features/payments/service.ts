import { api } from '../../services/api'

export interface Payment {
  id: number
  vivienda_id: number
  codigo_vivienda: string
  persona_id: number
  persona_nombre: string
  concepto: string
  monto: number
  fecha?: string
  metodo: string
  estado: string
}

export async function fetchPayments(): Promise<Payment[]> {
  const { data } = await api.get('/pagos')
  return data
}

export async function createPayment(payment: Omit<Payment, 'id'>): Promise<Payment> {
  const { data } = await api.post('/pagos/crear/', payment)
  return data
}

export async function updatePayment(id: number, payment: Partial<Payment>): Promise<Payment> {
  const { data } = await api.put(`/pagos/${id}/modificar/`, payment)
  return data
}

export async function deletePayment(id: number): Promise<void> {
  await api.delete(`/pagos/${id}/eliminar/`)
}

export async function getPayment(id: number): Promise<Payment> {
  const { data } = await api.get(`/pagos/${id}/`)
  return data
}
