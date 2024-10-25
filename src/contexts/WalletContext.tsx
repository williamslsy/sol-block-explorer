'use client';

import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { AlphaWalletAdapter, LedgerWalletAdapter, PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { FC, useMemo } from 'react';

import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { clusterApiUrl, Connection } from '@solana/web3.js';

type Props = {
  children?: React.ReactNode;
};

export const WalletContext: FC<Props> = ({ children }) => {
  const MAINNET_URL = 'https://solana-mainnet.g.alchemy.com/v2/Tg_02QDT0TOT4bCBRgmnpfQ2kmQmSVy8';

  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter(), new AlphaWalletAdapter(), new LedgerWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={MAINNET_URL}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
