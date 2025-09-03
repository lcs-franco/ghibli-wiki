import { peoplesService } from '@lib/services/peoples'
import type { People, RelatedEntityResult } from '@lib/types'
import { useRelatedEntityBase } from './useRelatedEntityBase'

export function useRelatedPeople(
  entity: unknown,
  fieldName: 'people' | 'residents' = 'people',
): RelatedEntityResult<People> {
  return useRelatedEntityBase(entity, fieldName, peoplesService)
}
