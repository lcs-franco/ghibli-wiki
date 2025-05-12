import { getAll } from './getAll'
import { getById } from './getById'

export type PeopleFilters = {
  species: string | null
  gender: string | null
}

export const peoplesService = {
  getAll,
  getById,
}
