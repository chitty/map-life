"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps'
import { useCountryData } from '@/hooks/useCountryData'
import MapLegend from './MapLegend'
import CountryTooltip from './CountryTooltip'
import { InfoIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { convertNumericToAlpha3, getCountryName, getCountryNameFromNumeric } from '@/lib/countryCodeMapping'

// Use a publicly available, reliable topojson source
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface TooltipInfo {
  countryName: string
  countryCode: string
  position: { x: number; y: number }
}

// Animation variants
const badgeVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
}

const mapContainerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
}

const WorldMap = () => {
  const { countryData, isUsingSampleData, loadSampleData } = useCountryData()
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [debugMode, setDebugMode] = useState(false)
  const [countryCodesFound, setCountryCodesFound] = useState<string[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const geographiesRef = useRef<any[]>([]);
  const prevCountryDataRef = useRef<typeof countryData>({});

  // Track transitions when country data changes
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Collect all country codes
  const collectCountryCodes = useCallback((geographies: any[]) => {
    if (!geographies || geographies.length === 0) return;

    const codes = geographies.map(geo => {
      // First try to get the numeric code
      const numericCode = geo.id || '';

      // Then convert to alpha-3 for display and consistency
      return convertNumericToAlpha3(numericCode);
    }).filter(Boolean);

    setCountryCodesFound(Array.from(new Set(codes)));
  }, []);

  // Debug data structure
  useEffect(() => {
    if (Object.keys(countryData).length > 0) {
      console.log("CountryData:", countryData);
      console.log("CountryData keys:", Object.keys(countryData));
    }
  }, [countryData]);

  // Detect changes in country data to trigger transitions
  useEffect(() => {
    const prevKeys = Object.keys(prevCountryDataRef.current);
    const currentKeys = Object.keys(countryData);

    // If the keys are different or there are new values
    if (
      prevKeys.length !== currentKeys.length ||
      currentKeys.some(key =>
        !prevCountryDataRef.current[key] ||
        prevCountryDataRef.current[key].timeSpent !== countryData[key].timeSpent
      )
    ) {
      // Only trigger transition if we already had data before
      if (prevKeys.length > 0) {
        setIsTransitioning(true);

        // Reset after transition completes
        const timer = setTimeout(() => {
          setIsTransitioning(false);
        }, 800); // Slightly longer than the CSS transition

        return () => clearTimeout(timer);
      }
    }

    // Update ref with current data
    prevCountryDataRef.current = { ...countryData };
  }, [countryData]);

  // Log all country codes found in map data
  useEffect(() => {
    if (countryCodesFound.length > 0 && Object.keys(countryData).length > 0) {
      console.log("Map country codes found:", countryCodesFound);

      // Analyze overlap between map data and country data
      const countryDataKeys = Object.keys(countryData);
      const overlap = countryCodesFound.filter(code => countryDataKeys.includes(code));
      console.log("Matching country codes:", overlap);

      // Find country codes in data that don't appear in the map
      const missingInMap = countryDataKeys.filter(code => !countryCodesFound.includes(code));
      console.log("Country codes in data but missing in map:", missingInMap);
    }
  }, [countryCodesFound, countryData]);

  // Load sample data on mount if no data is present
  useEffect(() => {
    if (Object.keys(countryData).length === 0) {
      loadSampleData();
    }
  }, [countryData, loadSampleData]);

  // Set map as loaded
  useEffect(() => {
    setMapLoaded(true);
  }, []);

  // Collect country codes when map and geographies are loaded
  useEffect(() => {
    if (mapLoaded && countryCodesFound.length === 0 && geographiesRef.current.length > 0) {
      collectCountryCodes(geographiesRef.current);
    }
  }, [mapLoaded, countryCodesFound.length, collectCountryCodes]);

  // Function to get country property safely
  const getCountryProperty = (geo: any, propName: string): string => {
    if (!geo || !geo.properties) return '';

    // Try different property mappings as different GeoJSON sources use different schemas
    if (geo.properties[propName]) return geo.properties[propName];

    // Common mappings
    const mappings: { [key: string]: string[] } = {
      'ISO_A3': ['iso_a3', 'ISO3', 'id', 'ISO_A3', 'Alpha-3'],
      'NAME': ['name', 'NAME', 'ADMIN', 'admin', 'Country']
    };

    if (mappings[propName]) {
      for (const alt of mappings[propName]) {
        if (geo.properties[alt]) return geo.properties[alt];
      }
    }

    // Fallbacks
    if (propName === 'ISO_A3' && geo.id) return geo.id;

    return '';
  };

  // Toggle debug mode
  const toggleDebugMode = () => {
    setDebugMode(!debugMode);
  };

  // Fix map display issue by directly matching with known country codes
  const getCountryData = (countryCode: string) => {
    // Skip empty values
    if (!countryCode) return { visitCount: 0, timeSpent: 0 };

    // Try direct match
    if (countryData[countryCode]) {
      return countryData[countryCode];
    }

    // Try different casing
    const codeUpper = countryCode.toUpperCase();
    if (countryData[codeUpper]) {
      return countryData[codeUpper];
    }

    // Common country code mappings
    const codeMap: Record<string, string[]> = {
      'USA': ['US', 'USA', 'United States', '840'],
      'GBR': ['GB', 'UK', 'GBR', 'United Kingdom', '826'],
      'FRA': ['FR', 'FRA', 'France', '250'],
      'DEU': ['DE', 'GER', 'DEU', 'Germany', '276'],
      'JPN': ['JP', 'JPN', 'Japan', '392'],
      'CAN': ['CA', 'CAN', 'Canada', '124'],
      'AUS': ['AU', 'AUS', 'Australia', '036'],
      'NZL': ['NZ', 'NZL', 'New Zealand', '554'],
      'ESP': ['ES', 'ESP', 'Spain', '724'],
      'ITA': ['IT', 'ITA', 'Italy', '380'],
    };

    // Try mapped versions
    for (const [key, alternatives] of Object.entries(codeMap)) {
      if (alternatives.includes(countryCode)) {
        if (countryData[key]) return countryData[key];
      }

      if (countryCode === key) {
        for (const alt of alternatives) {
          if (countryData[alt]) return countryData[alt];
        }
      }
    }

    // Not found
    return { visitCount: 0, timeSpent: 0 };
  };

  return (
    <motion.div
      className="space-y-2"
      initial="initial"
      animate="animate"
      variants={mapContainerVariants}
    >
      <div className="relative w-full aspect-[16/9] border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        ) : (
          <>
            <ComposableMap
              projection="geoMercator"
              className={`w-full h-full transition-opacity duration-300 ${isTransitioning ? 'opacity-80' : 'opacity-100'}`}
            >
              <ZoomableGroup zoom={1} minZoom={0.8} center={[0, 40]}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) => {
                    // Store geographies in a ref without triggering re-renders
                    if (geographies.length > 0 && geographiesRef.current.length === 0) {
                      geographiesRef.current = geographies;
                    }

                    return geographies.map((geo) => {
                      // Use the numeric code from the geo data
                      const numericCode = geo.id || '';

                      // Convert to alpha-3 for display and matching with our data
                      const countryCode = convertNumericToAlpha3(numericCode);
                      const countryName = getCountryProperty(geo, 'NAME') || getCountryNameFromNumeric(numericCode);

                      // Get visit data with more flexible matching
                      const visitData = getCountryData(countryCode);

                      const visitIntensity = visitData.timeSpent > 0
                        ? Math.min(1, visitData.timeSpent / 365)
                        : 0

                      // In debug mode, log problematic countries
                      if (debugMode && countryCode && Object.keys(countryData).includes(countryCode)) {
                        console.log(`Country match: ${countryCode} - ${countryName} - Days: ${visitData.timeSpent}`);
                      }

                      return (
                        <Geography
                          key={geo.rsmKey || countryCode}
                          geography={geo}
                          fill={visitIntensity > 0 ? `rgba(65, 105, 225, ${0.3 + visitIntensity * 0.7})` : "#141414"}
                          stroke="#FFFFFF"
                          strokeWidth={0.3}
                          onMouseEnter={(e) => {
                            // Always show tooltip in debug mode
                            if (debugMode || visitData.timeSpent > 0) {
                              // Use mouse position directly - simplest approach
                              setTooltipInfo({
                                countryName,
                                countryCode,
                                position: {
                                  x: e.clientX,
                                  y: e.clientY
                                },
                              })
                            }
                          }}
                          onMouseLeave={() => {
                            setTooltipInfo(null)
                          }}
                          style={{
                            default: {
                              outline: 'none',
                              transition: 'all 0.5s ease-in-out'
                            },
                            hover: {
                              fill: visitIntensity > 0 ? `rgba(45, 85, 205, ${0.4 + visitIntensity * 0.6})` : "#333333",
                              outline: 'none',
                              cursor: 'pointer',
                              transform: visitIntensity > 0 ? 'translateY(-2px)' : 'none',
                              stroke: visitIntensity > 0 ? '#FFF' : '#555',
                              strokeWidth: visitIntensity > 0 ? 0.5 : 0.3,
                            },
                            pressed: {
                              outline: 'none',
                              fill: visitIntensity > 0 ? `rgba(25, 65, 185, ${0.5 + visitIntensity * 0.5})` : "#444444",
                              transform: 'scale(0.98)',
                            }
                          }}
                          className={`transition-colors duration-700 ${isTransitioning ? 'opacity-80' : 'opacity-100'}`}
                        />
                      )
                    });
                  }}
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

            {/* Data source indicators with animations */}
            <AnimatePresence>
              {isUsingSampleData && (
                <motion.div
                  className="absolute top-2 right-2 bg-blue-900/70 text-blue-100 py-1 px-3 rounded-full text-xs flex items-center shadow-md"
                  variants={badgeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <InfoIcon className="h-3 w-3 mr-1" />
                  <span>Sample Data</span>
                </motion.div>
              )}

              {!isUsingSampleData && Object.keys(countryData).length > 0 && (
                <motion.div
                  className="absolute top-2 right-2 bg-emerald-900/70 text-emerald-100 py-1 px-3 rounded-full text-xs flex items-center shadow-md"
                  variants={badgeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <InfoIcon className="h-3 w-3 mr-1" />
                  <span>Personal Data</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Debug toggle button */}
            <button
              onClick={toggleDebugMode}
              className="absolute bottom-2 right-2 bg-gray-800 hover:bg-gray-700 text-gray-300 py-1 px-2 rounded text-xs transition-colors duration-200"
            >
              {debugMode ? 'Debug On' : 'Debug Off'}
            </button>
          </>
        )}

        {tooltipInfo && (debugMode || getCountryData(tooltipInfo.countryCode).timeSpent > 0) && (
          <CountryTooltip
            countryName={tooltipInfo.countryName}
            countryCode={tooltipInfo.countryCode}
            visitData={getCountryData(tooltipInfo.countryCode)}
            position={tooltipInfo.position}
          />
        )}
      </div>
      <MapLegend />
    </motion.div>
  )
}

export default WorldMap 