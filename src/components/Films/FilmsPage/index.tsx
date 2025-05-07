'use client'

import { Filter, Search, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert'
import { Badge } from '../../ui/badge'
import { Button } from '../../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Input } from '../../ui/input'
import { FilmsListSkeleton } from './Skeleton'
import { useFilmsListController } from './useFilmsListController'

export function FilmsList() {
  const {
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    filters,
    filteredFilms,
    directors,
    handleDecadeChange,
    handleDirectorChange,
    handleRatingChange,
    clearAllFilters,
  } = useFilmsListController()

  const { director, decade, rating } = filters.films

  if (isLoading) {
    return <FilmsListSkeleton />
  }

  if (error) {
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
    <div className="mt-8 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="relative w-32 md:w-80">
            <Input
              placeholder="Search ..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="text-muted-foreground absolute top-2 right-2.5" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Director</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {directors.map((director) => (
                      <DropdownMenuItem
                        key={director}
                        onClick={() => handleDirectorChange(director)}
                      >
                        {director}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Decade</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() => handleDecadeChange('1980')}
                    >
                      1980s
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDecadeChange('1990')}
                    >
                      1990s
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDecadeChange('2000')}
                    >
                      2000s
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDecadeChange('2010')}
                    >
                      2010s
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDecadeChange('2020')}
                    >
                      2020s
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Rating</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => handleRatingChange('90')}>
                      90+ Rating
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRatingChange('80')}>
                      80+ Rating
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRatingChange('70')}>
                      70+ Rating
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleRatingChange('60')}>
                      60+ Rating
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>

          {(director || decade || rating) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-8"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {filteredFilms.length === 0 ? (
        <div className="py-12 text-center">
          <h3 className="text-lg font-medium">No films found</h3>

          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filters
          </p>
          <Button variant="outline" onClick={clearAllFilters} className="mt-4">
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFilms.map((film) => (
            <Card
              key={film.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={film.image}
                  alt={film.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="line-clamp-1">{film.title}</CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="fill-primary text-primary h-3 w-3" />
                    {film.rt_score}
                  </Badge>
                </div>
                <CardDescription>
                  {film.original_title} ({film.release_date})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Director:</span>
                    <p className="text-muted-foreground">{film.director}</p>
                  </div>
                  <div>
                    <span className="font-medium">Producer:</span>
                    <p className="text-muted-foreground">
                      {film.producer.includes(',')
                        ? film.producer.split(',')[0]
                        : film.producer}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Release:</span>
                    <p className="text-muted-foreground">{film.release_date}</p>
                  </div>
                  <div>
                    <span className="font-medium">Runtime:</span>
                    <p className="text-muted-foreground">
                      {film.running_time} min
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                  {film.description}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/films/${film.id}`} className="w-full">
                  <Button variant="default" className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
