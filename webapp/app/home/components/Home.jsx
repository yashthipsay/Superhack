'use client'

import React from 'react'
import Navbar from './Navbar.jsx'
import BrandingSec from './BrandingSec.jsx'
import Sponsfooter from './Sponsfooter.jsx'
import SwapModal from './SwapModal.jsx'



const Home = () => {

  const [showModal, setShowModal] = React.useState(false);
  return (
    <div className='home-body' >
        <Navbar />
        <BrandingSec />
        <Sponsfooter />
        { showModal && <SwapModal />}
    </div>
  )
}

export default Home