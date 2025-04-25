"use client"

import React from 'react'
import { useCountryData } from '@/hooks/useCountryData'
import { Card, CardContent } from '@/components/ui/card'
import { Globe, CalendarDays, Map } from 'lucide-react'
import { motion } from 'framer-motion'

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

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <StatsCard
        icon={<Globe className="h-5 w-5 text-blue-400" />}
        title="Countries"
        value={stats.countries.toString()}
        subtext={`${stats.percentageOfWorld.toFixed(1)}% of the world`}
        delay={0}
      />

      <StatsCard
        icon={<CalendarDays className="h-5 w-5 text-green-400" />}
        title="Days Traveled"
        value={stats.totalDays.toString()}
        subtext={`${(stats.totalDays / 365).toFixed(1)} years`}
        delay={0.1}
      />

      <StatsCard
        icon={<Map className="h-5 w-5 text-purple-400" />}
        title="Avg Per Country"
        value={stats.countries > 0 ? Math.round(stats.totalDays / stats.countries).toString() : "0"}
        subtext="days per country"
        delay={0.2}
      />
    </motion.div>
  )
}

interface StatsCardProps {
  icon: React.ReactNode
  title: string
  value: string
  subtext: string
  delay: number
}

// Animation variants for each card
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  }
}

// Animation for the counter
const counterVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      delay: 0.1,
      duration: 0.8
    }
  }
}

const StatsCard = ({ icon, title, value, subtext, delay }: StatsCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2 mb-2">
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: delay + 0.2, type: "spring", stiffness: 260, damping: 20 }}
            >
              {icon}
            </motion.div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          <div className="space-y-1">
            <motion.p
              className="text-2xl font-bold"
              variants={counterVariants}
            >
              {value}
            </motion.p>
            <motion.p
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: delay + 0.4, duration: 0.4 }}
            >
              {subtext}
            </motion.p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default StatsCounter 