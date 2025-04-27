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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex w-full mx-auto max-w-7xl justify-between h-16 items-center px-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 transition-colors ease-in-out hover:text-primary"
        >
          <Totoro className="h-14 w-14" />
          <span className="font-bold text-2xl sm:inline-block">
            Studio Ghilbi Wiki
          </span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className="transition-colors ease-in-out hover:text-primary"
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end flex-1 space-x-4 md:hidden">
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
                    className="relative inline-block transition-colors ease-in-out hover:text-primary w-full"
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
