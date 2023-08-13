import React, {useS} from 'react'
import Link from 'next/link'

import Gonextsymbol from '../../svgs/Gonextsymbol'



const BrandingSec = ({showModal, setShowModal}) => {

  return (
    <div className='home-main-sec'>
        {/* <img src='logos/polysig-large.png' className='polysig-logo' /> */}
        <div className='polysig-slogan'>Seamless Web3 Transactions with <span>POLYSIG</span></div>
        <Link href='/create-transaction' ><button  className='get-started-btn'>Create new Transaction <Gonextsymbol /> </button></Link>
        <div className='swap-toggle-btn' onClick={() => {setShowModal(!showModal)}} >Swap with Optimism</div>
    </div>
  )
}

export default BrandingSec