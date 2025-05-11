import { Card, CardContent, CardHeader } from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { ArrowLeft, Leaf, MapPin, Tractor, Users } from 'lucide-react'

export function FilmDetailsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="relative w-32">
        <Skeleton className="h-8 w-32" />
        <ArrowLeft className="text-muted-foreground bg-accent absolute top-2.5 left-2.5 h-4 w-4 animate-pulse" />
      </div>

      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <div className="space-y-2">
            <Skeleton className="mb-4 h-8 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
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
              <PeopleTabSkeleton />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>

            <CardContent className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <Skeleton className="mb-1 h-5 w-24" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>

            <CardContent className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i}>
                  <Skeleton className="mb-1 h-5 w-24" />
                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function PeopleTabSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="mb-1 h-5 w-32" />
            <Skeleton className="h-4 w-16" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
