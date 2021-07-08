require('dotenv').config()
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
 
  networks: {
    
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },

    testnet: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      gas: 9721975,
      gasPrice:20000000000,
      confirmations: 5,
      // timeoutBlocks: 200,
      skipDryRun: true,

    },
    bsc: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  mocha: {
 
  },

  compilers: {
    solc: {
      version: "0.6.6",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1
        },
        evmVersion: "istanbul", 
        outputSelection: {
          "*": {
            "": [
              "ast"
            ],
            "*": [
              "evm.bytecode.object",
              "evm.deployedBytecode.object",
              "abi",
              "evm.bytecode.sourceMap",
              "evm.deployedBytecode.sourceMap",
              "metadata"
            ]
          }
        }
    }
    }
  },
};
