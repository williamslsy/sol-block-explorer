import Image from 'next/image';

function Logo() {
  return <Image src="/assets/Mantis.svg" width={27} height={32} alt="logo" priority />;
}

export default Logo;
