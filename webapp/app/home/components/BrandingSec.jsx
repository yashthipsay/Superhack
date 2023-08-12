import React from 'react'

import Gonextsymbol from '../../svgs/Gonextsymbol'
import { redirect } from 'next/dist/server/api-utils'
import Link from 'next/link'



const BrandingSec = () => {
  return (
    <div className='home-main-sec'>
        <img src='logos/polysig-large.png' className='polysig-logo' />
        <div className='polysig-slogan'>Seamless Web3 Transactions with <span>POLYSIG</span></div>
        <Link href='/create-transaction' ><button className='get-started-btn'>Create new Transaction <Gonextsymbol /> </button></Link>
        <p>Swap with Optimism</p>
    </div>
  )
}

export default BrandingSec