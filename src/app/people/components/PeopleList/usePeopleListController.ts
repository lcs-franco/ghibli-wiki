import { useGhibliContext } from '@lib/contexts/GhibliContext'
import { usePeople } from '@lib/hooks/people/usePeople'
import { useSpecies } from '@lib/hooks/species/useSpecies'

export function usePeopleListController() {
  const { data: people, isLoading, error } = usePeople()
  const { data: speciesList } = useSpecies()

  const {
    searchQuery,
    setSearchQuery,
    filters,
    handleChangePeopleFilters,
    clearFilters,
  } = useGhibliContext()

  const { gender, species } = filters.people

  const filteredPeople =
    people?.filter((person) => {
      if (
        searchQuery &&
        !person.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !person.gender.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      if (species) {
        const speciesUrl = person.species
        const speciesId = speciesUrl.split('/').pop()
        if (speciesId !== species) {
          return false
        }
      }

      if (gender && person.gender.toLowerCase() !== gender.toLowerCase()) {
        return false
      }

      return true
    }) || []

  const genderList = people
    ? Array.from(new Set(people.map((person) => person.gender)))
    : []

  const handleGenderChange = (selectedGender: string) => {
    handleChangePeopleFilters({ ...filters.people, gender: selectedGender })
  }

  const handleSpeciesChange = (selectecSpecie: string) => {
    handleChangePeopleFilters({ ...filters.people, species: selectecSpecie })
  }

  const clearAllFilters = () => {
    clearFilters('people')
  }

  return {
    searchQuery,
    setSearchQuery,
    genderList,
    handleGenderChange,
    handleSpeciesChange,
    clearAllFilters,
    speciesList,
    filters,
    filteredPeople,
    isLoading,
    error,
  }
}
