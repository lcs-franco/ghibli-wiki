import { locationsService } from '@lib/services/locations'
import type { Location, RelatedEntityResult } from '@lib/types'
import { useRelatedEntityBase } from './useRelatedEntityBase'

export function useRelatedLocations(
  entity: unknown,
): RelatedEntityResult<Location> {
  return useRelatedEntityBase(entity, 'locations', locationsService)
}
