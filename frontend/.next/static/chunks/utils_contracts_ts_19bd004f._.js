(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/utils/contracts.ts [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CONTRACTS": (()=>CONTRACTS),
    "getContract": (()=>getContract)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/ethers.js [client] (ecmascript) <export * as ethers>");
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
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(address, abi, signerOrProvider);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=utils_contracts_ts_19bd004f._.js.map