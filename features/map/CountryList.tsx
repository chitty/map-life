"use client"

import React from 'react'
import { CountryVisitData, useCountryData } from '@/hooks/useCountryData'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

const CountryList = () => {
  const { countryData } = useCountryData()

  // Sort countries by time spent
  const sortedCountries = Object.entries(countryData)
    .sort(([, dataA], [, dataB]) => dataB.timeSpent - dataA.timeSpent)

  // Country name mapping
  const countryNames: Record<string, string> = {
    'USA': 'United States',
    'GBR': 'United Kingdom',
    'FRA': 'France',
    'DEU': 'Germany',
    'JPN': 'Japan',
    'CAN': 'Canada',
    'AUS': 'Australia',
    'NZL': 'New Zealand',
    'ESP': 'Spain',
    'ITA': 'Italy',
  }

  // Get friendly country name
  const getCountryName = (code: string): string => {
    return countryNames[code] || code
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-medium">Countries Visited</h3>
      </CardHeader>
      <CardContent>
        {sortedCountries.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">
            No countries visited yet. Upload your travel data to see the list.
          </p>
        ) : (
          <div className="space-y-1 max-h-[300px] overflow-auto pr-2">
            {sortedCountries.map(([code, data]) => (
              <div key={code} className="flex justify-between items-center py-2 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="font-medium">
                    {getCountryName(code)}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {data.timeSpent} {data.timeSpent === 1 ? 'day' : 'days'}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CountryList 