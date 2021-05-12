const PepeswapV2Router02 = artifacts.require("PepeswapV2Router02.sol");
const WETH = artifacts.require("WETH.sol");

module.exports = async function (deployer) {
    let weth; 
    const FACTORY_ADDRESS = "0x1258b9Dff8b1d774CAfadB8F742494d5d2523dd7";

    await deployer.deploy(WETH);
    weth = await WETH.deployed();
    
    await deployer.deploy(PepeswapV2Router02, FACTORY_ADDRESS, weth.address);
};
