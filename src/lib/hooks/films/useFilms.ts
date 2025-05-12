import { filmsService } from '@lib/services/films'
import { useQuery } from '@tanstack/react-query'

export function useFilms() {
  return useQuery({
    queryKey: ['films'],
    queryFn: filmsService.getAll,
    staleTime: Infinity,
  })
}
