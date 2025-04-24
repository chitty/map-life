"use client"

import React, { useState } from 'react'
import Papa from 'papaparse'
import { Upload, FileUp, Check } from 'lucide-react'
import { CountryVisitData, useCountryData } from '@/hooks/useCountryData'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const CSVUploader = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const { setCountryData, loadSampleData } = useCountryData()

  // Function to normalize country codes
  const normalizeCountryCode = (code: string): string => {
    if (!code) return '';
    return code.toUpperCase().trim();
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setIsSuccess(false)
    setFileName(file.name)

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const parsedData: Record<string, CountryVisitData> = {}

        results.data.forEach((row: any) => {
          if (row.country_code && row.visit_days) {
            const countryCode = normalizeCountryCode(row.country_code)
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

        console.log("Parsed CSV data:", parsedData);

        // Set isUserUploaded to false to indicate this is user data
        setCountryData(parsedData, false)
        setIsUploading(false)
        setIsSuccess(true)
      },
      error: (error) => {
        console.error("CSV parsing error:", error);
        setIsUploading(false)
        setIsSuccess(false)
      }
    })
  }

  const loadSampleDataHandler = () => {
    setIsUploading(true)
    setIsSuccess(false)
    setFileName("sample_data.csv")

    loadSampleData().then(() => {
      setIsUploading(false)
      setIsSuccess(true)
    })
  }

  const resetFileInput = () => {
    setFileName(null)
    setIsSuccess(false)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h3 className="text-lg font-medium">Upload Travel Data</h3>
        <p className="text-sm text-muted-foreground">
          Upload a CSV file with country codes and visit days
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-700 rounded-md bg-gray-900/50 overflow-hidden relative">
          {isSuccess ? (
            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-green-900/30 p-2">
                <Check className="h-5 w-5 text-green-400" />
              </div>
              <span className="text-sm text-green-400">{fileName} uploaded successfully</span>
            </div>
          ) : (
            <>
              <label
                htmlFor="csv-upload"
                className="flex flex-col items-center justify-center cursor-pointer h-full w-full"
              >
                <div className="rounded-full bg-blue-900/30 p-2 mb-2">
                  {isUploading ? (
                    <FileUp className="h-5 w-5 text-blue-400 animate-pulse" />
                  ) : (
                    <Upload className="h-5 w-5 text-blue-400" />
                  )}
                </div>
                <span className="text-sm text-center px-4">
                  {fileName ? fileName : "Click to browse or drag & drop"}
                </span>
              </label>
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                aria-label="Upload CSV file"
              />
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs text-gray-500">
        <span>Format: country_code, visit_days</span>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={loadSampleDataHandler}
            className="text-blue-400 hover:text-blue-300"
          >
            Load Sample Data
          </Button>
          {isSuccess && (
            <Button variant="ghost" size="sm" onClick={resetFileInput}>
              Upload Another
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

export default CSVUploader 