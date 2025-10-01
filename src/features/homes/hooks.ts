import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchHomes, createHome, updateHome, deleteHome } from './service'

export type Home = {
  id: number
  codigo: string
  metros2?: number
  ubicacion?: string
  activo: boolean
  categoria_id: number
  categoria_nombre: string
  habitaciones: number
  banos: number
}

export function useHomes() {
  return useQuery({
    queryKey: ['homes'],
    queryFn: fetchHomes,
  })
}

export function useCreateHome() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createHome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homes'] })
    },
  })
}

export function useUpdateHome() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Home>) => 
      updateHome(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homes'] })
    },
  })
}

export function useDeleteHome() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteHome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['homes'] })
    },
  })
}


