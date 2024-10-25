import { useState, useEffect } from 'react';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { TokenInfo } from '@solana/spl-token-registry';
import { useWallet } from '@solana/wallet-adapter-react';
import { TokenPrices } from '@/lib/types'; // Make sure this is correctly imported

interface TokenBalance {
  tokenSymbol: keyof TokenPrices;
  tokenBalance: number;
  tokenLogoURI: string;
}

export const useBalances = (tokens: TokenInfo[], tokenPrices: TokenPrices) => {
  const { publicKey } = useWallet();
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!publicKey) return;

      const connection = new Connection(`https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`, 'confirmed');

      try {
        const balanceLamports = await connection.getBalance(publicKey);
        setSolBalance(balanceLamports / LAMPORTS_PER_SOL);

        const response = await connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID,
        });

        const fetchedTokens = response.value.map((tokenAccountInfo) => {
          const accountData = tokenAccountInfo.account.data.parsed.info;
          const mintAddress = accountData.mint;
          const tokenBalance = accountData.tokenAmount.uiAmount;
          const tokenInfo = tokens.find((t) => t.address === mintAddress);

          if (tokenInfo && tokenPrices[tokenInfo.symbol as keyof TokenPrices]) {
            return {
              tokenSymbol: tokenInfo.symbol as keyof TokenPrices,
              tokenBalance,
              tokenLogoURI: tokenInfo.logoURI || '/assets/Solana.png',
            };
          }
          return null;
        });

        setTokenBalances(fetchedTokens.filter(Boolean) as TokenBalance[]);
      } catch (error) {
        console.error('Error fetching balances:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, [publicKey, tokens, tokenPrices]);

  return { solBalance, tokenBalances, loading };
};
