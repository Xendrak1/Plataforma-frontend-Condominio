import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchAreas, createArea, updateArea, deleteArea, type Area } from './service'

export type { Area }

export function useAreas() {
  return useQuery({
    queryKey: ['areas'],
    queryFn: fetchAreas,
  })
}

export function useCreateArea() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createArea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['areas'] })
    },
  })
}

export function useUpdateArea() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Area>) => 
      updateArea(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['areas'] })
    },
  })
}

export function useDeleteArea() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteArea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['areas'] })
    },
  })
}