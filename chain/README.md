# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
Running <b>npx hardhat compile will compile chainlink contract and multisig contract</b>

## ADD HARDHAT NETWORK TO METAMASK
1) Name: Hardhat
2) RPC Url: http://127.0.0.1:8545
3) Chain Id: 31337
4) Symbol: ETH

## HOW TO SETUP LOCAL BLOCKCHAIN
1) <b>cd ./chain</b>
2) <b>npx hardhat node</b>  (This will give a list of accounts. Import 2 accounts into Metamask)
3) <b>npx hardhat run scripts/deploy.ts --network localhost</b>  (This will create and compile and deploy smart contracts on the blockchain)
4)Address will be stored in ./__config.json
5) <b>cd ../webapp</b>
6) <b>npm run dev</b>
