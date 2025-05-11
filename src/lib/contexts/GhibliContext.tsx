'use client'
import { FilmFilters } from '@lib/services/films'
import { createContext, useCallback, useContext, useState } from 'react'

interface GhibliFilters {
  films: FilmFilters
}

interface GhibliContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void

  filters: GhibliFilters
  handleChangeFilmFilters: (filters: FilmFilters) => void

  clearFilters: (category: keyof GhibliFilters) => void
}

const GhibliContext = createContext({} as GhibliContextType)

const initialFilters: GhibliFilters = {
  films: { director: null, decade: null, rating: null },
}

export function GhibliProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')

  const [filters, setFilters] = useState<GhibliFilters>(initialFilters)

  const handleChangeFilmFilters = useCallback((filmFilters: FilmFilters) => {
    setFilters((prevState) => ({ ...prevState, films: filmFilters }))
  }, [])

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
        handleChangeFilmFilters,
        searchQuery,
        setSearchQuery,
        filters,
        clearFilters,
      }}
    >
      {children}
    </GhibliContext.Provider>
  )
}

export function useGhibliContext() {
  return useContext(GhibliContext)
}
