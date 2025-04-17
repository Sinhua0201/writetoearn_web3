import { useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { getContract } from "../utils/contracts";
import { ipfs } from "../utils/ipfs";
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function Publish() {
  const { address } = useAccount();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [ipfsUrl, setIpfsUrl] = useState("");
  const [txHash, setTxHash] = useState("");
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
        <h2 className="text-3xl font-extrabold mb-6 text-indigo-800 flex items-center gap-2">
          <span className="inline-block align-middle mr-1"><CheckCircleIcon className="w-7 h-7 text-green-500" /></span> 发布原创文章
        </h2>
        <div className="space-y-4">
          <input
            className="w-full px-4 py-3 border-2 border-indigo-100 rounded-lg focus:outline-none focus:border-indigo-400 transition text-lg bg-indigo-50"
            placeholder="请输入文章标题"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={loading}
          />
          <textarea
            className="w-full px-4 py-3 border-2 border-indigo-100 rounded-lg focus:outline-none focus:border-indigo-400 transition min-h-[120px] bg-indigo-50 text-lg"
            placeholder="请输入文章内容"
            value={content}
            onChange={e => setContent(e.target.value)}
            disabled={loading}
          />
          <button
            className={`w-full py-3 rounded-lg text-lg font-semibold transition bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md hover:from-indigo-600 hover:to-blue-600 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={handlePublish}
            disabled={loading}
          >
            {loading ? "发布中..." : "发布"}
          </button>
        </div>
        {/* 结果展示卡片 */}
        {(ipfsUrl || txHash || tokenId || error) && (
          <div className="mt-8 p-6 rounded-xl bg-indigo-50 border border-indigo-100 shadow flex flex-col gap-4 animate-fade-in">
            {ipfsUrl && (
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircleIcon className="w-5 h-5 text-green-500" />
                <span>已上传IPFS: <a href={ipfsUrl} target="_blank" rel="noreferrer" className="underline break-all">{ipfsUrl}</a></span>
              </div>
            )}
            {tokenId && (
              <div className="flex items-center gap-2 text-indigo-800">
                <span className="inline-block align-middle"><CheckCircleIcon className="w-6 h-6 text-indigo-500" /></span>
                <span className="font-bold">NFT Token ID: <span className="text-indigo-600">{tokenId}</span></span>
              </div>
            )}
            {txHash && (
              <div className="flex items-center gap-2 text-blue-700">
                <span className="inline-block align-middle"><CheckCircleIcon className="w-5 h-5 text-blue-500" /></span>
                <span>交易哈希: <a href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noreferrer" className="underline break-all">{txHash}</a></span>
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 text-red-600">
                <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                <span>{error}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
