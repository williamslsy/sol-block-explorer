'use client';
import Wallet from '../common/wallet';
import { Button } from '../ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet';
import Image from 'next/image';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';

import Account from '../account/account';

const WalletMultiButtonDynamic = dynamic(async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton, { ssr: false });

function Login() {
  const { disconnect, connected } = useWallet();

  return (
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
            <div className="flex items-center">
              <Image src="/assets/arrow-left.svg" alt="Back" width={24} height={24} />
            </div>
          )}

          <div className="flex flex-col items-center flex-grow">
            <SheetTitle className="font-light text-base text-[#9592A0]">Total balance</SheetTitle>
            <div className="mt-2 text-white_primary text-4xl font-semibold">{connected ? '$45,546' : '$0.00'}</div>
          </div>

          {connected && (
            <div className="flex items-center">
              <div onClick={disconnect} className="cursor-pointer">
                <Image src="/assets/logout.svg" alt="Logout" width={24} height={24} />
              </div>
            </div>
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
  );
}

export default Login;
