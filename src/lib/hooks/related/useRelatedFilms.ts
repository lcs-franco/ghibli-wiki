import { filmsService } from '@lib/services/films'
import type { Film, RelatedEntityResult } from '@lib/types'
import { useRelatedEntityBase } from './useRelatedEntityBase'

export function useRelatedFilms(entity: unknown): RelatedEntityResult<Film> {
  return useRelatedEntityBase(entity, 'films', filmsService)
}
