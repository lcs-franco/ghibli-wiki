import Link from 'next/link'
import { Totoro } from './Totoro'

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="flex w-full mx-auto max-w-7xl justify-between h-16 items-center px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Totoro className="h-10 w-10 text-primary" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Studio Ghibli Wiki. All rights
            reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://ghibliapi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            API Source
          </Link>
          <Link
            href="https://matsu-theme.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Theme By Matt
          </Link>
        </div>
      </div>
    </footer>
  )
}
