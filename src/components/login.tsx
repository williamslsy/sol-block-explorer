import { Wallet } from 'lucide-react';
import { Button } from './ui/button';

function Login() {
  return (
    <Button className="flex items-center gap-2 bg-[#52F2B9] text-[#0F0F0F] rounded-2xl">
      <Wallet className="w-4 h-4" />
      <span className="text-sm font-normal">Login</span>
    </Button>
  );
}

export default Login;
