"use client"

import React, { useState, useEffect, useCallback } from 'react'
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
import { convertNumericToAlpha3, getCountryName, getCountryNameFromNumeric } from '@/lib/countryCodeMapping'

// Use a publicly available, reliable topojson source
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface TooltipInfo {
  countryName: string
  countryCode: string
  position: { x: number; y: number }
}

const WorldMap = () => {
  const { countryData, isUsingSampleData, loadSampleData } = useCountryData()
  const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [debugMode, setDebugMode] = useState(false)
  const [countryCodesFound, setCountryCodesFound] = useState<string[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)

  // Debug data structure
  useEffect(() => {
    if (Object.keys(countryData).length > 0) {
      console.log("CountryData:", countryData);
      console.log("CountryData keys:", Object.keys(countryData));
    }
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
    <div className="space-y-2">
      <div className="relative w-full aspect-[16/9] border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        ) : (
          <>
            <ComposableMap
              projection="geoEqualEarth"
              className="w-full h-full"
            >
              <ZoomableGroup zoom={1} center={[0, 0]}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) => {
                    // Collect country codes when map loads
                    if (mapLoaded && countryCodesFound.length === 0) {
                      collectCountryCodes(geographies);
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
                              setTooltipInfo({
                                countryName,
                                countryCode,
                                position: {
                                  x: e.clientX,
                                  y: e.clientY
                                }
                              })
                            }
                          }}
                          onMouseLeave={() => {
                            setTooltipInfo(null)
                          }}
                          style={{
                            default: {
                              outline: 'none',
                            },
                            hover: {
                              fill: visitIntensity > 0 ? `rgba(45, 85, 205, ${0.4 + visitIntensity * 0.6})` : "#333333",
                              outline: 'none',
                              cursor: 'pointer'
                            },
                            pressed: {
                              outline: 'none',
                            }
                          }}
                        />
                      )
                    });
                  }}
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

            {/* Sample data indicator */}
            {isUsingSampleData && (
              <div className="absolute top-2 right-2 bg-blue-900/70 text-blue-100 py-1 px-3 rounded-full text-xs flex items-center shadow-md">
                <InfoIcon className="h-3 w-3 mr-1" />
                <span>Sample Data</span>
              </div>
            )}

            {/* Debug toggle button */}
            <button
              onClick={toggleDebugMode}
              className="absolute bottom-2 right-2 bg-gray-800 text-gray-300 py-1 px-2 rounded text-xs"
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
    </div>
  )
}

export default WorldMap 