import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useBalances } from '@/hooks/useBalances';
import { TokenListProvider, TokenInfo } from '@solana/spl-token-registry'; // Import for token list
import { TokenPrices } from '@/lib/types';

interface UserBalancesProps {
  tokenPrices: TokenPrices;
}

const UserBalances: React.FC<UserBalancesProps> = ({ tokenPrices }) => {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);

  useEffect(() => {
    const fetchTokenList = async () => {
      try {
        const tokenList = await new TokenListProvider().resolve();
        const mainnetTokens = tokenList.filterByChainId(101).getList();
        setTokens(mainnetTokens);
      } catch (error) {
        console.error('Error fetching token list:', error);
      }
    };

    fetchTokenList();
  }, []);

  const { solBalance, tokenBalances, loading } = useBalances(tokens, tokenPrices);

  if (loading) {
    return <p>Loading balances...</p>;
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto">
      <Card className="bg-[rgba(255,255,255,0.02)] rounded-xl px-3 py-2 w-full border-none">
        <CardContent>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6">
                <Image src="/assets/Solana.png" alt="Solana" width={24} height={24} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-white">SOL</span>
                <p className="text-gray-400 text-xs">{solBalance?.toFixed(2)}</p>
              </div>
            </div>
            <div className="text-white text-lg font-bold">${(solBalance! * tokenPrices.SOL).toLocaleString()}</div>
          </div>
        </CardContent>
      </Card>

      {tokenBalances.length > 0 &&
        tokenBalances.map((token, index) => (
          <Card key={index} className="bg-[rgba(255,255,255,0.02)] rounded-xl px-3 py-2 w-full border-none">
            <CardContent>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6">
                    <Image src={token.tokenLogoURI} alt={token.tokenSymbol} width={24} height={24} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-white">{token.tokenSymbol}</span>
                    <p className="text-gray-400 text-xs">{token.tokenBalance.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-white text-lg font-bold">${(token.tokenBalance * tokenPrices[token.tokenSymbol as keyof TokenPrices]).toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default UserBalances;
