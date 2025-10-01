import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchReservations, createReservation, updateReservation, deleteReservation, type Reservation } from './service'

export type { Reservation }

export function useReservations() {
  return useQuery({
    queryKey: ['reservations'],
    queryFn: fetchReservations,
  })
}

export function useCreateReservation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
    },
  })
}

export function useUpdateReservation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Reservation>) => 
      updateReservation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
    },
  })
}

export function useDeleteReservation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] })
    },
  })
}