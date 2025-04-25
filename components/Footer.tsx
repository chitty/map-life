"use client"

import React from 'react'
import Link from 'next/link'
import { Github, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 dark:border-gray-800 border-gray-200 py-6 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Map Life. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="https://github.com/chitty/map-life"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition flex items-center space-x-1"
            >
              <Github className="h-4 w-4" />
              <span className="text-sm">Source</span>
            </Link>

            <div className="text-sm text-muted-foreground flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="h-3 w-3 text-red-500 fill-red-500" />
              <span>using Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 