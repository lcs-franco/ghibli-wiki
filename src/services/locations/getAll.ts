import { httpClient } from "../httpClient";

type LocationResponse = Location[];

export async function getAll() {
  const { data } = await httpClient.get<LocationResponse>("/locations");
  return data;
}
