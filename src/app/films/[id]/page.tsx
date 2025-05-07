import { FilmDetails } from '@components/Films/FilmDetails'

interface FilmPageProps {
  params: {
    id: string
  }
}

export default async function FilmPage({ params }: FilmPageProps) {
  const { id } = await params

  return (
    <main className="flex-1 py-12">
      <div className="mx-auto max-w-7xl flex-1 overflow-hidden px-4 md:px-6">
        <div>
          <FilmDetails id={id} />
        </div>
      </div>
    </main>
  )
}
