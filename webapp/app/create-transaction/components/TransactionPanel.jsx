'use client'

import React from 'react'

import MultiSig from '../../../../chain/artifacts/contracts/MultiSigTwo.sol/MultiSigTwo.json';
import Sender from '../../../../chain/artifacts/contracts/Sender.sol/Sender.json';
import {ethers} from 'ethers';
import {address} from '../../../__config.json';
import setupEvents from './SetupEvents';

const TransactionPanel = () => {

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
    <div className='transaction-panel' >
        <div className='transaction-panel-header' >
            Create Transaction
        </div>
        <div className='traction-panel-divider1' />
        <div className="take-inputs">
            <div style={{'display':'flex', 'flex-direction':'column', 'align-items':'center', 'width':'100%'}} >
                <label className='input-labels' htmlFor="destination">Destinaltion</label>
                <input className='input-fields' type="text" name="destination" id="destination" placeholder='Destination' />
            </div>
            <div style={{'display':'flex', 'flex-direction':'column', 'align-items':'center', 'width':'100%'}}>
                <label className='input-labels' htmlFor="value">Value (in WEI)</label>
                <input id='wei' className='input-fields' type="text" name="value"  placeholder='Enter Value' />
            </div>
            <button onClick={newTransaction} className='create-button'> Create </button>
        </div>
        <div className='traction-panel-divider2' />
        <div className="transaction-info">
            <div className="info-header">Contract Information</div>
            <div className="info-grids">
                <div className="grid">
                    <label className='info-label' htmlFor="address">Address</label>
                    <div className='info-fields' type="text" name="address" id="address" disabled />
                </div>
                <div className="grid">
                    <label className='info-label' htmlFor="balance">Balance in WEI</label>
                    <div className='info-fields' type="text" name="balance" id="balance" disabled />
                </div>
                    <div className="grid">
                    <label className='info-label' htmlFor="required-confirmations">Required Confirmations</label>
                    <div className='info-fields' type="text" name="required-confirmations" id="confirmations" disabled />
                </div>
                <div className="grid">
                    <label className='info-label ' htmlFor="owners">Owners</label>
                    <div className='info-fields overflow' type="text" name="owners" id="owners" disabled />
                </div>
            </div>
        </div>
    </div>
  )
}

export default TransactionPanel