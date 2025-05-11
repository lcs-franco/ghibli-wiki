import { FilmsList } from './components/FilmsList'

export const metadata = {
  title: 'Films | Studio Ghibli Wiki',
}

export default function FilmsPage() {
  return (
    <main className="flex-1 py-12">
      <div className="mx-auto max-w-7xl flex-1 overflow-hidden px-4 md:px-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block text-4xl tracking-tight lg:text-5xl">
              Films
            </h1>
            <p className="text-muted-foreground text-xl">
              Explore the magical worlds created by Studio Ghibli
            </p>
          </div>
        </div>
        <div>
          <FilmsList />
        </div>
      </div>
    </main>
  )
}
