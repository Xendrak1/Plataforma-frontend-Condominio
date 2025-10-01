import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  fetchVisitors, 
  createVisitor, 
  updateVisitor, 
  deleteVisitor,
  getVisitor,
  fetchVisits,
  registerEntry,
  registerExit,
  type Visitor,
  type Visit
} from './service'

// Hooks para visitantes
export function useVisitors() {
  return useQuery({
    queryKey: ['visitors'],
    queryFn: fetchVisitors,
  })
}

export function useVisitor(id: number) {
  return useQuery({
    queryKey: ['visitor', id],
    queryFn: () => getVisitor(id),
    enabled: !!id,
  })
}

export function useCreateVisitor() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createVisitor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitors'] })
      queryClient.invalidateQueries({ queryKey: ['visits'] })
    },
  })
}

export function useUpdateVisitor() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...visitor }: { id: number } & Partial<Visitor>) => 
      updateVisitor(id, visitor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitors'] })
    },
  })
}

export function useDeleteVisitor() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteVisitor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitors'] })
      queryClient.invalidateQueries({ queryKey: ['visits'] })
    },
  })
}

// Hooks para visitas
export function useVisits() {
  return useQuery({
    queryKey: ['visits'],
    queryFn: fetchVisits,
  })
}

export function useRegisterEntry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: registerEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] })
      queryClient.invalidateQueries({ queryKey: ['visitors'] })
    },
  })
}

export function useRegisterExit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: registerExit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visits'] })
      queryClient.invalidateQueries({ queryKey: ['visitors'] })
    },
  })
}
