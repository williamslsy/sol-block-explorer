import type { Metadata } from 'next';
import './globals.css';
import { Open_Sans } from 'next/font/google';
import { WalletContext } from '@/contexts/WalletContext';
import { Header } from '@/components/layout/header';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Sol Block Explorer',
  description: 'a simple sol block explorer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={openSans.className}>
        <WalletContext>
          <Header />
          {children}
        </WalletContext>
      </body>
    </html>
  );
}
