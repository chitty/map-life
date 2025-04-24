# Map Life

A interactive world map visualization to track your travels and time spent in different countries.
See it running in https://chitty.github.io/map-life/.

## Features

- Interactive world map visualization
- Country list with time spent displayed
- Continent-based filtering
- Time display with years, months, and days
- Sample data for demonstration

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages.

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

