import { vehiclesService } from '@lib/services/vehicles'
import { useQuery } from '@tanstack/react-query'

export function useVehicleById(id: string) {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => vehiclesService.getById(id),
    staleTime: Infinity,
    enabled: !!id,
  })
}
