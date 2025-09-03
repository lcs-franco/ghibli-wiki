import { vehiclesService } from '@lib/services/vehicles'
import type { RelatedEntityResult, Vehicles } from '@lib/types'
import { useRelatedEntityBase } from './useRelatedEntityBase'

export function useRelatedVehicles(
  entity: unknown,
): RelatedEntityResult<Vehicles> {
  return useRelatedEntityBase(entity, 'vehicles', vehiclesService)
}
