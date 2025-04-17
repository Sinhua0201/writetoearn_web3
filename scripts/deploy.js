const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("WTEtoken");
  const token = await Token.deploy();
  await token.deployed();
  console.log("WTEtoken deployed to:", token.address);

  const NFT = await hre.ethers.getContractFactory("ContentNFT");
  const nft = await NFT.deploy();
  await nft.deployed();
  console.log("ContentNFT deployed to:", nft.address);

  const LikeReward = await hre.ethers.getContractFactory("LikeReward");
  const likeReward = await LikeReward.deploy(token.address, nft.address);
  await likeReward.deployed();
  console.log("LikeReward deployed to:", likeReward.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
