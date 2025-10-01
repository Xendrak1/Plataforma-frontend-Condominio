import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchNotices, createNotice, updateNotice, deleteNotice, type Notice } from './service'

export type { Notice }

export function useNotices() {
  return useQuery({
    queryKey: ['notices'],
    queryFn: fetchNotices,
  })
}

export function useCreateNotice() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createNotice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] })
    },
  })
}

export function useUpdateNotice() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number } & Partial<Notice>) => 
      updateNotice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] })
    },
  })
}

export function useDeleteNotice() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deleteNotice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] })
    },
  })
}