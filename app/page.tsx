import WorldMap from '@/features/map/WorldMap'
import CSVUploader from '@/features/upload/CSVUploader'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Map Life</h1>
      <div className="w-full max-w-7xl mb-8">
        <WorldMap />
      </div>
      <CSVUploader />
    </main>
  )
} 