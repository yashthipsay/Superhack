import populateTransactions from "./PopulateTransaction";
import populateInfo from "./PopulateInfo";
import MultiSig from '../../chain/artifacts/contracts/MultiSig.sol/MultiSig.json';
import {address} from '../__config';
const ethers = require('ethers');

export default async function setupEvents() {
  const provider = new ethers.BrowserProvider(ethereum);
  await ethereum.request({ method: 'eth_requestAccounts' })
  
  

  const signer = provider.getSigner();
  const contract = new ethers.Contract(address, MultiSig.abi, signer);

  populateTransactions();
  populateInfo();

  const code = provider.getCode(address);
  if(code !== "0x") {
    contract.on('Confirmation', () => {
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
