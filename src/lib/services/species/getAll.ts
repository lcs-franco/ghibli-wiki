import { Species } from '../../types'
import { httpClient } from '../httpClient'

type SpeciesResponse = Species[]

export async function getAll() {
  const { data } = await httpClient.get<SpeciesResponse>('/species')
  return data
}
