'use client';

import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { FC, useMemo, useCallback, useState } from 'react';

import '@solana/wallet-adapter-react-ui/styles.css';
import { WalletModalProvider } from '@/modals/WalletModalProvider';
import { WalletError } from '@solana/wallet-adapter-base';
import Toast from '@/components/ui/toast';

type Props = {
  children?: React.ReactNode;
};

export const WalletContext: FC<Props> = ({ children }) => {
  const MAINNET_URL = `https://solana-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleToastClose = useCallback(() => {
    setToastMessage(null);
  }, []);

  const onError = useCallback((error: WalletError) => {
    setToastMessage(error.message ? `${error.name}: ${error.message}` : error.name);
    setToastType('error');
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={MAINNET_URL}>
      <WalletProvider wallets={wallets} autoConnect={true} onError={onError}>
        <WalletModalProvider>{children}</WalletModalProvider>
        {toastMessage && <Toast message={toastMessage} type={toastType} duration={3000} onClose={handleToastClose} />}
      </WalletProvider>
    </ConnectionProvider>
  );
};
