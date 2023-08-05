import populateTransactions from "./PopulateTransaction";
import populateInfo from "./PopulateInfo";
import MultiSig from '../../chain/artifacts/contracts/MultiSigTwo.sol/MultiSigTwo.json';
import Sender from '../../chain/artifacts/contracts/Sender.sol/Sender.json';
import {address} from '../__config';
const ethers = require('ethers');

export default async function setupEvents() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  await ethereum.request({ method: 'eth_requestAccounts' })
  
  

  const signer = await provider.getSigner();
  const contract = new ethers.Contract(address, MultiSig.abi, signer);
  const sender_contract = new ethers.Contract(address, MultiSig.abi, signer);


  await populateTransactions();
  await populateInfo();

  const code = await provider.getCode(address);
  console.log(code);
  if(code !== "0x") {
    contract.on('Confirmation', async () => {
      await populateTransactions();
    });
    contract.on('Submission', async() => {
      await populateTransactions();
    });
    contract.on('Execution',async () => {
      await populateTransactions();
      await populateInfo();
    });
    contract.on('Deposit', async() => {
      await populateInfo();
    });
   

  }
}

ethereum.on('chainChanged', () => {
  setupEvents();
});
