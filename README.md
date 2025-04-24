# Map Life

An interactive visualization application showing where in the world you have been according to the submitted travel data.

## Features

- Interactive world map visualization
- CSV data upload for travel history
- Color intensity reflects time spent in each country
- Dark mode UI with modern design

## Technologies

- React 19.1
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- react-simple-maps
- zustand for state management
- papaparse for CSV parsing

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## CSV Format

The application expects CSV files with the following format:

```
country_code,visit_days
USA,120
FRA,45
```

- `country_code`: ISO 3166-1 alpha-3 country code (e.g., USA, GBR, JPN)
- `visit_days`: Number of days spent in the country

A sample CSV file is included at `/public/sample_data.csv` for testing.

## Map Data

The application uses a world map in GeoJSON format. The file should be placed at:
`/public/world-countries.json`

You can download a suitable file from:
https://github.com/zcreativelabs/react-simple-maps/blob/master/topojson-maps/world-110m.json
