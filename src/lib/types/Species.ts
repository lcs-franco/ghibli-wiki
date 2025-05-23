import { GhibliApi } from './GhibliApi'

export interface Species extends GhibliApi {
  name: string
  classification: string
  eye_colors: string
  hair_colors: string
  people: string[]
  films: string[]
}
