import axios from 'axios';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const cryptoService = {
  async getTopCryptos(limit = 10) {
    try {
      const response = await axios.get(
        `${COINGECKO_API}/coins/markets`,
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: limit,
            page: 1,
            sparkline: true,
            price_change_percentage: '24h,7d'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      throw error;
    }
  },

  async getGlobalData() {
    try {
      const response = await axios.get(`${COINGECKO_API}/global`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching global data:', error);
      throw error;
    }
  },

  async getCryptoDetails(coinId) {
    try {
      const response = await axios.get(
        `${COINGECKO_API}/coins/${coinId}`,
        {
          params: {
            localization: false,
            tickers: false,
            community_data: false,
            developer_data: false
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching crypto details:', error);
      throw error;
    }
  }
};
