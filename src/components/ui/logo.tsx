'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Logo() {
  const router = useRouter();

  const navigateHome = () => {
    router.push('/');
  };

  return (
    <div onClick={navigateHome} className="cursor-pointer">
      <Image src="/assets/Mantis.svg" width={27} height={32} alt="logo" priority />
    </div>
  );
}

export default Logo;
