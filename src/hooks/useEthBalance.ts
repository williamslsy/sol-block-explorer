import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export const useEthBalance = () => {
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEthBalance = async () => {
      try {
        if (window?.ethereum?.isPhantom) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();

          if (accounts.length > 0) {
            const balance = await provider.getBalance(accounts[0]); // Get the first account's balance
            const balanceInEth = ethers.utils.formatEther(balance); // Convert from wei to ETH
            setEthBalance(balanceInEth);
            console.log(balanceInEth, 'balance');
          }
        } else {
          console.error('Phantom Ethereum provider not detected.');
        }
      } catch (error) {
        console.error('Error fetching Ethereum balance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEthBalance();
  }, []);

  return { ethBalance, loading };
};
