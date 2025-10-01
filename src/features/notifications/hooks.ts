import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  fetchNotifications, 
  createNotification, 
  markNotificationAsRead,
  fetchAlerts,
  type Notification,
  type AlertsResponse
} from './service'

export function useNotifications(params?: {
  tipo?: string
  leida?: boolean
  fecha_desde?: string
}) {
  return useQuery<Notification[], Error>({
    queryKey: ['notifications', params],
    queryFn: () => fetchNotifications(params),
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}

export function useUnreadNotifications() {
  return useQuery<Notification[], Error>({
    queryKey: ['notifications', 'unread'],
    queryFn: () => fetchNotifications({ leida: false }),
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}

export function useCreateNotification() {
  const queryClient = useQueryClient()

  return useMutation<Notification, Error, {
    titulo: string
    mensaje: string
    tipo: string
    prioridad?: 'BAJA' | 'MEDIA' | 'ALTA'
  }>({
    mutationFn: createNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient()

  return useMutation<Notification, Error, number>({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
  })
}

export function useAlerts() {
  return useQuery<AlertsResponse, Error>({
    queryKey: ['alerts'],
    queryFn: fetchAlerts,
    refetchInterval: 60000, // Refetch every minute
  })
}
