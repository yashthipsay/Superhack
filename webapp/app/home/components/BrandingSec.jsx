import React, {useS} from 'react'
import Link from 'next/link'

import Gonextsymbol from '../../svgs/Gonextsymbol'
import { redirect } from 'next/dist/server/api-utils'




const BrandingSec = ({showModal, setShowModal}) => {

  return (
    <div className='home-main-sec'>
        {/* <img src='logos/polysig-large.png' className='polysig-logo' /> */}
        <div className='polysig-slogan'>Seamless Web3 Transactions with <span>POLYSIG</span></div>
        <Link href='/create-transaction' ><button  className='get-started-btn'>Create new Transaction <Gonextsymbol /> </button></Link>
        <div className='swap-toggle-btn' onClick={() => {setShowModal(!showModal)}} >Swap with Optimism</div>
        <Link href='/uniswap_pools' ><div className="swap-toggle-btn">Real time analytics!</div></Link>
    </div>
  )
}

export default BrandingSec