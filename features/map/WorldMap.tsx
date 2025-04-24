"use client"

import React from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps'
import { useCountryData } from '@/hooks/useCountryData'

const geoUrl = '/data/world-50m-simplified.json'

const WorldMap = () => {
  const { countryData } = useCountryData()

  return (
    <div className="relative w-full aspect-[16/9] border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
      <ComposableMap
        projection="geoEqualEarth"
        className="w-full h-full"
      >
        <ZoomableGroup zoom={1} center={[0, 0]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryCode = geo.properties.ISO_A3
                const visitData = countryData[countryCode] || { visitCount: 0, timeSpent: 0 }
                const visitIntensity = visitData.timeSpent > 0
                  ? Math.min(1, visitData.timeSpent / 365)
                  : 0

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={visitIntensity > 0 ? `rgba(65, 105, 225, ${0.3 + visitIntensity * 0.7})` : "#141414"}
                    stroke="#FFFFFF"
                    strokeWidth={0.3}
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
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}

export default WorldMap 