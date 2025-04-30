'use client'
import { useFilms } from '@lib/hooks/films'
import Autoplay from 'embla-carousel-autoplay'
import { Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from './ui/carousel'
import { Skeleton } from './ui/skeleton'

export function FilmCarousel() {
  const { data: films, isLoading, error } = useFilms()
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  )

  if (isLoading) {
    return (
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {[1, 2, 3].map((i) => (
              <CarouselItem key={i} className="pl-5 md:basis-1/2 lg:basis-1/3">
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="aspect-video w-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-6 w-2/12" />
                    </div>
                    <Skeleton className="h-4 w-2/6" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="mb-2 h-4 w-full" />
                    <Skeleton className="mb-2 h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error
            ? error.message
            : 'Failed to load films. Please try again later.'}
        </AlertDescription>
      </Alert>
    )
  }

  if (!films || films.length === 0) {
    return (
      <Alert>
        <AlertTitle>No Films</AlertTitle>
        <AlertDescription>
          No films found. Please check back later.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="relative">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full"
        opts={{ loop: true, align: 'start' }}
      >
        <CarouselContent className="-ml-4">
          {films.map((film) => (
            <CarouselItem
              key={film.id}
              className="pl-5 md:basis-1/2 lg:basis-1/3"
            >
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={film.movie_banner}
                    alt={film.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="line-clamp-1">{film.title}</CardTitle>
                    <Badge variant="outline" className="[&>svg]:size-3.5">
                      <Star className="text-primary fill-primary" />
                      <p className="h-[14px] w-4 text-xs">{film.rt_score}</p>
                    </Badge>
                  </div>
                  <CardDescription>
                    {film.original_title} ({film.release_date})
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground line-clamp-3 text-sm">
                  {film.description}
                </CardContent>
                <CardFooter>
                  <Link href={`/films/${film.id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots count={Math.max(films.length)} />
      </Carousel>
    </div>
  )
}
