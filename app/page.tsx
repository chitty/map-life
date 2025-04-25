export const dynamic = 'force-static'

import WorldMap from '@/features/map/WorldMap'
import CSVUploader from '@/features/upload/CSVUploader'
import StatsCounter from '@/features/map/StatsCounter'
import CountryList from '@/features/map/CountryList'

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Map Your Travels</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Visualize where in the world you&apos;ve been and for how long with an interactive map.
          Upload your travel data to see it come to life.
        </p>
      </section>

      <section className="mb-12" id="map-section">
        <WorldMap />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Travel Statistics</h2>
        <StatsCounter />
      </section>

      <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <h2 className="text-2xl font-semibold mb-6">Countries</h2>
          <CountryList />
        </div>

        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Upload Your Data</h2>
          <div className="flex justify-center">
            <CSVUploader />
          </div>
        </div>
      </section>
    </div>
  )
} 