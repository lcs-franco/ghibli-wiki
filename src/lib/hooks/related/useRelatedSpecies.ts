import { speciesService } from '@lib/services/species'
import type { RelatedEntityResult, Species } from '@lib/types'
import { useRelatedEntityBase } from './useRelatedEntityBase'

export function useRelatedSpecies(
  entity: unknown,
): RelatedEntityResult<Species> {
  return useRelatedEntityBase(entity, 'species', speciesService)
}
