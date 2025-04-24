"use client"

import React from 'react'
import { Globe } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="border-b border-gray-800 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2"
        >
          <Globe className="h-5 w-5 text-primary" />
          <span className="font-semibold text-xl">Map Life</span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link
            href="https://github.com/chitty/map-life"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition"
          >
            GitHub
          </Link>

          <a
            href="/sample_data.csv"
            download
            className="text-sm text-muted-foreground hover:text-primary transition"
          >
            Download Sample CSV
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar 