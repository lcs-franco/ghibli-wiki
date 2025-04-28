import Link from 'next/link'
import { Totoro } from './Totoro'

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <Totoro className="text-primary h-10 w-10" />
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Studio Ghibli Wiki. All rights
            reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://ghibliapi.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary text-sm"
          >
            API Source
          </Link>
          <Link
            href="https://matsu-theme.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary text-sm"
          >
            Theme By Matt
          </Link>
        </div>
      </div>
    </footer>
  )
}
