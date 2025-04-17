# 写作即挖矿 Write-to-Earn

一个基于 Web3 的内容创作激励平台，支持文章发布、链上点赞、NFT 铸造与奖励发放，适合所有内容创作者，零基础也能轻松上手。

---

## 功能亮点
- **发布原创文章**：内容存储于 IPFS，去中心化安全存证
- **链上点赞**：每个点赞都可追溯且唯一
- **NFT 铸造**：每篇文章可铸造成独一无二的 NFT
- **奖励发放**：点赞数越多，获得平台 Token 越多
- **钱包连接**：支持 MetaMask 等主流钱包

---

## 从零开始搭建与运行

### 1. 环境依赖
- Node.js >= 16
- npm >= 8
- [go-ipfs](https://docs.ipfs.tech/install/)（本地 IPFS 节点）
- MetaMask 浏览器插件

### 2. 安装依赖
```bash
npm install
cd frontend
npm install
```

### 3. 安装并初始化 IPFS
- 下载 go-ipfs 并解压，将 `ipfs.exe` 添加到系统 PATH
- 打开命令行，依次运行：
```bash
ipfs init
ipfs daemon
```
- 看到 `API server listening on /ip4/127.0.0.1/tcp/5001` 表示 IPFS 启动成功

### 4. 启动本地区块链（Hardhat）
```bash
npx hardhat node
```

### 5. 部署智能合约
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 6. 启动前端
```bash
cd frontend
npm run dev
```

### 7. 配置 MetaMask 钱包
- 添加自定义网络：
  - 网络名称：Localhost
  - RPC URL：`http://127.0.0.1:8545`
  - Chain ID：`1337`
  - 货币符号：ETH
- 可用 Hardhat 节点助记词导入测试账户

---

## 新手使用流程
1. **连接钱包**：点击右上角“Connect Wallet”
2. **发布文章**：进入“发布”页面，填写标题和内容，点击“发布”
3. **点赞文章**：在“文章列表”页为喜欢的文章点赞
4. **奖励发放**：在“奖励”页面输入 NFT Token ID，点击“发放奖励”

---

## 常见问题 FAQ
- **Q: 发布文章提示 Failed to fetch？**
  - A: 请确认 IPFS 节点已启动（`ipfs daemon`），且 `utils/ipfs.ts` 配置为 `http://127.0.0.1:5001/api/v0`
- **Q: 钱包连接报 Chain ID 不一致？**
  - A: 请确保 Hardhat 和 MetaMask 的 Chain ID 都为 `1337`
- **Q: 前端页面打不开？**
  - A: 请确认 `npm run dev` 已启动，访问端口与终端输出一致

---

## 目录结构
```
writetoearn_web3/
├── contracts/          # 智能合约源码（ERC20、ERC721、LikeReward）
├── scripts/            # 合约部署脚本
├── frontend/           # 前端 Next.js + TailwindCSS
│   ├── pages/          # 主要页面（首页、发布、列表、奖励）
│   ├── components/     # 公共组件（Header、WalletConnect等）
│   └── utils/          # 合约与IPFS交互工具
├── hardhat.config.js   # Hardhat 配置
└── README.md           # 使用说明
```

---

## 贡献与交流
- 欢迎 PR 与建议！
- 如遇到问题可在 issue 区留言，或直接联系开发者。

---

祝你在 Web3 世界写作、点赞、挖矿，收获更多激励！
