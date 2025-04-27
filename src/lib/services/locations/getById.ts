import { httpClient } from '../httpClient'

type LocationResponse = Location

export async function getById(id: string) {
  const { data } = await httpClient.get<LocationResponse>(`/locations/${id}`)
  return data
}
