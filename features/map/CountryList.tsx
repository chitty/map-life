"use client"

import React, { useState, useMemo } from 'react'
import { CountryVisitData, useCountryData } from '@/hooks/useCountryData'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Search, Globe, ChevronDown, ChevronUp } from 'lucide-react'
import { getCountryName, getCountryFlag, getContinent } from '@/lib/countryCodeMapping'
import { formatTimeSpent } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// A simplified input component
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`flex h-9 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-1 text-sm text-gray-100 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

// A simplified tabs component
const Tabs = ({ defaultValue, children, onValueChange, className }: {
  defaultValue: string;
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
  className?: string;
}) => (
  <div className={className}>
    {children}
  </div>
)

const TabsList = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`inline-flex h-9 items-center justify-center rounded-lg bg-gray-800 p-1 text-gray-400 ${className}`}>
    {children}
  </div>
)

const TabsTrigger = ({ value, className, children, onClick }: {
  value: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
)

// Format time spent function has been moved to lib/utils.ts

const CountryList = () => {
  const { countryData } = useCountryData()
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'all' | 'continent'>('all')
  const [showAll, setShowAll] = useState(false)
  const [expandedContinents, setExpandedContinents] = useState<Record<string, boolean>>({
    'Europe': true,
    'Asia': true,
    'North America': true,
    'South America': true,
    'Africa': true,
    'Oceania': true,
    'Other': true
  })

  const INITIAL_DISPLAY_COUNT = 15

  // Process countries with memoization for performance
  const processedCountries = useMemo(() => {
    // Sort countries by time spent
    const sorted = Object.entries(countryData)
      .sort(([, dataA], [, dataB]) => dataB.timeSpent - dataA.timeSpent)
      .map(([code, data]) => ({
        code,
        name: getCountryName(code),
        flag: getCountryFlag(code),
        timeSpent: data.timeSpent,
        formattedTime: formatTimeSpent(data.timeSpent),
        visitCount: data.visitCount,
        continent: getContinent(code)
      }));

    // Filter by search if needed
    if (searchTerm) {
      return sorted.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return sorted;
  }, [countryData, searchTerm]);

  // Group by continent for the continent view
  const countriesByContinent = useMemo(() => {
    const grouped: Record<string, typeof processedCountries> = {};

    processedCountries.forEach(country => {
      if (!grouped[country.continent]) {
        grouped[country.continent] = [];
      }
      grouped[country.continent].push(country);
    });

    return grouped;
  }, [processedCountries]);

  // Toggle a continent's expanded state
  const toggleContinent = (continent: string) => {
    setExpandedContinents(prev => ({
      ...prev,
      [continent]: !prev[continent]
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Countries Visited</h3>
          <div className="text-sm text-muted-foreground">
            {processedCountries.length} countries
          </div>
        </div>

        <div className="mt-2 space-y-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search countries..."
              className="pl-8"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={(value: string) => setViewMode(value as 'all' | 'continent')}>
            <TabsList className="w-full">
              <TabsTrigger
                value="all"
                className={`flex-1 ${viewMode === 'all' ? 'bg-blue-900/50 text-blue-300' : ''}`}
                onClick={() => setViewMode('all')}
              >
                All Countries
              </TabsTrigger>
              <TabsTrigger
                value="continent"
                className={`flex-1 ${viewMode === 'continent' ? 'bg-blue-900/50 text-blue-300' : ''}`}
                onClick={() => setViewMode('continent')}
              >
                By Continent
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent>
        {processedCountries.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">
            No countries visited yet. Upload your travel data to see the list.
          </p>
        ) : (
          <div className="max-h-[400px] overflow-auto pr-2 custom-scrollbar">
            {viewMode === 'all' ? (
              // All countries view
              <div className="space-y-1">
                {(showAll ? processedCountries : processedCountries.slice(0, INITIAL_DISPLAY_COUNT)).map(country => (
                  <div key={country.code} className="flex justify-between items-center py-2 border-b border-gray-800 hover:bg-gray-900/30 rounded px-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl" role="img" aria-label={`${country.name} flag`}>
                        {country.flag}
                      </span>
                      <span className="font-medium">
                        {country.name}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {country.formattedTime}
                    </div>
                  </div>
                ))}

                {processedCountries.length > INITIAL_DISPLAY_COUNT && (
                  <Button
                    variant="ghost"
                    className="w-full mt-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? 'Show Less' : `Show All (${processedCountries.length})`}
                  </Button>
                )}
              </div>
            ) : (
              // Continent view
              <div className="space-y-3">
                {Object.entries(countriesByContinent).map(([continent, countries]) => (
                  <div key={continent} className="border border-gray-800 rounded-md overflow-hidden">
                    <div
                      className="flex justify-between items-center px-3 py-2 bg-gray-900 cursor-pointer"
                      onClick={() => toggleContinent(continent)}
                    >
                      <div className="font-medium flex items-center">
                        <Globe className="h-4 w-4 mr-2 text-blue-400" />
                        {continent} ({countries.length})
                      </div>
                      {expandedContinents[continent] ? (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      )}
                    </div>

                    {expandedContinents[continent] && (
                      <div className="divide-y divide-gray-800">
                        {countries.map(country => (
                          <div key={country.code} className="flex justify-between items-center p-2 hover:bg-gray-900/30">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl" role="img" aria-label={`${country.name} flag`}>
                                {country.flag}
                              </span>
                              <span>
                                {country.name}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {country.formattedTime}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CountryList 