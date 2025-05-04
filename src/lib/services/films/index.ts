import { getAll } from './getAll'
import { getById } from './getById'

export type FilmFilters = {
  director: string | null
  decade: string | null
  rating: string | null
}

export const filmsService = {
  getAll,
  getById,
}
