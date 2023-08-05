import React from 'react'
import './create_transaction.css'
import BrandStrip from './BrandStrip'

import { Transaction } from 'ethers'

import TransactionPanel from './TransactionPanel'

const CreateTransaction = () => {
  return (
    <div className='create-transaction-body'>
        {/* <BackgroundStrips /> */}
        <img className='strips-background' src="backgroud_designs/Union.png"  />
        <BrandStrip />
        <TransactionPanel />
    </div>
  )
}

export default CreateTransaction