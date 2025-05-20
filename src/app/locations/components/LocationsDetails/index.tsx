'use client'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { Progress } from '@components/ui/progress'
import { useLocationById } from '@lib/hooks/locations/useLocationById'
import { useRelatedEntities } from '@lib/hooks/useRelatedEntities'
import { ArrowLeft, Droplets, Film, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import {
  FilmCardSkeleton,
  LocationDetailsSkeleton,
  PeopleCardSkeleton,
} from './Skeleton'

export function LocationDetails({ id }: { id: string }) {
  const { data: location, isLoading, error } = useLocationById(id)
  const { residents, films } = useRelatedEntities(location)

  if (isLoading) return <LocationDetailsSkeleton />

  if (error || !location) {
    return (
      <Alert variant="destructive" className="mt-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error
            ? error.message
            : 'Failed to load film. Please try again later.'}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Link href="/locations">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to locations
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin className="text-primary h-6 w-6" />
                <CardTitle className="text-3xl font-bold">
                  {location.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Climate</h3>
                <p className="text-muted-foreground">
                  {location.climate === 'TODO'
                    ? 'Not available information'
                    : location.climate}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Terrain</h3>
                <p className="text-muted-foreground">
                  {location.terrain === 'TODO'
                    ? 'Not available information'
                    : location.terrain}
                </p>
              </div>
              <div>
                <h3 className="flex items-center gap-2 font-medium">
                  <Droplets className="text-primary h-4 w-4" />
                  Surface Water
                </h3>
                <div className="mt-2">
                  <Progress
                    value={Number(location.surface_water)}
                    className="h-2"
                  />
                  <p className="text-muted-foreground mt-1 text-right text-xs">
                    {location.surface_water}%
                  </p>
                </div>
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
                        <CardTitle className="text-lg">{film.title}</CardTitle>
                        <CardDescription>
                          {film.original_title} ({film.release_date})
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Director:</span>
                            <p className="text-muted-foreground">
                              {film.director}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Rating:</span>
                            <p className="text-muted-foreground">
                              {film.rt_score}%
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link href={`/films/${film.id}`} className="w-full">
                          <Button variant="default" className="w-full">
                            View Film
                          </Button>
                        </Link>
                      </CardFooter>
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

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="text-primary h-5 w-5" />
                <CardTitle>Residents</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {residents.isLoading ? (
                <PeopleCardSkeleton />
              ) : residents.data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {residents.data.map((person) => (
                    <Card
                      key={person.id}
                      className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                    >
                      <CardHeader className="flex flex-col gap-0">
                        <CardTitle className="text-xl">{person.name}</CardTitle>
                        <CardDescription>{person.gender}</CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Age:</span>
                            <p className="text-muted-foreground">
                              {person.age}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Eye Color:</span>
                            <p className="text-muted-foreground">
                              {person.eye_color}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Hair Color:</span>
                            <p className="text-muted-foreground">
                              {person.hair_color}
                            </p>
                          </div>
                        </div>
                      </CardContent>

                      <CardFooter>
                        <Link href={`/people/${person.id}`} className="w-full">
                          <Button variant="default" className="w-full">
                            View Details
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No residents information available.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
