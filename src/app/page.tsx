import { Button } from '@components/ui/button'
import { MaskedImage } from '@components/ui/masked-image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative mx-auto w-full max-w-7xl overflow-hidden py-12 md:py-32 lg:py-40">
        <div className="absolute inset-0 h-full w-full lg:-ml-[10%] lg:w-[120%] xl:-ml-[15%] xl:w-[130%]">
          <MaskedImage
            src="/house.webp"
            alt="Studio Ghibli Forest Background"
            width={2560}
            height={4388}
            variant="shape1"
            className="h-full w-full object-cover"
          />
          <div className="bg-background/60 absolute inset-0"></div>
        </div>

        <div className="relative z-10 container px-4 md:px-6">
          <div className="mx-auto max-w-[1300px]">
            <div className="flex flex-col space-y-4 text-center md:max-w-[600px] md:text-left">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Discover the Magic of Studio Ghibli
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Explore the enchanting worlds, characters, and stories from the
                legendary animation studio.
              </p>
              <div className="flex justify-center pt-4 md:justify-start">
                <Link href="/films">
                  <Button size="lg">
                    Explore Films
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
