import { useState } from "react";
import { ethers } from "ethers";

export const useMetaMask = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(accounts[0]);
    } else {
      alert("MetaMask is not installed");
    }
  };

  return { connectWallet, walletAddress, isWalletConnected: !!walletAddress };
};
