'use client';

import { useState, useEffect } from 'react';

interface TokenData {
  priceUsd: string;
  fdv: number;
  volume24h: number;
  priceChange24h: number;
  symbol: string;
  loading: boolean;
  error: string | null;
}

const TOKEN_ADDRESS = '2AF7CqwieUjUPALL7icuZtL3X7wENdjUjGBMmfV2pump';

export const useTokenData = () => {
  const [data, setData] = useState<TokenData>({
    priceUsd: '0',
    fdv: 0,
    volume24h: 0,
    priceChange24h: 0,
    symbol: '',
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${TOKEN_ADDRESS}`);
      const result = await response.json();
      
      if (result.pairs && result.pairs.length > 0) {
        const pair = result.pairs[0];
        setData({
          priceUsd: pair.priceUsd,
          fdv: pair.fdv || 0,
          volume24h: pair.volume?.h24 || 0,
          priceChange24h: pair.priceChange?.h24 || 0,
          symbol: pair.baseToken.symbol,
          loading: false,
          error: null,
        });
      } else {
        setData(prev => ({ ...prev, loading: false, error: 'No pairs found' }));
      }
    } catch (err) {
      setData(prev => ({ ...prev, loading: false, error: 'Failed to fetch data' }));
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return data;
};
