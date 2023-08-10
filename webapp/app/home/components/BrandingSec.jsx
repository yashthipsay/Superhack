import React from 'react'

import Gonextsymbol from '../../svgs/Gonextsymbol'
import BasenetSVG from '../../svgs/BasenetSVG'
import WorldcoinSVG from '../../svgs/WorldcoinSVG'


const BrandingSec = () => {
  return (
    <div className='home-main-sec'>
        <img src='logos/polysig-large.png' className='polysig-logo' />
        <div className='polysig-slogan'>Seamless Web3 Transactions with <span>POLYSIG</span></div>
        <button  className='get-started-btn'>Create new Transaction <Gonextsymbol /> </button>
        <p>Existing transactions</p>

        <div className="sponsors-credit">
            <div className="credit-header">Powered by</div>
            <div className="sponsors-list">
                <BasenetSVG />
                <WorldcoinSVG />
            </div>
        </div>
    </div>
  )
}

export default BrandingSec