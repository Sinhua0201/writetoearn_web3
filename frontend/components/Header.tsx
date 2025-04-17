import React from "react";
import WalletConnect from "./WalletConnect";

const Header: React.FC = () => (
  <header className="w-full py-6 bg-white shadow-md flex justify-between items-center px-8">
    <h1 className="text-2xl font-bold text-indigo-700">写作即挖矿 Write-to-Earn</h1>
    <div>
      {/* 钱包连接按钮 */}
      <WalletConnect />
    </div>
  </header>
);

export default Header;
