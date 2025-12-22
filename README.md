# Cryptocurrency Dashboard

A modern, real-time cryptocurrency dashboard built with React and Vite. Track the top cryptocurrencies, view market statistics, and monitor price changes with an intuitive interface.

## Features

- **Real-time Data**: Live cryptocurrency prices from CoinGecko API
- **Top 20 Cryptocurrencies**: View the top cryptocurrencies by market cap
- **Global Market Stats**: Total market cap, 24h volume, and market dominance
- **Price Charts**: 7-day sparkline charts for each cryptocurrency
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Auto-refresh**: Automatically updates data every 60 seconds
- **Modern UI**: Clean, dark-themed interface with smooth animations

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Axios**: HTTP client for API requests
- **CoinGecko API**: Free cryptocurrency data API
- **CSS3**: Custom styling with CSS Grid and Flexbox

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cryptoproject
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
cryptoproject/
├── src/
│   ├── components/
│   │   ├── CryptoCard.jsx      # Individual crypto card component
│   │   └── GlobalStats.jsx     # Global market statistics component
│   ├── services/
│   │   └── cryptoService.js    # API service for fetching crypto data
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Application styles
│   └── main.jsx                # Application entry point
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
└── package.json                # Project dependencies
```

## Features Overview

### Cryptocurrency Cards
Each card displays:
- Cryptocurrency name, symbol, and logo
- Current price in USD
- 24-hour price change percentage
- Market cap and trading volume
- 24-hour high and low prices
- 7-day price sparkline chart

### Global Statistics
- Total cryptocurrency market cap
- 24-hour trading volume
- Bitcoin and Ethereum market dominance
- Number of active cryptocurrencies
- Total number of markets

### Auto-refresh
- Data automatically refreshes every 60 seconds
- Manual refresh button available
- Last update timestamp displayed

## API Information

This dashboard uses the free CoinGecko API (v3) to fetch cryptocurrency data. No API key is required for basic usage.

API Endpoints used:
- `/coins/markets` - Top cryptocurrencies by market cap
- `/global` - Global cryptocurrency market statistics

Rate limits: CoinGecko free tier allows 10-50 calls/minute.

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License
