import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchPayments, createPayment, updatePayment, deletePayment, type Payment } from './service'

export type { Payment }

export function usePayments() {
  return useQuery({
    queryKey: ['payments'],
    queryFn: fetchPayments,
  })
}

export function useCreatePayment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] })
    },
  })
}

export function useUpdatePayment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Payment>) => 
      updatePayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] })
    },
  })
}

export function useDeletePayment() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deletePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] })
    },
  })
}