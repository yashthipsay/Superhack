"use client"
import Image from 'next/image'
import MultiSig from '../../chain/artifacts/contracts/MultiSigTwo.sol/MultiSigTwo.json';
import Sender from '../../chain/artifacts/contracts/Sender.sol/Sender.json';
import {ethers} from 'ethers';
import {address} from '../__config.json';
import setupEvents from '../components/SetupEvents';


function sendCcip(){
  document.getElementById('ccip').innerHTML = 'A Cross Chain Message was just sent with chainlink.'
}
export default function Home() {

 setupEvents();
 

  async function newTransaction() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await ethereum.request({ method: 'eth_requestAccounts' });
  
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(address, MultiSig.abi, signer);
    const sender_contract = new ethers.Contract(address, Sender.abi, signer);
    const destination = document.getElementById("destination").value;
    const wei = document.getElementById("wei").value;
    await contract.submitTransaction(destination, wei, "0x");
    
    await sender_contract.sendMessage(3734403246176062136n, destination, "Transaction Submitted");

  }
  

  return (
    <div>
       <div className="contract-interface">
      <h1> Create New Transaction </h1>
      <label>
        Destination
        <input type="text" id="destination"/>
      </label>

      <label>
        Value (in Wei)
        <input type="text" id="wei"/>
      </label>

      <div className="button" id="deploy" onClick={newTransaction}>
      Create
      </div>


      <div className="contract-info">
        <h1> Contract Information </h1>

        <div className="field">
          <label> Address </label>
          <div id="address">  </div>
        </div>

        <div className="field">
          <label> Balance in Wei </label>
          <div id="balance">  </div>
        </div>

        <div className="field">
          <label> Required Confirmations </label>
          <div id="confirmations">  </div>
        </div>

        <div className="field">
          <label> Owners </label>
          <div id="owners">  </div>
        </div>
      </div>
    </div>

    <div className="existing-transactions">
      <h1> Existing Transactions </h1>

      <div id="container">
         
      </div>
    </div>

    </div>
  )
}
