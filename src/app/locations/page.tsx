import { LocationsList } from './components/LocationsList'

export const metadata = {
  title: 'Locations | Studio Ghibli Wiki',
}

export default function LocationsPage() {
  return (
    <main className="flex-1 py-12">
      <div className="mx-auto max-w-7xl flex-1 overflow-hidden px-4 md:px-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block text-4xl tracking-tight lg:text-5xl">
              Locations
            </h1>
            <p className="text-muted-foreground text-xl">
              Explore the magical places and settings from Studio Ghibli films
            </p>
          </div>
        </div>
        <div>
          <LocationsList />
        </div>
      </div>
    </main>
  )
}
