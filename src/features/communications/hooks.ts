import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  fetchCommunications, 
  createCommunication, 
  updateCommunication, 
  deleteCommunication,
  getCommunication,
  markCommunicationAsRead,
  type Communication
} from './service'

export function useCommunications() {
  return useQuery({
    queryKey: ['communications'],
    queryFn: fetchCommunications,
  })
}

export function useCommunication(id: number) {
  return useQuery({
    queryKey: ['communication', id],
    queryFn: () => getCommunication(id),
    enabled: !!id,
  })
}

export function useCreateCommunication() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCommunication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communications'] })
    },
  })
}

export function useUpdateCommunication() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...communication }: { id: number } & Partial<Communication>) => 
      updateCommunication(id, communication),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communications'] })
    },
  })
}

export function useDeleteCommunication() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCommunication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communications'] })
    },
  })
}

export function useMarkCommunicationAsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, personaId }: { id: number; personaId: number }) => 
      markCommunicationAsRead(id, personaId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communications'] })
    },
  })
}
