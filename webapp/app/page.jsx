"use client"
import Image from 'next/image'
import MultiSig from '../../chain/artifacts/contracts/MultiSig.sol/MultiSig.json';
import {ethers} from 'ethers';
import {address} from '../__config.json';
import setupEvents from '../components/SetupEvents';

export default function Home() {

  setupEvents();

  async function newTransaction() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await ethereum.request({ method: 'eth_requestAccounts' });
  
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(address, MultiSig.abi, signer);
    const destination = document.getElementById("destination").value;
    const wei = document.getElementById("wei").value;
    await contract.submit(destination, wei, "0x");
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
