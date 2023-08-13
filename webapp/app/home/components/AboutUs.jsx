import React from 'react'

import './aboutus.css'

import MemberCard from './MemberCard.jsx';
import PieChart from '../../dashboard/components/GraphOne';

const AboutUs = () => {



  return (
    <div className='about-us-body'>

      
        <div className="about-us-header">ABOUT US</div>

      <div className="arrange-member-cards">
        <MemberCard imgSrc={'images/yash.jpeg'} />
        <MemberCard imgSrc={'images/bhavya.jpeg'}  />
        <MemberCard imgSrc={'images/shreyash.jpeg'}  />
        <MemberCard imgSrc={'images/soham.jpeg'} />
      </div>
    </div>
  )
}

export default AboutUs