const PepeswapV2Router02 = artifacts.require("PepeswapV2Router02");

const { config } = require('./migration-config');

module.exports = function (deployer, network) {
  deployer.deploy(PepeswapV2Router02, config[network].factoryAddress, config[network].WBNBAddress);
};
