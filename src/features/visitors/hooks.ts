import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchVisitors, createVisitor, updateVisitor, deleteVisitor, type Visitor } from './service'

export type { Visitor }

export function useVisitors() {
  return useQuery({
    queryKey: ['visitors'],
    queryFn: fetchVisitors,
  })
}

export function useCreateVisitor() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createVisitor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitors'] })
    },
  })
}

export function useUpdateVisitor() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Visitor>) => 
      updateVisitor(id, data),
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
    },
  })
}