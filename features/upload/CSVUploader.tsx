"use client"

import React, { useState, useRef, useEffect } from 'react'
import Papa from 'papaparse'
import { Upload, FileUp, Check, AlertCircle, Info, XCircle } from 'lucide-react'
import { CountryVisitData, useCountryData } from '@/hooks/useCountryData'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { getCountryName } from '@/lib/countryCodeMapping'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useTheme } from '@/lib/ThemeContext'

const CSVUploader = () => {
  const { theme } = useTheme()
  const [isUploading, setIsUploading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [warnings, setWarnings] = useState<string[]>([])
  const [isSampleData, setIsSampleData] = useState(false)
  const { setCountryData, loadSampleData } = useCountryData()

  // For scrolling to the map when data is loaded
  const mapRef = useRef<HTMLDivElement | null>(null)

  // Find the map ref once after component mounts
  useEffect(() => {
    mapRef.current = document.querySelector('#map-section')
  }, [])

  // Function to trigger confetti
  const triggerConfetti = () => {
    // Purple/pink colors that complement the blue theme
    const confettiColors = ['#FF73FA', '#E040FB', '#D500F9', '#AA00FF', '#7C4DFF'];
    const duration = 1.5 * 1000; // 1.5 seconds duration
    const end = Date.now() + duration;

    // Initial burst from bottom
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7, x: 0.5 },
      colors: confettiColors,
    });

    // Multiple bursts from different directions
    setTimeout(() => {
      // Left side burst
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 50,
        origin: { x: 0, y: 0.5 },
        colors: confettiColors,
      });

      // Right side burst
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 50,
        origin: { x: 1, y: 0.5 },
        colors: confettiColors,
      });
    }, 200);
  };

  // Function to normalize country codes
  const normalizeCountryCode = (code: string): string => {
    if (!code) return '';
    return code.toUpperCase().trim();
  }

  // Scroll to the map and trigger confetti when data is loaded
  useEffect(() => {
    if (isSuccess && mapRef.current) {
      setTimeout(() => {
        mapRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })

        // Only trigger confetti for user uploads, not sample data
        if (!isSampleData) {
          triggerConfetti();
        }
      }, 500) // Restored to original faster scroll
    }
  }, [isSuccess, isSampleData])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setIsSuccess(false)
    setError(null)
    setWarnings([])
    setFileName(file.name)
    setIsSampleData(false)

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const parsedData: Record<string, CountryVisitData> = {}
        const newWarnings: string[] = []

        // Check for required columns
        const requiredColumns = ['country_code', 'visit_days']
        const missingColumns = requiredColumns.filter(col => !results.meta.fields?.includes(col))

        if (missingColumns.length > 0) {
          setError(`The CSV file is missing required columns: ${missingColumns.join(', ')}`)
          setIsUploading(false)
          return
        }

        // Check if there's any data
        if (results.data.length === 0) {
          setError('The CSV file appears to be empty. Please upload a file with travel data.')
          setIsUploading(false)
          return
        }

        // Process each row
        let rowErrors = 0
        results.data.forEach((row: any, index: number) => {
          if (!row.country_code) {
            rowErrors++
            return
          }

          const countryCode = normalizeCountryCode(row.country_code)
          let days = parseInt(row.visit_days, 10) || 0

          // Handle negative visit days
          if (days < 0) {
            const countryName = getCountryName(countryCode) || countryCode
            newWarnings.push(`${countryName}: Negative visit days (${days}) set to 0`)
            days = 0
          }

          if (!parsedData[countryCode]) {
            parsedData[countryCode] = {
              visitCount: 1,
              timeSpent: days
            }
          } else {
            parsedData[countryCode].visitCount += 1
            parsedData[countryCode].timeSpent += days
          }
        })

        // Handle the case where all rows had errors
        if (Object.keys(parsedData).length === 0) {
          setError('No valid country data found in the CSV file. Please check the format.')
          setIsUploading(false)
          return
        }

        // Log warnings if some rows had errors
        if (rowErrors > 0) {
          newWarnings.push(`${rowErrors} row(s) skipped due to missing country codes`)
        }

        console.log("Parsed CSV data:", parsedData);

        // Set warnings if any
        if (newWarnings.length > 0) {
          setWarnings(newWarnings)
        }

        // Set isUserUploaded to false to indicate this is user data
        setCountryData(parsedData, false)
        setIsUploading(false)
        setIsSuccess(true)
      },
      error: (parseError) => {
        console.error("CSV parsing error:", parseError);
        setError(`Failed to parse CSV: ${parseError.message}`)
        setIsUploading(false)
        setIsSuccess(false)
      }
    })
  }

  const loadSampleDataHandler = () => {
    setIsUploading(true)
    setIsSuccess(false)
    setError(null)
    setWarnings([])
    setFileName("sample_data.csv")
    setIsSampleData(true)

    loadSampleData().then(() => {
      setIsUploading(false)
      setIsSuccess(true)
    })
  }

  const resetFileInput = () => {
    setFileName(null)
    setIsSuccess(false)
    setError(null)
    setWarnings([])
    setIsSampleData(false)
  }

  // Animation variants
  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  }

  const uploadBoxVariants = {
    idle: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  }

  // Get appropriate border and background colors based on theme
  const getUploadBoxClasses = () => {
    if (error) {
      return theme === 'dark'
        ? 'border-red-700 bg-red-900/10'
        : 'border-red-300 bg-red-50';
    }

    if (isSuccess) {
      return theme === 'dark'
        ? 'border-green-700 bg-green-900/10'
        : 'border-green-300 bg-green-50';
    }

    return theme === 'dark'
      ? 'border-gray-700 bg-gray-900/50 hover:border-blue-700 hover:bg-blue-900/10'
      : 'border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50';
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={cardVariants}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <h3 className="text-lg font-medium">Upload Travel Data</h3>
          <p className="text-sm text-muted-foreground">
            Upload a CSV file with country codes and visit days
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <motion.div
            className={`flex items-center justify-center h-24 border-2 border-dashed rounded-md overflow-hidden relative transition-colors ${getUploadBoxClasses()}`}
            variants={uploadBoxVariants}
            initial="idle"
            whileHover={!isSuccess && !error ? "hover" : "idle"}
            whileTap={{ scale: isSuccess || error ? 1 : 0.98 }}
          >
            {isSuccess ? (
              <motion.div
                className="flex flex-col items-center space-y-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <div className={`rounded-full p-2 ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'}`}>
                  <Check className={`h-5 w-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                  {fileName} uploaded successfully
                </span>
              </motion.div>
            ) : error ? (
              <motion.div
                className="flex flex-col items-center space-y-2"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <div className={`rounded-full p-2 ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100'}`}>
                  <XCircle className={`h-5 w-5 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <span className={`text-sm ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                  Upload failed
                </span>
              </motion.div>
            ) : (
              <>
                <label
                  htmlFor="csv-upload"
                  className="flex flex-col items-center justify-center cursor-pointer h-full w-full"
                >
                  <motion.div
                    className={`rounded-full p-2 mb-2 ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isUploading ? (
                      <FileUp className={`h-5 w-5 animate-pulse ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    ) : (
                      <Upload className={`h-5 w-5 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                    )}
                  </motion.div>
                  <span className={`text-sm text-center px-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
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
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Alert
                  variant="destructive"
                  className={`border-l-4 border-l-red-500 ${theme === 'dark'
                    ? 'bg-red-950 text-red-200'
                    : 'bg-red-50 text-red-800'
                    }`}
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="flex items-center">Error</AlertTitle>
                  <AlertDescription>
                    <p className="mt-1">{error}</p>
                    <p className={`mt-2 text-xs ${theme === 'dark' ? 'text-red-300' : 'text-red-600'}`}>
                      Make sure your CSV file has the required columns: <span className="font-mono font-bold">country_code</span> and <span className="font-mono font-bold">visit_days</span>
                    </p>
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {warnings.length > 0 && isSuccess && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Alert className={`border-l-4 border-l-amber-500 ${theme === 'dark'
                  ? 'bg-amber-900/20 text-amber-400 border-amber-800'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Important Notes</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                      {warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {isSuccess && !warnings.length && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Alert className={`border-l-4 border-l-green-500 ${theme === 'dark'
                  ? 'bg-green-900/20 text-green-400 border-green-800'
                  : 'bg-green-50 text-green-800 border-green-200'
                  }`}>
                  <Check className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    {isSampleData
                      ? "Sample travel data has been loaded and is now displayed on the map."
                      : "Your travel data has been successfully imported and is now displayed on the map."}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-col">
            <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>Required format:</span>
            <span className={`font-mono mt-1 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>country_code, visit_days</span>
          </div>
          <div className="flex space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={loadSampleDataHandler}
                className={`${theme === 'dark'
                  ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/20'
                  : 'text-blue-600 hover:text-blue-700 hover:bg-blue-100'
                  }`}
              >
                Load Sample Data
              </Button>
            </motion.div>
            {(isSuccess || error) && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFileInput}
                  className={`${theme === 'dark'
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  Upload Another
                </Button>
              </motion.div>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default CSVUploader 