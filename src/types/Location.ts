import { GhibliApi } from "./GhibliApi";

export interface Location extends GhibliApi {
  name: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
}
