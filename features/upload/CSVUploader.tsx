"use client"

import React, { useState } from 'react'
import Papa from 'papaparse'
import { Upload, FileUp } from 'lucide-react'
import { CountryVisitData, useCountryData } from '@/hooks/useCountryData'

const CSVUploader = () => {
  const [isUploading, setIsUploading] = useState(false)
  const { setCountryData } = useCountryData()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const parsedData: Record<string, CountryVisitData> = {}

        results.data.forEach((row: any) => {
          if (row.country_code && row.visit_days) {
            const countryCode = row.country_code
            const days = parseInt(row.visit_days, 10) || 0

            if (!parsedData[countryCode]) {
              parsedData[countryCode] = {
                visitCount: 1,
                timeSpent: days
              }
            } else {
              parsedData[countryCode].visitCount += 1
              parsedData[countryCode].timeSpent += days
            }
          }
        })

        setCountryData(parsedData)
        setIsUploading(false)
      },
      error: () => {
        setIsUploading(false)
      }
    })
  }

  return (
    <div className="relative rounded-lg border border-gray-700 p-6 w-full max-w-md">
      <label
        htmlFor="csv-upload"
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-3">
          {isUploading ? (
            <FileUp className="h-6 w-6 text-blue-400 animate-pulse" />
          ) : (
            <Upload className="h-6 w-6 text-blue-400" />
          )}
        </div>
        <h3 className="text-lg font-medium mb-1">Upload Travel Data</h3>
        <p className="text-sm text-gray-400 text-center mb-2">
          Upload a CSV file with country codes and visit days
        </p>
        <div className="text-xs text-gray-500">
          Format: country_code, visit_days
        </div>
      </label>
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
        aria-label="Upload CSV file"
      />
    </div>
  )
}

export default CSVUploader 