'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import blocks from '@/constants/blocks.json';
import { formatTimestamp, truncateHash } from '@/lib/utils';
import { RewardDisplay } from './common/reward-display';
import { useRouter } from 'next/navigation';

function BlockTable() {
  const router = useRouter();

  const handleRowClick = (slot: number) => {
    router.push(`/block/${slot}`);
  };

  return (
    <div className="w-[800px] mx-auto">
      <Table className="border-separate border-spacing-y-2">
        <TableHeader>
          <TableRow className="border-none hover:bg-transparent text-white/60 text-xs">
            <TableHead className="w-[120px]">Block hash</TableHead>
            <TableHead className="w-[100px]">Slot</TableHead>
            <TableHead className="w-[100px]">Timestamp</TableHead>
            <TableHead className="w-[80px]">Tx count</TableHead>
            <TableHead className="w-[120px]">Leader</TableHead>
            <TableHead className="w-[120px]">Reward</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {blocks.map((block) => (
            <TableRow key={block.blockHash} className="bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl h-14 cursor-pointer" onClick={() => handleRowClick(block.slot)}>
              <TableCell className="first:rounded-l-2xl">
                <span className="text-sm font-medium text-[#52F2B9]">{truncateHash(block.blockHash)}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium text-[#52F2B9]">#{block.slot}</span>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <span className="text-sm font-medium text-white/60">{formatTimestamp(block.timestamp)}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium text-white/60">{block.txCount}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm font-medium text-[#52F2B9]">{truncateHash(block.leader)}</span>
              </TableCell>
              <TableCell className="last:rounded-r-2xl">
                <RewardDisplay rewardSol={block.rewardSol} rewardUsd={block.rewardUsd} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default BlockTable;
