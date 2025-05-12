import { filmsService } from '@lib/services/films'
import { useQuery } from '@tanstack/react-query'

export function useFilmsById(id: string) {
  return useQuery({
    queryKey: ['films', id],
    queryFn: () => filmsService.getById(id),
    staleTime: Infinity,
    enabled: !!id,
  })
}
