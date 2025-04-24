"use client"

import { create } from 'zustand'
import { useEffect } from 'react'
import Papa from 'papaparse'

export interface CountryVisitData {
  visitCount: number
  timeSpent: number // in days
}

interface CountryDataState {
  countryData: Record<string, CountryVisitData>
  isUsingSampleData: boolean
  setCountryData: (data: Record<string, CountryVisitData>, isSample?: boolean) => void
  updateCountry: (countryCode: string, data: CountryVisitData) => void
  loadSampleData: () => Promise<void>
}

// Function to normalize country codes
const normalizeCountryCode = (code: string): string => {
  if (!code) return '';
  return code.toUpperCase().trim();
}

export const useCountryData = create<CountryDataState>((set) => ({
  countryData: {},
  isUsingSampleData: false,
  setCountryData: (data, isSample = false) => set({
    countryData: data,
    isUsingSampleData: isSample
  }),
  updateCountry: (countryCode, data) =>
    set((state) => ({
      countryData: {
        ...state.countryData,
        [countryCode]: data
      }
    })),
  loadSampleData: async () => {
    try {
      const basePath = process.env.NODE_ENV === 'production' ? '/map-life' : '';
      const response = await fetch(`${basePath}/sample_data.csv`);
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          const parsedData: Record<string, CountryVisitData> = {};

          results.data.forEach((row: any) => {
            if (row.country_code && row.visit_days) {
              // Normalize country code for consistency
              const countryCode = normalizeCountryCode(row.country_code);
              const days = parseInt(row.visit_days, 10) || 0;

              if (!parsedData[countryCode]) {
                parsedData[countryCode] = {
                  visitCount: 1,
                  timeSpent: days
                };
              } else {
                parsedData[countryCode].visitCount += 1;
                parsedData[countryCode].timeSpent += days;
              }
            }
          });

          console.log("Loaded sample data:", parsedData);

          set({
            countryData: parsedData,
            isUsingSampleData: true
          });
        },
        error: (error: Error | string) => {
          console.error("Error loading sample data:", error);
        }
      });
    } catch (error) {
      console.error('Failed to load sample data:', error);
    }
  }
})) 