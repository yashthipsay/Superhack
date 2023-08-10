import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='home-navbar'>
        <div className='home-navbar-logo'>
            <img src='logos/polysig.png' className='home-navbar-logo-symbol' />
            <p>POLYSIG</p>
        </div>
        <div className='home-navbar-links'>
            <Link href='/home'> <p  className='nav-link' >Home</p> </Link>
            <Link href='/about'> <p className='nav-link' >About Us</p> </Link>
            <Link href='/contact'> <p className='nav-link' >Contact</p> </Link>
        </div>
    </div>
  )
}

export default Navbar