export interface Block {
  blockHash: string;
  prevBlockHash: string;
  slot: number;
  timestamp: string;
  txCount: number;
  leader: string;
  rewardSol: number;
  rewardUsd: number;
  solanaPriceUsd: number;
}

export interface TokenPrices {
  SOL: number;
  USDC: number;
  USDT: number;
  ETH: number;
}

export interface TokenBalance {
  tokenSymbol: string;
  tokenBalance: number;
  tokenLogoURI: string;
}
