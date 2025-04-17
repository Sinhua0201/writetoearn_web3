module.exports = {

"[externals]/ethers [external] (ethers, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("ethers", () => require("ethers"));

module.exports = mod;
}}),
"[project]/utils/contracts.ts [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CONTRACTS": (()=>CONTRACTS),
    "getContract": (()=>getContract)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/ethers [external] (ethers, cjs)");
;
const CONTRACTS = {
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
function getContract(name, signerOrProvider) {
    const { address, abi } = CONTRACTS[name];
    return new __TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__cjs$29$__["ethers"].Contract(address, abi, signerOrProvider);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__02f9b26b._.js.map