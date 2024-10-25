'use client';
import Wallet from '../common/wallet';
import { Button } from '../ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import UserBalances from '../user-balances';
import { TokenPrices } from '@/lib/types';

const WalletMultiButtonDynamic = dynamic(async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton, { ssr: false });

interface LoginProps {
  tokenPrices: TokenPrices;
}

function Login({ tokenPrices }: LoginProps) {
  const { publicKey, wallet, disconnect, connected } = useWallet();

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

      <SheetContent className="bg-black border-0 text-white flex flex-col">
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
            <div className="flex flex-col items-center justify-center w-full">
              <Card className="bg-[rgba(255,255,255,0.02)] rounded-2xl px-4 py-3 w-full border-none">
                <CardContent>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      {wallet?.adapter?.icon && (
                        <div className="w-8 h-8">
                          <Image
                            src={wallet.adapter.name === 'Phantom' ? '/assets/phantom.svg' : wallet.adapter.icon}
                            alt={`${wallet.adapter.name} icon`}
                            className="w-full h-full"
                            width={32}
                            height={32}
                          />
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

            <UserBalances tokenPrices={tokenPrices} />
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
