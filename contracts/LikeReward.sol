// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Token.sol";
import "./ContentNFT.sol";

contract LikeReward {
    WTEtoken public token;
    ContentNFT public nft;
    mapping(uint256 => uint256) public likes;
    mapping(uint256 => mapping(address => bool)) public likedBy;
    uint256 public rewardPerLike = 10 * 1e18;

    event Liked(uint256 indexed tokenId, address indexed user);
    event Rewarded(uint256 indexed tokenId, address indexed author, uint256 amount);

    constructor(address tokenAddr, address nftAddr) {
        token = WTEtoken(tokenAddr);
        nft = ContentNFT(nftAddr);
    }

    function like(uint256 tokenId) external {
        require(!likedBy[tokenId][msg.sender], "Already liked");
        likes[tokenId]++;
        likedBy[tokenId][msg.sender] = true;
        emit Liked(tokenId, msg.sender);
    }

    function rewardAuthor(uint256 tokenId) external {
        address author = nft.ownerOf(tokenId);
        uint256 reward = likes[tokenId] * rewardPerLike;
        require(reward > 0, "No reward");
        token.mint(author, reward);
        emit Rewarded(tokenId, author, reward);
    }
}
