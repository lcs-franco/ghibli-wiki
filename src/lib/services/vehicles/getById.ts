import { Vehicles } from "../../../types";
import { httpClient } from "../httpClient";

type VehiclesResponse = Vehicles;

export async function getById(id: string) {
  const { data } = await httpClient.get<VehiclesResponse>(`/vehicles/${id}`);
  return data;
}
