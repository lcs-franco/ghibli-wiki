import { locationsService } from '@lib/services/locations'
import { useQuery } from '@tanstack/react-query'

export function useLocationById(id: string) {
  return useQuery({
    queryKey: ['location', id],
    queryFn: () => locationsService.getById(id),
    staleTime: Infinity,
    enabled: !!id,
  })
}
