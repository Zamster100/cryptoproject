import React from 'react';

const CryptoCard = ({ crypto }) => {
  const priceChange24h = crypto.price_change_percentage_24h || 0;
  const isPositive = priceChange24h >= 0;

  const formatPrice = (price) => {
    if (price >= 1) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    }
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    }
    if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toFixed(2)}`;
  };

  return (
    <div className="crypto-card">
      <div className="crypto-header">
        <img src={crypto.image} alt={crypto.name} className="crypto-icon" />
        <div className="crypto-info">
          <h3>{crypto.name}</h3>
          <span className="crypto-symbol">{crypto.symbol.toUpperCase()}</span>
        </div>
        <div className="crypto-rank">#{crypto.market_cap_rank}</div>
      </div>

      <div className="crypto-price">
        <div className="price-main">{formatPrice(crypto.current_price)}</div>
        <div className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '▲' : '▼'} {Math.abs(priceChange24h).toFixed(2)}%
        </div>
      </div>

      <div className="crypto-stats">
        <div className="stat">
          <span className="stat-label">Market Cap</span>
          <span className="stat-value">{formatMarketCap(crypto.market_cap)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">24h Volume</span>
          <span className="stat-value">{formatMarketCap(crypto.total_volume)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">24h High</span>
          <span className="stat-value">{formatPrice(crypto.high_24h)}</span>
        </div>
        <div className="stat">
          <span className="stat-label">24h Low</span>
          <span className="stat-value">{formatPrice(crypto.low_24h)}</span>
        </div>
      </div>

      {crypto.sparkline_in_7d && (
        <div className="sparkline">
          <svg width="100%" height="50" viewBox="0 0 168 50" preserveAspectRatio="none">
            <polyline
              points={crypto.sparkline_in_7d.price
                .map((price, i) => {
                  const x = (i / (crypto.sparkline_in_7d.price.length - 1)) * 168;
                  const minPrice = Math.min(...crypto.sparkline_in_7d.price);
                  const maxPrice = Math.max(...crypto.sparkline_in_7d.price);
                  const y = 50 - ((price - minPrice) / (maxPrice - minPrice)) * 50;
                  return `${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke={isPositive ? '#10b981' : '#ef4444'}
              strokeWidth="2"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default CryptoCard;
