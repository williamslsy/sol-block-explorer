'use client';

import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';

import { AlphaWalletAdapter, LedgerWalletAdapter, PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { FC, useMemo } from 'react';

import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletModalProvider } from '@/modals/WalletModalProvider';

type Props = {
  children?: React.ReactNode;
};

export const WalletContext: FC<Props> = ({ children }) => {
  const MAINNET_URL = `https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={MAINNET_URL}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
