import {ethers} from 'hardhat';
import { MultiSig__factory } from '../typechain-types';
import { Addressable } from 'ethers';
const hre = require('hardhat');
const fs = require('fs');

async function getAddresses(){
  let addresses = [];
  const accounts = await ethers.getSigners()
 
  
  for (const account of accounts) {
    addresses.push(account.address);
  }

  return addresses;
  
}

function createFile(address: string | Addressable){
  type config = object;

  const create: config = {address: address};
  fs.writeFileSync("../webapp/__config.json", JSON.stringify(create, null, 2));
}

async function main(){
let addresses = await getAddresses();
console.log(addresses);
  const multisig= await ethers.getContractFactory("MultiSig");
  console.log(multisig);
  const multi = await multisig.deploy(addresses,1);

  
  console.log('Contract deployed at', multi.target);

   createFile(multi.target);
}


main().catch((error)=>{
  console.error(error);
  process.exitCode = 1;
})