import { peoplesService } from '@lib/services/peoples'
import { useQuery } from '@tanstack/react-query'

export function usePeople() {
  return useQuery({
    queryKey: ['people'],
    queryFn: peoplesService.getAll,
    staleTime: Infinity,
  })
}
