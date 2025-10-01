import { api } from './api'
import type { LoginCredentials, LoginResponse, User, ChangePasswordData } from '../types/auth'

/**
 * Servicio de autenticación con JWT
 */
export const authService = {
  /**
   * Iniciar sesión
   */
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await api.post<LoginResponse>('/auth/login/', credentials)
    const { access, refresh, user } = response.data

    // Guardar tokens y usuario en localStorage
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
    localStorage.setItem('user', JSON.stringify(user))

    return user
  },

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    try {
      const refresh = localStorage.getItem('refresh_token')
      if (refresh) {
        await api.post('/auth/logout/', { refresh })
      }
    } catch (error) {
      console.error('Error al hacer logout:', error)
    } finally {
      // Limpiar localStorage siempre
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
    }
  },

  /**
   * Obtener usuario actual del servidor
   */
  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>('/auth/me/')
    const user = response.data
    
    // Actualizar usuario en localStorage
    localStorage.setItem('user', JSON.stringify(user))
    
    return user
  },

  /**
   * Obtener usuario del localStorage (sin llamar al servidor)
   */
  getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    
    try {
      return JSON.parse(userStr)
    } catch {
      return null
    }
  },

  /**
   * Verificar si hay un token válido
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token')
    return !!token
  },

  /**
   * Cambiar contraseña del usuario actual
   */
  async changePassword(data: ChangePasswordData): Promise<void> {
    await api.post('/auth/change-password/', data)
  },

  /**
   * Renovar token manualmente (normalmente se hace automáticamente)
   */
  async refreshToken(): Promise<string> {
    const refresh = localStorage.getItem('refresh_token')
    if (!refresh) {
      throw new Error('No refresh token available')
    }

    const response = await api.post<{ access: string }>('/auth/token/refresh/', {
      refresh,
    })

    const { access } = response.data
    localStorage.setItem('access_token', access)

    return access
  },
}
