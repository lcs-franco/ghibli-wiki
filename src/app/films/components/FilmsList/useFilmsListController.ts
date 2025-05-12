import { useGhibliContext } from '@lib/contexts/GhibliContext'
import { useFilms } from '@lib/hooks/films/useFilms'

export function useFilmsListController() {
  const { data: films, isLoading, error } = useFilms()

  const {
    searchQuery,
    setSearchQuery,
    filters,
    handleChangeFilmFilters,
    clearFilters,
  } = useGhibliContext()

  const { director, decade, rating } = filters.films

  const filteredFilms =
    films?.filter((film) => {
      if (
        searchQuery &&
        !film.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !film.director.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !film.original_title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      if (director && film.director !== director) {
        return false
      }

      if (decade) {
        const decadeStart = Number.parseInt(decade)
        const decadeEnd = decadeStart + 9
        const year = Number.parseInt(film.release_date)
        if (year < decadeStart || year > decadeEnd) {
          return false
        }
      }

      if (rating) {
        const minRating = Number.parseInt(rating)
        if (Number.parseInt(film.rt_score) < minRating) {
          return false
        }
      }

      return true
    }) || []

  const directors = films
    ? Array.from(new Set(films.map((film) => film.director)))
    : []

  const handleDirectorChange = (selectedDirector: string) => {
    handleChangeFilmFilters({ ...filters.films, director: selectedDirector })
  }

  const handleDecadeChange = (selectedDecade: string) => {
    handleChangeFilmFilters({ ...filters.films, decade: selectedDecade })
  }

  const handleRatingChange = (selectedRating: string) => {
    handleChangeFilmFilters({ ...filters.films, rating: selectedRating })
  }

  const clearAllFilters = () => {
    clearFilters('films')
  }

  return {
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    filters,
    filteredFilms,
    directors,
    handleDirectorChange,
    handleDecadeChange,
    handleRatingChange,
    clearAllFilters,
  }
}
