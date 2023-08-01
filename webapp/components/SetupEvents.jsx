import populateTransactions from "./PopulateTransaction";
import populateInfo from "./PopulateInfo";
import MultiSig from '../../chain/artifacts/contracts/MultiSig.sol/MultiSig.json';
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
  if(code !== "0x") {
    contract.on('Approve', () => {
      populateTransactions();
    });
    contract.on('Submit', () => {
      populateTransactions();
    });
    contract.on('Execute', () => {
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
