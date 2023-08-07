import React from 'react'
import BasenetSVG from '../../svgs/BasenetSVG'
import WorldcoinSVG from '../../svgs/WorldcoinSVG'

const BrandStrip = () => {
  return (
    <div className='brand-strip' >
        <div className='site-logo' >
            <span className='polysig-logo'>
                <img src="logos/polysig.png" alt="polysig" />
                <p>POLYSIG</p>
            </span>
        </div>
        <div className='brand-logos' >
            <span className='basenet-logo'>
                <BasenetSVG />
            </span>
            <span className='worldcoin-logo' >
                <WorldcoinSVG />
            </span>
        </div>
    </div>
  )
}

export default BrandStrip