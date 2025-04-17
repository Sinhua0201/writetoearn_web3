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
  console.log("Articles component rendered");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffect called");
    async function fetchArticles() {
      console.log("fetchArticles called");
      setLoading(true);
      setFetchError(null);
      try {
        if (!window.ethereum) {
          setFetchError("未检测到钱包，请安装并连接钱包");
          setArticles([]);
          setLoading(false);
          return;
        }
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const { ethers } = await import("ethers");
        const { getContract } = await import("../utils/contracts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const nft = getContract("nft", provider);
  
        // 只遍历前2个tokenId，调试用
        const articles: Article[] = [];
        for (let i = 0; i <= 2; i++) {
          console.log("for循环执行，当前tokenId:", i);
          try {
            const tokenId = i;
            const tokenURI = await nft.tokenURI(tokenId);
            const owner = await nft.ownerOf(tokenId);
            console.log(`tokenId=${tokenId}, tokenURI=${tokenURI}, owner=${owner}`);
            // 解析 IPFS 内容
            const ipfsUrl = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
            let meta = { title: '', content: '' };
            try {
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 5000);
              const res = await fetch(ipfsUrl, { signal: controller.signal });
              clearTimeout(timeoutId);
              meta = await res.json();
            } catch (e) {
              console.warn(`IPFS 解析失败: ${ipfsUrl}`, e);
              meta = { title: '（IPFS同步中）', content: '请稍后刷新，或检查IPFS网关' };
            }
            // 点赞数
            const likeReward = getContract("likeReward", provider);
            let likes = 0;
            try {
              likes = (await likeReward.likes(tokenId)).toNumber();
            } catch {}
            articles.push({
              title: meta.title,
              content: meta.content,
              ipfsUrl,
              tokenId: Number(tokenId),
              author: owner,
              likes,
            });
          } catch (e: any) {
            console.error("tokenId", i, "异常内容：", e && (e.message || e));
          }
        }
        console.log("最终 articles: ", articles);
        setArticles(articles);
      } catch (err: any) {
        console.error("fetchArticles error", err);
        setFetchError("读取链上文章失败：" + (err?.message || err));
        setArticles([]);
      }
      setLoading(false);
    }
    fetchArticles();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">文章列表</h2>
      {loading && <div className="text-gray-500 text-center py-8">正在加载文章...</div>}
      {fetchError && <div className="text-red-500 text-center py-8">{fetchError}</div>}
      {!loading && !fetchError && articles.length === 0 && (
        <div className="text-gray-400 text-center py-12">暂无文章或文章正在同步中，请稍后刷新</div>
      )}
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
