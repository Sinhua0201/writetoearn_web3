import Head from "next/head";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-blue-100 to-purple-100">
      <Head>
        <title>写作即挖矿 Write-to-Earn</title>
        <meta name="description" content="基于Web3的内容创作激励平台" />
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-center py-16 px-2">
        <div className="bg-white/80 rounded-2xl shadow-2xl max-w-2xl w-full p-10 flex flex-col items-center">
          <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=128&q=80&facepad=2" alt="logo" className="mb-6 rounded-full w-28 h-28 object-cover border-4 border-indigo-400 shadow-lg" />
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 tracking-tight">写作即挖矿</h1>
          <h2 className="text-xl text-gray-600 mb-6">Write-to-Earn Web3 创作激励平台</h2>
          <div className="flex flex-col items-center w-full">
            {/* 新手引导卡片美化 */}
            <button className="bg-gradient-to-r from-blue-100 to-indigo-100 border border-indigo-200 rounded-2xl px-6 py-4 mb-6 w-full max-w-md shadow-md hover:scale-105 transition text-indigo-700 font-semibold text-lg flex flex-col items-center">
              <span className="mb-1">🚀 尚无发布？</span>
              <span>立刻发布原创文章获得奖励激励！</span>
            </button>
            <div className="bg-indigo-50 rounded-xl p-4 mb-6 w-full max-w-md text-center shadow">
              <p className="text-lg text-indigo-700 font-semibold mb-2">新手三步走：</p>
              <ol className="text-gray-700 text-base space-y-1 list-decimal list-inside">
                <li>连接钱包（右上角）</li>
                <li>点击下方按钮发布你的原创文章</li>
                <li>邀请朋友点赞，链上自动获得奖励</li>
              </ol>
            </div>
            <a href="/publish" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-10 py-4 rounded-full text-2xl shadow-xl transition mb-4 flex items-center justify-center gap-2 font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.25 2.25 0 1 1 2.651 2.651L7.582 19.07a4.5 4.5 0 0 1-1.897 1.13l-2.386.716a.563.563 0 0 1-.704-.704l.716-2.386a4.5 4.5 0 0 1 1.13-1.897l11.421-11.421Zm0 0L19.5 7.125" />
              </svg>
              立即发布文章
            </a>
            <div className="mt-2 text-base text-gray-500">无需懂技术，人人可参与，优质内容即有奖励！</div>
          </div>
        </div>
      </main>
    </div>
  );
}
