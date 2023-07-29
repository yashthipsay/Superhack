import {ethers} from 'hardhat';
const hre = require('hardhat');

async function getAddresses(){
  let addresses = [];
  const accounts = await ethers.getSigners()
 
  
  for (const account of accounts) {
    addresses.push(account.address);
  }

  return addresses;
  
}

async function main(){
let addresses = await getAddresses();
console.log(addresses);
  const multisig= await ethers.getContractFactory("MultiSig");
  const multi = await multisig.deploy(addresses,1);
  

  console.log('Contract deployed at', multi.target);
}


main().catch((error)=>{
  console.error(error);
  process.exitCode = 1;
})