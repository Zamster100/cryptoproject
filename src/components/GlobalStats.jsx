import React from 'react';

const GlobalStats = ({ globalData }) => {
  if (!globalData) return null;

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    }
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    }
    return `$${marketCap.toFixed(2)}`;
  };

  const btcDominance = globalData.market_cap_percentage?.btc || 0;
  const ethDominance = globalData.market_cap_percentage?.eth || 0;

  return (
    <div className="global-stats">
      <h2>Global Cryptocurrency Market</h2>
      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-label">Total Market Cap</div>
          <div className="stat-value-large">
            {formatMarketCap(globalData.total_market_cap?.usd || 0)}
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-label">24h Volume</div>
          <div className="stat-value-large">
            {formatMarketCap(globalData.total_volume?.usd || 0)}
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-label">BTC Dominance</div>
          <div className="stat-value-large">{btcDominance.toFixed(1)}%</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">ETH Dominance</div>
          <div className="stat-value-large">{ethDominance.toFixed(1)}%</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Active Cryptocurrencies</div>
          <div className="stat-value-large">
            {globalData.active_cryptocurrencies?.toLocaleString() || 0}
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Markets</div>
          <div className="stat-value-large">
            {globalData.markets?.toLocaleString() || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalStats;
