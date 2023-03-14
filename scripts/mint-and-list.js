const { ethers } = require("hardhat");

const PRICE = ethers.utils.parseEther("0.1");

async function mintAndList() {
    const nftMarketplace = await ethers.getContract("NftMarketplace");
    const basicNft = await ethers.getContract("BasicNft");
    console.log("minting...");
    const mintTx = await basicNft.mintNft();
    const mintReceipt = await mintTx.wait(1);
    const tokenId = mintReceipt.events[0].args.tokenId;
    console.log("approving nft...");
    const approveTx = await basicNft.approve(nftMarketplace.address, tokenId);
    await approveTx.wait(1);

    console.log("listing nft...");
    const listTx = await nftMarketplace.listItem(basicNft.address, tokenId, PRICE);
    await listTx.wait(1);
}


mintAndList()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    })