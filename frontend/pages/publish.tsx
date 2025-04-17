import { useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { getContract } from "../utils/contracts";
import { ipfs } from "../utils/ipfs";

export default function Publish() {
  const { address } = useAccount();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [txHash, setTxHash] = useState("");

  async function handlePublish() {
    setLoading(true);
    try {
      // 1. 上传到IPFS
      const added = await ipfs.add(JSON.stringify({ title, content }));
      setIpfsUrl(`https://ipfs.io/ipfs/${added.path}`);
      // 2. 调用合约 mint NFT
      if (!window.ethereum) throw new Error("请安装钱包");
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nft = getContract("nft", signer);
      const tx = await nft.mint(address, `https://ipfs.io/ipfs/${added.path}`);
      const receipt = await tx.wait();
      setTxHash(receipt.transactionHash);
    } catch (err) {
      alert("发布失败: " + (err as any).message);
    }
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">发布原创文章</h2>
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="标题"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="w-full mb-2 p-2 border rounded min-h-[120px]"
        placeholder="内容"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        onClick={handlePublish}
        disabled={loading}
      >
        {loading ? "发布中..." : "发布"}
      </button>
      {ipfsUrl && (
        <div className="mt-4 text-green-700">
          已上传IPFS: <a href={ipfsUrl} target="_blank" rel="noreferrer" className="underline">{ipfsUrl}</a>
        </div>
      )}
      {txHash && (
        <div className="mt-2 text-blue-700">NFT已铸造，交易哈希: {txHash}</div>
      )}
    </div>
  );
}
