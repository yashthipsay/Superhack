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

## HOW TO SETUP LOCAL BLOCKCHAIN
--> cd ./chain
--> npx hardhat node  (This will give a list of accounts. Import 2 accounts into the wallet)
--><b>npx hardhat run scripts/deploy.ts --network localhost</b>  (This will create a compile and deploy smart contracts on the blockchain)

-->Address will be stored in ./__config.json
