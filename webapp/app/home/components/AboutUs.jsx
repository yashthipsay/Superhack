import React from 'react'

import './aboutus.css'

import MemberCard from './MemberCard.jsx';

const AboutUs = () => {
  return (
    <div className='about-us-body'>
        <div className="about-us-header">ABOUT US</div>

      <div className="arrange-member-cards">
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
      </div>
    </div>
  )
}

export default AboutUs