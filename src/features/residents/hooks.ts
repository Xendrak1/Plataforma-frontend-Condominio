import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchResidents, createResident, updateResident, deleteResident } from './service'

export type Resident = {
  id: number
  persona_id: number
  nombres: string
  apellidos: string
  email?: string
  telefono?: string
  vivienda_id: number
  codigo_vivienda: string
  es_propietario: boolean
  estado: boolean
}

export function useResidents() {
  return useQuery({
    queryKey: ['residents'],
    queryFn: fetchResidents,
  })
}

export function useCreateResident() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createResident,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['residents'] })
    },
  })
}

export function useUpdateResident() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Resident>) => 
      updateResident(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['residents'] })
    },
  })
}

export function useDeleteResident() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteResident,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['residents'] })
    },
  })
}


