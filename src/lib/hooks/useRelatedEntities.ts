import { useQueries } from '@tanstack/react-query'

import { filmsService } from '@lib/services/films'
import { locationsService } from '@lib/services/locations'
import { peoplesService } from '@lib/services/peoples'
import { speciesService } from '@lib/services/species'
import { vehiclesService } from '@lib/services/vehicles'

const relatedEntityServiceMap: Record<
  string,
  { getById: (id: string) => Promise<any> }
> = {
  vehicles: vehiclesService,
  species: speciesService,
  locations: locationsService,
  people: peoplesService,
  films: filmsService,
}

const fieldAliasMap: Record<string, string> = {
  residents: 'people',
}

export function useRelatedEntities(entity: Record<string, any> | undefined) {
  const queries: any[] = []
  const indexMap: Array<{ field: string; start: number; count: number }> = []
  let cursor = 0

  if (entity) {
    for (const field of Object.keys(entity)) {
      const mappedKey = fieldAliasMap[field] ?? field
      const serviceEntry = relatedEntityServiceMap[mappedKey]
      if (!serviceEntry) continue

      const raw = entity[field]
      const urls = Array.isArray(raw)
        ? raw
        : typeof raw === 'string'
          ? [raw]
          : []
      if (!urls.length) continue

      const ids = urls
        .map((url) => url.split('/').pop())
        .filter((id): id is string => Boolean(id))
      if (!ids.length) continue

      indexMap.push({ field, start: cursor, count: ids.length })

      for (const id of ids) {
        queries.push({
          queryKey: [mappedKey, id],
          queryFn: () => serviceEntry.getById(id),
          enabled: true,
        })
        cursor++
      }
    }
  }

  const results = useQueries({ queries })
  const grouped: Record<
    string,
    { data: any[]; isLoading: boolean; isError: boolean }
  > = {}

  for (const { field, start, count } of indexMap) {
    const slice = (results as any[]).slice(start, start + count)
    grouped[field] = {
      data: slice.map((r) => (r as any).data).filter(Boolean),
      isLoading: slice.some((r) => (r as any).isLoading),
      isError: slice.some((r) => (r as any).isError),
    }
  }

  return grouped
}
