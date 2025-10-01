import { useState } from 'react'
import { useUsuarios, useCreateUsuario, useUpdateUsuario, useDeleteUsuario, useToggleActivo } from '../../features/users/hooks'
import type { User, CreateUserData, UserRole } from '../../types/auth'
import { Loader } from '../components/Loader'
import { EmptyState } from '../components/EmptyState'
import { CreateUserModal } from '../components/CreateUserModal'
import { Table } from '../components/Table'

const ROLE_COLORS: Record<UserRole, string> = {
  SUPER_ADMIN: '#9333ea',
  ADMIN: '#dc2626',
  CONTADOR: '#06b6d4',
  GUARDIA: '#eab308',
  RESIDENTE: '#16a34a',
}

const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  CONTADOR: 'Contador',
  GUARDIA: 'Guardia',
  RESIDENTE: 'Residente',
}

export function UsersPage() {
  const { data: usuarios, isLoading } = useUsuarios()
  const createMutation = useCreateUsuario()
  const updateMutation = useUpdateUsuario()
  const deleteMutation = useDeleteUsuario()
  const toggleActivoMutation = useToggleActivo()

  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null)

  const handleCreate = async (data: CreateUserData) => {
    try {
      await createMutation.mutateAsync(data)
      setShowModal(false)
    } catch (error) {
      console.error('Error al crear usuario:', error)
      alert('Error al crear usuario')
    }
  }

  const handleUpdate = async (data: Partial<User>) => {
    if (!editingUser) return
    try {
      await updateMutation.mutateAsync({ id: editingUser.id, data })
      setEditingUser(null)
      setShowModal(false)
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
      alert('Error al actualizar usuario')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return
    setDeletingUserId(id)
    try {
      await deleteMutation.mutateAsync(id)
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
      alert('Error al eliminar usuario')
    } finally {
      setDeletingUserId(null)
    }
  }

  const handleToggleActivo = async (id: number, activo: boolean) => {
    try {
      await toggleActivoMutation.mutateAsync({ id, activo: !activo })
    } catch (error) {
      console.error('Error al cambiar estado:', error)
      alert('Error al cambiar estado del usuario')
    }
  }

  const openCreateModal = () => {
    setEditingUser(null)
    setShowModal(true)
  }

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setShowModal(true)
  }

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Loader />
      </div>
    )
  }

  if (!usuarios || usuarios.length === 0) {
    return (
      <>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', margin: 0 }}>
            Usuarios del Sistema
          </h1>
          <button
            onClick={openCreateModal}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            + Crear Usuario
          </button>
        </div>

        <EmptyState
          title="No hay usuarios registrados"
          description="Comienza creando el primer usuario del sistema"
        />

        {showModal && (
          <CreateUserModal
            user={editingUser}
            onClose={() => {
              setShowModal(false)
              setEditingUser(null)
            }}
            onSubmit={editingUser ? handleUpdate : handleCreate}
            isLoading={createMutation.isPending || updateMutation.isPending}
          />
        )}
      </>
    )
  }

  const columns = [
    {
      header: 'Usuario',
      accessor: (user: User) => (
        <div style={{ fontWeight: '600', color: '#111827' }}>
          {user.username}
        </div>
      ),
    },
    {
      header: 'Nombre Completo',
      accessor: (user: User) => (
        <div style={{ color: '#374151' }}>
          {user.nombre_completo}
        </div>
      ),
    },
    {
      header: 'Email',
      accessor: (user: User) => (
        <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          {user.email}
        </div>
      ),
    },
    {
      header: 'Rol',
      accessor: (user: User) => (
        <span style={{
          padding: '0.375rem 0.75rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: '600',
          backgroundColor: `${ROLE_COLORS[user.rol]}20`,
          color: ROLE_COLORS[user.rol],
        }}>
          {ROLE_LABELS[user.rol]}
        </span>
      ),
    },
    {
      header: 'Teléfono',
      accessor: (user: User) => (
        <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
          {user.telefono || '-'}
        </div>
      ),
    },
    {
      header: 'Estado',
      accessor: (user: User) => (
        <button
          onClick={() => handleToggleActivo(user.id, user.activo)}
          disabled={toggleActivoMutation.isPending}
          style={{
            padding: '0.375rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: user.activo ? '#dcfce7' : '#fee2e2',
            color: user.activo ? '#16a34a' : '#dc2626',
          }}
        >
          {user.activo ? 'Activo' : 'Inactivo'}
        </button>
      ),
    },
    {
      header: 'Acciones',
      accessor: (user: User) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => openEditModal(user)}
            style={{
              padding: '0.5rem 0.75rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              cursor: 'pointer',
              fontWeight: '500',
            }}
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(user.id)}
            disabled={deletingUserId === user.id}
            style={{
              padding: '0.5rem 0.75rem',
              background: deletingUserId === user.id ? '#9ca3af' : '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              cursor: deletingUserId === user.id ? 'not-allowed' : 'pointer',
              fontWeight: '500',
            }}
          >
            {deletingUserId === user.id ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      ),
    },
  ]

  return (
    <>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827', margin: 0 }}>
            Usuarios del Sistema
          </h1>
          <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>
            Gestiona los usuarios y sus permisos
          </p>
        </div>
        <button
          onClick={openCreateModal}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          + Crear Usuario
        </button>
      </div>

      <Table data={usuarios} columns={columns} />

      {showModal && (
        <CreateUserModal
          user={editingUser}
          onClose={() => {
            setShowModal(false)
            setEditingUser(null)
          }}
          onSubmit={editingUser ? handleUpdate : handleCreate}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      )}
    </>
  )
}
