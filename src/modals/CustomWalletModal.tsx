import React, { useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-base';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';

export const CustomWalletModal = () => {
  const { wallets, select } = useWallet();
  const { setVisible } = useWalletModal();

  const handleClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const handleWalletClick = useCallback(
    (walletName: WalletName) => {
      select(walletName);
      handleClose();
    },
    [select, handleClose]
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-3xl backdrop-filter">
      <Card className="relative w-[90%] max-w-[420px] bg-background border-none rounded-xl p-6">
        <div className="flex items-center mb-4">
          <button onClick={handleClose} className="p-2 hover:text-white_secondary transition-colors">
            <Image src="/assets/arrow-left.svg" alt="Back" width={24} height={24} />
          </button>
          <h2 className="text-xl font-medium text-white text-center flex-1 mr-8">Connect a Solana Wallet to continue</h2>
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
          {wallets.map((wallet) => (
            <WalletOption key={wallet.adapter.name} name={wallet.adapter.name} icon={wallet.adapter.icon} onClick={() => handleWalletClick(wallet.adapter.name as WalletName)} />
          ))}
        </div>
      </Card>
    </div>
  );
};

const WalletOption = ({ name, icon, onClick }: { name: string; icon: string; onClick: () => void }) => (
  <button onClick={onClick} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.04] transition-colors text-left">
    <Image src={icon} alt={name} width={24} height={24} className="rounded-full" />
    <span className="text-sm font-medium text-white">{name}</span>
  </button>
);
