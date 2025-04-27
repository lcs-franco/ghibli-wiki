import { speciesService } from '@lib/services/species'
import { useQuery } from '@tanstack/react-query'

export function useSpecies() {
  return useQuery({
    queryKey: ['species'],
    queryFn: speciesService.getAll,
    staleTime: Infinity,
  })
}

export function useSpeciesById(id: string) {
  return useQuery({
    queryKey: ['species', id],
    queryFn: () => speciesService.getById(id),
    staleTime: Infinity,
    enabled: !!id,
  })
}
