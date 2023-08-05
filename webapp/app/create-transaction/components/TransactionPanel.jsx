import React from 'react'

const TransactionPanel = () => {
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
                <input className='input-fields' type="text" name="value" id="value" placeholder='Enter Value' />
            </div>
            <button className='create-button'> Create </button>
        </div>
        <div className='traction-panel-divider2' />
        <div className="transaction-info">
            <div className="info-header">Contract Information</div>
            <div className="info-grids">
                <div className="grid">
                    <label className='info-label' htmlFor="address">Address</label>
                    <input className='info-fields' type="text" name="address" id="address" disabled />
                </div>
                <div className="grid">
                    <label className='info-label' htmlFor="balance">Balance in WEI</label>
                    <input className='info-fields' type="text" name="balance" id="balance" disabled />
                </div>
                    <div className="grid">
                    <label className='info-label' htmlFor="required-confirmations">Required Confirmations</label>
                <input className='info-fields' type="text" name="required-confirmations" id="required-confirmations" disabled />
                </div>
                <div className="grid">
                    <label className='info-label' htmlFor="owners">Owners</label>
                    <input className='info-fields' type="text" name="owners" id="owners" disabled />
                </div>
            </div>
        </div>
    </div>
  )
}

export default TransactionPanel