import { TokenPricesContext } from '@/contexts/TokenContext';
import { useContext } from 'react';

export const useTokenPrices = () => {
  const context = useContext(TokenPricesContext);
  if (context === undefined) {
    throw new Error('useTokenPrices must be used within a TokenPricesProvider');
  }
  return context;
};
