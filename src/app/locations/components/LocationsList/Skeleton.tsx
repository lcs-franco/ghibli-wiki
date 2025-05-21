import { SearchFilterSkeleton } from '@components/SearchFilterSkeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'

export function LocationsListSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      <SearchFilterSkeleton />
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mb-2 h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
