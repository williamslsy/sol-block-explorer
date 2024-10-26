'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';

import blocks from '@/constants/blocks.json';
import { Card, CardHeader } from '@/components/ui/card';
import InfoCard from '@/components/ui/info-card';
import Toast from '@/components/ui/toast';
import { useTimeAgo } from '@/hooks/useTimeAgo';
import { formatDateUTC, truncateHash } from '@/lib/utils';
import SearchBar from '@/components/layout/search-bar';

interface BlockDetailsProps {
  params: {
    slot: string;
  };
}

export default function BlockDetails({ params }: BlockDetailsProps) {
  const router = useRouter();
  const block = blocks.find((b) => b.slot.toString() === params.slot);

  if (!block) {
    notFound();
  }

  const timeAgo = useTimeAgo(block.timestamp);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
  };

  return (
    <div className="max-w-[900px] mx-auto px-4 py-8 space-y-4 mt-[72px]">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="flex items-center justify-center p-6 w-16 h-[105px] bg-translucent rounded-2xl transition-transform duration-200 hover:-translate-x-2">
          <Image src="/assets/arrow-left.svg" alt="Back" width={24} height={24} />
        </button>

        <Card className="relative flex h-[105px] w-full items-center justify-between rounded-2xl border border-titanium bg-dark">
          <CardHeader className="flex flex-row items-center gap-4 p-6">
            <Image src="/assets/Solana.svg" alt="Block" width={40} height={40} />
            <div>
              <div className="text-white_primary text-2xl">Block #{block.slot}</div>
              <p className="text-white_secondary text-sm mt-2">Check the block details.</p>
            </div>
          </CardHeader>
        </Card>
      </div>

      <SearchBar width="865px" />

      <div className="grid grid-cols-4 gap-4">
        <InfoCard title="Block" content={`#${block.slot}`} />
        <InfoCard title="Timestamp" content={timeAgo} />
        <InfoCard title="Date (UTC)" content={formatDateUTC(block.timestamp)} />
        <InfoCard title="Transactions" content={block.txCount.toString()} />
      </div>

      <InfoCard title="Block hash" content={block.blockHash} />

      <div className="grid grid-cols-2 gap-4">
        <InfoCard
          title="Leader"
          content={
            <div className="flex items-center gap-2">
              <span className="text-green_mantis">{truncateHash(block.leader)}</span>
              <button onClick={() => handleCopy(block.leader)} className="text-white_secondary hover:text-white_primary">
                <Image src="/assets/copy.svg" alt="Copy" width={16} height={16} />
              </button>
            </div>
          }
          highlighted={true}
        />
        <InfoCard
          title="Reward"
          content={
            <div className="flex items-center gap-2">
              <Image src="/assets/Solana.svg" alt="Solana" width={16} height={16} />
              <span className="text-white_primary font-medium">{block.rewardSol.toFixed(4)} SOL</span>
              <span className="text-white_secondary">
                (${block.rewardUsd.toFixed(2)} @ ${block.solanaPriceUsd})
              </span>
            </div>
          }
        />
      </div>

      <InfoCard title="Previous Block Hash" content={block.prevBlockHash} fullWidth />

      {showToast && <Toast message="Copied to clipboard" duration={1000} onClose={() => setShowToast(false)} />}
    </div>
  );
}
