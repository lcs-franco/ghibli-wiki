import { GhibliApi } from './GhibliApi'

export interface People extends GhibliApi {
  name: string
  gender: string
  age: string
  eye_color: string
  hair_color: string
  films: string[]
  species: string
}
