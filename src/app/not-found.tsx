'use client'

import { Button } from '@components/ui/button'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="relative flex min-h-max flex-col items-center justify-center overflow-hidden bg-gradient-to-b px-4">
      <motion.div
        className="z-10 max-w-md text-center"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={{
            initial: { y: 0 },
            animate: {
              y: [-10, 10, -10],
              transition: {
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
            },
          }}
          initial="initial"
          animate="animate"
          className="relative mx-auto mt-36 mb-24 flex h-40 w-40 items-center justify-center"
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <Image
              src="/no-face.png"
              alt="No-Face Spirit"
              width={300}
              height={300}
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-foreground font-heading mb-4 text-4xl font-bold tracking-tight"
        >
          Ah... Ah... Page Not Found
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground mb-8 text-lg"
        >
          {`No-Face has consumed this page. Perhaps he can offer you gold instead ?
          Or maybe you'd prefer to find your way back to somewhere familiar.`}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Home className="h-4 w-4" />
              Return to Bathhouse
            </Button>
          </Link>
          <Link href="/people">
            <Button variant="outline" size="lg" className="gap-2">
              <Search className="h-4 w-4" />
              Find Other Spirits
            </Button>
          </Link>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground mt-12 mb-8 text-sm italic"
        >
          {`"I'm lonely. I'm lonely and I want to go with you." — No-Face,
          Spirited Away`}
        </motion.p>
      </motion.div>
    </div>
  )
}
