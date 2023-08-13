import React from 'react'
import './create_transaction.css'

import MultiSig from '../../../../chain/artifacts/contracts/MultiSigTwo.sol/MultiSigTwo.json';
import Sender from '../../../../chain/artifacts/contracts/Sender.sol/Sender.json';
import {ethers} from 'ethers';
import {address} from '../../../__config.json';
import setupEvents from '../components/SetupEvents';


import { Transaction } from 'ethers'

const ExistingTransactions = () => {
  return (
    <div className='transaction-panel'>
            <div  className="existing-transc">
                   

                <div className="existing-transactions">
                  <h1> Existing Transactions </h1>

                  <div id="container">

                  </div>
                </div>

            </div>
        
        
    </div>
  )
}

export default ExistingTransactions