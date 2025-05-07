import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'
import { Filter, Search } from 'lucide-react'

export function FilmsListSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="relative w-32 md:w-80">
            <Skeleton className="h-10 w-full" />
            <Search className="text-muted-foreground bg-accent absolute top-2 right-2.5 animate-pulse" />
          </div>
        </div>

        <div className="flex flex-wrap items-center">
          <Skeleton className="inline-flex h-8 w-20 items-center justify-between gap-2 px-2.5">
            <Filter className="h-4 w-4" />
            <span className="w-9"></span>
          </Skeleton>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-[3/4] w-full">
              <Skeleton className="h-full w-full" />
            </div>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
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
        ))}
      </div>
    </div>
  )
}
