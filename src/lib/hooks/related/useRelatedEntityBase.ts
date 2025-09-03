import { useQueries } from '@tanstack/react-query'

import type {
  ExtractEntityType,
  RelatedEntityResult,
  RelationField,
} from '@lib/types/RelatedEntities'

export function useRelatedEntityBase<T extends RelationField>(
  entity: unknown,
  fieldName: T,
  service: { getById: (id: string) => Promise<ExtractEntityType<T>> },
): RelatedEntityResult<ExtractEntityType<T>> {
  const urls = (entity as Record<string, unknown>)?.[fieldName]

  const urlArray = Array.isArray(urls)
    ? urls
    : typeof urls === 'string'
      ? [urls]
      : []

  const ids = urlArray
    .map((url) => url.split('/').pop())
    .filter((id): id is string => Boolean(id))

  const queries = ids.map((id) => ({
    queryKey: [fieldName, id] as const,
    queryFn: () => service.getById(id),
    enabled: Boolean(entity && ids.length > 0),
  }))

  const results = useQueries({ queries })

  const data = results
    .map((result) => result.data)
    .filter((item): item is ExtractEntityType<T> => Boolean(item))

  const isLoading = results.some((result) => result.isLoading)
  const isError = results.some((result) => result.isError)

  return {
    data,
    isLoading,
    isError,
  }
}
