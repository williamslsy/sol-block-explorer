'use client';
import Wallet from '../common/wallet';
import { Button } from '../ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet';
import Image from 'next/image';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';

import Account from '../account/account';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { useBalanceContext } from '@/hooks/useBalanceContext';

const WalletMultiButtonDynamic = dynamic(async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton, { ssr: false });

function Login() {
  const { disconnect, connected } = useWallet();
  const { totalBalance } = useBalanceContext();
  return (
    <TooltipProvider>
      <Sheet>
        <SheetTrigger asChild>
          {connected ? (
            <Button className="rounded-2xl">
              <Wallet />
            </Button>
          ) : (
            <Button className="rounded-2xl" variant="default">
              <Wallet />
              <span className="text-sm font-medium">Login</span>
            </Button>
          )}
        </SheetTrigger>

        <SheetContent className="bg-background border-0 text-white flex flex-col">
          <div className="flex items-center justify-between mb-6">
            {connected && (
              <SheetTrigger asChild>
                <div className="flex items-center cursor-pointer">
                  <Image src="/assets/arrow-left.svg" alt="Back" width={24} height={24} />
                </div>
              </SheetTrigger>
            )}

            <div className="flex flex-col items-center flex-grow">
              <SheetTitle className="font-light text-base text-[#9592A0]">Total balance</SheetTitle>
              <div className="mt-2 text-white_primary text-4xl font-semibold">${connected ? totalBalance?.toLocaleString() : '0.00'}</div>
            </div>

            {connected && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div onClick={disconnect} className="cursor-pointer transition-transform duration-200 ease-out hover:scale-110 hover:text-white_secondary">
                    <Image src="/assets/logout.svg" alt="Logout" width={24} height={24} />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-[rgba(0,0,0,0.7)] px-3 py-1 text-white text-xs rounded-md">
                  Disconnect
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {connected ? (
            <>
              <Account />
            </>
          ) : (
            <div className="flex mx-auto my-auto">
              <WalletMultiButtonDynamic>
                <Wallet />
                <span className="ml-1">Connect</span>
              </WalletMultiButtonDynamic>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}

export default Login;
