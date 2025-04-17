// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ContentNFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;

    // 这里需要传入 initialOwner，适配 OZ v5.x
    constructor(address initialOwner)
        ERC721("WriteToEarnContent", "WTEC")
        Ownable(initialOwner)
    {}

    function mint(address to, string memory tokenURI) external onlyOwner returns (uint256) {
        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }
}