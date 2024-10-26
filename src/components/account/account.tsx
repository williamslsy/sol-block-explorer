import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import UserBalances from './user-balances';
import Image from 'next/image';
import { useWallet } from '@solana/wallet-adapter-react';
import Toast from '@/components/ui/toast';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import Link from 'next/link';

function Account() {
  const { publicKey, wallet } = useWallet();
  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      setShowToast(true);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center space-y-4 w-full">
        <Card className="bg-[rgba(255,255,255,0.02)] rounded-2xl px-4 py-3 w-[286px] border-none mb-4">
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

              <div className="flex items-center space-x-2">
                <button onClick={handleCopy} className="rounded-full text-gray-400 focus:outline-none transition-transform duration-200 ease-out hover:scale-110">
                  <Image src="/assets/copy.svg" alt="Copy" width={16} height={16} />
                </button>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={`https://solscan.io/account/${publicKey?.toBase58()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full focus:outline-none transition-transform duration-200 ease-out hover:scale-110"
                    >
                      <Image src="/assets/globe.svg" alt="Website" width={16} height={16} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-background px-3 py-1 text-white text-xs rounded-md">
                    View on Explorer
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </CardContent>
        </Card>
        <UserBalances />
      </div>

      {showToast && <Toast message="Copied to clipboard" duration={1000} onClose={() => setShowToast(false)} />}
    </TooltipProvider>
  );
}

export default Account;
