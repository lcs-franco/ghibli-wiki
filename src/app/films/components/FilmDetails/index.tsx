'use client'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Button } from '@components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { useFilmsById } from '@lib/hooks/films/useFilmsById'
import { useRelatedEntities } from '@lib/hooks/useRelatedEntities'
import { ArrowLeft, Leaf, MapPin, Star, Tractor, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FilmDetailsSkeleton, PeopleTabSkeleton } from './Skeleton'

export function FilmDetails({ id }: { id: string }) {
  const { data: film, isLoading, error } = useFilmsById(id)
  const { locations, people, species, vehicles } = useRelatedEntities(film)

  if (isLoading) return <FilmDetailsSkeleton />

  if (!film || error) {
    return (
      <Alert variant="destructive" className="mt-8">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error
            ? error.message
            : 'Failed to load films. Please try again later.'}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2">
        <Link href={`/films`}>
          <Button variant="outline" size="sm">
            <ArrowLeft />
            Back to films
          </Button>
        </Link>
      </div>

      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
        <Image
          src={film.movie_banner}
          alt={film.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="from-background/80 to-background/0 absolute inset-0 bg-gradient-to-t" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {film.title}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <div>
            <h2 className="text-2xl font-bold">Description</h2>
            <p className="text-muted-foreground mt-2">{film.description}</p>
          </div>

          <Tabs defaultValue="people">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="people" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">People</span>
              </TabsTrigger>
              <TabsTrigger
                value="locations"
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Locations</span>
              </TabsTrigger>
              <TabsTrigger value="species" className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                <span className="hidden sm:inline">Species</span>
              </TabsTrigger>
              <TabsTrigger value="vehicles" className="flex items-center gap-2">
                <Tractor className="h-4 w-4" />
                <span className="hidden sm:inline">Vehicles</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="people" className="mt-4">
              {people.isLoading ? (
                <PeopleTabSkeleton />
              ) : people.data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {people.data.map((person) => (
                    <Card key={person.id}>
                      <CardHeader>
                        <CardTitle>{person.name}</CardTitle>
                        <CardDescription>{person.gender}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2 text-sm">
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
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No character information available.
                </p>
              )}
            </TabsContent>

            <TabsContent value="locations" className="mt-4">
              {locations.isLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[1, 2].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="mb-1 h-6 w-40" />
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <Skeleton className="h-12 w-full" />
                          <Skeleton className="h-12 w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : locations.data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {locations.data.map((location) => (
                    <Card key={location.id}>
                      <CardHeader>
                        <CardTitle>{location.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">Climate:</span>
                            <p className="text-muted-foreground">
                              {location.climate}
                            </p>
                          </div>
                          <div>
                            <span className="font-medium">Terrain:</span>
                            <p className="text-muted-foreground">
                              {location.terrain}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No location information available.
                </p>
              )}
            </TabsContent>

            <TabsContent value="species" className="mt-4">
              {species.isLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[1, 2].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="mb-1 h-6 w-40" />
                        <Skeleton className="h-4 w-24" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : species.data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {species.data.map((specie) => (
                    <Card key={specie.id}>
                      <CardHeader>
                        <CardTitle>{specie.name}</CardTitle>
                        <CardDescription>
                          {specie.classification}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No specie information available.
                </p>
              )}
            </TabsContent>

            <TabsContent value="vehicles" className="mt-4">
              {vehicles.isLoading ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {[1, 2].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="mb-1 h-6 w-40" />
                        <Skeleton className="h-4 w-24" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="mb-2 h-4 w-full" />
                        <Skeleton className="mb-2 h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : vehicles.data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {vehicles.data.map((vehicle) => (
                    <Card key={vehicle.id}>
                      <CardHeader>
                        <CardTitle>{vehicle.name}</CardTitle>
                        <CardDescription>
                          {vehicle.vehicle_class}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {vehicle.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No vehicle information available.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Film Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Director</h3>
                <p className="text-muted-foreground">{film.director}</p>
              </div>
              <div>
                <h3 className="font-medium">Producer</h3>
                <p className="text-muted-foreground">{film.producer}</p>
              </div>
              <div>
                <h3 className="font-medium">Release Date</h3>
                <p className="text-muted-foreground">{film.release_date}</p>
              </div>
              <div>
                <h3 className="font-medium">Running Time</h3>
                <p className="text-muted-foreground">{film.running_time}</p>
              </div>
              <div>
                <h3 className="font-medium">Rotten Tomatoes Score</h3>
                <div className="text-muted-foreground flex items-center gap-1">
                  <Star className="fill-primary text-primary h-4 w-4" />
                  {film.rt_score}%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Original Title</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Japanese</h3>
                <p className="text-muted-foreground">{film.original_title}</p>
              </div>
              <div>
                <h3 className="font-medium">Romanised</h3>
                <p className="text-muted-foreground">
                  {film.original_title_romanised}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
