"use client"

import React from 'react'
import { useTheme } from '@/lib/ThemeContext'

const MapLegend = () => {
  const { theme } = useTheme()

  const legendItems = [
    { label: '0 days', color: theme === 'dark' ? '#141414' : '#f5f5f5' },
    { label: '1-30 days', color: 'rgba(65, 105, 225, 0.35)' },
    { label: '31-90 days', color: 'rgba(65, 105, 225, 0.5)' },
    { label: '91-180 days', color: 'rgba(65, 105, 225, 0.65)' },
    { label: '181-365 days', color: 'rgba(65, 105, 225, 0.8)' },
    { label: '365+ days', color: 'rgba(65, 105, 225, 1)' },
  ]

  return (
    <div className="flex items-center justify-center mt-4 space-x-4 flex-wrap">
      {legendItems.map((item) => (
        <div key={item.label} className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded-sm"
            style={{
              backgroundColor: item.color,
              border: item.color === '#141414' || item.color === '#f5f5f5'
                ? `1px solid ${theme === 'dark' ? '#333' : '#ccc'}`
                : 'none'
            }}
          />
          <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default MapLegend 