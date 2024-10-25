import React, { createContext, useEffect, useState } from 'react';
import { fetchTokenPrices } from '@/lib/server-utils';
import { TokenPrices } from '@/lib/types';

interface TokenPricesContextType {
  tokenPrices: TokenPrices | null;
  loading: boolean;
}

export const TokenPricesContext = createContext<TokenPricesContextType | undefined>(undefined);

export const TokenPricesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokenPrices, setTokenPrices] = useState<TokenPrices | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTokenPrices = async () => {
      try {
        const prices = await fetchTokenPrices();
        setTokenPrices(prices);
      } catch (error) {
        console.error('Error fetching token prices:', error);
      } finally {
        setLoading(false);
      }
    };

    getTokenPrices();
  }, []);

  return <TokenPricesContext.Provider value={{ tokenPrices, loading }}>{children}</TokenPricesContext.Provider>;
};
