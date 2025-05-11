import { Species } from '../../types'
import { httpClient } from '../httpClient'

type SpeciesResponse = Species

export async function getById(id: string) {
  const { data } = await httpClient.get<SpeciesResponse>(`/species/${id}`)
  return data
}
