import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

// Define the base path based on environment
const basePath = process.env.NODE_ENV === 'production' ? '/map-life' : '';

export const metadata: Metadata = {
  title: 'Map Life - Track Your Travels',
  description: 'Visualize where in the world you have been with an interactive map',
  icons: {
    icon: [
      {
        url: `${basePath}/favicon.ico`,
        sizes: 'any',
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href={`${basePath}/favicon.ico`} />
        <script async defer data-no-preload src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
        <noscript>
          <Image
            src="https://queue.simpleanalyticscdn.com/noscript.gif"
            alt="Analytics"
            referrerPolicy="no-referrer-when-downgrade"
            width={1}
            height={1}
            unoptimized
          />
        </noscript>
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 