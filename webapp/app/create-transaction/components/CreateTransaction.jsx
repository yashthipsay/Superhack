import React from 'react'
import './create_transaction.css'
import BrandStrip from './BrandStrip'
import { Transaction } from 'ethers'

import TransactionPanel from './TransactionPanel'

const CreateTransaction = () => {
  return (
    <div className='create-transaction-body'>
        <BrandStrip />
        <TransactionPanel />
    </div>
  )
}

export default CreateTransaction