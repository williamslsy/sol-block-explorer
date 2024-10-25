import Image from 'next/image';

interface RewardDisplayProps {
  rewardSol: number;
  rewardUsd: number;
}

export const RewardDisplay = ({ rewardSol, rewardUsd }: RewardDisplayProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Image src="/assets/Solana.svg" alt="Solana" width={16} height={16} className="w-4 h-4" />
        <span className="text-sm font-medium text-[#52F2B9] whitespace-nowrap">{rewardSol.toFixed(4)} SOL</span>
      </div>
      <span className="text-sm font-medium text-white/60">(${rewardUsd.toFixed(2)})</span>
    </div>
  );
};
