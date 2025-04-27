import { Film } from '../../../types'
import { httpClient } from '../httpClient'

type FilmResponse = Film[]

export async function getAll() {
  const { data } = await httpClient.get<FilmResponse>('/films')
  return data
}
