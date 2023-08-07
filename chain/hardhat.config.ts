import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// try{
// const optimismGoerliUrl = process.env.ALCHEMY_API_KEY ? `https://opt-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` : 
//   process.env.OPTIMISM_GOERLI_URL

//   const words = process.env.MNEMONIC.match(/[a-zA-Z]+/g).length;
//   // @ts-ignore
//   validLength = [12, 15, 18, 24]
//   if (!validLength.includes(words)) {
//      console.log(`The mnemonic (${process.env.MNEMONIC}) is the wrong number of words`)
//      process.exit(-1)
//   }
// }
// catch(error){
//   console.log("Error fetching info: " + error);
// }

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
  },


networks: {
  // for mainnet
  'base-mainnet': {
    url: 'https://developer-access-mainnet.base.org',
    accounts: [process.env.WALLET_KEY as string],
    gasPrice: 1000000000,
  },
  // for testnet
  'base-goerli': {
    url: 'https://goerli.base.org',
    accounts: [process.env.WALLET_KEY as string],
    gasPrice: 1000000000,
  },
  // for local dev environment
  'base-local': {
    url: 'http://localhost:8545',
    accounts: [process.env.WALLET_KEY as string],
    gasPrice: 1000000000,
  },
//   "optimism-goerli": {
//     url: optimismGoerliUrl,
//     accounts: { mnemonic: process.env.MNEMONIC }
//  }
},
defaultNetwork: 'hardhat',
};

export default config;
