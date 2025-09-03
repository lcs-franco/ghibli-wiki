import type { Film, Location, People, Species, Vehicles } from '.'

export interface EntityTypeMap {
  films: Film
  locations: Location
  people: People
  species: Species
  vehicles: Vehicles
  residents: People
}

export const FIELD_ALIAS_MAP = {
  residents: 'people',
} as const

export type EntityServiceMap = {
  [K in keyof EntityTypeMap]: {
    getById: (id: string) => Promise<EntityTypeMap[K]>
  }
}

export interface RelatedEntityResult<T> {
  data: T[]
  isLoading: boolean
  isError: boolean
}

export type EntityUrls = string | string[]

export type ExtractEntityType<T extends keyof EntityTypeMap> = EntityTypeMap[T]

export type RelationField = keyof EntityTypeMap

export interface BaseEntityWithRelations extends Record<string, unknown> {
  [key: string]: EntityUrls | unknown
}
