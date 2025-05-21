'use client'
import { FilmFilters } from '@lib/services/films'
import { LocationFilters } from '@lib/services/locations'
import { PeopleFilters } from '@lib/services/peoples'
import { createContext, useCallback, useContext, useState } from 'react'

interface GhibliFilters {
  films: FilmFilters
  people: PeopleFilters
  locations: LocationFilters
}

interface GhibliContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void

  filters: GhibliFilters
  handleChangeFilmFilters: (filters: FilmFilters) => void
  handleChangePeopleFilters: (filters: PeopleFilters) => void
  handleChangeLocationsFilters: (filters: LocationFilters) => void

  clearFilters: (category: keyof GhibliFilters) => void
}

const GhibliContext = createContext({} as GhibliContextType)

const initialFilters: GhibliFilters = {
  films: { director: null, decade: null, rating: null },
  people: { species: null, gender: null },
  locations: { climate: null, terrain: null },
}

export function GhibliProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')

  const [filters, setFilters] = useState<GhibliFilters>(initialFilters)

  const handleChangeFilmFilters = useCallback((filmFilters: FilmFilters) => {
    setFilters((prevState) => ({ ...prevState, films: filmFilters }))
  }, [])

  const handleChangePeopleFilters = useCallback(
    (peopleFilters: PeopleFilters) => {
      setFilters((prevState) => ({ ...prevState, people: peopleFilters }))
    },
    [],
  )

  const handleChangeLocationsFilters = useCallback(
    (locationsFilters: LocationFilters) => {
      setFilters((prevState) => ({ ...prevState, locations: locationsFilters }))
    },
    [],
  )

  const clearFilters = useCallback((category: keyof GhibliFilters) => {
    setFilters((prevState) => ({
      ...prevState,
      [category]: initialFilters[category],
    }))
    setSearchQuery('')
  }, [])

  return (
    <GhibliContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        filters,
        clearFilters,
        handleChangeFilmFilters,
        handleChangePeopleFilters,
        handleChangeLocationsFilters,
      }}
    >
      {children}
    </GhibliContext.Provider>
  )
}

export function useGhibliContext() {
  return useContext(GhibliContext)
}
