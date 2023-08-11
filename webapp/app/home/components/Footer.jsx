import React from 'react'

import './footer.css'

import GitHubSVG from '../../svgs/social-media/GitHubSVG'
import TwitterSVG from '../../svgs/social-media/TwitterSVG'
import LinkedInSVG from '../../svgs/social-media/LinkedInSVG'
import InstagramSVG from '../../svgs/social-media/InstagramSVG'

const Footer = () => {
  return (
    <div className='footer-body'>
        <div className="footer-left">
            <div className="footer-logo">
                <img src="logos/polysig.png" alt="POLYSIG" />
                <div className="footer-logo-text">POLYSIG</div>
            </div>
        </div>
        <div className="footer-right">
            <div className="footer-greeting">
                THANKS FOR VISITING
            </div>

            <div className="social-handles">
                <div className="connect-invitation">
                    LET'S CONNECT
                </div>
                <div className="social-icons">
                    <LinkedInSVG />
                    <TwitterSVG />
                    <InstagramSVG />
                    <GitHubSVG />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer