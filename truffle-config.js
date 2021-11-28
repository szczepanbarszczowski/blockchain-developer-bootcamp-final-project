require('dotenv').config();
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.MNEMONIC;
const infuraApi = process.env.INFURA_API_KEY

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: '5777'
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraApi}`);
      },
      network_id: '3',
    },
  },
  compilers: {
    solc: {
      version: "0.8.9"
    }
  }
};
