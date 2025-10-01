import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  fetchParkingAssignments, 
  createParkingAssignment, 
  updateParkingAssignment, 
  deleteParkingAssignment,
  getParkingAssignment,
  fetchAvailableParkings,
  type ParkingAssignment,
  type AvailableParking
} from './service'

export function useParkingAssignments() {
  return useQuery({
    queryKey: ['parking-assignments'],
    queryFn: fetchParkingAssignments,
  })
}

export function useParkingAssignment(id: number) {
  return useQuery({
    queryKey: ['parking-assignment', id],
    queryFn: () => getParkingAssignment(id),
    enabled: !!id,
  })
}

export function useCreateParkingAssignment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createParkingAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parking-assignments'] })
      queryClient.invalidateQueries({ queryKey: ['available-parkings'] })
      queryClient.invalidateQueries({ queryKey: ['parkings'] })
    },
  })
}

export function useUpdateParkingAssignment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...assignment }: { id: number } & Partial<ParkingAssignment>) => 
      updateParkingAssignment(id, assignment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parking-assignments'] })
      queryClient.invalidateQueries({ queryKey: ['available-parkings'] })
      queryClient.invalidateQueries({ queryKey: ['parkings'] })
    },
  })
}

export function useDeleteParkingAssignment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteParkingAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['parking-assignments'] })
      queryClient.invalidateQueries({ queryKey: ['available-parkings'] })
      queryClient.invalidateQueries({ queryKey: ['parkings'] })
    },
  })
}

export function useAvailableParkings() {
  return useQuery({
    queryKey: ['available-parkings'],
    queryFn: fetchAvailableParkings,
  })
}
