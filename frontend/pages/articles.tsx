import { useEffect, useState } from "react";

interface Article {
  title: string;
  content: string;
  ipfsUrl: string;
  tokenId: number;
  author: string;
  likes: number;
}

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      // 伪代码：实际应遍历NFT合约tokenId，读取tokenURI和作者
      // 这里只演示结构，真实项目建议后端或子graph聚合
      setArticles([
        {
          title: "示例文章",
          content: "这是内容...",
          ipfsUrl: "https://ipfs.io/ipfs/xxx",
          tokenId: 1,
          author: "0x123...abc",
          likes: 2,
        },
      ]);
    }
    fetchArticles();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">文章列表</h2>
      {articles.map((a) => (
        <div key={a.tokenId} className="bg-white rounded shadow p-4 mb-4">
          <h3 className="text-xl font-semibold">{a.title}</h3>
          <p className="text-gray-700 mb-2">{a.content}</p>
          <a href={a.ipfsUrl} target="_blank" rel="noreferrer" className="text-indigo-600 underline">IPFS</a>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm text-gray-500">作者: {a.author}</span>
            <span className="text-sm text-gray-500">点赞: {a.likes}</span>
            <button
              className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition"
              onClick={async () => {
                // 链上点赞示例
                if (!window.ethereum) return alert("请安装钱包");
                await window.ethereum.request({ method: "eth_requestAccounts" });
                const { ethers } = await import("ethers");
                const { getContract } = await import("../utils/contracts");
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const likeReward = getContract("likeReward", signer);
                await likeReward.like(a.tokenId);
                alert("点赞成功");
              }}
            >
              点赞
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
