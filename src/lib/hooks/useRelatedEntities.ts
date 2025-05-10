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

type EntityTypeMap = {
  vehicles: Vehicles
  species: Species
  locations: Location
  people: People
  films: Film
}

const relatedEntityMap: {
  [K in keyof EntityTypeMap]: {
    service: { getById: (id: string) => Promise<EntityTypeMap[K]> }
  }
} = {
  vehicles: { service: vehiclesService },
  species: { service: speciesService },
  locations: { service: locationsService },
  people: { service: peoplesService },
  films: { service: filmsService },
}

type RelatedKeys<T> = {
  [K in keyof T]: T[K] extends string[]
    ? K extends keyof EntityTypeMap
      ? K
      : never
    : never
}[keyof T]

export function useRelatedEntities<T extends Record<string, any>>(
  entity: T | undefined,
): {
  [K in RelatedKeys<T>]: {
    data: EntityTypeMap[K][]
    isLoading: boolean
    isError: boolean
  }
} {
  const indexMap: {
    key: keyof EntityTypeMap
    count: number
    startIndex: number
  }[] = []

  const queries: UseQueryOptions[] = []
  let index = 0

  for (const key of Object.keys(relatedEntityMap) as (keyof EntityTypeMap)[]) {
    const urls = entity?.[key]
    if (!Array.isArray(urls) || urls.length === 0) continue

    const ids = urls.map((url) => url.split('/').pop()!).filter(Boolean)

    indexMap.push({
      key,
      count: ids.length,
      startIndex: index,
    })

    const options = ids.map((id) => ({
      queryKey: [key, id],
      queryFn: () => relatedEntityMap[key].service.getById(id),
      enabled: !!id,
    }))

    queries.push(...options)
    index += ids.length
  }

  const results = useQueries({ queries })

  const groupedResults = {} as {
    [K in RelatedKeys<T>]: {
      data: EntityTypeMap[K][]
      isLoading: boolean
      isError: boolean
    }
  }

  for (const { key, count, startIndex } of indexMap) {
    const group = results.slice(startIndex, startIndex + count)

    groupedResults[key as RelatedKeys<T>] = {
      data: group
        .map((q) => q.data)
        .filter(Boolean) as EntityTypeMap[typeof key][],
      isLoading: group.some((q) => q.isLoading),
      isError: group.some((q) => q.isError),
    }
  }

  return groupedResults
}
