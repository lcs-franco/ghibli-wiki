import { Filter, Search } from 'lucide-react'
import { Skeleton } from './ui/skeleton'

export function SearchFilterSkeleton() {
  return (
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
  )
}
