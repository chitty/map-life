"use client"

import React from 'react'
import { CountryVisitData } from '@/hooks/useCountryData'
import { formatTimeSpent } from '@/lib/utils'
import { motion } from 'framer-motion'
import styles from './CountryTooltip.module.css'
import { useTheme } from '@/lib/ThemeContext'

interface CountryTooltipProps {
  countryName: string
  countryCode: string
  visitData: CountryVisitData
  position: { x: number; y: number }
}

const tooltipVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 10
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
      mass: 0.5
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 10,
    transition: {
      duration: 0.15
    }
  }
}

const CountryTooltip = ({ countryName, countryCode, visitData, position }: CountryTooltipProps) => {
  const { theme } = useTheme()
  const hasData = visitData && visitData.timeSpent > 0;

  const tooltipTheme = theme === 'dark'
    ? styles.tooltipDark
    : styles.tooltipLight;

  return (
    <motion.div
      className={`${styles.tooltip} ${tooltipTheme}`}
      style={{
        left: position.x,
        top: position.y
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={tooltipVariants}
      layoutId="tooltip"
    >
      <div className={styles.header}>
        <h3 className={styles.countryName}>{countryName || "Unknown"}</h3>
        <motion.span
          className={`${styles.countryCode} ${hasData ? styles.countryCodeActive : styles.countryCodeInactive}`}
          whileHover={{ scale: 1.05 }}
        >
          {countryCode || "N/A"}
        </motion.span>
      </div>

      <div className={styles.content}>
        {hasData ? (
          <>
            <motion.div
              className={styles.dataRow}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span>{formatTimeSpent(visitData.timeSpent)}</span>
            </motion.div>
          </>
        ) : (
          <motion.div
            className={styles.noData}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            No visit data
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default CountryTooltip 