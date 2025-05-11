import { People } from '../../types'
import { httpClient } from '../httpClient'

type PeopleResponse = People

export async function getById(id: string) {
  const { data } = await httpClient.get<PeopleResponse>(`/people/${id}`)
  return data
}
