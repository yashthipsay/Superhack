import React from 'react'

import BasenetSVG from '../../svgs/BasenetSVG'
import WorldcoinSVG from '../../svgs/WorldcoinSVG'
import TheGraph from '../../svgs/TheGraph'
import EtherscanSVG from '../../svgs/EtherscanSVG'
import ChainlinkSVG from '../../svgs/ChainlinkSVG'
import OptimismSVG from '../../svgs/OptimismSVG'

const Sponsfooter = () => {
  return (
    <div className="sponsors-credit">
        <div className="credit-header">Powered by</div>
        <div className="sponsors-list">
            <BasenetSVG />
            {/* <WorldcoinSVG /> */}
            <TheGraph />
            <EtherscanSVG />
            <ChainlinkSVG />
            <OptimismSVG />
            
        </div>
    </div>
  )
}

export default Sponsfooter