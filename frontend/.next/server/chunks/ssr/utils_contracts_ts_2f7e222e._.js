module.exports = {

"[project]/utils/contracts.ts [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "CONTRACTS": (()=>CONTRACTS),
    "getContract": (()=>getContract)
});
(()=>{
    const e = new Error("Cannot find module 'ethers'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
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
        address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        abi: [
            "function mint(address to, string memory tokenURI) external returns (uint256)",
            "function ownerOf(uint256 tokenId) view returns (address)"
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
    return new ethers.Contract(address, abi, signerOrProvider);
}
}}),

};

//# sourceMappingURL=utils_contracts_ts_2f7e222e._.js.map