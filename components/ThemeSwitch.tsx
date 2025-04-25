"use client"

import React from 'react'
import { useTheme } from '@/lib/ThemeContext'
import { Moon, Sun } from 'lucide-react'

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleTheme()
        }
      }}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-amber-300 hover:text-amber-200" />
      ) : (
        <Moon className="h-5 w-5 text-blue-700 hover:text-blue-600" />
      )}
    </button>
  )
}

export default ThemeSwitch 