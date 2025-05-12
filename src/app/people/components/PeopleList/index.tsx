'use client'

import { Filter, Search } from 'lucide-react'
import Link from 'next/link'

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
import { usePeopleListController } from './usePeopleListController'

export function PeopleList() {
  const {
    searchQuery,
    setSearchQuery,
    genderList,
    handleGenderChange,
    speciesList,
    handleSpeciesChange,
    clearAllFilters,
    filters,
    filteredPeople,
  } = usePeopleListController()

  const { gender, species } = filters.people

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
                <DropdownMenuSubTrigger>Gender</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {genderList.map((gender) => (
                      <DropdownMenuItem
                        key={gender}
                        onClick={() => handleGenderChange(gender)}
                      >
                        {gender}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Species</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {speciesList?.map((specie) => (
                      <DropdownMenuItem
                        key={specie.id}
                        onClick={() => handleSpeciesChange(specie.id)}
                      >
                        {specie.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>

          {(gender || species) && (
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

      {filteredPeople.length === 0 ? (
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
          {filteredPeople.map((person) => (
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
                    <p className="text-muted-foreground">{person.age}</p>
                  </div>
                  <div>
                    <span className="font-medium">Eye Color:</span>
                    <p className="text-muted-foreground">{person.eye_color}</p>
                  </div>
                  <div>
                    <span className="font-medium">Hair Color:</span>
                    <p className="text-muted-foreground">{person.hair_color}</p>
                  </div>
                </div>

                <div>
                  {speciesList?.map((specie) => {
                    const speciesUrl = person.species
                    const speciesId = speciesUrl.split('/').pop()
                    if (specie.id === speciesId) {
                      return (
                        <Badge key={specie.id} variant="outline">
                          {specie.name}
                        </Badge>
                      )
                    }
                    return null
                  })}
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
      )}
    </div>
  )
}
