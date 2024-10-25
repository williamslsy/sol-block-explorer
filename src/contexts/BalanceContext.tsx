'use client';

import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTokenData } from '@/hooks/useTokenData';
import { TokenBalance, TokenPrices } from '@/lib/types';

interface BalanceContextProps {
  tokenPrices: TokenPrices | null;
  solBalance: number | null;
  tokenBalances: TokenBalance[];
  loading: boolean;
}

export const BalanceContext = createContext<BalanceContextProps | undefined>(undefined);

export const BalanceProvider: React.FC<{ children: ReactNode; initialPrices: TokenPrices }> = ({ children, initialPrices }) => {
  const { publicKey } = useWallet();
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [tokenPrices] = useState<TokenPrices>(initialPrices);
  const [loading, setLoading] = useState(true);
  const tokens = useTokenData();

  useEffect(() => {
    const fetchBalances = async () => {
      if (!publicKey || tokens.length === 0) return;

      const connection = new Connection(`https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`, 'confirmed');

      try {
        const balanceLamports = await connection.getBalance(publicKey);
        setSolBalance(balanceLamports / LAMPORTS_PER_SOL);

        const response = await connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        });

        console.log('Fetched Token Accounts:', response.value);

        const fetchedTokens = response.value.map((tokenAccountInfo) => {
          const accountData = tokenAccountInfo.account.data.parsed.info;
          const mintAddress = accountData.mint;
          const tokenBalance = accountData.tokenAmount.uiAmount;

          console.log('Mint Address:', mintAddress);
          console.log('Available Tokens:', tokens);

          const tokenInfo = tokens.find((t) => t.address === mintAddress);

          console.log('Matching Token Info:', tokenInfo);

          if (tokenInfo && tokenPrices[tokenInfo.symbol as keyof TokenPrices]) {
            return {
              tokenSymbol: tokenInfo.symbol,
              tokenBalance,
              tokenLogoURI: tokenInfo.logoURI || '/assets/Solana.svg',
            };
          }
          return null;
        });

        setTokenBalances(fetchedTokens.filter(Boolean) as TokenBalance[]);
        console.log('Token Balances:', fetchedTokens);
      } catch (error) {
        console.error('Error fetching balances:', error);
      } finally {
        setLoading(false);
      }
    };

    if (publicKey && tokens.length > 0) {
      fetchBalances();
    }
  }, [publicKey, tokens, tokenPrices]);

  return <BalanceContext.Provider value={{ tokenPrices, solBalance, tokenBalances, loading }}>{children}</BalanceContext.Provider>;
};
