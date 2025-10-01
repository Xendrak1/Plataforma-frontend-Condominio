import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  fetchPets, 
  createPet, 
  updatePet, 
  deletePet,
  getPet,
  type Pet
} from './service'

export function usePets() {
  return useQuery({
    queryKey: ['pets'],
    queryFn: fetchPets,
  })
}

export function usePet(id: number) {
  return useQuery({
    queryKey: ['pet', id],
    queryFn: () => getPet(id),
    enabled: !!id,
  })
}

export function useCreatePet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] })
    },
  })
}

export function useUpdatePet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...pet }: { id: number } & Partial<Pet>) => 
      updatePet(id, pet),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] })
    },
  })
}

export function useDeletePet() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] })
    },
  })
}
