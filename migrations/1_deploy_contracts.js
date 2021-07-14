const PepeswapRouter02 = artifacts.require("PepeswapRouter02");

const { config } = require('./migration-config');

module.exports = function (deployer, network) {
  //constructor(address _factory, address _WETH) public {
  deployer.deploy(PepeswapRouter02, config[network].factoryAddress, config[network].WBNBAddress);
};
