import populateTransactions from "./PopulateTransaction";
import populateInfo from "./PopulateInfo";
import MultiSig from '../../chain/artifacts/contracts/MultiSigTwo.sol/MultiSigTwo.json';
import {address} from '../__config';
const ethers = require('ethers');

export default async function setupEvents() {
  const provider = new ethers.BrowserProvider(ethereum);
  await ethereum.request({ method: 'eth_requestAccounts' })
  
  

  const signer = await provider.getSigner();
  const contract = new ethers.Contract(address, MultiSig.abi, signer);
  


   populateTransactions();
   populateInfo();

  const code = await provider.getCode(address);
  console.log(code);
  if(code !== "0x") {
    contract.on('Confirmation',  () => {
       populateTransactions();
    });
    contract.on('Submission', () => {
       populateTransactions();
    });
    contract.on('Execution', () => {
       populateTransactions();
       populateInfo();
    });
    contract.on('Deposit', () => {
       populateInfo();
    });
   

  }
}

ethereum.on('chainChanged', () => {
  setupEvents();
});
