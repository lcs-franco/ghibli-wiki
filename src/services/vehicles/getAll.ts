import { Vehicles } from "../../types";
import { httpClient } from "../httpClient";

type VehiclesResponse = Vehicles[];

export async function getAll() {
  const { data } = await httpClient.get<VehiclesResponse>("/vehicles");
  return data;
}
