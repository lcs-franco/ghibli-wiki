import { vehiclesService } from '@lib/services/vehicles'
import { useQuery } from '@tanstack/react-query'

export function useVehicle() {
  return useQuery({
    queryKey: ['vehicle'],
    queryFn: vehiclesService.getAll,
    staleTime: Infinity,
  })
}

export function useVehicleById(id: string) {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => vehiclesService.getById(id),
    staleTime: Infinity,
    enabled: !!id,
  })
}
