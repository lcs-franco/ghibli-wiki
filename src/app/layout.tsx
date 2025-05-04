import { Footer } from '@components/Footer'
import { Header } from '@components/Header'
import { QueryClientProvider } from '@components/QueryClientProvider'
import { GhibliProvider } from '@lib/contexts/GhibliContext'
import type { Metadata } from 'next'
import { Nunito, PT_Sans } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
})

const ptSans = PT_Sans({
  variable: '--font-pt-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Studio Ghibli Wiki',
  icons: '/miyazaki.png',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${ptSans.variable} relative antialiased`}
      >
        <QueryClientProvider>
          <GhibliProvider>
            <div className="relative flex min-h-screen flex-col">
              <div className="texture" />
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </GhibliProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
