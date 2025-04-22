import { GhibliApi } from "./GhibliApi";

export interface Vehicles extends GhibliApi {
  name: string;
  description: string;
  vehicle_class: string;
  length: string;
  pilot: string;
  films: string[];
}
