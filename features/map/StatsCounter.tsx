"use client"

import React from 'react'
import { useCountryData } from '@/hooks/useCountryData'
import { Card, CardContent } from '@/components/ui/card'
import { Globe, CalendarDays, Map } from 'lucide-react'

const StatsCounter = () => {
  const { countryData } = useCountryData()

  const stats = React.useMemo(() => {
    const countries = Object.keys(countryData)
    const totalDays = Object.values(countryData).reduce(
      (total, { timeSpent }) => total + timeSpent,
      0
    )

    return {
      countries: countries.length,
      totalDays,
      percentageOfWorld: (countries.length / 249) * 100 // Approximately 249 countries in the world
    }
  }, [countryData])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      <StatsCard
        icon={<Globe className="h-5 w-5 text-blue-400" />}
        title="Countries"
        value={stats.countries.toString()}
        subtext={`${stats.percentageOfWorld.toFixed(1)}% of the world`}
      />

      <StatsCard
        icon={<CalendarDays className="h-5 w-5 text-green-400" />}
        title="Days Traveled"
        value={stats.totalDays.toString()}
        subtext={`${(stats.totalDays / 365).toFixed(1)} years`}
      />

      <StatsCard
        icon={<Map className="h-5 w-5 text-purple-400" />}
        title="Avg Per Country"
        value={stats.countries > 0 ? Math.round(stats.totalDays / stats.countries).toString() : "0"}
        subtext="days per country"
      />
    </div>
  )
}

interface StatsCardProps {
  icon: React.ReactNode
  title: string
  value: string
  subtext: string
}

const StatsCard = ({ icon, title, value, subtext }: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-2 mb-2">
          {icon}
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{subtext}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCounter 