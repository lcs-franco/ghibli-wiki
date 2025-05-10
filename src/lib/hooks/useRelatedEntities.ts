import { useQueries, UseQueryOptions } from '@tanstack/react-query'

import { filmsService } from '@lib/services/films'
import { locationsService } from '@lib/services/locations'
import { peoplesService } from '@lib/services/peoples'
import { speciesService } from '@lib/services/species'
import { vehiclesService } from '@lib/services/vehicles'

import { Film } from '@types/Film'
import { People } from '@types/People'
import { Species } from '@types/Species'
import { Vehicles } from '@types/Vehicles'

type RelatedEntityTypes = {
  vehicles: Vehicles
  species: Species
  locations: Location
  people: People
  films: Film
}

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
 * - are string arrays (ex: URLs)
 * - are also present in the map of related entities
 */
type ExtractRelatedKeys<OriginalEntity> = {
  [Key in keyof OriginalEntity]: OriginalEntity[Key] extends string[]
    ? Key extends keyof RelatedEntityTypes
      ? Key
      : never
    : never
}[keyof OriginalEntity]

export function useRelatedEntities<OriginalEntity extends Record<string, any>>(
  entity: OriginalEntity | undefined,
): {
  [Key in ExtractRelatedKeys<OriginalEntity>]: {
    data: RelatedEntityTypes[Key][]
    isLoading: boolean
    isError: boolean
  }
} {
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
    const urls = entity?.[entityKey]
    if (!Array.isArray(urls) || urls.length === 0) continue

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

  const groupedResults = {} as {
    [Key in ExtractRelatedKeys<OriginalEntity>]: {
      data: RelatedEntityTypes[Key][]
      isLoading: boolean
      isError: boolean
    }
  }

  for (const { key, count, startIndex } of indexTrackingMap) {
    const group = queryResults.slice(startIndex, startIndex + count)

    groupedResults[key as ExtractRelatedKeys<OriginalEntity>] = {
      data: group
        .map((q) => q.data)
        .filter(Boolean) as RelatedEntityTypes[typeof key][],
      isLoading: group.some((q) => q.isLoading),
      isError: group.some((q) => q.isError),
    }
  }

  return groupedResults
}
