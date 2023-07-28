import {ethers} from 'hardhat';
const hre = require('hardhat');

async function main(){
const accounts = await ethers.getSigners();
console.log(accounts[0].address);
  const multisig= await ethers.getContractFactory("MultiSig");
  const multi = await multisig.deploy([accounts[0].address, accounts[1].address, accounts[2].address],2);
  

  console.log('Contract deployed at', multi.target);
}


main().catch((error)=>{
  console.error(error);
  process.exitCode = 1;
})