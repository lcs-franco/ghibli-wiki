import { locationsService } from "@lib/services/locations";
import { useQuery } from "@tanstack/react-query";

export function useLocations() {
  return useQuery({
    queryKey: ["location"],
    queryFn: locationsService.getAll,
    staleTime: Infinity,
  });
}

export function useLocationsById(id: string) {
  return useQuery({
    queryKey: ["location", id],
    queryFn: () => locationsService.getById(id),
    staleTime: Infinity,
    enabled: !!id,
  });
}
