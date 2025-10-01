import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchFines, createFine, updateFine, deleteFine, type Fine } from './service'

export type { Fine }

export function useFines() {
  return useQuery({
    queryKey: ['fines'],
    queryFn: fetchFines,
  })
}

export function useCreateFine() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createFine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fines'] })
    },
  })
}

export function useUpdateFine() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Fine>) => 
      updateFine(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fines'] })
    },
  })
}

export function useDeleteFine() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteFine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fines'] })
    },
  })
}