import { fetchTokenPrices } from '@/lib/server-utils';
import Logo from '../ui/logo';
import Login from '../login/login';
import { BalanceProvider } from '@/contexts/BalanceContext';

export const Header = async () => {
  const initialTokenPrices = await fetchTokenPrices();
  return (
    <header className="flex justify-between items-center px-12 py-8 border border-titanium">
      <Logo />
      <BalanceProvider initialPrices={initialTokenPrices}>
        <Login />
      </BalanceProvider>
    </header>
  );
};
