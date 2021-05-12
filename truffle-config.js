require('dotenv').config()
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
 
  networks: {
    
    develpoment: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },

    testnet: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
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
      version: "0.6.6"
 
    }
  },

  db: {
    enabled: false
  }
};
