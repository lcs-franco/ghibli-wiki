import { People } from '../../types'
import { httpClient } from '../httpClient'

type PeopleResponse = People[]

export async function getAll() {
  const { data } = await httpClient.get<PeopleResponse>('/people')
  return data
}
