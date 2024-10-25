import { fetchTokenPrices } from '@/lib/server-utils';
import Logo from '../ui/logo';
import Login from './login';

export const Header = async () => {
  const tokenPrices = await fetchTokenPrices();
  return (
    <header className="flex justify-between items-center px-12 py-8 border border-titanium">
      <Logo />
      <Login tokenPrices={tokenPrices} />
    </header>
  );
};
