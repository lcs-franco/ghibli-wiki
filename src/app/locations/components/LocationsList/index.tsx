'use client'

import { Filter, Search } from 'lucide-react'

import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import { Input } from '@components/ui/input'
import Link from 'next/link'
import { useLocationListController } from './useLocationListController'

export function LocationsList() {
  const {
    searchQuery,
    setSearchQuery,
    clearAllFilters,
    filters,
    climateList,
    terrainList,
    handleClimateChange,
    handleTerrainChange,
    filteredLocations,
  } = useLocationListController()

  const { climate, terrain } = filters.locations

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
                <DropdownMenuSubTrigger>Climate</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {climateList.map((climate) => (
                      <DropdownMenuItem
                        key={climate}
                        onClick={() => handleClimateChange(climate)}
                      >
                        {climate}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Terrain</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {terrainList.map((terrain) => (
                      <DropdownMenuItem
                        key={terrain}
                        onClick={() => handleTerrainChange(terrain)}
                      >
                        {terrain}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>

          {(climate || terrain) && (
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

      {filteredLocations.length === 0 ? (
        <div className="py-12 text-center">
          <h3 className="text-lg font-medium">No people found</h3>

          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filters
          </p>
          <Button variant="outline" onClick={clearAllFilters} className="mt-4">
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLocations.map((location) => (
            <Card
              key={location.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="line-clamp-1">
                    {location.name}
                  </CardTitle>
                </div>
                <CardDescription className="flex gap-2">
                  <Badge variant="default">{location.climate}</Badge>
                  <Badge variant="secondary">{location.terrain}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Surface Water:</span>
                    <p className="text-muted-foreground">
                      {location.surface_water}%
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Films:</span>
                    <p className="text-muted-foreground">
                      {location.films.length}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/locations/${location.id}`} className="w-full">
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
