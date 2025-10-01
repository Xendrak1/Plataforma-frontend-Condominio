import { api } from '../../services/api'

export interface Expense {
  id: number
  codigo: string
  vivienda_id: number
  codigo_vivienda: string
  periodo: string
  monto: number
  vencimiento?: string
  estado?: string
}

export async function fetchExpenses(): Promise<Expense[]> {
  const { data } = await api.get('/expensas')
  return data
}

export async function createExpense(expense: Omit<Expense, 'id'>): Promise<Expense> {
  const { data } = await api.post('/expensas/crear/', expense)
  return data
}

export async function updateExpense(id: number, expense: Partial<Expense>): Promise<Expense> {
  const { data } = await api.put(`/expensas/${id}/modificar/`, expense)
  return data
}

export async function deleteExpense(id: number): Promise<void> {
  await api.delete(`/expensas/${id}/eliminar/`)
}

export async function getExpense(id: number): Promise<Expense> {
  const { data } = await api.get(`/expensas/${id}/`)
  return data
}
