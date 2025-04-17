import Header from "./Header";
import Link from "next/link";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100">
    <Header />
    <nav className="flex gap-4 justify-center mt-6 mb-2">
      <Link href="/" className="text-indigo-700 hover:underline">首页</Link>
      <Link href="/publish" className="text-indigo-700 hover:underline">发布文章</Link>
      <Link href="/articles" className="text-indigo-700 hover:underline">文章列表</Link>
      <Link href="/reward" className="text-indigo-700 hover:underline">奖励发放</Link>
    </nav>
    <main>{children}</main>
  </div>
);

export default Layout;
