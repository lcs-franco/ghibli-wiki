'use client'

import { ArrowLeft, Film, Star } from 'lucide-react'
import Link from 'next/link'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { usePeopleById } from '@lib/hooks/people/usePeopleById'
import { useRelatedEntities } from '@lib/hooks/useRelatedEntities'
import { FilmCardSkeleton, PersonDetailsSkeleton } from './Skeleton'

export function PersonDetails({ id }: { id: string }) {
  const { data: person, isLoading, error } = usePeopleById(id)
  const { films, species } = useRelatedEntities(person)

  if (isLoading) return <PersonDetailsSkeleton />

  if (!person || error) {
    return (
      <Alert variant="destructive" className="mt-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error
            ? error.message
            : 'Failed to load person. Please try again later.'}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Link href={`/people`}>
          <Button variant="outline" size="sm">
            <ArrowLeft />
            Back to people
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <CardTitle className="text-2xl">{person.name}</CardTitle>

              <CardDescription className="text-lg">
                {person.gender}
              </CardDescription>

              {species && (
                <Badge variant="outline" className="mt-2">
                  {species.data.map((specie) => specie.name)}
                </Badge>
              )}
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Age</h3>
                  <p className="text-muted-foreground">{person.age}</p>
                </div>
                <div>
                  <h3 className="font-medium">Eye Color</h3>
                  <p className="text-muted-foreground">{person.eye_color}</p>
                </div>
                <div>
                  <h3 className="font-medium">Hair Color</h3>
                  <p className="text-muted-foreground">{person.hair_color}</p>
                </div>
                {species && (
                  <div>
                    <h3 className="font-medium">Species Classification</h3>
                    <p className="text-muted-foreground">
                      {species.data.map((specie) => specie.classification)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Film className="text-primary h-5 w-5" />

                <CardTitle>Appears In</CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              {films.isLoading ? (
                <FilmCardSkeleton />
              ) : films.data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {films.data.map((film) => (
                    <Card key={film.id} className="overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-xl">{film.title}</CardTitle>

                        <CardDescription>
                          {film.original_title} ({film.release_date})
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="font-medium">Director:</span>

                            <p className="text-muted-foreground">
                              {film.director}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Rating:</span>

                            <div className="text-muted-foreground flex items-center gap-1">
                              <Star className="fill-primary text-primary h-4 w-4" />
                              {film.rt_score}%
                            </div>
                          </div>
                        </div>
                      </CardContent>

                      <div className="px-6 pb-4">
                        <Link href={`/films/${film.id}`}>
                          <Button variant="outline" size="sm">
                            View Film
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No film information available.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
