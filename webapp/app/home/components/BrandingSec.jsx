import React from 'react'

import Gonextsymbol from '../../svgs/Gonextsymbol'



const BrandingSec = () => {
  return (
    <div className='home-main-sec'>
        <img src='logos/polysig-large.png' className='polysig-logo' />
        <div className='polysig-slogan'>Seamless Web3 Transactions with <span>POLYSIG</span></div>
        <button  className='get-started-btn'>Create new Transaction <Gonextsymbol /> </button>
        <p>Existing transactions</p>
    </div>
  )
}

export default BrandingSec