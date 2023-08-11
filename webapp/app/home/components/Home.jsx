import React from 'react'
import Navbar from './Navbar.jsx'
import BrandingSec from './BrandingSec.jsx'
import Sponsfooter from './Sponsfooter.jsx'


const Home = () => {
  return (
    <div className='home-body' >
        <Navbar />
        <BrandingSec />
        <Sponsfooter />
    </div>
  )
}

export default Home