// Tipos relacionados con autenticación y usuarios

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'CONTADOR' | 'GUARDIA' | 'RESIDENTE'

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  nombre_completo: string
  rol: UserRole
  telefono?: string
  vivienda?: number | null
  activo: boolean
  perfil?: {
    rol: UserRole
    telefono?: string
    vivienda?: number | null
    activo: boolean
  }
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  message: string
  access: string
  refresh: string
  user: User
}

export interface ChangePasswordData {
  old_password: string
  new_password: string
  new_password2: string
}

export interface CreateUserData {
  username: string
  email: string
  password: string
  password2: string
  first_name: string
  last_name: string
  rol: UserRole
  telefono?: string
  vivienda?: number | null
}
