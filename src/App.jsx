import React, { useState, useEffect } from 'react';
import { cryptoService } from './services/cryptoService';
import CryptoCard from './components/CryptoCard';
import GlobalStats from './components/GlobalStats';

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [globalData, setGlobalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [cryptoData, globalStats] = await Promise.all([
        cryptoService.getTopCryptos(20),
        cryptoService.getGlobalData()
      ]);

      setCryptos(cryptoData);
      setGlobalData(globalStats);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch cryptocurrency data. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Cryptocurrency Dashboard</h1>
          <div className="header-actions">
            {lastUpdated && (
              <span className="last-updated">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <button
              className="refresh-button"
              onClick={fetchData}
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading && !cryptos.length ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading cryptocurrency data...</p>
          </div>
        ) : (
          <>
            <GlobalStats globalData={globalData} />

            <section className="crypto-list-section">
              <h2>Top Cryptocurrencies by Market Cap</h2>
              <div className="crypto-grid">
                {cryptos.map((crypto) => (
                  <CryptoCard key={crypto.id} crypto={crypto} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="footer">
        <p>Data provided by CoinGecko API</p>
      </footer>
    </div>
  );
}

export default App;
