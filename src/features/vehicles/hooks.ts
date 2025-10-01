import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  fetchVehicles, 
  createVehicle, 
  updateVehicle, 
  deleteVehicle,
  fetchVehicleTypes,
  createVehicleType,
  updateVehicleType,
  deleteVehicleType,
  type Vehicle,
  type VehicleType
} from './service'

// Hooks para vehículos
export function useVehicles() {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
  })
}

export function useCreateVehicle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    },
  })
}

export function useUpdateVehicle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...vehicle }: { id: number } & Partial<Vehicle>) => 
      updateVehicle(id, vehicle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    },
  })
}

export function useDeleteVehicle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
    },
  })
}

// Hooks para tipos de vehículo
export function useVehicleTypes() {
  return useQuery({
    queryKey: ['vehicleTypes'],
    queryFn: fetchVehicleTypes,
  })
}

export function useCreateVehicleType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createVehicleType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicleTypes'] })
    },
  })
}

export function useUpdateVehicleType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...vehicleType }: { id: number } & Partial<VehicleType>) => 
      updateVehicleType(id, vehicleType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicleTypes'] })
    },
  })
}

export function useDeleteVehicleType() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteVehicleType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicleTypes'] })
    },
  })
}
