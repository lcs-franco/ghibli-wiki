import { Film } from '../../../types'
import { httpClient } from '../httpClient'

type FilmResponse = Film

export async function getById(id: string) {
  const { data } = await httpClient.get<FilmResponse>(`/films/${id}`)
  return data
}
