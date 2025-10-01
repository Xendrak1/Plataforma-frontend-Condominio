import { api } from '../../services/api'
import type { User, CreateUserData } from '../../types/auth'

/**
 * Servicio para gestión de usuarios (CRUD)
 */
export const usuariosService = {
  /**
   * Obtener lista de todos los usuarios
   */
  async getAll(): Promise<User[]> {
    const { data } = await api.get('/usuarios/')
    return data
  },

  /**
   * Obtener un usuario por ID
   */
  async getById(id: number): Promise<User> {
    const { data } = await api.get(`/usuarios/${id}/`)
    return data
  },

  /**
   * Crear un nuevo usuario
   */
  async create(userData: CreateUserData): Promise<User> {
    const { data } = await api.post('/usuarios/', userData)
    return data
  },

  /**
   * Actualizar un usuario
   */
  async update(id: number, userData: Partial<User>): Promise<User> {
    const { data } = await api.put(`/usuarios/${id}/`, userData)
    return data
  },

  /**
   * Eliminar un usuario
   */
  async delete(id: number): Promise<void> {
    await api.delete(`/usuarios/${id}/`)
  },

  /**
   * Cambiar rol de un usuario
   */
  async cambiarRol(id: number, rol: string): Promise<User> {
    const { data } = await api.put(`/usuarios/${id}/cambiar-rol/`, { rol })
    return data
  },

  /**
   * Activar/Desactivar usuario
   */
  async toggleActivo(id: number, activo: boolean): Promise<User> {
    const { data } = await api.patch(`/usuarios/${id}/`, { activo })
    return data
  },
}
