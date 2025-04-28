import { Menu } from 'lucide-react'
import Link from 'next/link'
import { Totoro } from './Totoro'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const routes = [
  {
    href: '/films',
    label: 'Films',
  },
  {
    href: '/people',
    label: 'People',
  },
  {
    href: '/locations',
    label: 'Locations',
  },
  {
    href: '/species',
    label: 'Species',
  },
  {
    href: '/vehicles',
    label: 'Vehicles',
  },
]

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="hover:text-primary flex items-center gap-2 transition-colors ease-in-out"
        >
          <Totoro className="h-14 w-14" />
          <span className="text-2xl font-bold sm:inline-block">
            Studio Ghibli Wiki
          </span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className="hover:text-primary transition-colors ease-in-out"
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4 md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {routes.map((route) => (
                <DropdownMenuItem key={route.href}>
                  <Link
                    href={route.href}
                    key={route.href}
                    className="hover:text-primary relative inline-block w-full transition-colors ease-in-out"
                  >
                    {route.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
