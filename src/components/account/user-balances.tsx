import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useBalanceContext } from '@/hooks/useBalanceContext';

const UserBalances: React.FC = () => {
  const { tokenPrices, solBalance, tokenBalances, loading } = useBalanceContext();

  if (loading) {
    return <p>Loading balances...</p>;
  }

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto">
      {solBalance !== null && tokenPrices && (
        <Card className="bg-[rgba(255,255,255,0.02)] rounded-xl px-3 py-2 w-full border-none">
          <CardContent>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6">
                  <Image src="/assets/Solana.svg" alt="Solana" width={24} height={24} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-white">SOL</span>
                  <p className="text-gray-400 text-xs">{solBalance.toFixed(2)}</p>
                </div>
              </div>
              <div className="text-white text-lg font-bold">${(solBalance * tokenPrices.SOL).toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
      )}

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
                <div className="text-white text-lg font-bold">${(token.tokenBalance * (tokenPrices?.[token.tokenSymbol as keyof typeof tokenPrices] || 0)).toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default UserBalances;
