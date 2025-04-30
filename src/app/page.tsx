import { FilmCarousel } from '@components/FIlmsCarousel'
import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { MaskedImage } from '@components/ui/masked-image'
import { ArrowRight, Leaf, MapPin, Tractor, Users } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl flex-1 overflow-hidden">
      <section className="relative w-full py-12 md:py-32 lg:py-40">
        <div className="absolute inset-0 h-full w-full lg:-ml-[10%] lg:w-[120%] xl:-ml-[15%] xl:w-[130%]">
          <MaskedImage
            src="/house.webp"
            alt="Studio Ghibli Forest Background"
            width={2560}
            height={4388}
            variant="shape6"
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

      <section className="w-full py-12 md:py-20 lg:py-24">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Featured Films
              </h2>

              <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore the magical worlds created by Studio Ghibli
              </p>
            </div>
          </div>

          <div className="mx-auto mt-2 max-w-5xl md:mt-16">
            <FilmCarousel />
          </div>
        </div>
      </section>

      <section className="w-full pb-12 md:pb-20 lg:pb-24">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Explore Categories
              </h2>

              <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Dive into the different aspects of the Studio Ghibli universe
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/people">
              <Card className="hover:border-primary h-full transition-colors">
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">People</CardTitle>

                  <Users className="text-primary h-5 w-5" />
                </CardHeader>

                <CardContent>
                  <p>Descrition</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/locations">
              <Card className="hover:border-primary h-full transition-colors">
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">
                    Locations
                  </CardTitle>

                  <MapPin className="text-primary h-5 w-5" />
                </CardHeader>

                <CardContent>
                  <p>Descrition</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/species">
              <Card className="hover:border-primary h-full transition-colors">
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Species</CardTitle>

                  <Leaf className="text-primary h-5 w-5" />
                </CardHeader>

                <CardContent>
                  <p>Descrition</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/vehicles">
              <Card className="hover:border-primary h-full transition-colors">
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">
                    Vehicles
                  </CardTitle>

                  <Tractor className="text-primary h-5 w-5" />
                </CardHeader>

                <CardContent>
                  <p>Descrition</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
