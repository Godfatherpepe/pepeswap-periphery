const PepeswapV2Router02 = artifacts.require("PepeswapV2Router02.sol");
const WBNB = artifacts.require("WBNB.sol");

module.exports = async function (deployer, network) {
    let wbnb; 
    const FACTORY_ADDRESS = "0xbB05c235492D03805F2d525FeD217edaFae7318f";

    if(network === "bsc") {
        wbnb = await WBNB.at("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c") 
    } else if(network === "testnet") {
        wbnb = await WBNB.at("0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd")
    } else {
        await deployer.deploy(WBNB);
        wbnb = await WBNB.deployed();
    }
    
    await deployer.deploy(PepeswapV2Router02, FACTORY_ADDRESS, wbnb.address);
};
