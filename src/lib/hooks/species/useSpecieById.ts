import { speciesService } from '@lib/services/species'
import { useQuery } from '@tanstack/react-query'

export function useSpecieById(id: string) {
  return useQuery({
    queryKey: ['species', id],
    queryFn: () => speciesService.getById(id),
    staleTime: Infinity,
    enabled: !!id,
  })
}
