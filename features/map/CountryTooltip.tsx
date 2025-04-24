"use client"

import React from 'react'
import { CountryVisitData } from '@/hooks/useCountryData'

interface CountryTooltipProps {
  countryName: string
  countryCode: string
  visitData: CountryVisitData
  position: { x: number; y: number }
}

const CountryTooltip = ({ countryName, countryCode, visitData, position }: CountryTooltipProps) => {
  const hasData = visitData && visitData.timeSpent > 0;

  return (
    <div
      className="absolute z-50 bg-gray-800 border border-gray-700 rounded-md p-3 shadow-lg"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -120%)',
        minWidth: '200px'
      }}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-medium">{countryName || "Unknown"}</h3>
        <span className={`text-xs py-0.5 px-1.5 rounded-sm ${hasData ? 'bg-blue-900/40 text-blue-400' : 'bg-gray-700 text-gray-400'}`}>
          {countryCode || "N/A"}
        </span>
      </div>

      <div className="space-y-1 pt-1 border-t border-gray-700">
        {hasData ? (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Visits:</span>
              <span>{visitData.visitCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Days Spent:</span>
              <span>{visitData.timeSpent}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Time Ratio:</span>
              <span>{((visitData.timeSpent / 365) * 100).toFixed(1)}%</span>
            </div>
          </>
        ) : (
          <div className="text-gray-400 text-sm italic text-center py-1">
            No visit data
          </div>
        )}
      </div>

      <div className="absolute border-8 border-transparent border-t-gray-800" style={{
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)'
      }} />
    </div>
  )
}

export default CountryTooltip 