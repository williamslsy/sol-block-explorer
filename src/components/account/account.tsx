import React from 'react';
import { Card, CardContent } from '../ui/card';
import UserBalances from './user-balances';
import Image from 'next/image';
import { useWallet } from '@solana/wallet-adapter-react';

function Account() {
  const { publicKey, wallet } = useWallet();
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <Card className="bg-[rgba(255,255,255,0.02)] rounded-2xl px-4 py-3 w-full border-none">
          <CardContent>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                {wallet?.adapter?.icon && (
                  <div className="w-8 h-8">
                    <Image src={wallet.adapter.name === 'Phantom' ? '/assets/phantom.svg' : wallet.adapter.icon} alt={`${wallet.adapter.name} icon`} className="w-full h-full" width={32} height={32} />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-white">{wallet?.adapter?.name}</span>
                  <p className="text-gray-400 text-xs">
                    {publicKey?.toBase58().substring(0, 6)}...{publicKey?.toBase58().slice(-4)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="rounded-full p-2 text-gray-400 bg-transparent hover:bg-gray-700 focus:outline-none" onClick={() => navigator.clipboard.writeText(publicKey?.toBase58() || '')}>
                  <Image src="/assets/copy.svg" alt="Copy" width={16} height={16} />
                </button>
                <button className="rounded-full p-2 text-gray-400 bg-transparent hover:bg-gray-700 focus:outline-none">
                  <Image src="/assets/globe.svg" alt="Website" width={16} height={16} />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <UserBalances />
    </>
  );
}

export default Account;
