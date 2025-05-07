'use client'

import { useFilmsById } from '@lib/hooks/films'

export function FilmDetails({ id }: { id: string }) {
  const { data: film } = useFilmsById(id)

  return <h1>{`Filme ${film?.title}`}</h1>
}
