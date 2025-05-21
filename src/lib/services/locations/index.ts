import { getAll } from './getAll'
import { getById } from './getById'

export type LocationFilters = {
  climate: string | null
  terrain: string | null
}

export const locationsService = {
  getAll,
  getById,
}
