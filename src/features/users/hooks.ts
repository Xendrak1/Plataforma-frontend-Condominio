import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usuariosService } from './service'
import type { User, CreateUserData } from '../../types/auth'

/**
 * Hook para obtener lista de usuarios
 */
export function useUsuarios() {
  return useQuery({
    queryKey: ['usuarios'],
    queryFn: () => usuariosService.getAll(),
  })
}

/**
 * Hook para obtener un usuario por ID
 */
export function useUsuario(id: number) {
  return useQuery({
    queryKey: ['usuarios', id],
    queryFn: () => usuariosService.getById(id),
    enabled: !!id,
  })
}

/**
 * Hook para crear usuario
 */
export function useCreateUsuario() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUserData) => usuariosService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })
}

/**
 * Hook para actualizar usuario
 */
export function useUpdateUsuario() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
      usuariosService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })
}

/**
 * Hook para eliminar usuario
 */
export function useDeleteUsuario() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => usuariosService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })
}

/**
 * Hook para cambiar rol de usuario
 */
export function useCambiarRol() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, rol }: { id: number; rol: string }) =>
      usuariosService.cambiarRol(id, rol),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })
}

/**
 * Hook para activar/desactivar usuario
 */
export function useToggleActivo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, activo }: { id: number; activo: boolean }) =>
      usuariosService.toggleActivo(id, activo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })
}
