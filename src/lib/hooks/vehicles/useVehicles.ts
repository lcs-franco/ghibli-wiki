import { vehiclesService } from '@lib/services/vehicles'
import { useQuery } from '@tanstack/react-query'

export function useVehicle() {
  return useQuery({
    queryKey: ['vehicle'],
    queryFn: vehiclesService.getAll,
    staleTime: Infinity,
  })
}
