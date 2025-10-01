import { api } from '../../services/api'

export type Pet = {
  id: number
  nombre: string
  tipo: string
  raza?: string
  edad?: number
  propietario_id: number
  propietario_nombre: string
  vivienda_id: number
  codigo_vivienda: string
}

export async function fetchPets(): Promise<Pet[]> {
  const { data } = await api.get('/mascotas')
  return data
}

export async function createPet(pet: Omit<Pet, 'id' | 'propietario_nombre' | 'codigo_vivienda'>): Promise<Pet> {
  const { data } = await api.post('/mascotas/crear/', pet)
  return data
}

export async function updatePet(id: number, pet: Partial<Pet>): Promise<Pet> {
  const { data } = await api.put(`/mascotas/${id}/modificar/`, pet)
  return data
}

export async function deletePet(id: number): Promise<void> {
  await api.delete(`/mascotas/${id}/eliminar/`)
}

export async function getPet(id: number): Promise<Pet> {
  const { data } = await api.get(`/mascotas/${id}/`)
  return data
}
