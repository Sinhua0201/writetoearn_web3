import { useState } from "react";

import { ethers } from "ethers";
import { getContract } from "../utils/contracts";

export default function Reward() {
  const [tokenId, setTokenId] = useState("");
  const [rewarded, setRewarded] = useState(false);

  async function handleReward() {
    try {
      if (!window.ethereum) throw new Error("请安装钱包");
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const likeReward = getContract("likeReward", signer);
      const tx = await likeReward.rewardAuthor(Number(tokenId));
      await tx.wait();
      setRewarded(true);
    } catch (err) {
      alert("奖励失败: " + (err as any).message);
    }
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">奖励发放</h2>
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="请输入文章NFT的Token ID"
        value={tokenId}
        onChange={e => setTokenId(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        onClick={handleReward}
        disabled={!tokenId}
      >
        发放奖励
      </button>
      {rewarded && <div className="mt-4 text-green-700">奖励已发放！</div>}
    </div>
  );
}
