# 💎 Crypto Dashboard

A real-time cryptocurrency price tracking dashboard with live market data, built with vanilla JavaScript.

## Features

- **Real-time Price Data**: Track the top 50 cryptocurrencies by market cap
- **Global Market Stats**: View total market cap, 24h volume, and Bitcoin dominance
- **Search Functionality**: Instantly search and filter cryptocurrencies by name or symbol
- **Auto-Refresh**: Data automatically updates every 60 seconds
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Detailed Information**: View market cap, volume, circulating supply, and 24h high/low for each coin

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Internet connection (to fetch live data from CoinGecko API)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd cryptoproject
   ```

2. Open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html

   # On Linux
   xdg-open index.html

   # On Windows
   start index.html
   ```

   Or simply double-click the `index.html` file.

### Using a Local Server (Optional)

For the best experience, you can serve the files using a local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js (with http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## Usage

- **Search**: Type in the search box to filter cryptocurrencies by name or symbol
- **Refresh**: Click the "Refresh" button to manually update the data
- **Auto-Update**: The dashboard automatically refreshes every 60 seconds
- **View Details**: Each card displays comprehensive information including:
  - Current price
  - 24h price change percentage
  - Market capitalization
  - 24h trading volume
  - Circulating supply
  - 24h high/low prices

## Technology Stack

- **HTML5**: Structure and semantic markup
- **CSS3**: Modern styling with flexbox and grid layouts
- **JavaScript (ES6+)**: Async/await, fetch API, DOM manipulation
- **CoinGecko API**: Free cryptocurrency data API (no API key required)

## API Information

This dashboard uses the [CoinGecko API](https://www.coingecko.com/en/api) which is free and doesn't require an API key. Rate limits apply:

- 10-50 calls/minute for free tier
- The app implements 60-second auto-refresh to stay within limits

## Project Structure

```
cryptoproject/
├── index.html      # Main HTML structure
├── styles.css      # CSS styling and responsive design
├── app.js          # JavaScript application logic and API integration
└── README.md       # Project documentation
```

## Features in Detail

### Global Market Statistics
- Total cryptocurrency market capitalization
- Total 24-hour trading volume
- Bitcoin dominance percentage

### Cryptocurrency Cards
Each card displays:
- Coin logo and name
- Market cap rank
- Current price in USD
- 24-hour price change (color-coded)
- Market cap
- 24-hour volume
- Circulating supply
- 24-hour high/low

### Search & Filter
- Real-time search across coin names and symbols
- Instant results as you type
- Clear visual feedback when no results are found

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Cryptocurrency data provided by [CoinGecko](https://www.coingecko.com/)
- Icons and images from CoinGecko API
