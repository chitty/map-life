"use client"

import React from 'react'
import { CountryVisitData } from '@/hooks/useCountryData'
import styles from './CountryTooltip.module.css'

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
      className={styles.tooltip}
      style={{
        left: position.x,
        top: position.y
      }}
    >
      <div className={styles.header}>
        <h3 className={styles.countryName}>{countryName || "Unknown"}</h3>
        <span className={`${styles.countryCode} ${hasData ? styles.countryCodeActive : styles.countryCodeInactive}`}>
          {countryCode || "N/A"}
        </span>
      </div>

      <div className={styles.content}>
        {hasData ? (
          <>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Visits:</span>
              <span>{visitData.visitCount}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Days Spent:</span>
              <span>{visitData.timeSpent}</span>
            </div>
            <div className={styles.dataRow}>
              <span className={styles.dataLabel}>Time Ratio:</span>
              <span>{((visitData.timeSpent / 365) * 100).toFixed(1)}%</span>
            </div>
          </>
        ) : (
          <div className={styles.noData}>
            No visit data
          </div>
        )}
      </div>
    </div>
  )
}

export default CountryTooltip 