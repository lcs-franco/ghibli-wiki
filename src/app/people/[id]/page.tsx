export default async function PersonPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main className="flex-1 py-12">
      <div className="mx-auto max-w-7xl flex-1 overflow-hidden px-4 md:px-6">
        <div>
          <p>{id}</p>
        </div>
      </div>
    </main>
  )
}
