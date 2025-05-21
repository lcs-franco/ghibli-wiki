import { useGhibliContext } from '@lib/contexts/GhibliContext'
import { useLocations } from '@lib/hooks/locations/useLocations'

export function useLocationListController() {
  const { data: locations, isLoading, error } = useLocations()

  const {
    searchQuery,
    setSearchQuery,
    filters,
    handleChangeLocationsFilters,
    clearFilters,
  } = useGhibliContext()

  const { climate, terrain } = filters.locations

  const filteredLocations =
    locations?.filter((location) => {
      if (
        searchQuery &&
        !location.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !location.climate.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !location.terrain.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      if (terrain && location.terrain.toLowerCase() !== terrain.toLowerCase()) {
        return false
      }

      if (climate && location.climate.toLowerCase() !== climate.toLowerCase()) {
        return false
      }

      return true
    }) || []

  const climateList = locations
    ? Array.from(new Set(locations.map((location) => location.climate))).filter(
        (value) => value !== 'TODO',
      )
    : []

  const terrainList = locations
    ? Array.from(new Set(locations.map((location) => location.terrain))).filter(
        (value) => value !== 'TODO',
      )
    : []

  const handleClimateChange = (selectedClimate: string) => {
    handleChangeLocationsFilters({
      ...filters.locations,
      climate: selectedClimate,
    })
  }

  const handleTerrainChange = (selectedTerrain: string) => {
    handleChangeLocationsFilters({
      ...filters.locations,
      terrain: selectedTerrain,
    })
  }

  const clearAllFilters = () => {
    clearFilters('locations')
  }

  return {
    searchQuery,
    setSearchQuery,
    filters,
    clearAllFilters,
    climateList,
    terrainList,
    handleClimateChange,
    handleTerrainChange,
    filteredLocations,
    error,
    isLoading,
  }
}
