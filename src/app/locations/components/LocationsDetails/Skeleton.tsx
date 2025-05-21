import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'
import { ArrowLeft, Film, Users } from 'lucide-react'

export function LocationDetailsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="relative w-32">
        <Skeleton className="h-8 w-32" />
        <ArrowLeft className="text-muted-foreground bg-accent absolute top-2.5 left-2.5 h-4 w-4 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-1">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="mt-2 h-4 w-24" />
              <Skeleton className="mt-2 h-6 w-16" />
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Film className="text-primary h-5 w-5 animate-pulse" />
                <CardTitle>
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <FilmCardSkeleton />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="text-primary h-5 w-5 animate-pulse" />
                <CardTitle>
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent>
              <PeopleCardSkeleton />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function FilmCardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg">
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-32" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
            <div className="space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Skeleton className="h-8 w-full" />
        </CardFooter>
      </Card>
    </div>
  )
}

export function PeopleCardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg">
            <Skeleton className="h-6 w-48" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-32" />
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-4 grid grid-cols-2 gap-2 space-y-2 text-sm">
            <div className="space-y-1">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Skeleton className="h-8 w-full" />
        </CardFooter>
      </Card>
    </div>
  )
}
