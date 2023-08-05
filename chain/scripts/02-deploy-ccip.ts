import {ethers} from 'hardhat';
import {Addressable} from 'ethers';
import { MultiSigTwo } from '../typechain-types';
const fs = require('fs');

async function main(){
    const sender = await ethers.getContractFactory("Sender");
    console.log(sender);
    const sendDeploy = await sender.deploy("0x261c05167db67B2b619f9d312e0753f3721ad6E8", "0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6");

    console.log("CCIP contract deployed at", sendDeploy.target);
}


main().catch((error)=>{
    console.error(error);
    process.exitCode = 1;
  })