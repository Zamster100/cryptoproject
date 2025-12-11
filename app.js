// API Configuration
const API_BASE_URL = 'https://api.coingecko.com/api/v3';
const COINS_PER_PAGE = 50;

// State
let allCoins = [];
let filteredCoins = [];
let globalData = null;

// DOM Elements
const cryptoGrid = document.getElementById('cryptoGrid');
const searchInput = document.getElementById('searchInput');
const refreshBtn = document.getElementById('refreshBtn');
const lastUpdate = document.getElementById('lastUpdate');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const totalMarketCap = document.getElementById('totalMarketCap');
const totalVolume = document.getElementById('totalVolume');
const btcDominance = document.getElementById('btcDominance');

// Initialize the app
async function init() {
    await fetchCryptoData();
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    refreshBtn.addEventListener('click', handleRefresh);
}

// Fetch cryptocurrency data
async function fetchCryptoData() {
    try {
        showLoading(true);
        hideError();

        // Fetch global market data
        const globalResponse = await fetch(`${API_BASE_URL}/global`);
        if (!globalResponse.ok) throw new Error('Failed to fetch global data');
        const globalDataResult = await globalResponse.json();
        globalData = globalDataResult.data;
        updateGlobalStats();

        // Fetch top cryptocurrencies
        const coinsResponse = await fetch(
            `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${COINS_PER_PAGE}&page=1&sparkline=false&price_change_percentage=24h`
        );

        if (!coinsResponse.ok) throw new Error('Failed to fetch cryptocurrency data');

        allCoins = await coinsResponse.json();
        filteredCoins = allCoins;

        renderCryptoCards();
        updateLastUpdateTime();
        showLoading(false);

    } catch (error) {
        console.error('Error fetching data:', error);
        showError('Failed to load cryptocurrency data. Please try again later.');
        showLoading(false);
    }
}

// Update global market statistics
function updateGlobalStats() {
    if (!globalData) return;

    totalMarketCap.textContent = formatCurrency(globalData.total_market_cap.usd);
    totalVolume.textContent = formatCurrency(globalData.total_volume.usd);
    btcDominance.textContent = `${globalData.market_cap_percentage.btc.toFixed(2)}%`;
}

// Render cryptocurrency cards
function renderCryptoCards() {
    if (filteredCoins.length === 0) {
        cryptoGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; background: white; border-radius: 15px;">
                <p style="font-size: 18px; color: #666;">No cryptocurrencies found matching your search.</p>
            </div>
        `;
        return;
    }

    cryptoGrid.innerHTML = filteredCoins.map(coin => createCryptoCard(coin)).join('');
}

// Create individual crypto card HTML
function createCryptoCard(coin) {
    const priceChange = coin.price_change_percentage_24h || 0;
    const changeClass = priceChange >= 0 ? 'positive' : 'negative';
    const changeSymbol = priceChange >= 0 ? '▲' : '▼';

    return `
        <div class="crypto-card" data-coin-id="${coin.id}">
            <div class="crypto-header">
                <img src="${coin.image}" alt="${coin.name}" class="crypto-icon">
                <div class="crypto-info">
                    <div class="crypto-name">${coin.name}</div>
                    <div class="crypto-symbol">${coin.symbol}</div>
                </div>
                <div class="crypto-rank">#${coin.market_cap_rank || 'N/A'}</div>
            </div>

            <div class="crypto-price">
                ${formatCurrency(coin.current_price)}
            </div>

            <div class="crypto-change ${changeClass}">
                ${changeSymbol} ${Math.abs(priceChange).toFixed(2)}%
            </div>

            <div class="crypto-details">
                <div class="detail-row">
                    <span class="detail-label">Market Cap</span>
                    <span class="detail-value">${formatCurrency(coin.market_cap)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Volume (24h)</span>
                    <span class="detail-value">${formatCurrency(coin.total_volume)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Circulating Supply</span>
                    <span class="detail-value">${formatNumber(coin.circulating_supply)} ${coin.symbol.toUpperCase()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">24h High</span>
                    <span class="detail-value">${formatCurrency(coin.high_24h)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">24h Low</span>
                    <span class="detail-value">${formatCurrency(coin.low_24h)}</span>
                </div>
            </div>
        </div>
    `;
}

// Handle search input
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();

    if (searchTerm === '') {
        filteredCoins = allCoins;
    } else {
        filteredCoins = allCoins.filter(coin =>
            coin.name.toLowerCase().includes(searchTerm) ||
            coin.symbol.toLowerCase().includes(searchTerm)
        );
    }

    renderCryptoCards();
}

// Handle refresh button
async function handleRefresh() {
    refreshBtn.disabled = true;
    refreshBtn.textContent = '⏳ Refreshing...';

    await fetchCryptoData();

    refreshBtn.disabled = false;
    refreshBtn.textContent = '🔄 Refresh';
}

// Update last update time
function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    lastUpdate.textContent = `Last updated: ${timeString}`;
}

// Show/hide loading spinner
function showLoading(show) {
    loadingSpinner.style.display = show ? 'block' : 'none';
    cryptoGrid.style.display = show ? 'none' : 'grid';
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Hide error message
function hideError() {
    errorMessage.style.display = 'none';
}

// Format currency
function formatCurrency(value) {
    if (value === null || value === undefined) return 'N/A';

    if (value >= 1e12) {
        return `$${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
        return `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
        return `$${(value / 1e6).toFixed(2)}M`;
    } else if (value >= 1) {
        return `$${value.toFixed(2)}`;
    } else {
        return `$${value.toFixed(6)}`;
    }
}

// Format number
function formatNumber(value) {
    if (value === null || value === undefined) return 'N/A';

    if (value >= 1e9) {
        return `${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
        return `${(value / 1e6).toFixed(2)}M`;
    } else if (value >= 1e3) {
        return `${(value / 1e3).toFixed(2)}K`;
    } else {
        return value.toFixed(2);
    }
}

// Auto-refresh every 60 seconds
setInterval(() => {
    fetchCryptoData();
}, 60000);

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
