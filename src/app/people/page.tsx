import { PeopleList } from './components/PeopleList'

export const metadata = {
  title: 'People | Studio Ghibli Wiki',
}

export default function PeoplePage() {
  return (
    <main className="flex-1 py-12">
      <div className="mx-auto max-w-7xl flex-1 overflow-hidden px-4 md:px-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block text-4xl tracking-tight lg:text-5xl">
              People
            </h1>
            <p className="text-muted-foreground text-xl">
              Meet the memorable characters from Studio Ghibli films
            </p>
          </div>
        </div>
        <div>
          <PeopleList />
        </div>
      </div>
    </main>
  )
}
