import { ethers } from "ethers";
import SupplyChainABI from "./SupplyChainBackend.json";

/**
 * ⚠️ IMPORTANT
 * Make sure this address is the SAME one
 * you copied from Sepolia Etherscan (Contract Created)
 */
export const CONTRACT_ADDRESS =
  "0x22466122ae8eea0fe94452e1bf70e3f8a8976c4c";

/**
 * Returns a connected contract instance
 * (Signer attached – for read & write)
 */
export const getContract = async () => {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return null;
  }

  // Request wallet connection
  await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  // ✅ Network check (Sepolia only)
  const chainId = await window.ethereum.request({
    method: "eth_chainId",
  });

  // Sepolia chainId = 11155111 = 0xaa36a7
  if (chainId !== "0xaa36a7") {
    alert("Please switch MetaMask to Sepolia Testnet");
    return null;
  }

  // Provider & signer (ethers v6)
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  // Contract instance
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    SupplyChainABI,
    signer
  );

  return contract;
};
