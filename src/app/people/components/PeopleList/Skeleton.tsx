import { SearchFilterSkeleton } from '@components/SearchFilterSkeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'

export function PeopleListSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      <SearchFilterSkeleton />
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card
            key={i}
            className="overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <CardHeader className="flex flex-col gap-1">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </CardHeader>

            <CardContent>
              <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div>
                <Skeleton className="h-6 w-14" />
              </div>
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
