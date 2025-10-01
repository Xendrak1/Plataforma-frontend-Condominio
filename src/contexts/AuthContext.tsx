import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { authService } from '../services/auth'
import type { User, LoginCredentials } from '../types/auth'

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Cargar usuario al iniciar la aplicación
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Primero intentar obtener del localStorage
        const storedUser = authService.getUserFromStorage()
        
        if (storedUser && authService.isAuthenticated()) {
          setUser(storedUser)
          
          // Luego verificar con el servidor en segundo plano
          try {
            const currentUser = await authService.getCurrentUser()
            setUser(currentUser)
          } catch (error) {
            // Si falla, el interceptor redirigirá al login
            console.error('Error al verificar usuario:', error)
          }
        }
      } catch (error) {
        console.error('Error al inicializar autenticación:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    setLoading(true)
    try {
      const user = await authService.login(credentials)
      setUser(user)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await authService.logout()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.error('Error al refrescar usuario:', error)
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}
