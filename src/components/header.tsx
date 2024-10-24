import Logo from './logo';
import Login from './login';

export const Header = () => {
  return (
    <header className="flex justify-between items-center px-12 py-4 border border-white/10">
      <Logo />
      <Login />
    </header>
  );
};
