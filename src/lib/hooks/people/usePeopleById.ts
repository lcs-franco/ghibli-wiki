import { peoplesService } from '@lib/services/peoples'
import { useQuery } from '@tanstack/react-query'

export function usePeopleById(id: string) {
  return useQuery({
    queryKey: ['people', id],
    queryFn: () => peoplesService.getById(id),
    staleTime: Infinity,
    enabled: !!id,
  })
}
