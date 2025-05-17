import { useQueries, UseQueryOptions } from '@tanstack/react-query'

import { filmsService } from '@lib/services/films'
import { locationsService } from '@lib/services/locations'
import { peoplesService } from '@lib/services/peoples'
import { speciesService } from '@lib/services/species'
import { vehiclesService } from '@lib/services/vehicles'

import { Film } from '@lib/types/Film'
import { Location } from '@lib/types/Location'
import { People } from '@lib/types/People'
import { Species } from '@lib/types/Species'
import { Vehicles } from '@lib/types/Vehicles'

/**
 * Expected types for each related entity
 */
type RelatedEntityTypes = {
  vehicles: Vehicles
  species: Species
  locations: Location
  people: People
  films: Film
}

/**
 * Maps the services corresponding for each entity
 */
const relatedEntityServiceMap: {
  [EntityName in keyof RelatedEntityTypes]: {
    service: {
      getById: (id: string) => Promise<RelatedEntityTypes[EntityName]>
    }
  }
} = {
  vehicles: { service: vehiclesService },
  species: { service: speciesService },
  locations: { service: locationsService },
  people: { service: peoplesService },
  films: { service: filmsService },
}

/**
 * Filter only the keys of original entity that:
 * - are string arrays (e.g. URLs)
 * - are also present in the map of related entities
 */
type ExtractRelatedKeys<OriginalEntity> = Extract<
  {
    [Key in keyof OriginalEntity]: OriginalEntity[Key] extends string | string[]
      ? Key extends keyof RelatedEntityTypes
        ? Key
        : never
      : never
  }[keyof OriginalEntity],
  keyof RelatedEntityTypes
>

/**
 * Return structure of the `useRelatedEntities` hook, with data loaded from each related entity
 */
type RelatedEntitiesResponse<OriginalEntity> = {
  [Key in ExtractRelatedKeys<OriginalEntity>]: {
    data: RelatedEntityTypes[Key][]
    isLoading: boolean
    isError: boolean
  }
}

/**
 * Hook that queries entities related to a base entity (like a film that has `people`, `species`, etc.).
 *
 * It checks which entity properties are arrays of URLs and automatically fetches the complete data using React Query.
 *
 * @param entity - The main entity (e.g. Film, People)
 * @returns A object with the data, loading and error status of each related entity
 */
export function useRelatedEntities<OriginalEntity extends Record<string, any>>(
  entity: OriginalEntity | undefined,
): RelatedEntitiesResponse<OriginalEntity> {
  const indexTrackingMap: {
    key: keyof RelatedEntityTypes
    count: number
    startIndex: number
  }[] = []

  const queryDefinitions: UseQueryOptions[] = []
  let currentStartIndex = 0

  for (const entityKey of Object.keys(
    relatedEntityServiceMap,
  ) as (keyof RelatedEntityTypes)[]) {
    const raw = entity?.[entityKey]
    const urls = Array.isArray(raw) ? raw : raw ? [raw] : []

    if (urls.length === 0) continue

    const ids = urls.map((url) => url.split('/').pop()!).filter(Boolean)

    indexTrackingMap.push({
      key: entityKey,
      count: ids.length,
      startIndex: currentStartIndex,
    })

    const options = ids.map((id) => ({
      queryKey: [entityKey, id],
      queryFn: () => relatedEntityServiceMap[entityKey].service.getById(id),
      enabled: !!id,
    }))

    queryDefinitions.push(...options)
    currentStartIndex += ids.length
  }

  const queryResults = useQueries({ queries: queryDefinitions })

  const groupedResults = {} as RelatedEntitiesResponse<OriginalEntity>

  for (const { key, count, startIndex } of indexTrackingMap) {
    const group = queryResults.slice(startIndex, startIndex + count)

    groupedResults[key as ExtractRelatedKeys<OriginalEntity>] = {
      data: group
        .map((q) => q.data)
        .filter(
          (d): d is RelatedEntityTypes[ExtractRelatedKeys<OriginalEntity>] =>
            Boolean(d),
        ),
      isLoading: group.some((q) => q.isLoading),
      isError: group.some((q) => q.isError),
    }
  }

  return groupedResults
}
