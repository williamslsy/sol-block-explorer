'use client';

import React, { useEffect, useState } from 'react';
import blocks from '@/constants/blocks.json';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

interface BlockDetailsProps {
  params: {
    slot: string;
  };
}

export default function BlockDetails({ params }: BlockDetailsProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const block = blocks.find((b) => b.slot.toString() === params.slot);

  if (!block) {
    notFound();
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeAgo = (timestamp: string) => {
    const blockTime = new Date(timestamp);
    const diffInHours = Math.floor((currentTime.getTime() - blockTime.getTime()) / (1000 * 60 * 60));
    const diffInMinutes = Math.floor((currentTime.getTime() - blockTime.getTime()) / (1000 * 60)) % 60;
    const diffInSeconds = Math.floor((currentTime.getTime() - blockTime.getTime()) / 1000) % 60;
    return `${diffInHours}h ${diffInMinutes}m ${diffInSeconds}s ago`;
  };

  return (
    <div className="max-w-[900px] mx-auto px-4 py-8 space-y-4">
      <Card className="relative mb-6 flex h-[96px] w-full items-center justify-between rounded-2xl border border-white/10 bg-[#111111]">
        <CardHeader className="flex flex-row items-center gap-4 p-6">
          <Image src="/assets/Solana.svg" alt="Block" width={40} height={40} />
          <div>
            <CardTitle className="text-white text-2xl">Block #{block.slot}</CardTitle>
            <p className="text-white/60 text-sm">Check the block details.</p>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-4 gap-4">
        <Card className="relative flex h-auto items-center justify-between rounded-2xl border border-white/10 bg-[#111111] p-6">
          <CardContent>
            <div className="space-y-1.5">
              <CardTitle className="text-white/60 text-xs">Block</CardTitle>
              <p className="text-white font-medium">#{block.slot}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative flex h-auto items-center justify-between rounded-2xl border border-white/10 bg-[#111111] p-6">
          <CardContent>
            <div className="space-y-1.5">
              <CardTitle className="text-white/60 text-xs">Timestamp</CardTitle>
              <p className="text-white font-medium">{formatTimeAgo(block.timestamp)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative flex h-auto items-center justify-between rounded-2xl border border-white/10 bg-[#111111] p-6">
          <CardContent>
            <div className="space-y-1.5">
              <CardTitle className="text-white/60 text-xs">Date (UTC)</CardTitle>
              <p className="text-white font-medium">
                {new Date(block.timestamp).toLocaleString('en-US', {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  timeZone: 'UTC',
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="relative flex h-auto items-center justify-between rounded-2xl border border-white/10 bg-[#111111] p-6">
          <CardContent>
            <div className="space-y-1.5">
              <CardTitle className="text-white/60 text-xs">Transactions</CardTitle>
              <p className="text-white font-medium">{block.txCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="relative flex h-auto items-center justify-between rounded-2xl border border-white/10 bg-[#111111] p-6">
        <CardContent>
          <div className="space-y-1.5 w-full">
            <CardTitle className="text-white/60 text-xs">Block hash</CardTitle>
            <p className="text-[#52F2B9] font-medium break-all">{block.blockHash}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="relative flex h-auto items-center justify-between rounded-2xl border border-white/10 bg-[#111111] p-6">
        <CardContent>
          <div className="space-y-1.5 w-full">
            <CardTitle className="text-white/60 text-xs">Leader</CardTitle>
            <p className="text-[#52F2B9] font-medium break-all">{block.leader}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="relative flex h-auto items-center justify-between rounded-2xl border border-white/10 bg-[#111111] p-6">
        <CardContent>
          <div className="space-y-1.5 w-full">
            <CardTitle className="text-white/60 text-xs">Reward</CardTitle>
            <div className="flex items-center gap-2">
              <Image src="/assets/Solana.svg" alt="Solana" width={16} height={16} />
              <span className="text-[#52F2B9] font-medium">{block.rewardSol.toFixed(4)} SOL</span>
              <span className="text-white/60">
                (${block.rewardUsd.toFixed(2)} @ ${block.solanaPriceUsd})
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative flex h-auto items-center justify-between rounded-2xl border border-white/10 bg-[#111111] p-6">
        <CardContent>
          <div className="space-y-1.5 w-full">
            <CardTitle className="text-white/60 text-xs">Previous Block Hash</CardTitle>
            <p className="text-[#52F2B9] font-medium break-all">{block.prevBlockHash}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
