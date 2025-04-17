import { ethers } from "ethers";

export const CONTRACTS = {
  token: {
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi: [
      // ERC20 mint
      "function mint(address to, uint256 amount) external"
    ]
  },
  nft: {
    address: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    abi: [
      "function mint(address to, string memory tokenURI) external returns (uint256)",
      "function ownerOf(uint256 tokenId) view returns (address)",
      "function tokenURI(uint256 tokenId) view returns (string)"
    ]
  },
  likeReward: {
    address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    abi: [
      "function like(uint256 tokenId) external",
      "function rewardAuthor(uint256 tokenId) external",
      "function likes(uint256 tokenId) view returns (uint256)"
    ]
  }
};

export function getContract(name: keyof typeof CONTRACTS, signerOrProvider: ethers.Signer | ethers.providers.Provider) {
  const { address, abi } = CONTRACTS[name];
  return new ethers.Contract(address, abi, signerOrProvider);
}
