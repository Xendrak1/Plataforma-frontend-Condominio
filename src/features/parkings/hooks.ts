import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchParkings, createParking, updateParking, deleteParking, type Parking } from './service'

export type { Parking }

export function useParkings() {
  return useQuery({
    queryKey: ['parkings'],
    queryFn: fetchParkings,
  })
}

export function useCreateParking() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createParking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parkings'] })
    },
  })
}

export function useUpdateParking() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Parking>) => 
      updateParking(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parkings'] })
    },
  })
}

export function useDeleteParking() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteParking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parkings'] })
    },
  })
}