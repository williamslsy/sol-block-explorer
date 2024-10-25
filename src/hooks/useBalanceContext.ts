import { BalanceContext } from '@/contexts/BalanceContext';
import { useContext } from 'react';

export const useBalanceContext = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error('useBalanceContext must be used within a BalanceProvider');
  }
  return context;
};
