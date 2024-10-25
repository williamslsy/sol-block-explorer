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
          <TableRow className="border-none hover:bg-transparent text-white_secondary pl-6 pr-4">
            <TableHead className="w-[120px] font-extralight pl-6 pr-4">Block hash</TableHead>
            <TableHead className="w-[120px] font-extralight">Slot</TableHead>
            <TableHead className="w-[120px] font-extralight">Timestamp</TableHead>
            <TableHead className="w-[80px] font-extralight">Tx count</TableHead>
            <TableHead className="w-[120px] font-extralight">Leader</TableHead>
            <TableHead className="w-[120px] font-extralight pl-4">Reward</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {blocks.map((block) => (
            <TableRow key={block.blockHash} className="bg-white/[0.02] hover:bg-white/[0.04] rounded-2xl h-14 cursor-pointer" onClick={() => handleRowClick(block.slot)}>
              <TableCell className="first:rounded-l-2xl pl-6 pr-4 py-4">
                <span className="text-link">{truncateHash(block.blockHash)}</span>
              </TableCell>
              <TableCell>
                <span className="text-link">#{block.slot}</span>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <span className="text-white_secondary">{formatTimestamp(block.timestamp)}</span>
              </TableCell>
              <TableCell>
                <span className="text-white_secondary">{block.txCount}</span>
              </TableCell>
              <TableCell>
                <span className="text-link">{truncateHash(block.leader)}</span>
              </TableCell>
              <TableCell className="last:rounded-r-2xl pr-6 pl-4">
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
