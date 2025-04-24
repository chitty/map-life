"use client"

import { create } from 'zustand'

export interface CountryVisitData {
  visitCount: number
  timeSpent: number // in days
}

interface CountryDataState {
  countryData: Record<string, CountryVisitData>
  setCountryData: (data: Record<string, CountryVisitData>) => void
  updateCountry: (countryCode: string, data: CountryVisitData) => void
}

export const useCountryData = create<CountryDataState>((set) => ({
  countryData: {},
  setCountryData: (data) => set({ countryData: data }),
  updateCountry: (countryCode, data) =>
    set((state) => ({
      countryData: {
        ...state.countryData,
        [countryCode]: data
      }
    }))
})) 