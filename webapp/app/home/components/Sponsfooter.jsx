import React from 'react'

import BasenetSVG from '../../svgs/BasenetSVG'
import WorldcoinSVG from '../../svgs/WorldcoinSVG'

const Sponsfooter = () => {
  return (
    <div className="sponsors-credit">
        <div className="credit-header">Powered by</div>
        <div className="sponsors-list">
            <BasenetSVG />
            <WorldcoinSVG />
        </div>
    </div>
  )
}

export default Sponsfooter