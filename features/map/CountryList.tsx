"use client"

import React, { useState, useMemo } from 'react'
import { CountryVisitData, useCountryData } from '@/hooks/useCountryData'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Search, Globe, ChevronDown, ChevronUp } from 'lucide-react'
import { getCountryName, getCountryFlag, getContinent } from '@/lib/countryCodeMapping'
import { formatTimeSpent } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/lib/ThemeContext'

// A simplified input component
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  const { theme } = useTheme()

  return (
    <input
      className={`flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors duration-100 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${theme === 'dark'
        ? 'border-gray-700 bg-gray-800 text-gray-100 placeholder:text-gray-500'
        : 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400'
        } ${className}`}
      {...props}
    />
  )
}

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

const TabsList = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const { theme } = useTheme()

  return (
    <div className={`inline-flex h-9 items-center justify-center rounded-lg p-1 transition-colors duration-100 ${theme === 'dark'
      ? 'bg-gray-800 text-gray-400'
      : 'bg-gray-200 text-gray-600'
      } ${className}`}>
      {children}
    </div>
  )
}

const TabsTrigger = ({ value, className, children, onClick }: {
  value: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <motion.button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ${className}`}
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
  >
    {children}
  </motion.button>
)

// Animation variants
const listItemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.1
    }
  },
  exit: { opacity: 0, transition: { duration: 0.05 } }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.15,
      when: "beforeChildren"
    }
  }
}

const CountryList = () => {
  const { theme } = useTheme()
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

  // Get hover background color based on theme
  const getHoverBgColor = () => {
    return theme === 'dark'
      ? 'rgba(59, 130, 246, 0.08)'
      : 'rgba(59, 130, 246, 0.05)';
  };

  return (
    <Card className="w-full transition-colors duration-100">
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
                className={`flex-1 ${viewMode === 'all' ? 'bg-blue-900/50 text-blue-300 dark:bg-blue-900/50 dark:text-blue-300 bg-blue-500/50 text-blue-800' : ''}`}
                onClick={() => setViewMode('all')}
              >
                All Countries
              </TabsTrigger>
              <TabsTrigger
                value="continent"
                className={`flex-1 ${viewMode === 'continent' ? 'bg-blue-900/50 text-blue-300 dark:bg-blue-900/50 dark:text-blue-300 bg-blue-500/50 text-blue-800' : ''}`}
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
          <motion.p
            className="text-muted-foreground text-sm text-center py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No countries visited yet. Upload your travel data to see the list.
          </motion.p>
        ) : (
          <div className="max-h-[400px] overflow-auto pr-2 custom-scrollbar">
            <AnimatePresence mode="wait" key={theme}>
              {viewMode === 'all' ? (
                // All countries view
                <motion.div
                  className="space-y-1"
                  key={`all-countries-${theme}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {(showAll ? processedCountries : processedCountries.slice(0, INITIAL_DISPLAY_COUNT)).map((country, index) => (
                    <motion.div
                      key={`${country.code}-${theme}`}
                      className={`flex justify-between items-center py-2 border-b rounded px-2 ${theme === 'dark'
                        ? 'border-gray-800 bg-transparent hover:bg-gray-900/30'
                        : 'border-gray-200 bg-transparent hover:bg-gray-50'
                        }`}
                      custom={index}
                      variants={listItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0 }}
                      whileHover={{ x: 3 }}
                    >
                      <div className="flex items-center space-x-2">
                        <motion.span
                          className="text-xl"
                          role="img"
                          aria-label={`${country.name} flag`}
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.05 + 0.1 }}
                        >
                          {country.flag}
                        </motion.span>
                        <span className="font-medium">
                          {country.name}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {country.formattedTime}
                      </div>
                    </motion.div>
                  ))}

                  {processedCountries.length > INITIAL_DISPLAY_COUNT && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex justify-center mt-2"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAll(!showAll)}
                        className={`flex items-center space-x-1 ${theme === 'dark'
                          ? 'border-gray-700 hover:bg-gray-800'
                          : 'border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        <span>{showAll ? 'Show Less' : `Show All (${processedCountries.length})`}</span>
                        {showAll ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                // Continent view with theme in key
                <motion.div
                  className="space-y-4"
                  key={`continent-view-${theme}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {Object.entries(countriesByContinent).map(([continent, countries]) => (
                    <div key={`${continent}-${theme}`} className="space-y-1">
                      <button
                        onClick={() => toggleContinent(continent)}
                        className={`flex justify-between items-center w-full py-2 px-2 rounded font-medium text-sm transition-colors duration-100 ${theme === 'dark'
                          ? 'bg-gray-800 hover:bg-gray-700'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                          }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Globe className="h-3.5 w-3.5" />
                          <span>{continent}</span>
                          <span className="text-xs font-normal opacity-70">({countries.length})</span>
                        </div>
                        {expandedContinents[continent] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>

                      <AnimatePresence key={`continent-${continent}-${theme}`}>
                        {expandedContinents[continent] && (
                          <motion.div
                            className="ml-2 space-y-1 pt-1"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {countries.map((country, index) => (
                              <motion.div
                                key={`${country.code}-${theme}`}
                                className={`flex justify-between items-center py-2 border-b rounded px-2 ${theme === 'dark'
                                  ? 'border-gray-800 bg-transparent hover:bg-gray-900/30'
                                  : 'border-gray-200 bg-transparent hover:bg-gray-50'
                                  }`}
                                custom={index}
                                variants={listItemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0 }}
                                whileHover={{ x: 3 }}
                              >
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
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CountryList 