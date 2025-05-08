'use client'

import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { useFilmsById } from '@lib/hooks/films'
import { ArrowLeft, Leaf, MapPin, Star, Tractor, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { FilmDetailsSkeleton } from './Skeleton'

export function FilmDetails({ id }: { id: string }) {
  const { data: film, isLoading } = useFilmsById(id)

  if (isLoading) return <FilmDetailsSkeleton />

  if (!film) return <div>error</div>

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
              people
            </TabsContent>

            <TabsContent value="locations" className="mt-4">
              locations
            </TabsContent>

            <TabsContent value="species" className="mt-4">
              species
            </TabsContent>

            <TabsContent value="vehicles" className="mt-4">
              vehicles
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
